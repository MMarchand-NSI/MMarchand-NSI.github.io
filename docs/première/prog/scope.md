# Portée des variables (scope)

## 1. Qu’est-ce que la portée (*scope*) ?

La **portée** d’une variable détermine les parties du code où cette variable est accessible. En Python, on distingue principalement:

1. **Portée locale** : Les variables déclarées à l’intérieur d’une fonction, accessibles uniquement dans cette fonction.  
2. **Portée globale** : Les variables déclarées en dehors de toute fonction (au niveau du module, par exemple). Elles sont accessibles partout dans le module.

---

## 2. Variables locales

Une variable locale est **créée et utilisée** à l’intérieur d’une fonction. Elle n’existe qu’**au moment de l’exécution** de la fonction et n’est pas accessible en dehors.

```python
def ma_fonction():
    x = 10  # Variable locale "x"
    print("Dans la fonction, x =", x)

ma_fonction()

print(x)  # Erreur, car x n'existe pas en dehors de la fonction
```

Dans cet exemple :  
- `x` est créée à l’appel de `ma_fonction()`.  
- Après la fin de `ma_fonction()`, `x` est détruite et n’est plus accessible.

---

## 3. Variables globales

Une variable globale est définie **au niveau du script**, en dehors de toute fonction. Elle est donc potentiellement accessible **dans tout le script**, y compris dans les fonctions (sous certaines conditions, comme on va le voir).

```python
a = 5  # Variable globale

def afficher_a():
    print("Dans la fonction, a =", a)

afficher_a()
print("En dehors de la fonction, a =", a)
```

- Ici, `a` est **globale** et peut être lue depuis `afficher_a()`.  
- Il n’y a pas de conflit particulier parce qu’on se contente de **lire** la valeur.

### 3.1. Modifier une variable globale dans une fonction

Si l’on veut **assigner** (modifier) la variable globale depuis l’intérieur d’une fonction, il faut déclarer cette variable comme `global` dans la fonction. Sinon, Python créera par défaut **une variable locale** du même nom.

```python
x = 10  # Variable globale

def incrementer_x():
    global x
    x = x + 1  # Modification de la variable globale

print("Avant :", x)
incrementer_x()
print("Après :", x)
```

- Sans le mot-clé `global`, l’affectation `x = x + 1` à l’intérieur de la fonction créerait une **nouvelle variable locale `x`**, et la variable globale `x` ne serait pas modifiée, comme le montre ce code.


```python
x = 10  # Variable globale

def incrementer_x():
    x = x + 1  
    # La variable globale est lue, python lui additionne 1 et créé une variable LOCALE du meême nom. La valeur de la varaible GLOBALE n'est pas modifiée.

print("Avant :", x)
incrementer_x()
print("Après :", x)
```

---

## 4. Bonnes pratiques

En réalité, vous découvrirez des manières de programmer qui nous permettent de ne pas avoir recours à des variables globales. Si elles paraissent pratiques de prime abord, elles complexifient le code à mesure qu'il prend en taille.

---

## 5. Petits exemples

### Exemple 1 : Lecture d’une variable globale sans la modifier

```python
titre = "Introduction à Python"

def afficher_titre():
    print("Titre :", titre)

afficher_titre()  # Utilise la variable globale titre
```

### Exemple 2 : Conflit de nommage global/local

```python
compteur = 0

def incrementer_compteur():
    compteur = 5  # Cette affectation crée une variable locale "compteur"
    print("Dans la fonction, compteur =", compteur)

incrementer_compteur()
print("Global, compteur =", compteur)  # Valeur inchangée (0)
```

Ici, la variable globale `compteur` **n’est pas modifiée** par la fonction, car Python a créé une variable locale du même nom.

---

## 6. Exercices pratiques

### Exercice 1

```python
# 1. Déclare une variable globale "stock" (par exemple stock = 10).
# 2. Écris une fonction "acheter_un_produit()" qui réduit la variable "stock" de 1
#    et affiche "Achat effectué, stock = <valeur>".
# 3. Appelle la fonction plusieurs fois et vérifie la valeur de "stock".

# Complète le code ci-dessous :
stock = ...

def acheter_un_produit():
    # Déclare si besoin la variable globale
    # Diminue stock de 1 et affiche la valeur
    ...

acheter_un_produit()
acheter_un_produit()
print(stock)  # Quelle est la valeur ?
```

---

### Exercice 2

```python
# Écris un programme avec :
# - Une variable globale "message" = "Bonjour tout le monde !"
# - Une fonction "afficher_local()" qui définit une variable locale "message" = "Salut !"
#   et l'affiche, puis affiche la variable globale "message".
#
# Exécute la fonction et analyse la sortie. Quelles valeurs sont affichées ?
# Essaie ensuite d'utiliser la variable locale en dehors de la fonction : que se passe-t-il ?

message = ...

def afficher_local():
    message = ...
    print("message local =", message)
    # Comment accéder à la variable globale "message" ? Pistes :
    # 1) Ne pas faire 'message = ...' (car ça cache la globale)
    # 2) Ou utiliser un autre nom
    # 3) Ou le mot-clé 'global' si tu veux vraiment la modifier

    print("message global =", ...)

afficher_local()
# print(message local) # Qu'arrive-t-il si on essaie d'afficher la variable locale ?
```

---

## 7. Synthèse

- Les variables **locales** existent uniquement dans le bloc (souvent une fonction) où elles sont définies.  
- Les variables **globales** sont accessibles dans tout le module, mais sont **seulement modifiables** dans une fonction si on utilise le mot-clé `global`.

---

## Pour aller plus loin

Le mécanisme de portée des variables est simple en python, mais il préfigure des mécanismes plus complexes, 
comme dans l'exemple suivant en rust, où on se rend compte que même à l'intérieur d'une fonction,
il faut tenir compte de la portée des variables.

```rust
fn main() {
    let x = 10;
    println!("Au début, x = {}", x);

    for i in 0..3 {
        // À chaque itération de la boucle, on définit une nouvelle variable "x" propre au scope de la boucle.
        let x = x + i;
        println!("Itération {}, x = {}", i, x);
    }

    // Après la boucle, la variable "x" est toujours celle définie hors de la boucle
    println!("Après la boucle, x = {}", x);
}

```

L'affichage du code précédent est: 

```text
Au début, x = 10
Itération 0, x = 10
Itération 1, x = 11
Itération 2, x = 12
Après la boucle, x = 10
```

En Rust, pour simuler le comportement de python avec les variables locales et globales,
on est obligé de déclarer explicitement qu'on veut écrire du code non sécurisé.

```rust
static mut COMPTEUR: i32 = 0;

fn incrementer() {
    unsafe {
        COMPTEUR += 1;
        println!("Compteur global : {}", COMPTEUR);
    }
}

fn main() {
    incrementer(); // 1
    incrementer(); // 2

    // En dehors de la zone unsafe, on ne peut pas accéder directement à GLOBAL_COUNTER
}
```

!!! tip "Fun Fact"
    Diverses agences (notamment la NSA, en novembre 2022) ont publié des recommandations visant à favoriser l’usage de langages “memory-safe”, 
    (comme Rust) lorsqu’un nouveau projet s’y prête. En d’autres termes, des organes gouvernementaux américains encouragent plus fortement
    l’usage de langages offrant une meilleure sûreté mémoire, car de nombreuses failles proviennent de bugs de gestion de mémoire
    (buffer overflows, use-after-free, etc.) dans des logiciels écrits en C ou C++.

    Microsoft a régulièrement communiqué qu’environ 70 % des failles critiques de sécurité recensées dans ses produits résultaient de problèmes 
    de gestion de mémoire. Google a indiqué des chiffres similaires pour certaines de ses applications critiques (Chrome, par exemple), soulignant 
    que 70 % des vulnérabilités sérieuses venaient également de cette catégorie.

    Si vous voulez continuer en informatique, il sera important de comprendre C, car il est proche du processeur.
    Cependant, il sera important de ne pas l'utiliser et de privilégier des langages memory safe comme Rust (tout aussi performant).
    Quelle que soit la performance d'un développeur en langage C, il peut toujours faire une étourderie. 
    
    Il faut bien comprendre qu'une mauvaise gestion de mémoire, même ponctuelle, ne provoque pas d'erreur dans le code, 
    mais elle provoque des failles critiques qui permettent à une personne malveillante de prendre le contrôle du système entier.
    
    Loi de Murphy: "La probabilité que quelque chose arrive est inversement proportionnelle à sa désirabilité".