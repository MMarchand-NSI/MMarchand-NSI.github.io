# Paradigme orienté objets

!!! abstract "Définition"
    En programmation orientée objet, un programme est un ensemble d'entités qui interagissent. Ces entités sont appelées des **objets**. Un objet possède un **état** (les données qui le caractérisent) et des **comportements** (ce qu'il sait faire).

    L'état d'un objet est représenté par l'ensemble de ses **attributs**
    Les comportements d'un objet sont représentés par l'ensemble de ses **méthodes**

    Une **classe** permet de définir une famille d'objets. A partir d'une classe, on peut créer autant d'objets que l'on veut. Ce sont des exemplaires, des **instances** de la classe.


## Classe `Animal`

Voici un exemple basique d'une classe en Python qui modélise la phrase "Un animal porte un nom, et il sait parler."

```python
class Animal:
    def __init__(self, nom: str):
        self.nom = nom  # Attribut d'instance
    
    def parler(self):   # Méthode d'instance
        print(f"{self.nom} fait du bruit.")
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
    ```

    On considèrera malgré tout que `__init__` est le constructeur, car si on vous pose la question, c'est la réponse attendue.

  
Exemple d'utilisation de cette classe :

```python
x = Animal("Bidule")   # création d'une instance d'Animal portant le nom bidule
print(x.nom)           # On accède aux attributs de l'instance avec le point. Affiche: Bidule
x.nom = "Truc"         # Mutabilité -> On peut modifier les attributs de l'instance de la même manière 
x.parler()  # On accède aussi aux méthodes d'instance par le point. Affiche: Truc fait du bruit.
```

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
```

On pourra alors faire ce qui est décrit en français :

```python
x = Humain("Peter", "Quill")
y = Animal("Rocket")
x.adopte(y)

x.afficher_animaux()   # Affiche Rocket
```


Ici, on a choisi que l'humain porte la liste de ses animaux. On aurait pu à la place ajouter un attribut propriétaire à la classe Animal pour dire qu'un animal est la propriété d'un humain particulier. Mais on aurait perdu la possibilité d'afficher les animaux d'un humain sans disposer de la liste de tous les animaux. Il faut souvent choisir quelle classe est le "chef d'orchestre" en fonction du problème qu'on a à traiter.

!!! info "Héritage"
    L’**héritage** est un autre concept fondamental en POO. Il permet à une classe (dite **classe dérivée**, ou **sous classe**) d’hériter des attributs et méthodes d’une autre classe (dite **classe de base**, ou **super classe**).

#### Exemple : Classe `RatonLaveur` héritant de `Animal`

Nous pourrions ajouter un attribut `espece` à la classe Animal pour les distinguer, mais ici, pour introduire le concept, nous allons choisir cette phrase en Français: "Un RatonLaveur EST UN Animal"

```python
class RatonLaveur(Animal):

    def __init__(self, nom: str):
        super().__init__(nom) # cette ligne appelle le constructeur de la super classe

    def parler(self):
        print(f"{self.nom} émet des grognements.")
```

La classe `RatonLaveur` hérite de `Animal` mais peut redéfinir certaines méthodes (ici, `parler`), ou encore en créer d'autres. Ainsi, un objet de la classe `Chien` pourra aboyer au lieu de "faire du bruit". Un Raton laveur pourra émettre das grognements

En français, on peut très bien dire dès lors "Un Chien **EST UN** Animal"


*Programme exemple*:
```python
x = Animal("Animal quelconque")
x.parler()
y = RatonLaveur("Rocket")
y.parler()
print(isinstance(x, Animal), isinstance(x, RatonLaveur))
print(isinstance(y, Animal), isinstance(y, RatonLaveur))
```
*Affichage:*
```
Animal quelconque fait du bruit
Rocket émet des grognements
True False
True True
```

La fonction `isinstance` sert à savoir si un objet est une instance d'une classe.
Si on a besoin de l'utiliser, c'est presque toujours du à un défaut de conception. On n'aura pas besoin de l'utiliser.

