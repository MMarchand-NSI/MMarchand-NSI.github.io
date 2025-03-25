# Algorithme de Dijkstra 


Dijkstra est un algorithme de plus court chemin dans un graphe pondéré (avec des poids non négatifs) qui permet, à partir d’un sommet source s, de trouver les distances minimales vers tous les autres sommets.


Le principe est le suivant :

- L’algorithme maintient un tableau (ou dictionnaire) `distance`, qui stocke pour chaque sommet \(v\) une valeur estimée de la distance minimale \(d(v)\) depuis la source \(s\).
- À chaque itération, Dijkstra **choisit** parmi les sommets non encore "retirés" celui qui a la plus petite distance estimée et le "verrouille"
- Pour ce sommet \(u\) ainsi choisi, on dit que sa distance est **définitive**, car on ne la modifiera plus ensuite.
- Puis on **relâche** toutes les arêtes sortant de \(u\), si on découvre un chemin plus court via \(u\).


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
        relacher l'arête (u, v) si nécessaire
```

Relacher l'arc (u, v) signifie que, si la distance de la source à v en passant par u est plus petite que la distance déjà connue, on met à jour cette distance dans le dictionnaire (on a trouvé une plus petite distance source->v).

Pourquoi le mot "relâcher"? Ca vient de la terminologie de l’optimisation. On dit qu’on "relâche" une contrainte ou un majorant quand on le réduit si une meilleure valeur est trouvée. On relâche l'ancienne valeur pour adopter la nouvelle.


```python
def dijkstra(depart: str, g: gr.graphe) -> tuple[dict[str, float], dict[str, str]]:
    """
    Version dite naîve d'implémentation de l'algorithme de dijkstra.
    Normalement, f est une file de priorité pour des raisons de réduction drastique de complexité, mais cette structure n'est pas au programme.
    Le principe de l'algorithme reste exactement le même cependant.
    """
    f = [depart]

    # Initialisation des distances au sommet de départ (infinies à l'origine, sauf pour le sommet de départ)
    distance_depart = {s: float('inf') for s in gr.sommets(g)}
    distance_depart[depart] = 0
    # Initialisation du dictionnaire des sommets précédents.
    # avoir "A":"Z" dedans signifie que "Z" est avant "A" dans le plus court chemin du depart à "A"
    # Ce dictionnaire permettra de reconstituer tous les plus courts chemins au sommet de départ.
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

---

Voici **l’idée générale** de la démonstration de la **correction** de l’algorithme de Dijkstra (dans un graphe à **poids d’arêtes non négatifs**). On énonce souvent cette preuve sous forme d’un **invariant** qui est préservé à chaque étape, ou par **induction** sur la taille de l’ensemble de sommets déjà “fixés” par Dijkstra.


## Énoncé de l’invariant

Soit \(S\) l’ensemble des sommets définitivement “fixés” (ou « extraits » de la structure de priorité, selon l’implémentation).  
**Invariant** : Pour tout sommet \(x \in S\), la valeur `distance[x]` coïncide *exactement* avec la **distance réelle** la plus courte de \(s\) à \(x\).

Nous allons montrer :

1. L’invariant est vrai avant toute itération (initialement, seul le sommet source \(s\) a `distance[s] = 0`, et c’est bien la distance réelle).  
2. Il est **préservé** à chaque étape (si l’invariant est vrai, alors après avoir choisi le prochain sommet et fait les relâchements, il reste vrai).  
3. Quand l’algorithme se termine, tous les sommets de \(V\) (ou en tout cas ceux qui sont atteignables depuis \(s\)) ont leur distance correcte.

---

## Preuve (esquisse)

1. **Initialisation**  
   - Au début, `distance[s] = 0` et `distance[v] = +∞` pour \(v \neq s\). Le seul sommet éventuellement “fixé” est \(s\), ou bien aucun si on attend la première étape pour “fixer” un sommet.  
   - De toute façon, `distance[s] = 0` est la bonne distance de \(s\) à lui-même, et `distance[v] = +∞` est un majorant correct pour les autres.

2. **Choix du sommet \(u\) et vérification de sa distance**  
   Supposons que tous les sommets déjà dans \(S\) (verrouillés) ont leur distance exacte. L’algorithme choisit un sommet \(u\notin S\) qui a la plus petite distance estimée parmi ceux restants.  
   - **Idée-clé** : si `distance[u]` n’était **pas** la véritable distance de \(s\) à \(u\), cela signifierait qu’il existerait un chemin plus court \(\pi\) de \(s\) vers \(u\), passant (forcément) par un sommet \(w\) qui n’est pas encore « fixé ».  
   - Or, si un tel chemin plus court existait, alors `distance[w]` (ou un autre sommet intermédiaire) serait nécessairement **plus petit** que `distance[u]`, donc on aurait extrait ce sommet \(w\) avant \(u\) (puisque Dijkstra choisit toujours le plus petit).  
   - Cette contradiction montre que `distance[u]` est en réalité **exacte**.  
   - On ajoute alors \(u\) à \(S\).

3. **Relâchements des arêtes sortant de \(u\)**  
   On met à jour la distance de ses voisins \(v\). Cela ne viole pas l’invariant pour les sommets **déjà** dans \(S\), puisqu’on ne touche pas à leurs distances (ils restent fixés).  
   - Pour les sommets hors de \(S\), on **abaisse** éventuellement la distance estimée si on découvre un chemin plus court passant par \(u\). Mais comme \(u\) est maintenant correct, ces nouvelles valeurs restent de bonnes estimations (ou s’améliorent).

4. **Induction**  
   - Au démarrage, l’invariant est vrai pour le sommet source \(s\).  
   - Si, à l’itération \(k\), l’invariant est vrai pour les sommets dans \(S\), alors après avoir choisi un nouveau sommet \(u\) et relâché ses arêtes, \(S\cup\{u\}\) conserve la propriété.  
   - Lorsque l’algorithme se termine (ou quand tous les sommets atteignables depuis \(s\) ont été choisis), chaque sommet de \(S\) a sa distance « figée » et **exacte**.

**Conclusion** : L’ensemble final des distances (\(\text{distance}[v]\)) renvoyé par Dijkstra coïncide donc avec les **plus courtes distances** de \(s\) à chaque sommet \(v\).  

