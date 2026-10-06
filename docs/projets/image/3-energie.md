# L'énergie d'un pixel

On associe à chaque pixel un seul nombre, son **énergie**, qui mesure **à quel point la couleur change autour de lui** : nulle au milieu d'une zone unie, forte sur un contour. Cette page construit ce nombre, puis cherche ce qu'il dit exactement de l'image, et ce qu'il ne dit pas.

Le filtre de Sobel de la page précédente mesure déjà ce changement. Mais il travaille sur l'image en **gris**, et cette page commence par montrer ce qu'il y perd.

On garde toutes les fonctions déjà écrites, en particulier `convolution`, `SOBEL_X`, `SOBEL_Y` et `vers_image`.

## Étape 1 - Ce que le gris fait disparaître

En couleur, un pixel est un triplet `(rouge, vert, bleu)`, chaque composante entre 0 et 255. Pour passer en gris, `charger` fait une moyenne **pondérée** des trois composantes :

$$0{,}299 \times \text{rouge} + 0{,}587 \times \text{vert} + 0{,}114 \times \text{bleu}$$

On prend une image rouge à gauche, grise à droite :

```python
R = (255, 0, 0)
N = (76, 76, 76)

ROUGE_GRIS = [
    [R, R, N, N],
    [R, R, N, N],
    [R, R, N, N],
]
```

!!! question "Prédire"
    1. Quelle valeur de gris donnent le pixel `R` et le pixel `N` ? Arrondis à l'entier.
    2. Que donne alors le filtre de Sobel sur la version grise de `ROUGE_GRIS` ?
    3. Y a-t-il pourtant un contour visible dans l'image en couleur ?

    ??? success "Réponse"
        1. $0{,}299 \times 255 \approx 76$ pour `R`. $(0{,}299 + 0{,}587 + 0{,}114) \times 76 = 76$ pour `N`. Les deux donnent `76`.
        2. Une image en gris uniforme à `76`, donc un Sobel nul partout.
        3. Oui, une limite nette entre le rouge et le gris. Le passage en gris l'a effacée.

Pour ne rien perdre, on applique Sobel **à chaque canal** séparément, puis on réunit les résultats.

## Étape 2 - Séparer les canaux

`image_io.py` fournit `charger_couleur`, qui rend une liste de listes de triplets :

```python
from image_io import charger_couleur, image_couleur
```

!!! question "Écrire `canal` (obligatoire)"
    La fonction extrait une seule composante de chaque pixel : `k = 0` pour le rouge, `1` pour le vert, `2` pour le bleu. Elle renvoie une grille ordinaire, à laquelle on peut appliquer `convolution`.

    ```python
    def canal(img: image_couleur, k: int) -> grille:
        """Renvoie une nouvelle grille contenant la composante k de chaque pixel."""
        pass


    def test_canal():
        assert canal(ROUGE_GRIS, 0) == [[255, 255, 76, 76], [255, 255, 76, 76], [255, 255, 76, 76]]
        assert canal(ROUGE_GRIS, 1) == [[0, 0, 76, 76], [0, 0, 76, 76], [0, 0, 76, 76]]
    ```

    ??? tip "Indice"
        C'est la construction ligne par ligne de `flou`. Le pixel `img[i][j]` est un triplet, et sa composante `k` s'écrit `img[i][j][k]`.

    ??? success "Solution"
        ```python
        def canal(img: image_couleur, k: int) -> grille:
            """Renvoie une nouvelle grille contenant la composante k de chaque pixel."""
            res = []
            for i in range(0, len(img)):
                ligne = []
                for j in range(0, len(img[0])):
                    ligne.append(img[i][j][k])
                res.append(ligne)
            return res
        ```

## Étape 3 - L'énergie, à la main

Pour chaque canal, on calcule `gx` et `gy` avec les noyaux de Sobel. Cela fait **six** nombres par pixel. L'énergie du pixel est la norme de ces six nombres :

$$\sqrt{g_{x,R}^2 + g_{y,R}^2 + g_{x,V}^2 + g_{y,V}^2 + g_{x,B}^2 + g_{y,B}^2}$$

C'est la même formule que Sobel, avec trois fois plus de termes sous la racine.

!!! question "Calculer"
    Sur `ROUGE_GRIS`, au pixel `(1, 1)`, avec la règle du bord répliqué :

    1. Donne les six valeurs $g_{x,R}$, $g_{y,R}$, $g_{x,V}$, $g_{y,V}$, $g_{x,B}$, $g_{y,B}$. Rappel : au même endroit, `BORD` donnait $(1 + 2 + 1) \times 255$.
    2. Écris l'expression de l'énergie, sans la calculer.
    3. Que vaut l'énergie au pixel `(1, 0)` ?

    ??? success "Réponse"
        1. Les trois lignes du voisinage sont identiques, donc les trois $g_y$ valent `0`. Pour les $g_x$, la colonne de gauche est soustraite à celle de droite avec les poids 1, 2, 1 :
            - rouge : $4 \times (76 - 255) = -716$
            - vert : $4 \times (76 - 0) = 304$
            - bleu : $4 \times (76 - 0) = 304$
        2. $\sqrt{716^2 + 304^2 + 304^2}$, soit environ 835. Le signe de $-716$ disparaît au carré.
        3. `0` : tout le voisinage de `(1, 0)` est rouge.

## Étape 4 - Écrire `energie`

!!! question "Écrire `energie` (obligatoire)"
    ```python
    def energie(img: image_couleur) -> grille:
        """Renvoie une nouvelle grille : en chaque pixel, la norme des six
        dérivées de Sobel (gx et gy sur chacun des trois canaux)."""
        pass


    def test_energie():
        uni = [[(10, 200, 30), (10, 200, 30)], [(10, 200, 30), (10, 200, 30)]]
        assert energie(uni) == [[0, 0], [0, 0]]
        e = energie(ROUGE_GRIS)
        assert e[1][0] == 0
        assert e[1][1] == (716 ** 2 + 304 ** 2 + 304 ** 2) ** 0.5
    ```

    ??? tip "Indice léger"
        Les trois canaux se traitent exactement de la même façon. Plutôt que d'écrire six variables, fais une boucle sur `k` dans `range(0, 3)`.

    ??? tip "Indice plus précis"
        Prépare une grille `somme` de la taille de l'image, remplie de `0`. Pour chaque canal, calcule les grilles `gx` et `gy` avec `convolution`, puis ajoute `gx[i][j] ** 2 + gy[i][j] ** 2` à chaque case de `somme`. À la fin, prends la racine de chaque case.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def energie(img: image_couleur) -> grille:
            """Renvoie une nouvelle grille : en chaque pixel, la norme des six
            dérivées de Sobel (gx et gy sur chacun des trois canaux)."""
            hauteur = len(img)
            largeur = len(img[0])
            somme = []
            for i in range(0, hauteur):
                ligne = []
                for j in range(0, largeur):
                    ligne.append(0)
                somme.append(ligne)
            for k in range(0, 3):
                c = canal(img, k)
                gx = convolution(c, SOBEL_X)
                gy = convolution(c, SOBEL_Y)
                for i in range(0, hauteur):
                    for j in range(0, largeur):
                        somme[i][j] = somme[i][j] + gx[i][j] ** 2 + gy[i][j] ** 2
            res = []
            for i in range(0, hauteur):
                ligne = []
                for j in range(0, largeur):
                    ligne.append(somme[i][j] ** 0.5)
                res.append(ligne)
            return res
        ```

        Une version avec six grilles nommées, `gx_r`, `gy_r`, `gx_v` et ainsi de suite, donne le même résultat. Elle est plus longue, et une faute de copie s'y glisse facilement.

!!! warning "Piège : un `vers_image` trop tôt"
    Comme pour Sobel, `vers_image` ne s'applique jamais à `gx` ou `gy` : leurs valeurs négatives deviendraient `0`, et les contours qui vont du clair au sombre disparaîtraient de l'énergie.

## Étape 5 - Voir l'énergie de ta photo

```python
photo = charger_couleur("ma_photo.jpg")
sauver(vers_image(energie(photo)), "energie.png")
```

!!! question "Observer"
    1. Ouvre `energie.png`. Beaucoup de zones sont d'un blanc uniforme. Quelle valeur maximale l'énergie peut-elle atteindre ? Qu'en fait `vers_image` ?
    2. Écris l'expression de l'énergie maximale possible, sans la calculer.

    ??? success "Réponse"
        1. Bien plus que 255 : `vers_image` ramène tout ce qui dépasse à 255, d'où le blanc uniforme. On ne distingue plus un contour fort d'un contour moyen.
        2. Chaque $g$ vaut au plus $4 \times 255 = 1020$ en valeur absolue, d'où la borne $\sqrt{6 \times 1020^2}$. C'est une borne : rien ne dit qu'une image l'atteint.

Pour **voir** l'énergie, on la ramène à l'échelle 0 à 255 : on divise chaque valeur par l'énergie maximale **de cette image**, puis on multiplie par 255.

!!! question "Écrire `maximum` et `normaliser` (obligatoire)"
    ```python
    def maximum(g: grille) -> float:
        """Renvoie la plus grande valeur de g. g n'est pas vide."""
        pass


    def normaliser(g: grille) -> grille:
        """Renvoie une nouvelle grille où la plus grande valeur de g devient 255,
        les autres proportionnellement. Si g ne contient que des 0, renvoie des 0."""
        pass


    def test_maximum():
        assert maximum([[3, 8], [5, 1]]) == 8


    def test_normaliser():
        assert normaliser([[0, 50], [100, 25]]) == [[0, 127.5], [255, 63.75]]
        assert normaliser([[0, 0], [0, 0]]) == [[0, 0], [0, 0]]
    ```

    ??? tip "Indice"
        Dans `maximum`, pars de `g[0][0]`, pas de `0`. Dans `normaliser`, traite le cas où le maximum vaut `0` **avant** de diviser.

    ??? success "Solution"
        ```python
        def maximum(g: grille) -> float:
            """Renvoie la plus grande valeur de g. g n'est pas vide."""
            m = g[0][0]
            for i in range(0, len(g)):
                for j in range(0, len(g[0])):
                    if g[i][j] > m:
                        m = g[i][j]
            return m


        def normaliser(g: grille) -> grille:
            """Renvoie une nouvelle grille où la plus grande valeur de g devient 255,
            les autres proportionnellement. Si g ne contient que des 0, renvoie des 0."""
            m = maximum(g)
            res = []
            for i in range(0, len(g)):
                ligne = []
                for j in range(0, len(g[0])):
                    if m == 0:
                        ligne.append(0)
                    else:
                        ligne.append(g[i][j] * 255 / m)
                res.append(ligne)
            return res
        ```

!!! question "Comparer"
    ```python
    sauver(vers_image(normaliser(energie(photo))), "energie.png")
    sauver(vers_image(normaliser(sobel(charger("ma_photo.jpg")))), "sobel_gris.png")
    ```

    1. Où l'énergie est-elle la plus faible sur ta photo ? Qu'ont ces zones en commun ?
    2. Compare `energie.png` et `sobel_gris.png`. Cherche un endroit où l'énergie montre un contour que le Sobel gris ne voit pas, ou voit à peine.

## Étape 6 - Ce que l'énergie dit, et ce qu'elle tait

L'énergie résume six nombres en un seul. On cherche maintenant ce que ce résumé garde et ce qu'il perd.

```python
R = (255, 0, 0)
N = (76, 76, 76)

GRIS_ROUGE = [
    [N, N, R, R],
    [N, N, R, R],
    [N, N, R, R],
]

HAUT_BAS = [
    [R, R, R],
    [R, R, R],
    [N, N, N],
    [N, N, N],
]
```

!!! question "Le sens et la direction"
    Tu connais déjà `energie(ROUGE_GRIS)[1]` : `[0, 835.2, 835.2, 0]` environ.

    1. `GRIS_ROUGE` est `ROUGE_GRIS` retournée de gauche à droite. Que vaut `energie(GRIS_ROUGE)[1]` ?
    2. `HAUT_BAS` porte le même contour, mais horizontal. Que valent les énergies de la colonne `1`, de la ligne `0` à la ligne `3` ?
    3. On te donne seulement la grille d'énergie d'une image. Peux-tu dire de quelle couleur sont les deux côtés d'un contour ? Lequel est le plus clair ? Si le contour est vertical ou horizontal ?

    **Ne lance pas la cellule de code tant que tu n'as pas écrit ta réponse.**

    ??? success "Réponse"
        1. La même chose, `[0, 835.2, 835.2, 0]` : les $g_x$ changent de signe, et le signe disparaît au carré.
        2. `[0, 835.2, 835.2, 0]` : cette fois ce sont les $g_y$ qui sont non nuls, et la somme des carrés est la même.
        3. Non, aucune des trois. L'énergie dit **combien** la couleur change, jamais **quoi** change, ni **dans quel sens**, ni **dans quelle direction**.

On prend maintenant une ligne rouge d'**un seul** pixel de large sur un fond gris :

```python
LIGNE = [
    [N, N, R, N, N],
    [N, N, R, N, N],
    [N, N, R, N, N],
]
```

!!! question "Une ligne fine"
    1. Prédis les énergies de la ligne `1` de `LIGNE`, colonne par colonne.
    2. L'énergie est-elle forte **sur** la ligne rouge ? Pourquoi ? Regarde les poids du centre dans `SOBEL_X` et `SOBEL_Y`.
    3. Complète la phrase : « L'énergie d'un pixel ne dépend pas de la couleur de ce pixel, elle dépend de ... ».

    **Ne lance pas la cellule de code tant que tu n'as pas écrit ta réponse.**

    ??? success "Réponse"
        1. Environ `[0, 835.2, 0, 835.2, 0]`.
        2. Non, elle est **nulle** sur la ligne. La colonne du milieu de `SOBEL_X` ne contient que des `0` : le pixel lui-même n'est pas lu, seuls ses voisins de gauche et de droite le sont. Sur la ligne rouge, les deux côtés sont gris, donc identiques.
        3. « ... de la différence entre ce qu'il y a d'un côté du pixel et ce qu'il y a de l'autre. » Une énergie nulle veut donc dire « les deux côtés sont pareils », ce qui n'est pas tout à fait « la zone est unie ».

!!! question "Contour ou texture ?"
    Sur `energie.png`, cherche une zone **texturée** de ta photo : herbe, cheveux, feuillage, tissu, grain d'un mur.

    1. Son énergie est-elle faible ou forte ?
    2. Une forte énergie signale-t-elle forcément le contour d'un objet ?

    ??? success "Réponse"
        1. Forte, et partout dans la zone : la couleur y change d'un pixel à l'autre.
        2. Non. L'énergie mesure du **changement**. Un contour d'objet en produit, une texture aussi, et le grain d'une photo prise dans le noir également.

!!! info "Ce qu'il faut retenir"
    L'énergie d'un pixel mesure **l'ampleur du changement de couleur de part et d'autre de ce pixel**.

    - **Forte** : quelque chose change à cet endroit, un contour ou une texture.
    - **Faible** : de part et d'autre du pixel, les couleurs sont les mêmes.
    - **Elle ne dit pas** quelles couleurs changent, dans quel sens, ni selon quelle direction.

    Elle se lit comme la **raideur d'une pente** sur une carte de relief : on sait que ça monte ou que ça descend fort, sans savoir vers où.
