# Migration

**VSCode est fermé.**

## 1 - Migration des fichiers vers la nouvelle architecture de dev

- Dans votre %USERPROFILE%\Documents  (votre dossier document de windows)
    - renommer PROG-NSI en PROG-NSI-OLD
    - dans le terminal, naviguer vers le répertoire `%USERPROFILE%\Documents` et récupérer le fichier d'install
        - `curl -o setup-nsi.bat https://raw.githubusercontent.com/MMarchand-NSI/template-nsi/main/.vscode/setup-nsi.bat`
    - puis lancer le script téléchargé avec cette commande:
        - `.\setup-nsi.bat`

VSCode s'ouvre dans le nouvel environnement et un script d'ouverture se lance.


**Etape finale**

Copier coller vos répertoire de fichiers de code dans PROG-NSI (python, elm, ou d'autres si vous en avez créé)

## 2 - Installation des composants

Dasn le task runner de vscode:

- Installer composants -> MSYS2  (met à jour si déjà installé)
- Attendre que ça soit terminé
- Installer composant -> postgres
- Attendre la fin

## 3 - Migration de la database imdb

- Démarrer postgres s'il est pas démarré
- Copier les 2 fichiers de votre clé à votre disque (le .bat et le .backup)
- double cliquer sur le .bat pour restorer le dump dans votre database.

## 4 - tester

Dans pgmodeler, se connecter à la base et vérifier que vous avez bien accès à imdb.

dans `.vscode\settings.json`, à la fin:

- Vérifiez que vous avez bien la racine du site `"python/imdb"` dans la liste du paramètre `python.analysis.ExtraPaths`, c'est pour que VSCode puisse vous aider.