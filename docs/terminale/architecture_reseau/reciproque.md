# Mini cours - Fonction réciproque

## 1. Le problème

$f(x) = 3x + 2$ nous donne la valeur de $f(x)$ quand on connaît $x$.

Mais parfois on dispose de $f(x)$ et on veut retrouver $x$. Par exemple :

- $f(x) = 14$, quel est $x$ ?
- $f(x) = 8$, quel est $x$ ?

C'est le rôle de la **fonction réciproque** $f^{-1}$ : elle prend $f(x)$ en entrée et rend $x$.

$$f^{-1}(f(x)) = x$$

## 2. Comment la calculer ?

On pose $y = f(x)$ et on isole $x$.

**Exemple** avec $f(x) = 3x + 2$ :

$$y = 3x + 2 \implies 3x = y - 2 \implies x = \frac{y-2}{3}$$

Donc $\displaystyle f^{-1}(y) = \frac{y-2}{3}$.

**Vérification :**

- $f(4) = 3 \times 4 + 2 = 14$, et $f^{-1}(14) = \dfrac{14-2}{3} = 4$ ✓
- $f(2) = 8$, et $f^{-1}(8) = \dfrac{8-2}{3} = 2$ ✓

Si Eve intercepte la valeur $14$, elle calcule $f^{-1}(14) = 4$ et retrouve la clé secrète $x = 4$.

---

## 3. Application à la cryptographie

La fonction utilisée dans Diffie-Hellman est :

$$f_k(x) = x^k \bmod p$$

Pour casser le protocole, Eve reçoit $A = g^a \bmod p$ et veut retrouver $a$.

Il lui faudrait calculer $f_g^{-1}(A)$, c'est-à-dire trouver $x$ tel que $g^x \equiv A \pmod p$.

Ce problème s'appelle le **logarithme discret**.

---

## 4. Problème du logarithme discret

Contrairement à $f(x) = 3x + 2$, il n'existe **pas de formule** pour calculer $f_g^{-1}$.

On est obligé de procéder par essais algorithmiques, et quand $p$ est un grand nombre premier (2048 bits), aucun algorithme connu ne peut le faire en temps raisonnable.

C'est ce qui **garantit la sécurité** de Diffie-Hellman.

| | $f(x) = 3x+2$ | $f_g(x) = g^x \bmod p$ |
|--|--|--|
| Calculer $f(x)$ depuis $x$ | Facile | Facile |
| Retrouver $x$ depuis $f(x)$ | Facile | Impossible en pratique |
