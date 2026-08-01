# Activité : inventer un langage pour une machine

!!! abstract "Ce que vous allez produire aujourd'hui"
    À la fin de la séance, votre groupe aura fabriqué :

    - une **table de correspondance** entre les mots d'un langage et des nombres ;
    - un **programme** écrit uniquement avec ces nombres ;
    - et vous aurez tenté de lire le programme d'un autre groupe.

    Ce dernier point est le cœur de la séance. Ce qui va s'y passer explique comment fonctionne n'importe quel processeur.

## 1. Rappel : un langage sans implicite

En seconde, vous avez constaté que le français ne convient pas pour donner des ordres exacts. « Avance un peu, puis tourne » laisse trop de place à l'interprétation : de combien, dans quel sens, de quel angle ?

Vous aviez donc inventé un **langage de tracé** : une liste courte de mots précis, une instruction par ligne, et un bloc indenté pour répéter. Par exemple :

```
avance 100
tourne 90
répète 4
    avance 50
    tourne 90
```

!!! question "Vérification rapide (5 minutes)"
    Ce programme contient trois défauts qui le rendent ambigu. Lesquels ?

    ```
    avance
    tourne un peu à droite
    recommence plusieurs fois
    ```

    ??? success "Réponse"
        1. `avance` **sans quantité** : de combien ? Une instruction qui attend un nombre doit toujours le recevoir.
        2. `tourne un peu à droite` : « un peu » n'est pas une valeur, et le sens devrait être porté par le **signe** de l'angle, pas par un mot.
        3. `recommence plusieurs fois` : ni le nombre de répétitions, ni **ce qui** doit être répété ne sont indiqués. C'est le rôle du bloc indenté.

        Un langage sans implicite se reconnaît à ceci : **deux personnes qui l'exécutent obtiennent exactement le même dessin.**

Voilà pour l'an dernier. On change maintenant de destinataire.

## 2. Le nouveau problème : la machine ne lit pas de mots

Votre langage était fait pour un humain. Un humain reconnaît le mot `avance`, parce qu'il sait lire.

Un processeur, non. Un processeur ne manipule que des **nombres**. Il n'y a, dans une machine, aucun endroit où soit rangée la lettre `a` en tant que lettre : il n'y a que des nombres, dans des cases.

!!! danger "La question de la séance"
    Si la machine ne comprend que des nombres, **comment lui donner l'ordre `avance` ?**

Prenez trente secondes pour y réfléchir avant de lire la suite.

La seule réponse possible est aussi la plus simple : **on décide qu'un nombre veut dire `avance`**. On choisit, par exemple, que 3 signifie `avance`. Rien dans le nombre 3 ne ressemble à l'idée d'avancer ; c'est une décision, pas une découverte.

## 3. Fabriquez votre code (en groupe)

!!! question "Travail de groupe (20 minutes)"
    Par groupes de trois.

    1. **Choisissez cinq mots** pour votre langage. Vous pouvez reprendre ceux de seconde (`avance`, `tourne`, `répète`, `lève`, `baisse`) ou en choisir d'autres.
    2. **Attribuez un nombre à chacun.** C'est votre **table de correspondance**. Notez-la sur une feuille à part, que vous garderez.
    3. **Écrivez un programme** d'au moins six instructions dans votre langage, avec des mots.
    4. **Traduisez-le** en n'utilisant que des nombres, à l'aide de votre table. Notez cette suite de nombres sur une **seconde feuille**.

    Répartissez les rôles : l'un tient la table, l'un écrit le programme en mots, l'un traduit. Puis **échangez les rôles** pour la vérification : celui qui a traduit ne doit pas être le seul à savoir relire.

!!! example "Un exemple, à ne pas recopier"
    Table du groupe A :

    | Mot | Nombre |
    | --- | :---: |
    | `avance` | 3 |
    | `tourne` | 7 |
    | `répète` | 1 |
    | `lève` | 4 |
    | `baisse` | 9 |

    Programme en mots : `baisse`, `avance 100`, `tourne 90`, `avance 100`, `lève`

    Programme traduit : `9 3 100 7 90 3 100 4`

## 4. L'échange (le moment important)

!!! question "Échange (10 minutes)"
    Donnez au groupe voisin **uniquement la feuille des nombres**. Gardez votre table.

    Essayez de lire le programme que vous recevez. Que dit-il ?

    ??? success "Ce que vous allez constater"
        Vous ne pouvez rien en faire. Pas parce que c'est difficile, mais parce que c'est **impossible** : sans la table, la suite `9 3 100 7 90 3 100 4` ne désigne rien. Le nombre 9 pourrait vouloir dire `baisse`, `avance`, ou n'importe quoi d'autre.

        C'est le point le plus important de la séance. **Un code ne contient pas son propre mode d'emploi.**

Réclamez maintenant la table du groupe voisin, et recommencez.

!!! question "Décodage individuel (10 minutes, chacun pour soi)"
    Avec la table du groupe voisin sous les yeux, **chacun décode seul** le programme reçu et écrit la suite d'instructions en mots sur sa propre feuille.

    Comparez ensuite vos trois réponses. Si elles diffèrent, trouvez pourquoi avant de demander de l'aide.

## 5. Ce que vous venez de découvrir

!!! abstract "Trois idées à retenir"
    **Un code est une convention arbitraire.** Que `avance` vaille 3 ou 812 ne change rien au fonctionnement, tant que tout le monde utilise la même table. Il n'y a pas de « bon » code, il y a des codes **partagés** et des codes qui ne le sont pas.

    **Sans convention partagée, un message codé ne vaut rien.** C'est pourquoi il existe des **normes** : pour que deux machines, ou deux personnes, construites séparément puissent se comprendre. Vous rencontrerez ce besoin plusieurs fois cette année, notamment pour coder les textes.

    **Coder, ce n'est pas chiffrer.** Le but ici n'est pas de cacher le message. Une table de correspondance n'est pas un secret : elle est faite pour être publiée.

!!! danger "Piège : « c'est codé, donc c'est du binaire »"
    Vos programmes sont **codés**, et pourtant vous n'avez écrit que des chiffres ordinaires. Coder, c'est faire correspondre ; écrire en binaire, c'est autre chose, et vous le verrez plus tard.

    Retenez la distinction dès maintenant, car beaucoup la confondent toute leur scolarité : **le choix du nombre qui désigne `avance` est arbitraire, la façon d'écrire ce nombre ne l'est pas.**

## 6. La question restée ouverte

Regardez à nouveau la suite `9 3 100 7 90 3 100 4`.

!!! question "Un problème que la table ne résout pas"
    Comment savez-vous que `100` est une **quantité** (avancer de 100) et non le numéro d'une instruction ? Et si un groupe avait attribué le nombre 100 au mot `lève` ?

    ??? success "Réponse"
        Vous ne le savez pas. Vous l'avez deviné grâce au contexte, parce que vous compreniez le programme. Une machine, elle, ne devine rien.

        Il manque donc une seconde convention : un **format**, qui dise où commence et où finit chaque instruction, et lesquels de ces nombres sont des ordres et lesquels sont des quantités.

C'est exactement le problème que résout la machine que vous allez étudier dans les pages suivantes. Son format tient en une phrase : **chaque instruction s'écrit avec trois chiffres**, le premier désignant l'ordre, les deux suivants la donnée. La suite de nombres redevient alors lisible sans deviner.

!!! tip "Le lien avec la suite du chapitre"
    Le processeur que vous allez découvrir possède, lui aussi, une table de correspondance entre des ordres et des nombres. On l'appelle son **jeu d'instructions**. Elle a été décidée par ses concepteurs, exactement comme vous avez décidé la vôtre, et elle est gravée dans le circuit.

    C'est aussi la raison pour laquelle un programme installé sur un ordinateur ne fonctionne pas sur un téléphone : ce ne sont pas les mêmes tables.
