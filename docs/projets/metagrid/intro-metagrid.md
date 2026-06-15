# Découverte de metagrid

`metagrid` est une bibliothèque Python qui affiche une grille dans une fenêtre et appelle tes fonctions quand le joueur clique ou appuie sur une touche.

Installer metagrid dans le terminal : `uv add metagrid`

## Repérage sur la grille

Chaque cellule de la grille est repérée par deux indices : `i` pour la ligne (de haut en bas) et `j` pour la colonne (de gauche à droite). L'indice commence à 0.

Copie et lance ce programme :

```python
import metagrid

NB_LIGNES   = 5
NB_COLONNES = 5
TAILLE_CASE = 100

jeu: metagrid.AbstractEngine


def init():
    pass


def draw():
    for i in range(NB_LIGNES):
        for j in range(NB_COLONNES):
            jeu.set_cell_color(i, j, "#CCCCCC")

    jeu.set_cell_color(0, 0, "#FF0000")
    jeu.set_cell_color(0, 4, "#0000FF")
    jeu.set_cell_color(4, 0, "#00AA00")
    jeu.set_cell_color(4, 4, "#FF8800")
    jeu.set_cell_color(2, 2, "#FFFF00")


if __name__ == "__main__":
    jeu = metagrid.create(NB_LIGNES, NB_COLONNES, TAILLE_CASE, 4)
    jeu.on_init(init)
    jeu.on_draw(draw)
    jeu.start()
```

!!! question "Observer"
    1. Quelle case est en rouge ? en bleu ? en vert ? en orange ?
    2. Quelle case est au centre de la grille ? Quel est son `(i, j)` ?
    3. Sans modifier le code, prédit la couleur de `(0, 2)`. Vérifie visuellement.
    4. Modifie une seule ligne pour colorier la case `(3, 1)` en violet (`"#AA00FF"`).

## La mécanique des callbacks

`metagrid` fonctionne avec des **callbacks** : tu écris des fonctions, et metagrid les appelle **automatiquement** au bon moment.

| Callback | Quand metagrid l'appelle |
|---|---|
| `init` | une seule fois, au démarrage |
| `update` | 60 fois par seconde, avant chaque frame |
| `draw` | 60 fois par seconde, après chaque `update` |
| `on_click` | chaque fois que le joueur clique sur une cellule |
| `on_key` | chaque fois que le joueur appuie sur une touche |

Chaque paire `update` + `draw` produit une image affichée à l'écran, appelée une **frame**. Enchaîner 60 frames par seconde donne l'illusion du mouvement — c'est ce qu'on appelle 60 **FPS** (*frames per second*).

La règle est simple : **`update` calcule**, **`draw` affiche**. metagrid fournit `jeu.frame_no`, un compteur qui s'incrémente automatiquement à chaque frame.

### update et draw s'enchaînent à chaque frame

Lance ce programme et observe :

```python
import metagrid

NB_LIGNES   = 1
NB_COLONNES = 1
TAILLE_CASE = 200

jeu: metagrid.AbstractEngine
couleur: str


def init():
    global couleur
    couleur = "#FF0000"


def update():
    global couleur
    if jeu.frame_no % 60 < 30:
        couleur = "#FF0000"
    else:
        couleur = "#0000FF"


def draw():
    global couleur
    jeu.set_cell_color(0, 0, couleur)


if __name__ == "__main__":
    jeu = metagrid.create(NB_LIGNES, NB_COLONNES, TAILLE_CASE, 4)
    jeu.on_init(init)
    jeu.on_update(update)
    jeu.on_draw(draw)
    jeu.start()
```

!!! question "Observer"
    1. Que fait ce programme ?
    2. `update` lit `jeu.frame_no` sans le modifier. Qui s'occupe de l'incrémenter ?
    3. `draw` ne connaît pas `jeu.frame_no`. Comment sait-elle quelle couleur afficher ?
    4. Que se passe-t-il si tu remplaces `% 60` par `% 120` ?

### Réagir aux clics

Lance ce programme :

```python
import metagrid

NB_LIGNES   = 4
NB_COLONNES = 4
TAILLE_CASE = 120

jeu: metagrid.AbstractEngine
grille: list[list[bool]]


def init():
    global grille
    grille = [
        [False, False, False, False],
        [False, False, False, False],
        [False, False, False, False],
        [False, False, False, False],
    ]


def cliquer(i: int, j: int, _modif: str):
    grille[i][j] = not grille[i][j]


def draw():
    for i in range(NB_LIGNES):
        for j in range(NB_COLONNES):
            if grille[i][j]:
                jeu.set_cell_color(i, j, "#FF0000")
            else:
                jeu.set_cell_color(i, j, "#CCCCCC")


if __name__ == "__main__":
    jeu = metagrid.create(NB_LIGNES, NB_COLONNES, TAILLE_CASE, 4)
    jeu.on_init(init)
    jeu.on_click(cliquer)
    jeu.on_draw(draw)
    jeu.start()
```

!!! question "Observer"
    1. Que se passe-t-il quand tu cliques sur une cellule ? Et si tu cliques deux fois sur la même ?
    2. `cliquer` reçoit `(i, j)` : ce sont les coordonnées de la cellule cliquée. Qui fournit ces valeurs — toi ou metagrid ?
    3. `draw` ne sait pas quelle cellule vient d'être cliquée. Comment fait-elle pour afficher la bonne couleur ?

### Réagir aux touches

```python
import metagrid

NB_LIGNES   = 3
NB_COLONNES = 3
TAILLE_CASE = 150

jeu: metagrid.AbstractEngine
couleur_fond: str


def init():
    global couleur_fond
    couleur_fond = "#CCCCCC"


def touche(key: str):
    global couleur_fond
    if key == "r":
        couleur_fond = "#FF4444"
    elif key == "v":
        couleur_fond = "#44FF44"
    elif key == "b":
        couleur_fond = "#4444FF"


def draw():
    for i in range(NB_LIGNES):
        for j in range(NB_COLONNES):
            jeu.set_cell_color(i, j, couleur_fond)


if __name__ == "__main__":
    jeu = metagrid.create(NB_LIGNES, NB_COLONNES, TAILLE_CASE, 4)
    jeu.on_init(init)
    jeu.on_key(touche)
    jeu.on_draw(draw)
    jeu.start()
```

!!! question "Observer"
    1. Appuie sur `r`, `v`, `b`. Que se passe-t-il ?
    2. `touche` modifie `couleur_fond` mais ne touche pas à l'affichage. Qui se charge d'afficher la nouvelle couleur, et quand ?
    3. Ajoute une touche `n` qui remet la grille en gris (`"#CCCCCC"`).
