# Parcours de graphes


!!! tip "Graphe exemple"
    Dans un premier temps vous ignorerez les poids (les nombres sur les arêtes)
    ```mermaid
    graph LR
    A((A)) ---|85| B((B))
    A ---|217| C((C))
    A ---|173| E((E))
    B ---|80 | F((F))
    C ---|186| G((G))
    C ---|103| H((H))
    H ---|183| D((D))
    H ---|167| J((J))
    F ---|250| I((I))
    E ---|502| J
    I ---|84 | J

    ```


!!! tip "Graphe exemple2"
    ```mermaid
    graph
    A((A)) --- J((J))
    A --- M((M))
    B((B)) --- G((G))
    B --- J
    B --- L((L))
    B --- M
    C((C)) --- G
    C --- L((L))
    D((D)) --- E((E))
    E --- K((K))
    E --- L
    F((F)) --- G
    G --- H((H))
    G --- I((I))
    G --- J
    J --- L

    ```



!!! question "Parcours en profondeur - DFS (Depth First Search)"
    - Faites l'exercice de vous rappeler du parcours en profondeur préfixe sur les arbres binaires sans consulter le cours.

    - Ecrire l'ordre des visites pour un parcours en profondeur des graphes exemples de cette manière. Je vous conseille de les recopier et de gribouiller au papier.

    Ici, le problème est qu'on peut indéfiniment boucler sur des cycles de sommets. Il faut donc garder en mémoire quels sommets on a visité pour ne pas les visiter plusieurs fois. 

    - En vous inspirant de ce fonctionnement, écrire une méthode de parcours récursif en profondeur des sommets d'un graphe. Le comportement de visite est l'affichage du nom du noeud.

    ```python
    def dfs(g: GrapheNO, depart: str, visites: list[str])
    ```

!!! question "Graphes connexes"

    En utilisant la fonction dfs, écrire un algorithme qui détermine si un graphe est connexe ou pas. 

    ```python
    def is_connexe(g: GrapheNO)
    ```

!!! question "Composantes connexes"
    En utilisant la fonction dfs, écrire un algorithme qui détermine renvoie la liste des composantes connexes d'un graphe. (Une composante connexe est un sous-graphe, donc un Graphe) 

!!! question "Parcours en largeur - Breadth Firsst Search (BFS)"
    Donnez l'ordre des visites pour le parcours en largeur du graphe exemple.

    De la même manière, en vous inspirant du travail sur les arbres binaires, écrire une fonction qui réalise le parcours en largeur d'un graphe.


!!! question "Plus court chemin - Non pondéré"
    On peut trouver le plus court chemin entre 2 sommets d'un graphe non pondéré en réalisant un parcours en largeur depuis le premier sommet jusqu'à visiter le deuxième sommet.
    Ecrire une fonction
    ```python
        def shortest_path(g: GrapheNO, s1: str, s2: str) -> list[str]
    ```



!!! question "IMPLEMENTATION Graphes pondérés non orientés"
    ```mermaid
        graph LR
        A((A)) ---|4| B((B))
        A ---|7| C((C))
        B ---|2| D((D))
        B ---|5| E((E))
        C ---|3| F((F))
        D ---|6| G((G))
        E ---|1| G
        F ---|8| G

    ```

    Nous avons parfois besoin d'associer à une arête un poids (ou coût). Par exemple, dans un réseau informatique, il peut s'agir de la vitesse de connexion entre 2 machines. Dans un réseau routier, il peut s'agir de la distance entre deux endroits. Dans un réseau de neurone, il peut s'agir de l'importance à accorder à une connexion entre deux neurones...

    Dans la liste d'adjacence, on utilisera maintenant un disctionnaire de sommets accompagnés du poids de l'arête correspondante.

    La matrice d'adjacence contiendra les poids des arêtes.

    Proposez une implémentation de graphe pondéré non orienté.

