# Paradigmes de programmation

Il est inutile d'essayer de comprendre ces définitions avant d'avoir pratiqué l'approche mentale des paradigmes évoqués.

!!! tip "Qu'est-ce qu'un paradigme de programmation?"
    Un paradigme de programmation est un modèle ou une approche particulière utilisée pour écrire et structurer des programmes informatiques. Il définit un ensemble de concepts, de méthodes et de styles qui influencent la manière dont les programmeurs organisent leur code et **pensent à la résolution de problèmes**. Les paradigmes de programmation fournissent différents outils mentaux pour exprimer des algorithmes et des structures de données.


!!! tip "Le Paradigme Fonctionnel"
    Cette définition s'appuie sur le travail qui a été fait sur les listes, afin de pouvoir vous la représenter plus facilement.

    Le paradigme fonctionnel se distingue principalement par :
    
    - L'**immuabilité** des structures de données : ici, chaque fonction renvoie une **nouvelle** liste, sans affecter l'originale. Lorsqu'on insere dans une liste, il faut comprendre "renvoyer une nouvelle liste dans laquelle on a inséré"
    - L'usage intensif de la **récursivité** : au lieu de boucles, les fonctions comme `taille`, `somme`, ou `inverser` utiliseront la récursivité pour recueillir des informations sur la liste.
    - L'importance des **fonctions pures** : chaque fonction renvoie toujours le même résultat pour les mêmes arguments, sans effets de bord.

    Ce style de programmation garantit des comportements prévisibles et sûrs, ce qui est particulièrement utile en programmation concurrente et dans les applications où la fiabilité est critique.

!!! hint "Le paradigme orienté objet"
    Ce paradigme est basé sur la notion d'objets, qui sont des instances de classes et encapsulent des données (attributs) et des comportements (méthodes).

    Ce paradigme est constitué de 5 piliers:

    1. Objet (et classe)
    2. Encapsulation
    3. Abstraction
    4. Polymorphisme
    5. Héritage

    Nous insisterons sur le pilier 1. Nous parlerons un peu du pilier 2, mais python ne l'implémente pas vraiment. Nous verrons des usages simples du 5ème pilier, surtout à des fins de simplification de code, afin de pouvoir ne pas crouler sous du code redondant.

    Il existe un **malentendu majeur** autour de la POO, lié à la manière dont le concept d'objet a été interprété et utilisé. À l'origine, des langages comme Simula, qui est souvent considéré comme l'un des premiers langages orientés objet, voyaient les objets comme une représentation de concepts du monde réel, avec des comportements propres. Cependant, avec la popularisation de la POO (notamment grâce à C++ et Java), beaucoup de développeurs ont commencé à concevoir des objets simplement comme des structures de données améliorées. Ca a conduit à des critiques sur le fait que la véritable philosophie de la POO, telle qu'envisagée par ses créateurs, avait été diluée ou mal comprise.

    **Alan Kay**, qui a inventé le terme "orienté objet" (notamment avec Smalltalk), a exprimé sa frustration face à la manière dont ce paradigme a évolué. Il a précisé que pour lui, la POO ne concernait pas simplement l'encapsulation ou l'héritage, mais plutôt la communication entre objets via des messages. Cette vision a souvent été réduite à une simple organisation de données et de méthodes dans des classes, une simplification que Kay a critiquée. Il s’est même distancié de la manière dont le paradigme a été interprété par des langages comme C++ ou Java.

    Ce malentendu est intéressant car il montre comment une idée technique peut évoluer de manière inattendue. Ce que nous créons et livrons au monde nous appartient-il à jamais?

    J'admets que nous touchons à ce malentendu dans l'utilisation de la POO qui est faite dans l'implémentation mutable des structures de données que nous avons rencontré. C'est surtout unn prétexte pour que vous manipuliez des objets. Cependant, elle trouve tout son sens dans le projet space invader, où des objets sont bien en communication.


!!! hint "Meilleur paradigme?"
    Au delà du purisme, la plupart des nouveaux langages implémentent divers concepts provenant de multiples paradigmes. Ils sont dits multi-paradigmes. Pour la simple et bonne raison que ce qui est facile à penser dans un paradigme l'est parfois moins dans un autre. Il convient de ne pas se réduire à une guerre inter-paradigme. La question "Quel est le meilleur paradigme?" n'a pas de sens lorsqu'on s'attaque à des problèmes réels. La réelle richesse provient de la connaissance initiale de ces paradigme et de savoir en faire la part des choses indépendament d'une supposée meilleure façon de penser. 

    Par exemple, pour un décideur en entreprise, les phrases suivantes peuvent être de meilleures questions à se poser en fonction du contexte:

    - "Dans quel paradigme est-il raisonable de résoudre mon problème étant donné l'état du marché des développeurs?"
    - "Dans quel paradigme est-il raisonable de résoudre mon problème étant données les compétences de mes développeurs?"
    - ...

