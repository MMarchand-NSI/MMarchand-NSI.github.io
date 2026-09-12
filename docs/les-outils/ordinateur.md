# Gérer son ordinateur

Cette page ne parle pas de NSI, mais d'une machine qui reste utilisable. Elle vise Windows, qui est ce que vous avez presque tous.

## Faire du ménage

Pour les syllogomanes c'est difficile, mais il le faut.

- **Désinstalle les programmes que tu n'utilises jamais** (Paramètres, puis Applications installées). Ne désinstalle pas ce que tu ne connais pas : demande avant, à moi ou à un moteur de recherche.
- **Ne supprime aucun fichier que tu ne connais pas.** Rien dans le dossier Windows, rien dans les dossiers Program Files.
- **Vide ton dossier Téléchargements.** Vraiment. Ce que tu y gardes, tu pourras le retélécharger si un jour tu en as besoin.
- Si tu as des milliers de photos et de vidéos, mets-les sur un disque dur externe ou sur un cloud.

Pour voir d'un coup d'œil ce qui prend la place : **WinDirStat** ([tutoriel](https://www.youtube.com/watch?v=hvBTLLh-dYs)).

## Antivirus

!!! danger "Désinstalle Avast, McAfee, Norton et les autres"
    Ces programmes exploitent la peur et la méconnaissance, arrivent le plus souvent par une préinstallation agressive, et mangent une quantité déraisonnable de mémoire. Ce sont des *bundlewares* : un seul nom cache plusieurs programmes, qu'il faut désinstaller un par un. Certains essaieront de te faire peur au moment où tu les retires. Sois brave.

**L'antivirus intégré à Windows suffit.** Microsoft Defender est régulièrement placé au niveau des solutions payantes par les laboratoires indépendants AV-TEST et AV-Comparatives, en détection comme en protection en temps réel. Il est mis à jour tous les jours, il est natif, donc économe, et ce que les offres payantes ajoutent est presque toujours autre chose qu'une meilleure détection : un VPN, un gestionnaire de mots de passe, un contrôle parental.

Vérifie simplement qu'il est **activé**. Normalement Windows s'en charge, ou râle au redémarrage jusqu'à ce que tu le fasses.

Et surtout : **n'installe aucun programme dont la source n'est pas sûre**. Même avec un gilet pare-balles, on ne se promène pas la nuit n'importe où.

## Mises à jour

Installe les mises à jour de Windows quand il te les propose. Les reporter transforme ta machine en cible facile : c'est la mesure de sécurité la plus simple et l'une des plus efficaces qui existent.

## Le grand ménage, quand rien d'autre ne marche

Après des années, Windows accumule des résidus et devient lent sans raison visible. Tout réinitialiser lui fait du bien.

!!! warning "Ce que tu perds, et ce que tu ne perds pas"
    **Ton code NSI ne risque rien s'il est poussé** : `nsi push`, et il est sur GitHub. Vérifie-le avant de commencer.

    En revanche, une réinitialisation efface **aussi WSL et la machine Debian**, donc toute l'installation NSI. Tu devras relancer l'[installation](installation.md) du début, et ton token te sera redemandé : assure-toi de l'avoir sous la main.

La marche à suivre :

1. mets à l'abri, sur une clé, un disque externe ou un cloud, les documents que tu veux garder ;
2. munis-toi de ton code WiFi si ta machine est connectée sans fil ;
3. en maintenant la touche **Shift gauche** enfoncée, clique sur **Redémarrer**. Ne relâche la touche que lorsqu'un écran bleu apparaît, c'est un peu long. Puis : **Dépannage**, **Réinitialiser le PC**, **Supprimer tout** ;
4. pendant la réinstallation, Windows essaie de te faire activer toutes sortes de services : dis non autant que tu peux.
