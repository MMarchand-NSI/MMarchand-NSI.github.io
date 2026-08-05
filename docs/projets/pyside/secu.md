# Projet : décoder un numéro de sécurité sociale

Le numéro de sécurité sociale (le NIR) n'est pas tiré au hasard : chaque groupe de chiffres a un sens précis (sexe, date et lieu de naissance), et les deux derniers chiffres sont une **clé de contrôle**, calculée à partir des treize premiers. On va écrire un programme qui lit un numéro et en affiche le détail.

!!! tip "Pré-requis"
    Ce projet fait suite au [convertisseur](convertisseur.md) : un seul clic, un seul calcul, rien à retenir d'un clic à l'autre (pas de `global` ici). La nouveauté porte sur le découpage d'une chaîne en tranches, et sur un enchaînement de vérifications avec `if` / `elif`, déjà vu dans [Devine le nombre](devine-nombre.md).

## Cahier des charges

L'application doit :

1. proposer un champ pour taper un numéro de **15 caractères** et un bouton **Décoder** ;
2. si le numéro n'a pas 15 caractères, afficher un message d'erreur clair, et rien d'autre ;
3. sinon, afficher : le **sexe**, le **mois et l'année de naissance**, la **commune et le département de naissance**, le **numéro d'ordre**, et si la **clé de contrôle** est valide ;
4. si le numéro correspond à une naissance dans un DOM/TOM ou à l'étranger, le dire clairement plutôt que d'afficher un résultat faux : ce projet ne couvre que la **métropole et la Corse**.

## Comprendre le format, avant de coder

Le numéro a 15 caractères : 13 chiffres significatifs, puis une clé de contrôle sur 2 chiffres.

| Positions | Longueur | Signification |
|:---:|:---:|---|
| 1 | 1 | Sexe (`1` = homme, `2` = femme) |
| 2-3 | 2 | Année de naissance (les 2 derniers chiffres) |
| 4-5 | 2 | Mois de naissance (`01` à `12`) |
| 6-7 | 2 | Département de naissance (`01` à `95`, ou `2A`/`2B` pour la Corse) |
| 8-10 | 3 | Code de la commune de naissance, **dans** ce département |
| 11-13 | 3 | Numéro d'ordre (distingue les personnes nées le même mois, dans la même commune) |
| 14-15 | 2 | Clé de contrôle |

!!! warning "Deux limites, assumées dès le départ"
    - **L'année tient sur 2 chiffres** : un numéro ne dit jamais, à lui seul, si quelqu'un est né en 19xx ou en 20xx. Le programme affichera les deux possibilités plutôt que d'en inventer une.
    - **Les DOM/TOM et l'étranger utilisent un découpage différent** des positions 6 à 10 (largeur de champ différente pour le département). Plutôt que de risquer un résultat faux, le programme **détecte** ces cas et affiche un message dédié, sans essayer de les décoder.

**La clé de contrôle.** On forme le nombre entier constitué des 13 premiers chiffres, on calcule le reste de sa division par 97, et la clé vaut 97 moins ce reste. Exemple vérifié : le numéro `1 85 03 69 123 045` (un homme né en mars 1985, à Lyon) donne `1850369123045 mod 97 = 65`, donc une clé de `97 - 65 = 32`.

!!! note "Le cas de la Corse"
    `2A` et `2B` ne sont pas des chiffres : impossible de les inclure tels quels dans un calcul. La règle est de les **remplacer**, uniquement pour ce calcul, par `19` et `18`. Le numéro affiché, lui, garde bien `2A` ou `2B`.

## Les données : deux tables

[Télécharger departements.csv](departements.csv) et [communes.csv](communes.csv).

`departements.csv` associe un code de département à son nom :

```
code,nom
01,Ain
02,Aisne
...
75,Paris
...
2A,Corse-du-Sud
2B,Haute-Corse
...
971,Guadeloupe
974,La Réunion
```

`communes.csv` associe un département et un code de commune à un nom, exactement le découpage que fait le NIR :

```
departement,code_commune,nom
...
69,123,Lyon
...
75,056,Paris
...
```

!!! warning "Toutes les communes de métropole, aucune d'outre-mer"
    `communes.csv` couvre la métropole et la Corse (près de 35 000 communes), pas les DOM/TOM : c'est cohérent avec la limite annoncée plus haut. `departements.csv`, lui, liste **aussi** les DOM, pour pouvoir nommer le territoire dans le message d'erreur plutôt que de dire juste « non pris en charge ».

## L'interface

```qml title="secu.qml"
import QtQuick
import QtQuick.Controls
import QtQuick.Layouts

ApplicationWindow {
    visible: true
    width: 420
    height: 380
    title: "Décodeur de numéro de sécurité sociale"

    ColumnLayout {
        anchors.centerIn: parent
        spacing: 10

        RowLayout {
            TextField { objectName: "champ_nir"; placeholderText: "15 caractères, sans espace"; Layout.preferredWidth: 260 }
            Button { objectName: "bouton"; text: "Décoder" }
        }

        Label { objectName: "erreur"; text: ""; color: "#cc3333"; wrapMode: Text.WordWrap; Layout.preferredWidth: 380 }

        Label { objectName: "sexe"; text: "" }
        Label { objectName: "naissance"; text: "" }
        Label { objectName: "lieu"; text: ""; wrapMode: Text.WordWrap; Layout.preferredWidth: 380 }
        Label { objectName: "ordre"; text: "" }
        Label { objectName: "cle"; text: "" }
    }
}
```

## Le fichier Python

Crée `app.py`, à côté de `secu.qml`, `departements.csv` et `communes.csv`. Le chargement des deux tables et le repérage des composants sont fournis, comme le module `csv` lui-même (pas encore vu en cours).

```python title="app.py"
import sys
import csv
from PySide6.QtGui import QGuiApplication
from PySide6.QtQml import QQmlApplicationEngine

app = QGuiApplication(sys.argv)
engine = QQmlApplicationEngine()
engine.load("secu.qml")
fenetre = engine.rootObjects()[0]

with open("departements.csv", encoding="utf-8") as f:
    departements = {row["code"]: row["nom"] for row in csv.DictReader(f)}

with open("communes.csv", encoding="utf-8") as f:
    communes = {(row["departement"], row["code_commune"]): row["nom"] for row in csv.DictReader(f)}

champ_nir = fenetre.findChild(object, "champ_nir")
bouton    = fenetre.findChild(object, "bouton")
erreur    = fenetre.findChild(object, "erreur")
sexe_lbl  = fenetre.findChild(object, "sexe")
naissance = fenetre.findChild(object, "naissance")
lieu      = fenetre.findChild(object, "lieu")
ordre_lbl = fenetre.findChild(object, "ordre")
cle_lbl   = fenetre.findChild(object, "cle")


def vider_resultats() -> None:
    """Efface l'affichage avant un nouveau décodage (ou en cas d'erreur)."""
    sexe_lbl.setProperty("text", "")
    naissance.setProperty("text", "")
    lieu.setProperty("text", "")
    ordre_lbl.setProperty("text", "")
    cle_lbl.setProperty("text", "")
    cle_lbl.setProperty("color", "#000000")


def calculer_cle(treize: str) -> str:
    """Calcule la clé de contrôle (2 caractères) à partir des 13 premiers caractères du NIR.

    >>> calculer_cle("1850369123045")
    '32'
    >>> calculer_cle("2" + "85" + "11" + "2A" + "004" + "017")
    '14'
    """
    pass  # à compléter


def decoder() -> None:
    """Callback du bouton Décoder."""
    pass  # à compléter


bouton.clicked.connect(decoder)

if __name__ == "__main__":
    import doctest
    doctest.testmod()
    sys.exit(app.exec())
```

## Étape 1 - `calculer_cle`, une fonction pure

!!! question "Écrire `calculer_cle`"
    Traduis en Python la formule de la section précédente :

    1. remplace `"2A"` par `"19"` et `"2B"` par `"18"` dans `treize` (`str.replace` ne fait rien si le motif est absent, donc c'est sans risque sur un numéro métropolitain) ;
    2. convertis en entier ;
    3. renvoie `97` moins le reste de la division par `97`, sur **2 caractères** (indice : `zfill(2)`, déjà rencontré pour un numéro de pokémon).

    Comme `trouver_index` dans le [Pokédex](pokedex.md), `calculer_cle` ne touche à **aucun** composant graphique : tu peux la tester seule, avec les doctests, sans lancer l'application.

    ??? tip "Indice"
        `str(97 - (int(n) % 97)).zfill(2)`, où `n` est la chaîne déjà substituée.

    ??? success "Solution"
        ```python
        def calculer_cle(treize: str) -> str:
            """Calcule la clé de contrôle (2 caractères) à partir des 13 premiers caractères du NIR.

            >>> calculer_cle("1850369123045")
            '32'
            >>> calculer_cle("2" + "85" + "11" + "2A" + "004" + "017")
            '14'
            """
            n = treize.replace("2A", "19").replace("2B", "18")
            return str(97 - (int(n) % 97)).zfill(2)
        ```

    Lance le fichier **sans cliquer sur rien** : si les deux doctests passent (le cas métropolitain et le cas corse), `calculer_cle` est correcte.

## Étape 2 - `decoder`

!!! question "Découper, vérifier, afficher"
    `decoder` fait quatre choses, dans cet ordre :

    1. **Découper** `nir` en tranches : `sexe = nir[0]`, `annee = nir[1:3]`, `mois = nir[3:5]`, `dept = nir[5:7]`, `commune_code = nir[7:10]`, `ordre = nir[10:13]`, `cle = nir[13:15]`.
    2. **Vérifier**, dans l'ordre, et **sortir** (`return`) au premier problème rencontré, avec un message dans `erreur` :
        - la longueur de `nir` (déjà dans le squelette, à garder) ;
        - `sexe` vaut `"1"` ou `"2"` ;
        - `mois` est un nombre entre 1 et 12 ;
        - `dept` vaut `"99"` (né à l'étranger) : message dédié ;
        - `dept` vaut `"97"` ou `"98"` (DOM/TOM) : reconstitue le vrai code sur 3 caractères avec `dept + nir[7]`, cherche son nom dans `departements` (avec une valeur par défaut si absent), et affiche-le dans le message ;
        - `dept` n'est dans **aucun** cas ci-dessus mais reste absent de `departements` : message « département inconnu ».
    3. **Chercher** le nom du département (`departements[dept]`) et celui de la commune (`communes.get((dept, commune_code), ...)`, avec une valeur par défaut : toutes les communes ne sont pas forcément dans un numéro que tu inventes).
    4. **Afficher** les cinq labels, et comparer `cle` à `calculer_cle(nir[:13])` pour colorer `cle_lbl` en vert ou en rouge.

    N'oublie pas d'appeler `vider_resultats()` en tout début de fonction : sans ça, le résultat d'un décodage précédent reste affiché si le suivant échoue.

    ??? tip "Indice léger"
        Chaque vérification de l'étape 2 suit le même patron : si la condition d'erreur est vraie, `erreur.setProperty("text", "...")` puis `return` immédiatement. Rien après un `return` ne s'exécute : c'est voulu, chaque cas est traité une seule fois.

    ??? tip "Indice précis, pour le cas DOM/TOM"
        ```python
        if dept in ("97", "98"):
            vrai_dept = dept + nir[7]
            nom = departements.get(vrai_dept, "un territoire d'outre-mer")
            erreur.setProperty("text", "Né(e) en " + nom + " (" + vrai_dept + ") : ce décodeur ne couvre que la métropole et la Corse.")
            return
        ```

    ??? question "Avant d'ouvrir la solution"
        Écris une phrase sur ton cahier : pourquoi `communes.get((dept, commune_code), "commune non répertoriée")` est-il préférable à `communes[(dept, commune_code)]` ici ?

    ??? success "Solution"
        ```python
        def decoder() -> None:
            """Callback du bouton Décoder."""
            erreur.setProperty("text", "")
            vider_resultats()

            nir = champ_nir.property("text").strip().upper()
            if len(nir) != 15:
                erreur.setProperty("text", "Le numéro doit comporter 15 caractères (13 chiffres + 2 de clé).")
                return

            sexe, annee, mois, dept, commune_code, ordre, cle = (
                nir[0], nir[1:3], nir[3:5], nir[5:7], nir[7:10], nir[10:13], nir[13:15]
            )

            if sexe not in ("1", "2"):
                erreur.setProperty("text", "Sexe non reconnu (doit être 1 ou 2).")
                return
            if not (mois.isdigit() and 1 <= int(mois) <= 12):
                erreur.setProperty("text", "Mois de naissance invalide.")
                return
            if dept == "99":
                erreur.setProperty("text", "Naissance à l'étranger : non pris en charge par ce décodeur.")
                return
            if dept in ("97", "98"):
                vrai_dept = dept + nir[7]
                nom = departements.get(vrai_dept, "un territoire d'outre-mer")
                erreur.setProperty("text", "Né(e) en " + nom + " (" + vrai_dept + ") : ce décodeur ne couvre que la métropole et la Corse.")
                return
            if dept not in departements:
                erreur.setProperty("text", "Département inconnu : " + dept)
                return

            nom_dept = departements[dept]
            nom_commune = communes.get((dept, commune_code), "commune non répertoriée")

            sexe_lbl.setProperty("text", "Homme" if sexe == "1" else "Femme")
            naissance.setProperty("text", "Né(e) en " + mois + "/19" + annee + " ou " + mois + "/20" + annee)
            lieu.setProperty("text", nom_commune + " (" + dept + commune_code + "), " + nom_dept)
            ordre_lbl.setProperty("text", str(int(ordre)) + "e enregistrement de cette période dans cette commune")

            attendue = calculer_cle(nir[:13])
            if cle == attendue:
                cle_lbl.setProperty("text", "Clé " + cle + " : valide")
                cle_lbl.setProperty("color", "#228822")
            else:
                cle_lbl.setProperty("text", "Clé " + cle + " : invalide (attendue " + attendue + ")")
                cle_lbl.setProperty("color", "#cc3333")
        ```
        `communes.get(..., "commune non répertoriée")` évite un plantage (`KeyError`) sur un code de commune que le fichier ne contient pas, ce qui arrivera souvent si tu inventes un numéro : le reste du décodage (département, ordre, clé) reste correct et affiché, seule la commune est signalée comme inconnue.

    Teste avec `185036912304532` (Lyon, clé correcte), puis avec la même chaîne dont tu changes le dernier chiffre (clé fausse), puis avec un numéro commençant par `299` (étranger) et un autre par `297` suivi d'un chiffre de `1` à `6` (DOM).

## Ce qu'on retient

- Un format de données réel (ici le NIR) se lit en **tranches** de positions fixes : `nir[5:7]`, `nir[7:10]`... Une fois le tableau des positions sous les yeux, le découpage est mécanique.
- Une suite de vérifications qui **sortent** au premier problème (`if ... : erreur = ... ; return`) évite les `if`/`elif` imbriqués à répétition : c'est plus facile à lire, et plus facile à compléter d'un cas de plus.
- `dictionnaire.get(clé, valeur_par_défaut)` évite un plantage quand la clé peut être absente, ce que `dictionnaire[clé]` ne pardonne pas.
- Toutes les fonctions de ce projet sont **sans état** : rien n'est `global`, parce que chaque décodage est indépendant du précédent. Compare avec le [compteur](compteur.md), où `global` était indispensable : la différence, c'est qu'ici rien n'a besoin d'être **retenu** d'un clic à l'autre.

!!! question "Pour aller plus loin"
    1. Ajoute un bouton **Effacer** qui vide le champ et tous les résultats.
    2. `zfill` complète à gauche avec des zéros. Que se passe-t-il si un élève tape un numéro de 14 caractères en oubliant un zéro au milieu (par exemple le zéro du mois `03`) ? Le programme le détecte-t-il, ou affiche-t-il un résultat faux ? Que faudrait-il vérifier en plus ?
    3. Le numéro d'ordre est censé être unique pour un même mois et une même commune. Rien, dans ce programme, ne le vérifie : pourquoi, à ton avis, est-ce impossible à vérifier avec les seules données dont tu disposes ?
