# Jointures

Lorsqu'on veut récupérer des données provenant de plusieurs tables, on utilise des jointures.

## Sur un exemple théorique

Voici le script utilisé pour le premier exemple.
Les données sont volontairement bidons car nous nous intéressons tout d'abord à la notion de produit cartésien

```sql

CREATE TABLE t1 (
    idt1 INT PRIMARY KEY,
    a VARCHAR(50),
    b VARCHAR(50)
);

CREATE TABLE t2 (
    idt2 INT PRIMARY KEY,
    idt1 INT,
    c INT,
    FOREIGN KEY (idt1) REFERENCES t1(idt1)
);

-- Insertion de données dans t1
INSERT INTO t1 (idt1, a, b) VALUES
(1, 'Alpha', 'Beta'),
(2, 'Gamma', 'Delta'),
(3, 'Epsilon', 'Zeta'),
(4, 'Eta', 'Theta');

-- Insertion de données dans t2
INSERT INTO t2 (idt2, idt1, c) VALUES
(10, 3, 100),
(11, 4, 200),
(12, 4, 700)
;

```

!!! question "Visualiser un produit cartésien"
    Ci-dessous, exécutez les requêtes suivante:
    ```sql
    select *
    from t1;

    select *
    from t2;

    -- Cette requête effectue le produit cartésien de t1 et t2
    select *
    from t1, t2;
    ;
    ```

{{sqlide titre="Exécuter des requêtes:" init="assets/jointures.sql" espace="jointure"}}

!!! example "Explications"
    Le **produit cartésien** de deux ensembles $A$ et $B$ est l'ensemble des couples $(a, b)$ ou $a$ est un élément de $A$ et $b$ est un élément de $B$.

    Ici, on voit que pour chaque tuple de t1, on y a associé tous les tuples de t2. Ce qui est équivalent à dire que pour chaque tuple de t2, on y a assoié tous les tuples de t1.

!!! question "Produit Cartésien"
    Soient les 2 ensembles $A=\{x, y, z\}$ et $B=\{\alpha, \beta\}$. 
    
    - Ecrire l'ensemble produit cartésien de $A$ et de $B$, noté $A \times B$.
    - Ecrire $A \times A$, noté aussi $A^2$.
    - Ecrire $B \times B \times B$, noté aussi $B^3$.


!!! abstract "Jointure"
    Une jointure est un sous ensemble de produit cartésien.

    Une jointure permet de lier deux ensembles de données.

    Ici, la clé étrangère idt1 de t2 nous indique que nous référons dans t2 à un enregistrement de t1. Parmi toutes les associations possibles du produit cartésien, les seules qui nous intéressent sont donc celles où le idt1 de t2 sera égal au idt1 de t1. Les autres tuples du produit ne nous intéressent pas, elles ne correspondent à rien qui n'ait du sens de la manière dont nous avons défini les données.

    Exécutez cette requête:

    ```sql
    select *
    from t1, t2
    where t1.idt1 = t2.idt1
    ```

    Ainsi, on vient de demander les informations de t2 augmentées des informations de t1 relativement à la clé idt1.

## Sur un exemple pratique

```sql
-- Création des tables
CREATE TABLE Artistes (
    ArtisteId INT PRIMARY KEY,
    Nom VARCHAR(50)
);

CREATE TABLE Albums (
    AlbumId INT PRIMARY KEY,
    ArtisteId INT,
    Titre VARCHAR(100),
    FOREIGN KEY (ArtisteId) REFERENCES Artistes(ArtisteId)
);

-- Insertion de données dans Artistes
INSERT INTO Artistes (ArtisteId, Nom) VALUES
(1, 'Mozart'),
(2, 'Beethoven'),
(3, 'Chopin');

-- Insertion de données dans Albums
INSERT INTO Albums (AlbumId, ArtisteId, Titre) VALUES
(1, 1, 'Requiem'),
(2, 1, 'Symphonie No. 40'),
(3, 2, 'Sonate Waldstein'),
(4, 3, 'Nocturnes');
```

!!! question
    De la même manière, ci-dessous, exécutez ceci:

    ```sql
    select * from artistes;

    select * from albums;

    select *
    from artistes, albums;
    ```

    {{sqlide titre="Exécuter des requêtes:" init="assets/musique.sql" espace="musique"}}

    Ce qui nous intéresse ici, c'est de compléter les tuples de la relation album avec le nom du compositeur. En effectuant le produit cartésien, on voit bien que Mozart n'a rien à faire avec la sonate Waldstein, ni avec les nocturnes. Les seules associations qui nous intéressent sont ceux qui ont le même ArtisteId.

    aussi, on exécutera:
    
    ```sql
    select *
    from artistes, albums
    where Artistes.ArtisteId = Albums.ArtisteId
    ```

    Ce qui nous intéresse à l'origine, c'est de compléter les titres d'album avec les noms d'artistes. On affine dans le select.


    ```sql
    select artistes.nom, albums.titre
    from artistes, albums
    where Artistes.ArtisteId = Albums.ArtisteId
    ```


!!! tip "Alias"

    Souvent, afin d'éviter d'alourdir les requêtes, on utilise des alias pour les tables. On pourra ainsi écrire:

    ```sql
    select a.nom, b.titre
    from artistes a, albums b
    where a.ArtisteId = b.ArtisteId
    ```

    On peut aussi renommer les colonnes du résultat ainsi:
    ```sql
    select a.nom as NomArtiste, b.titre as TitreAlbum
    from artistes a, albums b
    where a.ArtisteId = b.ArtisteId
    ```

    C'est très souvent utilisé car hors du contexte de laur table, le sens du nom des champs peut se perdre.


## Ce qui est attendu de vous

La deuxième étape, c'est d'utiliser une syntaxe spécifique aux jointures. Les utiliser permet d'aider l'optimisateur de requêtes du SGBD, et aussi de bien séparer les conditions de filtrage des conditions de jointure, ce qui n'est pas du luxe sur les grosses requêtes. De plus il existe plusieurs types de jointures et cette syntaxe permet de bien conserver le sens de ce qu'on manipule. Le résultat est STRICTEMENT le même. 

!!! danger "Cette syntaxe est attendue au bac"
    ```sql
    select a.nom, b.titre
    from artistes a
    JOIN albums b ON a.ArtisteId = b.ArtisteId
    ```

Sémantiquement, ça sépare bien la jointure du reste.


!!! example "METHODE DE BASE"
    Etant donné que vous n'avez qu'un seul type de jointure à gérer cette année, cette technique marchera à tous les coups.
    C'est visuel, et c'est simple. Aucune excuse pour rater une jointure.

    Sur le Modèle physique de données, il faut dessiner tout le chemin entre les tables qui vous intéressent, et ajouter une ligne join par association entre table.

    Ensuite, on rajoute éventuellement une clause where pour filtrer certaines données selon la question.

    Puis on sélectionne seulement les champs qu'on veut récupérer, en utilisant des alias si des noms sont redondants, ou pour garantir unne bonne compréhension du résultat de la requête.

    Le MPD est votre meilleur ami. Il faut toujours l'avoir sous la main. S'il ne vous est pas donné, dessinez le au brouillon.

!!! question "Jointures sur chinook"
    - Affichez le titre de chaque album ainsi que le nom de l'artiste qui l'a créé.
    - Affichez le nom de chaque piste et le titre de l'album auquel elle appartient.
    - Affichez le numéro de facture, la date, et le nom complet du client pour chaque facture.
    - Affichez les employés et le nom complet de leurs managers respectifs
    - Affichez le nom de chaque piste et son genre musical
    - Affichez le nom des artistes ayant au moins une piste présente dans une playlist.

    - Affichez le nom des pistes et le nom de l'album pour les pistes appartenant au genre "Rock".
    - Affichez le numéro et la date des factures, ainsi que le prénom et le nom des clients résidant au "Canada".
    - Affichez le nom des pistes, leur genre musical et leur durée (en millisecondes) pour les pistes dont la durée dépasse 300_000 millisecondes

{{sqlide titre="Exécuter des requêtes sur chinook:" base="assets/chinook.db" espace="chinook"}}


!!! question "Grosses requêtes"

    - Quel est le prix total des pistes du genre "Rock" achetées par les clients résidant au Canada ?

    - Quel est le titre de l'album le plus cher ?

    - Quel est le nom de l'artiste ayant le moins de pistes ?


---

## Lien avec python

```python
artistes = [
    {"ArtisteId": 1, "Nom": "Mozart"},
    {"ArtisteId": 2, "Nom": "Beethoven"},
    {"ArtisteId": 3, "Nom": "Chopin"}
]

albums = [
    {"AlbumId": 1, "ArtisteId": 1, "Titre": "Requiem"},
    {"AlbumId": 2, "ArtisteId": 1, "Titre": "Symphonie No. 40"},
    {"AlbumId": 3, "ArtisteId": 2, "Titre": "Sonate Waldstein"},
    {"AlbumId": 4, "ArtisteId": 3, "Titre": "Nocturnes"}
]
```

Voici comment nous aurions pu obtenir le resultat de la jointure exemple:

```python
jointure = [ {"Nom": a["Nom"], "Titre": b["Titre"]} 
             for a in artistes 
             for b in albums 
             if a["ArtisteId"] == b["ArtisteId"] 
            ]
```

La double boucle réalise le produit cartésien (chaque a sera associé à chaque b), la condition termine de réaliser la jointure en limitant les associations aux cas qui nous intéressent.
