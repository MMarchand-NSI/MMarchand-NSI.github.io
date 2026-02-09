# TP : Installation d'Alpine Linux

## Introduction

Nous allons installer **Alpine Linux**, une distribution légère, dans une **machine virtuelle** QEMU. Cette installation est plus technique qu'une installation graphique classique, mais permet de :

- S'habituer à la ligne de commande
- Comprendre toutes les étapes du boot et de l'installation
- Économiser les ressources (Alpine est ultra-léger)

!!! warning "Ressources"
    Les ordinateurs du lycée ne sont pas très puissants. **Fermez tous les programmes inutiles** (Pronote, navigateurs...) pendant le TP pour libérer de la RAM.

## 1. Préparation (MSYS2 + QEMU)

Nous utilisons **MSYS2** (un environnement Linux pour Windows) et **QEMU** (un émulateur de machine virtuelle).

1. **Ouvrir MSYS2 UCRT64** (chercher avec la loupe Windows)

2. **Mettre à jour MSYS2** :
   ```bash
   pacman -Syu
   ```
   Répétez jusqu'à voir "there is nothing to do". Si le terminal demande à être fermé, fermez-le et relancez UCRT64.

3. **Installer QEMU** :
   ```bash
   pacman -S mingw-w64-x86_64-qemu
   ```

4. **Télécharger Alpine Linux** :
   ```bash
   wget https://dl-cdn.alpinelinux.org/alpine/v3.21/releases/x86_64/alpine-virt-3.21.3-x86_64.iso
   ```

## 2. Installation

### 2.1 Créer un disque dur virtuel de 5 Go

```bash
qemu-img create -f qcow2 disquedur.qcow2 5G
```

Cette commande crée un fichier `disquedur.qcow2` qui simule un disque dur de 5 Go.

### 2.2 Démarrer la machine virtuelle avec le CD d'installation

```bash
qemu-system-x86_64 -boot d -cdrom alpine-virt-3.21.3-x86_64.iso -hda disquedur.qcow2 -m 256 -net nic -net user
```

**Explication** :

- `-boot d` : boot sur le CD-ROM (d = drive)
- `-cdrom ...` : insère le fichier ISO comme CD
- `-hda disquedur.qcow2` : branche le disque dur virtuel
- `-m 256` : alloue 256 Mo de RAM (256M)
- `-net nic -net user` : active le réseau

### 2.3 Login

Une fois le système démarré, login : `root` (pas de mot de passe pour l'instant)

### 2.4 Lancer l'installation

```bash
setup-alpine
```

### 2.5 Répondre aux questions

Suivez ces réponses (appuyez sur Entrée pour accepter les valeurs par défaut) :

- **Keyboard layout** : `fr` puis `fr` (clavier français)
- **Hostname** : `localhost` (ou un nom de votre choix)
- **Network** : Entrée (accepter DHCP automatique)
- **Root password** : `root` (simple pour le TP)
- **Timezone** : `Europe/Paris`
- **Proxy** : Entrée (aucun)
- **NTP client** : `chrony` (par défaut)
- **Mirror** : `f` puis Entrée (choix rapide)
- **SSH server** : `openssh` (par défaut)
- **Disk** : `sda` (le disque virtuel créé)
- **Mode** : `sys` (installation complète sur disque)
- **Erase disk ?** : `y` (oui, confirmer)

L'installation démarre. Attendez quelques minutes.

### 2.6 Éteindre

Une fois l'installation terminée :

```bash
doas poweroff
```

### 2.7 Redémarrer sans le CD

```bash
qemu-system-x86_64 -hda disquedur.qcow2 -m 256 -nic user,ipv6=off,hostfwd=tcp::22022-:22
```

Maintenant le système boot **depuis le disque virtuel** (plus besoin du CD).

Login : `root` / mot de passe : `root`

!!! success "Vous avez installé Linux !"
    Votre machine virtuelle Alpine Linux est prête. Vous pouvez maintenant :

    - Installer des programmes : `doas apk add python3 nano`
    - Créer des fichiers, naviguer dans l'arborescence
    - Apprendre les commandes Linux dans un environnement réel

## 3. Interface graphique (optionnel)

Alpine peut avoir une interface graphique, mais ça consomme beaucoup de ressources. **À la maison**, si vous avez plus de RAM (4 Go ou plus), vous pouvez :

1. Allouer plus de RAM à la VM : `-m 2G` au lieu de `-m 256`
2. Installer un environnement graphique :
   ```bash
   setup-desktop
   ```
   Choisir **xfce** (le plus léger)
3. Redémarrer

Vous aurez alors une interface similaire à Windows :

![Interface XFCE](image-6.png)

## 4. Exercices pratiques

### Exercice 1 : Premiers pas

Connectez-vous à votre machine virtuelle Alpine et :

1. Affichez le répertoire courant avec `pwd`
2. Listez les fichiers avec `ls -la`
3. Allez dans `/etc` avec `cd /etc`
4. Affichez le contenu du fichier `/etc/hostname` avec `cat /etc/hostname`
5. Revenez dans votre répertoire personnel avec `cd ~`

### Exercice 2 : Mise à jour et installation

1. Mettez à jour la liste des paquets : `doas apk update`
2. Mettez à jour tous les paquets : `doas apk upgrade`
3. Installez Python et nano : `doas apk add python3 nano`
4. Vérifiez l'installation : `python3 --version`

### Exercice 3 : Script Python

1. Créez un fichier `test.py` avec nano : `nano test.py`
2. Écrivez ce contenu :
   ```python
   #!/usr/bin/python3
   import random
   print(f"Voici un entier aléatoire : {random.randint(1, 100)}")
   ```
3. Sauvegardez (Ctrl+O) et quittez (Ctrl+X)
4. Essayez d'exécuter : `./test.py`
   - **Erreur** : Permission denied
5. Rendez le fichier exécutable : `chmod +x test.py`
6. Exécutez à nouveau : `./test.py` → ça fonctionne !

### Exercice 4 : Création d'arborescence

Créez un fichier `arbo.sh` qui contient toutes les commandes pour créer l'arborescence suivante :

```
Mon_Site/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── images/
    ├── logo.png
    └── banniere.jpg
```

**Solution** :

```bash
#!/bin/bash
mkdir -p Mon_Site/css Mon_Site/js Mon_Site/images
touch Mon_Site/index.html
touch Mon_Site/css/style.css
touch Mon_Site/js/script.js
touch Mon_Site/images/logo.png
touch Mon_Site/images/banniere.jpg
```

Rendez le script exécutable et exécutez-le :

```bash
chmod +x arbo.sh
./arbo.sh
ls -R Mon_Site/
```

### Exercice 5 : Questions de compréhension

1. **Navigation et gestion des répertoires**
   - Quelle est la différence entre `cd /home` et `cd home` ?
   - Quelle commande affiche le répertoire courant ?
   - Comment revenir au répertoire parent ?

??? success "Réponses"
    - `cd /home` : chemin absolu (va toujours dans `/home`)
    - `cd home` : chemin relatif (va dans `home/` depuis le répertoire courant)
    - `pwd` : affiche le répertoire courant
    - `cd ..` : remonte au parent

2. **Listing et informations sur les fichiers**
   - À quoi sert `ls` ? Citez deux options utiles.
   - Quelle différence entre `ls` et `ls -l` ?

??? success "Réponses"
    - `ls` : liste les fichiers
    - Options : `-a` (tout, y compris les cachés), `-l` (détails), `-h` (tailles lisibles)
    - `ls -l` : affiche les permissions, propriétaire, taille, date

3. **Création et suppression**
   - Comment créer un fichier vide ? (deux méthodes)
   - Supprimer un répertoire vide ? Un répertoire non vide ?

??? success "Réponses"
    - `touch fichier.txt` ou `> fichier.txt`
    - Vide : `rmdir dossier/` ou `rm -r dossier/`
    - Non vide : `rm -r dossier/`

4. **Copie et déplacement**
   - Copier `source.txt` en `destination.txt` ?
   - Renommer `test.txt` en `test2.txt` ?

??? success "Réponses"
    - `cp source.txt destination.txt`
    - `mv test.txt test2.txt`

5. **Recherche de texte**
   - Chercher un mot-clé dans un fichier ?
   - Chercher "linux" dans tous les fichiers du répertoire ?

??? success "Réponses"
    - `grep "mot" fichier.txt`
    - `grep -r "linux" .`

6. **Permissions**
   - Afficher les permissions d'un fichier ?
   - Que signifie `rwxr-xr--` ?
   - À quoi sert `chmod` ?

??? success "Réponses"
    - `ls -l fichier`
    - Propriétaire : lecture+écriture+exécution, groupe : lecture+exécution, autres : lecture
    - `chmod` : modifier les permissions. Ex : `chmod +x script.sh`

7. **Recherche de fichiers**
   - Chercher un fichier `notes.txt` ?
   - Trouver tous les fichiers `.txt` ?

??? success "Réponses"
    - `find . -name "notes.txt"`
    - `find . -name "*.txt"`

8. **Affichage du contenu**
   - Afficher tout le contenu d'un fichier ?
   - Afficher les premières/dernières lignes ?

??? success "Réponses"
    - `cat fichier.txt`
    - Premières : `head fichier.txt`, dernières : `tail fichier.txt`

9. **Redirections et pipes**
   - Que fait `ls > liste.txt` ?
   - À quoi sert `|` ?

??? success "Réponses"
    - Redirige la sortie de `ls` dans `liste.txt` (écrase le fichier)
    - Pipe : envoie la sortie d'une commande vers une autre. Ex : `ls | grep ".txt"`

10. **Processus**
    - Afficher les processus en temps réel ?
    - Lister tous les processus ?

??? success "Réponses"
    - `top` ou `htop`
    - `ps aux`

## Résumé

Vous avez maintenant :

- Installé **Alpine Linux** dans une machine virtuelle QEMU
- Appris à utiliser les **commandes de base** Linux
- Compris le fonctionnement des **permissions**
- Créé et exécuté des **scripts**
- Manipulé des **fichiers et répertoires**

Ces compétences sont fondamentales pour comprendre les systèmes d'exploitation et l'administration système.

---

**Commandes pour démarrer/arrêter la VM** :

- **Démarrer** : `qemu-system-x86_64 -hda disquedur.qcow2 -m 256 -nic user,ipv6=off,hostfwd=tcp::22022-:22`
- **Arrêter** : `doas poweroff`
