# Chaos Game

Le Chaos Game est un algorithme inventé par le mathématicien Michael Barnsley en 1988. Son principe est d'une simplicité déconcertante, et pourtant il fait émerger des structures fractales d'une grande complexité.

Dans cette activité, tu vas écrire du **JavaScript** pour la première fois. JavaScript est le langage du navigateur web : il permet entre autre de dessiner et d'animer des choses dans une page HTML, sans installer quoi que ce soit.

## Le fichier de départ

Crée un fichier `chaos.html` et copie ce contenu :

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <script type="application/javascript" defer>

      let HAUTEUR             = 900;  // pixels
      let LARGEUR             = 900;  // pixels
      let EPAISSEUR_POINT     = 2;    // pixels
      let NOMBRE_POINTS_FIXES_FIXES = 3;
      let NOMBRE_ITERATIONS   = 100000;

      /* ---- fonctions déjà écrites, ne pas modifier ---- */

      function getContext() {
        var canvas = document.getElementById("canvas");
        canvas.width = LARGEUR;
        canvas.height = HAUTEUR;
        return canvas.getContext("2d");
      }

      /**
       * Dessine un point sur le canvas.
       * @param {CanvasRenderingContext2D} ctx
       * @param {[number, number]} p
       */
      function dessinePoint(ctx, p) {
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(p[0], p[1], EPAISSEUR_POINT, EPAISSEUR_POINT);
      }

      function randint(a, b) {
        return Math.floor(Math.random() * (b - a + 1)) + a;
      }

      /* ---- fonctions à compléter ---- */

      /**
       * Retourne un point aléatoire dans le canvas.
       * @returns {[number, number]}
       */
      function pointAlea() {
        // à compléter
      }

      /**
       * Retourne le milieu du segment [p1, p2].
       * @param {[number, number]} p1
       * @param {[number, number]} p2
       * @returns {[number, number]}
       */
      function midPoint(p1, p2) {
        // à compléter
      }

      /**
       * Dessine le chaos game sur le canvas.
       */
      function chaos() {
        let ctx = getContext();  // Laisser cette ligne au début de la fonction
        dessinePoint(ctx, [450, 450]);
      }

    </script>
  </head>
  <body onload="chaos();">
    <canvas id="canvas" style="border: 1px solid black;"></canvas>
  </body>
</html>
```

Dans le même dossier que `chaos.html`, crée un fichier `serveurweb.bat` contenant :

```bat
python -m http.server 8000
```

Double-clique sur `serveurweb.bat` pour lancer un serveur web local qui sert les fichiers de ton répertoire. Ouvre ensuite `http://localhost:8000/chaos.html` dans ton navigateur.

!!! warning "Cache du navigateur"
    Le navigateur met en cache les fichiers pour éviter de les retélécharger à chaque fois. En développement, cela peut te faire croire que ton code n'a pas fonctionné alors que c'est l'ancienne version de ton code en cache qui s'exécute.

    La combinaison de touches **Ctrl+Maj+R** permet le rechargement forcé de la page en ignorant le cache. À utiliser systématiquement quand tu modifies ton code.

!!! question "Premier test"
    Tu dois voir un tout petit point noir au centre.

    1. Change `EPAISSEUR_POINT` à `20`. Recharge. Que se passe-t-il ?
    2. Change les coordonnées `[450, 450]` en `[0, 0]`. Où apparaît le point ?
    3. Change `HAUTEUR` à `200` et `LARGEUR` à `400`. Que devient le canvas ?
    4. Remets `EPAISSEUR_POINT` à `1`, `HAUTEUR` et `LARGEUR` à `900`.

    Un point est un tableau de 2 valeurs : `[x, y]`. En JavaScript, les tableaux s'écrivent avec des crochets, comme en Python. `ctx` est le contexte de dessin : il représente le canvas sur lequel on dessine, et doit être passé à `dessinePoint`.

## Étape 1 - Dessiner plusieurs points avec une boucle

En JavaScript, la boucle `for` s'écrit :

```javascript
for (let i = 0; i < 5; i++) {
    // ce bloc se répète 5 fois
    // i vaut successivement 0, 1, 2, 3, 4
}
```

C'est l'équivalent du `for i in range(0, 5):` de Python.

!!! question "Dix points"
    Modifie la fonction `chaos` pour dessiner 10 points, tous à des endroits différents. Pour l'instant, choisis les coordonnées à la main.

    ```javascript
    function chaos() {
        let ctx = getContext();
        for (let i = 0; i < 10; i++) {
            dessinePoint(ctx, [i * 50, 100]);
        }
    }
    ```

    1. Que dessine ce code ? Décris l'effet de `i * 50`.
    2. Modifie pour que les points soient disposés en diagonale plutôt qu'en ligne horizontale.

## Étape 2 - Des points aléatoires avec `randint`

La fonction `randint(a, b)` est déjà écrite. Elle fonctionne exactement comme le `randint` de Python : elle renvoie un entier aléatoire entre `a` et `b` **inclus**.

!!! question "Points aléatoires"
    Modifie `chaos` pour dessiner `NOMBRE_POINTS_FIXES` points à des positions aléatoires sur tout le canvas.

    Recharge plusieurs fois la page pour observer le caractère aléatoire du résultat.

## Étape 3 - La fonction `pointAlea`

On veut encapsuler la création d'un point aléatoire dans une fonction réutilisable.

En JavaScript, une fonction qui renvoie une valeur s'écrit :

```javascript
function maFonction(parametre1, parametre2) {
    ......
    return ....;
}
```

Le `return` fonctionne comme en Python.

!!! question "Écrire `pointAlea`"
    Complète la fonction `pointAlea` pour qu'elle renvoie un point `[x, y]` aléatoire dans le canvas, puis utilise-la dans `chaos`.

    Vérifie que le résultat est identique à l'étape précédente.

## Étape 4 - La fonction `midPoint`

Le milieu du segment entre deux points $P_1 = (x_1, y_1)$ et $P_2 = (x_2, y_2)$ a pour coordonnées :

$$M = \left(\frac{x_1 + x_2}{2},\ \frac{y_1 + y_2}{2}\right)$$

!!! question "Écrire `midPoint`"
    Complète la fonction `midPoint` qui prend deux points et renvoie leur milieu.

    Rappel : `p1[0]` est l'abscisse de `p1`, `p1[1]` est son ordonnée.

    Vérifie dans la console du navigateur (F12, onglet Console) :

    ```javascript
    midPoint([0, 0], [100, 60])    // doit renvoyer [50, 30]
    midPoint([200, 400], [0, 0])   // doit renvoyer [100, 200]
    ```

## Étape 5 - L'algorithme chaos

1. On remplit une liste de `NOMBRE_POINTS_FIXES` points fixes aléatoires
2. On crée ensuite un point $M$ aléatoire. 
3. On répète alors ce procédé `NOMBRE_ITERATIONS` fois: 
    - On dessine le point $M$
    - On choisit aléatoirement l'un des points fixes, appelons-le $P$
    - On place $M$ au milieu du segment $[MP]$. 

En JavaScript, les tableaux (listes) s'utilisent ainsi :

```javascript
let lst = [];       // liste vide
lst.push(2);       // ajouter un élément (comme append en Python)
let x = lst[0];    // accéder à l'élément d'indice 0
```


!!! question "Écrire `chaos`"
    Implémente l'algorithme dans la fonction `chaos`.

    Avec `NOMBRE_POINTS_FIXES = 3` et `NOMBRE_ITERATIONS = 100000`, tu dois voir une forme caractéristique se dessiner.

## Étape 6 - Expérimenter

!!! question "Varier le nombre de points"
    Change `NOMBRE_POINTS_FIXES` et note ce que tu obtiens pour 3, 4, 5 et 6 points.

!!! question "Varier le ratio"
    Dans `midPoint`, on va au milieu (ratio 1/2). Modifie la fonction pour aller au **tiers** du chemin de `m` vers `p` :

    $$x = m_x + \frac{1}{3}(p_x - m_x)$$

    Que se passe-t-il avec 3 points ? Avec 4 ?

!!! question "Varier la couleur"
    La couleur dans `dessinePoint` est `"rgb(0, 0, 0)"`. Modifie-la. Le format `"rgb(r, g, b)"` accepte des valeurs de 0 à 255 pour le rouge, le vert, le bleu.

    Essaie de colorier chaque point d'une couleur différente selon le sommet `p` choisi.
