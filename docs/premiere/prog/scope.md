# Portée des variables (scope)

!!! note "Rappel d'ouverture (5 minutes, cours fermé)"
    Réponds **sans rouvrir** les pages précédentes, en écrivant tes réponses.

    1. Quelle est la différence entre `return x` et `print(x)` dans une fonction ?
    2. On écrit `b = carre(5)`. Explique en une phrase ce qui remplace l'appel `carre(5)` dans cette ligne.
    3. Que renvoie une fonction qui n'a aucune instruction `return` ?

    ??? success "Corrigé"
        1. `return` **rend une valeur** au reste du programme, qui peut la ranger et la réutiliser. `print` ne fait que l'**afficher** : la valeur est perdue pour le programme.
        2. La **valeur renvoyée** remplace l'appel. La ligne devient `b = 25` : un appel de fonction se comporte comme la valeur qu'il renvoie.
        3. Elle renvoie `None`. Une fonction renvoie **toujours** quelque chose ; sans `return`, c'est `None`. D'où le piège `return` contre `print`.

La **portée** (*scope*) d'une variable détermine les parties du code où cette variable est accessible. Comprendre la portée permet d'éviter des bugs subtils et d'écrire du code plus clair.

## 1. Variables locales

Une variable **locale** est créée à l'intérieur d'une fonction. Elle n'existe que **pendant l'exécution** de cette fonction et n'est accessible que dans son corps.

### Exemple de base

```python
def ma_fonction() -> None:
    x = 10  # Variable locale
    print("Dans la fonction, x =", x)

ma_fonction()       # Affiche 10
print(x)            # ❌ ERREUR : x n'existe pas ici
```

**Que se passe-t-il ?**

1. Quand `ma_fonction()` est appelée, Python crée une variable `x` locale
2. À la fin de l'exécution de la fonction, `x` est détruite
3. `print(x)` cherche `x` et ne la trouve pas → erreur `NameError`

### Les paramètres sont aussi des variables locales

```python
def calculer(a: int, b: int) -> int:
    # a et b sont des variables locales
    resultat = a + b  # resultat est aussi locale
    return resultat

somme = calculer(5, 3)
print(somme)        # 8
print(a)            # ❌ ERREUR : a n'existe que dans calculer()
```

!!! info "Pourquoi les variables locales ?"
    Les variables locales permettent d'**isoler** le code de chaque fonction. Deux fonctions peuvent avoir des variables du même nom sans conflit :

    ```python
    def fonction_a() -> None:
        x = 10
        print("Fonction A, x =", x)

    def fonction_b() -> None:
        x = 20
        print("Fonction B, x =", x)

    fonction_a()  # x = 10
    fonction_b()  # x = 20 (un autre x !)
    ```

## 2. Variables globales

Une variable **globale** est définie en dehors de toute fonction, au niveau principal du script. Elle est accessible partout dans le fichier.

### Lire une variable globale

```python
a = 5  # Variable globale

def afficher_a() -> None:
    print("Dans la fonction, a =", a)  # On peut lire a

afficher_a()                            # 5
print("En dehors, a =", a)              # 5
```

Ici, pas de problème : on **lit** simplement la valeur de `a`.

### Le piège : essayer de modifier sans `global`

```python
x = 10  # Variable globale

def incrementer_x() -> None:
    x = x + 1  # ❌ ERREUR : UnboundLocalError
    print(x)

incrementer_x()
```

**Que se passe-t-il ?**

Python voit `x = ...` dans la fonction et décide que `x` est une **variable locale** pour toute la fonction. Donc quand il lit `x + 1`, il cherche une variable locale `x` qui n'a pas encore été créée → **erreur**.

!!! danger "Erreur conceptuelle courante"
    Beaucoup pensent que Python "lit d'abord la variable globale puis crée une locale", mais c'est **faux**. Python analyse la fonction **avant** de l'exécuter et décide que toute variable assignée (`=`) est locale. L'erreur se produit **avant** la lecture.

### Modifier une variable globale avec `global`

Pour modifier une variable globale depuis une fonction, il faut déclarer explicitement `global` :

```python
x = 10  # Variable globale

def incrementer_x() -> None:
    global x      # Déclare qu'on veut utiliser la variable globale
    x = x + 1     # Maintenant ça marche

print("Avant :", x)   # 10
incrementer_x()
print("Après :", x)   # 11
```

### Conflit de nommage : créer une variable locale masque la globale

```python
compteur = 0  # Variable globale

def incrementer_compteur() -> None:
    compteur = 5  # Crée une variable LOCALE "compteur"
    print("Dans la fonction, compteur =", compteur)

incrementer_compteur()              # Affiche 5
print("Global, compteur =", compteur)  # Affiche 0 (inchangé)
```

Ici, la fonction crée une **nouvelle variable locale** `compteur` qui masque la globale. La variable globale reste à 0.

## 3. Bonnes pratiques

!!! warning "Éviter les variables globales modifiables"
    Les variables globales **modifiables** rendent le code difficile à comprendre et à débugger :

    - N'importe quelle fonction peut changer leur valeur
    - Difficile de savoir qui a modifié quoi
    - Crée des **dépendances cachées** entre fonctions

    **Préfère :**

    - Passer les valeurs en **paramètres**
    - Retourner les résultats avec **return**

    ```python
    # ❌ Mauvais : variable globale modifiable
    stock = 10

    def acheter() -> None:
        global stock
        stock -= 1

    # ✅ Bon : paramètres et return
    def acheter(stock: int) -> int:
        return stock - 1

    stock = 10
    stock = acheter(stock)
    ```

!!! tip "Les constantes globales sont OK"
    Les variables globales **en lecture seule** (constantes) sont acceptables :

    ```python
    PI = 3.14159
    TVA = 0.20
    MAX_TENTATIVES = 3

    def calculer_prix_ttc(prix_ht: float) -> float:
        return prix_ht * (1 + TVA)  # Lecture de TVA : OK
    ```

    Par convention, on les écrit en MAJUSCULES.

!!! note "Exception : Programmation événementielle"
    En **programmation événementielle** (interfaces graphiques, jeux vidéo), il est **difficile d'éviter** les variables globales modifiables. Les fonctions de callback (réactions aux événements) doivent accéder à l'état de l'application.

    **Exemple avec tkinter (interface graphique) :**

    ```python
    import tkinter as tk

    compteur = 0  # Variable globale nécessaire

    def clic() -> None:
        global compteur
        compteur += 1
        label.config(text=f"Clics : {compteur}")

    fenetre = tk.Tk()
    label = tk.Label(fenetre, text="Clics : 0")
    label.pack()
    bouton = tk.Button(fenetre, text="Cliquer", command=clic)
    bouton.pack()
    fenetre.mainloop()
    ```

    **Pourquoi c'est acceptable ici ?**

    - La fonction `clic()` est appelée par le framework (pas par toi)
    - On ne peut pas passer de paramètres à `clic()` directement
    - Les variables globales modélisent **l'état de l'application**

    Dans ce contexte, c'est un **compromis nécessaire** pour les débutants. Les programmeurs avancés utilisent des classes (programmation orientée objet) pour mieux gérer l'état, mais en première, les variables globales sont acceptables pour la programmation événementielle.

## 4. Exercices

!!! question "Exercice 1 : Prédire le résultat"
    Sans exécuter le code, prédis ce qui sera affiché :

    ```python
    y = 100

    def tester() -> None:
        y = 50
        print("Dans tester, y =", y)

    tester()
    print("En dehors, y =", y)
    ```

    Puis exécute pour vérifier.

??? success "Solution"
    ```
    Dans tester, y = 50
    En dehors, y = 100
    ```

    **Explication :** La fonction crée une variable **locale** `y = 50` qui masque la globale. La variable globale `y` reste à 100.

!!! question "Exercice 2 : Identifier l'erreur"
    Ce code provoque une erreur. Pourquoi ? Comment la corriger ?

    ```python
    total = 0

    def ajouter(valeur: int) -> None:
        total = total + valeur

    ajouter(5)
    print(total)
    ```

??? success "Solution"
    **Erreur :** `UnboundLocalError: local variable 'total' referenced before assignment`

    **Pourquoi :** Python voit `total = ...` et décide que `total` est locale. Quand il lit `total + valeur`, il cherche une variable locale qui n'existe pas encore.

    **Correction 1 (avec `global`) :**

    ```python
    total = 0

    def ajouter(valeur: int) -> None:
        global total
        total = total + valeur

    ajouter(5)
    print(total)  # 5
    ```

    **Correction 2 (meilleure : sans global) :**

    ```python
    def ajouter(total: int, valeur: int) -> int:
        return total + valeur

    total = 0
    total = ajouter(total, 5)
    print(total)  # 5
    ```

!!! question "Exercice 3 : Gestion de stock"
    Crée un fichier `stock.py` avec :

    - Une fonction `acheter(stock)` qui diminue le stock de 1 et le retourne
    - Une fonction `livraison(stock, quantite)` qui augmente le stock et le retourne

    Teste avec un stock initial de 10, 2 achats, puis une livraison de 5.

??? success "Solution"
    ```python
    def acheter(stock: int) -> int:
        """Diminue le stock de 1."""
        return stock - 1

    def livraison(stock: int, quantite: int) -> int:
        """Augmente le stock de la quantité livrée."""
        return stock + quantite

    # Test
    stock = 10
    print("Stock initial :", stock)

    stock = acheter(stock)
    stock = acheter(stock)
    print("Après 2 achats :", stock)  # 8

    stock = livraison(stock, 5)
    print("Après livraison de 5 :", stock)  # 13
    ```

## 5. Résumé

| Type | Où est-elle définie ? | Accessible où ? | Exemple |
|------|----------------------|-----------------|---------|
| **Locale** | Dans une fonction | Uniquement dans cette fonction | `def f(): x = 5` |
| **Globale** | Hors de toute fonction | Partout (lecture) | `x = 5` (au niveau principal) |
| **Globale modifiable** | Hors de toute fonction | Partout (écriture avec `global`) | `global x; x = 10` |

**Règles importantes :**

1. Les **paramètres** d'une fonction sont des variables locales
2. Une assignation `x = ...` dans une fonction crée une variable **locale** (sauf si `global x`)
3. Préfère **paramètres + return** aux variables globales modifiables

## Vérification individuelle : les fonctions

!!! warning "À faire seul, cours fermé (15 minutes)"
    Sans aide et sans IA. Cette vérification conditionne le passage aux pages d'exercices en autonomie.

    **1. Lire.** Que s'affiche-t-il ?
    ```python
    def double(n: int) -> int:
        n = n * 2
        return n

    x = 5
    y = double(x)
    print(x, y)
    print(double(double(2)))
    ```

    **2. Compléter.** Cette fonction ne marche pas. Dis **pourquoi** avant de la corriger.
    ```python
    def moyenne_trois(a: float, b: float, c: float) -> float:
        """Renvoie la moyenne de trois nombres."""
        print((a + b + c) / 3)

    m = moyenne_trois(10, 12, 14)
    print(m * 2)
    ```

    **3. Écrire.** Depuis zéro : la signature typée, la docstring, une fonction `test_initiales` avec **deux `assert`**, puis le code de `initiales(prenom, nom)`, qui renvoie les initiales suivies chacune d'un point : `initiales("Ada", "Lovelace")` vaut `"A.L."`. Le prénom et le nom ne sont jamais vides.

    ??? success "Réponses"
        **1.** `5 5` puis `8`. Le paramètre `n` est **local** : le modifier dans la fonction ne touche pas `x`. Et un appel vaut la valeur qu'il renvoie, donc `double(double(2))` vaut `double(4)`, soit `8`.

        **2.** La fonction **affiche** au lieu de **renvoyer**. Elle rend donc `None`, et `m * 2` lève une `TypeError`. C'est le piège `return` contre `print`. Il faut remplacer `print(...)` par `return (a + b + c) / 3`.

        **3.**
        ```python
        def initiales(prenom: str, nom: str) -> str:
            """Renvoie les initiales de prenom et nom, chacune suivie d'un point.
            Précondition : prenom et nom ne sont pas vides."""
            assert len(prenom) > 0, "le prénom ne doit pas être vide"
            assert len(nom) > 0, "le nom ne doit pas être vide"
            return prenom[0] + "." + nom[0] + "."

        def test_initiales():
            assert initiales("Ada", "Lovelace") == "A.L."
            assert initiales("A", "B") == "A.B."
        ```
        Toute solution correcte convient. Ce qui est vérifié ici, c'est que la signature soit **typée**, que la docstring dise ce que fait la fonction, et que les `assert` portent sur des cas **différents**, dont un cas limite.

!!! abstract "Comment lire ton résultat"
    Les trois questions ne mesurent pas la même chose, et **rater la troisième en réussissant la première n'est pas un signe de faiblesse**. Lire du code, le compléter et l'écrire de zéro sont trois compétences distinctes, qui se travaillent séparément.

    - Tu réussis les trois : passe à la suite.
    - Tu réussis 1 et 2 mais pas 3 : tu comprends le mécanisme, il te manque la **mise en route**. Refais des exercices d'écriture courts, pas de la relecture.
    - Tu rates la 1 : reprends le traçage avant tout le reste. Écrire du code qu'on ne sait pas lire ne mène nulle part.
