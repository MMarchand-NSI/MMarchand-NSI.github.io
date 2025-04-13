# Algorithmique

!!! Abstract "Définition"
    Un algorithme est un dispositif formel qui, pour chaque entrée issue d’un ensemble déterminé, exécute une suite finie d’instructions élémentaires et termine au bout d’un nombre fini d’étapes, en produisant une sortie (ou un état final).

    Un dispositif formel désigne une structure logique qui sert à décrire et étudier de façon rigoureuse un calcul.

    En pratique, on s’appuie sur cette intuition :

    - Lister des **étapes finies** et exécutables clairement,
    - Garantir une **terminaison** pour toute entrée (ou au moins pour toutes celles qu’on considère valides),
    - Obtenir une **réponse correcte** vis-à-vis du problème initial.

    Un algorithme peut être spécifié en langage humain ou en langage informatique, mais peut aussi être basé sur un système matériel. L'unique obligation est que sa spécification fournisse une description précise de la procédure de calcul à suivre.

---

Nous nous appuierons sur des algorithmes simples que vous avez déjà implémentés.

---

## Le problème du minimum

!!! abstract "Le problème du minimum"

    Considérons un tableau $T$ de taille $n>0$

    Le problème du minimum est de trouver 
    
    $$\min_{i \in [\![0;n-1]\!]} T[i]$$

    C'est à dire le plus petit $T[i]$ pour $i$ parcourant l'intervalle $[\![0;n-1]\!]$



Considérons **l'instance** de problème $[4, 9, 3, 19]$

L'algorithme **accepte** cette entrée et renvoie $3$

Considérons l'instance de problème $[]$

L'algorithme n'accepte pas cette entrée

Voici l'algorithme que nous avons déjà vu:

```markdown
# Algorithme - Calculer le minimum de T[0..n-1]
1. mini ← T[0]
2. Pour i allant de 1 à n-1:
3.     Si T[i] < e
4.          mini = T[i]
3. Retourner mini
```

--- 

!!! abstract "Terminaison"
    **Un algorithme doit se terminer**

    Si toutes les boucles d'un algorithme se terminent, alors l'algorithme se termine. 
    
    On prouve qu'une boucle se termine à l'aide d'un **variant de boucle**.


!!! abstract "Variant de boucle"
    **Un variant de boucle est une quantité** entière positive strictement décroissante qui assure la terminaison d'une boucle lorsqu'elle vaut $0$.

Ici, quoi qu'il arrive, $i$ va aller de $0$ à $n-1$, puis la boucle se termine, car elle n'est composée que d'instructions élémentaires qui se terminent.

Le variant de boucle est $n-i-1$. et il assure la terminaison du programme.

--- 

!!! abstract "Invariant de boucle"
    Un **invariant de boucle est une propriété** qui :

    1. **Est vraie au début de chaque itération** d’une boucle.  
    2. **Reste vraie** après chaque itération.  

    Plus formellement, si l’on note \(I\) l’invariant, il doit vérifier :

    - **Initialisation** : Au moment d’entrer dans la boucle (avant la première itération), \(I\) est vrai.  
    - **Conservation** : Si \(I\) est vrai au début d’une itération, alors il reste vraie à la fin de cette itération (juste avant de passer à la suivante).
    - **Terminaison** : Quand la boucle s’arrête (car on a préalablement porouvé la terminaison), la propriété \(I\) et la condition de sortie permettent de conclure sur le résultat de l’algorithme.

    Ces trois phases nous permettent de prouver qu'une boucle fait bien ce qu'on voulait qu'elle fasse. On dit que la boucle est partiellement correcte lorsqu'on a démontré la conservation de l'invariant.

    Une boucle partiellement correcte qui se termine est totalement correcte.

    Un algorithme est dit totalement correct si toutes ses boucles sont totalement correctes.


!!! hint "Notations"
    - $T[i..j]$ reprrésente le sous-tableau de $T$ de l'indice $i$ à l'indice $j$ inclus.

Formulons l'invariant pour le problème du minimum et prouvons la correction de notre programme:

"Avant chaque itération $i$, $mini$ contient le minimum de $T[0..i-1]$"

**INITIALISATION**

Si le tableau n'a qu'un élément, la boucle ne s'exécute pas et le minimum est correctement renvoyé.

Si le tableau a au moins un élément, $i=1$ et $mini$ est bien le minimum de $T[0..0]$, le tableau constitué d'un seul élément.

L'invariant est vérifié pour $i=1$.

**CONSERVATION**
On suppose que pour $i>1$ quelconque, l'invariant est vrai.

Donc en début d'itération $i$, "$mini$ est le minimum de $T[0..i-1]$" est vrai

On veut alors prouver qu'après une itération, "$mini$ est le minimum de $T[0..i]$" est vrai

Déroulons l'algorithme:
- Si $T[i] \gt mini$, alors $mini$ est aussi le $minimum$ de $T[0..i]$ et l'invariant est vérifié en sortie d'itération, car on ne fait rien dans ce cas.
- Sinon, $T[i] \le mini$, et donc $mini$ n'est pas le minimum de $T[0..i]$. Mais nous rétablissons immédiatement l'invariant en affectant $T[i]$ à $mini$ qui devient bien le minimum de $T[0..i]$.

Dans tous les cas, en sortie de boucle, "$mini$ est le minimum de T[0..i]" est vrai, ce que nous voulions démontrer.

L'invariant est donc conservé.

**TERMINAISON**
Nous avons déjà prouvé la terminaison de l'algorithme.

Lors de sa dernière itération, $i=n-1$ et l'invariant reste vrai pour $i=n$ par conservation.

Donc mini est le minimum de $T[0..n-1]$

Notre algorithme de recherche de minimum est donc totalement correct.

---

## Indice minimum

!!! abstract "Le problème de l'indice minimum"

    Considérons un tableau $T$ de taille $n>0$

    Le problème de l'indice minimum est de trouver 
    
    $$\argmin_{i \in [\![k;n-1]\!]} T[i]$$

    C'est à dire l'indice $i$ du plus petit $T[i]$ pour $i$ parcourant l'intervalle $[\![k;n-1]\!]$

    Considérons l'instance de problème [4, 9, 3, 19]

    La sortie de l'algorithme pour cette entrée est 2


```markdown
# Algorithme - Calculer l'indice minimum de T[k..n-1]
1. imini ← k
2. Pour i allant de k+1 à n-1:
3.     Si T[i] < T[imini]
4.          imini ← i
3. Retourner mini
```

!!! question "Exercice"
    Reprendre la logique précéente pour prouver la correction totale de l'algorithme de recherche d'indice minimum


## Introduction à la complexité en temps

Ici, il s'agit d'estimer le temps que va prendre un algorithme à s'exécuter. Il existe aussi une complexité spatiale, mais nous ne l'aborderons pas.

Pour ceci, on va compter le nombre de fois que chaque instruction élémentaire va s'exécuter, **dans le pire des cas**. Le pire des cas est celui d'une entrée qui va nécessiter le plus d'instructions.

Il existe d'autres cas de figure que le pire des cas, mais nous ne l'aborderons pas.

Lorsque nous parlerons de complexité, nous entendrons donc toujours complexité temporelle dans le pire des cas.

!!! abstract "Taille d'une instance"
    La taille d'une instance d'un problème algorithmique est une grandeur  représentant une mesure pertinente (nombre d'éléments, nombre de bits, longueur d'une chaîne, etc.) associée aux données en entrée de l'algorithme.

    En pratique, la taille est souvent notée $n$. $n$ est choisie de façon à être fonction de la quantité de travail que doit effectuer l'algorithme.

    Pour le problème du minimum, la taille de l'instance est celle du tableau en entrée.

```markdown
# Algorithme - Calculer le minimum de T[0..n-1]
1. mini ← T[0]
2. Pour i allant de 1 à n-1:
3.     Si T[i] < e
4.          mini = T[i]
3. Retourner mini
```

!!! question "Pire des cas"
    - Quelle est la caractéristique d'une instance représentant le pire des cas pour le problème du minimum?

    - A côté de chaque instruction de ce programme, indiquer le nombre de fois où elle sera exécutée en fonction de la taille $n$ de l'instance.

    - En déduire le nombre d'instructions élémentaires $T(n)$ exécutées par l'algorithme dans le pire des cas en fonction de $n$
        - Vous devez trouver $T(n)=3n+2$

!!! abstract "Classes de complexité élémentaires"
    - Lorsqu'on trouve que $T(n)=a$, on dit que l'algorithme est à coût constant.
        - On dira aussi que la complexité est un $\mathcal{O}(1)$ (grand O de 1)
    - Lorsqu'on trouve que $T(n)=an+b$, on dit que l'algorithme a un coût linéaire.
        - On dira aussi que la complexité est un $\mathcal{O}(n)$ (grand O de n)
    - Lorsqu'on trouve que $T(n)=an^2+bn+c$, on dit que l'algorithme a un coût quadratique.
        - On dira aussi que la complexité est un $\mathcal{O}(n^2)$ (grand O de $n$ carré)


!!! question "Complexité du minimum"
    Quelle est la complexité de l'algorithme de recherche de minimum?

!!! question "Exercice"

    Objectif : Étant donné un tableau de taille $n$, afficher toutes les paires possibles d’éléments.

    Entrée : Un tableau T[0..n-1]
    Sortie : Toutes les paires d’éléments possibles

    Voici 2 algorithmes possibles selon qu'on considère ou non des répétitions.

    **Algo 1**

    ```markdown
    1. Pour i allant de 0 à n-1 :
    2.     Pour j allant de 0 à n-1 :
    3.         afficher(T[i], T[j])
    ```
    
    1. Ecrivez l'affichage obtenu pour T=[2, 4, 6]
    2. Calculer $T(n)$ et en déduire la classe de complexité


    **Algo 2**

    ```markdown
    1. Pour i allant de 0 à n-1 :
    2.     Pour j allant de i à n-1 :
    3.         afficher(T[i], T[j])
    ```

    1. Ecrivez l'affichage obtenu pour T=[2, 4, 6]
    2. Calculer $T(n)$ et en déduire la classe de complexité


!!! question "Moyenne mobile d'un tableau"

    Les moyennes mobiles sont utilisées dans divers domaines pour lisser des fluctuations à court terme et ainsi révéler clairement les tendances globales à moyen ou long terme. Par exemple, en finance, elles servent à identifier les tendances du marché boursier sur des périodes précises. En météorologie, elles permettent de mieux discerner les tendances saisonnières des températures ou précipitations. En santé publique, elles facilitent le suivi des épidémies, en compensant les variations dues aux week-ends ou aux jours fériés. De même, en électronique et traitement du signal, elles sont utilisées pour filtrer le bruit des données issues de capteurs. Enfin, en économie et en marketing digital, elles aident à repérer les cycles économiques et à analyser le trafic web pour une meilleure prise de décision stratégique.

    **Définition :**  
    Étant donné un tableau de nombres réels \( T[0..n-1] \), le tableau $M$ de **moyennes mobiles** de taille \( k \) est défini ainsi:

    \[
    M[i] = \frac{T[i+k-1] + T[i+k-2] + \dots + T[i]}{k}
    \]

    Ainsi, le tableau des moyennes mobiles \( M \) aura pour taille \( n-k+1 \).

    ---

    **Question 1 :**  
    Calculer les tableaux de moyennes mobiles $M$ pour le tableau T suivant :

    - \( T = [2, 4, 6, 11, 10, 12] \)
        1. pour \( k = 3 \)
        2. pour \( k = 4 \)

    ---

    **Question 2 :**  
    Écrire en pseudocode simple un algorithme permettant de calculer la moyenne mobile d’un tableau \( T[0..n-1] \) avec une fenêtre de taille \( k \).

    ---

    **Question 3 :**  
    Ecrivez une fonction permettant de tester votre pseudo code.

    ---

    **Question 4 :**  
    Étudier et exprimer la complexité temporelle de l’algorithme en fonction des variables \( n \) et \( k \).

    ---

    **Question 5 (Bonus) :**  
    Proposer une amélioration de l'algorithme pour réduire sa complexité temporelle, en expliquant le principe et la complexité obtenue.

