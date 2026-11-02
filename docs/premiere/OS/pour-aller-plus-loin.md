# Pour aller plus loin : regarder le système travailler

Tu sais te déplacer dans l'arborescence, lire les droits d'un fichier et lancer un programme de deux façons. Cette page va plus loin sur deux terrains.

- Les droits d'un **répertoire**, qui ne veulent pas dire la même chose que ceux d'un fichier.
- Les **trois rôles** du système d'exploitation vus sur la première page, cette fois **mesurés** au lieu d'être racontés.

La méthode ne change pas : tu écris ta prédiction sur ton cahier, puis tu tapes la commande et tu compares. Les durées et les tailles que tu liras ne seront pas exactement les miennes, elles dépendent de ta machine. C'est leur **rapport** qui compte.

## 1. Les droits d'un répertoire

Place-toi dans le répertoire `os` de ton dépôt et prépare le terrain :

```bash
mkdir coffre
echo "le code est 4821" > coffre/secret.txt
ls -ld coffre
ls -l coffre
```

`ls -ld coffre` affiche les droits **du répertoire** et non de son contenu, grâce à l'option `-d`. Tu lis `drwxr-xr-x` : le `d` du début dit que c'est un répertoire.

!!! question "Exercice 1 : retirer le droit `x` au répertoire"
    Tape `chmod u-x coffre`, puis `ls -ld coffre` pour vérifier que tu lis `drw-r-xr-x`.

    Pour le propriétaire, seul le premier paquet compte, et il vaut maintenant `rw-`. Le répertoire a perdu le droit `x`, et garde `r`.

    Sur ton cahier, écris ce que va répondre le terminal pour chacune des quatre commandes :

    ```bash linenums="1"
    ls coffre
    ls -l coffre
    cat coffre/secret.txt
    cd coffre
    ```

    Tape-les ensuite, dans cet ordre, et compare.

    ??? success "Réponses"
        1. `secret.txt`. Le nom s'affiche.
        2. Deux lignes étranges :
        ```
        ls: cannot access 'coffre/secret.txt': Permission denied
        total 0
        -????????? ? ? ? ?            ? secret.txt
        ```
        Le nom est connu, et **rien d'autre** : ni les droits, ni la taille, ni la date.
        3. `cat: coffre/secret.txt: Permission denied`
        4. `bash: cd: coffre: Permission denied`

Le résultat est net : tu connais le nom du fichier, tu ne peux ni le lire, ni même savoir sa taille, ni entrer dans le répertoire.

!!! fondamental "Les trois droits d'un répertoire"
    Un répertoire est une **liste** qui associe des noms à des fichiers. Ses trois droits portent sur cette liste :

    - `r` : **lire la liste des noms**. C'est ce que fait `ls`.
    - `x` : **traverser** le répertoire, c'est-à-dire passer à travers pour atteindre ce qu'il contient. C'est ce dont ont besoin `cd`, `cat coffre/secret.txt` et toute commande qui donne un chemin passant par lui.
    - `w` : **modifier la liste**, donc ajouter ou retirer des noms.

    Sur un répertoire, `x` ne veut donc pas dire « exécuter ». La même lettre ne désigne pas la même chose selon qu'elle porte sur un fichier ou sur un répertoire.

!!! question "Exercice 2 : échanger les deux droits"
    Tape `chmod u+x,u-r coffre`, puis `ls -ld coffre` : tu dois lire `d-wxr-xr-x`. Cette fois le répertoire a `x` et n'a plus `r`, exactement l'inverse de l'exercice 1.

    Prédis les trois réponses, puis tape :

    ```bash linenums="1"
    ls coffre
    cat coffre/secret.txt
    cd coffre
    ```

    ??? success "Réponses"
        1. `ls: cannot open directory 'coffre': Permission denied`
        2. `le code est 4821`
        3. La commande réussit : `pwd` affiche le chemin de `coffre`.

    ??? question "Avant de continuer"
        En une phrase sur ton cahier : comment peut-on lire un fichier dans un répertoire dont on ne peut pas afficher le contenu ?

        ??? success "Réponse"
            En connaissant son nom. Le droit `r` sert à **découvrir** les noms, le droit `x` à **s'en servir**. Sans `r`, un nom qu'on connaît déjà fonctionne encore. C'est le principe du répertoire dont on ne donne la clé qu'avec l'adresse exacte du fichier.

Remets les deux droits avant de continuer :

```bash
chmod u+rx coffre
```

### Supprimer un fichier n'est pas un droit du fichier

!!! question "Exercice 3 : qui décide de la suppression ?"
    Prépare un fichier en lecture seule dans un répertoire, lui, modifiable :

    ```bash
    echo "important" > coffre/notes.txt
    chmod u-w coffre/notes.txt
    ls -ld coffre
    ls -l coffre/notes.txt
    ```

    Tu lis `drwxr-xr-x` pour le répertoire et `-r--r--r--` pour le fichier : le fichier ne peut pas être modifié par son propriétaire.

    Prédis les deux réponses, puis tape :

    ```bash linenums="1"
    echo "bonjour" > coffre/notes.txt
    rm coffre/notes.txt
    ```

    ??? tip "Indice"
        Relis l'encart sur les trois droits. Le nom `notes.txt` est écrit dans quelle liste ?

    ??? success "Réponses"
        1. `bash: coffre/notes.txt: Permission denied`. Sans le droit `w` sur le fichier, impossible d'écrire dedans.
        2. Le terminal demande confirmation, parce que le fichier est protégé en écriture :
        ```
        rm: remove write-protected regular file 'coffre/notes.txt'?
        ```
        Réponds `y` : **le fichier est supprimé**, alors que tu ne pouvais pas le modifier.

Maintenant l'inverse.

!!! question "Exercice 4 : l'inverse"
    ```bash
    echo "important" > coffre/notes.txt
    chmod u-w coffre
    ls -ld coffre
    ls -l coffre/notes.txt
    ```

    Cette fois le répertoire est `dr-xr-xr-x` et le fichier `-rw-r--r--` : c'est le répertoire qui a perdu `w`.

    Prédis les trois réponses, puis tape :

    ```bash linenums="1"
    echo "bonjour" > coffre/notes.txt
    rm coffre/notes.txt
    touch coffre/neuf.txt
    ```

    ??? success "Réponses"
        1. Aucune réponse : la commande réussit. `cat coffre/notes.txt` affiche `bonjour`, le contenu a bien été remplacé.
        2. `rm: cannot remove 'coffre/notes.txt': Permission denied`
        3. `touch: cannot touch 'coffre/neuf.txt': Permission denied`

    ??? success "Ce qu'il faut en retenir"
        **Supprimer un fichier n'est pas un droit du fichier, c'est un droit du répertoire qui le contient.** Créer non plus.

        La raison tient à ce qu'est un répertoire : son **nom** est une ligne de la liste. Supprimer `notes.txt`, c'est retirer cette ligne, donc modifier le répertoire. Le contenu du fichier n'a rien à voir dans l'affaire.

Rends le droit d'écriture avant de continuer :

```bash
chmod u+w coffre
```

!!! question "Exercice 5 : un chemin, combien de droits ?"
    Un fichier a pour chemin absolu `/home/eleve/depot/os/coffre/secret.txt`.

    Sur ton cahier : pour que `cat` sur ce chemin fonctionne, quels droits faut-il, et sur quoi ?

    ??? tip "Indice léger"
        Combien de répertoires le terminal doit-il franchir pour arriver au fichier ?

    ??? tip "Indice plus précis"
        Compte les répertoires du chemin, en commençant par `/`. Chacun doit être traversé.

    ??? success "Réponse"
        Le droit `r` sur `secret.txt`, et le droit `x` sur **chacun** des cinq répertoires du chemin : `/`, `home`, `eleve`, `depot`, `os` et `coffre`. Un seul `x` manquant quelque part sur le trajet, et le fichier devient inatteignable, même s'il est lisible par tout le monde.

        Le droit `r` sur ces répertoires n'est pas nécessaire : tu donnes les noms, tu n'as pas à les découvrir.

## 2. L'ordonnanceur : un processeur, plusieurs programmes

Sur la première page, l'ordonnanceur partage le processeur entre les programmes. Tu vas le mesurer.

Commence par compter les cœurs de ta machine :

```bash
nproc
```

Chaque cœur exécute un programme à la fois. Tu en as plusieurs, donc deux programmes peuvent tourner côte à côte sans se gêner : pour voir le partage, il faut d'abord les forcer sur **le même** cœur. C'est ce que fait `taskset -c 0`, qui lance un programme en l'obligeant à rester sur le cœur numéro 0.

Place-toi dans `os/scripts` et crée `boucle.py` avec `code boucle.py` :

```python
import sys
import time

nom = sys.argv[1]
debut = time.time()
total = 0
for i in range(0, 60_000_000):
    total = total + i
duree = time.time() - debut
print(nom, ": fini en", round(duree, 1), "secondes")
```

Ce programme additionne soixante millions de nombres et affiche le temps que cela lui a pris. La boucle sera expliquée au chapitre suivant. Pour l'instant, c'est seulement un programme qui occupe un cœur sans rien attendre. Le mot qu'on écrit après le nom du fichier lui sert d'étiquette.

```bash
taskset -c 0 python3 boucle.py A
```

Note la durée obtenue, c'est ta référence.

!!! question "Exercice 6 : deux programmes sur un cœur"
    La ligne suivante lance **deux** copies en même temps sur le cœur 0. Le `&` lance en arrière-plan sans attendre, et `wait` attend la fin des deux.

    ```bash
    taskset -c 0 python3 boucle.py A & taskset -c 0 python3 boucle.py B & wait
    ```

    Avant de taper : sur ton cahier, prédis les deux durées, en partant de ta référence.

    ??? success "Réponse"
        Chacune des deux durées est environ le **double** de la référence. Sur la machine de test : 3,4 s pour une seule copie, puis 7,0 s et 7,3 s pour les deux.

        Aucun des deux programmes n'a ralenti de lui-même. Ils reçoivent chacun **la moitié du temps** du cœur, donc ils mettent deux fois plus longtemps à faire le même travail. Essaie avec trois copies : la durée triple. Sur la machine de test, 10,0 s, 10,3 s et 10,3 s pour une référence de 3,5 s.

!!! question "Exercice 7 : les deux mêmes, sur deux cœurs"
    ```bash
    taskset -c 0 python3 boucle.py A & taskset -c 1 python3 boucle.py B & wait
    ```

    Prédis, puis tape.

    ??? success "Réponse"
        Les deux durées retombent à peu près à la référence : 4,1 s et 4,1 s sur la machine de test, pour une référence de 3,4 s.

        Le ralentissement de l'exercice 6 ne venait donc pas de la présence de l'autre programme, mais du **partage d'un seul cœur**.

!!! question "Exercice 8 : demander à passer après les autres"
    `nice -n 19` lance un programme en le déclarant peu pressé : l'ordonnanceur lui donnera moins souvent la main.

    ```bash
    taskset -c 0 python3 boucle.py A & taskset -c 0 nice -n 19 python3 boucle.py B & wait
    ```

    Prédis les deux durées.

    ??? success "Réponse"
        `A`, normal, retrouve presque sa vitesse de référence, et `B`, poli, prend tout le reste. Sur la machine de test : `A` en 4,0 s et `B` en 6,3 s, là où les deux prenaient 7 s à égalité.

        Le partage n'est donc pas forcément équitable : l'ordonnanceur suit une **priorité**. C'est ce qui permet à ta machine de rester réactive pendant qu'un gros calcul tourne en arrière-plan.

### Voir et arrêter un programme en cours

Crée `infini.py`, qui ne s'arrête jamais :

```python
while True:
    pass
```

Lance-le en arrière-plan, puis demande au système la liste de tes programmes en cours :

```bash
python3 infini.py &
ps -o pid,pcpu,comm
```

`ps` affiche une ligne par **processus**, c'est-à-dire par programme en cours d'exécution. La colonne `PID` est le numéro que le système lui a donné, et `%CPU` la part de processeur qu'il consomme. Ton `infini.py` est à 100, il occupe un cœur entier.

Pour l'arrêter, lis son `PID` dans la liste et demande au système de le terminer :

```bash
kill 12345
```

!!! danger "Lis le PID, ne le devine pas"
    `kill` ne vérifie pas que le numéro est bien celui que tu crois. En préparant cette page, j'ai utilisé une commande qui cherchait le PID automatiquement : elle a trouvé celui du terminal lui-même, et `kill` a fermé le terminal. Prends le numéro dans la colonne `PID` de `ps`, à l'œil.

## 3. La mémoire virtuelle, mesurée

Sur la première page, le système donne à chaque programme ses propres adresses et retient la correspondance avec la vraie mémoire. Voici de quoi le constater.

Crée `memoire.py` :

```python
import mmap
import os

print("PID :", os.getpid())
input("Entrée pour réserver 2 Go de mémoire...")
zone = mmap.mmap(-1, 2_000_000_000)
input("Réservé. Entrée pour écrire 100 Mo dedans...")
for i in range(0, 100_000_000, 4096):
    zone[i] = 1
input("Écrit. Entrée pour quitter.")
```

Ce programme demande au système deux milliards d'octets d'un coup, puis écrit dans les cent premiers millions. Il s'arrête à chaque étape et attend que tu appuies sur **Entrée**.

Lance-le, note le PID affiché, et **laisse ce terminal tel quel**. Ouvre un second terminal (**Terminal > Nouveau terminal**) pour observer, en remplaçant `12345` par le PID :

```bash
grep -E "VmSize|VmRSS" /proc/12345/status
```

Le système tient sur chaque processus un répertoire à son numéro, rangé dans `/proc`. Deux lignes nous intéressent :

- `VmSize` : la taille de l'espace d'adresses que le programme a **demandé**.
- `VmRSS` : la quantité de vraie mémoire qu'il occupe **réellement**.

!!! question "Exercice 9 : réserver coûte-t-il de la mémoire ?"
    Relève les deux valeurs au démarrage. Puis, dans le premier terminal, appuie sur Entrée pour réserver les 2 Go, et relève-les à nouveau dans le second.

    Avant de le faire : sur ton cahier, prédis laquelle des deux valeurs change, et de combien.

    ??? success "Réponse"
        Sur la machine de test, au démarrage :

        ```
        VmSize:	   17264 kB
        VmRSS:	    9404 kB
        ```

        Après la réservation de 2 Go :

        ```
        VmSize:	 1970392 kB
        VmRSS:	    9404 kB
        ```

        `VmSize` augmente de 1 953 128 kB, c'est-à-dire les deux milliards d'octets demandés. `VmRSS` **n'a pas bougé d'un octet**. Réserver des adresses ne consomme aucune mémoire réelle.

!!! question "Exercice 10 : et écrire ?"
    Appuie sur Entrée pour lancer l'écriture des 100 Mo, attends quelques secondes, puis relève les deux valeurs.

    ??? success "Réponse"
        ```
        VmSize:	 1970392 kB
        VmRSS:	  107064 kB
        ```

        `VmSize` est inchangé, et `VmRSS` a grandi d'environ 97 600 kB, c'est-à-dire des 100 Mo écrits.

    ??? success "Ce qu'il faut en retenir"
        Le programme travaille sur des adresses que le système lui a promises. La vraie mémoire ne lui est donnée qu'au moment où il **écrit**, morceau par morceau. Ces morceaux s'appellent des **pages**, et elles font 4096 octets, ce qui explique le `4096` du programme : en écrivant un octet tous les 4096, on touche chaque page une fois.

        C'est pour cette raison que deux programmes peuvent tous les deux écrire « à l'adresse 1 » sans s'écraser : cette adresse 1 n'est pas la même case de mémoire pour l'un et pour l'autre, et seul le système sait laquelle est laquelle.

## 4. Ce que le système sait de ton programme

Le répertoire `/proc/<PID>` contient bien autre chose que la mémoire. Crée `journal.py` :

```python
import os

print("PID :", os.getpid())
fichier = open("journal.txt", "w")
print("numéro donné par le système :", fichier.fileno())
input("Entrée pour fermer le fichier et quitter.")
fichier.close()
```

Ce programme ouvre un fichier en écriture, affiche le numéro que le système lui a rendu, et attend.

Lance-le, note le PID, et observe depuis le second terminal.

!!! question "Exercice 11 : quel programme s'exécute, au fait ?"
    ```bash
    tr "\0" " " < /proc/12345/cmdline
    ```

    Cette commande affiche la ligne de commande que le système a retenue pour ce processus. Prédis ce qu'elle va afficher.

    ??? success "Réponse"
        `python3 journal.py`

        Le système ne connaît **qu'un** programme en train de s'exécuter, `python3`, et `journal.py` n'est pour lui qu'un mot écrit à la suite, un argument. C'est la même chose que tu avais constatée avec le bouton ▶ : le fichier `.py` est une donnée, l'exécutable est `python3`.

!!! question "Exercice 12 : la table des fichiers ouverts"
    ```bash
    ls -l /proc/12345/fd
    ```

    Prédis combien de lignes vont s'afficher, et ce que tu vas reconnaître dedans.

    ??? success "Réponse"
        Une ligne `total 0`, puis quatre entrées numérotées 0, 1, 2 et 3. L'entrée `3` pointe vers `journal.txt`, et `3` est bien le numéro que le programme avait affiché.

        Les numéros 0, 1 et 2 sont déjà là sans que le programme ait rien demandé : l'**entrée standard**, la **sortie standard** et la **sortie d'erreur**, celles-là mêmes que tu utilises sans le savoir quand `print` écrit dans le terminal. Note vers quoi elles pointent chez toi.

    ??? success "Ce qu'il faut en retenir"
        Le programme ne détient qu'un **numéro**, le `3`. La liste qui dit à quel fichier ce numéro correspond est tenue par le système, et le programme n'y a pas accès.

        C'est à cela que sert un **appel système** : le programme demande « ouvre-moi ce fichier en écriture », le système vérifie les droits, ouvre, inscrit une ligne dans sa table et rend un numéro. Ensuite, chaque écriture est un nouvel appel, qui donne ce numéro plutôt qu'un nom. Les droits de la section 1 sont vérifiés **une fois**, au moment de l'ouverture.

Appuie sur Entrée dans le premier terminal pour terminer le programme, puis relance la commande : le répertoire `/proc/12345` a disparu avec le processus.

??? info "L'outil qui montre les appels système un par un"
    Les appels système se regardent directement, avec un programme nommé `strace`, qui affiche chaque demande faite au système par un autre programme. Il n'est pas installé sur ta distribution, et son installation demande les droits d'administration : si tu veux l'essayer, demande à ton professeur.

## Résumé

- Sur un **répertoire**, `r` permet de lire la liste des noms, `x` de le traverser, `w` d'y ajouter ou d'en retirer des noms. `x` n'y signifie pas « exécuter ».
- **Créer ou supprimer** un fichier est un droit du répertoire qui le contient, pas du fichier.
- Un chemin n'est utilisable que si **tous** les répertoires qu'il traverse ont le droit `x`.
- Deux programmes sur un seul cœur reçoivent chacun la moitié du temps, et mettent deux fois plus longtemps. L'ordonnanceur suit une **priorité**, réglable avec `nice`.
- Réserver de la mémoire ne coûte rien, c'est **écrire** qui fait donner de la vraie mémoire, page de 4096 octets par page de 4096 octets.
- Le système tient sur chaque processus un répertoire dans `/proc`, qui dit le programme exécuté et les fichiers ouverts. Un programme ne connaît ses fichiers que par un **numéro** que le système lui a rendu.
