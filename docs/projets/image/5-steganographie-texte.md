# Stéganographie, partie 2 : cacher un texte dans une image

Dans [la partie 1](4-steganographie.md), on a caché une image dans une autre, en sacrifiant 4 bits de chaque pixel. Un texte prend beaucoup moins de place qu'une image : un seul bit par pixel suffit, celui de poids faible. Changer ce bit, c'est changer la **parité** du pixel, donc le modifier de 1 au plus. Personne ne peut le voir.

## Mise en place

Un texte est une suite de caractères, et chaque caractère s'écrit en UTF-8 sur un ou plusieurs **octets** : c'est ce que tu as vu dans [le chapitre sur le texte](../../premiere/Numération/texte.md). Deux fonctions font le passage dans les deux sens. Elles sont données.

Crée un fichier `stegano_texte.py` qui commence ainsi :

```python
from image_io import charger, sauver, Grille


def octets(texte: str) -> list[int]:
    """Renvoie la liste des octets du texte encodé en UTF-8."""
    return list(texte.encode("utf-8"))


def texte_de(liste: list[int]) -> str:
    """Renvoie le texte dont la liste d'octets en UTF-8 est liste."""
    return bytes(liste).decode("utf-8")


if __name__ == "__main__":
    photo = charger("ma_photo.jpg")
```

!!! question "Combien d'octets ?"
    Sur ton cahier, prédis la valeur de `octets("Bé")`. Combien d'octets pour 2 caractères ?

    **Ne lance pas la cellule de code tant que tu n'as pas écrit ta réponse.**

    ```python
    print(octets("Bé"))
    ```

    ??? success "Réponse"
        `[66, 195, 169]` : 3 octets. `B` est un caractère ASCII, codé sur un seul octet, $66$. Le `é` en prend deux en UTF-8.

## Étape 1 - Un bit dans un pixel

Le bit de poids faible d'un pixel, c'est sa **parité** : il vaut `0` si le pixel est pair, `1` s'il est impair. En Python, c'est `p % 2`.

!!! question "À la main"
    On veut que le bit de poids faible de chaque pixel ci-dessous prenne la valeur indiquée, en changeant le pixel le moins possible. Sur ton cahier, écris le nouveau pixel.

    | pixel | 200 | 13 | 14 | 255 |
    |---|---|---|---|---|
    | bit voulu | 0 | 0 | 1 | 0 |

    ??? success "Réponse"
        $200$ (déjà pair), $12$, $15$, $254$. Seul le dernier bit change : l'écart vaut au plus $1$.

!!! question "Trouver la formule de `avec_bit` (obligatoire)"
    Trouve une expression qui donne l'octet `p` dont le bit de poids faible a été remplacé par `b`. N'utilise que `//`, `%`, `*` et `+`, sans `if`.

    ```python
    def avec_bit(p: int, b: int) -> int:
        """Renvoie l'octet p dont le bit de poids faible est remplacé par b.
        Préconditions : 0 <= p <= 255, et b vaut 0 ou 1."""
        pass


    def test_avec_bit():
        assert avec_bit(200, 0) == 200
        assert avec_bit(13, 0) == 12
        assert avec_bit(14, 1) == 15
        assert avec_bit(255, 0) == 254
        assert avec_bit(0, 1) == 1
    ```

    ??? tip "Indice léger"
        C'est la formule de `cacher_pixel` de la partie 1, avec 2 à la place de 16.

    ??? tip "Indice plus précis"
        Commence par effacer le bit de poids faible : `(p // 2) * 2` est le nombre pair juste en dessous de `p`, ou `p` lui-même.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def avec_bit(p: int, b: int) -> int:
            """Renvoie l'octet p dont le bit de poids faible est remplacé par b.
            Préconditions : 0 <= p <= 255, et b vaut 0 ou 1."""
            return (p // 2) * 2 + b
        ```

## Étape 2 - Un texte en bits

Chaque octet du texte s'écrit sur 8 bits, de poids fort à poids faible. Le texte entier devient une suite de bits, qu'on cachera un par pixel.

!!! question "À la main"
    Sur ton cahier, convertis l'écriture $65$ de la base 10 à la base 2, sur 8 bits. Puis écris la liste de ses 8 bits, poids fort en premier.

    ??? success "Réponse"
        $65 = 0100\ 0001_2$, soit `[0, 1, 0, 0, 0, 0, 0, 1]`.

!!! question "Écrire `vers_bits` (obligatoire)"
    ```python
    def vers_bits(n: int) -> list[int]:
        """Renvoie la liste des 8 bits de l'octet n, poids fort en premier.
        Précondition : 0 <= n <= 255."""
        pass


    def test_vers_bits():
        assert vers_bits(65) == [0, 1, 0, 0, 0, 0, 0, 1]
        assert vers_bits(0) == [0, 0, 0, 0, 0, 0, 0, 0]
        assert vers_bits(255) == [1, 1, 1, 1, 1, 1, 1, 1]
        assert vers_bits(182) == [1, 0, 1, 1, 0, 1, 1, 0]
    ```

    ??? tip "Indice léger"
        Le bit de poids `k` de `n` est le bit de poids faible de `n // 2 ** k`.

    ??? tip "Indice plus précis"
        Le premier bit de la liste est celui de poids 7, le dernier celui de poids 0. Pour le `i`-ème de la liste, le poids est `7 - i`.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def vers_bits(n: int) -> list[int]:
            """Renvoie la liste des 8 bits de l'octet n, poids fort en premier.
            Précondition : 0 <= n <= 255."""
            res = []
            for i in range(0, 8):
                res.append((n // 2 ** (7 - i)) % 2)
            return res
        ```

Pour retrouver le texte, il faudra savoir **où il s'arrête**. On ajoute donc à la fin un octet qui ne sert à rien d'autre : l'octet `0`, qu'aucun caractère d'un texte ordinaire n'utilise.

!!! question "Écrire `bits_du_message` (obligatoire)"
    ```python
    def bits_du_message(texte: str) -> list[int]:
        """Renvoie la liste des bits des octets du texte en UTF-8, suivis des
        8 bits de l'octet 0."""
        pass


    def test_bits_du_message():
        assert bits_du_message("") == [0, 0, 0, 0, 0, 0, 0, 0]
        assert bits_du_message("A") == [0, 1, 0, 0, 0, 0, 0, 1,
                                        0, 0, 0, 0, 0, 0, 0, 0]
        assert len(bits_du_message("Bé")) == ...
    ```

    ??? tip "Indice"
        Parcours `octets(texte)`, et ajoute au résultat les 8 bits de chaque octet, un par un. N'oublie pas l'octet `0` à la fin.

    ??? success "Solution"
        ```python
        def bits_du_message(texte: str) -> list[int]:
            """Renvoie la liste des bits des octets du texte en UTF-8, suivis des
            8 bits de l'octet 0."""
            res = []
            for o in octets(texte) + [0]:
                for b in vers_bits(o):
                    res.append(b)
            return res


        def test_bits_du_message():
            assert bits_du_message("") == [0, 0, 0, 0, 0, 0, 0, 0]
            assert bits_du_message("A") == [0, 1, 0, 0, 0, 0, 0, 1,
                                            0, 0, 0, 0, 0, 0, 0, 0]
            assert len(bits_du_message("Bé")) == 32
        ```

## Étape 3 - Cacher le texte

On parcourt les pixels **dans l'ordre de lecture** : la ligne 0 de gauche à droite, puis la ligne 1, et ainsi de suite. Le premier pixel reçoit le premier bit du message, le deuxième pixel le deuxième bit, etc. Une fois le message épuisé, les pixels restent tels quels.

!!! question "À la main"
    On cache `"A"` dans cette image de 2 lignes et 9 colonnes. Sur ton cahier, écris l'image obtenue, puis le nombre de pixels qui ont changé.

    ```python
    G = [
        [200, 201, 13, 14, 100, 255, 0, 7, 50],
        [51, 52, 53, 54, 55, 56, 57, 58, 59],
    ]
    ```

    ??? success "Réponse"
        Les 16 bits sont ceux de `bits_du_message("A")` : `0100 0001` puis `0000 0000`.

        ```
        [200, 201, 12, 14, 100, 254, 0, 7, 50],
        [50, 52, 52, 54, 54, 56, 56, 58, 59],
        ```

        6 pixels ont changé, chacun de 1. Le dernier pixel, `59`, est au-delà du message : il ne change pas.

!!! question "Écrire `cacher_texte` (obligatoire)"
    Il faut avancer en même temps dans deux structures : la grille, ligne par ligne, et la liste des bits, case par case. Un compteur `k` dit où on en est dans la liste des bits.

    ```python
    def cacher_texte(g: Grille, texte: str) -> Grille:
        """Renvoie une nouvelle grille où les bits de poids faible des premiers
        pixels, dans l'ordre de lecture, portent bits_du_message(texte).
        g n'est pas modifiée.
        Précondition : l'image a au moins len(bits_du_message(texte)) pixels."""
        pass


    def test_cacher_texte():
        g = [
            [200, 201, 13, 14, 100, 255, 0, 7, 50],
            [51, 52, 53, 54, 55, 56, 57, 58, 59],
        ]
        assert cacher_texte(g, "A") == [
            [200, 201, 12, 14, 100, 254, 0, 7, 50],
            [50, 52, 52, 54, 54, 56, 56, 58, 59],
        ]
        assert g == ...
    ```

    ??? tip "Indice léger"
        Calcule la liste des bits **une fois**, avant la double boucle. Le compteur `k` part de `0` et augmente de 1 à **chaque pixel**.

    ??? tip "Indice plus précis"
        Pour chaque pixel : si `k < len(bits)`, on ajoute `avec_bit(g[i][j], bits[k])`, sinon `g[i][j]`. Puis `k` augmente.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def cacher_texte(g: Grille, texte: str) -> Grille:
            """Renvoie une nouvelle grille où les bits de poids faible des premiers
            pixels, dans l'ordre de lecture, portent bits_du_message(texte).
            g n'est pas modifiée.
            Précondition : l'image a au moins len(bits_du_message(texte)) pixels."""
            bits = bits_du_message(texte)
            k = 0
            res = []
            for i in range(0, len(g)):
                ligne = []
                for j in range(0, len(g[0])):
                    if k < len(bits):
                        ligne.append(avec_bit(g[i][j], bits[k]))
                    else:
                        ligne.append(g[i][j])
                    k = k + 1
                res.append(ligne)
            return res
        ```

!!! warning "Piège : remettre le compteur à zéro à chaque ligne"
    Si `k = 0` est écrit **dans** la boucle sur `i`, chaque ligne recommence au premier bit du message. Le programme tourne sans erreur, et le test ci-dessus l'attrape : la deuxième ligne devient `[50, 53, 52, 54, 54, 56, 56, 59, 58]` au lieu de `[50, 52, 52, 54, 54, 56, 56, 58, 59]`, parce qu'elle reçoit de nouveau les bits de `"A"`.

## Étape 4 - Lire le texte

Pour lire, on refait le chemin à l'envers : on relève le bit de poids faible de chaque pixel, dans l'ordre de lecture, on regroupe les bits par 8, et on s'arrête au premier octet nul.

!!! question "À la main"
    Les 8 premiers pixels d'une image valent `52, 81, 120, 44, 17, 203, 99, 255`. Sur ton cahier, écris les 8 bits de poids faible, puis convertis cette écriture de la base 2 à la base 10. Quel caractère ASCII est caché ?

    ??? success "Réponse"
        `0 1 0 0 1 1 1 1`, soit $0100\ 1111_2 = 79$, le code de `O`.

!!! question "Écrire `lire_bits` (obligatoire)"
    ```python
    def lire_bits(g: Grille) -> list[int]:
        """Renvoie la liste des bits de poids faible de tous les pixels de g,
        dans l'ordre de lecture."""
        pass


    def test_lire_bits():
        assert lire_bits([[52, 81], [120, 44]]) == [0, 1, 0, 0]
    ```

    ??? success "Solution"
        ```python
        def lire_bits(g: Grille) -> list[int]:
            """Renvoie la liste des bits de poids faible de tous les pixels de g,
            dans l'ordre de lecture."""
            res = []
            for i in range(0, len(g)):
                for j in range(0, len(g[0])):
                    res.append(g[i][j] % 2)
            return res
        ```

!!! question "Écrire `vers_octet` (obligatoire)"
    C'est l'inverse de `vers_bits`, sur les 8 bits de la liste qui commencent à l'indice `debut`.

    ```python
    def vers_octet(bits: list[int], debut: int) -> int:
        """Renvoie l'octet dont les 8 bits, poids fort en premier, sont
        bits[debut], bits[debut + 1], ..., bits[debut + 7].
        Précondition : debut + 8 <= len(bits)."""
        pass


    def test_vers_octet():
        assert vers_octet([0, 1, 0, 0, 1, 1, 1, 1], 0) == 79
        assert vers_octet([1, 1, 0, 1, 0, 0, 0, 0, 0, 1], 2) == 65
        for n in range(0, 256):
            assert vers_octet(vers_bits(n), 0) == ...
    ```

    ??? tip "Indice léger"
        Le bit `bits[debut + i]` a pour poids `7 - i`.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def vers_octet(bits: list[int], debut: int) -> int:
            """Renvoie l'octet dont les 8 bits, poids fort en premier, sont
            bits[debut], bits[debut + 1], ..., bits[debut + 7].
            Précondition : debut + 8 <= len(bits)."""
            n = 0
            for i in range(0, 8):
                n = n + bits[debut + i] * 2 ** (7 - i)
            return n


        def test_vers_octet():
            assert vers_octet([0, 1, 0, 0, 1, 1, 1, 1], 0) == 79
            assert vers_octet([1, 1, 0, 1, 0, 0, 0, 0, 0, 1], 2) == 65
            for n in range(0, 256):
                assert vers_octet(vers_bits(n), 0) == n
        ```

!!! question "Écrire `lire_texte` (obligatoire)"
    On lit les octets un par un, en avançant de 8 bits à chaque fois, jusqu'au premier octet nul. Le nombre d'octets n'est pas connu à l'avance : c'est un `while`.

    ```python
    def lire_texte(g: Grille) -> str:
        """Renvoie le texte caché dans g par cacher_texte.
        Précondition : g contient un texte caché par cacher_texte."""
        pass


    def test_lire_texte():
        g = [
            [200, 201, 13, 14, 100, 255, 0, 7, 50],
            [51, 52, 53, 54, 55, 56, 57, 58, 59],
        ]
        assert lire_texte(cacher_texte(g, "A")) == "A"
        h = [[100] * 40, [100] * 40]
        assert lire_texte(cacher_texte(h, "Bé!")) == "Bé!"
    ```

    ??? tip "Indice léger"
        Calcule `lire_bits(g)` une fois. Une variable `debut` part de `0` et augmente de 8 à chaque octet lu.

    ??? tip "Indice plus précis"
        Range les octets lus dans une liste, sans l'octet nul, et termine par `texte_de` sur cette liste.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def lire_texte(g: Grille) -> str:
            """Renvoie le texte caché dans g par cacher_texte.
            Précondition : g contient un texte caché par cacher_texte."""
            bits = lire_bits(g)
            liste = []
            debut = 0
            o = vers_octet(bits, debut)
            while o != 0:
                liste.append(o)
                debut = debut + 8
                o = vers_octet(bits, debut)
            return texte_de(liste)
        ```

## Étape 5 - Sur ta photo

!!! question "Cacher et relire"
    1. Sur ton cahier : de combien un pixel peut-il changer au plus ? Verra-t-on une différence entre `photo.png` et `message.png` ?
    2. Ta photo fait `len(photo)` lignes et `len(photo[0])` colonnes. Écris le calcul du nombre maximal d'octets de texte qu'elle peut cacher.

    **Ne lance pas la cellule de code tant que tu n'as pas écrit ta réponse.**

    Ajoute à la fin du bloc `if __name__ == "__main__":`, avec ton propre texte :

    ```python
        avec_message = cacher_texte(photo, "Rendez-vous à la cantine à midi.")
        sauver(photo, "photo.png")
        sauver(avec_message, "message.png")
        print(lire_texte(charger("message.png")))
    ```

    3. Lance, compare les deux images, et vérifie que le texte est bien relu depuis le fichier.

    ??? success "Réponse"
        1. De 1 au plus, sur une échelle de 0 à 255 : aucune différence visible.
        2. Chaque pixel porte un bit, il faut 8 bits par octet, et l'octet `0` final prend 8 pixels : `len(photo) * len(photo[0]) // 8 - 1` octets. Pour une photo de 400 sur 300 pixels, $120\,000 / 8 - 1 = 14\,999$ octets, de quoi cacher un long chapitre de roman.

!!! warning "Piège : sauver en JPEG"
    Le texte se relit parce que `message.png` est un fichier **PNG**, qui garde chaque pixel exactement. Un fichier **JPEG** compresse l'image en modifiant légèrement les pixels : les bits de poids faible y sont brouillés, et le texte est perdu : `lire_texte` ne trouve plus l'octet `0` et s'arrête sur une erreur. Essaie avec `sauver(avec_message, "message.jpg")`.

## Pour aller plus loin

!!! question "Bonus 1 - Voir les bits de poids faible"
    Écris `plan_faible(g: Grille) -> Grille`, qui renvoie une image où chaque pixel vaut `255` si le pixel de `g` est impair, et `0` sinon. Sauve le plan de `photo` et celui de `avec_message`. La photo semble-t-elle contenir quelque chose d'anormal ? Et l'image qui cache un texte ?

!!! question "Bonus 2 - Plus de bits par pixel"
    Cache le texte dans les **2** bits de poids faible de chaque pixel. Combien d'octets peut-on cacher ? De combien un pixel peut-il changer au plus ?
