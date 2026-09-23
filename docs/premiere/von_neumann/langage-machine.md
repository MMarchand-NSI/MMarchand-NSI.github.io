# Le langage machine

!!! question "Rappel d'ouverture (5 minutes, cours fermé)"
    1. Dans le modèle de von Neumann, où est rangé le programme ?
    2. Que désigne le compteur ordinal ?
    3. Pourquoi un programme d'ordinateur ne marche-t-il pas sur un téléphone ?

    ??? success "Corrigé"
        1. Dans la **mémoire**, avec les données.
        2. Le **numéro de la case** où se trouve la prochaine instruction.
        3. Les deux machines n'ont pas la même **table d'instructions**.

## 1. La machine et ses instructions

On va parler dans le langage d'une machine : le **Little Man Computer** (LMC).

- Elle a **100 cases mémoire**, numérotées de 0 à 99. Chaque case contient un nombre.
- Elle a **une seule case de calcul** : l'**accumulateur**. Tous les calculs se font dedans.

Et voici **tout** ce qu'elle sait faire. Rien d'autre.

| Instruction | Exemple | Ce que fait la machine |
|---|---|---|
| `LDA` (*load*) | `LDA 15` | Elle **prend** ce qu'il y a dans la case n°15 et le **met dans l'accumulateur**. La case n°15 ne change pas. |
| `STA` (*store*) | `STA 15` | Elle **met** ce qu'il y a dans l'accumulateur **dans la case n°15**. L'accumulateur ne change pas. |
| `ADD` | `ADD 15` | Elle **ajoute** à l'accumulateur ce qu'il y a dans la case n°15. |
| `SUB` | `SUB 15` | Elle **enlève** de l'accumulateur ce qu'il y a dans la case n°15. |
| `INP` (*input*) | `INP` | Elle **demande un nombre** et le met dans l'accumulateur. |
| `OUT` (*output*) | `OUT` | Elle **affiche** ce qu'il y a dans l'accumulateur. |
| `HLT` (*halt*) | `HLT` | Elle **s'arrête**. |
| `BRA` (*branch*) | `BRA 4` | Elle **va à la case n°4**, au lieu de passer à la suivante. |
| `BRZ` (*branch if zero*) | `BRZ 4` | **Si l'accumulateur vaut 0**, elle va à la case n°4. Sinon, elle passe à la suivante. |
| `BRP` (*branch if positive*) | `BRP 4` | **Si l'accumulateur vaut 0 ou plus**, elle va à la case n°4. Sinon, elle passe à la suivante. |

Cette table ne s'apprend pas par cœur : tu l'as sous les yeux pour tous les exercices. C'est une convention, comme la table que ton groupe a inventée : une autre machine en a une autre.

### La même table, dite comme dans les livres

C'est **exactement la même chose**, dite de façon plus courte et plus précise. Deux mots à connaître :

- `<adr>` n'est **pas à recopier** : les chevrons `< >` veulent dire « mets un numéro de case ici ». `LDA <adr>` s'écrit par exemple `LDA 15` ;
- `PC` est le **compteur ordinal**, le numéro de la case où se trouve la prochaine instruction.

De gauche à droite, le langage devient de plus en plus **formel** : la première table en français de tous les jours, puis la description usuelle, puis la notation, où `←` se lit « reçoit ».

| Instruction | Description usuelle | Notation |
|---|---|---|
| `LDA <adr>` | charge dans l'accumulateur le contenu de l'adresse `<adr>` | `ACC ← mémoire[<adr>]` |
| `STA <adr>` | range le contenu de l'accumulateur à l'adresse `<adr>` | `mémoire[<adr>] ← ACC` |
| `ADD <adr>` | ajoute à l'accumulateur le contenu de l'adresse `<adr>` | `ACC ← ACC + mémoire[<adr>]` |
| `SUB <adr>` | soustrait de l'accumulateur le contenu de l'adresse `<adr>` | `ACC ← ACC − mémoire[<adr>]` |
| `INP` | lit une entrée et la place dans l'accumulateur | `ACC ← entrée` |
| `OUT` | envoie l'accumulateur sur la sortie | `sortie ← ACC` |
| `HLT` | arrête le processeur | arrêt |
| `BRA <adr>` | branchement inconditionnel à l'adresse `<adr>` | `PC ← <adr>` |
| `BRZ <adr>` | branchement à l'adresse `<adr>` si l'accumulateur est nul | si `ACC = 0` : `PC ← <adr>` |
| `BRP <adr>` | branchement à l'adresse `<adr>` si l'accumulateur est positif ou nul | si `ACC ≥ 0` : `PC ← <adr>` |

!!! warning "À l'évaluation, tu auras cette deuxième table, et seulement elle"
    Pas besoin de l'apprendre par cœur, elle te sera donnée. Mais il faut savoir la **lire** : entraîne-toi avec elle, au plus tard pour les défis.

## 2. Prédire, sur ton cahier

Pas de simulateur dans cette partie : **papier et crayon**.

### 2.1 `LDA`

!!! question "Exercice 1"
    Au départ, la mémoire contient :

    | Case n° | 10 | 11 | 12 | 13 |
    |:---:|:---:|:---:|:---:|:---:|
    | Contenu | 7 | 3 | 0 | 25 |

    Sur ton cahier, écris :

    - ce que contient l'accumulateur après `LDA 11` ;
    - ce que contient l'accumulateur après `LDA 13` ;
    - pour le programme ci-dessous, l'accumulateur après la ligne 1, puis après la ligne 2, et ce que contient la case n°10 à la fin.

    | Ligne | Instruction |
    |:---:|:---|
    | 1 | `LDA 10` |
    | 2 | `LDA 11` |

### 2.2 `STA`

!!! question "Exercice 2"
    Même mémoire au départ : case n°10 → 7, case n°11 → 3, case n°12 → 0, case n°13 → 25.

    **Programme A.** Recopie et remplis.

    | Ligne | Instruction | Accumulateur | Case n°10 | Case n°12 |
    |:---:|:---|:---:|:---:|:---:|
    | 1 | `LDA 10` | | | |
    | 2 | `STA 12` | | | |

    **Programme B.** Écris le contenu des cases 10 à 13 à la fin.

    | Ligne | Instruction |
    |:---:|:---|
    | 1 | `LDA 13` |
    | 2 | `STA 10` |
    | 3 | `STA 11` |

!!! question "Exercice 3 : échanger deux cases"
    Même mémoire au départ. Ce programme veut **échanger** les cases n°10 et n°11, pour avoir 3 dans la case n°10 et 7 dans la case n°11.

    | Ligne | Instruction |
    |:---:|:---|
    | 1 | `LDA 10` |
    | 2 | `STA 11` |
    | 3 | `LDA 11` |
    | 4 | `STA 10` |

    Sur ton cahier : que contiennent les cases n°10 et n°11 à la fin ? Le programme a-t-il réussi ?

### 2.3 `ADD` et `SUB`

!!! question "Exercice 4"
    Même mémoire au départ : case n°10 → 7, case n°11 → 3, case n°12 → 0, case n°13 → 25.

    **Programme A.** Recopie et remplis.

    | Ligne | Instruction | Accumulateur | Case n°12 |
    |:---:|:---|:---:|:---:|
    | 1 | `LDA 10` | | |
    | 2 | `ADD 11` | | |
    | 3 | `STA 12` | | |
    | 4 | `SUB 10` | | |

    **Programme B.** Que contient l'accumulateur à la fin ?

    | Ligne | Instruction |
    |:---:|:---|
    | 1 | `LDA 13` |
    | 2 | `SUB 10` |
    | 3 | `SUB 10` |
    | 4 | `SUB 10` |

### 2.4 Un programme entier

Le programme aussi est rangé dans la mémoire : sa première instruction dans la case n°0, la suivante dans la case n°1, et ainsi de suite. La machine les fait **l'une après l'autre**, jusqu'à `HLT`.

!!! question "Exercice 5"
    Toutes les cases de données valent 0 au départ.

    **Programme A.** On tape **4**, puis **9**. Qu'est-ce qui s'affiche ? Que contient la case n°10 à la fin ?

    | Case n° | Instruction |
    |:---:|:---|
    | 0 | `INP` |
    | 1 | `STA 10` |
    | 2 | `INP` |
    | 3 | `ADD 10` |
    | 4 | `OUT` |
    | 5 | `HLT` |

    **Programme B.** On tape **6**. Qu'est-ce qui s'affiche ? Que contient la case n°11 à la fin ?

    | Case n° | Instruction |
    |:---:|:---|
    | 0 | `INP` |
    | 1 | `STA 10` |
    | 2 | `ADD 10` |
    | 3 | `STA 11` |
    | 4 | `LDA 10` |
    | 5 | `OUT` |
    | 6 | `HLT` |

## 3. Donner un nom aux cases

Compter les numéros de cases, c'est pénible, et on se trompe. Alors on donne un **nom** à une case.

```
        INP
        STA a
        INP
        ADD a
        OUT
        HLT
a:      DAT
```

- `a: DAT` veut dire : **cette case s'appelle `a`**, et elle contient 0 au départ.
- `b: DAT 5` veut dire : cette case s'appelle `b`, et elle contient **5** au départ.
- `DAT` n'est pas une instruction. On le met **après** le `HLT`, pour que la machine ne passe jamais dessus.

C'est le programme A de l'exercice 5, en plus lisible.

!!! question "Exercice 6"
    Chaque ligne occupe une case, à partir de la case n°0.

    | Ligne | Instruction |
    |:---:|:---|
    | 1 | `LDA a` |
    | 2 | `ADD b` |
    | 3 | `STA c` |
    | 4 | `SUB a` |
    | 5 | `OUT` |
    | 6 | `HLT` |
    | 7 | `a: DAT 4` |
    | 8 | `b: DAT 7` |
    | 9 | `c: DAT 0` |

    Sur ton cahier, écris :

    - le numéro de la case qui s'appelle `c` ;
    - le nombre affiché ;
    - ce que contient `c` à la fin.

    ??? success "Correction"
        - `c` est la **case n°8** : la ligne 1 est dans la case n°0, donc la ligne 9 dans la case n°8. Le nom, c'est juste un numéro que la machine calcule pour toi.
        - Affiche **7**.
        - `c` contient **11**. Ce n'est pas ce qui est affiché : `OUT` affiche l'accumulateur.

## 4. Le simulateur

Maintenant, et seulement maintenant, la machine.

!!! info "Installation"
    1. Dans VSCode, ouvre les **extensions** (barre de gauche), cherche `mmarchand.lmc-vscode`, clique **Installer**.
    2. Crée un fichier qui finit par **`.lmc`**, par exemple `essai.lmc`.
    3. Pour ouvrir le simulateur, clique sur la **flèche ▶** en haut du fichier.

| Bouton | Ce qu'il fait |
|---|---|
| **Assembler .lmc** | traduit ton fichier en nombres |
| **Charger .lmcobj en RAM** | met ces nombres dans la mémoire |
| **Step** | fait **une** instruction |
| **Run** | fait tout, jusqu'au `HLT` |

!!! warning "Tu as modifié ton programme ? Assemble à nouveau"
    Sinon, « Charger » remet l'**ancienne** version en mémoire.

!!! question "Exercice 7"
    Tape le programme de l'exercice 6, et vérifie tes réponses en mode **Step**, une instruction à la fois.

## 5. Sauter

Jusqu'ici, la machine fait les cases **dans l'ordre**. `BRA`, `BRZ` et `BRP` la font **sauter** à une autre case. Avec un nom de case, c'est plus simple : `BRA fin` veut dire « va à la case qui s'appelle `fin` ».

Dans toute cette partie : **écris ta réponse avant d'ouvrir le simulateur.**

### 5.1 `BRA`

!!! question "Exercice 8"
    **Programme A.** On tape **5**. Qu'est-ce qui s'affiche ?

    | Ligne | Instruction |
    |:---:|:---|
    | 1 | `INP` |
    | 2 | `BRA fin` |
    | 3 | `OUT` |
    | 4 | `fin: HLT` |

    **Programme B.** Combien de nombres ce programme va-t-il demander ?

    | Ligne | Instruction |
    |:---:|:---|
    | 1 | `debut: INP` |
    | 2 | `OUT` |
    | 3 | `BRA debut` |

    **N'ouvre pas le simulateur tant que tu n'as pas écrit tes réponses.**

    ??? success "Correction"
        **A.** **Rien.** La ligne 2 saute par-dessus le `OUT`.

        **B.** **Sans fin.** Après la ligne 3, la machine revient à la ligne 1, toujours. Rien ne l'arrête.

### 5.2 `BRZ`

!!! question "Exercice 9"
    | Ligne | Instruction |
    |:---:|:---|
    | 1 | `INP` |
    | 2 | `BRZ zero` |
    | 3 | `LDA cent` |
    | 4 | `OUT` |
    | 5 | `HLT` |
    | 6 | `zero: LDA mille` |
    | 7 | `OUT` |
    | 8 | `HLT` |
    | 9 | `cent: DAT 100` |
    | 10 | `mille: DAT 1000` |

    Sur ton cahier, écris ce qui s'affiche :

    - quand on tape **5** ;
    - quand on tape **0** ;
    - quand on tape **5**, si on a **effacé la ligne 5**.

    **N'ouvre pas le simulateur tant que tu n'as pas écrit tes réponses.**

    ??? success "Correction"
        - Avec 5 : **100**.
        - Avec 0 : **1000**.
        - Sans la ligne 5, avec 5 : **100 puis 1000**. Rien n'arrête la machine après le premier `OUT`, alors elle continue sur la ligne suivante. **Chaque chemin a besoin de son `HLT`.**

### 5.3 `BRP`

!!! question "Exercice 10"
    | Ligne | Instruction |
    |:---:|:---|
    | 1 | `INP` |
    | 2 | `SUB dix` |
    | 3 | `BRP grand` |
    | 4 | `LDA zero` |
    | 5 | `OUT` |
    | 6 | `HLT` |
    | 7 | `grand: LDA un` |
    | 8 | `OUT` |
    | 9 | `HLT` |
    | 10 | `dix: DAT 10` |
    | 11 | `zero: DAT 0` |
    | 12 | `un: DAT 1` |

    Sur ton cahier, écris :

    - ce qui s'affiche quand on tape **15**, puis **10**, puis **3** ;
    - en une phrase, ce que fait ce programme.

    **N'ouvre pas le simulateur tant que tu n'as pas écrit tes réponses.**

    ??? success "Correction"
        - 15 donne **1**, 10 donne **1**, 3 donne **0**.
        - Il affiche 1 si le nombre vaut **10 ou plus**, et 0 sinon. La machine ne sait pas comparer : on **enlève** 10, et on regarde si le résultat est positif.

### 5.4 Revenir en arrière : la boucle

!!! question "Exercice 11"
    | Ligne | Instruction |
    |:---:|:---|
    | 1 | `INP` |
    | 2 | `STA cpt` |
    | 3 | `boucle: LDA cpt` |
    | 4 | `BRZ fin` |
    | 5 | `OUT` |
    | 6 | `SUB un` |
    | 7 | `STA cpt` |
    | 8 | `BRA boucle` |
    | 9 | `fin: HLT` |
    | 10 | `cpt: DAT` |
    | 11 | `un: DAT 1` |

    On tape **3**. Sur ton cahier, écris :

    - les nombres affichés, dans l'ordre ;
    - combien de fois la ligne 5 est faite ;
    - ce que contient `cpt` à la fin.

    Puis : qu'est-ce qui se passe si on tape **0** ? Et si on efface la ligne 4 ?

    **N'ouvre pas le simulateur tant que tu n'as pas écrit tes réponses.**

    ??? success "Correction"
        - Affiche **3, 2, 1**.
        - La ligne 5 est écrite **une** fois et faite **trois** fois.
        - `cpt` contient **0** : c'est ce 0 qui fait sauter la ligne 4 vers `fin`.

        Avec **0** : **rien ne s'affiche**, et la machine s'arrête tout de suite. Le test est en tête, donc il est fait **avant** le premier `OUT`.

        Sans la ligne 4 : la machine affiche 3, 2, 1, 0, puis **−1, −2, −3**… et ne s'arrête jamais. Plus rien ne la fait sortir, et `cpt` ne repasse plus par 0.

!!! abstract "Le squelette d'une boucle, toujours le même"
    Toutes les boucles de cette page suivent ces trois temps, **dans cet ordre**. Reprends-le tel quel, même quand tu vois plus court.

    1. **On vérifie la condition de sortie**, tout en haut.
    2. **On fait le corps** de la boucle.
    3. **On boucle**, avec `BRA`.

    ```
    boucle: LDA cpt
            BRZ fin
            ... le corps ...
            BRA boucle
    fin:    HLT
    ```

    Quand la sortie ne se joue pas sur un 0 mais sur une **comparaison**, il n'existe pas de « saute si c'est négatif ». On saute alors **vers le corps** si on continue, et la ligne juste en dessous part vers `fin`.

    ```
    boucle: LDA dix
            SUB cpt
            BRP corps
            BRA fin
    corps:  ... le corps ...
            BRA boucle
    fin:    HLT
    ```

!!! abstract "Deux sortes de sauts"
    - Sauter **en avant**, par-dessus des lignes : la machine choisit un chemin. En Python, ce sera `if`.
    - Sauter **en arrière** : la machine refait les mêmes lignes. En Python, ce sera `while`.

## 6. Écrire des programmes

Dans l'ordre. Chaque défi ajoute **une seule** difficulté.

Pour chacun : écris ton programme **sur ton cahier**, puis tape-le et teste-le dans le simulateur.

**C'est le simulateur qui te dit si ça marche, pas la correction.** Si ça ne marche pas, reprends ton programme ligne par ligne avec la **deuxième table**, celle que tu auras à l'évaluation. Chaque instruction fait **ce qui est écrit dans la table, et rien d'autre**.

!!! warning "La correction s'ouvre en dernier"
    Avant de l'ouvrir, écris sur ton cahier, en une phrase, **ce que ton programme fait et qui n'est pas ce que tu voulais**.

    Et si ton programme marche mais ne ressemble pas à la correction, il est juste quand même : il y a plusieurs façons d'écrire chacun de ces défis.

### Sans saut

!!! question "Défi 1"
    Demander un nombre et l'afficher.

    ??? success "Correction"
        ```
                INP             // lire un nombre
                OUT             // l'afficher
                HLT
        ```

!!! question "Défi 2"
    Demander un nombre et l'afficher **deux fois**.

    ??? success "Correction"
        ```
                INP             // lire un nombre
                OUT             // l'afficher
                OUT             // OUT ne vide pas l'accumulateur : on peut recommencer
                HLT
        ```

!!! question "Défi 3"
    Demander deux nombres, et afficher **le second, puis le premier**.

    ??? tip "Indice"
        Le deuxième `INP` écrase le premier nombre. Range-le avant.

    ??? success "Correction"
        ```
                INP             // les deux nombres, d'abord
                STA a
                INP
                STA b

                LDA b           // puis on affiche, le second en premier
                OUT
                LDA a
                OUT

                HLT

        a:      DAT
        b:      DAT
        ```

!!! question "Défi 4"
    Demander deux nombres et afficher leur **somme**.

    ??? success "Correction"
        ```
                INP             // les deux nombres, d'abord
                STA a
                INP
                STA b

                LDA a           // puis on calcule
                ADD b
                OUT

                HLT

        a:      DAT
        b:      DAT
        ```

!!! question "Défi 5"
    Demander deux nombres et afficher **le premier moins le second**.

    ??? tip "Indice"
        Au moment du `SUB`, c'est le **premier** nombre qui doit être dans l'accumulateur.

    ??? success "Correction"
        Le résultat peut être négatif : avec 4 puis 9, la machine affiche **−5**. Mais la case, elle, contient **9995**, c'est-à-dire 10000 − 5. Le signe n'est écrit nulle part : la machine a simplement décidé que tout mot à partir de 5000 se lit comme un négatif. Tu retrouveras exactement cette idée en binaire, au chapitre **Représentation de l'information**.

        ```
                INP             // le premier nombre
                STA a

                INP             // le second nombre
                STA b

                LDA a           // c'est le PREMIER qui doit être dans l'accumulateur
                SUB b           // avant d'enlever le second
                OUT

                HLT

        a:      DAT
        b:      DAT
        ```

!!! question "Défi 6"
    Demander un nombre et afficher son **triple**. La machine ne sait pas multiplier.

    ??? tip "Indice"
        Le triple de 7, c'est 7 + 7 + 7.

    ??? success "Correction"
        ```
                INP             // le nombre, d'abord
                STA n

                LDA n           // puis on calcule : n + n + n
                ADD n
                ADD n
                OUT

                HLT

        n:      DAT
        ```

### Avec un saut

!!! question "Défi 7"
    Demander un nombre. Afficher **1** s'il vaut 0 ou plus, **0** s'il est négatif.

    ??? tip "Indice"
        Regarde l'exercice 10. Les nombres 0 et 1 doivent exister dans des cases : `zero: DAT 0` et `un: DAT 1`.

    ??? success "Correction"
        ```
                INP
                BRP positif     // 0 ou plus : aller sur l'autre chemin

                LDA zero        // chemin du nombre négatif
                OUT
                HLT             // chaque chemin a besoin de son HLT

        positif: LDA un         // chemin du nombre positif ou nul
                OUT
                HLT

        zero:   DAT 0
        un:     DAT 1
        ```

!!! question "Défi 8"
    Demander deux nombres. Afficher **1** s'ils sont **égaux**, **0** sinon.

    ??? tip "Indice"
        Deux nombres sont égaux quand l'un moins l'autre vaut 0.

    ??? success "Correction"
        ```
                INP             // les deux nombres, d'abord
                STA a
                INP
                STA b

                LDA b           // puis on compare : deux nombres égaux
                SUB a           // donnent une différence nulle
                BRZ egal

                LDA zero        // chemin des nombres différents
                OUT
                HLT

        egal:   LDA un          // chemin des nombres égaux
                OUT
                HLT

        a:      DAT
        b:      DAT
        zero:   DAT 0
        un:     DAT 1
        ```

!!! question "Défi 9"
    Demander deux nombres et afficher **le plus grand**.

    ??? tip "Indice léger"
        Calcule le second moins le premier, et regarde le signe avec `BRP`.

    ??? tip "Indice précis"
        Range les deux nombres dans `a` et `b`. Si `b − a` vaut 0 ou plus, on saute vers un morceau qui affiche `b`. Sinon, on affiche `a`. Chaque morceau finit par son `HLT`.

    ??? success "Correction"
        ```
                INP             // les deux nombres, d'abord
                STA a
                INP
                STA b

                LDA b           // puis on compare : la machine ne sait pas comparer,
                SUB a           // elle enlève et regarde le signe
                BRP affB

                LDA a           // b - a est négatif : a est le plus grand
                OUT
                HLT

        affB:   LDA b           // b - a est positif ou nul : b est le plus grand
                OUT
                HLT

        a:      DAT
        b:      DAT
        ```

!!! question "Défi 10"
    Demander trois nombres et afficher **le plus grand**.

    ??? tip "Indice léger"
        D'abord lire les **trois** nombres et les ranger. Ensuite seulement chercher le plus grand : une case `max` garde le plus grand **vu jusqu'ici**, et le premier nombre y va directement.

    ??? tip "Indice précis"
        Pour chaque nouveau nombre : nombre moins `max`. Si c'est 0 ou plus, le nombre va dans `max`. On n'affiche **qu'une fois, à la fin**.

    ??? success "Correction"
        ```
                INP             // les trois nombres, d'abord
                STA a
                INP
                STA b
                INP
                STA c

                LDA a           // puis on cherche le maximum :
                STA max         // a est le plus grand vu jusqu'ici

                LDA b           // b - max
                SUB max
                BRP bGagne      // positif ou nul : b prend la place
                BRA testC

        bGagne: LDA b
                STA max

        testC:  LDA c           // c - max, le même test avec le troisième
                SUB max
                BRP cGagne
                BRA fin

        cGagne: LDA c
                STA max

        fin:    LDA max         // on n'affiche qu'une fois, à la fin
                OUT
                HLT

        a:      DAT
        b:      DAT
        c:      DAT
        max:    DAT
        ```

### Avec une boucle

!!! question "Défi 11"
    Afficher 10, 9, 8, … jusqu'à 1.

    ??? tip "Indice"
        C'est l'exercice 11, sans le `INP` : le compteur part de 10.

    ??? success "Correction"
        ```
                LDA dix         // le compteur part de 10
                STA cpt

        boucle: LDA cpt         // 1. la condition de sortie
                BRZ fin

                OUT             // 2. le corps : afficher, puis descendre d'un
                SUB un
                STA cpt

                BRA boucle      // 3. on boucle

        fin:    HLT

        cpt:    DAT
        dix:    DAT 10
        un:     DAT 1
        ```

!!! question "Défi 12"
    Afficher 1, 2, 3, … jusqu'à 10.

    ??? tip "Indice léger"
        Le compteur ne passe jamais par 0, donc `BRZ` ne peut pas décider seul. On continue tant que **10 moins le compteur** est positif ou nul.

    ??? tip "Indice précis"
        Ce test écrase l'accumulateur : le compteur vit dans une case `cpt`, et il faut le **recharger** dans le corps. C'est le second squelette de la partie 5.4.

    ??? success "Correction"
        ```
                LDA un          // le compteur part de 1
                STA cpt

        boucle: LDA dix         // 1. la condition de sortie : on continue tant que
                SUB cpt         //    10 - compteur est positif ou nul
                BRP corps
                BRA fin

        corps:  LDA cpt         // 2. le corps : afficher, puis monter d'un
                OUT
                ADD un
                STA cpt

                BRA boucle      // 3. on boucle

        fin:    HLT

        cpt:    DAT
        un:     DAT 1
        dix:    DAT 10
        ```

!!! question "Défi 13"
    Demander un nombre, et afficher sa **table de multiplication** de 1 à 10. On tape 7 : affiche 7, 14, 21, … 70.

    ??? tip "Indice léger"
        C'est le défi 12, avec une case `res` en plus : à chaque tour, on lui ajoute le nombre tapé.

    ??? tip "Indice précis"
        Deux cases à tenir, `res` et `cpt`, et un seul accumulateur. Avant de charger l'une, **range** l'autre.

    ??? success "Correction"
        ```
                INP             // le nombre tapé
                STA n
                STA res         // le premier multiple, c'est le nombre lui-même

                LDA un          // le compteur part de 1
                STA cpt

        boucle: LDA dix         // 1. la condition de sortie : dix multiples en tout
                SUB cpt
                BRP corps
                BRA fin

        corps:  LDA res         // 2. le corps : afficher le multiple courant,
                OUT
                ADD n           //    puis préparer le suivant
                STA res

                LDA cpt         //    et avancer le compteur
                ADD un
                STA cpt

                BRA boucle      // 3. on boucle

        fin:    HLT

        n:      DAT
        res:    DAT
        cpt:    DAT
        un:     DAT 1
        dix:    DAT 10
        ```

!!! question "Défi 14"
    Demander un nombre N, et afficher 1 + 2 + … + N. On tape 5 : affiche 15.

    ??? tip "Indice léger"
        Un compteur part de N et descend jusqu'à 1. À chaque tour, on l'ajoute à une case `somme`.

    ??? tip "Indice précis"
        Le test est en tête : charger `cpt`, sortir s'il vaut 0. Dans le corps : charger `somme`, ajouter `cpt`, ranger `somme`, puis enlever 1 à `cpt`. Afficher **une seule fois, à la sortie**.

    ??? success "Correction"
        ```
                INP             // le nombre N
                STA cpt

        boucle: LDA cpt         // 1. la condition de sortie
                BRZ fin

                LDA somme       // 2. le corps : ajouter le compteur à la somme
                ADD cpt
                STA somme

                LDA cpt         //    puis descendre d'un
                SUB un
                STA cpt

                BRA boucle      // 3. on boucle

        fin:    LDA somme       // on n'affiche qu'une fois, à la sortie
                OUT
                HLT

        cpt:    DAT
        somme:  DAT 0
        un:     DAT 1
        ```

### Avec un peu de tout

!!! question "Défi 15 : la multiplication"
    Demander deux nombres et afficher leur **produit**. On tape 6 puis 7 : affiche 42.

    Les deux nombres tapés sont positifs, et leur produit ne dépasse pas 4999.

    ??? tip "Indice léger"
        C'est le défi 6, le triple. Mais cette fois, le nombre de fois qu'on ajoute est **tapé au clavier**, il n'est pas connu d'avance.

    ??? tip "Indice précis"
        Une case `res` part de 0, une case `cpt` part du second nombre. À chaque tour : ajouter le premier nombre à `res`, puis enlever 1 à `cpt`. On sort quand `cpt` vaut 0, et on affiche `res` **une seule fois, à la fin**.

!!! question "Défi 16 : la division euclidienne"
    Demander deux nombres, et afficher le **quotient**, puis le **reste** de la division euclidienne du premier par le second. On tape 17 puis 5 : affiche 3, puis 2.

    Les deux nombres tapés sont positifs, et le second n'est pas 0.

    ??? tip "Indice léger"
        La machine ne sait pas diviser, comme elle ne savait pas multiplier au défi 6. Combien de fois peut-on enlever 5 à 17 avant de passer en négatif ?

    ??? tip "Indice précis"
        Une case `reste` part du premier nombre, une case `quotient` part de 0. Tant que `reste` moins le diviseur est **positif ou nul**, on range ce résultat dans `reste` et on ajoute 1 à `quotient`. On sort de la boucle quand il devient négatif, et on affiche les deux cases **à la fin, une seule fois**.

!!! question "Défi 17 : compter jusqu'au 0"
    Demander des nombres, un par un, jusqu'à ce qu'on tape **0**. Afficher **combien** de nombres ont été tapés avant ce 0. On tape 12, 7, 9, puis 0 : affiche 3.

    ??? tip "Indice léger"
        Dans tous tes programmes jusqu'ici, la boucle savait **d'avance** combien de tours faire. Ici, c'est le nombre tapé qui décide d'arrêter.

    ??? tip "Indice précis"
        `INP` met le nombre tapé dans l'accumulateur : `BRZ` peut donc le tester **tout de suite**, sans le ranger nulle part. Si ce n'est pas 0, on ajoute 1 à une case `n`, et on revient au `INP`. On affiche `n` à la sortie.

!!! question "Défi 18 : la suite de Fibonacci"
    Chaque terme est la **somme des deux précédents** : 1, 1, 2, 3, 5, 8, 13, 21, et ainsi de suite. Demander un nombre N, et afficher les N premiers termes. On tape 8 : affiche 1, 1, 2, 3, 5, 8, 13, 21.

    N est compris entre 1 et 19. Au-delà, les termes sortent de ce que la machine sait afficher, et elle se met à annoncer des nombres négatifs sans prévenir.

    ??? tip "Indice léger"
        Il faut garder **deux** termes en même temps, et il n'y a qu'un accumulateur. Relis l'exercice 3 : pourquoi l'échange y échouait-il ?

    ??? tip "Indice précis"
        Trois cases, `a`, `b`, et une case de passage `t`. À chaque tour : afficher `b`, calculer `a + b` et le ranger dans `t`, puis ranger `b` dans `a` et `t` dans `b`. Un compteur part de N et descend jusqu'à 0.

En Python, tu écriras `6 * 7`, `17 // 5` et `17 % 5` en une ligne chacun. Ici, il n'y a que `ADD` et `SUB`.

## 7. Quand ça ne marche pas

- **Le simulateur fait l'ancien programme** : assemble à nouveau.
- **Ça ne s'arrête pas** : un saut en arrière sans sortie, ou un `HLT` qui manque.
- **Une valeur a disparu** : tu as chargé autre chose dans l'accumulateur sans la ranger avant.
- **N'importe quoi, puis ça s'arrête** : la machine est passée sur tes `DAT`. Il manque un `HLT` avant.

Utilise **Step**, et dis ce qui va se passer **avant** de cliquer.

## 8. À retenir

- La machine ne connaît qu'une petite table d'instructions. Elle fait **exactement** ce qui est écrit.
- Il n'y a **qu'un accumulateur** : on range avant de charger autre chose.
- `LDA` et `STA` **copient** : la case, ou l'accumulateur, garde sa valeur.
- Un nom de case, c'est juste un **numéro** que la machine calcule pour toi.
- Sauter en avant, c'est **choisir** ; sauter en arrière, c'est **répéter**.

Une case contient quatre chiffres, de 0000 à 9999. Mais la machine lit tout mot à partir de 5000 comme un **négatif** : le plus grand nombre qu'elle sait afficher est 4999, et le plus petit −5000. Que se passe-t-il quand un calcul sort de là ? C'est la question du chapitre **Représentation de l'information**, où cette idée s'appelle le **complément à 2**.

Ce que la machine voit vraiment, des nombres et rien d'autre, est à la page [Pour aller plus loin](pour-aller-plus-loin.md#7-ce-que-la-machine-voit-vraiment-des-nombres).
