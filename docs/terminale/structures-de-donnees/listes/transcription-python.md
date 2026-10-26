# Transcription en Python

!!! info "Ce que tu fais ici, et ce que tu ne fais pas"
    Tu as déjà écrit toutes ces fonctions en Gleam. **Les algorithmes, tu les as.** Il n'y a rien à chercher sur cette page : on réécrit les mêmes fonctions en Python, et le seul travail est la **syntaxe**.

    Garde la page [Listes et récursivité](listes.md) ouverte à côté. Ta version Gleam est ton énoncé.

## 1 Les primitives

Comme pour les piles et les files, on ne touche **jamais** à la représentation. Une liste est un couple `(tête, queue)` ou le tuple vide, mais cela ne te regarde pas : tu passes par les **cinq primitives**.

!!! fondamental "L'interface"
    | Primitive | Ce qu'elle fait |
    |---|---|
    | `vide()` | rend la liste vide, c'est le `Vide` de Gleam |
    | `cons(t, q)` | rend la liste de tête `t` et de queue `q`, c'est le `Cons(t, q)` de Gleam |
    | `est_vide(lst)` | dit si la liste est vide |
    | `tete(lst)` | rend la tête, **interdit** sur une liste vide |
    | `queue(lst)` | rend la queue, **interdit** sur une liste vide |

Crée le fichier `python/structures/lineaires/liste.py` et recopie ceci. Tes fonctions viendront **à la suite**, dans le même fichier.

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

!!! note "Mise en place"
    - Le fichier va dans `python/structures/lineaires/`. Si ce répertoire n'existe pas encore, crée-le, et **chaque répertoire créé reçoit un fichier vide `__init__.py`**.
    - Les tests vont **à côté**, dans `python/structures/lineaires/liste_test.py`. Chaque exercice te donne le sien, à coller à la fin du fichier, en tête duquel tu écris une seule fois :

        ```python
        from structures.lineaires import liste
        ```

    - Pour les lancer, depuis la racine de ton dépôt : `uv run pytest`

    Colle ce premier test tout de suite : il ne teste rien que tu aies écrit, il vérifie que **le montage tient**, c'est-à-dire que le fichier est au bon endroit et que `pytest` le trouve.

    ```python
    def test_primitives() -> None:
        l = liste.cons(2, liste.cons(3, liste.vide()))
        assert liste.est_vide(liste.vide())
        assert not liste.est_vide(l)
        assert liste.tete(l) == 2
        assert liste.queue(l) == liste.cons(3, liste.vide())
    ```

## 2 La correspondance, terme à terme

C'est tout ce qu'il y a à savoir. Le reste est mécanique.

| En Gleam | En Python |
|---|---|
| `Vide` | `vide()` |
| `Cons(t, q)` | `cons(t, q)` |
| le `case` sur la liste | un `if est_vide(lst):` suivi du cas `Cons` |
| `tete` et `queue` du motif | `tete(lst)` et `queue(lst)`, appelés quand tu en as besoin |
| `case condition { True -> A  False -> B }` | `if condition: A` sinon `B` |
| `lst1 == lst2` | `lst1 == lst2`, les tuples se comparent de la même façon |

### 2.1 Les trois formes, une fois chacune

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
    Sur **deux** listes, Gleam t'obligeait à écrire les quatre cas, et le compilateur vérifiait qu'aucun ne manquait. En Python, ils fondent dans des conditions, et **rien ne te dit si tu en as oublié un**. Écris-les au papier avant de coder, comme en Gleam, puis regroupe-les seulement après.

    ```python
    def sont_egales(l1: Liste, l2: Liste) -> bool:
        if est_vide(l1) and est_vide(l2):      # les deux vides
            return True
        if est_vide(l1) or est_vide(l2):       # une seule vide, les deux autres cas
            return False
        return tete(l1) == tete(l2) and sont_egales(queue(l1), queue(l2))
    ```

## 3 À transcrire

Même ordre que la page Gleam, pour que tu retrouves chaque fonction en face. Le test est à coller dans `liste_test.py`, le corrigé est là pour te débloquer, pas pour commencer.

### 3.1 Lire une liste

!!! question "somme"
    ??? info "Le test"
        ```python
        def test_somme() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(4, liste.vide())))
            assert liste.somme(liste.vide()) == 0
            assert liste.somme(l) == 9
        ```

    ??? success "Corrigé"
        ```python
        def somme(lst: Liste[int]) -> int:
            if est_vide(lst):
                return 0
            return tete(lst) + somme(queue(lst))
        ```

!!! question "somme_pairs"
    ??? info "Le test"
        ```python
        def test_somme_pairs() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(4, liste.vide())))
            assert liste.somme_pairs(liste.vide()) == 0
            assert liste.somme_pairs(l) == 6
        ```

    ??? success "Corrigé"
        ```python
        def somme_pairs(lst: Liste[int]) -> int:
            if est_vide(lst):
                return 0
            if tete(lst) % 2 == 0:
                return tete(lst) + somme_pairs(queue(lst))
            return somme_pairs(queue(lst))
        ```

!!! question "contient"
    ??? info "Le test"
        ```python
        def test_contient() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(4, liste.vide())))
            assert liste.contient(liste.vide(), 2) == False
            assert liste.contient(l, 3) == True
            assert liste.contient(l, 9) == False
        ```

    ??? success "Corrigé"
        ```python
        def contient[T](lst: Liste[T], x: T) -> bool:
            if est_vide(lst):
                return False
            return tete(lst) == x or contient(queue(lst), x)
        ```

        Le `or` de Python est **paresseux**, comme le `||` de Gleam : si la tête est la bonne, la queue n'est pas parcourue.

!!! question "sont_egales"
    Le corrigé est donné plus haut, dans l'avertissement sur les quatre cas. Colle le test, et vérifie que ta version passe.

    ??? info "Le test"
        ```python
        def test_sont_egales() -> None:
            l = liste.cons(2, liste.cons(3, liste.vide()))
            assert liste.sont_egales(liste.vide(), liste.vide()) == True
            assert liste.sont_egales(l, liste.cons(2, liste.cons(3, liste.vide()))) == True
            assert liste.sont_egales(l, liste.cons(2, liste.vide())) == False
            assert liste.sont_egales(l, liste.cons(2, liste.cons(9, liste.vide()))) == False
        ```

!!! question "to_str"
    ??? info "Le test"
        ```python
        def test_to_str() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(4, liste.vide())))
            assert liste.to_str(liste.vide()) == "_|_"
            assert liste.to_str(l) == "2 -> 3 -> 4 -> _|_"
        ```

    ??? success "Corrigé"
        ```python
        def to_str(lst: Liste[int]) -> str:
            if est_vide(lst):
                return "_|_"
            return str(tete(lst)) + " -> " + to_str(queue(lst))
        ```

        `str(n)` remplace `int.to_string(n)`, et `+` entre deux chaînes remplace `<>`.

!!! question "tous_vrais"
    ??? info "Le test"
        ```python
        def test_tous_vrais() -> None:
            assert liste.tous_vrais(liste.vide()) == True
            assert liste.tous_vrais(liste.cons(True, liste.cons(True, liste.vide()))) == True
            assert liste.tous_vrais(liste.cons(True, liste.cons(False, liste.vide()))) == False
        ```

    ??? success "Corrigé"
        ```python
        def tous_vrais(lst: Liste[bool]) -> bool:
            if est_vide(lst):
                return True
            return tete(lst) and tous_vrais(queue(lst))
        ```

!!! question "au_moins_un_vrai"
    ??? info "Le test"
        ```python
        def test_au_moins_un_vrai() -> None:
            assert liste.au_moins_un_vrai(liste.vide()) == False
            assert liste.au_moins_un_vrai(liste.cons(False, liste.cons(True, liste.vide()))) == True
            assert liste.au_moins_un_vrai(liste.cons(False, liste.cons(False, liste.vide()))) == False
        ```

    ??? success "Corrigé"
        ```python
        def au_moins_un_vrai(lst: Liste[bool]) -> bool:
            if est_vide(lst):
                return False
            return tete(lst) or au_moins_un_vrai(queue(lst))
        ```

!!! question "compte"
    ??? info "Le test"
        ```python
        def test_compte() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(2, liste.vide())))
            assert liste.compte(liste.vide(), 2) == 0
            assert liste.compte(l, 2) == 2
            assert liste.compte(l, 9) == 0
        ```

    ??? success "Corrigé"
        ```python
        def compte[T](lst: Liste[T], e: T) -> int:
            if est_vide(lst):
                return 0
            if tete(lst) == e:
                return 1 + compte(queue(lst), e)
            return compte(queue(lst), e)
        ```

### 3.2 Construire une liste

!!! question "inverser"
    `ajouter_fin` est donnée plus haut, tu n'as qu'à la recopier avant.

    ??? info "Le test"
        ```python
        def test_inverser() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(4, liste.vide())))
            assert liste.inverser(liste.vide()) == liste.vide()
            assert liste.inverser(l) == liste.cons(4, liste.cons(3, liste.cons(2, liste.vide())))
        ```

    ??? success "Corrigé"
        ```python
        def inverser[T](lst: Liste[T]) -> Liste[T]:
            if est_vide(lst):
                return vide()
            return ajouter_fin(inverser(queue(lst)), tete(lst))
        ```

!!! question "concat"
    ??? info "Le test"
        ```python
        def test_concat() -> None:
            l = liste.cons(2, liste.cons(3, liste.vide()))
            assert liste.concat(liste.vide(), liste.vide()) == liste.vide()
            assert liste.concat(liste.vide(), l) == l
            assert liste.concat(l, liste.vide()) == l
            assert liste.concat(l, liste.cons(4, liste.vide())) == liste.cons(
                2, liste.cons(3, liste.cons(4, liste.vide()))
            )
        ```

    ??? success "Corrigé"
        ```python
        def concat[T](l1: Liste[T], l2: Liste[T]) -> Liste[T]:
            if est_vide(l1):
                return l2
            return cons(tete(l1), concat(queue(l1), l2))
        ```

        Deux cas suffisent ici, là où Gleam en demandait quatre : si `l1` est vide on rend `l2`, qu'elle soit vide ou non. C'est la seule fonction où le passage en Python **raccourcit** vraiment le code, et c'est aussi la seule où tu peux oublier un cas sans que rien ne te le dise.

!!! question "repete"
    ??? info "Le test"
        ```python
        def test_repete() -> None:
            assert liste.repete(0, "a") == liste.vide()
            assert liste.repete(3, "a") == liste.cons(
                "a", liste.cons("a", liste.cons("a", liste.vide()))
            )
        ```

    ??? success "Corrigé"
        ```python
        def repete[T](n: int, x: T) -> Liste[T]:
            if n == 0:
                return vide()
            return cons(x, repete(n - 1, x))
        ```

        Le cas de base porte sur le compteur, pas sur une liste : il n'y a donc pas de `est_vide` ici.

!!! question "take"
    ??? info "Le test"
        ```python
        def test_take() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(4, liste.vide())))
            assert liste.take(liste.vide(), 2) == liste.vide()
            assert liste.take(l, 0) == liste.vide()
            assert liste.take(l, 2) == liste.cons(2, liste.cons(3, liste.vide()))
            assert liste.take(l, 9) == l
        ```

    ??? success "Corrigé"
        ```python
        def take[T](lst: Liste[T], n: int) -> Liste[T]:
            if est_vide(lst):
                return vide()
            if n == 0:
                return vide()
            return cons(tete(lst), take(queue(lst), n - 1))
        ```

        Les deux `case` emboîtés de Gleam deviennent deux `if` l'un après l'autre.

!!! question "drop"
    ??? info "Le test"
        ```python
        def test_drop() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(4, liste.vide())))
            assert liste.drop(liste.vide(), 2) == liste.vide()
            assert liste.drop(l, 0) == l
            assert liste.drop(l, 2) == liste.cons(4, liste.vide())
            assert liste.drop(l, 9) == liste.vide()
        ```

    ??? success "Corrigé"
        ```python
        def drop[T](lst: Liste[T], n: int) -> Liste[T]:
            if est_vide(lst):
                return vide()
            if n == 0:
                return lst
            return drop(queue(lst), n - 1)
        ```

!!! question "slice"
    ??? info "Le test"
        ```python
        def test_slice() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(4, liste.vide())))
            assert liste.slice(liste.vide(), 0, 2) == liste.vide()
            assert liste.slice(l, 1, 3) == liste.cons(3, liste.cons(4, liste.vide()))
            assert liste.slice(l, 0, 0) == liste.vide()
            assert liste.slice(l, 0, 9) == l
        ```

    ??? success "Corrigé"
        ```python
        def slice[T](lst: Liste[T], debut: int, fin: int) -> Liste[T]:
            return drop(take(lst, fin), debut)
        ```

        Python n'a pas d'opérateur `|>`, il ne reste que l'écriture emboîtée.

!!! question "supprimer"
    ??? info "Le test"
        ```python
        def test_supprimer() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(2, liste.vide())))
            assert liste.supprimer(liste.vide(), 2) == liste.vide()
            assert liste.supprimer(l, 2) == liste.cons(3, liste.cons(2, liste.vide()))
            assert liste.supprimer(l, 9) == l
        ```

    ??? success "Corrigé"
        ```python
        def supprimer[T](lst: Liste[T], e: T) -> Liste[T]:
            if est_vide(lst):
                return vide()
            if tete(lst) == e:
                return queue(lst)
            return cons(tete(lst), supprimer(queue(lst), e))
        ```

### 3.3 Filtrer et transformer

!!! question "impairs, positifs, negatifs"
    Trois fonctions, le même squelette, une condition qui change.

    ??? info "Les tests"
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
        ```

    ??? success "Corrigé"
        ```python
        def impairs(lst: Liste[int]) -> Liste[int]:
            if est_vide(lst):
                return vide()
            if tete(lst) % 2 != 0:
                return cons(tete(lst), impairs(queue(lst)))
            return impairs(queue(lst))


        def positifs(lst: Liste[int]) -> Liste[int]:
            if est_vide(lst):
                return vide()
            if tete(lst) > 0:
                return cons(tete(lst), positifs(queue(lst)))
            return positifs(queue(lst))


        def negatifs(lst: Liste[int]) -> Liste[int]:
            if est_vide(lst):
                return vide()
            if tete(lst) < 0:
                return cons(tete(lst), negatifs(queue(lst)))
            return negatifs(queue(lst))
        ```

!!! question "filter"
    En Gleam, le prédicat était une fonction passée en paramètre. En Python aussi : une fonction est une valeur, et `fn(x) { x > 0 }` s'écrit `lambda x: x > 0`.

    ??? info "Le test"
        ```python
        def test_filter() -> None:
            l = liste.cons(2, liste.cons(-3, liste.cons(4, liste.vide())))
            assert liste.filter(lambda x: x > 0, liste.vide()) == liste.vide()
            assert liste.filter(lambda x: x > 0, l) == liste.cons(2, liste.cons(4, liste.vide()))
        ```

    ??? success "Corrigé"
        ```python
        def filter[T](predicat, lst: Liste[T]) -> Liste[T]:
            if est_vide(lst):
                return vide()
            if predicat(tete(lst)):
                return cons(tete(lst), filter(predicat, queue(lst)))
            return filter(predicat, queue(lst))
        ```

!!! question "carres, doubles, triples"
    ??? info "Les tests"
        ```python
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
        ```

    ??? success "Corrigé"
        ```python
        def carres(lst: Liste[int]) -> Liste[int]:
            if est_vide(lst):
                return vide()
            return cons(tete(lst) * tete(lst), carres(queue(lst)))


        def doubles(lst: Liste[int]) -> Liste[int]:
            if est_vide(lst):
                return vide()
            return cons(2 * tete(lst), doubles(queue(lst)))


        def triples(lst: Liste[int]) -> Liste[int]:
            if est_vide(lst):
                return vide()
            return cons(3 * tete(lst), triples(queue(lst)))
        ```

!!! question "map"
    ??? info "Le test"
        ```python
        def test_map() -> None:
            l = liste.cons(2, liste.cons(3, liste.cons(4, liste.vide())))
            assert liste.map(lambda x: x * x, liste.vide()) == liste.vide()
            assert liste.map(lambda x: x * x, l) == liste.cons(
                4, liste.cons(9, liste.cons(16, liste.vide()))
            )
        ```

    ??? success "Corrigé"
        ```python
        def map[T, U](f, lst: Liste[T]) -> Liste[U]:
            if est_vide(lst):
                return vide()
            return cons(f(tete(lst)), map(f, queue(lst)))
        ```

!!! note "`filter` et `map` existent déjà en Python"
    Ce sont deux fonctions de la bibliothèque standard, qui font la même chose sur les listes Python. Les tiennes ne les écrasent pas tant que tu passes par `liste.filter` et `liste.map`, c'est-à-dire tant que tu importes **le module** et non les fonctions une par une.

## 4 Et ensuite

Quand tout passe, va écrire les fonctions de la section [En Python seulement](listes.md#43-en-python-seulement) de la page précédente : celles qui peuvent échouer, et qu'on ne pouvait pas faire en Gleam.
