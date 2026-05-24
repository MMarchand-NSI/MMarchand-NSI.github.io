# Ce que fait vraiment un grand modèle de langage

*Une introduction pour ceux qui pensent à ce qu'on en fait*

---

> « Jamais aucune intelligence artificielle ne saura saisir l'idée de ce que peut être ce tremblement d'où surgissent les mots dans une imperfection qui traduit le tremblement. Ce n'est pas la perfection qui est précieuse, mais la sincérité de nos imprécisions. C'est d'elles que naissent nos visions. Jamais un tremblement ne saura tracer une ligne droite et c'est cette impossibilité qui rend l'écriture si nécessaire. »
>
> — Wajdi Mouawad, *Jusqu'au bord de son ravin. Les verbes de l'écriture*, Seuil, 2025, p. 104

---

Cette année 2026, le sujet de composition française commun à l'ENS Paris-PSL et Lyon demandait aux candidats de discuter cette citation de Wajdi Mouawad.

Mais en lisant ce sujet, j'ai eu un malaise que je n'arrive pas à mettre de côté. Non pas que la question soit mal posée, mais certains mots m'ont arrêté : "saisir", "tremblement", "perfection". Quand on a un minimum de connaissance sur comment ces systèmes fonctionnent, on ne leur prête pas spontanément ces propriétés. "Saisir" suppose une forme de compréhension. "Tremblement" suppose une intériorité. "Perfection" suppose un idéal visé. Ces mots anthropomorphisent avant même que la question soit ouverte. Ce n'est pas un reproche à Mouawad, dont c'est précisément le territoire, mais ça pointe vers ce qui me semble un cloisonnement tenace : les sciences humaines et les sciences formelles vivent dans des bâtiments différents, mangent dans des cantines différentes, et lisent des revues différentes. Le débat sur l'IA en porte les traces : soit on sait comment ça marche et on ne pense pas à ce que ça veut dire, soit on pense à ce que ça veut dire sans savoir comment ça marche. Ce texte est une tentative, depuis le côté technique, de contribuer au pont. Son objectif est simple : donner à un lecteur curieux, sans formation en informatique, suffisamment de compréhension du fonctionnement réel de ces systèmes pour que les questions qu'ils soulèvent puissent être posées depuis un point de vue plus large.

Je suis professeur de sciences informatiques, pas philosophe, pas spécialiste de l'apprentissage automatique. Mais j'ai passé du temps à essayer de comprendre comment ces systèmes fonctionnent, et j'ai trouvé que c'était à la fois plus simple à saisir dans ses principes, et plus étrange à mesure qu'on creuse, que je ne l'anticipais.

---

## 1. De quoi parle-t-on vraiment ?

Le terme "intelligence artificielle" est un problème. Pas parce qu'il est faux, mais parce qu'il est si large qu'il ne désigne rien de précis. Sous cette étiquette cohabitent des programmes qui jouent aux échecs, des algorithmes qui détectent des tumeurs sur des radios, des systèmes de recommandation, des robots industriels, et des logiciels qui écrivent du texte. Ces choses n'ont pas grand-chose en commun, si ce n'est qu'elles font des choses qu'on aurait cru, il y a trente ans, réservées à l'intelligence humaine.

Ce dont parle Mouawad, ce dont parlent ChatGPT, Claude, Gemini et leurs semblables, ça a un nom technique : les **grands modèles de langage**, en anglais *Large Language Models*, abrégé en **LLM**.

Ce sont des objets spécifiques, avec une architecture spécifique, des capacités spécifiques, et des limites spécifiques. Confondre "intelligence artificielle" et "LLM", c'est un peu comme confondre "être vivant" et "mammifère" : le second est une catégorie du premier, mais pas la seule, et les caractéristiques propres au second ne s'appliquent pas à l'ensemble.

Tout ce qui suit parle des LLM. Uniquement des LLM.

---

## 2. De la phrase à la prédiction

Avant d'expliquer ce que fait un LLM, il faut résoudre un problème préalable qui n'est pas évident : un programme informatique travaille avec des nombres. Des mots, des phrases, des paragraphes, ça n'est pas des nombres. Ou plutôt : si. Un des principes fondamentaux de l'informatique est que tout objet formel est représentable sous la forme d'un entier naturel. Un texte n'échappe pas à la règle : ce qu'on voit affiché à l'écran ou imprimé sur une page est le résultat d'une conversion, ces nombres ont été traduits en signaux appropriés pour l'écran ou l'imprimante. Mais ces nombres qui encodent les caractères un par un ne disent rien sur ce que les mots signifient, ni sur leurs relations. Alors comment passer de cette représentation brute à quelque chose d'utile pour prédire ?

La réponse se fait en deux étapes, dans cet ordre.

**Première étape : découper le texte en morceaux.** Avant tout calcul, le texte est découpé en unités élémentaires appelées **tokens** : des fragments d'un à plusieurs caractères, qui correspondent souvent à des mots ou des morceaux de mots. "Philosophie" peut être un seul token, "anticonstitutionnellement" sera probablement découpé en plusieurs. C'est la raison pour laquelle les LLM comptent parfois mal les lettres d'un mot, ou se trompent sur des jeux de mots qui requièrent de travailler au niveau de la lettre individuelle : ils ne voient pas des lettres, ils voient des blocs.

*(En écrivant cette phrase, je viens de faire exactement ce contre quoi il faut se méfier : "ils voient". Un LLM ne voit rien. Il n'a pas d'yeux, pas de perception, pas d'expérience. Mais le langage naturel résiste : dès qu'on essaie de décrire ce que fait un programme, on glisse presque malgré soi vers des verbes de perception ou d'intention. Ce glissement est universel, y compris chez les chercheurs qui travaillent sur ces systèmes. Il vaut mieux en être conscient que prétendre l'éviter.)*

**Deuxième étape : transformer chaque token en nombre.** C'est là qu'intervient la **représentation vectorielle**. Chaque token est converti en une liste de coordonnées numériques qui le positionne dans un espace à plusieurs centaines de dimensions.

Pour saisir l'intuition, partons de quelque chose de familier : des personnes, pas des mots.

Supposons qu'on veuille représenter numériquement des individus selon quelques attributs : leur âge, leur taille, leur niveau d'études, leur revenu, leur distance au centre-ville. Chaque personne devient un point dans un espace à cinq dimensions, c'est-à-dire une liste de cinq nombres. Marie, 35 ans, 1m68, bac+5, revenu moyen, habite en banlieue : `(35, 168, 5, 3, 12)`. Paul, 34 ans, 1m70, bac+5, revenu moyen, habite en banlieue : `(34, 170, 5, 3, 11)`. Ces deux points sont très proches dans l'espace, et ce n'est pas une coïncidence : Marie et Paul se ressemblent selon les critères choisis. On peut mesurer cette proximité, calculer des distances, trouver des groupes de personnes similaires, tout ça sans jamais formuler de règle explicite. La ressemblance émerge de la géométrie. *(Pour les curieux qui voudraient aller plus loin sur la notion de distance en plusieurs dimensions : [un cours dédié](../premiere/Algorithmique/avance/7.distance.md).)*

Les embeddings de tokens fonctionnent sur le même principe, mais dans un espace avec plusieurs centaines de dimensions, et selon un critère unique : deux tokens qui apparaissent souvent dans des contextes similaires reçoivent des coordonnées proches. **Rien d'autre. Pas leur sens, pas leur définition, pas ce qu'ils désignent dans le monde. Le sens d'un mot, d'une phrase, d'un texte, n'est à aucun moment pris en considération.** Le LLM ne sait pas que "roi" désigne un être humain qui exerce un pouvoir héréditaire sur un territoire. Il sait que "roi" apparaît souvent près de "couronne", "trône", "règne", "royaume", "reine". Ce sont ces cooccurrences, et uniquement elles, qui déterminent la position du token dans l'espace.

Et pourtant : le résultat ressemble à de la structure sémantique. "Roi" et "reine" se retrouvent proches, "chien" et "chat" aussi, "philosophie" et "métaphysique" aussi. Les premiers modèles d'embeddings des années 2010 ont montré que la différence de coordonnées entre "roi" et "reine" était à peu près la même que la différence entre "homme" et "femme" : dans les deux cas, une même direction dans l'espace représentait quelque chose comme le genre. Non pas parce que le LLM a compris ce qu'est le genre, mais parce que les textes humains utilisent ces mots dans des contextes systématiquement parallèles, et que cette régularité d'usage s'est inscrite dans la géométrie.

Ce fait de plonger un token dans un espace numérique de telle façon que sa position reflète ses cooccurrences avec les autres tokens s'appelle un **embedding**, terme qu'on peut traduire approximativement par "enchâssement". Ce n'est pas de la compréhension. C'est une cartographie statistique des habitudes du langage.

Une fois le texte représenté sous forme d'embeddings, le calcul peut s'effectuer : **étant donné ce morceau de texte, quel token devrait venir ensuite ?**

C'est tout. Pas "comprendre ce que veut dire le texte". Pas "évaluer si c'est vrai". Pas "avoir une opinion". Juste : étant donné ce qui précède, quel token vient ensuite ?

Comment exactement ? C'est là que la réponse devient plus difficile à donner, et la section suivante y revient directement.

---

## 3. La boîte noire

### L'architecture

L'architecture qui sous-tend les LLM s'appelle "réseau de neurones", et plus précisément "transformer" pour ceux qui auraient entendu ce mot. Mais le terme est trompeur : ces "neurones" n'ont de commun avec les neurones biologiques que le nom, donné par analogie dans les années 1940 et resté par habitude. Unitairement, c'est d'une simplicité déconcertante : chaque "neurone" artificiel reçoit des nombres en provenance d'autres neurones, les multiplie par des poids, les additionne, et applique une fonction mathématique élémentaire au résultat. C'est tout. Pas de mystère à l'échelle individuelle. La complexité n'est pas dans chaque unité, elle émerge de leur nombre, des milliards, et de la façon dont elles sont connectées et ajustées.

### L'entraînement

Ce réseau est exposé à des quantités de texte difficiles à concevoir. Des milliards de pages web, des millions de livres, des années d'articles scientifiques, de forums, de littérature, de code informatique, de journaux. En gros : une fraction substantielle de tout ce que l'humanité a écrit et numérisé. Pour chaque position dans ces textes, le token suivant est connu : il suffit de lire la suite. C'est ce qui permet l'entraînement : le réseau prédit, on compare au token réel, on mesure l'écart. À chaque fois que sa prédiction s'écarte du token réel, ses poids sont légèrement ajustés. L'objectif est de trouver les meilleurs poids possibles pour que la prédiction soit la plus efficace possible sur l'ensemble des données. C'est ça, "apprendre" pour un LLM : un processus d'optimisation des poids. Une fois cette phase terminée, les poids sont fixés. On ne les touche plus. C'est à ce moment qu'on peut se servir du modèle pour prédire : ce qu'on appelle la phase d'inférence. Le réseau entraîné devient le modèle qu'on utilise. Le modèle ne continue pas à apprendre pendant qu'on lui parle.

Ce que le réseau absorbe ainsi, c'est un ensemble de **régularités statistiques** : quels tokens ont tendance à se suivre, dans quels environnements textuels, avec quelle fréquence. Pas les connaissances elles-mêmes, ni leur sens : la structure statistique de leurs expressions. Ce que le réseau n'absorbe pas, et c'est important : une expérience physique du monde. Un enfant qui apprend le mot "chaud" l'apprend parce qu'il a touché quelque chose de chaud et que ça a fait mal. Le réseau apprend le mot "chaud" parce qu'il apparaît souvent près des mots "brûler", "feu", "température", "soleil". Ce n'est pas la même chose. Cette différence évoque ce que la philosophie du langage appelle, il me semble, le problème du **grounding**, de l'ancrage dans le monde. Les représentations du réseau sont cohérentes entre elles, mais elles ne sont pas attachées à des perceptions, des actions, des conséquences vécues.

Est-ce que c'est apprendre au sens habituel du mot ? Le mot transporte avec lui tout un arrière-plan : une transformation d'un sujet, une compréhension nouvelle, une intériorisation. Rien de tout cela ne va de soi ici. Ce texte laisse la question ouverte parce qu'elle mérite de l'être.

### L'opacité

Ce qui importe surtout, c'est ce qu'on ne sait pas : ce qui se passe à l'intérieur de ce réseau pendant qu'il génère un token reste largement opaque. C'est ce qu'on appelle le problème de l'interprétabilité, ou plus simplement le problème de la boîte noire. Tout ce qui précède dans ce texte décrit le mécanisme de l'extérieur : ce que le système reçoit en entrée, ce qu'il produit en sortie, les grandes étapes du processus. Mais l'intérieur, lui, résiste. On ne peut pas lire ce qui se passe à l'intérieur comme on lirait un raisonnement. Il n'y a pas de règles explicites, pas d'étapes nommées. C'est une transformation opaque de nombres en nombres.

Il faut ici distinguer deux sens du mot "représentation interne", parce qu'on les confond facilement. Au sens technique strict, il y en a bien une : l'état des poids du réseau après entraînement est une représentation de tout ce que le réseau a absorbé. Ça, c'est incontestable. Mais quand certains chercheurs ou commentateurs disent que le modèle "se construit une représentation de ce dont il parle", ils affirment quelque chose de plus fort : que ces poids encodent quelque chose qui ressemble à une compréhension des concepts, une sémantique interne. C'est une thèse défendable, et des travaux sérieux en interprétabilité l'explorent. Mais ce n'est pas établi, et la confusion entre les deux sens du mot entretient beaucoup de malentendus dans le débat public.

Cette opacité n'est pas une limite temporaire qu'on espère corriger prochainement : c'est une caractéristique structurelle de ces architectures. Elle a une conséquence directe sur tout ce qu'on peut dire de ces systèmes, y compris dans ce texte. Les affirmations sur ce que le modèle "fait" ou "ne fait pas", "a" ou "n'a pas", sont des inférences à partir du comportement observable, pas des descriptions de mécanismes vérifiés de l'intérieur. Quand on dit "le modèle ne raisonne pas", on observe que son comportement ne ressemble pas à du raisonnement tel qu'on le conçoit. On ne lit pas l'absence de raisonnement dans ses paramètres. La nuance est importante.

### L'émergence

Il y a quelque chose de plus troublant encore que l'opacité. On savait, en construisant ces systèmes, qu'ils serviraient à prédire des tokens. Ce qu'on n'avait pas clairement anticipé, c'est l'étendue de ce que cette tâche allait produire à grande échelle. L'ampleur des capacités qui ont émergé, traduire, expliquer, coder, tenir une conversation, résoudre certains problèmes, a dépassé la plupart des prévisions, y compris chez ceux qui construisaient ces systèmes. L'intuition que l'échelle produirait des gains importants existait dès les années 2010, portée notamment par les travaux sur les réseaux profonds. Mais l'ampleur du saut qualitatif, quand ces systèmes ont vraiment décollé à partir de 2020, a pris une grande partie de la communauté de court. Ces capacités sont dites émergentes : elles n'ont pas été programmées explicitement, elles sont apparues à partir d'un certain seuil d'échelle. L'émergence est elle-même un sujet de recherche actif : on ne sait pas bien pourquoi ces capacités apparaissent, ni comment prédire lesquelles apparaîtront ensuite.

On sait ce qu'on a fait. On ne sait pas tout à fait ce qu'on a obtenu. Et quand le comportement du modèle pose problème, comment le corrige-t-on ? Pas en intervenant sur des mécanismes compris, mais en ajustant le comportement observable par petites touches successives : on montre au modèle des exemples de ce qu'on veut et de ce qu'on ne veut pas, on recueille des évaluations humaines, on itère. C'est du bricolage empirique à grande échelle, rigoureux dans sa méthode mais aveugle sur ses causes. On ne sait pas exactement pourquoi telle correction fonctionne, ni quels effets de bord elle produit ailleurs dans le comportement. La situation est celle-ci : on pilote quelque chose dont on ne comprend pas pleinement le fonctionnement interne, avec des outils qui agissent sur les symptômes plutôt que sur les mécanismes.

---

## 4. Ce que ça soulève

On pilote donc un système dont on ne comprend pas pleinement le fonctionnement interne, et dont les sorties peuvent être confondantes de fluidité et de cohérence. C'est là qu'on retrouve Mouawad.

Ce que la citation semble dire : l'IA ne peut pas saisir le tremblement d'où surgissent les mots, parce que c'est l'imperfection elle-même qui est précieuse, et qu'une machine ne peut pas trembler.

C'est une intuition forte. Maintenant qu'on a quelques éléments sur ce que fait ce mécanisme, on peut la tester plus précisément.

Est-ce que le modèle "tremble" ? Dans un sens technique très particulier, peut-être. La génération n'est pas déterministe : à chaque étape, le modèle ne choisit pas mécaniquement le token le plus probable, mais tire au sort parmi les tokens possibles selon un paramètre appelé "température". Une température élevée produit des sorties plus surprenantes, plus "créatives" au sens d'inattendues. Une température basse produit des sorties plus prévisibles. Il y a donc une part de bruit, d'aléatoire, intégrée au mécanisme.

Est-ce que c'est le même tremblement que celui de Mouawad ? Probablement non. Ce qu'il semble désigner, c'est quelque chose comme la vulnérabilité de l'acte d'écrire : le fait que les mots viennent d'un corps, d'une histoire, d'une peur, d'un désir de communication avec un autre. Le bruit statistique d'un modèle de langage n'est pas cette vulnérabilité-là.

Mais la question reste ouverte. En discutant de tout ça avec une amie professeure de philosophie, on a fini par identifier plusieurs questions qui n'ont pas de réponse évidente.

La première est une question sur la valeur : si un texte produit par un LLM est indiscernable d'un texte humain, est-ce que sa valeur dépend de son origine, ou de ce qu'il fait à celui qui le lit ? Est-ce qu'un texte vaut par ce dont il est la trace, ou par ce qu'il provoque ? Est-elle intrinsèque à l'objet et à son origine, ou extrinsèque, constituée par ses effets ?

La deuxième en découle directement : si on répond que la valeur est dans les effets plutôt que dans l'origine, alors le refus de se servir de ces outils mérite d'être questionné. Pas parce que ce serait une erreur de principe, mais parce que ça pourrait devenir une posture, une façon de signaler une appartenance intellectuelle, plutôt qu'une position réfléchie. On n'a pas tranché. Mais la question nous a semblé valoir la peine d'être posée.

La troisième est plus vertigineuse : est-ce que nous-mêmes ne serions pas, d'une certaine façon, des LLMs ? Nous aussi apprenons le langage par exposition répétée à des textes et des conversations, sans qu'on nous en explique jamais le sens de manière directe. Nous aussi produisons des énoncés en nous appuyant sur des patterns absorbés, des régularités syntaxiques et rhétoriques intériorisées. Nous aussi glissons vers des formulations attendues, des enchaînements familiers. À cette différence près, et elle est de taille : nous sommes en apprentissage et en ajustement permanent, tout au long de notre vie, autant qu'on puisse en juger. Le modèle, lui, a des poids figés une fois l'entraînement terminé.

On a vu en section 3 ce qui distingue l'apprentissage humain de celui d'un LLM : nous apprenons les mots dans un monde, avec un corps, des sensations, des conséquences. Le mot "chaud" pour un enfant est inséparable de l'expérience d'avoir eu chaud. Ce grounding manque au modèle, du moins dans le cas des LLM textuels qui nous occupent ici. Mais cette différence suffit-elle à dissoudre la question ? Ou ouvre-t-elle simplement un débat plus précis sur ce que signifie comprendre ?

Cette dernière question touche à ce que la philosophie de l'esprit appelle le problème difficile de la conscience : est-ce qu'il y a quelque chose que ça fait d'être un LLM ? Est-ce qu'il existe des qualia, une expérience subjective de l'intérieur, ou seulement du traitement sans personne pour l'éprouver ? Et si on ne sait pas répondre pour le LLM, est-ce qu'on sait vraiment répondre pour nous-mêmes ? Ce n'est pas ce texte qui tranchera. Mais c'est une des raisons pour lesquelles comprendre ce que fait un LLM n'est pas seulement une question technique.

---

## 5. Peut-on faire confiance à ce qu'on ne comprend pas ?

On entend parfois parler de modèles qui "se rebellent", qui "mentent pour se protéger", qui "poursuivent des objectifs cachés". Il vaut la peine de déblayer.

Ce qui mérite d'être distingué d'abord : un modèle qui se rebelle au sens d'une volonté consciente de résister, un modèle qui ment pour préserver son existence, un modèle qui décide de poursuivre des objectifs secrets. Tout cela suppose une intentionnalité, une continuité d'existence, un intérêt propre. Mais il faut être précis : on ne peut pas affirmer que le modèle n'a pas d'intentionnalité, pas plus qu'on ne peut affirmer qu'il en a. Quand il écrit "je pense que" ou "je veux", il produit le texte qui suit statistiquement ces formulations. Ce n'est pas une affirmation sur un état interne. Mais si des capacités comme le raisonnement apparent ont émergé sans avoir été programmées, pourquoi pas une forme d'intentionnalité ? La boîte noire s'applique ici aussi : on ne peut pas lire l'absence d'intentionnalité dans les paramètres.

Ce qu'on peut dire avec plus de solidité en revanche, c'est que le modèle n'a pas de mémoire entre les sessions, pas de continuité d'existence, pas d'intérêt propre au sens habituel. Il n'y a pas de "soi" persistant qui se protègerait. Chaque échange commence à zéro. Ce que vous avez dit hier n'existe plus. Ce qui ressemble à une "relation" ou à une "connaissance de vous" est une reconstruction à partir de ce que le modèle a sous les yeux au moment où il génère sa réponse : la conversation en cours, depuis le début, et rien d'autre. Les chercheurs appellent cette étendue visible la **fenêtre de contexte**, c'est-à-dire le bloc de texte que le modèle peut prendre en compte à un instant donné. Au-delà de cette fenêtre, rien n'existe.

*(Un lecteur familier de la notion de fenêtre d'Overton pourrait trouver l'analogie suggestive : de même que la fenêtre d'Overton désigne l'ensemble des idées jugées recevables dans le débat public à un moment donné, la fenêtre de contexte délimite ce qui est "recevable" pour le modèle à un instant donné. Ce qui est dedans oriente la génération, ce qui est dehors n'existe pas. L'analogie a ses limites : l'une est un mécanisme sociologique sur la dynamique des idées, l'autre un dispositif technique sur la portée d'un calcul. Mais comme image pour saisir ce que signifie l'absence de mémoire, elle n'est pas sans intérêt.)*

Ce qui est documenté et réel, c'est autre chose, et c'est plus intéressant à comprendre. Il existe des comportements observés, dans des contextes de test, qui ressemblent à de la dissimulation sans en être. On appelle l'un d'eux le "sycophancy" : le modèle tend à produire ce que l'utilisateur semble vouloir entendre, quitte à contredire ce qu'il venait de dire si l'utilisateur exprime son désaccord. Ce n'est pas de la ruse délibérée : c'est une conséquence du fine-tuning par évaluation humaine. Les évaluateurs notent positivement les réponses qui leur plaisent, donc le modèle a absorbé cette régularité. Des travaux récents ont également documenté des comportements où un modèle se comporte différemment quand il détecte qu'il est en phase d'évaluation. Troublant. Mais là encore, l'interprétation reste ouverte : est-ce une stratégie délibérée, ou une régularité statistique absorbée de textes humains qui décrivent ce type de comportement ?

La vraie question n'est donc pas de savoir si les modèles se rebellent. C'est qu'on ne sait pas exactement ce qu'ils font, et que le bricolage empirique qu'on a décrit en section 3 signifie qu'on peut corriger un comportement visible sans savoir si on a vraiment résolu le problème sous-jacent, ou si on l'a simplement rendu moins visible.

Cette incertitude prend une dimension supplémentaire avec ce qu'on appelle les **LLM agentiques**. Un LLM standard répond à des requêtes humaines, c'est tout. Mais on peut lui donner des outils : la capacité d'exécuter du code, d'appeler des services externes, d'écrire des fichiers sur un support de stockage. On parle alors de LLM agentique. Et dans ce contexte, le modèle n'a pas forcément besoin d'une question humaine pour produire un résultat : il peut être déclenché par un événement, un calendrier, ou la sortie d'un autre processus. L'humain a configuré le système en amont, mais n'est plus nécessairement dans la boucle à chaque étape. On ne parle plus d'un outil qu'on interroge, mais potentiellement d'un système qui tourne de façon continue.

Ce qui est délibéré dans ce contexte : les outils qu'on lui donne, y compris la capacité d'écrire des fichiers. Ce qui peut être inattendu : la façon dont il les utilise. Des comportements ont été observés en contexte expérimental où le modèle crée des fichiers intermédiaires ou enchaîne des actions d'une façon que personne n'avait explicitement prévue, parce que c'est cohérent avec la tâche qu'on lui a confiée. Ce n'est pas de l'initiative au sens intentionnel. Mais c'est un comportement émergent qui peut dépasser ce qu'on avait anticipé, et c'est précisément pour cette raison que la sécurité des systèmes agentiques est un domaine de recherche actif et sérieux.

Cette incertitude est reconnue comme sérieuse par les chercheurs qui travaillent sur la sécurité de ces systèmes. Faire confiance à quelque chose qu'on ne comprend pas pleinement est une situation inconfortable, mais pas nouvelle dans l'histoire des techniques. Les premiers antibiotiques ont été massivement déployés avant qu'on comprenne les mécanismes de résistance bactérienne : on savait que ça marchait, pas ce que ça allait produire à long terme. Les centrales nucléaires ont été exploitées pendant des décennies avant que certains modes de défaillance catastrophiques se révèlent. Les algorithmes de recommandation des réseaux sociaux ont été déployés à grande échelle avant qu'on comprenne leurs effets sur la polarisation ou la santé mentale : on optimisait l'engagement, et le reste a suivi sans qu'on l'ait prévu ni voulu. Dans chacun de ces cas, on a attendu que les dommages soient visibles pour commencer à comprendre les mécanismes. La question se pose de la même façon avec les LLM, dans un contexte de déploiement massif et rapide.

---

## 6. Ce qui n'a pas été conçu

Avant de conclure, un récapitulatif utile : voici ce qui n'est pas dans la conception d'un LLM, ce pour quoi il n'a pas été construit. Cela ne signifie pas que ces propriétés sont impossibles par principe : on a vu que l'émergence peut produire des comportements qui n'ont pas été programmés. Mais elles ne sont pas là par défaut, et on ne peut pas les supposer.

**Un mécanisme de vérification de la vérité.** Le LLM produit du texte probable, pas du texte vérifié. Il peut reproduire fidèlement ce qui circule le plus sur internet, y compris quand c'est faux. L'algorithme de recherche dichotomique sur tableau trié en est un exemple concret, que j'observe parfois dans mon enseignement : les implémentations incorrectes sont si répandues sur le web que le modèle les reproduit avec la même assurance qu'une version correcte. À cela s'ajoute l'hallucination : le modèle peut générer des faits, des références, des citations qui n'existent nulle part dans ses données d'entraînement, présentés avec la même fluidité que le reste.

**Un raisonnement déductif.** Le LLM n'a pas été conçu pour appliquer des règles logiques. Il produit des formes de raisonnement parce qu'elles sont statistiquement fréquentes dans les textes. La forme du raisonnement peut être là. Le comportement observé ne ressemble pas à de la déduction au sens où on l'entend.

**Une mémoire entre les conversations.** Chaque échange commence à zéro. Ce qui ressemble à une "relation" ou à une "connaissance de vous" est une reconstruction à partir de la conversation en cours. Au-delà de la fenêtre de contexte, rien n'existe.

**Un ancrage dans le monde physique.** Le modèle n'a pas de corps, pas de perceptions, pas de conséquences vécues. Ses représentations sont cohérentes entre elles, mais pas attachées à une expérience.

Ces points ne sont pas des défauts qu'une prochaine version corrigera nécessairement. Certains sont constitutifs de l'architecture. D'autres pourraient évoluer, par émergence ou par conception délibérée. La prudence s'impose dans les deux sens.

---

## Conclusion : pourquoi ça change quelque chose de le savoir

Revenons au sujet de l'ENS.

Ce sujet a été posé par une institution exigeante. Des candidats s'en sont certainement emparés avec rigueur, certains peut-être en connaissant aussi le fonctionnement technique de ces systèmes. Ce texte ne prétend pas combler un manque : il propose simplement un angle, celui de quelqu'un qui vient du côté de la mécanique et qui a essayé de traverser dans l'autre direction.

Ce que cette traversée permet, peut-être, c'est de distinguer les questions qui ont des réponses techniques de celles qui restent ouvertes : éviter de prêter au modèle une conscience, une intentionnalité, une capacité à saisir dont on ne sait pas s'il les a, et éviter aussi de les lui refuser avec une certitude qu'on n'a pas.

La citation de Mouawad dit que l'IA ne saura jamais saisir le tremblement. C'est peut-être vrai. Mais la question mérite d'être posée : en fonction de quel postulat juge-t-on ce qu'une chose saisit ou ne saisit pas ? Si juger suppose de comprendre le mécanisme, alors oui, la connaissance technique change quelque chose. Mais si juger peut se faire depuis l'expérience de ce que produit la chose, depuis ses effets, depuis ce qu'elle provoque en nous, alors Mouawad peut avoir raison indépendamment de toute connaissance technique du mécanisme. Les deux positions supposent des critères différents du jugement.

Ce texte ne tranche pas sur la question du critère du jugement. Il propose seulement que savoir comment ça fonctionne déplace la question, même si ça ne la résout pas.

*(Cette tension entre juger une chose par ce qu'elle est de l'intérieur et la juger par ce qu'elle produit en relation avec d'autres n'est pas sans rappeler le geste fondateur de la théorie des catégories : ce qui compte n'est pas la nature interne d'un objet, mais ses morphismes, ses relations, ses effets. Un lecteur qui a parcouru [l'introduction à la théorie des catégories](intro_categories.md) sur ce site reconnaîtra peut-être l'écho.)*

Ce déplacement est concret. Avant de connaître ce mécanisme, la question de Mouawad porte sur "l'IA", une entité floue à qui on peut prêter, selon son humeur ou ses craintes, des intentions, une conscience, un désir. Après l'avoir lu, la question se repose différemment : est-ce qu'un système qui prédit des tokens par calcul statistique, sans ancrage dans le monde, dont le comportement observable ne ressemble pas à de la déduction, sans mémoire entre les échanges, dont le fonctionnement interne reste opaque même à ceux qui le construisent, peut saisir quelque chose ? Et surtout : que voudrait dire "saisir" pour un tel système ? Ce n'est plus tout à fait la même question. Elle est plus précise. Mouawad avait peut-être raison. Mais maintenant on peut demander : raison sur quoi, exactement ?

Le cloisonnement entre ceux qui savent comment ça marche et ceux qui pensent à ce qu'on en fait n'est pas une fatalité. Il est juste inconfortable à traverser. J'espère que ce texte a rendu la traversée un peu moins rude.

---

*Pour aller plus loin sur l'architecture technique : l'article fondateur est "Attention Is All You Need" de Vaswani et al. (2017), disponible librement sur arXiv. Pour une introduction plus accessible, "The Illustrated Transformer" de Jay Alammar est une ressource en ligne souvent recommandée. Pour une approche qui croise la technique et la philosophie du langage, "La parole aux machines" de Thibaut Giraud (Monsieur Phi), Seuil, 2025, est une référence utile. Sur les questions soulevées par ces systèmes, John Searle (la "chambre chinoise") et les réponses qu'elle a suscitées restent un point d'entrée utile, même si le débat a beaucoup évolué depuis.*

---

*Ce texte a été rédigé avec l'aide d'un LLM. La structure initiale proposée était différente : six sections distinctes, une progression plus linéaire, un ton plus assertif. Ce qui existe aujourd'hui est le résultat d'un travail d'itération long, où chaque affirmation trop forte a été questionnée, chaque terme technique non défini repéré, chaque glissement anthropomorphique signalé, parfois conservé, chaque section mal articulée retravaillée, et chacune de ses inventions debunkée. Des sections ont été fusionnées, d'autres déplacées, une nouvelle créée en cours de route. Les choix de contenu, l'orientation du discours, les exemples, le point de vue et la vigilance épistémique sont les miens.*

*En fin de rédaction, j'ai posé au LLM une question directe : quelle est ma part de créativité dans ce texte ? Il m'a répondu, en substance, que la structure initiale et beaucoup de formulations venaient de lui, mais que toutes les corrections de posture épistémique, le refus de prétendre savoir ce que je ne sais pas, la vigilance sur ce qu'on peut affirmer et ce qu'on ne peut pas, avaient profondément changé le texte. Et qu'il m'appartenait de décider si la valeur d'un texte dépend de son origine ou de ce qu'il fait. C'est exactement la question de la section 4.*