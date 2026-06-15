# Le voisinage

Le voisinage est une notion fondamentale en informatique. Dans les jeux sur grille (jeu de la vie, démineur), dans le traitement d'images (flou, détection de contours) ou dans la classification (algorithme des k plus proches voisins), on a souvent besoin d'identifier les cellules situées autour d'une cellule donnée.

Dans cette activité, on travaille avec des grilles rectangulaires représentées en Python par des listes de listes.

```python
type grille = list[list[float]]

grille_exemple: grille = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]
```

Une cellule est repérée par ses coordonnées `(i, j)` : `i` est l'indice de ligne (de haut en bas), `j` celui de colonne (de gauche à droite).

## Étape 1 - Identifier les voisins

!!! question "Schéma des voisins"
    On souhaite compter le nombre de voisins de la cellule `(i, j)`. Un voisin est une cellule adjacente (horizontalement, verticalement ou en diagonale).

    Pour atteindre un voisin, on applique un déplacement `(di, dj)` : la cellule voisine se trouve à la ligne `i + di`, colonne `j + dj`.

    Remplissez le tableau : pour chaque case, donnez le couple `(di, dj)` permettant d'atteindre cette case depuis la cellule centrale.

    |        | j - 1        | j        | j + 1        |
    |--------|--------------|----------|--------------|
    | **i - 1** | `(di=?, dj=?)` | `(di=?, dj=?)` | `(di=?, dj=?)` |
    | **i**     | `(di=?, dj=?)` | **(i, j)** | `(di=?, dj=?)` |
    | **i + 1** | `(di=?, dj=?)` | `(di=?, dj=?)` | `(di=?, dj=?)` |

??? hint "Réponse"
    |        | j - 1       | j        | j + 1       |
    |--------|-------------|----------|-------------|
    | **i - 1** | `(-1, -1)` | `(-1, 0)` | `(-1, +1)` |
    | **i**     | `(0, -1)`  | **(i, j)** | `(0, +1)` |
    | **i + 1** | `(+1, -1)` | `(+1, 0)` | `(+1, +1)` |

    `di` et `dj` valent chacun -1, 0 ou +1. Le seul couple à exclure est `(0, 0)` : c'est la cellule elle-même, pas un voisin.

## Étape 2 - La double boucle

!!! question "Parcourir les déplacements"
    `range(-1, 2)` produit les valeurs `-1, 0, 1`. On peut donc parcourir tous les déplacements possibles avec une double boucle.

    1. Exécutez ce code et comptez combien de couples `(di, dj)` sont affichés.

        ```python
        for di in range(-1, 2):
            for dj in range(-1, 2):
                print(di, dj)
        ```

    2. Quel couple faut-il ignorer ? Ajoutez une condition `if` pour l'exclure et vérifiez qu'il reste bien 8 couples.

        ```python
        for di in range(-1, 2):
            for dj in range(-1, 2):
                if ...:
                    print(di, dj)
        ```

??? hint "Réponse"
    `di != 0 or dj != 0`

    Si `di` et `dj` sont tous les deux nuls en même temps, on est sur la cellule elle-même. Cette condition est vraie dans tous les autres cas.

## Étape 3 - Compter les voisins de la cellule centrale

!!! question "Première version de la fonction"
    On s'intéresse uniquement à la cellule centrale `(1, 1)` de `grille_exemple` (valeur 5). Toutes ses voisines existent bien dans la grille, donc pas besoin de vérifier les bords pour l'instant.

    Complétez la fonction en utilisant la double boucle :

    ```python
    def nombre_voisins(g: grille, i: int, j: int) -> int:
        n = ...
        for di in range(-1, 2):
            for dj in range(-1, 2):
                if ...:
                    n = ...
        return ...
    ```

    Vérifiez : `nombre_voisins(grille_exemple, 1, 1)` doit valoir `8`.

## Étape 4 - Gérer les bords

!!! question "Que se passe-t-il pour un coin ?"
    Testez maintenant `nombre_voisins(grille_exemple, 0, 0)`.

    1. Quelle valeur obtenez-vous ? Est-ce correct ? (La cellule `(0, 0)` n'a que 3 voisins dans cette grille.)

    2. Avec `i=0, j=0` et `di=-1`, on accède à la ligne `i + di = 0 + (-1) = -1`. Que renvoie `g[-1]` en Python ? Est-ce un problème ?

    3. Avec `i=0, j=0`, `di=-1` et `dj=-1`, on accède à `g[-1][-1]`. Quelle valeur cela renvoie-t-il dans `grille_exemple` ? Est-ce un voisin de `(0, 0)` ?

??? hint "Explication"
    En Python, les indices négatifs sont valides : `g[-1][-1]` renvoie `9`, la case en bas à droite. Cette case n'est pas voisine de `(0, 0)`, donc la fonction renvoie une valeur incorrecte.

    Il faut vérifier que `i + di` et `j + dj` restent dans les bornes de la grille avant de compter la cellule comme voisine.

!!! question "Ajouter la condition de bord"
    La grille `g` a `len(g)` lignes et `len(g[0])` colonnes. Les indices de ligne valides sont de `0` à `len(g) - 1`, et les indices de colonne de `0` à `len(g[0]) - 1`.

    Complétez la condition pour inclure cette vérification :

    ```python
    if (di != 0 or dj != 0) and ...:
        n += 1
    ```

    Traduisez en Python : "l'indice de ligne `i + di` est compris entre `0` et `len(g) - 1`, ET l'indice de colonne `j + dj` est compris entre `0` et `len(g[0]) - 1`".

??? hint "Réponse"
    Voici la condition complète

    ```python
    if (di != 0 or dj != 0) and 0 <= i + di < len(g) and 0 <= j + dj < len(g[0]):
        n += 1
    ```

    Python autorise l'écriture `0 <= x < n` directement, ce qui est plus lisible qu'une double comparaison.

## Étape 5 - Visualiser le voisinage avec metagrid

Les étapes précédentes ont construit le pattern dans l'interpréteur. On va maintenant le rendre visible : cliquer sur une cellule la met en jaune et colorie ses voisins en bleu.

Crée un fichier `voisins_visu.py` avec ce squelette :

```python
import metagrid

NB_LIGNES   = 8
NB_COLONNES = 8
TAILLE_CASE = 80

COULEUR_NORMALE      = "#CCCCCC"
COULEUR_SELECTIONNEE = "#FFDD00"
COULEUR_VOISIN       = "#4488FF"

etat: list[list[str]]  # "normal", "selectionne" ou "voisin"

jeu: metagrid.AbstractEngine


def init():
    global etat
    etat = []
    for i in range(NB_LIGNES):
        ligne = []
        for j in range(NB_COLONNES):
            ligne.append("normal")
        etat.append(ligne)


def cliquer(i: int, j: int, _modif: str):
    global etat
    for li in range(NB_LIGNES):
        for lj in range(NB_COLONNES):
            etat[li][lj] = "normal"
    etat[i][j] = "selectionne"
    for di in range(-1, 2):
        for dj in range(-1, 2):
            if ...:                      # exclure (0, 0)
                ni, nj = i + di, j + dj
                if ...:                  # vérification des bords
                    etat[ni][nj] = "voisin"


def draw():
    global etat
    for i in range(NB_LIGNES):
        for j in range(NB_COLONNES):
            if etat[i][j] == "selectionne":
                jeu.set_cell_color(i, j, COULEUR_SELECTIONNEE)
            elif etat[i][j] == "voisin":
                jeu.set_cell_color(i, j, COULEUR_VOISIN)
            else:
                jeu.set_cell_color(i, j, COULEUR_NORMALE)


if __name__ == "__main__":
    jeu = metagrid.create(NB_LIGNES, NB_COLONNES, TAILLE_CASE, 4)
    jeu.on_init(init)
    jeu.on_click(cliquer)
    jeu.on_draw(draw)
    jeu.start()
```

!!! question "Compléter `cliquer`"
    Les deux conditions à compléter sont exactement celles de l'étape 4.

    1. Complétez la première condition pour exclure le couple `(0, 0)`.
    2. Complétez la vérification des bords pour `ni` et `nj`.
    3. Lancez et cliquez sur la cellule `(0, 0)`. Combien de voisins sont mis en bleu ? Pourquoi ?
    4. Cliquez sur `(3, 3)`. Combien de voisins ?
    5. Cliquez sur `(0, 3)` (bord supérieur, pas dans un coin). Combien de voisins ?

## Étape 6 - Compter les voisins allumés

La grille contient maintenant des cellules allumées (`True`) ou éteintes (`False`). Pour chaque cellule éteinte, on affiche le nombre de ses voisins allumés — exactement comme le démineur affiche le nombre de mines voisines.

Crée un fichier `voisins_compte.py` :

```python
import metagrid
from random import randint

NB_LIGNES   = 8
NB_COLONNES = 8
TAILLE_CASE = 80

COULEUR_ALLUMEE = "#FFDD00"
COULEURS_COMPTE = [
    "#444444",  # 0
    "#2244EE",  # 1
    "#22AA22",  # 2
    "#AAAA22",  # 3
    "#EE8822",  # 4
    "#EE4422",  # 5
    "#CC22CC",  # 6
    "#EE2222",  # 7
    "#FF0000",  # 8
]

grille: list[list[bool]]

jeu: metagrid.AbstractEngine


def compter_voisins_allumes(i: int, j: int) -> int:
    """Renvoie le nombre de voisins allumés de la cellule (i, j)."""
    pass


def init():
    global grille
    grille = []
    for i in range(NB_LIGNES):
        ligne = []
        for j in range(NB_COLONNES):
            ligne.append(randint(0, 1) == 1)
        grille.append(ligne)


def cliquer(i: int, j: int, _modif: str):
    global grille
    grille[i][j] = not grille[i][j]


def draw():
    global grille
    for i in range(NB_LIGNES):
        for j in range(NB_COLONNES):
            if grille[i][j]:
                jeu.set_cell_color(i, j, COULEUR_ALLUMEE)
                jeu.set_cell_char(i, j, "", "#000000")
            else:
                n = compter_voisins_allumes(i, j)
                jeu.set_cell_color(i, j, COULEURS_COMPTE[n])
                jeu.set_cell_char(i, j, str(n), "#FFFFFF")


if __name__ == "__main__":
    jeu = metagrid.create(NB_LIGNES, NB_COLONNES, TAILLE_CASE, 4)
    jeu.on_init(init)
    jeu.on_click(cliquer)
    jeu.on_draw(draw)
    jeu.start()
```

!!! question "Compléter `compter_voisins_allumes`"
    La fonction doit compter combien de voisins de `(i, j)` ont `grille[ni][nj] == True`.

    C'est la même double boucle qu'à l'étape 4, avec deux différences :
    - on vérifie les bords (comme à l'étape 4),
    - on incrémente le compteur uniquement si `grille[ni][nj]` est `True`.

    ```python
    def compter_voisins_allumes(i: int, j: int) -> int:
        n = 0
        for di in range(-1, 2):
            for dj in range(-1, 2):
                if (di != 0 or dj != 0) and ...:   # bords
                    ni, nj = i + di, j + dj
                    if ...:                          # cellule allumée ?
                        n += 1
        return n
    ```

    1. Lancez le programme. Vérifiez à la main que le chiffre affiché sur une case est correct en comptant ses voisins jaunes.
    2. `COULEURS_COMPTE` est une liste indexée par le compte. Que vaut `COULEURS_COMPTE[0]` ? `COULEURS_COMPTE[3]` ?
    3. Cliquez sur une cellule pour l'allumer ou l'éteindre. Les chiffres des cellules voisines se mettent-ils à jour automatiquement ? Pourquoi ?
    4. Quel lien voyez-vous entre ce programme et le démineur ?

## Étape 7 - Les déplacements du cavalier

Un cavalier aux échecs se déplace en « L » : deux cases dans une direction, une case perpendiculairement. Quand on clique sur une case, on veut mettre en évidence toutes les cases atteignables par un cavalier depuis cette position.

!!! question "Les déplacements possibles"
    Un cavalier peut se déplacer de +2 ou -2 lignes combiné à +1 ou -1 colonne, et inversement.

    Complétez la liste des 8 déplacements `(di, dj)` :

    ```python
    DEPLACEMENTS_CAVALIER = [
        (-2, -1), (-2, ...),
        (-1, -2), (-1, ...),
        ( 1, -2), ( 1, ...),
        ( 2, -1), ( 2, ...),
    ]
    ```

    Vérifiez sur papier : depuis la case centrale d'un échiquier, tracez les 8 cases atteignables.

!!! question "Pourquoi ne peut-on plus utiliser `range(-1, 2)` ?"
    Dans les étapes précédentes, `range(-1, 2)` permettait de générer tous les déplacements de -1 à +1. Pourquoi cette astuce ne fonctionne-t-elle pas pour le cavalier ?

!!! question "Adapter le code"
    Reprends le squelette de `voisins_visu.py` et modifie `cliquer` pour utiliser `DEPLACEMENTS_CAVALIER`. Au lieu de la double boucle `for di in range(-1, 2)`, on parcourt la liste :

    ```python
    DEPLACEMENTS_CAVALIER = [
        (-2, -1), (-2,  1),
        (-1, -2), (-1,  2),
        ( 1, -2), ( 1,  2),
        ( 2, -1), ( 2,  1),
    ]

    def cliquer(i: int, j: int, _modif: str):
        global etat
        for li in range(NB_LIGNES):
            for lj in range(NB_COLONNES):
                etat[li][lj] = "normal"
        etat[i][j] = "selectionne"
        for di, dj in ...:
            ni, nj = i + di, j + dj
            if ...:                      # vérification des bords
                etat[ni][nj] = "voisin"
    ```

    Remarquez que la vérification des bords est **identique** à celle de l'étape 5.

!!! question "Observer"
    Lancez le programme sur une grille 8×8.

    1. Cliquez sur le coin `(0, 0)`. Combien de cases sont atteignables ?
    2. Cliquez sur `(0, 1)`. Combien ?
    3. Cliquez sur `(3, 3)`. Combien ?
    4. Quelle case donne le maximum de déplacements possibles ? Pourquoi ?

