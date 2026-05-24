# Introduction à la théorie des catégories

*Je suis professeur en sciences informatiques. J'utilise la théorie des catégories dans mes cours sur les types structurés et la récursivité. Elle m'aide à organiser de grandes classes de programmes (catamorphismes, anamorphismes, hylomorphismes, transformations structurales) et à justifier des choix qui peuvent sembler arbitraires, comme l'emploi des intervalles semi-ouverts : ce choix simplifie les algorithmes en éliminant les cas à la marge, et la théorie des catégories en garantit la cohérence et la naturalité. Mes élèves ne voient pas ce cadre directement, mais il structure ce que je leur enseigne.*

*Un jour, un collègue professeur de philosophie est tombé sur un article dans le magazine Epsiloon de mai 2026 consacré à la théorie des catégories. Intrigué, il m'a posé des questions. J'ai essayé de répondre, et je me suis retrouvé bloqué assez vite : tout ce qui existe comme introduction suppose une familiarité avec des structures mathématiques avancées que mon interlocuteur n'avait pas, et que je ne pouvais pas reconstruire en quelques minutes de conversation.*

*Ce texte est ma tentative de combler ce manque. Je ne suis pas philosophe, et ça se verra sans doute. Mais les exemples que j'ai choisis viennent du terrain commun que je cherchais ce jour-là.*

---

## Pourquoi ça existe ?

Au XXe siècle, les mathématiques ont produit une quantité impressionnante de structures différentes : des groupes, des espaces, des ensembles, des treillis, des algèbres. Des objets très divers, étudiés par des branches très différentes.

À un moment, certains mathématiciens ont commencé à remarquer quelque chose d'un peu dérangeant : les mêmes démonstrations semblaient réapparaître dans des domaines complètement distincts. Pas des démonstrations similaires : les mêmes, mot pour mot, à ceci près que les objets portaient des noms différents.

Est-ce une coïncidence ? Ou ces domaines partagent-ils quelque chose de plus profond qu'on ne sait pas encore nommer ?

En 1945, deux mathématiciens américains, [Samuel Eilenberg](https://fr.wikipedia.org/wiki/Samuel_Eilenberg) et [Saunders Mac Lane](https://fr.wikipedia.org/wiki/Saunders_Mac_Lane), ont proposé un langage pour répondre à cette question. Ce langage, c'est la théorie des catégories.

> *On pourrait naturellement se demander où était [John von Neumann](https://fr.wikipedia.org/wiki/John_von_Neumann) dans tout ça, lui qui était une figure incontournable des mathématiques et de l'informatique de cette époque. La réponse est simple : ailleurs. Von Neumann travaillait sur un programme très différent, ancré dans la théorie des ensembles, le calcul numérique et les automates. Il n'a pas contribué à la théorie des catégories et ne semble pas l'avoir utilisée. Ce n'est pas un oubli : les deux démarches partent dans des directions opposées. Von Neumann cherchait à construire et à calculer ; Eilenberg et Mac Lane cherchaient à abstraire et à comparer. C'est précisément cette différence d'intention qui rend la théorie des catégories originale.*

L'idée centrale est radicale dans sa simplicité : **ce qui compte dans une structure mathématique, ce ne sont pas les objets qui la composent, mais les relations entre ces objets.**

Ce déplacement, des objets vers les relations, est le geste fondateur de toute la théorie. Le reste en découle.

---

## Premier exemple : classer les choses

Commençons par quelque chose de familier.

Imaginez qu'on cherche à organiser des concepts en les classant du plus général au plus particulier. C'est une activité que les philosophes reconnaîtront, je crois, depuis au moins Aristote et sa façon d'organiser le vivant par genre et espèce.

Prenons quelques concepts simples :

- *être vivant*
- *animal*
- *mammifère*
- *chien*
- *labrador*

On peut relier ces concepts avec une flèche : → signifie "est plus particulier que", ou si on préfère, "est inclus dans".

```
labrador → chien → mammifère → animal → être vivant
```

Chaque flèche dit quelque chose de concret : tout labrador est un chien, tout chien est un mammifère, et ainsi de suite.

Cette organisation a une propriété qu'on voit tout de suite : **les flèches se composent**. Si tout labrador est un chien, et tout chien est un mammifère, alors tout labrador est un mammifère. On peut enchaîner les flèches.

```
labrador → chien → mammifère
       \________________/
          donne aussi :
        labrador → mammifère
```

Il y a aussi une autre propriété, plus discrète : chaque concept est relié à lui-même. Un labrador est un labrador. Ça paraît tellement évident que ça semble inutile, mais on verra pourquoi ce détail a son importance.

Ce que vous venez de voir satisfait exactement les conditions d'une catégorie. Voyons lesquelles.

---

## Les trois ingrédients d'une catégorie

Une catégorie repose sur trois éléments : des **objets**, des **flèches** (qu'on appelle aussi *morphismes*) entre ces objets, et deux règles que ces flèches doivent respecter.

**Règle 1 : la composition.** Si une flèche va de A vers B, et une autre va de B vers C, alors il existe une flèche composée qui va directement de A vers C.

Dans notre exemple : les objets sont les concepts (*labrador*, *chien*, *mammifère*...), les flèches sont les relations d'inclusion. La composition est vérifiée : *labrador → chien* et *chien → mammifère* donnent bien *labrador → mammifère*.

**Règle 2 : l'identité.** Pour chaque objet A, il existe une flèche qui part de A et revient à A, qu'on peut appeler la flèche "ne rien faire" ou "rester sur place".

Dans notre exemple : chaque concept est inclus dans lui-même. Un labrador est un labrador. La flèche triviale existe.

Les deux règles sont satisfaites : nous avons bien une catégorie.

Cette définition est d'une sobriété presque déconcertante. Mais c'est précisément cette sobriété qui lui donne sa force : en n'exigeant rien de plus, elle s'applique à une quantité extraordinaire de situations différentes. Dès qu'on a des objets et des relations entre eux qui se composent, on a une catégorie.

---

## Deuxième exemple : raisonner

Notre premier exemple était un peu statique. Les flèches allaient toujours dans le même sens, et entre deux concepts il y avait au plus une seule flèche possible. C'est une catégorie valide, mais pauvre.

Passons à quelque chose de plus vivant.

Prenons des **propositions logiques** :

- *P : "Il pleut"*
- *Q : "La route est mouillée"*
- *R : "Le freinage est moins efficace"*

Entre ces propositions, on peut imaginer des **démonstrations**, c'est-à-dire des raisonnements qui permettent de déduire l'une à partir de l'autre. Une démonstration de P vers Q : "Quand il pleut, la route est mouillée." Une démonstration de Q vers R : "Quand la route est mouillée, le freinage est moins efficace."

Les objets sont des propositions. Les flèches sont des démonstrations.

Et les deux règles tiennent :

**La composition fonctionne.** Une démonstration de P vers Q enchaînée avec une démonstration de Q vers R donne une démonstration de P vers R : "Quand il pleut, la route est mouillée, donc le freinage est moins efficace."

**L'identité fonctionne.** Pour chaque proposition P, il existe une démonstration triviale de P vers P : "P, donc P." Inutile en pratique, mais requis par la structure.

Nous avons donc une nouvelle catégorie. On l'appelle parfois catégorie des preuves, ou catégorie déductive. Mais celle-ci est plus intéressante que la première pour une raison précise : **entre deux propositions, il peut exister plusieurs démonstrations différentes**.

De P vers Q, on peut raisonner directement, passer par des étapes intermédiaires, ou mobiliser des hypothèses supplémentaires. Ce sont des flèches distinctes entre les mêmes objets.

C'est là, me semble-t-il, que la théorie des catégories commence à révéler quelque chose d'inhabituel : la *forme* du raisonnement compte, pas seulement son résultat. Deux démonstrations différentes qui arrivent à la même conclusion ne sont pas nécessairement la même chose.

---

## Le problème de l'identité

Quand dit-on que deux choses sont "la même chose" ? C'est une question que je suppose familière aux philosophes, et qui admet au moins deux façons de la poser.

La première regarde vers l'intérieur : deux choses sont identiques si elles partagent les mêmes propriétés intrinsèques : la même composition, la même nature, le même contenu.

La seconde regarde vers l'extérieur : deux choses sont identiques si elles se comportent de la même façon dans toutes leurs relations avec le reste du monde, si bien que rien, de l'extérieur, ne permet de les distinguer.

Ces deux réponses ne coïncident pas toujours. C'est précisément la seconde que formalise la théorie des catégories, avec la notion d'**isomorphisme**.

Dans une catégorie, deux objets A et B sont dits *isomorphes* si :

- il existe une flèche de A vers B,
- et une flèche de B vers A,
- telles que les deux flèches composées (A → B → A et B → A → B) donnent les flèches identité.

En d'autres termes : A et B sont isomorphes si on peut aller de l'un à l'autre et revenir, sans rien perdre.

Un exemple concret : prenez les entiers de 0 à 4 ordonnés par "est plus petit que", et les jours de la semaine de lundi à vendredi ordonnés par "vient avant". Ces deux catégories sont isomorphes. On peut traduire 0 en lundi, 1 en mardi, et ainsi de suite, en préservant toutes les flèches. Du point de vue catégoriel, ce sont la même structure. Peu importe que l'une parle de nombres et l'autre de jours : ce qui compte, c'est uniquement la façon dont les éléments sont reliés entre eux.

Ce qui est frappant dans cette définition, c'est ce qu'elle **ne dit pas**. Elle ne dit rien sur la nature de A et B. Elle ne demande pas qu'ils soient composés des mêmes éléments, qu'ils aient le même nom, ni même qu'ils aient quoi que ce soit en commun intrinsèquement. Deux objets sont "le même" au sens catégoriel parce qu'ils se comportent de la même façon vis-à-vis du reste de la catégorie, et pour aucune autre raison.

Reprenons notre hiérarchie de concepts. Imaginez deux classifications différentes du vivant, produites par deux biologistes utilisant des noms différents et des découpages légèrement distincts. Si leurs classifications sont isomorphes, c'est-à-dire si on peut traduire l'une dans l'autre sans perte, alors du point de vue catégoriel ces deux classifications sont la même structure. Peu importe les étiquettes.

Ce que cet exemple montre, c'est qu'on peut parler d'identité entre deux choses sans jamais regarder ce qu'elles sont. Seules leurs relations comptent.

Cela a une conséquence un peu vertigineuse : la question "qu'est-ce que cet objet, en lui-même ?" n'a pas de sens catégoriel. La seule question légitime est "comment cet objet se comporte-t-il ?"

---

## Ce vers quoi tout cela ouvre : les foncteurs

Si une catégorie est un "monde" fait d'objets et de flèches, on peut se demander ce qui se passe quand on passe d'un monde à un autre.

C'est ce que capture la notion de **foncteur**.

Un foncteur est une traduction d'une catégorie vers une autre qui **préserve la structure** : les objets sont traduits en objets, les flèches en flèches, et les compositions restent des compositions. On ne peut pas traduire n'importe comment : la traduction doit respecter la géographie des relations.

Pourquoi est-ce intéressant ? Parce que la question de savoir si une traduction préserve la structure est précisément la bonne question à poser quand on veut savoir si deux théories parlent du même phénomène avec des mots différents, ou si elles disent vraiment des choses différentes.

D'après ce que j'en comprends, ce serait particulièrement utile pour des questions comme : est-ce que deux théories disent la même chose avec des mots différents ? Qu'est-ce qu'on perd ou qu'on préserve quand on passe d'un cadre conceptuel à un autre ? Ce sont des questions que les philosophes reconnaîtront, et le foncteur semble y apporter un langage plus précis que l'intuition seule.


---

## Est-ce un tournant historique ?

La théorie des catégories fait l'objet d'une hype croissante, notamment depuis qu'elle est devenue visible hors des mathématiques. Il vaut la peine de distinguer ce qui est solidement établi de ce qui l'est moins.

**Ce qui est établi**

En mathématiques, l'impact est réel et documenté. La théorie des catégories a unifié des domaines qui se développaient en silos (algèbre, topologie, logique) en montrant que des théorèmes démontrés dans un domaine s'appliquaient automatiquement à d'autres, parce qu'ils relevaient en réalité du même cadre.

Un épisode historique l'illustre bien. Bourbaki, le collectif de mathématiciens français qui avait entrepris depuis les années 1930 de refonder l'ensemble des mathématiques, a explicitement refusé d'intégrer la théorie des catégories dans son programme. [Grothendieck](https://fr.wikipedia.org/wiki/Alexander_Grothendieck), alors membre du groupe, a plaidé pour basculer vers un langage catégoriel : il voyait que les catégories étaient plus agiles, plus simples et plus puissantes que la théorie des structures sur laquelle Bourbaki avait bâti son édifice. Il s'est heurté notamment à l'opposition d'[André Weil](https://fr.wikipedia.org/wiki/Andr%C3%A9_Weil). L'impasse fut telle que Grothendieck quitta le groupe. Bourbaki reconnut plus tard le coût de ce choix : le volume sur l'algèbre homologique, paru en 1980, dut être rédigé dans un cadre inadapté faute d'avoir adopté les catégories à temps. [Pierre Cartier](https://fr.wikipedia.org/wiki/Pierre_Cartier_(math%C3%A9maticien)), membre de Bourbaki pendant près de trente ans, a qualifié ce refus d'erreur historique dans plusieurs interviews.

En informatique théorique, l'influence est directe et concrète. La correspondance de Curry-Howard-Lambek établit une équivalence structurelle entre les types dans un langage de programmation, les propositions logiques, et les objets d'une catégorie. Ce n'est pas une métaphore : c'est un résultat précis qui sous-tend la conception des langages fonctionnels modernes.

En fondements des mathématiques, [Lawvere](https://fr.wikipedia.org/wiki/William_Lawvere) a montré dans les années 1960 qu'on pouvait reconstruire une grande partie des mathématiques à partir des catégories plutôt que des ensembles. C'est une alternative sérieuse, même si elle reste minoritaire.

**Ce qui est plus diffus**

En cherchant des usages en philosophie, je suis tombé sur le structuralisme ontic, un courant qui défend l'idée que ce qui existe en science, ce sont des structures plutôt que des objets. Il semblerait que certains philosophes, notamment [Steven French](https://en.wikipedia.org/wiki/Steven_French) et [James Ladyman](https://en.wikipedia.org/wiki/James_Ladyman) dans les années 2000, aient mobilisé des outils catégoriels pour formaliser cette position. Je laisse aux personnes intéressées le soin d'aller fouiller, ce n'est pas un territoire que je maîtrise.

**Ce qui relève de la hype**

La tentation existe de voir des catégories partout dès qu'il y a des relations entre des choses. Ce n'est pas faux en soi : techniquement, n'importe quelle collection d'objets reliés par des relations qui se composent forme une catégorie. Mais dire ça n'apporte rien si le cadre n'interdit rien, ne prédit rien de non-évident, et ne permet pas de transporter des résultats d'un domaine à l'autre. Un cadre utile, comme la correspondance Curry-Howard-Lambek mentionnée plus haut, travaille : il force à des conclusions qu'on n'aurait pas vues autrement. Un cadre qui se contente d'habiller ce qu'on savait déjà décore, il n'explique pas.

La popularité actuelle de la théorie des catégories doit aussi quelque chose à un déplacement extérieur : l'informatique théorique est devenue centrale dans les sciences, et elle a tiré la théorie des catégories dans son sillage. Ce n'est pas que la théorie ait changé : c'est que le monde a bougé vers elle.

Ce que ce texte espère avoir montré, c'est simplement que le cadre pose une question précise et ancienne d'une façon nouvelle : non pas ce qu'est une chose, mais comment elle se comporte. C'est modeste en apparence. Ce n'est pas rien.

---

*Pour aller plus loin : le texte fondateur est "General Theory of Natural Equivalences" d'Eilenberg et Mac Lane (1945). Pour une introduction mathématique accessible, "Category Theory" de [Steve Awodey](https://en.wikipedia.org/wiki/Steve_Awodey) (2010) est souvent recommandé. Pour une approche orientée logique et philosophie, "Conceptual Mathematics" de Lawvere et Schanuel (2009) est inhabituel et stimulant.*