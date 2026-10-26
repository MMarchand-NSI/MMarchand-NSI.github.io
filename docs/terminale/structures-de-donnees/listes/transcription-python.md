# Transcription en Python

## 1 Les deux lignes de type

Tout part de deux lignes, qu'il faut savoir lire avant d'écrire quoi que ce soit.

```python
type Vide = tuple[()]
type Liste[T] = Vide | tuple[T, Liste[T]]
```

### 1.1 Ce que tu sais déjà lire, et les deux nouveautés

Tu as déjà écrit des alias de type, pour les piles et les files :

```python
type Pile[T] = list[T]
type File[T] = tuple[Pile[T], Pile[T]]   # (entree, sortie)
```

Un nom donné à un type qui existe déjà, paramétré par `T`, et qui ne fabrique rien à l'exécution. Les deux lignes de la liste se lisent pareil, à **deux nouveautés près**, et elles seules méritent qu'on s'arrête :

- le `|`, un OU écrit **dans le type**,
- la définition qui **s'appelle elle-même**.

### 1.2 Le `|` est un OU, et il est dans le type

`A | B` se lit « un `A` **ou** un `B` ». C'est le même `|` que dans `int | None`.

```python
type Liste[T] = Vide | tuple[T, Liste[T]]
#               ^^^^   ^^^^^^^^^^^^^^^^^
#               vide   un couple (tête, queue)
```

En Gleam, ce OU n'avait pas à être écrit : il était porté par les **deux constructeurs**, `Vide` et `Cons`. Même énoncé, autre notation.

### 1.3 Un type qui s'appelle lui-même

`File[T]` renvoyait à un **autre** alias, `Pile[T]`. Ici, `Liste[T]` renvoie à **lui-même** :

```python
type Liste[T] = Vide | tuple[T, Liste[T]]
#                               ^^^^^^^^
#                               la queue est une liste
```

C'est mot pour mot le `Cons(a, Liste(a))` de Gleam, et c'est ce qui rend la structure **sans limite de taille** : une ligne décrit des listes de n'importe quelle longueur, parce que le second cas se redéploie autant de fois qu'il le faut.

Lis bien ce que cette ligne ne dit pas. Elle ne décrit aucun objet infini : elle dit que pour connaître une liste, il faut connaître une liste **plus courte**, et que cela s'arrête sur `Vide`. C'est la définition récursive du cours, écrite dans le type au lieu de l'être dans une fonction.

## 2 Les primitives

Comme pour les piles et les files, une fois la structure en place on ne touche **jamais** à sa représentation : tout passe par les **cinq primitives**. Encore faut-il les écrire une fois, et c'est le premier exercice de la page.

!!! fondamental "L'interface"
    | Primitive | Ce qu'elle fait |
    |---|---|
    | `vide()` | rend la liste vide, c'est le `Vide` de Gleam |
    | `cons(t, q)` | rend la liste de tête `t` et de queue `q`, c'est le `Cons(t, q)` de Gleam |
    | `est_vide(lst)` | dit si la liste est vide |
    | `tete(lst)` | rend la tête, **interdit** sur une liste vide |
    | `queue(lst)` | rend la queue, **interdit** sur une liste vide |

!!! note "Mise en place"
    - Ton fichier est `python/structures/lineaires/liste.py`. Si le répertoire n'existe pas encore, crée-le, et **chaque répertoire créé reçoit un fichier vide `__init__.py`**.
    - Les tests vont **à côté**, dans `python/structures/lineaires/liste_test.py`. Chaque exercice te donne le sien, à coller à la fin du fichier, en tête duquel tu écris une seule fois :

        ```python
        from structures.lineaires import liste
        ```

    - Pour les lancer, depuis la racine de ton dépôt : `uv run pytest`
    - Toutes les fonctions des sections suivantes viendront **à la suite**, dans ce même `liste.py`.

!!! question "Écris les cinq primitives"
    **La représentation, et c'est le seul endroit qui a le droit de la connaître** : une liste vide est le **tuple vide** `()`, et une liste non vide est le **couple** `(tête, queue)`. Une fois ces cinq fonctions écrites, tu l'oublies : tout le reste de la page passe par elles.

    Recopie ce fichier et complète les cinq corps. Les deux lignes de type et les en-têtes te sont donnés, et `...` marque ce qu'il y a à écrire. Tel quel le fichier s'importe déjà, donc le test échoue proprement au lieu de refuser de se lancer.

    ```python
    # structures/lineaires/liste.py

    type Vide = tuple[()]
    type Liste[T] = Vide | tuple[T, Liste[T]]


    def vide[T]() -> Liste[T]:
        """Crée et renvoie la liste vide."""
        ...


    def cons[T](t: T, q: Liste[T]) -> Liste[T]:
        """Renvoie la liste dont la tête est t et la queue q."""
        ...


    def est_vide(lst: Liste) -> bool:
        """Indique si la liste lst est vide."""
        ...


    def tete[T](lst: Liste[T]) -> T:
        """
        Renvoie la tête de lst.
        Précondition : lst ne doit pas être vide.
        """
        ...


    def queue[T](lst: Liste[T]) -> Liste[T]:
        """
        Renvoie la queue de lst.
        Précondition : lst ne doit pas être vide.
        """
        ...
    ```

    Deux d'entre elles portent une **précondition** : `tete` et `queue` n'ont rien à rendre si la liste est vide. Cela s'écrit avec un `assert`, comme `depiler` sur une pile vide.

    ??? info "Le test, à coller dans `liste_test.py`"
        ```python
        def test_primitives() -> None:
            l = liste.cons(2, liste.cons(3, liste.vide()))
            assert liste.est_vide(liste.vide())
            assert not liste.est_vide(l)
            assert liste.tete(l) == 2
            assert liste.queue(l) == liste.cons(3, liste.vide())
        ```

    ??? success "Corrigé"
        ```python
        # structures/lineaires/liste.py

        type Vide = tuple[()]
        type Liste[T] = Vide | tuple[T, Liste[T]]


        def vide[T]() -> Liste[T]:
            """Crée et renvoie la liste vide."""
            return ()


        def cons[T](t: T, q: Liste[T]) -> Liste[T]:
            """Renvoie la liste dont la tête est t et la queue q."""
            return (t, q)


        def est_vide(lst: Liste) -> bool:
            """Indique si la liste lst est vide."""
            return lst == ()


        def tete[T](lst: Liste[T]) -> T:
            """
            Renvoie la tête de lst.
            Précondition : lst ne doit pas être vide.
            """
            assert not est_vide(lst), "La liste est vide"
            return lst[0]


        def queue[T](lst: Liste[T]) -> Liste[T]:
            """
            Renvoie la queue de lst.
            Précondition : lst ne doit pas être vide.
            """
            assert not est_vide(lst), "La liste est vide"
            return lst[1]
        ```

!!! fondamental "Ce que tu fais ici, et ce que tu ne fais pas"
    Les primitives étaient le seul morceau à trouver. Toutes les fonctions qui suivent, tu les as déjà écrites en Gleam : **les algorithmes, tu les as.** À partir d'ici on réécrit les mêmes, en Python, et le seul travail est la **syntaxe**.

    Garde la page [Listes et récursivité](listes.md) ouverte à côté. Ta version Gleam est ton énoncé.

## 3 La correspondance, terme à terme

C'est tout ce qu'il y a à savoir. Le reste est mécanique.

| En Gleam | En Python |
|---|---|
| `Vide` | `vide()` |
| `Cons(t, q)` | `cons(t, q)` |
| le `case` sur la liste | un `if est_vide(lst):` suivi du cas `Cons` |
| `tete` et `queue` du motif | `tete(lst)` et `queue(lst)`, appelés quand tu en as besoin |
| `case condition { True -> A  False -> B }` | `if condition: A` sinon `B` |
| `lst1 == lst2` | `lst1 == lst2`, les tuples se comparent de la même façon |

### 3.1 Les trois formes, une fois chacune

**Lire une liste**, c'est-à-dire en tirer une valeur.

```gleam
pub fn taille(lst: Liste(a)) -> Int {
  case lst {
    Vide -> 0
    Cons(_, queue) -> 1 + taille(queue)
  }
}
```

```python
def taille(lst: Liste) -> int:
    if est_vide(lst):
        return 0
    return 1 + taille(queue(lst))
```

Le cas `Vide` devient le `if`, et le cas `Cons` est **tout ce qui vient après** : si la fonction n'est pas déjà repartie avec `return`, c'est que la liste n'est pas vide.

**Construire une liste**, c'est-à-dire en rendre une nouvelle. Le `Cons` du résultat devient `cons`.

```gleam
pub fn ajouter_fin(lst: Liste(a), x: a) -> Liste(a) {
  case lst {
    Vide -> Cons(x, Vide)
    Cons(tete, queue) -> Cons(tete, ajouter_fin(queue, x))
  }
}
```

```python
def ajouter_fin[T](lst: Liste[T], x: T) -> Liste[T]:
    if est_vide(lst):
        return cons(x, vide())
    return cons(tete(lst), ajouter_fin(queue(lst), x))
```

**Trancher sur une condition**, là où Gleam faisait un `case` sur un booléen.

```gleam
Cons(tete, queue) ->
  case tete % 2 == 0 {
    True -> tete + somme_pairs(queue)
    False -> somme_pairs(queue)
  }
```

```python
    if tete(lst) % 2 == 0:
        return tete(lst) + somme_pairs(queue(lst))
    return somme_pairs(queue(lst))
```

!!! warning "Le piège : les quatre cas disparaissent"
    Avec des `if`, rien ne signale **combien** de cas il y a, ni qu'on les a **tous** couverts. La disjonction exhaustive, un cas par possibilité, que le `case` de Gleam rendait évidente, n'apparaît plus, et le compilateur ne la vérifie plus.

    Cela ne coûte rien sur une liste, où il n'y a que deux cas. Sur **deux** listes il y en a quatre, ils fondent dans des conditions, et **rien ne te dit si tu en as oublié un**. Écris-les au papier avant de coder, comme en Gleam, puis regroupe-les seulement après.

    ```python
    def sont_egales(l1: Liste, l2: Liste) -> bool:
        if est_vide(l1) and est_vide(l2):      # les deux vides
            return True
        if est_vide(l1) or est_vide(l2):       # une seule vide, les deux autres cas
            return False
        return tete(l1) == tete(l2) and sont_egales(queue(l1), queue(l2))
    ```

## 4 À transcrire

!!! question "Les vingt-trois fonctions"
    Ta version Gleam est l'énoncé de chacune : tu ne cherches que la syntaxe. Écris-les à la suite dans `liste.py`, dans cet ordre, qui est celui de la page Gleam. `taille` et `ajouter_fin` sont déjà faites, elles servaient d'exemples.

    Colle les tests d'un groupe au moment où tu l'attaques, pas tous d'un coup.

    **Lire une liste** : de la liste à une **valeur**.

    - `somme(lst: Liste[int]) -> int`
    - `somme_pairs(lst: Liste[int]) -> int`
    - `contient[T](lst: Liste[T], x: T) -> bool`
    - `sont_egales(l1: Liste, l2: Liste) -> bool`
    - `to_str(lst: Liste[int]) -> str`
    - `tous_vrais(lst: Liste[bool]) -> bool`
    - `au_moins_un_vrai(lst: Liste[bool]) -> bool`
    - `compte[T](lst: Liste[T], e: T) -> int`

    ??? info "Les tests de ce groupe, à coller dans `liste_test.py`"
        ```python
        def test_somme() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(4, liste.vide())))
            assert liste.somme(liste.vide()) == 0
            assert liste.somme(l) == 9


        def test_somme_pairs() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(4, liste.vide())))
            assert liste.somme_pairs(liste.vide()) == 0
            assert liste.somme_pairs(l) == 6


        def test_contient() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(4, liste.vide())))
            assert liste.contient(liste.vide(), 2) == False
            assert liste.contient(l, 3) == True
            assert liste.contient(l, 9) == False


        def test_sont_egales() -> None:
            l = liste.cons(2, liste.cons(3, liste.vide()))
            assert liste.sont_egales(liste.vide(), liste.vide()) == True
            assert liste.sont_egales(l, liste.cons(2, liste.cons(3, liste.vide()))) == True
            assert liste.sont_egales(l, liste.cons(2, liste.vide())) == False
            assert liste.sont_egales(l, liste.cons(2, liste.cons(9, liste.vide()))) == False


        def test_to_str() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(4, liste.vide())))
            assert liste.to_str(liste.vide()) == "_|_"
            assert liste.to_str(l) == "2 -> 3 -> 4 -> _|_"


        def test_tous_vrais() -> None:
            assert liste.tous_vrais(liste.vide()) == True
            assert liste.tous_vrais(liste.cons(True, liste.cons(True, liste.vide()))) == True
            assert liste.tous_vrais(liste.cons(True, liste.cons(False, liste.vide()))) == False


        def test_au_moins_un_vrai() -> None:
            assert liste.au_moins_un_vrai(liste.vide()) == False
            assert liste.au_moins_un_vrai(liste.cons(False, liste.cons(True, liste.vide()))) == True
            assert liste.au_moins_un_vrai(liste.cons(False, liste.cons(False, liste.vide()))) == False


        def test_compte() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(2, liste.vide())))
            assert liste.compte(liste.vide(), 2) == 0
            assert liste.compte(l, 2) == 2
            assert liste.compte(l, 9) == 0
        ```

    **Construire une liste** : de la liste à une **nouvelle liste**.

    - `inverser[T](lst: Liste[T]) -> Liste[T]`
    - `concat[T](l1: Liste[T], l2: Liste[T]) -> Liste[T]`
    - `repete[T](n: int, x: T) -> Liste[T]`
    - `take[T](lst: Liste[T], n: int) -> Liste[T]`
    - `drop[T](lst: Liste[T], n: int) -> Liste[T]`
    - `slice[T](lst: Liste[T], debut: int, fin: int) -> Liste[T]`
    - `supprimer[T](lst: Liste[T], e: T) -> Liste[T]`

    ??? info "Les tests de ce groupe, à coller dans `liste_test.py`"
        ```python
        def test_inverser() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(4, liste.vide())))
            assert liste.inverser(liste.vide()) == liste.vide()
            assert liste.inverser(l) == liste.cons(4, liste.cons(3, liste.cons(2, liste.vide())))


        def test_concat() -> None:
            l = liste.cons(2, liste.cons(3, liste.vide()))
            assert liste.concat(liste.vide(), liste.vide()) == liste.vide()
            assert liste.concat(liste.vide(), l) == l
            assert liste.concat(l, liste.vide()) == l
            assert liste.concat(l, liste.cons(4, liste.vide())) == liste.cons(
                2, liste.cons(3, liste.cons(4, liste.vide()))
            )


        def test_repete() -> None:
            assert liste.repete(0, "a") == liste.vide()
            assert liste.repete(3, "a") == liste.cons(
                "a", liste.cons("a", liste.cons("a", liste.vide()))
            )


        def test_take() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(4, liste.vide())))
            assert liste.take(liste.vide(), 2) == liste.vide()
            assert liste.take(l, 0) == liste.vide()
            assert liste.take(l, 2) == liste.cons(2, liste.cons(3, liste.vide()))
            assert liste.take(l, 9) == l


        def test_drop() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(4, liste.vide())))
            assert liste.drop(liste.vide(), 2) == liste.vide()
            assert liste.drop(l, 0) == l
            assert liste.drop(l, 2) == liste.cons(4, liste.vide())
            assert liste.drop(l, 9) == liste.vide()


        def test_slice() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(4, liste.vide())))
            assert liste.slice(liste.vide(), 0, 2) == liste.vide()
            assert liste.slice(l, 1, 3) == liste.cons(3, liste.cons(4, liste.vide()))
            assert liste.slice(l, 0, 0) == liste.vide()
            assert liste.slice(l, 0, 9) == l


        def test_supprimer() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(2, liste.vide())))
            assert liste.supprimer(liste.vide(), 2) == liste.vide()
            assert liste.supprimer(l, 2) == liste.cons(3, liste.cons(2, liste.vide()))
            assert liste.supprimer(l, 9) == l
        ```

    **Filtrer et transformer** : garder certains éléments, ou les changer tous.

    - `impairs(lst: Liste[int]) -> Liste[int]`
    - `positifs(lst: Liste[int]) -> Liste[int]`
    - `negatifs(lst: Liste[int]) -> Liste[int]`
    - `filtrer[T](predicat, lst: Liste[T]) -> Liste[T]`
    - `carres(lst: Liste[int]) -> Liste[int]`
    - `doubles(lst: Liste[int]) -> Liste[int]`
    - `triples(lst: Liste[int]) -> Liste[int]`
    - `mapper[T, U](f, lst: Liste[T]) -> Liste[U]`

    ??? info "Les tests de ce groupe, à coller dans `liste_test.py`"
        ```python
        def test_impairs() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(4, liste.vide())))
            assert liste.impairs(liste.vide()) == liste.vide()
            assert liste.impairs(l) == liste.cons(3, liste.vide())


        def test_positifs() -> None:
            l = liste.cons(2, liste.cons(-3, liste.cons(0, liste.vide())))
            assert liste.positifs(liste.vide()) == liste.vide()
            assert liste.positifs(l) == liste.cons(2, liste.vide())


        def test_negatifs() -> None:
            l = liste.cons(2, liste.cons(-3, liste.cons(0, liste.vide())))
            assert liste.negatifs(liste.vide()) == liste.vide()
            assert liste.negatifs(l) == liste.cons(-3, liste.vide())


        def test_filtrer() -> None:
            l = liste.cons(2, liste.cons(-3, liste.cons(4, liste.vide())))
            assert liste.filtrer(lambda x: x > 0, liste.vide()) == liste.vide()
            assert liste.filtrer(lambda x: x > 0, l) == liste.cons(2, liste.cons(4, liste.vide()))


        def test_carres() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(4, liste.vide())))
            assert liste.carres(liste.vide()) == liste.vide()
            assert liste.carres(l) == liste.cons(4, liste.cons(9, liste.cons(16, liste.vide())))


        def test_doubles() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(4, liste.vide())))
            assert liste.doubles(liste.vide()) == liste.vide()
            assert liste.doubles(l) == liste.cons(4, liste.cons(6, liste.cons(8, liste.vide())))


        def test_triples() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(4, liste.vide())))
            assert liste.triples(liste.vide()) == liste.vide()
            assert liste.triples(l) == liste.cons(6, liste.cons(9, liste.cons(12, liste.vide())))


        def test_mapper() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(4, liste.vide())))
            assert liste.mapper(lambda x: x * x, liste.vide()) == liste.vide()
            assert liste.mapper(lambda x: x * x, l) == liste.cons(
                4, liste.cons(9, liste.cons(16, liste.vide()))
            )
        ```

!!! warning "Deux fonctions changent de nom : `filtrer` et `mapper`"
    `filter` et `map` sont **déjà pris**. Ce sont deux fonctions que Python met à ta disposition sans aucun import, ce que Gleam appelle son **prélude**, et qui font d'ailleurs la même chose sur les listes Python.

    Les redéfinir ne casserait rien ailleurs, mais **dans ton propre fichier** le nom `filter` ne désignerait plus la fonction de Python : ce serait la tienne, et plus moyen d'appeler l'autre. On ne masque pas un nom du prélude, on en prend un autre. En Gleam la question ne se posait pas, et elles portaient le nom usuel.

!!! note "Elles prennent une fonction en paramètre"
    En Gleam, le prédicat de `filtrer` et la transformation de `mapper` étaient des fonctions passées en argument. En Python aussi, une fonction est une valeur : le `fn(x) { x > 0 }` de Gleam s'écrit `lambda x: x > 0`.

## 5 En Python seulement

!!! warning "Pourquoi ces fonctions n'étaient pas en Gleam"
    Les fonctions qui suivent peuvent **échouer** sur certaines entrées : une liste vide n'a pas de dernier élément, un indice peut sortir des bornes. En Python, on le signale par une **assertion** qui lève une erreur, exactement comme le font `tete` et `queue`. En Gleam, il n'y a pas d'exception : une fonction qui peut échouer renvoie un `Result`, une valeur qui porte **soit** le résultat, **soit** l'échec, et que l'appelant est obligé d'ouvrir. On ne verra pas ce type en classe, faute de temps, et ces fonctions se font donc **uniquement en Python**. Rien ne t'empêche d'aller voir par toi-même.

!!! note "Comment lire les exemples, et ce qu'on attend de toi"
    On note `2 -> 3 -> 4` la liste de ces trois éléments, comme ton `to_str` l'affiche. Les indices commencent à **0**.

    Celles-là n'ont **pas de version Gleam** à transcrire, donc **pas de test fourni** : pour chacune, écris aussi une fonction `test_<nom>` avec des `assert`, et fais-y figurer le **cas limite** nommé dans l'énoncé. Écrire le test, ici, c'est dire précisément ce que la fonction promet.

!!! question "dernier_element"
    `dernier_element[T](lst: Liste[T]) -> T` rend le **dernier** élément.

    - `dernier_element(2 -> 3 -> 4)` vaut `4`
    - **Précondition** : erreur si la liste est vide.

    Attention au cas d'arrêt : ce n'est pas la liste vide, c'est la liste dont la **queue** est vide.

!!! question "avant_dernier_element"
    `avant_dernier_element[T](lst: Liste[T]) -> T` rend l'**avant-dernier** élément.

    - `avant_dernier_element(2 -> 3 -> 4)` vaut `3`
    - **Précondition** : erreur si la liste a moins de deux éléments.

!!! question "get_n"
    `get_n[T](lst: Liste[T], n: int) -> T` rend l'élément d'**indice `n`**, le premier portant l'indice 0.

    - `get_n(2 -> 3 -> 4, 0)` vaut `2`
    - `get_n(2 -> 3 -> 4, 1)` vaut `3`
    - **Précondition** : erreur si `n` est négatif, ou s'il dépasse le dernier indice. Les deux se traitent, et pas au même endroit.

!!! question "insert"
    `insert[T](lst: Liste[T], e: T, n: int) -> Liste[T]` rend une **nouvelle** liste où `e` a été inséré à l'indice `n`.

    - `insert(2 -> 3 -> 4, 9, 1)` donne `2 -> 9 -> 3 -> 4`
    - `insert(2 -> 3 -> 4, 9, 3)` donne `2 -> 3 -> 4 -> 9`, insérer à l'indice égal à la taille revient à ajouter à la fin
    - **Précondition** : erreur si `n` est négatif ou **dépasse** la taille.

!!! question "supprimer_n"
    `supprimer_n[T](lst: Liste[T], n: int) -> Liste[T]` rend la liste **privée** de l'élément d'indice `n`.

    - `supprimer_n(2 -> 3 -> 4, 1)` donne `2 -> 4`
    - **Précondition** : erreur si `n` est négatif ou hors bornes.

    À ne pas confondre avec `supprimer`, qui enlève la première occurrence d'une **valeur**. Ici on désigne une **position**.

!!! question "supprimer_fin"
    `supprimer_fin[T](lst: Liste[T]) -> Liste[T]` rend la liste **privée de son dernier élément**.

    - `supprimer_fin(2 -> 3 -> 4)` donne `2 -> 3`
    - **Précondition** : erreur si la liste est vide.

!!! question "minimum"
    `minimum(lst: Liste[int]) -> int` rend le **plus petit** élément.

    - `minimum(3 -> 1 -> 4)` vaut `1`
    - **Précondition** : erreur si la liste est vide.

    C'est le lutin du minimum, déjà rencontré : si la queue est vide, le minimum c'est la tête, sinon on compare la tête au minimum de la queue.

!!! question "tri_selection"
    `tri_selection(lst: Liste[int]) -> Liste[int]` rend une **nouvelle** liste, triée dans l'ordre croissant, par la méthode du **tri par sélection**.

    - `tri_selection(3 -> 1 -> 4)` donne `1 -> 3 -> 4`
    - `tri_selection` de la liste vide donne la liste vide
    - Pas de précondition : la liste vide est déjà triée.

    L'algorithme tient en une phrase, et il s'écrit presque tout seul une fois `minimum` écrite : **le plus petit en tête, suivi du tri de tout le reste**. « Tout le reste », c'est la liste privée de ce minimum, et tu as déjà `supprimer` pour cela.

    Vérifie ton tri sur une liste qui contient **deux fois la même valeur** : c'est le cas où une erreur de « reste » se voit, et pas ailleurs.

## 6 Pour aller plus loin : `dataclass` et `match`

Python possède aussi le **pattern matching** (`match` / `case`), mais il est vraiment fait pour des **classes**, en particulier des **dataclasses**. Avec elles, on définit `Vide` et `Cons` **exactement** comme les deux constructeurs de Gleam. C'est une **autre représentation** de la liste, à la place des tuples :

```python
from dataclasses import dataclass


@dataclass
class Vide:
    pass


@dataclass
class Cons[T]:
    tete: T
    queue: "Liste[T]"


type Liste[T] = Vide | Cons[T]
```

On construit alors une liste **à l'identique de Gleam** (en Python, `Vide()` prend des parenthèses car on crée une instance) :

```python
exemple = Cons(2, Cons(3, Cons(4, Vide())))
#   en Gleam :  Cons(2, Cons(3, Cons(4, Vide)))
```

Et le `match` retrouve tout son sens, **un cas par constructeur**, comme le `case` de Gleam :

```python
def taille(lst: Liste) -> int:
    match lst:
        case Vide():
            return 0
        case Cons(_, queue):
            return 1 + taille(queue)
```

Sur deux listes, les **quatre** cas redeviennent nets, à comparer avec la version en `if` de la section 3 :

```python
def sont_egales(l1: Liste, l2: Liste) -> bool:
    match l1, l2:
        case Vide(), Vide():
            return True
        case Vide(), Cons(_, _):
            return False
        case Cons(_, _), Vide():
            return False
        case Cons(t1, q1), Cons(t2, q2):
            return t1 == t2 and sont_egales(q1, q2)
```

Cette écriture est **hors programme** (les dataclasses ne sont pas exigées), mais c'est le calque le plus exact de Gleam, et la façon dont `match` est vraiment prévu pour être utilisé. Une différence subtile demeure : Python, contrairement à Gleam, **ne vérifie pas** que tu as traité tous les cas.

## 7 Trois problèmes pour finir

Aucune version n'existe d'avance, ni en Gleam ni en Python, et la solution n'est écrite nulle part. On te donne ce que la fonction doit rendre, et des exemples qui te serviront de test.

**Écris chacune dans le langage que tu veux, puis transcris-la dans l'autre.** C'est le même passage qu'aux sections 3 et 4, mais dans le sens que tu choisis, et sur un code dont tu es l'auteur. Les signatures ci-dessous sont écrites en Python, celles de Gleam s'en déduisent par le tableau de la section 3.

**Écris le test d'abord**, avec les exemples de l'énoncé, puis la fonction.

!!! question "intercale"
    `intercale[T](lst: Liste[T], x: T) -> Liste[T]` rend une nouvelle liste où `x` est glissé **entre** deux éléments voisins, et nulle part ailleurs.

    - `intercale(2 -> 3 -> 4, 0)` donne `2 -> 0 -> 3 -> 0 -> 4`
    - sur la liste `2`, à un seul élément, il ne se passe rien : pas de voisin, pas de séparateur
    - sur la liste vide, le résultat est la liste vide

!!! question "compress"
    `compress[T](lst: Liste[T]) -> Liste[T]` supprime les répétitions **consécutives** : d'une suite d'éléments égaux qui se suivent, il ne reste que le premier.

    - `compress(1 -> 1 -> 2 -> 2 -> 2 -> 3 -> 1)` donne `1 -> 2 -> 3 -> 1`
    - sur la liste vide, le résultat est la liste vide

    Regarde le `1` de la fin, qui **reste** : ce n'est pas « enlever les doublons », c'est « enlever les répétitions qui se touchent ».

!!! question "aplatir"
    Une liste peut contenir des listes, qui peuvent elles-mêmes en contenir. `aplatir` rend la liste **plate** de tous les éléments, dans l'ordre, quelle que soit la profondeur.

    - `aplatir((1 -> 2) -> 3 -> ((4 -> 5) -> 6))` donne `1 -> 2 -> 3 -> 4 -> 5 -> 6`
    - sur la liste vide, le résultat est la liste vide

    Deux choses à régler avant de coder, et elles ne se devinent pas. Ce sont aussi les deux endroits où les deux langages ne font pas pareil.

    **Dire qu'un élément est soit un entier, soit une liste du même genre.** En Python, par un alias qui s'appelle lui-même, exactement comme en section 1 :

    ```python
    type Imbriquee = Liste[int | Imbriquee]


    def aplatir(lst: Imbriquee) -> Liste[int]:
        ...
    ```

    En Gleam, par un type à **deux constructeurs**, qui est la façon habituelle d'y écrire « ou bien ceci, ou bien cela » :

    ```gleam
    pub type Imbriquee {
      Element(Int)
      Sous(Liste(Imbriquee))
    }
    ```

    **Poser la question à chaque élément**, « es-tu une liste ? ». En Python, elle se pose à l'exécution : `isinstance(t, tuple)`, puisqu'une liste est représentée par un tuple. En Gleam, elle ne se pose pas du tout : `Element` et `Sous` sont deux motifs du `case`, et le compilateur vérifie que tu les as traités tous les deux.

!!! note "Une troisième fois, plus tard"
    Après la programmation objet, on réimplémentera cette même structure une **troisième** fois : une liste chaînée en **objet impératif**, avec des `while`. Même structure, trois paradigmes (fonctionnel, impératif, objet), de quoi mesurer ce que la récursivité apporte ici.
