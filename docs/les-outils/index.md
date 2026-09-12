# Ton environnement de travail

Tout ce que tu écris cette année vit dans **un dépôt GitHub qui t'appartient**. Tu le retrouves à l'identique sur n'importe quel ordinateur, au lycée comme chez toi, et il n'y a plus rien à transporter ni à perdre (voir [Le problème des clés USB](cle-usb.md)).

Trois pièces, et c'est tout.

## 1. Ce qui est installé sur la machine

L'installation pose les outils dont tu auras besoin toute l'année :

| Outil | À quoi il sert |
|---|---|
| **VSCode** | l'éditeur dans lequel tu écris ton code |
| **uv** | il gère Python, les bibliothèques et les tests |
| **git** et **gh** | ils parlent à GitHub à ta place |
| **graphviz** | il dessine les graphes et les arbres, en terminale |

Sous Windows, il installe en plus une **machine Linux** (WSL2 et Debian) : ton code tourne dedans, et VSCode reste côté Windows. Tu n'as rien à faire de particulier, mais ne t'étonne pas de voir apparaître un terminal Debian.

## 2. Ton dépôt de cours, en ligne

Ton professeur a créé pour toi un dépôt **privé** dans l'organisation GitHub `nsi-bf`. Personne d'autre que toi et un professeur du cours ne le voit.

Il porte le nom de ta classe, de l'année scolaire et de ton pseudo GitHub, et il est recopié sur ta machine dans un dossier de ton dossier personnel. Pour savoir où :

```bash
nsi dir
```

## 3. La commande `nsi`

Un seul outil commande tout le reste. Tu n'en utiliseras vraiment que deux formes :

```bash
nsi pull     # en arrivant : récupère ton travail
nsi push     # en partant : sauvegarde et envoie ton travail
```

Les autres servent une fois, ou en cas de pépin : elles sont toutes dans [Au quotidien](au-quotidien.md).

!!! warning "Les trois gestes de chaque séance"
    1. **En arrivant**, avant de toucher à quoi que ce soit : `nsi pull`
    2. **Tu travailles** dans le dossier `python/` de ton dépôt
    3. **En partant**, avant de fermer VSCode : `nsi push`

    Sans le dernier, ton code reste sur cette machine, et une machine de salle informatique s'efface.

## Où va ton code

Tout dans le dossier **`python/`**, et tu peux y créer autant de sous-dossiers que tu veux.

```
python/
├── hello_world.py
├── hello_world_test.py
└── structures/
    ├── __init__.py
    └── lineaires/
        ├── __init__.py
        ├── pile.py
        └── pile_test.py
```

Trois règles, qui valent pour toute l'année :

- **tout dossier que tu crées reçoit un fichier vide `__init__.py`** ;
- tes imports sont **absolus**, écrits depuis `python/` : `from structures.lineaires import pile` ;
- tes tests vivent dans un fichier **`*_test.py`**, à côté du code qu'ils vérifient, et chaque test est une fonction dont le nom commence par **`test_`**.

Pour les jouer tous, depuis la racine de ton dépôt :

```bash
uv run pytest
```

## Et si ça casse

Les pannes courantes, avec ce qu'il faut taper, sont dans [Dépannage](depannage.md). Aucune ne fait perdre le travail qui a été poussé sur GitHub : c'est tout l'intérêt de `nsi push`.
