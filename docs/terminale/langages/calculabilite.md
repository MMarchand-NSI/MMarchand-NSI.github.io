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

Elle est constituée d'un ruban infini comportant des cases.



## La calculabilité ne dépend pas du langage

Il faut bien comprendre que la calculabilité ne dépend pas du langage qu'on veut utiliser, et pour cause, tous les langages de programmation turing-complets sont théoriquement équivalents.

Un langage de programmation est dit Turing-complet s'il peut exprimer au moins ce qu'une machine de Turing exprime.

Etant donné qu'une machine de Turing universelle peut calculer tout ce qui est calculable, le langage le pourra aussi.
