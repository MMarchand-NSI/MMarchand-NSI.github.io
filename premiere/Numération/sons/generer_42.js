/**
 * Génère la prononciation de "42" dans 30 langues via Google Cloud
 * Text-to-Speech, avec les mêmes noms de fichiers que la version
 * espeak-ng précédente.
 *
 * PRINCIPE IMPORTANT : ce script interroge d'abord l'API
 * "voices:list" pour CHAQUE langue, afin de laisser Google
 * confirmer lui-même le code de langue exact et le nom de voix
 * disponible, plutôt que de coder ces informations en dur (ce qui
 * risquerait d'utiliser des codes obsolètes ou incorrects).
 *
 * PRÉREQUIS
 * ---------
 * 1. Un projet Google Cloud avec l'API "Cloud Text-to-Speech" activée :
 *    https://console.cloud.google.com/apis/library/texttospeech.googleapis.com
 * 2. Une clé API (APIs & Services > Identifiants > Créer des identifiants
 *    > Clé API), ou des identifiants par compte de service.
 * 3. Node.js installé (version 18+ recommandée pour fetch natif).
 *
 * UTILISATION
 * -----------
 *   node generer_42.js VOTRE_CLE_API
 *
 * Le script crée un dossier ./sorties_mp3/ contenant les 30 fichiers,
 * avec les mêmes noms que le zip précédent (ex: francais_42.mp3).
 */

const fs = require('fs');
const path = require('path');

const API_KEY = process.argv[2];

if (!API_KEY) {
  console.error('Usage: node generer_42.js VOTRE_CLE_API');
  process.exit(1);
}

const NOMBRE = '42';
const DOSSIER_SORTIE = path.join(__dirname, 'sorties_mp3');

// Préférence de qualité de voix : Chirp3-HD (la plus naturelle) en
// priorité, puis repli progressif si non disponible pour la langue.
// Cet ordre est confirmé par la documentation officielle Google Cloud
// (catégories "Premium" Chirp3-HD/Neural2/Wavenet vs "Standard").
const ORDRE_PREFERENCE_TYPE = ['Chirp3-HD', 'Neural2', 'Wavenet', 'Standard'];

// Association code_langue_attendu -> nom_de_fichier_voulu
// Les codes ici sont des PRÉFIXES de recherche (ex: "fr-FR" est cherché
// tel quel, mais pour des langues où Google utilise un code régional
// précis comme "cmn-CN" pour le mandarin, on donne le code complet
// connu de la documentation officielle Google Cloud TTS.
const LANGUES = [
  { recherche: 'fr-FR', nomFichier: 'francais' },
  { recherche: 'en-US', nomFichier: 'anglais_americain' },
  { recherche: 'en-GB', nomFichier: 'anglais_britannique' },
  { recherche: 'de-DE', nomFichier: 'allemand' },
  { recherche: 'es-ES', nomFichier: 'espagnol' },
  { recherche: 'it-IT', nomFichier: 'italien' },
  { recherche: 'pt-PT', nomFichier: 'portugais' },
  { recherche: 'nl-NL', nomFichier: 'neerlandais' },
  { recherche: 'ru-RU', nomFichier: 'russe' },
  { recherche: 'pl-PL', nomFichier: 'polonais' },
  { recherche: 'el-GR', nomFichier: 'grec' },
  { recherche: 'tr-TR', nomFichier: 'turc' },
  { recherche: 'ar-XA', nomFichier: 'arabe' },           // ar-XA = arabe standard moderne (confirmé doc Google)
  { recherche: 'he-IL', nomFichier: 'hebreu' },
  { recherche: 'hi-IN', nomFichier: 'hindi' },
  { recherche: 'ja-JP', nomFichier: 'japonais' },
  { recherche: 'cmn-CN', nomFichier: 'chinois_mandarin' }, // mandarin (Chine continentale)
  { recherche: 'ko-KR', nomFichier: 'coreen' },
  { recherche: 'vi-VN', nomFichier: 'vietnamien' },
  { recherche: 'th-TH', nomFichier: 'thai' },
  { recherche: 'id-ID', nomFichier: 'indonesien' },
  { recherche: 'sv-SE', nomFichier: 'suedois' },
  { recherche: 'fi-FI', nomFichier: 'finnois' },
  { recherche: 'da-DK', nomFichier: 'danois' },
  { recherche: 'nb-NO', nomFichier: 'norvegien' },
  { recherche: 'cs-CZ', nomFichier: 'tcheque' },
  { recherche: 'hu-HU', nomFichier: 'hongrois' },
  { recherche: 'ro-RO', nomFichier: 'roumain' },
  { recherche: 'uk-UA', nomFichier: 'ukrainien' },
  { recherche: 'fa-IR', nomFichier: 'persan' },           // Voir avertissement ci-dessous
];

async function listerVoixPourLangue(codeLangue) {
  const url = `https://texttospeech.googleapis.com/v1/voices?languageCode=${codeLangue}&key=${API_KEY}`;
  const reponse = await fetch(url);
  if (!reponse.ok) {
    throw new Error(`Erreur API voices:list pour ${codeLangue}: ${reponse.status} ${await reponse.text()}`);
  }
  const data = await reponse.json();
  return data.voices || [];
}

function choisirMeilleureVoix(voix) {
  for (const type of ORDRE_PREFERENCE_TYPE) {
    const trouvee = voix.find(v => v.name.includes(type));
    if (trouvee) return trouvee;
  }
  // Repli : première voix disponible, quelle que soit sa catégorie
  return voix[0] || null;
}

async function synthetiser(texte, voixChoisie, codeLangueReel) {
  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;
  const reponse = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      input: { text: texte },
      voice: { languageCode: codeLangueReel, name: voixChoisie.name },
      audioConfig: { audioEncoding: 'MP3' },
    }),
  });
  if (!reponse.ok) {
    throw new Error(`Erreur text:synthesize: ${reponse.status} ${await reponse.text()}`);
  }
  const data = await reponse.json();
  return Buffer.from(data.audioContent, 'base64');
}

async function main() {
  fs.mkdirSync(DOSSIER_SORTIE, { recursive: true });

  const resultats = [];

  for (const { recherche, nomFichier } of LANGUES) {
    try {
      const voixDisponibles = await listerVoixPourLangue(recherche);

      if (voixDisponibles.length === 0) {
        console.error(`ÉCHEC  ${recherche} (${nomFichier}) : aucune voix trouvée pour ce code de langue. Vérifiez le code sur https://cloud.google.com/text-to-speech/docs/voices`);
        resultats.push({ nomFichier, recherche, statut: 'échec', raison: 'aucune voix' });
        continue;
      }

      const voixChoisie = choisirMeilleureVoix(voixDisponibles);
      const codeLangueReel = voixChoisie.languageCodes[0];

      const audioBuffer = await synthetiser(NOMBRE, voixChoisie, codeLangueReel);

      const cheminFichier = path.join(DOSSIER_SORTIE, `${nomFichier}_42.mp3`);
      fs.writeFileSync(cheminFichier, audioBuffer);

      console.log(`OK     ${recherche} (${nomFichier}) -> voix "${voixChoisie.name}" -> ${cheminFichier}`);
      resultats.push({ nomFichier, recherche, statut: 'ok', voix: voixChoisie.name });
    } catch (erreur) {
      console.error(`ÉCHEC  ${recherche} (${nomFichier}) : ${erreur.message}`);
      resultats.push({ nomFichier, recherche, statut: 'échec', raison: erreur.message });
    }
  }

  console.log('\n--- Résumé ---');
  const ok = resultats.filter(r => r.statut === 'ok').length;
  const echecs = resultats.filter(r => r.statut === 'échec');
  console.log(`${ok}/${LANGUES.length} fichiers générés avec succès dans ${DOSSIER_SORTIE}`);
  if (echecs.length > 0) {
    console.log('Échecs :');
    echecs.forEach(e => console.log(`  - ${e.nomFichier} (${e.recherche}): ${e.raison}`));
  }
}

main().catch(erreur => {
  console.error('Erreur fatale:', erreur.message);
  process.exit(1);
});
