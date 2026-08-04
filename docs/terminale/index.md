---
template: base.html
hide:
  - toc
---

# NSI – Classe de Terminale

### La suite directe de ce qui a été commencé en première

La Terminale ne redémarre pas à zéro. Elle reprend directement ce qui a été construit en première (le fonctionnement d'un appel de fonction, les tableaux et dictionnaires, l'habitude de spécifier et de tester) et s'en sert tout de suite, dès les premières semaines, sur un projet qui fait converger ces briques.

Les mêmes outils vont ensuite plus loin : le jeu écrit en première se prolonge en un projet avec de vraies classes (un Space Invaders jouable, par exemple), les données manipulées passent par de vraies requêtes sur une base, et un message peut être chiffré pour qu'aucun tiers ne puisse le lire.

Continuer NSI, comme les deux autres spécialités poursuivies, c'est aussi la présenter à l'épreuve écrite du baccalauréat : ce travail compte dans le diplôme, pas seulement sur le bulletin de première.

---

## Ce que cela apporte

Surtout les outils pour **comprendre ce qu'un algorithme peut faire, et ce qu'aucun ordinateur, aussi puissant soit-il, ne pourra jamais calculer**, dans un monde qui en dépend de plus en plus.

- Une méthode explicite pour trouver et corriger ses erreurs, enseignée pour elle-même et pas laissée au hasard
- Un raisonnement qui va jusqu'au bout : prouver qu'un algorithme est correct, et pas seulement qu'il « a marché une fois »
- Un travail en binôme structuré, sur des projets enfin assez complexes pour que cela compte
- Une préparation directe aux classes préparatoires, licences scientifiques et écoles d'ingénieurs

---

## 1. Récursivité : une nouvelle façon de résoudre un problème

> Une fonction qui s'appuie sur elle-même pour résoudre un cas plus petit

* comprendre comment un programme peut se rappeler lui-même sans partir dans tous les sens
* tracer, étape par étape, ce qui s'empile puis se dépile pendant l'exécution
* écrire un tri qui range un million de nombres en un clin d'œil, en divisant le problème en deux à chaque étape

**En pratique :** on trace la pile des appels avant d'écrire le moindre programme récursif, pour ne jamais la deviner.

---

## 2. Structures de données : construire avant d'utiliser

> Écrire soi-même les outils qu'on utilisait tout faits jusqu'ici

* piles, files, arbres, graphes : à quoi ça sert, et comment ça marche vraiment à l'intérieur
* les classes et les objets, pour représenter des choses qui ont un état et se comportent
* comprendre pourquoi une interface (ce qu'un outil promet de faire) et son implémentation (comment il le fait) sont deux choses séparées

**En pratique :** on écrit plusieurs versions d'une même structure avant d'apprendre à la cacher derrière une interface unique.

---

## 3. Bases de données : interroger de vraies données

> Poser une question à des milliers de lignes, et obtenir la réponse en une fraction de seconde

* organiser des données réelles dans des tables reliées entre elles
* écrire de vraies requêtes pour extraire, croiser, filtrer une information précise
* prédire ce que va répondre une requête avant de l'exécuter, pour vérifier qu'on a vraiment compris la question qu'on a posée

**En pratique :** on manipule une base de données concrète, pas un exemple jouet de trois lignes.

---

## 4. Réseaux et cybersécurité

> Faire voyager un message sans qu'on puisse le lire en chemin

* comprendre comment un message part d'un ordinateur, traverse un réseau, et arrive intact
* le chiffrement, pour qu'un message intercepté reste illisible sans la bonne clé
* les failles classiques, et pourquoi certaines n'ont pas de solution simple

**En pratique :** on chiffre et on déchiffre un vrai message entre deux programmes.

---

## 5. Algorithmique avancée : ce qu'un ordinateur peut, et ne peut pas, faire

> Trouver le chemin le plus court, trier le plus vite possible, et découvrir la limite de tout ça

* parcourir un graphe pour trouver un chemin, comme le fait un GPS
* comparer plusieurs façons de résoudre le même problème, et savoir laquelle est la plus rapide
* rencontrer un problème dont on peut **démontrer** qu'aucun programme, aujourd'hui ou dans cent ans, ne pourra jamais le résoudre

**En pratique :** chaque méthode est prouvée, pas seulement testée sur un exemple qui a marché.
