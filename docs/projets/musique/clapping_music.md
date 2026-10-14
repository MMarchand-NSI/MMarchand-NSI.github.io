# Clapping Music

!!! warning "En construction"
    Cette activité est en cours d'écriture : son contenu peut encore changer.

En 1972, le compositeur américain Steve Reich écrit *Clapping Music*, une pièce pour deux personnes qui ne font que frapper dans leurs mains. Toute la pièce tient en un motif de 12 cases et une règle.

Le motif s'écrit avec une case par unité de temps, `x` pour une frappe et `.` pour un silence :

```
x x x . x x . x . x x .
```

**Ce que tu vas produire** : un fichier son `clapping.wav` qui joue la pièce entière, un peu moins de 4 minutes.

Crée un répertoire `projet_clapping`, et mets-y :

- `clapping.py`, pour tes fonctions, qui commence par la ligne `MOTIF: str = "xxx.xx.x.xx."`,
- `clapping_test.py`, pour tes fonctions de test, qui commence par `from clapping import *`,
- le fichier [son.py](son.py), qui sert à l'étape 4. Ne le modifie pas.

## Étape 1 - La règle

- La première personne frappe le motif en boucle, sans jamais le changer.
- La seconde frappe le même motif. Mais après un certain nombre de tours, elle le **décale d'une case** : elle commence le motif une case plus loin. Puis, après le même nombre de tours, elle le décale encore d'une case, et ainsi de suite.

Chaque passage entre deux décalages est une **section**. On les numérote à partir de 0. Voici les deux parties des sections 0 et 1, l'une sous l'autre, case par case :

```
section 0   première   x x x . x x . x . x x .
            seconde    x x x . x x . x . x x .

section 1   première   x x x . x x . x . x x .
            seconde    x x . x x . x . x x . x
```

!!! question "Frapper la pièce, par deux (obligatoire)"
    Avec ton voisin, comptez les cases de 1 à 12 à voix haute et frappez la section 0 ensemble, quatre tours de suite. Puis frappez la section 1 de la même façon.

!!! question "Écrire une section (obligatoire)"
    Sur ton cahier :

    1. Écris les deux parties de la section 3, l'une sous l'autre.
    2. Même chose pour la section 12. Que remarques-tu ?
    3. Combien la pièce a-t-elle de sections en tout ?

    ??? success "Réponse"
        ```
        section 3    première   x x x . x x . x . x x .
                     seconde    . x x . x . x x . x x x

        section 12   première   x x x . x x . x . x x .
                     seconde    x x x . x x . x . x x .
        ```

        Après 12 décalages d'une case, la seconde personne est revenue au début du motif : les deux frappent de nouveau ensemble, et la pièce s'arrête là. Elle a donc 13 sections, numérotées de 0 à 12.

## Étape 2 - Décaler

!!! question "La fonction `decaler` (obligatoire)"
    Dans `clapping.py`, écris le corps de cette fonction :

    ```python
    def decaler(motif: str, d: int) -> str:
        """Le motif commencé d cases plus loin.
        Précondition : 0 <= d <= len(motif).
        """
        ...
    ```

    Dans `clapping_test.py`, recopie ce test et complète la dernière ligne à l'aide de ton cahier :

    ```python
    def test_decaler() -> None:
        assert decaler(MOTIF, 0) == "xxx.xx.x.xx."
        assert decaler(MOTIF, 1) == "xx.xx.x.xx.x"
        assert decaler(MOTIF, 12) == "xxx.xx.x.xx."
        assert decaler(MOTIF, 3) == ...
    ```

    ??? tip "Indice"
        Le résultat est fait de deux morceaux du motif : de la case `d` jusqu'à la fin, puis du début jusqu'à la case `d` exclue.

    ??? success "Solution"
        ```python
        def decaler(motif: str, d: int) -> str:
            """Le motif commencé d cases plus loin.
            Précondition : 0 <= d <= len(motif).
            """
            assert 0 <= d <= len(motif), "il faut 0 <= d <= len(motif)"
            return motif[d:len(motif)] + motif[0:d]
        ```

        La dernière ligne du test : `".xx.x.xx.xxx"`. Avec `d = 12`, le premier morceau `motif[12:12]` est vide et le second est le motif entier : c'est bien la section 12.

## Étape 3 - La partition

Dans la pièce, chaque section est jouée 8 fois avant le décalage suivant. On écrit la partie de chaque personne comme **une seule longue chaîne**, qui contient toutes les sections les unes après les autres.

!!! question "Sur un petit motif (obligatoire)"
    On joue la pièce avec le motif `"x."`, chaque section une seule fois. Sur ton cahier :

    1. Combien y a-t-il de sections ?
    2. Écris la partie de chaque personne comme une seule chaîne.

    ??? success "Réponse"
        1. 3 sections : 2 décalages, plus la section 0.
        2. Première : `"x.x.x."`. Seconde : `"x." + ".x" + "x."`, soit `"x..xx."`.

!!! question "La fonction `partition` (obligatoire)"
    Écris le corps de cette fonction, qui renvoie la liste des deux parties :

    ```python
    def partition(motif: str, repetitions: int) -> list[str]:
        """Les deux parties de la pièce construite sur motif, chaque section
        étant jouée repetitions fois : [partie de la première, partie de la seconde].
        Précondition : motif n'est pas vide, repetitions > 0.
        """
        ...


    def test_partition() -> None:
        assert partition("x.", 1) == ["x.x.x.", "x..xx."]
        assert partition("x.", 2) == ["x.x.x.x.x.x.", "x.x..x.xx.x."]
        parties = partition(MOTIF, 8)
        assert len(parties[0]) == 13 * 8 * 12
        assert parties[1][0:12] == MOTIF
        assert parties[1][len(parties[1]) - 12:len(parties[1])] == MOTIF
    ```

    ??? tip "Indice léger"
        Il faut une boucle sur les sections et, dans chaque section, une boucle sur les répétitions. À chaque répétition, chacune des deux parties s'allonge d'un motif.

    ??? tip "Indice plus précis"
        Pour `s` dans `range(0, len(motif) + 1)`, et pour chaque répétition, ajoute `motif` au bout de la première partie, et `decaler(motif, s)` au bout de la seconde.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def partition(motif: str, repetitions: int) -> list[str]:
            """Les deux parties de la pièce construite sur motif, chaque section
            étant jouée repetitions fois : [partie de la première, partie de la seconde].
            Précondition : motif n'est pas vide, repetitions > 0.
            """
            assert len(motif) > 0 and repetitions > 0, "motif non vide et repetitions > 0"
            premiere = ""
            seconde = ""
            for s in range(0, len(motif) + 1):
                for r in range(0, repetitions):
                    premiere = premiere + motif
                    seconde = seconde + decaler(motif, s)
            return [premiere, seconde]
        ```

## Étape 4 - Écouter

`son.py` contient une seule fonction utile :

- `ecrire_wav(voix: list[str], nom_fichier: str, duree_case: float = 0.15, tours: int = 4) -> None`

Elle écrit dans un fichier `.wav` les rythmes de `voix`, joués **en même temps** et frappés dans les mains. Le fichier est en stéréo : avec deux voix, l'une est à gauche, l'autre à droite. Écoute-le au casque pour bien séparer les deux personnes. Une case dure `duree_case` secondes, et le tout est joué `tours` fois.

Crée un fichier `ecouter.py` :

```python
from clapping import *
from son import ecrire_wav

ecrire_wav(partition(MOTIF, 8), "clapping.wav", 0.18, 1)
```

`tours` vaut 1, parce que les deux parties contiennent déjà toute la pièce.

!!! question "Écouter (obligatoire)"
    1. Avant de lancer `ecouter.py`, calcule sur ton cahier la durée de la pièce en secondes, avec une case de 0,18 s.
    2. Lance `ecouter.py` et écoute `clapping.wav` en entier. Ton calcul était-il juste ?

    ??? success "Réponse à la question 1"
        13 sections × 8 répétitions × 12 cases = 1248 cases, et 1248 × 0,18 ≈ 225 secondes, soit un peu moins de 4 minutes.

## Étape 5 - Ce qu'on entend

Quand les deux personnes frappent sur la même case, on n'entend qu'un coup, plus fort. Quand elles se taisent toutes les deux, on entend un trou. D'une section à l'autre, ces cases changent de place et de nombre : c'est ce qui donne à chaque section son caractère.

!!! question "Compter à la main (obligatoire)"
    Sur ton cahier, pour la section 0 puis pour la section 1, compte :

    - les cases où les deux personnes frappent,
    - les cases où les deux se taisent.

    ??? success "Réponse"
        - Section 0 : 8 cases où les deux frappent, 4 où les deux se taisent.
        - Section 1 : 4 cases où les deux frappent, et **aucune** où les deux se taisent. On entend un flot continu de frappes, sans un seul trou.

!!! question "La fonction `frappes_communes` (obligatoire)"
    ```python
    def frappes_communes(r1: str, r2: str) -> int:
        """Nombre de cases où r1 et r2 ont tous les deux une frappe.
        Précondition : len(r1) == len(r2).
        """
        ...


    def test_frappes_communes() -> None:
        assert frappes_communes("x.x.", "xx..") == 1
        assert frappes_communes("x.x.", ".x.x") == 0
        assert frappes_communes(MOTIF, MOTIF) == 8
        assert frappes_communes(MOTIF, decaler(MOTIF, 1)) == 4
    ```

    ??? success "Solution"
        ```python
        def frappes_communes(r1: str, r2: str) -> int:
            """Nombre de cases où r1 et r2 ont tous les deux une frappe.
            Précondition : len(r1) == len(r2).
            """
            assert len(r1) == len(r2), "les deux rythmes doivent avoir la même longueur"
            total = 0
            for i in range(0, len(r1)):
                if r1[i] == "x" and r2[i] == "x":
                    total = total + 1
            return total
        ```

!!! question "Les sections sans trou (obligatoire)"
    1. Dans `ecouter.py`, écris une boucle qui affiche, pour chaque section de 0 à 12, son numéro et le nombre de frappes communes.
    2. Chaque personne frappe 8 fois par tour, sur 12 cases. Explique sur ton cahier pourquoi une section où il n'y a que 4 frappes communes n'a **aucun** trou.
    3. Quelles sections n'ont aucun trou ? Réécoute `clapping.wav` en les guettant.

    ??? success "Réponse"
        ```python
        for s in range(0, 13):
            print(s, frappes_communes(MOTIF, decaler(MOTIF, s)))
        ```

        | section | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
        |---|---|---|---|---|---|---|---|---|---|---|---|---|---|
        | frappes communes | 8 | 4 | 5 | 6 | 5 | 6 | 4 | 6 | 5 | 6 | 5 | 4 | 8 |

        À elles deux, les personnes font 16 frappes. Si 4 tombent sur la même case, ces 16 frappes occupent 16 - 4 = 12 cases, c'est-à-dire toutes. Les sections sans trou sont donc les sections 1, 6 et 11.

## Bonus - Pourquoi ce motif

!!! question "Des sections toutes différentes (bonus)"
    Avec le motif `"x.x.x.x.x.x."`, la pièce ne ferait entendre que deux sections différentes, qui reviendraient tour à tour. Écris une fonction qui compte les sections différentes que produit un motif.

    ```python
    def nb_sections_differentes(motif: str) -> int:
        """Nombre de rythmes différents parmi decaler(motif, d), pour d de 0 à len(motif) - 1.
        Précondition : motif n'est pas vide.
        """
        ...


    def test_nb_sections_differentes() -> None:
        assert nb_sections_differentes("xxxx") == 1
        assert nb_sections_differentes("x.x.x.x.x.x.") == 2
        assert nb_sections_differentes("x..x..x.") == 8
    ```

    Que vaut `nb_sections_differentes(MOTIF)` ? Écris ta prédiction sur ton cahier, puis vérifie.

    ??? tip "Indice"
        Garde une liste des rythmes déjà rencontrés. Un nouveau rythme n'y entre que s'il n'y est pas encore.

    ??? success "Solution"
        ```python
        def nb_sections_differentes(motif: str) -> int:
            """Nombre de rythmes différents parmi decaler(motif, d), pour d de 0 à len(motif) - 1.
            Précondition : motif n'est pas vide.
            """
            assert len(motif) > 0, "le motif ne peut pas être vide"
            deja_vues = []
            for d in range(0, len(motif)):
                r = decaler(motif, d)
                if r not in deja_vues:
                    deja_vues.append(r)
            return len(deja_vues)
        ```

        `nb_sections_differentes(MOTIF)` vaut 12 : Reich a choisi un motif dont aucune section ne répète une autre avant la fin.

## Bonus - Une cloche africaine

Interrogé sur l'origine de son motif, Reich répond : « *It's just a variation on the African pattern* », c'est-à-dire une ligne de cloche que l'on joue dans de nombreuses musiques d'Afrique de l'Ouest. On peut l'écrire ainsi :

```python
CLOCHE: str = "x.xx.x.xx.x."
```

!!! question "Retrouver la cloche (bonus)"
    La cloche a 7 frappes, le motif de Reich en a 8. Écris une boucle qui essaie de remplacer chaque frappe de `MOTIF` par un silence, et qui affiche le numéro de la case quand le rythme obtenu est un décalage de `CLOCHE`.

    Puis écris `partition(CLOCHE, 8)` dans un fichier `.wav`, et compare avec la pièce de Reich.

    ??? success "Réponse"
        ```python
        for i in range(0, len(MOTIF)):
            if MOTIF[i] == "x":
                r = MOTIF[0:i] + "." + MOTIF[i + 1:len(MOTIF)]
                for d in range(0, len(CLOCHE)):
                    if decaler(CLOCHE, d) == r:
                        print(i)
        ```

        Une seule case convient, la case 1 : en enlevant cette frappe, on obtient `"x.x.xx.x.xx."`, qui est `decaler(CLOCHE, 10)`. Le motif de Reich, c'est la cloche avec une frappe de plus.

??? info "Sources"
    - Article *Clapping Music*, Wikipédia en anglais, consulté le 14 octobre 2026 : <https://en.wikipedia.org/wiki/Clapping_Music>. Date (1972), décalage d'une croche « *after every eight or twelve bars* », retour à l'unisson après douze décalages.
    - J. Yust, *Steve Reich's Signature Rhythm, and an Introduction to Rhythmic Qualities* : <https://people.bu.edu/jyust/reich_final.pdf>. Le motif (figure 1) et la réponse de Reich sur son origine (page 3).
    - G. Toussaint, *The Euclidean Algorithm Generates Traditional Musical Rhythms*, actes de la conférence Bridges, 2005. La ligne de cloche d'Afrique de l'Ouest.
