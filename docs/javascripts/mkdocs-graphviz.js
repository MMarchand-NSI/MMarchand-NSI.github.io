/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

let observerReady = false;

function getParams(root){
  const span = root.querySelector("[class='graphviz-light-dark']:first-of-type");
  if (!span) return null;
  const dataLibraryDefault = span.getAttribute('data-library-default');
  const dataDefault = span.getAttribute('data-default');
  let dataLight = span.getAttribute('data-light');
  if (dataLight === '#0') dataLight = '#000000';
  const dataDark = span.getAttribute('data-dark');
  return { dataLibraryDefault, dataDefault, dataLight, dataDark };
}

function tag_default(root, p){
  if (!p) return;
  const { dataLibraryDefault, dataDefault } = p;
  if (dataDefault !== dataLibraryDefault) return;
  root.querySelectorAll(`svg.graphviz *[stroke*='${dataDefault}' i]`).forEach(el=>{
    el.classList.add('stroke-default');
  });
  root.querySelectorAll(`svg.graphviz *[fill*='${dataDefault}' i]`).forEach(el=>{
    el.classList.add('fill-default');
  });
}

function update_theme(root=document){
  const p = getParams(root);
  if (!p) return;
  const theme = document.body.getAttribute('data-md-color-scheme');
  if (p.dataDefault !== p.dataLibraryDefault) return;

  root.querySelectorAll("svg.graphviz *[class*='stroke-default']").forEach(el=>{
    el.style.setProperty('stroke', theme==='default' ? p.dataLight : p.dataDark, 'important');
  });
  root.querySelectorAll("svg.graphviz *[class*='fill-default']").forEach(el=>{
    el.style.setProperty('fill', theme==='default' ? p.dataLight : p.dataDark, 'important');
  });
}

export function init(root=document){
  console.log('[massilia-graphviz] init');
  const p = getParams(root);
  if (!p) return; // no diagram on page
  tag_default(root, p);
  update_theme(root);

  if (!observerReady){
    const obs = new MutationObserver(muts=>{
      for (const m of muts){
        if (m.type==='attributes' && m.attributeName==='data-md-color-scheme'){
          update_theme(document);
        }
      }
    });
    obs.observe(document.body, { attributes:true });
    observerReady = true;
  }
}
