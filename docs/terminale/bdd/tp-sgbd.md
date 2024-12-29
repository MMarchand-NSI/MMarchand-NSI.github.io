# TP SGBD - Postgresql


## Installation PostgreSQL

Ici, nous allons utiliser PostgreSQL, qui est instalable via conda, dans une version déjà paramétrée pour le développement.
C'est ultra pratique pour le développement. Par contre, c'est juste inimaginable en production car toute la sécurité est levée.

Tout ce qui suit se fait dans votre environnement conda en ligne de commande.

1. Installation de postgresql

```bash
conda install postgresql
```

2. Initialisation de Postgresql avec un répertoire de données

```bash
initdb -D P:\\Documents\\data
```

Toutes les données propres à vos données seront stockées dans ce dossier. Chez vous bien sûr il faudra mettre un autre chemin.

3. Lancement de Postgresql

```bash
pg_ctl start -D P:\\Documents\\data -l p:\\Documents\\logfile.log &
```

A partir de cet instant, un service tourne sur votre machine sur le port 5432. C'est le port par défaut de Postgresql.

!!! warning "Avant de quitter votre ordi"
    Attention, il faudra quitter proprement le SGBD à l'aide de la commande 

    ```bash
    pg_ctl stop -D P:\\Documents\\data`
    ```

## Création de la base de données Pagila.

Nous allons créer une base de données connue, pagila.

Pagila simule un système de location de films. Elle contient des données fictives sur les clients, les films, les employés, les magasins, ainsi que les transactions de location et de paiement.

1. Création de la base de données

```bash
createdb pagila
```

2. Téléchargez le fichier [https://www.postgresql.org/ftp/projects/pgFoundry/dbsamples/pagila/pagila/](https://ftp.postgresql.org/pub/projects/pgFoundry/dbsamples/pagila/pagila/pagila-0.10.1.zip)

3. Récupérez-y les fichiers pagila-schema.sql et pagila-data.sql

4. Exécuter ces deux fichiers grâce à cette commande:

```bash
psql -U <votre utilisateur> -d pagila -a -f pagila-schema.sql
psql -U <votre utilisateur> -d pagila -a -f pagila-data.sql
```

## Connexion à la base de données avec DBeaver

Il faut tout d'abord ajouter dans pgadmin4 la connection à postgresql.
Il faut ajouter une "Nouvelle connection" à postgresql sachant que:
- Host: localhost
- Port: 5432
- Database: pagila
- User: Votre user windows

Il n'y a pas de mot de passe.

Lorsque vous êtes connectés, vos tables se situent à gauche dans pagila > Schémas > public > Tables 

Dans l'arborescence, lorsque vous cliquez droit sur "Tables", puis "voir le diagramme", vous pouvez voir... le fameux diagramme...

Trouvez un moyen d'exécuter des requêtes SQL.

## Exercices

!!! question "Requêtes basiques"

    1. Créez une liste des prénoms et noms de famille de tous les acteurs. Affichez le prénom et le nom de chaque acteur dans une seule colonne. Nommez la colonne "nom_acteur".
    2. Trouvez l'identifiant, le prénom et le nom d'un acteur dont vous ne connaissez que le prénom: "Joe".
    3. Trouvez tous les acteurs dont le nom de famille contient les lettres "LI". Cette recherche doit être insensible à la casse et les résultats doivent être triés par nom de famille, puis par prénom.
    4. En utilisant IN, affichez les colonnes `country_id` et `country` pour les pays suivants : Afghanistan, Bangladesh et China.
    5. Ajoutez une colonne `middle_name` à la table `actor`. Spécifiez le type de colonne approprié.
    6. Supprimez la colonne `middle_name`.
    7. Mettez à jour l'enregistrement de GROUCHO WILLIAMS pour que son prénom devienne HARPO.
    8. Rétablissez le prénom de GROUCHO WILLIAMS de HARPO à GROUCHO.

!!! question "Requêtes à jointures"

    1. Affichez le prénom, le nom et l'adresse de chaque client.
    2. Listez les titres des films et les catégories auxquelles ils appartiennent.
    3. Affichez les prénoms, noms et adresses e-mail des clients vivant dans la ville de "Aurora".
    4. Listez les films et les langues dans lesquelles ils sont disponibles.
    5. Affichez les prénoms et noms des employés (staff) ainsi que le nom de leur magasin.
    6. Affichez les prénoms et noms des clients ayant loué un film intitulé "Academy Dinosaur".
    7. Listez les films disponibles dans le magasin avec l'identifiant `1`.
    8. Affichez les noms des acteurs ayant joué dans le film "Zorro Ark".

!!! question "Problème utile"
    Lister les clients qui sont en retard à la date du jour, en sélectionnant les informations utiles au call center afin de les relancer.


!!! example "Pour ceux qui ont fini"
    IMdb met à disposition gratuitement une grosse base de données cinématographique:

    https://developer.imdb.com/non-commercial-datasets/

    Chargez la dans Postgresql et explorez la.

    Pour ceci vous vous intéresserez à la clause COPY de Postgresql.

    Ici, tous les moyens sont bons, ChatGPT, google, etc...
