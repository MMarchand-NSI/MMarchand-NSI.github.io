# Projet : un compteur

On veut une application qui affiche un nombre, avec des boutons pour l'augmenter, le diminuer, et le remettre à zéro. Un « compteur de clics ».

!!! tip "Pré-requis"
    Ce projet fait suite à [Additionner deux nombres](addition.md) et au [convertisseur](convertisseur.md). La nouveauté, une seule, est importante : cette fois, l'application doit **se souvenir** d'une valeur entre deux clics.

## Cahier des charges

L'application doit :

1. afficher un nombre, qui vaut **0** au démarrage ;
2. un bouton **+1** qui augmente le nombre de 1 ;
3. un bouton **-1** qui le diminue de 1 ;
4. un bouton **Remise à zéro** qui le remet à 0.

À chaque clic, l'affichage se met à jour.

## Le problème nouveau : se souvenir entre deux clics

Dans l'addition et le convertisseur, chaque clic était **indépendant** : on lisait un champ, on calculait, on affichait. Le programme n'avait rien à retenir d'un clic à l'autre.

Ici, c'est différent. Quand on clique sur **+1**, le résultat dépend de **ce que valait le compteur avant**. L'application doit donc **conserver** la valeur du compteur entre les clics.

!!! question "Où vivrait cette valeur ?"
    Réfléchis avant de lire la suite.

    1. Le programme Python ne s'arrête pas : la ligne `app.exec()` tourne en boucle et attend les clics. Une variable Python créée avant cette ligne survit-elle pendant toute cette attente ?
    2. On va donc ranger le compteur dans une **variable Python**, définie une fois au démarrage. Chaque callback la modifiera.

## L'interface

Un label pour afficher le compteur, trois boutons. Crée `Main.qml` :

```qml title="Main.qml"
import QtQuick
import QtQuick.Controls
import QtQuick.Layouts

ApplicationWindow {
    visible: true
    width: 300
    height: 240
    title: "Compteur"

    ColumnLayout {
        anchors.centerIn: parent
        spacing: 12

        Label {
            objectName: "affichage"
            text: "Compteur : 0"
            font.pixelSize: 28
            Layout.alignment: Qt.AlignHCenter
        }
        Button { objectName: "plus";  text: "+1" }
        Button { objectName: "moins"; text: "-1" }
        Button { objectName: "reset"; text: "Remise à zéro" }
    }
}
```

## Le fichier Python

Crée `app.py`. Le compteur est une variable définie **avant** `app.exec()`, donc elle vit pendant toute la durée de l'application.

Remarque une petite fonction `afficher` : plutôt que de répéter la même ligne de mise à jour du label dans les trois callbacks, on l'écrit une seule fois.

```python title="app.py"
import sys
from PySide6.QtGui import QGuiApplication
from PySide6.QtQml import QQmlApplicationEngine

app = QGuiApplication(sys.argv)
engine = QQmlApplicationEngine()
engine.load("Main.qml")

fenetre   = engine.rootObjects()[0]
affichage = fenetre.findChild(object, "affichage")
plus      = fenetre.findChild(object, "plus")
moins     = fenetre.findChild(object, "moins")
reset     = fenetre.findChild(object, "reset")

compteur = 0


def afficher():
    affichage.setProperty("text", "Compteur : " + str(compteur))


def incrementer():
    pass  # à compléter


plus.clicked.connect(incrementer)
afficher()

sys.exit(app.exec())
```

## Étape 1 - Le bouton +1, et le piège du `global`

!!! question "Prédire l'erreur"
    On veut que `incrementer` augmente le compteur de 1, puis rafraîchisse l'affichage. Un élève écrit :

    ```python
    def incrementer():
        compteur = compteur + 1
        afficher()
    ```

    1. **Prédis** : que va-t-il se passer au premier clic ? Lance et observe.
    2. Python affiche une erreur du type *local variable 'compteur' referenced before assignment*. Pourquoi ? Quand une fonction **affecte** une variable (`compteur = ...`), Python la considère comme **locale** à la fonction, sauf indication contraire. Elle n'a alors aucune valeur de départ.

!!! question "Corriger avec `global`"
    Pour dire à Python « ce `compteur`, c'est celui de l'extérieur, pas une nouvelle variable locale », on ajoute `global compteur` en première ligne de la fonction :

    ```python
    def incrementer():
        global compteur
        compteur = compteur + 1
        afficher()
    ```

    Lance et clique plusieurs fois sur **+1**. Le compteur augmente-t-il et **retient-il** sa valeur d'un clic à l'autre ?

!!! note "Lire ne demande pas `global`, écrire oui"
    Regarde la fonction `afficher` : elle **lit** `compteur` (`str(compteur)`) mais ne le modifie pas. Elle n'a donc **pas** besoin de `global`. Seule une fonction qui **affecte** la variable (comme `incrementer`) en a besoin.

## Étape 2 - Les deux autres boutons

!!! question "-1 et remise à zéro"
    Sur le modèle de `incrementer`, écris :

    1. `decrementer` : diminue le compteur de 1, puis appelle `afficher`. Connecte-la au bouton `moins`.
    2. `remise_a_zero` : remet le compteur à 0, puis appelle `afficher`. Connecte-la au bouton `reset`.

    N'oublie pas les `.clicked.connect(...)` pour ces deux nouveaux boutons.

## Ce qu'on retient

- Une variable définie **avant** `app.exec()` **survit** pendant toute la durée de l'application : c'est là qu'on range ce dont l'appli doit se souvenir (ici, le compteur).
- Un callback qui **modifie** cette variable doit la déclarer `global`. Un callback qui la **lit** seulement n'en a pas besoin.
- Factoriser la mise à jour de l'affichage dans une fonction (`afficher`) évite de répéter le même code dans chaque callback.

!!! question "Pour aller plus loin"
    1. Empêche le compteur de descendre en dessous de 0 : dans `decrementer`, ne diminue que si `compteur > 0`.
    2. Ajoute un bouton **+5**.
    3. Change la couleur du label selon le signe : vert si positif, rouge si négatif, noir si nul (indice : la propriété `color` du label, modifiée avec `setProperty("color", "...")` dans `afficher`).
    4. Affiche aussi, dans le titre de la fenêtre, le nombre total de clics effectués depuis le lancement (tous boutons confondus). De quelle nouvelle variable as-tu besoin ?
