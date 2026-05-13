# Démineur

Le démineur est un classique des jeux de logique. Une grille dissimule des mines ; le joueur doit révéler toutes les cases sans mines en s'aidant des chiffres qui indiquent combien de mines se trouvent dans le voisinage immédiat de chaque case. Un clic droit permet de poser un drapeau pour marquer une mine supposée.

!!! tip "Pré-requis"
    Cette activité fait suite à l'activité sur le voisinage. On réutilise les mêmes notions : grille `(i, j)`, déplacements `(di, dj)`, vérification des bords, voisinage à 8.

    Installez la bibliothèque : `uv add metagrid`

    Sur Debian/Ubuntu, des dépendances systèmes sont nécessaires :
    ```
    sudo apt install libgl1 libxrender1 libx11-6
    ```

## L'API metagrid

La bibliothèque `metagrid` gère la fenêtre, l'affichage et les interactions. Elle expose 3 callbacks :

```python
game = metagrid.create(HAUTEUR, LARGEUR, TAILLE_CASE, 1)
game.on_init(init)    # appelé une fois au démarrage
game.on_click(click)  # appelé avec (i, j, button) à chaque clic
game.on_draw(draw)    # appelé à chaque frame pour afficher
game.start()
```

Le callback `click` reçoit un troisième argument `button` : `"left"` pour le clic gauche, `"right"` pour le clic droit.

Dans `draw`, on modifie l'apparence de chaque cellule avec :

```python
game.set_cell_color(i, j, "#RRGGBB")               # couleur de fond
game.set_cell_char(i, j, "A", "#RRGGBB")            # caractère affiché et sa couleur
```

Les constantes et variables globales à placer en tête de fichier :

```python
import metagrid
from metagrid import AbstractEngine
from random import randint

HAUTEUR   = 10
LARGEUR   = 10
NB_MINES  = 10

grille: list[list[Cellule]]
game_over: bool
game: AbstractEngine
```

## Étape 1 - La structure de cellule

Au démineur, chaque case possède plusieurs informations indépendantes : est-ce une mine ? a-t-elle été révélée ? le joueur a-t-il posé un drapeau dessus ? On regroupe ces informations dans une **classe** `Cellule`.

!!! question "La classe `Cellule`"
    Chaque case a 4 attributs :

    | Attribut | Type | Signification |
    |---|---|---|
    | `est_mine` | `bool` | La case cache une mine |
    | `nb_voisins` | `int` | Nombre de mines dans les 8 cases adjacentes |
    | `revelee` | `bool` | La case a été découverte par le joueur |
    | `drapeau` | `bool` | Le joueur a posé un drapeau sur cette case |

    Complétez la méthode `__init__`. À la création, la case n'est pas une mine, a zéro voisin, n'est pas révélée et n'a pas de drapeau.

    ```python
    class Cellule:
        est_mine: bool
        nb_voisins: int
        revelee: bool
        drapeau: bool

        def __init__(self):
            self.est_mine   = ...
            self.nb_voisins = ...
            self.revelee    = ...
            self.drapeau    = ...
    ```

## Étape 2 - Créer la grille vierge

!!! question "Compréhension de liste imbriquée"
    On veut créer une grille de `HAUTEUR` lignes et `LARGEUR` colonnes, où chaque case est un objet `Cellule()` fraîchement créé.

    1. Pourquoi ne pas écrire `[[Cellule()] * LARGEUR] * HAUTEUR` ? Testez dans l'interpréteur :

        ```python
        class Cellule:
            def __init__(self): self.est_mine = False

        g = [[Cellule()] * 3] * 2
        g[0][0].est_mine = True
        print(g[1][0].est_mine)   # qu'obtenez-vous ?
        ```

    2. La bonne façon utilise une double compréhension de liste. Chaque cellule est un objet distinct. Complétez :

        ```python
        grille = [[...] for _ in range(HAUTEUR)]
        ```

        où chaque ligne est elle-même `[Cellule() for _ in range(...)]`.

??? hint "Réponse"
    ```python
    grille = [[Cellule() for _ in range(LARGEUR)] for _ in range(HAUTEUR)]
    ```

    `* LARGEUR` duplique la **référence** vers le même objet `Cellule`. La compréhension de liste crée un nouvel objet à chaque itération : toutes les cases sont bien indépendantes.

## Étape 3 - Placer les mines

!!! question "Placer `NB_MINES` mines sans doublons"
    On tire une position aléatoire ; si la case n'est pas encore une mine, on la transforme en mine et on avance le compteur.

    ```python
    compteur = 0
    while compteur < NB_MINES:
        i = randint(0, HAUTEUR - 1)
        j = randint(0, LARGEUR - 1)
        if ...:          # la case n'est pas encore une mine
            ...          # marquer comme mine
            compteur += 1
    ```

    Pourquoi une boucle `while` plutôt qu'une boucle `for` ?

??? hint "Réponse"
    ```python
    if not grille[i][j].est_mine:
        grille[i][j].est_mine = True
        compteur += 1
    ```

    On utilise `while` car le nombre d'itérations nécessaires n'est pas connu à l'avance : si on tire deux fois la même position, on ne progresse pas.

## Étape 4 - Compter les mines voisines

La fonction `get_mines_voisines(i, j)` retourne le nombre de mines dans le voisinage à 8 de la case `(i, j)`.

!!! question "Écrire `get_mines_voisines`"
    Vous connaissez déjà la double boucle avec `range(-1, 2)`. Adaptez-la :

    - on exclut la case elle-même avec `di != 0 or dj != 0`,
    - on vérifie que le voisin est dans la grille (`0 <= i+di < HAUTEUR` et `0 <= j+dj < LARGEUR`),
    - on ajoute `grille[i+di][j+dj].est_mine` au résultat.

    ```python
    def get_mines_voisines(i: int, j: int) -> int:
        res = 0
        for di in range(-1, 2):
            for dj in range(-1, 2):
                if ... and ...:
                    res += grille[i + di][j + dj].est_mine
        return res
    ```

    Rappel : en Python, un booléen vaut `1` ou `0` en arithmétique, donc `res += grille[...].est_mine` est valide.

!!! question "Calculer les voisins pour toute la grille"
    Une fois les mines placées, on calcule `nb_voisins` pour chaque case avec une double boucle :

    ```python
    for i in range(HAUTEUR):
        for j in range(LARGEUR):
            grille[i][j].nb_voisins = ...
    ```

## Étape 5 - La fonction `init` complète

!!! question "Assembler `init`"
    Rassemblez les étapes 2, 3 et 4 dans une seule fonction `init`. Elle initialise aussi `game_over` à `False`.

    ```python
    def init():
        global grille, game_over
        game_over = False
        grille = ...            # étape 2 : grille vierge
        # placer les mines      # étape 3
        # calculer nb_voisins   # étape 4
    ```

## Étape 6 - Vérifier la victoire

On gagne quand **toutes** les cases sans mine ont été révélées. Les mines peuvent rester cachées (avec ou sans drapeau).

!!! question "Écrire `est_gagne`"
    1. Version avec une double boucle : dès qu'on trouve une case sans mine et non révélée, la partie n'est pas gagnée.

        ```python
        def est_gagne() -> bool:
            for i in range(HAUTEUR):
                for j in range(LARGEUR):
                    if ...:   # pas une mine ET pas révélée
                        return False
            return True
        ```

    2. En Python, `all()` avec une expression génératrice exprime la même chose en une ligne. Complétez :

        ```python
        def est_gagne() -> bool:
            return all(
                grille[i][j].revelee
                for i in range(HAUTEUR)
                for j in range(LARGEUR)
                if ...          # seulement les cases sans mine
            )
        ```

??? hint "Condition"
    `not grille[i][j].est_mine` : on ne teste la révélation que pour les cases sans mine.

## Étape 7 - Révéler toutes les mines

En cas de game over, on révèle toutes les mines pour que `draw` puisse les afficher.

!!! question "Écrire `reveler_toutes_mines`"
    Parcourez la grille avec une double boucle. Pour chaque case qui est une mine, passez `revelee` à `True`.

    ```python
    def reveler_toutes_mines():
        for i in range(HAUTEUR):
            for j in range(LARGEUR):
                if ...:
                    grille[i][j].revelee = True
    ```

## Étape 8 - Révéler une case : le flood fill

C'est la partie la plus complexe. Quand le joueur clique sur une case vide (aucun voisin miné), on révèle automatiquement toutes les cases vides adjacentes, en s'arrêtant aux cases chiffrées qui servent de frontière. Cet algorithme s'appelle le **flood fill** (remplissage par diffusion).

!!! question "Analyser l'algorithme"
    Voici le principe en trois règles :

    1. On révèle la case `(i, j)`.
    2. Si elle a au moins un voisin miné (`nb_voisins > 0`), on s'arrête : le chiffre guide le joueur.
    3. Si elle n'a aucun voisin miné (`nb_voisins == 0`), on appelle récursivement `decouvre` sur chaque voisin **non révélé** et **non miné**.

    Pourquoi la condition `not voisin.revelee` est-elle indispensable avant d'appeler `decouvre` récursivement ?

??? hint "Réponse"
    Sans cette condition, deux cases vides voisines s'appelleraient mutuellement à l'infini. En ne recursant que sur les cases pas encore révélées, chaque case n'est traitée qu'une seule fois, et la récursion s'arrête naturellement.

!!! question "Écrire `decouvre`"
    ```python
    def decouvre(i: int, j: int):
        cell = grille[i][j]
        cell.revelee = ...           # révéler la case
        if cell.nb_voisins == 0:
            for di in range(-1, 2):
                for dj in range(-1, 2):
                    if (di != 0 or dj != 0) and 0 <= i+di < HAUTEUR and 0 <= j+dj < LARGEUR:
                        voisin = grille[i + di][j + dj]
                        if not voisin.revelee and not voisin.est_mine:
                            decouvre(...)   # appel récursif sur le voisin
    ```

## Étape 9 - Gérer les clics

!!! question "Écrire `click`"
    La fonction reçoit `(i, j, button)` où `button` vaut `"left"` ou `"right"`.

    Règles à implémenter dans l'ordre :

    - Si la partie est terminée (`game_over`), on ignore tous les clics.
    - **Clic gauche** sur une case non révélée et sans drapeau :
        - Si c'est une mine → game over : révéler toutes les mines et afficher un message.
        - Sinon → découvrir la case, puis vérifier si on a gagné.
    - **Clic droit** sur une case non révélée : inverser le drapeau.

    ```python
    def click(i: int, j: int, button: str):
        global game_over
        if ...:
            return
        case = grille[i][j]
        if button == "left" and not case.drapeau and not case.revelee:
            if case.est_mine:
                game_over = True
                reveler_toutes_mines()
                print("Game over !")
            else:
                decouvre(i, j)
                if est_gagne():
                    ...
        elif button == "right" and not case.revelee:
            case.drapeau = not case.drapeau
    ```

## Étape 10 - Afficher la grille

Plusieurs états peuvent coexister ; il faut établir un **ordre de priorité** pour l'affichage.

!!! question "L'ordre de priorité"
    | Priorité | Condition | Fond | Caractère |
    |---|---|---|---|
    | 1 | Drapeau | gris `#555555` | `F` rouge `#FF0000` |
    | 2 | Non révélée | gris `#555555` | rien `""` |
    | 3 | Mine révélée | rouge `#FF4444` | `X` blanc `#FFFFFF` |
    | 4 | Chiffre (`nb_voisins > 0`) | blanc `#FFFFFF` | chiffre bleu `#3418D4` |
    | 5 | Case vide | blanc `#FFFFFF` | rien `""` |

    Une case avec drapeau est-elle révélée ? Pourquoi vérifier `case.drapeau` en premier ?

!!! question "Écrire `draw`"
    ```python
    def draw():
        for i in range(HAUTEUR):
            for j in range(LARGEUR):
                case = grille[i][j]
                if case.drapeau:
                    game.set_cell_color(i, j, "#555555")
                    game.set_cell_char(i, j, "F", "#FF0000")
                elif ...:   # non révélée
                    ...
                elif ...:   # mine révélée
                    ...
                elif ...:   # chiffre
                    game.set_cell_color(i, j, "#FFFFFF")
                    game.set_cell_char(i, j, str(case.nb_voisins), "#3418D4")
                else:       # case vide
                    ...
    ```

## Étape 11 - Lancement

!!! question "Assembler le tout"
    Complétez le bloc principal et branchez les callbacks :

    ```python
    if __name__ == "__main__":
        game = metagrid.create(HAUTEUR, LARGEUR, 50, 1)
        game.on_init(...)
        game.on_click(...)
        game.on_draw(...)
        game.start()
    ```

    Lancez le programme et vérifiez :

    - Clic gauche sur une case vide : la zone se propage-t-elle correctement ?
    - Clic gauche sur une mine : les mines s'affichent-elles toutes en rouge ?
    - Clic droit : le drapeau `F` apparaît-il puis disparaît-il au deuxième clic ?
    - Révéler toutes les cases sans mine affiche-t-il le message de victoire ?

!!! question "Pour aller plus loin"
    1. Ajoutez la touche `r` pour relancer une partie (utilisez `game.on_key(touche)` avec un callback `def touche(key: str)` qui appelle `init()` si `key == 'r'`).
    2. Affichez un compteur de mines restantes (NB_MINES moins le nombre de drapeaux posés) avec `print` à chaque clic droit.
    3. Dans le vrai démineur, les couleurs des chiffres varient : 1 = bleu, 2 = vert, 3 = rouge, 4 = marine... Modifiez `draw` pour reproduire ces couleurs avec un dictionnaire `{1: "#0000FF", 2: "#007B00", 3: "#FF0000", ...}`.
    4. Empêchez un game over au premier clic : si la première case cliquée est une mine, relancez `init()` jusqu'à ce qu'elle ne le soit plus.
