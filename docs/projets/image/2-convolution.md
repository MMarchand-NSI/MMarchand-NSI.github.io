# Convolution et contours

Le flou de la page précédente donne à chacun des 9 pixels du voisinage le **même poids**, $1/9$. En changeant ces poids, le même calcul produit d'autres filtres : un flou plus doux, une image plus nette, et jusqu'à la **détection des contours**.

On garde tout ce qui a été écrit : `borner`, `pixel`, `vers_image`, et la grille `G`.

```python
G = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90],
]
```

## Étape 1 - Le noyau

Les 9 poids sont rangés dans une grille 3 × 3 qu'on appelle le **noyau**. Le poids du centre s'applique au pixel lui-même, les autres à ses voisins, à la même place.

```python
FLOU = [
    [1/9, 1/9, 1/9],
    [1/9, 1/9, 1/9],
    [1/9, 1/9, 1/9],
]
```

Pour chaque pixel, on multiplie chaque valeur du voisinage par le poids qui est à la même place, et on additionne les 9 produits. Ce calcul s'appelle une **convolution**.

!!! question "Relier le déplacement à la case du noyau"
    Le voisin atteint par le déplacement `(di, dj)` est pondéré par une case du noyau. `di` et `dj` vont de `-1` à `1`, les indices du noyau de `0` à `2`.

    1. Quel poids du noyau s'applique au déplacement `(-1, -1)` ? Donne ses indices dans `noyau`.
    2. Et au déplacement `(0, 0)` ? Et à `(1, 0)` ?
    3. Écris l'expression qui donne le poids du déplacement `(di, dj)`.

    ??? success "Réponse"
        1. `noyau[0][0]`, en haut à gauche.
        2. `noyau[1][1]`, le centre. `noyau[2][1]`, en bas au milieu.
        3. `noyau[di + 1][dj + 1]`

## Étape 2 - Une convolution à la main

```python
NETTETE = [
    [ 0, -1,  0],
    [-1,  5, -1],
    [ 0, -1,  0],
]
```

!!! question "Calculer"
    Sur ton cahier, avec la règle du bord répliqué :

    - la somme pondérée par `NETTETE` au pixel `(1, 1)` de `G`,
    - la même au pixel `(0, 0)`.

    ??? success "Réponse"
        - En `(1, 1)` : $5 \times 50 - 20 - 40 - 60 - 80 = 250 - 200 = 50$. Les zéros du noyau annulent les coins.
        - En `(0, 0)` : le voisin du haut et celui de gauche sont hors de l'image et valent `10` par le bord répliqué. $5 \times 10 - 10 - 10 - 20 - 40 = -30$.

        Une valeur **négative** : un pixel ne peut pas valoir $-30$. C'est pour cela que `vers_image` ramène tout entre 0 et 255, et qu'on ne l'applique **qu'à la fin**.

## Étape 3 - Écrire la convolution

On sépare le travail en deux, comme pour le flou : d'abord **un** pixel, puis **toute** l'image. Les tests utilisent un noyau de plus, qui ne garde que le pixel lui-même :

```python
IDENTITE = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
]
```

!!! question "Écrire `somme_ponderee` (obligatoire)"
    ```python
    def somme_ponderee(g: grille, i: int, j: int, noyau: grille) -> float:
        """Renvoie la somme des pixels du voisinage de (i, j), chacun multiplié
        par le poids du noyau à la même place. Bord répliqué."""
        pass


    def test_somme_ponderee():
        assert somme_ponderee(G, 1, 1, IDENTITE) == 50
        assert somme_ponderee(G, 1, 1, NETTETE) == 50
        assert somme_ponderee(G, 0, 0, NETTETE) == -30
    ```

    ??? tip "Indice léger"
        C'est `moyenne_voisinage`, avec deux changements : chaque valeur est multipliée par son poids, et on ne divise plus par 9.

    ??? tip "Indice plus précis"
        Dans la double boucle, on ajoute `noyau[di + 1][dj + 1] * pixel(g, i + di, j + dj)`.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def somme_ponderee(g: grille, i: int, j: int, noyau: grille) -> float:
            """Renvoie la somme des pixels du voisinage de (i, j), chacun multiplié
            par le poids du noyau à la même place. Bord répliqué."""
            s = 0
            for di in range(-1, 2):
                for dj in range(-1, 2):
                    s = s + noyau[di + 1][dj + 1] * pixel(g, i + di, j + dj)
            return s
        ```

!!! question "Écrire `convolution` (obligatoire)"
    Elle renvoie une **nouvelle** grille et ne modifie pas `g`. Complète le test : que doit renvoyer une convolution par `IDENTITE` ? Et que doit valoir `copie` après l'appel ?

    ```python
    def convolution(g: grille, noyau: grille) -> grille:
        """Renvoie une nouvelle grille : chaque pixel est remplacé par la somme
        pondérée de son voisinage. g n'est pas modifiée."""
        pass


    def test_convolution():
        assert convolution(G, IDENTITE) == ...
        copie = [[10, 20, 30], [40, 50, 60], [70, 80, 90]]
        convolution(copie, NETTETE)
        assert copie == ...
    ```

    ??? tip "Indice léger"
        Reprends `flou` : seule la ligne qui calcule la valeur change.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def convolution(g: grille, noyau: grille) -> grille:
            """Renvoie une nouvelle grille : chaque pixel est remplacé par la somme
            pondérée de son voisinage. g n'est pas modifiée."""
            res = []
            for i in range(0, len(g)):
                ligne = []
                for j in range(0, len(g[0])):
                    ligne.append(somme_ponderee(g, i, j, noyau))
                res.append(ligne)
            return res


        def test_convolution():
            assert convolution(G, IDENTITE) == G
            copie = [[10, 20, 30], [40, 50, 60], [70, 80, 90]]
            convolution(copie, NETTETE)
            assert copie == [[10, 20, 30], [40, 50, 60], [70, 80, 90]]
        ```

        Le noyau `IDENTITE` ne garde que le pixel lui-même : l'image doit ressortir inchangée. C'est le premier test à écrire pour une convolution, il attrape la plupart des erreurs d'indices.

## Étape 4 - Essayer des noyaux

```python
GAUSS = [
    [1/16, 2/16, 1/16],
    [2/16, 4/16, 2/16],
    [1/16, 2/16, 1/16],
]
```

!!! question "La somme des poids"
    1. Calcule la somme des 9 poids de `FLOU`, de `GAUSS` et de `NETTETE`.
    2. Sans écrire de code : sur une image **uniforme** où tous les pixels valent `100`, que donne chacun de ces trois filtres ?
    3. Quel lien fais-tu entre les deux réponses ?

    ??? success "Réponse"
        1. Les trois valent `1`.
        2. Les trois rendent une image uniforme à `100` : sur une zone uniforme, la somme pondérée vaut $100 \times$ (somme des poids).
        3. Un noyau dont les poids font `1` conserve la luminosité des zones uniformes. Il ne change que les endroits où les pixels **diffèrent** de leurs voisins.

!!! question "Sur ta photo"
    Applique `GAUSS` puis `NETTETE` à ta photo et enregistre les deux résultats (n'oublie pas `vers_image`).

    1. Compare le flou de `GAUSS` avec celui de `FLOU`.
    2. Où l'effet de `NETTETE` se voit-il le plus : dans les zones unies ou sur les bords des objets ?

## Étape 5 - Détecter les contours : le filtre de Sobel

Un **contour**, c'est un endroit où la luminosité change brusquement entre un pixel et ses voisins. Le filtre de Sobel mesure ce changement avec deux noyaux :

```python
SOBEL_X = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1],
]

SOBEL_Y = [
    [-1, -2, -1],
    [ 0,  0,  0],
    [ 1,  2,  1],
]
```

!!! question "Avant de coder"
    1. Que vaut la somme des poids de `SOBEL_X` ? Que donne donc ce noyau sur une zone uniforme ?
    2. On prend une image noire à gauche, blanche à droite :

        ```python
        BORD = [
            [0, 0, 255, 255],
            [0, 0, 255, 255],
            [0, 0, 255, 255],
        ]
        ```

        Sur ton cahier, calcule la somme pondérée par `SOBEL_X` au pixel `(1, 0)`, puis au pixel `(1, 1)`.
    3. Que vaut la somme pondérée par `SOBEL_Y` en `(1, 1)` ? Pourquoi ?

    **Ne lance pas la cellule de code tant que tu n'as pas écrit ta réponse.**

    ??? success "Réponse"
        1. La somme vaut `0` : une zone uniforme donne `0`, c'est-à-dire du noir.
        2. En `(1, 0)`, tout le voisinage vaut `0` (la colonne de gauche est répliquée) : on obtient `0`. En `(1, 1)`, la colonne de gauche vaut `0` et celle de droite `255` : $(1 + 2 + 1) \times 255 = 1020$.
        3. `0` : les trois lignes du voisinage sont identiques, donc la ligne du haut et celle du bas s'annulent. `SOBEL_X` mesure le changement **de gauche à droite**, `SOBEL_Y` le changement **de haut en bas**.

Pour un pixel, on obtient deux nombres, `gx` avec `SOBEL_X` et `gy` avec `SOBEL_Y`. L'intensité du contour est la **norme** du vecteur `(gx, gy)` :

$$\sqrt{gx^2 + gy^2}$$

En Python, la racine carrée s'écrit `x ** 0.5`.

!!! warning "Piège : ramener entre 0 et 255 trop tôt"
    Retourne l'image `BORD` : blanche à gauche, noire à droite. En `(1, 1)`, `SOBEL_X` donne alors $-1020$. Si on passe `gx` dans `vers_image` **avant** de calculer la norme, ce $-1020$ devient `0`, et le contour **disparaît**. Les contours qui vont du clair au sombre seraient tous perdus. `vers_image` ne s'applique qu'au résultat final.

!!! question "Écrire `sobel` (obligatoire)"
    ```python
    def sobel(g: grille) -> grille:
        """Renvoie une nouvelle grille : en chaque pixel, l'intensité du contour."""
        pass


    def test_sobel():
        uni = [[100, 100, 100], [100, 100, 100], [100, 100, 100]]
        assert sobel(uni) == [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        r = sobel(BORD)
        assert r[1][0] == 0
        assert r[1][1] == 1020
    ```

    ??? tip "Indice léger"
        Calcule d'abord **deux grilles entières**, `gx` et `gy`, avec ta fonction `convolution`.

    ??? tip "Indice plus précis"
        Puis construis la grille résultat comme dans `flou`, avec en chaque case `(gx[i][j] ** 2 + gy[i][j] ** 2) ** 0.5`.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def sobel(g: grille) -> grille:
            """Renvoie une nouvelle grille : en chaque pixel, l'intensité du contour."""
            gx = convolution(g, SOBEL_X)
            gy = convolution(g, SOBEL_Y)
            res = []
            for i in range(0, len(g)):
                ligne = []
                for j in range(0, len(g[0])):
                    ligne.append((gx[i][j] ** 2 + gy[i][j] ** 2) ** 0.5)
                res.append(ligne)
            return res
        ```

!!! question "Les contours de ta photo"
    ```python
    photo = charger("ma_photo.jpg")
    sauver(vers_image(sobel(photo)), "contours.png")
    ```

    1. Ouvre `contours.png`. Qu'est-ce qui apparaît en blanc ? en noir ?
    2. Applique d'abord `GAUSS` à la photo, puis `sobel` au résultat. Qu'est-ce qui change ? Pourquoi est-ce utile sur une photo granuleuse ?

## Pour aller plus loin

!!! question "Bonus 1 - Des contours nets"
    Les contours de Sobel ont toutes les nuances de gris. Écris `seuil(g: grille, s: float) -> grille` qui renvoie une nouvelle grille où chaque pixel vaut `255` si sa valeur dépasse `s`, et `0` sinon. Applique-la au résultat de `sobel` et cherche le seuil qui donne le dessin le plus lisible.

!!! question "Bonus 2 - Un noyau plus grand"
    Un noyau peut être de taille 5 × 5, 7 × 7, toujours impaire pour avoir un centre. Écris `convolution_r(g: grille, noyau: grille) -> grille` qui accepte un noyau carré de côté $2r + 1$, avec `r = len(noyau) // 2`. Teste-la avec un flou 5 × 5 dont tous les poids valent $1/25$, et vérifie qu'avec le noyau 3 × 3 `NETTETE` elle donne le même résultat que `convolution`.

??? note "Convolution ou corrélation ?"
    En mathématiques, la convolution **retourne** le noyau (haut et bas, gauche et droite) avant de faire la somme pondérée. Le calcul écrit ici, sans retournement, s'appelle une **corrélation**. Pour les noyaux symétriques comme `FLOU`, `GAUSS` et `NETTETE`, c'est exactement la même chose. Pour `SOBEL_X` et `SOBEL_Y`, le retournement change seulement le **signe** de `gx` et de `gy`, ce qui ne change rien à la norme : les contours obtenus sont identiques.
