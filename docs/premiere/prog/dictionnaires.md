---
python-console: true
---


# Les dictionnaires

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
On peut aussi parcourir le dictionnaire en récupérant à la fois la clé et sa valeur associée :
```python
for cle, valeur in mon_dictionnaire.items():
    print(cle, "->", valeur)
```

## Vérifier si une clé est dans un dictionnaire

On peut utiliser l'opérateur booléen `in` pour savoir si une clé est dans un dictionnaire.
```python
print("pays" in mon_dictionnaire)
print("prix" in mon_dictionnaire)
```

Note: C'est un raccourci pour dire `"pays" in mon_dictionnaire.keys()`

## Exercices

!!! hint "Entraînement"
    Les 20 premières questions servent à s'entraîner à utiliser les fonctionnalités de base d'un dictionnaire.

    Une fois les exercices réussis, vous pouvez les effacer et les refaire plus tard afin de vous assurer de maîtriser la base.

    L'ensemble des questions correspond à des situations communes et récurrentes.


!!! question "Exercice 1"
    Créez un dictionnaire vide représentant les attributs d'un employé appelé `employe1`.


!!! question "Exercice 2"
    Ajoutez des clés telles que "nom", "age", "poste" à votre dictionnaire `employe1` et assignez-leur des valeurs appropriées.


!!! question "Exercice 3"
    Affichez l'âge de l'employé dans le dictionnaire `employe1`.


!!! question "Exercice 4"
    Modifiez le poste de l'employé dans le dictionnaire `employe1`.


!!! question "Exercice 5"
    Supprimez l'âge de l'employé du dictionnaire `employe1`.


!!! question "Exercice 6"
    Parcourez toutes les clés du dictionnaire `employe1` et affichez-les.


!!! question "Exercice 7"
    Parcourez toutes les valeurs du dictionnaire `employe1` et affichez-les.


!!! question "Exercice 8"
    Créez un dictionnaire représentant les attributs d'un fruit appelé `fruit1`, avec les clés "nom", "couleur", "quantite" et assignez-leur des valeurs appropriées.


!!! question "Exercice 9"
    Modifiez la couleur du fruit dans le dictionnaire `fruit1`.


!!! question "Exercice 10"
    Supprimez la quantité de fruits du dictionnaire `fruit1`.


!!! question "Exercice 11"
    Parcourez toutes les paires clé-valeur du dictionnaire `fruit1` et affichez-les.


!!! question "Exercice 12"
    Créez un dictionnaire vide représentant les notes d'un élève appelé `notes`.


!!! question "Exercice 13"
    Ajoutez des clés représentant les matières de l'étudiant avec leurs notes associées dans le dictionnaire `notes`.


!!! question "Exercice 14"
    Créez une fonction `moyenne(dico: dict[str, float]) -> float` qui prend en paramètre un dictionnaire de notes et renvoie la moyenne des notes dans le dictionnaire.
    
    Testez la fonction avec le dictionnaire `notes`.
    
    **Exemple** :

    ```python
        notes = {"Maths": 15, "NSI": 18, "Physique": 12}
        print(moyenne(notes))  # Affiche 15.0
    ```

!!! question "Exercice 15"
    Trouvez la matière avec la note la plus élevée dans le dictionnaire `notes`.


!!! question "Exercice 16"
    Vérifiez si la matière "NSI" est présente dans le dictionnaire `notes`.


!!! question "Exercice 17"
    Supprimez une matière dans le dictionnaire `notes`.

!!! question "Exercice 18"
    On considère la ville suivante :

    | clé | valeur |
    | --- | ------ |
    | nom | Montreal |
    | pays | Canada |
    | province | Quebec |
    | pop | 1825208 |
    | superficie | 315 |

    1. Créer un dictionnaire affecté à la variable `ville` contenant les données ci-dessus.
    2. Modifier la superficie, qui est fausse, en 365 km².
    3. Ajouter la densité qui est de 4992 habitants au kilomètre carré.
    4. Remplacer la clé "pop" par "population".

!!! question "Exercice 19"
    On considère les données suivantes, enregistrées dans le dictionnaire `repertoire` :

    | Nom | Téléphone |
    | --- | --------- |
    | Ewen | 0612345678 |
    | Marie | 0687654321 |
    | Hanae | 0765432198 |
    | Piotr | 0777666555 |

    ```python
        repertoire = {"Ewen": "0612345678",
                    "Marie": "0687654321",
                    "Hanae": "0765432198",
                    "Piotr": "0777666555"}
    ```

    1. Comment accéder au téléphone de Piotr ?
    2. Comment savoir si "Fanny" est enregistrée dans le répertoire ?
    3. Modifier le numéro d'Ewen, il se termine par un 9 et non un 8.
    4. Ajouter "Raoul" dont le numéro est "0789898989".
    5. Supprimer "Hanae" du répertoire.
    6. On souhaite obtenir l'annuaire inversé. C'est à dire un dictionnaire où on a échangé les clés et les valeurs. En parcourant le répertoire, créez l'annuaire inversé.

!!! question "Exercice 20"
    Convertir les deux listes suivantes en un dictionnaire **en utilisant une seule boucle for**.
    ```python
        valeurs = ['Ten', 'Twenty', 'Thirty']
        cles = [10, 20, 30]
    ```

    Le résultat doit être :
    ```python
        {10: 'Ten', 20: 'Twenty', 30: 'Thirty'}
    ```

    Note: On peut utiliser n'importe que type **immuable** comme clé de dictionnaire.


!!! question "Exercice 21"
    Considérez la liste suivante :
    ```python
        employees = [
        {'name': 'John', 'salary': 7500},
        {'name': 'Emma', 'salary': 8000},
        {'name': 'Brad', 'salary': 6500}
        ]
    ```

    1. Changez le salaire de Brad en 8500.
    
       Sortie attendue :
    ```python
        [{'name': 'John', 'salary': 7500},
            {'name': 'Emma', 'salary': 8000},
            {'name': 'Brad', 'salary': 8500}]
    ```

    2. À l'aide d'une boucle, calculez le cumul des salaires.

    3. À l'aide d'une boucle, créez la liste des noms des employés.

!!! question "Exercice 22"
    Nous allons apprendre à compter les lettres d'une chaîne de caractères.

    Tout comme les algorithmes de minimum/maximum, cet algorithme est à connaître.

    Voici la chaîne en question, utilisée fréquemment pour remplir des zones de texte lorsqu'on développe une interface graphique :
    ```python
        s = "lorem ipsum dolor sit amet consectetur adipiscing elit"
    ```

    Nous allons produire un dictionnaire qui compte le nombre d'apparitions de chaque caractère dans la chaîne précédente.

    **Exemple de résultat attendu** :

    ```python
        {' ': 7, 'i': 6, 'e': 5, 't': 5, 'o': 4, 's': 4, 'l': 3, 'r': 3, 'm': 3,
        'c': 3, 'p': 2, 'u': 2, 'd': 2, 'a': 2, 'n': 2, 'g': 1}
    ```

    Créez une fonction `compteur(chaine: str) -> dict[str, int]` que vous testerez avec plusieurs chaînes.
    
    Essayez de trouver un moyen sans dévoiler l'indice dans un premier temps.

    ??? tip "Indice"
        Il faut procéder par accumulation dans un dictionnaire.

        **Algorithme à suivre** :
        
        1. Créer un dictionnaire vide `compteur = {}`
        2. Parcourir chaque caractère `char` de la chaîne `s`
        3. Pour chaque caractère :

            - Si le caractère n'est pas dans le dictionnaire, l'ajouter avec la valeur 1
            - Sinon, incrémenter sa valeur de 1

