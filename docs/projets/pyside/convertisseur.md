# Projet : un convertisseur

Premier vrai projet PySide6. On veut une petite application qui convertit une somme en **euros** vers son équivalent en **dollars**.

!!! tip "Pré-requis"
    Ce projet fait suite à [Additionner deux nombres](addition.md). On réutilise **exactement** le même mécanisme : une interface QML avec `objectName`, et un callback Python branché sur le clic d'un bouton. Rien de nouveau côté PySide6 : tout l'enjeu est de **transférer** ce que tu sais déjà à un nouveau problème.

## Cahier des charges

L'application doit :

1. proposer **un champ** où l'utilisateur saisit un montant en euros ;
2. proposer **un bouton** « Convertir en dollars » ;
3. afficher, dans **un label**, le montant correspondant en dollars quand on clique.

On utilise un taux de change fixe : **1 euro = 1,08 dollar**.

## L'interface

L'interface reprend la structure de l'addition, mais avec un seul champ. Crée `Main.qml` :

```qml title="Main.qml"
import QtQuick
import QtQuick.Controls
import QtQuick.Layouts

ApplicationWindow {
    visible: true
    width: 320
    height: 200
    title: "Convertisseur euros vers dollars"

    ColumnLayout {
        anchors.centerIn: parent
        spacing: 12

        TextField { objectName: "montant";  placeholderText: "Montant en euros" }
        Button    { objectName: "bouton";   text: "Convertir en dollars" }
        Label     { objectName: "resultat"; text: "Résultat : " }
    }
}
```

!!! question "Repérer les poignées"
    Avant de coder, réponds : quels composants Python devra-t-il **lire** ? **écrire** ? **écouter** ? Lesquels ont donc besoin d'un `objectName` ? (Compare avec l'addition : ici il n'y a qu'un seul champ à lire.)

## Le fichier Python

Crée `app.py`. Le squelette met en place l'application et récupère les composants ; le taux est rangé dans une constante. **À toi d'écrire le corps de `convertir`.**

```python title="app.py"
import sys
from PySide6.QtGui import QGuiApplication
from PySide6.QtQml import QQmlApplicationEngine

TAUX = 1.08  # 1 euro vaut 1.08 dollar

app = QGuiApplication(sys.argv)
engine = QQmlApplicationEngine()
engine.load("Main.qml")

fenetre  = engine.rootObjects()[0]
montant  = fenetre.findChild(object, "montant")
bouton   = fenetre.findChild(object, "bouton")
resultat = fenetre.findChild(object, "resultat")


def convertir():
    pass  # à compléter


bouton.clicked.connect(convertir)

sys.exit(app.exec())
```

## Étape 1 - Écrire la conversion

!!! question "Le callback `convertir`"
    C'est **le même mécanisme que `additionner`** : lire un champ, calculer, écrire dans le label. La seule différence est le calcul.

    1. Comment lit-on le texte du champ `montant` ? Comment le transforme-t-on en nombre ?
    2. Écris `convertir` : lire le montant en euros, le multiplier par `TAUX`, afficher le résultat dans le label.

    ```python
    def convertir():
        euros = float(montant.property("text"))
        dollars = ...
        resultat.setProperty("text", "Résultat : " + ... + " $")
    ```

    Teste avec 100 (tu dois lire 108.0 $), puis avec 50.

## Étape 2 - Vérifier le comportement

!!! question "Observer"
    1. Saisis un montant, clique. Puis change le montant et reclique. Le résultat se met-il à jour à chaque clic ? Qui appelle `convertir` à chaque fois ?
    2. Le label affiche `108.0 $`. Comment obtenir un affichage arrondi à deux décimales, par exemple `108.00 $` ? (indice : `round(dollars, 2)`, ou une f-string `f"{dollars:.2f}"`.)

## Étape 3 - Convertir dans les deux sens

On ajoute une nouveauté, **une seule** : convertir aussi des dollars vers des euros.

!!! question "Un deuxième bouton, un deuxième callback"
    1. Dans `Main.qml`, ajoute un bouton `objectName: "bouton2"`, texte « Convertir en euros ».
    2. Dans `app.py`, récupère-le avec `findChild`, écris une fonction `convertir_inverse` (diviser par `TAUX` cette fois), et connecte-la.
    3. Combien de callbacks ton application a-t-elle maintenant ? Chacun est-il branché sur son propre bouton ?

    Le champ `montant` sert alors pour les deux sens : le premier bouton le lit comme des euros, le second comme des dollars.

## Ce qu'on retient

- Un nouveau projet ne veut pas dire un nouveau mécanisme : ici, on a **transféré** le schéma « champ → bouton → callback → label » de l'addition à une conversion.
- Le calcul change, la structure reste identique.
- Ajouter une fonctionnalité, c'est souvent ajouter **un composant, un callback, un `connect`**.

!!! question "Pour aller plus loin"
    1. Remplace la conversion de devises par une conversion de **températures** : degrés Celsius vers Fahrenheit (`F = C * 9/5 + 32`). Qu'est-ce qui change dans le code ? Qu'est-ce qui reste pareil ?
    2. Que se passe-t-il si l'utilisateur clique sans avoir rien saisi ? Protège le callback pour afficher « Entre un montant » au lieu de planter.
    3. Ajoute un composant `ComboBox` (menu déroulant) pour choisir la devise de destination (dollars, livres, yens) avec un taux différent selon le choix. Cherche `ComboBox` dans la documentation Qt Quick Controls pour savoir comment lire l'option sélectionnée.
