# Guirlande

Une guirlande est une rangée de lumières qui s'allument et s'éteignent selon un motif répétitif. Dans ce projet, la grille n'a qu'une seule ligne.

Installer metagrid dans le terminal : `uv add metagrid`

Crée un fichier `guirlande.py` avec ce squelette :

```python
"""
Guirlande
Contrôler le temps grâce au modulo.
"""

import metagrid

NB_COLONNES = 20
NB_LIGNES   = 1
TAILLE_CASE = 60

COULEUR_ALLUMEE = "#FFDD00"
COULEUR_ETEINTE = "#222222"

grille: list[list[bool]]
guirlande: list[bool]   # alias de grille[0]

jeu: metagrid.AbstractEngine


def init():
    global grille, guirlande
    guirlande = []
    for _ in range(NB_COLONNES):
        guirlande.append(False)
    grille = [guirlande]


def update():
    global guirlande
    pass


def draw():
    global guirlande
    pass


if __name__ == "__main__":
    jeu = metagrid.create(NB_LIGNES, NB_COLONNES, TAILLE_CASE, 4)
    jeu.on_init(init)
    jeu.on_update(update)
    jeu.on_draw(draw)
    jeu.start()
```

## Étape 1 - La guirlande

!!! question "Une grille à une seule ligne"
    La grille ne contient qu'une liste. `guirlande = grille[0]` est un **alias** : c'est un autre nom pour désigner la même liste. Modifier `guirlande[3]` modifie aussi `grille[0][3]`.

    1. Combien de lignes a la grille ? Combien de colonnes ?
    2. Que vaut `guirlande[0]` après `init` ? Et `guirlande[19]` ?
    3. Quelle instruction allume la lampe d'indice 4 ?

## Étape 2 - Afficher la guirlande

Puisqu'il n'y a qu'une seule ligne, `i` vaut toujours `0` dans `set_cell_color`. La boucle ne porte que sur `j`.

!!! question "Fonction `draw`"
    Complétez `draw` pour colorier chaque lampe selon son état :

    ```python
    def draw():
        global guirlande
        for j in range(NB_COLONNES):
            if guirlande[j]:
                jeu.set_cell_color(0, j, ...)
            else:
                jeu.set_cell_color(0, j, ...)
    ```

    Dans `update`, allumez uniquement la lampe 0 pour tester :

    ```python
    def update():
        global guirlande
        guirlande[0] = True
    ```

    Lancez le programme. Vous devez voir une seule lampe allumée à gauche.

## Étape 3 - Allumer des lampes précises

!!! question "Lampes individuelles"
    Dans `update`, allumez les lampes aux indices 0, 5, 10 et 15 en quatre instructions. Toutes les autres restent éteintes.

    ```python
    def update():
        global guirlande
        for j in range(NB_COLONNES):
            guirlande[j] = False
        guirlande[0]  = ...
        guirlande[5]  = ...
        guirlande[10] = ...
        guirlande[15] = ...
    ```

    Que remarquez-vous sur les indices 0, 5, 10, 15 ? Quel est l'écart entre eux ?

!!! question "Toutes les lampes"
    Modifiez `update` pour allumer **toutes** les lampes en utilisant une boucle `for`.

!!! question "Toutes les lampes éteintes"
    Modifiez `update` pour éteindre **toutes** les lampes. Combien d'instructions faut-il ?

## Étape 4 - Le modulo et le quotient

L'opérateur `%` donne le **reste de la division entière**. `7 % 3` vaut `1` car 7 = 2×3 + **1**.
L'opérateur `//` donne le **quotient entier**. `7 // 3` vaut `2`.

### Calculer

!!! question "Modulo à la main"
    Calculez à la main, puis vérifiez dans l'interpréteur :

    | Expression | Résultat |
    |---|---|
    | `4 % 2` | ? |
    | `5 % 2` | ? |
    | `9 % 3` | ? |
    | `10 % 3` | ? |
    | `11 % 3` | ? |
    | `0 % 5` | ? |
    | `7 % 5` | ? |
    | `20 % 20` | ? |
    | `21 % 20` | ? |

!!! question "Quotient entier à la main"
    Calculez à la main, puis vérifiez dans l'interpréteur :

    | Expression | Résultat |
    |---|---|
    | `6 // 3` | ? |
    | `7 // 3` | ? |
    | `8 // 3` | ? |
    | `9 // 3` | ? |
    | `5 // 2` | ? |
    | `1 // 5` | ? |
    | `9 // 10` | ? |

!!! question "Tables croisées"
    Complétez pour `j` de 0 à 11 :

    | `j`      |  0 |  1 |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10 | 11 |
    |----------|----|----|----|----|----|----|----|----|----|----|----|----|
    | `j % 4`  |  ? |  ? |  ? |  ? |  ? |  ? |  ? |  ? |  ? |  ? |  ? |  ? |
    | `j // 4` |  ? |  ? |  ? |  ? |  ? |  ? |  ? |  ? |  ? |  ? |  ? |  ? |

    1. Que représente `j % 4` visuellement ? (indice : imaginez les 12 lampes découpées en groupes de 4)
    2. Que représente `j // 4` ?
    3. Pour une lampe `j` quelconque, si on connaît `j // 4` et `j % 4`, peut-on retrouver `j` ?

### Prédire des motifs

Pour chaque question, **prédisez** quelles lampes sont allumées sur 12 lampes (j = 0 à 11), puis vérifiez dans le programme.

!!! question "Motifs avec `%`"

    | Condition          | Lampes allumées (parmi 0..11) |
    |--------------------|-------------------------------|
    | `j % 2 == 0`       | ? |
    | `j % 2 == 1`       | ? |
    | `j % 4 == 0`       | ? |
    | `j % 4 == 3`       | ? |
    | `j % 3 < 2`        | ? |
    | `j % 5 < 3`        | ? |
    | `j % 6 < 1`        | ? |

!!! question "Motifs avec `//`"

    | Condition              | Lampes allumées (parmi 0..11) |
    |------------------------|-------------------------------|
    | `j // 4 == 0`          | ? |
    | `j // 4 == 1`          | ? |
    | `j // 4 % 2 == 0`      | ? |
    | `j // 3 % 2 == 0`      | ? |

    Pour la dernière ligne : que vaut `j // 3` pour `j = 0, 1, 2` ? Pour `j = 3, 4, 5` ? Quel motif obtient-on ?

### Construire des motifs

!!! question "Écrire la condition"
    Pour chaque motif ci-dessous, écrivez la condition `guirlande[j] = (...)` qui le produit. Testez dans le programme.

    1. Lampes allumées : 0, 3, 6, 9
    2. Lampes allumées : 1, 4, 7, 10
    3. Lampes allumées : 0, 1, 4, 5, 8, 9 (groupes de 2 allumées, 2 éteintes)
    4. Lampes allumées : 0, 1, 2, 6, 7, 8 (2 blocs de 3)
    5. Lampes allumées : 2, 3, 6, 7, 10, 11 (2 dernières de chaque groupe de 4)

!!! question "Motif symétrique"
    On veut allumer la première et la dernière lampe de chaque groupe de 6 : lampes 0, 5, 6, 11, 12, 17, 18.

    1. Que vaut `j % 6` pour chacune de ces lampes ?
    2. Écrivez la condition.

## Étape 5 - Motifs périodiques

!!! question "Une lampe sur deux"
    Complétez `update` pour allumer toutes les lampes **paires** (indices 0, 2, 4, 6...) :

    ```python
    def update():
        global guirlande
        for j in range(NB_COLONNES):
            guirlande[j] = (j % 2 == ...)
    ```

    Puis modifiez pour allumer les lampes **impaires** (indices 1, 3, 5...).

!!! question "Une lampe sur trois"
    Allumez les lampes 0, 3, 6, 9, 12, 15, 18.

    ```python
    def update():
        global guirlande
        for j in range(NB_COLONNES):
            guirlande[j] = (j % ... == 0)
    ```

!!! question "Décaler le motif"
    1. Allumez les lampes 1, 4, 7, 10, 13, 16, 19. Quelle condition faut-il utiliser ?
    2. Allumez les lampes 2, 5, 8, 11, 14, 17. Quelle condition ?

!!! question "Groupes"
    L'expression `j % 5 < 2` vaut `True` quand le reste de la division par 5 est 0 ou 1.

    1. Pour quels indices `j % 5 < 2` est-il `True` ?
    2. Décrivez le motif obtenu : combien de lampes allumées ? combien d'éteintes ? dans quel ordre ?
    3. Modifiez pour avoir **3 lampes allumées** suivies de **2 éteintes**.

## Étape 6 - Animation

`jeu.frame_no` s'incrémente automatiquement de 1 à chaque frame.

!!! question "Une lumière qui fait le tour"
    `jeu.frame_no % len(guirlande)` donne l'indice de la lampe à allumer à chaque frame.

    Complétez `update` pour qu'une seule lampe soit allumée à la fois, et qu'elle avance d'une position à chaque frame :

    ```python
    def update():
        global guirlande
        for j in range(NB_COLONNES):
            guirlande[j] = (j == jeu.frame_no % ...)
    ```

    1. À la frame 0, quelle lampe est allumée ? À la frame 1 ? À la frame 20 ?
    2. Pourquoi la lumière repart-elle au début après la dernière lampe ?
    3. Utilisez `jeu.frame_no // 5` à la place de `jeu.frame_no` pour ralentir. Que change `// 5` ?

!!! question "Décaler avec `frame_no`"
    Remplacez `j % 3 == 0` par `(j + jeu.frame_no) % 3 == 0` :

    ```python
    def update():
        global guirlande
        for j in range(NB_COLONNES):
            guirlande[j] = ((j + jeu.frame_no) % 3 == 0)
    ```

    1. Que se passe-t-il ?
    2. À la frame 0, quelles lampes sont allumées ? À la frame 1 ? À la frame 3 ?
    3. Pourquoi le motif revient-il au même état toutes les 3 frames ?

!!! question "Ralentir avec la division entière"
    L'opérateur `//` donne la **division entière** : `7 // 3` vaut `2`.

    | `jeu.frame_no` | `jeu.frame_no // 10` |
    |---|---|
    | 0 | ? |
    | 5 | ? |
    | 9 | ? |
    | 10 | ? |
    | 19 | ? |
    | 20 | ? |

    1. `jeu.frame_no // 10` ne change de valeur que toutes les combien de frames ?
    2. La valeur change donc combien de fois par seconde ?

!!! question "Appliquer le ralentissement"
    Remplacez `jeu.frame_no` par `jeu.frame_no // 10` dans `update` et observez.

    Que se passe-t-il si on utilise `// 5` ? `// 30` ?

!!! question "Inverser le sens"
    Pour faire défiler le motif dans l'autre sens, remplacez `+` par `-` dans `(j + jeu.frame_no // 10) % 3 == 0`.

    Expliquez pourquoi cela inverse la direction.

!!! question "Pour aller plus loin"
    1. Plusieurs couleurs : au lieu d'un booléen, calculer `(j + jeu.frame_no // 10) % 3` et choisir une couleur selon que le résultat vaut 0, 1 ou 2. Il faudra changer `guirlande` en `list[str]`.
    2. Vitesse variable : stocker la vitesse dans une variable entière et la modifier avec les touches `+` et `-`.
    3. Motif symétrique : allumer les lampes telles que `j % 6 == 0` ou `j % 6 == 5` (les bords de chaque groupe de 6). Quel motif obtient-on ?
