# Gestion des droits sous linux

## 1. Les droits Linux

La gestion des droits sur linux fait partie des atouts qui ont forgé la réputation de linux. C'est clair, efficace, et simple.

Chaque fichier ou dossier sous Linux est associé à trois catégories d’utilisateurs :

1. **Utilisateur (Owner)** : Le propriétaire du fichier ou dossier.
2. **Groupe (Group)** : Le groupe auquel appartient ce fichier ou dossier.
3. **Autres (Others)** : Tous les autres utilisateurs qui n’appartiennent ni au groupe ni ne sont propriétaires du fichier.

Pour chacune de ces catégories, il existe trois types de droits :

- **r** (read) : lecture
- **w** (write) : écriture
- **x** (execute) : exécution

Cela se traduit dans les attributs d’un fichier ou d’un dossier sous la forme suivante (dans la sortie de `ls -l`) :

```
-rwxr-xr--
```

Chaque position a une signification :

- Le premier caractère (-, d, l, etc.) indique le type (fichier, dossier, lien, etc.).  
  - `-` : fichier
  - `d` : dossier (directory)
  - `l` : lien symbolique (link)
  - etc.

- Ensuite, il y a trois groupes de trois caractères pour : `User` | `Group` | `Others`.
  - `rwx` : (lecture, écriture, exécution) pour l’utilisateur (le propriétaire).
  - `r-x` : (lecture, pas d’écriture, exécution) pour le groupe.
  - `r--` : (lecture, pas d’écriture, pas d’exécution) pour les autres.

Donc, dans cet exemple `-rwxr-xr--`, cela signifie :
- Propriétaire : **rwx** → peut lire, écrire, exécuter
- Groupe : **r-x** → peut lire, exécuter, mais ne peut pas écrire
- Autres : **r--** → peuvent uniquement lire

---

## 2. Affichage des droits avec `ls`

La commande **`ls -l`** (ou `ls -lh` pour avoir des tailles plus lisibles) est utilisée pour afficher les détails des fichiers et répertoires, incluant les droits, l’utilisateur propriétaire et le groupe. Par exemple :

```bash
ls -l
```

Retour possible :

```
drwxr-xr-x  2 alice   dev   4096 mar  1 10:00 dossier_test
-rw-r--r--  1 alice   dev    234 mar  1 09:58 fichier1.txt
-rwxr-xr--  1 bob     admin 8764 mar  1 09:59 script.sh
```

Ici :
- `d` au début de la ligne indique un **dossier**.  
- `-` au début de la ligne indique un **fichier**.  
- Les trois triplets de droits sont affichés juste après.

---

## 3. Modification des droits avec `chmod`

La commande `chmod` (change mode) permet de modifier les droits d’un fichier ou dossier de deux façons : **notation symbolique** ou **notation octale**.

### 3.1. Notation symbolique

La forme générale est :
```bash
chmod [qui][+/-/=][droit] fichier
```
où :
- `qui` peut être :  
  - `u` = utilisateur (owner)  
  - `g` = groupe  
  - `o` = autres  
  - `a` = tous (`u`, `g`, et `o`)
- `+` pour ajouter un droit,  
  `-` pour retirer un droit,  
  `=` pour fixer explicitement les droits (et enlever tout le reste).
- `droit` peut être : `r` (lecture), `w` (écriture), `x` (exécution).

#### Exemple 1
Ajouter le droit d’exécution pour le propriétaire (u) sur un fichier :
```bash
chmod u+x mon_script.sh
```
Désormais, le propriétaire peut exécuter le fichier `mon_script.sh`.

#### Exemple 2
Retirer le droit d’écriture pour le groupe :
```bash
chmod g-w mon_fichier.txt
```

#### Exemple 3
Donner à tous (`a`) uniquement la lecture (`r`), et rien d’autre :
```bash
chmod a=r mon_fichier.txt
```
Cela va **remplacer** tous les droits existants, pour tout le monde, par lecture seule.

### 3.2. Notation octale (ou numérique)

On utilise trois chiffres correspondant respectivement aux droits de l’utilisateur, du groupe et des autres. Chaque chiffre est la somme binaire de `r=4`, `w=2`, et `x=1`.

- **4** = lecture (r)
- **2** = écriture (w)
- **1** = exécution (x)

On additionne selon les droits voulus. Exemple :

- Lecture + écriture + exécution = `4 + 2 + 1 = 7`
- Lecture + exécution = `4 + 1 = 5`
- Lecture seule = `4`
- Lecture + écriture = `4 + 2 = 6`
- Exécution seule = `1`

Le pattern `chmod xyz fichier` indique que `x` s’applique au propriétaire, `y` au groupe, `z` aux autres.

#### Exemples concrets

1. **Donner tous les droits au propriétaire**, lecture et exécution au groupe et lecture seule aux autres :
   ```bash
   chmod 754 mon_script.sh
   ```
   - Propriétaire (u) → 7 = rwx
   - Groupe (g) → 5 = r-x
   - Autres (o) → 4 = r--

2. **Lire/Écrire pour le propriétaire**, rien pour le groupe et les autres :
   ```bash
   chmod 600 mon_fichier.txt
   ```
   - Propriétaire → 6 = rw-
   - Groupe → 0 = ---
   - Autres → 0 = ---

3. **Tous droits pour le propriétaire, aucun droit pour les autres** :
   ```bash
   chmod 700 dossier_test
   ```
   - Propriétaire → 7 = rwx
   - Groupe → 0 = ---
   - Autres → 0 = ---

---

## 4. Exemples concrets

Imaginons que vous avez un fichier `exemple.sh` dont les droits sont :

```bash
ls -l exemple.sh
```
Retour possible :
```
-rw-r--r-- 1 alice dev  1234 mar 26 10:00 exemple.sh
```

- Actuellement :  
  - Propriétaire (alice) → rw-  
  - Groupe (dev) → r--  
  - Autres → r--  

### 4.1 Rendre ce script exécutable pour tout le monde (u, g, o)

#### Méthode symbolique
```bash
chmod a+x exemple.sh
```
Après vérification `ls -l exemple.sh` :
```
-rwxr-xr-x 1 alice dev  1234 mar 26 10:01 exemple.sh
```
(Le script est désormais exécutable par tous.)

#### Méthode octale
```bash
chmod 755 exemple.sh
```
Le résultat est le même :
- 7 (rwx) pour l’utilisateur
- 5 (r-x) pour le groupe
- 5 (r-x) pour les autres

### 4.2 Retirer totalement les droits pour le groupe et les autres

Supposons qu’on veuille rendre un fichier **strictement privé** pour l’utilisateur propriétaire, avec lecture et écriture seulement (pas besoin d’exécution). On veut donc `rw` pour le propriétaire, et rien pour les autres :

```bash
chmod 600 exemple.sh
```
Cela signifie :
- Propriétaire → 6 (rw-)
- Groupe → 0 (---)
- Autres → 0 (---)

---

## 6. Résumé

1. **Visualiser les droits** : `ls -l`
2. **Notation symbolique** (`chmod u+w`, `chmod g-x`, etc.) ou **notation octale** (`chmod 755`, `chmod 600`, etc.) pour définir/modifier les droits.
3. Retenez la correspondance :
   - **r** = 4
   - **w** = 2
   - **x** = 1
4. Combinez pour obtenir un chiffre par catégorie (propriétaire | groupe | autres).

En maîtrisant ces commandes et cette logique, vous pouvez gérer simplement les droits des fichiers et dossiers sous Linux.