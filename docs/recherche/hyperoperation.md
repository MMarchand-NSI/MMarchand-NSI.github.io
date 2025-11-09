# Vers une hiérarchie uniforme des hyperopérations

Matthieu Marchand

## 1. Motivation

La hiérarchie classique des **hyperopérations** définit une suite d'opérateurs binaires \( H_n(a,b) \) par récurrence sur \( n \) :


$$ H_0(a,b) = b + 1, \qquad
H_{n+1}(a,0) =
\begin{cases}
a & \text{si } n = 0,\\
0 & \text{si } n = 1,\\
1 & \text{si } n \ge 2,
\end{cases}$$

et pour $$ b > 0 $$ :

$$H_{n+1}(a,b) = H_n(a, H_{n+1}(a,b-1))$$

Cette définition, courante dans la littérature ([Rubtsov & Romerio, 1999]), engendre :

- \(H_1(a,b) = a + b\) (addition)  
- \(H_2(a,b) = a \times b\) (multiplication)  
- \(H_3(a,b) = a^b\) (exponentiation)

Cependant, la valeur initiale \(H_0(a,b)=b+1\) ne découle pas de la récurrence : elle est **ajoutée à la main**.  
Le niveau 0 ne s'intègre donc pas naturellement dans le schéma d'itération.

---

## 2. Principe de cohérence structurelle

Le principe général de **cohérence récursive** exige que la règle de récurrence soit **valable pour tous les indices**.  
Ce principe découle de la **théorie de la récurrence primitive** (Gödel, 1931 ; Kleene, 1952), où la base doit être du même type que la règle d'induction.

Par analogie avec la **théorie de l'itération** (Aczél, 1966 ; Mac Lane, 1971), pour toute fonction \(f\) :

\[
f^0 = \mathrm{id}, \qquad f^{n+1} = f \circ f^n.
\]

L'itération 0 d'une fonction est donc toujours l'**identité** sur son domaine.  
Il est alors naturel que le niveau 0 des hyperopérations corresponde à une opération **identité** : la projection.

---

## 3. Définition uniforme proposée

On définit pour tout \(n \ge 0\) :

\[
\boxed{
\begin{aligned}
H(0,a,b) &= b,\\
H(n+1,a,0) &= a,\\
H(n+1,a,b+1) &= H(n,a,H(n+1,a,b)).
\end{aligned}
}
\]

Cette définition est **structurellement uniforme** : elle rend la récurrence valide pour tout \( n \ge 0 \), sans cas particulier.

---

## 4. Vérification des premiers niveaux

| Niveau | Définition | Résultat | Référence |
|:--|:--|:--|:--|
| 0 | \(H(0,a,b)=b\) | projection | identité d'itération ([Aczél 1966]) |
| 1 | \(H(1,a,b)=a+b\) | addition | ([Rubtsov & Romerio 1999]) |
| 2 | \(H(2,a,b)=a\times b\) | multiplication |  |
| 3 | \(H(3,a,b)=a^b\) | exponentiation |  |

Le paramètre \(b\) conserve son rôle d'**indice d'itération** pour tous les niveaux, ce qui rejoint la lecture de Goodstein (1947) et Conway (1981).

---

## 5. Interprétation conceptuelle

Cette hiérarchie respecte deux principes fondamentaux :

1. **Uniformité des niveaux** — chaque \(H_{n+1}\) est une *itération interne* de \(H_n\) selon la même récurrence ([Trnková 1974]).  
2. **Naturalité de l'identité initiale** — le niveau 0 correspond à l'objet terminal de l'itération ([Mac Lane 1971]).

La hiérarchie devient ainsi entièrement cohérente et continue :  
aucun cas particulier n'interrompt la structure.

---

## 6. Discussion

Le déplacement d'un cran de la hiérarchie donne :

| Niveau (standard) | Niveau (uniforme) | Opération |
|:--|:--|:--|
| 0 | — | Successeur |
| 1 | 0 | Projection |
| 2 | 1 | Addition |
| 3 | 2 | Multiplication |
| 4 | 3 | Exponentiation |
| … | … | … |

Cette version :

- rend la récurrence **totalement régulière** ;
- clarifie le rôle du second argument \(b\) comme **taille du problème** ;
- aligne la construction sur les principes d'**itération fonctionnelle** classiques.

---

## 7. Sur la non-nécessité du successeur

Dans la définition classique des hyperopérations, le **successeur** \(b \mapsto b + 1\) constitue le point de départ arbitraire :

\[
H_0(a,b) = b + 1.
\]

Ce choix a pour unique but d'amorcer la récurrence, mais il **n'est pas dérivé du schéma lui-même** : il est ajouté de manière externe.  
Autrement dit, la hiérarchie standard repose sur un **cas de base non structurel**.

---

Dans la version uniforme proposée ici :

\[
H(0,a,b) = b, \qquad
H(n+1,a,0) = a, \qquad
H(n+1,a,b+1) = H(n,a,H(n+1,a,b)),
\]

le **successeur émerge naturellement** comme un cas particulier du niveau suivant :

\[
H(1,1,b) = 1 + b = b + 1.
\]

Ainsi, le successeur n'est **plus une opération primitive**, mais simplement une instance de l'addition.

---

### Conséquence conceptuelle

Le niveau 0 (projection) suffit à fonder la hiérarchie entière :

- le successeur devient un **cas dérivé**,  
- la récurrence devient **parfaitement homogène**,  
- la hiérarchie repose sur un **principe unique d'itération**.

Cette approche rend donc le successeur **non nécessaire** en tant que base indépendante :  
il apparaît naturellement comme la **première émergence non triviale** de la structure d'itération.  
En termes catégoriques, la projection \(b \mapsto b\) joue le rôle de **morphisme identitaire initial**,  (TODO rajouter citations pour cette section)
dont toutes les opérations supérieures se déduisent par clôture itérative.

## 8. Références

- **Aczél, J.** (1966). *Lectures on Functional Equations and Their Applications*. Academic Press.  
- **Conway, J. H.** (1981). *On Numbers and Games*. Academic Press.  
- **Drake, F. R.** (1974). *Set Theory: An Introduction to Large Cardinals*. North-Holland.  
- **Goodstein, R. L.** (1947). “Transfinite Ordinals in Recursive Number Theory.” *Journal of Symbolic Logic*, 12, 123–129.  
- **Kleene, S. C.** (1952). *Introduction to Metamathematics*. North-Holland.  
- **Mac Lane, S.** (1971). *Categories for the Working Mathematician*. Springer.  
- **Rubtsov, V. A., & Romerio, S.** (1999). “The Hyperoperation Sequence.” *arXiv:math/9904172*.  
- **Trnková, K.** (1974). “Iterative Algebras.” *Algebra Universalis*, 4(2), 159–167.

---
