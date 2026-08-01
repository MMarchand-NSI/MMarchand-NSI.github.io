# Système de fichiers et commandes Linux

## 1. Système de fichiers Linux

### 1.1 Chemins absolus et relatifs

#### Chemin absolu

Un **chemin absolu** commence **toujours par `/`** (la racine) et indique l'emplacement exact d'un fichier depuis la racine.

**Exemple** : `/home/alice/Documents/notes.txt`

Peu importe où vous êtes dans l'arborescence, ce chemin vous amène toujours au même fichier.

#### Chemin relatif

Un **chemin relatif** ne commence **pas par `/`** et dépend de votre **position actuelle** dans l'arborescence.

**Exemple** : si vous êtes dans `/home/alice/`, alors :

- `Documents/notes.txt` désigne `/home/alice/Documents/notes.txt`
- `../bob/` désigne `/home/bob/` (on remonte d'un niveau avec `..`)

**Raccourcis** :

- `.` désigne le **répertoire courant**
- `..` désigne le **répertoire parent** (celui au-dessus)
- `~` désigne le **répertoire personnel** de l'utilisateur (`/home/alice` si vous êtes alice)

!!! example "Navigation"
    ```bash
    pwd                    # Affiche : /home/alice
    cd Documents           # Va dans /home/alice/Documents
    pwd                    # Affiche : /home/alice/Documents
    cd ..                  # Remonte à /home/alice
    cd /etc                # Va dans /etc (chemin absolu)
    cd ~/Documents         # Va dans /home/alice/Documents (~ = home)
    ```

## 2. Commandes Linux de base

Voici un **tableau de référence** des commandes essentielles :

### 2.1 Navigation et information

| Commande | Description | Exemple |
|----------|-------------|---------|
| `pwd` | **P**rint **W**orking **D**irectory : affiche le répertoire courant | `pwd` → `/home/alice` |
| `ls` | **L**i**s**t : liste les fichiers et dossiers | `ls` |
| `ls -l` | Liste détaillée (permissions, taille, date) | `ls -l` |
| `ls -a` | Liste **tous** les fichiers (y compris les cachés `.`) | `ls -a` |
| `ls -lh` | Liste avec tailles **h**umainement lisibles (Ko, Mo, Go) | `ls -lh` |
| `cd <dir>` | **C**hange **D**irectory : change de répertoire | `cd Documents` |
| `cd ..` | Remonte au répertoire parent | `cd ..` |
| `cd ~` | Va dans le répertoire personnel | `cd ~` |
| `cd /` | Va à la racine | `cd /` |

### 2.2 Manipulation de fichiers et répertoires

| Commande | Description | Exemple |
|----------|-------------|---------|
| `mkdir <dir>` | **M**a**k**e **dir**ectory : crée un répertoire | `mkdir projet` |
| `mkdir -p a/b/c` | Crée une arborescence complète | `mkdir -p dossier/sous-dossier` |
| `touch <file>` | Crée un fichier vide (ou met à jour la date de modification) | `touch notes.txt` |
| `cp <src> <dest>` | **C**o**p**y : copie un fichier | `cp test.txt backup.txt` |
| `cp -r <dir1> <dir2>` | Copie un répertoire **r**écursivement | `cp -r projet/ backup/` |
| `mv <src> <dest>` | **M**o**v**e : déplace ou renomme | `mv old.txt new.txt` |
| `rm <file>` | **R**e**m**ove : supprime un fichier | `rm test.txt` |
| `rm -r <dir>` | Supprime un répertoire et son contenu | `rm -r dossier/` |
| `rm -rf <dir>` | Supprime **f**orcément (sans confirmation) | ⚠️ **Dangereux** : `rm -rf /` détruit tout ! |

!!! danger "Attention avec rm"
    `rm` supprime **définitivement** les fichiers (pas de corbeille). `rm -rf` est encore plus dangereux : il supprime tout sans demander de confirmation.

### 2.3 Affichage et édition de fichiers

| Commande | Description | Exemple |
|----------|-------------|---------|
| `cat <file>` | Con**cat**enate : affiche le contenu complet d'un fichier | `cat notes.txt` |
| `head <file>` | Affiche les **10 premières lignes** | `head fichier.log` |
| `head -n 5 <file>` | Affiche les 5 premières lignes | `head -n 5 fichier.log` |
| `tail <file>` | Affiche les **10 dernières lignes** | `tail fichier.log` |
| `tail -f <file>` | Affiche les dernières lignes et **suit** les ajouts en temps réel | `tail -f /var/log/syslog` |
| `less <file>` | Affiche un fichier page par page (navigation avec ↑↓, quitter avec `q`) | `less long.txt` |
| `nano <file>` | Éditeur de texte simple (Ctrl+O pour sauver, Ctrl+X pour quitter) | `nano config.txt` |

### 2.4 Recherche

| Commande | Description | Exemple |
|----------|-------------|---------|
| `grep <motif> <file>` | Cherche un motif dans un fichier | `grep "error" fichier.log` |
| `grep -r <motif> <dir>` | Cherche **r**écursivement dans tous les fichiers d'un répertoire | `grep -r "TODO" projet/` |
| `grep -i <motif>` | Recherche **i**nsensible à la casse | `grep -i "erreur" log.txt` |
| `find <dir> -name <nom>` | Trouve des fichiers par nom | `find /home -name "*.txt"` |
| `find <dir> -type f` | Trouve tous les **f**ichiers | `find . -type f` |
| `find <dir> -type d` | Trouve tous les répertoires (**d**irectory) | `find . -type d` |

### 2.5 Redirections et pipes

Les **redirections** permettent de rediriger l'entrée/sortie des commandes. Les **pipes** permettent de chaîner des commandes.

| Syntaxe | Description | Exemple |
|---------|-------------|---------|
| `cmd > file` | Redirige la **sortie** de `cmd` dans `file` (écrase) | `ls > liste.txt` |
| `cmd >> file` | **Ajoute** la sortie à la fin de `file` | `echo "log" >> fichier.log` |
| `cmd < file` | Utilise `file` comme **entrée** de `cmd` | `sort < noms.txt` |
| `cmd1 \| cmd2` | **Pipe** : la sortie de `cmd1` devient l'entrée de `cmd2` | `ls \| grep ".txt"` |

!!! example "Exemples de pipes"
    ```bash
    # Compter le nombre de fichiers dans le répertoire
    ls | wc -l

    # Afficher les 5 fichiers les plus gros
    ls -lh | sort -k5 -h | tail -5

    # Chercher "error" dans tous les logs et compter les occurrences
    grep -r "error" /var/log/ | wc -l

    # Afficher les processus Python en cours
    ps aux | grep python
    ```

### 2.6 Permissions

Sous Linux, chaque fichier a des **permissions** qui déterminent qui peut le lire, l'écrire, ou l'exécuter.

#### Afficher les permissions

```bash
ls -l fichier.txt
-rw-r--r-- 1 alice users 1234 Jan 10 12:00 fichier.txt
```

Décomposition de `-rw-r--r--` :

- **1er caractère** : type (`-` = fichier, `d` = répertoire, `l` = lien symbolique)
- **3 caractères suivants** : permissions du **propriétaire** (alice) → `rw-` = lecture + écriture
- **3 suivants** : permissions du **groupe** (users) → `r--` = lecture seule
- **3 derniers** : permissions des **autres** utilisateurs → `r--` = lecture seule

**Signification** :

- `r` = **r**ead (lecture) : peut lire le fichier
- `w` = **w**rite (écriture) : peut modifier le fichier
- `x` = e**x**ecute (exécution) : peut exécuter le fichier (s'il est un programme ou script)

#### Modifier les permissions avec `chmod`

**Syntaxe symbolique** :

```bash
chmod u+x script.sh     # Ajoute le droit d'exécution pour le user (propriétaire)
chmod g+w fichier.txt   # Ajoute l'écriture pour le group
chmod o-r fichier.txt   # Retire la lecture pour les others
chmod a+x script.sh     # Ajoute l'exécution pour all (u+g+o)
```

**Syntaxe octale** (plus compacte) :

Chaque permission a une valeur : `r=4`, `w=2`, `x=1`. On additionne pour obtenir un chiffre :

- `rwx` = 4+2+1 = **7**
- `rw-` = 4+2 = **6**
- `r-x` = 4+1 = **5**
- `r--` = **4**

```bash
chmod 755 script.sh     # rwxr-xr-x (propriétaire: tout, groupe+autres: lecture+exec)
chmod 644 fichier.txt   # rw-r--r-- (propriétaire: lire+écrire, autres: lire)
chmod 600 secret.txt    # rw------- (seul le propriétaire peut lire/écrire)
```

!!! example "Rendre un script exécutable"
    Vous créez un script Python `test.py`. Par défaut, il n'est pas exécutable :

    ```bash
    ls -l test.py
    -rw-r--r-- 1 alice users 245 Jan 10 12:00 test.py

    ./test.py              # ❌ Erreur : Permission denied

    chmod +x test.py       # Rend le fichier exécutable

    ./test.py              # ✅ Le script s'exécute
    ```

### 2.7 Gestion des processus

Un **processus** est un programme en cours d'exécution. Chaque processus a un **PID** (*Process ID*), un numéro unique.

| Commande | Description | Exemple |
|----------|-------------|---------|
| `ps` | Affiche les processus du terminal actuel | `ps` |
| `ps aux` | Affiche **tous** les processus de tous les utilisateurs | `ps aux` |
| `top` | Affiche les processus en temps réel (CPU, RAM) - sortir avec `q` | `top` |
| `htop` | Version améliorée de `top` (à installer : `sudo apt install htop`) | `htop` |
| `kill <PID>` | Envoie un signal TERM (terminaison propre) au processus | `kill 1234` |
| `kill -9 <PID>` | **Force** l'arrêt du processus (SIGKILL, brutal) | `kill -9 1234` |
| `killall <nom>` | Tue tous les processus avec ce nom | `killall firefox` |

!!! example "Trouver et tuer un processus bloqué"
    ```bash
    # Trouver le PID d'un programme bloqué (ex: Firefox)
    ps aux | grep firefox
    # alice  1234  5.2  2.1  firefox

    # Tuer le processus
    kill 1234

    # Si ça ne marche pas, forcer :
    kill -9 1234
    ```

**Lancer un processus en arrière-plan** :

```bash
python3 serveur.py &      # Le & lance en arrière-plan
jobs                       # Liste les processus en arrière-plan
fg %1                      # Ramène le job 1 au premier plan
```

### 2.8 Gestion des paquets (Alpine Linux)

Alpine utilise `apk` comme gestionnaire de paquets :

| Commande | Description |
|----------|-------------|
| `doas apk update` | Met à jour la liste des paquets disponibles |
| `doas apk upgrade` | Met à jour tous les paquets installés |
| `doas apk add <paquet>` | Installe un paquet |
| `doas apk del <paquet>` | Désinstalle un paquet |
| `apk search <mot>` | Cherche un paquet |

!!! info "doas vs sudo"
    - **`sudo`** : **S**uper**u**ser **do** (utilisé sur Ubuntu, Debian, etc.)
    - **`doas`** : **Do as** (utilisé sur Alpine, OpenBSD) - plus simple et léger

    Les deux permettent d'exécuter une commande avec les privilèges de `root` (superutilisateur).

## Résumé

- Le système de fichiers Linux est une **arborescence** partant de `/`
- **Chemin absolu** : commence par `/` (ex: `/home/alice/fichier.txt`)
- **Chemin relatif** : dépend du répertoire courant (ex: `../bob/`)
- Les **permissions** (`rwx`) contrôlent qui peut lire/écrire/exécuter un fichier
- **`chmod`** modifie les permissions (syntaxe symbolique ou octale)
- Les **redirections** (`>`, `<`) et **pipes** (`|`) permettent de chaîner des commandes
- Les **processus** sont gérés avec `ps`, `top`, `kill`

**Commandes essentielles à retenir** : `pwd`, `ls`, `cd`, `mkdir`, `touch`, `cp`, `mv`, `rm`, `cat`, `grep`, `chmod`, `ps`, `top`, `kill`

---

**Pour aller plus loin** :

- Tutoriel Linux complet (5h) : [https://www.youtube.com/watch?v=ZtqBQ68cfJc](https://www.youtube.com/watch?v=ZtqBQ68cfJc)
