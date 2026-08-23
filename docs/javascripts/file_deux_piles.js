/* Widget : file realisee avec deux piles.
 *
 * INTENTION PEDAGOGIQUE, a lire avant de modifier.
 * Ce widget n'est PAS une animation a regarder. Il sert de reference de
 * COMPORTEMENT : le texte du cours porte les regles, le widget porte les etats,
 * et l'eleve en tire lui-meme l'implementation. Trois choix en decoulent :
 *   1. Le code de `defiler` n'est jamais affiche.
 *   2. Un defilement demande une PREDICTION avant de reveler quoi que ce soit.
 *   3. Un interrupteur permet de lancer la version FAUSSE (basculer a chaque
 *      defilement), pour que le contre-exemple se constate au lieu d'etre raconte.
 * Un compteur d'operations elementaires rend l'amortissement observable, qui est
 * le point que le papier montre mal.
 */
(function () {
  const hote = document.getElementById('file_deux_piles');
  if (!hote) return;

  let entree = [], sortie = [], prochain = 1;
  let opsTotal = 0, opsDernier = 0, defilements = 0, opsDefilements = 0;
  let attente = null;              // valeur attendue pendant une prediction

  const el = (t, c, txt) => {
    const n = document.createElement(t);
    if (c) n.className = c;
    if (txt !== undefined) n.textContent = txt;
    return n;
  };

  hote.innerHTML = `
    <div class="fdp">
      <div class="fdp-cmd">
        <button id="fdp-enfiler">enfiler</button>
        <span id="fdp-prochain"></span>
        <button id="fdp-defiler">défiler</button>
        <button id="fdp-reset">recommencer</button>
      </div>
      <label class="fdp-opt">
        <input type="checkbox" id="fdp-faux"> basculer à chaque défilement
        <span class="fdp-aide">(version sans la condition : à essayer)</span>
      </label>
      <div id="fdp-question" class="fdp-question" hidden>
        Avant de révéler : que va rendre ce <code>defiler</code> ?
        <input type="text" id="fdp-reponse" size="6" autocomplete="off">
        <button id="fdp-valider">valider</button>
        <span id="fdp-verdict"></span>
      </div>
      <div class="fdp-piles">
        <div><div class="fdp-titre">entrée</div><div id="fdp-e" class="fdp-pile"></div></div>
        <div><div class="fdp-titre">sortie</div><div id="fdp-s" class="fdp-pile"></div></div>
      </div>
      <div class="fdp-cout">
        <span>coût du dernier appel : <b id="fdp-dernier">0</b></span>
        <span>total : <b id="fdp-total">0</b></span>
        <span>défilements : <b id="fdp-nb">0</b></span>
        <span>coût moyen d'un défilement : <b id="fdp-moy">0</b></span>
      </div>
      <div id="fdp-journal" class="fdp-journal"></div>
    </div>`;

  const $ = (id) => document.getElementById(id);

  function dessinerPile(noeud, contenu) {
    noeud.innerHTML = '';
    if (contenu.length === 0) { noeud.appendChild(el('div', 'fdp-vide', 'vide')); return; }
    // sommet en haut : on affiche du dernier au premier
    for (let i = contenu.length - 1; i >= 0; i--) {
      const c = el('div', 'fdp-case', String(contenu[i]));
      if (i === contenu.length - 1) c.classList.add('fdp-sommet');
      noeud.appendChild(c);
    }
  }

  function journal(txt, classe) {
    const ligne = el('div', classe || '', txt);
    $('fdp-journal').prepend(ligne);
  }

  function rafraichir() {
    dessinerPile($('fdp-e'), entree);
    dessinerPile($('fdp-s'), sortie);
    $('fdp-prochain').textContent = '(' + prochain + ')';
    $('fdp-dernier').textContent = opsDernier;
    $('fdp-total').textContent = opsTotal;
    $('fdp-nb').textContent = defilements;
    $('fdp-moy').textContent = defilements ? (opsDefilements / defilements).toFixed(1) : '0';
    $('fdp-defiler').disabled = (entree.length + sortie.length === 0) || attente !== null;
    $('fdp-enfiler').disabled = attente !== null;
  }

  function enfiler() {
    entree.push(prochain);
    opsDernier = 1; opsTotal += 1;
    journal('enfiler(' + prochain + ') : 1 opération');
    prochain++;
    rafraichir();
  }

  /* Calcule le defilement SANS l'appliquer : sert a poser la question. */
  function prevoir() {
    const basculeToujours = $('fdp-faux').checked;
    const e = entree.slice(), s = sortie.slice();
    let cout = 0;
    if (basculeToujours || s.length === 0) {
      while (e.length) { s.push(e.pop()); cout++; }
    }
    cout++;
    return { valeur: s[s.length - 1], entree: e, sortie: s, cout: cout };
  }

  function appliquer(r) {
    entree = r.entree; sortie = r.sortie; sortie.pop();
    opsDernier = r.cout; opsTotal += r.cout; opsDefilements += r.cout; defilements++;
    const bascule = r.cout > 1 ? ' (dont ' + (r.cout - 1) + ' de basculement)' : '';
    journal('defiler() rend ' + r.valeur + ' : ' + r.cout + ' opération' +
            (r.cout > 1 ? 's' : '') + bascule);
    rafraichir();
  }

  function demanderPrediction() {
    attente = prevoir();
    $('fdp-question').hidden = false;
    $('fdp-verdict').textContent = '';
    $('fdp-reponse').value = '';
    $('fdp-reponse').focus();
    rafraichir();
  }

  function valider() {
    const donnee = $('fdp-reponse').value.trim();
    if (donnee === '') return;
    const juste = String(attente.valeur) === donnee;
    $('fdp-verdict').textContent = juste ? 'oui' : 'non, c\'était ' + attente.valeur;
    $('fdp-verdict').className = juste ? 'fdp-ok' : 'fdp-ko';
    const r = attente; attente = null;
    $('fdp-question').hidden = true;
    appliquer(r);
    if (!juste) journal('  prédiction : ' + donnee + ' au lieu de ' + r.valeur, 'fdp-ko');
  }

  function recommencer() {
    entree = []; sortie = []; prochain = 1;
    opsTotal = 0; opsDernier = 0; defilements = 0; opsDefilements = 0; attente = null;
    $('fdp-question').hidden = true;
    $('fdp-journal').innerHTML = '';
    rafraichir();
  }

  $('fdp-enfiler').onclick = enfiler;
  $('fdp-defiler').onclick = demanderPrediction;
  $('fdp-valider').onclick = valider;
  $('fdp-reponse').onkeydown = (ev) => { if (ev.key === 'Enter') valider(); };
  $('fdp-reset').onclick = recommencer;
  $('fdp-faux').onchange = () => {
    journal($('fdp-faux').checked
      ? '--- version SANS la condition activée ---'
      : '--- version correcte rétablie ---', 'fdp-note');
  };

  recommencer();
})();
