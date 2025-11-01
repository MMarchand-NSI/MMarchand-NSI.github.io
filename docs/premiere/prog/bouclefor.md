# Parcourir des itérables

![alt text](image-1.png)

!!! abstract "Itérable"
    Un itérable est un ensemble duquel on peut énumérer un par un les éléments.

    Par exemple, la classe est un itérable. Je peux PARCOURIR la liste des élèves pour faire l'appel, et appliquer à chaque élève la même procédure.

    ```md
    Pour "chaque élève X" dans "la classe":   -> Enonciation du parcours
        - Appeler X
        - Attendre la réponse de X
        - Si X ne répond pas:
            - Enregistrer X dans la liste des absents    
    ```

    Parmi les itérables, on retrouve les séquences.

    - Chaine de caractères (str)
    - Listes (list)
    - Tuples (tuple)


!!! danger "Parcourir un itérable"
    Parcourir un itérable veut dire récupérer chacun de ses éléments, un par un.

    `for` est une boucle qui permet de parcourir un itérable.

    Par exemple, pour dire:
    ```Pour tous les éléments `elt` du tuple (3, (8, 'a'), 9), afficher `e` ```

    ```python
    for elt in (3, (8, 'a'), 9):
        print(e)
    
    >>> 3
    >>> (8, 'a')
    >>> 9
    ```

    Ici on parcourt le tuple `(3, (8, 'a'), 9)`.

    A chaque répétition, la variable `e` prendra les valeurs `3`, PUIS `(8, 'a')` PUIS `9`.
    

!!! exercice "Exercice"
    
    ```python
    mot = "Dracofeu"
    ```

    Affiche une par une les lettres de `mot`.


!!! danger "Parcourir un intervalle d'entiers"
    Intervalle se dit $range$ en anglais.

    ```python
    range(1, 10)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]
    range(0, 8)   # [0, 1, 2, 3, 4, 5, 6, 7]
    range(8)      # [0, 1, 2, 3, 4, 5, 6, 7]
    ```

    `range(a, b)` représente l'intervalle d'entiers de $a$ à $b$ exclus. 

    Si a est supérieur à b, alors range(a, b) est vide.

    range est un itérable, donc, en toute logique:

    ```python
    for i in range(5, 9):
        print(i)
    ```
    Le code ci-dessus signifie:

    ```md
    Pour "chaque i" dans "l'intervalle de 5 à 9 exclus":
        - Afficher i
    ```

