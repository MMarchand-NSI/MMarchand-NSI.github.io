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

*Range* est un mot anglais qui veut dire « **plage** » ou « **intervalle** ». Retiens-le : c'est exactement ce que `range` représente.

Très souvent, on veut parcourir des **entiers**. Python fournit pour cela `range`, qui **est la séquence représentant un intervalle semi-ouvert d'entiers**.

```python
range(0, 4)    # la séquence 0, 1, 2, 3
range(5, 9)    # la séquence 5, 6, 7, 8
```

!!! fondamental "L'intervalle semi-ouvert"
    `range(a, b)` représente l'intervalle **semi-ouvert** $[a\,;\,b)$ : la borne `a` est **incluse**, la borne `b` est **exclue**. Parcourir un `range` avec `for`, c'est donc « pour chaque entier de l'intervalle » :

    ```python
    for i in range(5, 9):
        print(i)        # affiche 5, 6, 7, 8
    ```

Pour un anglophone, la première ligne se lit presque comme une phrase : *for i in range 5, 9*, « pour `i` dans l'intervalle de 5 à 9 ». Lis-la ainsi à voix haute, en te souvenant que 9 est exclu.

!!! tip "Deux conséquences de l'intervalle semi-ouvert"
    - `range(n)` vaut `range(0, n)` : la séquence `0, 1, ..., n-1`, soit **`n` entiers** en partant de 0.
    - Comme `b` est exclu, `b - a` est exactement le **nombre d'entiers** parcourus.

!!! note "Ce choix n'est pas anodin"
    Exclure la borne haute peut sembler arbitraire. Ce n'est pas le cas : c'est un choix réfléchi, dont les raisons les plus profondes vont bien au-delà de ce qu'on voit en première, et même au-delà de la licence.

    Ce qu'il faut en retenir : **travailler avec des intervalles semi-ouverts simplifie considérablement le travail**, et limite les erreurs possibles, en particulier celles où l'on fait **un tour de trop** ou **un tour de moins**. C'est pour cela que tu les retrouveras partout dans ce cours.

??? info "Pour le lecteur averti : les semi-ouverts, et pourquoi pas les fermés"
    *Cet encart s'adresse au lecteur averti, pas aux élèves. Dijkstra, Joshua Bloch et la RFC 1192 sont cités d'après leurs textes, et les notions catégoriques sont celles d'Emily Riehl, mathématicienne qui travaille en théorie des catégories supérieures et en théorie de l'homotopie, « Category Theory in Context » (seconde édition, mise en ligne par l'autrice), dont le premier chapitre contient toutes les notions utilisées ici. La préférence pour les semi-ouverts ne tient pas en un argument mais en un **geste** : formaliser le parcours d'indices en théorie des catégories, qui répond directement aux questions de Dijkstra : quelle longueur, quelle adjacence, quel intervalle vide, quelle borne incluse. Il montre aussi pourquoi s'appuyer sur des fermés est une mauvaise idée (à une exception près). La suite de l'encart lit ces réponses une à une.*

    **Le raisonnement de Dijkstra.** Dans *Why numbering should start at zero* (EWD 831, 11 août 1982), Edsger Dijkstra compare quatre façons d'écrire la suite $2, 3, \dots, 12$ : (a) $2 \leqslant i < 13$, (b) $1 < i \leqslant 12$, (c) $2 \leqslant i \leqslant 12$ et (d) $1 < i < 13$. Il procède en deux temps.

    - **Semi-ouvert plutôt que fermé ou ouvert.** Les deux conventions semi-ouvertes ont l'avantage que « *the difference between the bounds as mentioned equals the length of the subsequence* », et deux sous-suites sont adjacentes quand la borne haute de l'une est la borne basse de l'autre. Mais, ajoute-t-il, ces observations « *don't enable us to choose between a) and b)* », c'est-à-dire entre $[a\,;\,b)$ et $(a\,;\,b]$.
    - **Quel semi-ouvert.** Deux arguments tranchent. Exclure la borne basse obligerait, pour une suite qui commence au plus petit entier naturel, à écrire une borne basse qui n'est pas un entier naturel : on inclut donc la borne basse. Inclure la borne haute obligerait, pour la suite vide qui commence en $0$, à écrire une borne haute qui n'est pas un entier naturel : on exclut donc la borne haute. D'où $[a\,;\,b)$.

    Ce sont quatre observations justes, faites une à une. Le geste qui suit les obtient toutes à la fois.

    **Le geste : les indices forment l'ordinal $\omega$.** Formaliser, c'est d'abord dire quel objet mathématique sont les indices. Les indices d'un tableau sont $0, 1, 2, \dots$ : ce sont les ordinaux finis, qui sont exactement les éléments de l'ordinal $\omega$. Or un ordinal est l'ensemble des ordinaux plus petits que lui. Riehl le rappelle en introduisant les catégories qu'ils définissent : « *any ordinal 𝛼 = {𝛽 ∣ 𝛽 < 𝛼} defines a category whose objects are the smaller ordinals* » (exemple 1.1.4). L'entier $n$, vu comme ordinal, **est** donc l'ensemble $\{0, 1, \dots, n - 1\}$, c'est-à-dire le semi-ouvert $[0\,;\,n)$. Et $\omega$ est une catégorie : une flèche $a \to b$ exactement quand $a \leqslant b$, la réflexivité de $\leqslant$ donnant les identités (exemple 1.1.4). Les deux relations ne jouent pas le même rôle. Entre ordinaux, $\beta < \alpha$ veut dire $\beta \in \alpha$ : le $<$ strict est l'**appartenance**, il dit ce que contient un ordinal. Et $a \leqslant b$ veut dire $a \subseteq b$ : le $\leqslant$ est l'**inclusion**, il donne les flèches, chacune étant l'inclusion d'un semi-ouvert dans un autre. On note $\omega$ la catégorie, et $\mathbb{N}$ l'ensemble des entiers.

    **Ce que le geste livre, sans rien choisir.**

    - **L'intervalle d'une flèche.** La flèche $a \to b$ est l'inclusion $[0\,;\,a) \subseteq [0\,;\,b)$. Ce qu'elle ajoute est $b \setminus a = \{\beta \mid \beta \in b \text{ et } \beta \notin a\} = \{\beta \mid a \leqslant \beta < b\} = [a\,;\,b)$. Le $<$ de droite vient de l'appartenance à $b$, le $\leqslant$ de gauche de la **négation** de l'appartenance à $a$ : « non $\beta < a$ », c'est $a \leqslant \beta$, l'ordre des ordinaux étant total. La forme semi-ouverte n'est pas posée à la main, elle se lit « dans $b$ mais pas dans $a$ ». Il est **déterminé par la flèche seule**.
    - **Le recollement.** Pour $a \leqslant b \leqslant c$, on a $c \setminus a = (b \setminus a) \sqcup (c \setminus b)$, c'est-à-dire $[a\,;\,c) = [a\,;\,b) \sqcup [b\,;\,c)$ : une réunion **disjointe**. Deux semi-ouverts adjacents ne partagent que l'ensemble vide, qui est l'objet **initial** de la catégorie des ensembles : « *The empty set is an initial object in Set* » (exemple 1.6.15). Composer deux flèches, c'est recoller sans chevauchement.
    - **Le vide.** L'identité $a \to a$ ajoute $a \setminus a = \varnothing = [a\,;\,a)$. Le même ensemble vide est ce qu'ajoutent toutes les identités.
    - **La longueur.** Compter de façon compatible avec la composition et les identités, c'est un foncteur, qui « *preserves all of the structure of a category, namely domains and codomains, composition, and identities* » (définition 1.3.1). Le cardinal $|b \setminus a| = b - a$ en est un, de $\omega$ vers le monoïde $(\mathbb{N}, +)$ vu comme catégorie à un seul objet (exemple 1.1.4) : il envoie la composition sur la somme et l'identité sur $0$. Ce foncteur est imposé par les pas : toute flèche $a \to b$ est la composée des **pas** $a \to a + 1 \to \cdots \to b$, puisque dans un préordre les composées existent et sont uniques (exemple 1.1.4). Un foncteur préservant les composées, sa valeur sur $a \to b$ est donc fixée par ses valeurs sur les pas. Or chaque pas $k \to k + 1$ ajoute exactement un élément, $\{k\} = [k\,;\,k + 1)$ : il vaut $1$.
    - **La borne incluse à gauche.** Elle vient du $<$ strict de la définition des ordinaux, et $0$ est l'ordinal vide, objet **initial** de $\omega$ : « *An initial object in a preorder […] is a global minimal element* » (exemple 1.6.15).

    **Les fermés sont des étiquettes décalées.** Aucune flèche $a \to b$ n'ajoute $[a\,;\,b]$ : cet ensemble est ce qu'ajoute la flèche $a \to b + 1$. Une convention fermée ne désigne donc pas d'autres ensembles. Elle nomme la flèche $a \to b + 1$ par la borne $b$, **décalée de un**, et l'erreur de $\pm 1$ est exactement cet écart entre une flèche et son étiquette. Trois conséquences en découlent :

    - Le cardinal de l'étiquette, $b - a + 1$, n'est pas un foncteur : il envoie l'identité sur $1$.
    - Deux fermés adjacents ne sont plus disjoints : $[a\,;\,b]$ et $[b\,;\,c]$ **partagent le point** $b$, là où deux semi-ouverts ne partagent que l'objet initial $\varnothing$. Les recoller oblige à identifier ce point, et à le compter une seule fois.
    - Ce qu'ajoute l'identité de $0$, l'intervalle vide, s'étiquette $[0\,;\,-1]$, avec une borne qui n'est pas un objet de $\omega$.

    Les quatre observations de Dijkstra sont donc des conséquences du geste : sa longueur est le foncteur cardinal, son adjacence est la composition, sa suite vide est ce qu'ajoute l'identité, et son plus petit entier naturel est l'objet initial.

    **Une image : les pas et les arrêts.** La flèche $2 \to 5$ est la composée des pas $2 \to 3 \to 4 \to 5$. Ses **pas** ajoutent $\{2\}$, $\{3\}$ et $\{4\}$, qui forment $[2\,;\,5)$. Ses **arrêts**, $2, 3, 4, 5$, forment $[2\,;\,5]$. En informatique, une forme d'erreur de $\pm 1$ porte le nom d'erreur du **poteau de clôture** (*fencepost error*) : on compte les poteaux, c'est-à-dire les arrêts, quand il fallait compter les sections, c'est-à-dire les pas. Le semi-ouvert est la convention qui compte les pas, parce que ce sont eux que les flèches ajoutent.

    **Sous quelles hypothèses.** Le geste suppose que les indices forment l'ordinal $\omega$. Sur $\mathbb{Z}$, qui n'est pas un ordinal et n'a pas de plus petit élément, l'application $x \mapsto -x$ échange $[a\,;\,b)$ et $(-b\,;\,-a]$ : rien ne fixe plus le côté fermé. Sur un type d'entiers borné, l'ordinal fini a aussi un objet **terminal**, et l'argument de Dijkstra s'applique au bord droit : il joue alors contre le semi-ouvert, comme le montre la dernière section.

    **Les semi-ouverts en analyse : un pavage sans chevauchement.** Les pas se prolongent sur la droite réelle : les segments $[k\,;\,k + 1)$, pour $k \in \mathbb{N}$, **pavent** la demi-droite $[0\,;\,+\infty)$, chaque réel positif appartenant à un seul d'entre eux, alors que les segments fermés $[k\,;\,k + 1]$ se chevauchent à chaque entier. Plus généralement, les intervalles semi-ouverts de $\mathbb{R}$ forment un **semi-anneau d'ensembles** : l'intersection de deux d'entre eux en est un, et leur différence est une réunion disjointe finie d'entre eux. Ni les fermés ni les ouverts n'ont cette propriété, et c'est sur ce semi-anneau que repose l'une des constructions standard de la mesure de Lebesgue. Là encore, $(a\,;\,b]$ conviendrait aussi bien : comme $\mathbb{Z}$, la droite réelle n'a pas de plus petit élément pour trancher.

    **Ce que cela change dans un programme.** Les corrections de $\pm 1$ ne disparaissent pas toutes : elles se **concentrent à l'interface**, au moment où l'on traduit un énoncé posé sur des fermés, et chacune traduit un fermé présent dans l'énoncé.

    - **Le cardinal est $b - a$.** Pour $a \leqslant b$, `for i in range(a, b)` fait exactement `b - a` tours, et les indices d'une séquence `s` sont exactement `range(len(s))`.
    - **Le recollement est sans chevauchement.** Couper en `k` puis recoller redonne le tout : `s[0:k] + s[k:len(s)] == s` pour tout `k`, sans cas particulier. C'est la propriété `take(n, s) + drop(n, s) == s` des exercices de cette page. Deux boucles successives sur `range(a, b)` puis `range(b, c)` parcourent `range(a, c)`, sans oubli ni doublon.
    - **L'intervalle vide ne fait aucun tour.** `range(a, a)` est vide, et l'accumulateur garde sa valeur de départ. Le `+ 1` de `range(1, n + 1)`, dans `factorielle`, n'est pas une exception : il traduit l'énoncé, qui parle des entiers **de 1 à $n$**, c'est-à-dire d'un fermé. C'est le seul `+ 1` de `factorielle`.
    - **Diviser pour régner.** La recherche dichotomique et le tri fusion, au programme, coupent un intervalle en deux. En semi-ouvert, $[lo\,;\,hi)$ se coupe en $[lo\,;\,mid)$ et $[mid\,;\,hi)$, et la boucle s'arrête quand l'intervalle est vide, `lo == hi` :

        ```python
        lo, hi = 0, len(t)              # on cherche dans [lo ; hi)
        while lo < hi:                  # tant que l'intervalle n'est pas vide
            mid = lo + (hi - lo) // 2
            if t[mid] < x:
                lo = mid + 1            # on garde [mid + 1 ; hi) : mid est écarté
            else:
                hi = mid                # on garde [lo ; mid)
        ```

        Le seul `+ 1`, dans `lo = mid + 1`, dit qu'on **écarte** `mid`, et l'autre branche n'en a pas besoin, parce que `mid` est déjà exclu de $[lo\,;\,mid)$. Le milieu s'écrit `lo + (hi - lo) // 2` et non `(lo + hi) // 2` : en Python, c'est indifférent, mais dans un langage à entiers bornés, `lo + hi` peut dépasser la capacité, alors que `hi - lo` est la longueur de l'intervalle. C'est le bogue que Joshua Bloch a signalé en 2006 dans la recherche dichotomique de la bibliothèque Java, présent pendant environ neuf ans.

    **Le problème des fermés.** Les fermés posent un vrai problème, et il n'est pas d'ordre esthétique : ils imposent des **ajustements** de bornes et des **cas particuliers** aux extrémités, en particulier pour l'intervalle vide. Chaque ajustement complique le code, et chaque complication est une occasion de plus de se tromper.

    Le cas extrême est celui de l'intervalle vide qui commence en $0$ : il s'écrit $[0\,;\,-1]$ : c'est le cas de la suite vide de Dijkstra, pris au pied de la lettre. Avec des indices **signés**, la boucle `for (int i = 0; i <= n - 1; i++)` fait bien zéro tour pour `n` nul. Mais avec des indices **non signés**, `n - 1` ne vaut même pas $-1$. En C, avec `size_t n = 0`, `n - 1` vaut le plus grand entier représentable ($2^{64} - 1$ sur une machine 64 bits), et la boucle `for (size_t i = 0; i <= n - 1; i++)`, qui devrait ne faire aucun tour, se lance : un `t[i]` dans le corps lit alors la mémoire hors du tableau. En Rust, `0..=n - 1` sur un tableau vide arrête le programme en mode débogage (« *attempt to subtract with overflow* ») et, en mode optimisé, parcourt les entiers de $0$ jusqu'à $2^{64} - 1$. La version semi-ouverte, `i < n` ou `0..n`, ne fait aucun tour dans les deux langages.

    **Et la limite des semi-ouverts : un ordinateur ne travaille pas sur $\omega$.** Un type d'entiers machine n'est pas $\omega$ mais un ordinal **fini** : un octet non signé est l'ordinal $256$, dont les objets sont les ordinaux plus petits, de $0$ à $255$. Cette catégorie a un objet initial, $0$, **et** un objet terminal, $255$, et $x \mapsto 255 - x$ la rend isomorphe à son opposée. $\omega$, qui a un objet initial mais pas d'objet terminal, ne l'est pas : l'ordinal fini retrouve la symétrie que $\omega$ n'a pas. L'intervalle qui contient $255$ s'écrirait $[a\,;\,256)$, et il demanderait l'objet $256$, qui n'appartient pas à la catégorie. Aucune flèche du type ne l'ajoute. C'est l'argument de Dijkstra appliqué au bord droit, et il joue cette fois contre le semi-ouvert. Sur un ordinal fini, c'est même l'étiquette fermée qui couvre le plus : $[a\,;\,b]$ nomme tous les intervalles non vides, et ne manque que le vide.

    C'est ce qui se passe en Rust : pour parcourir les 256 valeurs d'un octet, `0u8..256` est refusé à la compilation (« *range endpoint is out of range for `u8`* »), et il faut écrire `0u8..=255`. C'est précisément l'exemple que donne la RFC 1192, qui a introduit les intervalles inclusifs en Rust : « *iterating from `0_u8` up to and including some number `n` can be done via `for _ in 0..n + 1` at the moment, but this will fail if `n` is `255`* ». Les semi-ouverts sont la **convention par défaut** parce que, la plupart du temps, on travaille loin du bout du type, là où les entiers machine se comportent comme $\omega$. Au bout du type, c'est l'objet terminal qui décide, et la convention fermée devient nécessaire.

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
