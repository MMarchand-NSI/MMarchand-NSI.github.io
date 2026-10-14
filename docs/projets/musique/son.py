"""Module fourni : transforme des rythmes ou des mélodies en fichier son .wav.

Les rythmes (ecrire_wav) n'utilisent que la bibliothèque standard de Python.
Les mélodies (ecrire_wav_notes) sont jouées par le programme fluidsynth,
à installer une fois : sudo apt install fluidsynth fluid-soundfont-gm
Ne pas le modifier.
"""
import array
import math
import os
import random
import shutil
import struct
import subprocess
import sys
import tempfile
import wave

FREQUENCE_ECHANTILLONNAGE: int = 44100
TIMBRES: list[float] = [850.0, 1200.0, 650.0, 1600.0, 1000.0]  # fréquence centrale de chaque voix
SALLE: float = 0.35  # part du son renvoyée par la pièce : 0 pour un son sec, 1 pour une église
ECART: float = 0.35  # écart stéréo entre les voix : 0 pour toutes au centre, 1 pour aux extrémités
NOTES: dict[str, int] = {"do": 0, "re": 2, "mi": 4, "fa": 5, "sol": 7, "la": 9, "si": 11}


def _filtre_passe_bande(signal: list[float], centre: float, q: float) -> list[float]:
    """Ne garde du signal que les fréquences proches de centre (filtre biquadratique)."""
    w = 2 * math.pi * centre / FREQUENCE_ECHANTILLONNAGE
    alpha = math.sin(w) / (2 * q)
    a0 = 1 + alpha
    b0 = alpha / a0
    b2 = -alpha / a0
    a1 = -2 * math.cos(w) / a0
    a2 = (1 - alpha) / a0
    x1 = x2 = y1 = y2 = 0.0
    sortie = []
    for x in signal:
        y = b0 * x + b2 * x2 - a1 * y1 - a2 * y2
        x2, x1 = x1, x
        y2, y1 = y1, y
        sortie.append(y)
    return sortie


def _frappe(centre: float, graine: int) -> list[float]:
    """Une frappe dans les mains : un souffle de bruit bref, filtré autour de centre.

    Une vraie frappe n'est pas un seul choc : les paumes se touchent en
    plusieurs points à quelques millisecondes d'intervalle, puis le son
    résonne un court instant. On imite ces micro-attaques et cette queue.
    """
    hasard = random.Random(graine)
    nb = int(0.18 * FREQUENCE_ECHANTILLONNAGE)
    attaques = [0.0, hasard.uniform(0.004, 0.007), hasard.uniform(0.009, 0.013)]
    forces = [0.6, 0.8, 1.0]
    bruit = []
    for i in range(0, nb):
        t = i / FREQUENCE_ECHANTILLONNAGE
        enveloppe = 0.0
        for k in range(0, len(attaques)):
            if t >= attaques[k]:
                u = t - attaques[k]
                # montée en 1 ms environ, puis extinction : pas de front vertical
                enveloppe = enveloppe + forces[k] * (1 - math.exp(-u / 0.0008)) * math.exp(-u / 0.006)
        if t >= attaques[2]:
            enveloppe = enveloppe + 0.45 * math.exp(-(t - attaques[2]) / 0.04)
        bruit.append(hasard.uniform(-1.0, 1.0) * enveloppe)
    clair = _filtre_passe_bande(bruit, centre, 1.2)
    corps = _filtre_passe_bande(bruit, centre * 0.55, 2.0)
    son = []
    for i in range(0, nb):
        son.append(clair[i] + 0.6 * corps[i])
    son = _filtre_passe_bas(son, 2500.0)
    return _arrondir_cretes(son)


def _filtre_passe_bas(signal: list[float], coupure: float) -> list[float]:
    """Atténue les fréquences au-dessus de coupure (filtre du premier ordre)."""
    a = math.exp(-2 * math.pi * coupure / FREQUENCE_ECHANTILLONNAGE)
    y = 0.0
    sortie = []
    for x in signal:
        y = (1 - a) * x + a * y
        sortie.append(y)
    return sortie


def _arrondir_cretes(signal: list[float]) -> list[float]:
    """Compresse doucement les pics : les crêtes s'arrondissent, le reste bouge peu."""
    maximum = 1e-9
    for e in signal:
        if abs(e) > maximum:
            maximum = abs(e)
    sortie = []
    for e in signal:
        sortie.append(math.tanh(2.5 * e / maximum) / math.tanh(2.5))
    return sortie


def _salle(graine: int) -> list[float]:
    """Ce que la pièce renvoie après une frappe : quelques échos rapprochés
    sur les murs, puis une traîne diffuse qui s'éteint en une demi-seconde."""
    hasard = random.Random(graine)
    nb = int(0.6 * FREQUENCE_ECHANTILLONNAGE)
    echos = [(hasard.uniform(0.008, 0.014), 0.5), (hasard.uniform(0.017, 0.024), 0.4),
             (hasard.uniform(0.027, 0.035), 0.3), (hasard.uniform(0.04, 0.05), 0.2)]
    bruit = []
    for i in range(0, nb):
        t = i / FREQUENCE_ECHANTILLONNAGE
        enveloppe = 0.0
        for debut, force in echos:
            if t >= debut:
                enveloppe = enveloppe + force * math.exp(-(t - debut) / 0.004)
        if t >= 0.01:
            montee = min(1.0, (t - 0.01) / 0.02)
            enveloppe = enveloppe + 0.25 * montee * math.exp(-(t - 0.01) / 0.13)
        bruit.append(hasard.uniform(-1.0, 1.0) * enveloppe)
    feutre = _filtre_passe_bande(bruit, 900.0, 0.6)  # les murs absorbent les aigus
    return feutre


def _ajouter(canal: list[float], debut: int, son: list[float], force: float) -> None:
    """Ajoute force * son dans canal, à partir de l'indice debut."""
    fin = debut + len(son)
    canal[debut:fin] = [a + force * b for a, b in zip(canal[debut:fin], son)]


def ecrire_wav(voix: list[str], nom_fichier: str, duree_case: float = 0.15, tours: int = 4) -> None:
    """Écrit dans nom_fichier les rythmes de voix, joués ensemble, frappés dans les mains.

    Chaque rythme est une chaîne de "x" (frappe) et de "." (silence).
    Le fichier est en stéréo : avec deux voix, l'une est à gauche et l'autre
    à droite, et chaque voix a un timbre un peu différent. Une case dure
    duree_case secondes. Le morceau dure tours fois la longueur du plus long
    rythme, et chaque rythme recommence au début dès qu'il est fini.
    """
    assert len(voix) > 0 and len(voix) <= len(TIMBRES), "entre 1 et 5 voix"
    for rythme in voix:
        assert len(rythme) > 0, "un rythme ne peut pas être vide"
    longueur = 0
    for rythme in voix:
        if len(rythme) > longueur:
            longueur = len(rythme)
    nb_cases = tours * longueur
    par_case = int(duree_case * FREQUENCE_ECHANTILLONNAGE)
    taille = nb_cases * par_case + FREQUENCE_ECHANTILLONNAGE
    gauche = [0.0] * taille
    droite = [0.0] * taille
    hasard = random.Random(1972)
    for j in range(0, len(voix)):
        if len(voix) == 1:
            position = 0.0
        else:
            position = -ECART + 2 * ECART * j / (len(voix) - 1)  # de -ECART (gauche) à ECART (droite)
        angle = (position + 1) * math.pi / 4
        g = math.cos(angle)
        d = math.sin(angle)
        variantes = []
        for v in range(0, 6):
            frappe = _frappe(TIMBRES[j], 100 * j + v)
            salle_g = _salle(1000 + 100 * j + 2 * v)
            salle_d = _salle(1001 + 100 * j + 2 * v)
            son_g = [0.0] * len(salle_g)
            son_d = [0.0] * len(salle_d)
            for i in range(0, len(frappe)):
                son_g[i] = g * frappe[i]
                son_d[i] = d * frappe[i]
            for i in range(0, len(salle_g)):
                son_g[i] = son_g[i] + SALLE * salle_g[i]
                son_d[i] = son_d[i] + SALLE * salle_d[i]
            variantes.append((son_g, son_d))
        for c in range(0, nb_cases):
            if voix[j][c % len(voix[j])] == "x":
                son_g, son_d = variantes[hasard.randrange(0, len(variantes))]
                force = hasard.uniform(0.85, 1.0)
                _ajouter(gauche, c * par_case, son_g, force)
                _ajouter(droite, c * par_case, son_d, force)
    _ecrire_fichier_stereo(gauche, droite, nom_fichier)


def frequence(nom: str) -> float:
    """Fréquence en Hz d'une note nommée comme "do4", "mib4" ou "fa#3".

    Le nom est fait d'une note (do re mi fa sol la si), suivie éventuellement
    de "#" (dièse) ou de "b" (bémol), puis d'un chiffre d'octave.
    "la4" vaut 440 Hz et "do4" est le do du milieu du clavier d'un piano.
    """
    octave = int(nom[len(nom) - 1])
    base = nom[0:len(nom) - 1]
    alteration = 0
    if base[len(base) - 1] == "#":
        alteration = 1
        base = base[0:len(base) - 1]
    elif base[len(base) - 1] == "b":
        alteration = -1
        base = base[0:len(base) - 1]
    assert base in NOTES, "note inconnue : " + nom
    demi_tons_depuis_la4 = 12 * (octave - 4) + NOTES[base] + alteration - NOTES["la"]
    return 440.0 * 2 ** (demi_tons_depuis_la4 / 12)


BANQUE_SONS: str = "/usr/share/sounds/sf2/FluidR3_GM.sf2"  # installée par le paquet fluid-soundfont-gm
INSTRUMENT: int = 40  # numéro General MIDI moins 1 : 40 violon, 0 piano, 73 flûte, 42 violoncelle


def _numero_midi(nom: str) -> int:
    """Numéro MIDI d'une note : 69 pour "la4", un de plus par demi-ton."""
    return round(69 + 12 * math.log2(frequence(nom) / 440))


def _nombre_variable(n: int) -> bytes:
    """Écrit un entier positif comme le demande le format MIDI : 7 bits par octet."""
    octets = [n & 0x7F]
    n = n >> 7
    while n > 0:
        octets.insert(0, (n & 0x7F) | 0x80)
        n = n >> 7
    return bytes(octets)


def _piste_midi(evenements: bytes) -> bytes:
    """Une piste MIDI : son en-tête, puis ses événements, puis sa marque de fin."""
    contenu = evenements + _nombre_variable(0) + b"\xff\x2f\x00"
    return b"MTrk" + struct.pack(">I", len(contenu)) + contenu


def _ecrire_midi(voix: list[list[tuple[str, int]]], nom_fichier: str, duree_croche: float) -> None:
    """Écrit les mélodies de voix dans un fichier MIDI, une piste par voix."""
    par_noire = 480
    par_croche = par_noire // 2
    tempo = int(duree_croche * 2 * 1000000)  # microsecondes par noire
    pistes = [_piste_midi(_nombre_variable(0) + b"\xff\x51\x03" + tempo.to_bytes(3, "big"))]
    for canal in range(0, len(voix)):
        ev = bytearray()
        ev += _nombre_variable(0) + bytes([0xC0 | canal, INSTRUMENT])
        attente = 0
        for nom, duree in voix[canal]:
            if nom == "silence":
                attente = attente + duree * par_croche
            else:
                n = _numero_midi(nom)
                ev += _nombre_variable(attente) + bytes([0x90 | canal, n, 80])
                ev += _nombre_variable(duree * par_croche) + bytes([0x80 | canal, n, 0])
                attente = 0
        ev += _nombre_variable(attente + 2 * par_noire)  # laisser la dernière note s'éteindre
        pistes.append(_piste_midi(bytes(ev) + b"\xff\x01\x00"))
    with open(nom_fichier, "wb") as f:
        f.write(b"MThd" + struct.pack(">IHHH", 6, 1, len(pistes), par_noire))
        for piste in pistes:
            f.write(piste)


def ecrire_wav_notes(voix: list[list[tuple[str, int]]], nom_fichier: str, duree_croche: float = 0.18) -> None:
    """Écrit dans nom_fichier les mélodies de voix, jouées ensemble par des violons.

    Chaque mélodie est une liste de couples (nom, durée) : nom est une note
    comme "mib4" (voir frequence) ou "silence", et durée un nombre de croches.
    Une croche dure duree_croche secondes.
    Le son est fabriqué par le programme fluidsynth, à installer une fois :
        sudo apt install fluidsynth fluid-soundfont-gm
    """
    assert len(voix) > 0 and len(voix) <= 15, "entre 1 et 15 voix"
    assert shutil.which("fluidsynth") is not None, "fluidsynth introuvable : sudo apt install fluidsynth fluid-soundfont-gm"
    assert os.path.exists(BANQUE_SONS), "banque de sons introuvable : sudo apt install fluid-soundfont-gm"
    # Chaque voix est rendue à part, puis les voix sont additionnées ici, en
    # entiers. Ainsi l'ordre des voix ne change rien au fichier, au bit près.
    rendus = []
    with tempfile.TemporaryDirectory() as dossier:
        for k in range(0, len(voix)):
            midi = os.path.join(dossier, "voix" + str(k) + ".mid")
            brut = os.path.join(dossier, "voix" + str(k) + ".wav")
            _ecrire_midi([voix[k]], midi, duree_croche)
            subprocess.run(["fluidsynth", "-ni", "-q", "-r", str(FREQUENCE_ECHANTILLONNAGE), "-F", brut, BANQUE_SONS, midi],
                           check=True, capture_output=True)
            with wave.open(brut, "rb") as f:
                parametres = f.getparams()
                rendu = array.array("h")
                rendu.frombytes(f.readframes(f.getnframes()))
            if sys.byteorder == "big":  # le format .wav range les octets de poids faible en premier
                rendu.byteswap()
            rendus.append(rendu)
    longueur = 0
    for rendu in rendus:
        if len(rendu) > longueur:
            longueur = len(rendu)
    somme = [0] * longueur
    for rendu in rendus:
        for i in range(0, len(rendu)):
            somme[i] = somme[i] + rendu[i]
    maximum = 1
    for e in somme:
        if abs(e) > maximum:
            maximum = abs(e)
    echelle = 30000 / maximum  # le rendu brut est faible : on le remet à un bon volume
    donnees = array.array("h")
    for e in somme:
        donnees.append(int(e * echelle))
    if sys.byteorder == "big":
        donnees.byteswap()
    with wave.open(nom_fichier, "wb") as f:
        f.setparams(parametres)
        f.writeframes(donnees.tobytes())


def _ecrire_fichier_stereo(gauche: list[float], droite: list[float], nom_fichier: str) -> None:
    """Écrit les deux canaux gauche et droite dans nom_fichier, au format .wav."""
    maximum = 1e-9
    for canal in [gauche, droite]:
        for e in canal:
            if abs(e) > maximum:
                maximum = abs(e)
    echelle = 30000 / maximum
    donnees = array.array("h")
    for i in range(0, len(gauche)):
        donnees.append(int(gauche[i] * echelle))
        donnees.append(int(droite[i] * echelle))
    if sys.byteorder == "big":  # le format .wav range les octets de poids faible en premier
        donnees.byteswap()
    with wave.open(nom_fichier, "wb") as f:
        f.setnchannels(2)
        f.setsampwidth(2)
        f.setframerate(FREQUENCE_ECHANTILLONNAGE)
        f.writeframes(donnees.tobytes())
