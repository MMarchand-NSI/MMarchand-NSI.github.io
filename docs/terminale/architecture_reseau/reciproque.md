# Mini cours – Fonction réciproque

## 1. Définition

Une **fonction réciproque** $f^{-1}$ permet de revenir à l’entrée d’une fonction $f$.
Attention, **il n'existe pas de réciproque à toute fonction**, cependant on ne s'étendra pas dessus.

> Si $y = f(x)$, alors $x = f^{-1}(y)$

Cela signifie que :

- $f(f^{-1}(x)) = x$
- $f^{-1}(f(x)) = x$

Conséquence: si on connaît la valeur de $f(x)$, alors ils faut calculer $f^{-1}(f(x))$ pour retrouver x.

Si Alice envoie $A=f(x)$, alors si Eve sniffe A et connaît $f$ (publique), elle cherche sa réciproque $f^{-1}$, et calcule $f^{-1}(A)=f^{-1}(f(x))=x$ pour trouver $x$

---

## 2. Méthode pour trouver une fonction réciproque

### Étapes générales :
1. Écrire $y = f(x)$  
2. Isoler $x$  
3. Inverser les rôles de $x$ et $y$

### Exemple :
Soit $f(x) = 2x + 3$

1. $y = 2x + 3$  
2. $x = \frac{y - 3}{2}$  
3. Donc : $f^{-1}(x) = \frac{x - 3}{2}$

Si Eve reçoit 11, elle calcule $f^{-1}(11)=4$, et on a bien $f(4)=11$. Elle a bien retrouvé la clé secrète 4.

---

## 3. Application à la cryptographie (Diffie-Hellman)

La fonction utilisée est :

$$
f(x) = g^x \mod p
$$

- $g$ : base (générateur)
- $p$ : nombre premier
- $x$ : secret

Eve connaît $g$, $p$, et $f(x) = g^x \mod p$,  
elle veut retrouver $x$, donc elle cherche la **fonction réciproque** :

$$
f^{-1}(y) = \log_g y \mod p
$$

---

## 4. Problème du logarithme discret

Trouver $x$ tel que $g^x \equiv y \mod p$ est appelé le **logarithme discret**.

- Ce problème est **très difficile**
- Il n'existe **pas de méthode rapide** connue
- C’est ce qui **garantit la sécurité** de Diffie-Hellman

---

## 5. Tableau récapitulatif

| Élément                   | Description                          |
|--------------------------|--------------------------------------|
| Fonction directe         | $f(x) = g^x \mod p$                  |
| Fonction réciproque      | $f^{-1}(y) = \log_g y \mod p$        |
| Calcul de $f(x)$         | Facile                               |
| Calcul de $f^{-1}(x)$    | Très difficile                       |

---