# Portée des variables (scope)

La **portée** (*scope*) d'une variable détermine les parties du code où cette variable est accessible. Comprendre la portée permet d'éviter des bugs subtils et d'écrire du code plus clair.

## 1. Variables locales

Une variable **locale** est créée à l'intérieur d'une fonction. Elle n'existe que **pendant l'exécution** de cette fonction et n'est accessible que dans son corps.

### Exemple de base

```python
def ma_fonction():
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
def calculer(a, b):
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
    def fonction_a():
        x = 10
        print("Fonction A, x =", x)

    def fonction_b():
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

def afficher_a():
    print("Dans la fonction, a =", a)  # On peut lire a

afficher_a()                            # 5
print("En dehors, a =", a)              # 5
```

Ici, pas de problème : on **lit** simplement la valeur de `a`.

### Le piège : essayer de modifier sans `global`

```python
x = 10  # Variable globale

def incrementer_x():
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

def incrementer_x():
    global x      # Déclare qu'on veut utiliser la variable globale
    x = x + 1     # Maintenant ça marche

print("Avant :", x)   # 10
incrementer_x()
print("Après :", x)   # 11
```

### Conflit de nommage : créer une variable locale masque la globale

```python
compteur = 0  # Variable globale

def incrementer_compteur():
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

    **Préférez :**

    - Passer les valeurs en **paramètres**
    - Retourner les résultats avec **return**

    ```python
    # ❌ Mauvais : variable globale modifiable
    stock = 10

    def acheter():
        global stock
        stock -= 1

    # ✅ Bon : paramètres et return
    def acheter(stock):
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

    def calculer_prix_ttc(prix_ht):
        return prix_ht * (1 + TVA)  # Lecture de TVA : OK
    ```

    Par convention, on les écrit en MAJUSCULES.

!!! note "Exception : Programmation événementielle"
    En **programmation événementielle** (interfaces graphiques, jeux vidéo), il est **difficile d'éviter** les variables globales modifiables. Les fonctions de callback (réactions aux événements) doivent accéder à l'état de l'application.

    **Exemple avec tkinter (interface graphique) :**

    ```python
    import tkinter as tk

    compteur = 0  # Variable globale nécessaire

    def clic():
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

    - La fonction `clic()` est appelée par le framework (pas par vous)
    - On ne peut pas passer de paramètres à `clic()` directement
    - Les variables globales modélisent **l'état de l'application**

    Dans ce contexte, c'est un **compromis nécessaire** pour les débutants. Les programmeurs avancés utilisent des classes (programmation orientée objet) pour mieux gérer l'état, mais en première, les variables globales sont acceptables pour la programmation événementielle.

## 4. Exercices

!!! question "Exercice 1 : Prédire le résultat"
    Sans exécuter le code, prédisez ce qui sera affiché :

    ```python
    y = 100

    def tester():
        y = 50
        print("Dans tester, y =", y)

    tester()
    print("En dehors, y =", y)
    ```

    Puis exécutez pour vérifier.

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

    def ajouter(valeur):
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

    def ajouter(valeur):
        global total
        total = total + valeur

    ajouter(5)
    print(total)  # 5
    ```

    **Correction 2 (meilleure : sans global) :**

    ```python
    def ajouter(total, valeur):
        return total + valeur

    total = 0
    total = ajouter(total, 5)
    print(total)  # 5
    ```

!!! question "Exercice 3 : Gestion de stock"
    Créez un fichier `stock.py` avec :

    - Une fonction `acheter(stock)` qui diminue le stock de 1 et le retourne
    - Une fonction `livraison(stock, quantite)` qui augmente le stock et le retourne

    Testez avec un stock initial de 10, 2 achats, puis une livraison de 5.

??? success "Solution"
    ```python
    def acheter(stock):
        """Diminue le stock de 1."""
        return stock - 1

    def livraison(stock, quantite):
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

!!! question "Exercice 4 : Portée dans les boucles (piège)"
    Que va afficher ce code ?

    ```python
    def mystere():
        for i in range(3):
            x = i * 2
        print("x =", x)
        print("i =", i)

    mystere()
    ```

    Puis exécutez pour vérifier. Que se passe-t-il avec `x` et `i` ?

??? success "Solution"
    ```
    x = 4
    i = 2
    ```

    **Attention :** En Python, les variables créées dans une boucle `for` **ne sont pas locales à la boucle**, elles sont locales à la **fonction**. Donc `x` et `i` existent encore après la boucle.

    C'est différent de langages comme C, Java ou Rust où les variables de boucle sont détruites après la boucle.

!!! question "Exercice 5 : Accumulateur"
    Sans utiliser de variable globale, écrivez une fonction `somme_liste(liste)` qui calcule la somme des éléments d'une liste.

    Testez avec `[1, 2, 3, 4, 5]`.

??? success "Solution"
    ```python
    def somme_liste(liste):
        """Calcule la somme des éléments d'une liste."""
        total = 0  # Variable locale
        for nombre in liste:
            total += nombre
        return total

    # Test
    valeurs = [1, 2, 3, 4, 5]
    resultat = somme_liste(valeurs)
    print("Somme :", resultat)  # 15
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
3. Préférez **paramètres + return** aux variables globales modifiables
4. Les variables de boucle `for` en Python **ne sont pas détruites** après la boucle

---

!!! note "Pour aller plus loin : Autres langages"
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
