# Mini LLM : implémentation pédagogique

*Complément technique à l'article [Ce que fait vraiment un grand modèle de langage](intro_llm_philo.md)*

Ce document est organisé en trois parties progressives. La première contient le code d'un LLM entraîné depuis zéro, concept par concept, en suivant l'ordre de l'article. La deuxième utilise un modèle pré-entraîné sur des milliards de tokens. La troisième aboutit à quelque chose qui ressemble au mécanisme question-réponse de ChatGPT. Chaque partie est un programme Python indépendant, fourni tel quel et prêt à être exécuté sans modification. Les parties 2 et 3 téléchargent un modèle au premier lancement, puis le mettent en cache localement : les exécutions suivantes ne nécessitent aucune connexion, et aucune donnée n'est envoyée à l'extérieur. Tout se passe sur la machine.

La technologie est entièrement ouverte : n'importe qui peut construire un LLM. Ce que ce code démontre n'est pas un secret industriel. Le seul obstacle réel au passage à l'échelle est matériel : les capacités émergentes décrites dans l'article (raisonnement apparent, traduction, génération cohérente sur de longs textes) n'apparaissent qu'à partir d'un certain volume de paramètres et de données d'entraînement, ce qui nécessite des infrastructures inaccessibles à la plupart.

Le code de la première partie fait exactement ce que fait GPT-4 en une centaine de lignes : prédire le token suivant. Cette centaine de lignes s'appuie sur PyTorch, qui fournit les opérations mathématiques nécessaires. PyTorch fait les mathématiques, ces lignes font l'architecture. La capacité à suivre une instruction ou tenir une conversation n'est pas dans l'architecture. Elle résulte d'une étape d'entraînement supplémentaire (fine-tuning sur des paires question-réponse annotées, décrit dans l'article comme RLHF) : le modèle apprend que dans un certain format d'entrée, la continuation statistiquement attendue est une réponse directe. Ce n'est pas de l'émergence au sens strict, mais un apprentissage explicite qui s'appuie sur la compétence latente acquise pendant le pré-entraînement à grande échelle. La troisième partie de ce document illustre exactement ce point.

Pour donner une idée des ordres de grandeur : entraîner un modèle de la taille de GPT-4 est estimé à plusieurs dizaines voire centaines de millions de dollars en calcul seul, mobilisant des clusters de plusieurs milliers de GPU spécialisés (un GPU H100 coûte environ 30 000 dollars l'unité) pendant des mois. À cela s'ajoutent les coûts humains : des centaines d'ingénieurs et chercheurs, des milliers d'annotateurs humains chargés d'évaluer les sorties du modèle pour l'affiner, et des équipes dédiées à la sécurité. Meta, Google ou OpenAI dépensent plusieurs milliards de dollars par an en infrastructure d'entraînement.


---

## La tokenisation en détail

L'article explique que le texte est découpé en **tokens** avant tout calcul. Ce découpage semble anodin, mais il a des conséquences concrètes sur ce que le modèle peut faire ou rater.

### Ce que fait le code ici

Ce programme utilise un vrai tokeniseur BPE, entraîné depuis zéro sur le corpus au démarrage via la bibliothèque `tokenizers`. Aucun modèle pré-entraîné n'est téléchargé. Le vocabulaire est limité à `TAILLE_VOCAB` sous-mots fréquents ; les autres sont décomposés en fragments connus. Par exemple, sur un corpus de Maupassant, "mangeons" pourrait devenir `["mange", "ons"]`.

Ce découpage est purement statistique : il reflète les fréquences de cooccurrence de caractères dans le corpus d'entraînement, pas la structure des mots. Le tokeniseur ne sait pas que "anti" est un préfixe, que "tion" est un suffixe, ni que "constitutionnel" est un adjectif dérivé d'un nom. En pratique, le tokeniseur de GPT-4 découperait "anticonstitutionnellement" en quelque chose comme `["anti", "con", "stit", "ution", "nellement"]` simplement parce que ces fragments apparaissent fréquemment ensemble dans les textes, sans aucune analyse morphologique. Le mot "chat" serait probablement un token unique. Le mot "tokenisation" serait peut-être deux tokens.

### Pourquoi ça explique certaines limites

Ce mécanisme éclaire directement des comportements étranges des LLMs :

**Les LLMs comptent mal les lettres.** Demander combien de "r" il y a dans "strawberry" est difficile parce que le modèle ne voit pas des lettres : il voit des blocs. "strawberry" peut être un token unique, ou découpé en `["straw", "berry"]`. Dans les deux cas, les lettres individuelles ne sont pas des unités de traitement.

**Rimes, acrostiches et anagrammes sont difficiles.** Ces exercices supposent de travailler au niveau de la lettre. Mais le modèle raisonne au niveau du token, qui est souvent plus grand qu'un caractère.

**La coupure en tokens peut sembler arbitraire.** "chat" et "Chat" (avec majuscule) peuvent être deux tokens différents. Un espace avant un mot peut faire partie du token. Ces asymétries viennent directement de la distribution statistique du corpus d'entraînement.

### Le compromis fondamental

Le choix du niveau de tokenisation est un compromis entre deux contraintes opposées :

- **Vocabulaire trop petit** (niveau caractère) : chaque token est peu informatif, les séquences sont très longues, le modèle doit "mémoriser" des relations sur de très longues distances.
- **Vocabulaire trop grand** (niveau mot) : les mots rares ou inconnus ne sont pas représentés, le vocabulaire explose avec les langues agglutinantes, et les relations morphologiques (conjugaisons, déclinaisons) doivent être apprises indépendamment pour chaque forme.

BPE trouve un équilibre pragmatique : les fragments courants deviennent des tokens entiers, les mots rares sont décomposés en sous-unités connues.

---

## Le mécanisme d'attention

Pour prédire le token suivant de "le chat dort sur le tapis", le modèle doit décider à quels tokens passés accorder de l'importance. "dort" et "sur" sont probablement plus utiles que "le" pour prédire "tapis". C'est ce que l'attention apprend à faire.

Pour chaque position, le modèle calcule un score de pertinence avec chacune des positions précédentes. Ces scores sont ensuite convertis en poids : un score élevé donne un poids proche de 1, un score faible donne un poids proche de 0, et l'ensemble somme à 1. La sortie est alors une combinaison de toutes les positions passées, avec plus de poids aux tokens jugés pertinents.

Deux points importants. D'abord, le modèle ne peut regarder qu'en arrière : pour prédire "tapis", il voit "le chat dort sur le" mais pas ce qui suit. C'est imposé par un masque qui neutralise les scores futurs. Ensuite, les scores de pertinence ne sont pas fixés à la main : ils sont appris pendant l'entraînement, par essais et erreurs sur des millions d'exemples.

---

## Ce qu'on observe

Voici une sortie typique après entraînement sur 10 000 mots de *Boule de suif* :

```
GÉNÉRATION (temperature=0.5)
  'avec' ->  avec dégoût que lui, sentant bien qu'il devait venir sur
  'suif' ->  suif fut entourée, interrogée, sollicitée par tout

VOTRE TOUR
Amorce : quels sont les noms des allemends?
  t=0.5 :  quels sont les noms des allemends? --je vous ferienaient; cinaire. auvait a quatre
```

Le résultat peut sembler décevant. C'est normal : les capacités remarquables des grands modèles n'émergent qu'à une échelle inaccessible ici, avec des milliards de paramètres et des centaines de milliards de tokens d'entraînement. Ce modèle ne dispose ni de l'un ni de l'autre. Le goulot d'étranglement est la phase d'entraînement, pas l'architecture, pas l'inférence. Or il est tout à fait possible d'utiliser un modèle pré-entraîné par les grands acteurs (Meta, Mistral, Google...) et de l'exécuter localement ou via une API, sans avoir à entraîner quoi que ce soit. C'est l'objet de la deuxième partie, après le code.

Ce qu'on observe est néanmoins instructif.

**Le modèle produit des mots parfois cohérents.** Avec 10 000 mots et une architecture minimaliste, certaines séquences sont lisibles. Des régularités ont été absorbées, même si le résultat reste très imparfait.

**Certaines sorties sont quasi-verbatim.** `suif fut entourée, interrogée, sollicitée par tout` reproduit presque mot pour mot une séquence du corpus. Le modèle a appris que "suif" est systématiquement suivi de cette continuation dans le texte original. Ce n'est pas de la compréhension : c'est de la mémorisation statistique.

**Le modèle ne répond pas aux questions.** À "quels sont les noms des allemends ?", il continue comme si c'était du texte narratif. C'est le point pédagogique central de tout le document : un LLM prédit le token suivant, il ne comprend pas ce qu'on lui demande. La différence entre ce modèle et ChatGPT n'est pas dans l'architecture, c'est dans l'entraînement : des millions de paires question-réponse annotées par des humains (le RLHF décrit dans l'article) ont appris au modèle que la continuation attendue après une question est une réponse. Pas parce qu'il comprend la question. Parce que c'est le pattern statistique dominant dans ces données.

---

## Code

### Ce qu'il faut installer

```
pip install torch tokenizers
```

- `torch` : environ 200 Mo (version CPU ; la version GPU avec CUDA dépasse 2 Go)
- `tokenizers` : quelques Mo

Aucun modèle n'est téléchargé : le programme entraîne son propre modèle depuis zéro sur le corpus Gutenberg au démarrage.

```python
"""
Un LLM minimaliste à des fins pédagogiques
"""

import urllib.request
import torch
import torch.nn as nn
import torch.nn.functional as F
from typing import Tuple
from tokenizers import Tokenizer
from tokenizers.models import BPE
from tokenizers.trainers import BpeTrainer
from tokenizers.pre_tokenizers import ByteLevel
from tokenizers.decoders import ByteLevel as ByteLevelDecoder

# ---------------------------------------------------------------------------
# CONSTANTES
#   Modifier ces valeurs pour expérimenter.
#   LONGUEUR_CONTEXTE : nombre de tokens passés que le modèle "voit"
#   DIM_EMBEDDING     : taille des vecteurs de représentation (article, §2)
#   EPOCHS / LR       : durée et vitesse d'entraînement
#   NB_MOTS           : nombre de mots chargés depuis Gutenberg PAR texte
#   TAILLE_VOCAB      : taille du vocabulaire BPE (sous-mots)
# ---------------------------------------------------------------------------

LONGUEUR_CONTEXTE: int   = 5
DIM_EMBEDDING:     int   = 32
EPOCHS:            int   = 300
LR:                float = 0.01
NB_MOTS:           int   = 10_000
TAILLE_VOCAB:      int   = 2_000
CORPUS_DEFAUT:     str   = "maupassant_boule_de_suif"

TEXTES: dict[str, str] = {
    "maupassant_boule_de_suif" : "https://www.gutenberg.org/cache/epub/10746/pg10746.txt",
    "flaubert_madame_bovary"   : "https://www.gutenberg.org/cache/epub/14155/pg14155.txt",
    "zola_germinal"            : "https://www.gutenberg.org/cache/epub/5711/pg5711.txt",
    "hugo_notre_dame_de_paris" : "https://www.gutenberg.org/cache/epub/19657/pg19657.txt",
}


def charger_corpus(nom: str, nb_mots: int = NB_MOTS) -> str:
    """Télécharge un texte Gutenberg et retourne les nb_mots premiers mots."""
    url = TEXTES[nom]
    with urllib.request.urlopen(url, timeout=10) as r:
        brut = r.read().decode("utf-8", errors="ignore")
    debut = brut.find("***") + 3
    debut = brut.find("\n", debut) + 1
    fin   = brut.rfind("*** END")
    corpus = " ".join(brut[debut:fin].lower().split()[:nb_mots])
    print(f"Corpus : {nom} ({len(corpus.split())} mots)")
    return corpus

CORPUS: str = charger_corpus(CORPUS_DEFAUT)

# ---------------------------------------------------------------------------
# 1. TOKENISATION BPE (Byte Pair Encoding)
#    Contrairement à la tokenisation par mots, BPE découpe en sous-mots :
#    "mangeons" → ["mange", "ons"]. Le vocabulaire reste petit (TAILLE_VOCAB)
#    et chaque token apparaît bien plus souvent → meilleur apprentissage.
# ---------------------------------------------------------------------------

def construire_tokeniseur(corpus: str, taille_vocab: int = TAILLE_VOCAB) -> Tokenizer:
    """Entraîne un tokeniseur BPE sur le corpus et retourne l'objet tokeniseur."""
    tok = Tokenizer(BPE())
    tok.pre_tokenizer = ByteLevel()
    tok.decoder       = ByteLevelDecoder()
    trainer = BpeTrainer(vocab_size=taille_vocab, initial_alphabet=ByteLevel.alphabet())
    tok.train_from_iterator([corpus], trainer=trainer)
    return tok

def preparer_corpus(
    texte: str,
    longueur_contexte: int,
    tokeniseur: Tokenizer,
) -> Tuple[torch.Tensor, torch.Tensor]:
    """
    Construit les tenseurs d'entraînement depuis un texte brut.
    X et Y sont des matrices d'entiers : chaque sous-mot est un nombre.

    longueur_contexte est la fenêtre de prédiction : le modèle voit exactement
    ces N tokens pour prédire le suivant, aussi bien à l'entraînement qu'à la
    génération. Ce paramètre doit être identique à celui passé à MiniTransformer.
    """
    ids = tokeniseur.encode(texte).ids
    sequences_x, sequences_y = [], []
    for i in range(len(ids) - longueur_contexte):
        sequences_x.append(ids[i : i + longueur_contexte])
        sequences_y.append(ids[i + longueur_contexte])
    return torch.tensor(sequences_x), torch.tensor(sequences_y)

# ---------------------------------------------------------------------------
# 2. MÉCANISME D'ATTENTION
#    Voir la section "Le mécanisme d'attention" ci-dessus.
# ---------------------------------------------------------------------------

class AttentionSimple(nn.Module):
    """Attention causale à une seule tête (dot-product attention)."""

    def __init__(self, dim: int) -> None:
        super().__init__()
        self.query   = nn.Linear(dim, dim, bias=False)
        self.key     = nn.Linear(dim, dim, bias=False)
        self.value   = nn.Linear(dim, dim, bias=False)
        self.echelle = dim ** 0.5

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        """
        Calcule l'attention causale : pour chaque position, produit une
        combinaison pondérée des valeurs passées. Voir article, §3 (boîte noire).
        """
        # x : (batch, longueur, dim)
        B, L, D = x.shape
        Q = self.query(x)   # "que cherche-t-on ?"
        K = self.key(x)     # "qu'offre chaque position ?"
        V = self.value(x)   # "quelle information transmet chaque position ?"

        scores = Q @ K.transpose(-2, -1) / self.echelle  # (B, L, L)

        # Masque causal : un token ne peut pas "voir" les tokens futurs
        masque = torch.triu(torch.ones(L, L, dtype=torch.bool), diagonal=1)
        scores = scores.masked_fill(masque, float('-inf'))

        poids = F.softmax(scores, dim=-1)  # (B, L, L) -- somme a 1 par ligne
        return poids @ V                   # (B, L, D)


# ---------------------------------------------------------------------------
# 4. ARCHITECTURE COMPLÈTE : MINI-TRANSFORMER DÉCODEUR
#    Un LLM est un programme qui prédit le prochain mot. (article, section 1)
#    Entrée  : séquence de tokens (représentés par leurs ids)
#    Sortie  : distribution de probabilité sur le vocabulaire
# ---------------------------------------------------------------------------

class MiniTransformer(nn.Module):
    """
    Transformer décodeur minimaliste : prédit le token suivant étant donné
    une fenêtre de contexte. C'est le coeur de tout LLM (article, §1 et §3).
    """

    def __init__(self, taille_vocab: int, dim: int, longueur_contexte: int) -> None:
        super().__init__()
        # Embeddings : chaque token (et chaque position) est représenté par un
        # vecteur de `dim` dimensions appris pendant l'entraînement.
        # "Deux mots utilisés dans des contextes similaires auront des vecteurs
        # proches" (article, §2). DIM_EMBEDDING contrôle la richesse de cette
        # représentation.
        self.embedding_token    = nn.Embedding(taille_vocab, dim)
        self.embedding_position = nn.Embedding(longueur_contexte, dim)
        self.attention          = AttentionSimple(dim)
        self.normalisation      = nn.LayerNorm(dim)
        self.reseau_ff          = nn.Sequential(
            nn.Linear(dim, dim * 2),
            nn.ReLU(),
            nn.Linear(dim * 2, dim),
        )
        self.tete_lm = nn.Linear(dim, taille_vocab)

    def forward(self, idx: torch.Tensor) -> torch.Tensor:
        """Retourne les logits sur le vocabulaire pour le dernier token du contexte."""
        # idx : (batch, longueur)
        B, L = idx.shape
        positions = torch.arange(L).unsqueeze(0).expand(B, -1)

        # Représentation = embedding du token + embedding de sa position
        x = self.embedding_token(idx) + self.embedding_position(positions)

        # Bloc Transformer : attention + normalisation + réseau feed-forward
        x = self.normalisation(x + self.attention(x))
        x = self.normalisation(x + self.reseau_ff(x))

        return self.tete_lm(x[:, -1, :])  # logits sur le vocabulaire (batch, taille_vocab)

# ---------------------------------------------------------------------------
# 5. ENTRAÎNEMENT
#    "Le modèle absorbe des régularités statistiques du langage" (article, §4)
#    À chaque étape : on prédit le token suivant, on mesure l'erreur (cross-
#    entropy), on ajuste les poids via rétropropagation du gradient.
# ---------------------------------------------------------------------------

def entrainer(
    modele: MiniTransformer,
    X: torch.Tensor,
    Y: torch.Tensor,
    epochs: int = 400,
    lr: float = 0.01,
) -> None:
    """
    Boucle d'entraînement : à chaque époque, prédit le token suivant,
    mesure l'erreur (cross-entropy) et ajuste les poids par rétropropagation.
    C'est ce processus qui "absorbe les régularités statistiques du langage"
    (article, §3 — l'entraînement).
    """
    optimiseur = torch.optim.Adam(modele.parameters(), lr=lr)
    print("Entraînement...")
    for epoch in range(epochs):
        perte = F.cross_entropy(modele(X), Y)
        optimiseur.zero_grad()
        perte.backward()
        optimiseur.step()
        if (epoch + 1) % 100 == 0:
            print(f"  Époque {epoch+1:4d} | perte = {perte.item():.4f}")
    print()

# ---------------------------------------------------------------------------
# 6. GÉNÉRATION
#    "Pour générer une réponse complète, le système répète cette opération
#     des centaines de fois." (article, section 3)
# ---------------------------------------------------------------------------

def generer(
    modele: MiniTransformer,
    tokeniseur: Tokenizer,
    amorce: str,
    nb_tokens: int = 6,
    temperature: float = 1.0,
) -> str:
    """
    Génère nb_tokens tokens à partir d'une amorce textuelle.

    temperature : contrôle l'aléatoire de la génération.
      - temperature=1.0 : distribution apprise intacte
      - temperature<1.0 : génération plus "déterministe" (tokens probables favorisés)
      - temperature>1.0 : génération plus "créative" (distribution aplatie)
    """
    modele.eval()
    ids_amorce = tokeniseur.encode(amorce).ids
    if not ids_amorce:
        return amorce

    ids_courants = list(ids_amorce)
    while len(ids_courants) < LONGUEUR_CONTEXTE:
        ids_courants = [0] + ids_courants

    ids_sortie = list(ids_amorce)
    with torch.no_grad():
        for _ in range(nb_tokens):
            fenetre   = torch.tensor(ids_courants[-LONGUEUR_CONTEXTE:]).unsqueeze(0)
            probs     = F.softmax(modele(fenetre) / temperature, dim=-1)
            id_predit = int(torch.multinomial(probs, num_samples=1).item())
            ids_sortie.append(id_predit)
            ids_courants.append(id_predit)

    return tokeniseur.decode(ids_sortie)

# ---------------------------------------------------------------------------
# 7. POINT D'ENTRÉE
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    tokeniseur = construire_tokeniseur(CORPUS)
    taille_vocab = tokeniseur.get_vocab_size()
    print(f"Vocabulaire BPE : {taille_vocab} tokens\n")

    X, Y = preparer_corpus(CORPUS, LONGUEUR_CONTEXTE, tokeniseur)

    modele = MiniTransformer(taille_vocab, DIM_EMBEDDING, LONGUEUR_CONTEXTE)
    entrainer(modele, X, Y, epochs=EPOCHS, lr=LR)

    gen = lambda amorce, t: generer(modele, tokeniseur, amorce, nb_tokens=15, temperature=t)

    # Amorces : mots fréquents du corpus brut (hors mots grammaticaux)
    mots_vides = {"le", "la", "les", "de", "du", "des", "un", "une", "et",
                  "en", "à", "il", "elle", "que", "qui", "je", "on", "se",
                  "ne", "pas", "par", "au", "aux", "ce", "sa", "son", "ses"}
    freq: dict[str, int] = {}
    for mot in CORPUS.split():
        freq[mot] = freq.get(mot, 0) + 1
    amorces = sorted(
        (m for m in freq if m not in mots_vides and freq[m] >= 5),
        key=lambda m: freq[m], reverse=True
    )[:4]

    print("=" * 55)
    print("GÉNÉRATION (temperature=0.5 -- relativement déterministe)")
    print("=" * 55)
    for amorce in amorces:
        print(f"  '{amorce}' -> {gen(amorce, 0.5)}")

    print()
    print("=" * 55)
    print("GÉNÉRATION (temperature=1.5 -- plus aléatoire)")
    print("=" * 55)
    for amorce in amorces[:2]:
        print(f"  '{amorce}' -> {gen(amorce, 1.5)}")

    print()
    print("=" * 55)
    print("VOTRE TOUR  (entrée vide pour quitter)")
    print("=" * 55)
    while True:
        amorce = input("Amorce : ").strip()
        if not amorce:
            break
        print(f"  t=0.5 : {gen(amorce, 0.5)}")
        print(f"  t=1.5 : {gen(amorce, 1.5)}")

```

---

## Deuxième partie : utiliser un modèle pré-entraîné

### Ce qu'il faut installer

```
pip install transformers
```

- `transformers` : quelques Mo (bibliothèque HuggingFace, pas le modèle)
- `asi/gpt-fr-cased-small` : environ 510 Mo, téléchargé automatiquement au premier lancement et mis en cache

`torch` est déjà installé depuis la première partie.

Voici une sortie typique :

```
GÉNÉRATION (temperature=0.9, top_p=0.92)

  Amorce : « Il était une fois »
  Suite  : Il était une fois un jeune homme qui rêvait de voyager loin de son village...

  Amorce : « La science est »
  Suite  : La science est avant tout une façon de poser des questions sur le monde...

  Amorce : « Dans les rues de Paris, »
  Suite  : Dans les rues de Paris, les gens marchaient vite, sans se regarder...

  Amorce : « quelle est la capitale de la france? »
  Suite  : quelle est la capitale de la france? - Les habitants sont de la France;
           leur ville est la capitale de l'Espagne. Il en est ainsi en Catalogne
           et en Navarre, où il n'y a qu'une seule ville,
```

Le contraste avec la première partie est saisissant. L'architecture est identique dans ses principes : un Transformer décodeur qui prédit le token suivant, avec les mêmes briques (embeddings, attention, réseau feed-forward). Ce qui change, c'est uniquement l'entraînement : des milliards de tokens au lieu de 10 000 mots, des centaines de millions de paramètres au lieu de quelques centaines de milliers.

**La génération est fluide et cohérente.** Les suites sont du français grammaticalement correct, stylistiquement plausible, sémantiquement cohérent sur plusieurs phrases. Ce n'est pas un résultat que l'on obtient avec notre modèle, quelle que soit l'amorce.

**Le modèle reproduit des registres.** Sur "Il était une fois", il produit du récit ; sur "La science est", du texte réflexif. Il ne comprend pas ces registres : dans ses données d'entraînement, ces amorces étaient statistiquement suivies de ces types de continuation. C'est la même mécanique que dans la première partie, à une autre échelle.

**Le modèle ne répond pas aux questions.** Sur "quelle est la capitale de la france?", le modèle produit une continuation narrative incohérente, pas une réponse. Ce n'est pas un défaut : c'est exactement ce qu'un modèle de base entraîné sur du texte brut est supposé faire. Il continue le texte. La différence entre ce modèle et ChatGPT n'est pas l'architecture : c'est une étape d'entraînement supplémentaire sur des milliers de paires question-réponse annotées par des humains (le RLHF décrit dans l'article), qui apprend au modèle que la continuation attendue après une question est une réponse directe. `asi/gpt-fr-cased-small` est un modèle de base ; ChatGPT, Claude ou Mistral-Instruct sont des modèles d'instruction. Même principe, entraînements différents.

**Le paramètre top_p.** Ce programme introduit un paramètre absent de la première partie : `top_p` (nucleus sampling). À chaque étape, seuls les tokens dont les probabilités cumulées atteignent `top_p` sont conservés avant l'échantillonnage. Cela écarte les tokens très improbables sans imposer un choix déterministe, ce qui améliore la qualité de la génération par rapport à la température seule.

```python
"""
Utilisation d'un modèle de langue pré-entraîné via HuggingFace Transformers.

Contraste avec mini_llm.py :
  - mini_llm.py  : ~200 lignes pour construire et entraîner un modèle from scratch
                   sur 40 000 mots → génération balbutiante
  - ce fichier   : 3 lignes pour charger un modèle entraîné sur des milliards de
                   tokens → génération fluide et cohérente
"""

from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

# ---------------------------------------------------------------------------
# CONSTANTES
#   MODELE       : identifiant HuggingFace — peut être remplacé par n'importe
#                  quel modèle de la plateforme (https://huggingface.co/models)
#   NB_TOKENS    : longueur de la suite générée
#   TEMPERATURE  : créativité (0 = déterministe, >1 = plus aléatoire)
#   TOP_P        : nucleus sampling — ne garde que les tokens couvrant P%
#                  de la probabilité cumulée (filtrage des tokens improbables)
# ---------------------------------------------------------------------------

MODELE:      str   = "asi/gpt-fr-cased-small"
NB_TOKENS:   int   = 40
TEMPERATURE: float = 0.9
TOP_P:       float = 0.92

# ---------------------------------------------------------------------------
# CHARGEMENT
#   AutoTokenizer et AutoModelForCausalLM détectent automatiquement
#   l'architecture du modèle (GPT-2, LLaMA, Mistral...) depuis le hub.
#   Les poids sont téléchargés une fois puis mis en cache localement.
# ---------------------------------------------------------------------------

print(f"Chargement de « {MODELE} »...")
tokeniseur = AutoTokenizer.from_pretrained(MODELE)
modele     = AutoModelForCausalLM.from_pretrained(MODELE)
modele.eval()
print(f"Prêt — {sum(p.numel() for p in modele.parameters()):,} paramètres\n")

# ---------------------------------------------------------------------------
# GÉNÉRATION
# ---------------------------------------------------------------------------

def generer(amorce: str, nb_tokens: int = NB_TOKENS, temperature: float = TEMPERATURE) -> str:
    """Génère une suite à partir de l'amorce en utilisant nucleus sampling."""
    entree = tokeniseur(amorce, return_tensors="pt")
    with torch.no_grad():
        sortie = modele.generate(
            **entree,
            max_new_tokens=nb_tokens,
            do_sample=True,
            temperature=temperature,
            top_p=TOP_P,
            pad_token_id=tokeniseur.eos_token_id,
        )
    return tokeniseur.decode(sortie[0], skip_special_tokens=True)

# ---------------------------------------------------------------------------
# POINT D'ENTRÉE
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    amorces = [
        "Il était une fois",
        "La science est",
        "Dans les rues de Paris,",
        "quelle est la capitale de la france?",
    ]

    print("=" * 60)
    print(f"GÉNÉRATION (temperature={TEMPERATURE}, top_p={TOP_P})")
    print("=" * 60)
    for amorce in amorces:
        print(f"\n  Amorce : « {amorce} »")
        print(f"  Suite  : {generer(amorce)}")
```

---

## Troisième partie : un modèle d'instruction (RLHF)

La deuxième partie a montré qu'un modèle de base fluide ne répond pas aux questions : il continue du texte. Il faut distinguer deux choses que l'article mentionne ensemble sous "entraînement" :

- **Le pré-entraînement à grande échelle** crée la compétence latente : le modèle "sait" que Paris est la capitale de la France parce que cette association apparaît des millions de fois dans ses données. C'est cette étape qui produit les propriétés émergentes décrites dans l'article (raisonnement apparent, cohérence longue distance). Mais le modèle de la deuxième partie a déjà subi cette étape, et il ne répond toujours pas aux questions.
- **Le fine-tuning (SFT + RLHF)** crée le comportement de répondre. Ce n'est pas de l'émergence au sens strict : c'est un apprentissage explicite sur des milliers de paires question-réponse annotées. Le modèle apprend statistiquement que dans un certain format d'entrée, la continuation attendue est une réponse directe.

**Les tokens spéciaux ne sont pas du code.** Chaque modèle d'instruction utilise un format de conversation propre, par exemple pour TinyLlama :

```
<|system|>
Tu es un assistant qui répond en français.</s>
<|user|>
quelle est la capitale de la france?</s>
<|assistant|>
```

Les tokens `<|user|>` et `<|assistant|>` n'ont aucun traitement particulier dans le code : ce sont des tokens comme les autres, avec un identifiant numérique dans le vocabulaire. Le modèle a appris statistiquement que dans ce format, la continuation après `<|assistant|>` est une réponse directe, exactement comme `mini_llm.py` a appris que `suif` est souvent suivi de `fut entourée`. C'est toujours de la prédiction du prochain token.

`apply_chat_template` n'est pas une instruction au modèle : c'est un formateur de texte. Il produit la chaîne ci-dessus. On pourrait l'écrire à la main avec une f-string ; le résultat serait identique.

**Ce que montre le programme.** Il expose les deux comportements sur le même modèle, avec la même question :

```
-- SANS format de conversation (même comportement que la partie 2) --
quelle est la capitale de la france? - Les habitants sont de la France;
leur ville est la capitale de l'Espagne. Il en est ainsi en Catalogne...

-- AVEC format de conversation (format du fine-tuning) --
La capitale de la France est Paris.
```

C'est le format d'entrée seul qui change le comportement. La compétence (savoir que Paris est la capitale) était déjà là dans le modèle de base ; le fine-tuning a appris au modèle à l'exprimer sous forme de réponse quand le contexte le demande.

**Les limites d'un petit modèle.** Voici une sortie réelle sur deux questions :

```
Question : quelle est la capitale de la france?
Réponse  : La capitale de la France est Paris.

Question : explique ce qu'est un token en quelques phrases
Réponse  : Certainement! Une token est un élément de données qui est transmise entre
           deux parties lors d'une communication. Elle peut être un cookie, un jeton
           d'autorisation, un jeton d'identification, un jeton d'accès... Dans le
           domaine de l'Internet, les tokens sont utilisés pour garantir que les
           informations transmises entre les parties soient validées...
```

La première réponse est correcte. La deuxième est fluente, confiante, et complètement hors sujet : le modèle a répondu sur les tokens d'authentification web, pas sur la tokenisation en traitement du langage. Ce n'est pas une erreur de raisonnement : c'est une question de distribution statistique. Dans les données d'entraînement de TinyLlama (essentiellement de l'anglais), le mot "token" est associé bien plus souvent à la sécurité web et aux cryptomonnaies qu'à la tokenisation NLP. Le modèle a produit la continuation la plus probable — ce qui est précisément ce qu'il fait depuis la première partie. La confiance apparente de la réponse est elle aussi statistique : dans les textes de type question-réponse, les réponses sont assertives.

### Ce qu'il faut installer

Aucune nouvelle bibliothèque Python. Seul le modèle change.

- `TinyLlama/TinyLlama-1.1B-Chat-v1.0` : environ 2,2 Go, téléchargé automatiquement au premier lancement et mis en cache

`torch` et `transformers` sont déjà installés depuis les parties précédentes.

```python
"""
Utilisation d'un modèle d'instruction (RLHF) via HuggingFace Transformers.

Contraste avec partie2.py :
  - partie2.py  : modèle de base, continue le texte comme un livre
  - ce fichier  : modèle d'instruction, répond aux questions

L'architecture est identique. Seul l'entraînement diffère.
"""

from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

# ---------------------------------------------------------------------------
# CONSTANTES
#   MODELE      : modèle instruction-tuned (fine-tuné sur des paires Q/R)
#   NB_TOKENS   : longueur maximale de la réponse générée
#   TEMPERATURE : créativité (0 = déterministe, >1 = plus aléatoire)
#   TOP_P       : nucleus sampling
# ---------------------------------------------------------------------------

MODELE:      str   = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
NB_TOKENS:   int   = 200
TEMPERATURE: float = 0.7
TOP_P:       float = 0.9

# ---------------------------------------------------------------------------
# CHARGEMENT
# ---------------------------------------------------------------------------

print(f"Chargement de « {MODELE} »...")
tokeniseur = AutoTokenizer.from_pretrained(MODELE)
modele     = AutoModelForCausalLM.from_pretrained(MODELE)
modele.eval()
print(f"Prêt — {sum(p.numel() for p in modele.parameters()):,} paramètres\n")

# ---------------------------------------------------------------------------
# GÉNÉRATION
#   apply_chat_template formate la question dans le schéma de conversation
#   sur lequel le modèle a été entraîné : [INST] question [/INST] réponse.
#   Le modèle a appris que la continuation attendue après [/INST] est une
#   réponse directe. C'est tout ce que fait le RLHF du point de vue du code.
# ---------------------------------------------------------------------------

def repondre(question: str, nb_tokens: int = NB_TOKENS) -> str:
    """Pose une question au modèle d'instruction et retourne sa réponse."""
    messages = [
        {"role": "system", "content": "Tu es un assistant qui répond en français."},
        {"role": "user",   "content": question},
    ]
    entree = tokeniseur.apply_chat_template(
        messages, return_tensors="pt", add_generation_prompt=True
    )
    input_ids      = entree if isinstance(entree, torch.Tensor) else entree["input_ids"]
    attention_mask = torch.ones_like(input_ids)
    with torch.no_grad():
        sortie = modele.generate(
            input_ids=input_ids,
            attention_mask=attention_mask,
            max_new_tokens=nb_tokens,
            max_length=None,
            do_sample=True,
            temperature=TEMPERATURE,
            top_p=TOP_P,
            pad_token_id=tokeniseur.eos_token_id,
        )
    nouveaux_tokens = sortie[0][input_ids.shape[1]:]
    return tokeniseur.decode(nouveaux_tokens, skip_special_tokens=True)

# ---------------------------------------------------------------------------
# POINT D'ENTRÉE
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    questions = [
        "quelle est la capitale de la france?",
        "explique ce qu'est un token en quelques phrases",
        "écris un court poème sur l'automne",
    ]

    print("=" * 60)
    print("QUESTIONS / RÉPONSES")
    print("=" * 60)
    for q in questions:
        print(f"\nQuestion : {q}")
        print(f"Réponse  : {repondre(q)}")

    print()
    print("=" * 60)
    print("VOTRE TOUR  (entrée vide pour quitter)")
    print("=" * 60)
    while True:
        question = input("Question : ").strip()
        if not question:
            break
        print(f"Réponse  : {repondre(question)}")
```
