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

