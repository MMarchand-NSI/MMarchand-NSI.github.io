# Lights Out

Lights Out est un jeu de puzzle électronique inventé par Tiger Electronics en 1995.

La grille est composée de cellules pouvant être allumées ou éteintes. Cliquer sur une cellule **inverse son état et celui de ses 4 voisines directes** (haut, bas, gauche, droite). Le but est d'éteindre toutes les lumières.

<iframe width="560" height="315" src="https://www.youtube.com/embed/pj0lVmhkx7M" title="Lights Out puzzle" frameborder="0" allowfullscreen></iframe>

!!! tip "Pré-requis"
    Cette activité fait suite à l'activité sur le voisinage. On réutilise ici les mêmes notions : grille `(i, j)`, déplacements `(di, dj)`, et vérification des bords.

Le code est organisé autour de la bibliothèque `metagrid`, qui prend en charge l'affichage et les interactions. Dans `draw`, on colorie chaque cellule avec `jeu.set_cell_color(i, j, "#RRGGBB")`.

Installer metagrid dans le terminal: `uv add metagrid`

Crée un fichier `lightsout.py` avec ce squelette complet :

```python
"""
Lights Out
Chaque cellule de la grille est soit allumée, soit éteinte.
Cliquer une cellule inverse son état et celui de ses 4 voisines directes.
But : éteindre toutes les lumières.
Touche r : recommencer.
"""

import metagrid
from random import randint

NB_LIGNES   = 5
NB_COLONNES = 5
TAILLE_CASE = 100

COULEUR_ALLUMEE  = "#FFDD00"
COULEUR_ETEINTE  = "#222222"
COULEUR_VICTOIRE = "#44FF88"

grille: list[list[bool]]  # True = allumée, False = éteinte
flag_game_over: bool

jeu: metagrid.AbstractEngine


def toggle(i: int, j: int):
    """Inverse la cellule (i, j) et ses 4 voisines directes."""
    pass


def gagne() -> bool:
    """Renvoie True si toutes les cellules sont éteintes."""
    pass


def init():
    """Callback - appelé au démarrage. Génère un nouveau puzzle garanti soluble."""
    global grille, flag_game_over
    pass


def cliquer(i: int, j: int, _modif: str):
    """Callback - appelé avec (i, j) quand le joueur clique une cellule."""
    global flag_game_over
    pass


def touche(key: str):
    """Callback - appelé avec la touche pressée. r pour recommencer."""
    pass


def draw():
    """Callback - appelé à chaque frame. Colorie chaque cellule selon son état."""
    pass


if __name__ == "__main__":
    jeu = metagrid.create(NB_LIGNES, NB_COLONNES, TAILLE_CASE, 4)
    jeu.on_init(init)
    jeu.on_click(cliquer)
    jeu.on_key(touche)
    jeu.on_draw(draw)
    jeu.start()
```

## Étape 1 - La grille booléenne

!!! question "Représentation"
    Contrairement à l'activité sur le voisinage où les cellules contenaient des nombres, ici chaque cellule est un booléen : `True` si la cellule est allumée, `False` si elle est éteinte.

    1. Comment représente-t-on en Python une grille de 5 lignes et 5 colonnes, entièrement éteinte ?

        ```python
        grille = [[...] * NB_COLONNES for _ in range(NB_LIGNES)]
        ```

    2. Que vaut `[False] * 3` ? Vérifiez dans l'interpréteur.

    3. On veut inverser l'état d'une cellule. Que vaut `not True` ? `not False` ? Comment inverser `grille[i][j]` en une instruction ?

## Étape 2 - Afficher la grille

Avant d'ajouter toute interaction, on veut juste voir quelque chose à l'écran.

!!! question "Fonctions `init` et `draw`"
    Complétez `init` pour créer une grille entièrement éteinte, et `draw` pour colorier chaque cellule selon son état.

    ```python
    def init():
        global grille, flag_game_over
        grille = ...
        flag_game_over = ...

    def draw():
        for i in range(NB_LIGNES):
            for j in range(NB_COLONNES):
                if ... :
                    couleur = COULEUR_ALLUMEE
                else:
                    ...
                jeu.set_cell_color(i, j, couleur)


    ```

    Lancez le programme. Vous devez voir une grille vide. Rien ne se passe encore au clic, c'est normal.

## Étape 3 - Toggle simple (sans voisinage)

On va maintenant réagir aux clics : cliquer sur une cellule inverse uniquement **cette cellule**, sans toucher aux voisines.

!!! question "Fonction `cliquer` simple"
    Complétez `cliquer` pour inverser l'état de la cellule `(i, j)` :

    ```python
    def cliquer(i: int, j: int):
        grille[i][j] = ...
    ```

    Testez : cliquer sur une cellule doit l'allumer, recliquer doit l'éteindre.

    Vous pouvez dessiner des motifs librement sur la grille.

## Étape 4 - Toggle Lights Out (avec voisinage en croix)

La vraie règle de Lights Out : cliquer sur `(i, j)` inverse cette cellule **et ses 4 voisines directes** (haut, bas, gauche, droite).

!!! question "Croix ou diagonales ?"
    Dans l'activité voisinage, on utilisait `range(-1, 2)` pour `di` et `dj`, ce qui donnait 9 couples. Voici les 9 couples classés :

    |        | dj = -1 | dj = 0 | dj = +1 |
    |--------|---------|--------|---------|
    | di = -1 | diag | **haut** | diag |
    | di = 0  | **gauche** | **centre** | **droite** |
    | di = +1 | diag | **bas** | diag |

    1. Quels couples correspondent à la croix (centre + 4 voisins directs) ?

    2. Quelle propriété distingue les couples de la croix ? Observez les valeurs de `di` et `dj` pour chaque case en gras.

    3. Complétez la condition pour ne garder que la croix :

        ```python
        for di in range(-1, 2):
            for dj in range(-1, 2):
                if ...:  # garder seulement la croix
                    print(di, dj)
        ```

!!! question "Écrire `toggle` et mettre à jour `cliquer`"
    Complétez la fonction `toggle` avec la double boucle et la condition trouvée, puis faites appeler `toggle` depuis `cliquer` :

    ```python
    def toggle(i: int, j: int):
        for di in range(-1, 2):
            for dj in range(-1, 2):
                if ...:  # garder la croix
                    ni, nj = i + di, j + dj
                    if ...:  # vérification des bords
                        grille[ni][nj] = ...

    def cliquer(i: int, j: int, _modif: str):
        ...
    ```


## Étape 5 - La fonction `gagne`

!!! question "Vérifier la victoire"
    On gagne quand toutes les cellules sont éteintes (`False`).

    Complétez la fonction : dès qu'on trouve une cellule allumée, on sait que la partie n'est pas gagnée.

    ```python
    def gagne() -> bool:
        for i in ...:
            for j in ...:
                if ...:
                    return False
        return True
    ```


## Étape 6 - Vérifier la victoire

!!! question "Gérer la victoire dans `cliquer`"
    Quand le joueur clique sur `(i, j)` :
    - si la partie est terminée (`flag_game_over` est `True`), on ne fait rien,
    - sinon, on applique `toggle(i, j)`,
    - puis on vérifie si la partie est gagnée avec `gagne()`.

    ```python
    def cliquer(i: int, j: int, _modif: str):
        global flag_game_over
        if ...:
            return
        ...
        if ...:
            flag_game_over = True
    ```

## Étape 7 - Générer un puzzle soluble

!!! question "Initialisation aléatoire"
    Une idée naïve serait de remplir la grille aléatoirement. Mais certaines configurations de Lights Out sont insolubles.

    Voici une astuce : on part d'une grille entièrement éteinte (état gagnant), puis on applique un certain nombre de `toggle` aléatoires. Comme `toggle` est sa propre inverse (deux toggles au même endroit s'annulent), on est certain que le puzzle obtenu est soluble.

    1. Pourquoi cette approche garantit-elle que le puzzle est soluble ?

    2. Mettez à jour `init` :

        ```python
        def init():
            global grille, flag_game_over
            grille = [[False] * NB_COLONNES for _ in range(NB_LIGNES)]
            for _ in range(20):
                toggle(randint(...), randint(...))
            flag_game_over = False
        ```

## Étape 8 - Touche finale

!!! question "Touche `r` pour recommencer"

    Si la touche appuyée est "r", alors on initialise le jeu.

    ```python
    def touche(key: str):
        ...
    ```

!!! question "Afficher la victoire dans `draw`"
    Ajoutez le cas victoire : si `flag_game_over` est `True`, toutes les cellules prennent `COULEUR_VICTOIRE`.

    ```python
    def draw():
        for i in range(NB_LIGNES):
            for j in range(NB_COLONNES):
                if ...:
                    couleur = ...
                elif ...:
                    couleur = ...
                else:
                    ...
                jeu.set_cell_color(i, j, couleur)
    ```

    Lancez le programme et jouez quelques parties. Appuyez sur `r` pour générer un nouveau puzzle.

!!! question "Pour aller plus loin"
    1. Ajoutez un compteur de coups affiché dans le titre de la fenêtre.
    2. Ajoutez un mode "aide" qui met en surbrillance la prochaine cellule à cliquer pour résoudre le puzzle (indice : cherchez "Lights Out solver").
    3. Essayez avec une grille de taille différente (6x6, 3x3). Toutes les tailles produisent-elles des puzzles solubles avec la méthode des toggles aléatoires ?
