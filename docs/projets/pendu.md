# Le pendu

!!! tip "Objectifs"
    Appliquer tout ce que nous avons vu depuis le début de l'année.
    Réaliser des petits algorithmes.

    Se familiariser avec:

    - La prise en main d'un IDE
    - Ce qu'est un programme structuré

### Architecture
Le fichier à écrire est divisé en 2 parties:

- les fonctions relatives au jeu du pendu en général.
- les fonctions relatives à son exécution en mode console (elles seront préfixées par "__").

## Préparation

- Créez un répertoire "pendu" et ouvrez le dans VSCode  (Voir [Setup VSCode][setup-vscode]).
- Créez-y un fichier pendu.py
- Créez-y un fichier tests.py

je vous donnerai un fichier images.py contenant les "images" du pendu, que vous y ajouterez.

## Mission 1

Voici la première partie du code de pendu.py que vous devez compléter.

Vos fonctions doivent être bien testées avant de continuer.
Vous pourrez les tester dans le fichier tests.py.

!!! tip "Appeler des fonctions d'autres fichiers"
    Dans le fichier tests.py, vous pouvez appeler des fonctions de pendu.py en utilisant `pendu.choisir_mot()` par exemple.
    Mais pour ceci, il faut ajouter `import pendu` au début du fichier tests.

```python
import random
import images

MOTS = ["python", "ordinateur", "pendu", "clavier", "souris", "programmation", "console"]

def choisir_mot() -> str:
    """
    Renvoie un mot aléatoire dans la liste de mots prédéfinis.
    """
    pass

def mot_a_afficher(mot: str, lettres_trouvees: str) -> str:
    """
    Renvoie le mot avec des lettres révélées si elles ont été devinées,
    et des underscores pour les lettres restantes.
    >>> get_mot_ecran("garage", "u")
    '______'
    >>> get_mot_ecran("garage", "uae")
    '_a_a_e'

    """
    pass


def valider_lettre(s: str, lettres_tentees: str) -> int:
    """
    Renvoie:
    - 1 si ça n'est pas une lettre
    - 2 si la lettre a déjà été tentée
    - 0 sinon
    """
    pass


def a_trouve(mot: str, lettres_trouvees: str) -> bool:
    """Renvoie True si le mot est entièrement deviné, False sinon.
    >>> a_trouve("garage", "")
    False
    >>> a_trouve("garage", "ae")
    False
    >>> a_trouve("garage", "gare")
    True
    """
    pass

def intercaller_espaces(s:str) -> str:
    """
    Cette fonction renvoie la chaîne où on a intercallé des espaces entre chaque caractère.
    >>> intercaller_espaces("python")
    'p y t h o n'
    """

def tour_de_jeu(mot: str, lettre: str, lettres_trouvees: str, lettres_tentees: str, essais_restants: int,
                fn_message: Callable[[str], None]=print) -> tuple[int, str, str]:
    """
    Vérifie si la lettre est dans le mot et renvoie les variables essais_restants, lettres_trouvees et lettres_tentees mises à jour.

    Utilise la fonction fn_message pour afficher un message à l'utilisateur pour lui indiquer s'il a trouvé ou pas. Par défaut, la fonction est print.

    >>> tour_de_jeu("garage", "a", "", "", 5)
    (5, 'a', 'a')
    """
    pass

```

## Mission 2

Ecrire la fonction __partie_pendu()

```python
def __image_pendu(essais_restants: int) -> str:
    """
    Cette fonction renvoie l'image du pendu correspondant au nombre d'essais restants
    """
    pass


def __partie_pendu_console() -> bool:
    """
    Lance une partie de pendu. Renvoie True si le joueur a gagné, False sinon.
    Description de ce que doit faire cette fonction:
    - Initialise les variables de jeu:
        - mot, le mot à trouver
        - lettres_trouvees, une str contenant toutes les lettres trouvées par l'utilisateur
        - lettres_tentees, une str contenant toutes les lettres tentées par l'utilisateur
        - essais_restants  le nombre d'essais restants
    - Affiche un message de bienvenue
    - Boucle jusqu'au fin de la partie
        - Affiche le mot avec des lettres révélées si elles ont été devinées. Les lettres sont séparées par des espaces
        - Demande une lettre au joueur, recommence à demander si la lettre est invalide
        - Procède à un tour de jeu
        - Affiche le pendu.
    """
    pass
```

Ecrire la fonction

```python
def __lancer_jeu_console():
    """
    Cette fonction lance une partie et demande si l'utilisateur veut rejouer. Elle maintient un score.
    Dès que le joueur a perdu, elle affiche son score (1 point par partie gagnée)
    """
```


!!! tip "Améliorations"

    - Gestion des accents et caractères spéciaux. Lorsqu'on propose 'e', le jeu découvre les é, è, etc.
    - Récupérer la liste des mots depuis un fichier contenant tous les mots du dictionnaire.

!!! hint "God mode"
    
    Cette vidéo parlant du jeu du pendu propose aussi une manière de le rendre très difficile.
    Implémentez cette manière de faire. Ceci n'a de sens que si vous avez réalisé les améliorations.

    <iframe width="560" height="315" src="https://www.youtube.com/embed/le5uGqHKll8?si=e5ezDTKGx5tQMpCw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>