# La boucle non bornée : `while`

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

!!! abstract "Ce que fait la machine, tour par tour"
    | Avant le tour | `i <= 3` ? | on exécute | après |
    | :--: | :--: | :--: | :--: |
    | `i = 1` | vrai | affiche 1, `i` devient 2 | `i = 2` |
    | `i = 2` | vrai | affiche 2, `i` devient 3 | `i = 3` |
    | `i = 3` | vrai | affiche 3, `i` devient 4 | `i = 4` |
    | `i = 4` | **faux** | on sort de la boucle | |

    Puis Python continue avec « fini ». **La condition est testée avant chaque tour.**

## Les trois rouages : initialisation, condition, mise à jour

Là où le `for` **cache** la gestion du compteur (Python s'en occupe), le `while` vous oblige à écrire vous-même les **trois rouages** d'une boucle :

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

!!! danger "Avant d'écrire un `while`, posez-vous la question"
    « Qu'est-ce qui, dans le corps de la boucle, va **finir par rendre la condition fausse** ? » Si vous ne savez pas répondre, votre boucle risque de tourner à l'infini.

## Le variant : ce qui garantit l'arrêt

Une boucle `while` se termine si une quantité **évolue à coup sûr vers la sortie** : par exemple un nombre qui **diminue** strictement à chaque tour et ne peut pas descendre en dessous d'une limite. On appelle cela un **variant**. On y reviendra en algorithmique, mais l'idée est déjà là : pour être sûr qu'une boucle s'arrête, il faut exhiber ce qui la fait progresser vers sa fin.

## `for` ou `while` ?

| | `for` | `while` |
| --- | --- | --- |
| Quand | on parcourt une **séquence** / un nombre **connu** de tours | on répète tant qu'une **condition** tient, nombre de tours **inconnu** |
| Mise à jour | gérée par Python | à écrire soi-même |
| Risque | se termine toujours | **boucle infinie** possible |

En pratique : si vous pouvez dire « pour chaque élément » ou « n fois », utilisez `for`. Si vous devez dire « tant que... », utilisez `while`.

## Lire et prédire avant d'écrire

!!! question "Prédire"
    Combien de fois « Bravo » s'affiche-t-il, et que vaut `n` à la fin ? Déroulez tour par tour, puis vérifiez.

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
    Ce code tourne indéfiniment. Trouvez pourquoi, puis corrigez-le.

    ```python
    i = 1
    while i <= 5:
        print(i)
    ```

    ??? warning "Réponse"
        Il manque la **mise à jour** : `i` ne change jamais, donc `i <= 5` reste vrai pour toujours. Il faut ajouter `i = i + 1` **dans** la boucle.

## Exercices

!!! question "1 - Saisie contrôlée"
    Demandez un nombre **entre 1 et 10** à l'utilisateur, en redemandant tant que la valeur saisie est hors de cet intervalle.

    ??? warning "Corrigé"
        ```python
        n = int(input("Un nombre entre 1 et 10 : "))
        while n < 1 or n > 10:
            n = int(input("Non valide. Recommencez : "))
        print("Merci :", n)
        ```

!!! question "2 - Somme jusqu'à un seuil"
    En partant de 1, additionnez les entiers successifs (1, 2, 3, ...) et affichez combien il en faut pour que la somme **dépasse 100**.

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
    L'ordinateur choisit un nombre au hasard entre 1 et 100. L'utilisateur propose des valeurs **tant qu'**il n'a pas trouvé ; à chaque essai, indiquez « plus grand » ou « plus petit ».

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
