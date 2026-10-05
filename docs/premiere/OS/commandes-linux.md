# Se déplacer dans l'arborescence

!!! note "Rappel d'ouverture (5 minutes, cours fermé)"
    Réponds **sans rouvrir** la page précédente, en écrivant tes réponses.

    1. Cite deux rôles d'un système d'exploitation.
    2. Pour chacun, donne un exemple de ce qui se passerait sans lui.

    ??? success "Corrigé"
        Deux parmi : gérer la **mémoire** (sans lui, un programme pourrait écraser la mémoire d'un autre), gérer les **processus** (sans lui, un seul programme tournerait à la fois), gérer le **système de fichiers** (sans lui, le disque serait une suite d'octets sans structure), gérer les **pilotes** (sans lui, chaque programme devrait savoir parler à chaque matériel).

## 1. Le terminal est toujours quelque part

Ouvre ton dépôt dans VS Code, puis le terminal (**Terminal > Nouveau terminal**). Tape :

```bash
pwd
```

`pwd` (*print working directory*) affiche le **répertoire courant** : l'endroit de l'arborescence où se trouve le terminal. Chez toi, le résultat ressemble à `/home/eleve/nsi`, avec ton nom d'utilisateur et le nom de ton dépôt.

!!! warning "Vérifie que ta réponse commence par `/home/`"
    Si `pwd` affiche un chemin qui commence par `/mnt/c/`, ton dépôt est sur le disque Windows. Une partie de la séance suivante ne fonctionnera pas : **appelle ton professeur**.

Le répertoire courant ne s'affiche **jamais tout seul**. Le terminal le connaît, toi tu dois le demander, ou le suivre de tête. C'est lui qui fait réussir ou échouer la plupart des commandes de cette page.

## 2. Chemins absolus et chemins relatifs

Un **chemin absolu** commence par `/`, la **racine**. Il désigne toujours le même endroit, quel que soit le répertoire courant : `/home/eleve/nsi/os/notes`.

Un **chemin relatif** ne commence pas par `/`. Il se lit **à partir du répertoire courant** : depuis `/home/eleve/nsi`, `os/notes` désigne `/home/eleve/nsi/os/notes`.

Trois raccourcis :

- `.` désigne le répertoire courant.
- `..` désigne le répertoire **parent**, celui juste au-dessus.
- `~` désigne ton répertoire personnel, `/home/eleve`.

## 3. Les commandes de la séance

| Commande | Ce qu'elle fait | Exemple |
|---|---|---|
| `pwd` | affiche le répertoire courant | `pwd` |
| `ls` | liste le contenu d'un répertoire (le courant, si on n'en donne pas) | `ls os` |
| `ls -a` | liste **aussi** les fichiers cachés, dont le nom commence par `.` | `ls -a` |
| `cd <dir>` | change le répertoire courant | `cd os/notes` |
| `cd ..` | remonte au parent | `cd ..` |
| `mkdir <dir>` | crée un répertoire | `mkdir essais` |
| `mkdir -p a/b` | crée un répertoire et ceux qui manquent sur le chemin | `mkdir -p os/scripts/essais` |
| `touch <file>` | crée un fichier vide | `touch td.txt` |
| `cp <src> <dest>` | copie un fichier | `cp td.txt td2.txt` |
| `mv <src> <dest>` | déplace ou renomme | `mv td2.txt archive.txt` |
| `rm <file>` | supprime un fichier | `rm archive.txt` |
| `cat <file> ...` | con**cat**ène les fichiers donnés, dans l'ordre, et écrit le résultat sur la sortie standard (le terminal) | `cat cours.txt td.txt` |

!!! danger "`rm` ne passe pas par la corbeille"
    Un fichier supprimé avec `rm` est perdu. Relis toujours la commande avant de valider.

## 4. Construire l'arborescence de travail

Depuis la **racine de ton dépôt** (là où `pwd` t'a placé en ouvrant le terminal), tape ces deux lignes :

```bash
mkdir -p os/notes os/scripts/essais
touch os/notes/cours.txt os/notes/td.txt os/scripts/calcul.py
```

Tu obtiens :

```
nsi/                  ← la racine de ton dépôt
└── os/
    ├── notes/
    │   ├── cours.txt
    │   └── td.txt
    └── scripts/
        ├── calcul.py
        └── essais/
```

Recopie ce schéma sur ton cahier : il sert pour tous les exercices.

## 5. Prédire avant de taper

!!! question "Exercice 1 : où est le terminal ?"
    Le terminal est à la racine du dépôt, `/home/eleve/nsi`. On tape, dans l'ordre :

    ```bash linenums="1"
    cd os/scripts
    cd ..
    cd notes
    cd ../scripts/essais
    cd ../../..
    ```

    Sur ton cahier, écris ce qu'afficherait `pwd` :

    - après la ligne 1
    - après la ligne 2
    - après la ligne 3
    - après la ligne 4
    - après la ligne 5

    Pose ton doigt sur le schéma à chaque ligne. Une fois tes cinq réponses écrites, tape les commandes une à une, avec `pwd` après chacune, et compare.

    ??? tip "Indice"
        `..` remonte d'**un** niveau. `../../..` en remonte trois, un par `..`.

    ??? success "Réponses"
        1. `/home/eleve/nsi/os/scripts`
        2. `/home/eleve/nsi/os`
        3. `/home/eleve/nsi/os/notes`
        4. `/home/eleve/nsi/os/scripts/essais`
        5. `/home/eleve/nsi` : depuis `essais`, les trois remontées passent par `scripts`, puis `os`, puis la racine du dépôt.

!!! question "Exercice 2 : que va afficher `ls` ?"
    Le terminal est revenu à la racine du dépôt. Sur ton cahier, écris ce qu'affiche chacune de ces commandes :

    ```bash linenums="1"
    ls os
    ls os/scripts
    ls -a os/notes
    ```

    Tape-les ensuite et compare.

    ??? success "Réponses"
        1. `notes  scripts`
        2. `calcul.py  essais` : `ls` liste les fichiers **et** les répertoires, et `essais` existe même s'il est vide.
        3. `.  ..  cours.txt  td.txt` : avec `-a`, `ls` montre aussi `.` et `..`, qui existent dans tout répertoire.

!!! question "Exercice 3 : une commande qui échoue"
    Le terminal est dans `/home/eleve/nsi/os/notes`. On tape `cd scripts`.

    Sur ton cahier :

    - ce que répond le terminal
    - où se trouve le terminal ensuite
    - la commande qu'il fallait taper pour aller dans `scripts`

    ??? success "Réponses"
        - `bash: cd: scripts: No such file or directory`. Le chemin `scripts` se lit depuis `notes`, et `notes` ne contient pas de répertoire `scripts`.
        - Toujours dans `/home/eleve/nsi/os/notes` : une commande qui échoue ne déplace rien.
        - `cd ../scripts`

## 6. À toi

!!! question "Exercice 4 : construire avec des chemins relatifs"
    Place-toi dans `os/notes`. **Sans quitter ce répertoire**, et en n'utilisant que des chemins **relatifs** :

    - crée un répertoire `projet` à côté de `notes`, dans `os`
    - crée un répertoire `images` dans `projet`
    - crée un fichier vide `index.html` dans `projet`

    Vérifie avec `ls ../projet`. Puis écris sur ton cahier le **chemin absolu** de `index.html`.

    ??? tip "Indice léger"
        Où est `os` quand tu es dans `notes` ?

    ??? tip "Indice plus précis"
        `os` est le parent de `notes`, donc `..`. Tout ce qui est à créer dans `os` commence par `../`.

    ??? question "Avant d'ouvrir la solution"
        En une phrase, sur ton cahier : qu'est-ce que l'indice t'a appris sur ce qui n'allait pas dans **tes** commandes ?

    ??? success "Solution"
        ```bash
        mkdir ../projet
        mkdir ../projet/images
        touch ../projet/index.html
        ```

        `ls ../projet` affiche `images  index.html`, et le chemin absolu est `/home/eleve/nsi/os/projet/index.html`.

!!! question "Exercice 5 : les fichiers cachés"
    Reviens à la racine de ton dépôt et compare `ls` et `ls -a`. Sur ton cahier, note les noms qui n'apparaissent qu'avec `-a`.

    ??? success "Réponse"
        Au moins `.`, `..` et `.git`, le répertoire où sont rangées les informations du dépôt. Selon ton dépôt, d'autres noms qui commencent par un point peuvent apparaître. On les voit, on n'y touche pas.

## Résumé

- Le terminal a toujours un **répertoire courant**, que `pwd` affiche.
- Un chemin **absolu** commence par `/`, un chemin **relatif** se lit depuis le répertoire courant.
- `..` est le parent, `.` le répertoire courant.
- Une commande qui échoue ne change pas le répertoire courant. Devant `No such file or directory`, le premier réflexe est `pwd`.

---

**Pour aller plus loin**

??? info "Redirections et pipes"
    | Syntaxe | Ce qu'elle fait | Exemple |
    |---|---|---|
    | `cmd > file` | écrit la sortie de `cmd` dans `file` (écrase) | `ls > liste.txt` |
    | `cmd >> file` | ajoute la sortie à la fin de `file` | `echo "log" >> journal.txt` |
    | `cmd1 \| cmd2` | la sortie de `cmd1` devient l'entrée de `cmd2` | `ls \| wc -l` |

??? info "Chercher un fichier ou un mot"
    | Commande | Ce qu'elle fait | Exemple |
    |---|---|---|
    | `grep <motif> <file>` | cherche un motif dans un fichier | `grep "def" calcul.py` |
    | `grep -r <motif> <dir>` | cherche dans tout un répertoire | `grep -r "TODO" os` |
    | `find <dir> -name <nom>` | trouve des fichiers par leur nom | `find . -name "*.py"` |

??? info "Les processus"
    Un **processus** est un programme en cours d'exécution, repéré par un numéro, son **PID**.

    | Commande | Ce qu'elle fait |
    |---|---|
    | `ps` | affiche les processus du terminal |
    | `top` | affiche les processus en temps réel (quitter avec `q`) |
    | `kill <PID>` | demande au processus de s'arrêter |

- Tutoriel Linux complet (5 h) : [https://www.youtube.com/watch?v=ZtqBQ68cfJc](https://www.youtube.com/watch?v=ZtqBQ68cfJc)
