# Recherche dichotomique


## Introduction


!!! question "Plus ou moins"
    **Règles:** La machine doit deviner un nombre entre 0 et $n$ que vous aurez choisi.

    **Question:** A votre avis, de quelle manière doit jouer l'ordinateur pour gagner le plus vite possible?
    
    **Ecrire un programme qui:** 
    - Demande au joueur:
        ```text
        Je vais essayer de deviner un entier compris entre 1 et n
        Donne moi la valeur de n et choisis un entier dans ta tête
        ```

    - L'utilisateur entre par exemple 100.

    - L'ordinateur boucle alors en affichant une proposition et en demandant (35 est un exemple de proposition de l'ordinateur):

        ```text
        35. Ton nombre est-il plus grand, moins grand, ou égal? [+/-/=]
        ```
    - Ce à quoi l'utilisateur répond par un des caractères '+', '-' ou '='

    - Le programme se termine lorsque l'ordinateur a trouvé (l'utilisateur a répondu que c'était le bon nombre)

## Recherche dichotomique sur tableau trié

La recherche dichotomique s'inspire de la manière la plus efficace de jouer au "plus ou moins" en divisant l'intervalle de recherche par deux à chaque tentative.

Pour l'instant, ignorons les lignes 1 et 2. 

```markdown
**ENTRÉE** 
- Un tableau d'entiers T[0..n-1]
- Un entier à trouver val
**SORTIE** 
L'indice du premier élément trouvé, None si la valeur n'appartient pas au tableau.

# Algorithme DICHOTOMIE(T, val)
1. SI n==0 OU T[0]>val:
2. 	RETOURNER None
3. gauche ← 0
4. droite ← n-1
5. TANT QUE gauche <= droite
6.      milieu ← gauche + (droite - gauche)/2
7.      SI T[milieu] = valeur
8.          RETOURNER milieu
9.      SINON SI T[milieu] > valeur
10.         droite ← milieu - 1
11.     SINON
12.         gauche ← milieu + 1
13. RETOURNER None
```

