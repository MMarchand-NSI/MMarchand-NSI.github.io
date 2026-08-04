# Projet de synthèse : le Pokédex

On veut une fiche de pokémon qui affiche son nom, ses types et ses six statistiques, qu'on peut faire défiler avec deux boutons, et dans laquelle on peut chercher un pokémon par son numéro ou par le début de son nom.

C'est le projet le plus complet de la séquence PySide6 : il réunit tout ce que les projets précédents ont installé séparément (un callback simple, un état qui persiste entre deux clics, une comparaison qui déclenche un comportement différent) et y ajoute une vraie **table de données**, au sens du programme.

!!! tip "Pré-requis"
    Ce projet fait suite à [Additionner deux nombres](addition.md), au [convertisseur](convertisseur.md), au [compteur](compteur.md) et à [Devine le nombre](devine-nombre.md). Il suppose en plus le chapitre **Types construits** terminé (listes, dictionnaires) : chaque pokémon y est un dictionnaire, et le pokédex entier une liste de ces dictionnaires.

    **Ce projet se fait en binôme.** Il est volontairement assez gros pour qu'une seule personne ait du mal à le porter seule dans le temps imparti : c'est voulu, pas un défaut.

## Cahier des charges

L'application doit :

1. afficher, au démarrage, la fiche du **premier** pokémon de la table : son numéro, son nom, son ou ses types (colorés), ses six statistiques (PV, attaque, défense, attaque spéciale, défense spéciale, vitesse) ;
2. un bouton **Suivant** qui passe au pokémon suivant, et **reboucle** au premier après le dernier ;
3. un bouton **Précédent** qui fait l'inverse, et reboucle au dernier avant le premier ;
4. un champ de recherche et un bouton **Chercher** : si le texte tapé correspond au **numéro exact** d'un pokémon ou au **début de son nom** (sans tenir compte des majuscules), la fiche affichée devient la sienne ; sinon, rien ne change ;
5. un champ de recherche laissé **vide** ne doit rien déclencher.

## Travailler en binôme : qui fait quoi

Le projet se scinde en **deux responsabilités**, séparées par une frontière nette : l'**affichage et la navigation** d'un côté, la **recherche** de l'autre. C'est la même séparation entre logique et affichage que vous pratiquez depuis [Découverte de PySide6](intro-pyside.md) (QML pour l'un, Python pour l'autre), pas un découpage arbitraire.

| | Rôle A | Rôle B |
|---|---|---|
| **Écrit** | `afficher`, `suivant`, `precedent` | `trouver_index`, `rechercher` |
| **Transfert depuis** | le [compteur](compteur.md) (état persistant, `global`) | les exercices de recherche dans une séquence (`boucle-for.md`) |
| **Particularité** | touche l'interface à chaque appel | `trouver_index` se teste **seul, sans lancer l'application** |

**Déroulé, à une seule machine, rôles nommés :**

1. **Rôle A pilote**, Rôle B copilote (relit chaque ligne à voix haute avant qu'elle soit validée, vérifie contre le cahier des charges) : écrire `afficher`, puis `suivant` et `precedent`. Testable immédiatement.
2. **On échange.** Rôle B pilote, Rôle A copilote : écrire `trouver_index`, puis `rechercher`.
3. **Intégration à deux** : relancer l'application, tester ensemble tous les cas du cahier des charges, y compris ceux qui ne doivent **rien** changer (recherche vide, recherche sans résultat).
4. **Vérification individuelle** (section tout en bas) : chacun, **seul**, sans son binôme.

Sans **rotation**, sans **responsabilité individuelle** clairement nommée et sans **vérification finale**, un binôme produit de la coordination coûteuse, pas de l'apprentissage : c'est le risque de tout travail de groupe, et c'est pour ça que les trois règles ci-dessus ne sont pas optionnelles.

## Les données : le pokédex est une table

Le fichier [pokedex.csv](pokedex.csv) contient 151 lignes, une par pokémon :

```
numero,nom,type1,type2,pv,attaque,defense,attaque_spe,defense_spe,vitesse,generation
1,Bulbizarre,Plante,Poison,45,49,49,65,65,45,1
2,Herbizarre,Plante,Poison,60,62,63,80,80,60,1
3,Florizarre,Plante,Poison,80,82,83,100,100,80,1
4,Salamèche,Feu,,39,52,43,60,50,65,1
```

Remarque la ligne de Salamèche : sa colonne `type2` est **vide**, parce qu'il n'a qu'un seul type. C'est un cas à gérer dans `afficher`.

Le module `csv`, avec sa fonction `DictReader`, n'a pas encore été vu en cours : il est donc **fourni**, dans le squelette ci-dessous. Ce qu'il faut savoir suffit en une phrase : `csv.DictReader` lit un fichier CSV et renvoie, pour chaque ligne, un **dictionnaire** dont les clés sont les noms de colonnes. Après la ligne fournie, `pokedex` est donc une **liste de dictionnaires**, et `pokedex[0]` vaut :

```python
{"numero": "1", "nom": "Bulbizarre", "type1": "Plante", "type2": "Poison",
 "pv": "45", "attaque": "49", "defense": "49", "attaque_spe": "65",
 "defense_spe": "65", "vitesse": "45", "generation": "1"}
```

!!! warning "Toutes les valeurs sont des chaînes"
    `csv.DictReader` ne devine pas les types : `pokedex[0]["pv"]` vaut la **chaîne** `"45"`, pas l'entier `45`. Il faudra convertir avec `int(...)` avant de s'en servir comme nombre, exactement comme pour un champ de saisie dans les projets précédents.

## L'interface : le QML est fourni intégralement

Contrairement à la partie 1, tu n'as **rien à modifier** dans ce fichier. Il faut cependant le **lire** : c'est lui qui fixe le nom de chaque composant, donc le nom que le Python devra utiliser pour le retrouver avec `findChild`.

[Télécharger pokedex.qml](pokedex.qml)

```qml title="pokedex.qml"
import QtQuick
import QtQuick.Controls
import QtQuick.Layouts

ApplicationWindow {
    id: fenetre
    visible: true
    width: 460
    height: 660
    title: "Pokédex"

    // Composant réutilisable : une ligne de statistique avec barre animée
    component StatLigne: RowLayout {
        id: ligne
        property string libelle: ""
        property color couleur: "#78C850"
        property int valeur: 0
        property int maxi: 255
        Layout.fillWidth: true
        spacing: 8

        Label {
            text: ligne.libelle
            color: "#333"; font.pixelSize: 13
            Layout.preferredWidth: 80
        }
        Rectangle {
            id: fond
            Layout.fillWidth: true
            height: 18; radius: 9; color: "#e3e3e3"
            Rectangle {
                height: parent.height; radius: 9; color: ligne.couleur
                width: fond.width * ligne.valeur / ligne.maxi
                Behavior on width { NumberAnimation { duration: 450; easing.type: Easing.OutCubic } }
            }
        }
        Label {
            text: ligne.valeur
            color: "#333"; font.pixelSize: 13
            Layout.preferredWidth: 34
            horizontalAlignment: Text.AlignRight
        }
    }

    // Fond en dégradé
    Rectangle {
        anchors.fill: parent
        gradient: Gradient {
            GradientStop { position: 0.0; color: "#2b5876" }
            GradientStop { position: 1.0; color: "#4e4376" }
        }
    }

    ColumnLayout {
        anchors.fill: parent
        anchors.margins: 18
        spacing: 12

        // Recherche
        RowLayout {
            Layout.fillWidth: true
            TextField {
                objectName: "recherche"
                Layout.fillWidth: true
                placeholderText: "Numéro ou nom..."
            }
            Button { objectName: "btn_rechercher"; text: "Chercher" }
        }

        // Carte
        Rectangle {
            Layout.fillWidth: true
            Layout.fillHeight: true
            radius: 20
            color: "#f7f7f7"

            ColumnLayout {
                anchors.fill: parent
                anchors.margins: 18
                spacing: 8

                Label { objectName: "numero"; text: "N°000"; color: "#999"; font.pixelSize: 15; Layout.alignment: Qt.AlignHCenter }
                Label { objectName: "nom"; text: "?"; color: "#222"; font.pixelSize: 30; font.bold: true; Layout.alignment: Qt.AlignHCenter }

                Image {
                    objectName: "sprite"
                    source: ""
                    Layout.alignment: Qt.AlignHCenter
                    Layout.preferredWidth: 180
                    Layout.preferredHeight: 180
                    fillMode: Image.PreserveAspectFit
                    smooth: false
                }

                // Badges de type
                RowLayout {
                    Layout.alignment: Qt.AlignHCenter
                    spacing: 8
                    Rectangle {
                        objectName: "badge1"; radius: 13; color: "#999"
                        implicitWidth: t1.implicitWidth + 26; implicitHeight: 28
                        Label { objectName: "badge1_txt"; id: t1; anchors.centerIn: parent; text: ""; color: "white"; font.bold: true; font.pixelSize: 13 }
                    }
                    Rectangle {
                        objectName: "badge2"; radius: 13; color: "#999"; visible: false
                        implicitWidth: t2.implicitWidth + 26; implicitHeight: 28
                        Label { objectName: "badge2_txt"; id: t2; anchors.centerIn: parent; text: ""; color: "white"; font.bold: true; font.pixelSize: 13 }
                    }
                }

                Item { Layout.preferredHeight: 6 }

                // Statistiques (barres animées)
                StatLigne { objectName: "stat_pv";  libelle: "PV";          couleur: "#78C850" }
                StatLigne { objectName: "stat_atk"; libelle: "Attaque";     couleur: "#F08030" }
                StatLigne { objectName: "stat_def"; libelle: "Défense";     couleur: "#F8D030" }
                StatLigne { objectName: "stat_ats"; libelle: "Atq. Spé.";   couleur: "#6890F0" }
                StatLigne { objectName: "stat_dfs"; libelle: "Déf. Spé.";   couleur: "#78C850" }
                StatLigne { objectName: "stat_vit"; libelle: "Vitesse";     couleur: "#F85888" }

                Item { Layout.fillHeight: true }
            }
        }

        // Navigation
        RowLayout {
            Layout.fillWidth: true
            spacing: 10
            Button { objectName: "btn_prec"; text: "◀ Précédent"; Layout.fillWidth: true }
            Button { objectName: "btn_suiv"; text: "Suivant ▶"; Layout.fillWidth: true }
        }
    }
}
```

!!! question "Lire avant d'écrire : repérer les poignées"
    Réponds sans écrire de Python, juste en lisant le QML ci-dessus.

    1. Combien de composants portent un `objectName` ? Fais-en la liste.
    2. `StatLigne` a une propriété `valeur`. Sur `stat_pv`, comment appelle-t-on, **depuis Python**, la mise à jour de cette propriété ? (repense à `.setProperty(...)` des projets précédents)
    3. `badge2` a `visible: false` par défaut. À ton avis, pourquoi ? Quel pokémon de l'extrait CSV plus haut aurait besoin que `badge2` reste invisible ?

    ??? success "Réponse"
        1. Dix-sept : `recherche`, `btn_rechercher`, `numero`, `nom`, `sprite`, `badge1`, `badge1_txt`, `badge2`, `badge2_txt`, `stat_pv`, `stat_atk`, `stat_def`, `stat_ats`, `stat_dfs`, `stat_vit`, `btn_prec`, `btn_suiv`. Les six `StatLigne` comptent chacune pour un seul `objectName`, même si chacune contient plusieurs `Label` et `Rectangle` internes sans étiquette.
        2. `stat_pv.setProperty("valeur", ...)`.
        3. Un pokémon **mono-type** n'a rien à afficher dans le second badge. Salamèche, dans l'extrait CSV, a un `type2` vide : c'est exactement ce cas.

## Le squelette Python

Crée `app.py`, à côté de `pokedex.qml` et de `pokedex.csv` téléchargés plus haut. Tout ce qui n'est **pas** dans vos deux responsabilités est déjà écrit : chargement de la table, repérage des composants, couleurs des types.

```python title="app.py"
import sys
import csv
from PySide6.QtGui import QGuiApplication
from PySide6.QtQml import QQmlApplicationEngine

app = QGuiApplication(sys.argv)
engine = QQmlApplicationEngine()
engine.load("pokedex.qml")
fenetre = engine.rootObjects()[0]

with open("pokedex.csv", encoding="utf-8") as f:
    pokedex = list(csv.DictReader(f))

COULEUR_TYPE = {
    "Normal": "#A8A878", "Combat": "#C03028", "Vol": "#A890F0", "Poison": "#A040A0",
    "Sol": "#E0C068", "Roche": "#B8A038", "Insecte": "#A8B820", "Spectre": "#705898",
    "Acier": "#B8B8D0", "Feu": "#F08030", "Eau": "#6890F0", "Plante": "#78C850",
    "Électrik": "#F8D030", "Psy": "#F85888", "Glace": "#98D8D8", "Dragon": "#7038F8",
    "Ténèbres": "#705848", "Fée": "#EE99AC",
}
SPRITE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{}.png"

numero     = fenetre.findChild(object, "numero")
nom        = fenetre.findChild(object, "nom")
sprite     = fenetre.findChild(object, "sprite")
badge1     = fenetre.findChild(object, "badge1")
badge1_txt = fenetre.findChild(object, "badge1_txt")
badge2     = fenetre.findChild(object, "badge2")
badge2_txt = fenetre.findChild(object, "badge2_txt")
recherche  = fenetre.findChild(object, "recherche")
btn_prec   = fenetre.findChild(object, "btn_prec")
btn_suiv   = fenetre.findChild(object, "btn_suiv")
btn_rechercher = fenetre.findChild(object, "btn_rechercher")

barres = {
    "pv":  fenetre.findChild(object, "stat_pv"),
    "atk": fenetre.findChild(object, "stat_atk"),
    "def": fenetre.findChild(object, "stat_def"),
    "ats": fenetre.findChild(object, "stat_ats"),
    "dfs": fenetre.findChild(object, "stat_dfs"),
    "vit": fenetre.findChild(object, "stat_vit"),
}

index = 0


# --- Rôle A : affichage et navigation ---------------------------------------

def afficher() -> None:
    """Affiche le pokémon d'indice `index` sur la fiche."""
    pass  # à compléter


def suivant() -> None:
    """Passe au pokémon suivant (callback du bouton Suivant)."""
    pass  # à compléter


def precedent() -> None:
    """Passe au pokémon précédent (callback du bouton Précédent)."""
    pass  # à compléter


# --- Rôle B : recherche ------------------------------------------------------

def trouver_index(requete: str) -> int | None:
    """Cherche un pokémon par numéro exact ou par début de nom (insensible à la casse).

    Renvoie son indice dans `pokedex`, ou None si rien ne correspond.

    >>> trouver_index("4")
    3
    >>> trouver_index("saLA")
    3
    >>> trouver_index("zzzzz")
    """
    pass  # à compléter


def rechercher() -> None:
    """Callback du bouton Chercher : lit le champ recherche, saute au pokémon trouvé."""
    pass  # à compléter


btn_suiv.clicked.connect(suivant)
btn_prec.clicked.connect(precedent)
btn_rechercher.clicked.connect(rechercher)

afficher()

if __name__ == "__main__":
    import doctest
    doctest.testmod()
    sys.exit(app.exec())
```

!!! note "`if __name__ == \"__main__\":` en bas du fichier"
    Ce bloc lance les doctests de `trouver_index` **avant** d'ouvrir la fenêtre. C'est pratique pour le rôle B (étape 3) : on peut vérifier `trouver_index` sans jamais lancer l'interface graphique.

## Étape 1 (Rôle A pilote) - `afficher`

!!! question "Écrire `afficher`"
    Complète `afficher` pour qu'elle mette à jour, à partir de `p = pokedex[index]` :

    1. `numero` et `nom` (texte simple, comme dans les projets précédents) ;
    2. `sprite`, avec `SPRITE.format(p["numero"])` comme `source` ;
    3. `badge1` (couleur et texte) **toujours** ;
    4. `badge2` **seulement si** `p["type2"]` n'est pas vide (sinon, `badge2.setProperty("visible", False)`) ;
    5. les six barres de `barres`, en convertissant chaque statistique avec `int(...)`.

    ??? tip "Pour la couleur d'un type"
        `COULEUR_TYPE.get(p["type1"], "#999999")` : si le type n'est pas dans le dictionnaire, un gris par défaut plutôt qu'une erreur.

    ??? success "Solution"
        ```python
        def afficher() -> None:
            """Affiche le pokémon d'indice `index` sur la fiche."""
            p = pokedex[index]
            numero.setProperty("text", "N°" + p["numero"].zfill(3))
            nom.setProperty("text", p["nom"])
            sprite.setProperty("source", SPRITE.format(p["numero"]))

            badge1_txt.setProperty("text", p["type1"])
            badge1.setProperty("color", COULEUR_TYPE.get(p["type1"], "#999999"))
            if p["type2"]:
                badge2_txt.setProperty("text", p["type2"])
                badge2.setProperty("color", COULEUR_TYPE.get(p["type2"], "#999999"))
                badge2.setProperty("visible", True)
            else:
                badge2.setProperty("visible", False)

            barres["pv"].setProperty("valeur", int(p["pv"]))
            barres["atk"].setProperty("valeur", int(p["attaque"]))
            barres["def"].setProperty("valeur", int(p["defense"]))
            barres["ats"].setProperty("valeur", int(p["attaque_spe"]))
            barres["dfs"].setProperty("valeur", int(p["defense_spe"]))
            barres["vit"].setProperty("valeur", int(p["vitesse"]))
        ```
        `zfill(3)` complète avec des zéros à gauche jusqu'à 3 caractères : `"1"` devient `"001"`. C'est une méthode de chaîne, pas une nouveauté conceptuelle.

    Le squelette appelle déjà `afficher()` juste avant `sys.exit(app.exec())` : lance, et vérifie que la fiche de Bulbizarre s'affiche complètement dès l'ouverture.

## Étape 2 (Rôle A pilote) - `suivant` et `precedent`

!!! question "Naviguer, avec bouclage"
    Transfert direct du [compteur](compteur.md) : une variable globale, modifiée puis suivie d'un rafraîchissement. La seule nouveauté est le **bouclage** : après le dernier pokémon, `suivant` doit revenir au premier.

    ??? tip "L'opérateur qui boucle"
        `(index + 1) % len(pokedex)` : le reste de la division par la longueur de la liste revient toujours à 0 juste après avoir atteint la fin. Tu as déjà rencontré `%` pour tester la parité ; ici, il sert à **boucler**.

    ??? success "Solution"
        ```python
        def suivant() -> None:
            """Passe au pokémon suivant (callback du bouton Suivant)."""
            global index
            index = (index + 1) % len(pokedex)
            afficher()


        def precedent() -> None:
            """Passe au pokémon précédent (callback du bouton Précédent)."""
            global index
            index = (index - 1) % len(pokedex)
            afficher()
        ```
        En Python, `%` sur un résultat négatif reste **positif** (contrairement à d'autres langages) : `(0 - 1) % 151` vaut `150`, pas `-1`. C'est ce qui fait boucler `precedent` vers le **dernier** pokémon sans code particulier.

    Teste : lance l'application, clique sur **Précédent** dès le démarrage (encore sur Bulbizarre). Le pokédex doit boucler sur le **dernier** pokémon de la table, pas planter.

## On échange les rôles

Rôle B prend le clavier. Rôle A copilote : relit chaque ligne avant qu'elle soit validée, vérifie contre le cahier des charges.

## Étape 3 (Rôle B pilote) - `trouver_index`, testable seule

!!! question "Une fonction pure, sans PySide6"
    `trouver_index` ne touche à **aucun** composant graphique : elle prend une chaîne, renvoie un indice ou `None`. C'est volontaire : tu peux l'écrire et la tester **sans jamais lancer l'application**, juste en exécutant le fichier (les doctests tournent avant `app.exec()`).

    Complète `trouver_index` : parcours `pokedex`, et renvoie l'indice de la **première** ligne dont le `numero` est **exactement** égal à la requête, ou dont le `nom`, mis en minuscules, **commence** par la requête (déjà mise en minuscules).

    ??? tip "Indice"
        Reprends le motif de `plus_petite_lettre` ([boucle-for.md](../../premiere/prog/boucle-for.md)) : un parcours par indice avec `enumerate`, et un `return` **dès qu'on trouve**, plutôt qu'un accumulateur. Si la boucle se termine sans avoir renvoyé, il faut renvoyer `None`.

    ??? success "Solution"
        ```python
        def trouver_index(requete: str) -> int | None:
            """Cherche un pokémon par numéro exact ou par début de nom (insensible à la casse).

            Renvoie son indice dans `pokedex`, ou None si rien ne correspond.

            >>> trouver_index("4")
            3
            >>> trouver_index("saLA")
            3
            >>> trouver_index("zzzzz")
            """
            q = requete.strip().lower()
            for i, p in enumerate(pokedex):
                if q == p["numero"] or p["nom"].lower().startswith(q):
                    return i
            return None
        ```

    Lance le fichier **sans cliquer sur rien** et regarde la console : si les trois doctests passent, `trouver_index` est correcte, avant même d'avoir touché à l'interface.

## Étape 4 (Rôle B pilote) - `rechercher`, le pont vers `afficher`

!!! question "Le callback du bouton Chercher"
    `rechercher` doit : lire le champ `recherche` ; **ne rien faire** s'il est vide (relis le cahier des charges, point 5) ; sinon appeler `trouver_index` ; si un indice est trouvé, mettre à jour `index` (avec `global`) et appeler `afficher`.

    !!! danger "La frontière avec le travail de Rôle A"
        `rechercher` **appelle** `afficher`, écrite par Rôle A. C'est le seul endroit du fichier où votre code se touche directement. Si `afficher` n'est pas encore terminée, teste `trouver_index` seule (étape 3) en attendant.

    ??? success "Solution"
        ```python
        def rechercher() -> None:
            """Callback du bouton Chercher : lit le champ recherche, saute au pokémon trouvé."""
            global index
            q = recherche.property("text")
            if q.strip() == "":
                return
            i = trouver_index(q)
            if i is not None:
                index = i
                afficher()
        ```
        Remarque ce que `rechercher` fait et que `trouver_index` ne fait **pas** : décider quoi faire du résultat (rien si vide, rien si `None`, sinon changer `index` et rafraîchir). `trouver_index` se contente de répondre à la question qu'on lui pose ; c'est `rechercher` qui décide.

## Intégration : tout brancher, et tester à deux

Les trois `.clicked.connect(...)` sont déjà dans le squelette fourni : il n'y a rien à ajouter ici, seulement à vérifier que les noms de fonctions correspondent à ce que vous avez écrit.

!!! question "Test croisé, à deux, sur la machine"
    Reprenez le cahier des charges point par point, **à voix haute**, chacun votre tour :

    1. Bulbizarre s'affiche au démarrage, fiche complète.
    2. `Suivant` × 151 revient sur Bulbizarre.
    3. `Précédent` depuis Bulbizarre affiche le dernier pokémon (Mew, n°151).
    4. Chercher `"25"` affiche Pikachu (ou vérifie avec un numéro de ta table).
    5. Chercher `"drac"` (en majuscules ou minuscules, peu importe) affiche un pokémon dont le nom commence par ces lettres.
    6. Chercher `"zzzzz"` : rien ne change.
    7. Chercher, champ **vide** : rien ne change.

    Un point qui échoue dit **qui** doit corriger, d'après le tableau de responsabilités du début de page.

## Vérification individuelle

**Seul, sans ton binôme**, sur ton cahier :

1. Explique en une phrase ce que fait `global index` dans `suivant`, et pourquoi `trouver_index` n'a besoin d'aucun `global`.
2. `rechercher` teste `if q.strip() == ""` avant d'appeler `trouver_index`. Que se passerait-il si cette ligne n'existait pas, et qu'on cherchait avec un champ vide ? (repense à ce que renvoie `"".startswith("")`)
3. Si tu n'as écrit que `afficher`/`suivant`/`precedent` (ou l'inverse), explique en une phrase ce que fait la fonction que tu **n'as pas** écrite.

La troisième question compte plus que les deux autres : un binôme qui ne comprend, chacun, que sa moitié du fichier n'a pas fini l'exercice, même si l'application fonctionne.

## Ce qu'on retient

- Un projet **assez complexe** se découpe en responsabilités **séparées mais reliées** : ici, l'affichage/navigation d'un côté, la recherche de l'autre, reliées par `afficher()` et la variable `index`.
- Une fonction qui ne touche à **aucun** composant graphique (`trouver_index`) se teste seule, avec des doctests, sans lancer l'application. C'est souvent la partie la plus facile à mettre au point, précisément parce qu'elle est isolée.
- `%` ne sert pas qu'à tester la parité : il permet de **boucler** dans une séquence, y compris en arrière, sans code particulier pour le cas des bords.
- `csv.DictReader` transforme un fichier de données en une **liste de dictionnaires**, exactement la structure déjà manipulée sur des données écrites à la main.

!!! question "Pour aller plus loin"
    1. Ajoute un bouton **Favori** (une étoile) qui bascule un booléen pour le pokémon courant. Où ranger cette information, sachant qu'elle doit survivre à la navigation ? (indice : une structure indexée comme `pokedex`, mais séparée)
    2. La recherche ne trouve que le **premier** pokémon qui correspond. Modifie `rechercher` pour qu'un second clic, sur la même requête, propose le suivant qui correspond aussi.
    3. Trie `pokedex` par une statistique (par exemple la vitesse) avant de l'utiliser. Que se passe-t-il pour la recherche par numéro ? Faut-il changer `trouver_index` ?
