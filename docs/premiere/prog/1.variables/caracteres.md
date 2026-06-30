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

!!! info "Comment un texte est-il stocké en mémoire ?"
    La représentation d'un texte en machine (codes ASCII, Unicode, encodage UTF-8) est traitée dans le chapitre [Représentation de l'information > Texte](../../Numération/texte.md). Cette page-ci se concentre sur la **manipulation** des chaînes en Python.

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


!!! note "Et pour parcourir tous les caractères ?"
    Accéder à un caractère par son indice est une chose. Parcourir automatiquement **tous** les caractères d'une chaîne en est une autre : c'est le rôle de la boucle `for`.

    Ce mécanisme de parcours sera étudié à part entière dans le cours [Parcourir des itérables](../bouclefor.md), car ce qui se passe à chaque tour de boucle mérite d'être déroulé pas à pas. On y reprendra justement le parcours de chaînes de caractères.

