# Démineur

Le démineur est un classique des jeux de logique. Une grille dissimule des mines ; le joueur doit révéler toutes les cases sans mines en s'aidant des chiffres qui indiquent combien de mines se trouvent dans le voisinage immédiat de chaque case. Un clic droit permet de poser un drapeau pour marquer une mine supposée.

!!! tip "Pré-requis"
    Cette activité fait suite à l'activité sur le voisinage. On réutilise les mêmes notions : grille `(i, j)`, déplacements `(di, dj)`, vérification des bords, voisinage à 8.

    Installez la bibliothèque : `uv add metagrid`

    Sur Debian/Ubuntu, des dépendances systèmes sont nécessaires :
    ```
    sudo apt install libgl1 libxrender1 libx11-6
    ```

## Code à compléter

Copiez ce fichier dans votre éditeur et complétez les `...` en suivant les étapes ci-dessous.

```python
import metagrid
from metagrid import AbstractEngine
from random import randint

HAUTEUR  = 10
LARGEUR  = 10
NB_MINES = 10


#? STRUCTURE DE CELLULE

class Cellule:
    est_mine: bool
    nb_voisins: int
    revelee: bool
    drapeau: bool

    def __init__(self):
        self.est_mine   = ...   # (1)
        self.nb_voisins = ...   # (1)
        self.revelee    = ...   # (1)
        self.drapeau    = ...   # (1)


#? ETAT DU JEU

grille: list[list[Cellule]]
game_over: bool
game: AbstractEngine


#? INITIALISATION

def init():
    global grille, game_over
    game_over = False
    grille = ...                # (2) grille vierge de HAUTEUR × LARGEUR Cellule()

    compteur = 0
    while compteur < NB_MINES:
        i = randint(0, HAUTEUR - 1)
        j = randint(0, LARGEUR - 1)
        if ...:                 # (3) la case n'est pas encore une mine
            ...                 # (3) la marquer comme mine
            compteur += 1

    for i in range(HAUTEUR):
        for j in range(LARGEUR):
            grille[i][j].nb_voisins = 0  # Pour l'instant


#? FONCTIONS UTILITAIRES

def get_mines_voisines(i: int, j: int) -> int:
    ...                         # (4)


def reveler_toutes_mines():
    ...                         # (5)


def est_gagne() -> bool:
    ...                         # (6)


def decouvre(i: int, j: int):
    cell = grille[i][j]
    cell.revelee = ...              # (7) révéler la case
    if ...:                         # (7) propager seulement si aucun voisin miné
        for di in range(-1, 2):
            for dj in range(-1, 2):
                if ... and ...:     # (7) exclure le centre ET vérifier les bords
                    voisin = grille[i + di][j + dj]
                    if ...:         # (7) voisin non révélé ET pas une mine
                        decouvre(...)   # (7) appel récursif


#? CALLBACKS

def click(i: int, j: int, button: str):
    global game_over
    if ...:                     # (8) ignorer si partie terminée
        return
    case = grille[i][j]
    if button == "left" and not case.drapeau and not case.revelee:
        if case.est_mine:
            game_over = True
            reveler_toutes_mines()
            print("Game over !")
        else:
            decouvre(i, j)
            if est_gagne():
                ...             # (8) signaler la victoire
    elif button == "right" and not case.revelee:
        case.drapeau = not case.drapeau


def draw():
    for i in range(HAUTEUR):
        for j in range(LARGEUR):
            case = grille[i][j]
            if case.drapeau:
                game.set_cell_color(i, j, "#555555")
                game.set_cell_char(i, j, "F", "#FF0000")
            elif ...:           # (9) non révélée
                game.set_cell_color(i, j, "#555555")
                game.set_cell_char(i, j, "", "#000000")
            elif ...:           # (9) mine révélée
                game.set_cell_color(i, j, "#FF4444")
                game.set_cell_char(i, j, "X", "#FFFFFF")
            elif ...:           # (9) case chiffrée
                game.set_cell_color(i, j, "#FFFFFF")
                game.set_cell_char(i, j, str(case.nb_voisins), "#3418D4")
            else:
                game.set_cell_color(i, j, "#FFFFFF")
                game.set_cell_char(i, j, "", "#000000")


if __name__ == "__main__":
    game = metagrid.create(HAUTEUR, LARGEUR, 50, 1)
    game.on_init(init)
    game.on_click(click)
    game.on_draw(draw)
    game.start()
```

## Étape 1 - La classe `Cellule`

Au démineur, chaque case possède plusieurs informations indépendantes. On les regroupe dans une classe.

!!! question "Initialiser les attributs `(1)`"
    Chaque case a 4 attributs :

    | Attribut | Type | Signification |
    |---|---|---|
    | `est_mine` | `bool` | La case cache une mine |
    | `nb_voisins` | `int` | Nombre de mines dans les 8 cases adjacentes |
    | `revelee` | `bool` | La case a été découverte par le joueur |
    | `drapeau` | `bool` | Le joueur a posé un drapeau sur cette case |

    Pour commencer, initialisez `revelee` à `True` et les trois autres attributs à leurs valeurs par défaut. Cela révèle toute la grille dès le lancement et vous permettra de tester votre code au fur et à mesure sans attendre d'avoir implémenté les clics.

    Vous remettrez `revelee` à `False` plus tard.

## Étape 2 - La grille vierge

!!! question "Compréhension de liste imbriquée `(2)`"
    On veut une grille de `HAUTEUR` lignes et `LARGEUR` colonnes, chaque case étant un objet `Cellule()` distinct. Utilisez une double compréhension de liste. Complétez `(2)`.

## Étape 3 - Placer les mines

!!! question "Boucle de placement `(3)`"
    On tire une position aléatoire ; si la case n'est pas encore une mine, on la marque et on avance le compteur. Complétez les deux lignes `(3)`.

    Pourquoi une boucle `while` plutôt qu'une boucle `for` ?

!!! question "Premier test"
    Lancez le programme. Avec `revelee = True` dans `__init__`, toutes les cases sont visibles : vérifiez que les mines apparaissent en rouge avec une croix, et les cases sans mine en blanc. Les chiffres affichent tous `0` pour l'instant, c'est normal.

## Étape 4 - Compter les mines voisines

!!! question "Double boucle avec bords `(4)`"
    Écrivez entièrement la fonction en vous appuyant sur ce que vous avez vu dans l'activité sur le voisinage. La fonction retourne le nombre de mines dans le voisinage à 8 de `(i, j)`.

    Rappel : en Python, un booléen vaut `1` ou `0` en arithmétique.

!!! question "Brancher dans `init`"
    Dans `init`, remplacez `grille[i][j].nb_voisins = 0` par un appel à `get_mines_voisines`. Relancez : les chiffres doivent maintenant apparaître correctement.

## Étape 5 - Révéler toutes les mines

!!! question "`reveler_toutes_mines` `(5)`"
    En cas de game over, on révèle toutes les mines pour que `draw` puisse les afficher. Écrivez entièrement la fonction.

## Étape 6 - Vérifier la victoire

On gagne quand toutes les cases **sans mine** ont été révélées.

!!! question "`est_gagne` `(6)`"
    Écrivez entièrement la fonction. Elle retourne `True` si toutes les cases sans mine sont révélées, `False` dès qu'une ne l'est pas.

    Deux approches possibles :

    - une double boucle avec `return False` dès qu'on trouve une case sans mine non révélée, puis `return True` à la fin ;
    - `all()` avec une expression génératrice qui parcourt les cases sans mine et vérifie que chacune est révélée.

## Étape 7 - Le flood fill

Quand le joueur clique sur une case sans voisin miné, on révèle automatiquement toute la zone vide adjacente. C'est un algorithme récursif appelé **flood fill**.

!!! question "Compléter `decouvre` `(7)`"
    Cinq `...` sont à compléter dans la fonction :

    1. `cell.revelee = ...` — que faut-il affecter pour marquer la case comme révélée ?
    2. `if ...:` — à quelle condition propage-t-on aux voisins ? (regardez l'attribut qui indique le nombre de mines voisines)
    3. `if ... and ...:` — même condition qu'à l'étape 4 : exclure le centre et vérifier les bords.
    4. `if ...:` — deux conditions à réunir avec `and` : le voisin n'est pas encore révélé, et ce n'est pas une mine.
    5. `decouvre(...)` — quels arguments passer pour appeler la fonction sur le voisin `(i+di, j+dj)` ?

!!! question "Récursion et terminaison"
    Pourquoi la condition `not voisin.revelee` est-elle indispensable avant l'appel récursif ?

## Étape 8 - Gérer les clics

!!! question "`click` `(8)`"
    Deux `...` sont à compléter :

    - La garde en début de fonction : quelle condition doit-on tester pour ignorer les clics quand la partie est terminée ?
    - Que faire quand `est_gagne()` retourne `True` ? (Mettez `game_over` à `True` et affichez un message.)

## Étape 9 - Afficher la grille

Plusieurs états peuvent coexister ; l'ordre `if / elif / elif / else` établit la priorité d'affichage.

!!! question "Conditions de `draw` `(9)`"
    | Priorité | Condition | Fond | Caractère |
    |---|---|---|---|
    | 1 | Drapeau | gris `#555555` | `F` rouge — déjà écrit |
    | 2 | Non révélée | gris `#555555` | rien |
    | 3 | Mine révélée | rouge `#FF4444` | `X` blanc |
    | 4 | Chiffre (`nb_voisins > 0`) | blanc `#FFFFFF` | chiffre bleu — déjà écrit |
    | 5 | Case vide | blanc `#FFFFFF` | rien — déjà écrit |

    Complétez les trois conditions `(9)` manquantes.

    Une case avec drapeau est-elle révélée ? Pourquoi faut-il tester `case.drapeau` en premier ?

## Étape 10 - Test final

!!! question "Vérifier le jeu complet"
    Remettez `revelee` à `False` dans `__init__` et testez :

    - Clic gauche sur une case vide : la zone se propage-t-elle ?
    - Clic gauche sur une mine : toutes les mines s'affichent-elles en rouge ?
    - Clic droit : le drapeau `F` apparaît-il puis disparaît-il au deuxième clic ?
    - Révéler toutes les cases sans mine affiche-t-il le message de victoire ?

!!! question "Pour aller plus loin"
    1. Ajoutez la touche `r` pour relancer une partie (`game.on_key(touche)` avec `def touche(key: str)` qui appelle `init()` si `key == 'r'`).
    2. Affichez un compteur de mines restantes (NB_MINES moins le nombre de drapeaux posés).
    3. Les couleurs des chiffres varient dans le vrai démineur : 1 = bleu, 2 = vert, 3 = rouge... Utilisez un dictionnaire dans `draw`.
    4. Empêchez un game over au premier clic : si la première case cliquée est une mine, relancez `init()` jusqu'à ce qu'elle ne le soit plus.
