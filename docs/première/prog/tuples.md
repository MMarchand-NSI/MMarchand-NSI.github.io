# Le type tuple


!!! abstract "Qu'est-ce qu'un tuple?"
    C'est un type de donnée qui permet de stocker plusieurs informations.

    En Python, on peut créer un tuple en utilisant des parenthèses.

    Par exemple, le tuple `(1, 2, 3)` contient trois éléments, `1`, `2` et `3`.

    Un tuple est immuable, ce qui veut dire qu'on ne peut pas modifier son contenu une fois qu'il est créé.


!!! example "Création d'un tuple"
    ```python
    mon_tuple = (1, 2, 3)
    ```
    Ici, le tuple `mon_tuple` contient trois éléments, `1`, `2` et `3`.

    !!! danger "Attention"
        Un tuple à un seul élément se termine avec une virgule, par exemple `(1,)`. Sinon, python croît que c'est juste une expression arithmétique.

        exemple:
        ```python
        print( (1) + (2)) # Affiche 3

        print( (1,) + (2,) ) # Affiche (1, 2)
        ```


!!! example "Accès aux éléments d'un tuple"
    ```python
    mon_tuple = (1, 2, 3)
    print(mon_tuple[0])  # Affiche 1
    print(mon_tuple[1])  # Affiche 2
    print(mon_tuple[2])  # Affiche 3
    ```
    Ici, nous accedons aux éléments du tuple `mon_tuple` en utilisant des indices.

    `t[i]` est l'element numéro `i` du tuple `t`.

!!! abstract "Séquence"
    Un tuple est une séquence, ce qui veut dire qu'on peut accéder à ses éléments par leurs indices.

    Le premier indice d'un tuple de taille $n$ est 0, le deuxieme est 1, ... , et le dernier est $n-1$.

    Ca n'est pas la première séquence que vous rencontrez, en effet, les str sont aussi des séquences immuables.
    Ce qui veut dire que tout ce que nous allons dire sur les tuples est aussi valable pour les str.

!!! abstract "Concaténer des tuples"
    ```python
    tuple1 = (1, 2, 3)
    tuple2 = (4, 5, 6)
    tuple3 = tuple1 + tuple2
    ```
    Ici, nous concaternons les tuples `tuple1` et `tuple2` en un seul tuple `tuple3`

    On aurait aussi pu avoir ce code:

    ```python
    tuple1 = (1, 2, 3)
    tuple2 = (4, 5, 6)
    tuple1 = tuple1 + tuple2
    ```

    Cette syntaxe ne veut pas dire qu'on modifie le tuple contenu dans la variable `tuple1`, ni qu'on lui ajoute des éléments.
    Ce qu'il se passe réellement, c'est que `tuple1 + tuple2` est calculé, puis la variable `tuple1` est modifiée pour indiquer le nouveau tuple.


!!! abstract "Fonctions sur les tuples"
    Avec les tuples, on peut utiliser toutes les fonctionns disponibles pour les séquences, comme `len()`, `min()`, `max()`, `sum()`, etc.

    ```python
    tuple1 = (1, 2, 3)  # tuple de taille 3
    print(len(tuple1))  # Affiche 3
    print(min(tuple1))  # Affiche 1
    print(max(tuple1))  # Affiche 3
    print(sum(tuple1))  # Affiche 6
    ```

!!!  example "Itérer sur un tuple"
    Une séquence est itérable.

    ```python
    tuple1 = (1, 2, 3)
    for element in tuple1:
        print(element)
    ```
    Ici, nous itérons sur tous les **éléments** du tuple `tuple1` et affichons chacun d'entre eux successivement.

    ```python
    tuple1 = (1, 2, 3)
    for i in range(len(tuple1)):
        print(tuple1[i])
    ```
    Ici, nous itérons sur tous les **indices** du tuple `tuple1` et affichons chacun d'entre eux successivement.


!!! tip "Algo - Accumulation"
    **Le principe d'accumulation est très important à comprendre.**
    
    Voici un exemple:

    ```python
    tuple1 = (1, 2, 3)
    total = 0
    for element in tuple1:
        total += element
    print(total)  # Affiche 6
    ```
    Dans ce cas, on accumule tous les éléments du tuple `tuple1` dans la variable `total` en les additionnant. Enfin, on affiche la valeur de `total` qui est la somme des éléments du tuple `tuple1`.

    Voici un autre exemple avec des str:

    ```python
    tuple1 = ("a", "b", "c")
    total = ""
    for element in tuple1:
        total += element
    print(total)  # Affiche "abc"
    ```

    Transformer un tuple.

    on dispose d'un tuple et on veut créer un autre tuple où toutes les valeurs sont multipliées par 2.

    ```python
    t = (1, 2, 3)
    resultat = ()
    for element in t:
        resultat += (element * 2,)
    print(resultat)  # Affiche (2, 4, 6)
    ``` 

    Modifier un str en décalant toutes les lettres de 1

    ```python
    t = "Hello"
    resultat = ""
    for element in t:
        resultat += chr(ord(element) + 1)
    print(resultat)  # Affiche "IFMMP"
    ```

!!! question "Moyenne"
    Vos notes sont dans un tuple `notes`. Calculer la moyenne de ces notes.


!!! question "tuple RGB"
    Afin de représenter un pixel en RGB, nous pouvons utiliser un tuple.
    Par exemple pour le pixel rouge, nous aurions un tuple `(255, 0, 0)`.

    C'est le cas pour le module pillow.

    Le code suivant affiche une image rouge.

    ```python
    from PIL import Image
    image = Image.new("RGB", (100, 100), (255, 0, 0))
    image.show()
    ```

    On peut aussi itérer sur tous les pixels d'une image, les modifier et les sauvegarder.

    Par exemple, ce code assombrit tous les pixels de l'image en divisant tous les canaux par 2.

    ```python
    from PIL import Image
    image = Image.load("image.png")
    for x in range(image.size[0]):
        for y in range(image.size[1]):
            pixel = image.getpixel((x, y))
            image.putpixel((x, y), (pixel[0] // 2, pixel[1] // 2, pixel[2] // 2))
    image.show()
    ```

    Si on dispose d'un tuple `(r, g, b)`, la version en noir et blanc de ce tuple serait `(m, m, m)` où m est la moyenne de r, g et b.
    créer une fonction to_noir_blanc qui prend un nom de fichier en paramètre, et qui affiche l'image en noir et blanc.

