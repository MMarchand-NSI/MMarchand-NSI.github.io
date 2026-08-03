# Introduction à pyxel - Sans POO

Vous allez découvrir les bases de la création d'un jeu.

L'objectif est de créer un pixel capable de se dessiner et de se déplacer en fonction de son vecteur directionnel (dx, dy).


```python
import pyxel as px

# -- CONSTANTES
W: int = 30   # Largeur
H: int = 30   # Hauteur


# -- Etat du jeu --
x: float        # Coordonnée x du pyxel
y: float        # Coordonnée y du pyxel 
dx: float       # Déplacement en x
dy: float       # déplacement en y
color: int    # Couleur


# -- Initialisation de l'état du jeu -- 

def reinit() -> None:
    """
    Initialise un pixel vert avec une position centrale et un vecteur directeur nul.
    """
    global x, y, dx, dy, color
    x = px.width/2 
    y = px.height/2
    dx = 0
    dy = 0
    color = px.COLOR_GREEN


# -- Mise à jour régulière de l'état du jeu ---

def update() -> None:
    """
    Gère les événements utilisateur pour déplacer le pixel.
    Cette fonction est automatiquement appelée en boucle par pyxel.
    """
    global x, y, dx, dy, color

    # Modification du vecteur directeur selon les touches fléchées
    if px.btn(px.KEY_RIGHT):
        dx = ...
        dy = ...
    elif ...
    ...



# -- Dessin régulier de l'état du jeu à l'écran ---

def draw() -> None:
    """
    Dessine le pixel sur l'écran.
    """
    global x, y, dx, dy, color
    px.cls(px.COLOR_BLACK)          # Efface l'écran
    px.pset(int(x), int(y), color)  # Dessine le pixel


# 1. Démarrer le moteur de jeu en 10 FPS
px.init(H, W, title="Pixel en Mouvement", fps = 10)
# 2. Initialiser les variables du jeu
reinit()
# 3. Lancer le jeu
px.run(update, draw)

# Cette dernière instruction lance une boucle infinie,
# qui appelle update, puis draw, de manière régulière, à chaque Frame (ici 10 fois par seconde)
```

!!! question "Avant tout : qui appelle `update` ?"
    Tu écris `update` et `draw`, et **tu ne les appelles jamais**. Tu donnes leurs noms à `px.run`, et c'est le moteur qui les rappelle, indéfiniment, plusieurs fois par seconde. Jusqu'ici, tout ce que tu écrivais s'exécutait dans l'ordre où tu l'avais écrit. Ici, le contrôle appartient à pyxel.

    Déroule **trois frames à la main**, en supposant qu'on appuie sur la flèche droite pendant la deuxième et qu'on la relâche ensuite.

    | frame | ce que fait `update` | état après `update` | ce que dessine `draw` |
    |---|---|---|---|
    | 1 | | | |
    | 2 | | | |
    | 3 | | | |

    ??? note "À ouvrir une fois les trois lignes remplies"
        | frame | ce que fait `update` | état après `update` | ce que dessine `draw` |
        |---|---|---|---|
        | 1 | aucune touche | `x=15 y=15 dx=0 dy=0` | un pixel en (15, 15) |
        | 2 | flèche droite pressée : `dx` devient 1 | `x=15 y=15 dx=1 dy=0` | un pixel en (15, 15) |
        | 3 | aucune touche : `x` avance de `dx` | `x=16 y=15 dx=1 dy=0` | un pixel en (16, 15) |

        Deux questions, et elles ne sont pas rhétoriques.

        1. Combien de fois `update` a-t-elle été appelée, et **par qui** ?
        2. Pourquoi le pixel n'a-t-il **pas bougé** à la frame 2, alors qu'on appuyait sur la touche ?

        La seconde est la source d'erreur numéro un de cette activité : **changer le vecteur** et **changer la position** sont deux choses différentes, et elles ne se produisent pas à la même frame.

!!! question "Exercices de base"

    1. Complétez la fonction update. Testez
    2. Modifiez le framerate. Testez
    3. Si ça n'est pas déjà fait, modifier la fonction update pour que le pixel s'arrête lorsqu'on lâche les touches.
    4. Le pixel ne doit pas bouger s'il va dépasser de l'écran.
        - Modifiez la fonction update pour tenir compte de cette information. 
    5. Espace torique: Un pixel peut maintenant dépasser un bord mais il réapparaît au bord opposé (ce qui fait de l'espace de jeu un espace sans bord)
        - Modifiez la fonction update pour tenir compte de cette information. On s'intéressera à l'opérateur modulo. La modification doit être minime.


!!! question "Remplacer un pixel par un sprite"
    1. Téléchargez le fichier 2.pyxres sur [le site de la nuit du code](https://depot.nuitducode.net)
        - Il s'agit d'un fichier contenant des ressources visuelles et sonores.
        - Placez le **dans le même répertoire** que votre fichier python.
        - Pyxel vient avec un éditeur de ressources. Pour visualiser les ressources du jeu, exécutez la commande suivante dans un terminal:
            `pyxel edit <répertoire>/2.pyxres`
        - N'hésitez pas à bidouiller, vous ne pouvez rien casser, au pire vous pourrez retélécharger le fichier.
    2. A la place d'un simple pixel, on veut maintenant utiliser un sprite
        - Pour le faire, il faut d'abord charger ce fichier dans le code **juste avant de démarrer le jeu**:
            `px.load("<répertoire>/2.pyxres")`
        - Ensuite il faut dessiner le sprite que vous aurez choisi au lieu de simplement remplir un pixel. Il n'y a qu'une ligne de code à modifier. Je vous laisse la trouver en explorant la [documentation de pyxel](https://github.com/kitao/pyxel/blob/main/docs/README.fr.md).
            - remarque: Vous aurez nécessairement besoin d'augmenter la hauteur et la largeur de votre fenêtre (H et W), ce qui réduira la taille des "pixels".

