# La boucle non bornée : `while`

!!! note "Rappel d'ouverture (5 minutes, cours fermé)"
    Réponds **sans rouvrir** les pages précédentes, en écrivant tes réponses.

    1. Combien de tours fait `for i in range(3, 8)`, et quelle est la **dernière** valeur prise par `i` ?
    2. Avec `note = 15`, pourquoi cette suite de tests affiche-t-elle « passable » et non « bien » ?
       ```python
       if note >= 10: print("passable")
       elif note >= 14: print("bien")
       ```
    3. Que faut-il mettre en place pour **compter et sommer en un seul parcours** ?

    ??? success "Corrigé"
        1. Cinq tours, et la dernière valeur de `i` est `7`. L'intervalle est **semi-ouvert** : `3` est inclus, `8` est exclu.
        2. Parce que Python **s'arrête au premier test vrai**. `15 >= 10` est vrai, donc le premier bloc s'exécute et tous les `elif` suivants sont ignorés. Il faut tester **du cas le plus exigeant au moins exigeant**.
        3. **Deux accumulateurs**, tous deux initialisés avant la boucle et tous deux mis à jour dans le même tour (par exemple `total` et `combien`). C'est le point qui coûte le plus cher : ce n'est pas une boucle plus difficile, c'est **deux traitements menés ensemble**.

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

```python
i = 1
while i <= 3:
    print(i)
    i = i + 1
print("fini")
```

!!! question "Trace-le toi-même, puis vérifie"
    Tu sais déjà tracer une boucle : tu l'as fait sur le `for`. Ici, c'est à toi. **Recopie ce tableau et remplis-le** avant de regarder la réponse, puis exécute le code pour te contrôler.

    | Avant le tour | `i <= 3` ? | on exécute | après |
    | :--: | :--: | :--: | :--: |
    | `i = 1` | ? | ? | ? |
    | ? | ? | ? | ? |
    | ? | ? | ? | ? |
    | ? | ? | ? | ? |

    ??? success "Réponse"
        | Avant le tour | `i <= 3` ? | on exécute | après |
        | :--: | :--: | :--: | :--: |
        | `i = 1` | vrai | affiche 1, `i` devient 2 | `i = 2` |
        | `i = 2` | vrai | affiche 2, `i` devient 3 | `i = 3` |
        | `i = 3` | vrai | affiche 3, `i` devient 4 | `i = 4` |
        | `i = 4` | **faux** | on sort de la boucle | |

        Puis Python continue avec « fini ». Le point à retenir, et c'est celui qui produit les boucles infinies : **la condition est testée avant chaque tour**, jamais pendant.

## Les trois rouages : initialisation, condition, mise à jour

Là où le `for` **cache** la gestion du compteur (Python s'en occupe), le `while` t'oblige à écrire toi-même les **trois rouages** d'une boucle :

```python
i = 1            # 1. INITIALISATION (avant la boucle)
while i <= 3:    # 2. CONDITION de continuation
    print(i)
    i = i + 1    # 3. MISE À JOUR (dans la boucle)
```

C'est plus de travail, mais c'est aussi ce qui rend le mécanisme **visible**. Si l'un des trois rouages manque ou est faux, la boucle ne fait pas ce qu'on croit.

## Le danger : la boucle infinie

Si la mise à jour ne rapproche jamais la condition du « faux », la boucle ne s'arrête **jamais**.

```python
i = 1
while i <= 3:
    print(i)      # ERREUR : on a oublié i = i + 1
```

Ici `i` reste à 1, la condition reste vraie, et le programme affiche `1` indéfiniment. Il faut alors l'interrompre à la main (`Ctrl+C`).

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
    i = 1
    while i <= 5:
        print(i)
    ```

    ??? warning "Réponse"
        Il manque la **mise à jour** : `i` ne change jamais, donc `i <= 5` reste vrai pour toujours. Il faut ajouter `i = i + 1` **dans** la boucle.

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
    En partant de 1, additionne les entiers successifs (1, 2, 3, ...) et affiche combien il en faut pour que la somme **dépasse 100**.

    ??? warning "Corrigé"
        ```python
        somme = 0
        i = 0
        while somme <= 100:
            i = i + 1
            somme = somme + i
        print(i, "entiers, somme =", somme)
        ```

!!! question "3 - Deviner un nombre"
    L'ordinateur choisit un nombre au hasard entre 1 et 100. L'utilisateur propose des valeurs **tant qu'**il n'a pas trouvé ; à chaque essai, indique « plus grand » ou « plus petit ».

!!! question "4 - PGCD (algorithme d'Euclide)"
    Le plus grand commun diviseur de `a` et `b` s'obtient en remplaçant `(a, b)` par `(b, a % b)` **tant que** `b` n'est pas nul.

    ??? tip "Indice léger"
        La condition d'arrêt est « `b` est nul ». Que faut-il écrire après `while` ? Et que renvoyer une fois sorti de la boucle ?

    ??? tip "Indice précis"
        `while b != 0:` puis, dans la boucle, la déstructuration `a, b = b, a % b`. Quand `b` atteint 0, c'est `a` qui contient le PGCD.

    ??? warning "Corrigé"
        ```python
        def pgcd(a: int, b: int) -> int:
            """Renvoie le PGCD de a et b (algorithme d'Euclide).

            >>> pgcd(48, 36)
            12
            >>> pgcd(17, 5)
            1
            """
            while b != 0:
                a, b = b, a % b
            return a
        ```

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

    **3. Écrire.** Depuis zéro, avec un `for` : `compte_et_somme(txt)` qui renvoie le couple (nombre de chiffres, somme de ces chiffres) présents dans une chaîne, **en un seul parcours**.

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
        def compte_et_somme(txt: str) -> tuple[int, int]:
            """Renvoie le nombre de chiffres de txt et leur somme."""
            combien = 0
            total = 0
            for c in txt:
                if c.isdigit():
                    combien = combien + 1
                    total = total + int(c)
            return (combien, total)
        ```
        C'est une **fusion** : deux accumulateurs, une seule boucle. Si tu as écrit deux boucles, le résultat est juste mais l'exercice est raté.

!!! abstract "Comment lire ton résultat"
    Les trois questions ne mesurent pas la même chose, et **rater la troisième en réussissant la première n'est pas un signe de faiblesse**. Lire du code, le compléter et l'écrire de zéro sont trois compétences distinctes, qui se travaillent séparément.

    - Tu réussis les trois : passe à la suite.
    - Tu réussis 1 et 2 mais pas 3 : tu comprends le mécanisme, il te manque la **mise en route**. Refais des exercices d'écriture courts, pas de la relecture.
    - Tu rates la 1 : reprends le traçage avant tout le reste. Écrire du code qu'on ne sait pas lire ne mène nulle part.
