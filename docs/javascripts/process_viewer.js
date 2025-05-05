//@ts-check


const main_div = document.getElementById('process_viewer');

if (!main_div) {
  throw new Error('Pas de div avec l\'id "process_viewer"');
}

const div_prog = document.createElement('div');

const div_table = document.createElement('div');

const table_procs = document.createElement('table');

div_table.appendChild(table_procs);

const bouton_run = document.createElement('button');
bouton_run.innerHTML = 'Exécuter';
bouton_run.className = 'md-button';
bouton_run.addEventListener('click', () => {
  animate();
})
div_table.appendChild(bouton_run);

const div_graph = document.createElement('div');
div_graph.style.height = '300px';


main_div.appendChild(div_prog);
main_div.appendChild(div_table);
main_div.appendChild(div_graph);


// PROGRAMME
// PROGRAMME
// PROGRAMME
// PROGRAMME
// PROGRAMME

const textarea = document.createElement('textarea');
textarea.rows = 10; // nombre de lignes
textarea.cols = 50; // nombre de colonnes
textarea.placeholder = 'Saisissez votre programme ici...'; // texte de placeholder

textarea.value = "?r?s!r!s\n?s?t!s!t\n?t?r!r!t";

textarea.style.width = '100%';
textarea.style.fontFamily = 'monospace';
textarea.style.fontSize = '20px';

// Ajoutez la textarea à la page
div_prog.appendChild(textarea);

const boutonok = document.createElement('button');
boutonok.className = 'md-button';
boutonok.innerHTML = 'Générer la table';
boutonok.addEventListener('click', () => {
  creer_table(creer_procs(textarea.value));
  for (let i = 0; i < animations.length; i++) {
    stopAnimation(animations[i]);
  }
  div_graph.innerHTML = '';
});
div_prog.appendChild(boutonok);

function validerLigne(texte) {
  const regexp = /^(\?[a-z])+(![a-z]|\?[a-z])*\![a-z]$/gm;
  return regexp.test(texte);
};


textarea.addEventListener('input', (e) => {
  const target = e.target;
  if (target instanceof HTMLTextAreaElement) {
    if (!target.value) {
      return;
    }
    target.value.split('\n').forEach((ligne, _) => {
      if (!validerLigne(ligne)) {
        target.style.color = 'red';
        return;
      }
      textarea.style.color = 'black';
    });
  }
});


class Instruction {
  /**
   * Constructeur de l'instruction
   * @param {Function} action - '!' ou '?'
   * @param {string} ressource - lettre
   */
  constructor(action, ressource) {
    this.action = action;
    this.ressource = ressource;
  }

  toString() {
    return this.action + this.ressource;
  }
}

class Processus {
  /**
   * Constructeur du processus
   * @param {string} id - Identifiant unique du processus
   * @param {Instruction[]} prog - Programme du processus
   */
  constructor(id, prog) {
    this.id = id;
    this.prog = prog;
    this.compteur = 0;
  }

  toString() {
    return this.id + '\n' + this.prog.join('\n');
  }
}


/**
 * Cr e un tableau de processus partir d'un texte
 * @param {string} texte - texte repr sentant les processus
 * @returns {Processus[]} tableau de processus
 */
function creer_procs(texte) {
  let procs = [];
  let action = halt;
  texte.split('\n').forEach((ligne, i) => {
    //let proc = ['P' + index, [], 0];
    let proc = new Processus('P' + i, []);
    procs.push(proc);
    ligne.split('').forEach((car, _) => {
      car = car.toUpperCase();
      switch (car) {
        case '?':
          action = acquerir;
          break;
        case '!':
          action = liberer;
          break;
        default:
          proc.prog.push(new Instruction(action, car));
          break;
      }
    });
    proc.prog.push(new Instruction(halt, ''));
  })

  let max_length = 0;
  procs.forEach(proc => {
    max_length = Math.max(max_length, proc.prog.length);
  });

  procs.forEach(proc => {
    while (proc.prog.length < max_length) {
      proc.prog.push(new Instruction(pass, ''));
    }
  });
  return procs;
}

// TABLE DES PROCESSUS
// TABLE DES PROCESSUS
// TABLE DES PROCESSUS
// TABLE DES PROCESSUS

/**
 * Creates and populates an HTML table to display the processes and their instructions.
 * The table headers represent process IDs, and each cell contains the action
 * and resource for each step of the process program.
 * @param {Processus[]} procs - An array of Processus objects to be displayed in the table.
 */
function creer_table(procs) {
  table_procs.innerHTML = '';
  table_procs.style.textAlign = 'left';
  const tr = document.createElement('tr');
  procs.forEach(proc => {
    const th1 = document.createElement('th');
    th1.innerHTML = proc.id;
    th1.id = proc.id + '_id';
    tr.appendChild(th1);
  });
  table_procs.appendChild(tr);


  for (let i = 0; i < procs[0].prog.length; i++) {
    const tr2 = document.createElement('tr');
    for (let j = 0; j < procs.length; j++) {
      const td1 = document.createElement('td');
      td1.id = 'inst' + procs[j].id + '_' + i;
      const fun = procs[j].prog[i].action;
      if (fun && fun != pass) {
        td1.innerHTML = fun.name + '(' + procs[j].prog[i].ressource + ')';
      } else {
        td1.innerHTML = '';
      }
      tr2.appendChild(td1);
    }
    table_procs.appendChild(tr2);
  }

}

/**
 * Updates the HTML table to visually indicate the current state of each process.
 * Highlights the process that is currently executing and its corresponding instruction.
 * 
 * @param {Processus[]} procs - An array of Processus objects, each containing
 *                              an id, a program of instructions, and a counter indicating
 *                              the current instruction being executed.
 */


/**
 * Met en background vert le processus dans la table, met les autres en background blanc.
 * Met en backgroud jaune l'instruction du processus en cours, met les autres en blanc 
 * @param {Processus} proc 
 */
async function update_table(proc) {
  //debugger;

  const procids = [];
  let premiere_ligne = table_procs.firstElementChild
  if (!premiere_ligne) return;

  for (const child of premiere_ligne.children) {
    procids.push(child.id.replace('_id', ''));
  }

  procids.forEach(id => {
    //@ts-ignore
    document.getElementById(id + '_id').style.background = 'white';
  });
  //@ts-ignore
  document.getElementById(proc.id + '_id').style.background = 'green';

  for (let i = 0; i < proc.prog.length; i++) {
    //@ts-ignore
    document.getElementById('inst' + proc.id + '_' + i).style.background = 'white';
  }
  //@ts-ignore
  document.getElementById('inst' + proc.id + '_' + proc.compteur).style.background = 'yellow';

}


// GRAPHE
// GRAPHE
// GRAPHE
// GRAPHE
// GRAPHE
// GRAPHE


//let processus = [];

let ressources = {};
let nodes = [];
let edges = [];
const LEFT = 'left', RIGHT = 'right';

let cy = null;


/**
 * Updates the global 'ressources' object by iterating through an array of processes
 * and their instructions, identifying unique resources that are involved in actions.
 * The resources are stored as keys in the 'ressources' object with null values.
 * 
 * @param {Processus[]} procs - An array of Processus objects, each containing
 *                              a program of instructions that may involve resource actions.
 */

function update_ressources(procs) {
  ressources = {};
  procs.forEach(proc => {
    proc.prog.forEach((inst, _) => {
      if (inst.action && inst.action != halt && inst.action != pass) {
        ressources[inst.ressource] = null;
      }
    });
  });
}


/**
 * @param {Processus[]} procs - An array of objects, each containing an id and a program of instructions.
 */
function genere_graphe(procs) {

  update_ressources(procs);

  procs.forEach(proc => {
    nodes.push({ data: { id: proc.id, part: RIGHT } });
    proc.prog.forEach((inst, _) => {
      if (inst.action && inst.action != halt && inst.action != pass) {
        ressources[inst.ressource] = null;
      }
    });
  });


  for (let res in ressources) {
    nodes.push({ data: { id: res, part: LEFT } });
  }
  console.log(ressources)


  edges = [];
  div_graph.innerHTML = '';
  // @ts-ignore
  cy = cytoscape({
    container: div_graph,
    elements: [...nodes, ...edges],
    layout: {
      name: 'breadthfirst',        // tree-style layout
      roots: `[part = "${LEFT}"]`, // pin left partition
      animate: false,               // smooth entry
      spacingFactor: 1.8
    },
    style: [
      {
        selector: 'node',
        style: {
          'label': 'data(id)',
          'text-valign': 'center',
          'background-color': '#3b82f6',
          'color': '#fff',
          'font-size': 14,
          'width': 32,
          'height': 32
        }
      },
      {
        selector: 'edge',
        style: {
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle',
          'width': 4,
          'line-color': '#94a3b8',
          'target-arrow-color': '#94a3b8'
        }
      }
    ]
  });

}


async function pulseEdge(edge) {
  await edge.animate(
    { style: { width: 8, 'line-color': '#f43f5e' } },
    {
      duration: 400,
      easing: 'ease-out',
      complete: () => {
        edge.animate(
          { style: { width: 4, 'line-color': '#94a3b8' } },
          { duration: 400, easing: 'ease-in' }
        );
      }
    }
  );
}


async function addEdgeWithReveal(source, target, duration = 600, directed = true) {

  const selector = directed
    ? `edge[source = "${source}"][target = "${target}"]`
    : `edge[(source = "${source}" && target = "${target}") \
    || (source = "${target}" && target = "${source}")]`;

  const edges = cy.edges(selector);            // fast filtering on attributes

  if (!edges.empty()) {
    edges.forEach(pulseEdge);                        // anything found?
    return;                                    // no need to animate
  }

  const id = `e-${source}-${target}-${Date.now()}`;   // unique id

  const edge = cy.add({
    group: 'edges',
    data: { id, source, target },
    style: { width: 0, opacity: 0 }                  // hidden
  });                                                // cy.add() docs :contentReference[oaicite:0]{index=0}

  // 2 – animate it to the normal style, then stop
  await edge.animate(
    { style: { width: 4, opacity: 1 } },             // final look
    {
      duration,
      easing: 'ease-out'                            // no complete callback = stop here
    }
  );
}

async function removeEdgeBetween(srcId, dstId, directed = true) {

  const selector = directed
    ? `edge[source = "${srcId}"][target = "${dstId}"]`
    : `edge[(source = "${srcId}" && target = "${dstId}") \
    || (source = "${dstId}" && target = "${srcId}")]`;

  const edges = cy.edges(selector);            // fast filtering on attributes

  if (!edges.empty()) {                        // anything found?
    edges.remove();                            // delete from model + renderer :contentReference[oaicite:0]{index=0}
  } else {
    console.warn(`No edge between ${srcId} and ${dstId}`);
  }
}


// RUN
// RUN
// RUN
// RUN
// RUN

/**
 * Attempts to acquire a resource for a given process by adding an edge in the resource allocation graph.
 * 
 * @param {Processus} proc - The process attempting to acquire the resource, with an `id` property.
 * @param {string} res - The resource to be acquired.
 * @returns {Promise<number>} - A promise that resolves to 0 if the resource was successfully acquired,
 *                              or 1 if the resource is already allocated to another process.
 * 
 * This function visually represents the process of acquiring a resource by animating the addition of edges
 * in the graph. If the resource is available, it updates the resource allocation and modifies the graph accordingly.
 */
async function acquerir(proc, res) {
  //console.log('ajoute arete', proc, res);
  //debugger;
  await addEdgeWithReveal(proc, res, 1000);
  if (ressources[res] === null) {
    ressources[res] = proc.id;
    await removeEdgeBetween(proc, res, true);
    await addEdgeWithReveal(res, proc, 1000);
    return 0;
  }
  return 1;
}

async function liberer(proc, res) {
  await removeEdgeBetween(res, proc, true);
  ressources[res] = null;
  return 0;
}

async function pass(proc, dummy) {
  return -1;
}


async function halt(proc, dummy) {
  console.log('Terminé: ', proc);
  return -1;
}




let animations = [];

/**

*/
async function animate() {

  for (let i = 0; i < animations.length; i++) {
    stopAnimation(animations[i]);
  }
  let processus = creer_procs(textarea.value);
  //console.log(processus);

  creer_table(processus);
  update_ressources(processus);
  genere_graphe(processus);

  let animationIntervalId = setInterval(async () => {


    let proc_elu = processus.shift();
    console.log(proc_elu);

    //debugger;
    if (proc_elu) {
      let instruction = proc_elu.prog[proc_elu.compteur];
      if (instruction && instruction.action != pass) {
        await update_table(proc_elu);
        let retcode = await instruction.action(proc_elu.id, instruction.ressource);
        if (retcode != -1) {
          if (retcode == 0) {
            proc_elu.compteur++;
          }
          processus.push(proc_elu);
        }
      }
    }

    if (processus.length == 0) {
      stopAnimation(animationIntervalId);
      return;
    }
  }
    , 1500);

  animations.push(animationIntervalId);
}


function stopAnimation(anim) {
  if (anim) {
    clearInterval(anim);
  }
}
