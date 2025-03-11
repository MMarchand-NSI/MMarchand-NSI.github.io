# Parcours de graphes

!!! warning "Pré-requis"
    Les algorithmes de parcours en profondeur et en largeur des arbres doivent être maîtrisés.


!!! tip "Graphe exemple"
    Dans un premier temps vous ignorerez les poids (les nombres sur les arêtes)
    
    ```graphviz dot g6.png
    graph G {
        rankdir=LR;
        node [shape=circle];

        A -- B [label="85"];
        A -- C [label="217"];
        A -- E [label="173"];
        B -- F [label="80"];
        C -- G [label="186"];
        C -- H [label="103"];
        H -- D [label="183"];
        H -- J [label="167"];
        F -- I [label="250"];
        E -- J [label="502"];
        I -- J [label="84"];
    }
    ```

!!! tip "Graphe exemple2"
    ```graphviz dot g7.png
    graph G {
        rankdir=LR;
        node [shape=circle];

        A -- J;
        A -- M;
        B -- G;
        B -- J;
        B -- L;
        B -- M;
        C -- G;
        C -- L;
        D -- E;
        E -- K;
        E -- L;
        F -- G;
        G -- H;
        G -- I;
        G -- J;
        J -- L;
    }
    ```

!!! question "Parcours en largeur - BFS (Breadth First Search)"
    Faites l'exercice de vous rappeler du parcours en largeur sur les arbres binaires sans consulter le cours.

    Si on l'applique tel quel, le problème est qu'on boucle infiniment sur des cycles. Il faut donc garder en mémoire quels sommets on a enfilé pour ne pas les enfiler plusieurs fois.
    En effet, un sommet enfilé sera nécessairement traité, et il ne faut pas qu'il puisse être enfilé plusieuurs fois. 

    - Ecrire une méthode de parcours itératif en largeur des sommets d'un graphe. Le comportement de visite est l'affichage du nom du noeud.

    ```python
    from structures.lineaires import file
    def bfs(depart: str, g: graphe)
    ```


!!! question "Parcours en profondeur - Depth First Search (DFS)"

    De la même manière, en vous inspirant du travail sur les arbres binaires, écrire une fonction qui réalise le parcours en profondeur d'un graphe.

    On se souviendra que la différence entre un parcours en largeur et en profondeur ne tient pas à grand chose dans le code. 

    ```python
    def dfs(depart: str, g: graphe)
    ```



!!! question "Connexité"
    A l'aide d'un parcours de graphe, écrire un algorithme
    ```python
        def est_connexe(g: graphe) -> bool
    ```

    On pourra tester avec le graphe non connexe du cours.

!!! question "Sous-graphe"
    Ecrire une fonction qui renvoie le sous graphe constitué des sommets dans la liste:
    ```python
        def sous_graphe(sommets: list[str], g: graphe) -> graphe
    ```

!!! question "Connexité 2"
    Ecrire une fonction permettant de récupérer une liste de sous graphes connexes:

    ```python
        def sous_graphes_connexes(g: graphe) -> list[graph]
    ```

!!! question "Arbre couvrant"

    On supposera le graphe connexe.

    1. Modifier le BSF pour qu'il renvoie un dictionnaire des noeuds précédant les noeuds découverts.
        - Lorsqu'un noeud $v$ est découvert à partir d'un noeud $u$, on y ajoute l'item $v:u$  

    2. Modifier à nouveau cette fonction pour qu'elle renvoie un graphe construit à partir du dictionnaire de noeuds précédents.

    On appelle ce graphe un arbre couvrant. En théorie des graphes, un arbre est un graphe connexe acyclique.
    Les arbres que nous avons vus précédemment sont dits enracinés car ils possèdent un sommet spécial qu'on appelle la racine.


!!! question "Plus court chemin - Non pondéré"
    On peut trouver le plus court chemin entre 2 sommets d'un graphe **non pondéré** en réalisant un parcours en largeur depuis le premier sommet jusqu'à visiter le deuxième sommet.

    
    Ecrire une fonction:

    ```python
        def shortest_path(g: graphe, s1: str, s2: str) -> list[str]
    ```
