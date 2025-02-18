# Algorithme de Dijkstra 


Dijkstra est un algorithme de plus court chemin dans un graphe pondéré (avec des poids non négatifs) qui permet, à partir d’un sommet source s, de trouver les distances minimales vers tous les autres sommets.


Le principe est le suivant :

On va maintenir un dictionnaire de $distances$ au sommet source $s$.

La distance à tous les sommets est initialement infinie, sauf pour $s$ qui aura une distance de 0 à lui-même.

On maintient aussi une liste de prédécesseurs. De quel sommet vient-on sur le plus court chemin?


```
distance : dict[str, int]
prédécesseur : dict[str, str]

pour chaque sommet v de V :
    distance[v] = ∞
    prédécesseur[v] = NIL
distance[s] = 0

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
import heapq

def dijkstra(source, g):
    """
    Calcule les distances minimales depuis le sommet source 
    vers tous les autres sommets du graphe g.

    """
    # 1) Initialisation des distances à l'infini, sauf la source à 0
    distances = {node: float('inf') for node in graph}
    distances[source] = 0
    predecesseurs = {}

    # 2) Création de la file de priorité (Tas-min)
    #    Elle contiendra des tuples (distance à la source, sommet)
    pq = [(0, source)]
    
    # 3) Ensemble pour marquer les sommets déjà visités
    visited = set()
    
    # 4) Boucle principale: Tant que la file n'est pas vide
    while pq:
        # On défile le sommet u le plus proche (distance min)
        dist_u, u = heapq.heappop(pq)
        
        # Si ce sommet n'est pas déjà visité
        if u not in visited:
        
            # On le marque comme visité
            visited.add(u)
            
            # Relâchement des arêtes sortantes de u
            for v in voisins(u, g):
                # dist_u = distance minimale connue pour atteindre u
                alt = dist_u + poids(u, v)  # possible distance pour aller jusqu'à v
                if alt < distances[v]:
                    # On a trouvé une plus petite distance de source à v
                    distances[v] = alt
                    # on renseigne le prédécesseur de v
                    predecesseur[v] = u
                    # On enfile v avec la nouvelle distance
                    heapq.heappush(pq, (alt, v))
    
    # distances[v] contient la distance la plus courte de source à v
    # predecesseur[v] contient le sommet prédécesseur de v sur le plus court chemin de source à v
    return distances, predecesseur
```