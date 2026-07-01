# Le type tuple (p-uplet)

Un **tuple** (ou p-uplet) est une [séquence](2.sequences.md) **immuable** : une fois créé, on ne peut plus le modifier. On le crée avec des **parenthèses**.

```python
point = (3, 7)
personne = ("Alice", 25, "Paris")
```

Comme toute séquence, on y accède par indice, on le parcourt avec `for`, on connaît sa taille avec `len` : tout cela fonctionne exactement comme décrit dans [Les séquences](2.sequences.md). Cette page se concentre sur ce qui est **propre au tuple**.

!!! danger "Le piège du tuple à un seul élément"
    Un tuple à un seul élément **se termine par une virgule** : `(1,)`. Sans elle, les parenthèses ne sont qu'un groupement de calcul.

    ```python
    print((1) + (2))     # 3   : ce sont deux nombres
    print((1,) + (2,))   # (1, 2) : ce sont deux tuples
    ```

## Quand utiliser un tuple plutôt qu'une liste ?

Les deux stockent plusieurs valeurs, mais l'intention diffère :

- une **liste** est une collection qu'on fait **évoluer** (on ajoute, on retire, on trie) ;
- un **tuple** est un **enregistrement figé** : un groupe de valeurs qui vont ensemble et ne doivent pas changer.

On l'utilise typiquement pour un point `(x, y)`, une date `(jour, mois, annee)`, une fiche `("Alice", 25, "Paris")`, une couleur `(r, g, b)`. L'immuabilité est ici une **garantie** : personne ne modifiera la valeur par accident.

## La déstructuration

On peut affecter d'un coup plusieurs variables à partir d'un tuple : c'est la **déstructuration** (ou déconstruction). La forme de gauche est comparée à celle de droite.

```python
a, b, c = 3, 7, 9        # a=3, b=7, c=9

personne = ("Alice", 25, "Paris")
nom, age, ville = personne
print(nom)    # Alice
print(ville)  # Paris
```

On peut même capturer « le reste » avec `*` :

```python
premier, *milieu, dernier = [1, 2, 3, 4, 5]
print(premier)  # 1
print(milieu)   # [2, 3, 4]
print(dernier)  # 5
```

## Retour multiple d'une fonction

La déstructuration rend un service très courant : une [fonction](fonctions.md) peut **renvoyer plusieurs valeurs** en les regroupant dans un tuple, qu'on déstructure à l'appel.

```python
def min_max(lst: list[int]) -> tuple[int, int]:
    """Renvoie le plus petit et le plus grand élément."""
    return min(lst), max(lst)

petit, grand = min_max([3, 7, 2, 9])
print(petit, grand)   # 2 9
```

## Exemple : les couleurs RGB

Une couleur se représente par un tuple `(r, g, b)` (rouge, vert, bleu), chaque canal de 0 à 255. C'est ce qu'utilise la bibliothèque Pillow.

```python
from PIL import Image
image = Image.new("RGB", (100, 100), (255, 0, 0))   # une image rouge
image.show()
```

!!! question "Image en niveau de gris"
    La version en niveau de gris d'un pixel `(r, g, b)` est `(m, m, m)`, où `m` est la moyenne de `r`, `g` et `b`.

    Écrivez une fonction `to_noir_blanc(fichier)` qui ouvre une image, remplace chaque pixel par sa version en niveau de gris, et l'affiche.

    ```python
    from PIL import Image
    image = Image.open("image.png")
    for x in range(image.size[0]):
        for y in range(image.size[1]):
            r, g, b = image.getpixel((x, y))
            ...
    ```

!!! question "Moyenne"
    Vos notes sont dans un tuple `notes`. Calculez leur moyenne.
