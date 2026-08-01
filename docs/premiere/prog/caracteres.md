# Les chaînes de caractère

!!! note "Rappel d'ouverture (5 minutes, cours fermé)"
    Réponds **sans rouvrir** les pages précédentes, en écrivant tes réponses.

    1. On veut échanger les contenus de `a` et `b`. Pourquoi `a = b` puis `b = a` ne marche-t-il pas ?
    2. Que valent `17 // 5` et `17 % 5` ? Quelle égalité relie ces deux résultats à `17` et `5` ?
    3. Que vaut `type(3.0)` ? Et `type(3)` ?

    ??? success "Corrigé"
        1. La première ligne **écrase** l'ancienne valeur de `a`, qui est perdue. Il faut la mettre de côté : `temp = a`, puis `a = b`, puis `b = temp`.
        2. `17 // 5` vaut `3` (quotient entier) et `17 % 5` vaut `2` (reste). On a $5 \\times 3 + 2 = 17$.
        3. `float` et `int`. `3.0` et `3` désignent le même nombre mais ne sont pas du même type.

```python
s = "Bonjour"
```

Ici, on crée la variable s et on lui donne une valeur, la valeur "Bonjour". Python sait tout seul qu'il s'agit d'une chaine de caractères car on a mis `Bonjour` **entre guillemets**.

Afin d'être plus précis, on peut indiquer explicitement le type qu'on souhaite pour la variable en utilisant cette syntaxe:

```python
a: str = "Bonjour"
```

`str` est le type correspondant à une chaîne de caractères. `str` vaut pour `string` en anglais qui signifie chaîne.

Lorsque les programmes deviennent longs, on peut se perdre dans les types, alors il faut prendre l'habitude de les indiquer lorsqu'on crée des variables.

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
    La représentation d'un texte en machine (codes ASCII, Unicode, encodage UTF-8) est traitée dans le chapitre [Représentation de l'information > Texte](../Numération/texte.md). Cette page-ci se concentre sur la **manipulation** des chaînes en Python.

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


!!! abstract "Ce que tu viens de rencontrer s'appelle une séquence"
    Une **séquence** est une suite d'éléments **ordonnés**, numérotés de `0` à `len(...) - 1`, auxquels on accède par leur **indice** entre crochets.

    La chaîne de caractères est la première que tu rencontres, elle ne sera pas la dernière : les **listes** et les **tuples**, plus loin dans le cours, sont aussi des séquences. Retiens dès maintenant ce qui ne changera pas d'un type à l'autre :

    | Ce qu'on veut | Comment on l'écrit |
    | --- | --- |
    | l'élément numéro `i` | `seq[i]` |
    | le nombre d'éléments | `len(seq)` |
    | le dernier élément | `seq[len(seq) - 1]`, ou `seq[-1]` |
    | savoir si `x` s'y trouve | `x in seq` |
    | les parcourir tous | `for element in seq:` |

    C'est l'un des rares endroits du cours où l'on apprend une chose **une fois pour toutes**. Quand tu croiseras les listes, tu n'auras ni nouvel accès, ni nouvelle boucle à apprendre.

!!! note "Et pour parcourir tous les caractères ?"
    Accéder à un caractère par son indice est une chose. Parcourir automatiquement **tous** les caractères d'une chaîne en est une autre : c'est le rôle de la boucle `for`.

    Ce mécanisme de parcours est étudié à part entière dans le cours [La boucle for](boucle-for.md), car ce qui se passe à chaque tour de boucle mérite d'être déroulé pas à pas. On y reprend justement le parcours de chaînes de caractères.

## Immutabilité

Une chaîne est **immuable** : une fois créée, on ne peut pas en changer un caractère. Toute opération qui « modifie » une chaîne renvoie en réalité une **nouvelle** chaîne.

```python
s = "python"
s[0] = "P"        # TypeError : on ne peut pas modifier un caractère
s = "P" + s[1:]   # on fabrique une nouvelle chaîne : "Python"
```

## Chaînes sur plusieurs lignes

Avec des triples guillemets :

```python
texte = """Ligne 1
Ligne 2"""
```

## Les f-strings : insérer des valeurs

Pour construire une chaîne à partir de variables, on préfixe la chaîne par `f` et on met les expressions entre accolades :

```python
nom = "Alice"
age = 25
print(f"Je m'appelle {nom} et j'ai {age} ans.")
```

## Quelques méthodes utiles

À ne pas apprendre par cœur : on les retrouve au besoin.

```python
s = "  Python  "
s.lower()               # '  python  '
s.upper()               # '  PYTHON  '
s.strip()               # 'Python' (enlève les espaces autour)
s.replace("Py", "My")   # '  Mython  '

"123".isdigit()         # True
"abc".isalpha()         # True
```

!!! danger "Une méthode ne modifie pas la chaîne"
    Comme les chaînes sont immuables, `s.upper()` **renvoie** une nouvelle chaîne sans changer `s`. Pour garder le résultat, il faut le récupérer : `s = s.upper()`.

