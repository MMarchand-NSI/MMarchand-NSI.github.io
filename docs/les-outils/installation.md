# Installation

À faire **une fois par ordinateur**. Compte une vingtaine de minutes, et reste connecté à Internet du début à la fin : presque tout est téléchargé au fur et à mesure.

!!! danger "Avant de lancer quoi que ce soit"
    - ton **compte GitHub** existe, et tu as donné ton pseudo à ton professeur ;
    - tu as accepté les **deux invitations** reçues de GitHub, celle de l'organisation `nsi-bf` puis celle de ton dépôt ;
    - tu as ton **token d'accès personnel** sous la main. On le fabrique ensemble en classe : garde-le, l'installation le demande, et il ne s'affiche qu'une seule fois sur GitHub.

## 1. Lancer l'installation

=== "Windows"

    Ouvre **PowerShell en tant qu'administrateur** : menu Démarrer, tape `powershell`, **clic droit** sur **Windows PowerShell**, puis **Exécuter en tant qu'administrateur**.

    !!! warning "Pas `cmd`"
        L'invite de commandes classique ne convient pas : le détecteur de menaces de Windows y bloque l'installation.

        **Sur un ordinateur du lycée**, tu n'auras pas les droits d'administrateur : lance la commande sans, tout ce qui les exige est déjà installé sur ces postes.

    Colle cette commande, en une seule fois :

    ```powershell
    irm https://raw.githubusercontent.com/nsi-bf/scripts-install/main/setup-windows.ps1 -OutFile "$env:TEMP\nsi-setup.ps1"; Set-ExecutionPolicy Bypass -Scope Process -Force; & "$env:TEMP\nsi-setup.ps1"
    ```

    **Si l'installation te demande de redémarrer, fais-le, puis relance exactement la même commande.** C'est normal sur une machine neuve : Windows doit redémarrer pour activer WSL.

    Ce qui se passe alors, sans que tu aies rien à faire : Windows active WSL2 et installe Debian, VSCode est installé côté Windows avec l'extension qui lui permet de travailler dans Debian, et un utilisateur `padawan` est créé dans cette Debian. **Son mot de passe est `padawan`** : tu en auras besoin le jour où une commande te le demandera.

    Ton token te sera demandé pendant l'installation, dans la fenêtre PowerShell (voir l'étape 2 ci-dessous). Une console Debian s'ouvre ensuite, reprend la configuration si elle reste à faire, et ouvre VSCode sur ton dépôt.

=== "Mac / Linux"

    Ouvre un terminal et colle cette commande :

    ```bash
    curl -fsSL https://raw.githubusercontent.com/nsi-bf/scripts-install/main/setup.sh | bash
    ```

    !!! warning "Pas de `sudo` devant"
        L'installation demandera elle-même ton mot de passe si elle en a besoin. **Quand tu tapes un mot de passe dans un terminal, rien ne s'affiche**, pas même des étoiles. C'est normal : tape et valide.

    L'installation enchaîne ensuite sur la configuration de GitHub, ci-dessous. Si elle s'arrête en te disant d'ouvrir un nouveau terminal, fais-le et tape `nsi init`.

## 2. Donner ton token

L'installation te demande ton token GitHub et affiche cette invite :

```
Token GitHub :
```

Colle-le et valide. Rien ne s'affiche pendant que tu colles, c'est voulu.

!!! info "Les trois portées du token, et pourquoi"
    Le token doit avoir été créé avec les portées **`repo`**, **`read:org`** et **`gist`**. Ce ne sont pas trois caprices : l'outil `gh` refuse tout token qui n'a pas ces trois-là, et il te répondra `missing required scope`.

    Tu crées un token sur [github.com/settings/tokens](https://github.com/settings/tokens), bouton **Generate new token (classic)**.

    **Il ne s'affiche qu'une fois.** Copie-le immédiatement et garde-le : il est redemandé à chaque nouvelle machine. Perdu, il ne se retrouve pas : il faut le révoquer et en créer un autre.

Si le token est refusé, on te le dit et on te laisse recommencer sur place : pas besoin de relancer toute l'installation.

## 3. Ce que la configuration fait pour toi

Une fois le token accepté :

1. elle enregistre ton identité git, à partir de ton pseudo GitHub ;
2. elle **cherche ton dépôt de cours** parmi les dépôts auxquels tu as accès, et prend le plus récent ;
3. elle le **recopie** dans ton dossier personnel ;
4. elle installe les bibliothèques Python du projet (`uv sync`) ;
5. VSCode s'ouvre sur ce dossier.

!!! warning "« Aucun dépôt de cours trouvé »"
    Neuf fois sur dix, il reste une invitation à accepter. Connecte-toi sur GitHub avec **ton** compte, accepte l'invitation de l'organisation puis celle de ton dépôt, et appuie sur Entrée : la recherche est retentée sans rien perdre.

    Les liens sont donnés à l'écran, et tes invitations sont aussi sur [github.com/notifications](https://github.com/notifications).

## 4. Vérifier que tout est en place

Dans le terminal de VSCode (`Terminal > Nouveau terminal`, ou `Ctrl+ù`) :

```bash
nsi dir          # affiche le chemin de ton dépôt de cours
uv run pytest    # joue les tests du dépôt : ils doivent passer
```

Puis ouvre `python/hello_world.py`, clique sur le bouton **▷** en haut à droite, et regarde le terminal : `Bonjour NSI !` doit s'afficher.

Si l'une de ces trois vérifications échoue, la page [Dépannage](depannage.md) donne le geste qui correspond.
