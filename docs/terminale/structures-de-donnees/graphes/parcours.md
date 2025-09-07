# Parcours de graphes

!!! warning "Pré-requis"
    Les algorithmes de parcours en profondeur et en largeur des arbres doivent être maîtrisés.


Les exercices suivants portent uniquement sur les graphes non orientés.

!!! question "Parcours en largeur - BFS (Breadth First Search)"
    Faites l'exercice de vous rappeler du parcours en largeur sur les arbres binaires sans consulter le cours.

    Si on l'applique tel quel, le problème est qu'on boucle infiniment sur des cycles. Il faut donc garder en mémoire quels sommets on a enfilé pour ne pas les enfiler plusieurs fois.
    En effet, un sommet enfilé sera nécessairement traité, et il ne faut pas qu'il puisse être enfilé plusieurs fois. 

    - Ecrire une méthode de parcours itératif en largeur des sommets d'un graphe. Le comportement de visite est l'accumulation du sommet dans une liste renvoyée.

    ```python
    from structures.lineaires import file
    def bfs(depart: str, g: graphe) -> list[str]
    ```


!!! question "Parcours en profondeur - Depth First Search (DFS)"

    De la même manière, en vous inspirant du travail sur les arbres binaires, écrire une fonction qui réalise le parcours en profondeur d'un graphe.

    On se souviendra que la différence entre un parcours en largeur et en profondeur ne tient pas à grand chose dans le code. 

    ```python
    def dfs(depart: str, g: graphe) -> list[str]
    ```



!!! question "Connexité"
    En utilisant une des fonctions précédentes, écrire la fonction suivante:

    ```python
        def est_connexe(g: graphe) -> bool
    ```

    On pourra tester avec le graphe non connexe du cours, cette fonction peut faire une ligne.


!!! question "Sous graphe"
    - Ecrire une fonction qui renvoie le sous graphe constitué des sommets dans la liste:

    ```python
        def sous_graphe(sommets: list[str], g: graphe) -> graphe
    ```


!!! question "Composantes connexes"

    Le graphe non connexe du cours possède 2 composantes connexes.
    
    - En utilisant des fonctions précédentes, écrire une fonction permettant de récupérer la liste des composantes connexe.

    ```python
        def composantes_connexes(g: graphe) -> list[graph]
    ```



!!! question "Plus court chemins - Non pondéré"
    On peut trouver le plus court chemin entre 2 sommets d'un graphe **non pondéré** en réalisant un parcours en largeur qui renvoie un dictionnaire des prédécessurs.
    Dès qu'on découvre un sommet non visité, on le découvre forcément depuis son prédécesseur sur son plus court chemin à la source.

    Ensuite, en examinant le dictionnaire des prédécesseurs, on peut en déduire le plus court chemin
    
    1. Ecrire une fonction:

    ```python
        def predecesseurs_bfs(g: graphe, s1: str) -> dict[str, str]
    ```

    2. Ecrire une fonction:

    ```python
        def shortest_path(g: graphe, s1: str, s2: str) -> dict[str, str]
    ```

    3. Ecrire une fonction distance qui renvoie la longueur du plus court chemin entre $s1$ et $s2$ dans le graphe $g$

    ```python
        def distance(g: graphe, s1: str, s2: str) -> int
    ```


??? warning "Corrigé prédécesseurs"
    
    ```python
    def predecesseurs_bfs(g: gr.graphe, s1: str) -> dict[str, str]:
    """
    Retourne le dictionnaire des prédéceesseurs de voisins découverts
    en partant de s1 par un parcours en largeur dans le graphe non
    pondéré g.
    """
    f = file.creer()
    π: dict[str, str] = {s1: ""}
    while len(f) > 0:
        u = file.defiler(f)
        for v in gr.get_voisins(u, g):
            if v not in π:
                π[v] = u
                file.enfiler(f, v)
    return π
    ```

    On définit la distance entre 2 sommets comme la longueur du plus court chemin entre ces arêtes.
    On veut montrer que pour n'importe quel sommet $s2$, en remontant $\pi$, on
    obtient le plus court chemin $s1$


!!! question "Indicateurs courants sur les graphes"
    
    En seconde (oui je sais c'est loin), vous avez peut-être découvert les notions d'excentricité, de rayon, de diamètre de graphe,
    ainsi que des éléments d'explication permettant une première approche d'interprétation de ces valeurs.

    Vous écrirez les fonctions suivantes en une ligne ou deux à l'aide de listes en compréhension et des fonctions min et max.

    La fonction distance de l'exercice précédent est nécessaire.

    ```python
    def excentricite(g: gr.graphe, s: str) -> int:
        """
        Retourne l'excentricité du sommet s dans le graphe non pondéré g.
        L'excentricité d'un sommet est la distance à son sommet le plus éloigné.
        """
        return ...

    def centre(g: gr.graphe) -> list[str]:
        """
        Retourne le centre du graphe g.
        Le centre du graphe est l'ensemble des sommets ayant la plus petite excentricité.
        On appelle de tels sommets des somemts centraux.
        Les sommets centraux sont stratégiquement importants, par exemple pour placer un serveur, un relais,
        un entrepôt. Ils minimisent la distance maximale à tous les autres sommets.
        """
        ...
        return ...

    def rayon(g: gr.graphe) -> int:
        """
        Retourne le rayon du graphe non pondéré g.
        Le rayon d'un graphe est l'excentricité des sommets centraux.
        Il représente la distance maximale de n'importe quel sommet aux sommets centraux.
        """
        return ...

    def diametre(g: gr.graphe) -> int:
        """
        Retourne le diamètre du graphe non pondéré g.
        Le diamètre d'un graphe est la distance maximum entre 2 sommets du graphe.
        Il donne une idée de son étendue. Un graphe avec un petit diamètre est dit efficace, ou compact.
        """
        return ...
    ```

!!! question "Arbre couvrant"

    On supposera le graphe connexe.

    En théorie des graphes, un arbre est tout simplement un graphe connexe acyclique.
    Les arbres que nous avons vus précédemment sont dits enracinés car ils possèdent un sommet spécial qu'on appelle la racine.

    Construire un arbre à partir du dictionnaire des prédécesseurs. On appelle ce graphe un arbre couvrant.

    ```python
    def get_arbre_couvrant(g: graphe) -> graphe:
    ```

    Sur les graphes pondérés, il est fréquent de rechercher l'arbre couvrant de poids minimum (Minimum Spanning Tree).
    Il représente le minimum de ce qui peut tout connecter au moindre coût.


!!! tip "Graphe exemple"
    
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