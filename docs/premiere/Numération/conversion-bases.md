# Conversion de bases

Convertir un nombre, ce n'est pas le transformer : c'est le **traduire**. Le nombre (le signifié) reste le même, on change seulement de signifiant, c'est-à-dire la suite de chiffres qui le note. `1011` en base 2 et `11` en base 10 sont deux écritures du même nombre.

Il y a deux sens à maîtriser : **lire** un nombre écrit dans une base pour en donner la valeur en base 10, et l'**inverse**, écrire un nombre de la base 10 dans une autre base.

## Vers la base 10 : la formule positionnelle

Lors de l'exploration des roues (page **Représentation des entiers naturels**), vous avez constaté la même chose dans toutes les bases : il faut $b^k$ incréments pour faire avancer la roue $k$ d'un seul cran. Le **poids** de la roue $k$ est donc $b^k$ :

- un cran de la roue 0 (les unités) vaut $b^0 = 1$ ;
- un cran de la roue 1 vaut $b^1 = b$ ;
- un cran de la roue 2 vaut $b^2$ ;
- et ainsi de suite.

Pour connaître la valeur d'un nombre, il suffit, pour chaque roue, de multiplier **son chiffre** par **son poids**, puis d'additionner le tout. On interprète chaque chiffre selon sa position : c'est le **système de numération positionnel**.

Vous l'utilisez depuis toujours en base 10, sans le nommer. Le nombre $5429$ se décompose ainsi :

$$5429_{10}=5 \times 1000+4 \times 100+2 \times 10+9 \times 1$$

$$\Large \textcolor{blue}{5429}_{10}= \textcolor{blue}{5} \times 10^{\textcolor{red}{3}}+ \textcolor{blue}{4} \times 10^{\textcolor{red}{2}}+ \textcolor{blue}{2} \times 10^{\textcolor{red}{1}}+ \textcolor{blue}{9} \times 10^{\textcolor{red}{0}}$$

Et **c'est vrai dans n'importe quelle base.** Par exemple, le nombre $2102$ écrit en **base 3** vaut :

$$2102_3 = 2 \times 3^3 + 1 \times 3^2 + 0 \times 3^1 + 2 \times 3^0 = 54 + 9 + 0 + 2 = 65$$

De façon générale, un nombre dont les chiffres sont $d_{k-1}\,\dots\,d_1\,d_0$ en base $b$ a pour valeur :

$$\sum_{i=0}^{k-1} d_i \times b^i$$

Cette valeur est justement son écriture en **base 10**. Appliquons cette formule, base par base.

!!! tip "Pourquoi le faire à la main ?"
    Une calculatrice ou une IA convertit en une fraction de seconde. L'intérêt n'est pas le résultat, mais de **comprendre le mécanisme** : c'est en traçant soi-même qu'on saisit ce que représente une base. C'est cette compréhension qui est évaluée, pas la capacité à recopier un résultat tout fait.

!!! warning "Répétition"
    Les paragraphes suivants sont en réalité répétitifs, et ne servent qu'à vous faire vous rendre compte de la similarité du procédé.

### De la base 2 à la base 10

Un nombre écrit en base 2 est composé uniquement de chiffres $0$ et $1$. Chaque chiffre représente une puissance de $2$, en partant de la droite vers la gauche. Pour convertir un nombre binaire en décimal, on additionne les puissances de $2$ correspondant aux positions où il y a un $1$.

Par exemple, le nombre binaire $1011$ correspond à :
$1 \times 2^3 + 0 \times 2^2 + 1 \times 2^1 + 1 \times 2^0$

Soit : $8 + 0 + 2 + 1 = 11$ en base 10.

En résumé, pour convertir un nombre binaire en décimal, il suffit de calculer la somme :

$$\displaystyle \sum_{i=0}^{n-1} b_i \times 2^i$$

où $b_i$ est le chiffre en position $i$ en partant de la droite (avec $b_i \in \{0, 1\}$), et $n$ est le nombre total de chiffres dans l’écriture binaire.

!!! question "Exercices : convertir des nombres binaires en base décimale"
    1. Convertis le nombre binaire $1101$ en base 10.  
    2. Que vaut le nombre binaire $10010$ en base 10 ?  
    3. Convertis $111111$ en base 10.  
    4. Que donne le binaire $1010101$ en base 10 ?  
    5. Que vaut $1$ en binaire dans le système décimal ?

??? warning "Corrigé"
    1. $1101 = 1 \times 2^3 + 1 \times 2^2 + 0 \times 2^1 + 1 \times 2^0 = 8 + 4 + 0 + 1 = \boxed{13}$  
    2. $10010 = 1 \times 2^4 + 0 \times 2^3 + 0 \times 2^2 + 1 \times 2^1 + 0 \times 2^0 = 16 + 0 + 0 + 2 + 0 = \boxed{18}$  
    3. $111111 = 1 \times 2^5 + 1 \times 2^4 + 1 \times 2^3 + 1 \times 2^2 + 1 \times 2^1 + 1 \times 2^0 = 32 + 16 + 8 + 4 + 2 + 1 = \boxed{63}$  
    4. $1010101 = 1 \times 2^6 + 0 \times 2^5 + 1 \times 2^4 + 0 \times 2^3 + 1 \times 2^2 + 0 \times 2^1 + 1 \times 2^0 = 64 + 0 + 16 + 0 + 4 + 0 + 1 = \boxed{85}$  
    5. $1 = 1 \times 2^0 = \boxed{1}$

### De la base 3 à la base 10

Un nombre écrit en base 3 est composé uniquement de chiffres $0$, $1$ et $2$. Comme pour la base 2, chaque chiffre représente une puissance de la base — ici, une puissance de $3$ — en partant de la droite vers la gauche. Le principe est exactement le même : on multiplie chaque chiffre par la puissance de $3$ correspondant à sa position, puis on additionne le tout.

Par exemple, le nombre ternaire $102$ correspond à :
$1 \times 3^2 + 0 \times 3^1 + 2 \times 3^0$

Soit : $9 + 0 + 2 = 11$ en base 10.

!!! question "Exercices : convertir des nombres en base 3 en base décimale"
    1. Convertis le nombre ternaire $102$ en base 10.
    2. Que vaut le nombre $210$ en base 10 ?
    3. Convertis $222$ en base 10.
    4. Que donne le ternaire $1001$ en base 10 ?
    5. Que vaut $1$ en base 3 dans le système décimal ?

??? warning "Corrigé"
    1. $102 = 1 \times 3^2 + 0 \times 3^1 + 2 \times 3^0 = 9 + 0 + 2 = \boxed{11}$
    2. $210 = 2 \times 3^2 + 1 \times 3^1 + 0 \times 3^0 = 18 + 3 + 0 = \boxed{21}$
    3. $222 = 2 \times 3^2 + 2 \times 3^1 + 2 \times 3^0 = 18 + 6 + 2 = \boxed{26}$
    4. $1001 = 1 \times 3^3 + 0 \times 3^2 + 0 \times 3^1 + 1 \times 3^0 = 27 + 0 + 0 + 1 = \boxed{28}$
    5. $1 = 1 \times 3^0 = \boxed{1}$

### De la base 4 à la base 10

Le procédé est exactement le même que pour la base 2 ou la base 3 : chaque chiffre représente une puissance de la base, ici la base $4$, en partant de la droite vers la gauche. Les chiffres autorisés en base 4 sont $0$, $1$, $2$ et $3$.

!!! question "Exercices : convertir des nombres en base 4 en base décimale"
    1. Convertis le nombre $123$ (base 4) en base 10.
    2. Que vaut $321$ (base 4) en base 10 ?
    3. Convertis $33$ (base 4) en base 10.
    4. Que donne $1002$ (base 4) en base 10 ?
    5. Que vaut $1$ en base 4 dans le système décimal ?

??? warning "Corrigé"
    1. $123 = 1 \times 4^2 + 2 \times 4^1 + 3 \times 4^0 = 16 + 8 + 3 = \boxed{27}$
    2. $321 = 3 \times 4^2 + 2 \times 4^1 + 1 \times 4^0 = 48 + 8 + 1 = \boxed{57}$
    3. $33 = 3 \times 4^1 + 3 \times 4^0 = 12 + 3 = \boxed{15}$
    4. $1002 = 1 \times 4^3 + 0 \times 4^2 + 0 \times 4^1 + 2 \times 4^0 = 64 + 0 + 0 + 2 = \boxed{66}$
    5. $1 = 1 \times 4^0 = \boxed{1}$

### De la base 16 à la base 10

Le procédé est exactement le même que pour les autres bases : chaque chiffre représente une puissance de la base, ici la base $16$, en partant de la droite vers la gauche. Comme on a besoin de $16$ chiffres différents, on utilise les chiffres $0$ à $9$ pour les dix premières valeurs, puis les lettres $A$, $B$, $C$, $D$, $E$ et $F$ pour représenter respectivement les valeurs décimales $10$, $11$, $12$, $13$, $14$ et $15$.

!!! question "Exercices : convertir des nombres hexadécimaux en base décimale"
    1. Convertis le nombre $1A$ (base 16) en base 10.
    2. Que vaut $2F$ (base 16) en base 10 ?
    3. Convertis $B4$ (base 16) en base 10.
    4. Que donne $3E8$ (base 16) en base 10 ?
    5. Que vaut $F$ en base 16 dans le système décimal ?

??? warning "Corrigé"
    1. $1A = 1 \times 16^1 + A \times 16^0 = 1 \times 16 + 10 = \boxed{26}$
    2. $2F = 2 \times 16^1 + F \times 16^0 = 2 \times 16 + 15 = \boxed{47}$
    3. $B4 = B \times 16^1 + 4 \times 16^0 = 11 \times 16 + 4 = \boxed{180}$
    4. $3E8 = 3 \times 16^2 + E \times 16^1 + 8 \times 16^0 = 3 \times 256 + 14 \times 16 + 8 = 768 + 224 + 8 = \boxed{1000}$
    5. $F = 15 \times 16^0 = \boxed{15}$

### Le plus grand entier sur $k$ chiffres

!!! question "Exercices : plus grand entier représentable avec $k$ chiffres"
    1. Quel est le plus grand entier que l’on peut écrire avec $4$ chiffres en base $2$ ?
    2. Quel est le plus grand entier que l’on peut écrire avec $3$ chiffres en base $8$ ?
    3. Quel est le plus grand entier que l’on peut écrire avec $2$ chiffres en base $16$ ?
    4. Quel est le plus grand entier que l’on peut écrire avec $5$ chiffres en base $10$ ?
    5. Donne la formule générale pour le plus grand entier représentable avec $k$ chiffres en base $n$. (à savoir)

??? warning "Corrigé"
    1. En base $2$, les chiffres vont de $0$ à $1$, donc le plus grand nombre à $4$ chiffres est $1111_2$ :  
    $1 \times 2^3 + 1 \times 2^2 + 1 \times 2^1 + 1 \times 2^0 = 8 + 4 + 2 + 1 = \boxed{15}$

    2. En base $8$, les chiffres vont de $0$ à $7$, donc le plus grand nombre à $3$ chiffres est $777_8$ :  
    $7 \times 8^2 + 7 \times 8^1 + 7 \times 8^0 = 448 + 56 + 7 = \boxed{511}$

    3. En base $16$, les chiffres vont de $0$ à $F$ (soit $15$), donc le plus grand nombre à $2$ chiffres est $FF_{16}$ :  
    $15 \times 16^1 + 15 \times 16^0 = 240 + 15 = \boxed{255}$

    4. En base $10$, les chiffres vont de $0$ à $9$, donc le plus grand nombre à $5$ chiffres est $99999$ (déjà en base 10) :  
    $\boxed{99999}$

    5. En général, le plus grand entier représentable avec $k$ chiffres en base $n$ est donné par la formule :  
    $$n^k - 1$$

## Depuis la base 10 : les divisions successives

Faisons l'inverse : partir d'un nombre en base 10 et l'écrire dans une autre base.

### Rappel : la division euclidienne

Souvenez-vous de l'école primaire. « J'ai 30 bonbons, je veux faire des paquets de 8. »

- Combien de paquets **complets** puis-je faire ? **3** paquets, car $3 \times 8 = 24$.
- Combien de bonbons me reste-t-il, en dehors des paquets ? **6**, car $30 - 24 = 6$.

On résume la situation ainsi :

$$30 = 8 \times 3 + 6$$

- Le **quotient** (3) est le nombre de paquets complets.
- Le **reste** (6) est ce qui ne rentre dans aucun paquet complet.

Le reste est toujours **plus petit que la taille d'un paquet** (ici, plus petit que 8) : sinon, on pourrait encore faire un paquet de plus.

### Diviser par la base, c'est faire des paquets

Reprenons **douze**. En comptant sur les roues (page précédente), vous l'avez écrit `1100` en base 2, `110` en base 3... Retrouvons ces écritures, mais cette fois **par le calcul**, en divisant.

<style>.baserefd{color:#1e88e5;font-weight:bold;} #ans-div-steps table{border-collapse:collapse;margin-bottom:0.5em;} #ans-div-steps td{padding:0.1em 0.9em;}</style>

<div id="div-explorer" style="margin:1em 0;padding:0.8em 1em;border:1px solid var(--md-default-fg-color--lighter);border-radius:6px;">
  <p style="margin:0;">
    <label style="font-weight:600;">Choisissez la base d'arrivée : </label>
    <select id="base-choix-div" style="padding:0.3em 0.5em;font-size:1em;">
      <option value="2">base 2 (binaire)</option>
      <option value="3" selected>base 3</option>
      <option value="4">base 4</option>
      <option value="8">base 8 (octal)</option>
      <option value="16">base 16 (hexadécimal)</option>
    </select>
  </p>
</div>

!!! abstract "Diviser par la base, c'est faire des paquets"
    Convertir un nombre en base <span class="baserefd"></span>, c'est faire des paquets de <span class="baserefd"></span>, exactement comme les paquets de bonbons. Quand on divise par <span class="baserefd"></span> :

    - le **reste** (ce qui ne remplit pas un paquet complet) est le **chiffre des unités** (la roue 0) ;
    - le **quotient** (le nombre de paquets complets) est ce qui « monte » sur les roues suivantes, autrement dit **ce qu'il reste à écrire**.

    On recommence alors en divisant le quotient par <span class="baserefd"></span> (chiffre suivant), jusqu'à obtenir un quotient nul. On lit les restes **de bas en haut**.

!!! example "Pourquoi diviser le quotient à son tour ? (exemple : 125 en base 3)"
    Pour afficher 125 sur le compteur en base 3, il faudrait l'incrémenter 125 fois. Raisonnons plutôt par paquets de 3.

    - $125 \div 3 = 41$ **reste 2**. La roue 0 a fait 41 tours complets, et il reste 2 crans : **la roue 0 affiche 2**.
    - Ces 41 tours complets de la roue 0 ont fait avancer la roue 1 de **41 crans**. Pour savoir ce qu'affiche la roue 1, on divise donc 41 par 3 : $41 \div 3 = 13$ **reste 2** → **la roue 1 affiche 2**, et la roue 2 a avancé de 13.
    - $13 \div 3 = 4$ **reste 1** → **roue 2 : 1**, et la roue 3 a avancé de 4.
    - $4 \div 3 = 1$ **reste 1** → **roue 3 : 1**, et la roue 4 a avancé de 1.
    - $1 \div 3 = 0$ **reste 1** → **roue 4 : 1**.

    En lisant les roues de la dernière à la première : $125 = 11122_3$. À chaque étape, le **reste** donne le chiffre de la roue, et le **quotient** dit combien de fois la roue suivante a tourné : c'est donc lui qu'on divise à l'étape d'après.

<div id="div-questions">
<ol>
<li>Posez les divisions successives de douze par <span class="baserefd"></span>. À chaque étape, notez le quotient et le reste.
<details class="success"><summary>Réponse</summary><div id="ans-div-steps"></div></details>
</li>
<li>Lisez les restes de bas en haut : quelle est l'écriture de douze en base <span class="baserefd"></span> ?
<details class="success"><summary>Réponse</summary><p>douze s'écrit <b><span id="ans-div-res"></span></b> en base <span class="baserefd"></span>, exactement comme vous l'aviez trouvé avec les roues.</p></details>
</li>
</ol>
</div>

<script>
(function () {
  const DIGITS = "0123456789ABCDEF";
  const sel = document.getElementById('base-choix-div');
  if (!sel) return;
  function update() {
    const b = parseInt(sel.value, 10);
    document.querySelectorAll('.baserefd').forEach(function (e) { e.textContent = b; });
    let n = 12, rows = "", rests = [];
    while (n > 0) {
      const q = Math.floor(n / b), r = n % b;
      rows += '<tr><td>' + n + ' &divide; ' + b + '</td><td>quotient ' + q + '</td><td>reste <b>' + DIGITS[r] + '</b></td></tr>';
      rests.push(DIGITS[r]);
      n = q;
    }
    const result = rests.slice().reverse().join('');
    const steps = document.getElementById('ans-div-steps');
    if (steps) steps.innerHTML = '<table>' + rows + '</table><p>Restes lus de bas en haut : <b>' + result + '</b></p>';
    const res = document.getElementById('ans-div-res');
    if (res) res.textContent = result;
  }
  sel.addEventListener('change', update);
  update();
})();
</script>

### Un exemple complet : 13 en base 2

On divise le nombre par $2$, on note le **reste**, puis on recommence avec le quotient jusqu’à ce qu’il soit nul. L’écriture binaire est obtenue en lisant les **restes de bas en haut**.

$$
\begin{aligned}
13 \div 2 &= 6 &\text{reste } 1 \\
6 \div 2 &= 3 &\text{reste } 0 \\
3 \div 2 &= 1 &\text{reste } 1 \\
1 \div 2 &= 0 &\text{reste } 1
\end{aligned}
$$

Lecture des restes de bas en haut : $1101$. Donc :

$$13_{10} = 1101_2$$

### Convertir vers une base $b$ quelconque

Ce procédé fonctionne exactement de la même manière pour convertir un entier de la base 10 vers n’importe quelle base entière $b > 1$ : on procède par divisions successives par $b$ jusqu'à obtenir un quotient nul.

!!! question "Exercices : convertir des entiers de la base 10 vers d'autres bases"
    1. Convertis $19_{10}$ en base $2$  
    2. Convertis $45_{10}$ en base $3$  
    3. Convertis $31_{10}$ en base $4$  
    4. Convertis $73_{10}$ en base $8$  
    5. Convertis $255_{10}$ en base $16$

??? warning "Corrigé"
    1. Divisions successives par $2$ :  
    $19 \div 2 = 9$ reste $1$  
    $9 \div 2 = 4$ reste $1$  
    $4 \div 2 = 2$ reste $0$  
    $2 \div 2 = 1$ reste $0$  
    $1 \div 2 = 0$ reste $1$  
    Lecture de bas en haut : $\boxed{10011_2}$

    2. Divisions successives par $3$ :  
    $45 \div 3 = 15$ reste $0$  
    $15 \div 3 = 5$ reste $0$  
    $5 \div 3 = 1$ reste $2$  
    $1 \div 3 = 0$ reste $1$  
    Lecture de bas en haut : $\boxed{1200_3}$

    3. Divisions successives par $4$ :  
    $31 \div 4 = 7$ reste $3$  
    $7 \div 4 = 1$ reste $3$  
    $1 \div 4 = 0$ reste $1$  
    Lecture de bas en haut : $\boxed{133_4}$

    4. Divisions successives par $8$ :  
    $73 \div 8 = 9$ reste $1$  
    $9 \div 8 = 1$ reste $1$  
    $1 \div 8 = 0$ reste $1$  
    Lecture de bas en haut : $\boxed{111_8}$

    5. Divisions successives par $16$ :  
    $255 \div 16 = 15$ reste $15$  
    $15 \div 16 = 0$ reste $15$  
    En base $16$, $15 = F$  
    Lecture de bas en haut : $\boxed{FF_{16}}$

## Astuce : passer vite de l'hexadécimal au binaire

Il existe une astuce simple pour passer rapidement d’un nombre en base 16 (hexadécimal) à la base 2 (binaire), et inversement : chaque chiffre hexadécimal correspond exactement à un groupe de **4 bits**.

Autrement dit, on convertit chaque chiffre hexadécimal en son équivalent binaire sur **4 chiffres**, en ajoutant des zéros à gauche si nécessaire.

$$
\begin{aligned}
A_{16} &= 10_{10} = 1010_2 \\
F_{16} &= 15_{10} = 1111_2 \\
2_{16} &= 2_{10} = 0010_2
\end{aligned}
$$

Donc :

$$3F_{16} = 0011\ 1111_2$$

Inversement, pour passer de la base 2 à la base 16, on **regroupe les chiffres binaires par paquets de 4**, en partant de la droite, puis on convertit chaque groupe en un chiffre hexadécimal.

$$11010110_2 = 1101\ 0110 = D6_{16}$$

### Tableau de correspondance

| Hexadécimal (base 16) | Décimal (base 10) | Binaire (base 2, sur 4 bits) |
| :-------------------: | :---------------: | :--------------------------: |
| $0$ | $0$  | $0000$ |
| $1$ | $1$  | $0001$ |
| $2$ | $2$  | $0010$ |
| $3$ | $3$  | $0011$ |
| $4$ | $4$  | $0100$ |
| $5$ | $5$  | $0101$ |
| $6$ | $6$  | $0110$ |
| $7$ | $7$  | $0111$ |
| $8$ | $8$  | $1000$ |
| $9$ | $9$  | $1001$ |
| $A$ | $10$ | $1010$ |
| $B$ | $11$ | $1011$ |
| $C$ | $12$ | $1100$ |
| $D$ | $13$ | $1101$ |
| $E$ | $14$ | $1110$ |
| $F$ | $15$ | $1111$ |
