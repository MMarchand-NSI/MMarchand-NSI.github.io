# Le problème des clés USB

Tu n'as plus besoin de clé USB pour la NSI : ton travail vit dans ton dépôt GitHub, et `nsi push` l'y envoie en une commande. Cette page dit **pourquoi** on a choisi cela, parce que l'argument te servira bien au-delà du cours.

!!! danger "Le principe"
    **Une clé USB est un outil de TRANSFERT, pas de STOCKAGE.**

    Avoir tous ses fichiers uniquement sur sa clé, et travailler directement dessus, c'est organiser sa propre perte de données.

## Cinq raisons, toutes vérifiables

### 1. Les clés cassent sans prévenir

Chaque écriture use la mémoire flash. Travailler dessus toute une année, c'est des centaines d'écritures par jour. Et quand une clé casse, elle ne prévient pas : tu perds **tout**, d'un coup.

### 2. Débrancher pendant qu'un fichier est ouvert corrompt les données

Le fichier peut devenir illisible, et parfois c'est le contenu entier de la clé qui est endommagé. Ça n'arrive pas qu'aux distraits :

- tu te lèves, le câble se décroche ;
- quelqu'un accroche ton sac ;
- l'ordinateur se met en veille ;
- coupure de courant.

### 3. C'est lent

Une clé USB est beaucoup plus lente qu'un disque interne. Tu le sens sur chaque enregistrement.

### 4. Ça se perd

Une clé est petite. Tu l'oublies dans un ordinateur, elle tombe de ton sac, elle se détache du trousseau. Sans copie ailleurs, la perte est définitive.

### 5. Ça transporte les virus

Un poste infecté infecte la clé, qui infecte le poste suivant. Tu contamines sans le savoir les machines des autres.

## Ce qu'on fait à la place

```
nsi pull     en arrivant
nsi push     en partant
```

Ton dépôt GitHub coche tout ce que la clé rate : deux copies au moins en permanence, la tienne et celle en ligne, l'**historique** de ton travail plutôt que son seul dernier état, aucun objet à perdre, et rien à débrancher.

Le détail des deux commandes est dans [Au quotidien](au-quotidien.md).

## Et si tu dois quand même transporter des fichiers

Pour autre chose que la NSI, la bonne méthode tient en trois temps :

```
1. COPIE tes fichiers de la clé vers le disque de l'ordinateur
2. TRAVAILLE sur le disque
3. À la fin : RECOPIE vers la clé
```

Tu gagnes la vitesse, tu ne risques plus la corruption si la clé se débranche, tu as deux copies, et tu uses beaucoup moins la clé.

Les autres solutions qui font le même travail que GitHub, chacune avec ses limites : un cloud grand public (Google Drive, OneDrive), ou un Nextcloud, qui est libre. En informatique, on préfère GitHub : lui seul garde l'historique du code.
