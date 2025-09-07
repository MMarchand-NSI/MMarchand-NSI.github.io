# Conversions vers la base 10


!!! warning "Répétition"
    Les paragraphes suivants sont en réalité répétitifs, et ne servent qu'à vous faire vous rendre compte de la similarité du procédé.

## De la base 2 à la base 10

Conversion d’un nombre binaire (base 2) en décimal (base 10)
Un nombre écrit en base 2 est composé uniquement de chiffres $0$ et $1$. Chaque chiffre représente une puissance de $2$, en partant de la droite vers la gauche. Pour convertir un nombre binaire en décimal, on additionne les puissances de $2$ correspondant aux positions où il y a un $1$.

Par exemple, le nombre binaire $1011$ correspond à :
$1 \times 2^3 + 0 \times 2^2 + 1 \times 2^1 + 1 \times 2^0$

Soit : $8 + 0 + 2 + 1 = 11$ en base 10.

En résumé, pour convertir un nombre binaire en décimal, il suffit de calculer la somme :

$$\displaystyle \sum_{i=0}^{n-1} b_i \times 2^i$$

où $b_i$ est le chiffre en position $i$ en partant de la droite (avec $b_i \in \{0, 1\}$), et $n$ est le nombre total de chiffres dans l’écriture binaire.




!!! question "Exercices : convertir des nombres binaires en base décimale"
    1. Convertis le nombre binaire $1101$ en base 10.  
    2. Que vaut le nombre binaire $10010$ en base 10 ?  
    3. Convertis $111111$ en base 10.  
    4. Que donne le binaire $1010101$ en base 10 ?  
    5. Que vaut $1$ en binaire dans le système décimal ?

??? warning "Corrigé"
    1. $1101 = 1 \times 2^3 + 1 \times 2^2 + 0 \times 2^1 + 1 \times 2^0 = 8 + 4 + 0 + 1 = \boxed{13}$  
    2. $10010 = 1 \times 2^4 + 0 \times 2^3 + 0 \times 2^2 + 1 \times 2^1 + 0 \times 2^0 = 16 + 0 + 0 + 2 + 0 = \boxed{18}$  
    3. $111111 = 1 \times 2^5 + 1 \times 2^4 + 1 \times 2^3 + 1 \times 2^2 + 1 \times 2^1 + 1 \times 2^0 = 32 + 16 + 8 + 4 + 2 + 1 = \boxed{63}$  
    4. $1010101 = 1 \times 2^6 + 0 \times 2^5 + 1 \times 2^4 + 0 \times 2^3 + 1 \times 2^2 + 0 \times 2^1 + 1 \times 2^0 = 64 + 0 + 16 + 0 + 4 + 0 + 1 = \boxed{85}$  
    5. $1 = 1 \times 2^0 = \boxed{1}$


## De la base 3 à la base 10

Conversion d’un nombre en base 3 (système ternaire) en base 10
Un nombre écrit en base 3 est composé uniquement de chiffres $0$, $1$ et $2$. Comme pour la base 2, chaque chiffre représente une puissance de la base — ici, une puissance de $3$ — en partant de la droite vers la gauche.
Le principe est exactement le même : on multiplie chaque chiffre par la puissance de $3$ correspondant à sa position, puis on additionne le tout.

Par exemple, le nombre ternaire $102$ correspond à :
$1 \times 3^2 + 0 \times 3^1 + 2 \times 3^0$

Soit : $9 + 0 + 2 = 11$ en base 10.

En résumé, pour convertir un nombre en base 3 en décimal, on applique la même formule que pour la base 2, en remplaçant $2$ par $3$ dans les puissances :

$$\displaystyle \sum_{i=0}^{n-1} a_i \times 3^i$$

où $a_i$ est le chiffre en position $i$ en partant de la droite (avec $a_i \in \{0, 1, 2\}$), et $n$ est le nombre total de chiffres dans l’écriture ternaire.

!!! question "Exercices : convertir des nombres en base 3 en base décimale"
    1. Convertis le nombre ternaire $102$ en base 10.
    2. Que vaut le nombre $210$ en base 10 ?
    3. Convertis $222$ en base 10.
    4. Que donne le ternaire $1001$ en base 10 ?
    5. Que vaut $1$ en base 3 dans le système décimal ?

??? warning "Corrigé"
    1. $102 = 1 \times 3^2 + 0 \times 3^1 + 2 \times 3^0 = 9 + 0 + 2 = \boxed{11}$
    2. $210 = 2 \times 3^2 + 1 \times 3^1 + 0 \times 3^0 = 18 + 3 + 0 = \boxed{21}$
    3. $222 = 2 \times 3^2 + 2 \times 3^1 + 2 \times 3^0 = 18 + 6 + 2 = \boxed{26}$
    4. $1001 = 1 \times 3^3 + 0 \times 3^2 + 0 \times 3^1 + 1 \times 3^0 = 27 + 0 + 0 + 1 = \boxed{28}$
    5. $1 = 1 \times 3^0 = \boxed{1}$

## De la base 4 à la base 10

Conversion d’un nombre en base 4 en base 10
Le procédé est exactement le même que pour la base 2 ou la base 3 : chaque chiffre représente une puissance de la base, ici la base $4$, en partant de la droite vers la gauche.
Les chiffres autorisés en base 4 sont $0$, $1$, $2$ et $3$.


!!! question "Exercices : convertir des nombres en base 4 en base décimale"
1. Convertis le nombre $123$ (base 4) en base 10.
2. Que vaut $321$ (base 4) en base 10 ?
3. Convertis $33$ (base 4) en base 10.
4. Que donne $1002$ (base 4) en base 10 ?
5. Que vaut $1$ en base 4 dans le système décimal ?

??? warning "Corrigé"
1. $123 = 1 \times 4^2 + 2 \times 4^1 + 3 \times 4^0 = 16 + 8 + 3 = \boxed{27}$
2. $321 = 3 \times 4^2 + 2 \times 4^1 + 1 \times 4^0 = 48 + 8 + 1 = \boxed{57}$
3. $33 = 3 \times 4^1 + 3 \times 4^0 = 12 + 3 = \boxed{15}$
4. $1002 = 1 \times 4^3 + 0 \times 4^2 + 0 \times 4^1 + 2 \times 4^0 = 64 + 0 + 0 + 2 = \boxed{66}$
5. $1 = 1 \times 4^0 = \boxed{1}$

## De la base 16 à la base 10

Conversion d’un nombre en base 16 en base 10
Le procédé est exactement le même que pour les autres bases : chaque chiffre représente une puissance de la base, ici la base $16$, en partant de la droite vers la gauche.
Comme on a besoin de $16$ chiffres différents, on utilise les chiffres $0$ à $9$ pour les dix premières valeurs, puis les lettres $A$, $B$, $C$, $D$, $E$ et $F$ pour représenter respectivement les valeurs décimales $10$, $11$, $12$, $13$, $14$ et $15$.

!!! question "Exercices : convertir des nombres hexadécimaux en base décimale"
    1. Convertis le nombre $1A$ (base 16) en base 10.
    2. Que vaut $2F$ (base 16) en base 10 ?
    3. Convertis $B4$ (base 16) en base 10.
    4. Que donne $3E8$ (base 16) en base 10 ?
    5. Que vaut $F$ en base 16 dans le système décimal ?

??? warning "Corrigé"
    1. $1A = 1 \times 16^1 + A \times 16^0 = 1 \times 16 + 10 = \boxed{26}$
    2. $2F = 2 \times 16^1 + F \times 16^0 = 2 \times 16 + 15 = \boxed{47}$
    3. $B4 = B \times 16^1 + 4 \times 16^0 = 11 \times 16 + 4 = \boxed{180}$
    4. $3E8 = 3 \times 16^2 + E \times 16^1 + 8 \times 16^0 = 3 \times 256 + 14 \times 16 + 8 = 768 + 224 + 8 = \boxed{1000}$
    5. $F = 15 \times 16^0 = \boxed{15}$


## Synthèse - Conversion d’un nombre en base $n$ en base 10

Le procédé est toujours le même, quelle que soit la base utilisée : chaque chiffre du nombre représente une puissance de la base $n$, en partant de la droite vers la gauche.
Les chiffres autorisés dépendent de la base : en base $n$, on utilise les entiers de $0$ jusqu’à $n - 1$.
Pour les bases supérieures à $10$, on introduit des lettres pour compléter les chiffres manquants : par exemple, en base $16$, on utilise les lettres $A$ à $F$ pour représenter les valeurs décimales de $10$ à $15$.

La conversion utilise la formule suivante :

$\displaystyle \sum_{i=0}^{k-1} a_i \times n^i$

où :

$n$ est la base de départ,

$a_i$ est le chiffre situé en position $i$ en partant de la droite,

$k$ est le nombre total de chiffres dans l’écriture,

et $a_i \in {0, 1, \dots, n-1}$ (ou valeurs équivalentes avec des lettres si $n > 10$).

Ce principe fonctionne pour toutes les bases entières strictement supérieures à $1$ (base 2, 3, 4, 8, 10, 16, etc.).

## Exercices

!!! question "Exercices : plus grand entier représentable avec $k$ chiffres"
    1. Quel est le plus grand entier que l’on peut écrire avec $4$ chiffres en base $2$ ?
    2. Quel est le plus grand entier que l’on peut écrire avec $3$ chiffres en base $8$ ?
    3. Quel est le plus grand entier que l’on peut écrire avec $2$ chiffres en base $16$ ?
    4. Quel est le plus grand entier que l’on peut écrire avec $5$ chiffres en base $10$ ?
    5. Donne la formule générale pour le plus grand entier représentable avec $k$ chiffres en base $n$. (à savoir)

??? warning "Corrigé"
    1. En base $2$, les chiffres vont de $0$ à $1$, donc le plus grand nombre à $4$ chiffres est $1111_2$ :  
    $1 \times 2^3 + 1 \times 2^2 + 1 \times 2^1 + 1 \times 2^0 = 8 + 4 + 2 + 1 = \boxed{15}$

    2. En base $8$, les chiffres vont de $0$ à $7$, donc le plus grand nombre à $3$ chiffres est $777_8$ :  
    $7 \times 8^2 + 7 \times 8^1 + 7 \times 8^0 = 448 + 56 + 7 = \boxed{511}$

    3. En base $16$, les chiffres vont de $0$ à $F$ (soit $15$), donc le plus grand nombre à $2$ chiffres est $FF_{16}$ :  
    $15 \times 16^1 + 15 \times 16^0 = 240 + 15 = \boxed{255}$

    4. En base $10$, les chiffres vont de $0$ à $9$, donc le plus grand nombre à $5$ chiffres est $99999$ (déjà en base 10) :  
    $\boxed{99999}$

    5. En général, le plus grand entier représentable avec $k$ chiffres en base $n$ est donné par la formule :  
    $$n^k - 1$$
