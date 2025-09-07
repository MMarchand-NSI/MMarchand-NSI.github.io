# Opérateurs Bitwise en Python

Les **opérateurs bitwise** permettent de manipuler les bits individuels des variables dans les calculs. Ils sont souvent utilisés en programmation.

Dans le cadre du progrramme, ils servent en chiffrement, ainsi que pour manipuler des adresses IP.

**Les différents opérateurs bitwise en Python**

1. **AND bitwise** (`&`)
2. **OR bitwise** (`|`)
3. **XOR bitwise** (`^`)
4. **NOT bitwise** (`~`)
5. **Déplacement de bits à gauche** (`<<`)
6. **Déplacement de bits à droite** (`>>`)

## 1. AND bitwise (`&`)

L'opérateur AND bitwise retourne `1` si les deux bits sont `1`, sinon il retourne `0`.

- **Exemple** : `a & b`

```
13   ->   00001101 (en binaire)
11   ->   00001011 (en binaire)
-------------
a & b -> 00001001 (en binaire) = 9 (en décimal)
```

**Code Python :**
```python
a = 13  # 00001101
b = 11  # 00001011
result = a & b
print(result)  # Affiche 9
```

## 2. OR bitwise (`|`)

L'opérateur OR retourne `1` si au moins un des bits est `1`, sinon il retourne `0`.

- **Exemple** : `a | b`

```
5   ->  00000101 (en binaire)
3   ->  00000011 (en binaire)
-------------
a | b -> 00000111 (en binaire) = 7 (en décimal)
```

**Code Python :**
```python
a = 5  # 00000101
b = 3  # 00000011
result = a | b
print(result)  # Affiche 7
```

## 3. XOR bitwise (`^`)

L'opérateur XOR retourne `1` si les bits sont différents, sinon il retourne `0`.

- **Exemple** : `a ^ b`

```
5   ->  00000101 (en binaire)
3   ->  00000011 (en binaire)
-------------
a ^ b -> 00000110 (en binaire) = 6 (en décimal)
```

**Code Python :**
```python
a = 5  # 00000101
b = 3  # 00000011
result = a ^ b
print(result)  # Affiche 6
```

## 4. NOT bitwise (`~`)

L'opérateur NOT bitwise est un opérateur unaire qui inverse tous les bits d'un nombre. En d'autres termes, il transforme chaque `1` en `0` et chaque `0` en `1`. Il s'agit du complément à 1 de l'entier correspondant.

- **Exemple** : `~a`

```
5   ->  00000101 (en binaire)
-------------
~a  ->  11111010 (en binaire) = -6 (en décimal)
```

**Code Python :**
```python
a = 5  # 00000101
result = ~a + 1  # Rappel: L'opposé est 1 + le complément à 1
print(result)  # Affiche -5
```

## 5. Déplacement de bits à gauche (`<<`)

L'opérateur de **déplacement à gauche** décale les bits d'un nombre vers la gauche de N positions. Cela équivaut à multiplier le nombre par `2^N`.

- **Exemple** : `a << 1`

```
5   ->  00000101 (en binaire)
-------------
a << 1 -> 00001010 (en binaire) = 10 (en décimal)
```

**Code Python :**
```python
a = 5  # 00000101
result = a << 1
print(result)  # Affiche 10
```

## 6. Déplacement de bits à droite (`>>`)

L'opérateur de **déplacement à droite** décale les bits d'un nombre vers la droite de N positions. Cela équivaut à diviser (division entière) le nombre par `2^N`.

- **Exemple** : `a >> 1`

```
5   ->  00000101 (en binaire)
-------------
a >> 1 -> 00000010 (en binaire) = 2 (en décimal)
```

**Code Python :**
```python
a = 5  # 00000101
result = a >> 1
print(result)  # Affiche 2
```

## Tableau récapitulatif des opérateurs

| Opérateur | Symbole | Description                                 | Exemple (en binaire)                 | Résultat |
|-----------|---------|---------------------------------------------|--------------------------------------|----------|
| AND       | `&`     | Compare les bits et retourne `1` si les deux bits sont `1` | `5 & 3 = 1`                       | `00000001` |
| OR        | `\|`     | Compare les bits et retourne `1` si au moins un des bits est `1` | `5 \| 3 = 7`                     | `00000111` |
| XOR       | `^`     | Compare les bits et retourne `1` si les bits sont différents | `5 ^ 3 = 6`                     | `00000110` |
| NOT       | `~`     | Inverse tous les bits                        | `~5 = -6`                         | `11111010` |
| Shift Left| `<<`    | Décale les bits vers la gauche               | `5 << 1 = 10`                     | `00001010` |
| Shift Right| `>>`   | Décale les bits vers la droite               | `5 >> 1 = 2`                      | `00000010` |

Autre fonction utilie:

- La méthode `bit_length()` de la clase `int` permet d'obtenir le nombre de bits d'un int.

## Applications pratiques des opérateurs bitwise

1. **Optimisation des algorithmes** : Les opérations bitwise sont souvent plus rapides que leurs équivalents arithmétiques (par exemple, multiplication par `2` en utilisant le déplacement de bits à gauche).
Aussi, en assembleur, on utilise souvent l'instruction `xor R0, R0` pour affecter 0 au registre mémoire R0, car c'est plus rapide que l'instruction `mov R0, 0` qui affecte 0 à R0. 
2. **Cryptographie** : Les opérateurs XOR sont souvent utilisés dans les algorithmes cryptographiques.
3. **Manipulation de drapeaux (flags)** : Les bitwise sont souvent utilisés pour manipuler des indicateurs d'état (on/off, activé/désactivé) en utilisant des masques de bits. (Mettre l'exemple du jeu de la vie avec un seul tableau)

## Exercice : Extraction des n premiers ou n derniers bits d'un nombre

#### Énoncé

Écrivez un programme qui prend trois entrées :

1. Un nombre entier positif `a`.
2. Un entier `n` représentant le nombre de bits à extraire.
3. Un choix indiquant si vous souhaitez extraire les `n` premiers bits (les bits les plus à gauche) ou les `n` derniers bits (les bits les plus à droite).

Le programme doit alors extraire et afficher les `n` bits choisis sous forme binaire.

#### Règles :
- **Extraction des n derniers bits** : Pour extraire les n bits les plus à droite d'un nombre, vous pouvez utiliser un **masque** ou un **décalage** à droite.
- **Extraction des n premiers bits** : Pour extraire les n bits les plus à gauche d'un nombre, vous pouvez utiliser un décalage à droite suivi d'un masque.

#### Exemples :

- **Entrée** : 
  - Nombre : `29` (en binaire `11101`)
  - Nombre de bits `n` : `3`
  - Choix : "derniers"

  **Sortie attendue** : `101`

- **Entrée** : 
  - Nombre : `29` (en binaire `11101`)
  - Nombre de bits `n` : `2`
  - Choix : "premiers"

  **Sortie attendue** : `11`

---

#### Solution proposée

```python
def extract_last_n_bits(a, n):
    # Masque pour extraire les n derniers bits
    mask = (1 << n) - 1
    return a & mask

def extract_first_n_bits(a, n):
    # Calcul du nombre total de bits dans la représentation binaire
    total_bits = a.bit_length()
    # Décalage à droite pour ne garder que les n premiers bits
    shift = total_bits - n
    return a >> shift
```

## Exercice : Calcul de l'adresse réseau à partir d'une adresse IP et de son masque réseau

Une adresse IP n'est qu'un groupe de 4 octets.
Ici, `192.168.1.10` donnera `11000000.10101000.00000001.00001010`.
En les mettant bout à bout:
`11000000101010000000000100001010` = 3 232 235 786

Cette adresse IP correspond donc à la représentation décimale de l'entier 3 232 235 786

Etudiez ce code:

```python
ip = "192.168.1.10"
ip_tab = [int(e) for e in ip.split('.')]  # [192, 168, 1, 10]
# On va décaler 192 de 3 octets, 168 de 2 octets et 1 de 1 octet pour arriverà réaliser cette opération:
# je n'ai rajouté les points que pour la lisibilité, ils n'existent pas ici.
#   11000000.00000000.00000000.00000000
# |          10101000.00000000.00000000
# |                   00000001.00000000
# |                            00001010
#  -------------------------------------
#   11000000.10101000.00000001.00001010
ip_int = 0
for i in range(4):
  ip_int |= ip_tab[i] << 8*(3-i)
print(ip_int)  # 3 232 235 786
```

#### Cours :

- Une adresse réseau identifie un réseau spécifique dans une architecture IP, et est déterminée par l'application du masque de sous-réseau sur l'adresse IP.
- Le **masque réseau** détermine la partie réseau d'une adresse IP. Il peut être exprimé soit en notation décimale pointée (ex : `255.255.255.0`), soit en notation CIDR (ex : `/24` signifie 24 bits pour la partie réseau).


#### Énoncé

Écrivez un programme qui prend deux entrées :
1. Une adresse IP (IPv4) au format décimal pointé (ex : `192.168.1.10`).
2. Un masque réseau (au format décimal pointé ou CIDR) (ex : `255.255.255.0` ou `/24`).

Le programme doit calculer et afficher l'adresse réseau associée à cette IP, c'est-à-dire l'adresse obtenue en effectuant un **AND bitwise** entre l'adresse IP et le masque réseau.


#### Exemples :

- **Entrée** :
  - Adresse IP : `192.168.1.10`
  - Masque réseau : `255.255.255.0`
- **Sortie attendue** : `192.168.1.0`

- **Entrée** :
  - Adresse IP : `10.0.0.37`
  - Masque réseau : `/8`
- **Sortie attendue** : `10.0.0.0`

---


!!! question "Sauvegarde de Jeux Vidéos"
    On peut sauvegarder une partie de jeux vidéo dans un entier.

    Cet entier `sauv` doit comprendre ces informations:
    
    - Nombre de vies restantes (entre 0 et 99)
    - Nombre de flèches restantes (entre 0 et 300)
    - Point de sauvegarde atteint (150 points de sauvegarde)

    1. De combien d'octets avez vous besoin pour stocker chaque information?
    2. Proposez une fonction qui renvoie un int d'après les paramètres entiers `vie`, `fleches`, `checkpoint`
    3. Proposez une fonction qui renvoie un tuple constitué des ints (`vie`, `fleches`, `checkpoint`) d'après un entier de sauvegarde.

    Vous pouvez tester vos fonctions en vous assurant tout simplement que le résultat est réversible. Vous venez de définir une fonction et sa réciproque.