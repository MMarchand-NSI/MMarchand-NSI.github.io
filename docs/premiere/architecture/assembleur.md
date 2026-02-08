# Activité : Little Man Computer (LMC)

## Introduction

Le **Little Man Computer (LMC)** est un simulateur pédagogique qui modélise une architecture simplifiée de processeur. Il permet de comprendre concrètement comment fonctionne un ordinateur en visualisant :

- Le **chargement du programme en mémoire**
- Le **cycle fetch-decode-execute**
- Le rôle du **compteur ordinal (PC)**

### Le simulateur

**URL du simulateur :** [https://www.101computing.net/lmc/](https://www.101computing.net/lmc/)

Le LMC est construit autour d'une **architecture simplifiée** :

- **100 emplacements mémoire** (adresses 00 à 99)
- Un **accumulateur (ACC)** : unique espace de travail pour les calculs
- Un **compteur ordinal (PC)** : indique l'adresse de la prochaine instruction
- Une **ALU** (Unité Arithmétique et Logique) : effectue les additions et soustractions

**Particularité pédagogique :** Le LMC utilise des nombres **décimaux** (et non binaires) pour simplifier l'apprentissage.

---

## Jeu d'instructions du LMC

Le LMC possède **11 instructions** simples. Chaque instruction est codée sur **3 chiffres** en code machine.

### Instructions d'entrée/sortie

| Mnémonique | Nom | Description | Code machine |
|------------|-----|-------------|--------------|
| `INP` | INPUT | Demande une entrée utilisateur et la stocke dans l'accumulateur | 901 |
| `OUT` | OUTPUT | Affiche la valeur contenue dans l'accumulateur | 902 |

### Instructions de transfert mémoire

| Mnémonique | Nom | Description | Code machine |
|------------|-----|-------------|--------------|
| `LDA xx` | LOAD | Charge dans l'accumulateur la valeur située à l'adresse mémoire `xx` | 5xx |
| `STA xx` | STORE | Stocke la valeur de l'accumulateur à l'adresse mémoire `xx` | 3xx |

### Instructions arithmétiques

| Mnémonique | Nom | Description | Code machine |
|------------|-----|-------------|--------------|
| `ADD xx` | ADD | Ajoute à l'accumulateur la valeur située à l'adresse `xx` | 1xx |
| `SUB xx` | SUBTRACT | Soustrait de l'accumulateur la valeur située à l'adresse `xx` | 2xx |

### Instructions de branchement (saut)

| Mnémonique | Nom | Description | Code machine |
|------------|-----|-------------|--------------|
| `BRA xx` | BRANCH ALWAYS | Saute toujours à l'adresse `xx` (branchement inconditionnel) | 6xx |
| `BRZ xx` | BRANCH IF ZERO | Saute à l'adresse `xx` si l'accumulateur vaut zéro | 7xx |
| `BRP xx` | BRANCH IF POSITIVE | Saute à l'adresse `xx` si l'accumulateur est positif ou nul | 8xx |

### Instructions spéciales

| Mnémonique | Nom | Description | Code machine |
|------------|-----|-------------|--------------|
| `HLT` | HALT | Arrête l'exécution du programme | 000 |
| `DAT` | DATA | Réserve un emplacement mémoire pour une variable (optionnellement avec une valeur initiale) | - |

!!! note "Utilisation de DAT"
    `DAT` n'est pas une instruction exécutable, c'est une **directive** pour l'assembleur. Elle permet de définir des variables avec un nom symbolique.
    
    Exemples :
```
    nombre DAT      # Réserve un emplacement nommé "nombre" (valeur initiale 0)
    valeur DAT 42   # Réserve un emplacement nommé "valeur" avec 42 comme valeur initiale
```

---

## Exemple de programme commenté

Voici un programme simple qui additionne deux nombres :
```assembly
        INP       # Demander le premier nombre → ACC
        STA nb1   # Stocker ACC dans la variable "nb1"
        INP       # Demander le deuxième nombre → ACC
        ADD nb1   # Ajouter nb1 à ACC
        OUT       # Afficher le résultat
        HLT       # Arrêter le programme
nb1     DAT       # Variable pour stocker le premier nombre
```

**Observation pendant l'exécution :**

1. Le **PC** (compteur ordinal) commence à 0
2. L'instruction `INP` est **chargée** depuis la mémoire
3. Le **PC s'incrémente** automatiquement
4. L'instruction est **décodée** puis **exécutée**
5. Les données circulent sur les **bus** entre les registres

---

## Les 12 défis

Voici une série de 12 exercices progressifs pour maîtriser la programmation en LMC. Commencez par les plus simples et avancez progressivement.

### Niveau 1 : Séquence simple (Instructions de base)

!!! question "Défi 1 : Écho simple"
    **Objectif :** Demander un nombre à l'utilisateur et l'afficher.

    **Programme attendu :**

    - Lire une entrée
    - Afficher cette entrée

    **Instructions à utiliser :** `INP`, `OUT`, `HLT`

!!! question "Défi 2 : Deux nombres"
    **Objectif :** Demander deux nombres à l'utilisateur et les afficher dans le même ordre.

    **Programme attendu :**

    - Lire un premier nombre et le stocker
    - Lire un deuxième nombre et le stocker
    - Afficher le premier nombre
    - Afficher le deuxième nombre

    **Instructions à utiliser :** `INP`, `OUT`, `STA`, `LDA`, `HLT`, `DAT`

!!! question "Défi 3 : Addition"
    **Objectif :** Demander deux nombres à l'utilisateur et afficher leur somme.

    **Programme attendu :**

    - Lire le premier nombre et le stocker
    - Lire le deuxième nombre
    - Additionner les deux nombres
    - Afficher le résultat

    **Instructions à utiliser :** `INP`, `OUT`, `STA`, `ADD`, `HLT`, `DAT`

!!! question "Défi 4 : Soustraction"
    **Objectif :** Demander deux nombres à l'utilisateur et afficher leur différence (premier - deuxième).

    **Programme attendu :**

    - Lire le premier nombre et le stocker
    - Lire le deuxième nombre et le stocker
    - Calculer premier - deuxième
    - Afficher le résultat

    **Instructions à utiliser :** `INP`, `OUT`, `STA`, `LDA`, `SUB`, `HLT`, `DAT`

!!! question "Défi 5 : Moyenne de trois nombres"
    **Objectif :** Demander trois nombres à l'utilisateur et afficher leur moyenne (somme divisée par 3).

    **Programme attendu :**

    - Lire trois nombres successivement
    - Calculer leur somme
    - Diviser par 3 (soustraire 3 plusieurs fois jusqu'à obtenir 0, compter les soustractions)
    - Afficher le résultat

    **Indices :**

    - Stocker les trois nombres en mémoire
    - Les additionner un par un
    - Pour diviser par 3, utiliser une boucle qui soustrait 3 et compte le nombre de soustractions

### Niveau 2 : Sélection (Structures conditionnelles)

!!! question "Défi 6 : Maximum de deux nombres"
    **Objectif :** Demander deux nombres à l'utilisateur et afficher le plus grand des deux.

    **Programme attendu :**

    - Lire deux nombres (A et B)
    - Calculer A - B
    - Si le résultat est positif ou nul : afficher A
    - Sinon : afficher B

    **Instructions à utiliser :** `INP`, `OUT`, `STA`, `LDA`, `SUB`, `BRP`, `HLT`, `DAT`

    **Astuce :** Utiliser `SUB` puis `BRP` pour tester quel nombre est le plus grand.

!!! question "Défi 7 : Test de positivité"
    **Objectif :** Demander un nombre à l'utilisateur. Afficher 1 s'il est positif ou nul, afficher 0 s'il est négatif.

    **Programme attendu :**

    - Lire un nombre
    - Tester s'il est positif (≥ 0)
    - Afficher 1 ou 0 selon le cas

    **Instructions à utiliser :** `INP`, `OUT`, `BRP`, `BRA`, `HLT`, `DAT`

!!! question "Défi 8 : Maximum de trois nombres"
    **Objectif :** Demander trois nombres à l'utilisateur et afficher le plus grand des trois.

    **Programme attendu :**

    - Lire trois nombres (A, B, C)
    - Comparer A et B → garder le max dans une variable
    - Comparer ce max avec C
    - Afficher le résultat final

    **Instructions à utiliser :** `INP`, `OUT`, `STA`, `LDA`, `SUB`, `BRP`, `BRA`, `HLT`, `DAT`

### Niveau 3 : Itération (Boucles)

!!! question "Défi 9 : Compte à rebours"
    **Objectif :** Afficher les nombres de 10 à 1 (compte à rebours).

    **Programme attendu :**

    - Initialiser un compteur à 10
    - Afficher le compteur
    - Décrémenter le compteur (soustraire 1)
    - Répéter tant que le compteur n'est pas à 0

    **Instructions à utiliser :** `OUT`, `LDA`, `STA`, `SUB`, `BRZ`, `BRA`, `HLT`, `DAT`

    **Concept clé :** Utilisation d'une **boucle** avec un test de fin (`BRZ`).

!!! question "Défi 10 : Compteur croissant"
    **Objectif :** Afficher les nombres de 1 à 10.

    **Programme attendu :**

    - Initialiser un compteur à 1
    - Afficher le compteur
    - Incrémenter le compteur (ajouter 1)
    - Répéter jusqu'à 10

    **Instructions à utiliser :** `OUT`, `LDA`, `STA`, `ADD`, `SUB`, `BRP`, `BRA`, `HLT`, `DAT`

!!! question "Défi 11 : Table de multiplication"
    **Objectif :** Demander un nombre N à l'utilisateur, puis afficher sa table de multiplication de 1 à 10.

    **Exemple :** Si l'utilisateur entre 7, afficher : 7, 14, 21, 28, 35, 42, 49, 56, 63, 70

    **Programme attendu :**

    - Lire N
    - Initialiser un compteur à 1 et un résultat à 0
    - Boucle :
        - Ajouter N au résultat
        - Afficher le résultat
        - Incrémenter le compteur
        - Répéter jusqu'à 10

    **Instructions à utiliser :** `INP`, `OUT`, `LDA`, `STA`, `ADD`, `SUB`, `BRZ`, `BRA`, `HLT`, `DAT`

    **Concept clé :** La multiplication est réalisée par **additions successives**.

!!! question "Défi 12 : Somme des N premiers entiers"
    **Objectif :** Demander un nombre N à l'utilisateur et afficher la somme 1 + 2 + 3 + ... + N.

    **Exemple :** Si l'utilisateur entre 5, afficher 15 (car 1+2+3+4+5 = 15)

    **Programme attendu :**

    - Lire N
    - Initialiser une somme à 0
    - Initialiser un compteur à N
    - Boucle :
        - Ajouter le compteur à la somme
        - Décrémenter le compteur
        - Répéter tant que le compteur n'est pas à 0
    - Afficher la somme

    **Instructions à utiliser :** `INP`, `OUT`, `LDA`, `STA`, `ADD`, `SUB`, `BRZ`, `BRA`, `HLT`, `DAT`

    **Concept clé :** Utilisation d'un **accumulateur** et d'une **boucle décrémentale**.

---

## Conseils pour réussir

### 1. Observer avant de coder
- Lancez le simulateur en mode **pas à pas** (step-by-step)
- Observez comment le **compteur ordinal (PC)** évolue
- Suivez le parcours des données sur les **bus**
- Identifiez quels registres sont modifiés à chaque étape

### 2. Planifier votre algorithme
Avant d'écrire le code LMC :
1. Écrivez l'algorithme en **pseudo-code** ou en **Python**
2. Identifiez les **variables** nécessaires
3. Déterminez les **structures de contrôle** (boucles, conditions)

### 3. Tester régulièrement
- Testez avec des **valeurs simples** d'abord (ex : 1, 2, 3)
- Vérifiez les **cas limites** (ex : 0, nombres négatifs)
- Utilisez la **console** du simulateur pour suivre l'exécution

### 4. Déboguer efficacement
Si votre programme ne fonctionne pas :
- Vérifiez que chaque instruction utilise la **bonne adresse mémoire**
- Assurez-vous que les **labels** sont correctement définis
- Vérifiez que vous n'avez pas oublié `HLT` à la fin
- Observez les **valeurs dans les registres** à chaque étape

---

## Pour aller plus loin

Une fois les 12 défis réussis, vous pouvez essayer :

- **Multiplication de deux nombres** : A × B par additions successives
- **Division euclidienne** : Quotient et reste de A ÷ B par soustractions successives
- **Suite de Fibonacci** : Afficher les N premiers termes
- **Factorielle** : Calculer N!
- **Recherche du minimum** : Parmi une série de nombres entrés par l'utilisateur

---

## Ressources

- **Simulateur LMC :** [https://www.101computing.net/lmc/](https://www.101computing.net/lmc/)
- **Simulateur alternatif (Peter Higginson) :** [https://peterhigginson.co.uk/lmc/](https://peterhigginson.co.uk/lmc/)
- **Tutoriels détaillés :** [https://teachcomputerscience.com/lmc/](https://teachcomputerscience.com/lmc/)
- **Exercices avancés :** [https://github.com/Mbyrne28/Little-Man-Computer](https://github.com/Mbyrne28/Little-Man-Computer)

---

**Sources :**
- 101 Computing - Little Man Computer Mini Challenges
- Teach Computer Science - LMC Resources
- Wikipedia - Little Man Computer
- Programme NSI - Bulletin officiel spécial n°1 du 22 janvier 2019