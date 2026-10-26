# Matrices

!!! warning "En construction"
    Cette page est en cours de rédaction : son contenu peut encore changer.

Une **matrice** est un tableau de nombres rangés en lignes et en colonnes. Une matrice à $n$ lignes et $p$ colonnes est dite de taille $n \times p$.

$$
A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}
\qquad
C = \begin{pmatrix} 1 & 0 & 2 \\ 0 & 1 & 1 \end{pmatrix}
$$

$A$ est de taille $2 \times 2$, $C$ de taille $2 \times 3$. Une image en niveaux de gris, comme dans le projet *Traitement d'image*, en est une : chaque coefficient est la luminosité d'un pixel.

On écrit tout dans un fichier `matrices.py`. Une matrice y est une liste de lignes, chaque ligne étant une liste de nombres :

```python
type Matrice[T] = list[list[T]]

A = [[1, 2], [3, 4]]
B = [[0, 1], [1, 0]]
C = [[1, 0, 2], [0, 1, 1]]
D = [[1, 1], [0, 2], [3, 0]]
M = [[2, 0, 1], [1, 3, 2], [1, 1, 2]]
```

`T` est le type des coefficients : `A` est une `Matrice[int]`. Les fonctions qui calculent écrivent `[T: (int, float)]` : `T` y est forcément `int` ou `float`, pour que `+` et `*` aient un sens. Le coefficient de la ligne `i` et de la colonne `j` est `M[i][j]`. Les lignes et les colonnes sont numérotées à partir de `0`.

Toutes les fonctions de cette page renvoient une **nouvelle** matrice et ne modifient jamais celles qu'elles reçoivent.

## Étape 1 - Lire une matrice

!!! question "Lire"
    Sur ton cahier :

    1. Que vaut `C[1][2]` ? Et `D[2][0]` ?
    2. Que valent `len(D)` et `len(D[0])` ? Que représente chacun de ces deux nombres ?

    ??? success "Réponse"
        1. `C[1][2]` vaut `1` (deuxième ligne, troisième colonne). `D[2][0]` vaut `3`.
        2. `len(D)` vaut `3`, c'est le nombre de lignes. `len(D[0])` vaut `2`, c'est le nombre de colonnes, lu sur la première ligne.

!!! question "Écrire `dimensions` (obligatoire)"
    ```python
    def dimensions[T](M: Matrice[T]) -> tuple[int, int]:
        """Renvoie le couple (nombre de lignes, nombre de colonnes) de M."""
        pass


    def test_dimensions():
        assert dimensions(A) == (2, 2)
        assert dimensions(C) == (2, 3)
        assert dimensions(D) == ...
    ```

    ??? success "Solution"
        ```python
        def dimensions[T](M: Matrice[T]) -> tuple[int, int]:
            """Renvoie le couple (nombre de lignes, nombre de colonnes) de M."""
            return (len(M), len(M[0]))


        def test_dimensions():
            assert dimensions(A) == (2, 2)
            assert dimensions(C) == (2, 3)
            assert dimensions(D) == (3, 2)
        ```

## Étape 2 - L'addition

On n'additionne que deux matrices **de même taille**. On ajoute les coefficients qui sont à la même place :

$$
\begin{pmatrix} a & b \\ c & d \end{pmatrix} + \begin{pmatrix} a' & b' \\ c' & d' \end{pmatrix} = \begin{pmatrix} a + a' & b + b' \\ c + c' & d + d' \end{pmatrix}
$$

!!! question "Calculer"
    Sur ton cahier : calcule $A + B$. Peut-on calculer $A + C$ ?

    ??? success "Réponse"
        $A + B = \begin{pmatrix} 1 & 3 \\ 4 & 4 \end{pmatrix}$. On ne peut pas calculer $A + C$ : $A$ est de taille $2 \times 2$ et $C$ de taille $2 \times 3$.

!!! question "Écrire `addition` (obligatoire)"
    La fonction commence par vérifier sa précondition avec un `assert`. Complète le test : que doit valoir `copie` après l'appel ?

    ```python
    def addition[T: (int, float)](A: Matrice[T], B: Matrice[T]) -> Matrice[T]:
        """Renvoie une nouvelle matrice A + B.
        Précondition : A et B ont les mêmes dimensions."""
        pass


    def test_addition():
        assert addition(A, B) == [[1, 3], [4, 4]]
        assert addition(C, C) == [[2, 0, 4], [0, 2, 2]]
        copie = [[1, 2], [3, 4]]
        addition(copie, B)
        assert copie == ...
    ```

    ??? tip "Indice léger"
        Une boucle sur les lignes, une boucle sur les colonnes, et une nouvelle ligne construite à chaque tour de la première.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def addition[T: (int, float)](A: Matrice[T], B: Matrice[T]) -> Matrice[T]:
            """Renvoie une nouvelle matrice A + B.
            Précondition : A et B ont les mêmes dimensions."""
            assert dimensions(A) == dimensions(B)
            res = []
            for i in range(0, len(A)):
                ligne = []
                for j in range(0, len(A[0])):
                    ligne.append(A[i][j] + B[i][j])
                res.append(ligne)
            return res


        def test_addition():
            assert addition(A, B) == [[1, 3], [4, 4]]
            assert addition(C, C) == [[2, 0, 4], [0, 2, 2]]
            copie = [[1, 2], [3, 4]]
            addition(copie, B)
            assert copie == [[1, 2], [3, 4]]
        ```

## Étape 3 - La multiplication

Le produit $A \times B$ n'est **pas** le produit des coefficients à la même place. Le coefficient de la ligne $i$ et de la colonne $j$ du résultat se calcule avec **la ligne $i$ de $A$** et **la colonne $j$ de $B$** : on multiplie leurs coefficients deux à deux, et on additionne.

$$
(A \times B)_{i,j} = \sum_{k} A_{i,k} \times B_{k,j}
$$

Pour que cela ait un sens, une ligne de $A$ doit avoir autant de coefficients qu'une colonne de $B$ : **le nombre de colonnes de $A$ doit être égal au nombre de lignes de $B$**. Si $A$ est de taille $n \times p$ et $B$ de taille $p \times q$, le produit est de taille $n \times q$.

!!! question "Calculer"
    Sur ton cahier :

    1. Calcule $A \times B$, puis $B \times A$.
    2. Donne la taille de $C \times D$, puis celle de $D \times C$, sans les calculer.
    3. Calcule le coefficient de la ligne `0` et de la colonne `0` de $C \times D$.

    ??? success "Réponse"
        1. $A \times B = \begin{pmatrix} 2 & 1 \\ 4 & 3 \end{pmatrix}$ et $B \times A = \begin{pmatrix} 3 & 4 \\ 1 & 2 \end{pmatrix}$. Les deux résultats sont **différents**.
        2. $C$ est de taille $2 \times 3$ et $D$ de taille $3 \times 2$ : $C \times D$ est de taille $2 \times 2$ et $D \times C$ de taille $3 \times 3$.
        3. Ligne `0` de $C$ : `1, 0, 2`. Colonne `0` de $D$ : `1, 0, 3`. On obtient $1 \times 1 + 0 \times 0 + 2 \times 3 = 7$.

!!! warning "Piège : l'ordre compte"
    Pour des nombres, $3 \times 5 = 5 \times 3$. Pour des matrices, $A \times B$ et $B \times A$ sont en général différents, et l'un des deux peut même ne pas exister. Un test qui n'essaie que des matrices où l'ordre ne change rien laisse passer une fonction qui inverse $A$ et $B$.

!!! question "Écrire `produit` (obligatoire)"
    ```python
    def produit[T: (int, float)](A: Matrice[T], B: Matrice[T]) -> Matrice[T]:
        """Renvoie une nouvelle matrice A × B.
        Précondition : le nombre de colonnes de A est égal au nombre de lignes de B."""
        pass


    def test_produit():
        assert produit(A, B) == [[2, 1], [4, 3]]
        assert produit(B, A) == [[3, 4], [1, 2]]
        assert produit(C, D) == [[7, 1], [3, 2]]
        assert dimensions(produit(D, C)) == ...
    ```

    ??? tip "Indice léger"
        Il faut **trois** boucles imbriquées. Les deux premières parcourent les cases du résultat. Combien de lignes et de colonnes a-t-il ?

    ??? tip "Indice plus précis"
        La troisième boucle, sur `k`, calcule la somme d'une seule case : `s = s + A[i][k] * B[k][j]`. La somme `s` repart de `0` pour chaque case.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def produit[T: (int, float)](A: Matrice[T], B: Matrice[T]) -> Matrice[T]:
            """Renvoie une nouvelle matrice A × B.
            Précondition : le nombre de colonnes de A est égal au nombre de lignes de B."""
            assert len(A[0]) == len(B)
            res = []
            for i in range(0, len(A)):
                ligne = []
                for j in range(0, len(B[0])):
                    s: T = 0
                    for k in range(0, len(B)):
                        s = s + A[i][k] * B[k][j]
                    ligne.append(s)
                res.append(ligne)
            return res


        def test_produit():
            assert produit(A, B) == [[2, 1], [4, 3]]
            assert produit(B, A) == [[3, 4], [1, 2]]
            assert produit(C, D) == [[7, 1], [3, 2]]
            assert dimensions(produit(D, C)) == (3, 3)
        ```

La **matrice identité** $I_n$ a des `1` sur la diagonale et des `0` partout ailleurs. Elle joue pour le produit le rôle du nombre `1` : $A \times I_n = A$.

$$
I_3 = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix}
$$

!!! question "Écrire `identite` (entraînement)"
    ```python
    def identite(n: int) -> Matrice[int]:
        """Renvoie la matrice identité de taille n × n."""
        pass


    def test_identite():
        assert identite(1) == [[1]]
        assert identite(3) == [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
        assert produit(A, identite(2)) == A
        assert produit(identite(2), A) == A
    ```

    ??? success "Solution"
        ```python
        def identite(n: int) -> Matrice[int]:
            """Renvoie la matrice identité de taille n × n."""
            res = []
            for i in range(0, n):
                ligne = []
                for j in range(0, n):
                    if i == j:
                        ligne.append(1)
                    else:
                        ligne.append(0)
                res.append(ligne)
            return res
        ```

## Étape 4 - La transposée

La **transposée** de $M$, notée ${}^t M$, échange les lignes et les colonnes : la ligne `i` de $M$ devient la colonne `i` de ${}^t M$. On en aura besoin à l'étape 6.

!!! question "Écrire `transposee` (obligatoire)"
    Sur ton cahier d'abord : écris ${}^t C$. Quelle est sa taille ? Puis écris la fonction et complète le test.

    ```python
    def transposee[T](M: Matrice[T]) -> Matrice[T]:
        """Renvoie une nouvelle matrice : la transposée de M."""
        pass


    def test_transposee():
        assert transposee(A) == [[1, 3], [2, 4]]
        assert transposee(C) == ...
        assert transposee(transposee(D)) == D
    ```

    ??? tip "Indice"
        Le coefficient de la ligne `i` et de la colonne `j` de ${}^t M$ est `M[j][i]`. Le résultat a autant de lignes que $M$ a de colonnes.

    ??? success "Solution"
        ${}^t C = \begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 2 & 1 \end{pmatrix}$, de taille $3 \times 2$.

        ```python
        def transposee[T](M: Matrice[T]) -> Matrice[T]:
            """Renvoie une nouvelle matrice : la transposée de M."""
            res = []
            for i in range(0, len(M[0])):
                ligne = []
                for j in range(0, len(M)):
                    ligne.append(M[j][i])
                res.append(ligne)
            return res


        def test_transposee():
            assert transposee(A) == [[1, 3], [2, 4]]
            assert transposee(C) == [[1, 0], [0, 1], [2, 1]]
            assert transposee(transposee(D)) == D
        ```

## Étape 5 - Le déterminant

Le **déterminant** d'une matrice **carrée** est un nombre, noté $\det M$. Il dit, entre autres, si la matrice a une inverse : c'est le cas exactement quand $\det M \neq 0$.

Pour une matrice $2 \times 2$ :

$$
\det \begin{pmatrix} a & b \\ c & d \end{pmatrix} = a d - b c
$$

Pour une matrice plus grande, on se ramène à des matrices plus petites. Le **mineur** $M_{i,j}$ est la matrice obtenue en **supprimant la ligne $i$ et la colonne $j$** de $M$.

!!! question "Calculer"
    Sur ton cahier :

    1. Calcule $\det A$.
    2. Écris le mineur de `M` obtenu en supprimant la ligne `0` et la colonne `1`, puis celui obtenu en supprimant la ligne `1` et la colonne `2`.

    ??? success "Réponse"
        1. $\det A = 1 \times 4 - 2 \times 3 = -2$.
        2. Ligne `0` et colonne `1` supprimées : $\begin{pmatrix} 1 & 2 \\ 1 & 2 \end{pmatrix}$. Ligne `1` et colonne `2` supprimées : $\begin{pmatrix} 2 & 0 \\ 1 & 1 \end{pmatrix}$.

!!! question "Écrire `mineur` (obligatoire)"
    Complète le test : il doit vérifier que `M` n'a pas été modifiée.

    ```python
    def mineur[T](M: Matrice[T], i: int, j: int) -> Matrice[T]:
        """Renvoie une nouvelle matrice : M privée de sa ligne i et de sa colonne j."""
        pass


    def test_mineur():
        assert mineur(M, 0, 1) == [[1, 2], [1, 2]]
        assert mineur(M, 1, 2) == [[2, 0], [1, 1]]
        assert mineur(A, 0, 0) == [[4]]
        copie = [[2, 0, 1], [1, 3, 2], [1, 1, 2]]
        mineur(copie, 0, 0)
        assert ...
    ```

    ??? tip "Indice léger"
        Parcours toutes les lignes `k` et toutes les colonnes `c` de `M`, et ne garde un coefficient que si `k != i` et `c != j`.

    ??? tip "Indice plus précis"
        Le test `k != i` se place dans la première boucle, **avant** de créer la nouvelle ligne : sinon le résultat contient une ligne vide.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def mineur[T](M: Matrice[T], i: int, j: int) -> Matrice[T]:
            """Renvoie une nouvelle matrice : M privée de sa ligne i et de sa colonne j."""
            res = []
            for k in range(0, len(M)):
                if k != i:
                    ligne = []
                    for c in range(0, len(M[0])):
                        if c != j:
                            ligne.append(M[k][c])
                    res.append(ligne)
            return res


        def test_mineur():
            assert mineur(M, 0, 1) == [[1, 2], [1, 2]]
            assert mineur(M, 1, 2) == [[2, 0], [1, 1]]
            assert mineur(A, 0, 0) == [[4]]
            copie = [[2, 0, 1], [1, 3, 2], [1, 1, 2]]
            mineur(copie, 0, 0)
            assert copie == [[2, 0, 1], [1, 3, 2], [1, 1, 2]]
        ```

        Une solution qui part de `M[k]` et supprime une case avec `del` ou `pop` modifie `M` elle-même : c'est ce que la dernière assertion attrape.

Le déterminant se calcule en **développant selon la première ligne** : chaque coefficient de la ligne `0` est multiplié par le déterminant de son mineur, et les signes alternent, `+`, `-`, `+`, `-`...

$$
\det M = \sum_{j} (-1)^{j} \times M_{0,j} \times \det M_{0,j}
$$

Le déterminant d'une matrice $1 \times 1$, `[[a]]`, vaut `a`.

!!! question "Calculer"
    Sur ton cahier, développe $\det M$ selon la première ligne. Écris les trois termes, avec leur signe, avant de faire le calcul.

    ??? success "Réponse"
        $$
        \det M = + 2 \times \det \begin{pmatrix} 3 & 2 \\ 1 & 2 \end{pmatrix} - 0 \times \det \begin{pmatrix} 1 & 2 \\ 1 & 2 \end{pmatrix} + 1 \times \det \begin{pmatrix} 1 & 3 \\ 1 & 1 \end{pmatrix}
        $$

        $= 2 \times 4 - 0 + 1 \times (-2) = 6$.

!!! question "Écrire `determinant` (obligatoire)"
    La fonction est **récursive** : elle s'appelle elle-même sur chaque mineur.

    ```python
    def determinant[T: (int, float)](M: Matrice[T]) -> T:
        """Renvoie le déterminant de M, développé selon la première ligne.
        Précondition : M est carrée."""
        pass


    def test_determinant():
        assert determinant([[5]]) == 5
        assert determinant(A) == -2
        assert determinant(M) == 6
        assert determinant(identite(4)) == ...
    ```

    ??? tip "Indice léger"
        Le cas de base est la matrice $1 \times 1$. Dans le cas général, une seule boucle sur `j`, de `0` à `len(M)`.

    ??? tip "Indice plus précis"
        Le signe s'écrit `(-1) ** j`. Chaque tour ajoute `(-1) ** j * M[0][j] * determinant(mineur(M, 0, j))`.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def determinant[T: (int, float)](M: Matrice[T]) -> T:
            """Renvoie le déterminant de M, développé selon la première ligne.
            Précondition : M est carrée."""
            assert len(M) == len(M[0])
            if len(M) == 1:
                return M[0][0]
            s: T = 0
            for j in range(0, len(M)):
                s = s + (-1) ** j * M[0][j] * determinant(mineur(M, 0, j))
            return s


        def test_determinant():
            assert determinant([[5]]) == 5
            assert determinant(A) == -2
            assert determinant(M) == 6
            assert determinant(identite(4)) == 1
        ```

!!! question "Compter les appels"
    Sur ton cahier : combien de fois `determinant` est-elle appelée au total pour calculer `determinant(M)`, le premier appel compris ?

    ??? success "Réponse"
        `10` : l'appel sur `M` ($3 \times 3$), trois appels sur des mineurs $2 \times 2$, et pour chacun d'eux deux appels sur des matrices $1 \times 1$. $1 + 3 \times (1 + 2) = 10$.

## Étape 6 - La comatrice

La **comatrice** de $M$, notée $\operatorname{com} M$, est la matrice de même taille dont le coefficient de la ligne $i$ et de la colonne $j$ est :

$$
(\operatorname{com} M)_{i,j} = (-1)^{i+j} \times \det M_{i,j}
$$

Ce nombre s'appelle le **cofacteur** de la case $(i, j)$. Les signes $(-1)^{i+j}$ forment un damier :

$$
\begin{pmatrix} + & - & + \\ - & + & - \\ + & - & + \end{pmatrix}
$$

!!! question "Calculer"
    Sur ton cahier, calcule $\operatorname{com} A$. Les mineurs de $A$ sont des matrices $1 \times 1$.

    ??? success "Réponse"
        $\operatorname{com} A = \begin{pmatrix} 4 & -3 \\ -2 & 1 \end{pmatrix}$. Par exemple, en `(0, 1)` : on supprime la ligne `0` et la colonne `1`, il reste `[[3]]`, et le signe est $(-1)^{0+1} = -1$.

!!! question "Écrire `comatrice` (obligatoire)"
    ```python
    def comatrice[T: (int, float)](M: Matrice[T]) -> Matrice[T]:
        """Renvoie une nouvelle matrice : la comatrice de M.
        Précondition : M est carrée."""
        pass


    def test_comatrice():
        assert comatrice(A) == [[4, -3], [-2, 1]]
        assert comatrice(M) == [[4, 0, -2], [1, 3, -2], [-3, -3, 6]]
    ```

    ??? tip "Indice"
        Même double boucle qu'à l'étape 2. Chaque case vaut `(-1) ** (i + j) * determinant(mineur(M, i, j))`.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def comatrice[T: (int, float)](M: Matrice[T]) -> Matrice[T]:
            """Renvoie une nouvelle matrice : la comatrice de M.
            Précondition : M est carrée."""
            res = []
            for i in range(0, len(M)):
                ligne = []
                for j in range(0, len(M)):
                    ligne.append((-1) ** (i + j) * determinant(mineur(M, i, j)))
                res.append(ligne)
            return res
        ```

La comatrice vérifie une propriété remarquable. Pour toute matrice carrée $M$ de taille $n$ :

$$
M \times {}^t(\operatorname{com} M) = \det M \times I_n
$$

!!! question "Vérifier la propriété (obligatoire)"
    1. Sur ton cahier : que doit valoir `produit(M, transposee(comatrice(M)))` ? Et pour `A` ?
    2. Écris `test_propriete_comatrice` qui le vérifie sur `A` et sur `M`.

    ??? success "Réponse"
        1. $\det M = 6$, donc on doit obtenir `[[6, 0, 0], [0, 6, 0], [0, 0, 6]]`. Pour `A`, `[[-2, 0], [0, -2]]`.
        2. ```python
           def test_propriete_comatrice():
               assert produit(M, transposee(comatrice(M))) == [[6, 0, 0], [0, 6, 0], [0, 0, 6]]
               assert produit(A, transposee(comatrice(A))) == [[-2, 0], [0, -2]]
           ```

        Ce test fait travailler ensemble quatre de tes fonctions. S'il échoue alors que les autres tests passent, l'erreur est souvent dans l'ordre des arguments de `produit`.

## Étape 7 - Le produit de Kronecker

Le **produit de Kronecker** $A \otimes B$ remplace chaque coefficient de $A$ par un **bloc** : une copie de $B$ multipliée par ce coefficient.

$$
\begin{pmatrix} a & b \\ c & d \end{pmatrix} \otimes B = \begin{pmatrix} a B & b B \\ c B & d B \end{pmatrix}
$$

Si $A$ est de taille $n \times m$ et $B$ de taille $p \times q$, alors $A \otimes B$ est de taille $np \times mq$. Contrairement au produit de l'étape 3, il n'y a **aucune** condition sur les tailles.

!!! question "Calculer"
    Sur ton cahier :

    1. Écris $A \otimes B$. C'est une matrice $4 \times 4$.
    2. Quelle est la taille de $C \otimes D$ ?

    ??? success "Réponse"
        1. Chaque bloc est $B = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$ multiplié par un coefficient de $A$ :

            $$
            A \otimes B = \begin{pmatrix} 0 & 1 & 0 & 2 \\ 1 & 0 & 2 & 0 \\ 0 & 3 & 0 & 4 \\ 3 & 0 & 4 & 0 \end{pmatrix}
            $$

        2. $C$ est $2 \times 3$ et $D$ est $3 \times 2$ : $C \otimes D$ est de taille $6 \times 6$.

Pour écrire la fonction, il faut savoir, pour une case `(i, j)` du résultat, de quel bloc elle fait partie et où elle se trouve dans ce bloc. On note `p, q = dimensions(B)`.

!!! question "Relier une case à son bloc"
    Dans $A \otimes B$ ci-dessus, `p` et `q` valent `2`.

    1. La case `(2, 1)` vaut `3`. De quel coefficient de `A` vient-elle ? Et de quel coefficient de `B` ? Donne leurs indices.
    2. Écris, en fonction de `i`, `j`, `p` et `q`, l'expression qui donne la case `(i, j)` de $A \otimes B$.

    ??? tip "Indice"
        Les lignes `0` à `p - 1` forment le premier bloc, les lignes `p` à `2p - 1` le deuxième, et ainsi de suite. Le quotient `i // p` donne le numéro du bloc, le reste `i % p` la position dans ce bloc.

    ??? success "Réponse"
        1. `A[1][0]`, qui vaut `3`, et `B[0][1]`, qui vaut `1`. La ligne `2` est dans le deuxième bloc de lignes (`2 // 2 = 1`), à la première ligne de ce bloc (`2 % 2 = 0`). La colonne `1` est dans le premier bloc de colonnes (`1 // 2 = 0`), à la deuxième colonne de ce bloc (`1 % 2 = 1`).
        2. `A[i // p][j // q] * B[i % p][j % q]`

!!! question "Écrire `kronecker` (obligatoire)"
    ```python
    def kronecker[T: (int, float)](A: Matrice[T], B: Matrice[T]) -> Matrice[T]:
        """Renvoie une nouvelle matrice : le produit de Kronecker de A par B."""
        pass


    def test_kronecker():
        assert kronecker(A, B) == [[0, 1, 0, 2], [1, 0, 2, 0], [0, 3, 0, 4], [3, 0, 4, 0]]
        assert kronecker(identite(2), A) == [[1, 2, 0, 0], [3, 4, 0, 0], [0, 0, 1, 2], [0, 0, 3, 4]]
        assert dimensions(kronecker(C, D)) == ...
    ```

    ??? tip "Indice"
        Une double boucle sur les cases du résultat, avec l'expression de la question précédente. Combien le résultat a-t-il de lignes ?

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def kronecker[T: (int, float)](A: Matrice[T], B: Matrice[T]) -> Matrice[T]:
            """Renvoie une nouvelle matrice : le produit de Kronecker de A par B."""
            p, q = dimensions(B)
            res = []
            for i in range(0, len(A) * p):
                ligne = []
                for j in range(0, len(A[0]) * q):
                    ligne.append(A[i // p][j // q] * B[i % p][j % q])
                res.append(ligne)
            return res


        def test_kronecker():
            assert kronecker(A, B) == [[0, 1, 0, 2], [1, 0, 2, 0], [0, 3, 0, 4], [3, 0, 4, 0]]
            assert kronecker(identite(2), A) == [[1, 2, 0, 0], [3, 4, 0, 0], [0, 0, 1, 2], [0, 0, 3, 4]]
            assert dimensions(kronecker(C, D)) == (6, 6)
        ```

!!! question "L'ordre compte encore"
    Sur ton cahier, écris $B \otimes A$, puis compare avec $A \otimes B$.

    ??? success "Réponse"
        $$
        B \otimes A = \begin{pmatrix} 0 & 0 & 1 & 2 \\ 0 & 0 & 3 & 4 \\ 1 & 2 & 0 & 0 \\ 3 & 4 & 0 & 0 \end{pmatrix}
        $$

        Les deux matrices contiennent les mêmes nombres, mais pas à la même place : $A \otimes B \neq B \otimes A$.

## Étape 8 - Transvections et pivot de Gauss

!!! question "Le coût du déterminant"
    À l'étape 5, le calcul de `determinant(M)` pour une matrice $3 \times 3$ finit par calculer six déterminants $1 \times 1$.

    1. Combien de déterminants $1 \times 1$ sont calculés pour une matrice $4 \times 4$ ? Pour une matrice $n \times n$ ?
    2. Combien pour une matrice $10 \times 10$ ? Ajoute un compteur à ta fonction pour le vérifier.
    3. Une matrice $20 \times 20$ est une petite matrice en pratique. Que penses-tu de cette méthode pour la calculer ?

    ??? success "Réponse"
        1. $4 \times 3 \times 2 \times 1 = 24$. Pour $n \times n$, $n \times (n - 1) \times \dots \times 1$, qu'on note $n!$ (« factorielle $n$ »).
        2. $10! = 3\,628\,800$.
        3. $20!$ dépasse $2 \times 10^{18}$ : même à un milliard de déterminants par seconde, il faudrait plus de soixante ans. Il faut une autre méthode.

On travaille dans cette étape avec la matrice suivante. On l'annote `Matrice[float]`, parce que les calculs vont faire apparaître des divisions :

```python
N: Matrice[float] = [[2, 1, 1], [4, 3, 3], [8, 7, 9]]
```

### Les transvections

Une **transvection** ajoute à une ligne un multiple d'une **autre** ligne. On la note :

$$
L_i \leftarrow L_i + c \, L_k \qquad (i \neq k)
$$

La ligne $L_i$ est remplacée par $L_i + c \, L_k$. Toutes les autres lignes, $L_k$ comprise, restent telles quelles.

!!! question "Une transvection à la main"
    Sur ton cahier :

    1. Applique $L_1 \leftarrow L_1 - 2 \, L_0$ à `N`. Écris la matrice obtenue.
    2. Calcule avec ta fonction `determinant` le déterminant de `N`, puis celui de la matrice obtenue. Que constates-tu ?

    ??? success "Réponse"
        1. $\begin{pmatrix} 2 & 1 & 1 \\ 0 & 1 & 1 \\ 8 & 7 & 9 \end{pmatrix}$. La ligne `1` devient `4 - 2 × 2, 3 - 2 × 1, 3 - 2 × 1`, soit `0, 1, 1`.
        2. Les deux déterminants valent `4`. Une transvection **ne change pas** le déterminant.

!!! question "Une transvection est un produit"
    On pose `E: Matrice[float] = [[1, 0, 0], [-2, 1, 0], [0, 0, 1]]` : c'est l'identité, avec `-2` en ligne `1` et colonne `0`. Elle est annotée comme `N`, sinon `produit` reçoit une `Matrice[int]` et une `Matrice[float]`.

    1. Calcule `produit(E, N)` avec ta fonction. Que reconnais-tu ?
    2. Que vaut `determinant(E)` ?

    ??? success "Réponse"
        1. On retrouve la matrice de la question précédente : multiplier à gauche par `E` effectue la transvection $L_1 \leftarrow L_1 - 2 \, L_0$.
        2. `1`. On admet que $\det(E \times N) = \det E \times \det N$ : c'est pourquoi une transvection ne change pas le déterminant.

!!! question "Écrire `transvection` (obligatoire)"
    Complète le test : que doit valoir `copie` après l'appel ?

    ```python
    def transvection[T: (int, float)](M: Matrice[T], i: int, k: int, c: T) -> Matrice[T]:
        """Renvoie une nouvelle matrice : M où la ligne i est remplacée
        par la ligne i plus c fois la ligne k.
        Précondition : i et k sont différents."""
        pass


    def test_transvection():
        assert transvection(N, 1, 0, -2) == [[2, 1, 1], [0, 1, 1], [8, 7, 9]]
        assert transvection(A, 0, 1, 1) == [[4, 6], [3, 4]]
        copie = [[2, 1, 1], [4, 3, 3], [8, 7, 9]]
        transvection(copie, 1, 0, -2)
        assert copie == ...
    ```

    ??? tip "Indice léger"
        Même double boucle qu'à l'étape 2. Seules les cases de la ligne `i` sont calculées, les autres sont recopiées.

    ??? tip "Indice plus précis"
        Dans la ligne `i`, la case de la colonne `j` vaut `M[i][j] + c * M[k][j]`.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def transvection[T: (int, float)](M: Matrice[T], i: int, k: int, c: T) -> Matrice[T]:
            """Renvoie une nouvelle matrice : M où la ligne i est remplacée
            par la ligne i plus c fois la ligne k.
            Précondition : i et k sont différents."""
            assert i != k
            res = []
            for r in range(0, len(M)):
                ligne = []
                for j in range(0, len(M[0])):
                    if r == i:
                        ligne.append(M[i][j] + c * M[k][j])
                    else:
                        ligne.append(M[r][j])
                res.append(ligne)
            return res


        def test_transvection():
            assert transvection(N, 1, 0, -2) == [[2, 1, 1], [0, 1, 1], [8, 7, 9]]
            assert transvection(A, 0, 1, 1) == [[4, 6], [3, 4]]
            copie = [[2, 1, 1], [4, 3, 3], [8, 7, 9]]
            transvection(copie, 1, 0, -2)
            assert copie == [[2, 1, 1], [4, 3, 3], [8, 7, 9]]
        ```

### Les matrices triangulaires

Une matrice carrée est **triangulaire** quand tous ses coefficients **sous la diagonale** sont nuls :

$$
U = \begin{pmatrix} 2 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 2 \end{pmatrix}
$$

!!! question "Le déterminant d'une matrice triangulaire"
    1. Calcule `determinant(U)` avec ta fonction, puis le produit des coefficients de la diagonale de `U`.
    2. Fais de même avec une matrice triangulaire $3 \times 3$ de ton choix.

    ??? success "Réponse"
        1. Les deux valent `4`.
        2. On obtient toujours l'égalité : le déterminant d'une matrice triangulaire est le **produit des coefficients de sa diagonale**. Ce calcul ne demande que $n - 1$ multiplications.

!!! question "Écrire `produit_diagonale` (entraînement)"
    ```python
    def produit_diagonale[T: (int, float)](M: Matrice[T]) -> T:
        """Renvoie le produit des coefficients de la diagonale de M.
        Précondition : M est carrée."""
        pass


    def test_produit_diagonale():
        assert produit_diagonale(U) == 4
        assert produit_diagonale(identite(5)) == 1
    ```

    ??? success "Solution"
        ```python
        def produit_diagonale[T: (int, float)](M: Matrice[T]) -> T:
            """Renvoie le produit des coefficients de la diagonale de M.
            Précondition : M est carrée."""
            p: T = 1
            for i in range(0, len(M)):
                p = p * M[i][i]
            return p
        ```

### Le pivot de Gauss

Les transvections ne changent pas le déterminant, et le déterminant d'une matrice triangulaire est facile à calculer. Le **pivot de Gauss** réunit les deux : on rend la matrice triangulaire **uniquement par des transvections**, puis on fait le produit de la diagonale.

On annule la colonne `0` sous la diagonale, puis la colonne `1`, et ainsi de suite. Pour annuler la case `(i, j)`, on utilise la ligne `j`, dont le coefficient `M[j][j]` s'appelle le **pivot**.

!!! question "Le pivot à la main"
    Sur ton cahier, rends `N` triangulaire. Pour chaque transvection :

    - écris-la sous la forme $L_i \leftarrow L_i + c \, L_k$, avec la valeur de $c$,
    - écris la matrice obtenue.

    Il en faut trois. Termine par le déterminant de `N`.

    ??? tip "Indice"
        Pour annuler la case `(1, 0)`, qui vaut `4`, avec le pivot `N[0][0]`, qui vaut `2` : il faut $4 + c \times 2 = 0$.

    ??? success "Réponse"
        1. $L_1 \leftarrow L_1 - 2 \, L_0$ : $\begin{pmatrix} 2 & 1 & 1 \\ 0 & 1 & 1 \\ 8 & 7 & 9 \end{pmatrix}$
        2. $L_2 \leftarrow L_2 - 4 \, L_0$ : $\begin{pmatrix} 2 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 3 & 5 \end{pmatrix}$
        3. $L_2 \leftarrow L_2 - 3 \, L_1$ : $\begin{pmatrix} 2 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 2 \end{pmatrix}$

        On obtient `U`, donc $\det N = 2 \times 1 \times 2 = 4$. Pour annuler la case `(i, j)`, on a pris $c = -\dfrac{M_{i,j}}{M_{j,j}}$.

!!! warning "Piège : utiliser la bonne ligne"
    À la troisième transvection, on annule la case `(2, 1)` avec la ligne `1`, et non avec la ligne `0`. La ligne `0` a un `2` en colonne `0` : l'ajouter à la ligne `2` ferait réapparaître un coefficient non nul dans la colonne qu'on vient d'annuler.

!!! question "Écrire `triangulaire` (obligatoire)"
    On suppose qu'aucun pivot rencontré n'est nul.

    ```python
    def triangulaire(M: Matrice[float]) -> Matrice[float]:
        """Renvoie une nouvelle matrice triangulaire, obtenue à partir de M
        par des transvections seulement.
        Précondition : M est carrée, et aucun pivot rencontré n'est nul."""
        pass


    def test_triangulaire():
        assert triangulaire(N) == [[2, 1, 1], [0, 1, 1], [0, 0, 2]]
        assert triangulaire([[2, 0, 1], [1, 3, 2], [1, 1, 2]]) == [[2, 0, 1], [0, 3, 1.5], [0, 0, 1]]
    ```

    ??? tip "Indice léger"
        Deux boucles : `j` parcourt les colonnes, et pour chaque `j`, `i` parcourt les lignes **sous** la diagonale, de `j + 1` à `len(M)`.

    ??? tip "Indice plus précis"
        Le résultat se construit transvection après transvection : `res = transvection(res, i, j, -res[i][j] / res[j][j])`. Le calcul de $c$ se fait sur `res`, la matrice en cours, et pas sur `M`.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def triangulaire(M: Matrice[float]) -> Matrice[float]:
            """Renvoie une nouvelle matrice triangulaire, obtenue à partir de M
            par des transvections seulement.
            Précondition : M est carrée, et aucun pivot rencontré n'est nul."""
            res = M
            for j in range(0, len(M)):
                for i in range(j + 1, len(M)):
                    res = transvection(res, i, j, -res[i][j] / res[j][j])
            return res
        ```

        `M` n'est pas modifiée : `transvection` renvoie à chaque fois une nouvelle matrice, et `res` désigne la dernière.

!!! question "Écrire `determinant_gauss` (obligatoire)"
    Une ligne suffit. Complète le test pour qu'il compare les deux méthodes sur `M`.

    ```python
    def determinant_gauss(M: Matrice[float]) -> float:
        """Renvoie le déterminant de M, calculé par le pivot de Gauss.
        Précondition : M est carrée, et aucun pivot rencontré n'est nul."""
        pass


    def test_determinant_gauss():
        assert determinant_gauss(N) == 4
        assert determinant_gauss([[2, 0, 1], [1, 3, 2], [1, 1, 2]]) == ...
    ```

    ??? success "Solution"
        ```python
        def determinant_gauss(M: Matrice[float]) -> float:
            """Renvoie le déterminant de M, calculé par le pivot de Gauss.
            Précondition : M est carrée, et aucun pivot rencontré n'est nul."""
            return produit_diagonale(triangulaire(M))


        def test_determinant_gauss():
            assert determinant_gauss(N) == 4
            assert determinant_gauss([[2, 0, 1], [1, 3, 2], [1, 1, 2]]) == determinant([[2, 0, 1], [1, 3, 2], [1, 1, 2]])
        ```

        Les divisions produisent des flottants. Sur ces deux matrices, les calculs tombent juste, mais sur d'autres, deux résultats égaux en mathématiques peuvent différer de très peu : on compare alors avec `abs(a - b) < 1e-9`.

!!! question "Comparer les coûts"
    1. Combien de transvections faut-il pour rendre triangulaire une matrice $3 \times 3$ ? Une matrice $n \times n$ ?
    2. Chaque transvection recalcule une ligne de $n$ coefficients. Pour une matrice $20 \times 20$, combien de coefficients sont calculés au total ? Compare avec la réponse à la première question de cette étape.

    ??? success "Réponse"
        1. `3`. Pour $n \times n$ : $n - 1$ cases à annuler dans la colonne `0`, $n - 2$ dans la colonne `1`, et ainsi de suite, soit $\dfrac{n(n - 1)}{2}$.
        2. $\dfrac{20 \times 19}{2} = 190$ transvections, donc $190 \times 20 = 3\,800$ coefficients, contre plus de $2 \times 10^{18}$ déterminants $1 \times 1$ pour le développement. Le nombre d'opérations du pivot de Gauss est de l'ordre de $n^3$.

## Pour aller plus loin

!!! question "Bonus 1 - L'inverse"
    Si $\det M \neq 0$, la matrice $M$ a une inverse :

    $$
    M^{-1} = \frac{1}{\det M} \times {}^t(\operatorname{com} M)
    $$

    Écris `inverse(M: Matrice[float]) -> Matrice[float]`, avec la précondition $\det M \neq 0$. Vérifie que `inverse([[2, 1], [1, 1]])` vaut `[[1, -1], [-1, 2]]`, puis que `produit(M, inverse(M))` donne l'identité à de petites erreurs d'arrondi près.

!!! question "Bonus 2 - Un dessin par produits de Kronecker"
    1. Écris `dessin[T](M: Matrice[T]) -> str` qui renvoie une chaîne avec un caractère `"#"` pour chaque coefficient non nul, une espace pour chaque `0`, et `"\n"` à la fin de chaque ligne. La fonction **renvoie** la chaîne, l'affichage se fait en dehors : `print(dessin(...))`.
    2. On part de `S = [[1, 1], [1, 0]]`. Sur ton cahier : dessine $S \otimes S$.
    3. Calcule $S \otimes S \otimes S \otimes S$ avec ta fonction `kronecker` et affiche son dessin. Que reconnais-tu ? Que se passe-t-il à chaque produit de plus ?

!!! question "Bonus 3 - Un pivot nul"
    On prend `P = [[0, 1], [1, 1]]`.

    1. Que vaut `determinant(P)` ? Que se passe-t-il quand on appelle `triangulaire(P)` ? Pourquoi ?
    2. Échanger deux lignes d'une matrice change le signe de son déterminant. Écris `echange[T](M: Matrice[T], i: int, k: int) -> Matrice[T]`, qui renvoie une nouvelle matrice où les lignes `i` et `k` sont échangées.
    3. Écris `determinant_gauss_complet(M: Matrice[float]) -> float` : quand le pivot est nul, elle cherche plus bas dans la colonne une ligne dont le coefficient n'est pas nul, échange les deux lignes et change le signe du résultat. Si toute la fin de la colonne est nulle, le déterminant vaut `0`. Vérifie sur `P`, puis sur `[[1, 2], [2, 4]]`.
