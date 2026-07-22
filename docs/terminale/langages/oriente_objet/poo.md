# Paradigme orienté objets

!!! abstract "Définition"
    En programmation orientée objet, un programme est un ensemble d'entités qui interagissent. Ces entités sont appelées des **objets**. Un objet possède un **état** (les données qui le caractérisent) et des **comportements** (ce qu'il sait faire).

    L'état d'un objet est représenté par l'ensemble de ses **attributs**
    Les comportements d'un objet sont représentés par l'ensemble de ses **méthodes**

    Une **classe** permet de définir une famille d'objets. A partir d'une classe, on peut créer autant d'objets que l'on veut. Ce sont des exemplaires, des **instances** de la classe.

!!! tip "Le facile et le difficile"
    Écrire une classe (ses attributs, ses méthodes) est la partie **visible et statique**. Le vrai enjeu, plus difficile, est la **dynamique** : ce qui se passe **à l'exécution**, quand on crée des objets, qu'on les relie par des **références**, et qu'ils s'envoient des messages (les appels de méthodes). C'est cette dynamique qu'on va **tracer**, pas seulement la syntaxe.


## Classe `Animal`

Voici un exemple basique d'une classe en Python qui modélise la phrase "Un animal porte un nom, et il sait parler."

```python
class Animal:
    def __init__(self, nom: str):
        self.nom = nom  # Attribut d'instance
    
    def parler(self):   # Méthode d'instance
        print(f"{self.nom} fait du bruit.")

x = Animal("Bidule")   # création d'une instance d'Animal portant le nom bidule
print(x.nom)           # On accède aux attributs de l'instance avec le point. Affiche: Bidule
x.nom = "Truc"         # Mutabilité -> On peut modifier les attributs de l'instance de la même manière 
x.parler()  # On accède aussi aux méthodes d'instance par le point. Affiche: Truc fait du bruit.

```

Ce programme affichera
```
Bidule
Truc fait du bruit
```

Dans cet exemple :

- **`__init__`** : Cette méthode sera automatiquement chargée d'initialiser les attributs de l'objet en cours d'instanciation. On le considère comme le **constructeur** de la classe.
- **`self`** : Représente l'instance actuelle de la classe. Il permet d'accéder aux attributs et méthodes de l'objet lui-même.


!!! abstract "Constructeur"
    Un constructeur est une fonction particulière appelée lors de l'instanciation. Elle permet d'allouer la mémoire nécessaire à l'objet et d'initialiser ses attributs.


!!! info "Abus de langage"
    Il est très (trop) courant de considérer `__init__` comme le constructeur en Python, car il initialise l'objet après sa création. Cependant, il ne fait que la moitié du travail. la méthode chargée de créer l'instance est le dunder `__new__`. La preuve en est que `__init__` prend self en paramètre, c'est donc bien que self existe déjà avant l'invocation d'`__init__`. Le constructeur est en réalité le couple formé par les méthodes `__new__` et `__init__`.

    Voici une portion de code pour se rendre compte de ce qu'il se passe réellement:

    ```python
    class MaClasse:
        def __new__(cls, *args, **kwargs):
            '''Appel de __new__ pour créer une nouvelle instance de la classe'''
            print("Appel de __new__ : Création de l'instance")
            instance = super(MaClasse, cls).__new__(cls)
            return instance
        
        def __init__(self, valeur):
            '''Appel de __init__ pour initialiser l'instance avec les attributs'''
            print("Appel de __init__ : Initialisation de l'instance")
            self.valeur = valeur
    
        def afficher_valeur(self):
            print(f"Valeur : {self.valeur}")
    
    # Instanciation d'un objet
    c = MaClasse("truc")
    c.afficher_valeur()
    ```

    On considèrera malgré tout que `__init__` est le constructeur, car si on vous pose la question, c'est la réponse attendue.

## Une variable désigne un objet : les références

Le point le plus délicat de l'objet n'est pas la syntaxe des classes, c'est de suivre ce qui se passe **à l'exécution**. En particulier : que contient une variable comme `x` après `x = Animal("Bidule")` ?

`x` ne **contient** pas l'animal. `x` **désigne** l'objet : elle en garde une **référence** (une flèche vers lui, quelque part en mémoire). C'est le même mécanisme que le partage de référence rencontré avec les listes.

Conséquence directe : deux variables peuvent désigner le **même** objet.

```python
a = Animal("Rocket")
b = a               # b et a désignent le MÊME objet
b.nom = "Groot"
print(a.nom)        # Groot : modifier via b a changé a
```

!!! warning "Piège : une référence n'est pas une copie"
    `b = a` ne crée **pas** un second animal : `a` et `b` sont deux noms pour le même objet. Modifier l'un modifie l'autre. Pour savoir si deux variables désignent le **même** objet (et non deux objets seulement égaux), on utilise `is` :

    ```python
    c = Animal("Rocket")
    d = Animal("Rocket")
    print(c is d)          # False : deux objets distincts...
    print(c.nom == d.nom)  # ...mais qui portent le même nom
    ```

    « Qui est l'objet ? » est une vraie question : un même objet peut apparaître sous plusieurs noms.

!!! abstract "`self`, c'est l'objet courant"
    Dans une méthode, `self` désigne l'instance **sur laquelle** la méthode est appelée. Quand on écrit `a.parler()`, la méthode `parler` s'exécute avec `self` valant `a`. Chaque objet a ses **propres** attributs : `self.nom` est le nom de **cet** objet-là, pas d'un autre.

!!! tip "Trace la dynamique"
    Copie ces exemples dans [Python Tutor](https://pythontutor.com/) et avance pas à pas : tu verras les objets créés en mémoire et les **flèches** (les références) qui pointent vers eux. C'est la meilleure façon de voir ce que la simple lecture du code ne montre pas.

  


## Interactions entre objets

Rajoutons la phrase "Un Humain porte un nom, un prenom et peut adopter des animaux domestiques. On peut afficher la liste des animaux d'un Humain".

```python
class Humain:
    def __init__(self, prenom: str, nom: str):
        self.nom = nom
        self.prenom = prenom
        self.animaux: list[Animal] = []

    def adopte(self, a: Animal):
        self.animaux.append(a)
    
    def afficher_animaux(self):
        for a in self.animaux:
            print(a.nom)


x = Humain("Peter", "Quill")
y = Animal("Rocket")
x.adopte(y)
x.afficher_animaux()   # Affiche Rocket
```


Ici, on a choisi que l'humain porte la liste de ses animaux. On aurait pu à la place ajouter un attribut propriétaire à la classe Animal pour dire qu'un animal est la propriété d'un humain particulier. Mais on aurait perdu la possibilité d'afficher les animaux d'un humain sans disposer de la liste de tous les animaux. Il faut souvent choisir quelle classe est le "chef d'orchestre" en fonction du problème qu'on a à traiter.



!!! question "Modélisation objet"

    Une voiture a une marque, un modèle, un prix, un nombre de kilomètres parcourus, une quantite de carburant dans le réservoir (en litres), et une consommation (litres au 100).
    Une voiture peut rouler sur une certaine distance. À chaque fois qu'elle roule, le kilométrage augmente, et le carburant diminue.
    Le réservoir de la voiture a une capacité maximale.
    On peut afficher les caractéristiques de la voiture.

    Un Humain a une quantité d'argent disponible sur son compte en banque.
    Un Humain peut acheter des voitures.
    Un Humain peut faire des trajets avec une voiture pour un certain nombre de kilomètres.
    Avant de commencer un trajet, l'humain vérifie s'il a assez d'essence, sinon, il va à la station service faire le plein.
    Lorsqu'un humain fait le plein de sa voiture, son compte en banque diminue. 

    - Ecrivez une classe Humain et une classe Voiture compatibles avec cette description.
    - Instanciez ensuite Humain et Voiture afin de tester des scenarios d'utilisation.
