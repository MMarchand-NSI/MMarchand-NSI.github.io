# Exercices sur les séquences

## Exercices sur les séquences en Python

!!! question "Exercice 1 : Création et accès"
    1. Créer une liste `temperatures` contenant les températures suivantes : 18.5, 20.0, 19.3, 21.2, 17.8
    2. Afficher la première température
    3. Afficher la dernière température
    4. Afficher la température du milieu (3ème élément)

!!! question "Exercice 2 : Longueur et indices"
    1. Créer un tuple `jours` contenant : "lundi", "mardi", "mercredi", "jeudi", "vendredi"
    2. Afficher le nombre de jours dans ce tuple
    3. Afficher le jour à l'indice 2
    4. Afficher le dernier jour en utilisant un indice négatif

!!! question "Exercice 3 : Slicing (tranches)"
    Soit la liste `notes = [12, 15, 8, 14, 16, 11, 13]`:

    1. Extraire les 3 premières notes
    2. Extraire les 2 dernières notes
    3. Extraire les notes de l'indice 2 à 4 (inclus)
    4. Extraire toutes les notes sauf la première et la dernière

!!! question "Exercice 4 : Modification de listes"
    1. Créer une liste `fruits = ["pomme", "banane", "orange"]`
    2. Remplacer "banane" par "kiwi"
    4. Afficher la liste finale

!!! question "Exercice 5 : Concaténation"
    1. Créer deux listes : `nombres1 = [1, 2, 3]` et `nombres2 = [4, 5, 6]`
    2. Créer une nouvelle liste `tous_nombres` qui combine les deux listes
    3. Afficher le résultat

!!! question "Exercice 6 : Répétition"
    1. Créer une liste contenant 60 fois le nombre 0
    2. Créer un tuple contenant 42 fois la chaîne "NSI"
    3. Afficher les résultats

!!! question "Exercice 7 : Test d'appartenance"
    Soit `prenoms = ["Alice", "Bob", "Charlie", "David"]`

    1. Vérifier si "Bob" est dans la liste
    2. Vérifier si "Eve" est dans la liste
    3. Afficher les résultats avec des messages explicites

!!! question "Exercice 8 : Fonctions natives min, max, sum"
    Soit `scores = [85, 92, 78, 95, 88]`

    1. Afficher le score minimum
    2. Afficher le score maximum
    3. Calculer et afficher la somme des scores
    4. Calculer et afficher la moyenne des scores

!!! question "Exercice 9 : Immuabilité des tuples"
    1. Créer un tuple `coordonnees = (3, 7)`
    2. Essayer de modifier le premier élément (observer l'erreur)
    3. Créer un nouveau tuple `nouvelles_coord` avec des valeurs différentes
    4. Expliquer dans un commentaire pourquoi on ne peut pas modifier un tuple

!!! question "Exercice 10 : Mini-projet - Bulletin de notes"
    Créer un programme qui :

    1. Stocke dans une liste les notes suivantes : 14, 16, 12, 15, 13
    2. Stocke dans un tuple les coefficients : 1, 2, 1, 1, 2
    3. Calcule la moyenne pondérée (sans boucle, en accédant directement aux indices)
    - Formule : (note0×coef0 + note1×coef1 + ...) / (somme des coefficients)
    4. Affiche la moyenne avec un message approprié


## Fonctions avec des séquences


!!! hint "Utiliser les doctests (tests unitaires automatiques)"

    Mettez le code suivant à la fin de votre fichier:

    ```python
    if __name__ == "__main__":
        import doctest
        doctest.testmod()  # Exécute tous les doctests
    ```

    Il permet d'exécuter automatiquement les doctests lorsque vous exécutez le programme python.

    Les doctests sont les instructions précédées de `>>> ` dans la docstring.

    Le code suivant veut dire que quand on exécutera premier_element([18.5, 20.0, 19.3]), on attend que la fonction renvoie 18.5

    ```python
    >>> premier_element([18.5, 20.0, 19.3])
    18.5
    ```

    Si le test est passant (il marche), alors python ne dira rien du tout. Sinon il râle.

    Dans le code que je vous fournis, j'annule l'exécution des doctests en indiquant `# doctest: +SKIP`

    Ca vous permet de copier coller tout le texte d'un exercice, et d'activer les doctests de la fonction sur laquelle vous travaillez en supprimant  `# doctest: +SKIP`



!!! question "Exercice 1 : Fonctions d'accès aux éléments"
    Écrire les fonctions suivantes :

    ```python
    def premier_element(sequence: list) -> int | float | str:
        """Renvoie le premier élément d'une séquence
        
        >>> premier_element([18.5, 20.0, 19.3])     # doctest: +SKIP
        18.5
        >>> premier_element(['a', 'b', 'c'])     # doctest: +SKIP
        'a'
        """
        pass

    def dernier_element(sequence: list) -> int | float | str:
        """Renvoie le dernier élément
        
        >>> dernier_element([18.5, 20.0, 19.3])     # doctest: +SKIP
        19.3
        >>> dernier_element([1, 2, 3, 4, 5])     # doctest: +SKIP
        5
        """
        pass

    def element_milieu(sequence: list) -> int | float | str:
        """Renvoie l'élément du milieu (longueur impaire)
        
        >>> element_milieu([18.5, 20.0, 19.3, 21.2, 17.8])     # doctest: +SKIP
        19.3
        >>> element_milieu([1, 2, 3])     # doctest: +SKIP
        2
        """
        pass
    ```

!!! question "Exercice 2 : Fonctions de vérification"
    Écrire les fonctions suivantes :

    ```python
    def est_vide(sequence: list | tuple) -> bool:
        """Renvoie True si la séquence est vide, False sinon
        
        >>> est_vide([])     # doctest: +SKIP
        True
        >>> est_vide([1, 2, 3])     # doctest: +SKIP
        False
        >>> est_vide(())     # doctest: +SKIP
        True
        """
        pass

    def longueur_paire(sequence: list | tuple) -> bool:
        """Renvoie True si la longueur est paire
        
        >>> longueur_paire([1, 2, 3, 4])     # doctest: +SKIP
        True
        >>> longueur_paire([1, 2, 3])     # doctest: +SKIP
        False
        >>> longueur_paire([])     # doctest: +SKIP
        True
        """
        pass

    def contient(sequence: list | tuple, element: int | float | str) -> bool:
        """Renvoie True si l'élément est dans la séquence
        
        >>> contient([1, 2, 3], 2)     # doctest: +SKIP
        True
        >>> contient([1, 2, 3], 5)     # doctest: +SKIP
        False
        >>> contient(['a', 'b', 'c'], 'b')     # doctest: +SKIP
        True
        """
        pass
    ```

!!! question "Exercice 3 : Fonctions de découpage"
    Écrire les fonctions suivantes :

    ```python
    def trois_premiers(sequence: list) -> list:
        """Renvoie les 3 premiers éléments
        
        >>> trois_premiers([12, 15, 8, 14, 16, 11, 13])     # doctest: +SKIP
        [12, 15, 8]
        >>> trois_premiers([1, 2, 3, 4, 5])     # doctest: +SKIP
        [1, 2, 3]
        """
        pass

    def deux_derniers(sequence: list) -> list:
        """Renvoie les 2 derniers éléments
        
        >>> deux_derniers([12, 15, 8, 14, 16, 11, 13])     # doctest: +SKIP
        [11, 13]
        >>> deux_derniers([1, 2, 3, 4, 5])     # doctest: +SKIP
        [4, 5]
        """
        pass

    def sans_extremes(sequence: list) -> list:
        """Renvoie la séquence sans le premier et le dernier élément
        
        >>> sans_extremes([12, 15, 8, 14, 16, 11, 13])     # doctest: +SKIP
        [15, 8, 14, 16, 11]
        >>> sans_extremes([1, 2, 3, 4])     # doctest: +SKIP
        [2, 3]
        """
        pass
    ```

!!! question "Exercice 4 : Fonctions de statistiques simples"
    Écrire les fonctions suivantes :

    ```python
    def minimum(sequence: list[int | float]) -> int | float:
        """Renvoie le plus petit élément
        
        >>> minimum([85, 92, 78, 95, 88])     # doctest: +SKIP
        78
        >>> minimum([3.5, 2.1, 4.8])     # doctest: +SKIP
        2.1
        """
        pass

    def maximum(sequence: list[int | float]) -> int | float:
        """Renvoie le plus grand élément
        
        >>> maximum([85, 92, 78, 95, 88])     # doctest: +SKIP
        95
        >>> maximum([3.5, 2.1, 4.8])     # doctest: +SKIP
        4.8
        """
        pass

    def etendue(sequence: list[int | float]) -> int | float:
        """Renvoie la différence entre le max et le min
        
        >>> etendue([85, 92, 78, 95, 88])     # doctest: +SKIP
        17
        >>> etendue([10, 20, 30])     # doctest: +SKIP
        20
        """
        pass

    def moyenne(sequence: list[int | float]) -> float:
        """Calcule la moyenne des éléments
        
        >>> moyenne([85, 92, 78, 95, 88])     # doctest: +SKIP
        87.6
        >>> moyenne([10, 20, 30])     # doctest: +SKIP
        20.0
        """
        pass
    ```

!!! question "Exercice 5 : Fonctions de création"
    Écrire les fonctions suivantes :

    ```python
    def creer_liste_zeros(n: int) -> list[int]:
        """Renvoie une liste de n zéros
        
        >>> creer_liste_zeros(5)     # doctest: +SKIP
        [0, 0, 0, 0, 0]
        >>> creer_liste_zeros(3)     # doctest: +SKIP
        [0, 0, 0]
        """
        pass

    def creer_liste_constante(n: int, valeur: int | float | str) -> list:
        """Renvoie une liste de n fois la même valeur
        
        >>> creer_liste_constante(4, 7)     # doctest: +SKIP
        [7, 7, 7, 7]
        >>> creer_liste_constante(3, 'NSI')     # doctest: +SKIP
        ['NSI', 'NSI', 'NSI']
        """
        pass

    def concatener(seq1: list, seq2: list) -> list:
        """Renvoie la concaténation de deux séquences
        
        >>> concatener([1, 2, 3], [4, 5, 6])     # doctest: +SKIP
        [1, 2, 3, 4, 5, 6]
        >>> concatener(['a', 'b'], ['c', 'd'])     # doctest: +SKIP
        ['a', 'b', 'c', 'd']
        """
        pass
    ```

!!! question "Exercice 6 : Fonctions de modification"
    Écrire les fonctions suivantes :

    ```python
    def remplacer_premier(liste: list, nouvelle_valeur: int | float | str) -> list:
        """Remplace le premier élément et renvoie la liste modifiée
        
        >>> remplacer_premier([1, 2, 3], 10)     # doctest: +SKIP
        [10, 2, 3]
        >>> remplacer_premier(['a', 'b', 'c'], 'z')     # doctest: +SKIP
        ['z', 'b', 'c']
        """
        pass

    def remplacer_dernier(liste: list, nouvelle_valeur: int | float | str) -> list:
        """Remplace le dernier élément
        
        >>> remplacer_dernier([1, 2, 3], 10)     # doctest: +SKIP
        [1, 2, 10]
        >>> remplacer_dernier(['a', 'b', 'c'], 'z')     # doctest: +SKIP
        ['a', 'b', 'z']
        """
        pass

    def ajouter_element(liste: list, element: int | float | str) -> list:
        """Ajoute un élément à la fin et renvoie la liste
        
        >>> ajouter_element([1, 2, 3], 4)     # doctest: +SKIP
        [1, 2, 3, 4]
        >>> ajouter_element(['a', 'b'], 'c')     # doctest: +SKIP
        ['a', 'b', 'c']
        """
        pass
    ```

!!! question "Exercice 7 : Fonctions de comparaison"
    Écrire les fonctions suivantes :

    ```python
    def meme_longueur(seq1: list | tuple, seq2: list | tuple) -> bool:
        """Renvoie True si les deux séquences ont la même longueur
        
        >>> meme_longueur([1, 2, 3], [4, 5, 6])     # doctest: +SKIP
        True
        >>> meme_longueur([1, 2], [3, 4, 5])     # doctest: +SKIP
        False
        >>> meme_longueur((1, 2), [3, 4])     # doctest: +SKIP
        True
        """
        pass

    def plus_longue(seq1: list, seq2: list) -> list:
        """Renvoie la séquence la plus longue
        
        >>> plus_longue([1, 2, 3], [4, 5])     # doctest: +SKIP
        [1, 2, 3]
        >>> plus_longue([1], [2, 3, 4, 5])     # doctest: +SKIP
        [2, 3, 4, 5]
        """
        pass

    def ont_element_commun(seq1: list, seq2: list) -> bool:
        """Renvoie True si au moins un élément est présent dans les deux séquences
        
        >>> ont_element_commun([1, 2, 3], [3, 4, 5])     # doctest: +SKIP
        True
        >>> ont_element_commun([1, 2], [3, 4])     # doctest: +SKIP
        False
        >>> ont_element_commun(['a', 'b'], ['b', 'c'])     # doctest: +SKIP
        True
        """
        pass
    ```

!!! question "Exercice 8 : Fonctions avec indices"
    Écrire les fonctions suivantes :

    ```python
    def element_a_position(sequence: list, position: int) -> int | float | str | None:
        """Renvoie l'élément à la position donnée, None si position invalide
        
        >>> element_a_position([10, 20, 30, 40], 2)     # doctest: +SKIP
        30
        >>> element_a_position([10, 20, 30], 5)     # doctest: +SKIP
        
        >>> element_a_position(['a', 'b', 'c'], 0)     # doctest: +SKIP
        'a'
        """
        pass

    def echanger_extremes(liste: list) -> list:
        """Échange le premier et le dernier élément
        
        >>> echanger_extremes([1, 2, 3, 4, 5])     # doctest: +SKIP
        [5, 2, 3, 4, 1]
        >>> echanger_extremes(['a', 'b', 'c'])     # doctest: +SKIP
        ['c', 'b', 'a']
        """
        pass

    def inverser_paire(liste: list) -> list:
        """Inverse les deux premiers éléments
        
        >>> inverser_paire([1, 2, 3, 4])     # doctest: +SKIP
        [2, 1, 3, 4]
        >>> inverser_paire(['a', 'b', 'c'])     # doctest: +SKIP
        ['b', 'a', 'c']
        """
        pass
    ```

!!! question "Exercice 9 : Fonctions de validation"
    Écrire les fonctions suivantes :

    ```python
    def tous_positifs(sequence: list[int | float]) -> bool:
        """Vérifie que tous les nombres sont positifs
        
        >>> tous_positifs([1, 2, 3, 4])     # doctest: +SKIP
        True
        >>> tous_positifs([1, -2, 3])     # doctest: +SKIP
        False
        >>> tous_positifs([0, 5, 10])     # doctest: +SKIP
        True
        """
        pass

    def au_moins_un_negatif(sequence: list[int | float]) -> bool:
        """Vérifie s'il y a au moins un nombre négatif
        
        >>> au_moins_un_negatif([5, -3, 12, 8])     # doctest: +SKIP
        True
        >>> au_moins_un_negatif([1, 2, 3])     # doctest: +SKIP
        False
        >>> au_moins_un_negatif([0, -1, 5])     # doctest: +SKIP
        True
        """
        pass

    def dans_intervalle(sequence: list[int | float], min_val: int | float, max_val: int | float) -> bool:
        """Vérifie que tous les éléments sont entre min_val et max_val
        
        >>> dans_intervalle([5, 8, 12, 15], 0, 20)     # doctest: +SKIP
        True
        >>> dans_intervalle([5, -3, 12], 0, 20)     # doctest: +SKIP
        False
        >>> dans_intervalle([10, 12, 15], 10, 15)     # doctest: +SKIP
        True
        """
        pass
    ```


!!! question "Exercice 11 : Fonctions avancées - Coordonnées 2D"

    Créer un système de gestion de points dans un plan :

    ```python
    def creer_point(x: float, y: float) -> tuple[float, float]:
        """Crée un point sous forme de tuple (x, y)
        
        >>> creer_point(3.0, 4.0)     # doctest: +SKIP
        (3.0, 4.0)
        >>> creer_point(-2.5, 1.5)     # doctest: +SKIP
        (-2.5, 1.5)
        """
        pass

    def abscisse(point: tuple[float, float]) -> float:
        """Renvoie l'abscisse du point
        
        >>> abscisse((3.0, 4.0))     # doctest: +SKIP
        3.0
        >>> abscisse((-2.5, 1.5))     # doctest: +SKIP
        -2.5
        """
        pass

    def ordonnee(point: tuple[float, float]) -> float:
        """Renvoie l'ordonnée du point
        
        >>> ordonnee((3.0, 4.0))     # doctest: +SKIP
        4.0
        >>> ordonnee((-2.5, 1.5))     # doctest: +SKIP
        1.5
        """
        pass

    def distance_origine(point: tuple[float, float]) -> float:
        """Calcule la distance du point à l'origine
        
        >>> distance_origine((3.0, 4.0))     # doctest: +SKIP
        5.0
        >>> distance_origine((0.0, 0.0))     # doctest: +SKIP
        0.0
        """
        # Utiliser la formule: racine(x² + y²)
        pass

    def milieu(point1: tuple[float, float], point2: tuple[float, float]) -> tuple[float, float]:
        """Calcule le point milieu entre deux points
        
        >>> milieu((0.0, 0.0), (4.0, 6.0))     # doctest: +SKIP
        (2.0, 3.0)
        >>> milieu((1.0, 2.0), (3.0, 4.0))     # doctest: +SKIP
        (2.0, 3.0)
        """
        pass

    def creer_rectangle(point1: tuple[float, float], point2: tuple[float, float]) -> list[tuple[float, float]]:
        """Crée une liste de 4 points formant un rectangle
        
        >>> creer_rectangle((0.0, 0.0), (2.0, 3.0))     # doctest: +SKIP
        [(0.0, 0.0), (2.0, 0.0), (2.0, 3.0), (0.0, 3.0)]
        """
        # Les deux points donnés sont des coins opposés
        pass
    ```

!!! question "Exercice 12 : Fonctions de formatage"

    Écrire les fonctions suivantes :

    ```python
    def formater_liste(sequence: list) -> str:
        """Renvoie une chaîne du type: '[elem1, elem2, elem3]'
        
        >>> formater_liste([1, 2, 3])     # doctest: +SKIP
        '[1, 2, 3]'
        >>> formater_liste(['a', 'b'])     # doctest: +SKIP
        '[a, b]'
        """
        pass

    def creer_email(prenom: str, nom: str, domaine: str) -> str:
        """Crée une adresse email
        
        >>> creer_email("Jean", "Dupont", "lycee.fr")     # doctest: +SKIP
        'jean.dupont@lycee.fr'
        >>> creer_email("Marie", "Martin", "ecole.org")     # doctest: +SKIP
        'marie.martin@ecole.org'
        """
        # Penser à utiliser .lower() pour mettre en minuscules
        pass
    ```

!!! question "Exercice 13 : Fonctions avec tuples de taille fixe"

    ```python
    def creer_date(jour: int, mois: int, annee: int) -> tuple[int, int, int]:
        """Crée un tuple représentant une date
        
        >>> creer_date(15, 3, 2024)     # doctest: +SKIP
        (15, 3, 2024)
        >>> creer_date(1, 1, 2000)     # doctest: +SKIP
        (1, 1, 2000)
        """
        pass

    def jour_de(date: tuple[int, int, int]) -> int:
        """Extrait le jour d'une date
        
        >>> jour_de((15, 3, 2024))     # doctest: +SKIP
        15
        >>> jour_de((1, 12, 2023))     # doctest: +SKIP
        1
        """
        pass

    def mois_de(date: tuple[int, int, int]) -> int:
        """Extrait le mois d'une date
        
        >>> mois_de((15, 3, 2024))     # doctest: +SKIP
        3
        >>> mois_de((1, 12, 2023))     # doctest: +SKIP
        12
        """
        pass

    def annee_de(date: tuple[int, int, int]) -> int:
        """Extrait l'année d'une date
        
        >>> annee_de((15, 3, 2024))     # doctest: +SKIP
        2024
        >>> annee_de((1, 12, 2023))     # doctest: +SKIP
        2023
        """
        pass

    def date_valide(date: tuple[int, int, int]) -> bool:
        """Vérifie si une date est valide (jours entre 1-31, mois entre 1-12)
        
        >>> date_valide((15, 3, 2024))     # doctest: +SKIP
        True
        >>> date_valide((32, 1, 2024))     # doctest: +SKIP
        False
        >>> date_valide((15, 13, 2024))     # doctest: +SKIP
        False
        >>> date_valide((0, 5, 2024))     # doctest: +SKIP
        False
        """
        pass
    ```

