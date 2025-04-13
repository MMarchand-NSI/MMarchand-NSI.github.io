# 🔐 Cours : Introduction au chiffrement (Terminale NSI)

## 🕰️ Chapitre 1 : Bref historique du chiffrement

Depuis l’Antiquité, les humains ont cherché à protéger leurs messages des regards indiscrets. Dès qu’il y a eu des secrets à garder — qu’ils soient militaires, diplomatiques ou personnels — le besoin de **chiffrer l’information** est apparu.

- **Vers -500 av. J.-C.** : les Grecs utilisaient la *scytale*, un système de chiffrement par transposition.
- **Jules César** utilisait un simple décalage de lettres dans l’alphabet (le **chiffrement de César**) pour envoyer des ordres.
- Au **Moyen Âge**, les souverains échangeaient des messages codés avec des techniques plus élaborées.
- Lors de la **Seconde Guerre mondiale**, la machine **Enigma** a été largement utilisée, et brisée par Alan Turing.
- Aujourd’hui, le chiffrement est partout : **mots de passe, paiements, messageries, cloud**, etc.

---

## 🔁 Chapitre 2 : Le chiffrement de César

Le chiffrement de César est une méthode par décalage. Exemple : avec un décalage de 3, `A → D`, `B → E`, etc.

### Formules

Chiffrement :  
`indice_chiffre = (indice_original + cle) % 26`  
Déchiffrement :  
`indice_original = (indice_chiffre - cle) % 26`

### Exercice Python

Écrire une fonction :

```python
def cesar(message, cle, mode):
    # mode = "chiffrer" ou "dechiffrer"
    ...
```

Le message est en majuscules sans accents. On utilise le modulo 26 pour gérer les décalages.

---

## 🚨 Chapitre 3 : Limites du chiffrement de César

1. **Trop peu de clés** : seulement 25 décalages possibles.
2. **Analyse fréquentielle** : certaines lettres sont plus fréquentes.
3. **Motifs visibles** : les lettres identiques produisent des résultats identiques.

➡️ Ce chiffrement est **facile à casser**.

---

## 🧠 Chapitre 4 : Chiffrer avec XOR (OU exclusif)

Les opérateurs bit à bit permettent de manipuler des octets.

### XOR (`^`) : propriété utile
- `a ^ b = c` → `c ^ b = a` : réversibilité parfaite.

### Lecture et écriture en binaire

```python
with open("fichier", "rb") as f: data = f.read()
with open("fichier", "wb") as f: f.write(data)
```

### Exercice : chiffrement XOR avec clé répétée

```python
def xor_fichier_avec_cle(source, cible, cle_texte):
    cle = cle_texte.encode()
    taille_cle = len(cle)
    with open(source, "rb") as f_in:
        donnees = f_in.read()
    donnees_chiffrees = bytes([
        octet ^ cle[i % taille_cle] for i, octet in enumerate(donnees)
    ])
    with open(cible, "wb") as f_out:
        f_out.write(donnees_chiffrees)
```

---

## 🔓 Chapitre 5 : Problème du partage de la clé

Dans le chiffrement symétrique, **la même clé** est utilisée pour chiffrer et déchiffrer.

### Problèmes :
- Comment transmettre la clé sans qu’elle soit interceptée ?
- Si la clé est compromise, **toute la sécurité est perdue**.

---

## 🔁 Chapitre 6 : Le chiffrement asymétrique et Diffie-Hellman (vue abstraite)

On utilise une fonction `f(x, y)` difficile à inverser.

### Principe :
- Alice envoie `A = f(x, a)` ; Bob envoie `B = f(x, b)`
- Tous deux calculent `K = f(B, a) = f(A, b)`

Si `f(f(x, a), b) == f(f(x, b), a)` alors ils ont la **même clé**.

➡️ Il faut une **fonction à sens unique**.

---

## ❌ Chapitre 7 : Pourquoi la multiplication ne suffit pas

Si `f(x, y) = x * y`, alors :

- Facile de retrouver `y = A / x`
- L’échange est **totalement cassé**

➡️ Il faut une fonction plus difficile à inverser.

---

## 🧮 Chapitre 8 : Les puissances modulo p et le logarithme discret

La vraie fonction utilisée est :

```python
f(x, y) = x^y mod p
```

Facile à calculer, mais **difficile à inverser** : retrouver `y` à partir de `x^y mod p` est le **logarithme discret**.

### Exemple :

```python
p = 23
g = 5
a, b = 6, 15
A = pow(g, a, p)
B = pow(g, b, p)
K1 = pow(B, a, p)
K2 = pow(A, b, p)
```

Résultat : `K1 == K2` → clé partagée.

---

# 🧪 Mini-projet : Échange sécurisé de fichier grâce à Diffie-Hellman

## 🎯 Objectif

Utiliser Diffie-Hellman + votre fonction XOR pour chiffrer un fichier entre deux machines.

---

## Étapes

### Étape 1 : Génération des clés

- Choisir un nombre premier `p` et une base `g`
- Choisir un secret `a`
- Calculer `A = pow(g, a, p)`
- Échanger la clé publique (fichier texte)

### Étape 2 : Calcul de la clé commune

```python
K = pow(B, a, p)
import hashlib
cle_bytes = hashlib.sha256(str(K).encode()).digest()
```

### Étape 3 : Réutilisation de votre fonction XOR

```python
def xor_fichier_avec_cle(source, cible, cle_bytes):
    with open(source, "rb") as f_in:
        donnees = f_in.read()
    donnees_chiffrees = bytes([
        octet ^ cle_bytes[i % len(cle_bytes)] for i, octet in enumerate(donnees)
    ])
    with open(cible, "wb") as f_out:
        f_out.write(donnees_chiffrees)
```

### Étape 4 : Échange du fichier

- Transférer le fichier chiffré par **clé USB**
- Le binôme déchiffre avec la même clé

---

## ✅ À rendre

- `cle_publique.txt`
- `image_chiffree.png`
- `image_dechiffree.png`
- Petit rapport : valeurs utilisées, clé obtenue, fonctionnement, sécurité

---

**Fin du cours**
