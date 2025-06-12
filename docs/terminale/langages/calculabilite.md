# Calculabilité et Décidabilité


## Un programme est une donnée

**Exemple 1**

Un exemple bien concret pour s'en rendre compte est le processus de compilation d'un programme.

Vous avez exécuté cette commande pour compiler du code C++:

```bash
g++ -o liste liste.cpp
```

Le compilateur g++ est un programme chargé de traduire votre proramme écrit en C++ en programme écrit en langage machine.

les programmes prennent en entrée des données. Ici, le programme g++ prend votre programme C++ en entrée. Votre programme C++ est donc une donnée.

Le programme `liste` généré en langage machine est lui même une donnée que va lire le CPU pour l'exécuter.

Plus généralement, on peut considérer que toute information est une donnée.

**Exemple 2**

Soit une liste de points, ainsi que la fonction qui renvoie la distance à l'origine d'un point.

```python
points = [(8, 6), (0, 0), (-4, 9)]

def distance_org(p: tuple[float, float]):
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
    Un problème est calculable s'il existe un algorithme qui le résoud en temps fini pour toutes les entrées possibles.

!!! abstract "Décidabilité"
    La décidabilité est un sous-ensemble de la calculabilité. La décidabilité ne s'intéresse qu'aux problèmes dont la réponse est oui ou non.


### Machine de Turing

Une machine de turing est un concept abstrait. Il existe une définition très formelle de ce qu'est une machine de Turing, mais ça n'est pas l'objectif ici.
On peut considérer une machine de Turing comme un automate possédant des états.

[Site de simulation](https://turingmachine.io/)


## La calculabilité ne dépend pas du langage

Il faut bien comprendre que la calculabilité ne dépend pas du langage qu'on veut utiliser, et pour cause, tous les langages de programmation turing-complets sont théoriquement équivalents.

Un langage de programmation est dit Turing-complet s'il peut exprimer au moins ce qu'une machine de Turing exprime.

Etant donné qu'une machine de Turing universelle peut calculer tout ce qui est calculable, le langage le pourra aussi.


## Problème de l'arrêt:

Existe-t-il une fonction arrêt(A, D) qui détermine si oui ou non tout programme A s'arrête pour toute donnée D?

Non.

Le problème de l'arrêt est indécidable.

### Preuve la plus connue

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
    """Fonction dont on sait pour sûr qu'elle ne s'arrêtera pas pour elle même en entrée"""
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

Si un tel programme existait, des problèmes comme la conjecture de Collatz trouveraient leur solution.
Pour tous ces types de problèmes, il suffirait d'écrire un programme testant toutes les possibilités et d'y appliquer la fonction d'arrêt.


L'output de ce programme nous indiquerait si le programme s'arrête ou pas, ce que nous ne savons pas déterminer en l'état actuel des connaissances.

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

def toutes_les possibilites():
    n = 1
    while syracuse(n):
        n += 1

print(arret(toutes_les possibilites, ()))

```

