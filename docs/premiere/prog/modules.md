# Modules Python

Un **module** est un fichier Python (`.py`) qui contient du code réutilisable : des fonctions, des classes, des variables. Les modules permettent d'**organiser** le code et d'**éviter la répétition**.

Python propose des centaines de modules intégrés (comme `random`, `math`, `os`...), permet d'en télécharger des milliers d'autres, et vous pouvez aussi créer vos propres modules.

## 1. Qu'est-ce qui se cache derrière `import`

### Exemple de départ

```python
import random

print(random.randint(1, 6))
```

Ce programme affiche un nombre aléatoire entre 1 et 6 (comme un dé).

### Explication de l'import

Quand vous écrivez `import random`, Python :

1. **Cherche** un fichier nommé `random.py` dans ses bibliothèques standard
2. **Exécute** tout le code de ce fichier (définitions de fonctions, de variables, etc.)
3. **Crée** un objet `random` qui contient tout ce qui a été défini dans le fichier

Ensuite, vous pouvez accéder aux fonctions du module avec la **notation pointée** : `random.randint()`, `random.choice()`, etc.

!!! example "Autres modules courants"
    ```python
    import math
    print(math.sqrt(16))  # Racine carrée : 4.0
    print(math.pi)        # Constante pi : 3.141592653589793

    import time
    print("Attends 2 secondes...")
    time.sleep(2)
    print("C'est bon !")
    ```

### Variantes de l'import

#### Import avec alias

c'est une fonctionnalité qui sert à renommer un module pour que le code soit plus léger.

```python
import random as rd

print(rd.randint(1, 6))  # Plus court à écrire
```

#### Import d'une fonction spécifique

Lorsqu'on a besoin que d'une seule fonction.

```python
from random import randint

print(randint(1, 6))  # Pas besoin de préfixer par "random."
```

!!! warning "Attention"
    Avec `from random import randint`, vous ne pouvez utiliser que `randint`. Pour utiliser d'autres fonctions du module, il faudrait les importer aussi.

#### Import de tout (MAUVAISE PRATIQUE - NE PAS FAIRE)

J'ajoute uniquement ce paragraphe pour que vous ne fassiez pas ça.

```python
from random import *

print(randint(1, 6))
print(choice([1, 2, 3]))
```

!!! danger "Mauvaise pratique"
    `from module import *` importe **tout** et peut créer des conflits de noms. La dernière version importée écrase les précédentes.

    **Exemple concret du problème :**

    ```python
    from math import *
    from numpy import *

    # La fonction exp de numpy a écrasé celle de math
    print(exp(1))           # Fonctionne : 2.718...
    print(exp(1 + 2j))      # Fonctionne : numpy accepte les complexes
    ```

    Maintenant, inversons l'ordre :

    ```python
    from numpy import *
    from math import *

    # La fonction exp de math a écrasé celle de numpy
    print(exp(1))           # Fonctionne : 2.718...
    print(exp(1 + 2j))      # ❌ ERREUR : math n'accepte pas les complexes
    ```

    **Le même code produit des résultats différents selon l'ordre des imports !** C'est pourquoi il faut éviter `import *`.

## 2. Importer un fichier dans le même répertoire

Vous pouvez créer vos propres modules en écrivant un fichier Python, puis l'importer dans un autre fichier.

### Exemple : Module de calculs géométriques

**Fichier `geometrie.py` (le module) :**

```python
def aire_rectangle(longueur, largeur):
    """Calcule l'aire d'un rectangle."""
    return longueur * largeur

def aire_cercle(rayon):
    """Calcule l'aire d'un cercle."""
    import math
    return math.pi * rayon ** 2

def perimetre_rectangle(longueur, largeur):
    """Calcule le périmètre d'un rectangle."""
    return 2 * (longueur + largeur)
```

**Fichier `programme.py` (utilise le module) :**

```python
import geometrie

# Utiliser les fonctions du module geometrie
print(geometrie.aire_rectangle(5, 3))       # 15
print(geometrie.aire_cercle(10))            # 314.159...
print(geometrie.perimetre_rectangle(5, 3))  # 16
```

!!! info "Comment ça marche ?"
    Quand Python voit `import geometrie`, il cherche un fichier `geometrie.py` dans le **même répertoire** que `programme.py`, l'exécute, et vous donne accès à tout ce qui y est défini.

### Exemple : Module de jeux

**Fichier `jeux.py` :**

```python
import random

def lancer_de(nombre_faces=6):
    """Simule le lancer d'un dé."""
    return random.randint(1, nombre_faces)

def pile_ou_face():
    """Simule un pile ou face."""
    return random.choice(["Pile", "Face"])

def tirage_loto(nb_numeros=5, maximum=49):
    """Tire des numéros aléatoires sans répétition."""
    return random.sample(range(1, maximum + 1), nb_numeros)
```

**Fichier `mon_jeu.py` :**

```python
from jeux import lancer_de, pile_ou_face

print("Lancer de dé:", lancer_de())        # ex: 4
print("Pile ou face:", pile_ou_face())     # ex: Pile
print("Dé à 20 faces:", lancer_de(20))     # ex: 17
```

### Organisation des fichiers

```
mon_projet/
├── geometrie.py      ← Module
├── jeux.py           ← Module
├── programme.py      ← Utilise geometrie
└── mon_jeu.py        ← Utilise jeux
```

!!! tip "Bonnes pratiques"
    - Un module = un fichier avec des **fonctions liées** (géométrie, jeux, calculs...)
    - Donnez des **noms clairs** aux modules (évitez `module1.py`, `truc.py`)
    - **Documentez** vos fonctions avec des docstrings (`"""..."""`)

## 3. Installer de nouveaux modules

Python a une immense **bibliothèque** de modules créés par la communauté. Pour les utiliser, il faut d'abord les **installer**.

### La bibliothèque PyPI

[PyPI](https://pypi.org/) (*Python Package Index*) est le dépôt officiel qui contient plus de 500 000 modules Python : pour faire des graphiques, des sites web, de l'intelligence artificielle, des jeux...

Exemples de modules populaires :

- `requests` : pour faire des requêtes HTTP
- `flask` : pour créer des applications web
- `numpy` : pour les calculs scientifiques
- `pygame` : pour créer des jeux

### Installation avec `uv`

`uv` est un outil moderne pour gérer les dépendances Python. Il est **beaucoup plus rapide** que `pip` (l'outil classique).

#### Installer un module

```bash
uv add requests
```

**Ce qu'il se passe :**

1. **`uv` cherche** le module `requests` sur PyPI
2. **Télécharge** le module et toutes ses dépendances (autres modules dont il a besoin)
3. **Installe** le module dans votre projet
4. **Met à jour** le fichier `pyproject.toml` (qui liste tous les modules de votre projet)
5. **Met à jour** le fichier `uv.lock` (qui verrouille les versions exactes)

!!! info "Fichiers créés"
    - **`pyproject.toml`** : liste les modules dont votre projet a besoin
    - **`uv.lock`** : verrouille les versions exactes pour garantir la reproductibilité
    - **`.venv/`** : dossier contenant tous les modules installés (environnement virtuel)

#### Utiliser le module installé

Après `uv add requests`, vous pouvez l'importer normalement :

```python
import requests

response = requests.get("https://api.github.com")
print(response.status_code)  # 200 si tout va bien
```

#### Désinstaller un module

```bash
uv remove requests
```

#### Installer les dépendances d'un projet existant

Si vous récupérez un projet Python qui a un fichier `pyproject.toml`, installez toutes les dépendances avec :

```bash
uv sync
```

!!! tip "Recommandation"
    Utilisez `uv` pour tous vos nouveaux projets. C'est l'avenir de la gestion de dépendances en Python.

## 4. Exercices

!!! question "Exercice 1 : Module de conversions"
    Créez un fichier `conversions.py` avec les fonctions suivantes :

    - `celsius_vers_fahrenheit(c)` : convertit des degrés Celsius en Fahrenheit
    - `fahrenheit_vers_celsius(f)` : convertit des degrés Fahrenheit en Celsius
    - `km_vers_miles(km)` : convertit des kilomètres en miles (1 km = 0.621371 miles)

    Créez ensuite un fichier `test_conversions.py` qui importe ce module et teste les trois fonctions.

??? success "Solution"
    **Fichier `conversions.py` :**

    ```python
    def celsius_vers_fahrenheit(c):
        """Convertit des degrés Celsius en Fahrenheit."""
        return c * 9/5 + 32

    def fahrenheit_vers_celsius(f):
        """Convertit des degrés Fahrenheit en Celsius."""
        return (f - 32) * 5/9

    def km_vers_miles(km):
        """Convertit des kilomètres en miles."""
        return km * 0.621371
    ```

    **Fichier `test_conversions.py` :**

    ```python
    import conversions

    print(conversions.celsius_vers_fahrenheit(0))    # 32.0
    print(conversions.fahrenheit_vers_celsius(32))   # 0.0
    print(conversions.km_vers_miles(10))             # 6.21371
    ```

!!! question "Exercice 2 : Utiliser le module `math`"
    Sans regarder la documentation, essayez de deviner ce que font ces fonctions du module `math` :

    ```python
    import math

    print(math.floor(3.7))
    print(math.ceil(3.2))
    print(math.sqrt(25))
    print(math.pow(2, 3))
    ```

    Exécutez le code pour vérifier vos hypothèses.

??? success "Solution"
    ```python
    import math

    print(math.floor(3.7))  # 3 (arrondi à l'entier inférieur)
    print(math.ceil(3.2))   # 4 (arrondi à l'entier supérieur)
    print(math.sqrt(25))    # 5.0 (racine carrée)
    print(math.pow(2, 3))   # 8.0 (puissance : 2³)
    ```

!!! question "Exercice 3 : Import sélectif"
    Réécrivez ce code en important **seulement** les fonctions nécessaires (avec `from ... import ...`) :

    ```python
    import math

    rayon = 5
    aire = math.pi * math.pow(rayon, 2)
    print(aire)
    ```

??? success "Solution"
    ```python
    from math import pi, pow

    rayon = 5
    aire = pi * pow(rayon, 2)
    print(aire)
    ```

!!! question "Exercice 4 : Module de statistiques"
    Créez un fichier `stats.py` avec les fonctions :

    - `moyenne(liste)` : calcule la moyenne d'une liste de nombres
    - `minimum(liste)` : renvoie le plus petit élément
    - `maximum(liste)` : renvoie le plus grand élément

    Testez votre module avec `[10, 15, 8, 22, 19]`.

??? success "Solution"
    **Fichier `stats.py` :**

    ```python
    def moyenne(liste):
        """Calcule la moyenne d'une liste de nombres."""
        return sum(liste) / len(liste)

    def minimum(liste):
        """Renvoie le plus petit élément."""
        return min(liste)

    def maximum(liste):
        """Renvoie le plus grand élément."""
        return max(liste)
    ```

    **Test :**

    ```python
    from stats import moyenne, minimum, maximum

    valeurs = [10, 15, 8, 22, 19]
    print(moyenne(valeurs))  # 14.8
    print(minimum(valeurs))  # 8
    print(maximum(valeurs))  # 22
    ```

## 5. Résumé

- Un **module** est un fichier Python (`.py`) contenant du code réutilisable
- **`import module`** charge un module (standard ou local)
- **Modules standard** : `random`, `math`, `time`, etc. (fournis avec Python)
- **Modules locaux** : vos propres fichiers `.py` dans le même répertoire
- **PyPI** : bibliothèque en ligne avec 500 000+ modules
- **`uv add`** : installe un module depuis PyPI (rapide et moderne)
- **`uv sync`** : installe toutes les dépendances d'un projet existant

