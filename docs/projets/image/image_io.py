"""Lecture et écriture d'images en niveaux de gris.

Ces deux fonctions sont les seules données. Tout le reste, c'est toi qui l'écris.
"""
from PIL import Image

type grille = list[list[float]]
type image_couleur = list[list[tuple[int, int, int]]]


def charger(chemin: str, cote_max: int = 400) -> grille:
    """Renvoie l'image du fichier `chemin` en niveaux de gris, sous forme de
    liste de listes d'entiers entre 0 (noir) et 255 (blanc).
    L'image est réduite pour que son plus grand côté ne dépasse pas `cote_max`."""
    img = Image.open(chemin).convert("L")
    img.thumbnail((cote_max, cote_max))
    largeur, hauteur = img.size
    g = []
    for i in range(0, hauteur):
        ligne = []
        for j in range(0, largeur):
            ligne.append(img.getpixel((j, i)))
        g.append(ligne)
    return g


def charger_couleur(chemin: str, cote_max: int = 400) -> image_couleur:
    """Renvoie l'image du fichier `chemin` en couleur, sous forme de liste de
    listes de triplets (rouge, vert, bleu), chaque composante entre 0 et 255.
    L'image est réduite pour que son plus grand côté ne dépasse pas `cote_max`."""
    img = Image.open(chemin).convert("RGB")
    img.thumbnail((cote_max, cote_max))
    largeur, hauteur = img.size
    g = []
    for i in range(0, hauteur):
        ligne = []
        for j in range(0, largeur):
            ligne.append(img.getpixel((j, i)))
        g.append(ligne)
    return g


def sauver(g: grille, chemin: str) -> None:
    """Enregistre la grille `g` dans le fichier `chemin` (par exemple "flou.png").
    Chaque valeur doit être un entier entre 0 et 255."""
    hauteur = len(g)
    largeur = len(g[0])
    img = Image.new("L", (largeur, hauteur))
    for i in range(0, hauteur):
        for j in range(0, largeur):
            img.putpixel((j, i), g[i][j])
    img.save(chemin)
