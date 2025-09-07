# Compléments sur le tri, min et max


## Trier une liste - basique

```python

L = [3, 8, 2]

>>> sorted(L)
[2, 3, 8]

```


## Trier "en fonction de"

```python

students = [
    {'name': 'Alice', 'score': 85},
    {'name': 'Bob', 'score': 70},
    {'name': 'Charlie', 'score': 95},
    {'name': 'David', 'score': 80}
]

# Trie les étudiants en fonction de leurs notes (ordre croissant)

def get_score(etudiant: dict) -> int:
    return etudiant['score']

# La liste d'étudiant est triée en fonction du score 
# (de la fonction qui prend un étudiant et qui renvoie son score)
sorted_students = sorted(students, key=get_score)


```
## Idem pour min et max
Il faut connaître ça pour comprendre le cours de programmation dynamique.
Si on ne les utilise pas, le code devient incompréhensible, un vrai fouilli de boucles partout.

### Trouve l'étudiant ayant la note la plus basse (calcule le minimum en fonction du score renvoyé par un étudiant)

```python
min_student: dict = min(students, key=get_score)
```
### Trouve l'étudiant ayant la note la plus haute (calcule le maximum en fonction du score renvoyé par un étudiant)

```python
max_student: dict = max(students, key=get_score)

```

### Trouver la liste de taille minimum

```python
listes = [
    [1, 2, 3],
    [4, 5],
    [6, 7, 8, 9],
    [10]
]


# On cherche le minimum en fonction de la taille 
# (de la fonction qui prend unne liste et qui renvoie sa taille)
min_liste = min(listes, key=len)

print("La liste de taille minimum est: ", min_liste)
>>> La liste de taille minimum est: [10]
```


### Lambda

Si la fonction est toute petite, on peut utiliser une fonction anonyme (`lambda`)

```python
max_student: dict = max(students, key=lambda s: s['score'])
```

key vaut la fonction qui à un étudiant `s` associe son score. 