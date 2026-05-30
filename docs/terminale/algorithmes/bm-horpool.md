# Recherche de motif dans un texte

On cherche à résoudre le problème suivant : étant donné un **motif** (pattern) et un **texte**,
trouver la première position du texte à laquelle le motif apparaît, ou `None` s'il n'y apparaît pas.

La démarche sera progressive. On part de l'algorithme naïf, puis on le décompose soigneusement
en deux boucles imbriquées dont la structure devient le **socle commun** de tous les algorithmes suivants.
Ce socle contient un seul paramètre libre : le déplacement appliqué après chaque échec.
En y branchant des règles de saut de plus en plus informées, on obtient Horspool puis Boyer-Moore,
sans jamais changer la structure elle-même.

```
texte  :  a b r a c a d a b r a
motif  :  a b r a
          ^
          position 0 → correspondance trouvée
```

```
texte  :  i l   f a i t   b e a u
motif  :        f a i t
                ^
          position 3 → correspondance trouvée
```

---

## 1. Algorithme naïf

La solution la plus directe : tester le motif à chaque position possible du texte.

```python
def recherche_naive(motif: str, texte: str) -> int | None:
    n = len(texte)
    p = len(motif)
    for i in range(0, n - p + 1):
        if texte[i:i+p] == motif:
            return i
    return None
```

La boucle `for` parcourt toutes les positions de départ valides.
`range(0, n - p + 1)` garantit que le motif ne dépasse jamais la fin du texte.

---

## 2. Décomposer avec des intervalles semi-ouverts

On va décomposer la comparaison caractère par caractère et établir une structure de boucles
qui servira de socle pour toute la suite. On modifiera ensuite cette structure pour vérifier
le motif **en partant de la fin** : pourquoi ce sens-là prendra tout son sens plus loin.
Le raisonnement par **intervalles semi-ouverts** (de la forme $[a, b)$) rend les conditions de boucle très naturelles, évite tout débordement, et donne une forme suffisamment régulière pour y brancher différentes stratégies de saut.

### La boucle externe : fenêtre glissante

On fait glisser une fenêtre de taille `p` sur le texte.
La fenêtre en position `i` occupe les indices `[i, i+p)`.
Pour qu'elle tienne entièrement dans le texte `[0, n)`, il faut :

$$i + p \leq n$$

ce qui donne la condition de boucle `while i + p <= n`.
`i` parcourt donc l'intervalle $[0, n-p]$, soit $[0, n-p+1)$ en semi-ouvert.

### La boucle interne de gauche à droite

On compare `motif[j]` avec `texte[i+j]` pour `j` allant de `0` jusqu'à `p-1`.
`j` parcourt l'intervalle $[0, p)$, d'où la condition `j < p`.
Si la boucle s'arrête parce que `j == p`, le motif est entièrement reconnu.

```python
def recherche_naive_full(motif: str, texte: str) -> int | None:
    n = len(texte)
    p = len(motif)
    i = 0
    while i + p <= n:        # fenêtre [i, i+p) dans [0, n)
        j = 0
        while j < p and texte[i+j] == motif[j]:   # j parcourt [0, p)
            j += 1
        if j == p:           # sorti par le bord droit → motif trouvé
            return i
        i += 1
    return None
```

---

## 3. Variante : tester de droite à gauche

Comme énoncé précédemment, on peut aussi comparer les caractères **en partant de la fin** du motif.
`j` commence à `p` et descend jusqu'à `1` ; on accède à `motif[j-1]` et `texte[i+j-1]`.
`j` parcourt l'intervalle $(0, p]$, d'où la condition `j > 0`.
Si la boucle s'arrête parce que `j == 0`, le motif est entièrement reconnu.

```python
def recherche_naive_modif(motif: str, texte: str) -> int | None:
    n = len(texte)
    p = len(motif)
    i = 0
    while i + p <= n:        # fenêtre [i, i+p) dans [0, n)
        j = p
        while j > 0 and texte[i+j-1] == motif[j-1]:   # j parcourt (0, p]
            j -= 1
        if j == 0:           # sorti par le bord gauche → motif trouvé
            return i
        i += 1
    return None
```

### Symétrie des deux boucles internes

Les deux variantes sont parfaitement symétriques :

| | Gauche à droite | Droite à gauche |
|---|---|---|
| Initialisation | `j = 0` | `j = p` |
| Condition | `j < p` | `j > 0` |
| Avancement | `j += 1` | `j -= 1` |
| Condition de succès | `j == p` (bord droit) | `j == 0` (bord gauche) |
| Accès | `texte[i+j]`, `motif[j]` | `texte[i+j-1]`, `motif[j-1]` |

Dans les deux cas, le succès est détecté quand `j` **sort par le bord opposé** à son point de départ.
Cette symétrie n'est pas un hasard : elle reflète directement le fait que `j` balaie l'intervalle $[0, p)$,
d'un bout à l'autre.

!!! note "Pas de débordement"
    Dans la variante droite-gauche, l'indice d'accès au texte est `i+j-1` avec `j ∈ (0, p]`,
    donc `j-1 ∈ [0, p)` et `i+j-1 ∈ [i, i+p)`.
    La condition `i + p <= n` garantit `i+p-1 <= n-1` : aucun débordement d'indice.

---

## 4. Algorithme de Horspool

L'algorithme naïf avance toujours de 1 après un échec. On peut faire beaucoup mieux.

### Idée : sauter plus loin

Considérons la situation suivante. On cherche `"abra"` et la fenêtre courante contient :

```
texte :  . . . d . . . . . .
motif : [a b r a]
```

Même sans comparer un seul caractère, on peut affirmer que le motif ne peut pas commencer
aux trois positions suivantes non plus : si `'d'` n'apparaît pas dans `"abra"`,
il ne peut s'aligner avec aucune case du motif. Les fenêtres `i+1`, `i+2`, `i+3` échouent
nécessairement. On peut sauter directement à `i+4`.

Cette observation s'applique à chaque position : en lisant le caractère du texte
**aligné avec la dernière case du motif**, `texte[i+p-1]`, on connaît le saut minimal garanti
sans risquer de manquer une occurrence.

Ce caractère va forcément être comparé à `motif[p-1]` lors d'une prochaine fenêtre, à moins qu'on ne le dépasse.
En cherchant où ce caractère apparaît dans le motif, on peut calculer de combien décaler la fenêtre pour
que ce caractère s'aligne avec son occurrence la plus à droite dans le motif (hors dernière position),
sans risquer de "sauter par-dessus" une occurrence valide.

Prenons `motif = "abra"` (`p = 4`). La table des sauts sera `{a: 3, b: 2, r: 1}` (construite section suivante).
Après un échec, on lit `c = texte[i+3]` et on choisit le saut :

**Cas 1 : `c = 'd'`, absent du motif. Saut = `p = 4`.**

```
texte :  . . . d . . . . . .
motif : [a b r a]
                ↑ 'd' absent → décalage 4
motif :         [a b r a]
```

Aucune case du motif ne peut s'aligner sur ce `'d'` : on saute par-dessus.

**Cas 2 : `c = 'r'`, présent en position 2. Saut = `p-1-2 = 1`.**

```
texte :  . . . r . . . . . .
motif : [a b r a]
                ↑ 'r' en j=2 → décalage 1
motif :   [a b r a]
```

On avance de 1 pour aligner le `'r'` du motif avec le `'r'` du texte.

**Cas 3 : `c = 'b'`, présent en position 1. Saut = `p-1-1 = 2`.**

```
texte :  . . . b . . . . . .
motif : [a b r a]
                ↑ 'b' en j=1 → décalage 2
motif :     [a b r a]
```

**Cas 4 : `c = 'a'`, présent en position 0 (et en position 3, exclue). Saut = `p-1-0 = 3`.**

```
texte :  . . . a . . . . . .
motif : [a b r a]
                ↑ 'a' en j=0 (dernier avant p-1) → décalage 3
motif :       [a b r a]
```

Le `'a'` de position 3 est exclu du calcul (c'est le dernier caractère) pour éviter un saut nul.
On utilise donc l'occurrence la plus à droite **dans `motif[0..p-2]`**, ici en position 0.

### Table des sauts

On précalcule, pour chaque caractère `c` du motif (sauf le dernier), la distance qui le sépare de la fin :

```python
saut = {}
for j in range(0, p - 1):        # on exclut le dernier caractère
    saut[motif[j]] = p - 1 - j   # distance de j à la position p-1
```

Comme on itère de gauche à droite, une occurrence plus à droite **écrase** la précédente.
`saut[c]` contient donc la distance depuis l'**occurrence la plus à droite** de `c` dans `motif[0..p-2]` jusqu'à la position `p-1`.

Si `c` n'est pas dans la table (absent du motif, ou uniquement en dernière position),
le saut est `p` : on peut décaler la fenêtre entière au-delà de ce caractère.

!!! note "Pourquoi exclure le dernier caractère ?"
    Si on incluait `motif[p-1]` dans la table, on obtiendrait `saut[motif[p-1]] = 0`,
    ce qui produirait un saut nul et une boucle infinie.
    En l'excluant, un caractère présent **uniquement** en dernière position du motif
    donne bien un saut de `p` via `saut.get(c, p)`.

### Algorithme complet

```python
def horspool(motif: str, texte: str) -> int | None:
    n = len(texte)
    p = len(motif)

    # Précalcul de la table des sauts
    saut: dict[str, int] = {}
    for j in range(0, p - 1):
        saut[motif[j]] = p - 1 - j

    i = 0
    while i + p <= n:             # fenêtre [i, i+p) dans [0, n)
        j = p
        while j > 0 and texte[i+j-1] == motif[j-1]:   # j parcourt (0, p]
            j -= 1
        if j == 0:
            return i
        i += saut.get(texte[i+p-1], p)   # saut basé sur texte[i+p-1]
    return None
```

La seule différence avec `recherche_naive_modif` est la dernière ligne :
`i += 1` devient `i += saut.get(texte[i+p-1], p)`.

### Exemple de sauts

```
motif : a b r a        (p = 4)
saut  : a→3, b→2, r→1  (dernier 'a' à distance 1, mais 'a' en j=0 donne 3, en j=3 exclu)
```

Construisons la table pas à pas avec `range(0, 3)` :

| j | motif[j] | p-1-j | saut après cette itération |
|---|----------|-------|---------------------------|
| 0 | `a` | 3 | `{a: 3}` |
| 1 | `b` | 2 | `{a: 3, b: 2}` |
| 2 | `r` | 1 | `{a: 3, b: 2, r: 1}` |

`motif[3] = a` est ignoré. `a` garde donc la distance `3` (depuis `j=0`) et non `0` (depuis `j=3`).

Lors de la recherche dans `abracadabra` :

```
i=0 : a b r a c a d a b r a
      a b r a
      ← ← ← ✓  motif trouvé
```

Si aucune correspondance n'est trouvée et que `texte[i+p-1] = 'c'`, absent de la table,
on saute de `p = 4` positions d'un coup.

---

## Complexité

Jusqu'ici la complexité d'un algorithme était exprimée en fonction d'**une seule variable** (taille de la liste, hauteur de l'arbre...).
Ici deux paramètres indépendants interviennent : $n$ la taille du texte et $p$ la taille du motif.
La complexité est donc une fonction de deux variables $f(n, p)$.

### Algorithme naïf

La boucle externe effectue au plus $n - p + 1$ itérations.
À chaque itération, la boucle interne effectue au plus $p$ comparaisons.
La complexité dans le pire cas est donc :

$$O((n - p + 1) \times p) = O(n \times p)$$

Ce pire cas est atteint, par exemple, avec :

```
texte  :  a a a a a a a a a a   (n fois 'a')
motif  :  a a a a b              (p-1 fois 'a', puis 'b')
```

À chaque position, on compare $p - 1$ caractères `'a'` identiques avant de trouver la différence sur le dernier.

### Algorithme de Horspool

**Pire cas.** Le même exemple pathologique s'applique : `motif = "aaa...ab"` dans un texte de `'a'`.
La table donne `saut['a'] = 1` (le `'a'` le plus à droite dans `motif[0..p-2]` est en position $p-2$).
Chaque échec ne produit qu'un saut de 1 : on retombe sur $O(n \times p)$.

**Meilleur cas.** Si tous les caractères du texte sont absents du motif (saut par défaut $p$ à chaque fois) :

- la boucle externe effectue $n / p$ itérations,
- la boucle interne s'arrête au premier caractère (mismatch immédiat).

La complexité est alors $O(n / p)$, ce qui représente un gain d'un facteur $p$ par rapport au naïf.

**Cas moyen.** Sur un alphabet suffisamment grand (texte "générique"), la plupart des caractères sont absents du motif.
Le saut moyen est proche de $p$, et la complexité moyenne est $O(n / p)$.

### Résumé

| Algorithme | Pire cas | Meilleur / moyen cas |
|---|---|---|
| Naïf | $O(n \times p)$ | $O(n)$ (mismatch dès le 1er caractère) |
| Horspool | $O(n \times p)$ | $O(n / p)$ (sauts de taille $p$) |

Horspool n'améliore pas la complexité au sens asymptotique du terme : le pire cas reste $O(n \times p)$.
Ce qu'il améliore, c'est le **comportement moyen et au meilleur cas**.
C'est un exemple où deux algorithmes de même classe de complexité pire cas se comportent
très différemment sur des entrées typiques : l'analyse du pire cas ne suffit pas à rendre compte
de l'intérêt pratique de Horspool.

---

## Intérêt du prétraitement

### Le coût de la table des sauts

Construire la table coûte $O(p)$ : une seule passe sur le motif.
Ce coût est ensuite **amorti** sur l'ensemble de la recherche.
Sur un texte de longueur $n$, on effectue au mieux $n / p$ sauts,
chacun consultant la table en $O(1)$.
Le coût total $O(p + n/p)$ reste dominé par $O(n/p)$ dès que $n \gg p$.

L'investissement initial en $O(p)$ est rentabilisé dès les premières positions parcourues.

### Prétraiter une fois, interroger souvent

L'intérêt du prétraitement est encore plus net quand on cherche le **même motif dans plusieurs textes**.
La table est calculée une seule fois et réutilisée pour chaque texte :

```python
# Prétraitement unique
saut = {}
for j in range(0, p - 1):
    saut[motif[j]] = p - 1 - j

# Recherches multiples, sans recalcul
for texte in corpus:
    horspool_avec_table(motif, texte, saut)
```

C'est le principe général du prétraitement : **déplacer un coût fixe hors de la boucle critique**.

### Principe général

Le prétraitement est une technique fondamentale en algorithmique.
On accepte un coût initial pour structurer les données, afin d'accélérer toutes les opérations futures.

| Prétraitement | Coût | Ce qu'on accélère |
|---|---|---|
| Trier un tableau | $O(n \log n)$ | Recherche dichotomique en $O(\log n)$ au lieu de $O(n)$ |
| Table de hachage | $O(n)$ | Recherche en $O(1)$ au lieu de $O(n)$ |
| Index inversé (moteur de recherche) | $O(N)$ sur le corpus | Requête en $O(1)$ par rapport à la taille du corpus |
| Table des sauts (Horspool) | $O(p)$ sur le motif | Sauts de taille $p$ au lieu de 1 |

Dans chaque cas, la question est la même : **combien de requêtes faut-il pour amortir le coût du prétraitement ?**
Pour Horspool, une seule recherche suffit si le texte est assez long.

---

## Vers Boyer-Moore

Horspool ne tient compte que d'**un seul** caractère du texte pour décider du saut : `texte[i+p-1]`,
le dernier de la fenêtre. Boyer-Moore (1977) introduit deux règles qui exploitent davantage
d'information, et les combine en prenant le maximum des deux sauts.

### Règle du bon suffixe

C'est la règle la plus puissante. Quand la comparaison droite-gauche s'arrête en `j`,
on a déjà **validé** le suffixe `motif[j..p-1]` : on sait que cette chaîne apparaît dans le texte
à la position `i+j`. On peut l'utiliser pour sauter.

**Cas 1 : le suffixe validé réapparaît ailleurs dans le motif.**
On cherche la position `k < j` telle que `motif[k..k+(p-j)-1] == motif[j..p-1]`
et `motif[k-1] != motif[j-1]` (sinon on retomberait sur le même échec).
On décale de `j - k`.

```
motif :  a b c a b c        j=3, suffixe validé = "abc"
                             réapparaît en k=0 → saut 3
motif :        a b c a b c
```

**Cas 2 : aucune réapparition, mais un préfixe du motif est suffixe du bon suffixe.**
On cherche le plus long préfixe `motif[0..l-1]` qui soit aussi un suffixe de `motif[j..p-1]`.
On décale de `p - l`.

```
motif :  a b c d a b        j=4, suffixe validé = "ab"
                             préfixe "ab" = suffixe de "ab" → saut p-2 = 4
motif :          a b c d a b
```

**Cas 3 : aucun des deux.** Saut de `p`.

!!! note "Exercice 1 : règle du bon suffixe (cas 1 seulement)"
    Implémenter `bm_good_suffix(motif, texte)` en gérant uniquement le cas 1.

    - Précalcul : pour chaque longueur $l \in [1, p)$, trouver la position `k` la plus à droite
      telle que `motif[k..k+l-1] == motif[p-l..p-1]` avec `k + l < p`.
      Stocker dans `gs[l]` (liste indexée par longueur), `None` si absent.
    - Au moment du saut (suffixe validé de longueur `p - j`) :
      si `gs[p-j]` vaut `k`, saut = `j - k` ; sinon saut = `p`.
    - Vérifier sur `motif = "abcabc"` : `gs[3] = 0`, saut attendu = 3.

### Règle du mauvais caractère

Horspool utilise toujours `texte[i+p-1]`, même si l'échec s'est produit bien plus tôt.
La règle du mauvais caractère utilise le caractère **à l'endroit exact de la mismatch** :
quand la comparaison échoue en `j`, on lit `c = texte[i+j-1]` et on aligne
l'occurrence la plus à droite de `c` dans `motif[0..j-2]` avec cette position.

Le saut dépend à la fois de `c` et de `j` : il faut, pour chaque caractère,
connaître ses positions dans le motif afin de trouver la plus grande strictement inférieure à `j`.

!!! note "Exercice 2 : règle du mauvais caractère"
    Implémenter `bm_bad_char(motif, texte)`.

    - Précalcul : dictionnaire `positions[c]` = liste triée des indices de `c` dans le motif.
    - Au moment du saut (mismatch en `j`, mauvais caractère `c = texte[i+j-1]`) :
      chercher dans `positions.get(c, [])` la plus grande valeur strictement inférieure à `j`.
      Si elle vaut `k`, saut = `j - k` ; sinon saut = `j`.
    - S'assurer que le saut est toujours $\geq 1$.

    Comparer les sauts avec Horspool sur `motif = "abcabc"`, `texte = "xyzabxabcabcx"`.

### Boyer-Moore complet

!!! note "Exercice 3 : Boyer-Moore"
    Combiner les deux règles dans `boyer_moore(motif, texte)` :
    à chaque échec, calculer les deux sauts et prendre le maximum.
    S'assurer que le résultat est toujours $\geq 1$.

---

## Annexe : le cas du motif vide

!!! note "Motif vide : un cas ordinaire des intervalles semi-ouverts"
    Avec `p = 0`, aucune branche de code ne traite ce cas explicitement.
    Il est absorbé naturellement par le formalisme des intervalles semi-ouverts.

    **Boucle externe** : la fenêtre `[i, i+p)` devient `[i, i)`, un intervalle vide.
    La condition `i + p <= n` exprime qu'il est contenu dans `[0, n)` : vrai vacuitement dès `i = 0`.

    **Boucle interne** : `j` doit parcourir `(0, 0]` ou `[0, 0)`, deux intervalles vides.
    La condition de boucle est fausse dès le départ ; on sort immédiatement avec la valeur de succès (`j == 0` ou `j == p`).
    C'est la **vérité vacue** : aucun caractère n'a été comparé, donc aucun n'a pu être différent.

    **Table des sauts** : `range(0, p-1) = range(0, -1)` est vide, aucun calcul effectué.

    Avec des intervalles **fermés**, `[0, p-1]` pour `p = 0` donnerait `[0, -1]`, un intervalle sans sens
    qui nécessiterait un `if p == 0` explicite. Les semi-ouverts font disparaître ce cas particulier.
