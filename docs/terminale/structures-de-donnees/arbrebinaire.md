# Arbre binaire

!!! abstract "Arbre"
    Un arbre est soit vide, soit composé d'une donnée ainsi que de plusieurs sous-arbres.
    !!! question "Exercice"
        Proposez une implémentation python du type arbre.

    On nomme noeud chaque sous-arbre d'un arbre.

    On nomme racine le noeud qui n'a pas de parent.

    On nomme feuille un noeud qui n'a pas d'enfant.

    On nomme hauteur d'un arbre la longueur du chemin de sa racine à sa feuille la plus éloignée.

    On nomme taille d'un arbre son nombre de noeuds.

!!! abstract "Arbre binaire"
    Un arbre binaire est une structure composée d'une clé (ou étiquette), ainsi que de 2 arbres, le sous-arbre gauche (sag) ainsi que le sous-arbre droit (sad). C'est un arbre très particulier car on distingue bien la position de chaque sous-arbre, ce qu'on ne fait pas habituellement.

    !!! question "Exercice"
        Proposez une implémentation python du type arbrebin.

!!! abstract "Hauteur d'un arbre"
    La hauteur d'un arbre est la longueur du plus long chemin de la racine à une feuille.


!!! question "Exercices"
    Implémenter les fonctions:
    - `hauteur` calcule la hauteur d'un arbre
    - `taille` calcule le nombre de noeuds d'un arbre
    - `somme` calcule la somme des élements d'un arbre
    - `afficher` affiche à la suite toutes les clés d'un arbre.

!!! exercice "Arbre équilibré"
    Un arbre est équilibré si:
    - la différence de hauteur de ses enfants est au maximum 1.
    - ses enfants sont équilibrés.

    1. écrire la fonction est_equilibre.
    2. écrire la fonction est_abr
    3. écrire la fonction insere_abr qui insère une nouvelle clé au bon endroit.

!!! hint "Implémentation mutable"

    ```python
    class Noeud:
        def __init__(self, cle, gauche: 'Noeud', droit: 'Noeud'):
            self.cle = cle
            self.gauche = gauche
            self.droit = droit

        def est_feuille(self):
            return self.gauche is NIL and self.droite is NIL

    class Sentinelle(Noeud):
        def __init__(self):
            super().__init__(0, self, self)

    NIL = Sentinelle()  # End of data

    class ArbreBin:
        def __init__(self, racine: 'Noeud'):
            self.racine = racine
        
        def est_vide(self) -> bool:
            return self.racine == NIL

    ```

!!! question "Exercice"
    Implémentez les mêmes fonctions pour la version mutable.

!!! abstract "Arbre binaire de recherche (ABR)"
    Un arbre binaire de recherche (ABR) est un arbre binaire possèdant cette propriété:
    - La clé de l'enfant gauche est inférieure ou égale à sa clé.
    - La clé de l'enfant droit est supérieure ou égale à sa clé.
    - L'enfant gauche ainsi que l'enfant droit sont des ABR.

## Les méthodes de parcours en profondeur d'un arbre

### préfixe

### infixe

### postfixe

## parcours en largeur d'un arbre.

Pour parcourir un arbre en largeur, nous allons nous appuyer sur la structure 
de file.

