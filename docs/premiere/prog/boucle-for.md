# La boucle `for`

!!! note "Rappel d'ouverture (5 minutes, cours fermé)"
    Réponds **sans rouvrir** les pages précédentes, en écrivant tes réponses.

    1. Si `acc` vaut `10`, que vaut `acc` après `acc = acc + 3` ? Et dans quel ordre la machine procède-t-elle ?
    2. Avec `mot = "python"` : que valent `mot[0]`, `mot[-1]` et `len(mot)` ? Quel est le plus grand indice valide ?
    3. La fonction `double(n)` renvoie le double de `n`. Écris l'`assert` qui vérifie que `double(3)` vaut `6`. Que se passe-t-il s'il est faux ?

    ??? success "Corrigé"
        1. `13`. Le membre de droite est **calculé d'abord** (`10 + 3`), puis rangé dans `acc`. C'est ce mécanisme, répété, qui va faire toute la page d'aujourd'hui.
        2. `"p"`, `"n"` et `6`. Le plus grand indice valide est `5`, soit `len(mot) - 1` : écrire `mot[6]` lève une `IndexError`.
        3. `assert double(3) == 6`. S'il est vrai, rien ne se passe ; s'il est faux, Python lève une `AssertionError` et arrête le programme.

## L'idée : pour chaque élément d'un itérable

Faire l'appel en classe, c'est **parcourir** la classe : pour chaque élève, on applique la même procédure.

```md
Pour "chaque élève X" dans "la classe" :
    - appeler X
    - attendre la réponse de X
```

!!! abstract "Itérable et séquence"
    Un **itérable** est un objet dont on peut obtenir les éléments **un par un**. C'est exactement ce dont la boucle `for` a besoin, et rien de plus.

    Une **séquence** est un itérable particulier : c'est une **suite ordonnée d'éléments**. Comme l'ordre compte, on peut **numéroter** les éléments, et chacun a un indice.

    Tu en connais déjà un : la **chaîne de caractères** (`str`). C'est un itérable, puisqu'on en obtient les caractères un par un. C'est aussi une séquence : `"chat"` est la suite `"c"`, `"h"`, `"a"`, `"t"`, dans cet ordre, `"chat"[0]` vaut `"c"`, et `"tahc"` est une autre chaîne.

    **Toutes les séquences sont des itérables, mais tous les itérables ne sont pas des séquences.** La classe de l'appel en est un exemple : c'est un itérable, puisqu'on en appelle les élèves un par un, mais ce n'est pas une séquence. Il n'existe aucun ordre entre les élèves, et faire l'appel dans le désordre produit exactement le même effet. En Python, tu rencontreras de même les dictionnaires, que le `for` parcourt aussi, mais dont les éléments ne se repèrent pas par un indice.

Parcourir la classe élève par élève, c'est exactement ce que fait la boucle `for` en Python, sur un itérable. Son idée tient en une phrase :

!!! danger "La boucle `for`"
    **Pour chaque élément, qu'on appelle `x`, d'un itérable, répéter un bloc d'instructions (avec cette valeur de `x`).**

    ```python
    for x in iterable:
        instructions   # exécutées une fois pour chaque élément, dans l'ordre
    ```

    À chaque tour, `x` prend **la valeur de l'élément suivant** de l'itérable. Le bloc doit être **indenté**.

    Une boucle `for` consiste donc à appliquer **le même traitement** à chaque élément d'un itérable.

```python
for lettre in "chat":
    print(lettre)
```
affiche `c`, puis `h`, puis `a`, puis `t` : un tour par caractère. On applique donc **le même traitement** (afficher) à chaque caractère de `"chat"`.

??? info "Pour aller plus loin : caractère ou graphème ?"
    Pour Python, un élément d'une `str` est un **caractère Unicode**. Ce n'est pas toujours ce qu'un lecteur voit comme une « lettre » : l'unité d'écriture que l'œil perçoit s'appelle un **graphème**, et un graphème peut être formé de **plusieurs caractères**.

    Le mot `"বাংলা"` (*bangla*, le nom de la langue bengalie) se lit en **deux** graphèmes, `বাং` et `লা`. Pourtant :

    ```python
    for c in "বাংলা":
        print(c)
    ```

    fait **cinq** tours, et `len("বাংলা")` vaut `5` :

    | Tour | `c` | ce que c'est |
    | :--: | :--: | --- |
    | 1 | `ব` | la lettre *ba* |
    | 2 | `া` | le signe de voyelle *aa* |
    | 3 | `ং` | le signe *anusvara* (son « ng ») |
    | 4 | `ল` | la lettre *la* |
    | 5 | `া` | le signe de voyelle *aa* |

    Les signes des tours 2, 3 et 5 ne s'écrivent jamais seuls : ils se combinent avec la lettre qui les précède. Affichés isolément, ils apparaissent souvent accolés à un cercle pointillé.

    La boucle `for` parcourt donc les **caractères**, pas les graphèmes. La question se pose aussi en français, plus discrètement : `"é"` peut s'écrire avec un seul caractère, ou avec un `e` suivi d'un accent combinant, et `len` donne alors `1` ou `2` pour le même graphème.

    ```python
    >>> a = "é"        # un seul caractère : « e accent aigu »
    >>> b = "e" + chr(769)   # deux caractères : « e », puis l'accent aigu combinant (code 769)
    >>> print(a)
    é
    >>> print(b)
    é
    >>> len(a)
    1
    >>> len(b)
    2
    >>> a == b
    False
    ```

    Les deux chaînes s'affichent `é`, et pourtant Python les déclare **différentes** : il compare des suites de caractères, pas ce que l'œil voit.

!!! abstract "Ce que fait la machine, tour par tour"
    Déroulons `for x in "abc":` avec, dans le corps, `print(x)` :

    | Tour | `x` prend la valeur | ce qui s'affiche |
    | :--: | :--: | :--: |
    | 1 | `"a"` | `a` |
    | 2 | `"b"` | `b` |
    | 3 | `"c"` | `c` |

    Quand il n'y a plus d'élément, la boucle s'arrête. **Le point clé, c'est de savoir ce que vaut `x` à chaque tour.**

## L'accumulation : le motif fondamental

!!! fondamental "Ce qui guide tout ce qu'on va faire en programmation"
    Ce qui suit n'est pas une technique parmi d'autres : c'est **le motif qui guide tout ce qu'on va faire en programmation**. Compter, sommer, filtrer, chercher le plus petit, construire une chaîne, puis une liste, puis un dictionnaire : c'est **chaque fois** une accumulation.

    Face à un problème, la question à se poser est donc toujours la même : **comment me ramener à une accumulation ?**

La plupart des problèmes se résolvent en **construisant progressivement un résultat** dans une variable appelée l'**accumulateur**.

Exemple : doubler chaque lettre d'un texte, `"chat"` devenant `"cchhaatt"`.

1. **On crée l'accumulateur**{ .methode }. Le résultat est une chaîne, elle vaut `""` au départ (on n'a encore rien construit) :
    ```python
    acc: str = ""
    ```
2. **On parcourt, un par un, chaque**{ .methode } caractère du texte :
    ```python
    for c in txt:
    ```
3. **À chaque**{ .methode } caractère rencontré, on l'ajoute deux fois au résultat :
    ```python
        acc = acc + c + c
    ```
4. À la fin de la boucle, tous les caractères ont été traités :
    ```python
    print(acc)
    ```

!!! danger "Méthodologie de l'accumulation"
    1. Je réfléchis au **type** de mon résultat.
    2. Je me demande ce que vaut mon accumulateur quand je n'ai **pas encore commencé** le traitement.
    3. Qu'est-ce que je dois **parcourir** ?
    4. J'applique le **comportement d'accumulation** à chaque élément.

!!! note "Ce mot, tu l'as déjà rencontré"
    Dans le [Little Man Computer](../von_neumann/langage-machine.md), l'**accumulateur** est la seule case de calcul du processeur, et `ADD 15` fait `ACC ← ACC + mémoire[15]` : on prend ce qu'il y a dans l'accumulateur, **on y ajoute** quelque chose, et **on range le résultat au même endroit**.

    `acc = acc + car` est **exactement ce geste**. Ce n'est pas une coïncidence de vocabulaire : le processeur lui-même est construit autour de lui.

## Lire et prédire avant d'écrire

Avant d'écrire une boucle, entraîne-toi à **lire** celles des autres et à **prédire** leur résultat. C'est la meilleure préparation à en écrire soi-même.

!!! question "Prédire, puis modifier"
    ```python
    mot = "python"
    acc = ""
    for lettre in mot:
        acc = acc + lettre
    print(acc)
    ```

    1. Prédis l'affichage.
    2. **Modifie une seule ligne** pour que le mot s'affiche à l'envers.

    ??? warning "Réponse"
        1. `python` : chaque lettre est ajoutée **derrière** les précédentes, donc on obtient une copie du mot.
        2. Remplacer `acc = acc + lettre` par `acc = lettre + acc` : chaque lettre se place alors **devant** les précédentes, et on obtient `nohtyp`.

## Premiers exercices : accumuler en parcourant une chaîne

!!! note "Les indices sont faits pour être ouverts"
    Ouvrir un indice n'est pas tricher, et ce n'est pas non plus un aveu. Ce qui coûte, ce n'est pas de demander de l'aide, c'est de rester bloqué vingt minutes sans rien produire, ou d'ouvrir la solution sans avoir compris ce qui bloquait.

    La seule règle : quand un indice te débloque, **écris en une phrase ce qu'il t'a appris sur ton erreur** avant de continuer. C'est cette phrase qui reste, pas la solution recopiée.

!!! question "1 - Afficher un par un"
    Avec `mot = "bonjour"`, affiche les caractères de `mot` un par un, un par ligne.

    ??? success "Solution"
        ```python
        mot = "bonjour"
        for car in mot:
            print(car)
        ```
        Pas encore d'accumulateur : on applique seulement **le même traitement** à chaque caractère.

!!! question "2 - Tripler"
    Avec `mot = "chat"`, construis dans `acc` la chaîne où chaque caractère est répété trois fois, puis affiche `acc`. On doit obtenir `ccchhhaaattt`.

    ??? tip "Indice léger"
        C'est l'exemple « doubler » du cours, à un détail près. Qu'est-ce qui change, et qu'est-ce qui ne change pas ?

    ??? success "Solution"
        ```python
        mot = "chat"
        acc = ""
        for car in mot:
            acc = acc + car + car + car
        print(acc)
        ```

!!! question "3 - Renverser, de mémoire"
    Sans remonter au bloc « Prédire, puis modifier », écris le programme qui construit dans `acc` la chaîne `mot` à l'envers, avec `mot = "python"`, puis affiche `acc`.

    ??? tip "Indice léger"
        Dans `acc`, où doit aller chaque nouveau caractère : **avant** ou **après** ceux qui y sont déjà ?

    ??? success "Solution"
        ```python
        mot = "python"
        acc = ""
        for car in mot:
            acc = car + acc
        print(acc)      # nohtyp
        ```

!!! question "4 - Compter"
    Avec `mot = "anticonstitutionnellement"`, compte les caractères de `mot` **sans utiliser `len`**, puis affiche le résultat.

    1. Avant la première itération de la boucle, combien de caractères as-tu comptés ? C'est la valeur de départ de ton compteur.
    2. Écris le programme, puis vérifie ton résultat avec `len(mot)`.

    ??? tip "Indice léger"
        Cette fois, l'accumulateur n'est pas une chaîne mais un **entier** : à chaque caractère, il augmente de `1`.

    ??? success "Solution"
        1. **Zéro** : tant qu'on n'a parcouru aucun caractère, on n'en a compté aucun. C'est pour cela que le compteur part de `0`.
        2. ```python
           mot = "anticonstitutionnellement"
           compteur = 0
           for car in mot:
               compteur = compteur + 1
           print(compteur)     # 25, comme len(mot)
           ```

## Itérer de manière conditionnelle

Jusqu'ici, chaque chapitre apportait sa notion : les fonctions, puis les conditionnelles, puis les boucles. Dans un vrai programme, on ne choisit pas l'une **ou** l'autre : on a besoin de **tout en même temps**. On les combine donc à la fin de chaque chapitre, et c'est **ce qu'on te demande réellement de savoir faire**.

Souvent, on n'accumule que les éléments qui **remplissent une condition** : on place alors un **branchement conditionnel** (un `if`, voir [Les conditionnelles](conditionnelles.md)) **à l'intérieur** de la boucle.

!!! question "Que fait ce programme ?"
    Lis ce programme, puis écris sur ton cahier :

    - ce qu'il affiche ;
    - **une phrase** qui dit ce qu'il fait, sans parler de Python : à quelle question répond-il ?

    **N'exécute pas ce code tant que tu n'as pas écrit tes réponses.**

    ```python
    x = "3615246616"

    n = 0
    for c in x:
        if c == "6":
            n = n + 1
    print(n)
    ```

    ??? success "Réponse"
        Il affiche `4`. Il **compte combien de fois le chiffre 6 apparaît** dans la chaîne : si `x` note une série de lancers de dé, il dit combien de fois le 6 est sorti.

        Les noms `x`, `n` et `c` ne t'aidaient pas : il fallait lire le code. Avec de bons noms, `lancers`, `nb_six` et `de`, la phrase se serait presque écrite toute seule. C'est à cela que sert un nom.

!!! question "Sans les espaces"
    Avec `phrase = "le petit chat"`, construis dans `acc` la phrase privée de tous ses espaces, puis affiche `acc`. On doit obtenir `lepetitchat`.

    ??? tip "Indice léger"
        Reprends les quatre étapes de la méthodologie. Le filtre ne change ni l'initialisation ni le parcours : il ne change que ce qui se passe **dans** la boucle.

    ??? tip "Indice plus précis"
        Un accumulateur `acc = ""` avant, un parcours `for car in phrase`, et **dans** la boucle un `if car != " "` avant d'ajouter.

    ??? question "Avant d'ouvrir la solution"
        Écris une phrase sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui bloquait dans **ton** code ?

        Une phrase suffit, et elle doit parler de ton code, pas du cours. C'est ce geste qui fait la différence entre finir l'exercice et savoir le refaire seul la prochaine fois.

    ??? success "Solution"
        ```python
        phrase = "le petit chat"
        acc = ""
        for car in phrase:
            if car != " ":
                acc = acc + car
        print(acc)
        ```

!!! question "Remplacer un caractère"
    Avec `phrase = "bonjour le monde"`, construis dans `acc` la phrase où chaque `"o"` est remplacé par un `"0"` (le chiffre zéro), puis affiche `acc`. On doit obtenir `b0nj0ur le m0nde`.

    ??? tip "Indice léger"
        Cette fois, **chaque** caractère va dans `acc`. La condition ne décide pas **si** on ajoute, elle décide **quoi** ajouter.

    ??? tip "Indice plus précis"
        Dans la boucle, un `if car == "o"` qui ajoute `"0"`, et un `else` qui ajoute `car` tel quel.

    ??? question "Avant d'ouvrir la solution"
        Écris une phrase sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui bloquait dans **ton** code ?

    ??? success "Solution"
        ```python
        phrase = "bonjour le monde"
        acc = ""
        for car in phrase:
            if car == "o":
                acc = acc + "0"
            else:
                acc = acc + car
        print(acc)
        ```
        Compare avec *Sans les espaces* : là, certains caractères n'étaient **pas** ajoutés ; ici, il y a toujours un ajout, seule sa valeur change.

## Objectif final : tout dans des fonctions

!!! question "1 - Nombre de voyelles"
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

!!! question "2 - Contient (sans l'opérateur `in`)"
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

!!! question "3 - Première lettre la plus petite (sans la fonction `min`)"
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


!!! question "4 - Tout reprendre en fonctions"
    Reprends les exercices de la page qui **construisent un résultat** et transforme chacun en **fonction** : le texte devient un **paramètre**, et le résultat est **renvoyé** au lieu d'être affiché. Pour chaque fonction, écris la signature et la docstring, puis complète sa fonction de test, et seulement ensuite le code.

    ```python
    def tripler(txt: str) -> str:
        """Renvoie txt où chaque caractère est répété trois fois."""
        ...

    def test_tripler():
        assert tripler("chat") == "ccchhhaaattt"
        ...

    def renverser(txt: str) -> str:
        """Renvoie txt à l'envers."""
        ...

    def test_renverser():
        assert renverser("python") == "nohtyp"
        ...

    def longueur(txt: str) -> int:
        """Renvoie le nombre de caractères de txt, sans utiliser len."""
        ...

    def test_longueur():
        ...

    def sans_espaces(txt: str) -> str:
        """Renvoie txt privé de tous ses espaces."""
        ...

    def test_sans_espaces():
        ...

    def remplacer(txt: str, ancien: str, nouveau: str) -> str:
        """Renvoie txt où chaque caractère ancien est remplacé par nouveau."""
        ...

    def test_remplacer():
        assert remplacer("bonjour le monde", "o", "0") == "b0nj0ur le m0nde"
        ...
    ```

    ??? success "Corrigé"
        ```python
        def tripler(txt: str) -> str:
            """Renvoie txt où chaque caractère est répété trois fois."""
            acc = ""
            for car in txt:
                acc = acc + car + car + car
            return acc

        def test_tripler():
            assert tripler("chat") == "ccchhhaaattt"
            assert tripler("") == ""

        def renverser(txt: str) -> str:
            """Renvoie txt à l'envers."""
            acc = ""
            for car in txt:
                acc = car + acc
            return acc

        def test_renverser():
            assert renverser("python") == "nohtyp"
            assert renverser("") == ""
            assert renverser("a") == "a"

        def longueur(txt: str) -> int:
            """Renvoie le nombre de caractères de txt, sans utiliser len."""
            compteur = 0
            for car in txt:
                compteur = compteur + 1
            return compteur

        def test_longueur():
            assert longueur("anticonstitutionnellement") == 25
            assert longueur("") == 0

        def sans_espaces(txt: str) -> str:
            """Renvoie txt privé de tous ses espaces."""
            acc = ""
            for car in txt:
                if car != " ":
                    acc = acc + car
            return acc

        def test_sans_espaces():
            assert sans_espaces("le petit chat") == "lepetitchat"
            assert sans_espaces("") == ""
            assert sans_espaces("   ") == ""

        def remplacer(txt: str, ancien: str, nouveau: str) -> str:
            """Renvoie txt où chaque caractère ancien est remplacé par nouveau."""
            acc = ""
            for car in txt:
                if car == ancien:
                    acc = acc + nouveau
                else:
                    acc = acc + car
            return acc

        def test_remplacer():
            assert remplacer("bonjour le monde", "o", "0") == "b0nj0ur le m0nde"
            assert remplacer("chat", "z", "0") == "chat"
            assert remplacer("", "o", "0") == ""
        ```
        Dans chaque test, le cas de la chaîne vide vérifie la valeur de départ de l'accumulateur : c'est ce que la fonction renvoie quand la boucle ne fait aucun tour.

## Exercice d'application

!!! question "Problème : le chiffrement de César"
    Jules César chiffrait ses messages en **décalant** chaque lettre de trois rangs dans l'alphabet : `a` devient `d`, `b` devient `e`, et ainsi de suite. Arrivé au bout, on repart du début : `x` devient `a`, `y` devient `b`, `z` devient `c`.

    1. Sur ton cahier, à la main : chiffre `"zebre"` avec un décalage de `3`.
    2. Écris `decaler(car, n)`, qui décale une lettre minuscule de `n` rangs.
    3. Écris `cesar(txt, n)`, qui chiffre un texte. Seules les lettres minuscules non accentuées sont décalées, les autres caractères restent tels quels.
    4. Quel appel de `cesar` permet de **déchiffrer** un message chiffré avec un décalage de `3` ?

    Rappels : `ord(car)` donne le code d'un caractère, `chr` fait l'inverse, et les codes de `"a"` à `"z"` se suivent.

    ```python
    ALPHABET = "abcdefghijklmnopqrstuvwxyz"

    def decaler(car: str, n: int) -> str:
        """Renvoie la lettre minuscule car décalée de n rangs dans l'alphabet,
        en repartant de "a" après "z".
        Précondition : car est une lettre de ALPHABET."""
        ...

    def test_decaler():
        assert decaler("a", 3) == "d"
        assert decaler("z", 3) == "c"
        ...

    def cesar(txt: str, n: int) -> str:
        """Renvoie txt où chaque lettre de ALPHABET est décalée de n rangs,
        les autres caractères restant inchangés."""
        ...

    def test_cesar():
        assert cesar("ave cesar, morituri te salutant", 3) == "dyh fhvdu, prulwxul wh vdoxwdqw"
        ...
    ```

    ??? tip "Indice léger"
        Pour `decaler`, travaille sur le **rang** de la lettre dans l'alphabet, de `0` pour `a` à `25` pour `z`, plutôt que sur son code. Le rang s'obtient en soustrayant `ord("a")`. Pour revenir au début après `z`, pense au **reste** de la division par `26`.

    ??? tip "Indice plus précis"
        Le rang décalé vaut `(ord(car) - ord("a") + n) % 26`, et la lettre correspondante s'obtient avec `chr(... + ord("a"))`. `cesar` est une accumulation dans une chaîne avec un branchement conditionnel : si `car in ALPHABET`, on ajoute `decaler(car, n)`, sinon on ajoute `car`. C'est l'exercice « Remplacer un caractère », avec une fonction à la place du `"0"`.

    ??? question "Avant d'ouvrir la solution"
        Écris une phrase sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui bloquait dans **ton** code ?

    ??? success "Solution"
        **1.** `"cheuh"`.

        **2. et 3.**

        ```python
        ALPHABET = "abcdefghijklmnopqrstuvwxyz"

        def decaler(car: str, n: int) -> str:
            """Renvoie la lettre minuscule car décalée de n rangs dans l'alphabet,
            en repartant de "a" après "z".
            Précondition : car est une lettre de ALPHABET."""
            assert car in ALPHABET, "car doit être une lettre minuscule non accentuée"
            rang = (ord(car) - ord("a") + n) % 26
            return chr(rang + ord("a"))

        def test_decaler():
            assert decaler("a", 3) == "d"
            assert decaler("z", 3) == "c"
            assert decaler("m", 0) == "m"
            assert decaler("b", 26) == "b"

        def cesar(txt: str, n: int) -> str:
            """Renvoie txt où chaque lettre de ALPHABET est décalée de n rangs,
            les autres caractères restant inchangés."""
            acc = ""
            for car in txt:
                if car in ALPHABET:
                    acc = acc + decaler(car, n)
                else:
                    acc = acc + car
            return acc

        def test_cesar():
            assert cesar("ave cesar, morituri te salutant", 3) == "dyh fhvdu, prulwxul wh vdoxwdqw"
            assert cesar("zebre", 3) == "cheuh"
            assert cesar("", 3) == ""
            assert cesar(cesar("bonjour le monde", 3), 23) == "bonjour le monde"
        ```
        **4.** `cesar(message, 23)` : décaler encore de `23`, c'est faire `3 + 23 = 26` rangs en tout, soit un tour complet de l'alphabet. Le dernier test le vérifie.

!!! question "Problème : ROT13"
    ROT13 est le chiffrement de César avec un décalage de `13`. Il a une propriété étonnante : **chiffrer deux fois redonne le message de départ**.

    1. Écris `rot13(txt)` en **une seule ligne**, en utilisant `cesar`.
    2. Complète `test_rot13` avec un `assert` qui vérifie cette propriété sur un texte de ton choix. Pourquoi est-elle vraie ?

    ```python
    def rot13(txt: str) -> str:
        """Renvoie txt chiffré par César avec un décalage de 13."""
        ...

    def test_rot13():
        assert rot13("bonjour") == "obawbhe"
        ...
    ```

    ??? success "Solution"
        ```python
        def rot13(txt: str) -> str:
            """Renvoie txt chiffré par César avec un décalage de 13."""
            return cesar(txt, 13)

        def test_rot13():
            assert rot13("bonjour") == "obawbhe"
            assert rot13(rot13("ave cesar, morituri te salutant")) == "ave cesar, morituri te salutant"
        ```
        Deux décalages de `13` font `26` rangs, soit un tour complet de l'alphabet : chaque lettre revient à sa place. On ne teste pas seulement un résultat, on teste une **propriété**.

!!! question "Problème : palindrome"
    Un **palindrome** se lit de la même façon dans les deux sens : `"kayak"`, `"ressasser"`.

    1. Écris `est_palindrome(mot)`, en utilisant `renverser`.
    2. La phrase `"esope reste ici et se repose"` est un palindrome si on ne tient pas compte des espaces. Quel appel le vérifie, sans rien changer à `est_palindrome` ?

    ```python
    def est_palindrome(mot: str) -> bool:
        """Renvoie True si mot se lit de la même façon dans les deux sens."""
        ...

    def test_est_palindrome():
        assert est_palindrome("kayak")
        assert not est_palindrome("chat")
        ...
    ```

    ??? tip "Indice léger"
        Un mot est un palindrome quand il est **égal** à son renversement.

    ??? success "Solution"
        ```python
        def est_palindrome(mot: str) -> bool:
            """Renvoie True si mot se lit de la même façon dans les deux sens."""
            return mot == renverser(mot)

        def test_est_palindrome():
            assert est_palindrome("kayak")
            assert not est_palindrome("chat")
            assert est_palindrome("")
            assert est_palindrome(sans_espaces("esope reste ici et se repose"))
        ```
        **2.** `est_palindrome(sans_espaces("esope reste ici et se repose"))` : on enlève d'abord les espaces, puis on teste. Deux fonctions déjà écrites, combinées, sans en réécrire aucune.

!!! question "Problème : le brin complémentaire d'ADN"
    Un brin d'ADN s'écrit avec quatre lettres, `A`, `C`, `G` et `T`. Le brin qui lui fait face s'obtient en remplaçant chaque `A` par un `T`, chaque `T` par un `A`, chaque `C` par un `G` et chaque `G` par un `C`.

    Écris `complementaire(brin)`.

    ```python
    def complementaire(brin: str) -> str:
        """Renvoie le brin complémentaire de brin.
        Précondition : brin ne contient que les lettres A, C, G et T."""
        ...

    def test_complementaire():
        assert complementaire("ATTGC") == "TAACG"
        ...
    ```

    ??? tip "Indice léger"
        C'est « Remplacer un caractère », mais avec **quatre** cas au lieu de deux : `if`, puis des `elif`.

    ??? success "Solution"
        ```python
        def complementaire(brin: str) -> str:
            """Renvoie le brin complémentaire de brin.
            Précondition : brin ne contient que les lettres A, C, G et T."""
            acc = ""
            for base in brin:
                if base == "A":
                    acc = acc + "T"
                elif base == "T":
                    acc = acc + "A"
                elif base == "C":
                    acc = acc + "G"
                else:
                    acc = acc + "C"
            return acc

        def test_complementaire():
            assert complementaire("ATTGC") == "TAACG"
            assert complementaire("") == ""
            assert complementaire(complementaire("GATTACA")) == "GATTACA"
        ```
        Le dernier test vérifie une propriété, comme pour ROT13 : le complémentaire du complémentaire redonne le brin de départ.

!!! question "Problème : écrire en *leet*"
    En *leet*, on remplace certaines lettres par des chiffres qui leur ressemblent : `a` par `4`, `e` par `3`, `i` par `1` et `o` par `0`. Ainsi `"elite"` devient `"3l1t3"`.

    On s'en sert pour fabriquer un mot de passe à partir d'un **mot ou d'une phrase** facile à retenir : le résultat contient des chiffres, ce que beaucoup de sites exigent. Mais les logiciels qui cherchent à casser les mots de passe essaient justement ces remplacements, qui n'ajoutent donc presque rien. Ce qui rend un mot de passe vraiment robuste, c'est sa **longueur** : une phrase entière vaut mieux qu'un mot déguisé.

    Écris `leet(txt)`.

    ```python
    def leet(txt: str) -> str:
        """Renvoie txt où a, e, i et o sont remplacés par 4, 3, 1 et 0."""
        ...

    def test_leet():
        assert leet("elite") == "3l1t3"
        ...
    ```

    ??? success "Solution"
        ```python
        def leet(txt: str) -> str:
            """Renvoie txt où a, e, i et o sont remplacés par 4, 3, 1 et 0."""
            acc = ""
            for car in txt:
                if car == "a":
                    acc = acc + "4"
                elif car == "e":
                    acc = acc + "3"
                elif car == "i":
                    acc = acc + "1"
                elif car == "o":
                    acc = acc + "0"
                else:
                    acc = acc + car
            return acc

        def test_leet():
            assert leet("elite") == "3l1t3"
            assert leet("bonjour") == "b0nj0ur"
            assert leet("") == ""
        ```

!!! question "Problème : parler javanais"
    Le **javanais** est un argot qui insère `"av"` dans les mots. Ici, on prend une règle simple : on place `"av"` **devant chaque voyelle**. Ainsi `"chat"` devient `"chavat"`.

    Écris `javanais(mot)`.

    ```python
    def javanais(mot: str) -> str:
        """Renvoie mot où "av" est inséré devant chaque voyelle."""
        ...

    def test_javanais():
        assert javanais("chat") == "chavat"
        ...
    ```

    ??? tip "Indice léger"
        Quand le caractère est une voyelle, on n'ajoute pas un morceau à `acc`, on en ajoute **deux**.

    ??? success "Solution"
        ```python
        def javanais(mot: str) -> str:
            """Renvoie mot où "av" est inséré devant chaque voyelle."""
            acc = ""
            for car in mot:
                if car in "aeiouy":
                    acc = acc + "av" + car
                else:
                    acc = acc + car
            return acc

        def test_javanais():
            assert javanais("chat") == "chavat"
            assert javanais("python") == "pavythavon"
            assert javanais("") == ""
        ```

!!! question "Problème : un mot de passe robuste"
    On décide qu'un mot de passe est **robuste** s'il a au moins `8` caractères, **et** contient au moins une majuscule, **et** au moins un chiffre.

    1. Écris `contient_majuscule(mdp)` et `contient_chiffre(mdp)`.
    2. Écris `est_robuste(mdp)`, en utilisant les deux fonctions précédentes.

    Rappels : `car.isupper()` dit si `car` est une majuscule, `car.isdigit()` s'il est un chiffre.

    ```python
    def contient_majuscule(mdp: str) -> bool:
        """Renvoie True si mdp contient au moins une majuscule."""
        ...

    def contient_chiffre(mdp: str) -> bool:
        """Renvoie True si mdp contient au moins un chiffre."""
        ...

    def est_robuste(mdp: str) -> bool:
        """Renvoie True si mdp a au moins 8 caractères, une majuscule et un chiffre."""
        ...

    def test_est_robuste():
        assert est_robuste("Tortue2026")
        assert not est_robuste("tortue2026")
        ...
    ```

    ??? tip "Indice léger"
        L'accumulateur est un **booléen**. Avant la première itération de la boucle, a-t-on trouvé une majuscule ? Que faut-il faire de lui quand on en rencontre une ?

    ??? tip "Indice plus précis"
        `trouve = False` avant la boucle ; dans la boucle, `if car.isupper(): trouve = True` ; on renvoie `trouve` après. `est_robuste` n'a pas de boucle : elle combine trois conditions avec `and`.

    ??? question "Avant d'ouvrir la solution"
        Écris une phrase sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui bloquait dans **ton** code ?

    ??? success "Solution"
        ```python
        def contient_majuscule(mdp: str) -> bool:
            """Renvoie True si mdp contient au moins une majuscule."""
            trouve = False
            for car in mdp:
                if car.isupper():
                    trouve = True
            return trouve

        def contient_chiffre(mdp: str) -> bool:
            """Renvoie True si mdp contient au moins un chiffre."""
            trouve = False
            for car in mdp:
                if car.isdigit():
                    trouve = True
            return trouve

        def est_robuste(mdp: str) -> bool:
            """Renvoie True si mdp a au moins 8 caractères, une majuscule et un chiffre."""
            return len(mdp) >= 8 and contient_majuscule(mdp) and contient_chiffre(mdp)

        def test_est_robuste():
            assert est_robuste("Tortue2026")
            assert not est_robuste("tortue2026")
            assert not est_robuste("TortueNinja")
            assert not est_robuste("T2")
        ```
        On ne remet **jamais** `trouve` à `False` dans la boucle : une fois une majuscule trouvée, elle l'est pour de bon. Et `est_robuste` ne refait aucun parcours : elle se contente de **combiner** des fonctions déjà écrites.

!!! fondamental "Le même `for`, sur tout ce qui s'itère"
    Le `for` ne change pas selon ce qu'il parcourt. Tu n'as parcouru ici que des **chaînes de caractères**, mais quand tu rencontreras les [listes](listes.md), les tuples et les dictionnaires, ce sera **EXACTEMENT** ce `for`, tu n'auras **rien de nouveau** à apprendre.

    La méthode sera exactement la même.
