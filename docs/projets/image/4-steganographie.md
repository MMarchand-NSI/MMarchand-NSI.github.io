# Stéganographie, partie 1 : cacher une image dans une autre

Chiffrer un message, c'est le rendre illisible : on voit qu'il y a un secret, mais on ne peut pas le lire. La **stéganographie** fait autre chose : elle cache **l'existence même** du message. Ici, on va cacher une photo à l'intérieur d'une autre. L'image transmise ressemble à une photo ordinaire, et seul celui qui connaît le procédé sait qu'elle en contient une seconde.

Le procédé abîme les deux images. On va **mesurer** de combien.

## Mise en place

On travaille en niveaux de gris, puis en couleur à l'étape 5, avec les mêmes outils que pour le flou : le fichier [image_io.py](image_io.py), à placer à côté de ton programme, et le type `Grille`.

```python
type Grille = list[list[int]]
```

Il te faut deux photos : la **porteuse**, celle qu'on verra, et le **secret**, celle qu'on cache. Elles doivent avoir la même taille. Télécharge les deux qu'on te donne, déjà de même taille, et place-les à côté de ton programme : [porteuse.jpg](porteuse.jpg){ download } et [secret.jpg](secret.jpg){ download }. Tu peux aussi prendre les tiennes. La fonction `recadrer` est donnée : elle garde le coin en haut à gauche d'une image, pour ramener deux photos à la même taille.

!!! info "D'où viennent ces photos"
    Leurs auteurs les ont versées dans le domaine public (licence CC0), sur Wikimedia Commons : [le paysage d'Érétrie, en Grèce](https://commons.wikimedia.org/wiki/File:Landscape_Eretria_Euboea_Greece.jpg), par Jebulon, et [le chat Arthur](https://commons.wikimedia.org/wiki/File:Arthur_the_Cat.jpg), par Adamster524. Elles sont réduites à 1200 × 800 pixels.

Crée un fichier `stegano.py` qui commence ainsi :

```python
from image_io import charger, sauver, Grille


def recadrer[T](g: list[list[T]], hauteur: int, largeur: int) -> list[list[T]]:
    """Renvoie une nouvelle grille formée des hauteur premières lignes et des
    largeur premières colonnes de g, quel que soit le type T de ses cases.
    Précondition : hauteur <= len(g) et largeur <= len(g[0])."""
    res = []
    for i in range(0, hauteur):
        ligne = []
        for j in range(0, largeur):
            ligne.append(g[i][j])
        res.append(ligne)
    return res


if __name__ == "__main__":
    porteuse = charger("porteuse.jpg")
    secret = charger("secret.jpg")
    hauteur = min(len(porteuse), len(secret))
    largeur = min(len(porteuse[0]), len(secret[0]))
    porteuse = recadrer(porteuse, hauteur, largeur)
    secret = recadrer(secret, hauteur, largeur)
```

Comme pour le flou, tout ce qui n'est pas une fonction reste dans le bloc `if __name__ == "__main__":`, à la fin du fichier.

## Étape 1 - Poids fort, poids faible

Un pixel est un entier entre 0 et 255 : il s'écrit sur **8 bits**. On le coupe en deux moitiés de 4 bits :

- les 4 bits de **poids fort**, à gauche, ceux des puissances de 2 les plus grandes,
- les 4 bits de **poids faible**, à droite.

Par exemple, $182 = 1011\ 0110_2$ : les bits de poids fort sont $1011_2$, les bits de poids faible $0110_2$.

!!! question "Couper un pixel en deux"
    Sur ton cahier, pour le pixel $200$ :

    1. Écris son écriture binaire sur 8 bits.
    2. Écris ses 4 bits de poids fort, et la valeur en base 10 de ces 4 bits lus seuls.
    3. Même question pour ses 4 bits de poids faible.
    4. Calcule la valeur du poids fort fois 16, plus celle du poids faible. Que retrouves-tu ?

    ??? success "Réponse"
        1. $200 = 1100\ 1000_2$
        2. $1100_2$, qui vaut $12$.
        3. $1000_2$, qui vaut $8$.
        4. $12 \times 16 + 8 = 200$ : on retrouve le pixel. Les 4 bits de poids fort comptent en paquets de $2^4 = 16$.

En Python, c'est donc une division entière par 16 qui donne le poids fort, et son reste qui donne le poids faible :

```python
200 // 16   # 12, les 4 bits de poids fort
200 % 16    # 8, les 4 bits de poids faible
```

!!! question "Lequel compte le plus ?"
    On modifie un pixel de deux façons. Sur ton cahier, donne dans chaque cas l'écart **le plus grand possible** entre l'ancien et le nouveau pixel.

    1. On change seulement ses 4 bits de poids faible.
    2. On change seulement ses 4 bits de poids fort.

    ??? success "Réponse"
        1. Le poids faible vaut entre $0000_2 = 0$ et $1111_2 = 15$ : l'écart vaut au plus $15$.
        2. Le poids fort vaut entre $0$ et $15$ paquets de 16 : l'écart vaut au plus $15 \times 16 = 240$.

        Un écart de 15 sur une échelle qui va jusqu'à 255 se voit à peine. C'est là qu'on va cacher le secret.

## Étape 2 - Cacher un pixel

Le procédé tient en une phrase : **on remplace les 4 bits de poids faible de la porteuse par les 4 bits de poids fort du secret.** Le pixel transmis garde donc le poids fort de la porteuse, ce qui se voit, et porte le poids fort du secret là où il ne se voit presque pas.

!!! question "À la main"
    La porteuse vaut $182 = 1011\ 0110_2$ et le secret $77 = 0100\ 1101_2$. Sur ton cahier :

    1. Écris l'écriture binaire du pixel transmis, puis sa valeur en base 10.
    2. Quel écart y a-t-il entre la porteuse et le pixel transmis ?
    3. Quels bits du secret ont été perdus ?

    ??? success "Réponse"
        1. Poids fort de la porteuse, $1011$, suivi du poids fort du secret, $0100$ : $1011\ 0100_2 = 180$.
        2. $182 - 180 = 2$.
        3. Ses 4 bits de poids faible, $1101_2$ : ils ne sont écrits nulle part.

!!! question "Écrire `cacher_pixel` (obligatoire)"
    ```python
    def cacher_pixel(p: int, s: int) -> int:
        """Renvoie le pixel formé des 4 bits de poids fort de p, suivis des
        4 bits de poids fort de s.
        Précondition : p et s sont des entiers entre 0 et 255."""
        pass


    def test_cacher_pixel():
        assert cacher_pixel(182, 77) == 180
        assert cacher_pixel(200, 255) == 207
        assert cacher_pixel(0, 255) == 15
        assert cacher_pixel(255, 0) == 240
    ```

    ??? tip "Indice léger"
        Il faut deux morceaux : le poids fort de `p`, remis à sa place, et le poids fort de `s`, placé à droite.

    ??? tip "Indice plus précis"
        Le poids fort de `p` est `p // 16`. Remis à sa place, il vaut `(p // 16) * 16`. On lui ajoute `s // 16`.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def cacher_pixel(p: int, s: int) -> int:
            """Renvoie le pixel formé des 4 bits de poids fort de p, suivis des
            4 bits de poids fort de s.
            Précondition : p et s sont des entiers entre 0 et 255."""
            return (p // 16) * 16 + s // 16
        ```

!!! question "Écrire `cacher` (obligatoire)"
    La fonction applique `cacher_pixel` à chaque pixel. Elle renvoie une **nouvelle** grille et ne modifie ni `porteuse` ni `secret`. Complète le test.

    ```python
    def cacher(porteuse: Grille, secret: Grille) -> Grille:
        """Renvoie une nouvelle grille, la porteuse dans laquelle le secret
        est caché. Précondition : les deux grilles ont la même taille."""
        pass


    def test_cacher():
        p = [[182, 0], [255, 200]]
        s = [[77, 255], [0, 255]]
        assert cacher(p, s) == [[180, 15], [240, 207]]
        assert p == ...
        assert s == ...
    ```

    ??? tip "Indice léger"
        C'est la construction ligne par ligne de `recadrer`, ou de `flou`.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def cacher(porteuse: Grille, secret: Grille) -> Grille:
            """Renvoie une nouvelle grille, la porteuse dans laquelle le secret
            est caché. Précondition : les deux grilles ont la même taille."""
            res = []
            for i in range(0, len(porteuse)):
                ligne = []
                for j in range(0, len(porteuse[0])):
                    ligne.append(cacher_pixel(porteuse[i][j], secret[i][j]))
                res.append(ligne)
            return res


        def test_cacher():
            p = [[182, 0], [255, 200]]
            s = [[77, 255], [0, 255]]
            assert cacher(p, s) == [[180, 15], [240, 207]]
            assert p == [[182, 0], [255, 200]]
            assert s == [[77, 255], [0, 255]]
        ```

!!! question "Cacher ta photo"
    Ajoute à la fin du bloc `if __name__ == "__main__":` :

    ```python
        transmise = cacher(porteuse, secret)
        sauver(porteuse, "porteuse.png")
        sauver(transmise, "transmise.png")
    ```

    1. Avant de lancer, sur ton cahier : verra-t-on une différence entre `porteuse.png` et `transmise.png` ? Appuie-toi sur l'étape 1.
    2. Lance, ouvre les deux images et compare.

    ??? success "Réponse"
        Aucun pixel ne change de plus de 15 sur 255 : la différence ne se voit pas, ou à peine dans les grandes zones unies.

## Étape 3 - Retrouver le secret

Le pixel transmis contient le poids fort du secret, mais **à droite**, à la place du poids faible. Pour le remettre à gauche, on **échange** les deux moitiés : les 4 bits de poids faible passent à gauche, les 4 bits de poids fort passent à droite.

!!! question "À la main"
    Le pixel transmis vaut $180 = 1011\ 0100_2$. Le secret valait $77$. Sur ton cahier :

    1. Échange ses deux moitiés. Écris le résultat en binaire, puis en base 10.
    2. Quel écart y a-t-il avec le secret ?
    3. D'où viennent les 4 bits de droite du résultat ?
    4. Échange à nouveau les deux moitiés du résultat. Qu'obtiens-tu ?

    ??? success "Réponse"
        1. $0100\ 1011_2 = 75$.
        2. $77 - 75 = 2$.
        3. Ce sont les 4 bits de poids fort de la **porteuse**, $1011$. Ils remplacent les 4 bits de poids faible du secret, qui ont été perdus.
        4. $1011\ 0100_2 = 180$ : on retrouve le pixel transmis. Échanger deux fois, c'est ne rien changer.

!!! question "Trouver la formule de `echanger` (obligatoire)"
    Un pixel est un **octet** : un entier sur 8 bits, entre 0 et 255. Trouve une expression qui, à partir de `p`, donne l'octet dont les 4 bits de poids fort et les 4 bits de poids faible sont intervertis. N'utilise que `//`, `%`, `*` et `+`.

    Vérifie d'abord ta formule à la main sur $180$ et sur $15$, puis écris la fonction. Le dernier test traduit la question 4 : complète-le.

    ```python
    def echanger(p: int) -> int:
        """Renvoie l'octet obtenu en échangeant les 4 bits de poids fort et
        les 4 bits de poids faible de p. Précondition : 0 <= p <= 255."""
        pass


    def test_echanger():
        assert echanger(180) == 75
        assert echanger(207) == 252
        assert echanger(15) == 240
        for p in range(0, 256):
            assert echanger(echanger(p)) == ...
    ```

    ??? tip "Indice léger"
        Sépare d'abord `p` en deux nombres entre 0 et 15, comme à l'étape 1.

    ??? tip "Indice plus précis"
        Reconstruis ensuite un octet à partir de ces deux nombres, comme dans la question 4 de l'étape 1 ($12 \times 16 + 8 = 200$), mais en les plaçant dans l'autre ordre.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def echanger(p: int) -> int:
            """Renvoie l'octet obtenu en échangeant les 4 bits de poids fort et
            les 4 bits de poids faible de p. Précondition : 0 <= p <= 255."""
            return (p % 16) * 16 + p // 16


        def test_echanger():
            assert echanger(180) == 75
            assert echanger(207) == 252
            assert echanger(15) == 240
            for p in range(0, 256):
                assert echanger(echanger(p)) == p
        ```

!!! question "Écrire `reveler` (obligatoire)"
    Écris la fonction `reveler(transmise: Grille) -> Grille`, qui renvoie une nouvelle grille où chaque pixel de `transmise` a ses deux moitiés échangées. Écris aussi sa fonction de test, avec la grille transmise de `test_cacher`.

    ??? success "Solution"
        ```python
        def reveler(transmise: Grille) -> Grille:
            """Renvoie une nouvelle grille : chaque pixel de transmise a ses
            deux moitiés de 4 bits échangées."""
            res = []
            for i in range(0, len(transmise)):
                ligne = []
                for j in range(0, len(transmise[0])):
                    ligne.append(echanger(transmise[i][j]))
                res.append(ligne)
            return res


        def test_reveler():
            t = [[180, 15], [240, 207]]
            assert reveler(t) == [[75, 240], [15, 252]]
            assert t == [[180, 15], [240, 207]]
        ```

!!! question "Révéler ta photo"
    Ajoute à la fin du bloc `if __name__ == "__main__":` :

    ```python
        revelee = reveler(transmise)
        sauver(revelee, "revelee.png")
    ```

    1. Ouvre `revelee.png` et compare-la avec ta photo secrète. Que remarques-tu dans les zones où le gris varie lentement, comme un ciel ?
    2. Distingue-t-on la porteuse dans `revelee.png` ? Pourquoi ?

    ??? success "Réponse"
        1. Le gris varie par marches : seuls les 4 bits de poids fort du secret ont été transmis, donc il ne reste que 16 niveaux de gris possibles au lieu de 256.
        2. À peine : la porteuse n'occupe plus que les 4 bits de poids faible, où elle produit des écarts de 15 au plus.

## Étape 4 - Mesurer la perte

Les deux images ont été abîmées : la porteuse en devenant l'image transmise, le secret en devenant l'image révélée. On mesure l'écart pixel par pixel.

!!! question "Le pire cas"
    1. Sur ton cahier : quel est le plus grand écart possible entre un pixel de la porteuse et le pixel transmis ? Donne une porteuse et un secret qui l'atteignent.
    2. Même question entre un pixel du secret et le pixel révélé.

    ??? success "Réponse"
        1. Le pixel transmis ne diffère de la porteuse que par ses 4 bits de poids faible : l'écart vaut au plus $15$. Il est atteint pour une porteuse $0 = 0000\ 0000_2$ et un secret $255 = 1111\ 1111_2$, qui donnent $0000\ 1111_2 = 15$.
        2. Le pixel révélé ne diffère du secret que par ses 4 bits de poids faible, remplacés par ceux de la porteuse : au plus $15$ aussi. Avec le même exemple, on révèle $1111\ 0000_2 = 240$ au lieu de $255$.

!!! question "Écrire `ecart_max` (obligatoire)"
    ```python
    def ecart_max(a: Grille, b: Grille) -> int:
        """Renvoie le plus grand écart, en valeur absolue, entre deux pixels
        à la même place dans a et dans b.
        Précondition : les deux grilles ont la même taille."""
        pass


    def test_ecart_max():
        assert ecart_max([[1, 2], [3, 4]], [[1, 2], [3, 4]]) == 0
        assert ecart_max([[0, 100]], [[15, 90]]) == 15
        assert ecart_max([[100, 0]], [[90, 15]]) == 15
    ```

    ??? tip "Indice léger"
        C'est la recherche d'un maximum, sur toutes les cases à la fois. La valeur absolue s'écrit `abs`.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def ecart_max(a: Grille, b: Grille) -> int:
            """Renvoie le plus grand écart, en valeur absolue, entre deux pixels
            à la même place dans a et dans b.
            Précondition : les deux grilles ont la même taille."""
            m = 0
            for i in range(0, len(a)):
                for j in range(0, len(a[0])):
                    e = abs(a[i][j] - b[i][j])
                    if e > m:
                        m = e
            return m
        ```

!!! question "Écrire `ecart_moyen` (entraînement)"
    Écris `ecart_moyen(a: Grille, b: Grille) -> float`, qui renvoie la moyenne des écarts en valeur absolue sur tous les pixels, avec sa fonction de test.

    ??? success "Solution"
        ```python
        def ecart_moyen(a: Grille, b: Grille) -> float:
            """Renvoie la moyenne des écarts, en valeur absolue, entre les pixels
            à la même place dans a et dans b.
            Précondition : les deux grilles ont la même taille."""
            s = 0
            for i in range(0, len(a)):
                for j in range(0, len(a[0])):
                    s = s + abs(a[i][j] - b[i][j])
            return s / (len(a) * len(a[0]))


        def test_ecart_moyen():
            assert ecart_moyen([[1, 2], [3, 4]], [[1, 2], [3, 4]]) == 0
            assert ecart_moyen([[0, 100]], [[15, 90]]) == 12.5
        ```

!!! question "La perte sur tes photos"
    Ajoute à la fin du bloc `if __name__ == "__main__":` :

    ```python
        print(ecart_max(porteuse, transmise), ecart_moyen(porteuse, transmise))
        print(ecart_max(secret, revelee), ecart_moyen(secret, revelee))
    ```

    1. Les deux écarts maximaux respectent-ils ta réponse au pire cas ?
    2. Les écarts moyens sont bien plus petits que 15. Pourquoi ?

    ??? success "Réponse"
        1. Oui : aucun ne dépasse 15.
        2. L'écart de 15 n'est atteint que si les 4 bits remplacés et les 4 bits qui les remplacent sont à l'opposé, `0000` contre `1111`. La plupart du temps, ils sont plus proches.

## Étape 5 - En couleur

Avec `charger_couleur`, une image en couleur est une `ImageCouleur` : une grille dont chaque case est un triplet `(rouge, vert, bleu)`, chaque composante étant un entier entre 0 et 255, donc sur 8 bits. `sauver` accepte aussi ce type d'image.

```python
type ImageCouleur = list[list[tuple[int, int, int]]]
```

Ajoute `charger_couleur` et `ImageCouleur` à la ligne `from image_io import ...` de ton fichier.

!!! question "Quelles fonctions changer ? (obligatoire)"
    On veut cacher une photo en couleur dans une autre. Reprends les fonctions `recadrer`, `cacher_pixel`, `cacher`, `echanger` et `reveler`. Sur ton cahier, pour chacune :

    - travaille-t-elle sur **un pixel**, ou parcourt-elle la grille **sans regarder** ce que contiennent les cases ?
    - faut-il la réécrire pour des triplets ?

    ??? success "Réponse"
        - `cacher_pixel` et `echanger` calculent sur un pixel, avec `//`, `%`, `*` et `+` : elles exigent un entier. Il faut une version pour les triplets, qui applique le même calcul à chaque composante.
        - `cacher` et `reveler` ne font que parcourir la grille et appeler la fonction précédente sur chaque case. Leur boucle reste la même : seule la fonction appelée change, et les annotations de type.
        - `recadrer` recopie les cases sans les regarder. Son type le dit : `list[list[T]]`, pour n'importe quel type `T` de case. Elle marche déjà en couleur.

!!! question "Écrire `cacher_pixel_couleur` et `echanger_couleur` (obligatoire)"
    ```python
    def cacher_pixel_couleur(p: tuple[int, int, int],
                             s: tuple[int, int, int]) -> tuple[int, int, int]:
        """Renvoie le pixel obtenu en cachant chaque composante de s dans la
        même composante de p."""
        pass


    def echanger_couleur(p: tuple[int, int, int]) -> tuple[int, int, int]:
        """Renvoie le pixel dont chaque composante a ses deux moitiés de 4 bits
        échangées."""
        pass


    def test_cacher_pixel_couleur():
        assert cacher_pixel_couleur((182, 0, 255), (77, 255, 0)) == (180, 15, 240)


    def test_echanger_couleur():
        assert echanger_couleur((180, 15, 240)) == ...
    ```

    ??? tip "Indice"
        Ne refais pas le calcul : appelle `cacher_pixel` sur `p[0]` et `s[0]`, puis sur les composantes `1` et `2`, et renvoie le triplet des trois résultats.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def cacher_pixel_couleur(p: tuple[int, int, int],
                                 s: tuple[int, int, int]) -> tuple[int, int, int]:
            """Renvoie le pixel obtenu en cachant chaque composante de s dans la
            même composante de p."""
            return (cacher_pixel(p[0], s[0]), cacher_pixel(p[1], s[1]), cacher_pixel(p[2], s[2]))


        def echanger_couleur(p: tuple[int, int, int]) -> tuple[int, int, int]:
            """Renvoie le pixel dont chaque composante a ses deux moitiés de 4 bits
            échangées."""
            return (echanger(p[0]), echanger(p[1]), echanger(p[2]))


        def test_cacher_pixel_couleur():
            assert cacher_pixel_couleur((182, 0, 255), (77, 255, 0)) == (180, 15, 240)


        def test_echanger_couleur():
            assert echanger_couleur((180, 15, 240)) == (75, 240, 15)
        ```

!!! question "Écrire `cacher_couleur` et `reveler_couleur` (obligatoire)"
    Pars de `cacher` et de `reveler` : d'après ta réponse à la première question, que faut-il y changer ? Complète les tests.

    ```python
    def cacher_couleur(porteuse: ImageCouleur, secret: ImageCouleur) -> ImageCouleur:
        """Renvoie une nouvelle image, la porteuse dans laquelle le secret
        est caché. Précondition : les deux images ont la même taille."""
        pass


    def reveler_couleur(transmise: ImageCouleur) -> ImageCouleur:
        """Renvoie une nouvelle image : chaque composante de chaque pixel de
        transmise a ses deux moitiés de 4 bits échangées."""
        pass


    def test_cacher_couleur():
        p = [[(182, 0, 255), (200, 200, 200)]]
        s = [[(77, 255, 0), (255, 0, 77)]]
        assert cacher_couleur(p, s) == [[(180, 15, 240), (207, 192, 196)]]
        assert p == ...
        assert s == ...


    def test_reveler_couleur():
        t = [[(180, 15, 240), (207, 192, 196)]]
        assert reveler_couleur(t) == ...
    ```

    ??? success "Solution"
        Une ligne change dans chaque boucle : l'appel de `cacher_pixel` devient `cacher_pixel_couleur`, celui de `echanger` devient `echanger_couleur`.

        ```python
        def cacher_couleur(porteuse: ImageCouleur, secret: ImageCouleur) -> ImageCouleur:
            """Renvoie une nouvelle image, la porteuse dans laquelle le secret
            est caché. Précondition : les deux images ont la même taille."""
            res = []
            for i in range(0, len(porteuse)):
                ligne = []
                for j in range(0, len(porteuse[0])):
                    ligne.append(cacher_pixel_couleur(porteuse[i][j], secret[i][j]))
                res.append(ligne)
            return res


        def reveler_couleur(transmise: ImageCouleur) -> ImageCouleur:
            """Renvoie une nouvelle image : chaque composante de chaque pixel de
            transmise a ses deux moitiés de 4 bits échangées."""
            res = []
            for i in range(0, len(transmise)):
                ligne = []
                for j in range(0, len(transmise[0])):
                    ligne.append(echanger_couleur(transmise[i][j]))
                res.append(ligne)
            return res


        def test_cacher_couleur():
            p = [[(182, 0, 255), (200, 200, 200)]]
            s = [[(77, 255, 0), (255, 0, 77)]]
            assert cacher_couleur(p, s) == [[(180, 15, 240), (207, 192, 196)]]
            assert p == [[(182, 0, 255), (200, 200, 200)]]
            assert s == [[(77, 255, 0), (255, 0, 77)]]


        def test_reveler_couleur():
            t = [[(180, 15, 240), (207, 192, 196)]]
            assert reveler_couleur(t) == [[(75, 240, 15), (252, 12, 76)]]
        ```

!!! question "Tes photos en couleur"
    Ajoute à la fin du bloc `if __name__ == "__main__":` :

    ```python
        porteuse_c = recadrer(charger_couleur("porteuse.jpg"), hauteur, largeur)
        secret_c = recadrer(charger_couleur("secret.jpg"), hauteur, largeur)
        transmise_c = cacher_couleur(porteuse_c, secret_c)
        sauver(transmise_c, "transmise_couleur.png")
        sauver(reveler_couleur(transmise_c), "revelee_couleur.png")
    ```

    1. Compare `transmise_couleur.png` avec ta porteuse, puis `revelee_couleur.png` avec ton secret.
    2. Peut-on appeler `ecart_max(porteuse_c, transmise_c)` ? Pourquoi ?

    ??? success "Réponse"
        1. Comme en niveaux de gris : la transmise ressemble à la porteuse, et la révélée au secret, avec des couleurs en marches, chaque composante n'ayant plus que 16 niveaux.
        2. Non : `ecart_max` calcule `a[i][j] - b[i][j]`, et Python ne sait pas soustraire deux triplets. Il faudrait mesurer l'écart composante par composante.

## Pour aller plus loin

!!! question "Bonus - Combien de bits cacher ?"
    On a coupé chaque pixel en 4 bits et 4 bits. On pourrait cacher seulement les 2 bits de poids fort du secret, ou au contraire 6.

    1. Écris `cacher_n(porteuse: Grille, secret: Grille, n: int) -> Grille`, qui cache les `n` bits de poids fort du secret dans les `n` bits de poids faible de la porteuse, pour `n` entre 1 et 7. Il faut remplacer 16 par une puissance de 2 qui dépend de `n`.
    2. Écris la fonction `reveler_n` qui va avec. Échanger les deux moitiés ne suffit plus : pourquoi ?
    3. Pour chaque `n` de 1 à 7, mesure `ecart_moyen` sur la porteuse et sur le secret. Quel `n` choisirais-tu pour que personne ne se doute de rien ? Pour transmettre un secret lisible ?
