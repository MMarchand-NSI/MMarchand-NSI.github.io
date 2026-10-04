# La boucle non bornée : `while`

!!! note "Rappel d'ouverture (5 minutes, cours fermé)"
    Réponds **sans rouvrir** les pages précédentes, en écrivant tes réponses.

    1. Après `x = 100`, on exécute trois fois de suite `x = x // 3`. Que vaut `x` après chacune ?
    2. Avec `note = 15`, pourquoi cette suite de tests affiche-t-elle « passable » et non « bien » ?
       ```python
       if note >= 10: print("passable")
       elif note >= 14: print("bien")
       ```
    3. Une variable créée dans le corps d'une fonction existe-t-elle encore après l'appel ?

    ??? success "Corrigé"
        1. `33`, puis `11`, puis `3`. Chaque division entière fait diminuer `x` : retiens-le, c'est ce genre de quantité qui garantit qu'une boucle s'arrête.
        2. Parce que Python **s'arrête au premier test vrai**. `15 >= 10` est vrai, donc le premier bloc s'exécute et tous les `elif` suivants sont ignorés. Il faut tester **du cas le plus exigeant au moins exigeant**.
        3. Non. Elle est **locale** : elle naît à l'appel et disparaît quand la fonction rend la main.

## Pourquoi ? Quand on ne sait pas combien de tours

La boucle [`for`](boucle-for.md) parcourt une séquence **finie** : on connaît d'avance le nombre de tours. Mais parfois, on ne le connaît **pas** :

- redemander une saisie **tant que** l'utilisateur se trompe ;
- continuer une partie **tant que** personne n'a gagné ;
- avancer dans un calcul **tant que** ce n'est pas terminé.

Pour cela, on utilise la boucle **`while`** : « **répéter tant qu'**une condition est vraie ».

## `while` : répéter tant que...

```python
while condition:
    instructions
```

Tant que la condition est vraie, le bloc indenté est réexécuté. Dès qu'elle devient fausse, la boucle s'arrête.

### Un algorithme déjà vu, écrit avec `while`

Tout ce que tu as fait avec un `for` peut s'écrire avec un `while`, **mais le `while` peut faire plus** : il sait aussi répéter quand on ne connaît pas d'avance le nombre de tours, ce qu'un `for` ne sait pas faire. Reprenons le renversement d'un mot, tel que tu l'as écrit avec un `for` :

```python
mot = "python"
acc = ""
for car in mot:
    acc = car + acc
print(acc)
```

!!! question "Le même, avec un `while`"
    Voici le même algorithme écrit avec un `while`. Écris sur ton cahier :

    - ce qu'il affiche ;
    - à quoi sert `i` ;
    - ce qui se passerait si on oubliait la ligne `i = i + 1` ;
    - ce qui se passerait si on écrivait `while i <= len(mot):`.

    **N'exécute pas ce code tant que tu n'as pas écrit tes réponses.**

    ```python
    mot = "python"
    acc = ""
    i = 0
    while i < len(mot):
        acc = mot[i] + acc
        i = i + 1
    print(acc)
    ```

    ??? success "Réponse"
        Il affiche `nohtyp`, comme la version avec `for`. `i` est la **position** du caractère qu'on traite : il va de `0` à `len(mot) - 1`, et la boucle s'arrête quand il atteint `len(mot)`. Sans `i = i + 1`, `i` resterait à `0`, la condition resterait vraie, et la boucle ne s'arrêterait jamais.

        Avec `while i <= len(mot):`, la boucle ferait un tour de trop : quand `i` vaut `6`, `mot[6]` n'existe pas, puisque les positions de `"python"` vont de `0` à `5`. Le programme s'arrête sur une `IndexError` avant d'avoir rien affiché. C'est pour cela qu'on écrit `<` : les positions valides forment l'intervalle semi-ouvert $[0 ; \text{len(mot)})$.

        Avec le `for`, Python passait tout seul d'un caractère au suivant. Avec le `while`, **c'est toi qui le fais**.

!!! question "À toi : sans les espaces, avec un `while`"
    Réécris avec un `while` le programme qui construit dans `acc` la phrase `"le petit chat"` privée de ses espaces, puis l'affiche.

    ??? tip "Indice léger"
        Même squelette que ci-dessus : `i = 0`, `while i < len(phrase)`, et `i = i + 1` à la fin du corps. Le `if` porte sur `phrase[i]`.

    ??? success "Solution"
        ```python
        phrase = "le petit chat"
        acc = ""
        i = 0
        while i < len(phrase):
            if phrase[i] != " ":
                acc = acc + phrase[i]
            i = i + 1
        print(acc)      # lepetitchat
        ```
        Attention à l'indentation : `i = i + 1` est **dans** la boucle mais **hors** du `if`. Placé sous le `if`, il ne serait jamais exécuté sur un espace, et la boucle tournerait sans fin.

### Compter avec un `while`

Un `while` n'a pas besoin d'une chaîne : sa condition peut porter sur n'importe quelle variable. Ici, un entier qu'on fait avancer :

```python
i = 0
while i < 3:
    print(i)
    i = i + 1
print("fini")
```

!!! question "Trace-le toi-même, puis vérifie"
    Tu sais déjà tracer une boucle : tu l'as fait sur le `for`. Ici, c'est à toi. **Recopie ce tableau et remplis-le** avant de regarder la réponse, puis exécute le code pour te contrôler.

    | Avant le tour | `i < 3` ? | on exécute | après |
    | :--: | :--: | :--: | :--: |
    | `i = 0` | ? | ? | ? |
    | ? | ? | ? | ? |
    | ? | ? | ? | ? |
    | ? | ? | ? | ? |

    ??? success "Réponse"
        | Avant le tour | `i < 3` ? | on exécute | après |
        | :--: | :--: | :--: | :--: |
        | `i = 0` | vrai | affiche 0, `i` devient 1 | `i = 1` |
        | `i = 1` | vrai | affiche 1, `i` devient 2 | `i = 2` |
        | `i = 2` | vrai | affiche 2, `i` devient 3 | `i = 3` |
        | `i = 3` | **faux** | on sort de la boucle | |

        Puis Python continue avec « fini ». Le point à retenir, et c'est celui qui produit les boucles infinies : **la condition est testée avant chaque tour**, jamais pendant.

## Les trois rouages : initialisation, condition, mise à jour

Là où le `for` **cache** la gestion du compteur (Python s'en occupe), le `while` t'oblige à écrire toi-même les **trois rouages** d'une boucle.

!!! fondamental "Les trois rouages d'une boucle"
    ```python
    i = 0            # 1. INITIALISATION (avant la boucle)
    while i < 3:     # 2. CONDITION de continuation
        print(i)
        i = i + 1    # 3. MISE À JOUR (dans la boucle)
    ```

    1. L'**initialisation** : la valeur de départ, **avant** la boucle.
    2. La **condition** : tant qu'elle est vraie, on refait un tour.
    3. La **mise à jour** : **dans** la boucle, ce qui fait avancer vers la sortie.

    Si l'un des trois manque ou est faux, la boucle ne fait pas ce qu'on croit.

## Le danger : la boucle infinie

Si la mise à jour ne rapproche jamais la condition du « faux », la boucle ne s'arrête **jamais**.

```python
i = 0
while i < 3:
    print(i)      # ERREUR : on a oublié i = i + 1
```

Ici `i` reste à 0, la condition reste vraie, et le programme affiche `0` indéfiniment. Il faut alors l'interrompre à la main (`Ctrl+C`).

!!! abstract "Le cycle du débogage, sur un cas où il se voit"
    Une boucle infinie est l'erreur idéale pour apprendre à déboguer : le symptôme est net, et la cause est toujours du même genre. La méthode vaut pour toutes les autres erreurs.

    1. **Observer.** Que fait le programme exactement ? (Il n'affiche rien ? Il affiche la même chose sans fin ?)
    2. **Supposer.** Formuler une hypothèse **précise** sur la cause. Pas « la boucle est fausse », mais « la variable `i` n'est jamais modifiée dans le corps, donc la condition reste vraie ».
    3. **Tester.** Concevoir une expérience qui tranche : ajouter un `print(i)` dans la boucle et regarder si la valeur change.
    4. **Conclure**, et si l'hypothèse tombe, en formuler une **seconde** au lieu de modifier au hasard.

    La règle qui compte, et c'est celle qu'on oublie : **une hypothèse avant chaque modification du code**. Modifier pour voir, c'est du tâtonnement ; on finit parfois par tomber juste, sans savoir pourquoi, donc sans rien avoir appris.

!!! danger "Avant d'écrire un `while`, pose-toi la question"
    « Qu'est-ce qui, dans le corps de la boucle, va **finir par rendre la condition fausse** ? » Si tu ne sais pas répondre, ta boucle risque de tourner à l'infini.

## Le variant : ce qui garantit l'arrêt

Une boucle `while` se termine si une quantité **évolue à coup sûr vers la sortie** : par exemple un nombre qui **diminue** strictement à chaque tour et ne peut pas descendre en dessous d'une limite. On appelle cela un **variant**. On y reviendra en algorithmique, mais l'idée est déjà là : pour être sûr qu'une boucle s'arrête, il faut exhiber ce qui la fait progresser vers sa fin.

## Une condition peut être composée

La condition d'un `while` n'est pas forcément une simple comparaison d'entiers : c'est **n'importe quel booléen**, et tu peux la construire avec `and`, `or` et `not`, comme dans un `if`.

!!! question "Que fait ce programme ?"
    Lis ce programme, puis écris sur ton cahier :

    - ce qu'il affiche ;
    - **une phrase en français** qui dit ce qu'il fait ;
    - ce qu'il afficherait avec `phrase = "bonjour"`.

    **N'exécute pas ce code tant que tu n'as pas écrit tes réponses.**

    ```python
    phrase = "bonjour le monde"
    i = 0
    while i < len(phrase) and phrase[i] != " ":
        i = i + 1
    print(i)
    ```

    ??? success "Réponse"
        Il affiche `7`. Il **cherche la position du premier espace** : `i` avance tant qu'on n'est pas au bout **et** qu'on n'est pas sur un espace.

        Avec `"bonjour"`, il n'y a pas d'espace : la boucle s'arrête quand `i` vaut `7`, c'est-à-dire `len(phrase)`, et le programme affiche `7`. Une position égale à la longueur veut dire « pas trouvé ».

!!! abstract "Avec `and`, l'ordre compte"
    Python évalue `a and b` **de gauche à droite**, et s'arrête dès qu'il connaît la réponse : si `a` est faux, `a and b` est faux, et **`b` n'est même pas calculé**.

    C'est ce qui protège le programme ci-dessus. Quand `i` vaut `len(phrase)`, `i < len(phrase)` est faux, et `phrase[i]`, qui provoquerait une `IndexError`, n'est jamais lu. Écrit dans l'autre ordre, `phrase[i] != " " and i < len(phrase)` plante sur une phrase sans espace.

    De même, `a or b` s'arrête dès que `a` est vrai.

## `for` ou `while` ?

| | `for` | `while` |
| --- | --- | --- |
| Quand | on parcourt une **séquence** / un nombre **connu** de tours | on répète tant qu'une **condition** tient, nombre de tours **inconnu** |
| Mise à jour | gérée par Python | à écrire soi-même |
| Risque | se termine toujours | **boucle infinie** possible |

En pratique : si tu peux dire « pour chaque élément » ou « n fois », utilise `for`. Si tu dois dire « tant que... », utilise `while`.

## Lire et prédire avant d'écrire

!!! question "Prédire"
    Combien de fois « Bravo » s'affiche-t-il, et que vaut `n` à la fin ? Déroule tour par tour, puis vérifie.

    ```python
    n = 10
    while n > 0:
        print("Bravo")
        n = n - 3
    print(n)
    ```

    ??? warning "Réponse"
        « Bravo » s'affiche **4 fois** (`n` vaut 10, 7, 4, 1 au moment du test), puis `n` passe à `-2` et la condition devient fausse. À la fin, `n` vaut `-2`.

!!! question "Corriger une boucle infinie"
    Ce code tourne indéfiniment. Trouve pourquoi, puis corrige-le.

    ```python
    i = 0
    while i < 5:
        print(i)
    ```

    ??? warning "Réponse"
        Il manque la **mise à jour** : `i` ne change jamais, donc `i < 5` reste vrai pour toujours. Il faut ajouter `i = i + 1` **dans** la boucle.

## Exercices

!!! question "1 - Saisie contrôlée"
    Demande un nombre **entre 1 et 10** à l'utilisateur, en redemandant tant que la valeur saisie est hors de cet intervalle.

    ??? warning "Corrigé"
        ```python
        n = int(input("Un nombre entre 1 et 10 : "))
        while n < 1 or n > 10:
            n = int(input("Non valide. Recommencez : "))
        print("Merci :", n)
        ```

!!! question "2 - Somme jusqu'à un seuil"
    En partant de 1, additionne les entiers successifs (1, 2, 3, ...) et affiche combien il en faut pour que la somme **atteigne ou dépasse 100**.

    ??? warning "Corrigé"
        ```python
        somme = 0
        i = 0
        while somme < 100:
            i = i + 1
            somme = somme + i
        print(i, "entiers, somme =", somme)
        ```

!!! question "3 - Deviner un nombre"
    L'ordinateur choisit un nombre au hasard entre 1 et 100. L'utilisateur propose des valeurs **tant qu'**il n'a pas trouvé ; à chaque essai, indique « plus grand » ou « plus petit ».

    **Variante.** Le joueur n'a plus droit qu'à `7` essais : la partie continue tant qu'il n'a pas trouvé **et** qu'il lui reste des essais. À la fin, affiche s'il a gagné ou perdu.

!!! question "4 - PGCD (algorithme d'Euclide)"
    Le plus grand commun diviseur de `a` et `b` s'obtient en remplaçant `(a, b)` par `(b, a % b)` **tant que** `b` n'est pas nul. Quand `b` vaut `0`, le PGCD est dans `a`.

    1. Sur ton cahier, déroule l'algorithme pour `a = 48` et `b = 36` : écris les valeurs de `a` et `b` avant chaque tour.
    2. Écris la fonction `pgcd`, puis lance `test_pgcd` : tous les tests doivent passer.

    ```python
    def pgcd(a: int, b: int) -> int:
        """Renvoie le PGCD de a et b, par l'algorithme d'Euclide.
        Précondition : a et b sont positifs ou nuls, et pas tous les deux nuls."""
        ...

    def test_pgcd():
        assert pgcd(48, 36) == 12
        assert pgcd(36, 48) == 12
        assert pgcd(17, 5) == 1
        assert pgcd(7, 0) == 7
        assert pgcd(10, 10) == 10
    ```

    ??? tip "Indice léger"
        La condition d'arrêt est « `b` est nul ». Que faut-il écrire après `while` ? Et que renvoyer une fois sorti de la boucle ?

    ??? tip "Indice précis"
        `while b != 0:`. Dans la boucle, il faut que `a` prenne l'ancienne valeur de `b`, et `b` l'ancienne valeur de `a % b`. Attention : si tu écris `a = b` en premier, l'ancienne valeur de `a` est perdue. Range d'abord `a % b` dans une variable `r`.

    ??? warning "Corrigé"
        1. `(48, 36)`, puis `(36, 12)`, puis `(12, 0)` : `b` est nul, le PGCD est `12`.
        2. ```python
           def pgcd(a: int, b: int) -> int:
               """Renvoie le PGCD de a et b, par l'algorithme d'Euclide.
               Précondition : a et b sont positifs ou nuls, et pas tous les deux nuls."""
               while b != 0:
                   r = a % b
                   a = b
                   b = r
               return a
           ```

        Le test `pgcd(36, 48)` est intéressant : au premier tour, `36 % 48` vaut `36`, et l'algorithme **échange** simplement `a` et `b`. Il n'y a pas besoin de savoir lequel est le plus grand.

!!! question "5 - Oui ou non"
    Demande à l'utilisateur s'il veut continuer, et redemande **tant que** sa réponse n'est ni `"oui"` ni `"non"`. Une fois sorti de la boucle, affiche `Terminé`.

    ??? tip "Indice léger"
        Écris d'abord, en français, quand la réponse est **acceptable**. La condition du `while` est le contraire : `not` de cette phrase.

    ??? success "Corrigé"
        ```python
        rep = input("Continuer ? (oui/non) ")
        while not (rep == "oui" or rep == "non"):
            rep = input("Réponds par oui ou par non : ")
        print("Terminé")
        ```
        On peut aussi écrire `while rep != "oui" and rep != "non":`. Les deux conditions sont équivalentes : « ni l'un ni l'autre », c'est « pas l'un **et** pas l'autre ».

!!! question "6 - Position du premier chiffre"
    Écris `premier_chiffre(txt)`, qui renvoie la position du premier chiffre de `txt`, ou `len(txt)` s'il n'y en a pas. Rappel : `car.isdigit()` dit si `car` est un chiffre.

    ```python
    def premier_chiffre(txt: str) -> int:
        """Renvoie la position du premier chiffre de txt, ou len(txt) s'il n'y en a pas."""
        ...

    def test_premier_chiffre():
        assert premier_chiffre("abc4d5") == 3
        ...
    ```

    ??? tip "Indice léger"
        C'est la recherche du premier espace, avec une autre condition sur le caractère. Laquelle, avec `not` ?

    ??? success "Corrigé"
        ```python
        def premier_chiffre(txt: str) -> int:
            """Renvoie la position du premier chiffre de txt, ou len(txt) s'il n'y en a pas."""
            i = 0
            while i < len(txt) and not txt[i].isdigit():
                i = i + 1
            return i

        def test_premier_chiffre():
            assert premier_chiffre("abc4d5") == 3
            assert premier_chiffre("7 nains") == 0
            assert premier_chiffre("aucun") == 5
            assert premier_chiffre("") == 0
        ```
        Le test `"aucun"` vérifie le cas « pas trouvé », et le test `""` qu'on ne lit jamais `txt[0]` sur une chaîne vide : c'est l'ordre des deux conditions du `and` qui le garantit.

!!! question "7 - Tant que ce n'est pas fini"
    Un coffre s'ouvre avec le code `"1234"`. L'utilisateur a droit à **3 essais**. La partie est **finie** quand il a trouvé le code, **ou** quand il a utilisé ses 3 essais.

    1. On range le dernier code tapé dans `code`, et le nombre d'essais déjà faits dans `essais`. Écris en Python la condition « c'est fini ».
    2. La boucle doit tourner **tant que ce n'est pas fini**. Écris la ligne `while` avec `not` et ta condition de la question 1.
    3. Avec les [lois de De Morgan](conditionnelles.md), réécris cette condition **sans** `not`.
    4. Complète le programme : à la fin, affiche « Coffre ouvert » ou « Coffre bloqué ».

    ??? tip "Indice léger"
        Pour la question 3 : la négation d'un `or` est un `and` de négations. Que devient `not (code == "1234")` ? Et `not (essais == 3)`, sachant que `essais` ne dépasse jamais `3` ?

    ??? success "Corrigé"
        1. `code == "1234" or essais == 3`
        2. `while not (code == "1234" or essais == 3):`
        3. `while code != "1234" and essais < 3:`. Comme `essais` ne dépasse jamais `3`, « différent de 3 » revient à « plus petit que 3 ».
        4. ```python
           code = input("Code : ")
           essais = 1
           while code != "1234" and essais < 3:
               code = input("Faux. Code : ")
               essais = essais + 1
           if code == "1234":
               print("Coffre ouvert")
           else:
               print("Coffre bloqué")
           ```

        Écrire d'abord **quand c'est fini**, puis le nier, est souvent plus simple que de chercher directement la condition pour continuer.

## Vérification individuelle : les boucles

!!! warning "À faire seul, cours fermé (15 minutes)"
    Sans aide et sans IA. Ce n'est pas noté.

    **1. Lire.** Que vaut `res` à la fin, et combien de tours la boucle fait-elle ?
    ```python
    res = ""
    i = 0
    while i < 6:
        if i % 2 == 0:
            res = res + str(i)
        i = i + 2
    print(res)
    ```

    **2. Compléter.** Ce code doit compter les voyelles de `mot`. Trois lignes sont mal placées ou manquantes : corrige-le.
    ```python
    mot = "anticonstitutionnellement"
    for c in mot:
        compteur = 0
        if c in "aeiouy":
            compteur = compteur + 1
        print(compteur)
    ```

    **3. Écrire.** Depuis zéro, avec un `for` : `nb_chiffres(txt)`, qui renvoie le nombre de chiffres présents dans une chaîne. Rappel : `c.isdigit()` dit si le caractère `c` est un chiffre.

    ??? success "Réponses"
        **1.** `res` vaut `"024"` et la boucle fait **trois** tours (`i` vaut 0, 2, 4). Le `if` est toujours vrai ici, puisque `i` avance de 2 en 2 depuis 0 : c'est un test inutile, et le repérer fait partie de la lecture.

        **2.** L'initialisation doit sortir de la boucle, l'affichage aussi :
        ```python
        mot = "anticonstitutionnellement"
        compteur = 0                    # AVANT
        for c in mot:
            if c in "aeiouy":
                compteur = compteur + 1 # DANS
        print(compteur)                 # APRÈS
        ```

        **3.**
        ```python
        def nb_chiffres(txt: str) -> int:
            """Renvoie le nombre de chiffres présents dans txt."""
            combien = 0
            for c in txt:
                if c.isdigit():
                    combien = combien + 1
            return combien

        def test_nb_chiffres():
            assert nb_chiffres("a1b22c") == 3
            assert nb_chiffres("") == 0
        ```
