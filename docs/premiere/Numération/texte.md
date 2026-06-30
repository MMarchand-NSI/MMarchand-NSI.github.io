# Représentation d'un texte

Un texte est une suite de **caractères** (lettres, chiffres, symboles, espaces, emojis...). Comme toute information, un caractère doit être **codé sous forme de nombre** pour être stocké et manipulé par la machine.

Il faut que tout le monde le fasse de la même manière pour que les informations puissent être communiquées. À ce titre, il existe des standards internationaux.

## Le standard ASCII

Le code ASCII (utilisé au départ par les ordinateurs) associe un nombre entre 0 et 127 à chaque caractère courant.

C'est exactement le **code** dont on a parlé au début du chapitre (la section « Les chiffres et les codes ») : une convention qui associe un nombre (le signifiant) à un caractère (le signifié). Rien n'oblige `'A'` à valoir 65, c'est un choix qu'on a figé une fois pour toutes pour que toutes les machines s'accordent.


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

`ord(c)` renvoie le code (le point de code) du caractère `c`. `chr(n)` fait l'inverse : il renvoie le caractère associé au code `n`. Les deux fonctions sont réciproques.


## Une étape intermédiaire : ISO-8859-1

ASCII n'utilise que 7 bits (128 caractères) et ne connaît ni `é`, ni `ç`, ni `€`. Une première réponse a été la norme **ISO-8859-1** (aussi appelée Latin-1), qui utilise les 8 bits d'un octet (256 caractères) pour ajouter les lettres accentuées des langues d'Europe de l'Ouest.

Mais 256 cases restent très insuffisantes pour le monde entier (alphabets grec, cyrillique, arabe, idéogrammes...). Il a donc fallu un standard universel.

## Le standard Unicode

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

!!! danger "Il faut connaître l'encodage à l'avance"
    Tout comme, pour un entier signé, il faut savoir à l'avance sur combien de bits il est écrit, il faut savoir à l'avance **avec quel encodage** un texte a été écrit pour le relire correctement.

    Si on se trompe d'encodage, on obtient du charabia : le fameux `Ã©` qui s'affiche à la place de `é` vient d'un texte écrit en UTF-8 mais relu avec un autre encodage. C'est le même problème que le mot « pain », qui ne signifie pas la même chose selon la langue qu'on suppose.

Le site suivant est celui de la norme unicode https://home.unicode.org/

## Convertir un texte d'un encodage à un autre

Un même texte peut être enregistré dans des encodages différents. En Python, on choisit l'encodage au moment de lire ou d'écrire un fichier, avec le paramètre `encoding`.

```python
texte = "Crème brûlée"

# Le même texte, écrit dans deux fichiers, avec deux encodages différents
with open("en_utf8.txt", "w", encoding="utf-8") as f:
    f.write(texte)

with open("en_latin1.txt", "w", encoding="latin-1") as f:
    f.write(texte)
```

Les deux fichiers contiennent le même texte, mais **pas les mêmes octets** : en UTF-8 le « è » occupe 2 octets, en ISO-8859-1 il n'en occupe qu'un seul.

Le piège classique consiste à relire un fichier avec le **mauvais** encodage :

```python
# Fichier écrit en utf-8, relu (à tort) en latin-1
with open("en_utf8.txt", "r", encoding="latin-1") as f:
    print(f.read())   # Affiche : CrÃ¨me brÃ»lÃ©e
```

!!! question "Exercice"
    Un fichier a été écrit en ISO-8859-1 et contient le mot `café`. On le relit avec `encoding="utf-8"`. D'après ce que vous avez vu, que va-t-il se passer ? Pourquoi ?

    ??? warning "Corrigé"
        Python va probablement lever une erreur (`UnicodeDecodeError`) : l'octet unique utilisé par ISO-8859-1 pour le `é` ne correspond à aucune séquence UTF-8 valide. Là où UTF-8 attend 2 octets pour un caractère accentué, il n'en trouve qu'un. Il faut **connaître l'encodage d'origine** pour relire correctement.

!!! note "Et la manipulation des textes en Python ?"
    Créer, découper, parcourir des chaînes de caractères (`str`) en Python est traité dans le chapitre Programmation, à la page [Les chaînes de caractère](../prog/1.variables/caracteres.md).
