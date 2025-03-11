# Algorithme de Dijkstra 


Dijkstra est un algorithme de plus court chemin dans un graphe pondéré (avec des poids non négatifs) qui permet, à partir d’un sommet source s, de trouver les distances minimales vers tous les autres sommets.


Le principe est le suivant :

On va maintenir un dictionnaire de $distances$ au sommet source $s$.

La distance à tous les sommets est initialement infinie, sauf pour $s$ qui aura une distance de 0 à lui-même.

On maintient aussi une liste de prédécesseurs. De quel sommet vient-on sur le plus court chemin?


```
distance_depart : dict[str, int]
prédécesseur : dict[str, str]

pour chaque sommet v de V :
    distance_depart[v] = ∞
    prédécesseur[v] = NIL
distance_depart[s] = 0

Q = ensemble de tous les sommets
```

Puis:

```
Tant que Q n'est pas vide:
    Extraire de Q le sommet u tel que distance[u] est minimal

    Pour chaque voisin v de u :
        relacher l'arc (u, v) 
```

Ensuite, on peut calculer les distances et les prédécesseurs.

```python
def dijkstra(depart: str, g: gr.graphe) -> tuple[dict[str, float], dict[str, str]]:
    """
    """
    f = [depart]
    distance_depart = {s: float('inf') for s in gr.sommets(g)}
    distance_depart[depart] = 0
    precedent: dict[str, str] = dict()

    while len(f) > 0:
        # On défile toujours le sommet dont la distance à la source est la plus petite
        u = min(f, key=lambda sommet: distance_depart[sommet])
        f.remove(u)

        # Pour chaque voisin v
        for v in gr.get_voisins(u, g):
            # si la nouvelle distance de v à la source est plus courte que celle déjà calculée dans le dico
            if distance_depart[v] > distance_depart[u] + gr.poids(u, v, g):
                # On met à jour la distance dans le dico
                distance_depart[v] = distance_depart[u] + gr.poids(u, v, g)
                # Jusqu'ici, On vient de u pour le plus court chemin du depart à v
                precedent[v] = u
                # Si v n'a pas encore fait partie de f, on l'enfile
                if v not in f:
                    f.append(v)
    return distance_depart, precedent
```



```python
import heapq

def dijkstra(depart: str, g: gr.graphe) -> tuple[dict[str, float], dict[str, str]]:
    """
    """
    f = [depart]
    distance_depart = {s: float('inf') for s in gr.sommets(g)}
    distance_depart[depart] = 0
    precedent: dict[str, str] = dict()

    while len(f) > 0:
        # On défile toujours le sommet dont la distance à la source est la plus petite
        u = min(f, key=lambda sommet: distance_depart[sommet])
        f.remove(u)

        # Pour chaque voisin v
        for v in gr.get_voisins(u, g):
            # si la nouvelle distance de v à la source est plus courte que celle déjà calculée dans le dico
            if distance_depart[v] > distance_depart[u] + gr.poids(u, v, g):
                # On met à jour la distance dans le dico
                distance_depart[v] = distance_depart[u] + gr.poids(u, v, g)
                # Jusqu'ici, On vient de u pour le plus court chemin du depart à v
                precedent[v] = u
                # Si v n'a pas encore fait partie de f, on l'enfile
                if v not in f:
                    f.append(v)
    return distance_depart, precedent
```