---
template: base.html
hide:
  - navigation
  - toc
---

<style>
.annales-app .annales-row { display: flex; gap: 1rem; }
.annales-app .annales-row > div { flex: 1; }

.annales-app .annales-controls {
  margin-bottom: 1.5rem;
  display: flex; flex-direction: column; gap: 0.85rem;
  background: var(--md-code-bg-color);
  border-radius: 6px;
  padding: 1rem 1.1rem;
}

.annales-app label {
  display: block;
  font-size: 0.68rem;
  font-family: var(--md-code-font, monospace);
  text-transform: uppercase;
  letter-spacing: 0.09em;
  opacity: 0.55;
  margin-bottom: 0.3rem;
}

.annales-app select {
  width: 100%;
  padding: 0.5rem 2.2rem 0.5rem 0.75rem;
  border: 1px solid rgba(128,128,128,0.25);
  border-radius: 5px;
  background-color: var(--md-default-bg-color);
  color: var(--md-typeset-color, inherit);
  font-size: 0.88rem;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.annales-app select:hover {
  border-color: rgba(128,128,128,0.45);
}
.annales-app select:focus {
  outline: none;
  border-color: var(--md-primary-fg-color);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--md-primary-fg-color) 20%, transparent);
}

.annales-app .annales-stats { margin-bottom: 0.75rem; font-size: 0.9rem; }

.annales-app .tag {
  display: inline-block; border-radius: 3px; padding: 1px 6px;
  font-size: 0.72rem; font-family: monospace;
  margin: 1px 2px 1px 0; white-space: nowrap;
  border: 1px solid currentColor; opacity: 0.75;
}
.annales-app .tag.highlight { opacity: 1; font-weight: 600; }
.annales-app .diff-badge {
  display: inline-block; font-size: 0.68rem;
  padding: 1px 5px; border-radius: 3px; margin-left: 4px;
  border: 1px solid currentColor;
}
.annales-app .diff-difficile { color: #c07a00; }
.annales-app .diff-tres { color: #c0392b; }
.annales-app td.annee,
.annales-app td.ex { white-space: nowrap; font-size: 0.82rem; font-family: monospace; }
</style>

<div class="annales-app">

<div class="annales-controls">
  <div class="annales-row">
    <div>
      <label>Thème du programme</label>
      <select id="filtre-theme">
        <option value="">— Tous les thèmes —</option>
        <optgroup label="Structures de données">
          <option value="arbres">Arbres binaires</option>
          <option value="abr">Arbres binaires de recherche (ABR)</option>
          <option value="graphes">Graphes</option>
          <option value="piles">Piles</option>
          <option value="files">Files</option>
          <option value="listes_chainees">Listes chaînées</option>
          <option value="dictionnaires">Dictionnaires</option>
        </optgroup>
        <optgroup label="Algorithmique">
          <option value="recursivite">Récursivité</option>
          <option value="tris">Algorithmes de tri</option>
          <option value="gloutons">Algorithmes gloutons</option>
          <option value="diviser">Diviser pour régner</option>
          <option value="prog_dynamique">Programmation dynamique</option>
          <option value="parcours_graphes">Parcours de graphes (BFS/DFS)</option>
          <option value="dichotomie">Recherche dichotomique</option>
          <option value="decidabilite">Décidabilité</option>
        </optgroup>
        <optgroup label="Programmation">
          <option value="poo">Programmation orientée objet</option>
          <option value="python">Python</option>
          <option value="assertions">Assertions / spécification</option>
        </optgroup>
        <optgroup label="Bases de données">
          <option value="bdd">Bases de données relationnelles</option>
          <option value="sql">SQL</option>
        </optgroup>
        <optgroup label="Architecture & Réseaux">
          <option value="reseaux">Réseaux</option>
          <option value="routage">Protocoles de routage (RIP/OSPF)</option>
          <option value="architecture">Architecture matérielle</option>
          <option value="systemes">Systèmes d'exploitation / Linux</option>
          <option value="processus">Processus / ordonnancement</option>
        </optgroup>
      </select>
    </div>
    <div>
      <label>Année</label>
      <select id="filtre-annee">
        <option value="">— Toutes les années —</option>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
      </select>
    </div>
  </div>
  <div>
    <label>Exercice</label>
    <select id="filtre-ex">
      <option value="">— Tous les exercices —</option>
      <option value="1">Exercice 1</option>
      <option value="2">Exercice 2</option>
      <option value="3">Exercice 3</option>
      <option value="4">Exercice 4 (avant 2023)</option>
      <option value="5">Exercice 5 (avant 2023)</option>
    </select>
  </div>
</div>

<div class="annales-stats">
  <strong id="nb-resultats">0</strong> exercice(s) trouvé(s)
</div>

<table>
  <thead>
    <tr>
      <th>Année</th>
      <th>Ex</th>
      <th>Sujet</th>
      <th>Thèmes</th>
    </tr>
  </thead>
  <tbody id="tbody"></tbody>
</table>

</div>

<script>
const DATA = [
  // ===== 2025 =====
  {annee:"2025", ex:1, sujet:"Amérique du nord J1", url:"https://kxs.fr/files/sujets/2025/ecrit/terminale-2025-amerique-nord-jour-1.pdf", themes:["arbres","abr","recursivite","poo"], diff:""},
  {annee:"2025", ex:2, sujet:"Amérique du nord J1", url:"https://kxs.fr/files/sujets/2025/ecrit/terminale-2025-amerique-nord-jour-1.pdf", themes:["poo","recursivite","gloutons"], diff:""},
  {annee:"2025", ex:3, sujet:"Amérique du nord J1", url:"https://kxs.fr/files/sujets/2025/ecrit/terminale-2025-amerique-nord-jour-1.pdf", themes:["graphes","bdd","sql","tris","gloutons","recursivite"], diff:""},
  {annee:"2025", ex:1, sujet:"Amérique du nord J2", url:"https://kxs.fr/files/sujets/2025/ecrit/terminale-2025-amerique-nord-jour-2.pdf", themes:["dictionnaires","arbres","python","recursivite"], diff:""},
  {annee:"2025", ex:2, sujet:"Amérique du nord J2", url:"https://kxs.fr/files/sujets/2025/ecrit/terminale-2025-amerique-nord-jour-2.pdf", themes:["poo","python"], diff:""},
  {annee:"2025", ex:3, sujet:"Amérique du nord J2", url:"https://kxs.fr/files/sujets/2025/ecrit/terminale-2025-amerique-nord-jour-2.pdf", themes:["bdd","sql","python","recursivite","parcours_graphes"], diff:""},
  {annee:"2025", ex:1, sujet:"Amérique du nord J2 bis", url:"https://kxs.fr/files/sujets/2025/ecrit/terminale-2025-amerique-nord-jour-2-bis.pdf", themes:["python","prog_dynamique"], diff:""},
  {annee:"2025", ex:2, sujet:"Amérique du nord J2 bis", url:"https://kxs.fr/files/sujets/2025/ecrit/terminale-2025-amerique-nord-jour-2-bis.pdf", themes:["arbres","python"], diff:""},
  {annee:"2025", ex:3, sujet:"Amérique du nord J2 bis", url:"https://kxs.fr/files/sujets/2025/ecrit/terminale-2025-amerique-nord-jour-2-bis.pdf", themes:["poo","graphes","bdd","sql"], diff:""},
  {annee:"2025", ex:1, sujet:"Asie J1", url:"https://kxs.fr/files/sujets/2025/ecrit/terminale-2025-asie-jour-1.pdf", themes:["decidabilite","python"], diff:""},
  {annee:"2025", ex:2, sujet:"Asie J1", url:"https://kxs.fr/files/sujets/2025/ecrit/terminale-2025-asie-jour-1.pdf", themes:["arbres","python"], diff:""},
  {annee:"2025", ex:3, sujet:"Asie J1", url:"https://kxs.fr/files/sujets/2025/ecrit/terminale-2025-asie-jour-1.pdf", themes:["dictionnaires","bdd","sql","python"], diff:""},
  {annee:"2025", ex:1, sujet:"Asie J2", url:"https://kxs.fr/files/sujets/2025/ecrit/terminale-2025-asie-jour-2.pdf", themes:["poo","python"], diff:""},
  {annee:"2025", ex:2, sujet:"Asie J2", url:"https://kxs.fr/files/sujets/2025/ecrit/terminale-2025-asie-jour-2.pdf", themes:["processus","python"], diff:""},
  {annee:"2025", ex:3, sujet:"Asie J2", url:"https://kxs.fr/files/sujets/2025/ecrit/terminale-2025-asie-jour-2.pdf", themes:["bdd","sql","dictionnaires","recursivite","poo","arbres"], diff:""},
  {annee:"2025", ex:1, sujet:"Métropole J1", url:"https://kxs.fr/files/sujets/2025/ecrit/terminale-2025-metropole-jour-1.pdf", themes:["bdd","sql"], diff:""},
  {annee:"2025", ex:2, sujet:"Métropole J1", url:"https://kxs.fr/files/sujets/2025/ecrit/terminale-2025-metropole-jour-1.pdf", themes:["processus","python"], diff:""},
  {annee:"2025", ex:3, sujet:"Métropole J1", url:"https://kxs.fr/files/sujets/2025/ecrit/terminale-2025-metropole-jour-1.pdf", themes:["reseaux","routage","abr","python"], diff:""},

  // ===== 2024 =====
  {annee:"2024", ex:1, sujet:"Amérique du nord J1", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-amerique-nord-jour-1.pdf", themes:["poo","files","processus","python"], diff:"tres"},
  {annee:"2024", ex:2, sujet:"Amérique du nord J1", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-amerique-nord-jour-1.pdf", themes:["graphes","python"], diff:"tres"},
  {annee:"2024", ex:3, sujet:"Amérique du nord J1", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-amerique-nord-jour-1.pdf", themes:["python","bdd","sql"], diff:""},
  {annee:"2024", ex:1, sujet:"Amérique du nord J2", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-amerique-nord-jour-2.pdf", themes:["tris","python"], diff:"tres"},
  {annee:"2024", ex:2, sujet:"Amérique du nord J2", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-amerique-nord-jour-2.pdf", themes:["bdd","sql"], diff:""},
  {annee:"2024", ex:3, sujet:"Amérique du nord J2", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-amerique-nord-jour-2.pdf", themes:["poo","listes_chainees","recursivite","reseaux","architecture"], diff:"tres"},
  {annee:"2024", ex:1, sujet:"Centres étrangers G1 J1", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-centres-etrangers-groupe-1-jour-1.pdf", themes:["python","prog_dynamique","graphes","reseaux"], diff:"tres"},
  {annee:"2024", ex:2, sujet:"Centres étrangers G1 J1", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-centres-etrangers-groupe-1-jour-1.pdf", themes:["reseaux","routage"], diff:"difficile"},
  {annee:"2024", ex:3, sujet:"Centres étrangers G1 J1", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-centres-etrangers-groupe-1-jour-1.pdf", themes:["python","poo","bdd","sql"], diff:""},
  {annee:"2024", ex:1, sujet:"Centres étrangers G1 J2", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-centres-etrangers-groupe-1-jour-2.pdf", themes:["python","poo","recursivite"], diff:""},
  {annee:"2024", ex:2, sujet:"Centres étrangers G1 J2", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-centres-etrangers-groupe-1-jour-2.pdf", themes:["poo","recursivite","arbres","systemes"], diff:"difficile"},
  {annee:"2024", ex:3, sujet:"Centres étrangers G1 J2", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-centres-etrangers-groupe-1-jour-2.pdf", themes:["bdd","sql","python"], diff:""},
  {annee:"2024", ex:1, sujet:"Asie J1", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-asie-jour-1.pdf", themes:["python","poo"], diff:""},
  {annee:"2024", ex:2, sujet:"Asie J1", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-asie-jour-1.pdf", themes:["graphes","piles","parcours_graphes","python"], diff:""},
  {annee:"2024", ex:3, sujet:"Asie J1", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-asie-jour-1.pdf", themes:["python","poo","bdd","sql"], diff:""},
  {annee:"2024", ex:1, sujet:"Asie J2", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-asie-jour-2.pdf", themes:["dictionnaires","python","diviser"], diff:""},
  {annee:"2024", ex:2, sujet:"Asie J2", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-asie-jour-2.pdf", themes:["poo","piles","python"], diff:""},
  {annee:"2024", ex:3, sujet:"Asie J2", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-asie-jour-2.pdf", themes:["bdd","sql","python"], diff:""},
  {annee:"2024", ex:1, sujet:"Métropole juin J1", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-metropole-juin-sujet-1.pdf", themes:["poo","graphes"], diff:""},
  {annee:"2024", ex:2, sujet:"Métropole juin J1", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-metropole-juin-sujet-1.pdf", themes:["reseaux","routage","bdd","sql"], diff:"difficile"},
  {annee:"2024", ex:3, sujet:"Métropole juin J1", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-metropole-juin-sujet-1.pdf", themes:["poo","abr","recursivite"], diff:""},
  {annee:"2024", ex:1, sujet:"Métropole juin J2", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-metropole-juin-sujet-2.pdf", themes:["bdd","sql","reseaux"], diff:""},
  {annee:"2024", ex:2, sujet:"Métropole juin J2", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-metropole-juin-sujet-2.pdf", themes:["poo","tris","gloutons","recursivite","assertions"], diff:"difficile"},
  {annee:"2024", ex:3, sujet:"Métropole juin J2", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-metropole-juin-sujet-2.pdf", themes:["poo","graphes","dictionnaires","parcours_graphes"], diff:"difficile"},
  {annee:"2024", ex:1, sujet:"Métropole sept. J1", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-metropole-septembre-sujet-1.pdf", themes:["python","bdd","sql"], diff:""},
  {annee:"2024", ex:2, sujet:"Métropole sept. J1", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-metropole-septembre-sujet-1.pdf", themes:["reseaux","routage","graphes"], diff:"difficile"},
  {annee:"2024", ex:3, sujet:"Métropole sept. J1", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-metropole-septembre-sujet-1.pdf", themes:["piles","poo","python"], diff:""},
  {annee:"2024", ex:1, sujet:"Métropole sept. J2", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-metropole-septembre-sujet-2.pdf", themes:["python","decidabilite"], diff:""},
  {annee:"2024", ex:2, sujet:"Métropole sept. J2", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-metropole-septembre-sujet-2.pdf", themes:["python","poo","piles"], diff:""},
  {annee:"2024", ex:3, sujet:"Métropole sept. J2", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-metropole-septembre-sujet-2.pdf", themes:["reseaux","routage","bdd","sql"], diff:""},
  {annee:"2024", ex:1, sujet:"Polynésie J1", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-polynesie-jour-1.pdf", themes:["graphes","reseaux","routage"], diff:""},
  {annee:"2024", ex:2, sujet:"Polynésie J1", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-polynesie-jour-1.pdf", themes:["recursivite"], diff:""},
  {annee:"2024", ex:3, sujet:"Polynésie J1", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-polynesie-jour-1.pdf", themes:["dictionnaires","bdd","sql","python"], diff:""},
  {annee:"2024", ex:1, sujet:"Polynésie J2", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-polynesie-jour-2.pdf", themes:["files","piles","graphes","parcours_graphes"], diff:""},
  {annee:"2024", ex:2, sujet:"Polynésie J2", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-polynesie-jour-2.pdf", themes:["abr","poo","recursivite"], diff:"difficile"},
  {annee:"2024", ex:3, sujet:"Polynésie J2", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-polynesie-jour-2.pdf", themes:["reseaux","routage","python","bdd","sql"], diff:""},
  {annee:"2024", ex:1, sujet:"Sujet zéro A", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-sujet-zero-A.pdf", themes:["architecture","reseaux","routage"], diff:"difficile"},
  {annee:"2024", ex:2, sujet:"Sujet zéro A", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-sujet-zero-A.pdf", themes:["python","dictionnaires","dichotomie"], diff:"tres"},
  {annee:"2024", ex:3, sujet:"Sujet zéro A", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-sujet-zero-A.pdf", themes:["graphes","parcours_graphes","bdd","sql"], diff:""},
  {annee:"2024", ex:1, sujet:"Sujet zéro B", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-sujet-zero-B.pdf", themes:["recursivite","prog_dynamique"], diff:"tres"},
  {annee:"2024", ex:2, sujet:"Sujet zéro B", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-sujet-zero-B.pdf", themes:["systemes","processus"], diff:""},
  {annee:"2024", ex:3, sujet:"Sujet zéro B", url:"https://kxs.fr/files/sujets/2024/ecrit/terminale-2024-sujet-zero-B.pdf", themes:["dictionnaires","poo","bdd","sql"], diff:""},

  // ===== 2023 =====
  {annee:"2023", ex:1, sujet:"Amérique du nord J1", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-amerique-du-nord-jour-1.pdf", themes:["python","bdd","sql"], diff:""},
  {annee:"2023", ex:2, sujet:"Amérique du nord J1", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-amerique-du-nord-jour-1.pdf", themes:["processus","python"], diff:""},
  {annee:"2023", ex:3, sujet:"Amérique du nord J1", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-amerique-du-nord-jour-1.pdf", themes:["poo","arbres"], diff:""},
  {annee:"2023", ex:1, sujet:"Amérique du nord J2", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-amerique-du-nord-jour-2.pdf", themes:["bdd","sql","routage"], diff:""},
  {annee:"2023", ex:2, sujet:"Amérique du nord J2", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-amerique-du-nord-jour-2.pdf", themes:["arbres","abr","python"], diff:""},
  {annee:"2023", ex:3, sujet:"Amérique du nord J2", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-amerique-du-nord-jour-2.pdf", themes:["systemes","python","dictionnaires"], diff:""},
  {annee:"2023", ex:1, sujet:"Amérique du sud J1", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-amerique-du-sud-jour-1.pdf", themes:["poo","routage","bdd","sql"], diff:""},
  {annee:"2023", ex:2, sujet:"Amérique du sud J1", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-amerique-du-sud-jour-1.pdf", themes:["arbres","files","python"], diff:""},
  {annee:"2023", ex:3, sujet:"Amérique du sud J1", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-amerique-du-sud-jour-1.pdf", themes:["python"], diff:""},
  {annee:"2023", ex:1, sujet:"Amérique du sud J2", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-amerique-du-sud-jour-2.pdf", themes:["files","piles","arbres","python"], diff:""},
  {annee:"2023", ex:2, sujet:"Amérique du sud J2", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-amerique-du-sud-jour-2.pdf", themes:["reseaux","bdd","sql"], diff:""},
  {annee:"2023", ex:3, sujet:"Amérique du sud J2", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-amerique-du-sud-jour-2.pdf", themes:["python"], diff:""},
  {annee:"2023", ex:1, sujet:"Centres étrangers J1", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-centres-etrangers-jour-1.pdf", themes:["bdd","sql"], diff:""},
  {annee:"2023", ex:2, sujet:"Centres étrangers J1", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-centres-etrangers-jour-1.pdf", themes:["reseaux","routage"], diff:""},
  {annee:"2023", ex:3, sujet:"Centres étrangers J1", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-centres-etrangers-jour-1.pdf", themes:["files","python"], diff:""},
  {annee:"2023", ex:1, sujet:"Centres étrangers J2", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-centres-etrangers-jour-2.pdf", themes:["reseaux","routage"], diff:""},
  {annee:"2023", ex:2, sujet:"Centres étrangers J2", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-centres-etrangers-jour-2.pdf", themes:["bdd","sql"], diff:""},
  {annee:"2023", ex:3, sujet:"Centres étrangers J2", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-centres-etrangers-jour-2.pdf", themes:["python","abr","listes_chainees"], diff:""},
  {annee:"2023", ex:1, sujet:"Liban J1", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-liban-jour-1.pdf", themes:["python","recursivite"], diff:""},
  {annee:"2023", ex:2, sujet:"Liban J1", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-liban-jour-1.pdf", themes:["bdd","sql","reseaux"], diff:""},
  {annee:"2023", ex:3, sujet:"Liban J1", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-liban-jour-1.pdf", themes:["piles","arbres"], diff:""},
  {annee:"2023", ex:1, sujet:"Liban J2", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-liban-jour-2.pdf", themes:["bdd","sql"], diff:""},
  {annee:"2023", ex:2, sujet:"Liban J2", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-liban-jour-2.pdf", themes:["reseaux","python"], diff:""},
  {annee:"2023", ex:3, sujet:"Liban J2", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-liban-jour-2.pdf", themes:["arbres","python"], diff:""},
  {annee:"2023", ex:1, sujet:"Métropole juin J1", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-metropole-juin-jour-1.pdf", themes:["bdd","sql"], diff:""},
  {annee:"2023", ex:2, sujet:"Métropole juin J1", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-metropole-juin-jour-1.pdf", themes:["reseaux","routage"], diff:""},
  {annee:"2023", ex:3, sujet:"Métropole juin J1", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-metropole-juin-jour-1.pdf", themes:["poo","python"], diff:""},
  {annee:"2023", ex:1, sujet:"Métropole juin J2", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-metropole-juin-jour-2.pdf", themes:["reseaux","routage"], diff:""},
  {annee:"2023", ex:2, sujet:"Métropole juin J2", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-metropole-juin-jour-2.pdf", themes:["bdd","sql"], diff:""},
  {annee:"2023", ex:3, sujet:"Métropole juin J2", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-metropole-juin-jour-2.pdf", themes:["arbres","files","poo","python"], diff:""},
  {annee:"2023", ex:1, sujet:"Polynésie J1", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-polynesie-jour-1.pdf", themes:["bdd","sql"], diff:""},
  {annee:"2023", ex:2, sujet:"Polynésie J1", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-polynesie-jour-1.pdf", themes:["processus","poo","python"], diff:""},
  {annee:"2023", ex:3, sujet:"Polynésie J1", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-polynesie-jour-1.pdf", themes:["poo","diviser"], diff:""},
  {annee:"2023", ex:1, sujet:"Polynésie J2", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-polynesie-jour-2.pdf", themes:["arbres","abr","poo","recursivite"], diff:"difficile"},
  {annee:"2023", ex:2, sujet:"Polynésie J2", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-polynesie-jour-2.pdf", themes:["bdd","sql"], diff:""},
  {annee:"2023", ex:3, sujet:"Polynésie J2", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-polynesie-jour-2.pdf", themes:["architecture","processus","systemes"], diff:""},
  {annee:"2023", ex:1, sujet:"Réunion J1", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-reunion-jour-1.pdf", themes:["reseaux","routage"], diff:""},
  {annee:"2023", ex:2, sujet:"Réunion J1", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-reunion-jour-1.pdf", themes:["poo","dictionnaires","python"], diff:""},
  {annee:"2023", ex:3, sujet:"Réunion J1", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-reunion-jour-1.pdf", themes:["bdd","sql"], diff:""},
  {annee:"2023", ex:1, sujet:"Réunion J2", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-reunion-jour-2.pdf", themes:["abr","poo","recursivite"], diff:"difficile"},
  {annee:"2023", ex:2, sujet:"Réunion J2", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-reunion-jour-2.pdf", themes:["reseaux","routage"], diff:""},
  {annee:"2023", ex:3, sujet:"Réunion J2", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-reunion-jour-2.pdf", themes:["bdd","sql"], diff:""},
  {annee:"2023", ex:1, sujet:"Sujet zéro A", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-sujet-zero-A.pdf", themes:["bdd","sql"], diff:""},
  {annee:"2023", ex:2, sujet:"Sujet zéro A", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-sujet-zero-A.pdf", themes:["architecture","reseaux","systemes"], diff:""},
  {annee:"2023", ex:3, sujet:"Sujet zéro A", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-sujet-zero-A.pdf", themes:["abr","poo","python"], diff:""},
  {annee:"2023", ex:1, sujet:"Sujet zéro B", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-sujet-zero-B.pdf", themes:["systemes","bdd","sql","reseaux"], diff:""},
  {annee:"2023", ex:2, sujet:"Sujet zéro B", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-sujet-zero-B.pdf", themes:["recursivite","python"], diff:""},
  {annee:"2023", ex:3, sujet:"Sujet zéro B", url:"https://kxs.fr/files/sujets/2023/ecrit/terminale-2023-sujet-zero-B.pdf", themes:["abr","poo"], diff:""},

  // ===== 2022 =====
  {annee:"2022", ex:1, sujet:"Rattrapage J1", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-rattrapage-jour-1.pdf", themes:["abr"], diff:""},
  {annee:"2022", ex:2, sujet:"Rattrapage J1", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-rattrapage-jour-1.pdf", themes:["poo","python","recursivite"], diff:""},
  {annee:"2022", ex:3, sujet:"Rattrapage J1", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-rattrapage-jour-1.pdf", themes:["bdd","sql"], diff:""},
  {annee:"2022", ex:4, sujet:"Rattrapage J1", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-rattrapage-jour-1.pdf", themes:["architecture","processus","reseaux","routage"], diff:""},
  {annee:"2022", ex:5, sujet:"Rattrapage J1", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-rattrapage-jour-1.pdf", themes:["files","python"], diff:""},
  {annee:"2022", ex:2, sujet:"Amérique du sud J1", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-amerique-sud-jour-1.pdf", themes:["tris","python"], diff:""},
  {annee:"2022", ex:3, sujet:"Amérique du sud J1", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-amerique-sud-jour-1.pdf", themes:["arbres"], diff:""},
  {annee:"2022", ex:5, sujet:"Amérique du sud J1", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-amerique-sud-jour-1.pdf", themes:["reseaux","routage"], diff:""},
  {annee:"2022", ex:1, sujet:"Amérique du sud J2", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-amerique-sud-jour-2.pdf", themes:["python","recursivite"], diff:""},
  {annee:"2022", ex:2, sujet:"Amérique du sud J2", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-amerique-sud-jour-2.pdf", themes:["reseaux","routage"], diff:""},
  {annee:"2022", ex:4, sujet:"Amérique du sud J2", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-amerique-sud-jour-2.pdf", themes:["recursivite","diviser","python"], diff:""},
  {annee:"2022", ex:5, sujet:"Amérique du sud J2", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-amerique-sud-jour-2.pdf", themes:["arbres","poo","recursivite"], diff:""},
  {annee:"2022", ex:5, sujet:"Centres étrangers J1", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-centres-etrangers-jour-1.pdf", themes:["architecture","reseaux","routage"], diff:""},
  {annee:"2022", ex:5, sujet:"Centres étrangers J2", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-centres-etrangers-jour-2.pdf", themes:["architecture","systemes","reseaux"], diff:""},
  {annee:"2022", ex:2, sujet:"Amérique du nord J1", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-amerique-nord-jour-1.pdf", themes:["reseaux","routage"], diff:""},
  {annee:"2022", ex:3, sujet:"Amérique du nord J1", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-amerique-nord-jour-1.pdf", themes:["abr"], diff:""},
  {annee:"2022", ex:1, sujet:"Amérique du nord J2", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-amerique-nord-jour-2.pdf", themes:["abr","poo","listes_chainees"], diff:""},
  {annee:"2022", ex:2, sujet:"Asie J2", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-asie-jour-2.pdf", themes:["abr"], diff:""},
  {annee:"2022", ex:1, sujet:"Métropole S1", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-metropole-sujet-1.pdf", themes:["piles","files","dictionnaires"], diff:""},
  {annee:"2022", ex:2, sujet:"Métropole S1", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-metropole-sujet-1.pdf", themes:["bdd","sql"], diff:""},
  {annee:"2022", ex:3, sujet:"Métropole S1", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-metropole-sujet-1.pdf", themes:["reseaux","routage"], diff:""},
  {annee:"2022", ex:4, sujet:"Métropole S1", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-metropole-sujet-1.pdf", themes:["arbres","diviser","recursivite"], diff:"difficile"},
  {annee:"2022", ex:5, sujet:"Métropole S1", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-metropole-sujet-1.pdf", themes:["poo"], diff:""},
  {annee:"2022", ex:1, sujet:"Métropole S2", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-metropole-sujet-2.pdf", themes:["abr","poo","recursivite"], diff:"difficile"},
  {annee:"2022", ex:3, sujet:"Métropole S2", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-metropole-sujet-2.pdf", themes:["reseaux","routage"], diff:""},
  {annee:"2022", ex:5, sujet:"Métropole S2", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-metropole-sujet-2.pdf", themes:["poo","diviser"], diff:""},
  {annee:"2022", ex:5, sujet:"Polynésie J1", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-polynesie-jour-1.pdf", themes:["arbres"], diff:""},
  {annee:"2022", ex:5, sujet:"Mayotte J1", url:"https://kxs.fr/files/sujets/2022/ecrit/terminale-2022-mayotte-jour-1.pdf", themes:["reseaux","routage"], diff:""},

  // ===== 2021 =====
  {annee:"2021", ex:5, sujet:"Sujet zéro", url:"https://kxs.fr/files/sujets/2021/ecrit/terminale-2021-sujet-0.pdf", themes:["reseaux","routage"], diff:""},
  {annee:"2021", ex:3, sujet:"Sujet zéro", url:"https://kxs.fr/files/sujets/2021/ecrit/terminale-2021-sujet-0.pdf", themes:["arbres","abr","python"], diff:""},
  {annee:"2021", ex:4, sujet:"Amérique du nord S1", url:"https://kxs.fr/files/sujets/2021/ecrit/terminale-2021-amerique-nord-sujet-1.pdf", themes:["arbres"], diff:""},
  {annee:"2021", ex:4, sujet:"Centres étrangers S1", url:"https://kxs.fr/files/sujets/2021/ecrit/terminale-2021-centres-etrangers-sujet-1.pdf", themes:["reseaux","routage","python"], diff:""},
  {annee:"2021", ex:3, sujet:"Centres étrangers S1", url:"https://kxs.fr/files/sujets/2021/ecrit/terminale-2021-centres-etrangers-sujet-1.pdf", themes:["abr"], diff:""},
  {annee:"2021", ex:1, sujet:"Métropole S1", url:"https://kxs.fr/files/sujets/2021/ecrit/terminale-2021-metropole-sujet-1.pdf", themes:["abr","poo"], diff:""},
  {annee:"2021", ex:4, sujet:"Métropole S1", url:"https://kxs.fr/files/sujets/2021/ecrit/terminale-2021-metropole-sujet-1.pdf", themes:["tris","diviser","python"], diff:""},
  {annee:"2021", ex:5, sujet:"Métropole S1", url:"https://kxs.fr/files/sujets/2021/ecrit/terminale-2021-metropole-sujet-1.pdf", themes:["reseaux","routage"], diff:""},
  {annee:"2021", ex:3, sujet:"Métropole S2", url:"https://kxs.fr/files/sujets/2021/ecrit/terminale-2021-metropole-sujet-2.pdf", themes:["reseaux","routage"], diff:""},
  {annee:"2021", ex:1, sujet:"Polynésie S2", url:"https://kxs.fr/files/sujets/2021/ecrit/terminale-2021-polynesie-sujet-2.pdf", themes:["tris","python"], diff:""},
  {annee:"2021", ex:3, sujet:"Polynésie S2", url:"https://kxs.fr/files/sujets/2021/ecrit/terminale-2021-polynesie-sujet-2.pdf", themes:["abr","poo"], diff:""},
  {annee:"2021", ex:4, sujet:"Polynésie S2", url:"https://kxs.fr/files/sujets/2021/ecrit/terminale-2021-polynesie-sujet-2.pdf", themes:["architecture","reseaux","routage"], diff:""},
  {annee:"2021", ex:1, sujet:"Métropole sept. S1", url:"https://kxs.fr/files/sujets/2021/ecrit/terminale-2021-metropole-septembre-sujet-1.pdf", themes:["reseaux","routage"], diff:""},
  {annee:"2021", ex:2, sujet:"Métropole sept. S1", url:"https://kxs.fr/files/sujets/2021/ecrit/terminale-2021-metropole-septembre-sujet-1.pdf", themes:["dichotomie","recursivite","python"], diff:""},
  {annee:"2021", ex:1, sujet:"Métropole sept. S2", url:"https://kxs.fr/files/sujets/2021/ecrit/terminale-2021-metropole-septembre-sujet-2.pdf", themes:["reseaux","routage"], diff:""},
];

const LABELS = {
  arbres:"Arbres binaires", abr:"ABR", graphes:"Graphes",
  piles:"Piles", files:"Files", listes_chainees:"Listes chaînées",
  dictionnaires:"Dictionnaires", recursivite:"Récursivité",
  tris:"Tris", gloutons:"Gloutons", diviser:"Diviser pour régner",
  parcours_graphes:"Parcours de graphes", dichotomie:"Dichotomie",
  poo:"POO", python:"Python", assertions:"Assertions",
  bdd:"BDD", sql:"SQL", reseaux:"Réseaux", routage:"Routage",
  architecture:"Architecture", systemes:"Syst. exploitation",
  processus:"Processus", prog_dynamique:"Prog. dynamique",
  decidabilite:"Décidabilité"
};

function render() {
  const theme = document.getElementById('filtre-theme').value;
  const annee = document.getElementById('filtre-annee').value;
  const ex    = document.getElementById('filtre-ex').value;

  const filtered = DATA.filter(d => {
    if (theme && !d.themes.includes(theme)) return false;
    if (annee && d.annee !== annee) return false;
    if (ex    && String(d.ex) !== ex) return false;
    return true;
  });

  document.getElementById('nb-resultats').textContent = filtered.length;

  const tbody = document.getElementById('tbody');
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:2rem;opacity:.5;">Aucun exercice trouvé</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(d => {
    const diffBadge = d.diff === 'tres'
      ? '<span class="diff-badge diff-tres">très difficile</span>'
      : d.diff === 'difficile'
      ? '<span class="diff-badge diff-difficile">difficile</span>'
      : '';

    const tags = d.themes.map(t => {
      const isHL = theme && t === theme;
      return `<span class="tag${isHL ? ' highlight' : ''}">${LABELS[t] || t}</span>`;
    }).join('');

    return `<tr>
      <td class="annee">${d.annee}</td>
      <td class="ex">Ex ${d.ex}</td>
      <td><a href="${d.url}" target="_blank">${d.sujet} ↗</a>${diffBadge}</td>
      <td>${tags}</td>
    </tr>`;
  }).join('');
}

document.getElementById('filtre-theme').addEventListener('change', render);
document.getElementById('filtre-annee').addEventListener('change', render);
document.getElementById('filtre-ex').addEventListener('change', render);

render();
</script>
