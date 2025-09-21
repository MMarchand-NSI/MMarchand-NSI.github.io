# Listes - Paradigme fonctionnel


!!! danger "Attention"
    Ici, nous ne parlons pas du tout des listes python. Nous n'en utiliserons d'ailleurs pas. Les listes python ne sont pas des listes à proprement parler. Ce sont en réalité ce qu'on appelle des tableaux dynamiques.

## Définition

Les **listes** sont une structure de données linéaire qui permet de stocker une séquence d'éléments. Il existe une multitude de manière de les implémenter. Nous en verrons 2. 

Les listes sont un outil formidable pour **faire ses premiers pas en récursivité**. C'est aussi l'occasion de découvrir le paradigme fonctionnel, et aussi d'aller juste un peu plus loin dans le paradigme orienté objet.


**Ici, nous allons créer des listes IMMUABLES**, ce qui signifie qu'elles ne peuvent pas être modifiées une fois créées. **Toute opération qui dit "modifier" une liste renvoie une nouvelle liste**


!!!abstract "Définition récursive"
    Nous travaillerons avec des listes où chaque élément est un entier. 

    Chaque liste peut être toit:

    1. **vide**
    2. Contenir un élément appelé la **tête**, suivi de la **queue**, qui est une autre liste.

Nous définissons une liste à l'aide de sa propre définition. Nous travaillons sur une structure définie récursivement.

## Implémentation en python

Nous utiliserons des tuples pour contenir une liste car les tuples sont immuables, ils collent bien au cadre de la programmation fonctionnelle.

Nous matérialiserons la liste vide par un tuple vide.

Une liste non vide sera un tuple contienant 2 éléments, la tête, ainsi que la queue.

Le tuple suivant représente une liste où la tête est `2`, et la queue est une liste dont la tête est `3`, suivie d'une liste ou la tete est 4, suivie elle-même de la liste vide.

```python
(2, (3, (4, ())))
```

### Traduction de notre définition en python:

```python
type Vide = tuple[()]

type Liste[T] = Vide | tuple[T, Liste[T]]
```
Nous créons ici deux types :

- `Vide` représente le vide modélisé par un tuple vide.
- `Liste` est une structure définie récursivement qui peut être soit vide, soit un tuple: tête (T) et queue(Liste[T]).


## Primitives et implémentations

### Création d'une Liste

Il y a deux opérations de création élémentaires qui correspondent aux deux cas de la définition:
- **Créer Vide** : Créer une liste vide
- **Créer** : Créer une nouvelle liste à partir d'un élément et d'une autre liste, ce qui revient à **ajouter un élément au début de la liste**

Une fonction pour creer une liste vide

```python
def creer_vide[T]() -> Liste[T]:
    return ()
```

Une fonction pour  en paramètre :
```python
def creer[T](t: T, q: Liste[T]) -> Liste[T]:
    return (t, q)
```
Elle prend deux arguments :

- `t` : la tête (l'élément à ajouter).
- `q` : la queue (la liste suivante).

### Accès aux Éléments
Les opérations d'accès principales sont :
- **Tête** : obtenir le premier élément de la liste.
- **Queue** : obtenir la sous-liste à partir du deuxième élément.
- **Est Vide** : Savoir si une liste est vide.

```python
def tete[T](lst: Liste[T]) -> T:
    assert len(lst) == 2, "Liste vide"
    return lst[0]

def queue[T](lst: Liste[T]) -> Liste[T]:
    assert len(lst) == 2, "Liste vide"
    return lst[1]

def est_vide(lst: Liste) -> bool:
    return lst == ()
```


!!! danger "Attention"
    A partir de maintenant, nous n'utiliserons plus les tuples.
    Nous n'utiliserons que les fonctions que nous avons définies ainsi que la constante LISTE_VIDE.
 
## Fonctions en lecture


### Calculer la Taille d'une Liste
```python
def taille(lst: Liste) -> int:
    if est_vide(lst):
        return 0
    return 1 + taille(queue(lst))
```


!!! question "A vous"
    Ecrivez toutes les autres fonctions demandées.
    On réalisera une disjonction de cas au papier avant de coder. 

## Fonctions en création

!!! danger "Attention"
    Bien comprendre que ces listes sont immuables. On ne peut pas les modifier. Par "Insérer", on entendra "Renvoyer une liste dans laquelle on a inséré".

### Ajouter un Élément à la fin

```python
def ajouter_debut(e: int, lst: liste) -> liste:
    if est_vide(lst):
        return creer(e, ())
    else:
        return creer(tete(lst), ajouter_fin(queue(lst)))
```

Si on reprend la métaphore des lutins.

![alt text](image.png)

Je suis un lutin-ajouteur. J'ai 2 possibilités:

- Si on me donne une **liste vide** et qu'on me dit d'y ajouter l'élément e, je renvoie une liste ne comportant que l'élément e
- Sinon, c'est qu'on me donne une **liste avec une tete et une queue**. Alors je créé une liste avec la même tête, et pour la queue, je demande à un autre lutin d'y insérer e et de me la renvoyer.


!!! question "A vous"
    Ecrivez toutes les autres fonctions demandées.
    On réalisera une disjonction de cas au papier avant de coder. 

