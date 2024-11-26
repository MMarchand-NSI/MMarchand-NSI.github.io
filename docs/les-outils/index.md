# Outils pour développer

Cette sélection d'outils a été choisie pour être à la fois réaliste et abordable. 

L'installation proposée se fait dans l'invite de commandes windows grâce à l'outil winget qui est déjà présent.

Il aussi est tout à fait possible d'installer la plupart de ces outils en les téléchargeant et en exécutant leur programme d'installation depuis leur site internet, mais c'est plus long. 


## VS Code

Le couteau suisse de la programmation.

```shell
    winget install Microsoft.VisualStudioCode
```

## UV

Le tout nouveau couteau suisse de python.
Exécutez cette ligne dans un terminal.

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```
Redémarrez votre ordinateur.


## DBeaver
DBeaver permet d'interagir avec des systèmes de gestion de bases de données.

```shell
    winget install dbeaver.dbeaver
```

## Graphviz

Un utilitaire pour dessiner des graphes depuis python.

```cmd
winget install Graphviz.Graphviz
```

## GIT

Un outil de base pour gérer "le stockage" de ses fichiers.

```cmd
winget install Git.Git
```

Puis dans une ligne de commande, en imaginant avoir créé un compte github bidule avec l'adresse email truc@gmail.com:

```cmd
git config --global user.name "bidule"

git config --global user.email "truc@gmail.com"
```

Pour la facilité d'utilisation au quotidien (pour utiliser git comme une clé usb):

Dans les settings de VSCode, recherchez `post commit command` et mettez le paramètre à `sync`


---

## Miniforge
Si python est installé sur votre machine, désinstallez-le.
Nous allons utiliser ce gestionnaire d'environnements à la place.

```shell
    winget install CondaForge.Miniforge3
```

## MSYS2
Cet outil simule l'environnement linux et vous permettra même de programmer dans d'autres langages de programmation
```shell
    winget install MSYS2.MSYS2
```
