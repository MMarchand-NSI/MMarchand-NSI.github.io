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
    from structures.graphes import graphe_no as gr
    from structures.lineaires import file

    def bfs(depart: str, g: gr.Graphe) -> list[str]
    ```


??? warning "Corrigé BFS"

    ```python
    def bfs(depart: str, g: gr.Graphe) -> list[str]:
        f = file.creer()
        file.enfiler(depart, f)
        visites = {depart}
        ordre = []
        while not file.est_vide(f):
            u = file.defiler(f)
            ordre.append(u)   # Zone 1 - traitement du noeud dans l'ordre
            for v in gr.get_voisins(u, g):
                # Zone 2 - Découverte d'un voisin
                if v not in visites:
                    # Zone 3 - Le voisin découvert n'a jamais été vu
                    visites.add(v)
                    file.enfiler(v, f)
        return ordre
    ```

!!! question "Parcours en profondeur - Depth First Search (DFS)"

    De la même manière, en vous inspirant du travail sur les arbres binaires, écrire une fonction qui réalise le parcours en profondeur d'un graphe.

    On se souviendra que la différence entre un parcours en largeur et en profondeur ne tient pas à grand chose dans le code. 

    ```python
    def dfs(depart: str, g: gr.Graphe) -> list[str]
    ```



??? warning "Corrigé DFS"

    La seule différence avec le BFS est l'utilisation d'une pile au lieu d'une file.

    ```python
    from structures.lineaires import pile

    def dfs(depart: str, g: gr.Graphe) -> list[str]:
        p = pile.creer()
        pile.empiler(depart, p)
        visites = {depart}
        ordre = []
        while not pile.est_vide(p):
            u = pile.depiler(p)
            ordre.append(u)
            for v in gr.get_voisins(u, g):
                if v not in visites:
                    visites.add(v)
                    pile.empiler(v, p)
        return ordre
    ```

!!! question "Connexité"
    En utilisant une des fonctions précédentes, écrire la fonction suivante:

    ```python
        def est_connexe(g: gr.Graphe) -> bool
    ```

    On pourra tester avec le graphe non connexe du cours, cette fonction peut faire une ligne.

??? warning "Corrigé Connexité"

    Un graphe est connexe si, en partant d'un sommet quelconque, on peut atteindre tous les autres sommets.

    ```python
    def est_connexe(g: gr.Graphe) -> bool:
        return len(bfs(gr.sommets(g)[0], g)) == gr.nb_sommets(g)
    ```

!!! question "Cyclicité"
    En vous appuyant sur le BFS, écrire la fonction suivante:

    ```python
        def est_cyclique(g: gr.Graphe) -> bool
    ```


??? warning "Corrigé Cyclicité"

    Un graphe non orienté est cyclique si, lors d'un BFS, on tente d'enfiler un sommet déjà visité qui n'est pas le parent du sommet courant.

    ```python
    def est_cyclique(g: gr.Graphe) -> bool:
        depart = gr.sommets(g)[0]
        f = file.creer()
        file.enfiler(depart, f)
        parent: dict[str, str] = {depart: ""}
        while not file.est_vide(f):
            u = file.defiler(f)
            for v in gr.get_voisins(u, g):
                if v not in parent:
                    parent[v] = u
                    file.enfiler(v, f)
                elif v != parent[u]:
                    return True
        return False
    ```

!!! question "Sous graphe"
    - Ecrire une fonction qui renvoie le sous graphe constitué des sommets dans la liste:

    ```python
        def sous_graphe(sommets: list[str], g: gr.Graphe) -> gr.Graphe
    ```


??? warning "Corrigé Sous graphe"

    ```python
    def sous_graphe(sommets: list[str], g: gr.Graphe) -> gr.Graphe:
        sg = gr.creer()
        for s in sommets:
            gr.ajouter_sommet(s, sg)
        for s in sommets:
            for v in gr.get_voisins(s, g):
                if v in sommets:
                    gr.set_arete(s, v, sg, gr.poids(s, v, g))
        return sg
    ```

!!! question "Composantes connexes"

    Le graphe non connexe du cours possède 2 composantes connexes.
    
    - En utilisant des fonctions précédentes, écrire une fonction permettant de récupérer la liste des composantes connexe.

    ```python
        def composantes_connexes(g: gr.Graphe) -> list[gr.Graphe]
    ```



??? warning "Corrigé Composantes connexes"

    L'opérateur `-` sur les ensembles (`set`) réalise la **différence ensembliste** : `A - B` renvoie les éléments de `A` qui ne sont pas dans `B`.

    `reste -= set(cc)` retire donc de `reste` tous les sommets de la composante connexe qu'on vient de découvrir.

    ```python
    def composantes_connexes(g: gr.Graphe) -> list[gr.Graphe]:
        reste = set(gr.sommets(g))
        composantes = []
        while len(reste) > 0:
            depart = next(iter(reste))
            cc = bfs(depart, g)
            reste -= set(cc)
            composantes.append(sous_graphe(cc, g))
        return composantes
    ```

!!! question "Plus court chemins - Non pondéré"
    On peut trouver le plus court chemin entre 2 sommets d'un graphe **non pondéré** en réalisant un parcours en largeur qui renvoie un dictionnaire des prédécesseurs.
    Dès qu'on découvre un sommet non visité, on le découvre forcément depuis son prédécesseur sur son plus court chemin à la source.

    Ensuite, en examinant le dictionnaire des prédécesseurs, on peut en déduire le plus court chemin
    
    1. Ecrire une fonction:

    ```python
        def predecesseurs_bfs(g: gr.Graphe, s1: str) -> dict[str, str]
    ```

    2. Ecrire une fonction:

    ```python
        def shortest_path(g: gr.Graphe, s1: str, s2: str) -> list[str]
    ```

    3. Ecrire une fonction distance qui renvoie la longueur du plus court chemin entre $s1$ et $s2$ dans le graphe $g$

    ```python
        def distance(g: gr.Graphe, s1: str, s2: str) -> int
    ```


??? warning "Corrigé prédécesseurs"
    
    ```python
    def predecesseurs_bfs(g: gr.Graphe, s1: str) -> dict[str, str]:
        """
        Retourne le dictionnaire des prédécesseurs de voisins découverts
        en partant de s1 par un parcours en largeur dans le graphe non
        pondéré g.
        """
        f = file.creer()
        file.enfiler(s1, f)
        π: dict[str, str] = {s1: ""}        # Plugin prédécesseur
        while not file.est_vide(f):
            u = file.defiler(f)
            for v in gr.get_voisins(u, g):
                if v not in π:
                    π[v] = u                # Plugin prédécesseur
                    file.enfiler(v, f)
        return π
    ```

    On définit la distance entre 2 sommets comme la longueur du plus court chemin entre ces sommets.
    On veut montrer que pour n'importe quel sommet $s2$, en remontant $\pi$, on
    obtient le plus court chemin de $s2$ à $s1$.

??? warning "Corrigé shortest_path"

    ```python
    def shortest_path(g: gr.Graphe, s1: str, s2: str) -> list[str]:
        π = predecesseurs_bfs(g, s1)
        if s2 not in π:
            return []
        chemin = []
        courant = s2
        while courant != "":
            chemin.append(courant)
            courant = π[courant]
        chemin.reverse()
        return chemin
    ```

??? warning "Corrigé distance"

    ```python
    def distance(g: gr.Graphe, s1: str, s2: str) -> int:
        return len(shortest_path(g, s1, s2)) - 1
    ```

!!! question "Indicateurs courants sur les graphes"
    
    En seconde (oui je sais c'est loin), vous avez peut-être découvert les notions d'excentricité, de rayon, de diamètre de graphe,
    ainsi que des éléments d'explication permettant une première approche d'interprétation de ces valeurs.

    Vous écrirez les fonctions suivantes en une ligne ou deux à l'aide de listes en compréhension et des fonctions min et max.

    La fonction distance de l'exercice précédent est nécessaire.

    ```python
    def excentricite(g: gr.Graphe, s: str) -> int:
        """
        Retourne l'excentricité du sommet s dans le graphe non pondéré g.
        L'excentricité d'un sommet est la distance à son sommet le plus éloigné.
        """
        return ...

    def centre(g: gr.Graphe) -> list[str]:
        """
        Retourne le centre du graphe g.
        Le centre du graphe est l'ensemble des sommets ayant la plus petite excentricité.
        On appelle de tels sommets des sommets centraux.
        Les sommets centraux sont stratégiquement importants, par exemple pour placer un serveur, un relais,
        un entrepôt. Ils minimisent la distance maximale à tous les autres sommets.
        """
        ...
        return ...

    def rayon(g: gr.Graphe) -> int:
        """
        Retourne le rayon du graphe non pondéré g.
        Le rayon d'un graphe est l'excentricité des sommets centraux.
        Il représente la distance maximale de n'importe quel sommet aux sommets centraux.
        """
        return ...

    def diametre(g: gr.Graphe) -> int:
        """
        Retourne le diamètre du graphe non pondéré g.
        Le diamètre d'un graphe est la distance maximum entre 2 sommets du graphe.
        Il donne une idée de son étendue. Un graphe avec un petit diamètre est dit efficace, ou compact.
        """
        return ...
    ```

??? warning "Corrigé Indicateurs"

    ```python
    def excentricite(g: gr.Graphe, s: str) -> int:
        return max(distance(g, s, v) for v in gr.sommets(g) if v != s)

    def centre(g: gr.Graphe) -> list[str]:
        r = rayon(g)
        return [s for s in gr.sommets(g) if excentricite(g, s) == r]

    def rayon(g: gr.Graphe) -> int:
        return min(excentricite(g, s) for s in gr.sommets(g))

    def diametre(g: gr.Graphe) -> int:
        return max(excentricite(g, s) for s in gr.sommets(g))
    ```

!!! question "Arbre couvrant"

    On supposera le graphe connexe.

    En théorie des graphes, un arbre est tout simplement un graphe connexe acyclique.
    Les arbres que nous avons vus précédemment sont dits enracinés car ils possèdent un sommet spécial qu'on appelle la racine.

    Construire un arbre à partir du dictionnaire des prédécesseurs. On appelle ce graphe un arbre couvrant.

    ```python
    def get_arbre_couvrant(g: gr.Graphe) -> gr.Graphe:
    ```

    Sur les graphes pondérés, il est fréquent de rechercher l'arbre couvrant de poids minimum (Minimum Spanning Tree).
    Il représente le minimum de ce qui peut tout connecter au moindre coût.

??? warning "Corrigé Arbre couvrant"

    On construit l'arbre couvrant à partir du dictionnaire des prédécesseurs : chaque entrée `π[v] = u` donne une arête de l'arbre.

    ```python
    def get_arbre_couvrant(g: gr.Graphe) -> gr.Graphe:
        depart = gr.sommets(g)[0]
        π = predecesseurs_bfs(g, depart)
        arbre = gr.creer()
        for s in π:
            gr.ajouter_sommet(s, arbre)
        for v, u in π.items():
            if u != "":
                gr.set_arete(u, v, arbre, gr.poids(u, v, g))
        return arbre
    ```

!!! question "Plugin distances"
    Reprendre la question sur les distances à partir de l'algorithme sur les prédécesseurs.
    En modifiant le bfs, créer un plugin distance qui renvoie le dictionnaire des distances au sommet de départ.


??? warning "Corrigé Plugin distances"

    La distance d'un voisin découvert est celle de son parent + 1.

    ```python
    def distances_bfs(g: gr.Graphe, s1: str) -> dict[str, int]:
        f = file.creer()
        file.enfiler(s1, f)
        dist: dict[str, int] = {s1: 0}       # Plugin distance
        while not file.est_vide(f):
            u = file.defiler(f)
            for v in gr.get_voisins(u, g):
                if v not in dist:
                    dist[v] = dist[u] + 1    # Plugin distance
                    file.enfiler(v, f)
        return dist
    ```

!!! tip "Graphe exemple (pondéré)"

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

    ```python
    def graphe_exemple() -> gr.Graphe:
        g = gr.creer()
        gr.set_arete("A", "B", g, 85)
        gr.set_arete("A", "C", g, 217)
        gr.set_arete("A", "E", g, 173)
        gr.set_arete("B", "F", g, 80)
        gr.set_arete("C", "G", g, 186)
        gr.set_arete("C", "H", g, 103)
        gr.set_arete("H", "D", g, 183)
        gr.set_arete("H", "J", g, 167)
        gr.set_arete("F", "I", g, 250)
        gr.set_arete("E", "J", g, 502)
        gr.set_arete("I", "J", g, 84)
        return g
    ```

!!! tip "Graphe exemple2 (non pondéré)"
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

    ```python
    def graphe_exemple2() -> gr.Graphe:
        g = gr.creer()
        gr.set_arete("A", "J", g)
        gr.set_arete("A", "M", g)
        gr.set_arete("B", "G", g)
        gr.set_arete("B", "J", g)
        gr.set_arete("B", "L", g)
        gr.set_arete("B", "M", g)
        gr.set_arete("C", "G", g)
        gr.set_arete("C", "L", g)
        gr.set_arete("D", "E", g)
        gr.set_arete("E", "K", g)
        gr.set_arete("E", "L", g)
        gr.set_arete("F", "G", g)
        gr.set_arete("G", "H", g)
        gr.set_arete("G", "I", g)
        gr.set_arete("G", "J", g)
        gr.set_arete("J", "L", g)
        return g
    ```