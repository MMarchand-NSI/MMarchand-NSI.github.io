# Le langage machine

Le **langage machine** est le seul langage que le processeur comprend directement. C'est un ensemble d'**instructions binaires** (des suites de 0 et de 1) que le CPU peut exécuter.

## Qu'est-ce qu'une instruction machine ?

Une instruction machine est **un nombre** stocké en mémoire qui indique au CPU **quelle opération effectuer**. Chaque instruction comporte généralement :

1. Un **code opération** (*opcode*) : quel type d'opération (addition, chargement, saut...)
2. Des **opérandes** : sur quelles données ou adresses travailler

!!! example "Exemple simplifié"
    En binaire, une instruction pourrait ressembler à : `0010 0000 0101`

    - `0010` : code pour "charger en mémoire" (opcode)
    - `0000 0101` : adresse 5 (opérande)

    → Cette instruction signifie "charger la valeur à l'adresse 5"

## Les instructions du Little Man Computer (LMC)

Pour comprendre concrètement, utilisons le **Little Man Computer**, un modèle pédagogique d'ordinateur avec un jeu d'instructions simple.

**Instructions de manipulation de données :**

| Mnémonique | Code | Description | Exemple |
|------------|------|-------------|---------|
| `LDA` | 5xx | **Load** : charge la valeur de l'adresse xx dans l'accumulateur | `LDA 10` charge la valeur à l'adresse 10 |
| `STA` | 3xx | **Store** : stocke l'accumulateur à l'adresse xx | `STA 20` écrit l'accumulateur à l'adresse 20 |
| `ADD` | 1xx | **Addition** : ajoute la valeur de l'adresse xx à l'accumulateur | `ADD 15` ajoute la valeur à l'adresse 15 |
| `SUB` | 2xx | **Soustraction** : soustrait la valeur de l'adresse xx de l'accumulateur | `SUB 12` soustrait la valeur à l'adresse 12 |

**Instructions d'entrée/sortie :**

| Mnémonique | Code | Description |
|------------|------|-------------|
| `INP` | 901 | **Input** : lit une valeur et la place dans l'accumulateur |
| `OUT` | 902 | **Output** : affiche la valeur de l'accumulateur |

**Instructions de contrôle :**

| Mnémonique | Code | Description | Exemple |
|------------|------|-------------|---------|
| `BRA` | 6xx | **Branch Always** : saute toujours à l'adresse xx | `BRA 05` va à l'instruction à l'adresse 5 |
| `BRZ` | 7xx | **Branch if Zero** : saute à xx si l'accumulateur vaut 0 | `BRZ 08` va à l'adresse 8 si ACC = 0 |
| `BRP` | 8xx | **Branch if Positive** : saute à xx si l'accumulateur est positif | `BRP 12` va à l'adresse 12 si ACC ≥ 0 |
| `HLT` | 000 | **Halt** : arrête le programme | |

**Directive de données :**

| Mnémonique | Description |
|------------|-------------|
| `DAT` | **Data** : réserve une case mémoire avec une valeur initiale |

## Exemple de programme LMC

**Programme : Additionner deux nombres**

```
     INP        // Lire le premier nombre
     STA 10     // Le stocker à l'adresse 10
     INP        // Lire le deuxième nombre
     ADD 10     // L'additionner avec le premier
     OUT        // Afficher le résultat
     HLT        // Arrêter
10   DAT 0      // Case mémoire pour stocker le premier nombre
```

**En mémoire, cela ressemble à :**

| Adresse | Instruction/Donnée | Code machine |
|---------|-------------------|--------------|
| 00 | `INP` | 901 |
| 01 | `STA 10` | 310 |
| 02 | `INP` | 901 |
| 03 | `ADD 10` | 110 |
| 04 | `OUT` | 902 |
| 05 | `HLT` | 000 |
| ... | ... | ... |
| 10 | `DAT 0` | 000 |

!!! note "Du code à la machine"
    1. **Langage machine** (binaire pur) : `1110000101` - incompréhensible pour l'humain
    2. **Assembleur** (mnémoniques) : `ADD 5` - lisible mais proche de la machine
    3. **Langages de haut niveau** (Python, C) : `resultat = a + b` - abstrait et lisible

    Le CPU ne comprend QUE le langage machine. L'assembleur et les langages de haut niveau sont **traduits** en langage machine avant l'exécution.

## Un exemple plus complexe : compter jusqu'à 5

```assembly
     LDA compteur    // Charger le compteur
boucle OUT         // Afficher la valeur
     ADD un         // Ajouter 1
     STA compteur   // Sauvegarder le nouveau compteur
     SUB cinq       // Soustraire 5 pour tester
     BRZ fin        // Si 0, on a atteint 5, on sort
     LDA compteur   // Sinon recharger le compteur
     BRA boucle     // Et recommencer
fin  HLT           // Arrêter

compteur DAT 0     // Variable initialisée à 0
un       DAT 1     // Constante 1
cinq     DAT 5     // Constante 5
```

**Ce programme :**

1. Affiche 0
2. Incrémente (0 → 1)
3. Affiche 1
4. Incrémente (1 → 2)
5. Continue jusqu'à atteindre 5
6. S'arrête
