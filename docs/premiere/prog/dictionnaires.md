---
python-console: true
---


# Les dictionnaires

!!! note "Rappel d'ouverture (5 minutes, cours fermé)"
    Réponds **sans rouvrir** les pages précédentes, en écrivant tes réponses.

    1. On écrit `a = [1, 2, 3]`, puis `b = a`, puis `b.append(4)`. Que vaut `a` ensuite ?
    2. Écris la boucle qui construit la liste des carrés des entiers de `0` à `9`. Quels sont les trois temps de l'accumulation ?
    3. Que vaut `len([[1, 2], [3, 4], [5, 6]])` ?

    ??? success "Corrigé"
        1. `a` vaut `[1, 2, 3, 4]`. `b = a` ne copie rien : ce sont **deux noms pour une seule liste**, et modifier l'une modifie l'autre.
        2. `x` vaut `3` et `y` vaut `5` : c'est la **déstructuration**. C'est aussi ce qui permet à une fonction de « renvoyer deux valeurs », en renvoyant en réalité un tuple.
        3. `3`. C'est une liste de **trois** éléments, chacun étant lui-même une liste de deux éléments.

## Qu'est-ce qu'un dictionnaire ?

On peut voir les séquences comme permettant de stocker des paires indice-valeur.

Dans la liste `L = ["ok", 3, 7.5]`, on accède aux éléments par leur indice. Ainsi, `L[0]` vaut `"ok"`.
À l'indice 0 est associé la valeur "ok".

Un dictionnaire est une structure de données Python qui permet de stocker des paires clé-valeur. Ici, la clé n'est pas forcément un entier.

Son type Python est `dict`.

Tout comme les autres types de données que nous avons vus, son utilisation est très fréquente dans les langages de programmation. L'appellation 'dictionnaire' est cependant spécifique au langage Python. L'accès à des valeurs au moyen de clés existe dans de nombreux langages sous des noms différents. On parle aussi de tableau associatif ou de table de hachage. Ce type est absent des langages de programmation les plus anciens comme C ou Fortran.

## Comment créer un dictionnaire ?

Pour créer un dictionnaire, on utilise des accolades `{}` et on sépare chaque paire clé-valeur par deux-points `:`.

```python
mon_dictionnaire = {"nom": "pomme", "couleur": "rouge", "forme": "ronde"}
print(mon_dictionnaire)
```

ici:

- Les clés du dictionnaire sont les str `"nom"`, `"couleur"`, et `"forme"`
- Les valeurs du dictionnaire sont les str `"pomme"`, `"rouge"`, et `"ronde"`.

**La clé `"nom"` fait référence à la valeur `"pomme"`**

Un dictionnaire vide est créé ainsi :
```python
dico_vide = {}
print(dico_vide)
```

## Accéder aux éléments d'un dictionnaire

On peut accéder à la valeur associée à une clé en utilisant la syntaxe `nom_du_dictionnaire[clé]`.
```python
print(mon_dictionnaire["nom"])
```

## Modifier un dictionnaire

On peut modifier une valeur associée à une clé dans un dictionnaire. Un dictionnaire, comme une liste, est mutable.
```python
mon_dictionnaire["couleur"] = "verte"
```

## Ajouter des éléments à un dictionnaire

On peut ajouter de nouvelles paires clé-valeur à un dictionnaire de la même façon.
```python
mon_dictionnaire["pays"] = "France"
```

## Supprimer des éléments d'un dictionnaire

On peut supprimer une paire clé-valeur d'un dictionnaire en utilisant la méthode `pop`.
```python
mon_dictionnaire.pop("forme")
```

## Méthodes incontournables pour les dictionnaires

Il existe plusieurs méthodes utiles pour travailler avec les dictionnaires (en particulier les parcourir):

- `keys()` : Retourne l'itérable des clés du dictionnaire.
- `values()` : Retourne l'itérable des valeurs du dictionnaire.
- `items()` : Retourne l'itérable des tuples (clé, valeur) du dictionnaire.

Ces méthodes servent généralement dans des boucles for afin de parcourir un dictionnaire.
```python
print("Clés du dictionnaire :", mon_dictionnaire.keys())
print("Valeurs du dictionnaire :", mon_dictionnaire.values())
print("Paires clé-valeur du dictionnaire :", mon_dictionnaire.items())
```

## Parcourir un dictionnaire

Attention, quand on parcourt un dictionnaire, il ne faut jamais s'attendre à ce que l'ordre d'insertion soit conservé. C'est rare selon les langages. c'est le cas en python, mais on ne peut pas apprendre à programmer uniquement en python.

### Par clés
En conséquence, on peut parcourir les clés, les valeurs ou les paires clé-valeur d'un dictionnaire à l'aide de boucles.
```python
for cle in mon_dictionnaire.keys():
    print(cle, "->", mon_dictionnaire[cle])
```

Note: Dans une boucle `for`, keys est l'itérable par défaut du dictionnaire. Ainsi les 2 lignes suivantes sont équivalentes:

- `for cle in mon_dictionnaire.keys():`
- `for cle in mon_dictionnaire:`

### Par couple clés/valeurs
On peut aussi parcourir le dictionnaire en récupérant à la fois la clé et sa valeur associée :
```python
for cle, valeur in mon_dictionnaire.items():
    print(cle, "->", valeur)
```


### Par valeurs
On peut aussi parcourir le dictionnaire en récupérant seulement les valeurs :
```python
for valeur in mon_dictionnaire.values():
    print(valeur)
```

## Vérifier si une clé est dans un dictionnaire

On peut utiliser l'opérateur booléen `in` pour savoir si une clé est dans un dictionnaire.
```python
print("pays" in mon_dictionnaire)
print("prix" in mon_dictionnaire)
```

Note: C'est un raccourci pour dire `"pays" in mon_dictionnaire.keys()`

!!! danger "Piège : accéder à une clé qui n'existe pas"
    C'est **l'erreur numéro un** sur les dictionnaires, et c'est une erreur d'**exécution** : le programme s'arrête net.

    ```python
    stock = {"pain": 2}
    print(stock["lait"])      # KeyError: 'lait'
    ```

    Une liste se comporte pareil hors de ses indices (`IndexError`), mais avec un dictionnaire, la faute est plus sournoise : les clés sont souvent construites à partir de données, et il suffit d'une faute de frappe ou d'un cas non prévu.

    Trois façons de s'en protéger, dans l'ordre de préférence :

    ```python
    if "lait" in stock:            # 1. tester avant
        print(stock["lait"])

    print(stock.get("lait"))       # 2. get renvoie None au lieu de planter
    print(stock.get("lait", 0))    # 3. get avec une valeur par défaut : 0
    ```

    La troisième forme est la plus utile, et elle sert directement à **compter** : `compte[c] = compte.get(c, 0) + 1` ajoute 1 à un compteur qui n'existait peut-être pas encore.

!!! danger "Piège : `d[cle] = valeur` crée la clé si elle n'existe pas"
    En **lecture**, une clé absente lève une erreur. En **écriture**, elle est silencieusement **créée**. La même écriture ne se comporte donc pas de la même façon des deux côtés du `=` :

    ```python
    stock = {"pain": 2}
    stock["lait"] = 1      # crée la clé "lait", aucun message
    stock["pian"] = 5      # faute de frappe : crée une clé de plus, toujours aucun message
    ```

    C'est une **erreur logique** : rien ne casse, le résultat est simplement faux. Elle est donc à chercher avec la méthode du cycle observer-supposer-tester, pas avec un message d'erreur.

## Lire et prédire avant d'écrire

!!! question "Prédire"
    Qu'affiche ce code ? Déroule le parcours, puis vérifie.

    ```python
    stock = {"pomme": 3, "poire": 5, "kiwi": 2}
    total = 0
    for fruit in stock:
        total = total + stock[fruit]
    print(total)
    ```

    ??? warning "Réponse"
        `10`. On parcourt les **clés** (`pomme`, `poire`, `kiwi`) et on accumule les **valeurs** associées : 3 + 5 + 2.

## Exercices

!!! abstract "Comment ces exercices sont rangés"
    Ils vont du plus mécanique au plus difficile, et cet ordre correspond à ce qui coûte réellement cher en programmation :

    1. **Automatismes** : créer, lire, modifier, supprimer, parcourir. Il n'y a rien à comprendre, seulement à savoir faire sans réfléchir, pour libérer ta tête pour la suite.
    2. **Composition** : un parcours plus un test, ou un parcours qui construit autre chose.
    3. **Fusion** : deux traitements menés dans une même boucle. C'est le point de rupture, et c'est là que se joue la note.

    Si tu bloques au niveau 2 ou 3, ce n'est presque jamais le dictionnaire le problème : c'est l'accumulation. Reviens à la [boucle `for`](boucle-for.md).

### Niveau 1 : automatismes

!!! question "Série d'automatismes (à refaire jusqu'à ne plus hésiter)"
    À enchaîner sans interruption. Chaque question tient en une ligne.

    ```python
    employe = {"nom": "Diallo", "age": 34, "poste": "technicienne"}
    fruit = {"nom": "pomme", "couleur": "verte", "quantite": 12}
    ```

    1. Crée un dictionnaire **vide** appelé `notes`.
    2. Affiche l'âge de l'employée.
    3. Change son poste en `"ingénieure"`.
    4. Supprime la clé `"age"`.
    5. Ajoute la clé `"service"` avec la valeur `"maintenance"`.
    6. Affiche toutes les **clés** de `fruit`, une par ligne.
    7. Affiche toutes les **valeurs** de `fruit`, une par ligne.
    8. Affiche les **couples** clé-valeur de `fruit`, une par ligne, sous la forme `nom -> pomme`.
    9. Ajoute trois matières et leurs notes dans `notes`.
    10. Teste si `"NSI"` est une clé de `notes`, sans provoquer d'erreur.
    11. Affiche la note de `"Anglais"`, en renvoyant `0` si la matière n'y est pas.

    ??? success "Corrigé"
        ```python
        notes = {}                                  # 1
        print(employe["age"])                       # 2
        employe["poste"] = "ingénieure"             # 3
        employe.pop("age")                          # 4
        employe["service"] = "maintenance"          # 5

        for cle in fruit:                           # 6
            print(cle)
        for valeur in fruit.values():               # 7
            print(valeur)
        for cle, valeur in fruit.items():           # 8
            print(cle, "->", valeur)

        notes["Maths"] = 15                         # 9
        notes["NSI"] = 18
        notes["Physique"] = 12

        print("NSI" in notes)                       # 10
        print(notes.get("Anglais", 0))              # 11
        ```
        Question 11 : écrire `notes["Anglais"]` lèverait une `KeyError`. C'est exactement le piège nommé plus haut.

### Niveau 2 : composition

!!! question "Moyenne des notes"
    Écris `moyenne(dico)` qui renvoie la moyenne des notes d'un dictionnaire matière -> note.

    ```python
    def moyenne(dico: dict[str, float]) -> float:
        """Renvoie la moyenne des valeurs du dictionnaire, qui n'est pas vide.

        >>> moyenne({"Maths": 15, "NSI": 18, "Physique": 12})
        15.0
        """
        assert len(dico) > 0, "le dictionnaire ne doit pas être vide"
        ...
    ```

    ??? tip "Indice léger"
        Une moyenne, c'est une somme divisée par un compte. Sur quoi faut-il parcourir : les clés, les valeurs, ou les couples ?

    ??? tip "Indice plus précis"
        Un seul accumulateur suffit : `len(dico)` te donne déjà le compte. Parcours donc `dico.values()` et accumule la somme.

    ??? success "Corrigé"
        ```python
        def moyenne(dico: dict[str, float]) -> float:
            """Renvoie la moyenne des valeurs du dictionnaire, qui n'est pas vide."""
            assert len(dico) > 0, "le dictionnaire ne doit pas être vide"
            total = 0
            for note in dico.values():
                total = total + note
            return total / len(dico)
        ```

!!! question "La meilleure matière"
    Écris `meilleure(dico)` qui renvoie la **matière** ayant la note la plus élevée.

    ??? tip "Indice léger"
        C'est l'algorithme du maximum, avec une difficulté en plus : ce qu'on **compare** (la note) n'est pas ce qu'on **renvoie** (la matière). L'accumulateur doit donc retenir les deux, ou bien retenir la clé et aller relire sa valeur.

    ??? tip "Indice plus précis"
        Parcours `dico.items()`. Garde une variable `meilleure_cle`, initialisée à... rien de valide au départ : on peut partir de la première clé rencontrée, ou traiter le premier tour à part.

    ??? success "Corrigé"
        ```python
        def meilleure(dico: dict[str, float]) -> str:
            """Renvoie la clé associée à la plus grande valeur."""
            assert len(dico) > 0, "le dictionnaire ne doit pas être vide"
            meilleure_cle = None
            meilleure_note = None
            for matiere, note in dico.items():
                if meilleure_note is None or note > meilleure_note:
                    meilleure_cle = matiere
                    meilleure_note = note
            return meilleure_cle
        ```
        Piège fréquent : initialiser `meilleure_note = 0`. Cela marche sur des notes, et casse dès qu'une valeur peut être négative. Une initialisation ne doit jamais reposer sur un hasard des données.

!!! question "Fiche d'une ville"
    | clé | valeur |
    | --- | ------ |
    | nom | Montreal |
    | pays | Canada |
    | province | Quebec |
    | pop | 1825208 |
    | superficie | 315 |

    1. Crée le dictionnaire `ville` contenant ces données.
    2. La superficie est fausse : corrige-la en `365`.
    3. Ajoute la densité, qui est de `4992` habitants au kilomètre carré.
    4. Remplace la clé `"pop"` par `"population"`, sans perdre sa valeur.

    ??? tip "Indice (question 4)"
        On ne renomme pas une clé en Python. Il faut en **créer une nouvelle** avec l'ancienne valeur, puis **supprimer** l'ancienne. Dans quel ordre ? Essaie l'ordre inverse et regarde ce qui se passe.

    ??? success "Corrigé"
        ```python
        ville = {"nom": "Montreal", "pays": "Canada", "province": "Quebec",
                 "pop": 1825208, "superficie": 315}
        ville["superficie"] = 365
        ville["densite"] = 4992
        ville["population"] = ville.pop("pop")   # récupère la valeur ET supprime la clé
        ```
        `pop` **renvoie** la valeur qu'il supprime : les deux opérations tiennent donc en une ligne. Supprimer d'abord aurait perdu la valeur.

!!! question "Répertoire téléphonique"
    ```python
    repertoire = {"Ewen": "0612345678",
                  "Marie": "0687654321",
                  "Hanae": "0765432198",
                  "Piotr": "0777666555"}
    ```

    1. Affiche le téléphone de Piotr.
    2. Dis si `"Fanny"` est enregistrée, **sans provoquer d'erreur**.
    3. Le numéro d'Ewen se termine par un `9` et non un `8` : corrige-le.
    4. Ajoute `"Raoul"`, dont le numéro est `"0789898989"`.
    5. Supprime `"Hanae"`.
    6. Construis l'**annuaire inversé** : un dictionnaire où les numéros deviennent les clés et les noms les valeurs.

    ??? tip "Indice (question 6)"
        C'est une accumulation : l'accumulateur est un dictionnaire **vide**, et à chaque tour on ajoute un couple, dans l'autre sens. Sur quoi parcourt-on pour disposer des deux à la fois ?

    ??? success "Corrigé"
        ```python
        print(repertoire["Piotr"])                  # 1
        print("Fanny" in repertoire)                # 2
        repertoire["Ewen"] = "0612345679"           # 3
        repertoire["Raoul"] = "0789898989"          # 4
        repertoire.pop("Hanae")                     # 5

        inverse = {}                                # 6
        for nom, numero in repertoire.items():
            inverse[numero] = nom
        ```
        Cette inversion n'est fiable que si les numéros sont **tous différents**. Deux personnes partageant un numéro, et l'une écrase l'autre en silence : erreur logique typique.

!!! question "Deux listes en un dictionnaire"
    Construis un dictionnaire à partir de ces deux listes, **avec une seule boucle `for`**.

    ```python
    cles = [10, 20, 30]
    valeurs = ["Ten", "Twenty", "Thirty"]
    # résultat attendu : {10: "Ten", 20: "Twenty", 30: "Thirty"}
    ```

    ??? tip "Indice léger"
        Tu dois avancer dans **deux** listes en même temps. Que peux-tu parcourir qui te donne accès aux deux ?

    ??? tip "Indice plus précis"
        Parcours les **indices**, avec `for i in range(len(cles))`. À chaque tour, `cles[i]` et `valeurs[i]` se correspondent.

    ??? success "Corrigé"
        ```python
        resultat = {}
        for i in range(len(cles)):
            resultat[cles[i]] = valeurs[i]
        ```
        Remarque : n'importe quel type **immuable** peut servir de clé. Un entier convient, une liste non.

### Niveau 3 : fusion

!!! question "Une liste de dictionnaires"
    ```python
    employes = [
        {"nom": "John", "salaire": 7500},
        {"nom": "Emma", "salaire": 8000},
        {"nom": "Brad", "salaire": 6500},
    ]
    ```

    1. Change le salaire de Brad en `8500`.
    2. Calcule le **cumul** des salaires.
    3. Construis la liste des noms.
    4. **Fusion** : en **un seul parcours**, calcule le cumul des salaires **et** construis la liste des noms de ceux qui gagnent plus de 7000.

    ??? tip "Indice (question 4)"
        Deux accumulateurs de types différents, `total = 0` et `bien_payes = []`, tous deux initialisés **avant** la boucle. L'un se met à jour à chaque tour, l'autre seulement sous un `if`.

    ??? success "Corrigé"
        ```python
        employes[2]["salaire"] = 8500              # 1 : indice de liste, puis clé

        total = 0                                  # 2 et 3 séparément
        for e in employes:
            total = total + e["salaire"]
        noms = []
        for e in employes:
            noms.append(e["nom"])

        total = 0                                  # 4 : les deux d'un coup
        bien_payes = []
        for e in employes:
            total = total + e["salaire"]
            if e["salaire"] > 7000:
                bien_payes.append(e["nom"])
        ```
        La question 1 combine les deux notations : `employes[2]` sort un dictionnaire de la liste, puis `["salaire"]` en sort une valeur. C'est de la **composition** de deux accès, et c'est ce qui fait toute la difficulté du traitement de données en tables.

!!! question "Compter les caractères, l'algorithme à connaître"
    Cet algorithme est à savoir refaire de mémoire, au même titre que le minimum et le maximum. Il servira toute l'année.

    ```python
    def compteur(chaine: str) -> dict[str, int]:
        """Renvoie le nombre d'apparitions de chaque caractère de chaine.

        >>> compteur("bonbon")
        {'b': 2, 'o': 2, 'n': 2}
        >>> compteur("")
        {}
        """
        ...
    ```

    Cherche d'abord seul, sans ouvrir les indices.

    ??? tip "Indice léger"
        C'est encore une accumulation. Le seul point nouveau est le **type de l'accumulateur** : ni `0`, ni `""`, ni `[]`, mais quoi ?

    ??? tip "Indice plus précis"
        `compte = {}` avant la boucle. À chaque caractère, deux cas : la clé existe déjà (on ajoute 1 à sa valeur) ou non (on la crée à 1). Le `get` avec valeur par défaut permet d'écrire les deux cas en une seule ligne.

    ??? success "Corrigé"
        ```python
        def compteur(chaine: str) -> dict[str, int]:
            """Renvoie le nombre d'apparitions de chaque caractère de chaine."""
            compte = {}
            for c in chaine:
                compte[c] = compte.get(c, 0) + 1
            return compte
        ```
        Version explicite, si le `get` te gêne encore :
        ```python
        for c in chaine:
            if c in compte:
                compte[c] = compte[c] + 1
            else:
                compte[c] = 1
        ```
        Les deux sont justes. La première est celle qu'on écrit une fois qu'on a compris que « lire une clé absente avec une valeur par défaut » et « la créer » sont le même geste.
