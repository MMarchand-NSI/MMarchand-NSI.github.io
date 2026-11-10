# Les chaînes de caractère

!!! question "Prédire la valeur"
    Écris la valeur de l'expression demandée comme Python l'écrirait (`'abc'`, `True`, `2.0`), puis valide. Quand le champ est marqué « affiche », écris plutôt ce que le programme affiche. Si le programme s'arrête sur une erreur, écris `erreur`. Les valeurs changent à chaque essai.

<script type="text/x-silent-teacher" data-titre="Les chaînes de caractères">
s = {{m:'chat'|'loup'|'ours'}}
s + s
---
x = {{x:'2'|'3'|'4'}}
y = {{y:'5'|'6'|'7'}}
x + y
---
'a' + {{k:1..3}}
---
{{m:'ha'|'bo'|'zu'}} * {{n:2..4}}
---
s = {{m:'chat'|'tigre'|'girafe'}}
len(s)
---
s = {{m:'chat'|'tigre'|'girafe'}}
s[{{i:1..3}}]
---
s = {{m:'chat'|'tigre'|'girafe'}}
s[len(s)]
---
s = {{m:'girafe'|'python'|'bureau'}}
s[{{i:0..2}}:{{j:3..5}}]
---
s = {{m:'nsi'|'chat'|'loup'}}
s = s.upper()
s
---
s = {{m:'nsi'|'chat'|'loup'}}
s.upper()
s
</script>
<script src="/javascripts/silent_teacher.js" defer></script>

!!! note "Rappel d'ouverture (5 minutes, cours fermé)"
    Réponds **sans rouvrir** les pages précédentes, en écrivant tes réponses.

    1. On veut échanger les contenus de `a` et `b`. Pourquoi `a = b` puis `b = a` ne marche-t-il pas ?
    2. Que valent `17 // 5` et `17 % 5` ? Quelle égalité relie ces deux résultats à `17` et `5` ?
    3. Que vaut `type(3.0)` ? Et `type(3)` ?

    ??? success "Correction"
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

## Dans la mémoire, il n'y a que des nombres

Reprends le simulateur **LMC** du chapitre sur l'architecture. Cette machine n'a que des cases, et chaque case contient un nombre.

!!! question "Programme 1 : prédire, puis vérifier"
    Recopie ce programme dans un fichier `nsi.lmc`. Sur ton cahier, écris :

    - les nombres contenus dans les cases n°7, n°8 et n°9,
    - ce que le programme affiche, dans l'ordre.

    Puis assemble, charge, et compare : la **mémoire** répond à la première question, **Run** à la seconde.

    **N'ouvre pas le simulateur tant que tu n'as pas écrit tes réponses.**

    ```
            LDA 7
            OUT
            LDA 8
            OUT
            LDA 9
            OUT
            HLT

    mot:    DAT "NSI"
    ```

    ??? success "Correction"
        Les cases n°7, n°8 et n°9 contiennent **78**, **83** et **73**. Le programme affiche `78 83 73`.

        `DAT "NSI"` n'a mis dans la mémoire que trois nombres, un par lettre.

!!! question "Programme 2 : une seule ligne change"
    Le même programme, avec la ligne `mot:` écrite autrement. Sur ton cahier, écris :

    - les nombres contenus dans les cases n°7, n°8 et n°9,
    - ce que le programme affiche.

    **N'ouvre pas le simulateur tant que tu n'as pas écrit tes réponses.**

    ```
            LDA 7
            OUT
            LDA 8
            OUT
            LDA 9
            OUT
            HLT

    mot:    DAT 78, 83, 73
    ```

    ??? success "Correction"
        La même chose : les cases n°7, n°8 et n°9 contiennent **78**, **83** et **73**, et le programme affiche `78 83 73`.

        `DAT "NSI"` et `DAT 78, 83, 73` rangent les mêmes nombres dans les mêmes cases. Pour la machine, les deux lignes ne se distinguent pas : « ranger du texte » n'existe pas chez elle.

        Une seule chose les sépare, et elle ne se voit pas dans ces cases : `DAT "NSI"` réserve une **quatrième** case, la n°10, qui contient 0 et marque la fin du mot. C'est elle qui permet à un programme de savoir où le mot s'arrête sans qu'on lui donne sa longueur.

!!! abstract "Une chaîne de caractères est une suite de nombres"
    `"NSI"` n'est pas rangé en mémoire sous forme de lettres : c'est **78, 83, 73**, trois nombres dans trois cases voisines. En Python, c'est la même chose, à ceci près que c'est Python qui retient la longueur du mot, et c'est elle que `len` te rend.

    Et les lettres que tu vois à l'écran ? C'est un **dessin**. Il n'y a rien dans la mémoire qui ressemble à un `N` : il y a 78, et un programme d'affichage a décidé de tracer la forme qu'on appelle `N` quand il rencontre 78. Change la police de caractères, le dessin change. Le 78, lui, ne change pas. Le simulateur LMC, qui n'a pas de police, affiche d'ailleurs `78`.

### Qui a décidé que `N` valait 78 ?

Le simulateur aurait pu choisir 1 pour `A`, 2 pour `B`, ou n'importe quelle autre correspondance. Associer un nombre à un caractère est un **code**, exactement comme la table que tu avais fabriquée à la première séance de l'année : toutes les correspondances se valent, aucune n'est plus juste qu'une autre.

Mais si chaque machine choisissait la sienne, un texte écrit sur l'une serait illisible sur l'autre. Il a donc fallu se mettre d'accord une fois pour toutes, et un tel accord s'appelle une **norme**. La plus ancienne est **ASCII**, qui associe un nombre de 0 à 127 à chaque caractère courant.

| Caractères | Codes |
| ---------- | ----- |
| `'0'` à `'9'` | 48 à 57 |
| `'A'` à `'Z'` | 65 à 90 |
| `'a'` à `'z'` | 97 à 122 |
| l'espace | 32 |

Dans chaque intervalle, les caractères se suivent dans l'ordre. Un code se retrouve donc par le calcul, sans table complète : `N` est la 14e lettre de l'alphabet, son code est $65 + 13 = 78$. C'est bien ce que le simulateur a affiché.

!!! danger "Le caractère `'0'` n'est pas le nombre 0"
    Le code du caractère `'0'` est **48**, pas 0. De même, `'1'` vaut 49 et non 1. `"0"` et `0` sont deux choses différentes, et une machine ne les confond jamais.

!!! danger "Majuscules et minuscules sont des caractères différents"
    `'A'` vaut 65 et `'a'` vaut 97. Ce ne sont pas deux façons d'écrire la même chose : ce sont deux codes, donc deux caractères.

En Python, deux fonctions font le va-et-vient avec cette table :

- `ord(c)` donne le **code** du caractère `c`. `ord("A")` vaut 65.
- `chr(n)` donne le **caractère** de code `n`. `chr(65)` vaut `'A'`.

!!! question "Les mêmes nombres, en Python"
    Le simulateur a affiché `78 83 73`. Sur ton cahier, écris les trois instructions Python qui donnent ces trois nombres à partir des lettres `N`, `S` et `I`, puis celle qui redonne la lettre `S` à partir de 83.

    ??? success "Correction"
        `ord("N")` vaut 78, `ord("S")` vaut 83, `ord("I")` vaut 73. Et `chr(83)` vaut `'S'`.

!!! question "Jusqu'où cette machine sait-elle aller ?"
    Dans le programme 1, remplace la ligne `mot:` par `DAT "été"`. Sur ton cahier, écris :

    - combien de cases le mot va occuper,
    - si les trois nombres affichés seront tous différents.

    **N'ouvre pas le simulateur tant que tu n'as pas écrit tes réponses.**

    Assemble et lance pour vérifier, puis essaie `DAT "10€"` et note ce que répond le simulateur.

    ??? success "Correction"
        Le mot occupe **quatre** cases, comme `"NSI"` : trois pour les lettres, une pour le 0 de fin. Et le programme affiche **233, 116, 233** : le premier et le troisième nombres sont identiques, puisque c'est deux fois la même lettre. Le `é` a donc un code lui aussi, 233. Il est au-delà de 127 : ce n'est plus de l'ASCII, mais une norme qui l'étend à 256 codes, celle que le simulateur nomme dans son message ci-dessous.

        `"10€"` est refusé, et le simulateur dit pourquoi : `« € » n'existe pas en ISO-8859-1 : seuls les caractères de code 0 à 255 sont représentables`. Cette machine ne connaît que 256 codes, et le `€` n'en fait pas partie.

        C'est exactement ce qui a rendu Unicode nécessaire. Les codes ASCII, Unicode et l'encodage UTF-8 sont traités dans le chapitre [Représentation de l'information > Texte](../Numération/texte.md). Cette page-ci se concentre sur la **manipulation** des chaînes en Python.


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

En Python, une chaîne de caractères est une suite ordonnée de caractères, c'est-à-dire, comme tu viens de le voir sur le simulateur, une suite de nombres. Chaque lettre de la chaîne est numérotée selon sa position : la première lettre porte le numéro 0, la deuxième le numéro 1, et ainsi de suite. Par exemple, dans la chaîne "chat", la lettre 'c' est à la position 0, 'h' à la position 1, 'a' à la position 2, et 't' à la position 3. Pour accéder à une lettre, on écrit le nom de la chaîne suivi de crochets avec le numéro entre les crochets. Exemple : `"chat"[1]` renvoie 'h'.

| Indice | 0     | 1     | 2     | 3     |
| ------ | ----- | ----- | ----- | ----- |
| Lettre | `'c'` | `'h'` | `'a'` | `'t'` |

Les indices 0, 1 et 2 de `"NSI"`, ce sont les cases n°7, n°8 et n°9 du simulateur. Numéroter à partir de 0, c'est compter les cases depuis le début du mot.

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
s = "P" + s[1:len(s)]   # on fabrique une nouvelle chaîne : "Python"
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

