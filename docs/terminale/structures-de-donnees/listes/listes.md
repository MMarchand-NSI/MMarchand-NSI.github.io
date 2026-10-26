# Listes et récursivité ![](../../../assets/lucy.svg){ alt="" style="height: 1em; width: auto; vertical-align: -0.1em" }

!!! danger "Ce ne sont pas les listes Python"
    Ici, on ne parle **pas** des listes Python (qui sont en réalité des *tableaux dynamiques*). On étudie la **vraie** structure de liste, définie récursivement.

La **récursivité** **généralise** le principe de **récurrence** que tu connais en mathématiques. Les listes sont l'outil idéal pour **faire ses premiers pas en récursivité**.

??? note "Pour l'enseignant (non destiné aux élèves) : pourquoi « généralisation de la récurrence »"
    **$\mathbb{N}$ est une liste comme une autre.** Peano définit les entiers naturels exactement comme ce chapitre définit la liste : un cas de base, et un constructeur qui s'applique à un objet du même type.

    ```gleam
    pub type Nat {
      Zero
      Succ(Nat)
    }
    ```

    `Nat` est une `Liste` dont les maillons ne portent aucune information : `Succ(Succ(Zero))` est `Cons(_, Cons(_, Vide))` sans les têtes. La fonction `taille` est d'ailleurs exactement l'oubli des têtes, de `Liste(a)` vers `Nat`.

    **Un seul fait, deux outils.** Un type défini ainsi est le **plus petit ensemble** qui contient les cas de base et qui est stable par les constructeurs. Ce fait unique donne de quoi démontrer et de quoi définir :

    | | Sur $\mathbb{N}$ (le cours de maths) | Sur les listes, et tout type défini par constructeurs |
    |---|---|---|
    | **Démontrer** | récurrence : $P(0)$, et $P(n) \Rightarrow P(n+1)$ | récurrence structurelle : $P(\texttt{Vide})$, et $P(q) \Rightarrow P(\texttt{Cons}(x, q))$ pour tout $x$ |
    | **Définir** | suite récurrente : $u_0 = a$, $u_{n+1} = f(n, u_n)$ | fonction récursive : un cas par constructeur, appel sur la sous-structure |

    La récurrence du lycée est la colonne $\mathbb{N}$ de ce tableau. La généralisation consiste à remplacer « $n+1$ » par « n'importe quel constructeur » et « $n$ » par « ses sous-structures ». Un arbre binaire (`Vide` ou `Noeud(gauche, valeur, droite)`) donne ainsi une hérédité à **deux** hypothèses, une par sous-arbre.

    **Ce que cela donne dans le code.** Dans `taille`, le cas `Vide` est l'**initialisation**, le cas `Cons` est l'**hérédité**, et l'appel `taille(queue)` est l'**hypothèse de récurrence**. Prouver que `taille` est juste est une récurrence structurelle mot pour mot : juste sur `Vide`, et si `taille(queue)` est juste, `1 + taille(queue)` l'est aussi. C'est le « saut de foi » de *How to Design Programs* (Felleisen et al., section 9), que ses auteurs relient eux-mêmes à l'usage de l'hypothèse de récurrence. Le lutin qui fait confiance à l'autre lutin, c'est cette hypothèse. La **terminaison** vient avec : chaque appel porte sur une sous-structure stricte, et on ne descend pas indéfiniment dans un objet construit en un nombre fini d'étapes.

    **Où « totale » demande une réserve.** L'énoncé est exact pour la récursivité **structurelle**, celle de ce chapitre. Il s'étend à la récursivité sur une **mesure qui décroît** (tri fusion, `pgcd`), qui relève de la récurrence forte. Mais un langage de programmation accepte aussi des fonctions récursives qui ne terminent pas, ou dont on ignore si elles terminent (la suite de Syracuse). Celles-là ne s'adossent à aucune récurrence : la récursivité générale **déborde** la récurrence, elle ne s'y réduit pas. C'est ce qui sépare ce chapitre de celui sur la calculabilité.

    *Source du terme* : R. M. Burstall (1969), « Proving Properties of Programs by Structural Induction », *The Computer Journal* 12(1), 41-48, [DOI 10.1093/comjnl/12.1.41](https://doi.org/10.1093/comjnl/12.1.41).

## 1 Les listes récursives

### 1.1 La structure : deux possibilités

Imagine un **lutin** qui reçoit une liste. Il n'a que **deux possibilités** devant lui :

- soit la liste est **vide**
- soit c'est un élément, la **tête**, suivi d'une autre liste, la **queue**.

!!! abstract "Définition récursive d'une liste"
    Une liste est :

    1. soit **vide**
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

!!! note "Avant de commencer"
    Gleam s'installe avec `nsi install gleam`, et tes programmes se lancent avec `gleam run` et `gleam test`. Tout est sur la page [Gleam, l'atelier](../../../les-outils/gleam.md), à faire une fois pour toutes avant d'aller plus loin.

    Une seule chose à savoir pour **lire** cette page : la police du site **soude** certaines paires de symboles en un seul dessin, `->`, `==`, `!=` et `<>`. Tu en tapes toujours **deux**, et la [correspondance y est donnée](../../../les-outils/gleam.md#la-police-soude-certains-symboles).

!!! question "Construire"
    Écris, dans `main`, la liste des trois chaînes `"rouge"`, `"vert"`, `"bleu"`, puis affiche-la.

    <div markdown="block" style="display: none">
    ??? success "Corrigé"
        ```gleam
        let couleurs = Cons("rouge", Cons("vert", Cons("bleu", Vide)))
        echo couleurs
        ```

        `echo` affiche `Cons("rouge", Cons("vert", Cons("bleu", Vide)))` : les chaînes gardent leurs guillemets.
    </div>

### 1.3 La disjonction de cas

Pour **faire quelque chose** d'une liste, le lutin regarde **laquelle des deux possibilités** il a en main. C'est la **disjonction de cas**, écrite avec `case` :

```gleam
case lst {
  Vide -> ...
  Cons(tete, queue) -> ...
}
```

- **un cas par constructeur** : le cas `Vide`, et le cas `Cons`
- `Cons(tete, queue)` **déconstruit** la liste : ça donne un nom à la tête (`tete`) et à la queue (`queue`).

!!! warning "Piège, et garde-fou : les deux cas, toujours"
    Gleam **refuse de compiler** si tu oublies un cas. Impossible d'oublier le `Vide`. Le compilateur te **force** à penser « cas de base / cas récursif », les deux fondations de toute récursivité.

## 2 Les trois grands types de problèmes

Presque toutes les fonctions sur les listes relèvent de l'un de ces trois types :

- **lire** une liste : de la liste à une **valeur** (`taille`, `somme`, `contient`)
- **transformer** une liste : d'une liste à une **autre liste** (`inverser`, `concat`)
- **faire pousser** une liste : d'une **graine** à une liste (`repete`).

### 2.1 Lire une liste : de la liste à une valeur

Les premières fonctions **lisent** une liste : elles la parcourent et rendent une valeur qui n'est **pas** une liste (un nombre, un booléen).

#### 2.1.1 Première fonction : la taille

C'est la fonction qu'on a écrite ensemble au tableau, au début du cours. La voici en Gleam.

```gleam
pub fn taille(lst: Liste(a)) -> Int {
  case lst {
    Vide -> 0
    Cons(_, queue) -> 1 + taille(queue)
  }
}
```

**Les lutins sont de grosses faignasses.** Ils ont la flemme de compter toute la liste, alors chacun en fait le moins possible et refile le reste au suivant.

Le raisonnement du lutin : *« Compter toute la liste ? Pas question. Je regarde ce que je reçois. Ou bien c'est `Vide`, et je réponds 0, ça ne me coûte rien. Ou bien c'est une tête et une queue : je donne la queue à un autre lutin, et je réponds 1, pour ma tête, plus sa réponse. »*

![Un lutin avachi sur une pile de cadres d'appel, sa réponse à la main](lutin-pile.png){ style="width: 380px; display: block; margin: 0 auto" }

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

!!! fondamental "Cas de base"
    J'hésite à t'expliquer ici ce que c'est, tellement c'est martelé en cours.

    Un **cas de base** est un cas où la réponse est immédiate, sans appel à soi-même : ici `Vide -> 0`. Il peut y en avoir **plusieurs**, et c'est fréquent. Un **cas récursif** est un cas où la fonction s'appelle elle-même, et elle le fait toujours sur une **sous-structure** de ce qu'on lui a donné : ici `taille(queue)`, c'est-à-dire sur une liste strictement plus courte.

    C'est cette deuxième chose qui assure la **terminaison**. Chaque appel porte sur une liste plus courte d'un maillon, donc on **converge vers un cas de base**, et comme une liste a une taille finie, on en atteint un en un nombre fini d'étapes. Le calcul finit.

    Si l'appel récursif ne rapproche d'**aucun** cas de base, par exemple `taille(lst)` au lieu de `taille(queue)`, rien ne converge, le calcul ne finit jamais, et la machine finit par refuser d'aller plus loin.

!!! fondamental "Pour écrire, ne déroule pas"
    La trace sert à **comprendre** ce que fait la machine. Pour **écrire** une fonction récursive, on ne déroule rien : on fait confiance à l'appel sur la queue, comme le lutin fait confiance à l'autre lutin, et on se demande seulement quoi faire de sa réponse.

!!! question "Prédire"
    Sans exécuter, écris la trace de `f(Cons(2, Cons(3, Cons(4, Vide))))` sur le modèle de celle de `taille`, puis donne le résultat.

    ```gleam
    pub fn f(lst: Liste(Int)) -> Int {
      case lst {
        Vide -> 0
        Cons(tete, queue) -> tete - f(queue)
      }
    }
    ```

    <div markdown="block" style="display: none">
    ??? success "Réponse"
        ```text
        f(Cons(2, ...)) = 2 - f(Cons(3, ...))
                        = 2 - (3 - f(Cons(4, Vide)))
                        = 2 - (3 - (4 - f(Vide)))
                        = 2 - (3 - (4 - 0))
                        = 2 - (3 - 4)
                        = 2 - (-1)
                        = 3
        ```

        Si tu as trouvé `-5`, tu as calculé `2 - 3 - 4` de gauche à droite, comme une boucle. Les soustractions se font **à la remontée**, de la fin vers le début.
    </div>

#### 2.1.2 À toi d'écrire

!!! note "Tester ton code"
    Tu n'écriras aucun test toi-même dans ce chapitre : chaque exercice te donne le sien, tout fait. Tu le colles dans `test/liste_test.gleam`, et `gleam test` les lance tous. La mise en place du fichier et la lecture d'un échec sont sur la page [Gleam, l'atelier](../../../les-outils/gleam.md#tester).

    `left` est ce que **ta** fonction a renvoyé, `right` ce qu'on attendait.

!!! fondamental "Méthode"
    Avant de coder, écris la **disjonction de cas au papier** : que renvoie la fonction si la liste est `Vide` ? et si c'est `Cons(tete, queue)` ?

    Garde ce papier sous la main, et montre-le quand tu appelles ton professeur. Il dit tout de suite si ce qui bloque est ton **raisonnement** ou la façon de l'**écrire en Gleam**. Sans lui, il faut chercher les deux à la fois.

!!! question "La somme"
    Écris `somme(lst: Liste(Int)) -> Int` qui renvoie la somme des éléments d'une liste d'entiers.

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn somme_test() {
          let l = Cons(2, Cons(3, Cons(4, Vide)))
          assert liste.somme(Vide) == 0
          assert liste.somme(l) == 9
        }
        ```

    <div markdown="block" style="display: none">
    ??? success "Corrigé"
        ```gleam
        pub fn somme(lst: Liste(Int)) -> Int {
          case lst {
            Vide -> 0
            Cons(tete, queue) -> tete + somme(queue)
          }
        }
        ```
    </div>

!!! question "La somme des pairs"
    Écris `somme_pairs(lst: Liste(Int)) -> Int` qui renvoie la somme des seuls éléments **pairs**. `2 -> 3 -> 4` donne `6`.

    Il te faut une **condition**, et Gleam n'a pas de `if`. Une condition est une expression qui vaut `True` ou `False` : tu en fais donc une disjonction de cas, comme pour une liste.

    ```gleam
    case tete % 2 == 0 {
      True -> ...
      False -> ...
    }
    ```

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn somme_pairs_test() {
          let l = Cons(2, Cons(3, Cons(4, Vide)))
          assert liste.somme_pairs(Vide) == 0
          assert liste.somme_pairs(l) == 6
          assert liste.somme_pairs(Cons(1, Cons(3, Vide))) == 0
        }
        ```

    <div markdown="block" style="display: none">
    ??? success "Corrigé"
        ```gleam
        pub fn somme_pairs(lst: Liste(Int)) -> Int {
          case lst {
            Vide -> 0
            Cons(tete, queue) ->
              case tete % 2 == 0 {
                True -> tete + somme_pairs(queue)
                False -> somme_pairs(queue)
              }
          }
        }
        ```

        Le `case` sur la condition est **imbriqué** dans le cas `Cons` : on ne regarde la parité de la tête que s'il y a une tête.
    </div>

    ??? tip "Pour aller plus loin : comparer ne rend pas un booléen"
        Un `case` sur une condition n'a que deux issues, `True` et `False`. Mais **comparer** deux nombres en a trois, et Gleam a un type exprès pour cela, `Order`, avec ses trois valeurs `Lt` (plus petit), `Eq` (égal) et `Gt` (plus grand). C'est ce que renvoie `int.compare` :

        ```gleam
        import gleam/int
        import gleam/order.{Eq, Gt, Lt}

        pub fn comparer(a: Int, b: Int) -> String {
          case int.compare(a, b) {
            Lt -> "plus petit"
            Eq -> "égal"
            Gt -> "plus grand"
          }
        }
        ```

        Les trois cas sont là, et le compilateur vérifie qu'aucun ne manque, exactement comme pour `Vide` et `Cons`. Avec des booléens il aurait fallu enchaîner `a < b`, puis `a == b`, sans que rien ne garantisse d'avoir tout couvert. C'est la forme qu'on retrouvera pour trier.

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

!!! info "La structure d'abord"
    Dans tout ce chapitre, une fonction prend la **liste en premier** paramètre, et le reste ensuite : `contient(lst, x)`, `take(lst, n)`. Ce n'est pas une question de goût, et l'exercice `slice` te montrera ce que cette règle permet.

!!! question "Contient"
    On veut écrire `contient(lst: Liste(a), x: a) -> Bool`, qui indique si `x` est présent dans la liste. La réponse sera une **expression booléenne**, qu'on construit en trois temps.

    1. Si la liste est `Vide`, que renvoie la fonction ?

        <div markdown="block" style="display: none">
        ??? success "Réponse"
            `False` : une liste vide ne contient rien.
        </div>

    2. Si la liste est `Cons(tete, queue)`, complète la phrase : « `x` est dans la liste si … **ou** … ».

        <div markdown="block" style="display: none">
        ??? success "Réponse"
            « `x` est dans la liste si **la tête vaut `x`**, **ou** si **`x` est dans la queue**. »
        </div>

    3. Traduis cette phrase en une expression booléenne Gleam. Quelle partie est un appel récursif ?

        <div markdown="block" style="display: none">
        ??? success "Réponse"
            `tete == x || contient(queue, x)`. La partie droite, `contient(queue, x)`, est l'appel récursif : on redemande à un autre lutin de chercher dans la queue.
        </div>

    Écris maintenant `contient` en entier.

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn contient_test() {
          let l = Cons(2, Cons(3, Cons(4, Vide)))
          assert liste.contient(Vide, 2) == False
          assert liste.contient(l, 3) == True
          assert liste.contient(l, 9) == False
        }
        ```

    <div markdown="block" style="display: none">
    ??? success "Corrigé"
        ```gleam
        pub fn contient(lst: Liste(a), x: a) -> Bool {
          case lst {
            Vide -> False
            Cons(tete, queue) -> tete == x || contient(queue, x)
          }
        }
        ```

        Le `||` est **paresseux** : si `tete == x` est vrai, Gleam ne va pas chercher plus loin dans la queue.
    </div>

#### 2.1.3 Deux listes à la fois : les quatre cas

On veut écrire `sont_egales(l1: Liste(a), l2: Liste(a)) -> Bool`, qui dit si deux listes contiennent les mêmes éléments dans le même ordre. Le lutin en tient maintenant **deux** en même temps. La méthode tient en trois questions, à se poser **dans l'ordre**, avant d'écrire la moindre ligne.

!!! question "Égalité de deux listes"
    1. Quels sont **tous** les cas possibles pour le couple d'entrée `(l1, l2)` ?

        <div markdown="block" style="display: none">
        ??? success "Réponse"
            Chaque liste peut être `Vide` ou `Cons`, ce qui fait **quatre** cas (2 × 2) :

            - `l1` vide et `l2` vide
            - `l1` vide et `l2` non vide
            - `l1` non vide et `l2` vide
            - `l1` non vide et `l2` non vide.
        </div>

    2. Que doit renvoyer la fonction dans **chacun** de ces cas ?

        <div markdown="block" style="display: none">
        ??? success "Réponse"
            - deux listes vides : elles sont **égales**, on renvoie `True`
            - `l1` vide, `l2` non vide : elles n'ont pas la même longueur, on renvoie `False`
            - `l1` non vide, `l2` vide : même raison, `False`
            - deux listes non vides : elles sont égales si leurs **têtes** sont égales **et** si leurs **queues** sont égales.
        </div>

    3. Parmi ces quatre cas, lesquels sont des **cas de base** (la réponse est immédiate) et lesquels sont **récursifs** (il faut redemander à un autre lutin) ?

        <div markdown="block" style="display: none">
        ??? success "Réponse"
            Les **trois** premiers sont des cas de base : la réponse se lit directement. Le **quatrième** est le seul cas récursif : pour savoir si les queues sont égales, on appelle `sont_egales` sur `q1` et `q2`.
        </div>

    Écris maintenant `sont_egales` en Gleam, avec **une branche par cas**. Pour faire la disjonction sur **deux** listes à la fois, on les met toutes les deux après `case`, séparées par une virgule, et chaque branche donne un motif pour chacune. Complète :

    ```gleam
    pub fn sont_egales(l1: Liste(a), l2: Liste(a)) -> Bool {
      case l1, l2 {
        Vide, Vide -> ...
        ...
      }
    }
    ```

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn sont_egales_test() {
          let l = Cons(2, Cons(3, Vide))
          assert liste.sont_egales(Vide, Vide) == True
          assert liste.sont_egales(l, Cons(2, Cons(3, Vide))) == True
          assert liste.sont_egales(l, Cons(2, Vide)) == False
          assert liste.sont_egales(l, Cons(2, Cons(9, Vide))) == False
        }
        ```

    <div markdown="block" style="display: none">
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
    </div>

!!! note "Quatre cas, même si on pourrait en écrire moins"
    On pourrait fusionner les deux cas « une seule est vide » en un seul. Ce n'est qu'une **optimisation d'écriture**, et ce n'est pas le sujet : on écrit les **quatre** cas pour voir toute la disjonction. Là encore, Gleam **exige** que les quatre soient traités.

### 2.2 Transformer une liste : d'une liste à une autre liste

!!! danger "Les listes sont immuables"
    On ne **modifie jamais** une liste. Une opération qui semble « modifier » une liste en **construit une nouvelle**. Le lutin ne rature rien : il **reconstruit en retour**.

Exemple à lire, ajouter un élément **à la fin** :

```gleam
pub fn ajouter_fin(lst: Liste(a), x: a) -> Liste(a) {
  case lst {
    Vide -> Cons(x, Vide)
    Cons(tete, queue) -> Cons(tete, ajouter_fin(queue, x))
  }
}
```

Le **lutin ajouteur** : *« Si je reçois une liste vide, je renvoie la liste qui contient juste `x`. Sinon, je garde ma tête, je donne la queue à un autre lutin pour qu'il y ajoute `x`, et je recolle. »*

!!! question "Inverser"
    Écris `inverser(lst: Liste(a)) -> Liste(a)` qui renvoie la liste à l'envers.

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn inverser_test() {
          let l = Cons(2, Cons(3, Cons(4, Vide)))
          assert liste.inverser(Vide) == Vide
          assert liste.inverser(l) == Cons(4, Cons(3, Cons(2, Vide)))
        }
        ```

    ??? tip "Indice"
        Cas `Vide` : la liste renversée est `Vide`. Cas `Cons(tete, queue)` : renverse d'abord la **queue**, puis ajoute `tete` **à la fin** avec `ajouter_fin`.

    ??? question "Avant d'ouvrir le corrigé"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    <div markdown="block" style="display: none">
    ??? success "Corrigé"
        ```gleam
        pub fn inverser(lst: Liste(a)) -> Liste(a) {
          case lst {
            Vide -> Vide
            Cons(tete, queue) -> ajouter_fin(inverser(queue), tete)
          }
        }
        ```
    </div>

!!! question "Concaténer"
    Écris `concat(l1: Liste(a), l2: Liste(a)) -> Liste(a)` qui met `l2` à la suite de `l1`. Il y a **deux** listes : fais la disjonction des **quatre** cas, comme pour `sont_egales`, et traite-les un par un.

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn concat_test() {
          let l = Cons(2, Cons(3, Vide))
          assert liste.concat(Vide, Vide) == Vide
          assert liste.concat(Vide, l) == l
          assert liste.concat(l, Vide) == l
          assert liste.concat(l, Cons(4, Vide)) == Cons(2, Cons(3, Cons(4, Vide)))
        }
        ```

    <div markdown="block" style="display: none">
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

        - deux listes vides : le résultat est **vide**
        - `l1` vide : le résultat est **`l2`**
        - `l2` vide : le résultat est **`l1`**
        - deux non vides : on garde la tête de `l1`, et pour la suite on demande à un autre lutin de concaténer la queue de `l1` avec `l2`, puis on recolle.
    </div>

### 2.3 Faire pousser une liste : d'une graine à une liste

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

C'est exactement la **récurrence** de ton cours de maths : un cas pour 0, puis le cas $n$ obtenu à partir du cas $n - 1$. Les listes suivent la même idée : un cas pour `Vide`, puis le cas `Cons` obtenu à partir de la queue.
- Les cas sont essayés **dans l'ordre** : `_` doit venir en dernier, sinon il attraperait aussi `0` (Gleam t'avertit alors que le cas `0` est inatteignable).

!!! question "Répéter"
    Écris `repete(n: Int, x: a) -> Liste(a)` qui renvoie une liste contenant `n` fois l'élément `x` (on suppose `n` positif ou nul). Il n'y a pas de liste à passer ici : c'est la **graine** `n` qui vient en premier.

    1. Que renvoie `repete(0, x)` ?

        <div markdown="block" style="display: none">
        ??? success "Réponse"
            `Vide` : zéro fois `x`, c'est la liste vide.
        </div>

    2. Si `n` n'est pas nul, comment obtenir `repete(n, x)` à partir de `repete(n - 1, x)` ?

        <div markdown="block" style="display: none">
        ??? success "Réponse"
            On met `x` en tête de `repete(n - 1, x)` : `Cons(x, repete(n - 1, x))`.
        </div>

    Complète :

    ```gleam
    pub fn repete(n: Int, x: a) -> Liste(a) {
      case n {
        0 -> ...
        _ -> ...
      }
    }
    ```

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn repete_test() {
          assert liste.repete(0, "a") == Vide
          assert liste.repete(3, "a") == Cons("a", Cons("a", Cons("a", Vide)))
        }
        ```

    <div markdown="block" style="display: none">
    ??? success "Corrigé"
        ```gleam
        pub fn repete(n: Int, x: a) -> Liste(a) {
          case n {
            0 -> Vide
            _ -> Cons(x, repete(n - 1, x))
          }
        }
        ```

        Le cas de base n'est plus `Vide` mais `n == 0` : la graine `n` **décroît** à chaque appel jusqu'à 0.
    </div>

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
    1. Écris la relation de récurrence du coût $A(n)$ de `ajouter_fin(lst, x)`, pour une liste `lst` de taille $n$. Quelle est sa forme générale ?

        <div markdown="block" style="display: none">
        ??? success "Réponse"
            $A(0) = a$ et $A(n) = A(n-1) + b$ : c'est la même récurrence que `taille`. $A(n) = a + b \times n$, coût **linéaire**.
        </div>

    2. `inverser` appelle `inverser` sur la queue (taille $n-1$), **puis** `ajouter_fin` sur le résultat (taille $n-1$ aussi). Écris la relation de récurrence de son coût $T(n)$.

        <div markdown="block" style="display: none">
        ??? success "Réponse"
            $T(0) = c$ et $T(n) = T(n-1) + A(n-1) + d$, où $d$ compte les opérations fixes de l'appel. En remplaçant $A(n-1)$ : $T(n) = T(n-1) + b \times (n-1) + (a + d)$.
        </div>

    3. Cette suite n'est ni arithmétique ni géométrique : ce qu'on ajoute à chaque étape **grandit** avec $n$. Trouve sa forme générale, en additionnant les écarts $T(k) - T(k-1)$ pour $k$ allant de $1$ à $n$.

        <div markdown="block" style="display: none">
        ??? success "Réponse"
            Les termes intermédiaires se simplifient :

            $$T(n) = T(0) + b \times \big(0 + 1 + \dots + (n-1)\big) + (a + d) \times n = c + b \times \frac{n(n-1)}{2} + (a + d) \times n$$

            Le terme en $n^2$ l'emporte : le coût est **quadratique**, en $O(n^2)$. C'est `ajouter_fin`, linéaire, appelée $n$ fois, qui coûte cher.
        </div>

!!! question "Vérifie en dépliant"
    Déplie `inverser(2 -> 3 -> 4)` en écrivant chaque appel à `ajouter_fin`. Combien de fois chaque élément est-il reparcouru ? Tu dois **voir** le $O(n^2)$ apparaître, pas seulement le calculer.

    <div markdown="block" style="display: none">
    ??? success "Ce qu'on observe"
        `inverser` fait un appel par élément ($n$ appels), et **chaque** appel relance `ajouter_fin`, qui reparcourt toute la liste déjà renversée (de longueur $0$, puis $1$, puis $2$…). On retrouve la somme $0 + 1 + \dots + (n-1)$ du calcul.
    </div>

## 4 Exercices

!!! tip "Comment t'entraîner"
    Écris chaque fonction **en Gleam**, avec `case`. Fais la **disjonction de cas au papier** avant de coder. Sous chaque exercice, son **test** à coller dans `test/liste_test.gleam`, puis son corrigé. (Pour `to_str`, ajoute `import gleam/int` en tête de `src/liste.gleam`.)

    Quand tu les auras toutes, tu les réécriras **en Python** : c'est l'objet de la page [Transcription en Python](transcription-python.md), où les algorithmes seront déjà les tiens et où il ne restera que la syntaxe.

### 4.1 Lire une liste

!!! question "to_str"
    Écris `to_str(lst: Liste(Int)) -> String`, qui renvoie une chaîne façon `"2 -> 3 -> 4 -> _|_"` (la liste vide donne `"_|_"`).

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn to_str_test() {
          let l = Cons(2, Cons(3, Cons(4, Vide)))
          assert liste.to_str(Vide) == "_|_"
          assert liste.to_str(l) == "2 -> 3 -> 4 -> _|_"
        }
        ```

    <div markdown="block" style="display: none">
    ??? success "Corrigé Gleam"
        ```gleam
        pub fn to_str(lst: Liste(Int)) -> String {
          case lst {
            Vide -> "_|_"
            Cons(t, q) -> int.to_string(t) <> " -> " <> to_str(q)
          }
        }
        ```
    </div>

!!! question "tous_vrais"
    Écris `tous_vrais(lst: Liste(Bool)) -> Bool`, qui renvoie `True` si **tous** les booléens de la liste sont vrais. La liste vide donne `True` (rien ne le contredit).

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn tous_vrais_test() {
          assert liste.tous_vrais(Vide) == True
          assert liste.tous_vrais(Cons(True, Cons(True, Vide))) == True
          assert liste.tous_vrais(Cons(True, Cons(False, Vide))) == False
        }
        ```

    <div markdown="block" style="display: none">
    ??? success "Corrigé Gleam"
        ```gleam
        pub fn tous_vrais(lst: Liste(Bool)) -> Bool {
          case lst {
            Vide -> True
            Cons(t, q) -> t && tous_vrais(q)
          }
        }
        ```
    </div>

!!! question "au_moins_un_vrai"
    Écris `au_moins_un_vrai(lst: Liste(Bool)) -> Bool`, qui renvoie `True` si **au moins un** booléen est vrai. La liste vide donne `False`.

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn au_moins_un_vrai_test() {
          assert liste.au_moins_un_vrai(Vide) == False
          assert liste.au_moins_un_vrai(Cons(False, Cons(True, Vide))) == True
          assert liste.au_moins_un_vrai(Cons(False, Cons(False, Vide))) == False
        }
        ```

    <div markdown="block" style="display: none">
    ??? success "Corrigé Gleam"
        ```gleam
        pub fn au_moins_un_vrai(lst: Liste(Bool)) -> Bool {
          case lst {
            Vide -> False
            Cons(t, q) -> t || au_moins_un_vrai(q)
          }
        }
        ```
    </div>

!!! question "compte"
    Écris `compte(lst: Liste(a), e: a) -> Int`, qui compte le nombre d'occurrences d'un élément. `compte(2 -> 3 -> 4, 3)` vaut `1`.

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn compte_test() {
          let l = Cons(2, Cons(3, Cons(2, Vide)))
          assert liste.compte(Vide, 2) == 0
          assert liste.compte(l, 2) == 2
          assert liste.compte(l, 9) == 0
        }
        ```

    <div markdown="block" style="display: none">
    ??? success "Corrigé Gleam"
        ```gleam
        pub fn compte(lst: Liste(a), e: a) -> Int {
          case lst {
            Vide -> 0
            Cons(t, q) ->
              case t == e {
                True -> 1 + compte(q, e)
                False -> compte(q, e)
              }
          }
        }
        ```
    </div>

### 4.2 Transformer une liste

#### 4.2.1 Prendre, sauter, supprimer

!!! question "take"
    Écris `take(lst: Liste(a), n: Int) -> Liste(a)`, qui renvoie les `n` premiers éléments. `take(2 -> 3 -> 4, 2)` donne `2 -> 3`. Si `n` dépasse la taille, on prend tout.

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn take_test() {
          let l = Cons(2, Cons(3, Cons(4, Vide)))
          assert liste.take(Vide, 2) == Vide
          assert liste.take(l, 0) == Vide
          assert liste.take(l, 2) == Cons(2, Cons(3, Vide))
          assert liste.take(l, 9) == l
        }
        ```

    ??? tip "Indice : deux `case`, l'un dans l'autre"
        Il y a **deux** choses à examiner, la liste et le compteur, donc deux disjonctions emboîtées. La liste d'abord, et dans le cas `Cons`, le compteur, comme pour `repete` :

        ```gleam
        case lst {
          Vide -> ...
          Cons(t, q) ->
            case n {
              0 -> ...
              _ -> ...
            }
        }
        ```

        Il y a donc **deux cas de base** : plus de liste, ou plus rien à prendre.

    ??? question "Avant d'ouvrir le corrigé"
        En une phrase, sur ton cahier : lequel des deux cas de base avais-tu oublié ?

    <div markdown="block" style="display: none">
    ??? success "Corrigé Gleam"
        ```gleam
        pub fn take(lst: Liste(a), n: Int) -> Liste(a) {
          case lst {
            Vide -> Vide
            Cons(t, q) ->
              case n {
                0 -> Vide
                _ -> Cons(t, take(q, n - 1))
              }
          }
        }
        ```
    </div>

!!! question "drop"
    Écris `drop(lst: Liste(a), n: Int) -> Liste(a)`, qui renvoie la liste **sans** ses `n` premiers éléments. `drop(2 -> 3 -> 4, 1)` donne `3 -> 4`.

    Les cas sont **exactement les mêmes** que ceux de `take` : la liste, puis le compteur. Seul ce qu'on renvoie dans chaque cas change.

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn drop_test() {
          let l = Cons(2, Cons(3, Cons(4, Vide)))
          assert liste.drop(Vide, 2) == Vide
          assert liste.drop(l, 0) == l
          assert liste.drop(l, 2) == Cons(4, Vide)
          assert liste.drop(l, 9) == Vide
        }
        ```

    <div markdown="block" style="display: none">
    ??? success "Corrigé Gleam"
        ```gleam
        pub fn drop(lst: Liste(a), n: Int) -> Liste(a) {
          case lst {
            Vide -> Vide
            Cons(_, q) ->
              case n {
                0 -> lst
                _ -> drop(q, n - 1)
              }
          }
        }
        ```

        Quand il n'y a plus rien à sauter, on renvoie `lst` **en entier**, pas `q` : la tête fait partie du résultat.
    </div>

!!! question "slice"
    Écris `slice(lst: Liste(a), debut: Int, fin: Int) -> Liste(a)`, qui renvoie les éléments d'indice `debut` à `fin` **exclu**, c'est-à-dire l'intervalle `[debut ; fin)`. `slice(2 -> 3 -> 4, 1, 3)` donne `3 -> 4`.

    Tu n'as **aucun `case` à écrire** : `take` et `drop` font déjà tout le travail. Trouve dans quel ordre les appeler.

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn slice_test() {
          let l = Cons(2, Cons(3, Cons(4, Vide)))
          assert liste.slice(Vide, 0, 2) == Vide
          assert liste.slice(l, 1, 3) == Cons(3, Cons(4, Vide))
          assert liste.slice(l, 0, 0) == Vide
          assert liste.slice(l, 0, 9) == l
        }
        ```

    <div markdown="block" style="display: none">
    ??? success "Corrigé Gleam"
        ```gleam
        pub fn slice(lst: Liste(a), debut: Int, fin: Int) -> Liste(a) {
          drop(take(lst, fin), debut)
        }
        ```

        On garde d'abord tout ce qui est avant `fin`, puis on jette ce qui est avant `debut`. Dans l'autre ordre il faudrait corriger `fin`, puisque la liste a raccourci.
    </div>

    ??? question "Cherche : l'opérateur `|>`"
        Cette autre écriture du **même** corrigé est valable en Gleam :

        ```gleam
        pub fn slice(lst: Liste(a), debut: Int, fin: Int) -> Liste(a) {
          lst |> take(fin) |> drop(debut)
        }
        ```

        Va lire ce que fait cet opérateur, le *pipe*, sur la page [L'opérateur pipe](../../langages/fonctionnels/3.gleam-pipe.md), puis réponds sur ton cahier :

        - pourquoi les deux écritures font-elles la même chose ?
        - pourquoi cesserait-elle de fonctionner si `take` prenait son compteur en premier et sa liste ensuite ?

        **Tu n'es pas obligé d'écrire ta réponse avec `|>`**, mais tu dois savoir la lire.

        <div markdown="block" style="display: none">
        ??? success "Réponse"
            `x |> f(y)` est une autre façon d'écrire `f(x, y)` : la valeur de gauche devient le **premier** argument de la fonction de droite. On lit alors le calcul dans l'ordre où il se fait, de gauche à droite, au lieu de le lire de l'intérieur vers l'extérieur.

            C'est pour cela que toutes les fonctions de ce chapitre prennent la **liste en premier** : sans cela, le *pipe* ne tomberait pas sur le bon paramètre. L'ordre des paramètres n'est donc pas un détail, c'est ce qui rend ces fonctions enchaînables.
        </div>

!!! question "supprimer"
    Écris `supprimer(lst: Liste(a), e: a) -> Liste(a)`, qui renvoie une liste privée de la **première** occurrence d'un élément. `supprimer(2 -> 3 -> 4, 3)` donne `2 -> 4`.

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn supprimer_test() {
          let l = Cons(2, Cons(3, Cons(2, Vide)))
          assert liste.supprimer(Vide, 2) == Vide
          assert liste.supprimer(l, 2) == Cons(3, Cons(2, Vide))
          assert liste.supprimer(l, 9) == l
        }
        ```

    <div markdown="block" style="display: none">
    ??? success "Corrigé Gleam"
        ```gleam
        pub fn supprimer(lst: Liste(a), e: a) -> Liste(a) {
          case lst {
            Vide -> Vide
            Cons(t, q) ->
              case t == e {
                True -> q
                False -> Cons(t, supprimer(q, e))
              }
          }
        }
        ```
    </div>

#### 4.2.2 Par filtrage : vers `filter`

On **garde** certains éléments selon une **condition**, comme `somme_pairs` l'a fait pour additionner. Écris ces trois fonctions, puis regarde ce qu'elles ont en commun.

!!! question "impairs"
    Écris `impairs(lst: Liste(Int)) -> Liste(Int)`, qui garde les éléments **impairs**. `2 -> 3 -> 4` donne `3`.

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn impairs_test() {
          let l = Cons(2, Cons(3, Cons(4, Vide)))
          assert liste.impairs(Vide) == Vide
          assert liste.impairs(l) == Cons(3, Vide)
          assert liste.impairs(Cons(-3, Cons(2, Vide))) == Cons(-3, Vide)
        }
        ```

    <div markdown="block" style="display: none">
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
    </div>

!!! question "positifs"
    Écris `positifs(lst: Liste(Int)) -> Liste(Int)`, qui garde les éléments **strictement positifs**. `2 -> -3 -> 4` donne `2 -> 4`.

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn positifs_test() {
          let l = Cons(2, Cons(-3, Cons(0, Vide)))
          assert liste.positifs(Vide) == Vide
          assert liste.positifs(l) == Cons(2, Vide)
        }
        ```

    <div markdown="block" style="display: none">
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
    </div>

!!! question "negatifs"
    Écris `negatifs(lst: Liste(Int)) -> Liste(Int)`, qui garde les éléments **strictement négatifs**. `2 -> -3 -> 4` donne `-3`.

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn negatifs_test() {
          let l = Cons(2, Cons(-3, Cons(0, Vide)))
          assert liste.negatifs(Vide) == Vide
          assert liste.negatifs(l) == Cons(-3, Vide)
        }
        ```

    <div markdown="block" style="display: none">
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
    </div>

**Ce qu'elles ont en commun.** Compare les trois corrigés : ils sont **identiques**, seule la **condition** change (`t % 2 != 0`, `t > 0`, `t < 0`). Écrire une fonction par condition, c'est se répéter. L'idée : **passer la condition en paramètre**. On obtient une seule fonction, `filter` (c'est son nom partout, dans tous les langages) :

```gleam
pub fn filter(predicat: fn(a) -> Bool, lst: Liste(a)) -> Liste(a) {
  case lst {
    Vide -> Vide
    Cons(t, q) ->
      case predicat(t) {
        True -> Cons(t, filter(predicat, q))
        False -> filter(predicat, q)
      }
  }
}
```

`predicat` est **une fonction** (elle prend un élément et renvoie un booléen). Les trois fonctions deviennent alors un seul appel, avec la bonne condition écrite **sur place** (une fonction anonyme `fn(x) { ... }`) :

```gleam
filter(fn(x) { x % 2 != 0 }, lst)   // les impairs
filter(fn(x) { x > 0 }, lst)        // les positifs
filter(fn(x) { x < 0 }, lst)        // les négatifs
filter(fn(x) { x % 2 == 0 }, lst)   // les pairs, sans écrire une ligne de plus
```

!!! question "filter"
    Recopie `filter` dans `src/liste.gleam`, et vérifie-la.

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn filter_test() {
          let l = Cons(2, Cons(-3, Cons(4, Vide)))
          assert liste.filter(fn(x) { x > 0 }, Vide) == Vide
          assert liste.filter(fn(x) { x > 0 }, l) == Cons(2, Cons(4, Vide))
        }
        ```

#### 4.2.3 Par transformation : vers `map`

Cette fois, on ne **garde** pas : on **transforme** chaque élément. Écris ces trois fonctions.

!!! question "carres"
    Écris `carres(lst: Liste(Int)) -> Liste(Int)`, qui renvoie les **carrés**. `2 -> 3 -> 4` donne `4 -> 9 -> 16`.

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn carres_test() {
          let l = Cons(2, Cons(3, Cons(4, Vide)))
          assert liste.carres(Vide) == Vide
          assert liste.carres(l) == Cons(4, Cons(9, Cons(16, Vide)))
        }
        ```

    <div markdown="block" style="display: none">
    ??? success "Corrigé Gleam"
        ```gleam
        pub fn carres(lst: Liste(Int)) -> Liste(Int) {
          case lst {
            Vide -> Vide
            Cons(t, q) -> Cons(t * t, carres(q))
          }
        }
        ```
    </div>

!!! question "doubles"
    Écris `doubles(lst: Liste(Int)) -> Liste(Int)`, qui renvoie les **doubles**. `2 -> 3 -> 4` donne `4 -> 6 -> 8`.

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn doubles_test() {
          let l = Cons(2, Cons(3, Cons(4, Vide)))
          assert liste.doubles(Vide) == Vide
          assert liste.doubles(l) == Cons(4, Cons(6, Cons(8, Vide)))
        }
        ```

    <div markdown="block" style="display: none">
    ??? success "Corrigé Gleam"
        ```gleam
        pub fn doubles(lst: Liste(Int)) -> Liste(Int) {
          case lst {
            Vide -> Vide
            Cons(t, q) -> Cons(2 * t, doubles(q))
          }
        }
        ```
    </div>

!!! question "triples"
    Écris `triples(lst: Liste(Int)) -> Liste(Int)`, qui renvoie les **triples**. `2 -> 3 -> 4` donne `6 -> 9 -> 12`.

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn triples_test() {
          let l = Cons(2, Cons(3, Cons(4, Vide)))
          assert liste.triples(Vide) == Vide
          assert liste.triples(l) == Cons(6, Cons(9, Cons(12, Vide)))
        }
        ```

    <div markdown="block" style="display: none">
    ??? success "Corrigé Gleam"
        ```gleam
        pub fn triples(lst: Liste(Int)) -> Liste(Int) {
          case lst {
            Vide -> Vide
            Cons(t, q) -> Cons(3 * t, triples(q))
          }
        }
        ```
    </div>

**Même constat.** Les trois corrigés sont identiques, seule la **transformation** change (`t * t`, `2 * t`, `3 * t`). On la passe en paramètre : c'est `map`, et c'est là aussi son nom partout.

```gleam
pub fn map(f: fn(a) -> b, lst: Liste(a)) -> Liste(b) {
  case lst {
    Vide -> Vide
    Cons(t, q) -> Cons(f(t), map(f, q))
  }
}
```

```gleam
map(fn(x) { x * x }, lst)   // les carrés
map(fn(x) { 2 * x }, lst)   // les doubles
map(fn(x) { 3 * x }, lst)   // les triples
```

!!! question "map"
    Recopie `map` dans `src/liste.gleam`, et vérifie-la.

    ??? info "Le test, à coller dans `test/liste_test.gleam`"
        ```gleam
        pub fn map_test() {
          let l = Cons(2, Cons(3, Cons(4, Vide)))
          assert liste.map(fn(x) { x * x }, Vide) == Vide
          assert liste.map(fn(x) { x * x }, l) == Cons(4, Cons(9, Cons(16, Vide)))
        }
        ```

!!! tip "`filter` choisit, `map` transforme"
    `filter` **garde** ou **jette** des éléments (la liste peut rétrécir), alors que `map` **transforme** chaque élément (la liste garde sa taille). Ce sont deux outils très courants, et tu viens de les redécouvrir en remarquant que plusieurs fonctions n'en faisaient qu'une.

## 5 Tout cela n'était qu'un seul pli

Tu as factorisé deux fois. Les quatre fonctions qui gardaient des éléments n'en faisaient qu'une, `filter`, et les trois qui les transformaient n'en faisaient qu'une, `map`. On peut aller une fois de plus, et cette fois c'est presque tout le chapitre qui tombe.

Mets côte à côte `somme` et `map`, et regarde ce qui change vraiment :

```gleam
Vide -> 0                             Vide -> Vide
Cons(t, q) -> t + somme(q)            Cons(t, q) -> Cons(f(t), map(f, q))
```

Même squelette. Deux choses seulement changent : **ce qu'on rend sur `Vide`**, et **ce qu'on fait de la tête et du résultat de l'appel sur la queue**. On les passe toutes les deux en paramètre.

```gleam
pub fn foldr(lst: Liste(a), f: fn(a, b) -> b, depart: b) -> b {
  case lst {
    Vide -> depart
    Cons(t, q) -> f(t, foldr(q, f, depart))
  }
}
```

!!! warning "Le piège, et il est unique"
    Le second paramètre de `f` n'est **pas la queue**. C'est le **résultat déjà calculé** de l'appel sur la queue. C'est pour cela qu'on l'appelle `reste` ci-dessous et jamais `queue` : quand `f` est appelée, le travail sur la queue est **fini**, il ne reste qu'à en faire quelque chose.

    C'est le lutin faignant une dernière fois : il reçoit sa tête d'un côté, la réponse de son voisin de l'autre, et il n'a plus qu'à les combiner.

Et voilà des fonctions entières du chapitre, en une ligne chacune.

```gleam
pub fn taille(lst: Liste(a)) -> Int {
  foldr(lst, fn(_, reste) { 1 + reste }, 0)
}

pub fn somme(lst: Liste(Int)) -> Int {
  foldr(lst, fn(t, reste) { t + reste }, 0)
}

pub fn concat(l1: Liste(a), l2: Liste(a)) -> Liste(a) {
  foldr(l1, fn(t, reste) { Cons(t, reste) }, l2)
}

pub fn map(f: fn(a) -> b, lst: Liste(a)) -> Liste(b) {
  foldr(lst, fn(t, reste) { Cons(f(t), reste) }, Vide)
}
```

Lis `concat` deux fois : on part de `l2` au lieu de `Vide`, on recolle chaque tête par-dessus, et c'est tout. La concaténation est un pli qui ne change rien, sauf son point de départ.

!!! question "À toi"
    Ces quatre-là sont **montrées**, pas à recopier : tu les as déjà dans ton fichier. Prends-en trois autres, `tous_vrais`, `au_moins_un_vrai` et `filter`, et **remplace tes versions** par des plis, sans aucun `case` sur la liste.

    Puis relance `gleam test`. **Les tests que tu as déjà collés doivent rester verts** : ce sont les mêmes fonctions, écrites autrement. Tu n'as donc aucun test à ajouter, et c'est la meilleure preuve que tu puisses avoir.

    <div markdown="block" style="display: none">
    ??? success "Corrigé Gleam"
        ```gleam
        pub fn tous_vrais(lst: Liste(Bool)) -> Bool {
          foldr(lst, fn(t, reste) { t && reste }, True)
        }

        pub fn au_moins_un_vrai(lst: Liste(Bool)) -> Bool {
          foldr(lst, fn(t, reste) { t || reste }, False)
        }

        pub fn filter(predicat: fn(a) -> Bool, lst: Liste(a)) -> Liste(a) {
          foldr(
            lst,
            fn(t, reste) {
              case predicat(t) {
                True -> Cons(t, reste)
                False -> reste
              }
            },
            Vide,
          )
        }
        ```
    </div>

### 5.1 Ce que le pli ne sait pas faire

Sur les vingt-trois fonctions des exercices, **dix-sept** s'écrivent ainsi. Les six autres résistent, et elles résistent pour trois raisons qui valent d'être vues.

- `take`, `drop` et `slice` doivent transporter un **compteur**, que le pli ne prévoit pas.
- `supprimer` enlève la **première** occurrence, or `foldr` travaille depuis la **droite** : écrit naïvement avec un pli, il enlève la dernière.
- `sont_egales` regarde **deux** listes à la fois, le pli n'en consomme qu'une.
- `repete` ne consomme **aucune** liste, il en fabrique une à partir d'un entier. Ce n'est pas un pli du tout, c'est son exact contraire.

Un outil qui couvre dix-sept cas sur vingt-trois est un bon outil. Un outil dont tu sais nommer les six qu'il ne couvre pas est un outil que tu maîtrises.

??? note "Pour aller plus loin : ce pli porte un nom"
    `foldr` s'appelle un **catamorphisme**, du grec *kata*, « vers le bas » : il descend la structure et la réduit. Son contraire, qui fabrique une structure à partir d'une graine, comme `repete`, s'appelle un **anamorphisme**, *ana*, « vers le haut ».

    Les deux viennent d'un article de 1991 au titre inoubliable, Meijer, Fokkinga et Paterson, *Functional Programming with Bananas, Lenses, Envelopes and Barbed Wire*, qui les note avec quatre sortes de crochets, d'où le titre. On y lit noir sur blanc que `filter` est un catamorphisme, au même titre que `length`.

    La bibliothèque standard de Gleam a les siens, `list.fold` et `list.fold_right`, et Python a `functools.reduce`.

## 6 Et maintenant, en Python

Tu as les algorithmes. Il reste à les écrire dans le langage de l'épreuve, et c'est l'objet de la page suivante : [Transcription en Python](transcription-python.md). La structure y est la même, portée par des primitives `vide`, `cons`, `tete`, `queue` et `est_vide`, et chaque fonction y retrouve la sienne.
