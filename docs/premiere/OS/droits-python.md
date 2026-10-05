# Les droits, et ton premier programme Python

!!! note "Rappel d'ouverture (5 minutes, cours fermé)"
    Réponds **sans rouvrir** la page précédente, en écrivant tes réponses.

    Le terminal est dans `/home/eleve/nsi/os/scripts`. Écris le chemin absolu désigné par :

    1. `essais`
    2. `../notes/td.txt`
    3. `../../os`

    ??? success "Corrigé"
        1. `/home/eleve/nsi/os/scripts/essais`
        2. `/home/eleve/nsi/os/notes/td.txt`
        3. `/home/eleve/nsi/os` : on remonte deux fois, jusqu'à la racine du dépôt, puis on redescend dans `os`.

## 1. Lire les droits d'un fichier

Place-toi dans `os/scripts` et tape :

```bash
ls -l calcul.py
```

Le terminal répond une ligne qui commence ainsi :

```
-rw-r--r-- 1 eleve eleve 0 ... calcul.py
```

Les dix premiers caractères se lisent par paquets :

| `-` | `rw-` | `r--` | `r--` |
|---|---|---|---|
| type : `-` fichier, `d` répertoire | droits du **propriétaire** (`u`) | droits du **groupe** (`g`) | droits des **autres** (`o`) |

Dans chaque paquet, trois lettres, toujours dans le même ordre, et un `-` à la place d'un droit absent :

- `r` (*read*) : lire le fichier
- `w` (*write*) : le modifier
- `x` (*execute*) : l'exécuter comme un programme

Ici, le propriétaire peut lire et modifier `calcul.py`, les autres peuvent seulement le lire, et **personne ne peut l'exécuter**.

Pour changer un droit, on utilise `chmod` :

```bash
chmod u+x calcul.py     # ajoute (+) l'exécution (x) au propriétaire (u)
chmod u-x calcul.py     # la lui retire (-)
```

## 2. Écrire un programme, et le lancer de deux façons

Dans VS Code, crée le fichier `os/scripts/bonjour.py` et écris-y ces deux lignes :

```python
#!/usr/bin/env python3
print("bonjour")
```

Enregistre. Dans le terminal, toujours dans `os/scripts`, tu vas taper une suite de commandes. **À chaque étape, écris d'abord sur ton cahier ce que tu penses que le terminal va répondre**, puis tape la commande.

!!! question "Étape 1"
    `ls -l bonjour.py` : quels sont les dix premiers caractères ?

    ??? success "Réponse"
        `-rw-r--r--`, comme pour `calcul.py` : un fichier neuf n'est exécutable par personne.

!!! question "Étape 2"
    `./bonjour.py` : `./` veut dire « le fichier `bonjour.py` du répertoire courant ». Que répond le terminal ?

    ??? success "Réponse"
        `bash: ./bonjour.py: Permission denied`. Le fichier n'a pas le droit `x` : on ne peut pas l'exécuter.

!!! question "Étape 3"
    `python3 bonjour.py` : que répond le terminal ?

    ??? success "Réponse"
        `bonjour`. Ici, ce n'est pas `bonjour.py` qu'on exécute, c'est le programme `python3`. Lui se contente de **lire** `bonjour.py`, et le droit `r` lui suffit.

!!! question "Étape 4"
    `chmod u+x bonjour.py`, puis `ls -l bonjour.py`, puis `./bonjour.py`. Que deviennent les dix premiers caractères, et que répond le terminal ?

    ??? success "Réponse"
        `-rwxr--r--`, puis `bonjour`. Le propriétaire a maintenant le droit `x`.

!!! question "Étape 5"
    `bonjour.py`, **sans** `./`. Que répond le terminal ?

    ??? success "Réponse"
        `bash: bonjour.py: command not found`. Sans `./`, le terminal cherche une commande qui s'appelle `bonjour.py` parmi les programmes du système, et pas dans le répertoire courant.

!!! question "Étape 6"
    Efface la première ligne de `bonjour.py` (celle qui commence par `#!`), enregistre, puis tape `./bonjour.py`. Que répond le terminal ?

    ??? success "Réponse"
        ```
        ./bonjour.py: line 1: syntax error near unexpected token `"bonjour"'
        ```
        Sans la ligne `#!`, le système ne sait pas quel programme doit lire le fichier, et c'est le terminal lui-même, `bash`, qui essaie. Or `print("bonjour")` n'est pas une commande `bash`. La ligne `#!/usr/bin/env python3` dit : « ce fichier se lit avec `python3` ».

    **Remets la ligne `#!` et enregistre avant de continuer.**

!!! question "Étape 7"
    `chmod u-r bonjour.py`, puis `python3 bonjour.py`. Que répond le terminal ?

    ??? success "Réponse"
        `python3: can't open file '.../bonjour.py': [Errno 13] Permission denied`. Cette fois, `python3` ne peut plus **lire** le fichier.

    **Rends le droit de lecture avant de continuer** : `chmod u+r bonjour.py`.

!!! warning "Trois erreurs, trois causes"
    - `Permission denied` : il manque un droit, `x` pour `./fichier`, `r` pour `python3 fichier`.
    - `command not found` : le terminal n'a pas trouvé la commande. As-tu oublié `./` ?
    - `syntax error` : le fichier a été lu par le mauvais programme. Vérifie la ligne `#!`.

    Avant de changer quoi que ce soit, lis le message : il dit lequel des trois problèmes tu as.

!!! info "Si `python3` répond `command not found`"
    C'est que le terminal ne trouve pas le Python de ton dépôt. Ferme le terminal, ouvre-en un nouveau dans VS Code et recommence. Si le problème reste, appelle ton professeur.

## 3. Le bouton ▶

Ouvre `bonjour.py` dans VS Code et clique sur le bouton ▶ en haut à droite.

!!! question "Ce que fait le bouton"
    Regarde le terminal. Sur ton cahier :

    - recopie la ligne que VS Code vient de taper
    - indique quel programme s'exécute
    - indique quel fichier est seulement lu

    ??? success "Réponse"
        La ligne a la forme `/home/eleve/nsi/.venv/bin/python /home/eleve/nsi/os/scripts/bonjour.py` (chez toi, les chemins diffèrent). Le programme qui s'exécute est le **premier**, `python`. Le second, `bonjour.py`, est un fichier qu'il **lit**. Le bouton ▶ fait exactement ce que tu as fait à l'étape 3, avec des chemins absolus.

Dans le chapitre suivant, tu écriras beaucoup de programmes Python. Chaque fois que tu cliqueras sur ▶, c'est cela qui se passera : le système d'exploitation lance `python`, qui lit ton fichier et exécute ce qu'il y trouve.

## Vérification individuelle

!!! warning "À faire seul, cours fermé (10 minutes)"
    Sans aide. Ce n'est pas noté.

    **1. Lire.** Le terminal est dans `/home/eleve/nsi/os`. On tape `cd scripts`, puis `cd essais`, puis `cd ../../notes`. Qu'affiche `pwd` ?

    **2. Compléter.** `ls -l outil.py` affiche `-rw-r--r-- ... outil.py`, et `./outil.py` répond `Permission denied`. Quelle commande faut-il taper pour que `./outil.py` s'exécute ?

    **3. Expliquer.** `python3 outil.py` fonctionne, alors que `./outil.py` répond `Permission denied`. Pourquoi ?

    ??? success "Réponses"
        **1.** `/home/eleve/nsi/os/notes`. `../..` remonte de `essais` à `os`, puis on descend dans `notes`.

        **2.** `chmod u+x outil.py`.

        **3.** Avec `./outil.py`, c'est le fichier lui-même qu'on demande d'exécuter, et il n'a pas le droit `x`. Avec `python3 outil.py`, le programme exécuté est `python3`, qui ne fait que **lire** `outil.py` : le droit `r` suffit.

## Résumé

- `ls -l` affiche les droits : `r` lire, `w` modifier, `x` exécuter, pour le propriétaire, le groupe et les autres.
- `chmod u+x fichier` ajoute le droit d'exécution au propriétaire, `chmod u-x` le retire.
- `./fichier.py` exécute le fichier : il faut le droit `x` et la ligne `#!/usr/bin/env python3`.
- `python3 fichier.py` exécute `python3`, qui lit le fichier : le droit `r` suffit.
- Le bouton ▶ de VS Code tape cette seconde commande pour toi.

---

**Pour aller plus loin**

??? info "La notation en chiffres de `chmod`"
    Chaque droit a une valeur, `r = 4`, `w = 2`, `x = 1`, et on additionne pour chaque paquet : `rwx` vaut 7, `r-x` vaut 5, `r--` vaut 4. Ainsi `chmod 755 bonjour.py` donne `rwxr-xr-x`, et `chmod 644 bonjour.py` donne `rw-r--r--`.
