# Introduction à pyxel - POO

L'objectif est de créer une classe `Rectangle` capable de se dessiner et de se déplacer en fonction de son vecteur directeur (dx, dy). Un rectangle connaît aussi sa taille : `width` et `height`. Une classe `Jeu` gère l'application et les événements utilisateur, et c'est elle qui demande au rectangle de bouger et de se dessiner.

!!! info "Rappel : un rectangle est un point et une taille"
    `px.rect(x, y, width, height, color)` remplit le rectangle dont le **coin haut gauche** est $(x, y)$.

    Il couvre les colonnes $x$ à $x + width - 1$ : le bord **droit** est donc en $x + width$, et le bord **bas** en $y + height$. L'origine $(0, 0)$ de l'écran est en haut à gauche, et $y$ augmente **vers le bas**.

```python
import pyxel as px


class Rectangle:
    def __init__(self, x: float, y: float, width: int, height: int,
                 dx: float = 0, dy: float = 0, color: int = px.COLOR_GREEN):
        """
        Initialise un rectangle de coin haut gauche (x, y), de taille
        (width, height), de vecteur directeur (dx, dy) et de couleur color.
        """
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.dx = dx
        self.dy = dy
        self.color = color

    def update(self) -> None:
        """
        Le rectangle sait se déplacer de son vecteur directeur.
        """
        pass

    def draw(self) -> None:
        """
        Le rectangle sait se dessiner.
        """
        px.rect(int(self.x), int(self.y), self.width, self.height, self.color)


class Jeu:
    def __init__(self):
        """
        Un jeu gère un Rectangle de 8 pixels de côté, posé au centre de l'écran.
        """
        cote = 8
        self.rectangle = Rectangle((px.width - cote) / 2, (px.height - cote) / 2, cote, cote)

    def update(self) -> None:
        """
        Gère les événements utilisateur pour déplacer le rectangle.
        """
        # Modification du vecteur directeur selon les touches fléchées
        if px.btn(px.KEY_RIGHT):
            self.rectangle.dx += 1
        elif px.btn(px.KEY_LEFT):
            self.rectangle.dx -= 1
        if px.btn(px.KEY_DOWN):
            self.rectangle.dy += 1
        elif px.btn(px.KEY_UP):
            self.rectangle.dy -= 1

        # Le jeu demande au rectangle de se mettre à jour
        self.rectangle.update()

    def draw(self) -> None:
        """
        Efface l'écran et dessine le rectangle.
        """
        px.cls(px.COLOR_BLACK)
        # Le jeu demande au rectangle de se dessiner
        self.rectangle.draw()


if __name__ == "__main__":
    # Démarre l'application
    px.init(128, 128, title="Rectangle en mouvement", fps=10)
    jeu = Jeu()
    px.run(jeu.update, jeu.draw)
```

!!! abstract "Fondamental"
    Un jeu est une succession infinie de cycles `update` puis `draw`, un cycle par frame. Le jeu n'appelle jamais lui-même ces deux méthodes : c'est `px.run` qui les appelle.

!!! question "Exercices de base"

    1. Complète la méthode `update` de la classe `Rectangle` (2 lignes). Teste.
    2. Modifie le framerate. Teste.
    3. Remplace le 3ème `if` de la méthode `update` de `Jeu` par un `elif`. Analyse la différence. Rétablis le `if`.
    4. Modifie la méthode `update` de `Jeu` pour que le rectangle s'arrête lorsqu'on lâche les touches.
    5. Donne au rectangle une largeur de 16 et une hauteur de 4. Une seule ligne change, et ni `update` ni `draw` n'y touchent.
    6. Le jeu gère maintenant un groupe de rectangles. À chaque fois que l'utilisateur appuie sur la barre espace, un nouveau rectangle apparaît à une position, une taille et une couleur aléatoires. Lorsque l'utilisateur utilise les flèches, tous les rectangles bougent dans la direction donnée. Dans `Jeu` :
        - modifie la méthode `__init__`
        - écris une méthode `spawn_rectangle(self)`
        - modifie les méthodes `update` et `draw` en conséquence.
    7. Un rectangle ne doit pas bouger s'il va sortir de l'écran. Attention, c'est son bord droit qui sort, en `x + width`, et son bord bas en `y + height`.
        - Modifie la classe `Rectangle` pour tenir compte de cette information.
    8. Espace torique : un rectangle peut maintenant dépasser un bord mais il réapparaît au bord opposé (ce qui fait de l'espace de jeu un espace sans bord).
        - Modifie la classe `Rectangle` pour tenir compte de cette information. On s'intéressera à l'opérateur modulo.
    9. Lorsqu'on appuie sur la touche "p", un rectangle aléatoire est supprimé.


!!! question "Remplacer un rectangle par un sprite"
    1. Télécharge la planche de sprites [spritesheet.pyxres](../../assets/star_shooter/spritesheet.pyxres) et sa palette [spritesheet.pyxpal](../../assets/star_shooter/spritesheet.pyxpal).
        - Le `.pyxres` contient les images, 4 bruitages (emplacements 0 à 3) et 2 musiques. Le `.pyxpal` contient les 16 couleurs de la planche.
        - Place les deux fichiers **dans le même répertoire**, et **ne les renomme pas** : pyxel ne lit la palette que si elle porte le nom de la planche.
        - Pyxel vient avec un éditeur de ressources. Pour visualiser les ressources, exécute la commande suivante dans un terminal :
            `pyxel edit <répertoire>/spritesheet.pyxres`
        - N'hésite pas à bidouiller, tu ne peux rien casser, au pire tu pourras retélécharger les fichiers.
    2. À la place d'un rectangle uni, on veut maintenant un sprite.
        - Il faut d'abord charger la planche **juste après `px.init`** :
            `px.load("<répertoire>/spritesheet.pyxres")`
        - Les sprites de cette planche font 16 sur 16, soit exactement le `width` et le `height` de ton rectangle.
        - La planche est découpée en **3 banques d'images**, numérotées 0, 1 et 2. L'éditeur te donne la banque et les coordonnées $(u, v)$ du sprite que tu choisis.
        - La couleur d'indice **0** est la transparence de cette planche : c'est la valeur à donner à `colkey`.
        - Il n'y a alors qu'une ligne de code à modifier dans `draw`. Je te laisse la trouver en explorant la [documentation de pyxel](https://github.com/kitao/pyxel/blob/main/docs/README.fr.md).
    3. Pour l'ambiance, un bruitage et une musique sont déjà dans la planche :
        - `px.play(0, 2)` joue la petite explosion sur le canal 0.
        - `px.playm(0, loop=True)` lance la musique de fond en boucle.
