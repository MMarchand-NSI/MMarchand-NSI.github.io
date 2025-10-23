# Les séquences

Ici, nous allons parler de types qui permettent de stocker une suite d'éléments dans une seule variable.

Il s'agit surtout de définitions à accepter et à savoir. Ce sont des éléments de langage à connaître.

!!! abstract "Séquence"
    Une séquence est une structure de données linéaire qui permet de stocker une suite d'éléments. Ces éléments ont un ordre. On accède à chaque élément de la séquence par son indice.

    Sur cette page, nous allons étudier les caractéristiques communes des séquences.


## Reconnaître les séquences en python 

!!! abstract "Types de séquences"
    Les types de séquences sont les suivants:

    - Chaines de caractères (str)
    - Listes (list)
    - Tuples (tuple)

### str

Les str sont les séquences les plus simples. Une chaîne de caractères de taille $n$ est constituée de caractères numérotés de 0 à $n-1$.

On les reconnaît graphiquement grâce aux guillemets. Il en existe de 3 types:

```python
s1 = "Hello"
s2 = 'Hello'
s3 = """ Ceci est une chaîne
de caractères multi-lignes """
s4 = "J'ai gagné"
```

Vous remarquerez qu'on ne peut pas utiliser les simples guillemets pour s4.

### tuples

Un tuple de taille $n$ est constitué de valeurs numérotées de 0 à $n-1$. Les tuples sont généralement utilisés dans un contexte où on connaît à l'avance le nombre d'éléments qu'on souhaite stocker. On peut y stocker des données hétérogènes (qui ne sont pas du même type).

Voici comment on les reconnaît:

```python
coordonnees : tuple[int, int]      = (5, 0)
personne1   : tuple[str, int, str] = ("Jean", 16, "Paris")
personne2   : tuple[str, int, str] = ("Alice", 18, "Brest")
```

On les reconnaît généralement à leurs parenthèses, mais en python, ces parenthèses sont facultatives. Ce sont seulement des valeurs séparées par des virgules. Voici des instructions équivalentes aux précédentes:

```python
coordonnees : tuple[int, int]      = 5, 0
personne1   : tuple[str, int, str] = "Jean", 16, "Paris"
personne2   : tuple[str, int, str] = "Alice", 18, "Brest"
```

Par soucis de clarté, on utilisera toujours les parenthèses.

Attention, le tuple à 1 élément se déclare ainsi:

```python
coordonnees : tuple[int] = (5,)
```

Si on ne met pas de virgule, python croit qu'on veut simplement mettre 5 en tant qu'`int` dans la variable `coordonnees`.

### listes

Une liste de taille $n$ est constituée de valeurs numérotées de 0 à $n-1$. En python, on peut y stocker des valeurs de type hétérogène, mais on évitera autant que faire se peut. D'ailleurs le système de type de python nous l'impose.

Voici comment on les reconnaît:

```python
notes       : list[float]      = [15, 12, 17, 10.5, 14.5]
prenoms     : list[str]        = ["Alice", "Bob", "Clara"]
```
---

## Accéder aux éléments d'une séquence

!!! danger "Indices des séquences"
    Les indices d'une séquence de taille $n$ sont numérotés de **0 à $n-1$**

    Un indice est un numéro d'élément.


Pour accéder aux éléments d'une séquence, on utilise les crochets.

Pour récupérer l'élément numéro $i$ d'une séquence `seq`, on utilise 

```python 
seq[i]
```

Voici des exemples pour les 3 types. L'important est de remarquer que c'est toujours la même chose.

```python
mot = "Pikachu"
print(mot[0]) # "P"
print(mot[1]) # "i"
print(mot[2]) # "k"
print(mot[3]) # "a"
print(mot[4]) # "c"
print(mot[5]) # "h"
print(mot[6]) # "u"
print(mot[7]) # -> Lève une IndexError
```

```python
personne = ("Jean", 16, "Paris")
prenom = personne[0] # "Jean" est affecté à la variable prenom
age    = personne[1] # 16 est affecté à la variable age
ville  = personne[2] # "Paris" est affecté à la variable ville
test   = personne[3] # -> Lève une IndexError
```

Identiquement pour les listes:

```python
tokens = ["Une", "Séquence", "est", "une", "suite", "d'éléments"]
print(tokens[0]) # "Une"
print(tokens[1]) # "Séquence"
...
print(tokens[5]) # "d'éléments"
print(tokens[6]) # -> Lève une IndexError
```

---

## Imbrication

```python
tokens = ["Une", "Séquence", "est", "une", "suite", "d'éléments"]
```

`tokens[4]` vaut `"suite"`. `tokens[4]` est donc un str.

tokens[4] est donc une séquence comme les autres, qui se manipule comme les autres, avec des crochets. 

Si je veux aller chercher le caractère numéro 2 de `tokens[4]`, je fais `tokens[4][2]`. Et j'obtiens `"i"`. 

L'imbrication n'est pas une fonctionnalité spécifique, c'est juste une conséquence de la syntaxe entre crochets.

!!! question "Imbrication - Exercice guidé"
    ```python
    mots = [
        ["bon", "jour"],
        ["mi", "di"],
        ["chou", "ette"]
    ]
    ```

    **Questions :**
    
    1. Combien d'éléments a `mots` ?
    2. Quel est le type complet de `mots` ?
    3. Affiche le "u" de "jour"
    4. Affiche le "m" de "mi"
    5. Affiche le "u" de "chou"
    6. Affiche la chaîne "chouette" en concaténant deux éléments de `mots`.

    **Réponses :**
    
    1. `mots` a **3 éléments** (3 listes internes)
    2. Type complet : `list[list[str]]` (liste de listes de chaînes)
    3. `print(mots[0][1][2])` → affiche `"u"`
    4. `print(mots[1][0][0])` → affiche `"m"`
    5. `print(mots[2][0][2])` → affiche `"u"`
    6. `print(mots[2][0] + mots[2][1])` → affiche `"chouette"`

!!! question "Imbrication - Exercice autonome"
    ```python
    struct = (
        "root",
        ("A", ["B", "C"], "E"),
        ("F", (4, 9), "J"),
        ("K", (2, "Mot"), ["N", "O"])
    )
    ```
    
    **À vous de faire :**
    
    1. Combien d'éléments a `struct` ?
    2. Quel est le type complet de `struct` ?
    3. Affiche "root"
    4. Affiche "J"
    5. Affiche "N"
    6. Affiche le "o" de "Mot"

    ??? success "Solutions"
        1. `struct` a **4 éléments**
        2. Type : `tuple[str, tuple[str, list[str], str], tuple[str, tuple[int, int], str], tuple[str, tuple[int, str], list[str]]]`
        3. `print(struct[0])` → `"root"`
        4. `print(struct[2][2])` → `"J"`
        5. `print(struct[3][2][0])` → `"N"`
        6. `print(struct[3][1][1][1])` → `"o"`


---
## Mutabilité (capacité à être modifié)

!!! abstract "Séquence immuable"
    Une séquence immuable est une séquence dont la structure de données ne peut pas changer. Toute opération qui dit modifier une séquence renvoie en réalité une nouvelle séquence.

    **Les tuples et les str sont immuables**. Une fois créés, on peut les écraser, mais pas les modifier.

!!! abstract "Séquence mutable"
    Une séquence mutable est une séquence dont la structure de données peut changer. Toute opération qui dit modifier une séquence modifie en RÉALITÉ la séquence.

    **Les listes sont mutables**. Une fois créées, on peut les modifier.

### Analogie pour Comprendre

!!! tip "Analogie"
    - **Un tuple ou un str**, c'est comme un **texte écrit au stylo** : pour corriger, tu dois tout réécrire.
    - **Une liste**, c'est comme un texte **écrit au crayon** : tu peux gommer et modifier sur place.

### Conséquences sur les str et les tuples

```python
mot = "pikachu"

mot[0] = "P" # Cette instruction renvoie l'erreur ci-dessous

>>> TypeError: 'str' object does not support item assignment
```
On ne peut pas remplacer "p" par "P". On est obligé de remplacer tout le mot:

```python
mot = "Pikachu"
```

**Les conséquences sont les mêmes sur les tuples**

```python
personne = ("Jean", 16, "Paris")

personne[0] = "Bob"  # Cette instruction renvoie l'erreur ci-dessous

>>> TypeError: 'tuple' object does not support item assignment
```

On ne peut pas remplacer "Jean" par "Bob". On est obligé de remplacer tout le tuple:

```python
personne = ("Bob", 16, "Paris")
```

!!! danger "Attention"
    Ici, on utilise le même nom de variable, mais à chaque fois qu'on écrit `personne =`, ça crée un nouvel emplacement dans la mémoire, et le nom `personne` y est rattaché.


### Conséquences sur les listes

```python
notes = [16, 12, 18]

notes[1] = 12.5

print(notes)

>>> [16, 12.5, 18]
```

On peut modifier la note de Bob. Ici aucun nouvel emplacement n'est créé en mémoire, et elle est modifiée en place.

!!! abstract "Attention"
    Dès que vous utiliserez `=` directement sur la variable, le même mécanisme que précédemment s'applique. Un nouvel emplacement mémoire sera créé, donc vous perdrez l'avantage de la mutabilité.

---

## Fonctionnalités communes

### Récupérer le nombre d'éléments

On utilise la fonction `len()`, comme longueur en anglais.

```python
a = [1, 34, 56]
print(len(a))

>>> 3
```

```python
a = (1, 25, 42, 57)
print(len(a))

>>> 4
```

```python
a = "abc"
print(len(a))

>>> 3
```

### Appartenance

On utilise la syntaxe `in` et `not in`. Ce sont des opérateurs booléens comme les autres.

```python
a = [1, 2, 3]
print(3 in a)  # True
print(4 in a)  # False
print(3 not in a)  # False
print(4 not in a)  # True
```

### Concaténation (+)

```python
a = [1, 2, 3]
b = [4, 5, 6]
c = a + b
print(c)

>>> [1, 2, 3, 4, 5, 6]
```

### Répétition (*)

```python
a = (1, 2, 3)
b = a * 3
print(b)

>>> (1, 2, 3, 1, 2, 3, 1, 2, 3)
```

### Indexation ([])  (vu au début du cours)

```python
a = "xyz"
b = a[1]
print(b)

>>> y
```

### Slice ([:])

Les slices permettent de prendre une partie d'une séquence.

```python
t = ("A", "B", "C", "D", "E", "F")
b = t[1:4]  # de 1 à 4 EXCLUS, donc de 1 à 3
print(b)
>>> ("B", "C", "D")
```

```python
a = "ABCDEF"
b = a[3:]  # de 3 à la fin (rien après le :)
print(b)
>>> "DEF"
```

```python
lst = ["A", "B", "C", "D", "E", "F"]
b = lst[:3]  # Du début (rien avant le :) à 3 EXCLUS, donc de 0 à 2
print(b)
>>> ['A', 'B', 'C']
```

!!! tip "Slices avancés (optionnel)"
    On peut aussi utiliser un **pas** (step) pour sauter des éléments :
    
    ```python
    # Prendre un élément sur deux
    lst = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    print(lst[::2])  # Début:Fin:Pas
    >>> [0, 2, 4, 6, 8]
    
    # Inverser une séquence
    mot = "Python"
    print(mot[::-1])
    >>> "nohtyP"
    ```

---

## ⚠️ Erreurs Fréquentes

Voici les erreurs les plus courantes avec les séquences :

### Erreur 1 : Index hors limites

```python
# ❌ ERREUR
lst = [1, 2, 3]
print(lst[5])  # IndexError: list index out of range

# ✅ CORRECT
print(lst[2])  # Dernier élément (indice = taille - 1)
```

!!! tip "Astuce"
    L'indice maximum est toujours `len(seq) - 1` !

### Erreur 2 : Modifier un immuable

```python
# ❌ ERREUR
mot = "test"
mot[0] = "T"  # TypeError: 'str' object does not support item assignment

# ✅ CORRECT
mot = "Test"  # Créer un nouveau str
```

```python
# ❌ ERREUR
coords = (5, 10)
coords[0] = 3  # TypeError: 'tuple' object does not support item assignment

# ✅ CORRECT
coords = (3, 10)  # Créer un nouveau tuple
```

### Erreur 3 : Confusion sur les slices

```python
# ⚠️ ATTENTION
lst = [0, 1, 2, 3, 4]
print(lst[1:4])  
>>> [1, 2, 3]  # Pas [1, 2, 3, 4] !

# L'indice de fin est EXCLUS
```

!!! tip "Mnémotechnique"
    `[début:fin]` signifie : **de début INCLUS à fin EXCLUS**

### Erreur 4 : Confondre indice et valeur

```python
# ❌ ERREUR
notes = [15, 12, 18]
print(notes[15])  # IndexError (15 est une valeur, pas un indice !)

# ✅ CORRECT
print(notes[0])  # 15 (accéder par l'indice)
print(15 in notes)  # True (tester l'appartenance d'une valeur)
```

### Erreur 5 : Oublier que `len()` compte à partir de 1

```python
lst = [10, 20, 30]
print(len(lst))  # 3

# ❌ ERREUR
print(lst[len(lst)])  # IndexError: list index out of range

# ✅ CORRECT
print(lst[len(lst) - 1])  # 30 (dernier élément)
```

---

## 📚 Pour Aller Plus Loin

### Déstructuration (Hors Programme)

!!! abstract "Déstructuration"
    Certains d'entre vous vont tomber sur cette syntaxe, donc je préfère l'expliquer:

    ```python
    a, b, c = 3, 7, 9
    ```

    Ce qui signifie que les variables `a`, `b` et `c` seront affectées respectivement aux valeurs 3, 7 et 9.

    On appelle ça une déstructuration ou déconstruction.

    La forme du tuple `(3, 7, 9)` est comparée à la forme du tuple `(a, b, c)` et les valeurs 3, 7 et 9 seront affectées respectivement aux variables a, b et c.

    **Exemple pratique :**
    ```python
    personne = ("Alice", 25, "Paris")
    nom, age, ville = personne
    print(nom)    # "Alice"
    print(age)    # 25
    print(ville)  # "Paris"
    ```

    **Ça n'est que la partie émergée de l'iceberg.**

    ```python
    a, *b = 3, 7, 9
    ```
    Ce code va affecter `a` à 3, et le reste (*) dans `b`, sous forme de liste `[7, 9]`

    ```python
    premier, *milieu, dernier = [1, 2, 3, 4, 5]
    print(premier)  # 1
    print(milieu)   # [2, 3, 4]
    print(dernier)  # 5
    ```

    Ce n'est pas une astuce de langage, c'est un élément très puissant dans la résolution de certains problèmes.

---

## 📝 Résumé

| Type | Exemple | Mutable ? | Usage |
|------|---------|-----------|-------|
| **str** | `"Hello"` | ❌ Non | Texte |
| **tuple** | `(1, 2, 3)` | ❌ Non | Données fixes |
| **list** | `[1, 2, 3]` | ✅ Oui | Données modifiables |

**Opérations communes :**
- Accès : `seq[i]`
- Longueur : `len(seq)`
- Appartenance : `x in seq`
- Slice : `seq[début:fin]`
- Concaténation : `seq1 + seq2`
- Répétition : `seq * n`

**À retenir :**
- Les indices commencent à **0**
- Le dernier indice est **`len(seq) - 1`**
- Les slices excluent l'indice de fin
- Seules les listes sont modifiables