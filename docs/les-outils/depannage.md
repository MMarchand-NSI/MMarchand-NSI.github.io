# Dépannage

Les pannes que tu rencontreras vraiment, avec le geste qui les répare. Aucune ne fait perdre le travail déjà envoyé par `nsi push` : c'est exactement pour cela qu'on pousse en partant.

## `nsi : command not found`

L'outil est installé dans un dossier que ton terminal ne connaît pas encore.

**Ouvre un nouveau terminal** et réessaie. Si le message revient, appelle-le par son chemin complet, une fois, pour vérifier qu'il est bien là :

```bash
~/.local/bin/nsi dir
```

## « Je ne sais pas où est ton dépôt de cours »

`nsi` retient où il a rangé ton dépôt. Ce message veut dire qu'il ne l'y trouve plus : le dossier a été renommé, déplacé ou supprimé.

```bash
nsi init
```

Cette commande **n'efface rien** : si le dossier existe déjà, elle le garde tel quel et se contente de retrouver son chemin.

## « Ce token n'a pas été accepté »

Trois causes, dans l'ordre de fréquence :

1. **il manque une portée** : il faut `repo`, `read:org` **et** `gist`, les trois ;
2. il a été **mal collé ou tronqué** ;
3. il a **expiré**, ou tu l'as révoqué.

Dans les trois cas, crée un nouveau token sur [github.com/settings/tokens](https://github.com/settings/tokens) et recommence : on te redonne la main sur place.

## « Aucun dépôt de cours trouvé »

Il reste presque toujours une invitation à accepter. Connecte-toi sur GitHub avec **ton** compte, accepte l'invitation de l'organisation `nsi-bf`, puis celle de ton dépôt, qui apparaît sur [github.com/notifications](https://github.com/notifications) ou dans tes courriels. Appuie ensuite sur Entrée : la recherche est retentée.

Si rien n'y fait, ta classe n'est pas encore en place : demande à ton professeur.

## `ModuleNotFoundError: No module named 'structures'`

Tu viens de **créer un dossier**, et le dépôt ne le connaît pas encore. Depuis la racine de ton dépôt :

```bash
uv sync
```

!!! info "Pourquoi cela n'arrive qu'avec le bouton ▷"
    `uv run pytest` trouve tes modules sans rien demander, grâce aux fichiers `__init__.py`. C'est l'exécution **d'un fichier seul** qui a besoin que le dépôt ait enregistré le nouveau dossier.

    Et vérifie au passage que ton `__init__.py` est bien là : sans lui, ni `pytest` ni `uv sync` ne peuvent rien.

## « Erreur : uv est introuvable »

L'installation des outils de base ne s'est pas terminée.

```bash
nsi install base
```

## VSCode ne s'ouvre pas

Tout est installé quand ce message apparaît : seule l'ouverture de l'éditeur a échoué.

```bash
code "$(nsi dir)"
```

Deux cas connus :

- **sous Windows**, le tout premier `code` lancé depuis Debian télécharge des composants et peut échouer une fois, puis marcher au second essai ;
- **sur Mac**, la commande `code` n'existe pas tant que tu ne l'as pas installée depuis VSCode : `Cmd+Shift+P`, puis `Shell Command: Install 'code' command in PATH`.

## `nsi pull` refuse de faire son travail

C'est que tu as modifié des fichiers ici sans les avoir envoyés. Envoie-les d'abord, puis récupère :

```bash
nsi push
nsi pull
```

!!! warning "Si le message revient après ça"
    Tes deux versions ont divergé : le même fichier a été modifié ici et ailleurs. **Ne tape rien au hasard**, montre le message à ton professeur.

    La façon de ne jamais y arriver tient en une ligne : `nsi push` **avant de partir**, à chaque fois.

## `nsi` avec `sudo`

Ne le fais pas. `nsi` demande lui-même les droits dont il a besoin, quand il en a besoin.

Sur Mac, il refuse de partir : `Ne lance pas nsi avec sudo`. Et `nsi init` lancé ainsi configurerait GitHub pour l'administrateur de la machine, pas pour toi.

## L'installation a échoué sous Windows

Le script écrit un compte rendu dans un fichier `nsi-installation.log`, sur ton **bureau**, et il en affiche le chemin exact avant de se fermer. **Envoie ce fichier à ton professeur** : il contient la ligne exacte qui a cassé.

Et vérifie d'abord ces deux points, qui expliquent la plupart des échecs :

- tu as bien lancé **PowerShell**, pas `cmd`, et **en tant qu'administrateur** sur ton ordinateur personnel ;
- si l'installation a demandé un redémarrage, tu l'as fait **puis relancé exactement la même commande**.

## Mettre `nsi` à jour

Si une commande décrite ici n'existe pas chez toi, c'est que ton `nsi` est plus vieux que cette page :

```bash
nsi update
```
