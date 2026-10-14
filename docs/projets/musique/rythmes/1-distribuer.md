# Distribuer et rassembler

!!! warning "En construction"
    Cette activité est en cours d'écriture : son contenu peut encore changer.

Avant de fabriquer des rythmes, tu écris deux fonctions qui serviront tout au long du projet. Elles font ce que fait un joueur de cartes : **distribuer** un paquet entre plusieurs joueurs, puis **ramasser** les mains pour reconstituer le paquet.

Crée un répertoire `projet_rythmes`, et dedans deux fichiers :

- `rythmes.py`, pour tes fonctions,
- `rythmes_test.py`, pour tes fonctions de test. Il commence par `from rythmes import *`, qui importe toutes tes fonctions.

## Étape 1 - Distribuer à la main

On distribue un paquet comme autour d'une table : une carte à chaque joueur, chacun son tour, et on recommence jusqu'à ce que le paquet soit épuisé. Ici le paquet est une chaîne, et chaque carte est une lettre. Un joueur lit sa main dans l'ordre où il a reçu ses cartes.

!!! question "Distribuer le paquet `"ABCDEFGHIJ"` (obligatoire)"
    Sur ton cahier, écris la main de chaque joueur :

    - quand on distribue à 3 joueurs,
    - quand on distribue à 4 joueurs.

    ??? success "Réponse"
        - 3 joueurs : `"ADGJ"`, `"BEH"`, `"CFI"`.
        - 4 joueurs : `"AEI"`, `"BFJ"`, `"CG"`, `"DH"`.

!!! question "Qui reçoit quelle carte ? (obligatoire)"
    Les cartes sont numérotées à partir de 0 : `"A"` est la carte 0, `"J"` la carte 9. Les joueurs aussi : le premier servi est le joueur 0. Dans sa main, la première carte reçue est à la place 0.

    On distribue `"ABCDEFGHIJ"` à 3 joueurs. Recopie et complète ce tableau sur ton cahier.

    | carte `i` | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
    |---|---|---|---|---|---|---|---|---|---|---|
    | joueur | | | | | | | | | | |
    | place dans sa main | | | | | | | | | | |

    Puis écris, en Python, l'expression qui donne le **joueur** à partir de `i` et du nombre de joueurs `n`, et celle qui donne la **place** de la carte dans sa main.

    ??? tip "Indice"
        Regarde la ligne « joueur » : tous les combien se répète-t-elle ? Puis la ligne « place » : tous les combien augmente-t-elle de 1 ? Fais le même tableau à 4 joueurs et compare.

    ??? success "Réponse"
        | carte `i` | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
        |---|---|---|---|---|---|---|---|---|---|---|
        | joueur | 0 | 1 | 2 | 0 | 1 | 2 | 0 | 1 | 2 | 0 |
        | place dans sa main | 0 | 0 | 0 | 1 | 1 | 1 | 2 | 2 | 2 | 3 |

        Le joueur est `i % n`, la place est `i // n`. Vérification sur la carte 9 : joueur `9 % 3 = 0`, place `9 // 3 = 3`, et `"ADGJ"` a bien `"J"` à la place 3.

## Étape 2 - Écrire `distribuer`

!!! question "La fonction `distribuer` (obligatoire)"
    Dans `rythmes.py`, écris le corps de cette fonction :

    ```python
    def distribuer(texte: str, n: int) -> list[str]:
        """Distribue les caractères de texte entre n paquets, à chacun son tour.
        Le premier caractère va dans le paquet 0, le suivant dans le paquet 1, et ainsi de suite.
        Précondition : n > 0.
        """
        ...
    ```

    Dans `rythmes_test.py`, recopie ce test et complète les deux dernières lignes avant de le lancer :

    ```python
    def test_distribuer() -> None:
        assert distribuer("ABCDEFGHIJ", 3) == ["ADGJ", "BEH", "CFI"]
        assert distribuer("ABCDEFGHIJ", 4) == ["AEI", "BFJ", "CG", "DH"]
        assert distribuer("ABC", 1) == ["ABC"]
        # plus de joueurs que de cartes :
        assert distribuer("AB", 4) == ...
        # paquet vide :
        assert distribuer("", 3) == ...
    ```

    ??? tip "Indice léger"
        Avant la distribution, chaque joueur a une main vide. Combien de mains dois-tu créer, et que contient chacune au départ ?

    ??? tip "Indice plus précis"
        `[""] * n` crée une liste de `n` chaînes vides. Parcours ensuite les indices de `texte` : le caractère d'indice `i` s'ajoute au bout de la main du joueur qui le reçoit. L'exercice « Qui reçoit quelle carte ? » te dit lequel.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def distribuer(texte: str, n: int) -> list[str]:
            """Distribue les caractères de texte entre n paquets, à chacun son tour.
            Le premier caractère va dans le paquet 0, le suivant dans le paquet 1, et ainsi de suite.
            Précondition : n > 0.
            """
            assert n > 0, "n doit être strictement positif"
            resultat = [""] * n
            for i in range(0, len(texte)):
                resultat[i % n] = resultat[i % n] + texte[i]
            return resultat
        ```

        Les deux lignes à compléter du test : `["A", "B", "", ""]` et `["", "", ""]`. Il y a toujours `n` mains, même vides.

## Étape 3 - Rassembler

La partie est finie, on ramasse. Pour reconstituer le paquet d'origine, on reprend la première carte de chaque main, du joueur 0 au dernier, puis la deuxième carte de chaque main, et ainsi de suite.

!!! question "Rassembler à la main (obligatoire)"
    On ramasse les mains `["ADGJ", "BEH", "CFI"]`. Sur ton cahier, sans reconstituer tout le paquet :

    - la carte numéro 7 du paquet : chez quel joueur est-elle, à quelle place, et quelle lettre est-ce ?
    - même question pour la carte numéro 9.

    ??? success "Réponse"
        - Carte 7 : joueur `7 % 3 = 1`, place `7 // 3 = 2`. C'est `"BEH"` à la place 2, donc `"H"`.
        - Carte 9 : joueur `9 % 3 = 0`, place `9 // 3 = 3`. C'est `"ADGJ"` à la place 3, donc `"J"`.

        Ce sont les deux expressions de l'étape 1, lues dans l'autre sens : pour retrouver la carte `i`, on va la chercher là où `distribuer` l'avait mise.

!!! question "La fonction `rassembler` (obligatoire)"
    Écris le corps de cette fonction :

    ```python
    def rassembler(paquets: list[str]) -> str:
        """Réciproque de distribuer : reconstitue le texte que distribuer
        a réparti dans paquets.
        Précondition : paquets contient au moins un paquet, et provient de distribuer.
        """
        ...
    ```

    Recopie et complète ce test :

    ```python
    def test_rassembler() -> None:
        assert rassembler(["ADGJ", "BEH", "CFI"]) == "ABCDEFGHIJ"
        assert rassembler(["A", "B", "", ""]) == "AB"
        # rassembler défait ce que distribuer a fait, quel que soit n :
        for n in range(1, 12):
            assert rassembler(distribuer("ABCDEFGHIJ", n)) == ...
    ```

    ??? tip "Indice léger"
        Le paquet reconstitué a autant de cartes que toutes les mains réunies. Pour chaque numéro de carte `i`, l'exercice précédent te dit où aller la chercher.

    ??? tip "Indice plus précis"
        Calcule d'abord le nombre total de cartes. Puis, pour `i` dans `range(0, total)`, la carte `i` est `paquets[i % n][i // n]`, où `n` est le nombre de paquets.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def rassembler(paquets: list[str]) -> str:
            """Réciproque de distribuer : reconstitue le texte que distribuer
            a réparti dans paquets.
            Précondition : paquets contient au moins un paquet, et provient de distribuer.
            """
            assert len(paquets) > 0, "il faut au moins un paquet"
            n = len(paquets)
            total = 0
            for paquet in paquets:
                total = total + len(paquet)
            resultat = ""
            for i in range(0, total):
                resultat = resultat + paquets[i % n][i // n]
            return resultat
        ```

        Compare avec `distribuer` : la même boucle sur `i`, les mêmes `i % n`. L'une **range** la carte `i` dans la main `i % n`, l'autre l'y **reprend**.

!!! question "Des mains qui ne viennent pas d'une distribution (entraînement)"
    Lis ce code. Que se passe-t-il quand on l'exécute ? Écris ta réponse sur ton cahier, puis explique pourquoi aucune distribution ne peut produire ces deux mains.

    **Ne lance pas ce code tant que tu n'as pas écrit ta réponse.**

    ```python
    print(rassembler(["AB", "CDE"]))
    ```

    ??? success "Réponse"
        Une erreur `IndexError`. Il y a 5 cartes en tout, et pour `i = 4` la fonction cherche `paquets[0][2]`, alors que `"AB"` n'a que deux cartes.

        Dans une distribution, le joueur 0 est servi en premier : sa main n'est **jamais plus courte** que celle des autres. Ici elle l'est, donc ces mains ne proviennent pas de `distribuer`, et la précondition de `rassembler` n'est pas respectée.

Tu as maintenant les deux fonctions du projet. La suite : [les rythmes euclidiens](2-rythmes.md).
