# Base de données et SGBD
    
Une base de données est un ensemble de données structurées.

Un système de gestion de bases de données (SGBD) est un outil permattant de stocker et d'interagir avec des bases de données.

Il existe plusieurs modèles pour stocker les données dans une base de données.

Nous allons nous intéresser au modèle dit **relationnel**.

Nous utiliserons le SGBD Postgresql


# Le modèle relationnel

Nous travaillerons avec cette base de données.

![alt text](image.png)



## Algèbre relationnelle


Ici, nous allons définir quelques termes de l'algèbre relationnelle.

!!! abstract "Relation"
    Une relation est un ensemble fini d'entités relevant d'un même concept. les entités sont décrites par certaines de leur caractéristiques. Une relation a un nom par lequel elle est identifiée.

    Sur le dessin de la base de données, Chaque "boîte" est uue relation.
    Par exemple, on a la relation Artiste.

!!! abstract "Attributs"
    Toute caractéristique décrivant les entités de la relation est appelée **attribut** de la relation.

    Par exemple, la relation Artiste a l'attribut Name.

!!! abstract "Domaine d'un attribut"
    Chaque attribut a un **domaine**. Il s'agit de l'ensemble des valeurs que peut prendre l'attribut. Le domaine de l'attribut Name de la relation Artiste est "chaîne de caractères"

