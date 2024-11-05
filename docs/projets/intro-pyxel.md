# Introduction à pyxel - POO

L'objectif est de créer une classe Pixel capable de se dessiner et de se déplacer en fonction de son vecteur directionnel (dx, dy). Nous utiliserons également une classe App pour gérer l'application et les événements utilisateur, permettant de déplacer le pixel.

```python
import pyxel as px

class Pixel:
    def __init__(self, x:float, y: float, dx: float=0, dy:float=0, color:float=0):
        """
        Initialise un pixel avec une position (x, y), un vecteur directeur (dx, dy) et une couleur.
        """
        self.x = x
        self.y = y
        self.dx = dx
        self.dy = dy
        self.color = color
    
    def update(self):
        """
        Le pyxel se déplace toujours de son vecteur directeur
        """
        pass


    def draw(self):
        """
        Dessine le pixel sur l'écran.
        """
        px.pset(int(self.x), int(self.y), self.color)


class Jeu:
    def __init__(self):
        """
        Un jeu gère un Pixel.
        """
        self.pixel = Pixel(px.width/2, px.height/2)

    def update(self):
        """
        Gère les événements utilisateur pour déplacer le pixel.
        """
        # Modification du vecteur directeur selon les touches fléchées
        if px.btn(px.KEY_RIGHT):
            self.pixel.dx += 1
        elif px.btn(px.KEY_LEFT):
            self.pixel.dx -= 1
        if px.btn(px.KEY_DOWN):
            self.pixel.dy += 1
        elif px.btn(px.KEY_UP):
            self.pixel.dy -= 1

        # Le jeu demande au pixel de se mettre à jour
        self.pixel.update()

    def draw(self):
        """
        Efface l'écran et dessine le pixel.
        """
        # Remplir l'écran en noir
        px.cls(0)
        # Le jeu demande au pixel de se dessiner
        self.pixel.draw()


if __name__ == "__main__":
    # Démarre l'application
    pyxel.init(30, 30, title="Pixel en Mouvement", fps = 10)
    appli = Jeu()
    pyxel.run(appli.update, appli.draw)
```

!!! question "Exercices de base"

    1. Complétez la méthode update de la classe Pixel (2 lignes). Testez
    2. Modifiez le framerate. Testez
    3. Remplacez le 3ème if de la méthode update par un elif. Analysez la différence. Rétablissez le if
    4. Modifiez la méthode update pour que le pixel s'arrête lorsqu'on lâche les touches.
    5. Le jeu gère maintenant un groupe de Pixels. A chaque fois que l'utilisateur appuie sur la barre espace, un nouveau Pixel spawn aléatoirement avec une couleur aléatoire. Lorsque l'utilisateur utilise les flèches, tous les pixels bougent dans la direction donnée. Dans Jeu:
        - Modifier la méthode `__init__`
        - Ecrire une méthode `spawn_pixel(self)`
        - modifier les méthodes `update` et `draw` en conséquence.
    6. Un pixel ne doit pas bouger s'il dépasse de l'écran.
        - Modifiez la classe Pixel pour tenir compte de cette informations. 
    7. Espace torique: Un pixel peut dépasser un bord mais il réapparaît au bord opposé (ce qui fait de l'espace de jeu un espace sans bord)
        - Modifiez la classe Pixel pour tenir compte de cette informations.
    8. Lorsqu'on appuie sur la touche "p", un pixel aléatoire est supprimé.


!!! question "Remplacer un pixel par un sprite"
    1. Téléchargez le fichier 1.pyxres sur [le site de la nuit du code](https://depot.nuitducode.net)
        - Il s'agit d'un fichier contenant des ressources visuelles et sonores.
        - Placez le **dans le même répertoire** que votre fichier python.
        - Pyxel vient avec un éditeur de ressources. Pour visualiser les ressources du jeu, exécutez la commande suivante dans un terminal:
            `pyxel edit 2.pyxres`
        - N'hésitez pas à bidouiller, vous ne pouvez rien casser, au pire vous pourrez retélécharger le fichier.
    2. A la place d'un simple pixel, on veut maintenant utiliser un sprite
        - Pour le faire, il faut d'abord charger ce fichier dans le code juste avant de démarrer le jeu:
            `px.load("2.pyxres")`
        - Ensuite il faut dessiner le sprite que vous aurez choisi au lieu de simplement remplir un pixel. Il n'y a qu'une ligne de code à modifier. Je vous laisse la trouver en explorant la [documentation de pyxel](https://github.com/kitao/pyxel/blob/main/docs/README.fr.md).

