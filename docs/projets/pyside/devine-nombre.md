# Projet : devine le nombre

L'ordinateur choisit un nombre secret entre 1 et 100. À chaque proposition, il répond « trop grand » ou « trop petit », jusqu'à ce que le joueur trouve.

!!! tip "Pré-requis"
    Ce projet combine deux choses déjà vues : **lire un champ** (comme dans l'[addition](addition.md)) et **retenir une valeur entre les clics** (comme le [compteur](compteur.md), avec `global`). La nouveauté est le **choix entre plusieurs réponses** au clic, avec `if` / `elif` / `else`, et le tirage d'un nombre au hasard.

## Cahier des charges

L'application doit :

1. choisir au démarrage un **nombre secret** au hasard entre 1 et 100 ;
2. proposer un **champ** pour saisir un nombre et un bouton **Proposer** ;
3. à chaque proposition, afficher **« Trop petit »**, **« Trop grand »**, ou **« Gagné ! »** ;
4. compter le **nombre d'essais** ;
5. proposer un bouton **Nouvelle partie** qui retire un nombre secret et remet le compteur d'essais à zéro.

## Ce qui est réutilisé, ce qui est nouveau

- **Réutilisé** : lire le champ (`.property("text")` + `float`/`int`), et garder une valeur entre les clics dans une variable `global` (le nombre secret doit être **retenu**, exactement comme le compteur).
- **Nouveau** : au clic, la réponse **dépend d'une comparaison**. On choisit entre trois messages avec `if` / `elif` / `else`. Et le nombre secret est **tiré au hasard** avec `randint`.

## L'interface

Un label pour le message, un champ, deux boutons. Crée `Main.qml` :

```qml title="Main.qml"
import QtQuick
import QtQuick.Controls
import QtQuick.Layouts

ApplicationWindow {
    visible: true
    width: 340
    height: 240
    title: "Devine le nombre"

    ColumnLayout {
        anchors.centerIn: parent
        spacing: 12

        Label {
            objectName: "message"
            text: "À toi de deviner (1 à 100)"
            Layout.alignment: Qt.AlignHCenter
        }
        TextField { objectName: "proposition"; placeholderText: "Ton nombre" }
        Button    { objectName: "proposer"; text: "Proposer" }
        Button    { objectName: "rejouer";  text: "Nouvelle partie" }
    }
}
```

## Le fichier Python

Crée `app.py`. Le nombre secret et le nombre d'essais sont deux variables définies avant `app.exec()`, donc conservées pendant toute la partie. **À toi d'écrire le corps de `verifier`.**

```python title="app.py"
import sys
from random import randint
from PySide6.QtGui import QGuiApplication
from PySide6.QtQml import QQmlApplicationEngine

app = QGuiApplication(sys.argv)
engine = QQmlApplicationEngine()
engine.load("Main.qml")

fenetre     = engine.rootObjects()[0]
message     = fenetre.findChild(object, "message")
proposition = fenetre.findChild(object, "proposition")
proposer    = fenetre.findChild(object, "proposer")
rejouer     = fenetre.findChild(object, "rejouer")

secret = randint(1, 100)
nb_essais = 0


def verifier():
    global nb_essais
    essai = int(proposition.property("text"))
    nb_essais = nb_essais + 1
    pass  # à compléter : comparer essai et secret


def nouvelle_partie():
    global secret, nb_essais
    secret = randint(1, 100)
    nb_essais = 0
    message.setProperty("text", "À toi de deviner (1 à 100)")


proposer.clicked.connect(verifier)
rejouer.clicked.connect(nouvelle_partie)

sys.exit(app.exec())
```

!!! note "Un nombre secret au hasard"
    `randint(1, 100)` renvoie un entier au hasard entre 1 et 100 **inclus**. Il est tiré une fois au démarrage, et retenu dans `secret` pour toute la partie. C'est pour pouvoir le **retirer** que `nouvelle_partie` déclare `global secret`.

## Étape 1 - Comparer avec `if` / `elif` / `else`

!!! question "Écrire `verifier`"
    La proposition `essai` a déjà été lue et convertie. Il reste à la comparer au `secret` et à afficher le bon message :

    ```python
    def verifier():
        global nb_essais
        essai = int(proposition.property("text"))
        nb_essais = nb_essais + 1
        if essai < secret:
            message.setProperty("text", "Trop petit")
        elif essai > secret:
            message.setProperty("text", "...")
        else:
            message.setProperty("text", "Gagné en " + str(nb_essais) + " essais !")
    ```

    1. Complète le message du `elif`.
    2. Dans quel ordre les trois cas sont-ils testés ? Le cas « gagné » (`else`) peut-il être atteint si les deux premiers ne le sont pas ? Pourquoi ne teste-t-on pas `essai == secret` explicitement ?
    3. Teste : trouve le nombre en quelques essais. Le message change-t-il à chaque clic ?

## Étape 2 - Vérifier la mémoire de la partie

!!! question "Observer"
    1. Le nombre secret est tiré **une seule fois**, au lancement. Deux propositions successives sont-elles comparées au **même** secret ? Quelle ligne garantit qu'il ne change pas entre deux clics ?
    2. `nb_essais` augmente de 1 à chaque proposition. Pourquoi `verifier` a-t-il besoin de `global nb_essais` ? (repense au compteur.)
    3. Clique sur **Nouvelle partie**, puis propose à nouveau. Le compteur d'essais est-il bien reparti de zéro ?

## Ce qu'on retient

- Au clic, la réponse peut **dépendre d'une comparaison** : on choisit entre plusieurs messages avec `if` / `elif` / `else`.
- Ce projet ne mélange rien de neuf côté PySide6 : il **combine** la lecture d'un champ et la mémoire d'un état entre les clics, déjà vues séparément.
- `randint(a, b)` tire un entier au hasard entre `a` et `b` inclus ; on le range dans une variable pour le retenir toute la partie.

!!! question "Pour aller plus loin"
    1. Après une victoire, un nouveau clic sur « Proposer » continue de compter des essais. Empêche cela : si la partie est gagnée, ne fais rien tant qu'on n'a pas cliqué sur « Nouvelle partie » (indice : une variable booléenne `partie_finie`, comme le `flag_game_over` d'autres projets).
    2. Affiche le nombre d'essais en direct dans le titre de la fenêtre.
    3. Colore le message : rouge quand on est loin, vert quand on approche (par exemple selon `abs(essai - secret)`).
    4. Limite la partie à 10 essais : au 10ᵉ raté, affiche « Perdu ! Le nombre était … ».
