# Au quotidien

## Les deux commandes de chaque séance

```bash
nsi pull     # en arrivant, AVANT de toucher à quoi que ce soit
nsi push     # en partant, AVANT de fermer VSCode
```

`nsi push` enregistre tout ton travail et l'envoie sur GitHub en une seule commande : il n'y a rien à sélectionner, rien à nommer. `nsi pull` récupère la dernière version que tu as envoyée, depuis n'importe quel ordinateur.

!!! danger "L'ordre compte"
    `nsi pull` **en arrivant**, `nsi push` **en partant**. Si tu travailles au lycée sans avoir poussé chez toi la veille, tu te retrouves avec deux versions différentes du même fichier, et c'est à toi de les recoller.

## Écrire du code

Tout va dans le dossier **`python/`** de ton dépôt, et tu peux y créer autant de sous-dossiers que tu veux. Trois règles :

- **tout dossier que tu crées reçoit un fichier vide `__init__.py`** ;
- tes imports sont **absolus**, écrits depuis `python/` : `from structures.lineaires import pile`, et jamais un chemin relatif ;
- un fichier de code et son fichier de test sont **côte à côte** : `pile.py` et `pile_test.py`.

## Exécuter

Ouvre ton fichier, puis clique sur le bouton **▷** en haut à droite de VSCode.

En ligne de commande, depuis la racine de ton dépôt :

```bash
uv run python python/hello_world.py
```

## Tester

Un test est une **fonction dont le nom commence par `test_`**, écrite dans un **fichier dont le nom finit par `_test.py`**. Les deux comptent : une fonction `test_` posée dans un autre fichier ne sera jamais jouée, et rien ne te le dira.

```bash
uv run pytest
```

Ou le panneau **Tests** de VSCode, l'icône en forme de fiole.

Pour voir la **couverture**, c'est-à-dire les lignes de ton code qu'aucun test n'a exécutées :

```bash
uv run pytest --cov
```

Un fichier que tu viens de créer y apparaît à 0 % tant qu'aucun test ne le touche. C'est voulu : ce qui manque doit se voir.

## Ajouter une bibliothèque

```bash
uv add nom_du_paquet
```

!!! warning "Jamais `pip install`"
    `uv` tient à jour `pyproject.toml` et `uv.lock`, pour que ton dépôt reste installable à l'identique sur n'importe quel poste. Un `pip install` n'y laisse aucune trace : la bibliothèque marche chez toi, et manque partout ailleurs.

## Référence des commandes `nsi`

| Commande | Ce qu'elle fait |
|---|---|
| `nsi pull` | récupère la dernière version de ton travail depuis GitHub |
| `nsi push` | enregistre ton travail et l'envoie sur GitHub |
| `nsi dir` | affiche le chemin de ton dépôt de cours |
| `nsi init` | configure GitHub et récupère ton dépôt. Une fois par ordinateur |
| `nsi update` | met à jour l'outil `nsi` lui-même |
| `nsi toggle-config` | masque ou réaffiche dans l'explorateur de VSCode les fichiers que ton `settings.json` liste sous `files.exclude`, aujourd'hui les dossiers fabriqués par les outils (`__pycache__`, `.pytest_cache`, `.coverage`). Ils restent sur le disque |
| `nsi reset-config` | remet la configuration du projet à la version du professeur |
| `nsi install <composant>` | installe un langage ou un outil supplémentaire |
| `nsi remove <composant>` | le désinstalle |

Les composants disponibles : `base`, `gleam`, `postgresql`, `openjdk`, `nasm`, `rust`, `prolog`, `c`. **N'en installe aucun sans qu'on te l'ait demandé** : certains sont lourds et longs à poser. `base` est celui que l'installation a déjà joué.

!!! danger "`nsi reset-config` efface tes `uv add`"
    Cette commande remplace `pyproject.toml`, `.gitignore` et la configuration VSCode par la version du professeur. **Toutes les bibliothèques que tu avais ajoutées avec `uv add` disparaissent.** Ton code, lui, n'est jamais touché.

    Tu n'as rien à retrouver dans l'instant : reprends tes exercices, et tu verras tout de suite lesquelles réinstaller, quand Python affichera `ModuleNotFoundError` ou que VSCode soulignera un import en rouge. Il suffit alors de refaire `uv add nom_du_paquet`.

    Ne la lance que si on te le dit, ou si ta configuration est visiblement cassée.

## Ce que ce dépôt n'est pas

Ce n'est pas là que se passent les évaluations : elles se composent dans Metatest, sur un sujet posé par le professeur. Ici, c'est le travail au long cours, celui qu'on reprend et qu'on améliore.

Rien ne s'exécute tout seul : ni vérification automatique, ni note. Le dépôt garde ton travail, et c'est tout ce qu'on lui demande.
