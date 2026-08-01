# Compréhensions de liste

!!! note "Rappel d'ouverture (5 minutes, cours fermé)"
    Réponds **sans rouvrir** les pages précédentes, en écrivant tes réponses.

    1. Écris, avec une boucle `for`, la construction de la liste des multiples de `5` de `0` à `50`.
    2. Où place-t-on le `if` quand on ne veut accumuler que certains éléments : avant, dans, ou après la boucle ?
    3. Comment parcourt-on à la fois les clés et les valeurs d'un dictionnaire ?

    ??? success "Corrigé"
        1. ```python
           multiples = []
           for i in range(0, 51, 5):
               multiples.append(i)
           ```
        2. **Dans** la boucle, avant la mise à jour de l'accumulateur. L'initialisation reste avant, le résultat s'utilise après.
        3. Avec `for cle, valeur in d.items():`.

    Toute cette page ne fait que **réécrire plus court** ce que tu viens d'écrire dans la question 1. Aucune nouvelle capacité n'y est introduite : si tu sais accumuler avec un `for`, tu sais déjà tout ce qu'une compréhension exprime.

Les **compréhensions de liste** (*list comprehensions*) sont une façon **concise et élégante** d'écrire des boucles qui construisent des listes. C'est une syntaxe très utilisée en Python.

## 1. Approche sémantique

Une compréhension de liste se lit presque comme une phrase en français :

```python
data = [9, 35, 42, 5]

res = [entier + 1 for entier in data if entier < 9]
```

**Lecture :** "La liste des `entier + 1` pour chaque `entier` dans `data` si `entier < 9`"

Ici, `res` contiendra `[6]` car seul 5 est inférieur à 9, et 5 + 1 = 6.

### Syntaxe générale

```python
[expression for element in liste if condition]
```

- **`expression`** : ce qu'on veut mettre dans la nouvelle liste (peut utiliser `element`)
- **`for element in liste`** : parcourt chaque élément de la liste
- **`if condition`** : filtre optionnel, ne garde que les éléments qui vérifient la condition

!!! example "Exemples simples"
    ```python
    # Tous les nombres de 0 à 9
    nombres = [x for x in range(10)]
    # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    # Les carrés de 0 à 9
    carres = [x**2 for x in range(10)]
    # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

    # Les nombres pairs entre 0 et 9
    pairs = [x for x in range(10) if x % 2 == 0]
    # [0, 2, 4, 6, 8]

    # Les carrés des nombres impairs
    carres_impairs = [x**2 for x in range(10) if x % 2 == 1]
    # [1, 9, 25, 49, 81]
    ```

## 2. Approche équivalente

Une compréhension de liste est **strictement équivalente** à une boucle `for` avec un accumulateur.

### Exemple : avec condition

**Avec compréhension de liste :**

```python
data = [9, 35, 42, 5]
res = [entier + 1 for entier in data if entier < 9]
```

**Avec boucle for classique :**

```python
data = [9, 35, 42, 5]
res = []  # accumulateur vide
for entier in data:
    if entier < 9:
        res.append(entier + 1)
```

Les deux versions produisent exactement le même résultat : `[6]`.

### Exemple : sans condition

**Avec compréhension de liste :**

```python
carres = [x**2 for x in range(5)]
```

**Avec boucle for classique :**

```python
carres = []
for x in range(5):
    carres.append(x**2)
```

Résultat : `[0, 1, 4, 9, 16]`

!!! tip "Quand utiliser quelle syntaxe ?"
    - **Compréhension** : pour des transformations simples et lisibles
    - **Boucle for** : quand la logique est complexe ou nécessite plusieurs lignes

    La compréhension est plus concise, mais ne sacrifie jamais la lisibilité !

## 3. Lire et prédire

!!! question "Prédire"
    Que contient `res` ? Traduis d'abord la compréhension en phrase, puis vérifie.

    ```python
    res = [x * 2 for x in range(5) if x % 2 == 1]
    ```

    ??? warning "Réponse"
        `[2, 6]`. On parcourt `0, 1, 2, 3, 4`, on ne garde que les impairs (`1` et `3`), puis on les double.

## 4. Exercices

### Listes de types primitifs

!!! question "Exercice 1 : Les multiples de 3"
    Écrire une compréhension de liste qui produit tous les **multiples de 3 entre 0 et 30 inclus**.

    Résultat attendu : `[0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30]`

??? success "Solution"
    ```python
    multiples_de_3 = [x for x in range(31) if x % 3 == 0]
    ```

    Ou en utilisant directement `range` :

    ```python
    multiples_de_3 = [x for x in range(0, 31, 3)]
    ```

!!! question "Exercice 2 : Filtrer les négatifs"
    Soit la liste `valeurs = [-5, 12, -3, 8, -1, 0, 7]`.

    Écrire une compréhension qui ne garde que les **valeurs strictement positives**.

    Résultat attendu : `[12, 8, 7]`

??? success "Solution"
    ```python
    valeurs = [-5, 12, -3, 8, -1, 0, 7]
    positifs = [v for v in valeurs if v > 0]
    ```

!!! question "Exercice 3 : Conversion de températures"
    Soit la liste de températures en Celsius : `celsius = [0, 10, 20, 30, 100]`.

    Écrire une compréhension qui convertit ces températures en **Fahrenheit** avec la formule : `F = C × 9/5 + 32`.

    Résultat attendu : `[32.0, 50.0, 68.0, 86.0, 212.0]`

??? success "Solution"
    ```python
    celsius = [0, 10, 20, 30, 100]
    fahrenheit = [c * 9/5 + 32 for c in celsius]
    ```

!!! question "Exercice 4 : Longueurs des mots"
    Soit la liste de mots : `mots = ["python", "nsi", "algorithmique", "code"]`.

    Écrire une compréhension qui crée une liste avec la **longueur de chaque mot**.

    Résultat attendu : `[6, 3, 14, 4]`

??? success "Solution"
    ```python
    mots = ["python", "nsi", "algorithmique", "code"]
    longueurs = [len(mot) for mot in mots]
    ```

!!! question "Exercice 5 : Mots longs"
    Avec la même liste de mots, écrire une compréhension qui ne garde que les **mots de 5 lettres ou plus**.

    Résultat attendu : `["python", "algorithmique"]`

??? success "Solution"
    ```python
    mots = ["python", "nsi", "algorithmique", "code"]
    mots_longs = [mot for mot in mots if len(mot) >= 5]
    ```

### Listes de dictionnaires

Les compréhensions de liste sont très utiles pour **filtrer ou transformer** des listes de dictionnaires.

!!! example "Exemple : Base de données d'élèves"
    ```python
    eleves = [
        {"nom": "Alice", "note": 15},
        {"nom": "Bob", "note": 8},
        {"nom": "Charlie", "note": 12},
        {"nom": "Diana", "note": 18}
    ]

    # Extraire les noms des élèves qui ont eu plus de 10
    admis = [e["nom"] for e in eleves if e["note"] > 10]
    # ['Alice', 'Charlie', 'Diana']

    # Augmenter toutes les notes de 2 points
    eleves_bonus = [{"nom": e["nom"], "note": e["note"] + 2} for e in eleves]
    # [{'nom': 'Alice', 'note': 17}, {'nom': 'Bob', 'note': 10}, ...]
    ```

!!! question "Exercice 6 : Filtrer par âge"
    Soit la liste de personnes :

    ```python
    personnes = [
        {"nom": "Alice", "age": 17},
        {"nom": "Bob", "age": 22},
        {"nom": "Charlie", "age": 16},
        {"nom": "Diana", "age": 19}
    ]
    ```

    Écrire une compréhension qui extrait les **noms des personnes majeures** (âge ≥ 18).

    Résultat attendu : `["Bob", "Diana"]`

??? success "Solution"
    ```python
    majeurs = [p["nom"] for p in personnes if p["age"] >= 18]
    ```

!!! question "Exercice 7 : Prix après réduction"
    Soit une liste de produits :

    ```python
    produits = [
        {"nom": "Livre", "prix": 20},
        {"nom": "Stylo", "prix": 2},
        {"nom": "Cahier", "prix": 5}
    ]
    ```

    Écrire une compréhension qui crée une nouvelle liste avec les mêmes produits, mais où tous les prix ont une **réduction de 10%**.

    Résultat attendu : `[{"nom": "Livre", "prix": 18.0}, {"nom": "Stylo", "prix": 1.8}, {"nom": "Cahier", "prix": 4.5}]`

??? success "Solution"
    ```python
    produits_promo = [{"nom": p["nom"], "prix": p["prix"] * 0.9} for p in produits]
    ```

!!! question "Exercice 8 : Filtrer et transformer"
    Avec la même liste de produits, écrire une compréhension qui extrait les **noms des produits coûtant moins de 10 euros**, mais **en majuscules**.

    Note : la méthode `.upper()` transforme une chaîne en majuscules.

    ```python
    >>> "Livre".upper()
    'LIVRE'
    ```

    Résultat attendu : `["STYLO", "CAHIER"]`

??? success "Solution"
    ```python
    noms_petit_prix = [p["nom"].upper() for p in produits if p["prix"] < 10]
    ```

!!! question "Exercice 9 : Films récents"
    Soit une liste de films :

    ```python
    films = [
        {"titre": "Inception", "annee": 2010, "note": 8.8},
        {"titre": "Interstellar", "annee": 2014, "note": 8.6},
        {"titre": "Matrix", "annee": 1999, "note": 8.7},
        {"titre": "Dune", "annee": 2021, "note": 8.0}
    ]
    ```

    Écrire une compréhension qui extrait les **titres des films sortis après 2010 avec une note supérieure à 8.5**.

    Résultat attendu : `["Interstellar"]`

??? success "Solution"
    ```python
    films_selectionnes = [f["titre"] for f in films if f["annee"] > 2010 and f["note"] > 8.5]
    ```

!!! question "Exercice 10 : Créer des descriptifs"
    Avec la même liste de films, créer une liste de **chaînes descriptives** au format : `"Titre (année)"`.

    Résultat attendu : `["Inception (2010)", "Interstellar (2014)", "Matrix (1999)", "Dune (2021)"]`

??? success "Solution"

    ```python
    descriptifs = [f["titre"] + " (" + str(f["annee"]) + ")" for f in films]
    ```

## 5. Résumé

- Les **compréhensions de liste** sont une syntaxe concise pour créer des listes
- Syntaxe : `[expression for element in liste if condition]`
- Équivalent à une boucle `for` avec un accumulateur vide et des `append()`
- Très pratique pour **filtrer** et **transformer** des listes
- Particulièrement utile avec des listes de dictionnaires

## Vérification individuelle : les types construits

!!! warning "À faire seul, cours fermé (15 minutes)"
    Sans aide et sans IA. Cette vérification conditionne le passage aux [exercices en autonomie](exercices.md).

    **1. Lire.** Que s'affiche-t-il ?
    ```python
    a = [1, 2, 3]
    b = a
    c = a.copy()
    b.append(4)
    c.append(5)
    print(a, b, c)

    stock = {"pain": 2, "lait": 0}
    print(stock.get("beurre", 0))
    ```

    **2. Compléter.** Réécris cette boucle en une **compréhension de liste**.
    ```python
    res = []
    for mot in ["chat", "hippopotame", "rat", "girafe"]:
        if len(mot) > 4:
            res.append(mot.upper())
    ```

    **3. Écrire.** Depuis zéro : `occurrences(txt)` qui renvoie un **dictionnaire** associant à chaque caractère de `txt` son nombre d'apparitions.

    ??? success "Réponses"
        **1.** `[1, 2, 3, 4] [1, 2, 3, 4] [1, 2, 3, 5]` puis `0`. `b = a` **ne copie pas** : `a` et `b` sont un seul objet. `c = a.copy()` en fabrique un second, indépendant, et il a été copié **avant** l'`append` sur `b`.

        **2.** `res = [mot.upper() for mot in ["chat", "hippopotame", "rat", "girafe"] if len(mot) > 4]`

        **3.**
        ```python
        def occurrences(txt: str) -> dict[str, int]:
            """Renvoie le nombre d'apparitions de chaque caractère de txt."""
            compte = {}
            for c in txt:
                compte[c] = compte.get(c, 0) + 1
            return compte
        ```
        C'est encore une accumulation : l'accumulateur est simplement un **dictionnaire vide** au lieu de `0`, `""` ou `[]`.

!!! abstract "Comment lire ton résultat"
    Les trois questions ne mesurent pas la même chose, et **rater la troisième en réussissant la première n'est pas un signe de faiblesse**. Lire du code, le compléter et l'écrire de zéro sont trois compétences distinctes, qui se travaillent séparément.

    - Tu réussis les trois : passe à la suite.
    - Tu réussis 1 et 2 mais pas 3 : tu comprends le mécanisme, il te manque la **mise en route**. Refais des exercices d'écriture courts, pas de la relecture.
    - Tu rates la 1 : reprends le traçage avant tout le reste. Écrire du code qu'on ne sait pas lire ne mène nulle part.
