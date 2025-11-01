# Conversions depuis la base 10



## Conversion d’un nombre en base \$10\$ vers la base \$2\$

Pour convertir un entier naturel écrit en base \$10\$ vers la base \$2\$, on applique la **méthode des divisions successives** :
on divise le nombre par \$2\$, on note le **reste**, puis on recommence avec le quotient jusqu’à ce qu’il soit nul.

L’écriture binaire du nombre est alors obtenue en lisant les **restes de bas en haut** (du dernier au premier).

Par exemple, pour convertir \$13\$ en base \$2\$ :

$$
\begin{aligned}
13 \div 2 &= 6 &\text{reste } 1 \\
6 \div 2 &= 3 &\text{reste } 0 \\
3 \div 2 &= 1 &\text{reste } 1 \\
1 \div 2 &= 0 &\text{reste } 1
\end{aligned}
$$

Lecture des restes de bas en haut : \$1101\$

Donc :

$$
13_{10} = 1101_2
$$

## Convertir de la base 10 à une base $b$ quelconque

Ce procédé fonctionne exactement de la même manière pour convertir un entier de la base \$10\$ vers n’importe quelle base entière \$b > 1\$.

Il faut procéder par divisions successives par $b$ jusqu'à obtenir un quotient nul.



!!! question "Exercices : convertir des entiers de la base 10 vers d'autres bases"

    1. Convertis $19_{10}$ en base $2$  
    2. Convertis $45_{10}$ en base $3$  
    3. Convertis $31_{10}$ en base $4$  
    4. Convertis $73_{10}$ en base $8$  
    5. Convertis $255_{10}$ en base $16$

??? warning "Corrigé"
    1. Divisions successives par $2$ :  
    $19 \div 2 = 9$ reste $1$  
    $9 \div 2 = 4$ reste $1$  
    $4 \div 2 = 2$ reste $0$  
    $2 \div 2 = 1$ reste $0$  
    $1 \div 2 = 0$ reste $1$  
    Lecture de bas en haut : $\boxed{10011_2}$

    2. Divisions successives par $3$ :  
    $45 \div 3 = 15$ reste $0$  
    $15 \div 3 = 5$ reste $0$  
    $5 \div 3 = 1$ reste $2$  
    $1 \div 3 = 0$ reste $1$  
    Lecture de bas en haut : $\boxed{1200_3}$

    3. Divisions successives par $4$ :  
    $31 \div 4 = 7$ reste $3$  
    $7 \div 4 = 1$ reste $3$  
    $1 \div 4 = 0$ reste $1$  
    Lecture de bas en haut : $\boxed{133_4}$

    4. Divisions successives par $8$ :  
    $73 \div 8 = 9$ reste $1$  
    $9 \div 8 = 1$ reste $1$  
    $1 \div 8 = 0$ reste $1$  
    Lecture de bas en haut : $\boxed{111_8}$

    5. Divisions successives par $16$ :  
    $255 \div 16 = 15$ reste $15$  
    $15 \div 16 = 0$ reste $15$  
    En base $16$, $15 = F$  
    Lecture de bas en haut : $\boxed{FF_{16}}$


## Astuce utile : conversion rapide entre la base \$16\$ et la base \$2\$

Il existe une astuce simple pour passer rapidement d’un nombre en base \$16\$ (hexadécimal) à la base \$2\$ (binaire), et inversement :
chaque chiffre hexadécimal correspond exactement à un groupe de **\$4\$ bits**.

Autrement dit, on peut convertir chaque chiffre hexadécimal en son équivalent binaire sur **\$4\$ chiffres**, en ajoutant des zéros à gauche si nécessaire.

Par exemple :

$$
\begin{aligned}
A_{16} &= 10_{10} = 1010_2 \\
F_{16} &= 15_{10} = 1111_2 \\
2_{16} &= 2_{10} = 0010_2
\end{aligned}
$$

Donc :

$$
3F_{16} = 0011\ 1111_2
$$

Inversement, pour passer de la base \$2\$ à la base \$16\$, on **regroupe les chiffres binaires par paquets de \$4\$**, en partant de la droite, puis on convertit chaque groupe en un chiffre hexadécimal.

Par exemple :

$$
11010110_2 = 1101\ 0110 = D6_{16}
$$

## Tableau de correspondance

| Hexadécimal (\$\text{base }16\$) | Décimal (\$\text{base }10\$) | Binaire (\$\text{base }2\$ sur 4 bits) |
| :------------------------------: | :--------------------------: | :------------------------------------: |
|               \$0\$              |             \$0\$            |                \$0000\$                |
|               \$1\$              |             \$1\$            |                \$0001\$                |
|               \$2\$              |             \$2\$            |                \$0010\$                |
|               \$3\$              |             \$3\$            |                \$0011\$                |
|               \$4\$              |             \$4\$            |                \$0100\$                |
|               \$5\$              |             \$5\$            |                \$0101\$                |
|               \$6\$              |             \$6\$            |                \$0110\$                |
|               \$7\$              |             \$7\$            |                \$0111\$                |
|               \$8\$              |             \$8\$            |                \$1000\$                |
|               \$9\$              |             \$9\$            |                \$1001\$                |
|               \$A\$              |            \$10\$            |                \$1010\$                |
|               \$B\$              |            \$11\$            |                \$1011\$                |
|               \$C\$              |            \$12\$            |                \$1100\$                |
|               \$D\$              |            \$13\$            |                \$1101\$                |
|               \$E\$              |            \$14\$            |                \$1110\$                |
|               \$F\$              |            \$15\$            |                \$1111\$                |

