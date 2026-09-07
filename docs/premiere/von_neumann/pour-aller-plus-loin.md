# Pour aller plus loin : sous le capot

!!! info "Quand lire cette page, et pourquoi elle est à part"
    Le cours [Architecture de von Neumann](vonneuman.md) **nomme** les trois bus et les trois temps du cycle. Cette page les **détaille**, et ajoute les exercices qui vont avec.

    Viens-y **après les défis LMC**, pas avant : le cycle se comprend beaucoup mieux quand on a déjà écrit et fait tourner ses propres programmes. Rien ici n'est nécessaire pour les défis.

    Le programme de première borne le cours aux **concepts généraux** du modèle. Ce qui est exigible tient donc dans la page de cours ; ce qui suit est du détail utile, et les deux dernières sections sont franchement hors programme.

## 1. Les trois bus en détail

Un bus n'est pas un tuyau dans lequel les informations circulent les unes après les autres : c'est un **groupe de fils parallèles** qui portent chacun, **en permanence**, un signal électrique dans l'un de ses deux états possibles.

Chaque bus est un groupe de fils **physiquement séparé** des autres. À chaque instant, la mémoire "voit" l'état de tous les fils simultanément. Il n'y a pas de mélange possible : chaque information voyage sur son propre groupe de fils.

C'est le signal sur le bus de contrôle qui déclenche l'action. Sans lui, la mémoire ne fait rien, même si une adresse est présente sur le bus d'adresses.

!!! example "Exemple : ajouter 2 à la valeur stockée à l'adresse 42"
    Supposons que la case mémoire 42 contient la valeur **10**. Le CPU doit calculer 10 + 2 et réécrire le résultat en mémoire.

    Les trois bus travaillent **simultanément** à chaque étape. C'est leur combinaison qui donne un sens à l'opération : le bus de contrôle dit quoi faire, le bus d'adresses dit où, et le bus de données transporte le contenu.

    **Étape 1 : Lire la valeur en mémoire**

    ```
    CPU  ══[ LIRE ]══►  Mémoire      (bus de contrôle : le CPU demande une lecture)
    CPU  ══[  42  ]══►  Mémoire      (bus d'adresses  : le CPU envoie l'adresse)
    CPU  ◄═[  10  ]═══  Mémoire      (bus de données  : la mémoire répond avec la valeur)
    ```

    Le CPU envoie **en même temps** l'ordre LIRE et l'adresse 42. La mémoire répond en plaçant la valeur 10 sur le bus de données. Le CPU la récupère dans l'accumulateur.

    **Étape 2 : Le calcul**

    L'UAL effectue 10 + 2 = **12**. Cette étape est interne au CPU, les bus ne sont pas sollicités.

    **Étape 3 : Écrire le résultat en mémoire**

    ```
    CPU  ══[ ÉCRIRE ]══►  Mémoire    (bus de contrôle : le CPU demande une écriture)
    CPU  ══[   42   ]══►  Mémoire    (bus d'adresses  : le CPU envoie l'adresse)
    CPU  ══[   12   ]══►  Mémoire    (bus de données  : le CPU envoie la valeur)
    ```

    Le CPU envoie **en même temps** l'ordre ÉCRIRE, l'adresse 42 et la valeur 12. La mémoire reçoit les trois informations et écrit 12 à l'adresse 42.

    **À retenir :** À l'étape 1, le bus de données va de la mémoire vers le CPU (la mémoire **répond**). À l'étape 3, il va du CPU vers la mémoire (le CPU **envoie**). Les bus d'adresses et de contrôle vont toujours du CPU vers la mémoire : c'est le CPU qui commande.

    La case mémoire 42 contient maintenant **12**.

### Exercices sur les bus

!!! question "Le CPU veut lire la valeur stockée à l'adresse 7"
    Complète le tableau :

    | Bus | Valeur transportée | Sens |
    |-----|--------------------|------|
    | Bus d'adresses | ? | ? → ? |
    | Bus de contrôle | ? | ? → ? |
    | Bus de données | ? | ? → ? |

    ??? success "Réponse"
        | Bus | Valeur transportée | Sens |
        |-----|--------------------|------|
        | Bus d'adresses | **7** | CPU → Mémoire |
        | Bus de contrôle | **LIRE** | CPU → Mémoire |
        | Bus de données | **la valeur à l'adresse 7** | Mémoire → CPU |

        Le bus de données va de la mémoire vers le CPU car c'est une lecture : la mémoire **répond**.

!!! question "Le CPU veut écrire la valeur 25 à l'adresse 3"
    Complète le tableau :

    | Bus | Valeur transportée | Sens |
    |-----|--------------------|------|
    | Bus d'adresses | ? | ? → ? |
    | Bus de contrôle | ? | ? → ? |
    | Bus de données | ? | ? → ? |

    ??? success "Réponse"
        | Bus | Valeur transportée | Sens |
        |-----|--------------------|------|
        | Bus d'adresses | **3** | CPU → Mémoire |
        | Bus de contrôle | **ÉCRIRE** | CPU → Mémoire |
        | Bus de données | **25** | CPU → Mémoire |

        Cette fois, les trois bus vont dans le même sens : le CPU envoie tout. C'est la différence avec la lecture.

!!! question "Qu'est-ce qui changerait si on supprimait le bus de contrôle ?"
    On garde le bus d'adresses et le bus de données. Le CPU envoie l'adresse 3 et la valeur 25.

    La mémoire doit-elle lire ou écrire ? Peut-elle le savoir ?

    ??? success "Réponse"
        Non, elle ne peut pas le savoir. Sans bus de contrôle, la mémoire voit une adresse (3) et une donnée (25) mais ne sait pas si elle doit :

        - **lire** la valeur à l'adresse 3 et la mettre sur le bus de données, ou
        - **écrire** 25 à l'adresse 3

        Le bus de contrôle est indispensable pour lever cette ambiguïté.

## 2. Le cycle fetch-decode-execute en détail

Le cours dit que le processeur répète un cycle en trois temps. Voici ce que chaque temps recouvre exactement.

### 2.1 Fetch (recherche)

1. L'UC lit l'adresse de la prochaine instruction dans le **compteur ordinal** (ou *Program Counter*)
2. L'instruction est chargée depuis la mémoire vers le **registre d'instruction**
3. Le compteur ordinal est incrémenté pour pointer vers l'instruction suivante

### 2.2 Decode (décodage)

L'UC analyse l'instruction pour déterminer :

- Quelle opération effectuer
- Quelles données utiliser (adresses, registres)

### 2.3 Execute (exécution)

L'UC commande l'UAL ou les autres composants pour réaliser l'opération.

!!! example "Le cycle complet, sur une instruction LMC"
    **Programme :** additionner 3 + 5

    ```
    00: LDA 10    // Charger la valeur à l'adresse 10
    01: ADD 11    // Ajouter la valeur à l'adresse 11
    02: STA 12    // Stocker le résultat à l'adresse 12
    03: HLT       // Arrêter
    ...
    10: DAT 3     // Première valeur
    11: DAT 5     // Deuxième valeur
    12: DAT 0     // Résultat (initialement 0)
    ```

    **Déroulement du cycle pour l'instruction `ADD 11` (adresse 01) :**

    - **Fetch** :
        - Le PC contient 01
        - L'UC lit l'instruction à l'adresse 01 : `ADD 11` (code machine : `1011`)
        - L'instruction est chargée dans le registre d'instruction
        - Le PC est incrémenté : PC = 02

    - **Decode** :
        - L'UC décode `1011` : le premier chiffre, `1`, désigne l'instruction `ADD`
        - Opérande : adresse 11
        - Opération à effectuer : ajouter le contenu de l'adresse 11 à l'accumulateur

    - **Execute** :
        - L'UC lit la valeur à l'adresse 11 : **5**
        - L'UAL additionne : accumulateur (3) + 5 = **8**
        - Le résultat 8 est stocké dans l'accumulateur

    Puis le cycle recommence avec l'instruction suivante à l'adresse 02 (`STA 12`).

### Exercices sur le cycle

!!! question "Dérouler un programme, phase par phase"
    Reprends le programme du cours :

    ```
    Adresse | Instruction        Adresse | Valeur
    --------|------------        --------|-------
    0       | LDA 10             10      | 5
    1       | ADD 11             11      | 3
    2       | STA 12             12      | ?
    3       | HLT
    ```

    Recopie et remplis ce tableau. Cette fois, détaille les trois phases pour chaque instruction :

    | Instruction | PC avant le fetch | Fetch | Decode | Execute | ACC après |
    |-------------|-------------------|-------|--------|---------|-----------|
    | `LDA 10`    |                   |       |        |         |           |
    | `ADD 11`    |                   |       |        |         |           |
    | `STA 12`    |                   |       |        |         |           |
    | `HLT`       |                   |       |        |         |           |

    Une fois ton tableau rempli, saisis ce programme dans le simulateur, lance-le **en mode pas à pas**, et vérifie ta trace.

    ??? question "Avant d'ouvrir la correction"
        Explique en une phrase ce que tu as prédit pour l'accumulateur après `ADD 11`, et pourquoi. Puis compare.

    ??? success "Réponse"
        **Instruction 0 : `LDA 10`**

        - PC = 0 avant le fetch
        - **Fetch** : charge l'instruction à l'adresse 0 dans le registre d'instruction. PC passe à 1.
        - **Decode** : identifie `LDA` (code opération `5`), adresse source = 10
        - **Execute** : lit la valeur à l'adresse 10 (= 5), la place dans l'accumulateur
        - ACC = **5**

        **Instruction 1 : `ADD 11`**

        - PC = 1 avant le fetch
        - **Fetch** : charge l'instruction à l'adresse 1. PC passe à 2.
        - **Decode** : identifie `ADD` (code opération `1`), adresse source = 11
        - **Execute** : lit la valeur à l'adresse 11 (= 3), l'additionne à l'accumulateur (5 + 3)
        - ACC = **8**

        **Instruction 2 : `STA 12`**

        - PC = 2 avant le fetch
        - **Fetch** : charge l'instruction à l'adresse 2. PC passe à 3.
        - **Decode** : identifie `STA` (code opération `3`), adresse destination = 12
        - **Execute** : écrit la valeur de l'accumulateur (8) à l'adresse 12
        - La case mémoire 12 contient maintenant **8**

        **Instruction 3 : `HLT`.** Le programme s'arrête.

!!! question "Les bus pendant le fetch"
    Toujours sur le même programme. Lors de la phase fetch de l'instruction rangée en 1 (`ADD 11`) :

    1. Que transporte le bus d'adresses ? Dans quel sens ?
    2. Que transporte le bus de contrôle ?
    3. Que transporte le bus de données ? Dans quel sens ?

    ??? success "Réponse"
        1. Le bus d'adresses transporte **1** (l'adresse de l'instruction à charger, celle contenue dans le PC). Sens : CPU → Mémoire.
        2. Le bus de contrôle transporte **LIRE** (le CPU veut récupérer l'instruction). Sens : CPU → Mémoire.
        3. Le bus de données transporte **l'instruction `ADD 11`**, c'est-à-dire le nombre `1011`. Sens : Mémoire → CPU.

        Le fetch est toujours une **lecture** en mémoire : le CPU va chercher l'instruction.

## 3. Les registres

Les **registres** sont de petites mémoires ultra-rapides **intégrées au processeur**. Le cours n'en nomme que deux, le compteur ordinal et l'accumulateur. Voici la liste complète de ceux qui interviennent dans le cycle :

- **Compteur ordinal (PC)** : contient l'adresse de la prochaine instruction
- **Registre d'instruction (RI)** : contient l'instruction en cours d'exécution
- **Accumulateur** : contient la valeur sur laquelle l'UAL travaille, et le résultat de son calcul
- **Registres généraux** : stockent temporairement des données pour les calculs

Le LMC n'a **qu'un seul** registre de travail, l'accumulateur : c'est ce qui rend ses programmes si contraignants à écrire, et c'est voulu. Un processeur réel en possède plusieurs dizaines.

## 4. Le goulot de von Neumann

*Hors programme.*

Les instructions et les données partagent la même mémoire et les mêmes bus. Le processeur passe donc une partie de son temps à **attendre** la mémoire, et cette attente devient le facteur limitant : c'est le **goulot de von Neumann**.

Trois réponses courantes, qui ne suppriment pas le problème mais le réduisent :

- la **mémoire cache**, petite et très rapide, placée entre le processeur et la mémoire vive ;
- l'**architecture Harvard**, qui sépare la mémoire des instructions de celle des données ;
- le **pipeline**, qui commence le fetch de l'instruction suivante pendant qu'on exécute la courante.

## 5. Jeux d'instructions et architectures

*Hors programme.*

- **Jeu d'instructions** : l'ensemble des opérations qu'un processeur sait exécuter. Les familles **CISC** (beaucoup d'instructions, complexes) et **RISC** (peu d'instructions, simples et rapides) reposent sur deux paris opposés.
- **Architectures alternatives** : Harvard, et les variantes dites de von Neumann modifiée.

---

**Sources** :

- von Neumann, J. (1945). *First Draft of a Report on the EDVAC*. University of Pennsylvania.
- Tanenbaum, A. S. (2013). *Structured Computer Organization* (6e éd.). Pearson.
