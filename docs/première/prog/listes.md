# Le type list (et tuple)


!!! abstract "Qu'est-ce qu'une liste?"
    C'est un type de donnée qui permet de stocker plusieurs informations de n'importe quel type.

    En Python, on peut créer une liste en utilisant des crochets.

    Par exemple, la liste `[1, 2, 3]` contient trois entiers, `1`, `2` et `3`.

    Une liste est mutable, ce qui signifie qu'on peut modifier son contenu une fois qu'elle est créée.

!!! warning "Une liste est une séquence"
    Une liste est une séquence, comme les `str`. Tout ce qui a été vu pour les str est aussi vrai pour les listes.
    (sauf les méthodes spécifiques aux chaines de caractère, comme is_alpha, etc...)

    Le premier indice d'une séquence de taille $n$ est 0, le deuxieme est 1, ... , et le dernier est $n-1$.


!!! example "Création d'une liste"
    ```python
    ma_liste = [1, 2, 3]
    ```
    Ici, la liste `ma_liste` contient trois éléments, `1`, `2` et `3`.

!!! example "Accès aux éléments d'une liste - Identique aux str"
    ```python
    ma_liste = ["ok", "ko", "truc"]
    print(ma_liste[0])  # Affiche ok
    print(ma_liste[1])  # Affiche ko
    print(ma_liste[2])  # Affiche truc  
    ```
    Ici, nous accedons aux éléments de la liste `ma_liste` en utilisant des indices.

    `t[i]` est l'element numéro `i` de la liste `t`.


!!! example "Modifier les éléments d'une liste"
    On ne pouvait pas faire ceci avec les str car ils sont immuables.
    ```python
    ma_liste = [1, 2, 3]
    ma_liste[0] = 4
    print(ma_liste)  # Affiche [4, 2, 3]

    ma_liste[-1] = 42
    print(ma_liste)  # Affiche [4, 2, 42]
    
    ma_liste[3] = 77 # IndexError: list assignment index out of range
    ```



!!! abstract "Concaténer des listes"
    ```python
    liste1 = [1, 2, 3]
    liste2 = [4, 5, 6]
    liste1 = liste1 + liste2
    ```
    Ici, nous concaténons les listes `liste1` et `liste2`.

    Cette syntaxe ne veut pas dire qu'on modifie la liste contenue dans la variable `liste1`, ni qu'on lui ajoute des éléments.
    Ce qu'il se passe réellement, c'est que `liste1 + liste2` est calculé, puis la valuer de la variable `liste1` est remplacée par cette nouvelle liste.

    On souhaite bénéficier du caractère mutable des listes, afin de ne pas avoir à recréer l'intégralité en mémoire à chaque fois.

    Pour ceci on dispose de méthodes dites "en place", qui modifient directement la liste sans passer par une création de nouvelle liste en mémoire. Ici la méthode extend.

    ```python
    ma_liste = [1, 2, 3]
    ma_liste.extend([4, 5, 6])       # la méthode extend ne renvoie rien (None)
    print(ma_liste)  # Affiche [1, 2, 3, 4, 5, 6]
    ```

    Ici, ma_liste a été modifiée directement en mémoire, sans avoir recours à un calcul intermédiaire.


!!! abstract "Ajouter un élément à une liste"

    La méthode append est utilisée pour ajouter un élément en fin de liste.

    ```python
    ma_liste = [1, 2, 3]
    ma_liste.append(4)             # la méthode append ne renvoie rien (None)
    print(ma_liste)  # Affiche [1, 2, 3, 4]
    ```

    !!! warning "Attention à ne pas confondre"
        Il est très important de bien différencier ajouter un élément (append) et concaténer une liste à une autre liste (extend)


!!! abstract "Fonctions génériques aux séquences"
    Avec les tuples, on peut utiliser toutes les fonctionns disponibles pour les séquences, comme `len()`.

    ```python
    lst = [1, 4, 2]  # tuple de taille 3
    print(len(lst))  # Affiche 3
    ```

!!! example "Parcourir une liste"
    Une liste est une séquence, tout comme unn str.
    Les algorithmes sont strictement identiques.

    Parcours par élément:
    ```python
    liste1 = [2, 9, 3]
    for element in liste1:
        print(element)
    ```

    Ici, nous itérons sur tous les **éléments** de la liste `liste1` et affichons chacun d'entre eux successivement.

    Parcours par indice:

    ```python
    liste1 = [1, 2, 3]
    for i in range(len(liste1)):
        print(liste1[i])
    ```
    Ici, nous itérons sur tous les **indices** de la liste `liste1` et affichons chacun d'entre eux successivement.


!!! tip "Algo - Accumulation"
    **Le principe d'accumulation est identique.**
    
    Construire la liste des carrés des n premiers entiers

    ```python
    res = []  # Liste vide
    n = 5
    for i in range(n):
        res.append(i**2)
    print(res) # Affiche [0, 1, 4, 9, 16]
    ```


!!! hint "Les tuples"

    C'est aussi une collection d'éléments, comme les listes:


    ```python
    t = ("ok", 2, "bidule")
    print(t[0])  # Affiche ok
    print(t[1])  # Affiche 2
    print(t[2])  # Affiche bidule
    print(t[3])  # IndexError
    ```

    Les tuples sont, comme les str, immuables. On ne peut pas les modifier une fois créés.

    Il faut considérer qu'on peut faire exactement la même chose avec des tuples qu'avec des str, sauf qu'au lieu de caractères, on manipule des valeurs de n'importe quel type.

    La seule particularité est le tuple à un seul élément, qui se termine par une virgule, pour ne pas le confondre avec des expressions arithmétiques:

    ```python
    t = (1,)
    print(t[0])  # Affiche 1

    t = (1)
    print(t[0]) # Erreur, car t est l'int 1
    ```

!!! abstract "Tuple ou liste?"
    En Python, les **tuples** et les **listes** sont des structures de données qui permettent de stocker plusieurs éléments dans une seule variable, mais ils ont des cas d'utilisation différents en fonction de leurs propriétés.

    ### **Les tuples**
    - **Immutables** : Une fois créés, leurs éléments ne peuvent pas être modifiés.
    - **Usage typique** : Utilisés pour représenter des collections de données qui ne doivent pas changer, comme :
    - Les coordonnées (x, y, z).
    - Les retours de fonction contenant plusieurs valeurs.
    - Des ensembles de données "constantes" (par exemple, des jours de la semaine).
    - **Performance** : Plus rapides que les listes pour certaines opérations, en raison de leur immutabilité.
    - **Syntaxe** : Les tuples sont définis avec des parenthèses, par exemple : `mon_tuple = (1, 2, 3)`.

    ### **Les listes**
    - **Mutables** : Leurs éléments peuvent être ajoutés, modifiés ou supprimés après leur création.
    - **Usage typique** : Utilisées pour des collections de données qui doivent être modifiées, comme :
    - Une liste de tâches ou de noms d'utilisateurs.
    - Des données à trier, filtrer ou parcourir.
    - Des structures dynamiques qui évoluent au cours de l'exécution du programme.
    - **Performance** : Plus flexibles que les tuples, mais légèrement plus lentes pour certaines opérations en raison de leur mutabilité.
    - **Syntaxe** : Les listes sont définies avec des crochets, par exemple : `ma_liste = [1, 2, 3]`.

    ### **Choisir entre tuple et liste**
    - Si vous avez besoin d'une structure **fixe** ou d'un **contenu non modifiable**, utilisez un **tuple**.
    - Si vous avez besoin d'une structure **modulable** ou de données dynamiques, optez pour une **liste**.
