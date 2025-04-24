// @ts-check
// @ts-ignore
import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@3.7.0/dist/chart.esm.js';
// @ts-ignore
import {create, all} from 'https://cdn.jsdelivr.net/npm/mathjs@13.0.0/+esm';



Chart.register(...registerables);
const math = create(all, {});







let mesfoncs = new Map();
let chart = undefined;
let currentXMax = 2;
let currentXMin = 0;
// @ts-ignore
const xMin = 0;
// @ts-ignore
const xMax = 49.1;
let f1 = undefined;
let f2 = undefined;
let idanimation = 0;
let flagAnim = true;

let timeout = 500;
let data = undefined

/**
 * @param {(arg0: number) => number} f
 * @param {(arg0: number) => number} g
 * @param {number} pxMin
 * @param {number} pxMax
 */
function generateData(f, g, pxMin, pxMax) {
    const data = [];
    for (let x = pxMin; x <= pxMax+0.3; x += 0.1) {
        data.push({ x: x, y1: f(x), y2: g(x)});
    }
    return data;
}

function creerGraphique(idDiv) {

    // @ts-ignore
    const ctx = document.getElementById(idDiv).getContext('2d');

    currentXMax = 2;
    currentXMin = 0;


    if (chart) {
        chart.stop();
        chart.destroy();
        chart = undefined;
    }
    
    data = generateData(f1, f2, currentXMin, currentXMax);

    chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'f(x)',
                    data: data.map(point => ({ x: point.x, y: point.y1 })),
                    borderColor: 'blue',
                    showLine: true,
                    fill: false,
                },
                {
                    label: 'g(x)',
                    data: data.map(point => ({ x: point.x, y: point.y2 })),
                    borderColor: 'green',
                    showLine: true,
                    fill: false,
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    grid: {
                        display: false // Désactive la grille sur l'axe x
                    },              
                    ticks: {
                        callback: function(value, index, ticks) {
                          // On considère que le tick maximum est le dernier dans le tableau ticks
                          if (index === ticks.length - 1 || index=== 0) {
                            return Math.round(value*10)/10;
                          }
                          return '';
                        }
                    },              
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Taille de l\'entrée'
                    },
                    min: 0
                },
                y: {
                    grid: {
                        display: false // Désactive la grille sur l'axe y
                    },              
                    ticks: {
                        callback: function(value, index, ticks) {
                          // On considère que le tick maximum est le dernier dans le tableau ticks
                          if (index === ticks.length - 1 || index=== 0) {
                            return Math.round(value*10)/10;
                          }
                          return '';
                        }
                      },              
                    title: {
                        display: true,
                        text: 'Temps de calcul'
                    },
                    min: 0
                }
            }
        }
    });


}


/**
 * @param {number} id
 */
function animate(id) {
    if (chart && id === idanimation && flagAnim) {
            chart.options.scales.x.min = currentXMin;
            chart.options.scales.x.max = currentXMax;
            chart.options.scales.y.max = Math.max(f1(currentXMax), f2(currentXMax));

            data = generateData(f1, f2, currentXMin, currentXMax);

            chart.data.datasets[0].data = data.map(point => ({ x: point.x, y: point.y1 }));
            chart.data.datasets[1].data = data.map(point => ({ x: point.x, y: point.y2 }));
            chart.update();
            currentXMax += 0.1;
            currentXMin += 0.1;
            setTimeout(animate, timeout, id);
        }
}


export function init() {

        console.log('plotter loaded');
        let mainTag = document.getElementsByTagName('complexity');

        if ( mainTag=== null) {
            return;
        }

        document.getElementsByTagName('complexity')[0].innerHTML = `
        <form>
            <label for="f1">Fonction 1:</label>
            <select name="f1" class="md-select"></select>
            <label for="f2">Fonction 2:</label>
            <select name="f2"></select>
            <button type = "button" class="md-button" name="bAfficher">Afficher</button>
            <button type = "button" class="md-button" name="bStop">Stop</button>
            <br/>
            <label for="vitesse">Vitesse :</label>
            <input type="range" id="vitesse" name="vitesse" min="0" max="500" step="1" value="0">
        </form>
        <canvas id="dessin_complexite" width="800" height="350"></canvas>
        `;


        mesfoncs = new Map();
        mesfoncs.set('ln(x)', Math.log);
        mesfoncs.set('x' , (x)=>x);
        mesfoncs.set('x ln(x)', (x)=> x * Math.log(x));
        mesfoncs.set('x^2', (x)=>x*x);
        mesfoncs.set('x^3', (x)=>x*x*x);
        mesfoncs.set('2^x', (x)=>Math.pow(2,x));
        mesfoncs.set('x!', (x)=>math.gamma(x+1));

    
        let sf1  = document.getElementsByName('f1')[0];

        let sf2 = document.getElementsByName('f2')[0];

        mesfoncs.forEach((_, key) => {
            let o = new Option(key, key);
            // @ts-ignore
            sf1.add(o);
            // @ts-ignore
            sf2.add(o.cloneNode(true));
        });

        document.getElementsByName('bStop')[0].addEventListener('click', function () {
            flagAnim = false;
        });

        document.getElementsByName('bAfficher')[0].addEventListener('click', function () {

            flagAnim = true;
            // @ts-ignore
            let vf1 = sf1.value;
            // @ts-ignore
            let vf2 = sf2.value;

            f1 = mesfoncs.get(vf1);
            f2 = mesfoncs.get(vf2);
            creerGraphique('dessin_complexite');

            chart.data.datasets[0].label = vf1;
            chart.data.datasets[1].label = vf2;
            chart.update();
            
            idanimation++;
            animate(idanimation);


            return false;
        });

        let slider = document.getElementById("vitesse");
        // @ts-ignore
        slider.addEventListener('input', function () {
            // @ts-ignore
            timeout = 500 - parseInt(slider.value);
        });

};

