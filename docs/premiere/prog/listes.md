# Les listes

!!! note "Rappel d'ouverture (5 minutes, cours fermé)"
    Réponds **sans rouvrir** les pages précédentes, en écrivant tes réponses.

    1. Avec `s = "chat"` : que valent `s[-1]` et `len(s)` ? Quel est le plus grand indice valide ?
    2. Toujours avec `s = "chat"`, que se passe-t-il si on écrit `s[0] = "p"` ?
    3. Écris la boucle qui construit dans `res` la chaîne `mot` à l'envers.

    ??? success "Corrigé"
        1. `s[-1]` vaut `"t"` et `len(s)` vaut `4`. Le plus grand indice valide est `3`, pas `4`.
        2. Une `TypeError` : une chaîne est **immuable**, on ne peut pas en changer un caractère. Retiens bien cette réponse, la page d'aujourd'hui introduit précisément le type qui, lui, le permet.
        3. `res = ""` avant la boucle, puis `res = c + res` à chaque tour.

Une **liste** est une [séquence](caracteres.md), au même titre qu'une chaîne : des éléments ordonnés, numérotés de `0` à `len(...) - 1`. Ce qui est **nouveau**, et qui fait tout l'intérêt de cette page, c'est qu'on peut la **modifier** : elle est *mutable*. C'est le type de collection le plus utilisé.

```python
notes = [16, 12, 18]      # une liste de 3 entiers
vide = []                 # une liste vide
melange = [1, "deux", 3.0]  # les éléments peuvent être de types différents
```

Tu sais donc déjà t'en servir pour l'essentiel : `notes[0]`, `len(notes)`, `18 in notes`, `for note in notes:` s'écrivent exactement comme sur une chaîne. **Rien de tout cela n'est à réapprendre.** Ce qui est nouveau, et c'est le seul point vraiment neuf de cette page, c'est qu'une liste se **change sur place**.

## Modifier un élément

Contrairement à une chaîne ou un tuple, on peut remplacer un élément par son indice :

```python
notes = [16, 12, 18]
notes[1] = 20
print(notes)      # [16, 20, 18]
```

## Les méthodes qui modifient la liste

Une **méthode** s'appelle avec un point : `laliste.methode(...)`.

| Méthode | Effet |
| --- | --- |
| `lst.append(x)` | ajoute `x` **à la fin** |
| `lst.insert(i, x)` | insère `x` à l'indice `i` |
| `lst.pop()` | retire **et renvoie** le dernier élément (`lst.pop(i)` pour l'indice `i`) |
| `lst.remove(x)` | retire la **première** occurrence de `x` |
| `lst.sort()` | **trie** la liste sur place |

```python
courses = ["pain", "lait"]
courses.append("oeufs")     # ["pain", "lait", "oeufs"]
courses.remove("lait")      # ["pain", "oeufs"]
dernier = courses.pop()     # dernier vaut "oeufs", courses vaut ["pain"]
```

!!! danger "Piège : modifier n'est pas renvoyer"
    La plupart de ces méthodes **modifient la liste sur place** et renvoient `None`. Il ne faut donc pas écrire `notes = notes.append(20)` : cela rangerait `None` dans `notes` et **perdrait la liste** !

    ```python
    notes = [16, 12]
    notes.append(20)          # correct : notes vaut [16, 12, 20]
    notes = notes.append(20)  # ERREUR : notes vaut maintenant None
    ```

    Pour trier, attention de même : `lst.sort()` trie **sur place** (et renvoie `None`), tandis que `sorted(lst)` **renvoie une nouvelle liste** triée sans toucher à l'originale.

## Deux noms, une seule liste

Une variable ne **contient** pas la liste : elle **pointe vers** elle (elle garde son adresse en mémoire). C'est une image à avoir en tête dès qu'on écrit `b = a`.

```python
a = [1, 2, 3]
b = a          # b pointe vers LA MÊME liste que a
a.append(4)
print(b)       # [1, 2, 3, 4]  <- b a changé aussi !
```

!!! danger "`b = a` ne copie pas la liste"
    `b = a` copie seulement la **flèche** (la référence), pas la liste. Les deux noms `a` et `b` désignent alors **un seul et même objet** en mémoire :

    ```
    a ──▶ [1, 2, 3, 4] ◀── b
    ```

    Modifier la liste par l'un la modifie donc pour l'autre.

Compare avec un entier, qui est **immuable** :

```python
a = 5
b = a
a = a + 1
print(b)       # 5 : inchangé
```

Ici `a = a + 1` ne modifie pas l'objet `5` : il fabrique un **nouvel** entier et fait pointer `a` dessus, tandis que `b` continue de pointer vers l'ancien. Une liste, elle, est modifiée **sur place** : tous ceux qui pointent dessus voient le changement.

### Faire une vraie copie

Pour obtenir une liste **indépendante**, on la copie explicitement :

```python
b = a.copy()      # ou list(a), ou a[:]
a.append(4)
print(b)          # inchangée : b est une autre liste
```

### Conséquence sur les fonctions

Si on passe une liste à une fonction qui la modifie, la liste de l'appelant **change aussi** (c'est la même) :

```python
def ajoute_zero(lst: list[int]) -> None:
    lst.append(0)

mes_notes = [12, 15]
ajoute_zero(mes_notes)
print(mes_notes)   # [12, 15, 0] : la liste d'origine a été modifiée
```

!!! question "Prédire avant d'exécuter"
    Sans lancer le code, prédis l'affichage, puis vérifie :

    ```python
    a = [1, 2, 3]
    b = a
    b.append(99)
    print(a)
    ```

    ??? warning "Réponse"
        `[1, 2, 3, 99]`. Comme `b` et `a` désignent la même liste, l'ajout via `b` se voit aussi par `a`.

## Construire une liste par accumulation

C'est l'usage le plus important : partir d'une **liste vide** et la remplir, tour après tour, avec `append`. C'est le motif d'[accumulation](boucle-for.md) appliqué aux listes.

```python
# Construire la liste des carrés de 0 à 9
carres: list[int] = []          # 1. accumulateur : une liste vide
for i in range(10):             # 2. parcours
    carres.append(i * i)        # 3. on accumule en ajoutant à la fin
print(carres)                   # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

On retrouve la méthodologie de l'accumulation : on **initialise** (ici `[]`), on **parcourt**, et à chaque tour on **ajoute** au résultat.

!!! success "C'est le même mécanisme, et il n'y en aura pas d'autre"
    Tu as accumulé un **entier** (une somme, un compte), puis une **chaîne** (un mot renversé), et maintenant une **liste**. Le `for` est le même, les trois temps sont les mêmes, seul le **type de l'accumulateur** change et donc sa valeur initiale : `0`, `""`, `[]`. Quand tu croiseras les dictionnaires, ce sera encore ce mécanisme.

## Retrouver l'accumulation et la fusion sur une liste

Ces deux exercices sont ceux de la [boucle `for`](boucle-for.md), portés sur les listes. Rien de nouveau n'y est demandé : c'est le même `for`, la même méthodologie. Si tu bloques, le problème n'est pas la liste.

!!! question "Minimum (sans la fonction `min`)"
    ```python
    def minimum(lst: list[int]) -> int:
        """Renvoie le plus petit élément d'une liste non vide.

        >>> minimum([7, 9, 2, 8, 2, 5])
        2
        >>> minimum([4])
        4
        """
        assert len(lst) > 0, "la liste ne doit pas être vide"
        ...
    ```

    ??? tip "Indice léger"
        L'accumulateur n'est pas un compteur : c'est **le plus petit élément vu jusqu'ici**. Par quoi l'initialiser ? Attention, `0` serait faux sur une liste de nombres positifs.

    ??? tip "Indice plus précis"
        On l'initialise avec `lst[0]`, le seul candidat dont on soit sûr qu'il appartient à la liste. Puis, dans la boucle, on le remplace chaque fois qu'on rencontre plus petit.

    ??? success "Solution"
        ```python
        def minimum(lst: list[int]) -> int:
            """Renvoie le plus petit élément d'une liste non vide."""
            assert len(lst) > 0, "la liste ne doit pas être vide"
            mini = lst[0]
            for x in lst:
                if x < mini:
                    mini = x
            return mini
        ```

!!! question "Fusion : minimum et maximum en un seul parcours"
    Écris `min_et_max(lst)` qui renvoie le couple `(plus petit, plus grand)` d'une liste non vide, en **un seul parcours**.

    ??? tip "Indice léger"
        Deux accumulateurs menés en parallèle. Chacun a sa propre initialisation **avant** la boucle et sa propre mise à jour **dans** la boucle. Le piège est d'en oublier une des deux.

    ??? tip "Indice plus précis"
        `mini` et `maxi` sont tous deux initialisés à `lst[0]`. Dans la boucle, deux `if` **indépendants** : l'un compare à `mini`, l'autre à `maxi`. Ce n'est pas un `if / else`, car un même élément peut mettre les deux à jour au premier tour.

    ??? success "Solution"
        ```python
        def min_et_max(lst: list[int]) -> tuple[int, int]:
            """Renvoie le couple (minimum, maximum) d'une liste non vide."""
            assert len(lst) > 0, "la liste ne doit pas être vide"
            mini = lst[0]
            maxi = lst[0]
            for x in lst:
                if x < mini:
                    mini = x
                if x > maxi:
                    maxi = x
            return (mini, maxi)
        ```
        Écrire deux boucles successives donnerait le bon résultat, mais ce n'est pas ce qui est demandé : l'exercice porte sur la **fusion**, c'est-à-dire sur la capacité à mener deux traitements de front. C'est le point où l'on se trompe le plus.

## Listes de listes

Un élément d'une liste peut lui-même être une liste. On accède alors avec deux indices, `a[i][j]`. Cette **imbrication** est reprise et généralisée dans [Les séquences](2.sequences.md).

```python
grille = [[1, 2, 3],
          [4, 5, 6]]
print(grille[1][2])     # 6 : ligne 1, colonne 2
```

## Exercices

!!! question "1 - Remplir une liste"
    Construis, par accumulation, la liste des multiples de 3 de 0 à 30 inclus.

    ??? warning "Corrigé"
        ```python
        multiples = []
        for i in range(0, 31, 3):
            multiples.append(i)
        print(multiples)
        ```

!!! question "2 - Filtrer"
    À partir de `notes = [8, 15, 3, 12, 17, 9]`, construis la liste des notes supérieures ou égales à 10.

    ??? warning "Corrigé"
        ```python
        notes = [8, 15, 3, 12, 17, 9]
        reussies = []
        for note in notes:
            if note >= 10:
                reussies.append(note)
        print(reussies)     # [15, 12, 17]
        ```

!!! question "3 - Doctests"
    Écris et teste une fonction qui construit une liste :

    ```python
    def repete(x: int, n: int) -> list[int]:
        """Renvoie une liste contenant n fois la valeur x.

        >>> repete(7, 3)
        [7, 7, 7]
        >>> repete(0, 0)
        []
        """
        ...
    ```
