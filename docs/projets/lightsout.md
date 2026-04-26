# Lights Out

Lights Out est un jeu de puzzle électronique inventé par Tiger Electronics en 1995.

La grille est composée de cellules pouvant être allumées ou éteintes. Cliquer sur une cellule **inverse son état et celui de ses 4 voisines directes** (haut, bas, gauche, droite). Le but est d'éteindre toutes les lumières.

<iframe width="560" height="315" src="https://www.youtube.com/embed/MfbVFpkbdpA" title="Lights Out puzzle" frameborder="0" allowfullscreen></iframe>

!!! tip "Pré-requis"
    Cette activité fait suite à l'activité sur le voisinage. On réutilise ici les mêmes notions : grille `(i, j)`, déplacements `(di, dj)`, et vérification des bords.

Le code est organisé autour de la bibliothèque `metagrid`, qui prend en charge l'affichage et les interactions. Elle s'utilise ainsi :

```python
jeu = metagrid.create(NB_LIGNES, NB_COLONNES, TAILLE_CASE, 4)
jeu.init(init)              # appelé au démarrage
jeu.callback_click(cliquer) # appelé avec (i, j) quand on clique
jeu.callback_key(touche)    # appelé avec la touche pressée
jeu.update(update)          # appelé à chaque frame
jeu.draw(draw)              # appelé à chaque frame pour afficher
jeu.start()
```

Dans `draw`, on colorie chaque cellule avec `jeu.set_cell_color(i, j, "#RRGGBB")`.

Les constantes et variables globales sont déjà définies :

```python
import metagrid
from metagrid import AbstractEngine
from random import randint

NB_LIGNES   = 5
NB_COLONNES = 5
TAILLE_CASE = 100

COULEUR_ALLUMEE  = "#FFDD00"
COULEUR_ETEINTE  = "#222222"
COULEUR_VICTOIRE = "#44FF88"

grille: list[list[bool]]  # True = allumée, False = éteinte
flag_game_over: bool

jeu: AbstractEngine
```

## Étape 1 - La grille booléenne

!!! question "Représentation"
    Contrairement à l'activité sur le voisinage où les cellules contenaient des nombres, ici chaque cellule est un booléen : `True` si la cellule est allumée, `False` si elle est éteinte.

    1. Comment représente-t-on en Python une grille de 5 lignes et 5 colonnes, entièrement éteinte ?

        ```python
        grille = [[...] * NB_COLONNES for _ in range(NB_LIGNES)]
        ```

    2. Que vaut `[False] * 3` ? Vérifiez dans l'interpréteur.

    3. On veut inverser l'état d'une cellule. Que vaut `not True` ? `not False` ? Comment inverser `grille[i][j]` sur place ?

## Étape 2 - La fonction `toggle`

La règle du jeu : cliquer sur `(i, j)` inverse cette cellule **et ses 4 voisines directes** (haut, bas, gauche, droite). Ce voisinage à 4 est différent du voisinage à 8 de l'activité précédente.

!!! question "Croix ou diagonales ?"
    Dans l'activité voisinage, on utilisait `range(-1, 2)` pour `di` et `dj`, ce qui donnait 9 couples. On excluait le centre avec `di != 0 or dj != 0`.

    Voici les 9 couples classés :

    |        | dj = -1 | dj = 0 | dj = +1 |
    |--------|---------|--------|---------|
    | di = -1 | diag | **haut** | diag |
    | di = 0  | **gauche** | **centre** | **droite** |
    | di = +1 | diag | **bas** | diag |

    1. Quels couples correspondent à la croix (centre + 4 voisins directs) ? Quels couples correspondent aux diagonales ?

    2. Quelle propriété distingue les couples de la croix ? Regardez les valeurs de `di` et `dj` pour chaque case en gras.

    3. Complétez la condition pour ne garder que la croix :

        ```python
        for di in range(-1, 2):
            for dj in range(-1, 2):
                if ...:  # garder seulement la croix
                    print(di, dj)
        ```

!!! question "Écrire `toggle`"
    Complétez la fonction en utilisant la double boucle et la condition trouvée :

    ```python
    def toggle(i: int, j: int):
        for di in range(-1, 2):
            for dj in range(-1, 2):
                if ...:  # garder la croix
                    ni, nj = i + di, j + dj
                    if ...:  # vérification des bords
                        grille[ni][nj] = ...  # inverser
    ```

    Testez mentalement : `toggle(0, 0)` sur une grille toute éteinte doit allumer `(0,0)`, `(1,0)` et `(0,1)` uniquement.

## Étape 3 - La fonction `gagne`

!!! question "Vérifier la victoire"
    On gagne quand toutes les cellules sont éteintes (`False`).

    Complétez la fonction : dès qu'on trouve une cellule allumée, on sait que la partie n'est pas gagnée.

    ```python
    def gagne() -> bool:
        for i in range(NB_LIGNES):
            for j in range(NB_COLONNES):
                if ...:
                    return False
        return True
    ```

## Étape 4 - La fonction `init`

!!! question "Générer un puzzle soluble"
    Une idée naïve serait de remplir la grille aléatoirement. Mais certaines configurations de Lights Out sont insolubles.

    Voici une astuce : on part d'une grille entièrement éteinte (état gagnant), puis on applique un certain nombre de `toggle` aléatoires. Comme `toggle` est sa propre inverse (deux toggles au même endroit s'annulent), on est certain que le puzzle obtenu est soluble.

    1. Pourquoi cette approche garantit-elle que le puzzle est soluble ?

    2. Complétez `init`. Elle doit :
        - créer une grille entièrement éteinte (voir étape 1),
        - appliquer 20 `toggle` à des positions aléatoires avec `randint(0, NB_LIGNES - 1)`,
        - mettre `flag_game_over` à `False`.

    ```python
    def init():
        global grille, flag_game_over
        grille = ...
        for _ in range(20):
            toggle(randint(...), randint(...))
        flag_game_over = False
    ```

## Étape 5 - Les fonctions `cliquer` et `touche`

!!! question "`cliquer`"
    Quand le joueur clique sur `(i, j)` :
    - si la partie est terminée (`flag_game_over` est `True`), on ne fait rien,
    - sinon, on applique `toggle(i, j)`,
    - puis on vérifie si la partie est gagnée avec `gagne()`.

    Écrivez la fonction. Elle doit modifier `flag_game_over` si le joueur a gagné.

    ```python
    def cliquer(i: int, j: int):
        global flag_game_over
        if ...:
            return
        toggle(i, j)
        if ...:
            flag_game_over = True
    ```

!!! question "`touche`"
    La seule touche gérée est `'r'` pour recommencer. Écrivez la fonction.

    ```python
    def touche(key: str):
        if key == ...:
            init()
    ```

## Étape 6 - La fonction `draw`

!!! question "Afficher la grille"
    Pour chaque cellule `(i, j)`, on choisit sa couleur selon l'état du jeu :
    - si `flag_game_over` est `True` : `COULEUR_VICTOIRE`,
    - sinon, si la cellule est allumée : `COULEUR_ALLUMEE`,
    - sinon : `COULEUR_ETEINTE`.

    Complétez `draw` avec deux boucles imbriquées et `jeu.set_cell_color(i, j, couleur)`.

    ```python
    def draw():
        for i in range(NB_LIGNES):
            for j in range(NB_COLONNES):
                if ...:
                    couleur = COULEUR_VICTOIRE
                elif ...:
                    couleur = COULEUR_ALLUMEE
                else:
                    couleur = COULEUR_ETEINTE
                jeu.set_cell_color(i, j, couleur)
    ```

## Étape 7 - Lancement

!!! question "Assembler le tout"
    Il ne reste plus qu'à créer la fenêtre et brancher les callbacks. Complétez le bloc principal :

    ```python
    if __name__ == "__main__":
        jeu = metagrid.create(NB_LIGNES, NB_COLONNES, TAILLE_CASE, 4)
        jeu.init(init)
        jeu.callback_click(cliquer)
        jeu.callback_key(touche)
        jeu.update(update)
        jeu.draw(draw)
        jeu.start()
    ```

    Lancez le programme et jouez quelques parties. Appuyez sur `r` pour générer un nouveau puzzle.

!!! question "Pour aller plus loin"
    1. Ajoutez un compteur de coups affiché dans le titre de la fenêtre.
    2. Ajoutez un mode "aide" qui met en surbrillance la prochaine cellule à cliquer pour résoudre le puzzle (indice : cherchez "Lights Out solver").
    3. Essayez avec une grille de taille différente (6x6, 3x3). Toutes les tailles produisent-elles des puzzles solubles avec la méthode des toggles aléatoires ?
