# Parcourir des itérables



A partir de ce cours, nous allons pouvoir commencer à résoudre des problèmes plus réalistes.

## Qu'est-ce qu'un itérable ?

!!! abstract "Itérable"
    Un itérable est un ensemble duquel on peut énumérer un par un les éléments.

    Par exemple, la classe est un itérable. Je peux PARCOURIR la liste des élèves pour faire l'appel, et appliquer à chaque élève la même procédure.

    ```md
    Pour "chaque élève X" dans "la classe":   -> Définition du parcours
        - Appeler X
        - Attendre la réponse de X
        - Si X ne répond pas:
            - Enregistrer X dans la liste des absents    
    ```

    **TOUTE SEQUENCE EST ITERABLE**

    - Chaine de caractères (str)
    - Listes (list)
    - Tuples (tuple)


!!! danger "Parcourir un itérable"
    Parcourir un itérable veut dire récupérer chacun de ses éléments, un par un.

    `for` est un mot clé qui permet de parcourir un itérable. C'est son job.

    Par exemple, pour dire:
    ```Pour tous les éléments `elt` du tuple (3, (8, 'a'), 9), afficher `elt` ```

    On écrit:

    ```python
    for elt in (3, (8, 'a'), 9):
        print(elt)
    
    >>> 3
    >>> (8, 'a')
    >>> 9
    ```

    Ici on parcourt le tuple `(3, (8, 'a'), 9)`.

    A chaque répétition, la variable `e` prendra les valeurs `3`, PUIS `(8, 'a')` PUIS `9`.
    
## Itérer sur des entiers

!!! danger "Parcourir un intervalle d'entiers"

    Intervalle se dit $range$ en anglais.

    Un range et un itérable.

    ```python
    range(-1, 3)  # -1 -> 0 -> 1 -> 2
    range(0, 4)   # 0 -> 1 -> 2 -> 3
    ```

    `range(a, b)` représente l'intervalle des entiers de $a$ à $b$ exclus. 

    Si a est supérieur à b, alors range(a, b) est vide.

    La logique d'itérable s'y applique tout simplement:

    ```python
    for i in range(5, 9):
        print(i)
    ```
    Le code ci-dessus signifie:

    ```md
    Pour "chaque entier i" dans l'intervalle de "5 à 9 exclus":
        - Afficher i
    ```

    **Propriété remarquable**:

    Vu que `b` est exclu, `b - a` représente le nombre d'entiers dans l'intervalle. 

---

## Parcours de séquence

Il existe 2 manières de parcourir une séquence. Il faut les connaître.

### Parcours par élément

C'est celui qui est présenté au début du cours: `Pour chaque élément`

### Parcours par indice

Rappels hyper importants:

- Une séquence `s` a pour taille `len(s)`.
- Ses indices vont de `0` à `len(s) - 1`.

Ici, on va parcourir LES INDICES de la séquence. Donc les entiers de 0 à `len(s) - 1` INCLU. Ce qui revient à dire qu'on va parcourir les entiers de 0 à `len(s)` EXCLU.

```python
s = ["coucou", "les", "gens"]
for i in range(0, len(s)):   # Pour chaque entier i de 0 à len(s)-1
    print(s[i])              # Faire quelque chose avec l'élément de s à l'indice i
```

!!! danger "Précautions"
    Un algorithme ne sera pas correct "au hasard". Lorsqu'on aborde le parcours par indice, il faut passer un temps à se demander à quel indice ça finit.

### Choix du parcours

On essaiera de privilégier le parcours par élément lorsque c'est possible. Parce que le code produit est plus léger à lire, donc plus compréhensible.

Parfois, le parcours par élément ne permettra pas de résoudre le problème. Il faudra alors utiliser le parcours par indice.

Lorsqu'on aborde un exercice, on doit savoir avant tout:

- Ce qu'on parcourt
- Comment on le parcourt


## ACCUMULATION -> FONDAMENTAL

Une fois que vous avez bien compris comment fonctionne le parcours des itérables, nous pouvons enfin commencer à parler de techniques de résolution de problèmes. Les exercices commencent très vite sur cette technique, car c'est le minimum.

La technique présentée ici s'appelle l'**ACCUMULATION**:

- Elle est omniprésente
- On ne peut rien faire sans la maîtriser

Elle sert à **construire progressivement un résultat** dans une variable qu'on appelle l'accumulateur.

Exemple, pas à pas, pour le calcul de la somme des entiers de 1 à $n$ dans une liste:

1. Tout d'abord, il nous faut un accumulateur qui représente notre résultat. On va l'appeler `res` comme résultat. Une somme d'entier est un entier, donc le type du résultat c'est `int`. Il vaut 0 car on n'a encore rien ajouté.
    ```python
    res: int = 0
    ```
2. On va parcourir les entiers de $1$ à $n$, donc on est sur l'intervalle $[1, n+1)$
    ```python
    for i in range(1, n+1):
    ```
3. A chaque fois qu'on rencontre un nouvel entier, on va l'ajouter au résultat. C'est le comportement d'accumulation pour obtenir une somme.
    ```python
        res = res + i
    ```
4. Lorsque la boucle se terminera, nous aurons bien parcouru tous les entiers, et ils auront tous été ajoutés à 0.
    ```python
    print(res)
    ```

!!! danger "Méthodologie"
    1. Je réfléchis au type de mon résultat. J'initialise correctement mon résultat.
    2. Qu'est-ce que je dois parcourir? J'acris correctement mon parcours
    3. Dasn mon parcours, j'applique à chaque élément le comportement d'accumulation voulu par le problème.

---

## Exercices


### Parcours

!!! question "1 - Parcours simple"
    
    ```python
    mot = "Dracofeu"
    ```

    Affiche une par une les lettres de `mot`:

    - Par élément
    - Par indice

!!! question "2 - Affichage"

    On peut typer n'importe queel séquence (n'apprenez pas ça)

    ```python
    from collections.abc import Sequence   # A mettre en haut du fichier
 
    def afficher_seq(s : Sequence):
        """
        Affiche un à un les éléments d'une séquence

        >>> afficher_seq("ab")
        a
        b
        >>> afficher_seq((3, 9, 2))
        3
        9
        2
        >>> afficher_seq(range(1, 4))
        1
        2
        3
        """
        pass
    ```

!!! question "3 - 1 sur 2"
    Ecrire une fonction qui prend une chaîne de caractère en paramètre. Elle renvoie une chaîne de caractères où seulement 1 caractère sur 2 est présent.

    ```python
    def un_sur_2(txt: str) -> str:
        """
        revoie la str contenant un élément sur 2

        >>> un_sur_2("abcdef")
        'ace'
        >>> un_sur_2("AZE")
        'AE'
        >>> un_sur_2("")
        ''
        """
        pass
    ```

!!! question "3 - Nombre de voyelles"
    Complétez la fonction qui lit une chaîne de caractères et affiche le nombre de voyelles présentes dans cette chaîne. (complétez le type de retour)

    On sait qu'on veut COMPTER le nombre de voyelles. Que vaut le résultat au début de la fonction?

    ```python
    def nb_voyelles(txt: str) -> ...:
        """
        renvoie le nombre de voyelles de txt

        >>> nb_voyelles("bonjour")
        3
        >>> nb_voyelles("")
        0
        >>> nb_voyelles("aeiouy")
        6
        """
        voyelles = ('a', 'e', 'i', 'o', 'u')        
    ```


!!! question "Renverser"
    Ecrire une fonction qui renvoie les caractères d'une chaîne de caractères dans l'autre sens.

    ```python
    def renverser(txt: str) -> str:
        """
        Renverse une chaîne de caractères.

        >>> renverse("banane")
        'enanab'
        >>> renverse("")
        ''
        >>> renverse("a")
        'a'
        """
        pass
    ```

!!! question "contient"
    Ecrire la fonction suivante. On n'utilisera pas l'opérateur `in`.

    ```python
    def contient(e: int, lst: list[int]) -> bool:
        """
        Renvoie si l'élément e est dans la liste lst
        >>> liste = [2, 5, 8, 9]
        >>> contient(5, liste)
        True
        >>> contient(6, liste)
        False
        """
        pass
    ```

!!! question "Take"
    Ecrire une fonction qui renvoie les n premiers caractères d'une chaîne de caractères de telle manière que les tests suivants soient passants.

    ```python
    """
    >>> s = "abcdefg"
    >>> take(0, s)
    ''
    >>> take(4, s)
    'abcd'
    >>> take(14, s)
    'abcdefg'
    >>> take(-4, s)
    ''
    """
    ```

!!! question "Drop"
    Ecrire une fonction  qui renvoie la chaine de caractère sans ses n premiers caractères, de telle manière que les tests suivants soient passants.

    ```python
    """
    >>> s = "abcdefg"
    >>> drop(0, s)
    'abcdefg'
    >>> drop(4, s)
    'efg'
    >>> drop(14, s)
    ''
    >>> drop(-4, s)
    'abcdefg'
    """
    ```

!!! question "Somme"
    Ecrire et tester une fonction `somme` qui prend en paramètres une liste d'entiers et qui renvoie leur somme.

!!! question "Produit"
    Ecrire et tester une fonction `produit` qui prend en paramètres une liste d'entiers et qui renvoie leur produit.

!!! question "Factorielle"
    1. Ecrire et tester une fonction qui calcule $1 \times 2 \times 3 \times ... \times n$, pour un $n$ entier. On appelle cette opération la factorielle de n. On la note $n!$  (qui se lit "n factorielle")
    2. Calculez $0!$ avec votre fonction. que trouvez-vous?

## Problème

ici, il s'agit de créer une fonction bin2dec qui prend en paramètre une chaîne de caractères constituée de 0 et de 1, et qui convertit cette écriture binaire en entier décimal.

Par exemple:
```python
>>> bin2dec("1101")
13
>>> bin2dec("10001000101111")
8751
```

- Dans la fonction, on commencera par renverser la chaîne de caractères, afin que l'indice de chaque chiffre corresponde à sa puissance de 2 dans la décomposition.
- On s'appuiera sur un parcours par indice pour calculer la somme de puissances de 2 par accumulation.

## Algo 1

Les exercices suivants seront repris comme base pour le cours d'algorithmique.
Il faut donc bien comprendre ce qu'il se passe là dedans.

!!! question "Minimum"
    1. Sans utiliser la fonction min, écrire la fonction suivante:
    2. Peut-il y avoir pusieurs valeurs différentes pour le minimum?

    ```python
    def minimum(lst: list[int]) -> int:
        """
        Calcule le minimum d'une liste d'entier.

        >>> minimum([7, 9, 2, 8, 2, 5])
        2
        >>> minimum([])
        """
        assert len(lst) > 0, "Erreur, la liste ne doit pas être vide"
    ```

!!! question "Indice minimum"
    1. Ecrire la fonction suivante
    2. Peut-il y avoir des valeurs différentes pour l'indice du minimum?

    ```python
    def i_minimum(lst: list[int]) -> int:
        """
        Calcule le minimum d'une liste d'entier

        >>> minimum([8, 1, 10, 2)
        3
        >>> minimum([])
        """
        assert len(lst) > 0, "Erreur, la liste ne doit pas être vide"
        ...
    ```

    3. Testez votre fonction sur cette liste: [ 2, 5, 1, 6, 1, 9, 1, 7]
    4. Changez l'inégalité au sens strict pour une inégalité au sens large (ou inversement)
    5. Expliquez plus précisément la description de ce que fait la fonction pour chacun des 2 cas (strict ou large).
    6. Bonus: Ecrivez une fonction qui renvoie la liste des indices minimum (appelé l'ensemble des minorants)
