# Memory

Le Memory est un jeu de paires : les cartes sont posées face cachée ; le joueur en retourne deux à la fois ; si elles sont identiques, il les conserve face visible ; sinon, elles sont remises face cachée après un court délai. Le but est de trouver toutes les paires.

!!! tip "Pré-requis"
    Callbacks metagrid, listes de listes, tuples, variables globales.

    Installe metagrid dans le terminal : `uv add metagrid`

!!! question "Taille de la grille"
    Peut-on jouer au Memory sur une grille de 5×5 ? Pourquoi ? Quelle contrainte cela impose-t-il sur les dimensions ?

Crée un fichier `memory.py` dans un dossier contenant un sous-dossier `images/` avec les fichiers `0.png`, `1.png`, ..., `7.png` fournis par le professeur.

```python
"""
Memory - jeu de paires avec images.
"""

import metagrid
from random import shuffle

HAUTEUR_GRILLE = 4
LARGEUR_GRILLE = 4
TAILLE_CASE    = 100
NB_IMAGES      = HAUTEUR_GRILLE * LARGEUR_GRILLE // 2
DUREE          = 120   # frames pendant lesquelles une mauvaise paire reste visible

COULEUR_CACHEE   = "#888888"
COULEUR_TROUVEE  = "#44FF88"

grille:          list[list[int]]          # numéro d'image de chaque case
cases_trouvees:  list[tuple[int, int]]    # cases trouvées définitivement
cases_devoilees: list[tuple[int, int]]    # 0, 1 ou 2 cases retournées en cours
timer:           int                      # décompte avant de recouvrir les cartes


jeu: metagrid.AbstractEngine


def init():
    """Remet le jeu à zéro.

    grille       : NB_IMAGES paires mélangées — chaque entier de 0 à NB_IMAGES-1
                   apparaît exactement deux fois, dans un ordre aléatoire.
    cases_trouvees, cases_devoilees : listes vides.
    timer        : 0.
    """
    global grille, cases_trouvees, cases_devoilees, timer
    pass


def update():
    """Appelée à chaque frame avant draw.

    Si timer > 0 : le décrémenter.
    Quand timer atteint 0 : vider cases_devoilees.
    """
    global timer, cases_devoilees
    pass


def cliquer(i: int, j: int, _bouton: str):
    """Appelée au clic sur la case (i, j).

    Ignorer le clic si :
      - la case est déjà dans cases_trouvees ou cases_devoilees,
      - deux cases sont déjà dévoilées (timer en cours).

    Sinon, ajouter (i, j) à cases_devoilees.

    Quand cases_devoilees contient exactement 2 cases :
      - même image → les déplacer dans cases_trouvees, vider cases_devoilees.
      - images différentes → démarrer le timer (timer = DUREE).
    """
    global cases_devoilees, cases_trouvees, timer
    pass


def gagne() -> bool:
    """Renvoie True si toutes les cases ont été trouvées."""
    pass


def draw():
    """Affiche la grille à chaque frame.

    Pour chaque case (i, j) :
      - si elle est dans cases_trouvees : fond COULEUR_TROUVEE + image.
      - si elle est dans cases_devoilees : image visible.
      - sinon : fond COULEUR_CACHEE (carte face cachée).
    """
    pass


if __name__ == "__main__":
    jeu = metagrid.create(HAUTEUR_GRILLE, LARGEUR_GRILLE, TAILLE_CASE, 4)
    for k in range(NB_IMAGES):
        jeu.load_image(str(k), f"images/{k}.png")
    jeu.on_init(init)
    jeu.on_update(update)
    jeu.on_click(cliquer)
    jeu.on_draw(draw)
    jeu.start()
```

??? hint "Construire les paires dans `init`"
    Constituer une liste `[0, 0, 1, 1, 2, 2, ..., NB_IMAGES-1, NB_IMAGES-1]`, la mélanger avec `shuffle`, puis remplir `grille` case par case en parcourant cette liste dans l'ordre.

??? hint "Vérifier une paire dans `cliquer`"
    Quand `cases_devoilees` contient deux éléments, on peut les récupérer simultanément :

    ```python
    (i1, j1), (i2, j2) = cases_devoilees
    ```

    Les images correspondent si `grille[i1][j1] == grille[i2][j2]`.

!!! warning "Ordre des gardes dans `cliquer`"
    L'ordre des deux vérifications en début de `cliquer` est critique.

    Si on teste `len(cases_devoilees) >= 2` **en premier**, alors pendant le timer (deux cartes visibles), un clic sur une carte **déjà trouvée** sera rejeté à tort — le joueur ne peut plus rien faire jusqu'à ce que le timer s'écoule, même pour cliquer ailleurs.

    Il faut tester si la case est déjà trouvée ou déjà dévoilée **avant** de tester le nombre de cartes visibles.
