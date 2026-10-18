# Rythmes euclidiens

!!! warning "En construction"
    Cette activité est en cours d'écriture : son contenu peut encore changer.

Un rythme qui se répète se note par une chaîne : une case par unité de temps, `"x"` quand on frappe, `"."` quand on se tait. La ligne de basse de *Hound Dog*, chantée par Elvis Presley, joue `"x..x..x."` : c'est le **tresillo**, l'un des rythmes les plus célèbres au monde, qu'on entend aussi bien à Cuba qu'en Afrique de l'Ouest.

Ce rythme répartit 3 frappes dans 8 cases **le plus régulièrement possible**. En 2005, le chercheur Godfried Toussaint a montré qu'un algorithme vieux de plus de 2000 ans, celui d'Euclide pour le PGCD, fabrique ces rythmes, et qu'on les retrouve dans des musiques traditionnelles du monde entier. On les appelle **rythmes euclidiens**, et on note $E(k, n)$ celui qui répartit $k$ frappes dans $n$ cases.

Dans ce projet, tu écris la fonction `euclidien(k, n)`, puis tu écoutes ce qu'elle produit. Tes fonctions vont dans `rythmes.py`, à la suite de `distribuer` et `rassembler` ([préambule](1-distribuer.md)), et tes tests dans `rythmes_test.py`.

## Étape 1 - Répartir à la main

!!! question "Le plus régulièrement possible (obligatoire)"
    Sur ton cahier :

    1. Place 4 frappes dans 8 cases, le plus régulièrement possible, en commençant par une frappe.
    2. Même chose avec 3 frappes dans 8 cases. Note l'écart entre deux frappes successives, sans oublier l'écart entre la dernière frappe et la première du tour suivant, puisque le rythme se répète.

    ??? success "Réponse"
        1. `"x.x.x.x."` : les quatre écarts valent 2.
        2. Les écarts ne peuvent pas être tous égaux, puisque 8 n'est pas divisible par 3. Le mieux possible est qu'ils ne diffèrent que de 1 : deux écarts de 3 et un de 2, par exemple `"x..x..x."`. C'est le tresillo.

## Étape 2 - L'algorithme, à la main

Pour 3 ou 4 frappes on trouve à tâtons. Pour 7 frappes dans 16 cases, il faut une méthode. La voici.

- Au départ, on a $k$ groupes `"x"` suivis de $n - k$ groupes `"."`, et on pose $m = k$.
- On **distribue** les groupes entre $m$ paquets, exactement comme `distribuer` distribue des cartes : chaque paquet est la concaténation des groupes qu'il a reçus. Les paquets obtenus deviennent les nouveaux groupes.
- Le nouveau $m$ est le **reste** de la division de l'ancien nombre de groupes par l'ancien $m$.
- On s'arrête quand $m$ vaut 0, ou quand le nombre de groupes dépasse $m$ d'au plus 1. On colle alors les groupes bout à bout.

Voici le déroulement complet pour $E(5, 13)$ :

```
groupes = ["x", "x", "x", "x", "x", ".", ".", ".", ".", ".", ".", ".", "."]     m = 5
13 groupes, 13 - 5 = 8 : on continue. On distribue en 5 paquets.

groupes = ["x..", "x..", "x..", "x.", "x."]                                  m = 13 % 5 = 3
5 groupes, 5 - 3 = 2 : on continue. On distribue en 3 paquets.

groupes = ["x..x.", "x..x.", "x.."]                                          m = 5 % 3 = 2
3 groupes, 3 - 2 = 1 : on s'arrête.

résultat : "x..x.x..x.x.."
```

!!! question "Dérouler l'algorithme (obligatoire)"
    Sur ton cahier, déroule l'algorithme comme ci-dessus, en écrivant à chaque étape la liste des groupes et la valeur de $m$ :

    1. pour $E(3, 8)$,
    2. pour $E(5, 8)$.

    ??? success "Réponse"
        $E(3, 8)$ :

        ```
        groupes = ["x", "x", "x", ".", ".", ".", ".", "."]    m = 3
        groupes = ["x..", "x..", "x."]                        m = 8 % 3 = 2
        3 - 2 = 1 : on s'arrête.          résultat : "x..x..x."
        ```

        $E(5, 8)$ :

        ```
        groupes = ["x", "x", "x", "x", "x", ".", ".", "."]    m = 5
        groupes = ["x.", "x.", "x.", "x", "x"]                m = 8 % 5 = 3
        groupes = ["x.x", "x.x", "x."]                        m = 5 % 3 = 2
        3 - 2 = 1 : on s'arrête.          résultat : "x.xx.xx."
        ```

        Le premier est le tresillo. Le second est le **cinquillo**, autre rythme cubain, que l'on frappe dans les mains dans *Hound Dog*.

## Étape 3 - Pourquoi « euclidien »

Regarde les couples (nombre de groupes, $m$) de l'exemple : $(13, 5)$, puis $(5, 3)$, puis $(3, 2)$. Chaque couple est formé du second nombre du couple précédent et du reste de la division du premier par le second. C'est exactement l'algorithme d'Euclide qui calcule $\text{pgcd}(13, 5)$ :

$$\text{pgcd}(13, 5) = \text{pgcd}(5, 3) = \text{pgcd}(3, 2) = \text{pgcd}(2, 1) = \text{pgcd}(1, 0) = 1$$

Le rythme s'arrête simplement un peu plus tôt.

!!! question "La fonction `pgcd` (obligatoire)"
    Écris une fonction **récursive** `pgcd`, sans boucle, qui suit cette règle : $\text{pgcd}(a, 0) = a$, et sinon $\text{pgcd}(a, b) = \text{pgcd}(b, a \bmod b)$.

    ```python
    def pgcd(a: int, b: int) -> int:
        """Plus grand commun diviseur de a et b, par l'algorithme d'Euclide.
        Précondition : a >= 0 et b >= 0.
        """
        ...


    def test_pgcd() -> None:
        assert pgcd(13, 5) == 1
        assert pgcd(12, 8) == 4
        assert pgcd(7, 0) == 7
    ```

    ??? success "Solution"
        ```python
        def pgcd(a: int, b: int) -> int:
            """Plus grand commun diviseur de a et b, par l'algorithme d'Euclide.
            Précondition : a >= 0 et b >= 0.
            """
            if b == 0:
                return a
            return pgcd(b, a % b)
        ```

## Étape 4 - Écrire `euclidien`

!!! question "Distribuer des groupes (obligatoire)"
    `distribuer` répartit les **caractères** d'une chaîne. L'algorithme répartit les **éléments** d'une liste de chaînes. Copie `distribuer`, renomme-la `distribuer_groupes`, et donne-lui cette signature :

    ```python
    def distribuer_groupes(groupes: list[str], n: int) -> list[str]:
    ```

    Quelle ligne du corps faut-il modifier, en dehors du nom du paramètre ? Écris ta réponse sur ton cahier, puis lance ce test.

    **Ne lance pas ce code tant que tu n'as pas écrit ta réponse.**

    ```python
    def test_distribuer_groupes() -> None:
        assert distribuer_groupes(["x..", "x..", "x..", "x.", "x."], 3) == ["x..x.", "x..x.", "x.."]
        assert distribuer_groupes(["x", "x", "."], 3) == ["x", "x", "."]
    ```

    ??? success "Réponse"
        Aucune. `texte[i]` était un caractère, `groupes[i]` est une chaîne, et `+` colle deux chaînes dans les deux cas. C'est le même algorithme, appliqué à d'autres cartes.

!!! question "Coller les groupes (obligatoire)"
    Écris la fonction `concatener` et son test. Le test vérifie au moins l'exemple de l'étape 2 et la liste vide.

    ```python
    def concatener(groupes: list[str]) -> str:
        """Colle bout à bout les chaînes de groupes, dans l'ordre."""
        ...
    ```

    ??? success "Solution"
        ```python
        def concatener(groupes: list[str]) -> str:
            """Colle bout à bout les chaînes de groupes, dans l'ordre."""
            resultat = ""
            for groupe in groupes:
                resultat = resultat + groupe
            return resultat


        def test_concatener() -> None:
            assert concatener(["x..x.", "x..x.", "x.."]) == "x..x.x..x.x.."
            assert concatener([]) == ""
        ```

!!! question "Regrouper (obligatoire)"
    Écris une fonction **récursive** `regrouper`, qui déroule l'algorithme de l'étape 2 à partir d'une liste de groupes et d'une valeur de $m$, et renvoie les groupes au moment de l'arrêt.

    ```python
    def regrouper(groupes: list[str], m: int) -> list[str]:
        """Déroule l'algorithme des rythmes euclidiens à partir de groupes et de m,
        et renvoie les groupes obtenus à l'arrêt.
        Précondition : 0 <= m <= len(groupes).
        """
        ...


    def test_regrouper() -> None:
        assert regrouper(["x"] * 5 + ["."] * 8, 5) == ["x..x.", "x..x.", "x.."]
        assert regrouper(["x"] * 3 + ["."] * 5, 3) == ["x..", "x..", "x."]
        # arrêt immédiat : 4 groupes, 4 - 3 = 1
        assert regrouper(["x", "x", "x", "."], 3) == ["x", "x", "x", "."]
        # arrêt immédiat : m vaut 0
        assert regrouper([".", ".", ".", "."], 0) == [".", ".", ".", "."]
    ```

    ??? tip "Indice léger"
        Pose `pgcd` à côté. Dans `pgcd`, qu'est-ce qui décide de l'arrêt, et avec quoi se fait l'appel récursif ? Cherche la même chose dans l'algorithme de l'étape 2.

    ??? tip "Indice plus précis"
        Cas d'arrêt : `m == 0`, ou `len(groupes) - m <= 1`. On renvoie alors `groupes` tels quels. Sinon, on rappelle `regrouper` avec les groupes distribués en `m` paquets et avec `len(groupes) % m`.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **ton** code ?

    ??? success "Solution"
        ```python
        def regrouper(groupes: list[str], m: int) -> list[str]:
            """Déroule l'algorithme des rythmes euclidiens à partir de groupes et de m,
            et renvoie les groupes obtenus à l'arrêt.
            Précondition : 0 <= m <= len(groupes).
            """
            if m == 0 or len(groupes) - m <= 1:
                return groupes
            return regrouper(distribuer_groupes(groupes, m), len(groupes) % m)
        ```

        Compare ligne à ligne avec `pgcd` : un cas d'arrêt, puis un seul appel récursif dont le second argument est un reste de division.

!!! question "La fonction `euclidien` (obligatoire)"
    Écris `euclidien` à l'aide de `regrouper` et `concatener`.

    ```python
    def euclidien(k: int, n: int) -> str:
        """Rythme euclidien E(k, n) : k frappes réparties dans n cases.
        Précondition : n > 0 et 0 <= k <= n.
        """
        ...


    def test_euclidien() -> None:
        assert euclidien(3, 8) == "x..x..x."
        assert euclidien(5, 8) == "x.xx.xx."
        assert euclidien(5, 13) == "x..x.x..x.x.."
        assert euclidien(4, 8) == "x.x.x.x."
        assert euclidien(0, 4) == "...."
        assert euclidien(4, 4) == "xxxx"
    ```

    ??? success "Solution"
        ```python
        def euclidien(k: int, n: int) -> str:
            """Rythme euclidien E(k, n) : k frappes réparties dans n cases.
            Précondition : n > 0 et 0 <= k <= n.
            """
            assert n > 0 and 0 <= k <= n, "il faut n > 0 et 0 <= k <= n"
            return concatener(regrouper(["x"] * k + ["."] * (n - k), k))
        ```

## Étape 5 - Comparer avec la table de Toussaint

Toussaint donne une liste de rythmes euclidiens joués dans des musiques traditionnelles. En voici une partie.

| rythme | chaîne | où on le joue |
|---|---|---|
| $E(2, 5)$ | `"x.x.."` | rythme persan du XIII<sup>e</sup> siècle |
| $E(3, 4)$ | `"x.xx"` | cumbia, Colombie |
| $E(4, 9)$ | `"x.x.x.x.."` | aksak, Turquie |
| $E(5, 12)$ | `"x..x.x..x.x."` | chant d'enfants venda, Afrique du Sud |
| $E(7, 12)$ | `"x.xx.x.xx.x."` | cloche d'Afrique de l'Ouest |
| $E(5, 16)$ | `"x..x..x..x..x..."` | bossa-nova, Brésil |
| $E(9, 16)$ | `"x.xx.x.x.xx.x.x."` | République centrafricaine |

!!! question "Ta fonction contre la table (obligatoire)"
    Sur ton cahier, prédis : `euclidien(7, 12)` renvoie-t-il la chaîne de la table ? Puis vérifie dans la console.

    ??? success "Réponse"
        Non : `euclidien(7, 12)` renvoie `"x.xx.x.x.xx."`. Écris les deux chaînes l'une sous l'autre : elles ont les mêmes écarts entre frappes, `2 1 2 2 2 1 2` pour la tienne, `2 1 2 2 1 2 2` pour celle de la table. C'est la **même boucle de 12 cases**, commencée à un endroit différent.

        Un rythme qui se répète n'a pas de début : le musicien entre dans la boucle où il veut. Toussaint le dit lui-même à propos de l'arrêt de l'algorithme : puisque le rythme est cyclique, continuer d'une étape ne change que l'endroit où l'on commence. Notre version ne s'arrête pas toujours au même moment que la sienne, et certains rythmes de sa table sont eux-mêmes donnés à partir d'une autre case.

On dit que deux rythmes de même longueur sont des **rotations** l'un de l'autre quand l'un est l'autre commencé à une autre case. Par exemple `"xx.x"` est `"x.xx"` commencé à la case 3.

!!! question "La fonction `rotation` (obligatoire)"
    ```python
    def rotation(rythme: str, d: int) -> str:
        """Le rythme commencé à la case d.
        Précondition : 0 <= d < len(rythme).
        """
        ...


    def test_rotation() -> None:
        assert rotation("x.xx", 0) == "x.xx"
        assert rotation("x.xx", 1) == ".xxx"
        assert rotation("x.xx", 3) == "xx.x"
    ```

    ??? tip "Indice"
        Le résultat est fait de deux tranches de `rythme` : de la case `d` jusqu'à la fin, puis du début jusqu'à la case `d` exclue.

    ??? success "Solution"
        ```python
        def rotation(rythme: str, d: int) -> str:
            """Le rythme commencé à la case d.
            Précondition : 0 <= d < len(rythme).
            """
            assert 0 <= d < len(rythme), "il faut 0 <= d < len(rythme)"
            return rythme[d:len(rythme)] + rythme[0:d]
        ```

!!! question "La fonction `est_rotation` (obligatoire)"
    Écris `est_rotation`, puis complète son test avec **toute la table** ci-dessus : pour chaque ligne, ta fonction `euclidien` doit donner une rotation de la chaîne de Toussaint.

    ```python
    def est_rotation(r1: str, r2: str) -> bool:
        """Vrai si r2 est r1 commencé à une autre case (ou à la même)."""
        ...


    def test_est_rotation() -> None:
        assert est_rotation("x.xx", "xx.x") == True
        assert est_rotation("x.xx", "x.xx") == True
        assert est_rotation("x.xx", "xx..") == False
        assert est_rotation("x.x", "x.x.") == False
        assert est_rotation(euclidien(7, 12), "x.xx.x.xx.x.") == True
        # à compléter avec les six autres lignes de la table
    ```

    ??? success "Solution"
        ```python
        def est_rotation(r1: str, r2: str) -> bool:
            """Vrai si r2 est r1 commencé à une autre case (ou à la même)."""
            if len(r1) != len(r2):
                return False
            for d in range(0, len(r1)):
                if rotation(r1, d) == r2:
                    return True
            return False
        ```

!!! question "La samba (entraînement)"
    Toussaint donne aussi $E(7, 16)$ comme base de la samba brésilienne, que l'on joue `"x.x..x.x.x..x.x."`. Écris une boucle qui trouve la valeur de `d` telle que `rotation(euclidien(7, 16), d)` donne la samba.

    ??? success "Solution"
        ```python
        samba = "x.x..x.x.x..x.x."
        for d in range(0, 16):
            if rotation(euclidien(7, 16), d) == samba:
                print(d)
        ```

        Cette boucle affiche `7`.

## Étape 6 - Deux mains

Un percussionniste qui **alterne** strictement ses mains joue les cases d'indice pair de la main droite, et les cases d'indice impair de la main gauche.

!!! question "La partie de chaque main (obligatoire)"
    Sur ton cahier, sans rien lancer : que renvoie `distribuer("x..x..x.", 2)` ? Laquelle des deux chaînes est la partie de la main droite ?

    ??? success "Réponse"
        `["x..x", ".x.."]`. La première est la main droite (cases 0, 2, 4, 6), la seconde la main gauche (cases 1, 3, 5, 7). Pour le tresillo, la main droite frappe deux fois, la gauche une fois.

!!! question "Composer à deux mains (obligatoire)"
    La main droite joue le tresillo `euclidien(3, 8)`, la main gauche le cinquillo `euclidien(5, 8)`, en alternant.

    1. Écris l'expression Python qui donne le rythme de 16 cases que l'on entend.
    2. Sur ton cahier, prédis la chaîne obtenue, puis vérifie.

    ??? success "Réponse"
        1. `rassembler([euclidien(3, 8), euclidien(5, 8)])`
        2. `"xx...xxx...xxx.."`

## Étape 7 - Écouter

Le fichier [son.py](../son.py), à placer dans `projet_rythmes`, écrit des rythmes dans un fichier son `.wav`. Il n'utilise que la bibliothèque standard : rien à installer. Il contient une seule fonction utile :

- `ecrire_wav(voix: list[str], nom_fichier: str, duree_case: float = 0.15, tours: int = 4) -> None`

`voix` est une liste de rythmes joués **en même temps** (5 au plus), frappés dans les mains. Le fichier est en stéréo : les voix sont réparties de gauche à droite, chacune avec un timbre un peu différent. Chaque rythme recommence au début dès qu'il est fini.

Crée un fichier `ecouter.py` qui commence ainsi :

```python
from rythmes import *
from son import ecrire_wav

ecrire_wav([euclidien(3, 8)], "tresillo.wav")
```

!!! question "Écouter (obligatoire)"
    1. Lance `ecouter.py` et ouvre `tresillo.wav`.
    2. Écris `hound_dog.wav`, où l'on entend ensemble le tresillo et le cinquillo.
    3. Écris le rythme à deux mains de l'étape 6, puis deux rythmes de la table de ton choix.
    4. Écris `euclidien(3, 8)` et `euclidien(4, 8)` ensemble, puis `euclidien(2, 6)` et `euclidien(3, 8)` ensemble. Dans le second cas, les deux rythmes n'ont pas la même longueur : sur ton cahier, prédis au bout de combien de cases ils recommencent leur boucle en même temps, puis écoute.

    ??? success "Réponse à la question 4"
        Une boucle dure 6 cases, l'autre 8. Elles recommencent ensemble au bout de 24 cases, le plus petit multiple commun de 6 et 8 : c'est alors seulement que l'on réentend exactement le même passage.

## Bonus - Les écarts

Toussaint décrit souvent un rythme par la suite de ses écarts : le tresillo s'écrit $(3\,3\,2)$.

!!! question "La fonction `intervalles` (bonus)"
    ```python
    def intervalles(rythme: str) -> list[int]:
        """Écarts successifs entre les frappes de rythme, le dernier écart
        allant de la dernière frappe à la première du tour suivant.
        Précondition : rythme commence par "x".
        """
        ...


    def test_intervalles() -> None:
        assert intervalles("x..x..x.") == [3, 3, 2]
        assert intervalles("x.xx.xx.") == [2, 1, 2, 1, 2]
        assert intervalles("x") == [1]
    ```

    Puis vérifie, pour quelques valeurs de $k$ et $n$, que deux écarts de `euclidien(k, n)` ne diffèrent jamais de plus de 1.

    ??? success "Solution"
        ```python
        def intervalles(rythme: str) -> list[int]:
            """Écarts successifs entre les frappes de rythme, le dernier écart
            allant de la dernière frappe à la première du tour suivant.
            Précondition : rythme commence par "x".
            """
            assert len(rythme) > 0 and rythme[0] == "x", "le rythme doit commencer par une frappe"
            resultat = []
            ecart = 1
            for i in range(1, len(rythme)):
                if rythme[i] == "x":
                    resultat.append(ecart)
                    ecart = 1
                else:
                    ecart = ecart + 1
            resultat.append(ecart)
            return resultat
        ```

??? info "Pour aller plus loin"
    - G. Toussaint, *The Euclidean Algorithm Generates Traditional Musical Rhythms*, actes de la conférence Bridges, 2005. L'article d'où viennent la table et les exemples de cette page.
    - L'algorithme de l'étape 2 n'a pas été inventé pour la musique : E. Bjorklund l'a conçu pour répartir le plus régulièrement possible des impulsions dans la commande d'un accélérateur de particules. Toussaint a remarqué qu'il avait la structure de l'algorithme d'Euclide, décrit dans les *Éléments* (livre VII, proposition 2).
