# Morpion

Le morpion (ou tic-tac-toe) se joue sur une grille 3×3. Deux joueurs alternent : X place son pion, puis O, jusqu'à ce que l'un aligne trois pions sur une ligne, une colonne ou une diagonale — ou que la grille soit pleine (match nul).

Le code s'appuie sur la bibliothèque `metagrid`, qui gère la fenêtre, les clics et l'affichage. Tu fournis quatre fonctions de rappel (*callbacks*) que metagrid appelle automatiquement :

- **`init`** : une fois au démarrage — tu initialises l'état du jeu.
- **`draw`** : à chaque image (~60 fois par seconde) — tu colories chaque cellule.
- **`cliquer`** : quand le joueur clique sur une cellule — tu reçois `(i, j)`.
- **`touche`** : quand le joueur appuie sur une touche — tu reçois le caractère pressé.

Installer metagrid dans le terminal : `uv add metagrid`

Crée un fichier `morpion.py` avec ce squelette complet :

```python
"""
Morpion (Tic-tac-toe)
X joue en premier. Les joueurs alternent en cliquant sur une case vide.
Gagner : aligner 3 pions sur une ligne, une colonne ou une diagonale.
Touche r : recommencer.
"""

import metagrid

NB_LIGNES   = 3
NB_COLONNES = 3
TAILLE_CASE = 180

COULEUR_VIDE     = "#DDDDDD"
COULEUR_X        = "#2255FF"
COULEUR_O        = "#FF3333"
COULEUR_VICTOIRE = "#44FF88"

grille: list[list[str | None]]  # None = vide, "X" ou "O" = occupée
joueur_actif: str               # "X" ou "O"
flag_game_over: bool

jeu: metagrid.AbstractEngine


def ligne_gagnante(i1: int, j1: int, i2: int, j2: int, i3: int, j3: int, joueur: str) -> bool:
    """Renvoie True si les trois cases données appartiennent toutes à joueur."""
    pass


def a_gagne(joueur: str) -> bool:
    """Renvoie True si joueur a aligné trois pions."""
    pass


def est_pleine() -> bool:
    """Renvoie True si toutes les cases sont occupées."""
    pass


def init():
    """Callback - appelé au démarrage. Remet le jeu à zéro."""
    global grille, joueur_actif, flag_game_over
    pass


def cliquer(i: int, j: int, _modif: str):
    """Callback - appelé avec (i, j) quand le joueur clique une cellule."""
    global joueur_actif, flag_game_over
    pass


def touche(key: str):
    """Callback - appelé avec la touche pressée. r pour recommencer."""
    pass


def draw():
    """Callback - appelé à chaque frame. Affiche la grille."""
    pass


if __name__ == "__main__":
    jeu = metagrid.create(NB_LIGNES, NB_COLONNES, TAILLE_CASE, 4)
    jeu.on_init(init)
    jeu.on_click(cliquer)
    jeu.on_key(touche)
    jeu.on_draw(draw)
    jeu.start()
```

## Étape 1 - La grille

La grille est une liste de listes. Chaque cellule contient `None` (case vide), `"X"` ou `"O"`.

!!! question "Représentation"
    1. Considère cette grille en cours de partie :

        ```python
        grille = [
            ["X", None, "O"],
            [None, "X", None],
            ["O", None, None],
        ]
        ```

        Que vaut `grille[0][0]` ? `grille[1][1]` ? `grille[0][2]` ? Retrouve chaque valeur sur le schéma ci-dessous :

        ```
        col :  0     1     2
        lig 0: "X"   .     "O"
        lig 1:  .   "X"    .
        lig 2: "O"   .     .
        ```

    2. Comment placer `"O"` dans la case `(2, 2)` en une seule instruction ?

    3. Complétez `init` :

        ```python
        def init():
            global grille, joueur_actif, flag_game_over
            grille = [
                [..., ..., ...],
                [..., ..., ...],
                [..., ..., ...],
            ]
            joueur_actif = "X"
            flag_game_over = False
        ```

## Étape 2 - Afficher la grille

`metagrid` fournit deux fonctions pour dessiner une cellule :

- `jeu.set_cell_color(i, j, "#RRGGBB")` — colorie le fond de la cellule.
- `jeu.set_cell_char(i, j, "X", "#RRGGBB")` — affiche un caractère **par-dessus** le fond. Passer `""` efface le caractère.

!!! question "Fonction `draw`"
    Complétez `draw` pour parcourir toutes les cellules et les afficher :

    ```python
    def draw():
        for i in range(NB_LIGNES):
            for j in range(NB_COLONNES):
                jeu.set_cell_color(i, j, COULEUR_VIDE)
                if grille[i][j] == "X":
                    jeu.set_cell_char(i, j, "X", ...)
                elif grille[i][j] == "O":
                    jeu.set_cell_char(i, j, ..., COULEUR_O)
                else:
                    jeu.set_cell_char(i, j, "", "#000000")
    ```

    Lancez le programme. Vous devez voir une grille vide grise. Rien ne se passe encore au clic, c'est normal.

## Étape 3 - Poser un pion

!!! question "Alterner les joueurs"
    `joueur_actif` vaut `"X"` ou `"O"`. Pour passer au joueur suivant :

    ```python
    if joueur_actif == "X":
        joueur_actif = ...
    else:
        joueur_actif = ...
    ```

!!! question "Fonction `cliquer`"
    Quand le joueur clique sur `(i, j)` :

    1. si la partie est terminée (`flag_game_over` est `True`), ne rien faire,
    2. si la case est déjà occupée (`grille[i][j]` n'est pas `None`), ne rien faire,
    3. sinon, placer le pion du joueur actif dans `grille[i][j]`,
    4. puis alterner le joueur.

    ```python
    def cliquer(i: int, j: int, _modif: str):
        global joueur_actif, flag_game_over
        if ...:
            return
        if grille[i][j] is not None:
            return
        grille[i][j] = ...
        if joueur_actif == "X":
            joueur_actif = ...
        else:
            joueur_actif = ...
    ```

    Testez : les clics doivent alterner X et O. Cliquer deux fois sur la même case ne doit rien faire.

## Étape 4 - Détecter la victoire

Un joueur gagne s'il aligne trois pions sur une ligne, une colonne ou une diagonale.

!!! question "Fonction `ligne_gagnante`"
    `ligne_gagnante(i1, j1, i2, j2, i3, j3, joueur)` renvoie `True` si les trois cases `(i1,j1)`, `(i2,j2)`, `(i3,j3)` contiennent toutes `joueur`.

    ```python
    def ligne_gagnante(i1, j1, i2, j2, i3, j3, joueur):
        return grille[i1][j1] == joueur and ... and ...
    ```

    Testez mentalement : si toute la ligne 0 est à `"X"`, que renvoie `ligne_gagnante(0,0, 0,1, 0,2, "X")` ?

!!! question "Fonction `a_gagne`"
    Sur une grille 3×3, il y a exactement 8 alignements possibles. Complétez les 8 cas :

    ```python
    def a_gagne(joueur: str) -> bool:
        return (
            ligne_gagnante(0, 0,  0, 1,  0, 2,  joueur) or  # ligne 0
            ligne_gagnante(1, 0,  1, 1,  1, 2,  joueur) or  # ligne 1
            ligne_gagnante(2, 0,  2, 1,  2, 2,  joueur) or  # ligne 2
            ligne_gagnante(0, 0,  1, 0,  2, 0,  joueur) or  # colonne 0
            ...                                              # colonne 1
            ...                                              # colonne 2
            ligne_gagnante(0, 0,  1, 1,  2, 2,  joueur) or  # diagonale \
            ligne_gagnante(0, 2,  1, 1,  2, 0,  joueur)     # diagonale /
        )
    ```

    Quelles sont les coordonnées de la diagonale `/` ? Vérifiez sur papier.

## Étape 5 - Match nul et fin de partie

!!! question "Fonction `est_pleine`"
    La grille est pleine quand toutes les cases sont occupées. Dès qu'on en trouve une vide, la grille n'est pas pleine.

    ```python
    def est_pleine() -> bool:
        for i in range(NB_LIGNES):
            for j in range(NB_COLONNES):
                if ...:
                    return False
        return True
    ```

!!! question "Gérer la fin de partie dans `cliquer`"
    Après avoir posé un pion, il faut tester la victoire **avant** d'alterner le joueur (car c'est le joueur qui vient de jouer qui a peut-être gagné). Remplacez la version de l'étape 3 par :

    ```python
    def cliquer(i: int, j: int, _modif: str):
        global joueur_actif, flag_game_over
        if flag_game_over or grille[i][j] is not None:
            return
        grille[i][j] = joueur_actif
        if a_gagne(joueur_actif) or est_pleine():
            flag_game_over = True
        else:
            if joueur_actif == "X":
                joueur_actif = "O"
            else:
                joueur_actif = "X"
    ```

    Pourquoi teste-t-on `a_gagne(joueur_actif)` avant d'alterner, et non après ?

!!! question "Touche `r` pour recommencer"
    ```python
    def touche(key: str):
        if key == ...:
            init()
    ```

!!! question "Afficher la victoire dans `draw`"
    Quand `flag_game_over` est `True`, colorier toutes les cellules en `COULEUR_VICTOIRE` au lieu de `COULEUR_VIDE`. Les symboles X et O restent affichés par-dessus.

    ```python
    def draw():
        for i in range(NB_LIGNES):
            for j in range(NB_COLONNES):
                if flag_game_over:
                    couleur_fond = ...
                else:
                    couleur_fond = COULEUR_VIDE
                jeu.set_cell_color(i, j, couleur_fond)
                if grille[i][j] == "X":
                    ...
                elif grille[i][j] == "O":
                    ...
                else:
                    ...
    ```

    Jouez quelques parties. Appuyez sur `r` pour rejouer.

!!! question "Pour aller plus loin"
    1. Distinguer victoire et match nul : conservez le résultat final dans une variable (`"X"`, `"O"`, ou `"nul"`) et choisissez une couleur différente pour chaque cas.
    2. Mettre en évidence les trois cases gagnantes : au lieu de colorier toute la grille, colorier uniquement la ligne gagnante en `COULEUR_VICTOIRE`.
    3. Généraliser la détection de victoire : au lieu de lister 8 appels à la main, construire une liste `LIGNES_GAGNANTES = [[(0,0),(0,1),(0,2)], ...]` contenant les 8 alignements, puis parcourir cette liste dans `a_gagne`. C'est l'occasion de manipuler des listes de listes autrement.
