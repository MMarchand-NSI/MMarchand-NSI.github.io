# Les booléens

Le **booléen** est le plus petit type de donnée : il ne peut prendre que **deux valeurs**. On les note au choix :

- $0$ ou $1$ ;
- Faux ou Vrai (en Python : `False` et `True`).

Une seule case à deux états suffit donc à le stocker : un booléen tient sur **un seul bit**. C'est la brique la plus élémentaire de toute l'information, celle à partir de laquelle tout le reste est construit.

## Les opérateurs booléens

À partir de booléens, on calcule de nouveaux booléens grâce à trois opérateurs de base (en Python : `and`, `or`, `not`).

| Opérateur | Sens | Vrai quand... |
| --- | --- | --- |
| `not a` | NON | `a` est faux |
| `a and b` | ET | `a` **et** `b` sont vrais tous les deux |
| `a or b` | OU | `a` **ou** `b` (ou les deux) est vrai |

```python
age = 16
print(age >= 15 and age < 18)   # True
print(not (age == 18))          # True
```

!!! note "Le OU n'est pas exclusif"
    En langage courant, « fromage ou dessert » veut dire l'un **ou** l'autre, mais pas les deux. En informatique, `or` est **inclusif** : `a or b` est vrai dès que l'un au moins est vrai, **y compris si les deux le sont**.

## Expressions booléennes et tables de vérité

Une **expression booléenne** combine des valeurs et des opérateurs, par exemple `a and (not b)`. Comme un booléen n'a que deux valeurs, on peut lister **tous les cas possibles** dans une **table de vérité**.

Pour `a and (not b)`, il y a $2 \times 2 = 4$ combinaisons :

| `a` | `b` | `not b` | `a and (not b)` |
| --- | --- | --- | --- |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 0 |
| 1 | 0 | 1 | **1** |
| 1 | 1 | 0 | 0 |

!!! question "Exercice : dresser une table de vérité"
    Dressez la table de vérité de l'expression `(a or b) and (not a)`.

    ??? warning "Corrigé"
        | `a` | `b` | `a or b` | `not a` | résultat |
        | --- | --- | --- | --- | --- |
        | 0 | 0 | 0 | 1 | 0 |
        | 0 | 1 | 1 | 1 | **1** |
        | 1 | 0 | 1 | 0 | 0 |
        | 1 | 1 | 1 | 0 | 0 |

        L'expression n'est vraie que lorsque `b` est vrai et `a` est faux.

!!! abstract "Méthode systématique et notation mathématique"
    La méthode complète pour construire une table de vérité, la notation mathématique ($\bar{a}$, $a.b$, $a+b$) et les lois de la logique sont traitées dans le cours [Logique booléenne](../architecture/logique/logique.md).

## Le ou exclusif (xor)

Le **ou exclusif**, noté **xor**, est vrai quand les deux entrées sont **différentes** (l'une ou l'autre, mais pas les deux).

| `a` | `b` | `a xor b` |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | **1** |
| 1 | 0 | **1** |
| 1 | 1 | 0 |

## Le caractère séquentiel des opérateurs

En Python, `and` et `or` sont évalués **de gauche à droite**, et l'évaluation **s'arrête dès que le résultat est connu**. C'est ce qu'on appelle l'évaluation séquentielle (ou « court-circuit »).

- Pour `a and b` : si `a` est faux, le résultat est déjà faux, et `b` n'est **pas** évalué.
- Pour `a or b` : si `a` est vrai, le résultat est déjà vrai, et `b` n'est **pas** évalué.

```python
x = 0
# Grâce au court-circuit, on teste x avant de diviser :
if x != 0 and 10 / x > 1:
    print("ok")
```

Ici `x != 0` est faux, donc `10 / x` n'est jamais calculé : on évite la division par zéro. L'ordre des deux conditions est important.

## Application : l'addition binaire

Les opérateurs booléens ne sont pas que théoriques : ils **réalisent le calcul**. L'addition de deux bits, par exemple, se décrit entièrement avec `xor` et `and` :

- le **bit de résultat** est `a xor b` ;
- la **retenue** est `a and b`.

C'est exactement le mécanisme de l'addition posée que vous avez vue avec les [entiers relatifs](4-relatifs.md). En enchaînant ces opérations sur des circuits, la machine additionne réellement des nombres.

!!! info "Pour aller plus loin : des booléens au matériel"
    Comment ces opérations deviennent des composants physiques (portes logiques, additionneur) est expliqué dans [Logique booléenne](../architecture/logique/logique.md) et [Circuits logiques](../architecture/logique/circuits_logiques.md).
