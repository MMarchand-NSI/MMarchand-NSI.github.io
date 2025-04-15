# Introduction au chiffrement

## Bref historique du chiffrement

Depuis l’Antiquité, les humains ont cherché à protéger leurs messages des regards indiscrets. Dès qu’il y a eu des secrets à garder — qu’ils soient militaires, diplomatiques ou personnels — le besoin de **chiffrer l’information** est apparu.

- **Vers -500 av. J.-C.** : les Grecs utilisaient la *scytale*, un système de chiffrement par transposition.
- **Jules César** utilisait un simple décalage de lettres dans l’alphabet (le **chiffrement de César**) pour envoyer des ordres.
- Au **Moyen Âge**, les souverains échangeaient des messages codés avec des techniques plus élaborées.
- Lors de la **Seconde Guerre mondiale**, la machine **Enigma** a été largement utilisée, et brisée par Alan Turing.
- Aujourd’hui, le chiffrement est partout : **mots de passe, paiements, messageries, cloud**, etc.

---

## Un exemple, le chiffrement de César

Le chiffrement de César est une méthode par décalage. Exemple : avec un décalage de 3, `A → D`, `B → E`, etc.

Chiffrement :  
`indice_chiffre = (indice_original + cle) % 26`  

!!! question "César"
    Écrire une fonction :

    ```python
    def cesar(message: str, cle: int) -> str:
        """
        Cette fonction applique le décalage de césar à un message 
        selon la clé donnée et revoie le résultat.
        """
        ...
    ```
    Le message est en majuscules sans accents.

    - Donnez l'instruction permettant de chiffrer un message avec une clé $k$
    - Donnez l'instruction permettant de déchiffrer un message chiffré avec une clé $k$

### Limites du chiffrement de César

Ce chiffrement est **très facile à casser**. Il suffit de décoder le message avec les 25 clés possibles et de comparer les résultats.

---

!!! abstract "Définition - Chiffrement Symétrique"
    On dit qu'une méthode de chiffrement est symétrique quand c'est la **même clé** qui permet de chiffrer et de déchiffrer le message

    Voici ci-dessous un autre exemple de chiffrement symétrique



---

## Chiffrement XOR (OU exclusif)


Examinons en quoi consiste ce chiffrement en découvrant quelques proprités de l'opérateur XOR, que nous noterons $\oplus$

Rappelons que $a \oplus b$ est vrai lorsque $a$ et $b$ sont différents.

| $a$ | $b$ | $a \oplus b$ |
| -- | -- | -- |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

Imaginons disposer d'un message $M$ et d'une clé $K$

Alice créé le message chiffré $C = M \oplus K$ et le transmet à Bob qui a la clé $K$

lorsque j'utilise des majuscules, c'est pour dire qu'on fait du XOR bitwise.

Bob reçoit $C$. Il calcule alors $X=C \oplus K$

Donc $X=(M \oplus K) \oplus K$

On sait que $K \oplus K = 0$, mais on ne sait pas si $\oplus$ est associatif (si on peut bouger les parenthèses).

Vous connaissez déjà un opérateur non associatif. L'opérateur de division n'est pas associatif. En effet $(1/2)/3 \ne 1/(2/3)$

on va donc vérifier l'associativité de $\oplus$ en écrivant la table de vérité de $(a \oplus b ) \oplus c$ et de $a \oplus (b \oplus c)$. Si on trouve les mêmes, c'est que les expressions sont égales.

| $a$ | $b$ | $c$ |$a \oplus b$ | $b \oplus c$ | $(a \oplus b ) \oplus c$ | $a \oplus (b \oplus c)$ |
| -- | -- | -- | -- | -- | -- | -- |
| 0 | 0 | 0 | 0 | 0 | 0 | 0
| 0 | 0 | 1 | 0 | 1 | 1 | 1
| 0 | 1 | 0 | 1 | 1 | 1 | 1
| 0 | 1 | 1 | 1 | 0 | 0 | 0
| 1 | 0 | 0 | 1 | 0 | 1 | 1
| 1 | 0 | 1 | 1 | 1 | 0 | 0
| 1 | 1 | 0 | 0 | 1 | 0 | 0
| 1 | 1 | 1 | 0 | 0 | 1 | 1

Les deux expressions ont toujours la même valeur de vérité, elles sont donc égales. Quels que soient $a, b$ et $c$, on a  $(a \oplus b ) \oplus c = a \oplus (b \oplus c)$. 

$\oplus$ est donc associatif.

On peut donc bouger les parenthèses et on obtient:

$X= M \oplus (K \oplus K)$

Or $K \oplus K = 0$ car $K$ n'est pas différent de $K$

$X= M \oplus 0$

On peut faire la table de $M \oplus 0$ pour oberver que ça vaut $M$.

| $M$ | $0$ | $M \oplus 0$ |
| -- | -- | -- |
| 0 | 0 | 0 |
| 1 | 0 | 1 |

Au final, $X=M$

En réalisant un XOR sur le message chiffré avec la même clé, Bob retrouve le message initial!


!!! abstract Résumé
    En résumé, pour chiffrer un message M avec une clé K, Alice calcule $C = M \oplus K$ et transmet $C$ à Bob qui déchiffre $C$ en calculant $C \oplus K$

Le problème c'est que la taille de la clé n'est pas égale à la taille du message. Si notre message a $n$ bits, on voudrait que notre clé ait aussi n-bits pour réaliser les opération bit à bit.

Ce qu'on va faire, c'est qu'on va répéter le clé jusqu'à ce qu'elle fasse la taille du message avant l'opération.

si on note $|K|$ la taille de la clé et $|M|$ la taille du message, on devra répéter la clé $|M| \bold{div} |K|$ fois et y ajouter un bout de clé de taille $|M| \bold{mod} |K|$. (c'est une bête division: combien de fois peut-on mettre la clé, et qu'est-ce qui nous reste à la fin pour compléter)

En conséquence, compléter le fonction suivante:

```python

def chiffrement_symetrique(message: bytes, cle: bytes) -> bytes:
    """
    Opère un XOR sur le message et la clé.
    bytes est un type représentant une séquence d'octets.
    Il est donc manipulable comme toute séquence (len, slices, iterations...).

       ABCDEFG   --> 18368730161825351
    ⊕ testtes   --> 32762643847865715

    >>> cle = b"test"
    >>> message = b"ABCDEFG"
    >>> msg_chiffre = chiffrement_symetrique(message, cle)
    >>> msg_dechiffre = chiffrement_symetrique(msg_chiffre, cle)
    >>> print(msg_chiffre)
    b"5'001#4"
    >>> print(msg_dechiffre)
    b'ABCDEFG'
    """
    # Nombre de répétitions de la clé
    repetitions = ......................
    # Nombre d'octets restants
    reste = .....................

    # On récupère l'entier correspondant au message
    message_int = int.from_bytes(message, byteorder='big')

    # On fait pareil pour la clé qu'on répète
    cle_int = int.from_bytes(...................., byteorder='big')

    # Application de l'opérateur XOR
    resultat_int = .....................

    # Conversion du résultat en bytes
    # La taille du message chiffré est nécessairement la même que celle du message
    resultat_bytes = resultat_int.to_bytes(len(message), byteorder='big')

    return resultat_bytes
```


### Lecture et écriture en binaire

Ces deux fonctions permettent de lire et d'écrire des bytes dans un fichier. Ici, on est au niveau de l'octet, donc on peut chiffrer ce qu'on veut avec ce qu'on veut.

```python
def lire_fichier(chemin: str) -> bytes:
    """ Cette fonction lit le fichier octet par octet """
    with open(chemin, "rb") as f:
        data = f.read()
    return data


def ecrire_fichier(data: bytes, chemin: str):
    with open(chemin, "wb") as f:
        f.write(data)
```

!!! question "Application concrète"
    Choisissez un binôme et mettez vous d'accord sur une image commune qui vous servira de clé.

    Chiffrez un fichier quelconque avec cette image.

    Envoyez le à votre binôme qui pourra le déchiffrer.

---

## Problème du partage de la clé

Dans le chiffrement symétrique, **la même clé** est utilisée pour chiffrer et déchiffrer.

- **Comment transmettre la clé sans qu’elle soit interceptée ?**
- **Si la clé est compromise, toute la sécurité est perdue**.

---
