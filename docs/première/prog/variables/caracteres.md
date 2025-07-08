# Les chaînes de caractère

```python
s = "Bonjour"
```

Ici, on créé la variable s et on lui donne une valeur, la valeur "Bonjour". Python sait tout seul qu'il s'agit d'une chaine de caractères car on a mis `Bonjour` **entre guillements**.

Afin d'être plus précis, on peut indiquer explicitement le type qu'on souhaite pour la variable en utilisant cette syntaxe:

```python
a: str = "Bonjour"
```

`str` est le type correspondant à une chaîne de caractères. `str` vaut pour `string` en anglais qui signifie chaîne.

Lorsque les programmes deviennent longs, on peut se perdre dans les types, alors il faut prendre l'habitude de les indiquer lorsqu'on créé des variables.

!!! danger "Les guillemets sont importants"
    ```python
    a = "Bonjour"
    ```
    Cette instruction affecte l'information "Bonjour" qui est une chaine de caractères à la variable a

    ```python
    a = Bonjour
    ```
    Cette instruction affecte le contenu de la variable `Bonjour` à la variable a.

## Représentation en mémoire

**Comme toute information**, les str sont stockés dans la mémoire sous forme d'une suite de bits organisés en octets. Il faut que tout le monde le fasse de la même manière pour que les informations puissent être transmises. A ce titre, il existe des standards.

### Le standard Ascii

Le code ASCII (utilisé au départ par les ordinateurs) associe un nombre entre 0 et 127 à chaque caractère courant.


| Caractère | Code ASCII | Stockage Binaire (8 bits) |
| --------- | ---------- | ---------------- |
| `'A'`     | 65         | `01000001`       |
| `'a'`     | 97         | `01100001`       |
| `'B'`     | 66         | `01000010`       |
| `'0'`     | 48         | `00110000`       |

Vous noterez que pour un ordinateur, les majuscules et les minuscules ne sont pas du tout les mêmes informations. Il les considère comme différentes.

```python
s: str = 'B'
print(ord(s))    ## Affiche 66
print(chr(48))   ## Affiche '0'
```

Le code précédent affiche le nombre de bits utilisés par python pour stocker l'information 157.


### Le standard Unicode

Le code ASCII ne suffit pas pour représenter toutes les lettres (comme 'é', 'ç') ou d’autres symboles d'autres langues. Pour encoder plus de caractères, on utilise maintenant Unicode, qui peut représenter plus de 1 million de caractères du monde entier (accents, symboles scientifiques, emojis...).

Unicode est un standard universel. Il définit chaque caractère avec un code unique (point de code). Le 10 septembre 2024, 5185 nouveaux caractères ont été ajoutés, portant le total à 154998 caractères représentables.


| Caractère | Point de code Unicode |
| --------- | --------------------- |
| `'A'`     | `U+0041`              |
| `'é'`     | `U+00E9`              |
| `'😊'`    | `U+1F60A`             |

Mais ce sont juste des nombres abstraits : on ne dit pas comment les stocker ou transmettre.

Pour ceci, on utilise des encodages qui transforment les points de code en octets (bytes) pour les stocker.


| Caractère | Description              | Encodage UTF-8 (en hexadécimal) | Octets (en binaire)                   |
| --------- | ------------------------ | ------------------------------- | ------------------------------------- |
| `'A'`     | Lettre ASCII             | `41`                            | `01000001`                            |
| `'é'`     | Lettre accentuée (latin) | `C3 A9`                         | `11000011 10101001`                   |
| `'€'`     | Symbole euro             | `E2 82 AC`                      | `11100010 10000010 10101100`          |
| `'😊'`    | Emoji « visage joyeux »  | `F0 9F 98 8A`                   | `11110000 10011111 10011000 10001010` |
| `'語'`     | Kanji « langue / mot »   | `E8 AA 9E`                      | `11101000 10101010 10011110`          |

On utilise souvent la représentation des octets en hexadécimal lorsqu'on a besoin de les lire.

```python
caractere = bytes.fromhex("F09F988A").decode("utf-8")
print(caractere)  # Affiche 😊
```

Dans le code précédent, on créé une suite de 4 octets (bytes en anglais) d'après leur forme hexadécimale, puis on demande à python leur représentation en caractère d'après l'encodage UTF-8.

```python
caractere = chr(0x1F60A)
print(caractere)  # Affiche 😊
```

Ici, la fonction `chr` nous permet directement d'utiliser le point unicode pour en déduire un caractère.


Le site suivant est celui de la norme unicode https://home.unicode.org/


## Opérations possibles


| **Opérateur**        | **Opération**                    | **Exemple**                    |
| -------------------- | -------------------------------- | ------------------------------ |
| `+`                  | **Concaténation**                | `"bon" + "jour"` → `'bonjour'` |
| `*`                  | Répétition                       | `"ha" * 3` → `'hahaha'`        |


| **Fonction**        | **Description**                    | **Exemple**                    |
| -------------------- | -------------------------------- | ------------------------------ |
| `len()`              | **Longueur de la chaîne**            | `len("chat")` → `4`            |
| `ord()`              | Code Unicode d’un caractère      | `ord('A')` → `65`              |
| `chr()`              | Caractère depuis un code Unicode | `chr(65)` → `'A'`              |



| **Extraction**        | **Description**                    | **Exemple**                    |
| -------------------- | -------------------------------- | ------------------------------ |
| `[]`                 | **Indexation (un caractère)**        | `"chat"[0]` → `'c'`            |
| `[start:end]`        | **Slice de `start` à `end` EXCLU**          | `"chat"[1:3]` → `'ha'`         |



| **Comparaison**        | **Description**                    | **Exemple**                    |
| -------------------- | -------------------------------- | ------------------------------ |
| `in`                 | Présence d’un élément            | `'a' in "chat"` → `True`       |
| `not in`             | Absence d’un élément             | `'z' not in "chat"` → `True`   |
| `==`, `!=`           | **Égalité / différence**             | `"Abc" == "abc"` → `False`      |
| `<`, `>`, `<=`, `>=` | **Comparaison lexicographique**      | `"poire" < "portugal"` → `True`       |

Note: La comparaison lexicographique est celle de l'ordre des mots dans un dictionnaire.

## Accès aux caractères

En Python, une chaîne de caractères est une suite ordonnée de lettres, comme un mot ou une phrase. Chaque lettre de la chaîne est numérotée selon sa position : la première lettre porte le numéro 0, la deuxième le numéro 1, et ainsi de suite. Par exemple, dans la chaîne "chat", la lettre 'c' est à la position 0, 'h' à la position 1, 'a' à la position 2, et 't' à la position 3. Pour accéder à une lettre, on écrit le nom de la chaîne suivi de crochets avec le numéro entre les crochets. Exemple : `"chat"[1]` renvoie 'h'.

| Indice | 0     | 1     | 2     | 3     |
| ------ | ----- | ----- | ----- | ----- |
| Lettre | `'c'` | `'h'` | `'a'` | `'t'` |

!!! danger "Attention au 0"
    Il faut faire attention, comme d'habitude, on commence toujours à tout numéroter à partir de 0.

    Si la longueur de `"chat"` est 4, ses indices vont de 0 à 3

!!! danger "Dépassement d'indice"
    Si on demande le caractère à un indice qui n'existe pas, python émettra une erreur.
    `>>> "chat"[4]`
    `IndexError: string index out of range`


!!! question "Algorithme"

    ```python
    texte = "truc"
    res = ""

    POUR CHAQUE Caractère car de la variable texte, FAIRE:
        res = car + res
    FIN POUR

    AFFICHER res
    ```
    
    - Qu'affiche l'algorithme précédent?

    `POUR CHAQUE Caractère car de la variable texte, FAIRE:` s'écrit en python ainsi:

    ```python
    for car in texte:
    ```

    - Ecrire le programme python correspondant


!!! question "Algorithme"


    ```python
    texte = "truc"
    res = ""

    POUR CHAQUE entier i de 0 à 2, FAIRE:
        SI texte[i] > texte[i+1] VAUT VRAI, ALORS FAIRE
            res = texte[i] + res
        FIN SI
    FIN POUR
    
    AFFICHER res
    ```

    - Qu'affiche l'algorithme précédent?


    `POUR CHAQUE entier i de 0 à 2, FAIRE:` s'écrit en python:
    ```python
    for i in range(0, 3):
    ```

    `SI texte[i] > texte[i+1] VAUT VRAI, ALORS FAIRE` s'écrit en python:
    ```python
    if texte[i] > texte[i+1]:
    ```

    Pourquoi 3? c'est le signal STOP pour python, il ne le fera pas. Il n'ira donc que jusqu'à 2.

