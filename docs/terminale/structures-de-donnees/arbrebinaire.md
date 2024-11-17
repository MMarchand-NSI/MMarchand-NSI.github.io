# Arbres binaires

!!! danger "Pré-requis"
    Si les travaux sur les listes sont maîtrisés, ceci ne devrait presque être qu'une formalité.


```mermaid

graph TD;
    A((3))
    A --> B((7))
    A --> C((2))
    B --> D((9))
    B --> E((18))
    C --> F((15))
    C --> G((6))
    C --> H((5))
    F --> I((8))
```

Ci-dessus, voici un arbre enraciné.


!!! abstract "Définitions"
    Un arbre est constitué de plusieurs Noeuds.
    Un noeud peut porter une donnée. Ici, un entier.

!!! abstract "Arbre (enraciné)"
    Un arbre est soit vide, soit composé d'un noeud portant une donnée ainsi que d'une liste de plusieurs sous-arbres.

    !!! question "Exercice"
        Nous ne travaillerons qu'avec des arbres portant des entiers.
        Proposez une implémentation python du type arbre.


!!! abstract "Arbre binaire"
    Un arbre binaire est une structure composée d'une clé (ou étiquette), ainsi que de 2 arbres, le sous-arbre gauche (sag) ainsi que le sous-arbre droit (sad). C'est un arbre très particulier car on distingue bien la position de chaque sous-arbre.

    !!! question "Exercice"
        En vous inspirant du travail fait sur les listes:

        1. Proposez une implémentation python du type arbrebin.
        2. Proposez une implémentation OCaml du type arbrebin.


!!! question "Exercices"
    Implémenter les fonctions d'accès de base:

    - `cle(a: arbrebin) -> int`
    - `sag(a: arbrebin) -> arbrebin`
    - `sad(a: arbrebin) -> arbrebin`
    - `est_vide(a: arbrebin) -> bool`
    
    Implémenter en conséquence les fonctions récursives:
    
    - `hauteur` calcule la hauteur d'un arbre
        - (je suis un arbre, je pose la question à mon sag et mon sad, qu'est-ce que je fais avec leurs réponse?)
    - `taille` calcule le nombre de noeuds d'un arbre
    - `somme` calcule la somme des élements d'un arbre
    - `to_str` renvoie une str comportant toutes les clés d'un arbre.
    - `minimum` renvoie la clé minimum d'un arbre binaire.
    - `minimum` renvoie la clé minimum d'un arbre binaire.


!!! question "Arbre équilibré"
    Un arbre est équilibré s'il est vide ou que, à la fois:

    - La distance entre la hauteur de ses enfants est au maximum 1.
    - Ses enfants sont équilibrés.
    
    Ecrire la fonction `est_equilibre(a: arbrebin) -> bool`.

!!! question "Renforcement"
    Ecrire les mêmes fonctions pour un arbre enraciné quelconque.
    (Ca n'est en réalité qu'une généralisation de chaque algorithme à un nombre quelconque d'enfants)


!!! abstract "Arbre binaire - Définition alternative"
    Un arbre est soit vide, soit c'est un ensemble de noeuds reliés hiérarchiquement.

    Chaque noeud a au plus 2 enfants, l'enfant gauche et l'enfant droit.

    On nomme racine le noeud qui n'a pas de parent.

    On nomme feuille un noeud qui n'a pas d'enfant.

    On nomme hauteur d'un arbre la longueur du chemin de la racine à sa feuille la plus éloignée.

    On nomme taille d'un arbre son nombre de noeuds.

!!! hint "Implémentation mutable"
    L'implémentation ci-dessous utilise aussi une sentinelle, mais ne l'utilise pas de manière aussi sioux que pour les listes. Elle signifie seulement l'absence d'enfant. La création d'une sentinelle nous permet de ne pas utiliser la valeur générique None, qui pourrait signifier bien autre chose qu'une absence d'enfant, car None n'est pas propre à notre structure.

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

    NIL = Sentinelle()

    class ArbreBin:
        def __init__(self, racine: 'Noeud'):
            self.racine = racine
        
        def est_vide(self) -> bool:
            return self.racine is NIL

    ```

!!! question "Exercice"
    Implémentez les mêmes fonctions pour la version mutable.


## Les méthodes de parcours en profondeur d'un arbre

### préfixe

<iframe width="560" height="315" src="https://www.youtube.com/embed/gLx7Px7IEzg?si=rR-4Mtf7nPubX4nD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### infixe

<iframe width="560" height="315" src="https://www.youtube.com/embed/ne5oOmYdWGw?si=druIgvEBO_Pg0AfH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### postfixe

<iframe width="560" height="315" src="https://www.youtube.com/embed/a8kmbuNm8Uo?si=ktKC8v8jtKmckYnW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Parcours en largeur d'un arbre.

Pour parcourir un arbre en largeur, nous allons nous appuyer sur la structure 
de file.

## Arbre binaire de recherche

!!! abstract "Arbre binaire de recherche (ABR)"
    Un arbre binaire de recherche (ABR) est un arbre binaire vide ou possèdant ces propriétés:
    
    - la clé du sag non vide est inférieure ou égale à sa clé.
    - la clé du sad non vide est supérieure ou égale à sa clé.
    - Le sad et le sag sont des ABR.

    Définition équivalente:
    Pour chaque noeud d'un ABR:
    
    - Toutes les clés de son sag sont inférieures ou égales à sa clé
    - Toutes les clés de son sad sont supérieures ou égales à sa clé


    L'objectif est ici de disposer d'une structure qui nous permette de rechercher de l'information très rapidement.

```mermaid
graph TD;
    A[8] --> B[4]
    A --> C[12]
    B --> D[2]
    B --> E[6]
    C --> F[10]
    C --> G[14]
    D --> H[1]
    D --> I[3]
    E --> J[5]
    E --> K[7]
    F --> L[9]
    F --> M[11]
    G --> N[13]
    G --> O[15]
```

!!! question "Exercices"
    - Dessiner 3 ABR où, partant d'un arbre vide, on insère successivement les valeurs:

        - 3, 7, 1, 9, 4, 8, 2, 5, 6
        - 6, 2, 9, 1, 5, 3, 8, 4, 7
        - 9, 5, 3, 7, 2, 6, 1, 8, 4

    - Ecrire une fonction `est_abr(a: arbrebin) -> bool`
    - Ecrire une fonction `insere_abr(e: int, a: arbrebin) -> arbrebin`
    - Ecrire une fonction `recherche_abr(e: int, a: arbrebin) -> bool`
    - Discussion: Quelle est la complexité de `recherche_abr`? 
        - Pour un arbre filiforme
        - Pour un arbre parfait

!!! question "TD->TP Compression de données - Codage de Huffman"
    Voir fichier donné


!!! tip "Avancé - Rotations"
    ![alt text](image-2.png)

    - Montrer que la rotation préserve les propriétés d'ABR
    - Ecrire une fonction `rotation_droite`
    - Ecrire une fonction `rotation_gauche`
    - En considérant les hauteurs des sad et sag avant et après rotation, discuter à quoi pourraient servir les rotations.


!!! question "MP2I"
    Pas de bidouillage. Priorité à la disjonction de cas.
    Implémentez toutes les fonctions en OCaml. 