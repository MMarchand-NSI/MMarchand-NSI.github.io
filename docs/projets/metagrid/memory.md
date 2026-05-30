# Memory

Le Memory est un jeu de paires : les cartes sont posées face cachée ; le joueur en retourne deux à la fois ; si elles sont identiques, il les conserve face visible ; sinon, elles sont remises face cachée. Le but est de trouver toutes les paires.

!!! tip "Pré-requis"
    Pas de pré-requis spécifique. On manipule ici des listes, des tuples et des variables globales.

    Installe metagrid dans le terminal : `uv add metagrid`

!!! question "Grille 5 x 5"
    Peut-on jouer au Memory sur une grille de 5 x 5 ?

    1. Combien de cases contient une grille 5 x 5 ?
    2. Pour constituer des paires, de combien de cases a-t-on besoin ?
    3. Qu'est-ce que cela implique pour la taille d'une grille de Memory ?

Crée un fichier `memory.py` dans un dossier contenant un sous-dossier `images/` avec les fichiers `0.png`, `1.png`, ..., `7.png` fournis par le professeur.

```python
"""
Memory - jeu de mémoire avec images.
"""

import metagrid
from random import shuffle, randint

HAUTEUR_GRILLE = 4
LARGEUR_GRILLE = 4
TAILLE_CASE    = 100
NB_IMAGES      = HAUTEUR_GRILLE * LARGEUR_GRILLE // 2
DUREE          = 120   # nombre de frames pendant lesquels les cartes restent visibles

COULEUR_CACHEE = "#888888"

grille:          list[list[int]]
cases_trouvees:  list[tuple[int, int]]
cases_devoilees: list[tuple[int, int]]
timer:           int

jeu: metagrid.AbstractEngine


def init():
    global grille, cases_trouvees, cases_devoilees, timer
    grille = [[0] * LARGEUR_GRILLE for _ in range(HAUTEUR_GRILLE)]
    cases_trouvees  = []
    cases_devoilees = []
    timer = 0


def update():
    global timer, cases_devoilees
    pass


def cliquer(i: int, j: int, _bouton: str):
    global cases_devoilees, cases_trouvees, timer
    pass


def gagne() -> bool:
    pass


def draw():
    for i in range(HAUTEUR_GRILLE):
        for j in range(LARGEUR_GRILLE):
            jeu.set_cell_image(i, j, str(grille[i][j]))


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

## Étape 1 - Afficher la grille avec des images

Les images chargées avec `load_image` sont accessibles par leur clé (une chaîne : `"0"`, `"1"`, ...). La grille contient des entiers : `grille[i][j]` est le numéro de l'image à afficher en case `(i, j)`.

La fonction `draw` est déjà écrite : elle affiche l'image `str(grille[i][j])` dans chaque case.

La fonction `init` est déjà écrite : elle remplit toute la grille avec l'image `0`.

Lance le programme. Toutes les cases doivent afficher la même image.

!!! question "Exercice 1 - Images aléatoires"
    Modifie `init` pour qu'elle remplisse la grille avec des images choisies aléatoirement parmi les `NB_IMAGES` disponibles.

    ```python
    def init():
        global grille, cases_trouvees, cases_devoilees, timer
        grille = [[randint(..., ...) for _ in range(LARGEUR_GRILLE)]
                  for _ in range(HAUTEUR_GRILLE)]
        cases_trouvees  = []
        cases_devoilees = []
        timer = 0
    ```

    Lance le programme : chaque case doit afficher une image aléatoire (pas forcément en paires).

!!! question "Exercice 2 - Images en paires"
    Pour qu'il y ait exactement deux exemplaires de chaque image, on prépare une liste
    `[0, 0, 1, 1, 2, 2, ..., NB_IMAGES-1, NB_IMAGES-1]`, on la mélange avec `shuffle`, puis on remplit la grille case par case.

    ```python
    def init():
        global grille, cases_trouvees, cases_devoilees, timer
        paires = []
        for k in range(NB_IMAGES):
            paires.append(k)
            paires.append(k)
        shuffle(paires)

        grille = []
        for i in range(HAUTEUR_GRILLE):
            ligne = []
            for j in range(LARGEUR_GRILLE):
                ligne.append(paires[...])   # quel indice utiliser ?
            grille.append(ligne)

        cases_trouvees  = []
        cases_devoilees = []
        timer = 0
    ```

    Quel indice utiliser dans `paires[...]` pour parcourir les éléments de `paires` dans l'ordre, case par case ?

## Étape 2 - Masquer les cases

Pour l'instant, toutes les images sont visibles. Dans le vrai Memory, les cartes sont retournées face cachée. Une case doit être visible uniquement si :

- elle est **dévoilée** (ses coordonnées sont dans `cases_devoilees`), ou
- elle a été **trouvée** (ses coordonnées sont dans `cases_trouvees`).

Sinon, on la colorie en gris avec `jeu.set_cell_color(i, j, COULEUR_CACHEE)`.

!!! question "Modifier `draw`"
    Complète la fonction `draw` :

    ```python
    def draw():
        for i in range(HAUTEUR_GRILLE):
            for j in range(LARGEUR_GRILLE):
                if ... or ...:
                    jeu.set_cell_image(i, j, str(grille[i][j]))
                else:
                    jeu.set_cell_color(i, j, COULEUR_CACHEE)
    ```

    Lance le programme : toute la grille doit apparaître en gris puisqu'aucune case n'est encore dévoilée ni trouvée.

## Étape 3 - Dévoiler les cases

### Cliquer pour dévoiler

Une case est représentée par ses coordonnées sous forme de tuple `(i, j)`.

!!! question "Ajouter une case à `cases_devoilees`"
    Lorsqu'une case `(i, j)` est cliquée, on l'ajoute à `cases_devoilees` si elle n'est ni déjà dévoilée, ni déjà trouvée.

    ```python
    def cliquer(i: int, j: int, _bouton: str):
        global cases_devoilees, cases_trouvees, timer
        if (i, j) in cases_devoilees or (i, j) in cases_trouvees:
            return
        cases_devoilees.append(...)
    ```

    Teste : cliquer sur une case doit la révéler.

!!! question "Limiter à 2 cases dévoilées"
    On ne peut pas dévoiler plus de 2 cases en même temps. Ajoute une garde en début de `cliquer` :

    ```python
    def cliquer(i: int, j: int, _bouton: str):
        global cases_devoilees, cases_trouvees, timer
        if len(cases_devoilees) >= 2:
            return
        ...
    ```

    Teste : après avoir cliqué deux cases, un troisième clic ne doit rien faire.

### Démarrer le timer

Quand deux cases sont dévoilées et différentes, elles doivent se recouvrir après un moment.

!!! question "Démarrer le timer dans `cliquer`"
    Après avoir ajouté la case, si `cases_devoilees` contient maintenant exactement 2 éléments et que le timer est à 0, on démarre le timer :

    ```python
        cases_devoilees.append((i, j))
        if len(cases_devoilees) == 2 and timer == 0:
            timer = DUREE
    ```

### Décrémenter le timer

!!! question "Compléter `update`"
    À chaque frame, si le timer est strictement positif, on le décrémente. Quand il atteint 0, on vide `cases_devoilees` :

    ```python
    def update():
        global timer, cases_devoilees
        if timer > 0:
            timer -= 1
            if timer == 0:
                cases_devoilees = []
    ```

    Teste : retourner deux cases différentes, attendre quelques secondes - elles doivent se recouvrir.

## Étape 4 - Découvrir les paires

Quand le joueur retourne deux cases portant la même image, elles doivent rester visibles définitivement.

!!! question "Détecter une paire dans `cliquer`"
    Juste avant de démarrer le timer, si les deux cases dévoilées ont le même numéro d'image, on les ajoute à `cases_trouvees` et on vide `cases_devoilees` (pas besoin de timer dans ce cas) :

    ```python
        if len(cases_devoilees) == 2:
            (i1, j1), (i2, j2) = cases_devoilees
            if grille[i1][j1] == grille[i2][j2]:
                cases_trouvees.extend(cases_devoilees)
                cases_devoilees = []
            elif timer == 0:
                timer = DUREE
    ```

    Teste : trouver une paire doit la laisser visible ; une mauvaise paire doit se recouvrir après quelques secondes.

## Étape 5 - Gagner

!!! question "Compléter `gagne`"
    On gagne quand toutes les cases ont été trouvées, c'est-à-dire quand `cases_trouvees` contient autant d'éléments que la grille.

    ```python
    def gagne() -> bool:
        return len(cases_trouvees) == ...
    ```

!!! question "Vérifier la victoire dans `cliquer`"
    Après avoir détecté une paire, vérifie si la partie est gagnée et affiche un message :

    ```python
            if grille[i1][j1] == grille[i2][j2]:
                cases_trouvees.extend(cases_devoilees)
                cases_devoilees = []
                if gagne():
                    print("Bravo, vous avez gagné !")
    ```

    Lance le programme et joue une partie complète. Retrouve toutes les paires pour vérifier que le message s'affiche.

!!! question "Pour aller plus loin"
    1. Ajoute la touche `r` pour relancer une partie (`jeu.on_key(touche)` avec une fonction `def touche(key: str)` qui appelle `init()` si `key == 'r'`).
    2. Ajoute un compteur de coups (nombre de paires retournées) affiché dans la console.
    3. Essaie avec une grille 6 x 4 en ajoutant des images supplémentaires.
    4. Ajoute un "dos de carte" : charge une image `"dos"` et utilise-la à la place de la couleur grise pour les cases cachées.
