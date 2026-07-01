/*
 * Indices déverrouillés progressivement dans les exercices.
 *
 * Dans une admonition `!!! question`, les blocs repliables `???` (indices puis
 * correction, dans l'ordre) sont verrouillés au départ. Un bouton "Démarrer"
 * lance un compteur invisible : toutes les DELAY_SECONDS, le bloc suivant
 * devient accessible, jusqu'à la correction.
 *
 * Les `???` peuvent être imbriqués DANS la question, ou placés juste APRÈS
 * (blocs frères) : les deux styles sont gérés.
 *
 * Friction pédagogique (pas une sécurité). Repli sans JS : blocs ouvrables.
 */
(function () {
  "use strict";

  var DELAY_SECONDS = 60; // délai entre deux déverrouillages

  function lock(d) {
    d.open = false;
    d.classList.add("gated-locked");
    var s = d.querySelector("summary");
    if (s) s.setAttribute("tabindex", "-1");
  }

  function unlock(d) {
    d.classList.remove("gated-locked");
    var s = d.querySelector("summary");
    if (s) s.removeAttribute("tabindex");
  }

  function runTimer(gated, startTime, btn) {
    function tick() {
      var elapsed = (Date.now() - startTime) / 1000;
      var n = Math.floor(elapsed / DELAY_SECONDS);
      for (var i = 0; i < gated.length && i < n; i++) {
        unlock(gated[i]);
      }
      if (n >= gated.length) {
        if (btn) btn.textContent = "✓ Tous les indices sont disponibles";
        return true;
      }
      return false;
    }
    if (!tick()) {
      var id = setInterval(function () {
        if (tick()) clearInterval(id);
      }, 5000);
    }
  }

  function collectGated(question) {
    // 1) blocs repliables imbriqués dans la question
    var gated = Array.prototype.slice.call(
      question.querySelectorAll(":scope > details")
    );
    // 2) blocs repliables frères, placés juste après la question
    var sib = question.nextElementSibling;
    while (sib && sib.tagName === "DETAILS") {
      gated.push(sib);
      sib = sib.nextElementSibling;
    }
    return gated;
  }

  function initExercice(question, qIndex) {
    var gated = collectGated(question);
    if (gated.length === 0) return;

    var key = "exo-timer:" + location.pathname + ":" + qIndex;

    gated.forEach(function (d) {
      lock(d);
      d.addEventListener("toggle", function () {
        if (d.classList.contains("gated-locked") && d.open) d.open = false;
      });
    });

    var started = null;
    try { started = localStorage.getItem(key); } catch (e) {}

    if (started) {
      runTimer(gated, parseInt(started, 10), null);
      return;
    }

    var btn = document.createElement("button");
    btn.className = "gated-start";
    btn.type = "button";
    btn.textContent = "▶ Démarrer";
    btn.addEventListener("click", function () {
      var t = Date.now();
      try { localStorage.setItem(key, String(t)); } catch (e) {}
      btn.disabled = true;
      btn.textContent = "⏳ Réflexion en cours";
      runTimer(gated, t, btn);
    });

    var childDetails = question.querySelector(":scope > details");
    if (childDetails) {
      question.insertBefore(btn, childDetails); // avant les indices imbriqués
    } else {
      question.appendChild(btn); // en bas de la question, avant les corrigés frères
    }
  }

  function boot() {
    // Portée : première uniquement (retirer/adapter pour étendre).
    if (location.pathname.indexOf("/premiere/") === -1) return;
    var qs = document.querySelectorAll(".admonition.question");
    Array.prototype.forEach.call(qs, function (q, i) {
      initExercice(q, i);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
