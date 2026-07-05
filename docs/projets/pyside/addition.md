# Additionner deux nombres : le premier callback

Dans la partie précédente, tu as construit l'**interface** d'une addition : deux champs, un bouton, un label. Mais si tu cliques sur le bouton, rien ne se passe. C'est normal : on n'avait décrit que l'apparence.

On va maintenant donner **vie** à ce bouton. C'est le rôle du fichier **Python** : décrire ce qui se passe quand on clique. Cette fonction déclenchée par un clic s'appelle un **callback**.

!!! tip "Pré-requis"
    Cette activité fait suite à [Découverte de PySide6](intro-pyside.md). On réutilise l'interface d'addition construite à la dernière étape, et les fonctions Python vues en cours.

## L'interface : donner un nom aux composants

Pour que le fichier Python puisse **parler** à un composant (lire un champ, changer un label), il faut d'abord pouvoir le **désigner**. On donne à chaque composant utile une étiquette : sa propriété `objectName`. C'est la **poignée** par laquelle Python va l'attraper pour agir dessus.

Seuls les composants sur lesquels on veut **agir** ont besoin d'une étiquette. Ici, les quatre : on lit les deux champs, on écoute le bouton, on écrit dans le label. Le `ColumnLayout`, lui, n'a pas d'`objectName` : il range les composants à l'écran, mais Python n'y touche jamais.

Reprends `Main.qml` et ajoute un `objectName` à chaque composant :

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

        TextField { objectName: "champ1"; placeholderText: "Premier nombre" }
        TextField { objectName: "champ2"; placeholderText: "Deuxième nombre" }
        Button    { objectName: "bouton"; text: "Additionner" }
        Label     { objectName: "resultat"; text: "Résultat : " }
    }
}
```

Le QML ne fait toujours **rien** : il décrit l'interface et pose des étiquettes. Toute la logique sera en Python.

## Le fichier Python

Crée un fichier `app.py` (il remplace le `launcher.py` de la partie 1, qui n'avait pas de logique). Voici le squelette complet :

```python title="app.py"
import sys
from PySide6.QtGui import QGuiApplication
from PySide6.QtQml import QQmlApplicationEngine

app = QGuiApplication(sys.argv)
engine = QQmlApplicationEngine()
engine.load("Main.qml")

# On récupère chaque composant grâce à son objectName
fenetre  = engine.rootObjects()[0]
champ1   = fenetre.findChild(object, "champ1")
champ2   = fenetre.findChild(object, "champ2")
bouton   = fenetre.findChild(object, "bouton")
resultat = fenetre.findChild(object, "resultat")


def additionner():
    pass  # à compléter


bouton.clicked.connect(additionner)

sys.exit(app.exec())
```

`findChild` va chercher dans l'interface le composant qui porte l'étiquette demandée. On a maintenant, côté Python, quatre variables (`champ1`, `champ2`, `bouton`, `resultat`) qui désignent les quatre composants de l'écran.

## La machine notionnelle : qui appelle `additionner`, et quand ?

C'est le point le plus important, et il est nouveau.

Jusqu'ici, un programme Python s'exécutait **de haut en bas**, ligne après ligne, puis s'arrêtait. Ici, ce n'est plus le cas. Regarde les deux dernières lignes :

| Ligne | Ce qu'elle fait |
|---|---|
| `bouton.clicked.connect(additionner)` | **Enregistre** `additionner` : « quand on cliquera sur le bouton, appelle cette fonction ». N'exécute rien tout de suite. |
| `app.exec()` | Lance la **boucle d'événements** : le programme ne s'arrête pas, il **attend**. À chaque clic, c'est lui qui appelle `additionner`. |

Autrement dit : **ce n'est pas ton code qui appelle `additionner`**. C'est PySide6 qui l'appelle, plus tard, à chaque clic, tant que la boucle `app.exec()` tourne.

!!! warning "Piège : `connect` ne lance pas la fonction"
    Sur la ligne `bouton.clicked.connect(additionner)`, remarque qu'il n'y a **pas de parenthèses** après `additionner`. On ne l'exécute pas : on la **donne** à PySide6, qui l'appellera au bon moment.

    Écrire `connect(additionner())` avec les parenthèses serait une erreur : ça exécuterait la fonction immédiatement, une seule fois, au lancement, au lieu de l'enregistrer pour les clics.

## Étape 1 - Lancer le squelette

!!! question "Observer"
    Lance `app.py`. La fenêtre s'ouvre.

    1. Clique sur le bouton. Que se passe-t-il ? Pourquoi ?
    2. Dans `additionner`, il y a écrit `pass`. Que veut dire `pass` en Python ?
    3. La fenêtre reste ouverte et réagit (le bouton s'enfonce). Quelle ligne du programme fait qu'il ne se ferme pas tout seul ?

## Étape 2 - Lire et écrire le texte d'un composant

Avant d'additionner, il faut savoir **lire** ce qu'il y a dans un champ et **écrire** dans le label. Deux opérations :

- **lire** le texte d'un composant : `champ1.property("text")` ;
- **écrire** le texte d'un composant : `resultat.setProperty("text", "...")`.

!!! question "Un premier callback qui fait quelque chose"
    Remplace le corps de `additionner` par une seule ligne, qui écrit un message dans le label :

    ```python
    def additionner():
        resultat.setProperty("text", "Tu as cliqué !")
    ```

    1. Lance et clique. Que montre le label ?
    2. Clique une deuxième fois. Le message change-t-il ? Est-ce normal ?
    3. Tu n'as jamais écrit `additionner()` dans ton code. Qui l'a donc appelée, et à quel moment ?

## Étape 3 - La vraie addition

Maintenant, la logique complète : lire les deux champs, les convertir en nombres, afficher la somme.

!!! question "Écrire `additionner`"
    Complète la fonction :

    ```python
    def additionner():
        a = float(champ1.property("text"))
        b = float(champ2.property("text"))
        resultat.setProperty("text", "Résultat : " + str(a + b))
    ```

    1. Pourquoi utilise-t-on `float(...)` autour de `champ1.property("text")` ? Que vaudrait `"12" + "30"` sans conversion ?
    2. Pourquoi faut-il `str(a + b)` pour construire le texte du label ?
    3. Teste avec 12 et 30. Puis avec 2.5 et 0.5.

## Étape 4 - Modifier le comportement

Le callback n'est qu'une fonction Python : on peut lui faire faire autre chose.

!!! question "Prédire, puis modifier"
    1. **Prédis** ce qu'affichera le label si tu remplaces `a + b` par `a * b` et le texte `"Résultat : "` par `"Produit : "`. Fais la modification et vérifie.
    2. Ajoute un **deuxième bouton** « Soustraire » dans `Main.qml` (avec `objectName: "bouton2"`), récupère-le en Python avec `findChild`, écris une fonction `soustraire`, et connecte-la. De combien de callbacks disposes-tu maintenant ?

## Ce qu'on retient

- Un **callback** est une fonction que **tu écris** mais que **PySide6 appelle** au bon moment (ici, à chaque clic).
- `connect` **enregistre** le callback (sans parenthèses), il ne l'exécute pas.
- `app.exec()` est une **boucle d'événements** : le programme attend et déclenche les callbacks, au lieu de se dérouler une fois de haut en bas.
- On **lit** un composant avec `.property("text")` et on **écrit** avec `.setProperty("text", ...)`.

!!! question "Pour aller plus loin"
    1. Que se passe-t-il si tu cliques sur « Additionner » alors qu'un champ est **vide** ? Le programme plante-t-il ? Où et pourquoi ?
    2. Protège ton callback : si un champ ne contient pas un nombre valide, affiche « Entre deux nombres » dans le label au lieu de planter (indice : `try` / `except`, ou un test avant la conversion).
    3. Ajoute un bouton « Effacer » qui vide les deux champs et remet le label à « Résultat : ».
