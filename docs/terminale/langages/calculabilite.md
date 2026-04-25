# Calculabilité et Décidabilité


## Un programme est une donnée

**Exemple 1**

Un exemple bien concret pour s'en rendre compte est le processus de compilation d'un programme.

Vous avez exécuté cette commande pour compiler du code C++:

```bash
g++ -o liste liste.cpp
```

Le compilateur g++ est un programme chargé de traduire votre programme écrit en C++ en programme écrit en langage machine.

Les programmes prennent en entrée des données. Ici, le programme g++ prend votre programme C++ en entrée. Votre programme C++ est donc une donnée.

Le programme `liste` généré en langage machine est lui même une donnée que va lire le CPU pour l'exécuter.

Plus généralement, on peut considérer que toute information est une donnée.

**Exemple 2**

Soit une liste de points, ainsi que la fonction qui renvoie la distance à l'origine d'un point.

```python
points = [(8, 6), (0, 0), (-4, 9)]

def distance_org(p: tuple[float, float]):
    x, y = p
    return (x**2 + y**2)**(0.5)
```

Considérons une fonction comme un sous-programme, donc un programme.

Vous avez déjà vu qu'en python, on peut trier ces points en fonction de leur distance à l'origine grâce à l'appel:

```python
points_tries = sorted(points, key=distance_org)
```

Ici, le programme sorted prend bien en paramètre le programme distance_org.



## Définitions

!!! abstract "Calculabilité"
    Un problème est calculable lorsqu’il existe un algorithme qui donne une réponse correcte en un temps fini pour toute entrée possible.

!!! abstract "Décidabilité"
    Un problème est décidable s'il s’agit d’un problème de décision (réponse "oui" ou "non") pour lequel un algorithme existe et termine toujours. Les problèmes décidables forment un sous-ensemble des problèmes calculables.


### Machine de Turing

Une machine de Turing est un modèle abstrait de ce qu'est le calcul. On peut l'imaginer ainsi :

- Un **ruban infini** découpé en cases, chacune contenant un symbole (0, 1, ou blanc).
- Une **tête de lecture/écriture** qui se déplace case par case, lit le symbole courant, peut l'effacer ou le réécrire, puis se déplace à gauche ou à droite.
- Un **état interne** qui détermine ce que la machine fait à chaque étape.

C'est intentionnellement minimaliste : Turing a montré que ce mécanisme simple suffit à calculer tout ce qui est calculable par un ordinateur réel.

[Site de simulation](https://turingmachine.io/)

!!! question "Exercices"
    Faire les exercices associés à l'automate "binary increment"

## La calculabilité ne dépend pas du langage

Il faut bien comprendre que la calculabilité ne dépend pas du langage qu'on veut utiliser, et pour cause, tous les langages de programmation turing-complets sont théoriquement équivalents.

Un langage de programmation est dit Turing-complet s'il peut exprimer au moins ce qu'une machine de Turing exprime.

Étant donné qu'une machine de Turing universelle peut calculer tout ce qui est calculable, le langage le pourra aussi.


## Il existe plus de problèmes que d'algorithmes

### Les algorithmes sont dénombrables

Un programme est un texte fini sur un alphabet fini (les caractères du clavier). On peut donc les trier : d'abord par longueur, puis alphabétiquement à longueur égale. Cela revient à les **numéroter** : programme n°1, n°2, n°3...

Il y a donc "autant" de programmes que d'entiers naturels. On dit que l'ensemble des programmes est **dénombrable**.

### Les problèmes de décision sont indénombrables

Un problème de décision, c'est l'ensemble des entrées pour lesquelles la réponse est **oui**. Il est entièrement caractérisé par ses solutions.

Par exemple :

- Le problème "est-ce que $n$ est pair ?" est caractérisé par $\{0, 2, 4, 6, \ldots\}$
- Le problème "est-ce que $n$ est premier ?" est caractérisé par $\{2, 3, 5, 7, 11, \ldots\}$

Chaque problème de décision est donc un **sous-ensemble de $\mathbb{N}$**. Le nombre de problèmes est ainsi le nombre de sous-ensembles de $\mathbb{N}$, noté $|\mathcal{P}(\mathbb{N})|$.

On peut représenter chaque sous-ensemble comme une suite infinie de 0 et de 1 (0 = absent, 1 = présent) :

| Entrée $n$ | 0 | 1 | 2 | 3 | 4 | 5 | ... |
|--------|---|---|---|---|---|---|-----|
| Pair ? | 1 | 0 | 1 | 0 | 1 | 0 | ... |
| Premier ? | 0 | 0 | 1 | 1 | 0 | 1 | ... |

La question devient : peut-on numéroter tous les sous-ensembles de $\mathbb{N}$ ? **Non**, et voici pourquoi.

### Argument diagonal de Cantor

Supposons par l'absurde qu'on puisse les lister : $s_1, s_2, s_3, \ldots$

| | pos. 1 | pos. 2 | pos. 3 | pos. 4 | ... |
|--|--|--|--|--|--|
| $s_1$ | **0** | 1 | 0 | 1 | ... |
| $s_2$ | 1 | **1** | 0 | 0 | ... |
| $s_3$ | 0 | 0 | **1** | 1 | ... |
| $s_4$ | 1 | 1 | 0 | **0** | ... |
| ... | | | | | |

Construisons la suite $d$ en lisant la **diagonale** et en **inversant chaque bit** :

$$d = 1,\ 0,\ 0,\ 1,\ \ldots$$

Par construction, $d$ diffère de $s_1$ en position 1, de $s_2$ en position 2, de $s_3$ en position 3... donc $d$ **n'apparaît nulle part** dans la liste. Contradiction.

!!! question "Objection : pourquoi ne pas rajouter $d$ à la liste ?"
    C'est tentant, mais ça ne change rien. L'argument ne dit pas "voilà une liste à laquelle il manque $d$". Il dit : **pour n'importe quelle liste qu'on me donne, je suis capable de construire une suite qui n'y figure pas**.

    Si vous rajoutez $d$ en tête de liste, vous obtenez une nouvelle liste $d, s_1, s_2, s_3, \ldots$ On applique alors le même argument à cette nouvelle liste : on construit $d'$ en inversant le bit en position 1 de $d$, en position 2 de $s_1$, etc. Et $d'$ n'est pas dans cette nouvelle liste non plus.

    On peut répéter l'opération indéfiniment. On ne rattrapera jamais le retard : pour toute liste finie ou infinie que l'on propose, il manquera toujours un élément. C'est exactement ce que signifie "indénombrable".

On ne peut donc pas numéroter toutes les suites binaires infinies. L'ensemble des problèmes de décision est **indénombrable**.

### Conclusion

Il y a strictement plus de problèmes que d'algorithmes. La "plupart" des problèmes n'ont donc aucun algorithme pour les résoudre - non pas parce qu'on n'en a pas encore trouvé, mais parce qu'il est **prouvé** qu'il n'en existe pas.

---

## Problème de l'arrêt

On vient de prouver que des problèmes sans algorithme existent nécessairement. En voici un exemple concret et célèbre.

Existe-t-il un programme `arret(A, D)` qui détermine si oui ou non le programme `A`, lancé sur la donnée `D`, finit par s'arrêter ?

La réponse est **non** : le problème de l'arrêt est indécidable.

### Preuve

L'idée est de supposer qu'un tel programme `arret` existe, puis de construire un programme qui le met en contradiction avec lui-même.

On définit `negation(prog)` ainsi : elle appelle `arret(prog, prog)` (on demande si `prog` s'arrête quand on lui passe lui-même en entrée), puis elle fait **le contraire** de ce que prédit `arret` :

- Si `arret` prédit que `prog` s'arrête → `negation` boucle indéfiniment.
- Si `arret` prédit que `prog` ne s'arrête pas → `negation` s'arrête.

Que se passe-t-il alors quand on appelle `negation(negation)` ?

!!! failure "Cas 1 : supposons que `negation(negation)` s'arrête"
    Alors `arret(negation, negation)` retourne `True`.
    Donc `negation` entre dans la boucle infinie et **ne s'arrête pas**. Contradiction.

!!! failure "Cas 2 : supposons que `negation(negation)` ne s'arrête pas"
    Alors `arret(negation, negation)` retourne `False`.
    Donc `negation` passe dans le `else` et **s'arrête**. Contradiction.

Dans les deux cas on aboutit à une contradiction. L'hypothèse d'existence de `arret` est donc fausse.

!!! note "Lien avec l'argument diagonal de Cantor"
    Ce raisonnement est structurellement identique à celui de Cantor. Cantor construit une suite $d$ qui échappe à toute liste en différant de chaque $s_n$ en position $n$. Ici, `negation` est construite pour faire l'opposé de ce que prédirait `arret` sur elle-même. Dans les deux cas, l'objet construit échappe au système par définition - c'est la même diagonale, appliquée aux programmes plutôt qu'aux suites binaires.

### Code exécutable

```python

def arret(prog, donnee):
    """ 
    #! Supposons que ce programme soit cette fonction
    #* Cette fonction renvoie simplement le booléen ARRET en variable globale
    """
    print(f"Le programme d'arrêt a calculé que le programme {prog} ", end="")
    print("s'arrêtera" if ARRET else "ne s'arrêtera pas", end="")
    print(f" pour la donnée {donnee} ")
    return ARRET

#! Définissons maintenant une autre fonction très simple:

def negation(prog):
    """Cette fonction doit :
        - ne pas s'arrêter si le programme en entrée s'arrête pour lui-même en paramètre
        - s'arrêter si le programme en entrée ne s'arrête pas pour lui-même en paramètre"""
    
    print(f"Début de la fonction {negation} pour {prog}")
    
    if arret(prog, prog):
        print(f"Vu que {prog} s'arrête pour {prog}, {negation} ne s'arrêtera pas pour {prog}")
        while True:
            pass
    else:
        print(f"Vu que {prog} ne s'arrête pas pour {prog}, {negation} s'arrête pour {prog}")


#! Fonctions de test basiques

def sans_arret(x):
    """Fonction dont on sait pour sûr qu'elle ne s'arrêtera pas quand on lui passe elle-même en entrée :
    sans_arret(sans_arret) appelle sans_arret(sans_arret) qui appelle sans_arret(sans_arret)..."""
    return x(x)

def avec_arret(x):
    """
    Fonction dont on sait pour sûr qu'elle s'arrêtera pour elle même.
    Ici, c'est tout simplement la fonction qui renvoie son entrée.
    """
    return x


#! Les tests 3 et 4 montrent une contradiction. 
#! L'hypothèse d'existence d'un algorithme de l'arrêt est donc fausse. 

i = int(input("Entrez un numero de test: "))

if i==0:
    # print s'arrete pour print, la preuve
    print(print)
    ARRET = True
    negation(print)
elif i==1:
    # sans_arret ne s'arretera pas quelle que soit l'entrée
    ARRET = False
    negation(sans_arret)
elif i==2:
    # avec_arret s'arretera quelle que soit l'entrée
    ARRET = True
    negation(avec_arret)
elif i==3:
    #! Contradiction en supposant l'arrêt
    ARRET = True
    negation(negation)
elif i==4:
    #! Contradiction en supposant le non-arrêt
    ARRET = False
    negation(negation)

```

## Si ce programme existait

Si un tel programme existait, des problèmes ouverts comme la **conjecture de Collatz** trouveraient leur solution immédiatement.

La conjecture de Collatz affirme que la suite suivante atteint toujours 1, quel que soit l'entier $n > 0$ de départ :

$$n \mapsto \begin{cases} n/2 & \text{si } n \text{ est pair} \\ 3n+1 & \text{si } n \text{ est impair} \end{cases}$$

Personne ne sait si c'est vrai pour tout $n$. Mais si `arret` existait, il suffirait d'écrire un programme qui teste tous les entiers un par un et de lui demander s'il s'arrête.

```python
def arret(fonction, donnee) -> bool:
    # Si cette fonction existait
    ...

def syracuse(n: int) -> bool:
    while n != 1:
        if n % 2 == 0:
            n = n // 2
        else:
            n = 3 * n + 1
    return True

def toutes_les_possibilites():
    n = 1
    while syracuse(n):
        n += 1

print(arret(toutes_les_possibilites, ()))

```

---

## Conclusion

Ce cours illustre une limite fondamentale et absolue du calcul, indépendante de la puissance des machines ou du génie des programmeurs.

- Il existe **nécessairement** des problèmes sans algorithme (argument de cardinalité).
- Le problème de l'arrêt en est un exemple concret : aucun programme ne peut prédire de façon générale si un autre programme terminera.
- Cette limite a des conséquences pratiques : la vérification automatique complète d'un programme (absence de bug, correction totale) est **impossible en général**. Les outils de vérification formelle existants contournent ce résultat en se restreignant à des classes de problèmes plus étroites.

La calculabilité trace ainsi la frontière entre ce qu'un ordinateur peut faire en principe, et ce qui lui est structurellement interdit.

---

## Les limites absolues de l'intelligence artificielle

On entend souvent que l'IA va "tout révolutionner" ou qu'elle sera bientôt "plus intelligente que l'humain". Ce cours permet de poser une question plus précise : qu'est-ce qu'une IA ne pourra **jamais** faire, quelle que soit sa puissance ?

Il faut distinguer deux catégories de limites très différentes :

| | Limites actuelles | Limites absolues |
|--|--|--|
| Origine | Manque de données, d'algorithmes, de puissance | Résultats mathématiques démontrés |
| Évolution | Peuvent disparaître avec le progrès | Impossibles à franchir, pour toujours |
| Exemples | Traduire parfaitement, conduire sans erreur | Vérifier tout programme, décider tout problème |

### Une IA est un programme

Un modèle d'IA, aussi sophistiqué soit-il, est un programme qui s'exécute sur un ordinateur. Il est donc soumis aux mêmes limites que tout autre programme.

En particulier, **une IA ne peut pas résoudre un problème indécidable**. Ni GPT-4, ni un hypothétique GPT-100, ni aucun système futur ne pourra jamais décider le problème de l'arrêt. Ce n'est pas une question de puissance de calcul : c'est mathématiquement impossible.

### On ne peut pas garantir formellement qu'une IA est correcte

Affirmer qu'une IA "donnera toujours la bonne réponse" revient à affirmer qu'un certain programme s'arrête et produit le bon résultat pour toute entrée. C'est une variante directe du problème de l'arrêt : **indécidable en général**.

Cela signifie qu'aucun outil automatique ne pourra jamais certifier complètement un système d'IA, quelle que soit la sophistication des tests. On peut réduire les erreurs, pas les éliminer par preuve formelle.

### Des questions hors de portée de tout algorithme

Le mathématicien Kurt Gödel a montré (1931) que dans tout système logique suffisamment puissant, il existe des énoncés vrais que le système ne peut pas démontrer. Ce résultat est étroitement lié aux travaux de Turing : une IA ne peut pas, en général, déterminer si un énoncé mathématique est vrai ou faux. Il existe des vérités mathématiques qu'aucune intelligence - artificielle ou humaine - ne démontrera jamais par un procédé algorithmique.

!!! warning "Ce que ce cours ne couvre pas"
    Ces limites absolues sont distinctes des **limites actuelles** de l'IA, qui font l'objet d'autres débats :

    - Pourquoi une IA se trompe sur des tâches apparemment simples (théorie de l'apprentissage)
    - Les biais dans les données d'entraînement (problème statistique et éthique)
    - La difficulté à résoudre certains problèmes en **temps raisonnable**, même s'ils sont décidables (complexité, lié au problème ouvert P = NP)
    - L'alignement : une IA peut optimiser le mauvais objectif sans être "incorrecte" au sens calculatoire

