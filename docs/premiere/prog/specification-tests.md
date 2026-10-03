# Spécification et tests

!!! note "Rappel d'ouverture (5 minutes, cours fermé)"
    Réponds **sans rouvrir** les pages précédentes, en écrivant tes réponses.

    1. Avec `mot = "bonjour"` : que valent `len(mot)` et `mot[3]` ?
    2. Que vaut `"ha" * 3 + "!"` ?
    3. Que vaut `(17 // 5) * 5 + 17 % 5` ? Pourquoi ce résultat ne dépend-il pas des deux nombres choisis ?

    ??? success "Corrigé"
        1. `7` et `"j"`. Le premier caractère a l'indice `0`.
        2. `"hahaha!"` : la répétition est calculée d'abord, puis la concaténation.
        3. `17`. Quotient fois diviseur plus reste redonne toujours le nombre de départ : c'est la définition même de la division euclidienne.

Écrire une fonction, c'est une chose. S'assurer qu'elle fait **vraiment** ce qu'on attend en est une autre. C'est le sujet de cette page, et c'est sans doute la partie la plus importante du travail d'un programmeur.

## 1. Spécifier : dire *ce que* fait la fonction

**Spécifier** une fonction, c'est décrire ce qu'elle prend en entrée et ce qu'elle rend en sortie, **sans dire comment**. C'est le rôle de la **signature** et de la **docstring**, vues dans [Les fonctions](fonctions.md).

```python
def carre(x: float) -> float:
    """Renvoie le carré du flottant x."""
    ...
```

La signature dit : « je prends un flottant, je renvoie un flottant ». La docstring dit : « ce flottant, c'est le carré de l'entrée ». On sait exactement ce que la fonction **doit** faire, avant même de l'écrire.

!!! success "Toujours dans cet ordre"
    1. La **signature** (le contrat) ;
    2. la **docstring** (ce que fait la fonction) ;
    3. le **code** ;
    4. les **tests**, qui vérifient que le code respecte le contrat.

## 2. Tester automatiquement : `assert`

Python offre un moyen simple de vérifier qu'une fonction renvoie la bonne valeur : l'instruction **`assert`**.

```python
assert carre(3) == 9, "carre(3) aurait dû valoir 9"
```

- Si la condition est **vraie**, il ne se passe rien : le test passe.
- Si elle est **fausse**, Python **lève une erreur** (`AssertionError`) avec le message, et arrête le programme.

!!! question "Corriger grâce à un test"
    Voici une fonction `carre` **volontairement fausse**. Le test le détecte. Corrige le code, puis relance : plus aucune erreur ne doit apparaître.

    ```python
    def carre(x: float) -> float:
        """Renvoie le carré du flottant x."""
        return x * (x + 1)     # bug !

    assert carre(3) == 9, "carre(3) aurait dû valoir 9"
    ```

    ??? warning "Corrigé"
        ```python
        def carre(x: float) -> float:
            """Renvoie le carré du flottant x."""
            return x * x

        assert carre(3) == 9, "carre(3) aurait dû valoir 9"
        assert carre(0) == 0
        assert carre(-4) == 16      # ne pas oublier les cas « limites »
        ```

!!! abstract "Ce qu'un test change dans la façon de chercher un bug"
    Sans test, une erreur **logique** ne se signale pas : le programme tourne et donne un résultat faux. Un `assert` transforme cette erreur silencieuse en erreur **bruyante**, qui s'arrête et nomme la ligne. Autrement dit, il fait passer le bug le plus coûteux dans la catégorie la moins coûteuse.

    D'où la discipline, la même que sur la boucle infinie : **une hypothèse précise avant chaque modification**. Devant un `assert` qui casse, on n'édite pas le code au hasard. On dit d'abord « je pense que le résultat est trop grand de 1 parce que la boucle va jusqu'à `n` inclus », puis on vérifie cette phrase-là. Si elle est fausse, on en formule une autre.

!!! tip "Un bon test couvre plusieurs cas"
    Un seul `assert` ne suffit pas. Pense aux cas particuliers : `0`, un nombre négatif, une liste vide, le plus petit ou le plus grand cas possible. Un bug se cache souvent dans un cas qu'on n'a pas testé.

## 3. Des exemples qui deviennent des tests : les doctests

On peut placer les exemples **directement dans la docstring**, sous la forme `>>>` suivie du résultat attendu. Ces exemples documentent la fonction **et** servent de tests.

```python
def carre(x: float) -> float:
    """Renvoie le carré du flottant x.

    >>> carre(3)
    9
    >>> carre(-4)
    16
    """
    return x * x
```

Chaque ligne `>>> carre(3)` indique un appel, et la ligne suivante le résultat attendu. Python peut vérifier automatiquement tous ces exemples d'un coup. C'est le format utilisé dans la plupart des exercices de ce cours.

## 4. Préconditions et postconditions

Le **contrat** d'une fonction a deux faces :

- une **précondition** : ce qui doit être vrai **avant** l'appel, sur les arguments ;
- une **postcondition** : ce que la fonction **garantit** sur son résultat si la précondition est respectée.

On vérifie souvent une précondition avec un `assert` au début de la fonction :

```python
def minimum(lst: list[int]) -> int:
    """Renvoie le plus petit élément de lst.

    Précondition : lst n'est pas vide.

    >>> minimum([7, 2, 9, 2, 5])
    2
    """
    assert len(lst) > 0, "la liste ne doit pas être vide"
    ...
```

Ici, la précondition « la liste n'est pas vide » est nécessaire : le minimum d'une liste vide n'a pas de sens. L'`assert` protège la fonction contre un usage incorrect.

!!! note "Une liste, déjà ?"
    Les listes ne sont étudiées que plus loin, dans [Les listes](listes.md). Elles servent ici uniquement d'exemple de donnée sur laquelle une **précondition** a un sens évident. Retiens le contrat, pas la manipulation : `len(lst) > 0` se lit « la liste contient au moins un élément ».

## 5. Exercices

!!! question "Spécifier, tester, puis coder"
    Pour chaque fonction, écris **d'abord** la signature et la docstring, **puis** au moins deux `assert`, et **seulement ensuite** le code.

    1. `aire_rectangle(largeur, hauteur)` : l'aire d'un rectangle.
    2. `cube(n)` : le cube d'un entier.
    3. `est_pair(n)` : `True` si `n` est pair.
    4. `celsius_vers_fahrenheit(t)` : convertit une température ($°F = °C \times 1{,}8 + 32$).

    ??? warning "Corrigé (exemple pour les deux premières)"
        ```python
        def aire_rectangle(largeur: float, hauteur: float) -> float:
            """Renvoie l'aire d'un rectangle largeur x hauteur."""
            return largeur * hauteur

        assert aire_rectangle(14, 50) == 700
        assert aire_rectangle(0, 5) == 0

        def cube(n: int) -> int:
            """Renvoie le cube de l'entier n."""
            return n ** 3

        assert cube(2) == 8
        assert cube(-3) == -27
        assert cube(0) == 0
        ```
