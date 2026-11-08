# Représentation d'un texte

!!! question "Rappel d'ouverture (5 minutes, cours fermé)"
    Réponds **sans rouvrir** les pages précédentes, en écrivant tes réponses.

    1. Associer un nombre à un caractère est un choix arbitraire. Pourquoi a-t-il pourtant fallu se mettre d'accord ?
    2. ASCII associe à chaque caractère un nombre de 0 à 127. Combien de caractères différents cela permet-il de nommer ?
    3. Le simulateur LMC a refusé `DAT "10€"`. Pourquoi ?

    ??? success "Correction"
        1. Parce qu'un texte écrit sur une machine doit rester lisible sur une autre. Un accord de ce genre s'appelle une **norme**.
        2. **128**, de 0 à 127.
        3. Parce que le `€` n'a pas de code dans la norme qu'emploie le simulateur, laquelle n'en connaît que 256.

Tu sais déjà qu'une chaîne de caractères est une suite de nombres, et que la table ASCII donne ces nombres : c'est la page [Les chaînes de caractère](../prog/caracteres.md). Cette page part de là et répond à la question suivante : 128 codes, puis 256, cela ne suffit pas au monde entier, alors que fait-on ?

## ISO-8859-1 : les 256 cases d'un octet

ASCII n'utilise que 7 bits, donc 128 codes, et ne connaît ni `é`, ni `ç`, ni `€`. La norme **ISO-8859-1**, aussi appelée Latin-1, utilise les 8 bits d'un octet, soit **256 codes**, et ajoute les lettres accentuées des langues d'Europe de l'Ouest. C'est elle qu'emploie le simulateur LMC, où le `é` vaut **233**.

Un caractère tient donc dans **exactement un octet**. C'est simple, et c'est la limite : 256 cases pour le grec, le cyrillique, l'arabe, les idéogrammes et les emojis, c'est sans espoir.

## Le standard Unicode

Unicode abandonne la limite de l'octet. Il attribue un **point de code** à chaque caractère de toutes les écritures du monde, et en nomme aujourd'hui plus de 150 000.

| Caractère | Point de code |
| --------- | ------------- |
| `'A'`     | `U+0041`      |
| `'é'`     | `U+00E9`      |
| `'😊'`    | `U+1F60A`     |

```python
caractere = chr(0x1F60A)
print(caractere)    ## Affiche 😊
```

C'est la même fonction `chr` que sur la page des chaînes de caractères. Un point de code est un nombre, rien de plus.

!!! info "Un point de code n'est pas encore un octet"
    Unicode dit **quel nombre** désigne quel caractère. Il ne dit pas **comment écrire ce nombre dans un fichier**, et c'est une autre question, car `U+1F60A` ne tient pas dans un octet.

    Les règles qui transforment les points de code en octets s'appellent des **encodages**, et le plus répandu est **UTF-8**. Tu n'as pas à connaître ces règles. Ce qu'il faut en savoir est ce que la section suivante te fait mesurer.

## Peser le même texte dans deux normes

!!! question "Au terminal"
    Dans le terminal de VS Code, fabrique un fichier, puis convertis-le dans l'autre norme.

    ```bash
    printf 'Crème brûlée' > utf8.txt
    iconv -f UTF-8 -t ISO-8859-1 utf8.txt > latin1.txt
    ```

    Les deux fichiers contiennent le même texte, qui compte **12 caractères**. Sur ton cahier, écris :

    - si les deux fichiers ont la même taille, et sinon lequel est le plus petit,
    - la taille en octets de `latin1.txt`.

    **Ne lance pas les commandes de vérification tant que tu n'as pas écrit tes réponses.**

    ```bash
    wc -c utf8.txt latin1.txt
    file utf8.txt latin1.txt
    ```

    ??? success "Correction"
        `latin1.txt` pèse **12 octets**, un par caractère : dans cette norme, un caractère **est** un octet.

        `utf8.txt` pèse **15 octets** pour les mêmes 12 caractères. Les trois octets de plus correspondent aux trois caractères accentués, `è`, `û` et `é`, qui en prennent **deux** chacun en UTF-8. Retiens cela, et rien d'autre sur UTF-8 : un caractère n'y occupe pas toujours un octet.

        `file` nomme la norme qu'il a reconnue : `Unicode text, UTF-8 text` pour le premier, `ISO-8859 text` pour le second. Il ajoute `with no line terminators`, parce que `printf` n'a pas mis de saut de ligne à la fin.

!!! danger "Un fichier ne dit pas dans quelle norme il est écrit"
    Un fichier ne contient que des octets. Si on se trompe de norme en le relisant, on obtient du charabia.

    ```bash
    iconv -f ISO-8859-1 -t UTF-8 utf8.txt
    ```

    Cette commande lit `utf8.txt` **comme s'il était** en ISO-8859-1, et affiche `CrÃ¨me brÃ»lÃ©e` : chacun des deux octets du `è` a été pris pour un caractère à part entière. C'est le `Ã©` qu'on voit sur les pages web mal configurées.

    C'est le même problème que pour un entier signé, où il faut savoir d'avance sur combien de bits il est écrit. Et c'est celui du mot « pain », qui ne désigne pas la même chose selon la langue qu'on suppose.

!!! question "Exercice"
    Tu relis maintenant `latin1.txt` en le prenant pour de l'UTF-8.

    ```bash
    iconv -f UTF-8 -t ISO-8859-1 latin1.txt
    ```

    Sur ton cahier, écris ce que tu attends : du charabia comme ci-dessus, ou autre chose ? Justifie en une phrase.

    **Ne lance pas la commande tant que tu n'as pas écrit ta réponse.**

    ??? success "Correction"
        Autre chose : la commande **s'arrête sur une erreur**, `iconv: illegal input sequence at position 2`, après avoir affiché `Cr`.

        La différence avec le cas précédent est la suivante. Tout octet est un caractère valide en ISO-8859-1, donc lire de l'UTF-8 comme du Latin-1 réussit toujours et donne du charabia. L'inverse est faux : UTF-8 n'accepte pas n'importe quelle suite d'octets, et l'octet 233 du `è`, seul, n'en est pas une. Un charabia est pénible, une erreur est préférable, car elle prévient.

## Ce que chaque norme achète

| Norme | Codes | Taille d'un caractère | Ce qu'elle couvre |
| --- | --- | --- | --- |
| ASCII | 128 | 1 octet | l'anglais, les chiffres, la ponctuation |
| ISO-8859-1 | 256 | 1 octet | en plus, l'Europe de l'Ouest accentuée |
| UTF-8 | tout Unicode | 1 à 4 octets | toutes les écritures du monde |

UTF-8 est la norme employée par défaut à peu près partout aujourd'hui, et elle a une propriété qui explique son succès : sur un texte qui ne contient que des caractères ASCII, elle produit **exactement les mêmes octets** qu'ASCII. Un vieux fichier anglais reste donc lisible sans rien convertir.

Le site de la norme Unicode : <https://home.unicode.org/>

!!! note "Et la manipulation des textes en Python ?"
    Créer, découper, parcourir des chaînes de caractères (`str`) en Python est traité dans le chapitre Programmation, à la page [Les chaînes de caractère](../prog/caracteres.md).
