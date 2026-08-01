# Le langage machine

!!! question "Rappel d'ouverture (5 minutes, cours fermé)"
    1. Citez les trois éléments que le modèle de von Neumann distingue dans une machine.
    2. Le compteur ordinal vaut 12. Que désigne ce nombre ?
    3. Qu'est-ce qui, dans la mémoire, distingue une instruction d'une donnée ?

??? success "Corrigé"
    1. L'**unité centrale** (avec son unité de calcul et son unité de contrôle), la **mémoire**, et les **entrées-sorties**, reliées par des bus.
    2. L'**adresse de la prochaine instruction** à exécuter, pas sa valeur.
    3. **Rien.** Ce qui décide qu'un nombre est exécuté comme une instruction, c'est uniquement le fait que le compteur ordinal pointe dessus.

Le **langage machine** est le seul langage que le processeur comprend directement. C'est un ensemble d'instructions que le CPU peut exécuter, et chacune de ces instructions est **un nombre**.

## Qu'est-ce qu'une instruction machine ?

Une instruction machine est **un nombre** stocké en mémoire, qui indique au CPU **quelle opération effectuer**. Chaque instruction comporte généralement :

1. Un **code opération** (*opcode*) : quel type d'opération (addition, chargement, saut...)
2. Des **opérandes** : sur quelles données ou adresses travailler

!!! abstract "Le code est une convention, exactement comme la vôtre"
    Vous avez déjà fait ce travail dans l'activité [Inventer un langage pour une machine](langage-invente.md) : vous avez attribué **un numéro à chaque mot**, et vous avez constaté que le programme du voisin était indéchiffrable sans sa table.

    Un processeur ne fait rien d'autre. Son **jeu d'instructions** est une table de correspondance décidée une fois pour toutes par ses concepteurs, et gravée dans le circuit. La table ci-dessous est celle du LMC : ce n'est pas *la* bonne, c'est *celle-là*. Une autre machine en utilise une autre, et c'est pourquoi un programme compilé pour un processeur ne tourne pas sur un autre.

## Les instructions du Little Man Computer (LMC)

Pour comprendre concrètement, utilisons le **Little Man Computer**, un modèle pédagogique d'ordinateur avec un jeu d'instructions simple. Ses instructions s'écrivent avec **trois chiffres décimaux** : le premier est l'opcode, les deux suivants l'opérande.

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
    1. **Langage machine** : `310`, un nombre, seule chose que le processeur décode
    2. **Assembleur** (mnémoniques) : `STA 10`, lisible mais proche de la machine
    3. **Langages de haut niveau** (Python, C) : `resultat = a + b`, abstrait et lisible

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

## Et une vraie machine ?

Le LMC écrit ses instructions avec trois chiffres **décimaux**, parce que c'est commode pour nous. Un processeur réel, lui, ne dispose que de **deux** symboles, puisque ses circuits ne savent distinguer que deux états. Ses instructions sont donc les mêmes nombres, écrits autrement :

!!! example "La même idée, avec deux symboles"
    Une instruction pourrait s'écrire `0010 0000 0101` :

    - `0010` : l'opcode, par exemple « charger »
    - `0000 0101` : l'opérande, ici l'adresse 5

    L'instruction signifie « charge la valeur rangée à l'adresse 5 ». C'est **exactement** la structure du LMC, opcode plus opérande, avec un alphabet de deux chiffres au lieu de dix.

Écrire les nombres avec deux symboles seulement, c'est tout l'objet du chapitre **Représentation de l'information**. Vous y répondrez notamment à la question que cette page laisse ouverte : une case ne contenant qu'un nombre de taille fixe, **jusqu'où peut-on compter avant qu'elle ne déborde** ?
