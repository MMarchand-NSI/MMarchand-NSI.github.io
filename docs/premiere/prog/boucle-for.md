# La boucle `for`

!!! note "Rappel d'ouverture (5 minutes, cours fermé)"
    Réponds **sans rouvrir** les pages précédentes, en écrivant tes réponses.

    1. Si `res` vaut `10`, que vaut `res` après `res = res + 3` ? Et dans quel ordre la machine procède-t-elle ?
    2. Avec `mot = "python"` : que valent `mot[0]`, `mot[-1]` et `len(mot)` ? Quel est le plus grand indice valide ?
    3. Écris la condition qui teste que le caractère `c` est une voyelle.

    ??? success "Corrigé"
        1. `13`. Le membre de droite est **calculé d'abord** (`10 + 3`), puis rangé dans `res`. C'est ce mécanisme, répété, qui va faire toute la page d'aujourd'hui.
        2. `"p"`, `"n"` et `6`. Le plus grand indice valide est `5`, soit `len(mot) - 1` : écrire `mot[6]` lève une `IndexError`.
        3. `c in "aeiouy"`, ou une longue suite de `or`. La première écriture est préférable.

## L'idée : pour chaque élément d'une séquence

Faire l'appel en classe, c'est **parcourir** la liste des élèves : pour chaque élève, on applique la même procédure.

```md
Pour "chaque élève X" dans "la classe" :
    - appeler X
    - attendre la réponse de X
```

C'est exactement ce que fait la boucle `for` en Python. Son idée tient en une phrase :

!!! abstract "La boucle `for`"
    **Pour chaque élément, qu'on appelle `x`, d'une séquence, répéter un bloc d'instructions (avec cette valeur de `x`).**

    ```python
    for x in sequence:
        instructions   # exécutées une fois pour chaque élément, dans l'ordre
    ```

    À chaque tour, `x` prend **la valeur de l'élément suivant** de la séquence. Le bloc doit être **indenté**.

```python
for lettre in "chat":
    print(lettre)
```
affiche `c`, puis `h`, puis `a`, puis `t` : un tour par caractère.

!!! abstract "Ce que fait la machine, tour par tour"
    Déroulons `for x in [10, 20, 30]:` avec, dans le corps, `print(x)` :

    | Tour | `x` prend la valeur | ce qui s'affiche |
    | :--: | :--: | :--: |
    | 1 | `10` | `10` |
    | 2 | `20` | `20` |
    | 3 | `30` | `30` |

    Quand il n'y a plus d'élément, la boucle s'arrête. **Le point clé, c'est de savoir ce que vaut `x` à chaque tour.**

## `range` : un intervalle semi-ouvert d'entiers

Très souvent, on veut parcourir des **entiers**. Python fournit pour cela `range`, qui **est la séquence représentant un intervalle semi-ouvert d'entiers**.

```python
range(0, 4)    # la séquence 0, 1, 2, 3
range(5, 9)    # la séquence 5, 6, 7, 8
```

`range(a, b)` représente l'intervalle **semi-ouvert** $[a\,;\,b)$ : la borne `a` est **incluse**, la borne `b` est **exclue**. Parcourir un `range` avec `for`, c'est donc « pour chaque entier de l'intervalle » :

```python
for i in range(5, 9):
    print(i)        # affiche 5, 6, 7, 8
```

!!! tip "Deux conséquences de l'intervalle semi-ouvert"
    - `range(n)` vaut `range(0, n)` : la séquence `0, 1, ..., n-1`, soit **`n` entiers** en partant de 0.
    - Comme `b` est exclu, `b - a` est exactement le **nombre d'entiers** parcourus.

!!! note "Pourquoi ce choix n'est pas anodin"
    Exclure la borne haute peut sembler arbitraire. C'est en réalité un choix de conception qui **fait disparaître à l'avance** les erreurs de « plus ou moins un » (les bugs les plus fréquents chez les débutants) :

    - les indices d'une séquence de longueur `n` sont **exactement** `range(n)` : la longueur est la borne exclue, donc `range(len(s))` donne pile les bons indices, jamais un de trop ni un de moins ;
    - pour **couper** une séquence à la position `k`, les deux morceaux `range(0, k)` et `range(k, n)` se recollent **sans trou ni doublon** ;
    - l'intervalle **vide** s'écrit simplement `range(a, a)`.

    Ce n'est donc pas une bizarrerie de Python, mais une convention argumentée, défendue notamment par Edsger Dijkstra (*Why numbering should start at zero*, note EWD 831, 1982).

## Répéter `n` fois

« Répéter n fois » est simplement le cas où on parcourt `range(n)` **sans se soucier de l'élément**. Par convention, on nomme alors la variable `_` (souligné), pour dire « je n'utilise pas cette valeur ».

```python
for _ in range(3):
    print("Coucou !")     # affiché 3 fois
```

## L'accumulation : le motif fondamental

La plupart des problèmes se résolvent en **construisant progressivement un résultat** dans une variable appelée l'**accumulateur**. C'est le motif le plus important du cours.

Exemple : la somme des entiers de 1 à `n`.

1. On crée l'accumulateur. Une somme d'entiers est un entier, il vaut `0` au départ (on n'a rien ajouté) :
    ```python
    res: int = 0
    ```
2. On parcourt les entiers de `1` à `n`, donc `range(1, n + 1)` :
    ```python
    for i in range(1, n + 1):
    ```
3. À chaque entier rencontré, on l'ajoute au résultat :
    ```python
        res = res + i
    ```
4. À la fin de la boucle, tous les entiers ont été ajoutés :
    ```python
    print(res)
    ```

!!! danger "Méthodologie de l'accumulation"
    1. Je réfléchis au **type** de mon résultat et je l'**initialise** correctement.
    2. Qu'est-ce que je dois **parcourir** ? J'écris correctement mon parcours.
    3. Dans le parcours, j'applique à chaque élément le **comportement d'accumulation** voulu par le problème.

## Compter et filtrer : une condition dans la boucle

Souvent, on n'accumule que les éléments qui **remplissent une condition** : on place alors un `if` (voir [Les conditionnelles](conditionnelles.md)) **à l'intérieur** de la boucle. Le point délicat n'est pas le `if` en lui-même, mais **où** placer chaque ligne.

Exemple : compter combien de fois le 6 sort sur 1000 lancers de dé.

```python
from random import randint

compteur = 0                 # AVANT la boucle (une seule fois)
for _ in range(1000):        # 1000 tours
    de = randint(1, 6)
    if de == 6:              # test à CHAQUE tour
        compteur = compteur + 1
print(compteur)              # APRÈS la boucle (une seule fois)
```

!!! danger "Le piège de l'emplacement"
    Trois choses vivent à trois endroits différents :

    - l'**initialisation** de l'accumulateur : **avant** la boucle ;
    - le **test et la mise à jour** : **dans** la boucle (indentés) ;
    - l'**affichage** (ou le `return`) du résultat : **après** la boucle.

    Mettre l'initialisation dans la boucle la remettrait à zéro à chaque tour ; mettre l'affichage dans la boucle l'afficherait 1000 fois.

!!! abstract "Trois sortes d'erreurs, et elles ne se cherchent pas de la même façon"
    Le piège ci-dessus appartient à la troisième catégorie, la plus coûteuse. Apprends à les distinguer dès maintenant : c'est ce qui sépare une méthode d'un tâtonnement.

    | Type | Ce que tu observes | Ce que la machine te donne |
    | --- | --- | --- |
    | **Syntaxe** | Le programme **ne démarre pas** | Un message et un **numéro de ligne** |
    | **Exécution** | Il s'arrête **en route** (`IndexError`, `TypeError`...) | Un message et l'endroit où il a cassé |
    | **Logique** | Il tourne jusqu'au bout et donne un résultat **faux** | **Rien du tout** |

    Les deux premières te disent où regarder. La troisième ne te dit rien : c'est celle qui exige une méthode, et c'est celle que produit une initialisation mal placée. Un accumulateur remis à zéro à chaque tour ne provoque aucune erreur, il donne juste un résultat faux, sans prévenir.

!!! question "Somme des pairs"
    Écris `somme_pairs(n)` qui renvoie la somme des entiers **pairs** de `1` à `n` inclus.

    ??? tip "Indice léger"
        Reprends les trois temps de la méthodologie. Le filtre ne change ni l'initialisation ni le parcours : il ne change que ce qui se passe **dans** la boucle.

    ??? tip "Indice plus précis"
        Un accumulateur `res = 0` avant, un parcours `for i in range(1, n + 1)`, et **dans** la boucle un `if i % 2 == 0` avant d'ajouter.

    ??? success "Solution"
        ```python
        def somme_pairs(n: int) -> int:
            """Renvoie la somme des entiers pairs de 1 à n inclus."""
            res = 0
            for i in range(1, n + 1):
                if i % 2 == 0:
                    res = res + i
            return res
        ```

## Deux traitements en un seul parcours : la fusion

Parfois, on veut **deux résultats à la fois**, calculés pendant le **même** parcours. On mène alors **deux accumulateurs en parallèle** dans une seule boucle. C'est la **fusion**, et c'est le point où l'on se trompe le plus souvent : on oublie d'en initialiser un, ou on met une mise à jour au mauvais endroit.

Exemple : compter les **voyelles** *et* les **consonnes** d'un texte. Deux comptages, un seul parcours :

```python
def voyelles_et_consonnes(txt: str) -> tuple[int, int]:
    """Renvoie le nombre de voyelles et le nombre de consonnes de txt."""
    voyelles = 0      # premier accumulateur
    consonnes = 0     # second accumulateur
    for c in txt:
        if c in "aeiouy":
            voyelles = voyelles + 1     # on met à jour l'UN
        else:
            consonnes = consonnes + 1   # ou l'AUTRE, dans la même boucle
    return (voyelles, consonnes)
```

!!! danger "La fusion, à traiter pour elle-même"
    Additionner d'un côté, puis compter de l'autre, c'est facile. Les **fusionner** dans une seule boucle est une compétence à part : chaque accumulateur a sa propre initialisation (**avant**), sa propre mise à jour (**dans**), et le résultat combine les deux (**après**). Deux accumulateurs, une boucle.

!!! question "Fusion : compter et construire en un seul parcours"
    Écris `majuscules_et_compte(txt)` qui renvoie le couple formé du texte **en majuscules** et du **nombre de lettres** converties, en **un seul parcours**.

    Rappel : `c.upper()` renvoie la majuscule du caractère `c`, et `c.islower()` dit si `c` est une minuscule.

    ??? tip "Indice léger"
        Deux accumulateurs de **types différents** : l'un est une chaîne, l'autre un entier. Quelle est la valeur initiale de chacun ?

    ??? tip "Indice plus précis"
        `res = ""` et `compte = 0` avant la boucle. Dans la boucle, on ajoute `c.upper()` à `res` **à chaque tour**, mais on n'incrémente `compte` que **si** `c.islower()`.

    ??? success "Solution"
        ```python
        def majuscules_et_compte(txt: str) -> tuple[str, int]:
            """Renvoie txt en majuscules et le nombre de lettres converties."""
            res = ""
            compte = 0
            for c in txt:
                if c.islower():
                    compte = compte + 1
                res = res + c.upper()
            return (res, compte)
        ```
        Piège à repérer : les deux mises à jour ne sont **pas au même endroit**. L'une est inconditionnelle, l'autre est sous le `if`. C'est exactement ce qui rend la fusion difficile.

## Le même `for` sur les autres séquences

Pour l'instant, tu as parcouru deux choses : un `range` d'entiers et une **chaîne de caractères**. C'est déjà **le même mécanisme**, on change seulement ce qu'on parcourt.

Il y a alors **deux façons** de parcourir une séquence `s`.

**Par élément** (à privilégier, plus lisible) :

```python
for lettre in "coucou":
    print(lettre)
```

**Par indice**, quand on a besoin de la position. Les indices de `s` vont de `0` à `len(s) - 1`, donc on parcourt `range(len(s))` :

```python
s = "coucou"
for i in range(len(s)):     # i parcourt 0, 1, 2, 3, 4, 5
    print(s[i])
```

!!! note "Ce mécanisme resservira tel quel"
    Le `for` ne change pas selon ce qu'il parcourt. Quand tu rencontreras les [listes](listes.md), les tuples et les dictionnaires, tu n'auras **aucune nouvelle boucle à apprendre** : ce sera exactement ce `for`, sur une autre séquence. C'est l'un des rares endroits du cours où l'on apprend une chose une fois pour toutes.

Là encore, c'est un `for each` : « pour chaque indice `i` dans `range(len(s))` ».

!!! danger "Avant chaque exercice, deux questions"
    - **Ce que je parcours** (quelle séquence ?) ;
    - **comment je le parcours** (par élément ou par indice ?).

## Lire et prédire avant d'écrire

Avant d'écrire une boucle, entraîne-toi à **lire** celles des autres et à **prédire** leur résultat. C'est la meilleure préparation à en écrire soi-même.

!!! question "Prédire (1)"
    Que vaut `res` à la fin ? Suis-le tour par tour, puis exécute pour vérifier.

    ```python
    res = 0
    for i in range(1, 5):
        res = res + i
    print(res)
    ```

    ??? warning "Réponse"
        `10`. `res` prend successivement 0, 1, 3, 6, puis 10 (on ajoute 1, 2, 3, 4).

!!! question "Prédire, puis modifier"
    ```python
    mot = "python"
    res = ""
    for lettre in mot:
        res = lettre + res
    print(res)
    ```

    1. Prédis l'affichage.
    2. **Modifie une seule ligne** pour que le mot s'affiche à l'endroit.

    ??? warning "Réponse"
        1. `nohtyp` : chaque lettre est placée **devant** les précédentes, donc la chaîne est renversée.
        2. Remplacer `res = lettre + res` par `res = res + lettre`.

## Exercices

!!! question "1 - Parcours simple"
    ```python
    mot = "Dracofeu"
    ```
    Affiche une par une les lettres de `mot`, par élément, puis par indice.

!!! question "2 - Un caractère sur deux"
    ```python
    def un_sur_2(txt: str) -> str:
        """Renvoie la chaîne formée d'un caractère sur deux.

        >>> un_sur_2("abcdef")
        'ace'
        >>> un_sur_2("AZE")
        'AE'
        >>> un_sur_2("")
        ''
        """
        ...
    ```

!!! question "3 - Nombre de voyelles"
    On veut **compter** : que vaut le résultat au départ ? Complète aussi le type de retour.

    ```python
    def nb_voyelles(txt: str) -> int:
        """Renvoie le nombre de voyelles de txt.

        >>> nb_voyelles("bonjour")
        3
        >>> nb_voyelles("")
        0
        >>> nb_voyelles("aeiouy")
        6
        """
        voyelles = "aeiouy"
        ...
    ```

!!! question "4 - Renverser"
    ```python
    def renverser(txt: str) -> str:
        """Renvoie la chaîne dans l'autre sens.

        >>> renverser("banane")
        'enanab'
        >>> renverser("")
        ''
        >>> renverser("a")
        'a'
        """
        ...
    ```

!!! question "5 - Contient (sans l'opérateur `in`)"
    ```python
    def contient(c: str, txt: str) -> bool:
        """Renvoie True si le caractère c apparaît dans txt.

        >>> contient("a", "banane")
        True
        >>> contient("z", "banane")
        False
        >>> contient("a", "")
        False
        """
        ...
    ```

!!! question "6 - Somme, produit, factorielle"
    1. `somme(n)` : la somme des entiers de `1` à `n`.
    2. `produit_impairs(n)` : le produit des entiers **impairs** de `1` à `n` (attention à l'initialisation de l'accumulateur !).
    3. `factorielle(n)` : $1 \times 2 \times \dots \times n$. Que vaut `factorielle(0)` avec ton code ?

    ??? tip "Indice léger"
        Reprends la méthodologie de l'accumulation : de quel **type** est le résultat ? Quelle **valeur initiale** ne change rien à une addition ? à une multiplication ?

    ??? tip "Indice plus précis"
        Pour la somme, l'accumulateur part de `0` et on fait `res = res + x`. Pour le produit, il part de **`1`** (car multiplier par 1 ne change rien) et on fait `res = res * x`.

    ??? success "Solution"
        ```python
        def somme(n: int) -> int:
            """Renvoie la somme des entiers de 1 à n."""
            res = 0
            for i in range(1, n + 1):
                res = res + i
            return res

        def produit_impairs(n: int) -> int:
            """Renvoie le produit des entiers impairs de 1 à n."""
            res = 1
            for i in range(1, n + 1):
                if i % 2 == 1:
                    res = res * i
            return res
        ```
        `factorielle(0)` vaut `1` : la boucle `for i in range(1, 1)` ne fait aucun tour, l'accumulateur garde sa valeur initiale `1`.

!!! question "7 - Première lettre la plus petite (sans la fonction `min`)"
    Les caractères se comparent avec `<` selon l'ordre alphabétique : `"a" < "b"` vaut `True`.

    ```python
    def plus_petite_lettre(txt: str) -> str:
        """Renvoie la plus petite lettre de txt, qui n'est pas vide.

        >>> plus_petite_lettre("python")
        'h'
        >>> plus_petite_lettre("a")
        'a'
        """
        assert len(txt) > 0, "le texte ne doit pas être vide"
        ...
    ```

    ??? tip "Indice léger"
        L'accumulateur n'est pas un compteur ici : c'est **la meilleure valeur rencontrée jusqu'ici**. Par quoi l'initialiser ? Surtout pas par `""`, qui serait plus petit que tout.

    ??? tip "Indice plus précis"
        On l'initialise avec `txt[0]`, le seul candidat dont on soit sûr qu'il appartient au texte. C'est d'ailleurs à cela que sert l'`assert` : sans lui, `txt[0]` planterait sur une chaîne vide.

    ??? success "Solution"
        ```python
        def plus_petite_lettre(txt: str) -> str:
            """Renvoie la plus petite lettre de txt, qui n'est pas vide."""
            assert len(txt) > 0, "le texte ne doit pas être vide"
            mini = txt[0]
            for c in txt:
                if c < mini:
                    mini = c
            return mini
        ```
        Tu retrouveras exactement cet algorithme sur les listes, puis sur les dictionnaires. Ce n'est pas trois algorithmes, c'est le même.

!!! question "8 - Problème : bin2dec"
    Écris `bin2dec(txt)` qui convertit une écriture binaire (une chaîne de `0` et de `1`) en entier décimal.

    ```python
    >>> bin2dec("1101")
    13
    >>> bin2dec("10001000101111")
    8751
    ```

    Indications : on peut renverser la chaîne pour que l'indice de chaque chiffre corresponde à sa puissance de 2, puis calculer la somme des puissances de 2 par accumulation (parcours par indice).

---

Le `for` s'arrête toujours : il fait un tour par élément d'une séquence finie. Quand on ne sait **pas** à l'avance combien de tours faire, on utilise l'autre boucle : [La boucle non bornée `while`](boucle-while.md).
