# Découverte de PySide6

PySide6 est une bibliothèque Python qui affiche de vraies fenêtres, avec des boutons, des champs de texte, des menus. C'est ce qu'on appelle une **interface graphique** (ou IHM, interface homme-machine).

Une application PySide6 est faite de **deux fichiers séparés** :

- un fichier **QML** qui décrit **l'interface** : quels composants, où, avec quelle apparence ;
- un fichier **Python** qui décrit **la logique** : ce qui se passe quand on clique.

Dans cette première partie, on ne touche qu'à **l'interface**. Aucune logique, aucun clic pour l'instant : l'objectif est d'apprendre à décrire une fenêtre en QML et de voir, à chaque modification du fichier, ce qui change à l'écran.

Installer PySide6 dans le terminal : `uv add pyside6`

## Les deux fichiers

Crée un dossier, ouvre-le dans VSCode, et crée ces **deux** fichiers.

Le premier, `launcher.py`, lance l'application. **Tu n'as pas à le modifier** dans cette partie : il ouvre simplement la fenêtre décrite dans `Main.qml`.

```python title="launcher.py"
import sys
from PySide6.QtGui import QGuiApplication
from PySide6.QtQml import QQmlApplicationEngine

app = QGuiApplication(sys.argv)
engine = QQmlApplicationEngine()
engine.load("Main.qml")
sys.exit(app.exec())
```

Le second, `Main.qml`, décrit l'interface. C'est **le seul fichier que tu vas modifier**. Pour commencer, une fenêtre vide :

```qml title="Main.qml"
import QtQuick
import QtQuick.Controls

ApplicationWindow {
    visible: true
    width: 400
    height: 300
    title: "Ma première fenêtre"
}
```

Lance le programme avec `launcher.py`. Une fenêtre vide de 400 par 300 pixels s'ouvre, avec le titre « Ma première fenêtre ».

!!! note "Comment lire le QML"
    Un composant s'écrit `Type { ... }`. Entre les accolades, on met ses **propriétés** sous la forme `nom: valeur`.

    Ici `ApplicationWindow` est la fenêtre. Ses propriétés `width`, `height` et `title` fixent sa taille et son titre. `visible: true` la rend visible (sans cette ligne, elle reste cachée).

## Étape 1 - Modifier la fenêtre

On commence par le plus simple : changer les propriétés qui existent déjà.

!!! question "Prédire, puis modifier"
    Sans rien lancer, réponds d'abord :

    1. Quelle propriété faut-il changer pour que la fenêtre s'appelle « Bonjour » ?
    2. Quelle(s) propriété(s) changer pour obtenir une fenêtre carrée de 500 pixels de côté ?

    Fais maintenant les deux modifications dans `Main.qml`, relance, et vérifie que l'écran correspond à ta prédiction.

!!! tip "La boucle à retenir"
    Modifier le fichier, relancer, observer l'écran. C'est tout le principe de cette partie : le fichier décrit, l'écran affiche. À chaque ligne du fichier correspond quelque chose à l'écran.

## Étape 2 - Un label et un bouton

Une fenêtre vide, c'est un peu triste. On va y placer deux composants : un **label** (un texte affiché) et un **bouton**.

Pour empiler des composants les uns sous les autres, on les met dans un `ColumnLayout` (une colonne). Remplace le contenu de `Main.qml` par :

```qml title="Main.qml"
import QtQuick
import QtQuick.Controls
import QtQuick.Layouts

ApplicationWindow {
    visible: true
    width: 400
    height: 300
    title: "Bouton et label"

    ColumnLayout {
        anchors.centerIn: parent
        spacing: 12

        Label {
            text: "Bonjour"
            font.pixelSize: 24
            color: "steelblue"
        }
        Button {
            text: "Clique-moi"
        }
    }
}
```

Lance et observe : un texte bleu et un bouton, empilés au centre.

!!! question "Lire et modifier"
    1. Le `Label` a trois propriétés. Laquelle règle le texte ? la taille ? la couleur ?
    2. Modifie le label pour qu'il affiche « Bienvenue » en rouge (`"red"`), taille 30.
    3. Change le texte du bouton pour « Valider ».
    4. `spacing: 12` sépare les composants. Que se passe-t-il avec `spacing: 40` ? avec `spacing: 0` ?

!!! question "Ajouter un composant"
    En t'inspirant du bloc `Button` existant, **ajoute un deuxième bouton** sous le premier, avec le texte « Annuler ».

    C'est le même bloc que le premier : on décrit un nouveau composant en réutilisant la même structure.

!!! warning "Le bouton ne fait rien, c'est normal"
    Si tu cliques sur le bouton, il s'enfonce mais rien ne se passe. À ce stade, on décrit seulement l'apparence. **Ce qui se passe au clic sera l'objet de la partie suivante.**

## Étape 3 - Un champ de saisie

Pour que l'utilisateur puisse **entrer** du texte, on utilise un `TextField`.

```qml title="Main.qml"
import QtQuick
import QtQuick.Controls
import QtQuick.Layouts

ApplicationWindow {
    visible: true
    width: 400
    height: 300
    title: "Saisie"

    ColumnLayout {
        anchors.centerIn: parent
        spacing: 12

        TextField {
            placeholderText: "Écris ton prénom"
        }
        Label {
            text: "Résultat : "
        }
    }
}
```

!!! question "Observer et compléter"
    1. Lance le programme et clique dans le champ. La propriété `placeholderText` sert à quoi, exactement ?
    2. Tape quelque chose dans le champ. Le label « Résultat : » change-t-il ? Pourquoi, à ton avis ?
    3. Ajoute un `Button` avec le texte « Envoyer » entre le champ et le label.

## Étape 4 - Composer une interface complète

On assemble maintenant tout ce qui précède pour construire l'interface d'une future petite application : **additionner deux nombres**. Il faudra deux champs, un bouton, et un label pour le résultat.

!!! question "À toi de décrire l'interface"
    À partir des blocs que tu as déjà manipulés (`TextField`, `Button`, `Label` dans un `ColumnLayout`), écris toi-même le `Main.qml` d'une interface contenant, de haut en bas :

    1. un champ avec `placeholderText: "Premier nombre"` ;
    2. un champ avec `placeholderText: "Deuxième nombre"` ;
    3. un bouton « Additionner » ;
    4. un label « Résultat : ».

    Tu n'écris que l'interface : rien ne se passera au clic pour l'instant. On lui donnera vie dans la partie suivante.

??? success "Vérifier sa solution"
    ```qml title="Main.qml"
    import QtQuick
    import QtQuick.Controls
    import QtQuick.Layouts

    ApplicationWindow {
        visible: true
        width: 320
        height: 240
        title: "Addition"

        ColumnLayout {
            anchors.centerIn: parent
            spacing: 12

            TextField { placeholderText: "Premier nombre" }
            TextField { placeholderText: "Deuxième nombre" }
            Button    { text: "Additionner" }
            Label     { text: "Résultat : " }
        }
    }
    ```

## Ce qu'on retient

- Une interface PySide6 se décrit en **QML**, séparément de la logique Python.
- Un composant s'écrit `Type { propriété: valeur }` ; on les empile dans un `ColumnLayout`.
- On construit une interface en **lisant, modifiant, puis composant** des blocs simples.
- Pour l'instant, rien ne réagit au clic. La question « que se passe-t-il quand on clique ? » est le sujet de la partie suivante.

!!! question "Pour aller plus loin"
    1. Cherche dans la documentation le composant `CheckBox` (une case à cocher) et ajoute-en une à ton interface.
    2. Essaie `RowLayout` à la place de `ColumnLayout`. Quelle différence à l'écran ?
    3. Change la couleur de fond de la fenêtre en ajoutant, dans `ApplicationWindow`, la propriété `color: "#F0F0F0"`.
