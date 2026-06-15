# Démineur

Le démineur est un classique des jeux de logique. Une grille dissimule des mines ; le joueur doit révéler toutes les cases sans mines en s'aidant des chiffres qui indiquent combien de mines se trouvent dans le voisinage immédiat de chaque case. Un clic droit permet de poser un drapeau pour marquer une mine supposée.

!!! tip "Pré-requis"
    Cette activité fait suite à l'activité sur le voisinage. On réutilise les mêmes notions : grille `(i, j)`, déplacements `(di, dj)`, vérification des bords, voisinage à 8.

    Installez la bibliothèque : `uv add metagrid`

    Sur Debian/Ubuntu, des dépendances systèmes sont nécessaires :
    ```
    sudo apt install libgl1 libxrender1 libx11-6
    ```

```python
"""
Démineur
"""

import metagrid
from metagrid import AbstractEngine
from random import randint

HAUTEUR  = 10
LARGEUR  = 10
NB_MINES = 10


class Cellule:
    """Une case de la grille.

    est_mine   : True si la case cache une mine.
    nb_voisins : nombre de mines dans les 8 cases adjacentes (calculé après placement).
    revelee    : True si le joueur a découvert cette case.
    drapeau    : True si le joueur a posé un drapeau sur cette case.
    """

    def __init__(self):
        self.est_mine   = False
        self.nb_voisins = 0
        self.revelee    = False
        self.drapeau    = False


grille:    list[list[Cellule]]
game_over: bool
game:      AbstractEngine


def init():
    """Remet le jeu à zéro.

    Crée une grille de HAUTEUR × LARGEUR Cellule() vierges.
    Place NB_MINES mines à des positions aléatoires distinctes.
    Calcule nb_voisins pour chaque case (après le placement des mines).
    Remet game_over à False.
    """
    global grille, game_over
    pass


def get_mines_voisines(i: int, j: int) -> int:
    """Renvoie le nombre de mines dans le voisinage à 8 de (i, j)."""
    pass


def reveler_toutes_mines():
    """Passe revelee à True sur toutes les cases qui sont des mines."""
    pass


def est_gagne() -> bool:
    """Renvoie True si toutes les cases sans mine ont été révélées."""
    pass


def decouvre(i: int, j: int):
    """Révèle la case (i, j).

    Si nb_voisins == 0, propage récursivement à chaque voisin à 8
    qui n'est pas encore révélé et n'est pas une mine.
    """
    pass


def click(i: int, j: int, button: str):
    """Appelé au clic sur (i, j).

    Ignorer si game_over.

    Clic gauche, case sans drapeau, non révélée :
      - mine → game_over = True, reveler_toutes_mines(), message.
      - sinon → decouvre(i, j). Si est_gagne() : game_over = True, message.

    Clic droit, case non révélée :
      - inverse case.drapeau.
    """
    global game_over
    pass


def draw():
    """Affiche la grille à chaque frame.

    Pour chaque case, par ordre de priorité :
      1. Drapeau          → fond gris #555555, caractère "F" rouge.
      2. Non révélée      → fond gris #555555, pas de caractère.
      3. Mine révélée     → fond rouge #FF4444, caractère "X" blanc.
      4. Chiffre > 0      → fond blanc #FFFFFF, chiffre en bleu #3418D4.
      5. Case vide (0)    → fond blanc #FFFFFF, pas de caractère.
    """
    pass


if __name__ == "__main__":
    game = metagrid.create(HAUTEUR, LARGEUR, 50, 1)
    game.on_init(init)
    game.on_click(click)
    game.on_draw(draw)
    game.start()
```

??? hint "Ordre dans `init`"
    Les mines doivent être placées **avant** de calculer `nb_voisins`. Calculer les voisins en premier donnerait 0 partout.

??? hint "Placer les mines sans doublon"
    Tirer une position aléatoire ; si la case n'est pas encore une mine, la marquer et avancer le compteur. Utiliser un `while` plutôt qu'un `for` — on ne sait pas combien de tirages seront nécessaires.

??? hint "Astuce pour `get_mines_voisines`"
    En Python, un booléen se comporte comme un entier en arithmétique : `True` vaut `1`, `False` vaut `0`. On peut donc additionner directement des expressions booléennes pour compter.

??? hint "Condition de terminaison dans `decouvre`"
    La garde `not voisin.revelee` avant l'appel récursif est indispensable. Sans elle, deux cases vides adjacentes s'appelleraient mutuellement à l'infini.

??? hint "Déboguer sans cliquer"
    Pour vérifier `init` et `draw` sans avoir à implémenter les clics, passez temporairement `self.revelee = True` dans `Cellule.__init__`. Toute la grille s'affiche dès le lancement. Remettez `False` une fois `decouvre` fonctionnel.
