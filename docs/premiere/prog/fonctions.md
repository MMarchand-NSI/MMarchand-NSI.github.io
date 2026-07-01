# Les fonctions

## Pourquoi des fonctions ?

En programmation, on a souvent besoin de réutiliser du code, à quelque chose près.

Imaginez qu'on doive dessiner un carré et que cela prenne 10 lignes de code. Pour dessiner 50 carrés, faut-il écrire 500 lignes ? Non. On range le code qui dessine un carré dans une **fonction**, et il suffit ensuite d'une ligne pour l'appeler.

Vous utilisez déjà des fonctions écrites par d'autres. `print` appelle elle-même tout un tas de fonctions, jusque dans les tréfonds de l'ordinateur, pour allumer les bons pixels à l'écran.

!!! abstract "Définition : fonction"
    Une fonction est un **bloc de code nommé et réutilisable qui réalise une tâche précise**.

    Une fonction a :

    - un **nom** ;
    - des **paramètres** ;
    - du **code** à exécuter ;
    - et elle peut éventuellement **renvoyer une donnée**.

## 1. Avant tout : la signature

!!! success "La méthode, dans l'ordre"
    Avant d'écrire la moindre ligne de code, on **définit le contrat** de la fonction :

    1. sa **signature** ;
    2. sa **docstring** (ce qu'elle fait) ;
    3. puis seulement son **code** ;
    4. et son **`return`** si elle renvoie quelque chose.

Commençons par **lire** une fonction qui existe déjà, `randint`, avant d'en écrire une nous-mêmes.

```python
from random import randint

valeur_de_retour = randint(3, 50)
print(valeur_de_retour)
help(randint)
```

La **tâche** de `randint` est de renvoyer un entier pseudo-aléatoire dans un intervalle $[a..b]$.

- elle a un **nom** : `randint` (random integer) ;
- elle a **2 paramètres** : la borne basse, puis la borne haute ;
- elle **exécute du code** (rien ne tombe du ciel) ;
- elle **renvoie une donnée** : le nombre tiré.

Voici comment sa première ligne est écrite :

```python
def randint(a: int, b: int) -> int:
    """Renvoie un entier dans l'intervalle [a, b]"""
    ...  # le code
```

!!! abstract "Définition : la signature"
    La **première ligne** d'une fonction est sa **signature**. Elle comprend :

    1. le **nom** de la fonction ;
    2. la **liste des paramètres**, entre parenthèses, chacun avec son **nom et son type** (`nom: type`) ;
    3. le **type de la valeur renvoyée**, après une flèche `->` (facultatif mais recommandé).

    La ligne juste en dessous est la **docstring** : une phrase qui décrit ce que fait la fonction. Le code vient ensuite, **indenté**.

!!! tip "Savoir-faire : écrire une signature"
    ```python
    def randint(a: int, b: int) -> int:
    ```

    1. le mot-clé **`def`** annonce la signature ;
    2. un **nom évocateur** de la tâche (`randint`) ;
    3. les **paramètres entre parenthèses**, séparés par des virgules, chacun sous la forme `nom: type` ;
    4. une **flèche `->`** suivie du type de la donnée renvoyée ;
    5. **on n'oublie pas les deux-points** à la fin.

    Cette ligne dit : la fonction s'appelle `randint`, prend deux entiers `a` et `b`, et renvoie un entier.

!!! example "Prendre du recul : la même idée dans d'autres langages"
    Signature d'une fonction `addition` de deux entiers, selon le langage :

    ```rust
    fn addition(a: i32, b: i32) -> i32          // Rust
    ```
    ```java
    public static int addition(int a, int b)    // Java, C#
    ```
    ```c
    int addition(int a, int b)                  // C, C++
    ```
    ```typescript
    function addition(a: number, b: number): number   // TypeScript
    ```
    ```ruby
    def addition(a, b)                          # Ruby (types non déclarés)
    ```

    Partout, on retrouve un nom, des paramètres et (souvent) un type de retour.

!!! question "Exercice papier : écrire des signatures et des docstrings"
    Pour chaque fonction, trouvez un nom et des noms de paramètres adéquats, et renseignez bien les **types** des paramètres et du retour. **N'écrivez pas encore le code**, seulement la signature et la docstring.

    1. Calcule le cube d'un nombre entier.
    2. Vérifie si un nombre entier est pair.
    3. Concatène deux chaînes de caractères.
    4. Calcule la somme des éléments d'une liste d'entiers.
    5. Vérifie si un élément est présent dans une liste d'entiers.
    6. Convertit une température de degrés Celsius en degrés Fahrenheit.
    7. Trouve le plus grand élément d'une liste d'entiers.
    8. Calcule la moyenne des notes d'une liste de notes.
    9. Vérifie si un texte est un palindrome.

    !!! hint "Aide sur les types"
        Une liste de quelque chose est de type `list`. Une liste d'entiers se note `list[int]`, une liste de chaînes `list[str]`, une liste de listes d'entiers `list[list[int]]`. Pas besoin de savoir comment cela marche pour écrire la signature.

## 2. Le corps de la fonction et `return`

Pour coder une fonction, on part de sa signature et du nom de ses paramètres. On considère que **la fonction ne connaît que ses paramètres**, pas les variables extérieures.

On écrit du code normalement, et on utilise le mot-clé **`return`** pour renvoyer le résultat calculé.

```python
def carre(x: float) -> float:
    """Calcule le carré du flottant passé en paramètre"""
    resultat = x * x
    return resultat
```

Quand on exécute cette cellule, **il ne se passe rien** à l'écran : on a seulement *appris* à Python à calculer un carré. Pour qu'il le fasse, il faut **appeler** la fonction :

```python
var = carre(7)
print(var)     # affiche 49
```

### Ce qui se passe vraiment lors d'un appel

!!! abstract "Dérouler `b = carre(5.3)` pas à pas"
    1. Python rencontre l'appel `carre(5.3)`. Il met la suite de côté et entre dans la fonction.
    2. L'argument `5.3` est **rangé dans le paramètre** `x` : à l'intérieur, `x` vaut `5.3`.
    3. Le corps s'exécute : `resultat = x * x`, donc `resultat` vaut `28.09`.
    4. `return resultat` : la fonction **renvoie** `28.09` et s'arrête aussitôt.
    5. La valeur renvoyée **remplace l'appel** : la ligne devient `b = 28.09`.
    6. `b` vaut donc `28.09`.

    À retenir : **un appel de fonction se comporte comme la valeur qu'il renvoie.** `carre(5.3)` finit par « valoir » `28.09`, et peut donc s'utiliser partout où une valeur est attendue.

!!! tip "`return` en bref"
    - Dès que Python rencontre un `return`, il **quitte** la fonction.
    - **Sans `return`, une fonction ne renvoie rien** d'utilisable.
    - Il peut y avoir plusieurs `return`, mais quand on peut l'éviter, c'est plus clair.

!!! danger "Piège classique : `return` n'est pas `print`"
    Ces deux fonctions se ressemblent, mais ne font pas la même chose :

    ```python
    def carre_ok(x: float) -> float:
        return x * x

    def carre_faux(x: float) -> float:   # ERREUR fréquente à ne pas reproduire
        print(x * x)
    ```

    - `carre_ok(5)` **renvoie** `25` : on peut réutiliser cette valeur, `b = carre_ok(5)` met `25` dans `b`.
    - `carre_faux(5)` **affiche** `25` mais **ne renvoie rien** : `b = carre_faux(5)` met `None` dans `b`.

    `print` sert à *montrer* quelque chose à l'utilisateur. `return` sert à *rendre* une valeur au reste du programme. D'ailleurs, `print` elle-même renvoie `None` :

    ```python
    x = print("bonjour")   # affiche : bonjour
    print(x)               # affiche : None
    ```

Le résultat d'un appel est une valeur comme une autre : on peut l'utiliser dans des calculs.

!!! question "Prédire avant d'exécuter"
    Sans lancer le code, prédisez ce qui s'affiche, puis vérifiez :

    ```python
    a = 5.3
    b = carre(a)
    print(b)
    print(carre(a + b))
    print(carre((6 * b - carre(a)) / (5 + carre(b))))
    ```

    (Attention aux parenthèses : un appel de fonction est une valeur, on peut donc l'imbriquer.)

!!! question "Périmètre"
    1. Écrivez une fonction qui calcule le périmètre d'un rectangle.
    2. Calculez le périmètre d'un rectangle de dimensions $14 \times 50$.

    ??? warning "Corrigé"
        ```python
        def perimetre(largeur: float, hauteur: float) -> float:
            """Renvoie le périmètre d'un rectangle de dimensions largeur x hauteur"""
            return 2 * (largeur + hauteur)

        print(perimetre(14, 50))   # 128
        ```

!!! question "XOR"
    Le « ou exclusif » (xor) est vrai quand ses deux entrées sont **différentes** :

    | `c1` | `c2` | `c1 xor c2` |
    | :--: | :--: | :---------: |
    | Vrai | Vrai | Faux |
    | Vrai | Faux | Vrai |
    | Faux | Vrai | Vrai |
    | Faux | Faux | Faux |

    Écrivez une fonction `xor` qui prend deux booléens et renvoie `True` ou `False` selon les cas. Testez-la dans les quatre cas.

    ??? warning "Corrigé"
        ```python
        def xor(c1: bool, c2: bool) -> bool:
            """Renvoie le ou exclusif des deux booléens c1 et c2"""
            return c1 != c2
        ```

## 3. Fonctions sans valeur de retour

Une fonction peut ne renvoyer aucune valeur : son rôle est alors d'effectuer un travail (afficher, dessiner...) sans rendre d'information. C'est le cas de `print`.

```python
def dis_coucou(n: int):
    """Affiche coucou n fois"""
    for _ in range(n):
        print("Coucou!")

dis_coucou(3)
a = dis_coucou(2)
print(a)      # affiche None
```

Quand une fonction ne renvoie rien, on peut **omettre le `return`**. Et une fonction qui ne renvoie « rien » renvoie tout de même quelque chose : **`None`**, qui signifie « aucune valeur ».

## 4. Fonctions sans paramètre

Une fonction peut n'avoir aucun paramètre (comme `input()`). Il faut alors tout de même écrire les **parenthèses vides** en signature, pour indiquer qu'il s'agit d'une fonction et non d'une variable.

```python
def demander_prenom() -> str:
    """Demande son prénom à l'utilisateur et le renvoie"""
    return input("Ton prénom ? ")
```

## 5. Fonctions à plusieurs paramètres

Une fonction peut avoir autant de paramètres qu'on veut. À l'appel, il faut respecter leur **nombre** et leur **ordre**.

!!! question "Rectangle de caractères"
    L'appel `affiche_rectangle(2, 5, 'A')` doit afficher :
    ```
    AAAAA
    AAAAA
    ```
    Écrivez et testez `affiche_rectangle`. Rappels : `print()` passe à la ligne ; `print('A', end='')` affiche sans passer à la ligne.

    ??? warning "Corrigé"
        ```python
        def affiche_rectangle(hauteur: int, largeur: int, car: str):
            """Affiche un rectangle de hauteur x largeur fait du caractère car"""
            for _ in range(hauteur):
                for _ in range(largeur):
                    print(car, end='')
                print()
        ```

!!! question "Automatismes"
    Écrivez la signature, la docstring **puis** le code de :

    1. `nb_secondes(heures, minutes, secondes)` : renvoie le nombre total de secondes.
    2. `conversion_euro_dollar(euros)` : convertit des euros en dollars (taux $1€ = 1{,}17\$$). Convertissez 12 €.
    3. `pair_ou_impair(n)` : renvoie `"pair"` ou `"impair"`.
    4. `plus_petit(a, b)` : renvoie le plus petit des deux entiers.

    ??? warning "Corrigé"
        ```python
        def nb_secondes(heures: int, minutes: int, secondes: int) -> int:
            """Renvoie le nombre total de secondes"""
            return heures * 3600 + minutes * 60 + secondes

        def conversion_euro_dollar(euros: float) -> float:
            """Convertit un montant en euros vers des dollars"""
            return euros * 1.17

        def pair_ou_impair(n: int) -> str:
            """Renvoie 'pair' ou 'impair' selon la parité de n"""
            if n % 2 == 0:
                return "pair"
            return "impair"

        def plus_petit(a: int, b: int) -> int:
            """Renvoie le plus petit des deux entiers"""
            if a < b:
                return a
            return b
        ```

!!! question "IMC"
    1. Écrivez `imc(poids, taille)` qui renvoie l'indice de masse corporelle (formule sur [Wikipédia](https://fr.wikipedia.org/wiki/Indice_de_masse_corporelle)).
    2. Écrivez un programme qui demande poids et taille, puis affiche l'IMC et un message d'interprétation.
    3. Affichez une réserve claire : cette information ne doit pas servir à un autodiagnostic, il faut préférer l'avis d'un médecin.

## 6. Une fonction peut en appeler une autre

La définition d'une fonction peut utiliser une autre fonction, déjà existante ou écrite par vous. C'est ainsi qu'on construit, à partir de briques simples, des fonctions plus puissantes.

```python
def carre(x: float) -> float:
    """Renvoie le carré de x"""
    return x * x

def somme_carres(a: float, b: float) -> float:
    """Renvoie la somme des carrés de a et b"""
    return carre(a) + carre(b)

print(somme_carres(3, 4))   # 25
```

!!! question "Exercice hors ligne : une forêt de sapins (turtle)"
    Le module `turtle` ouvre une fenêtre de dessin : cet exercice est à réaliser dans un éditeur Python (Thonny, IDLE...), pas dans le navigateur.

    La fonction `triangle` ci-dessous dessine un triangle isocèle de base horizontale, de sommet $(x, y)$.

    ```python
    import turtle

    def triangle(tortue: turtle.Turtle, x: int, y: int, cote: int, couleur: str):
        """Dessine un triangle isocèle de base horizontale, de sommet (x, y)"""
        tortue.penup()
        tortue.goto(x, y)
        tortue.pendown()
        tortue.begin_fill()
        tortue.color('black', couleur)
        tortue.left(210)
        tortue.forward(cote)
        tortue.left(150)
        tortue.forward(cote * 1.732)
        tortue.left(150)
        tortue.forward(cote)
        tortue.left(210)
        tortue.end_fill()
    ```

    1. En **utilisant** `triangle`, écrivez une fonction `sapin(tortue, x, y)` qui empile quelques triangles pour dessiner un sapin.
    2. Écrivez une fonction `foret(tortue, n)` qui dessine `n` sapins à des positions choisies aléatoirement.

---

Vous savez maintenant **écrire** une fonction. Reste à s'assurer qu'elle est **correcte** : c'est l'objet de la page [Spécification et tests](specification-tests.md), qui reprend la docstring et introduit les tests automatiques.
