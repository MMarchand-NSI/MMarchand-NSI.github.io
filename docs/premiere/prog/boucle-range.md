# La boucle `for` sur un intervalle semi-ouvert d'entiers

!!! note "Rappel d'ouverture (5 minutes, cours fermé)"
    Réponds **sans rouvrir** les pages précédentes, en écrivant tes réponses.

    1. Où doit se trouver l'initialisation d'un accumulateur par rapport à la boucle, et pourquoi ?
    2. Que vaut un compteur avant la première itération de la boucle ? Pourquoi ?
    3. Avec `n = 7`, qu'affiche ce code ?
       ```python
       if n % 2 == 0:
           print("pair")
       else:
           print("impair")
       ```

    ??? success "Corrigé"
        1. **Avant** la boucle. Placée dedans, elle serait remise à sa valeur de départ à chaque tour, et le résultat final ne compterait que le dernier élément.
        2. `0` : avant la première itération, on n'a encore rien compté.
        3. `impair` : `7 % 2` vaut `1`, la condition est fausse, c'est le bloc `else` qui s'exécute.

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

## Parcourir une séquence par indice

**Par indice**, quand on a besoin de la position. Les indices de `s` vont de `0` à `len(s) - 1`, donc on parcourt `range(len(s))` :

```python
s = "coucou"
for i in range(len(s)):     # i parcourt 0, 1, 2, 3, 4, 5
    print(s[i])
```

Là encore, c'est un `for each` : « pour chaque indice `i` dans `range(len(s))` ».

## Lire et prédire avant d'écrire

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

!!! question "3 - Somme, produit, factorielle"
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

!!! question "4 - Problème : bin2dec"
    Écris `bin2dec(txt)` qui convertit une écriture binaire (une chaîne de `0` et de `1`) en entier décimal.

    ```python
    >>> bin2dec("1101")
    13
    >>> bin2dec("10001000101111")
    8751
    ```

    Indications : on peut renverser la chaîne pour que l'indice de chaque chiffre corresponde à sa puissance de 2, puis calculer la somme des puissances de 2 par accumulation (parcours par indice).

!!! question "5 - `take` : garder les n premiers"
    ```python
    def take(n: int, s: str) -> str:
        """Renvoie les n premiers caractères de s.

        Si s est plus courte que n caractères, renvoie s en entier.

        >>> take(3, "python")
        'pyt'
        >>> take(0, "python")
        ''
        >>> take(10, "abc")
        'abc'
        """
        ...
    ```

    ??? tip "Indice léger"
        C'est une accumulation de caractères, donc un parcours qui construit une chaîne. Mais tu ne veux **pas tous** les caractères : il te faut un filtre, comme pour *Sans les espaces* (page [La boucle `for`](boucle-for.md)). Sur quoi porte-t-il ici ?

    ??? tip "Indice plus précis"
        Parcours **par indice** (`for i in range(len(s))`), et le filtre compare `i` à `n` : tu n'ajoutes `s[i]` à l'accumulateur que si `i < n`. Le cas `n` plus grand que `s` se règle tout seul : la boucle s'arrête avant d'avoir jamais pu être fausse.

    ??? question "Avant d'ouvrir la solution"
        Écris une phrase sur ton cahier : pourquoi ce filtre n'a-t-il **rien de spécial** à faire pour le cas `take(10, "abc")` ?

    ??? success "Solution"
        ```python
        def take(n: int, s: str) -> str:
            """Renvoie les n premiers caractères de s."""
            res = ""
            for i in range(len(s)):
                if i < n:
                    res = res + s[i]
            return res
        ```
        Aucun cas particulier : si `n` dépasse `len(s)`, la condition `i < n` reste vraie jusqu'au dernier tour, donc tous les caractères sont pris. C'est le même bénéfice que `range` semi-ouvert (section plus haut) : les bornes se comportent bien **sans qu'on ait à y penser**.

!!! question "6 - `drop` : jeter les n premiers"
    ```python
    def drop(n: int, s: str) -> str:
        """Renvoie s privée de ses n premiers caractères.

        Si s est plus courte que n caractères, renvoie la chaîne vide.

        >>> drop(3, "python")
        'hon'
        >>> drop(0, "python")
        'python'
        >>> drop(10, "abc")
        ''
        """
        ...
    ```

    ??? tip "Indice léger"
        Transfert proche de l'exercice précédent : même squelette, un seul symbole change dans le filtre.

    ??? success "Solution"
        ```python
        def drop(n: int, s: str) -> str:
            """Renvoie s privée de ses n premiers caractères."""
            res = ""
            for i in range(len(s)):
                if i >= n:
                    res = res + s[i]
            return res
        ```

!!! tip "Une propriété à vérifier, pas à admettre"
    Choisis plusieurs valeurs de `n` et plusieurs chaînes, et vérifie que `take(n, s) + drop(n, s)` redonne toujours `s`. C'est une **spécification** que tes deux fonctions doivent respecter ensemble, au sens de [Spécification et tests](specification-tests.md) : si l'égalité casse sur un exemple, l'une des deux fonctions a un bug, même si chacune passait ses propres doctests.

## Avec ce qu'on sait déjà : des fonctions qui répètent

Une boucle se place, elle aussi, dans le corps d'une fonction. Les exercices qui suivent mêlent fonctions, conditions et boucles.

!!! question "Rectangle de caractères"
    L'appel `affiche_rectangle(2, 5, 'A')` doit afficher :
    ```
    AAAAA
    AAAAA
    ```
    Écris et teste `affiche_rectangle`. Rappels : `print()` passe à la ligne ; `print('A', end='')` affiche sans passer à la ligne.

    ??? tip "Indice léger"
        Un rectangle, ce sont des **lignes** ; une ligne, ce sont des **caractères**. Deux choses à répéter, donc deux boucles, et l'une est à l'intérieur de l'autre. Laquelle dedans ?

    ??? tip "Indice plus précis"
        La boucle **extérieure** compte les lignes (`hauteur` tours). La boucle **intérieure** affiche les caractères d'une ligne (`largeur` tours), avec `end=''` pour rester sur la même ligne. Le retour à la ligne se fait avec un `print()` vide, placé **dans** la boucle extérieure mais **après** la boucle intérieure.

    ??? warning "Corrigé"
        ```python
        def affiche_rectangle(hauteur: int, largeur: int, car: str) -> None:
            """Affiche un rectangle de hauteur x largeur fait du caractère car"""
            for _ in range(hauteur):
                for _ in range(largeur):
                    print(car, end='')
                print()
        ```

!!! question "Portée dans les boucles (piège)"
    Que va afficher ce code ?

    ```python
    def mystere() -> None:
        for i in range(3):
            x = i * 2
        print("x =", x)
        print("i =", i)

    mystere()
    ```

    Puis exécute pour vérifier. Que se passe-t-il avec `x` et `i` ?

??? success "Solution"
    ```
    x = 4
    i = 2
    ```

    **Attention :** En Python, les variables créées dans une boucle `for` **ne sont pas locales à la boucle**, elles sont locales à la **fonction**. Donc `x` et `i` existent encore après la boucle.

    C'est différent de langages comme C, Java ou Rust où les variables de boucle sont détruites après la boucle.

??? note "Pour aller plus loin : la portée dans d'autres langages"
    D'autres langages ont des règles de portée plus strictes. Par exemple, en **Rust**, même les variables dans une boucle ont leur propre portée :

    ```rust
    fn main() {
        let x = 10;
        for i in 0..3 {
            let x = x + i;  // Nouvelle variable locale à la boucle
            println!("Boucle : x = {}", x);
        }
        println!("Après : x = {}", x);  // x = 10 (inchangé)
    }
    ```

    Sortie :
    ```
    Boucle : x = 10
    Boucle : x = 11
    Boucle : x = 12
    Après : x = 10
    ```

    En Rust, les variables globales modifiables nécessitent un bloc `unsafe` car elles sont considérées dangereuses. Python est plus permissif, mais cela ne signifie pas qu'il faut en abuser !

!!! question "Accumulateur sans variable globale"
    Sans utiliser de variable globale, écris une fonction `somme_chiffres(texte)` qui renvoie la somme des chiffres présents dans une chaîne.

    Teste avec `"a1b2c3"`, qui doit donner `6`.

    Rappel : `c.isdigit()` dit si le caractère `c` est un chiffre, et `int(c)` le convertit en entier.

??? success "Solution"
    ```python
    def somme_chiffres(texte: str) -> int:
        """Renvoie la somme des chiffres présents dans texte."""
        total = 0  # variable LOCALE : elle disparaît à la fin de l'appel
        for c in texte:
            if c.isdigit():
                total += int(c)
        return total

    # Test
    print(somme_chiffres("a1b2c3"))   # 6
    ```

    L'accumulateur `total` est **local** : c'est ce qui permet d'appeler la fonction autant de fois qu'on veut sans que les appels se contaminent. Une variable globale, ici, serait un bug en attente.

!!! question "Nombre de mots"
    Écris la signature typée, la docstring, une fonction `test_nb_mots` avec au moins deux `assert`, puis le code de `nb_mots(phrase)`, qui renvoie le nombre de mots d'une phrase. Les mots sont séparés par des espaces, parfois plusieurs à la suite.

    ??? tip "Indice léger"
        Compter les mots, c'est compter les **débuts** de mot : un caractère qui n'est pas une espace, et qui arrive au début de la phrase ou juste après une espace.

    ??? success "Corrigé"
        ```python
        def nb_mots(phrase: str) -> int:
            """Renvoie le nombre de mots de phrase, les mots étant séparés par des espaces."""
            mots = 0
            en_mot = False
            for c in phrase:
                if c != " ":
                    if not en_mot:
                        mots = mots + 1
                    en_mot = True
                else:
                    en_mot = False
            return mots

        def test_nb_mots():
            assert nb_mots("bonjour le monde") == 3
            assert nb_mots("") == 0
            assert nb_mots("  deux   espaces ") == 2
        ```
        Toute solution correcte convient. Le troisième test est celui qui compte : avec plusieurs espaces à la suite, compter les espaces ne donne plus le nombre de mots.
