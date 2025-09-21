# Outils pour développer

Cette sélection d'outils a été choisie pour être à la fois réaliste et abordable. 

L'installation proposée se fait dans l'invite de commandes windows grâce à l'outil winget qui est déjà présent.

Il aussi est tout à fait possible d'installer la plupart de ces outils en les téléchargeant et en exécutant leur programme d'installation depuis leur site internet, mais c'est plus long. 


## VS Code

Le couteau suisse de la programmation.

Sous Windows:

```shell
winget install Microsoft.VisualStudioCode
```

Sous macos, Cliquer sur le lien suivant pour télécharger VSCode et pouvoir l'installer
[Télécharger Pour MacOS](https://code.visualstudio.com/docs?dv=osx)


## UV

Le tout nouveau couteau suisse de python.

Sous windows, exécutez cette ligne dans un terminal.

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```
Redémarrez votre ordinateur.


Si vous êtes sous linux ou MacOS, dans un terminal:

```bash
wget -qO- https://astral.sh/uv/install.sh | sh
```



## MSYS2
Cet outil simule l'environnement linux et vous permettra même de programmer dans d'autres langages de programmation, ainsi que d'nistaller simplement un système de gestion de bases de données.

Cet outil n'est nécessaire que sous windows.

```shell
winget install MSYS2.MSYS2
```

--- 

## Graphviz

Un utilitaire pour dessiner des graphes depuis python car `print` a ses limites pour visualiser certaines structures.

Seulement en terminale.

```shell
winget install Graphviz.Graphviz
```

---
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

