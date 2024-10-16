# Paradigmes de programmation

Il est inutile d'essayer de comprendre ces définitions avant d'avoir pratiqué l'approche mentale des paradigmes évoqués.

!!! tip "Qu'est-ce qu'un paradigme de programmation?"
    Un paradigme de programmation est un modèle ou une approche particulière utilisée pour écrire et structurer des programmes informatiques. Il définit un ensemble de concepts, de méthodes et de styles qui influencent la manière dont les programmeurs organisent leur code et **pensent à la résolution de problèmes**. Les paradigmes de programmation fournissent différents outils mentaux pour exprimer des algorithmes et des structures de données.


!!! tip "Le Paradigme Fonctionnel"
    Cette définition s'appuie sur le travail qui a été fait sur les listes chainées, afin de pouvoir vous la représenter plus facilement.

    Le paradigme fonctionnel se distingue principalement par :
    
    - L'**immuabilité** des structures de données : ici, chaque fonction renvoie une **nouvelle** liste, sans affecter l'originale. Lorsqu'on insere dans une liste, il faut comprendre "renvoyer une nouvelle liste dans laquelle on a inséré"
    - L'usage intensif de la **récursivité** : au lieu de boucles, les fonctions comme `taille`, `somme`, ou `inverser` utiliseront la récursivité pour recueillir des informations sur la liste.
    - L'importance des **fonctions pures** : chaque fonction renvoie toujours le même résultat pour les mêmes arguments, sans effets de bord.

    Ce style de programmation garantit des comportements prévisibles et sûrs, ce qui est particulièrement utile en programmation concurrente et dans les applications où la fiabilité est critique.

!!! hint "Le paradigme orienté objet"
    Ce paradigme est basé sur la notion d'objets, qui sont des instances de classes et encapsulent des données (attributs) et des comportements (méthodes). Il favorise la réutilisation du code et l'organisation modulaire.

