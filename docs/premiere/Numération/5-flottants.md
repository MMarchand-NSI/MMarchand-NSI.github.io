# Les nombres flottants

!!! question "Préambule : une bizarrerie"
    Ouvrez une console Python et tapez :

    ```python
    >>> 0.1 + 0.2
    ```

    Vous attendez `0.3`. Notez précisément ce que Python répond.

    Puis essayez :

    ```python
    >>> 0.1 + 0.2 == 0.3
    ```

    Le résultat va probablement vous surprendre. Tout ce chapitre sert à comprendre **pourquoi**.

## Le type `float`

En Python, un nombre avec une virgule (que l'on note avec un **point**) est de type `float`, pour *floating point*, « nombre à virgule flottante ».

```python
a: float = 3.14
b: float = 0.5
```

Comme toute information, un flottant est stocké en mémoire sous forme d'une **suite finie de bits**. Ce mot, **finie**, est la clé de toute l'histoire.

## La virgule en binaire

En base 10, après la virgule, chaque position vaut une puissance **négative** de 10 :

$$0{,}375 = 3 \times 10^{-1} + 7 \times 10^{-2} + 5 \times 10^{-3}$$

C'est-à-dire les colonnes des dixièmes, centièmes, millièmes.

En base 2, c'est **exactement le même principe**, avec des puissances de 2 :

| Position après la virgule | 1re | 2e | 3e | 4e |
| --- | --- | --- | --- | --- |
| Poids | $2^{-1}$ | $2^{-2}$ | $2^{-3}$ | $2^{-4}$ |
| Valeur décimale | $0{,}5$ | $0{,}25$ | $0{,}125$ | $0{,}0625$ |

Exemple, le nombre binaire $0{,}11_2$ vaut :

$$0{,}11_2 = 1 \times 2^{-1} + 1 \times 2^{-2} = 0{,}5 + 0{,}25 = 0{,}75$$

!!! question "Lire un binaire à virgule"
    Convertissez en base 10 :

    1. $0{,}1_2$
    2. $0{,}01_2$
    3. $0{,}101_2$
    4. $0{,}0011_2$

    ??? warning "Corrigé"
        1. $0{,}1_2 = 2^{-1} = 0{,}5$
        2. $0{,}01_2 = 2^{-2} = 0{,}25$
        3. $0{,}101_2 = 2^{-1} + 2^{-3} = 0{,}5 + 0{,}125 = 0{,}625$
        4. $0{,}0011_2 = 2^{-3} + 2^{-4} = 0{,}125 + 0{,}0625 = 0{,}1875$

## Convertir un nombre décimal vers le binaire à virgule

Pour la partie après la virgule, on utilise la **méthode des multiplications successives par 2** :
on multiplie par 2, on note la **partie entière** (0 ou 1), on garde la partie après la virgule, et on recommence.

On lit ensuite les chiffres obtenus **de haut en bas**.

!!! example "Cas qui tombe juste : $0{,}25$"
    $$
    \begin{aligned}
    0{,}25 \times 2 &= 0{,}5 &\rightarrow\ &\textbf{0} \\
    0{,}5 \times 2 &= 1{,}0 &\rightarrow\ &\textbf{1} \quad (\text{il reste } 0, \text{ on s'arrête})
    \end{aligned}
    $$

    Lecture de haut en bas : $0{,}25 = 0{,}01_2$. **La représentation est exacte.**

## Le cœur du problème : $0{,}1$ ne tombe jamais juste

!!! danger "Calculons $0{,}1$ en binaire"
    $$
    \begin{aligned}
    0{,}1 \times 2 &= 0{,}2 &\rightarrow\ &\textbf{0} \\
    0{,}2 \times 2 &= 0{,}4 &\rightarrow\ &\textbf{0} \\
    0{,}4 \times 2 &= 0{,}8 &\rightarrow\ &\textbf{0} \\
    0{,}8 \times 2 &= 1{,}6 &\rightarrow\ &\textbf{1} \quad (\text{il reste } 0{,}6) \\
    0{,}6 \times 2 &= 1{,}2 &\rightarrow\ &\textbf{1} \quad (\text{il reste } 0{,}2) \\
    0{,}2 \times 2 &= 0{,}4 &\rightarrow\ &\textbf{0} \quad (\text{on retombe sur } 0{,}2 \text{ ...}) \\
    \end{aligned}
    $$

    On est reparti sur $0{,}2$ : le cycle `0011` va se répéter **à l'infini**.

    $$0{,}1 = 0{,}0001100110011001100110011\ldots_2$$

C'est la même situation que $\dfrac{1}{3}$ en base 10, qui s'écrit $0{,}3333\ldots$ sans jamais s'arrêter. Selon la base choisie, certains nombres simples deviennent infinis. Le nombre ne change pas, c'est seulement son écriture qui dépend de la base : $0{,}1$ a une écriture finie en base 10, mais aucune en base 2.

!!! question "À votre tour : $\frac{1}{3}$ en binaire"
    Appliquez la méthode des multiplications par 2 à $0{,}333\ldots$ (on prendra $1/3$). Que constatez-vous ?

    ??? warning "Corrigé"
        $$
        \begin{aligned}
        \tfrac{1}{3} \times 2 &= \tfrac{2}{3} \approx 0{,}666 &\rightarrow\ &\textbf{0} \\
        \tfrac{2}{3} \times 2 &= \tfrac{4}{3} = 1 + \tfrac{1}{3} &\rightarrow\ &\textbf{1} \quad (\text{il reste } \tfrac{1}{3}) \\
        \end{aligned}
        $$
        On retombe sur $1/3$ : le motif `01` se répète à l'infini. $\dfrac{1}{3} = 0{,}010101\ldots_2$. Là encore, c'est infini.

## La conséquence : une valeur approchée

La mémoire ne dispose que d'un **nombre fini** de bits pour un flottant. Or $0{,}1$ aurait besoin d'une infinité de bits pour être exact.

L'ordinateur est donc obligé de **couper** quelque part. Il ne stocke pas $0{,}1$, mais la **valeur la plus proche** qu'il sait écrire avec ses bits. Cette valeur est très proche de $0{,}1$, mais pas exactement égale.

```python
>>> 0.1 + 0.2
0.30000000000000004
```

Les minuscules erreurs d'approximation de `0.1` et de `0.2` s'additionnent, et le résultat n'est pas pile `0.3`.

!!! danger "Règle à retenir absolument"
    **On ne teste jamais l'égalité de deux flottants avec `==`.**

    Au lieu de demander « sont-ils égaux ? », on demande « sont-ils suffisamment proches ? », en vérifiant que leur écart est minuscule :

    ```python
    a = 0.1 + 0.2
    b = 0.3
    print(a == b)              # False (piège !)
    print(abs(a - b) < 1e-9)   # True  (la bonne façon de comparer)
    ```

    `abs(a - b)` est la distance entre les deux nombres. Si elle est plus petite qu'un tout petit seuil (ici $10^{-9}$), on les considère égaux.

!!! note "Pour aller plus loin (hors programme)"
    La façon précise dont les bits sont répartis (signe, partie « puissance », partie « chiffres ») suit une norme internationale appelée IEEE-754. **Sa connaissance n'est pas exigible** : ce qu'il faut retenir, c'est que la place est finie, donc la représentation est approchée.

## Exercices

!!! question "1 - Exact ou infini ?"
    Pour chacun de ces nombres, dites, en faisant les multiplications par 2, si sa représentation binaire est exacte (finie) ou infinie :

    1. $0{,}5$
    2. $0{,}75$
    3. $0{,}2$
    4. $0{,}125$

    ??? warning "Corrigé"
        1. $0{,}5 = 0{,}1_2$ : **exact**.
        2. $0{,}75 = 0{,}11_2$ : **exact**.
        3. $0{,}2 \times 2 = 0{,}4 \rightarrow 0$ ; $0{,}4 \times 2 = 0{,}8 \rightarrow 0$ ; $0{,}8 \times 2 = 1{,}6 \rightarrow 1$ ; $0{,}6 \times 2 = 1{,}2 \rightarrow 1$ ; on retombe sur $0{,}2$ : **infini** ($0{,}0011\,0011\ldots_2$).
        4. $0{,}125 = 2^{-3} = 0{,}001_2$ : **exact**.

!!! question "2 - Prédire la console"
    Sans exécuter, dites si Python affichera `True` ou `False`, puis expliquez :

    ```python
    print(0.25 + 0.25 == 0.5)
    print(0.1 + 0.1 + 0.1 == 0.3)
    ```

    ??? warning "Corrigé"
        - `0.25 + 0.25 == 0.5` affiche `True` : $0{,}25$ et $0{,}5$ ont une représentation **exacte** en binaire, donc le calcul est exact.
        - `0.1 + 0.1 + 0.1 == 0.3` affiche `False` : $0{,}1$ est approché, et les erreurs s'accumulent.

!!! question "3 - Corriger un test"
    Le test suivant échoue alors que mathématiquement il devrait réussir. Réécrivez-le correctement.

    ```python
    prix = 0.1 + 0.2
    if prix == 0.3:
        print("OK")
    ```

    ??? warning "Corrigé"
        ```python
        prix = 0.1 + 0.2
        if abs(prix - 0.3) < 1e-9:
            print("OK")
        ```
