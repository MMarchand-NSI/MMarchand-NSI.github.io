# Représentation des entiers naturels


!!! question "Préambule"
    - Quel est le premier chiffre?
    - Quel est le dernier chiffre?
    - Combien y-a-t-il de chiffres?
    - Donnez les valeurs de $10^k$ pour $k$ allant de 0 à 5
    - Plus grand nombre:
        - Quel est le plus grand nombre représentable sur:
            - 1 chiffres?
            - 4 chiffres?
            - 9 chiffres?
        - Pour chaque résultat précédent, Ajoutez-y 1. D'après ce que vous obtenez, exprimez les solutions en vous aidant de puissances.
        - Quel calcul faut-il faire pour obtenir le plus grand nombre sur 5678 chiffres?
        - Donnez une formule permettant de connaître le plus grand nombre représentable sur $n>0$ chiffres.

## Un peu de philosophie: Le signifiant et le signifié

Sur terre, il existe des centaines de manière de signifier qu'on parle d'un poisson.

On peut écrire et dire "poisson" en français.

On peut écrire et dire "fish" en anglais.

On peut écrire 魚, ou さかな et dire "sakana" en japonais.


![alt text](image.png)

**Ce qu’on dit ou écrit (le signifiant) peut varier d'une personne à l'autre sur terre. L'idée qu’on désigne (le signifié), par contre, reste inchangé.**

Ce qui réveille l'idée d'un poisson est différent, mais l'idée d'un poisson est globalement la même pour tous.

La relation entre le signifiant et le signifié est arbitraire. Il n'y a aucune raison qu'on choisisse un signifiant particulier pour décrire un signifié. Autrement dit, les deux n’ont pas de relation logique et doivent être apprises. Il s’agit d’une convention humaine.

## Les chiffres et les nombres

Dans la vie courante, on pense d'abord aux nombres pour signifier une **quantité** ou un **ordre**.

- Il y a 53 pommes dans le panier $\rarr$ cardinal
- Je suis arrivé en 3ème position $\rarr$ ordinal

Pour l’instant vous n'avez été habitués qu’à dire, lire et écrire les nombres sur base de cet ensemble de dessins $<0, 1, 2, 3, 4, 5, 6, 7, 8, 9>$. On appelle chacun de ces dessins un chiffre (indo-arabe).

Au japon, leur équivalent est <零, 一, 二, 三, 四, 五, 六, 七, 八, 九> mais les nombres ne sont pas construits de la même façon que chez nous. Le Japon a totalement adopté le système de numération occidental au cours du XXème siècle. (vous remarquerez au passage qu'en France, nous utilisons toujours les chiffres romains pour écrire les siècles)

**Une lettre est un dessin. Nous disposons de 26 lettres dans l'alphabet.
Avec ces lettres, nous composons des mots auxquels nous attribuons un sens.**

**Un chiffre est un dessin. Nous disposons de dix chiffres. 
Avec ces chiffres, nous composons des nombres auxquels nous attribuons un sens, celui d'une quantité ou d'un ordre.**

![alt text](image-1.png)

Contrairement à l'exemple du poisson, pratiquement tout le monde sur terre s'accorde maintenant sur les symboles, mais pas sur leur prononciation.

Presque tous les adultes alphabétisés sur terre comprennent le dessin $88$ de la même façon, mais peu comprennent le dessin $quatre\text{-}vingt\text{-}huit$

Il existe un nombre incroyable de signifiants pour un signifié. En voici un exemple pour le nombre 42:

<div style="display:flex;align-items:center;gap:1em;flex-wrap:wrap;margin:1em 0;padding:0.8em 1em;border:1px solid var(--md-default-fg-color--lighter);border-radius:4px;">
  <label for="lang42" style="font-weight:600;">Langue :</label>
  <select id="lang42" style="padding:0.3em 0.5em;font-size:1em;"></select>
  <span id="ecrit42" style="font-size:1.4em;min-width:10em;display:inline-block;"></span>
  <button onclick="jouer42()" style="padding:0.3em 0.8em;font-size:1em;cursor:pointer;">&#9654; Écouter</button>
  <audio id="audio42"></audio>
</div>

<script>
(function() {
  const langues42 = [
    { label: "Allemand",           fichier: "allemand_42.mp3",          texte: "zweiundvierzig" },
    { label: "Anglais américain",  fichier: "anglais_americain_42.mp3", texte: "forty-two" },
    { label: "Anglais britannique",fichier: "anglais_britannique_42.mp3",texte: "forty-two" },
    { label: "Arabe",              fichier: "arabe_42.mp3",             texte: "اثنان وأربعون",      rtl: true },
    { label: "Chinois mandarin",   fichier: "chinois_mandarin_42.mp3",  texte: "四十二" },
    { label: "Coréen",             fichier: "coreen_42.mp3",            texte: "사십이" },
    { label: "Danois",             fichier: "danois_42.mp3",            texte: "toogfyrre" },
    { label: "Espagnol",           fichier: "espagnol_42.mp3",          texte: "cuarenta y dos" },
    { label: "Finnois",            fichier: "finnois_42.mp3",           texte: "neljäkymmentäkaksi" },
    { label: "Français",           fichier: "francais_42.mp3",          texte: "quarante-deux" },
    { label: "Grec",               fichier: "grec_42.mp3",              texte: "σαράντα δύο" },
    { label: "Hébreu",             fichier: "hebreu_42.mp3",            texte: "ארבעים ושניים",      rtl: true },
    { label: "Hindi",              fichier: "hindi_42.mp3",             texte: "बयालीस" },
    { label: "Hongrois",           fichier: "hongrois_42.mp3",          texte: "negyvenkettő" },
    { label: "Indonésien",         fichier: "indonesien_42.mp3",        texte: "empat puluh dua" },
    { label: "Italien",            fichier: "italien_42.mp3",           texte: "quarantadue" },
    { label: "Japonais",           fichier: "japonais_42.mp3",          texte: "四十二" },
    { label: "Néerlandais",        fichier: "neerlandais_42.mp3",       texte: "tweeënveertig" },
    { label: "Norvégien",          fichier: "norvegien_42.mp3",         texte: "førtito" },
    { label: "Polonais",           fichier: "polonais_42.mp3",          texte: "czterdzieści dwa" },
    { label: "Portugais",          fichier: "portugais_42.mp3",         texte: "quarenta e dois" },
    { label: "Roumain",            fichier: "roumain_42.mp3",           texte: "patruzeci și doi" },
    { label: "Russe",              fichier: "russe_42.mp3",             texte: "сорок два" },
    { label: "Suédois",            fichier: "suedois_42.mp3",           texte: "fyrtiotvå" },
    { label: "Tchèque",            fichier: "tcheque_42.mp3",           texte: "čtyřicet dva" },
    { label: "Thaï",               fichier: "thai_42.mp3",              texte: "สี่สิบสอง" },
    { label: "Turc",               fichier: "turc_42.mp3",              texte: "kırk iki" },
    { label: "Ukrainien",          fichier: "ukrainien_42.mp3",         texte: "сорок два" },
    { label: "Vietnamien",         fichier: "vietnamien_42.mp3",        texte: "bốn mươi hai" },
  ];

  const select = document.getElementById('lang42');
  langues42.forEach(function(l, i) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = l.label;
    if (l.label === "Français") opt.selected = true;
    select.appendChild(opt);
  });

  function maj42() {
    const l = langues42[parseInt(select.value)];
    const span = document.getElementById('ecrit42');
    span.textContent = l.texte;
    span.dir = l.rtl ? 'rtl' : 'ltr';
  }

  select.addEventListener('change', maj42);

  window.jouer42 = function() {
    const l = langues42[parseInt(select.value)];
    const audio = document.getElementById('audio42');
    audio.src = '../sons/sorties_mp3/' + l.fichier;
    audio.play();
  };

  maj42();
})();
</script>

??? info "Pour aller plus loin : la notion d'alphabet"
    Notre liste de chiffres $<0, 1, ..., 9>$ et notre liste de lettres $<a, b, ..., z>$ ne sont que deux exemples de ce que l'informatique appelle un **alphabet** : un ensemble fini de symboles.

    À partir d'un alphabet, en mettant les symboles bout à bout, on forme des **mots** (on dit aussi des chaînes). Un ensemble de mots est un **langage**.

    - Avec l'alphabet $<0, 1>$, on forme les mots du binaire.
    - Avec l'alphabet latin, on forme les mots du français.
    - Avec l'alphabet des symboles de Python, on forme les mots-clés de Python pour écrire des programmes.

    C'est le point de départ de la **théorie des langages formels** (mots, langages, automates, expressions régulières), une branche centrale de l'informatique : c'est elle qui permet, par exemple, à Python de décider si votre code est bien écrit. Rien de tout cela n'est à connaître cette année, mais sachez que « chiffres » et « lettres » sont deux instances d'une même idée plus générale.

## Les chiffres et les codes

Signifier une quantité ou un ordre n'est pas le seul usage. Une suite de chiffres peut aussi servir de **code** : une étiquette qui désigne autre chose, et dont la valeur ne représente ni une quantité ni un rang.

- Mon numéro de téléphone est le 06... $\rarr$ code (l'additionner à un autre n'aurait aucun sens)
- La lettre `'A'` est codée par le nombre 65 $\rarr$ code (norme ASCII)

En réalité, **ce rôle de code est le plus général, et les deux premiers n'en sont qu'un cas particulier.** Représenter, c'est toujours la même opération : choisir un **signifiant** pour un **signifié**, par une convention arbitraire, comme on l'a vu plus haut.

- Quand le signifié est une **quantité** ou un **rang**, on le représente avec des chiffres : c'est le cas cardinal et ordinal, et c'est précisément l'objet de ce chapitre.
- Quand le signifié est une **lettre**, une **couleur** ou un **son**, on lui associe un nombre, qui sera lui-même écrit avec des chiffres.

Autrement dit, « signifier une quantité avec des chiffres » n'est qu'une façon de coder parmi d'autres. C'est l'idée centrale de tout ce qui suit : la machine ne sait manipuler que des nombres, et au fond uniquement des 0 et des 1. **Pour qu'un ordinateur traite un texte, une image ou un son, il faut donc d'abord coder cette information sous forme de nombres.** Nous le retrouverons très concrètement en codant les caractères.

## La roue des chiffres

!!! abstract "Vocabulaire"
    - **Incrémenter** est l'action d'ajouter un
    - **Décrémenter** est l'action de retirer un 

La petite application ci-dessous permet d'incrémenter ou décrémenter un compteur constitué de roues de chiffres.




<div id="roue3d-params"></div>
<div id="roue3d-scene"></div>

<script>
(function () {
  'use strict';

  let activeWheels = [];

  function disposeAll() {
    activeWheels.forEach(w => w.dispose && w.dispose());
    activeWheels = [];
  }

  function makeTexture(char) {
    const tc = document.createElement('canvas');
    tc.width = 256; tc.height = 256;
    const ctx = tc.getContext('2d');
    // Face background
    ctx.fillStyle = 'hsl(211,72%,44%)';
    ctx.fillRect(0, 0, 256, 256);
    // Border
    ctx.strokeStyle = 'hsl(211,85%,20%)';
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, 246, 246);
    // Digit
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 160px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,10,60,0.6)';
    ctx.shadowBlur = 14;
    ctx.fillText(char, 128, 128);
    return new THREE.CanvasTexture(tc);
  }

  function makeWheel(alphabet) {
    const N = alphabet.length;
    const CW = 90, CH = 105;

    // Three.js renderer per wheel
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(CW, CH);
    renderer.shadowMap.enabled = false;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, CW / CH, 0.1, 50);
    camera.position.set(0.4, 0.7, 4.2);
    camera.lookAt(0, 0, 0);

    // Lighting: ambient + key + fill
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(2, 4, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x99aaff, 0.3);
    fill.position.set(-3, -1, 2);
    scene.add(fill);

    // Prism geometry
    const H = 1.0;   // face tangential height (side-to-side around drum)
    const W = 1.05;  // prism axis length (face width as seen from front)
    const R = N <= 1 ? 0.55 : H / (2 * Math.sin(Math.PI / N));
    const Ap = N <= 1 ? 0.55 : R * Math.cos(Math.PI / N);
    const step = N > 1 ? 2 * Math.PI / N : Math.PI;

    // Pivot compensates camera angle: face 0 stays parallel to screen
    const pivot = new THREE.Group();
    pivot.rotation.x = -Math.atan2(camera.position.y, camera.position.z);
    pivot.rotation.y =  Math.atan2(camera.position.x, camera.position.z);
    scene.add(pivot);

    const prism = new THREE.Group();
    const faceMeshes = [];

    for (let i = 0; i < N; i++) {
      const alpha = i * step;
      const geo = new THREE.PlaneGeometry(W, H);
      const mat = new THREE.MeshPhongMaterial({
        map: makeTexture(alphabet[i]),
        shininess: 60,
        specular: new THREE.Color(0x334466)
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -alpha;
      mesh.position.set(0, Ap * Math.sin(alpha), Ap * Math.cos(alpha));
      prism.add(mesh);
      faceMeshes.push(mesh);
    }

    // End caps: N-gon polygon
    if (N >= 2) {
      const capGeo = new THREE.CircleGeometry(R, Math.max(N, 3));
      capGeo.rotateZ(Math.PI / N); // align vertices with face-face edges
      const capMat = new THREE.MeshPhongMaterial({
        color: 0x0d47a1, shininess: 30, side: THREE.DoubleSide
      });
      const rCap = new THREE.Mesh(capGeo, capMat);
      rCap.rotation.y = -Math.PI / 2;
      rCap.position.x = W / 2;
      prism.add(rCap);
      const lCap = new THREE.Mesh(capGeo.clone(), capMat);
      lCap.rotation.y = Math.PI / 2;
      lCap.position.x = -W / 2;
      prism.add(lCap);
    }

    pivot.add(prism);

    let curAngle = 0, tgtAngle = 0, current = 0, rafId = null;

    function render() { renderer.render(scene, camera); }

    function tick() {
      const d = tgtAngle - curAngle;
      if (Math.abs(d) < 0.003) {
        curAngle = tgtAngle; prism.rotation.x = curAngle; render(); rafId = null; return;
      }
      curAngle += d * 0.13;
      prism.rotation.x = curAngle;
      render();
      rafId = requestAnimationFrame(tick);
    }

    render();

    const el = renderer.domElement;
    el.style.cssText = `width:${CW}px;height:${CH}px;display:block;border-radius:6px;`;

    return {
      el,
      show(idx, dir) {
        current = idx;
        tgtAngle += dir > 0 ? step : -step;
        if (!rafId) rafId = requestAnimationFrame(tick);
      },
      get() { return current; },
      reset() {
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        current = 0; curAngle = 0; tgtAngle = 0;
        prism.rotation.x = 0; render();
      },
      dispose() {
        if (rafId) cancelAnimationFrame(rafId);
        faceMeshes.forEach(m => {
          m.geometry.dispose();
          if (m.material.map) m.material.map.dispose();
          m.material.dispose();
        });
        renderer.dispose();
      }
    };
  }

  function buildCounter(alphabet, numDigits) {
    disposeAll();
    const N = alphabet.length;
    const root = document.getElementById('roue3d-scene');
    root.innerHTML = '';
    if (N === 0 || numDigits === 0) return;

    const main = document.createElement('div');
    main.style.cssText = 'display:flex;flex-direction:column;align-items:center;';

    const row = document.createElement('div');
    row.style.cssText =
      'display:flex;justify-content:center;align-items:center;' +
      'gap:4px;margin-bottom:0.8em;padding:12px 14px;' +
      'background:#12122a;border-radius:10px;' +
      'box-shadow:0 4px 24px rgba(0,0,0,0.55);';

    const wheels = [];
    for (let i = 0; i < numDigits; i++) {
      const w = makeWheel(alphabet);
      row.appendChild(w.el);
      wheels.push(w);
      activeWheels.push(w);
    }

    const btns = document.createElement('div');
    btns.style.cssText = 'display:flex;gap:0.5em;';
    const plus = document.createElement('button');
    const minus = document.createElement('button');
    [plus, minus].forEach(b => {
      b.style.cssText =
        'font-size:1.5em;padding:0.2em 0.7em;cursor:pointer;' +
        'font-family:monospace;border-radius:4px;';
    });
    plus.textContent = '+';
    minus.textContent = '−';
    btns.appendChild(plus);
    btns.appendChild(minus);

    const valEl = document.createElement('div');
    valEl.style.cssText = 'margin-top:0.8em;font-size:1.15em;font-family:monospace;';

    main.appendChild(row);
    main.appendChild(btns);
    main.appendChild(valEl);
    root.appendChild(main);

    const maxVal = Math.pow(N, numDigits);

    function getValue() {
      return wheels.reduce((acc, w) => acc * N + w.get(), 0);
    }

    function setValue(val, dir) {
      const wrapped = ((val % maxVal) + maxVal) % maxVal;
      let rem = wrapped;
      const digits = new Array(numDigits).fill(0);
      for (let i = numDigits - 1; i >= 0; i--) {
        digits[i] = rem % N;
        rem = Math.floor(rem / N);
      }
      for (let i = 0; i < numDigits; i++) {
        if (wheels[i].get() !== digits[i]) {
          wheels[i].show(digits[i], dir);
        }
      }
      valEl.textContent = 'Valeur décimale : ' + wrapped;
    }

    plus.onclick = () => setValue(getValue() + 1, 1);
    minus.onclick = () => setValue(getValue() - 1, -1);

    setValue(0, 1);
  }

  function initParams() {
    const zone = document.getElementById('roue3d-params');
    zone.style.cssText =
      'display:flex;justify-content:center;gap:2em;' +
      'margin-bottom:1em;flex-wrap:wrap;font-family:monospace;';

    function makeField(labelText, inputEl) {
      const div = document.createElement('div');
      div.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px;';
      const lbl = document.createElement('label');
      lbl.textContent = labelText;
      div.appendChild(lbl);
      div.appendChild(inputEl);
      return div;
    }

    const inp1 = document.createElement('input');
    inp1.type = 'text';
    inp1.value = '0123456789';
    inp1.style.cssText = 'width:10em;font-family:monospace;text-align:center;padding:0.2em;';

    const inp2 = document.createElement('input');
    inp2.type = 'number';
    inp2.min = 1; inp2.max = 8; inp2.value = 4;
    inp2.style.cssText = 'width:4em;font-family:monospace;text-align:center;padding:0.2em;';

    zone.appendChild(makeField('Alphabet de chiffres :', inp1));
    zone.appendChild(makeField('Nombre de chiffres :', inp2));

    let lastKey = '';
    function refresh() {
      const alpha = inp1.value.split('');
      const n = parseInt(inp2.value) || 1;
      if (alpha.length >= 1 && n >= 1) {
        const key = inp1.value + '|' + n;
        if (key !== lastKey) {
          lastKey = key;
          buildCounter(alpha, n);
        }
      }
    }

    inp1.addEventListener('input', refresh);
    inp2.addEventListener('input', refresh);
    refresh();
  }

  function start() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initParams);
    } else {
      initParams();
    }
  }

  if (window.THREE) {
    start();
  } else {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
    s.onload = start;
    document.head.appendChild(s);
  }
})();
</script>





**La colonne/roue 0 est la colonne de droite. la colonne 1 est la colonne juste à sa gauche, etc...**

- Combien de fois faut-il incrémenter le compteur pour faire bouger :
    - la roue 0 d'un seul cran ?
    - la roue 1 ?
    - la roue 2 ?
    - la roue 3 ?
- Exprimez chacune de ces réponses à l'aide d'une puissance de 10. Que remarquez-vous ?
- Que doit faire la roue 2 pour que la roue 3 bouge ?

!!! abstract "Le poids d'une roue"
    Le nombre d'incréments nécessaires pour faire bouger la roue $k$ d'un seul cran vaut $10^k$ : $1$ pour la roue 0, $10$ pour la roue 1, $100$ pour la roue 2, $1000$ pour la roue 3... On appelle ce nombre le **poids** de la roue (ou de la colonne).

## Changer de base

Jusqu'ici, nos roues disposent de 10 chiffres : c'est la base 10. Que se passe-t-il avec moins (ou plus) de chiffres ? Choisissez une base ci-dessous, recopiez l'alphabet proposé dans le compteur, puis répondez aux questions. Vous remarquerez que **l'énoncé ne change jamais** : seul le nombre en bleu change.

<div id="base-explorer" style="margin:1em 0;padding:0.8em 1em;border:1px solid var(--md-default-fg-color--lighter);border-radius:6px;">
  <p style="margin:0 0 0.6em 0;">
    <label style="font-weight:600;">Choisissez votre base : </label>
    <select id="base-choix" style="padding:0.3em 0.5em;font-size:1em;">
      <option value="2">base 2 (binaire)</option>
      <option value="3" selected>base 3</option>
      <option value="4">base 4</option>
      <option value="8">base 8 (octal)</option>
      <option value="16">base 16 (hexadécimal)</option>
    </select>
  </p>
  <p style="margin:0;">Alphabet à recopier dans le compteur ci-dessus :
    <code id="base-alpha" style="font-size:1.1em;"></code></p>
</div>

<style>.baseref{color:#1e88e5;font-weight:bold;}</style>

<div id="base-questions">
<p>Vous travaillez maintenant en base <span class="baseref"></span>. Répondez aux questions suivantes (cherchez d'abord, puis dépliez la réponse pour vérifier) :</p>
<ol>
<li>En partant de 0, incrémentez le compteur douze fois. Vous obtenez toujours la même quantité ; comment s'écrit-elle en base <span class="baseref"></span> ?
<details class="success"><summary>Réponse</summary><p>On a compté douze fois : la quantité obtenue est toujours <b>douze</b>, quelle que soit la base. Seule son <b>écriture</b> change. En base <span class="baseref"></span>, douze s'écrit <b><span id="ans-douze"></span></b>.</p></details>
</li>
<li>Combien de fois faut-il incrémenter le compteur pour faire bouger :
<ul><li>la roue 0 d'un seul cran ?</li><li>la roue 1 ?</li><li>la roue 2 ?</li><li>la roue 3 ?</li></ul>
<details class="success"><summary>Réponse</summary><p>Roue 0 : <b>1</b>. Roue 1 : <b><span id="ans-r1"></span></b>. Roue 2 : <b><span id="ans-r2"></span></b>. Roue 3 : <b><span id="ans-r3"></span></b>.</p></details>
</li>
<li>Exprimez ces réponses à l'aide de puissances de <span class="baseref"></span>. Quel est le poids de la roue numéro <em>k</em> ?
<details class="success"><summary>Réponse</summary><p><span id="ans-pow"></span>. Le poids de la roue <em>k</em> est <b><span class="baseref"></span><sup><em>k</em></sup></b>.</p></details>
</li>
<li>Que doit faire la roue 2 pour que la roue 3 bouge ?
<details class="success"><summary>Réponse</summary><p>Elle doit faire un <b>tour complet</b> : parcourir ses <span class="baseref"></span> chiffres et revenir à 0.</p></details>
</li>
<li>Écrivez le plus grand nombre possible sur 4 chiffres en base <span class="baseref"></span>. Écrivez ensuite la représentation en base 10 de ce nombre.
<details class="success"><summary>Réponse</summary><p>C'est <b><span id="ans-max"></span></b> en base <span class="baseref"></span>, soit <b><span id="ans-maxdec"></span></b> en base 10 (c'est-à-dire <span class="baseref"></span><sup>4</sup> - 1).</p></details>
</li>
</ol>
</div>

<script>
(function () {
  const DIGITS = "0123456789ABCDEF";
  const sel = document.getElementById('base-choix');
  if (!sel) return;
  function toBase(n, b) {
    if (n === 0) return "0";
    let s = "";
    while (n > 0) { s = DIGITS[n % b] + s; n = Math.floor(n / b); }
    return s;
  }
  function setText(id, v) { const e = document.getElementById(id); if (e) e.textContent = v; }
  function update() {
    const b = parseInt(sel.value, 10);
    setText('base-alpha', DIGITS.slice(0, b));
    document.querySelectorAll('.baseref').forEach(function (e) { e.textContent = b; });
    setText('ans-douze', toBase(12, b));
    setText('ans-r1', b);
    setText('ans-r2', b * b);
    setText('ans-r3', b * b * b);
    const pow = document.getElementById('ans-pow');
    if (pow) pow.innerHTML = '1 = ' + b + '<sup>0</sup>, ' + b + ' = ' + b + '<sup>1</sup>, ' + (b * b) + ' = ' + b + '<sup>2</sup>, ' + (b * b * b) + ' = ' + b + '<sup>3</sup>';
    setText('ans-max', DIGITS[b - 1].repeat(4));
    setText('ans-maxdec', Math.pow(b, 4) - 1);
  }
  sel.addEventListener('change', update);
  update();
})();
</script>

!!! tip "Comment travailler"
    Commencez par la **base 3** avec votre professeur. Refaites ensuite seul(e) tout le travail en **base 2**. Pour aller plus loin, essayez aussi les bases 4, 8 et 16 : vous constaterez que la méthode est toujours la même.

## Le système positionnel : de la roue à la valeur

Vous venez de constater la même chose dans toutes les bases : il faut $b^k$ incréments pour faire avancer la roue $k$ d'un seul cran. Le **poids** de la roue $k$ est donc $b^k$ :

- un cran de la roue 0 (les unités) vaut $b^0 = 1$ ;
- un cran de la roue 1 vaut $b^1 = b$ ;
- un cran de la roue 2 vaut $b^2$ ;
- et ainsi de suite.

Pour connaître la valeur totale affichée au compteur, il suffit alors, pour chaque roue, de multiplier **son chiffre** par **son poids**, puis d'additionner le tout. On interprète chaque chiffre selon sa position : c'est le **système de numération positionnel**.

Vous l'utilisez depuis toujours en base 10, sans le nommer. Le nombre $5429$ se décompose ainsi :

$$5429_{10}=5 \times 1000+4 \times 100+2 \times 10+9 \times 1$$

$$\Large \textcolor{blue}{5429}_{10}= \textcolor{blue}{5} \times 10^{\textcolor{red}{3}}+ \textcolor{blue}{4} \times 10^{\textcolor{red}{2}}+ \textcolor{blue}{2} \times 10^{\textcolor{red}{1}}+ \textcolor{blue}{9} \times 10^{\textcolor{red}{0}}$$

C'est bien le poids $10^k$ que vous aviez repéré sur les roues. Plus petits, vous parliez d'ailleurs de la colonne des unités, des dizaines, des centaines, des milliers...

Et **c'est vrai dans n'importe quelle base.** Par exemple, le nombre $2102$ écrit en **base 3** vaut :

$$2102_3 = 2 \times 3^3 + 1 \times 3^2 + 0 \times 3^1 + 2 \times 3^0 = 54 + 9 + 0 + 2 = 65$$

De façon générale, un nombre dont les chiffres sont $d_{k-1}\,\dots\,d_1\,d_0$ en base $b$ a pour valeur :

$$\sum_{i=0}^{k-1} d_i \times b^i$$

Et cette valeur est justement son écriture en **base 10**. Calculer cette somme, c'est donc **convertir vers la base 10** : c'est ce que nous systématisons dans la page suivante.

## De la base 10 vers une base : diviser

Vous savez maintenant lire la valeur d'un nombre écrit dans n'importe quelle base. Faisons l'inverse : partir d'un nombre en base 10 et l'écrire dans une autre base.

Reprenons **douze**. Tout à l'heure, en comptant sur les roues, vous l'avez écrit `1100` en base 2, `110` en base 3... On va retrouver ces écritures, mais cette fois **par le calcul**, en divisant.

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

!!! abstract "Que représentent le quotient et le reste ?"
    Sur le compteur, faire avancer la roue des unités (roue 0), c'est faire des paquets de <span class="baserefd"></span> (la base). Diviser un nombre par <span class="baserefd"></span> répond alors à deux questions :

    - le **reste** est ce qui ne remplit pas un paquet complet : c'est exactement le **chiffre des unités** (la roue 0) ;
    - le **quotient** est le nombre de paquets complets : c'est la valeur qui « monte » sur les roues suivantes, autrement dit **ce qu'il reste à écrire**.

    On recommence alors en divisant le quotient par <span class="baserefd"></span> (chiffre suivant), jusqu'à obtenir un quotient nul. On lit les restes **de bas en haut**.

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

Cette méthode des divisions successives est reprise, sur d'autres exemples, dans la page [Conversions depuis la base 10](3-depuis10.md).

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

!!! danger "Le binaire"

    **Le binaire, c'est tout simplement la base 2.**

    Le mot "binaire" vient du latin binarius, qui signifie "composé de deux".

    En base 2, chaque chiffre (appelé **bit**, contraction de **binary digit**) ne peut valoir que :

    - 0 : "éteint", "faux", "non", etc.
    - 1 : "allumé", "vrai", "oui", etc.


!!! danger "L'hexadécimal"

    **L'hexadécimal, c'est la base 16**

    On ne dispose que de 10 chiffres, pas de 16, il nous en manque donc 6. On n'a pas voulu recréer de nouveaux symboles pour ces chiffres, alors on utilise les lettres de l'alphabet. Les chiffres de l'hexadécimal sont donc

    $$<0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F>$$

    l'hexadécimal revient souvent en informatique:

    - Utilisé pour les couleurs en HTML/CSS (ex : #FF0000 pour rouge)
    - 1 chiffre hexadécimal représente 4 bits → lecture plus simple du binaire
    - Plus lisible que le binaire ou le décimal pour les données machines
    - Utilisé pour représenter les adresses mémoire en informatique bas niveau
    - Indispensable pour déboguer ou lire les fichiers binaires
    - Utile en systèmes, électronique, assembleur, sécurité informatique





## Combien de bits pour un entier ?

Sur $k$ bits, on écrit les entiers de $0$ à $2^k - 1$ (c'est le cas particulier en base 2 de la formule $n^k - 1$).

Inversement, pour savoir **combien de bits** sont nécessaires pour écrire un entier donné, on cherche la plus petite puissance de 2 qui le dépasse. Par exemple, $13 = 1101_2$ tient sur 4 bits, car $2^3 <= 13 < 2^4$.

Quand on calcule, le résultat peut demander **plus de bits** que les nombres de départ :

- **Somme** : additionner deux nombres de $k$ bits peut créer une retenue finale, donc un résultat sur **$k+1$ bits** au plus. Exemple : $1111_2 + 1111_2 = 11110_2$ (4 bits + 4 bits donne 5 bits).
- **Produit** : multiplier un nombre de $k$ bits par un nombre de $m$ bits donne un résultat sur **$k+m$ bits** au plus.

## Systèmes alternatifs

En réalité vous utilisez sans le savoir d’autres modes.

Vous comptez par exemple les minutes et les secondes dans le système sexagésimal hérité des babyloniens (-3000).

Vous dites quatre-vingt quinze (4 × 20 + 15) en héritage des celtes qui comptaient sur une base de 20 chiffres (ils comptaient aussi sur les doigts de pied). [Tout comme les mayas](https://fr.wikipedia.org/wiki/Num%C3%A9ration_maya)



