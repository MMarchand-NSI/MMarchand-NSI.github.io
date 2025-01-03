# Exercices Algorithmique


## Accumulation - types primitifs

!!! example "Mode opératoire"
    - Créez un fichier exos_accumulation.py

    !!! danger "Attention"
        En informatique, on ne met **jamais** d'espace ni de caractère spécial (accents, etc) dans un nom de fichier ou de répertoire.

    Pour chacun de ces exercices, il s'agit :
    
    - d'initialiser une variable résultat
    - de le remplir à l'aide d'un parcours d'itérable
    - de renvoyer le résultat

    Cette manière de faire est extrêmement fréquente et constitue la base de ce que vous devez savoir faire en algorithmique. On dit qu'on accumule progressivement dans le résultat afin de pouvoir le renvoyer.
    La première étape est toujours de bien modéliser le problème en écrivant une signature de fonction appropriée, avec des noms de fonction et de paramètres choisis judicieusement pour qu'ils soient à la fois évocateurs de ce qu'ils représentent, ni trop courts, ni trop longs.

    La première chose à considérer lorsqu'on travaille sur une variable est toujours: "de quelle type est-elle?" La réponse nous informe sur ce qu'on peut faire ou pas avec cette variable d'après le cours. Ca devient naturel et instantané avec de la pratique, mais pour l'instant, vous devez faire l'effort d'y penser.

    Toute fonction devra être testée.


!!! question "Somme des entiers" 
    Écrire et tester une fonction qui renvoie la somme des nombres entiers de 1 jusque n.

!!! question "Produit des entiers > 0" 
    Écrire et tester une fonction qui renvoie le produit des nombres entiers de 1 jusque n.

    On appelle ce nombre $n!$ qui se lit "n factorielle", avec $0! = 1$

!!! question "Nombre de voyelles"
    Écrire une fonction qui lit une chaîne de caractères et affiche le nombre de voyelles présentes dans cette chaîne.

!!! question "Inverser"
    Ecrire une fonction qui renvoie les caractères d'une chaîne de caractères dans l'autre sens. inverser("banane") renvoie "enanab".

!!! question "1 sur 2"
    Ecrire une fonction qui prend une chaîne de caractère en paramètre. Elle renvoie une chaîne de caractères où seulement 1 caractère sur 2 est présent.

!!! question "contient"
    Ecrire une fonction qui renvoie True si une chaîne contient un caractère, False sinon. On n'utilisera pas l'opérateur `in`.

!!! question "Nombre d'occurences"
    Écrire une fonction qui prend en paramètres une chaîne de caractère et un caractère et renvoie le nombre de fois où le caractère apparaît dans la chaîne de caractère.

!!! question "Take"
    Ecrire une fonction qui renvoie les n premiers caractères d'une chaîne de caractères. Si n est supérieur au nombre de caractères, renvoyer la chaîne de caractères entière.

!!! question "Drop"
    Ecrire une fonction qui renvoie une chaîne amputée de ses n premiers caractères. Si n est supérieur au nombre de caractère, renvoyer la chaîne vide.

## Listes

!!! question "Somme"
    Ecrire et tester une fonction `somme` qui prend en paramètres une liste de floats et qui renvoie leur somme.


!!! question "Moyenne"
    Ecrire et tester une fonction `moyenne` qui prend en paramètres ue liste de floats et qui renvoie leur moyenne.


!!! question "Minimum"
    Ecrire et tester une fonction `minimum` qui prend en paramètres une liste d'entiers et qui renvoie le minimum.

    Il faut initialiser le minimum au premier élément de la liste, et pour chaque élément parcouru, mettre à jour le minimum si c'est nécessaire.


!!! question "Maximum"
    Ecrire et tester une fonction `maximum` qui prend en paramètres une liste d'entiers et qui renvoie le minimum, sur le même principe.


!!! question "Tri"
    Le problème du tri est fondamental en informatique. Beaucoup d'algorithmes commencent par trier les données afin de pouvoir utiliser des techniques efficaces.

    Si on ne précise pas l'ordre du tri, on parle de tri par ordre croissant.

    Une liste est triée si chaque élément est plus grand que le precedent.

    Ecrire et tester une fonction `est_triee(lst: list[int]) -> bool` qui prend en paramètres une liste et qui renvoie True si la liste est triée, False sinon.