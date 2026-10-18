"""Une fenêtre pour essayer ta fonction convolution avec le noyau de ton choix.

À placer à côté de filtres.py et de image_io.py, puis lancer :
    uv run interface_convolution.py

Tu n'as rien à écrire dans ce fichier.
"""
import sys
from fractions import Fraction

from PySide6.QtCore import Qt
from PySide6.QtGui import QImage, QPixmap, qRgb
from PySide6.QtWidgets import (QApplication, QComboBox, QFileDialog,
                               QGridLayout, QHBoxLayout, QLabel, QLineEdit,
                               QPushButton, QVBoxLayout, QWidget)

from filtres import convolution, vers_image
from image_io import charger

# Les noyaux de la page, écrits comme dans les cases
NOYAUX = {
    "IDENTITE": [["0", "0", "0"], ["0", "1", "0"], ["0", "0", "0"]],
    "FLOU": [["1/9", "1/9", "1/9"], ["1/9", "1/9", "1/9"], ["1/9", "1/9", "1/9"]],
    "GAUSS": [["1/16", "2/16", "1/16"], ["2/16", "4/16", "2/16"], ["1/16", "2/16", "1/16"]],
    "NETTETE": [["0", "-1", "0"], ["-1", "5", "-1"], ["0", "-1", "0"]],
    "SOBEL_X": [["-1", "0", "1"], ["-2", "0", "2"], ["-1", "0", "1"]],
    "SOBEL_Y": [["-1", "-2", "-1"], ["0", "0", "0"], ["1", "2", "1"]],
}


def vers_qimage(g) -> QImage:
    """Convertit une grille d'entiers entre 0 et 255 en image affichable."""
    hauteur = len(g)
    largeur = len(g[0])
    img = QImage(largeur, hauteur, QImage.Format.Format_RGB32)
    for i in range(0, hauteur):
        for j in range(0, largeur):
            v = g[i][j]
            img.setPixel(j, i, qRgb(v, v, v))
    return img


def lire_noyau():
    """Renvoie le noyau écrit dans les cases, ou None si une case est invalide."""
    noyau = []
    for i in range(0, 3):
        ligne = []
        for j in range(0, 3):
            try:
                ligne.append(float(Fraction(cases[i][j].text().strip())))
                cases[i][j].setStyleSheet("")
            except (ValueError, ZeroDivisionError):
                cases[i][j].setStyleSheet("background: #f4c7c3")
                return None
        noyau.append(ligne)
    return noyau


def noyau_modifie() -> None:
    noyau = lire_noyau()
    if noyau is None:
        somme.setText("Case invalide")
        bouton_appliquer.setEnabled(False)
    else:
        total = 0
        for ligne in noyau:
            for poids in ligne:
                total = total + poids
        somme.setText(f"Somme des poids : {round(total, 4)}")
        bouton_appliquer.setEnabled(etat["grille"] is not None)


def remplir(nom: str) -> None:
    for i in range(0, 3):
        for j in range(0, 3):
            cases[i][j].setText(NOYAUX[nom][i][j])


def afficher() -> None:
    image.setPixmap(QPixmap.fromImage(vers_qimage(etat["grille"])))
    if len(etat["appliques"]) == 0:
        info.setText("Image d'origine")
    else:
        info.setText("Appliqués : " + ", puis ".join(etat["appliques"]))


def ouvrir() -> None:
    chemin, _ = QFileDialog.getOpenFileName(fenetre, "Choisir une image", "",
                                            "Images (*.png *.jpg *.jpeg *.bmp)")
    if chemin != "":
        etat["original"] = charger(chemin)
        etat["grille"] = etat["original"]
        etat["appliques"] = []
        bouton_original.setEnabled(True)
        noyau_modifie()
        afficher()


def appliquer() -> None:
    noyau = lire_noyau()
    if noyau is None:
        return
    QApplication.setOverrideCursor(Qt.CursorShape.WaitCursor)
    etat["grille"] = vers_image(convolution(etat["grille"], noyau))
    nom = choix.currentText()
    if [[c.text().strip() for c in ligne] for ligne in cases] != NOYAUX[nom]:
        nom = "noyau perso"
    etat["appliques"].append(nom)
    afficher()
    QApplication.restoreOverrideCursor()


def revenir() -> None:
    etat["grille"] = etat["original"]
    etat["appliques"] = []
    afficher()


if __name__ == "__main__":
    app = QApplication(sys.argv)
    fenetre = QWidget()
    fenetre.setWindowTitle("Convolution")

    image = QLabel("Ouvre une image pour commencer.")
    image.setAlignment(Qt.AlignmentFlag.AlignCenter)
    image.setMinimumSize(400, 400)
    info = QLabel("")

    # Le noyau : 9 cases, qui acceptent un entier, un décimal ou une fraction
    choix = QComboBox()
    choix.addItems(list(NOYAUX.keys()))
    cases = []
    grille_noyau = QGridLayout()
    for i in range(0, 3):
        ligne = []
        for j in range(0, 3):
            case = QLineEdit()
            case.setFixedWidth(60)
            case.setAlignment(Qt.AlignmentFlag.AlignCenter)
            grille_noyau.addWidget(case, i, j)
            ligne.append(case)
        cases.append(ligne)
    somme = QLabel("")

    bouton_ouvrir = QPushButton("Ouvrir une image")
    bouton_appliquer = QPushButton("Appliquer le noyau")
    bouton_original = QPushButton("Revenir à l'original")
    bouton_appliquer.setEnabled(False)
    bouton_original.setEnabled(False)

    panneau = QVBoxLayout()
    panneau.addWidget(QLabel("Noyau"))
    panneau.addWidget(choix)
    panneau.addLayout(grille_noyau)
    panneau.addWidget(somme)
    panneau.addStretch()
    panneau.addWidget(bouton_ouvrir)
    panneau.addWidget(bouton_appliquer)
    panneau.addWidget(bouton_original)

    gauche = QVBoxLayout()
    gauche.addWidget(image)
    gauche.addWidget(info)
    disposition = QHBoxLayout(fenetre)
    disposition.addLayout(gauche)
    disposition.addLayout(panneau)

    # L'image d'origine, l'image affichée et la liste des noyaux déjà appliqués
    etat = {"original": None, "grille": None, "appliques": []}

    choix.currentTextChanged.connect(remplir)
    for ligne in cases:
        for case in ligne:
            case.textChanged.connect(noyau_modifie)
    bouton_ouvrir.clicked.connect(ouvrir)
    bouton_appliquer.clicked.connect(appliquer)
    bouton_original.clicked.connect(revenir)

    remplir("IDENTITE")
    fenetre.show()
    sys.exit(app.exec())
