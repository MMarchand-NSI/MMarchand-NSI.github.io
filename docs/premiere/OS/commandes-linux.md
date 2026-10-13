# Se déplacer dans l'arborescence

!!! note "Rappel d'ouverture (5 minutes, cours fermé)"
    Réponds **sans rouvrir** la page précédente, en écrivant tes réponses.

    1. Deux programmes rangent chacun une valeur « à l'adresse 1 ». Pourquoi l'un n'écrase-t-il pas l'autre ?
    2. Un programme attend une donnée du disque. Que fait le processeur pendant ce temps ?
    3. Ton programme Python fait `print("bonjour")`. Qui allume les pixels de l'écran ?

    ??? success "Corrigé"
        1. Grâce à la **mémoire virtuelle** : le système d'exploitation range chaque « adresse 1 » à un endroit différent de la vraie mémoire, et retient la correspondance.
        2. L'**ordonnanceur** met ce programme en pause et donne le processeur à un autre.
        3. Pas ton programme : il fait un **appel système**, et c'est le système d'exploitation, par le **pilote** de l'écran, qui agit sur le matériel.

Tu l'as vu sur la page précédente : un programme ne touche jamais le matériel, il **demande** au système d'exploitation. Le **terminal** est l'un des logiciels livrés autour du noyau, et c'est l'interface la plus directe entre toi et le système : tu y tapes des commandes, il les fait exécuter. Beaucoup de systèmes n'ont d'ailleurs pas de fenêtres ni de souris, comme la plupart des serveurs : le terminal est alors le seul moyen de leur parler. Il sert surtout à **lancer des programmes** : `ls` ou `mkdir` sont eux-mêmes de petits programmes, et bientôt tu y lanceras les tiens. Le système range les fichiers du disque dans une **arborescence de répertoires**, et cette page t'apprend à t'y déplacer.

## 1. Le terminal est toujours quelque part

Dans VS Code, ouvre un terminal (**Terminal > Nouveau terminal**). Il s'ouvre directement dans ton dépôt. Tape la commande suivante, puis valide-la avec la touche **Entrée** : une commande ne s'exécute que quand tu appuies sur Entrée.

```bash
pwd
```

`pwd` (*print working directory*) affiche le **répertoire courant** : l'endroit de l'arborescence où se trouve le terminal. Chez toi, il affiche `/home/padawan/PNSINFGR_2_2026-2027` : `padawan` est ton nom d'utilisateur, et `PNSINFGR_2_2026-2027` le répertoire de ton dépôt.

Le répertoire courant s'affiche aussi dans le **prompt**, la ligne où tu tapes tes commandes : tu y lis `~/PNSINFGR_2_2026-2027`, où `~` abrège `/home/padawan`.

## 2. Chemins absolus et chemins relatifs

!!! fondamental "Chemin absolu, chemin relatif"
    Un **chemin absolu** commence par `/`, la **racine**. Il désigne toujours le même endroit, quel que soit le répertoire courant : `/home/padawan/PNSINFGR_2_2026-2027/os/notes`.

    Un **chemin relatif** ne commence pas par `/`. Il se lit **à partir du répertoire courant** : depuis `/home/padawan/PNSINFGR_2_2026-2027`, `os/notes` désigne `/home/padawan/PNSINFGR_2_2026-2027/os/notes`.

!!! hint "Trois raccourcis ultra courants"
    - `.` désigne le répertoire courant.
    - `..` désigne le répertoire **parent**, celui juste au-dessus.
    - `~` désigne ton répertoire personnel, `/home/padawan`.

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
| `code <file>` | ouvre le fichier dans VS Code pour le modifier (le crée à l'enregistrement s'il n'existe pas) | `code td.txt` |
| `cp <src> <dest>` | copie un fichier | `cp td.txt td2.txt` |
| `mv <src> <dest>` | déplace ou renomme | `mv td2.txt archive.txt` |
| `rm <file>` | supprime un fichier | `rm archive.txt` |
| `cat <file> ...` | con**cat**ène les fichiers donnés, dans l'ordre, et écrit le résultat sur la sortie standard (le terminal) | `cat cours.txt td.txt` |

!!! danger "`rm` ne passe pas par la corbeille"
    Un fichier supprimé avec `rm` est perdu. Relis toujours la commande avant de valider.

## 4. Construire l'arborescence de travail

Depuis la **racine de ton dépôt** (là où le terminal s'ouvre), tape ces deux lignes :

```bash
mkdir -p os/notes os/scripts/essais
touch os/notes/cours.txt os/notes/td.txt os/scripts/calcul.py
```

Tu obtiens :

```
PNSINFGR_2_2026-2027/  ← la racine de ton dépôt
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
    Le terminal est à la racine du dépôt, `/home/padawan/PNSINFGR_2_2026-2027`. On tape, dans l'ordre :

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

    Une fois tes cinq réponses écrites, tape les commandes une à une, avec `pwd` après chacune, et compare.

    ??? tip "Indice"
        `..` remonte d'**un** niveau. `../../..` en remonte trois, un par `..`.

    ??? success "Réponses"
        1. `/home/padawan/PNSINFGR_2_2026-2027/os/scripts`
        2. `/home/padawan/PNSINFGR_2_2026-2027/os`
        3. `/home/padawan/PNSINFGR_2_2026-2027/os/notes`
        4. `/home/padawan/PNSINFGR_2_2026-2027/os/scripts/essais`
        5. `/home/padawan/PNSINFGR_2_2026-2027` : depuis `essais`, les trois remontées passent par `scripts`, puis `os`, puis la racine du dépôt.

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
    Le terminal est dans `/home/padawan/PNSINFGR_2_2026-2027/os/notes`. On tape `cd scripts`.

    Sur ton cahier :

    - ce que répond le terminal
    - où se trouve le terminal ensuite
    - la commande qu'il fallait taper pour aller dans `scripts`

    ??? success "Réponses"
        - `bash: cd: scripts: No such file or directory`. Le chemin `scripts` se lit depuis `notes`, et `notes` ne contient pas de répertoire `scripts`.
        - Toujours dans `/home/padawan/PNSINFGR_2_2026-2027/os/notes` : une commande qui échoue ne déplace rien.
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

        `ls ../projet` affiche `images  index.html`, et le chemin absolu est `/home/padawan/PNSINFGR_2_2026-2027/os/projet/index.html`.

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
