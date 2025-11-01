!!! info "Héritage"
    L’**héritage** est un autre pilier fondamental en POO. Il permet à une classe (dite **sous classe**) d’hériter des attributs et méthodes d’une autre classe (dite **super classe**).


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
Si on a besoin de l'utiliser hors debugging, c'est sûrement du à un défaut de conception. On n'aura pas besoin de l'utiliser.

