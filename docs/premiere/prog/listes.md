# Les listes

Une **liste** est une [séquence](2.sequences.md) que l'on peut **modifier** (elle est *mutable*). C'est le type de collection le plus utilisé : on y range des éléments, on en ajoute, on en retire.

```python
notes = [16, 12, 18]      # une liste de 3 entiers
vide = []                 # une liste vide
melange = [1, "deux", 3.0]  # les éléments peuvent être de types différents
```

Comme toute séquence, on accède à ses éléments par leur indice, on la parcourt avec `for`, on connaît sa taille avec `len`. Ce qui est **nouveau**, c'est qu'on peut la **changer sur place**.

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

Comparez avec un entier, qui est **immuable** :

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
def ajoute_zero(lst: list[int]):
    lst.append(0)

mes_notes = [12, 15]
ajoute_zero(mes_notes)
print(mes_notes)   # [12, 15, 0] : la liste d'origine a été modifiée
```

!!! question "Prédire avant d'exécuter"
    Sans lancer le code, prédisez l'affichage, puis vérifiez :

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

## Listes de listes

Un élément d'une liste peut lui-même être une liste : c'est une [imbrication](2.sequences.md). On accède alors avec deux indices, `a[i][j]`.

```python
grille = [[1, 2, 3],
          [4, 5, 6]]
print(grille[1][2])     # 6 : ligne 1, colonne 2
```

## Exercices

!!! question "1 - Remplir une liste"
    Construisez, par accumulation, la liste des multiples de 3 de 0 à 30 inclus.

    ??? warning "Corrigé"
        ```python
        multiples = []
        for i in range(0, 31, 3):
            multiples.append(i)
        print(multiples)
        ```

!!! question "2 - Filtrer"
    À partir de `notes = [8, 15, 3, 12, 17, 9]`, construisez la liste des notes supérieures ou égales à 10.

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
    Écrivez et testez une fonction qui construit une liste :

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
