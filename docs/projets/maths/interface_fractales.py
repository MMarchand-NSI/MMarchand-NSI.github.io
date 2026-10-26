"""Une fenêtre pour explorer les ensembles de Mandelbrot et de Julia.

À placer à côté de fractales.py, puis lancer :
    uv run interface_fractales.py

Tu n'as rien à écrire dans ce fichier. Il utilise tes fonctions vers_complexe,
grille_mandelbrot et, quand tu l'as écrite, grille_julia.

Dans l'image :
- clic gauche : zoom, centré sur le point cliqué,
- clic droit : dézoom,
- Maj + clic gauche, en mode Mandelbrot : ensemble de Julia du point cliqué,
- survol : la barre du bas affiche le pixel et le nombre complexe qu'il représente.
"""
import math
import sys
from typing import TypedDict

from PySide6.QtCore import QEvent, Qt
from PySide6.QtGui import QColor, QImage, QMouseEvent, QPixmap
from PySide6.QtWidgets import (QApplication, QComboBox, QHBoxLayout, QLabel,
                               QLineEdit, QPushButton, QSpinBox, QStatusBar,
                               QVBoxLayout, QWidget)

import fractales

LARGEUR = 300
HAUTEUR = 300
VUE_MANDELBROT = (-0.5 + 0j, 3.0)
VUE_JULIA = (0j, 3.2)


class Vue(TypedDict):
    """La partie du plan affichée : son centre et la largeur qu'elle représente."""
    centre: complex
    etendue: float


def couleur(n: int, n_max: int) -> QColor:
    """Noir si la suite n'a pas dépassé 2, sinon une teinte qui dépend de n."""
    if n == n_max:
        return QColor(0, 0, 0)
    return QColor.fromHsv((240 + 12 * n) % 360, 255, 255)


def vers_qimage(g: list[list[int]], n_max: int) -> QImage:
    img = QImage(len(g[0]), len(g), QImage.Format.Format_RGB32)
    for y in range(0, len(g)):
        for x in range(0, len(g[0])):
            img.setPixelColor(x, y, couleur(g[y][x], n_max))
    return img


def lire_c() -> complex | None:
    """Lit c dans la case de saisie, écrit à la façon de Python : -0.8+0.156j."""
    try:
        return complex(saisie_c.text().replace(" ", ""))
    except ValueError:
        return None


def dessiner() -> None:
    centre = etat["centre"]
    etendue = etat["etendue"]
    n_max = choix_n_max.value()
    QApplication.setOverrideCursor(Qt.CursorShape.WaitCursor)
    if mode.currentText() == "Mandelbrot":
        g = fractales.grille_mandelbrot(LARGEUR, HAUTEUR, centre, etendue, n_max)
        titre = "Mandelbrot"
    else:
        c = lire_c()
        if c is None:
            QApplication.restoreOverrideCursor()
            info.setText("c mal écrit : écris par exemple -0.8+0.156j")
            return
        g = fractales.grille_julia(LARGEUR, HAUTEUR, centre, etendue, c, n_max)
        titre = f"Julia, c = {c}"
    image.setPixmap(QPixmap.fromImage(vers_qimage(g, n_max)))
    QApplication.restoreOverrideCursor()
    info.setText(f"{titre}   centre : {centre}   étendue : {etendue:.3g}")


def recentrer() -> None:
    if mode.currentText() == "Mandelbrot":
        etat["centre"], etat["etendue"] = VUE_MANDELBROT
    else:
        etat["centre"], etat["etendue"] = VUE_JULIA
    dessiner()


def cliquer(evenement: QMouseEvent) -> None:
    x = int(evenement.position().x())
    y = int(evenement.position().y())
    z = fractales.vers_complexe(x, y, LARGEUR, HAUTEUR, etat["centre"], etat["etendue"])
    maj = evenement.modifiers() & Qt.KeyboardModifier.ShiftModifier
    if maj and mode.currentText() == "Mandelbrot" and JULIA:
        saisie_c.setText(f"{z.real:.6g}{z.imag:+.6g}j")
        mode.setCurrentText("Julia")
        return
    if evenement.button() == Qt.MouseButton.RightButton:
        etat["etendue"] = etat["etendue"] * 2
    else:
        etat["centre"] = z
        etat["etendue"] = etat["etendue"] / 2
    dessiner()


def survoler(evenement: QMouseEvent) -> None:
    """Affiche dans la barre du bas le pixel survolé et le nombre qu'il représente."""
    x = int(evenement.position().x())
    y = int(evenement.position().y())
    if x < 0 or x >= LARGEUR or y < 0 or y >= HAUTEUR:
        barre.clearMessage()
        return
    z = fractales.vers_complexe(x, y, LARGEUR, HAUTEUR, etat["centre"], etat["etendue"])
    # Assez de décimales pour distinguer deux pixels voisins, et pas davantage
    pas = etat["etendue"] / LARGEUR
    d = max(1, math.ceil(-math.log10(pas)) + 1)
    signe = "-" if z.imag < 0 else "+"
    barre.showMessage(f"pixel ({x}, {y})    {z.real:.{d}f} {signe} {abs(z.imag):.{d}f}i")


class Image(QLabel):
    """L'image de la fractale : elle transmet les clics à cliquer, et le survol à survoler."""
    def __init__(self) -> None:
        super().__init__()
        self.setMouseTracking(True)

    def mousePressEvent(self, evenement: QMouseEvent) -> None:
        cliquer(evenement)

    def mouseMoveEvent(self, evenement: QMouseEvent) -> None:
        survoler(evenement)

    def leaveEvent(self, evenement: QEvent) -> None:
        barre.clearMessage()


if __name__ == "__main__":
    JULIA = hasattr(fractales, "grille_julia")

    app = QApplication(sys.argv)
    fenetre = QWidget()
    fenetre.setWindowTitle("Fractales")

    image = Image()
    image.setFixedSize(LARGEUR, HAUTEUR)
    info = QLabel("")
    barre = QStatusBar()
    barre.setSizeGripEnabled(False)

    mode = QComboBox()
    mode.addItem("Mandelbrot")
    if JULIA:
        mode.addItem("Julia")
    saisie_c = QLineEdit("-1+0j")
    choix_n_max = QSpinBox()
    choix_n_max.setRange(1, 100000)
    choix_n_max.setValue(50)
    bouton_dessiner = QPushButton("Dessiner")
    bouton_recentrer = QPushButton("Vue de départ")

    reglages = QHBoxLayout()
    reglages.addWidget(mode)
    reglages.addWidget(QLabel("c ="))
    reglages.addWidget(saisie_c)
    reglages.addWidget(QLabel("n_max ="))
    reglages.addWidget(choix_n_max)
    boutons = QHBoxLayout()
    boutons.addWidget(bouton_dessiner)
    boutons.addWidget(bouton_recentrer)
    disposition = QVBoxLayout(fenetre)
    disposition.addLayout(reglages)
    disposition.addWidget(image)
    disposition.addWidget(info)
    disposition.addLayout(boutons)
    disposition.addWidget(barre)

    etat: Vue = {"centre": VUE_MANDELBROT[0], "etendue": VUE_MANDELBROT[1]}

    mode.currentTextChanged.connect(recentrer)
    bouton_dessiner.clicked.connect(dessiner)
    bouton_recentrer.clicked.connect(recentrer)
    saisie_c.returnPressed.connect(dessiner)

    fenetre.show()
    dessiner()
    sys.exit(app.exec())
