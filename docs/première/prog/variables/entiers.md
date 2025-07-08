# Le type entier

```python
a = 2
```

Ici, on créé la variable a et on lui donne une valeur, la valeur 2. Python sait tout seul qu'il s'agit d'un entier sans qu'on lui dise. On dit qu'il pratique "l'inférence de type". (Il devine le type)

Afin d'être plus précis, on peut indiquer explicitement le type qu'on souhaite pour la variable en utilisant cette syntaxe:

```python
a: int = 157
```

`int` est le type correspondant à un entier relatif. `int` vaut pour `integer` en anglais qui signifie un nombre entier.

Lorsque les programmes deviennent longs, on peut se perdre dans les types, alors il faut prendre l'habitude de les indiquer lorsqu'on créé des variables.

## Représentation en mémoire

**Comme toute information**, les entiers sont stockés dans la mémoire sous forme d'une suite de bits organisés en octets.

```python
a: int = 157
print(a.bit_length())   ## Affiche 8
```

Le code précédent affiche le nombre de bits utilisés par python pour stocker l'information 157.

!!! question "Représentation des entiers"
    `bin(a)` renvoie la représentation binaire de l'entier a.

    - Donnez l'affichage que produira la ligne `print(bin(a))`

    `hex(a)` renvoie la représentation binaire de l'entier a.

    - Donnez l'affichage que produira la ligne `print(hex(a))`


### Opérations possibles

Dans la liste ci-dessous, il faut se focaliser sur la section **Arithmétique de base**

Nous reviendrons en temps et en heure sur les autres.


|  **Catégorie**           | **Opération**               | **Symbole / Code** | **Exemple**          |
| -------------------------- | --------------------------- | ------------------ | -------------------- | 
| **Arithmétique de base**   | Addition                    | `+`                | `3 + 5 → 8`          |
|                            | Soustraction                | `-`                | `9 - 4 → 5`          |
|                            | Multiplication              | `*`                | `6 * 7 → 42`         |
|                            | Division entière (quotient) | `//`               | `17 // 5 → 3`        |
|                            | Modulo (reste)              | `%`                | `17 % 5 → 2`         |
|                            | Puissance                   | `**`               | `2 ** 3 → 8`         |
| **Comparaison**            | Égalité                     | `==`               | `4 == 4 → True`      |
|                            | Différent                   | `!=`               | `4 != 5 → True`      |
|                            | Inférieur                   | `<`                | `3 < 7 → True`       |
|                            | Supérieur                   | `>`                | `9 > 5 → True`       |
|                            | Inférieur ou égal           | `<=`               | `6 <= 6 → True`      |
|                            | Supérieur ou égal           | `>=`               | `8 >= 5 → True`      |
| **Affectations combinées** | Addition et affectation     | `+=`               | `a += 2` ↔ `a = a+2` |
|                            | Soustraction et affectation | `-=`               | `a -= 2`             |
|                            | etc.                        | `*=`, `//=`, etc.  |                      |
| **Opérations binaires**    | ET bit-à-bit                | `&`                | `5 & 3 → 1`          |
|                            | OU bit-à-bit                | `\|`               | `5 \| 3 → 7`         |
|                            | OU exclusif (XOR)           | `^`                | `5 ^ 3 → 6`          |
|                            | Négation binaire            | `~`                | `~5 → -6`            |
|                            | Décalage à gauche           | `<<`               | `3 << 2 → 12`        |
|                            | Décalage à droite           | `>>`               | `12 >> 2 → 3`        |


## Division Euclidienne

La division euclidienne est celle que vous avez appris en primaire. On n'en fait plus trop après, mais c'est une opération fondamentale.


![alt text](image.png)

Dans l'opération précédente, on effectue la division euclidienne de 163 par 5.

Le quotient est 32. On l'obtient en calculant `163 // 5`

le reste est 3. On l'obtient en calculant `163 % 5`

Si j'ai 163 chocolats et que je veux les mettre dans des boîtes de 5, je pourrai donc faire 32 boîtes pleines, et il me restera 3 chocolats.

$163 = 5 \times 32 + 3$
