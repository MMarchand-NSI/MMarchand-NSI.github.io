/* Widget : quiz « Silent Teacher » pour les pages Python du site.
 *
 * INTENTION PEDAGOGIQUE, a lire avant de modifier.
 * Repris de Silent Teacher (Toxicode, silentteacher.toxicode.fr) : on montre un
 * court programme, l'eleve PREDIT la valeur de la derniere ligne, on corrige,
 * et on repose une VARIANTE (nouvelles valeurs tirees au hasard) tant que la
 * notion n'est pas acquise. Aucune explication : la machine corrige, l'eleve
 * induit la regle. C'est le « P » de PRIMM et une pratique de rappel.
 * Quatre ecarts deliberes avec l'original :
 *   1. La reponse est calculee par du VRAI Python (Pyodide, deja charge par
 *      mkdocs.yml). L'original affiche du Python mais calcule la reponse en
 *      evaluant une version JavaScript du meme code : deux semantiques, donc
 *      des corrections fausses possibles des que les langages divergent.
 *   2. Saisie libre seulement, pas de QCM : l'eleve produit la reponse au lieu
 *      de la reconnaitre parmi des distracteurs.
 *   3. Pas de chronometre (abandonne par le dossier le 02/08/2026, cadrage 21).
 *   4. La correction nomme le piege quand la valeur est bonne mais pas le type
 *      ('3' contre 3, 2 contre 2.0, texte sans guillemets, true pour True).
 * Ce qui est conserve : variantes aleatoires, reussite exigee une fois par
 * question, exigence portee a 3 reussites apres une erreur, retour a la
 * question precedente apres deux erreurs, bouton « je ne sais pas » qui montre
 * la reponse sans penaliser.
 *
 * ECRIRE UN QUIZ DANS UNE PAGE
 *
 *   <script type="text/x-silent-teacher" data-titre="Les variables">
 *   a = {{a:1..5}}
 *   a + {{b:1..5}}
 *   ---
 *   a = {{a:1..5}}
 *   b = a
 *   a = {{c:6..9}}
 *   b
 *   ---
 *   #! fois 2
 *   s = {{m:'chat'|'loup'|'ours'}}
 *   s + s
 *   </script>
 *   <script src="/javascripts/silent_teacher.js" defer></script>
 *
 * - Les questions sont separees par une ligne `---`, dans l'ordre de passage.
 * - `{{x:1..5}}` tire un entier entre 1 et 5 inclus, `{{x:'a'|'b'}}` tire une
 *   des alternatives (inseree telle quelle), `{{x}}` reutilise le tirage. Les
 *   tirages d'une meme question sont DISTINCTS quand c'est possible : avec
 *   a == b, on ne saurait pas quelle variable l'eleve a suivie.
 * - Si la derniere ligne est une expression, on attend sa valeur (ce que
 *   la console Python afficherait). Sinon, ou si c'est un print(...), on
 *   attend ce que le code affiche. Si le code leve une exception, on attend
 *   « erreur » (ou son nom).
 * - Le code doit TERMINER : une boucle infinie gele la page de l'eleve.
 * - Varier ce qui change la reponse, pas seulement le decor : apres une erreur
 *   la bonne reponse est montree, et si la variante suivante a la meme, elle
 *   se recopie.
 * - `#! fois N` : nombre de reussites exigees pour cette question (1 par defaut).
 * - Conventions du site, a respecter dans le code des questions :
 *   range(0, n) et non range(n), tranches a bornes explicites, pas de print
 *   dans une fonction.
 * - Plusieurs quiz par page sont possibles ; le script ne s'inclut qu'une fois.
 */
(function () {
  if (window.__silentTeacherCharge) return;
  window.__silentTeacherCharge = true;

  const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/';

  const AIDE_PYTHON = `
import ast, io, json, contextlib

def _st_executer(src):
    arbre = ast.parse(src)
    ns = {'__name__': '__question__'}
    sortie = io.StringIO()
    dernier = arbre.body[-1] if arbre.body else None
    # print(...) en derniere ligne est un affichage, pas une valeur (None)
    affiche = (isinstance(dernier, ast.Expr) and isinstance(dernier.value, ast.Call)
               and isinstance(dernier.value.func, ast.Name) and dernier.value.func.id == 'print')
    try:
        with contextlib.redirect_stdout(sortie):
            if isinstance(dernier, ast.Expr) and not affiche:
                debut = ast.Module(body=arbre.body[0:-1], type_ignores=[])
                exec(compile(debut, '<question>', 'exec'), ns)
                v = eval(compile(ast.Expression(body=dernier.value), '<question>', 'eval'), ns)
                return json.dumps({'mode': 'valeur', 'repr': repr(v),
                                   'type': type(v).__name__,
                                   'parasite': sortie.getvalue() != ''})
            exec(compile(arbre, '<question>', 'exec'), ns)
            return json.dumps({'mode': 'sortie', 'texte': sortie.getvalue()})
    except Exception as e:
        return json.dumps({'mode': 'erreur', 'nom': type(e).__name__})

def _st_normer(t):
    return '\\n'.join(l.rstrip() for l in t.strip().splitlines())

def _st_verifier(attendu_json, reponse):
    a = json.loads(attendu_json)
    r = reponse.strip()
    dit_erreur = r.lower() in ('erreur', 'error', 'exception')
    if a['mode'] == 'erreur':
        ok = dit_erreur or r == a['nom']
        return json.dumps({'ok': ok, 'remarque': ''})
    if dit_erreur:
        return json.dumps({'ok': False, 'remarque': "Ce code ne provoque pas d'erreur."})
    if a['mode'] == 'sortie':
        return json.dumps({'ok': _st_normer(r) == _st_normer(a['texte']), 'remarque': ''})
    try:
        attendu = ast.literal_eval(a['repr'])
    except Exception:
        attendu = None
    try:
        x = ast.literal_eval(r)
    except Exception:
        if isinstance(attendu, str) and r == attendu:
            rq = "C'est bien ce texte, mais une chaîne s'écrit entre guillemets."
        elif r in ('true', 'false'):
            rq = "En Python, les booléens s'écrivent True et False."
        else:
            rq = "Ta réponse n'est pas une valeur Python."
        return json.dumps({'ok': False, 'remarque': rq})
    if repr(x) == a['repr']:
        return json.dumps({'ok': True, 'remarque': ''})
    rq = ''
    if attendu is not None and type(x) is not type(attendu) and (x == attendu or str(x) == str(attendu)):
        rq = "La valeur est la bonne, pas son type : ici Python renvoie un " + a['type'] + "."
    return json.dumps({'ok': False, 'remarque': rq})
`;

  let promessePython = null;
  function python() {
    if (!promessePython) {
      promessePython = loadPyodide({ indexURL: PYODIDE_URL }).then((py) => {
        py.runPython(AIDE_PYTHON);
        return py;
      });
      promessePython.catch(() => { promessePython = null; });
    }
    return promessePython;
  }

  /* ---------- lecture du quiz ---------- */

  function dedenter(lignes) {
    const pleines = lignes.filter((l) => l.trim() !== '');
    const marge = Math.min(...pleines.map((l) => l.match(/^ */)[0].length));
    return lignes.map((l) => l.slice(marge, l.length));
  }

  function lireQuiz(texte) {
    const lignes = texte.replace(/\t/g, '    ').split('\n');
    const blocs = [[]];
    for (const l of lignes) {
      if (/^\s*---\s*$/.test(l)) blocs.push([]);
      else blocs[blocs.length - 1].push(l);
    }
    return blocs
      .filter((b) => b.some((l) => l.trim() !== ''))
      .map((b) => {
        let fois = 1;
        const code = b.filter((l) => {
          const m = l.match(/^\s*#!\s*fois\s+(\d+)\s*$/);
          if (m) { fois = parseInt(m[1], 10); return false; }
          return true;
        });
        while (code.length && code[0].trim() === '') code.shift();
        while (code.length && code[code.length - 1].trim() === '') code.pop();
        return { modele: dedenter(code).join('\n'), fois };
      });
  }

  /* ---------- tirage d'une variante ---------- */

  const MOTIF = /\{\{\s*([A-Za-z_]\w*)\s*(?::([^}]*))?\}\}/g;

  function domaine(spec) {
    const m = spec.trim().match(/^(-?\d+)\s*\.\.\s*(-?\d+)$/);
    if (m) {
      const lo = parseInt(m[1], 10), hi = parseInt(m[2], 10), vals = [];
      for (let v = lo; v <= hi; v++) vals.push(String(v));
      return vals;
    }
    return spec.split('|').map((s) => s.trim());
  }

  function hasard(t) { return t[Math.floor(Math.random() * t.length)]; }

  function tirer(modele) {
    const domaines = {};
    for (const m of modele.matchAll(MOTIF)) {
      if (m[2] !== undefined) domaines[m[1]] = domaine(m[2]);
    }
    let valeurs = {};
    for (let essai = 0; essai < 100; essai++) {
      valeurs = {};
      for (const nom in domaines) valeurs[nom] = hasard(domaines[nom]);
      const v = Object.values(valeurs);
      if (new Set(v).size === v.length) break;
    }
    return modele.replace(MOTIF, (tout, nom) =>
      nom in valeurs ? valeurs[nom] : tout);
  }

  /* ---------- memoire locale (confort, jamais indispensable) ---------- */

  function lire(cle) {
    try { return JSON.parse(localStorage.getItem(cle)); } catch (e) { return null; }
  }
  function ecrire(cle, v) {
    try { localStorage.setItem(cle, JSON.stringify(v)); } catch (e) { /* rien */ }
  }

  /* ---------- un quiz ---------- */

  function el(tag, classe, texte) {
    const n = document.createElement(tag);
    if (classe) n.className = classe;
    if (texte !== undefined) n.textContent = texte;
    return n;
  }

  function affichageAttendu(a) {
    if (a.mode === 'valeur') return a.repr;
    if (a.mode === 'erreur') return 'erreur (' + a.nom + ')';
    return a.texte.replace(/\n$/, '');
  }

  function monter(script, rang) {
    const questions = lireQuiz(script.textContent);
    const titre = script.dataset.titre || 'Que vaut la dernière ligne ?';
    const cle = 'silent-teacher:' + location.pathname + ':' + rang;

    const hote = el('div', 'st');
    script.after(hote);

    const etat = {
      i: 0,
      faites: new Set(),
      restantes: questions.map((q) => q.fois),
      erreurs: questions.map(() => 0),
    };
    const sauve = lire(cle);
    if (sauve && Array.isArray(sauve.faites)) {
      etat.faites = new Set(sauve.faites.filter((k) => k < questions.length));
      etat.i = Math.min(sauve.i || 0, questions.length - 1);
    }
    function memoriser() { ecrire(cle, { i: etat.i, faites: [...etat.faites] }); }

    function premiereNonFaite() {
      for (let k = 0; k < questions.length; k++) if (!etat.faites.has(k)) return k;
      return -1;
    }

    /* squelette */
    const tete = el('div', 'st-tete');
    tete.append(el('span', 'st-titre', titre));
    const points = el('span', 'st-points');
    tete.append(points);
    const corps = el('div', 'st-corps');
    hote.append(tete, corps);

    function dessinerPoints() {
      points.replaceChildren();
      questions.forEach((q, k) => {
        const p = el('span', 'st-point');
        if (etat.faites.has(k)) p.classList.add('st-fait');
        if (k === etat.i) p.classList.add('st-courant');
        points.append(p);
      });
    }

    function accueil() {
      dessinerPoints();
      corps.replaceChildren();
      const b = el('button', 'st-bouton', etat.faites.size ? 'Reprendre' : 'Commencer');
      const info = el('span', 'st-info',
        questions.length + ' question' + (questions.length > 1 ? 's' : ''));
      b.addEventListener('click', () => {
        b.disabled = true;
        b.textContent = 'Chargement de Python…';
        python().then(poser).catch(() => {
          b.disabled = false;
          b.textContent = 'Échec du chargement, réessayer';
        });
      });
      corps.append(b, info);
    }

    function fin() {
      dessinerPoints();
      corps.replaceChildren();
      corps.append(el('p', 'st-fin', 'Terminé.'));
      const b = el('button', 'st-bouton', 'Recommencer');
      b.addEventListener('click', () => {
        etat.i = 0;
        etat.faites.clear();
        etat.restantes = questions.map((q) => q.fois);
        etat.erreurs = questions.map(() => 0);
        memoriser();
        poser();
      });
      corps.append(b);
    }

    async function poser() {
      if (premiereNonFaite() === -1) { fin(); return; }
      const py = await python();
      dessinerPoints();
      const q = questions[etat.i];
      const code = tirer(q.modele);
      let attendu;
      try {
        attendu = JSON.parse(py.globals.get('_st_executer')(code));
      } catch (e) {
        const l = e.message.trim().split('\n');
        corps.replaceChildren(el('p', 'st-panne',
          'Question ' + (etat.i + 1) + ' mal écrite : ' + l.slice(Math.max(0, l.length - 2), l.length).join(' ')));
        return;
      }
      if (attendu.parasite) {
        console.warn('silent_teacher : la question ' + (etat.i + 1) +
          ' affiche du texte ET attend une valeur.');
      }

      corps.replaceChildren();
      const pre = el('pre', 'st-code');
      pre.append(el('code', '', code));
      const ligne = el('div', 'st-ligne');
      // Toute question d'affichage recoit la meme zone de saisie : une hauteur
      // calee sur la reponse en trahirait le nombre de lignes.
      const multi = attendu.mode === 'sortie';
      const champ = el(multi ? 'textarea' : 'input', 'st-champ');
      champ.setAttribute('aria-label',
        attendu.mode === 'sortie' ? 'Ce que le programme affiche' : 'Valeur de la dernière ligne');
      champ.setAttribute('autocomplete', 'off');
      champ.setAttribute('autocapitalize', 'off');
      champ.setAttribute('spellcheck', 'false');
      if (multi) {
        champ.rows = 4;
        champ.placeholder = 'Ctrl+Entrée pour valider';
      }
      const valider = el('button', 'st-bouton', 'Valider');
      const passer = el('button', 'st-bouton st-discret', 'Je ne sais pas');
      ligne.append(el('span', 'st-invite', attendu.mode === 'sortie' ? 'affiche' : '→'),
        champ, valider, passer);
      const retour = el('div', 'st-retour');
      retour.setAttribute('aria-live', 'polite');
      corps.append(pre, ligne, retour);
      champ.focus({ preventScroll: true });

      let repondu = false;
      function conclure(statut, remarque) {
        repondu = true;
        champ.disabled = valider.disabled = passer.disabled = true;
        retour.replaceChildren();
        const r = el('div', 'st-correction st-' + statut);
        if (statut !== 'aide') r.append(el('code', 'st-saisie', champ.value.trim() || '…'));
        if (statut !== 'gagne') {
          r.append(el('span', 'st-fleche', '→'), el('code', 'st-bonne', affichageAttendu(attendu)));
        } else {
          r.append(el('span', 'st-ok', '✓'));
        }
        retour.append(r);
        if (remarque) retour.append(el('p', 'st-remarque', remarque));
        const suite = el('button', 'st-bouton', 'Suivant');
        suite.addEventListener('click', () => avancer(statut));
        retour.append(suite);
        suite.focus({ preventScroll: true });
      }

      valider.addEventListener('click', () => {
        if (repondu || champ.value.trim() === '') return;
        const v = JSON.parse(py.globals.get('_st_verifier')(JSON.stringify(attendu), champ.value));
        conclure(v.ok ? 'gagne' : 'perdu', v.remarque);
      });
      passer.addEventListener('click', () => { if (!repondu) conclure('aide', ''); });
      champ.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' && (!multi || ev.ctrlKey)) { ev.preventDefault(); valider.click(); }
      });
    }

    function avancer(statut) {
      const i = etat.i;
      if (statut === 'gagne') {
        if (!etat.faites.has(i) && etat.restantes[i] > 1) {
          etat.restantes[i] -= 1;
        } else {
          etat.faites.add(i);
          etat.erreurs[i] = 0;
          const k = premiereNonFaite();
          if (k === -1) { memoriser(); fin(); return; }
          etat.i = k;
        }
      } else if (statut === 'perdu') {
        etat.erreurs[i] += 1;
        etat.restantes[i] = Math.min(Math.max(3, questions[i].fois), etat.restantes[i] + 1);
        if (i > 0 && etat.erreurs[i] > 1) {
          etat.erreurs[i] = 0;
          etat.i = i - 1;
        }
      }
      memoriser();
      poser();
    }

    if (questions.length === 0) {
      corps.append(el('p', 'st-panne', 'Quiz vide.'));
      return;
    }
    accueil();
  }

  /* ---------- style, calque sur les variables du theme Material ---------- */

  const STYLE = `
.st { border: 1px solid var(--md-default-fg-color--lightest); border-radius: .3rem;
      margin: 1.2em 0; padding: .6rem .8rem; font-size: .8rem; }
.st-tete { display: flex; justify-content: space-between; align-items: center;
           gap: .5rem; margin-bottom: .5rem; flex-wrap: wrap; }
.st-titre { font-weight: 700; }
.st-points { display: flex; gap: .25rem; flex-wrap: wrap; }
.st-point { width: .6rem; height: .6rem; border-radius: 50%;
            background: var(--md-default-fg-color--lightest); }
.st-point.st-fait { background: var(--md-accent-fg-color, #4caf50); }
.st-point.st-courant { outline: 2px solid var(--md-primary-fg-color); outline-offset: 1px; }
.st-corps { display: flex; flex-direction: column; gap: .5rem; align-items: flex-start; }
.st-code { margin: 0; width: 100%; box-sizing: border-box; }
.st-code code { display: block; padding: .6rem .8rem; background: var(--md-code-bg-color);
                color: var(--md-code-fg-color); font-family: var(--md-code-font-family, monospace);
                white-space: pre; overflow-x: auto; }
.st-ligne { display: flex; gap: .4rem; align-items: center; flex-wrap: wrap; width: 100%; }
.st-invite { font-family: var(--md-code-font-family, monospace); opacity: .7; }
.st-champ { font-family: var(--md-code-font-family, monospace); font-size: .8rem;
            padding: .25rem .4rem; min-width: 8rem; flex: 1 1 8rem; max-width: 20rem;
            border: 1px solid var(--md-default-fg-color--light); border-radius: .2rem;
            background: var(--md-default-bg-color); color: var(--md-default-fg-color); }
.st-bouton { font: inherit; padding: .25rem .7rem; border-radius: .2rem; cursor: pointer;
             border: 1px solid var(--md-primary-fg-color);
             background: var(--md-primary-fg-color); color: var(--md-primary-bg-color); }
.st-bouton:disabled { opacity: .45; cursor: default; }
.st-discret { background: transparent; color: var(--md-primary-fg-color); }
.st-info { opacity: .7; }
.st-retour { display: flex; flex-direction: column; gap: .4rem; align-items: flex-start; }
.st-retour:empty { display: none; }
.st-correction { display: flex; gap: .6rem; align-items: center; flex-wrap: wrap; }
.st-correction code { white-space: pre; padding: .1rem .35rem; }
.st-perdu .st-saisie { text-decoration: line-through; opacity: .7; }
.st-gagne .st-saisie { color: #2e7d32; font-weight: 700; }
.st-ok { color: #2e7d32; font-weight: 700; }
.st-bonne { font-weight: 700; }
.st-remarque { margin: 0; font-style: italic; }
.st-fin { margin: 0; font-weight: 700; }
.st-panne { margin: 0; color: #c62828; }
`;

  function demarrer() {
    if (!document.getElementById('st-style')) {
      const s = document.createElement('style');
      s.id = 'st-style';
      s.textContent = STYLE;
      document.head.append(s);
    }
    document.querySelectorAll('script[type="text/x-silent-teacher"]').forEach(monter);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', demarrer);
  else demarrer();
})();
