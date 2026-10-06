# Flouter une image

Dans [le voisinage](../metagrid/voisins.md), tu as parcouru les 8 voisins d'une cellule avec une double boucle sur `range(-1, 2)`, et tu as géré les bords. On applique maintenant ce même parcours à une **photo** : chaque pixel est remplacé par un calcul fait sur son voisinage. C'est ainsi que fonctionnent les filtres de ton téléphone.

Sur cette page, on écrit un **flou**. Sur la suivante, on généralise jusqu'à la **détection de contours**.

## Mise en place

Une image en niveaux de gris est une grille : chaque case contient un entier entre `0` (noir) et `255` (blanc). On la représente comme dans le voisinage, par une liste de listes.

```python
type grille = list[list[float]]
```

Pour lire et écrire un fichier image, on te donne le fichier [image_io.py](image_io.py), à placer à côté de ton programme. Il ne contient **que** de la lecture et de l'écriture de fichiers :

- `charger(chemin: str) -> grille` lit une image et la rend en niveaux de gris, réduite à 400 pixels de côté au plus,
- `sauver(g: grille, chemin: str) -> None` enregistre une grille d'entiers entre 0 et 255 dans un fichier,
- `charger_couleur`, qui ne servira qu'à la dernière page.

Tout le reste, c'est toi qui l'écris. Installe la bibliothèque qu'utilise `image_io.py` : `uv add pillow`.

Crée un fichier `filtres.py` qui commence ainsi, et choisis une de tes photos :

```python
from image_io import charger, sauver, grille

photo = charger("ma_photo.jpg")
sauver(photo, "gris.png")
```

!!! question "Vérifier l'installation"
    1. Lance le programme et ouvre `gris.png` : c'est ta photo en noir et blanc.
    2. Combien ta grille a-t-elle de lignes ? de colonnes ? Écris le calcul en Python.

## Étape 1 - Le flou, à la main

Le **flou** remplace chaque pixel par la **moyenne** des 9 valeurs de son voisinage : lui-même et ses 8 voisins. Contrairement au voisinage, la cellule centrale **compte**.

On travaille sur cette petite grille :

```python
G = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90],
]
```

!!! question "Le pixel du centre"
    Sur ton cahier, calcule la valeur floutée du pixel `(1, 1)`.

    ??? success "Réponse"
        $(10 + 20 + 30 + 40 + 50 + 60 + 70 + 80 + 90) / 9 = 450 / 9 = 50$

Pour le pixel `(0, 0)`, il manque 5 voisins : ils sont hors de l'image. Dans le voisinage, on les ignorait. Ici ce n'est pas possible : une moyenne sur 4 valeurs au coin et 9 au centre ne traiterait pas les pixels de la même façon.

On choisit donc la règle du **bord répliqué** : un pixel hors de l'image prend la valeur du **pixel du bord le plus proche**. Autrement dit, on ramène chaque indice de ligne dans l'intervalle `[0 ; len(g))`, et chaque indice de colonne dans `[0 ; len(g[0]))`.

!!! question "Ramener dans l'image"
    Avec la règle du bord répliqué, quelle valeur de `G` lit-on aux positions suivantes ? Écris-les sur ton cahier.

    - `(-1, 1)`
    - `(1, 3)`
    - `(-1, -1)`
    - `(3, -1)`

    ??? success "Réponse"
        - `(-1, 1)` : la ligne `-1` est ramenée à `0`, donc `G[0][1]`, soit `20`.
        - `(1, 3)` : la colonne `3` est ramenée à `2`, donc `G[1][2]`, soit `60`.
        - `(-1, -1)` : ramené à `(0, 0)`, soit `10`.
        - `(3, -1)` : ramené à `(2, 0)`, soit `70`.

!!! question "Le pixel du coin"
    Sur ton cahier, écris les 9 valeurs du voisinage de `(0, 0)` avec la règle du bord répliqué, puis leur moyenne.

    ??? success "Réponse"
        ```
        10  10  20
        10  10  20
        40  40  50
        ```
        Somme : 210. Moyenne : $210 / 9 \approx 23{,}3$.

!!! warning "Piège : les indices négatifs"
    En Python, `G[-1][-1]` ne provoque **aucune erreur** : il renvoie `90`, le coin opposé. Tu l'as vu dans le voisinage. Un programme qui oublie le bord tourne donc sans rien signaler, et l'image obtenue a des bords faux. Les tests ci-dessous sont faits pour l'attraper.

## Étape 2 - Lire un pixel, même hors de l'image

!!! question "Écrire `borner` (obligatoire)"
    ```python
    def borner(x: int, debut: int, fin: int) -> int:
        """Renvoie x s'il est dans l'intervalle [debut ; fin), sinon l'entier
        de cet intervalle le plus proche de x. Précondition : debut < fin."""
        pass


    def test_borner():
        assert borner(5, 0, 10) == 5
        assert borner(-1, 0, 10) == 0
        assert borner(12, 0, 10) == 9
        assert borner(0, 0, 10) == 0
        assert borner(9, 0, 10) == 9
        assert borner(10, 0, 10) == 9
    ```

    ??? success "Solution"
        ```python
        def borner(x: int, debut: int, fin: int) -> int:
            """Renvoie x s'il est dans l'intervalle [debut ; fin), sinon l'entier
            de cet intervalle le plus proche de x. Précondition : debut < fin."""
            if x < debut:
                return debut
            if x >= fin:
                return fin - 1
            return x
        ```

!!! question "Écrire `pixel` (obligatoire)"
    En utilisant `borner`, écris la fonction qui lit un pixel avec la règle du bord répliqué. Complète les tests avec les quatre positions de l'étape 1.

    ```python
    def pixel(g: grille, i: int, j: int) -> float:
        """Renvoie la valeur du pixel (i, j). Si (i, j) sort de l'image,
        renvoie la valeur du pixel du bord le plus proche."""
        pass


    def test_pixel():
        assert pixel(G, 1, 1) == 50
        ...
    ```

    ??? tip "Indice léger"
        Il faut ramener `i` et `j` séparément. Les indices de ligne valides sont ceux de l'intervalle `[0 ; len(g))`.

    ??? tip "Indice plus précis"
        Calcule d'abord deux nouveaux indices avec deux appels à `borner`, l'un pour la ligne, l'autre pour la colonne, puis lis la case de `g` à ces indices.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def pixel(g: grille, i: int, j: int) -> float:
            """Renvoie la valeur du pixel (i, j). Si (i, j) sort de l'image,
            renvoie la valeur du pixel du bord le plus proche."""
            ii = borner(i, 0, len(g))
            jj = borner(j, 0, len(g[0]))
            return g[ii][jj]


        def test_pixel():
            assert pixel(G, 1, 1) == 50
            assert pixel(G, -1, 1) == 20
            assert pixel(G, 1, 3) == 60
            assert pixel(G, -1, -1) == 10
            assert pixel(G, 3, -1) == 70
        ```

À partir d'ici, on ne lit **plus jamais** `g[i][j]` directement dans un calcul de voisinage : on passe par `pixel`. C'est elle qui porte la règle du bord, une fois pour toutes.

## Étape 3 - La moyenne d'un pixel

!!! question "Écrire `moyenne_voisinage` (obligatoire)"
    C'est la double boucle du voisinage, sans exclure `(0, 0)` et sans test de bord, puisque `pixel` s'en charge.

    ```python
    def moyenne_voisinage(g: grille, i: int, j: int) -> float:
        """Renvoie la moyenne des 9 pixels du voisinage de (i, j), bord répliqué."""
        pass


    def test_moyenne_voisinage():
        assert moyenne_voisinage(G, 1, 1) == 50
        assert moyenne_voisinage(G, 0, 0) == 210 / 9
    ```

    ??? tip "Indice léger"
        Accumule une somme dans la double boucle, et divise **après** la boucle.

    ??? tip "Indice plus précis"
        Le pixel visité est `pixel(g, i + di, j + dj)`.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def moyenne_voisinage(g: grille, i: int, j: int) -> float:
            """Renvoie la moyenne des 9 pixels du voisinage de (i, j), bord répliqué."""
            s = 0
            for di in range(-1, 2):
                for dj in range(-1, 2):
                    s = s + pixel(g, i + di, j + dj)
            return s / 9
        ```

## Étape 4 - Flouter toute l'image

Il reste à appliquer `moyenne_voisinage` à **chaque** pixel. Une première idée vient naturellement : parcourir l'image et remplacer chaque valeur sur place.

```python
def flou_en_place(g: grille) -> None:
    for i in range(0, len(g)):
        for j in range(0, len(g[0])):
            g[i][j] = moyenne_voisinage(g, i, j)
```

On l'essaie sur une image noire avec un seul point gris au centre :

```python
P = [
    [0,  0, 0],
    [0, 90, 0],
    [0,  0, 0],
]
```

!!! question "Prédire"
    1. Avec la règle du bord répliqué, le voisinage de **chaque** pixel de `P` contient le `90` exactement une fois. Quelle valeur devrait donc avoir chaque pixel flouté ?
    2. `flou_en_place` calcule d'abord `(0, 0)` et l'écrit dans `P`. Puis elle calcule `(0, 1)`. Quelle valeur de `(0, 0)` ce second calcul utilise-t-il ? Que vaut alors `(0, 1)` ?

    **Ne lance pas la cellule de code tant que tu n'as pas écrit ta réponse.**

    ??? success "Réponse"
        1. $90 / 9 = 10$ pour chaque pixel.
        2. Le calcul de `(0, 1)` lit la **nouvelle** valeur de `(0, 0)`, qui vaut déjà `10`, et il la lit deux fois à cause du bord répliqué. On obtient $(10 + 10 + 90) / 9 \approx 12{,}2$ au lieu de `10`. Chaque pixel est calculé à partir de pixels **déjà floutés** : l'erreur se propage dans tout le parcours.

!!! warning "Piège : écrire dans l'image qu'on est en train de lire"
    Tous les pixels doivent être calculés à partir de l'image **d'origine**. On construit donc une **nouvelle** grille, et on ne modifie jamais `g`. C'est le même piège que dans le jeu de la vie, où la génération suivante se calcule entièrement à partir de la génération courante.

!!! question "Écrire `flou` (obligatoire)"
    La fonction renvoie une **nouvelle** grille, de même taille que `g`. Le second test vérifie que l'image d'origine n'a pas été modifiée : complète-le.

    ```python
    def flou(g: grille) -> grille:
        """Renvoie une nouvelle grille, floutée. g n'est pas modifiée."""
        pass


    def test_flou():
        uni = [[7, 7, 7], [7, 7, 7]]
        assert flou(uni) == uni
        p = [[0, 0, 0], [0, 90, 0], [0, 0, 0]]
        assert flou(p) == [[10, 10, 10], [10, 10, 10], [10, 10, 10]]
        assert p == ...
    ```

    ??? tip "Indice léger"
        C'est la construction ligne par ligne de `init` dans le voisinage : une liste `ligne` qu'on remplit, puis qu'on ajoute au résultat.

    ??? tip "Indice plus précis"
        Dans la double boucle sur `i` et `j`, la valeur ajoutée à `ligne` est `moyenne_voisinage(g, i, j)`. On ne touche jamais à `g`.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def flou(g: grille) -> grille:
            """Renvoie une nouvelle grille, floutée. g n'est pas modifiée."""
            res = []
            for i in range(0, len(g)):
                ligne = []
                for j in range(0, len(g[0])):
                    ligne.append(moyenne_voisinage(g, i, j))
                res.append(ligne)
            return res


        def test_flou():
            uni = [[7, 7, 7], [7, 7, 7]]
            assert flou(uni) == uni
            p = [[0, 0, 0], [0, 90, 0], [0, 0, 0]]
            assert flou(p) == [[10, 10, 10], [10, 10, 10], [10, 10, 10]]
            assert p == [[0, 0, 0], [0, 90, 0], [0, 0, 0]]
        ```

## Étape 5 - Revenir à une image

`flou` produit des nombres à virgule, comme `23.33`. Or `sauver` n'accepte que des entiers entre 0 et 255. Sur la page suivante, certains filtres produiront même des valeurs **négatives** ou **supérieures à 255**.

!!! question "Écrire `vers_image` (obligatoire)"
    La fonction arrondit chaque valeur à l'entier le plus proche avec `round`, puis la ramène dans l'intervalle `[0 ; 256)`, c'est-à-dire entre 0 et 255 inclus. Tu as déjà la fonction qu'il faut pour la seconde partie.

    ```python
    def vers_image(g: grille) -> grille:
        """Renvoie une nouvelle grille d'entiers entre 0 et 255."""
        pass


    def test_vers_image():
        assert vers_image([[12.4, -30, 300.0, 254.6]]) == [[12, 0, 255, 255]]
    ```

    ??? success "Solution"
        ```python
        def vers_image(g: grille) -> grille:
            """Renvoie une nouvelle grille d'entiers entre 0 et 255."""
            res = []
            for i in range(0, len(g)):
                ligne = []
                for j in range(0, len(g[0])):
                    ligne.append(borner(round(g[i][j]), 0, 256))
                res.append(ligne)
            return res
        ```

!!! question "Flouter ta photo"
    ```python
    photo = charger("ma_photo.jpg")
    sauver(vers_image(flou(photo)), "flou.png")
    ```

    1. Ouvre `flou.png` et compare avec `gris.png`. Le flou est léger : pourquoi ?
    2. Applique `flou` **cinq fois de suite** et enregistre le résultat. Qu'observes-tu ?

    ??? success "Réponse"
        1. Chaque pixel ne se mélange qu'avec ses voisins immédiats, sur une image de plusieurs centaines de pixels de côté.
        2. Le flou s'étend : à chaque passage, un pixel reçoit l'influence de pixels un cran plus loin.
