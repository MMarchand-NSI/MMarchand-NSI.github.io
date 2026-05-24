# Ce que fait vraiment un grand modèle de langage

*Une introduction pour ceux qui pensent à ce qu'on en fait*

---

> « Jamais aucune intelligence artificielle ne saura saisir l'idée de ce que peut être ce tremblement d'où surgissent les mots dans une imperfection qui traduit le tremblement. Ce n'est pas la perfection qui est précieuse, mais la sincérité de nos imprécisions. C'est d'elles que naissent nos visions. Jamais un tremblement ne saura tracer une ligne droite et c'est cette impossibilité qui rend l'écriture si nécessaire. »
>
> — Wajdi Mouawad, *Jusqu'au bord de son ravin. Les verbes de l'écriture*, Seuil, 2025, p. 104

---

Cette année 2026, le sujet de composition française commun à l'ENS Paris-PSL et Lyon demandait aux candidats de discuter cette citation de Wajdi Mouawad, extraite de ses leçons au Collège de France.

Mais en lisant ce sujet, j'ai eu un malaise que je n'arrive pas à mettre de côté. Non pas que la question soit mal posée, mais parce qu'elle pointe vers ce qui me semble un cloisonnement tenace : les sciences humaines et les sciences formelles vivent dans des bâtiments différents, mangent dans des cantines différentes, et lisent des revues différentes. Le débat sur l'IA en porte les traces : soit on sait comment ça marche et on ne pense pas à ce que ça veut dire, soit on pense à ce que ça veut dire sans savoir comment ça marche. Ce texte est une tentative, depuis le côté technique, de contribuer au pont. Son objectif est simple : donner à un lecteur curieux, sans formation en informatique, suffisamment de compréhension du fonctionnement réel de ces systèmes pour que les questions qu'ils soulèvent puissent être posées depuis un point de vue plus large.

Je ne suis pas philosophe. Je ne suis pas non plus ingénieur en apprentissage automatique. Je suis quelqu'un qui a passé du temps à essayer de comprendre comment ces systèmes fonctionnent, et qui a trouvé que c'était à la fois plus simple à saisir dans ses principes, et plus étrange à mesure qu'on creuse, que je ne l'anticipais.

---

## 1. De quoi parle-t-on vraiment ?

Le terme "intelligence artificielle" est un problème. Pas parce qu'il est faux, mais parce qu'il est si large qu'il ne désigne rien de précis. Sous cette étiquette cohabitent des programmes qui jouent aux échecs, des algorithmes qui détectent des tumeurs sur des radios, des systèmes de recommandation, des robots industriels, et des logiciels qui écrivent du texte. Ces choses n'ont pas grand-chose en commun, si ce n'est qu'elles font des choses qu'on aurait cru, il y a trente ans, réservées à l'intelligence humaine.

Ce dont parle Mouawad, ce dont parlent ChatGPT, Claude, Gemini et leurs semblables, ça a un nom technique : les **grands modèles de langage**, en anglais *Large Language Models*, abrégé en **LLM**.

Ce sont des objets spécifiques, avec une architecture spécifique, des capacités spécifiques, et des limites spécifiques. Confondre "intelligence artificielle" et "LLM", c'est un peu comme confondre "être vivant" et "mammifère" : le second est une catégorie du premier, mais pas la seule, et les caractéristiques propres au second ne s'appliquent pas à l'ensemble.

Tout ce qui suit parle des LLM. Uniquement des LLM.

---

## 2. Un texte, ça ressemble à quoi pour un programme ?

Avant d'expliquer ce que fait un LLM, il faut résoudre un problème préalable qui n'est pas évident : un programme informatique travaille avec des nombres. Des mots, des phrases, des paragraphes, ça n'est pas des nombres. Ou plutôt : si. Un des principes fondamentaux de l'informatique est que tout objet formel est représentable sous la forme d'un entier naturel. Un texte n'échappe pas à la règle : ce qu'on voit affiché à l'écran ou imprimé sur une page est le résultat d'une conversion, ces nombres ont été traduits en signaux appropriés pour l'écran ou l'imprimante. Mais ces nombres qui encodent les caractères un par un ne disent rien sur ce que les mots signifient, ni sur leurs relations. Alors comment passer de cette représentation brute à quelque chose d'utile pour prédire un token ?

La réponse se fait en deux étapes, dans cet ordre.

**Première étape : découper le texte en morceaux.** Avant tout calcul, le texte est découpé en unités élémentaires appelées **tokens** : des fragments d'un à plusieurs caractères, qui correspondent souvent à des mots ou des morceaux de mots. "Philosophie" peut être un seul token, "anticonstitutionnellement" sera probablement découpé en plusieurs. C'est la raison pour laquelle les LLM comptent parfois mal les lettres d'un mot, ou se trompent sur des jeux de mots qui requièrent de travailler au niveau de la lettre individuelle : ils ne voient pas des lettres, ils voient des blocs.

*(En écrivant cette phrase, je viens de faire exactement ce contre quoi il faut se méfier : "ils voient". Un LLM ne voit rien. Il n'a pas d'yeux, pas de perception, pas d'expérience. Mais le langage naturel résiste : dès qu'on essaie de décrire ce que fait un programme, on glisse presque malgré soi vers des verbes de perception ou d'intention. Ce glissement est universel, y compris chez les chercheurs qui travaillent sur ces systèmes. Il vaut mieux en être conscient que prétendre l'éviter.)*

**Deuxième étape : transformer chaque token en nombre.** C'est là qu'intervient la **représentation vectorielle**. Chaque token est converti en une liste de coordonnées numériques qui le positionne dans un espace à plusieurs centaines de dimensions.

Pour saisir l'intuition, partons de quelque chose de familier : des personnes, pas des mots.

Supposons qu'on veuille représenter numériquement des individus selon quelques attributs : leur âge, leur taille, leur niveau d'études, leur revenu, leur distance au centre-ville. Chaque personne devient un point dans un espace à cinq dimensions, c'est-à-dire une liste de cinq nombres. Marie, 35 ans, 1m68, bac+5, revenu moyen, habite en banlieue : `(35, 168, 5, 3, 12)`. Paul, 34 ans, 1m70, bac+5, revenu moyen, habite en banlieue : `(34, 170, 5, 3, 11)`. Ces deux points sont très proches dans l'espace, et ce n'est pas une coïncidence : Marie et Paul se ressemblent selon les critères choisis. On peut mesurer cette proximité, calculer des distances, trouver des groupes de personnes similaires, tout ça sans jamais formuler de règle explicite. La ressemblance émerge de la géométrie.

Les embeddings de tokens fonctionnent sur le même principe, mais dans un espace avec plusieurs centaines de dimensions, et selon un critère unique : deux tokens qui apparaissent souvent dans des contextes similaires reçoivent des coordonnées proches. **Rien d'autre. Pas leur sens, pas leur définition, pas ce qu'ils désignent dans le monde. Le sens d'un mot, d'une phrase, d'un texte, n'est à aucun moment pris en considération.** Uniquement la fréquence avec laquelle ils côtoient les mêmes autres tokens dans les textes d'entraînement.

C'est un point qu'il faut tenir fermement, parce qu'il est contre-intuitif. Le modèle ne sait pas que "roi" désigne un être humain qui exerce un pouvoir héréditaire sur un territoire. Il sait que "roi" apparaît souvent près de "couronne", "trône", "règne", "royaume", "reine". Ce sont ces cooccurrences, et uniquement elles, qui déterminent la position du token dans l'espace. Le sens n'entre jamais dans le calcul.

Et pourtant : le résultat ressemble à de la structure sémantique. "Roi" et "reine" se retrouvent proches, "chien" et "chat" aussi, "philosophie" et "métaphysique" aussi. La différence de coordonnées entre "roi" et "reine" est à peu près la même que la différence entre "homme" et "femme" : dans les deux cas, une même direction dans l'espace représente quelque chose comme le genre. Non pas parce que le modèle a compris ce qu'est le genre, mais parce que les textes humains utilisent ces mots dans des contextes systématiquement parallèles, et que cette régularité d'usage s'est inscrite dans la géométrie.

Ce fait de plonger un token dans un espace numérique de telle façon que sa position reflète ses cooccurrences avec les autres tokens s'appelle un **embedding**, terme qu'on peut traduire approximativement par "enchâssement". Ce n'est pas de la compréhension. C'est une cartographie statistique des habitudes du langage.

---

## 3. Prédire le mot suivant

Un LLM est fondamentalement un programme entraîné à répondre à une question unique : **étant donné ce morceau de texte, quel token devrait venir ensuite ?**

C'est tout. Pas "comprendre ce que veut dire le texte". Pas "évaluer si c'est vrai". Pas "avoir une opinion". Juste : étant donné ce qui précède, quel token vient ensuite ?

Pour chaque position, le modèle choisit le token suivant. Ce choix est le résultat d'un calcul produit par l'architecture du modèle après exposition à des quantités colossales de texte, pas d'une règle explicite, pas d'un comptage de fréquences. C'est là que réside toute la complexité.

Pour générer une réponse complète, le système répète cette opération des centaines ou des milliers de fois : il prédit le premier token, l'ajoute à ce qui précède, prédit le suivant, et ainsi de suite.

Bien faire cette prédiction suppose d'avoir absorbé une quantité considérable de régularités : quels tokens vont ensemble, quelles séquences se closent de quelle façon, quels enchaînements sont plausibles dans quel genre de texte, quelles associations sont fréquentes entre quels domaines. Tout cela sans jamais traiter de sens : uniquement des patterns statistiques à grande échelle. Le résultat peut ressembler à de la connaissance. En est-ce ? Cela dépend de ce qu'on entend par là.

---

## 4. Apprendre de quoi, exactement ?

Un LLM est entraîné sur des quantités de texte difficiles à visualiser. Des milliards de pages web, des millions de livres, des années d'articles scientifiques, de forums, de littérature, de code informatique, de journaux. En gros : une fraction substantielle de tout ce que l'humanité a écrit et numérisé.

Ce que le modèle apprend de tout ça, c'est un ensemble de **régularités statistiques** : quels tokens ont tendance à se suivre, dans quels environnements textuels, avec quelle fréquence. C'est une représentation implicite de la structure du langage, et par extension, de la façon dont les humains expriment leurs connaissances dans ce langage. Pas les connaissances elles-mêmes, ni leur sens : la structure statistique de leurs expressions.

Ce que le modèle n'apprend pas, et c'est important pour la suite : une expérience du monde. Un enfant qui apprend le mot "chaud" l'apprend parce qu'il a touché quelque chose de chaud et que ça a fait mal. Le modèle apprend le mot "chaud" parce qu'il apparaît souvent près des mots "brûler", "feu", "température", "soleil". Ce n'est pas la même chose.

Cette différence évoque ce que la philosophie du langage appelle, il me semble, le problème du **grounding**, de l'ancrage dans le monde. Les représentations du modèle sont cohérentes entre elles, mais elles ne sont pas attachées à des perceptions, des actions, des conséquences vécues. C'est une distinction qui me semble mériter d'être prise au sérieux.

Ce qui mérite aussi d'être interrogé, c'est le mot "apprendre" lui-même. Ce qu'on appelle apprentissage dans le cas d'un LLM, c'est techniquement ceci : ajuster des milliards de paramètres numériques de façon à minimiser l'erreur de prédiction sur les textes d'entraînement. Un processus d'optimisation. Est-ce que c'est apprendre ? Le mot est commode, les chercheurs l'utilisent, ce texte aussi. Mais il transporte avec lui tout un arrière-plan : une transformation d'un sujet, une compréhension nouvelle, une intériorisation. Rien de tout cela ne va de soi ici.

---

## 5. La boîte noire

L'architecture qui sous-tend les LLM s'appelle "réseau de neurones", et il serait malhonnête de ne pas le mentionner. Mais le terme est trompeur : ces "neurones" n'ont de commun avec les neurones biologiques que le nom, donné par analogie dans les années 1940 et resté par habitude. Unitairement, c'est d'une simplicité déconcertante : chaque "neurone" artificiel reçoit des nombres en provenance d'autres neurones, les multiplie par des coefficients, les additionne, et applique une fonction mathématique élémentaire au résultat. C'est tout. Pas de mystère à l'échelle individuelle. La complexité n'est pas dans chaque unité, elle émerge de leur nombre, des milliards, et de la façon dont elles sont connectées et ajustées.

Ce qui importe surtout, c'est ce qu'on ne sait pas : ce qui se passe à l'intérieur de ce réseau pendant que le modèle génère un token reste largement opaque. C'est ce qu'on appelle le problème de l'interprétabilité, ou plus simplement le problème de la boîte noire. Tout ce qui précède décrit le mécanisme de l'extérieur : ce que le système reçoit en entrée, ce qu'il produit en sortie, les grandes étapes du processus. Mais l'intérieur, lui, résiste.

Un réseau de neurones, c'est des milliards de paramètres numériques qui interagissent. On peut observer le résultat de ces interactions, on peut même en mesurer certaines propriétés statistiques, mais on ne peut pas lire ce qui se passe à l'intérieur comme on lirait un raisonnement. Il n'y a pas de règles explicites, pas d'étapes nommées, pas de représentations internes qu'on puisse pointer du doigt en disant "voilà, ici le modèle a compris que c'était une question de logique". C'est une transformation opaque de nombres en nombres.

Ce n'est pas une limite qu'on espère corriger prochainement : c'est une caractéristique structurelle de ces architectures. Des chercheurs travaillent sur l'interprétabilité, c'est-à-dire sur des méthodes pour mieux comprendre ce qui se passe à l'intérieur, mais le domaine est jeune et les résultats partiels.

Ce point a une conséquence directe sur tout ce qu'on peut dire de ces systèmes, y compris dans ce texte. Les affirmations sur ce que le modèle "fait" ou "ne fait pas", "a" ou "n'a pas", sont des inférences à partir du comportement observable, pas des descriptions de mécanismes vérifiés de l'intérieur. Quand on dit "le modèle ne raisonne pas", on observe que son comportement ne ressemble pas à du raisonnement tel qu'on le conçoit. On ne lit pas l'absence de raisonnement dans ses paramètres. La nuance est importante.

Il faut ajouter à cela quelque chose de plus troublant encore. On savait, en construisant ces systèmes, qu'ils serviraient à prédire des tokens. Ce qu'on n'avait pas clairement anticipé, c'est l'étendue de ce que cette tâche allait produire à grande échelle. L'ampleur des capacités qui ont émergé, traduire, expliquer, coder, tenir une conversation, résoudre certains problèmes, a dépassé la plupart des prévisions, y compris chez ceux qui construisaient ces systèmes. L'intuition que l'échelle produirait des gains importants existait dès les années 2010, portée notamment par les travaux sur les réseaux profonds. Mais l'ampleur du saut qualitatif, quand ces systèmes ont vraiment décollé à partir de 2020, a pris une grande partie de la communauté de court, y compris ceux qui avaient contribué à les construire. Ces capacités sont dites émergentes : elles n'ont pas été programmées explicitement, elles sont apparues à partir d'un certain seuil d'échelle. L'émergence est elle-même un sujet de recherche actif : on ne sait pas bien pourquoi ces capacités apparaissent, ni comment prédire lesquelles apparaîtront ensuite. On sait ce qu'on a fait. On ne sait pas tout à fait ce qu'on a obtenu.

Et quand le comportement du modèle pose problème, comment le corrige-t-on ? Pas en intervenant sur des mécanismes compris, mais en ajustant le comportement observable par petites touches successives : on montre au modèle des exemples de ce qu'on veut et de ce qu'on ne veut pas, on recueille des évaluations humaines, on itère. C'est du bricolage empirique à grande échelle, rigoureux dans sa méthode mais aveugle sur ses causes. On ne sait pas exactement pourquoi telle correction fonctionne, ni quels effets de bord elle produit ailleurs dans le comportement. La situation est celle-ci : on pilote quelque chose dont on ne comprend pas pleinement le fonctionnement interne, avec des outils qui agissent sur les symptômes plutôt que sur les mécanismes.

---

## 6. Ce que ça produit, et pourquoi c'est troublant

Le résultat de tout ça, c'est un système capable de produire du texte d'une fluidité et d'une cohérence qui peuvent être confondantes. Et c'est là qu'on retrouve Mouawad.

Ce que la citation semble dire : l'IA ne peut pas saisir le tremblement d'où surgissent les mots, parce que c'est l'imperfection elle-même qui est précieuse, et qu'une machine ne peut pas trembler.

C'est une intuition forte. Maintenant qu'on a quelques éléments sur ce que fait ce mécanisme, on peut la tester plus précisément.

Est-ce que le modèle "tremble" ? Dans un sens technique très particulier, peut-être. La génération n'est pas déterministe : à chaque étape, le modèle ne choisit pas mécaniquement le token le plus probable, mais tire au sort parmi les tokens probables selon un paramètre appelé "température". Une température élevée produit des sorties plus surprenantes, plus "créatives" au sens d'inattendues. Une température basse produit des sorties plus prévisibles. Il y a donc une part de bruit, d'aléatoire, intégrée au mécanisme.

Est-ce que c'est le même tremblement que celui de Mouawad ? Presque certainement non. Ce qu'il semble désigner, c'est quelque chose comme la vulnérabilité de l'acte d'écrire : le fait que les mots viennent d'un corps, d'une histoire, d'une peur, d'un désir de communication avec un autre. Le bruit statistique d'un modèle de langage n'est pas cette vulnérabilité-là.

Mais la question reste ouverte et intéressante. En discutant de tout ça avec une amie professeure de philosophie, on a fini par aboutir à cette formulation : si un texte produit par un LLM est indiscernable d'un texte humain, est-ce que la valeur du texte dépend de son origine, ou de ce qu'il fait à celui qui le lit ? Est-ce qu'un texte vaut par ce dont il est la trace, ou par ce qu'il provoque ? C'est une question sur la notion de valeur elle-même : est-elle intrinsèque à l'objet et à son origine, ou extrinsèque, constituée par ses effets ? On peut maintenant au moins la poser avec un peu plus de précision qu'avant.

Cette conversation nous a menés plus loin encore, vers une question qu'on n'avait pas anticipée : est-ce que nous-mêmes ne serions pas, d'une certaine façon, des LLMs ? Nous aussi apprenons le langage par exposition répétée à des textes et des conversations, sans qu'on nous en explique jamais le sens de manière directe. Nous aussi produisons des énoncés en nous appuyant sur des patterns absorbés, des régularités syntaxiques et rhétoriques intériorisées. Nous aussi glissons vers des formulations attendues, des enchaînements familiers.

On a vu en section 4 ce qui distingue l'apprentissage humain de celui d'un LLM : nous apprenons les mots dans un monde, avec un corps, des sensations, des conséquences. Le mot "chaud" pour un enfant est inséparable de l'expérience d'avoir eu chaud. Ce grounding manque au modèle, du moins dans le cas des LLM textuels qui nous occupent ici. Mais cette différence suffit-elle à dissoudre la question ? Ou ouvre-t-elle simplement un débat plus précis sur ce que signifie comprendre ?

Cette question mérite d'être posée sérieusement. Elle touche à ce que la philosophie de l'esprit appelle le problème difficile de la conscience : est-ce qu'il y a quelque chose que ça fait d'être un LLM ? Est-ce qu'il existe des qualia, une expérience subjective de l'intérieur, ou seulement du traitement sans personne pour l'éprouver ? Et si on ne sait pas répondre pour le LLM, est-ce qu'on sait vraiment répondre pour nous-mêmes ? Ce n'est pas ce texte qui tranchera. Mais c'est une des raisons pour lesquelles comprendre ce que fait un LLM n'est pas seulement une question technique.

---

## 7. Ce que ça ne fait pas

Il y a plusieurs idées reçues sur les LLM qui valent la peine d'être corrigées, non par souci de technicité, mais parce qu'elles peuvent fausser les questions qu'on peut poser.

**Un LLM ne raisonne pas au sens où on entend habituellement ce mot, et n'utilise pas de procédé déductif.** C'est peut-être le malentendu le plus lourd de conséquences, parce qu'il touche directement à ce qu'un philosophe est formé à analyser : l'argumentation, la logique, l'inférence.

Quand un LLM écrit "donc", "par conséquent", "il s'ensuit que", "si... alors...", il ne procède à aucune déduction. Il produit le token qui suit statistiquement ce type de formulation dans les textes qu'il a vus — et oui, "qu'il a vus" est encore un glissement : le modèle n'a rien vu, mais on ne s'en privera pas, le lecteur est maintenant averti. La forme du raisonnement est là. Le raisonnement, non.

Un exemple simple : si on demande à un LLM de résoudre un problème de logique, il peut produire la bonne réponse. Mais pas parce qu'il a appliqué une règle d'inférence. Parce que des problèmes similaires, avec des solutions similaires, étaient dans ses données d'entraînement. Si on reformule le même problème d'une façon légèrement inhabituelle, le modèle peut échouer là où un raisonnement véritable réussirait, précisément parce que la forme nouvelle ne ressemble plus aux exemples mémorisés.

Ce point a une conséquence directe sur la fiabilité : un humain qui raisonne peut détecter une contradiction parce qu'elle viole une règle logique qu'il applique. Un LLM peut produire deux affirmations contradictoires dans le même texte sans que rien dans son architecture ne le signale comme une erreur. Il n'y a pas de vérificateur logique interne. Il y a seulement un calcul qui produit des scores sur les tokens possibles, et rien dans ce calcul ne détecte une contradiction.

**Un LLM ne "pense" pas entre les tokens.** Il n'y a pas de processus interne continu. Chaque token est calculé, puis le modèle repart pour le suivant. Ce qu'on appelle parfois le "raisonnement" d'un LLM est en réalité quelque chose d'externalisé dans le texte lui-même : quand on demande au modèle d'écrire ses étapes de raisonnement avant de conclure, il produit de meilleures réponses. Non pas parce qu'il réfléchit mieux, mais parce que le texte intermédiaire qu'il génère s'ajoute à ce qu'il a sous les yeux, et oriente statistiquement les tokens suivants vers de meilleures zones. C'est une imitation fonctionnelle du raisonnement, pas du raisonnement.

**Un LLM n'a pas de mémoire entre les conversations.** Chaque échange commence à zéro. Ce que vous avez dit hier n'existe plus. Ce qui ressemble à une "relation" ou à une "connaissance de vous" est une reconstruction à partir de ce que le modèle a sous les yeux au moment où il génère sa réponse : la conversation en cours, depuis le début, et rien d'autre. Les chercheurs appellent cette étendue visible la **fenêtre de contexte**, c'est-à-dire le bloc de texte que le modèle peut prendre en compte à un instant donné. Au-delà de cette fenêtre, rien n'existe.

*(Un lecteur familier de la notion de fenêtre d'Overton pourrait trouver l'analogie suggestive : de même que la fenêtre d'Overton désigne l'ensemble des idées jugées recevables dans le débat public à un moment donné, la fenêtre de contexte délimite ce qui est "recevable" pour le modèle à un instant donné. Ce qui est dedans oriente la génération, ce qui est dehors n'existe pas. L'analogie a ses limites : l'une est un mécanisme sociologique sur la dynamique des idées, l'autre un dispositif technique sur la portée d'un calcul. Mais comme image pour saisir ce que signifie l'absence de mémoire, elle n'est pas sans intérêt.)*

**Un LLM ne cherche pas à dire la vérité.** Il cherche à produire du texte probable. Souvent, le texte probable est aussi du texte vrai, parce que les textes d'entraînement contenaient beaucoup de vrai. Mais l'inverse n'est pas garanti, et le cas le plus insidieux n'est pas celui où le modèle invente un fait de toutes pièces : c'est celui où il reproduit fidèlement ce qui circule le plus sur internet, y compris quand ce qui circule le plus est faux ou approximatif. L'algorithme de recherche dichotomique sur tableau trié en est un exemple connu : les implémentations incorrectes ou qui ne compilent pas sont si répandues sur le web, y compris sur des sources de référence, que le modèle les reproduit avec la même assurance qu'une version correcte. Le modèle n'a pas de mécanisme interne pour distinguer une affirmation vraie d'une affirmation fausse, ni une implémentation correcte d'une incorrecte.

À cela s'ajoute un phénomène différent, que les chercheurs appellent "hallucination" : le modèle peut générer des faits, des références, des citations, des noms propres qui n'existent nulle part dans ses données d'entraînement. Pas une erreur par reproduction de sources incorrectes, mais une invention pure, présentée avec la même fluidité et la même assurance que le reste.

**Un LLM n'a pas d'intentionnalité.** Quand il écrit "je pense que", il produit le texte qui suit statistiquement une telle formulation dans ses données d'entraînement. Ce n'est pas une affirmation sur un état interne.

Ces limitations ne sont pas des défauts qu'une prochaine version corrigera nécessairement. Certaines sont constitutives de l'architecture. D'autres pourraient évoluer. La prudence s'impose dans les deux sens.

---

## Conclusion : pourquoi ça change quelque chose de le savoir

Revenons au sujet de l'ENS.

Ce sujet a été posé par une institution exigeante. Des candidats s'en sont certainement emparés avec rigueur, certains peut-être en connaissant aussi le fonctionnement technique de ces systèmes. Ce texte ne prétend pas combler un manque : il propose simplement un angle, celui de quelqu'un qui vient du côté de la mécanique et qui a essayé de traverser dans l'autre direction.

Ce que cette traversée permet, peut-être, c'est de distinguer les questions qui ont des réponses techniques de celles qui restent ouvertes, d'éviter de prêter au modèle des propriétés dont on ne sait pas s'il les a, et d'éviter aussi de lui refuser des propriétés qu'il a peut-être.

La citation de Mouawad dit que l'IA ne saura jamais saisir le tremblement. C'est peut-être vrai. Mais la question mérite d'être posée : en fonction de quel postulat juge-t-on ce qu'une chose saisit ou ne saisit pas ? Si juger suppose de comprendre le mécanisme, alors oui, la connaissance technique change quelque chose. Mais si juger peut se faire depuis l'expérience de ce que produit la chose, depuis ses effets, depuis ce qu'elle provoque en nous, alors Mouawad peut avoir raison sans avoir jamais ouvert un article de recherche en apprentissage automatique. Les deux positions supposent des critères différents du jugement.

*(Cette tension entre juger une chose par ce qu'elle est de l'intérieur et la juger par ce qu'elle produit en relation avec d'autres n'est pas sans rappeler le geste fondateur de la théorie des catégories : ce qui compte n'est pas la nature interne d'un objet, mais ses morphismes, ses relations, ses effets. Un lecteur qui a parcouru [l'introduction à la théorie des catégories](intro_categories.md) sur ce site reconnaîtra peut-être l'écho.)*

Ce texte ne tranche pas sur la question du critère du jugement. Il propose seulement que savoir comment ça fonctionne déplace la question, même si ça ne la résout pas.

Le cloisonnement entre ceux qui savent comment ça marche et ceux qui pensent à ce qu'on en fait n'est pas une fatalité. Il est juste inconfortable à traverser. J'espère que ce texte a rendu la traversée un peu moins rude.

---

*Pour aller plus loin sur l'architecture technique : l'article fondateur est "Attention Is All You Need" de Vaswani et al. (2017), disponible librement sur arXiv. Pour une introduction plus accessible, "The Illustrated Transformer" de Jay Alammar est une ressource en ligne souvent recommandée. Sur les questions soulevées par ces systèmes, John Searle (la "chambre chinoise") et les réponses qu'elle a suscitées restent un point d'entrée utile, même si le débat a beaucoup évolué depuis.*

---

*Ce texte a été rédigé avec l'aide d'un LLM qui a proposé une structure initiale et aidé à la formulation et à la vérification de certains points factuels. La structure a été modifiée en cours de route. Les choix de contenu, l'orientation du discours, les exemples et le point de vue sont les miens.*
