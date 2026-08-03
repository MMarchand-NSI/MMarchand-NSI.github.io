# Snake

L'objectif est de créer un jeu de snake minimaliste en exploitant la **file construite avec deux piles** dans le cours sur les files.

Les bases de la modélisation et de l'implémentation d'un jeu sont aussi abordées.

## Modélisation

Un snake est une File de Coordonnées entières.

Cette file, c'est **exactement** celle que vous venez de construire avec deux piles : le snake en est la mise à l'épreuve. Faire avancer le serpent, c'est `enfiler` une nouvelle tête puis `defiler` la queue. Pour le dessiner ou détecter une collision, on parcourt la file avec `elements`, sans la détruire.

![alt text](image-11.png)


Par exemple, dans cette grille, voici l'état du snake:

```
> (4, 2), (3, 2), (3, 3), (3, 4), (2, 4), (1, 4) >
```

La flèche rouge représente le vecteur directeur du snake. Ici, `direction = (1, 0)`. On avance de 1 en x et de 0 en y.

!!! question "Exercices d'appropriation de la modélisation"
    1. Écrire l'état du snake lorsqu'il aura avancé d'une case
        - Quelles primitives de file avez-vous utilisées ?
    2. Écrire l'état du snake lorsqu'il aura avancé d'une case avec une pomme en (5,2)
        - Quelles primitives de file avez-vous utilisées ?
    3. Lorsque le snake `avance`, donnez la ou les conditions pour que le jeu soit terminé (`gameover = True`)
    4. Écrire les différentes valeurs du vecteur directeur selon qu'on avance en haut, à gauche, en bas, ou à droite.

Voici le code de départ du snake


```python
from structures.lineaires import file
import random
import pyxel     # uv add pyxel

type Coord = tuple[int, int]   # Une coordonnée est un tuple constitué de deux ints
type Snake = file.File[Coord]  # Un snake est une file de coordonnées

# --- Constantes ---
W, H = 20, 20       # Largeur et Hauteur de la grille
STEP_FRAMES = 4     # Vitesse (Mise à jour toutes les 4 frames)


# --- État global --- Déclaration de toutes les variables --- 
serpent: Snake                  # File de coordonnées
tete: Coord                     # Tete du serpent
queue_supprimee: Coord | None   # Dernière queue du serpent supprimée
direction: Coord                # vecteur de déplacement du serpent
pomme: Coord                    # coordonnée de la pomme
score: int                      # score de l'utilisateur
game_over: bool                 # indicateur de game over
frames: int                     # compteur de frames (augmente de 1 dès que update est appelé)

# --- Initialisation ---
def reinit() -> None:
    """
    Initialisation de TOUTES les variables globales
    """
    global serpent, tete, direction, score, game_over, frames, queue_supprimee
    serpent = ...
    tete = ...
    ...........  # Initialiser le serpent avec sa tete
    direction = ......   # droite
    score = ......
    game_over = ......
    frames = 0    # Ne vous souciez pas de ça pour le moment
    queue_supprimee = ....
    # Il faut aussi spawner une pomme
    # on le fera grâce à une fonction spécifique qu'il faudra appeler ici
```


!!! question "Deux fonctions outils, testables sans lancer le jeu"
    Ces deux fonctions ne dessinent rien et ne touchent à aucune variable globale : elles se testent donc **immédiatement**, avec `python -m doctest`, sans ouvrir de fenêtre. Écrivez-les en premier.

    ```python
    def prochaine_tete(tete: Coord, direction: Coord) -> Coord:
        """
        Coordonnée de la case suivante, sans toucher au serpent.

        >>> prochaine_tete((4, 2), (1, 0))
        (5, 2)
        >>> prochaine_tete((4, 2), (0, -1))
        (4, 1)
        >>> prochaine_tete((0, 5), (-1, 0))
        (-1, 5)
        """

    def case_libre(occupees: list[Coord]) -> Coord:
        """
        Une case de la grille au hasard, parmi celles qui ne sont pas occupées.

        >>> toutes = [(x, y) for x in range(W) for y in range(H)]
        >>> case_libre([c for c in toutes if c != (7, 3)])
        (7, 3)
        """
    ```

    Le second doctest mérite un mot : en n'offrant qu'**une seule** case libre, il rend déterministe une fonction qui tire au hasard. C'est une manière courante de tester l'aléatoire.

!!! question "Initialisation"
    - Compléter la fonction `reinit`.
    - Créer la fonction `spawn_pomme()`, qui appelle `case_libre` et modifie les coordonnées de la pomme.

!!! question "Avancer, le point dur du projet"
    Cette fonction porte à elle seule la difficulté du snake. Prenez-la séparément, et **après** avoir répondu aux exercices d'appropriation ci-dessus.

    ```python
    def avancer() -> None:
        """
        Fait avancer le serpent d'une case dans la direction courante.

        Enfile la nouvelle tête. Défile la queue, SAUF si le serpent vient de
        manger la pomme, auquel cas il grandit d'une case.
        """
    ```

    Les deux cas de la docstring correspondent exactement aux exercices 1 et 2 d'appropriation : vous avez déjà écrit sur papier ce que la fonction doit produire.

    ??? tip "Indice léger"
        Vos exercices sur papier disent quelles primitives utiliser, et dans quel ordre. Reste une question : qu'est-ce qui change entre le cas ordinaire et le cas de la pomme ?

    ??? tip "Indice plus précis"
        Une seule opération diffère entre les deux cas : le `defiler`. Avancer sans manger, c'est enfiler **et** défiler, donc une longueur constante. Manger, c'est enfiler **sans** défiler, donc une longueur qui augmente de un. `queue_supprimee` sert à mémoriser ce qui a été défilé, pour le dessin.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur votre cahier : qu'est-ce que l'indice vous a appris sur ce qui n'allait pas dans **votre** code ?

    ??? success "Solution"
        ```python
        def avancer() -> None:
            global serpent, tete, pomme, score, queue_supprimee
            tete = prochaine_tete(tete, direction)
            file.enfiler(tete, serpent)
            if tete == pomme:
                score = score + 1
                queue_supprimee = None
                spawn_pomme()
            else:
                queue_supprimee = file.defiler(serpent)
        ```

        Remarquez que `avancer` ne dessine rien et ne teste aucune collision : elle ne fait qu'avancer. C'est ce qui la rend lisible, et c'est aussi ce qui rendrait `prochaine_tete` testable si on l'avait écrite ainsi dès le début.

Comme beaucoup de moteurs de jeu, pyxel va appeler automatiquement à chaque frame 2 fonctions à la suite:

1. une fonction `update()`, chargée de:
    - Récupérer l'interaction utilisateur.
    - Mettre à jour l'état du jeu en conséquence.
2. PUIS une fonction `draw()`, chargée de dessiner l'état du jeu.

Voici comment se lancera notre jeu (**fin du fichier**):

```python

# -- Mise à jour régulière de l'état --
def update() -> None:
    """
    Appelée automatiquement par pyxel.
    si on appuie sur <R>, on réinitialise
    Si on appuie sur <Q, Z, S, D>, on met à jour la direction
    On avance
    """
    ...

# -- Dessin régulier après mise à jour --
def draw() -> None:
    """
    Appelée automatiquement par pyxel.
    Dessine le snake à l'écran.
    La seule fonction pyxel nécessaire est pset
    """
    ...


# -- Lancement --

def lancer_jeu() -> None:
    # Initialiser pyxel, le moteur graphique
    pyxel.init(W, H, title="Snake")
    # Initialisaer l'état du jeu
    reinit()
    # lancer la boucle d'appels permanents à update puis draw
    pyxel.run(update, draw)  


lancer_jeu()
```

!!! question "Amélioration"
    Pour l'instant on ne peut pas écrire sur l'écran, les pyxels sont trop gros.

    - Modifier la fonction draw en considérant que chaque coordonnée du snake correspond en réalité à un carré de 10x10 pixels
        - `W, H = 200, 200`
        - `TAILLE_CASE = 10`
    - Modifier la fonction draw afin qu'un bandeau reste libre en haut afin d'afficher le score.

