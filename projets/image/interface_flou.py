"""Une fenêtre pour essayer ta fonction flou sur tes photos.

À placer à côté de filtres.py et de image_io.py, puis lancer :
    uv run interface_flou.py

Tu n'as rien à écrire dans ce fichier. Pour la couleur, passe COULEUR à True :
la fenêtre utilise alors le flou de filtres_couleur.py.
"""
import sys

from PySide6.QtCore import Qt
from PySide6.QtGui import QImage, QPixmap, qRgb
from PySide6.QtWidgets import (QApplication, QFileDialog, QHBoxLayout, QLabel,
                               QPushButton, QVBoxLayout, QWidget)

COULEUR = False


def vers_qimage(g) -> QImage:
    """Convertit une grille (niveaux de gris ou triplets) en image affichable."""
    hauteur = len(g)
    largeur = len(g[0])
    img = QImage(largeur, hauteur, QImage.Format.Format_RGB32)
    for i in range(0, hauteur):
        for j in range(0, largeur):
            v = g[i][j]
            if isinstance(v, tuple):
                img.setPixel(j, i, qRgb(v[0], v[1], v[2]))
            else:
                img.setPixel(j, i, qRgb(v, v, v))
    return img


def afficher() -> None:
    image.setPixmap(QPixmap.fromImage(vers_qimage(etat["grille"])))
    info.setText(f"Flou appliqué {etat['nb_flous']} fois")


def ouvrir() -> None:
    chemin, _ = QFileDialog.getOpenFileName(fenetre, "Choisir une image", "",
                                            "Images (*.png *.jpg *.jpeg *.bmp)")
    if chemin != "":
        etat["grille"] = charger(chemin)
        etat["nb_flous"] = 0
        bouton_flou.setEnabled(True)
        afficher()


def flouter() -> None:
    QApplication.setOverrideCursor(Qt.CursorShape.WaitCursor)
    etat["grille"] = flou(etat["grille"])
    etat["nb_flous"] = etat["nb_flous"] + 1
    afficher()
    QApplication.restoreOverrideCursor()


if __name__ == "__main__":
    if COULEUR:
        from filtres_couleur import flou
        from image_io import charger_couleur as charger
    else:
        from filtres import flou
        from image_io import charger

    app = QApplication(sys.argv)
    fenetre = QWidget()
    fenetre.setWindowTitle("Flouter une image")

    image = QLabel("Ouvre une image pour commencer.")
    image.setAlignment(Qt.AlignmentFlag.AlignCenter)
    image.setMinimumSize(400, 400)
    info = QLabel("")
    bouton_ouvrir = QPushButton("Ouvrir une image")
    bouton_flou = QPushButton("Flouter")
    bouton_flou.setEnabled(False)

    boutons = QHBoxLayout()
    boutons.addWidget(bouton_ouvrir)
    boutons.addWidget(bouton_flou)
    disposition = QVBoxLayout(fenetre)
    disposition.addWidget(image)
    disposition.addWidget(info)
    disposition.addLayout(boutons)

    # L'image affichée et le nombre de flous déjà appliqués
    etat = {"grille": None, "nb_flous": 0}

    bouton_ouvrir.clicked.connect(ouvrir)
    bouton_flou.clicked.connect(flouter)

    fenetre.show()
    sys.exit(app.exec())
