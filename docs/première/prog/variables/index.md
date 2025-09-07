# Les variables


## Qu'est-ce que c'est?

!!! abstract "Le plus important"
    **Une variable est le seul moyen de se souvenir d'une information entre les instructions d'un programme.**

    **Toute information qui n'est pas stockée dans une variable est perdue.**

    **Toute nouvelle information stockée dans une variable 'efface' la précédente information.**

    **Les variables sont stockées sous forme binaire dans la mémoire de l'ordinateur: la RAM**

L'image suivante montre une barette de RAM de 128Go

![Barette de 128Go](image-1.png)

Il faut voir une variable comme une boîte avec une étiquette qui est le nom de la variable.

TODO mettre image de boite

!!! danger "Ecriture dans une variable"
    Pour mettre quelque chose dans une variable, on utilise l'opérateur `=`.
    On dit que c'est un opérateur d'affectation.

    ```python
    a = 4
    ```

    **Attention** `=` ne représente pas l'égalité, il sert à mettre le résultat de ce qui est à droite dans la variable désignée à gauche, c'est une opération mécanique.

    Si la variable n'existe pas déjà, elle est crée, sinon, son contenu est remplacé.


!!! question "Exercice"
    ```python
    truc = 4  # On affecte 4 à truc
    truc = 3
    ```
    Que vaut truc à la fin de l'exécution de ces deux instructions?


!!! danger "Lecture d'une variable"
    On peut utiliser le contenu d'une variable dans une expression en écrivant juste son nom.


!!! question "Exercice"
    ```python
    truc = 2
    print(truc)
    bidule = truc + 5
    print(bidule + truc)
    ```

    Déterminer ce qui sera affiché à l'écran lorsque ce programme va s'exécuter.


## Type d'une variable

Toute variable a un type qui désige le genre d'information stockée dans la variable. Ici, nous avons uniquement créé des variables de type "entier".
