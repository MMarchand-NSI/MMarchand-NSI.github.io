(function () {
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function cleanWikitext(s) {
    s = s.replace(/<ref[^>]*>[\s\S]*?<\/ref>/gi, "");
    s = s.replace(/<[^>]+>/g, "");
    s = s.replace(/\{\{[^{}]*\}\}/g, "");
    s = s.replace(/\{\{[^{}]*\}\}/g, ""); // deuxième passe (imbrication simple)
    s = s.replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g, "$1");
    s = s.replace(/\[\[([^\]]*)\]\]/g, "$1");
    s = s.replace(/'''/g, "").replace(/''/g, "");
    s = s.replace(/\s+/g, " ").trim();
    return s;
  }

  // Extrait la première catégorie grammaticale et ses définitions depuis le
  // wikitexte de la section française d'une page du Wiktionnaire.
  function extractDefinitions(wikitext) {
    var frStart = wikitext.indexOf("{{langue|fr}}");
    if (frStart === -1) return null;
    var rest = wikitext.slice(frStart);
    var nextLang = rest.search(/\n== \{\{langue\|/);
    var frSection = nextLang === -1 ? rest : rest.slice(0, nextLang);

    var posRe = /=== \{\{S\|([a-zàâäéèêëïîôöùûüç-]+)\|fr[^}]*\}\} ===/;
    var m = posRe.exec(frSection);
    if (!m) return null;

    var afterHeader = frSection.slice(m.index + m[0].length);
    var boundary = afterHeader.search(/\n===/);
    var block = boundary === -1 ? afterHeader : afterHeader.slice(0, boundary);

    var defRe = /^# (.+)$/gm;
    var defs = [];
    var dm;
    while ((dm = defRe.exec(block)) && defs.length < 2) {
      var cleaned = cleanWikitext(dm[1]);
      if (cleaned) defs.push(cleaned);
    }
    if (!defs.length) return null;
    return { pos: m[1], defs: defs };
  }

  function renderResult(container, entry) {
    container.textContent = "";
    container.appendChild(el("p", "dico-widget__pos", entry.pos));
    var ul = el("ul", "dico-widget__defs");
    entry.defs.forEach(function (d) {
      ul.appendChild(el("li", null, d));
    });
    container.appendChild(ul);
  }

  function initDictionnaire() {
    var inner = document.querySelector(".md-sidebar--secondary .md-sidebar__inner");
    if (!inner || inner.querySelector(".dico-widget")) return;

    var widget = el("div", "dico-widget");

    var label = el("label", "dico-widget__label", "Dictionnaire");
    label.setAttribute("for", "dico-input");

    var form = el("form", "dico-widget__form");

    var input = el("input", "dico-widget__input");
    input.type = "text";
    input.id = "dico-input";
    input.placeholder = "un mot…";
    input.autocomplete = "off";

    var button = el("button", "dico-widget__button", "🔍");
    button.type = "submit";
    button.setAttribute("aria-label", "Chercher");

    form.appendChild(input);
    form.appendChild(button);

    var result = el("div", "dico-widget__result");
    result.setAttribute("aria-live", "polite");

    widget.appendChild(label);
    widget.appendChild(form);
    widget.appendChild(result);
    inner.appendChild(widget);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var mot = input.value.trim().toLowerCase();
      if (!mot) return;
      result.textContent = "Recherche…";

      var url =
        "https://fr.wiktionary.org/w/api.php?action=query&prop=revisions&rvslots=main&rvprop=content&format=json&origin=*&titles=" +
        encodeURIComponent(mot);

      fetch(url)
        .then(function (res) {
          if (!res.ok) throw new Error("erreur réseau");
          return res.json();
        })
        .then(function (data) {
          var pages = data.query && data.query.pages;
          var page = pages && pages[Object.keys(pages)[0]];
          if (!page || page.missing !== undefined) {
            result.textContent = "« " + mot + " » introuvable.";
            return;
          }
          var wikitext = page.revisions[0].slots.main["*"];
          var entry = extractDefinitions(wikitext);
          if (!entry) {
            result.textContent = "Pas de définition trouvée pour « " + mot + " ».";
            return;
          }
          renderResult(result, entry);
        })
        .catch(function () {
          result.textContent = "« " + mot + " » introuvable.";
        });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDictionnaire);
  } else {
    initDictionnaire();
  }
})();
