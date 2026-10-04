# Listes et récursivité

!!! danger "Ce ne sont pas les listes Python"
    Ici, on ne parle **pas** des listes Python (qui sont en réalité des *tableaux dynamiques*). On étudie la **vraie** structure de liste, définie récursivement.

La **récursivité** est la **généralisation totale** du principe de **récurrence** que tu connais en mathématiques. Les listes sont l'outil idéal pour **faire ses premiers pas en récursivité**.

## 1 Les listes récursives

### 1.1 La structure : deux possibilités

Imaginez un **lutin** à qui on tend une liste. Il n'a que **deux possibilités** devant lui :

- soit la liste est **vide** ;
- soit c'est un élément, la **tête**, suivi d'une autre liste, la **queue**.

!!! abstract "Définition récursive d'une liste"
    Une liste est :

    1. soit **vide** ;
    2. soit une **tête** (un élément) suivie d'une **queue** (qui est elle-même une liste).

On **définit la liste avec sa propre définition** : c'est une structure **récursive**. On l'écrit ainsi :

```gleam
pub type Liste(a) {
  Vide
  Cons(a, Liste(a))
}
```

- `a` désigne **un type quelconque** (comme le `T` de Python) : une liste d'entiers, de chaînes, peu importe.
- Il y a **deux constructeurs**, `Vide` et `Cons` : une liste **est** l'un **ou** l'autre. Ce sont les deux possibilités du lutin.
- La définition est **récursive** : `Cons` contient une `Liste(a)` (la queue).

### 1.2 Écrire une liste à la main

!!! info "Cette notation est un vrai langage : Gleam"
    La notation que tu utilises depuis le début pour ranger les cas n'est pas qu'une façon d'écrire au tableau : c'est un vrai langage de programmation, **Gleam**, un petit langage **fonctionnel**. Tu vas maintenant l'exécuter.

    - Gleam n'a **aucune boucle** : ni `for`, ni `while`. La seule façon de parcourir une structure, c'est la **récursivité**. C'est exactement ce qu'on a appris au tableau pour commencer ce cours.
    - Gleam n'a pas non plus de `if` : toute décision passe par une **disjonction de cas**, avec `case`.
    - Sa signature de fonction ressemble à ton Python typé :

        | Python | Gleam |
        |---|---|
        | `def taille(lst) -> int:` | `fn taille(lst: Liste(a)) -> Int {` |

    - Le compilateur est un allié : messages d'erreur clairs, et il t'**empêche d'oublier un cas**.

!!! note "Mise en place"
    Dans un terminal, exécute la commande `nsi install gleam`, puis écris tes fichiers dans le répertoire `src`. Pour exécuter ton code : `gleam run`. Pour afficher une valeur et l'observer, utilise `io.debug(...)` (après un `import gleam/io` en haut du fichier).

La liste dont la tête est `2`, suivie de `3`, puis `4`, puis la fin :

```gleam
import gleam/io

pub fn main() {
  let exemple = Cons(2, Cons(3, Cons(4, Vide)))
  io.debug(exemple)
}
```

`gleam run` affiche `Cons(2, Cons(3, Cons(4, Vide)))`.

!!! question "Construire"
    Écris, dans `main`, la liste des trois chaînes `"rouge"`, `"vert"`, `"bleu"`, puis affiche-la.

    ??? success "Corrigé"
        ```gleam
        let couleurs = Cons("rouge", Cons("vert", Cons("bleu", Vide)))
        io.debug(couleurs)
        ```

### 1.3 La disjonction de cas

Pour **faire quelque chose** d'une liste, le lutin regarde **laquelle des deux possibilités** il a en main. C'est la **disjonction de cas**, écrite avec `case` :

```gleam
case lst {
  Vide -> ...
  Cons(tete, queue) -> ...
}
```

- **un cas par constructeur** : le cas `Vide`, et le cas `Cons` ;
- `Cons(tete, queue)` **déconstruit** la liste : ça donne un nom à la tête (`tete`) et à la queue (`queue`).

!!! warning "Piège, et garde-fou : les deux cas, toujours"
    Gleam **refuse de compiler** si tu oublies un cas. Impossible d'oublier le `Vide`. Le compilateur te **force** à penser « cas de base / cas récursif », les deux fondations de toute récursivité.

### 1.4 Les trois grands types de problèmes

Presque toutes les fonctions sur les listes relèvent de l'un de ces trois types :

- **lire** une liste : de la liste à une **valeur** (`taille`, `somme`, `contient`) ;
- **construire** une liste : de la liste à une **nouvelle liste** (`inverser`, `concat`) ;
- **faire pousser** une liste : d'une **graine** à une liste (`repete`).

#### 1.4.1 Lire une liste : de la liste à une valeur

Les premières fonctions **lisent** une liste : elles la parcourent et rendent une valeur qui n'est **pas** une liste (un nombre, un booléen).

##### 1.4.1.1 Première fonction : la taille

On la lit ensemble **avant** d'en écrire soi-même.

```gleam
pub fn taille(lst: Liste(a)) -> Int {
  case lst {
    Vide -> 0
    Cons(_, queue) -> 1 + taille(queue)
  }
}
```

Le raisonnement du lutin : *« Je ne sais pas compter toute la liste d'un coup. Mais je sais deux choses : une liste vide a pour taille 0 ; sinon, c'est 1 (pour ma tête) plus ce que comptera un autre lutin sur la queue. »*

- `_` remplace `tete` : ici on **ignore** la valeur de la tête (on n'en a pas besoin pour compter).

**Traçons** `taille(Cons(2, Cons(3, Cons(4, Vide))))` :

```text
taille(Cons(2, ...)) = 1 + taille(Cons(3, ...))
                     = 1 + 1 + taille(Cons(4, Vide))
                     = 1 + 1 + 1 + taille(Vide)
                     = 1 + 1 + 1 + 0
                     = 3
```

!!! info "C'est la pile d'appels"
    Chaque ligne où un lutin **attend** le résultat d'un autre est un appel **empilé** : la pile grandit à la descente (jusqu'à `Vide`), puis se vide à la remontée, quand chaque `1 + ...` se calcule enfin. Cette cascade **est** la **pile d'appels**, le mécanisme caché de toute récursion (on la retrouvera partout : arbres, tri fusion).

!!! question "Prédire"
    Sans exécuter : que renvoie `taille(Cons(7, Cons(8, Vide)))` ?

    ??? success "Réponse"
        `2`. Deux têtes avant d'atteindre `Vide`.

##### 1.4.1.2 À toi d'écrire

!!! tip "Méthode"
    Avant de coder, écris la **disjonction de cas au papier** : que renvoie la fonction si la liste est `Vide` ? et si c'est `Cons(tete, queue)` ?

!!! question "La somme"
    Écris `somme(lst: Liste(Int)) -> Int` qui renvoie la somme des éléments d'une liste d'entiers.

    ??? success "Corrigé"
        ```gleam
        pub fn somme(lst: Liste(Int)) -> Int {
          case lst {
            Vide -> 0
            Cons(tete, queue) -> tete + somme(queue)
          }
        }
        ```

!!! info "OU, ET, NON en Gleam"
    Une fonction qui renvoie un `Bool` se construit souvent en **combinant** des conditions. Les trois opérateurs s'écrivent ainsi :

    | | Gleam | Python |
    |---|---|---|
    | OU | `a || b` | `a or b` |
    | ET | `a && b` | `a and b` |
    | NON | `!a` | `not a` |

    ```gleam
    n > 0 && n < 10      // n est entre 1 et 9
    n < 0 || n > 100     // n est hors de [0 ; 100]
    !{ n == 5 }          // n ne vaut pas 5 (on peut aussi écrire n != 5)
    ```

    Pour grouper une expression, Gleam utilise des **accolades** `{ }`, pas des parenthèses : on écrit `!{ n == 5 }`.

    Comme `or` et `and` en Python, `||` et `&&` sont **paresseux** : si la partie gauche suffit à décider (`True` pour `||`, `False` pour `&&`), la partie droite n'est **pas calculée**.

!!! question "Contient"
    On veut écrire `contient(x: a, lst: Liste(a)) -> Bool`, qui indique si `x` est présent dans la liste. La réponse sera une **expression booléenne**, qu'on construit en trois temps.

    1. Si la liste est `Vide`, que renvoie la fonction ?

        ??? success "Réponse"
            `False` : une liste vide ne contient rien.

    2. Si la liste est `Cons(tete, queue)`, complète la phrase : « `x` est dans la liste si … **ou** … ».

        ??? success "Réponse"
            « `x` est dans la liste si **la tête vaut `x`**, **ou** si **`x` est dans la queue**. »

    3. Traduis cette phrase en une expression booléenne Gleam. Quelle partie est un appel récursif ?

        ??? success "Réponse"
            `tete == x || contient(x, queue)`. La partie droite, `contient(x, queue)`, est l'appel récursif : on redemande à un autre lutin de chercher dans la queue.

    Écris maintenant `contient` en entier.

    ??? success "Corrigé"
        ```gleam
        pub fn contient(x: a, lst: Liste(a)) -> Bool {
          case lst {
            Vide -> False
            Cons(tete, queue) -> tete == x || contient(x, queue)
          }
        }
        ```

        Le `||` est **paresseux** : si `tete == x` est vrai, Gleam ne va pas chercher plus loin dans la queue.

##### 1.4.1.3 Deux listes à la fois : les quatre cas

On veut écrire `sont_egales(l1: Liste(a), l2: Liste(a)) -> Bool`, qui dit si deux listes contiennent les mêmes éléments dans le même ordre. Le lutin en tient maintenant **deux** en même temps. La méthode tient en trois questions, à se poser **dans l'ordre**, avant d'écrire la moindre ligne.

!!! question "Égalité de deux listes"
    1. Quels sont **tous** les cas possibles pour le couple d'entrée `(l1, l2)` ?

        ??? success "Réponse"
            Chaque liste peut être `Vide` ou `Cons`, ce qui fait **quatre** cas (2 × 2) :

            - `l1` vide et `l2` vide ;
            - `l1` vide et `l2` non vide ;
            - `l1` non vide et `l2` vide ;
            - `l1` non vide et `l2` non vide.

    2. Que doit renvoyer la fonction dans **chacun** de ces cas ?

        ??? success "Réponse"
            - deux listes vides : elles sont **égales**, on renvoie `True` ;
            - `l1` vide, `l2` non vide : elles n'ont pas la même longueur, on renvoie `False` ;
            - `l1` non vide, `l2` vide : même raison, `False` ;
            - deux listes non vides : elles sont égales si leurs **têtes** sont égales **et** si leurs **queues** sont égales.

    3. Parmi ces quatre cas, lesquels sont des **cas de base** (la réponse est immédiate) et lesquels sont **récursifs** (il faut redemander à un autre lutin) ?

        ??? success "Réponse"
            Les **trois** premiers sont des cas de base : la réponse se lit directement. Le **quatrième** est le seul cas récursif : pour savoir si les queues sont égales, on appelle `sont_egales` sur `q1` et `q2`.

    Écris maintenant `sont_egales` en Gleam, avec **une branche par cas**. Pour faire la disjonction sur **deux** listes à la fois, on les met toutes les deux après `case`, séparées par une virgule, et chaque branche donne un motif pour chacune. Complète :

    ```gleam
    pub fn sont_egales(l1: Liste(a), l2: Liste(a)) -> Bool {
      case l1, l2 {
        Vide, Vide -> ...
        ...
      }
    }
    ```

    ??? success "Corrigé"
        ```gleam
        pub fn sont_egales(l1: Liste(a), l2: Liste(a)) -> Bool {
          case l1, l2 {
            Vide, Vide -> True
            Vide, Cons(_, _) -> False
            Cons(_, _), Vide -> False
            Cons(t1, q1), Cons(t2, q2) -> t1 == t2 && sont_egales(q1, q2)
          }
        }
        ```

!!! note "Quatre cas, même si on pourrait en écrire moins"
    On pourrait fusionner les deux cas « une seule est vide » en un seul. Ce n'est qu'une **optimisation d'écriture**, et ce n'est pas le sujet : on écrit les **quatre** cas pour voir toute la disjonction. Là encore, Gleam **exige** que les quatre soient traités.

#### 1.4.2 Construire une liste : de la liste à une nouvelle liste

!!! danger "Les listes sont immuables"
    On ne **modifie jamais** une liste. Une opération qui semble « modifier » une liste en **construit une nouvelle**. Le lutin ne rature rien : il **reconstruit en retour**.

Exemple à lire, ajouter un élément **à la fin** :

```gleam
pub fn ajouter_fin(x: a, lst: Liste(a)) -> Liste(a) {
  case lst {
    Vide -> Cons(x, Vide)
    Cons(tete, queue) -> Cons(tete, ajouter_fin(x, queue))
  }
}
```

Le **lutin ajouteur** : *« Si on me tend une liste vide, je renvoie une liste qui ne contient que `x`. Sinon, je garde la même tête, et pour la queue je demande à un autre lutin d'y ajouter `x`, puis je recolle. »*

![alt text](image.png)

!!! question "Inverser"
    Écris `inverser(lst: Liste(a)) -> Liste(a)` qui renvoie la liste à l'envers.

    ??? tip "Indice"
        Cas `Vide` : la liste renversée est `Vide`. Cas `Cons(tete, queue)` : renverse d'abord la **queue**, puis ajoute `tete` **à la fin** avec `ajouter_fin`.

    ??? success "Corrigé"
        ```gleam
        pub fn inverser(lst: Liste(a)) -> Liste(a) {
          case lst {
            Vide -> Vide
            Cons(tete, queue) -> ajouter_fin(tete, inverser(queue))
          }
        }
        ```

!!! question "Concaténer"
    Écris `concat(l1: Liste(a), l2: Liste(a)) -> Liste(a)` qui met `l2` à la suite de `l1`. Il y a **deux** listes : fais la disjonction des **quatre** cas, comme pour `sont_egales`, et traite-les un par un.

    ??? success "Corrigé"
        ```gleam
        pub fn concat(l1: Liste(a), l2: Liste(a)) -> Liste(a) {
          case l1, l2 {
            Vide, Vide -> Vide
            Vide, Cons(_, _) -> l2
            Cons(_, _), Vide -> l1
            Cons(t1, q1), Cons(_, _) -> Cons(t1, concat(q1, l2))
          }
        }
        ```

        - deux listes vides : le résultat est **vide** ;
        - `l1` vide : le résultat est **`l2`** ;
        - `l2` vide : le résultat est **`l1`** ;
        - deux non vides : on garde la tête de `l1`, et pour la suite on demande à un autre lutin de concaténer la queue de `l1` avec `l2`, puis on recolle.

#### 1.4.3 Faire pousser une liste : d'une graine à une liste

Jusqu'ici, le lutin **déconstruisait** une liste. Il peut aussi en **construire une à partir d'une graine** (ici, un entier).

La récursivité ne porte plus sur une liste mais sur un **entier**. Un entier n'a pas de constructeurs `Vide` et `Cons`, mais on peut quand même faire une disjonction de cas avec `case`, en donnant des **valeurs** comme motifs :

```gleam
case n {
  0 -> ...
  _ -> ...
}
```

- `0 ->` : le cas où `n` vaut exactement `0`. C'est le **cas de base**.
- `_ ->` : `_` attrape **toutes les autres valeurs**. C'est le **cas récursif**, où l'on rappelle la fonction avec `n - 1`.
- Les cas sont essayés **dans l'ordre** : `_` doit venir en dernier, sinon il attraperait aussi `0` (Gleam t'avertit alors que le cas `0` est inatteignable).

!!! question "Répéter"
    Écris `repete(x: a, n: Int) -> Liste(a)` qui renvoie une liste contenant `n` fois l'élément `x` (on suppose `n` positif ou nul).

    1. Que renvoie `repete(x, 0)` ?

        ??? success "Réponse"
            `Vide` : zéro fois `x`, c'est la liste vide.

    2. Si `n` n'est pas nul, comment obtenir `repete(x, n)` à partir de `repete(x, n - 1)` ?

        ??? success "Réponse"
            On met `x` en tête de `repete(x, n - 1)` : `Cons(x, repete(x, n - 1))`.

    Complète :

    ```gleam
    pub fn repete(x: a, n: Int) -> Liste(a) {
      case n {
        0 -> ...
        _ -> ...
      }
    }
    ```

    ??? success "Corrigé"
        ```gleam
        pub fn repete(x: a, n: Int) -> Liste(a) {
          case n {
            0 -> Vide
            _ -> Cons(x, repete(x, n - 1))
          }
        }
        ```

        Le cas de base n'est plus `Vide` mais `n == 0` : la graine `n` **décroît** à chaque appel jusqu'à 0.

### 1.5 Ce que l'IA ne change pas

!!! tip
    Une IA écrit `taille`, `somme` ou `inverser` en une seconde, en Gleam comme en Python.

    Ce qui est en jeu n'est pas ce qu'elle sait faire, c'est ce que **tu** sais faire sans elle : **énoncer les deux cas** (que se passe-t-il si la liste est vide ? et sinon ?), et reconnaître un raisonnement récursif correct quand tu en lis un. C'est exactement ce que l'épreuve pratique évalue, et c'est ce qui te permet de refuser une réponse fausse au lieu de la recopier. Gleam t'y aide : les **types** et l'**exhaustivité des cas** attrapent une grande partie des erreurs avant même l'exécution.

## 2 L'équivalent en Python

Toute cette construction existe aussi en Python, le langage de l'épreuve. La même liste, définie récursivement, avec des **tuples immuables** :

```python
type Vide = tuple[()]
type Liste[T] = Vide | tuple[T, Liste[T]]
```

Le `|` (OU) réapparaît, cette fois **dans le type** : une `Liste` est `Vide` **ou** un couple (tête, queue). C'est le même `|` que dans `int | None`. En Gleam, ce OU était porté par les deux constructeurs `Vide` et `Cons`.

Pour ne pas manipuler les tuples à la main, on se donne un **constructeur** et des **accesseurs**, qui jouent le rôle de `Cons` et `Vide` :

```python
def creer_vide[T]() -> Liste[T]:               # comme Vide
    return ()

def construire[T](t: T, q: Liste[T]) -> Liste[T]:   # comme Cons(t, q)
    return (t, q)

def est_vide(lst: Liste) -> bool:
    return lst == ()

def tete[T](lst: Liste[T]) -> T:               # la tête
    assert not est_vide(lst), "Liste vide"
    return lst[0]

def queue[T](lst: Liste[T]) -> Liste[T]:       # la queue
    assert not est_vide(lst), "Liste vide"
    return lst[1]
```

On construit alors une liste **exactement** comme en Gleam, et on ne touche plus jamais aux tuples ensuite :

```python
exemple = construire(2, construire(3, construire(4, creer_vide())))
#   en Gleam :  Cons(2, Cons(3, Cons(4, Vide)))
```

On lit une liste avec des **`if`** et les accesseurs (`est_vide`, `tete`, `queue`), le style attendu **au programme** :

```python
def taille(lst: Liste) -> int:
    if est_vide(lst):
        return 0
    return 1 + taille(queue(lst))


def somme(lst: Liste[int]) -> int:
    if est_vide(lst):
        return 0
    return tete(lst) + somme(queue(lst))
```

!!! warning "Ce que les `if` cachent"
    Avec `if` / `else`, rien ne signale **combien** de cas il y a, ni qu'on les a **tous** couverts. La disjonction **exhaustive**, un cas par possibilité, que le `case` de Gleam rendait évidente, n'apparaît plus. En Gleam, le compilateur **vérifiait** cette exhaustivité ; avec des `if`, c'est à toi d'y veiller à chaque fois. (Python a aussi un `match`, voir la section 5.)

L'écart se voit encore mieux sur **deux** listes, où il y a **quatre** cas (chaque liste vide ou non). En `if`, ils **fondent** en conditions imbriquées, et on ne les distingue plus :

```python
def sont_egales(l1: Liste, l2: Liste) -> bool:
    if est_vide(l1) and est_vide(l2):
        return True
    if est_vide(l1) or est_vide(l2):
        return False
    return tete(l1) == tete(l2) and sont_egales(queue(l1), queue(l2))
```

La grande différence reste que **Gleam n'a pas de boucle** : la récursivité y était le seul chemin, alors qu'en Python on la **choisit**, parce que c'est la **structure** qui l'appelle. Toutes les autres fonctions (`contient`, `inverser`, `concat`, `repete`) se transposent de la même manière.

!!! note "Une troisième fois, plus tard"
    Après la programmation objet, on réimplémentera cette même structure une **troisième** fois : une liste chaînée en **objet impératif** (avec des `while`). Même structure, trois paradigmes (fonctionnel, impératif, objet), de quoi mesurer ce que la récursivité apporte ici.

## 3 Le coût

On appelle $T(n)$ le **nombre d'opérations élémentaires** (comparaisons, additions, appels) effectuées par une fonction sur une liste de taille $n$. Une fonction récursive s'appelle elle-même sur une liste plus courte : son coût $T(n)$ s'exprime donc à partir de $T(n-1)$. C'est une **suite récurrente**, et calculer le coût, c'est trouver sa **forme générale**.

### 3.1 Exemple : la taille

```gleam
pub fn taille(lst: Liste(a)) -> Int {
  case lst {
    Vide -> 0
    Cons(_, queue) -> 1 + taille(queue)
  }
}
```

- Cas `Vide` : un nombre fixe d'opérations, qu'on note $a$. Donc $T(0) = a$.
- Cas `Cons` : un nombre fixe d'opérations (le test, l'addition), qu'on note $b$, **plus** l'appel sur la queue, qui est de taille $n-1$. Donc $T(n) = T(n-1) + b$.

$T$ est une **suite arithmétique** de premier terme $a$ et de raison $b$ :

$$T(n) = a + b \times n$$

Le coût est proportionnel à $n$ : il est **linéaire**, en $O(n)$. Les valeurs exactes de $a$ et de $b$ ne comptent pas, seule la **forme** de la suite décide.

### 3.2 À toi : `ajouter_fin` et `inverser`

!!! question "Le coût de `inverser`"
    1. Écris la relation de récurrence du coût $A(n)$ de `ajouter_fin(x, lst)`, pour une liste `lst` de taille $n$. Quelle est sa forme générale ?

        ??? success "Réponse"
            $A(0) = a$ et $A(n) = A(n-1) + b$ : c'est la même récurrence que `taille`. $A(n) = a + b \times n$, coût **linéaire**.

    2. `inverser` appelle `inverser` sur la queue (taille $n-1$), **puis** `ajouter_fin` sur le résultat (taille $n-1$ aussi). Écris la relation de récurrence de son coût $T(n)$.

        ??? success "Réponse"
            $T(0) = c$ et $T(n) = T(n-1) + A(n-1) + d$, où $d$ compte les opérations fixes de l'appel. En remplaçant $A(n-1)$ : $T(n) = T(n-1) + b \times (n-1) + (a + d)$.

    3. Cette suite n'est ni arithmétique ni géométrique : ce qu'on ajoute à chaque étape **grandit** avec $n$. Trouve sa forme générale, en additionnant les écarts $T(k) - T(k-1)$ pour $k$ allant de $1$ à $n$.

        ??? success "Réponse"
            Les termes intermédiaires se simplifient :

            $$T(n) = T(0) + b \times \big(0 + 1 + \dots + (n-1)\big) + (a + d) \times n = c + b \times \frac{n(n-1)}{2} + (a + d) \times n$$

            Le terme en $n^2$ l'emporte : le coût est **quadratique**, en $O(n^2)$. C'est `ajouter_fin`, linéaire, appelée $n$ fois, qui coûte cher.

!!! question "Vérifie en dépliant"
    Déplie `inverser(2 -> 3 -> 4)` en écrivant chaque appel à `ajouter_fin`. Combien de fois chaque élément est-il reparcouru ? Tu dois **voir** le $O(n^2)$ apparaître, pas seulement le calculer.

    ??? success "Ce qu'on observe"
        `inverser` fait un appel par élément ($n$ appels), et **chaque** appel relance `ajouter_fin`, qui reparcourt toute la liste déjà renversée (de longueur $0$, puis $1$, puis $2$…). On retrouve la somme $0 + 1 + \dots + (n-1)$ du calcul.

## 4 Exercices

!!! tip "Comment t'entraîner"
    Écris chaque fonction **d'abord en Gleam** (avec `case`), puis **en Python** (avec des `if` et les accesseurs `tete` / `queue`). Fais la **disjonction de cas au papier** avant de coder. Le corrigé **Gleam** est replié sous chaque exercice ; le corrigé **Python**, avec ses tests, est dans le fichier `liste_immuable.py`. (Pour `to_str`, ajoute `import gleam/int` en tête du fichier Gleam.)

### 4.1 Lire une liste

!!! question "to_str"
    Renvoie une chaîne façon `"2 -> 3 -> 4 -> _|_"` (la liste vide donne `"_|_"`).

    ??? success "Corrigé Gleam"
        ```gleam
        pub fn to_str(lst: Liste(Int)) -> String {
          case lst {
            Vide -> "_|_"
            Cons(t, q) -> int.to_string(t) <> " -> " <> to_str(q)
          }
        }
        ```

!!! question "tous_vrais"
    Renvoie `True` si **tous** les booléens de la liste sont vrais. La liste vide donne `True` (rien ne le contredit).

    ??? success "Corrigé Gleam"
        ```gleam
        pub fn tous_vrais(lst: Liste(Bool)) -> Bool {
          case lst {
            Vide -> True
            Cons(t, q) -> t && tous_vrais(q)
          }
        }
        ```

!!! question "au_moins_un_vrai"
    Renvoie `True` si **au moins un** booléen est vrai. La liste vide donne `False`.

    ??? success "Corrigé Gleam"
        ```gleam
        pub fn au_moins_un_vrai(lst: Liste(Bool)) -> Bool {
          case lst {
            Vide -> False
            Cons(t, q) -> t || au_moins_un_vrai(q)
          }
        }
        ```

!!! question "compte"
    Compte le nombre d'occurrences d'un élément. `compte(3, 2 -> 3 -> 4)` vaut `1`.

    ??? success "Corrigé Gleam"
        ```gleam
        pub fn compte(e: a, lst: Liste(a)) -> Int {
          case lst {
            Vide -> 0
            Cons(t, q) ->
              case t == e {
                True -> 1 + compte(e, q)
                False -> compte(e, q)
              }
          }
        }
        ```

### 4.2 Construire une liste

#### 4.2.1 Prendre, sauter, supprimer

!!! question "take"
    Renvoie les `n` premiers éléments. `take(2, 2 -> 3 -> 4)` donne `2 -> 3`. Si `n` dépasse la taille, on prend tout.

    ??? success "Corrigé Gleam"
        ```gleam
        pub fn take(n: Int, lst: Liste(a)) -> Liste(a) {
          case lst {
            Vide -> Vide
            Cons(t, q) ->
              case n <= 0 {
                True -> Vide
                False -> Cons(t, take(n - 1, q))
              }
          }
        }
        ```

!!! question "drop"
    Renvoie la liste **sans** ses `n` premiers éléments. `drop(1, 2 -> 3 -> 4)` donne `3 -> 4`.

    ??? success "Corrigé Gleam"
        ```gleam
        pub fn drop(n: Int, lst: Liste(a)) -> Liste(a) {
          case lst {
            Vide -> Vide
            Cons(_, q) ->
              case n <= 0 {
                True -> lst
                False -> drop(n - 1, q)
              }
          }
        }
        ```

!!! question "supprimer"
    Renvoie une liste privée de la **première** occurrence d'un élément. `supprimer(3, 2 -> 3 -> 4)` donne `2 -> 4`.

    ??? success "Corrigé Gleam"
        ```gleam
        pub fn supprimer(e: a, lst: Liste(a)) -> Liste(a) {
          case lst {
            Vide -> Vide
            Cons(t, q) ->
              case t == e {
                True -> q
                False -> Cons(t, supprimer(e, q))
              }
          }
        }
        ```

#### 4.2.2 Par filtrage : vers `filtrer`

On **garde** certains éléments selon une **condition**. Écris ces quatre fonctions, puis regarde ce qu'elles ont en commun. (En Python, ce sont des variantes de `pairs` : on change la condition.)

!!! question "pairs"
    Garde les éléments **pairs**. `2 -> 3 -> 4` donne `2 -> 4`.

    ??? success "Corrigé Gleam"
        ```gleam
        pub fn pairs(lst: Liste(Int)) -> Liste(Int) {
          case lst {
            Vide -> Vide
            Cons(t, q) ->
              case t % 2 == 0 {
                True -> Cons(t, pairs(q))
                False -> pairs(q)
              }
          }
        }
        ```

!!! question "impairs"
    Garde les éléments **impairs**. `2 -> 3 -> 4` donne `3`.

    ??? success "Corrigé Gleam"
        ```gleam
        pub fn impairs(lst: Liste(Int)) -> Liste(Int) {
          case lst {
            Vide -> Vide
            Cons(t, q) ->
              case t % 2 != 0 {
                True -> Cons(t, impairs(q))
                False -> impairs(q)
              }
          }
        }
        ```

!!! question "positifs"
    Garde les éléments **strictement positifs**. `2 -> -3 -> 4` donne `2 -> 4`.

    ??? success "Corrigé Gleam"
        ```gleam
        pub fn positifs(lst: Liste(Int)) -> Liste(Int) {
          case lst {
            Vide -> Vide
            Cons(t, q) ->
              case t > 0 {
                True -> Cons(t, positifs(q))
                False -> positifs(q)
              }
          }
        }
        ```

!!! question "negatifs"
    Garde les éléments **strictement négatifs**. `2 -> -3 -> 4` donne `-3`.

    ??? success "Corrigé Gleam"
        ```gleam
        pub fn negatifs(lst: Liste(Int)) -> Liste(Int) {
          case lst {
            Vide -> Vide
            Cons(t, q) ->
              case t < 0 {
                True -> Cons(t, negatifs(q))
                False -> negatifs(q)
              }
          }
        }
        ```

**Ce qu'elles ont en commun.** Compare les quatre corrigés : ils sont **identiques**, seule la **condition** change (`t % 2 == 0`, `t % 2 != 0`, `t > 0`, `t < 0`). Écrire une fonction par condition, c'est se répéter. L'idée : **passer la condition en paramètre**. On obtient une seule fonction, `filtrer` :

```gleam
pub fn filtrer(predicat: fn(a) -> Bool, lst: Liste(a)) -> Liste(a) {
  case lst {
    Vide -> Vide
    Cons(t, q) ->
      case predicat(t) {
        True -> Cons(t, filtrer(predicat, q))
        False -> filtrer(predicat, q)
      }
  }
}
```

`predicat` est **une fonction** (elle prend un élément et renvoie un booléen). Les quatre fonctions deviennent alors un seul appel, avec la bonne condition écrite **sur place** (une fonction anonyme `fn(x) { ... }`) :

```gleam
filtrer(fn(x) { x % 2 == 0 }, lst)   // les pairs
filtrer(fn(x) { x % 2 != 0 }, lst)   // les impairs
filtrer(fn(x) { x > 0 }, lst)        // les positifs
filtrer(fn(x) { x < 0 }, lst)        // les négatifs
```

#### 4.2.3 Par transformation : vers `mapper`

Cette fois, on ne **garde** pas : on **transforme** chaque élément. Écris ces trois fonctions.

!!! question "carres"
    Renvoie les **carrés**. `2 -> 3 -> 4` donne `4 -> 9 -> 16`.

    ??? success "Corrigé Gleam"
        ```gleam
        pub fn carres(lst: Liste(Int)) -> Liste(Int) {
          case lst {
            Vide -> Vide
            Cons(t, q) -> Cons(t * t, carres(q))
          }
        }
        ```

!!! question "doubles"
    Renvoie les **doubles**. `2 -> 3 -> 4` donne `4 -> 6 -> 8`.

    ??? success "Corrigé Gleam"
        ```gleam
        pub fn doubles(lst: Liste(Int)) -> Liste(Int) {
          case lst {
            Vide -> Vide
            Cons(t, q) -> Cons(2 * t, doubles(q))
          }
        }
        ```

!!! question "triples"
    Renvoie les **triples**. `2 -> 3 -> 4` donne `6 -> 9 -> 12`.

    ??? success "Corrigé Gleam"
        ```gleam
        pub fn triples(lst: Liste(Int)) -> Liste(Int) {
          case lst {
            Vide -> Vide
            Cons(t, q) -> Cons(3 * t, triples(q))
          }
        }
        ```

**Même constat.** Les trois corrigés sont identiques, seule la **transformation** change (`t * t`, `2 * t`, `3 * t`). On la passe en paramètre : c'est `mapper`.

```gleam
pub fn mapper(f: fn(a) -> b, lst: Liste(a)) -> Liste(b) {
  case lst {
    Vide -> Vide
    Cons(t, q) -> Cons(f(t), mapper(f, q))
  }
}
```

```gleam
mapper(fn(x) { x * x }, lst)   // les carrés
mapper(fn(x) { 2 * x }, lst)   // les doubles
mapper(fn(x) { 3 * x }, lst)   // les triples
```

!!! tip "filtrer choisit, mapper transforme"
    `filtrer` **garde** ou **jette** des éléments (la liste peut rétrécir) ; `mapper` **transforme** chaque élément (la liste garde sa taille). Ce sont deux outils très courants, et tu viens de les redécouvrir en remarquant que plusieurs fonctions n'en faisaient qu'une.

### 4.3 En Python seulement

!!! warning "Pourquoi pas en Gleam"
    Les fonctions qui suivent peuvent **échouer** sur certaines entrées : une liste vide n'a pas de dernier élément, un indice peut sortir des bornes. En Python, on le signale par une **assertion** qui lève une erreur. En Gleam, il n'y a pas d'exception : il faudrait renvoyer un `Result` ou un `Option` pour dire « ça a échoué », une notion qu'on verra plus tard. On les fait donc **uniquement en Python**. Les corrigés (avec leurs tests) sont dans `liste_immuable.py`.

À écrire en Python (avec `assert` pour les préconditions) :

- **`dernier_element(lst)`** : le dernier élément (erreur si la liste est vide).
- **`avant_dernier_element(lst)`** : l'avant-dernier (erreur si moins de deux éléments).
- **`minimum(lst)`** : le plus petit élément (erreur si la liste est vide).
- **`get_n(n, lst)`** : l'élément d'indice `n` (erreur si hors bornes).
- **`insert(e, n, lst)`** : insère `e` à l'indice `n` (erreur si hors bornes).
- **`supprimer_n(n, lst)`** : supprime l'élément d'indice `n` (erreur si hors bornes).
- **`supprimer_fin(lst)`** : supprime le dernier élément (erreur si la liste est vide).
- **`trier(lst)`** : tri par sélection (il s'appuie sur `minimum`, donc entraîné lui aussi côté Python).

## 5 Pour aller plus loin

### 5.1 La version la plus proche de Gleam : `dataclass` + `match`

Python possède aussi le **pattern matching** (`match` / `case`), mais il est vraiment fait pour des **classes**, en particulier des **dataclasses**. Avec elles, on définit `Vide` et `Cons` **exactement** comme les deux constructeurs de Gleam. C'est une **autre représentation** de la liste, à la place des tuples :

```python
from dataclasses import dataclass

@dataclass
class Vide:
    pass

@dataclass
class Cons[T]:
    tete: T
    queue: "Liste[T]"

type Liste[T] = Vide | Cons[T]
```

On construit alors une liste **à l'identique de Gleam** (en Python, `Vide()` prend des parenthèses car on crée une instance) :

```python
exemple = Cons(2, Cons(3, Cons(4, Vide())))
#   en Gleam :  Cons(2, Cons(3, Cons(4, Vide)))
```

Et le `match` retrouve tout son sens, **un cas par constructeur**, comme le `case` de Gleam :

```python
def taille(lst: Liste) -> int:
    match lst:
        case Vide():
            return 0
        case Cons(_, queue):
            return 1 + taille(queue)
```

Sur deux listes, les **quatre** cas redeviennent nets (à comparer avec la version `if` de la section 2) :

```python
def sont_egales(l1: Liste, l2: Liste) -> bool:
    match l1, l2:
        case Vide(), Vide():
            return True
        case Vide(), Cons(_, _):
            return False
        case Cons(_, _), Vide():
            return False
        case Cons(t1, q1), Cons(t2, q2):
            return t1 == t2 and sont_egales(q1, q2)
```

Cette écriture est **hors programme** (les dataclasses ne sont pas exigées), mais c'est le calque le plus exact de Gleam, et la façon dont `match` est vraiment prévu pour être utilisé. Une différence subtile demeure : Python, contrairement à Gleam, **ne vérifie pas** que tu as traité tous les cas.
