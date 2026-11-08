import logging
import re
import yaml
from pathlib import Path

log = logging.getLogger('mkdocs')

# Cache pour le fichier de configuration des corrections, invalidé par la date
# de modification du fichier
_corrections_config = None
_corrections_mtime = None

def _load_corrections_config():
    """Charge la configuration des corrections depuis corrections.yml

    Le fichier est relu dès que sa date de modification change. Sans cela, une
    modification de corrections.yml n'était prise en compte qu'au redémarrage de
    mkdocs serve, qui ne réimporte jamais ce module. Voir la clé watch de
    mkdocs.yml, qui déclenche la reconstruction.
    """
    global _corrections_config, _corrections_mtime
    config_path = Path(__file__).parent / 'corrections.yml'
    mtime = config_path.stat().st_mtime if config_path.exists() else None

    if _corrections_config is None or mtime != _corrections_mtime:
        if config_path.exists():
            with open(config_path, 'r', encoding='utf-8') as f:
                _corrections_config = yaml.safe_load(f) or {}
        else:
            _corrections_config = {}
        _corrections_mtime = mtime

    return _corrections_config

def _should_show_corrections(page_path: str) -> bool:
    """Vérifie si les corrections doivent être affichées pour cette page"""
    config = _load_corrections_config()
    show_list = config.get('show_corrections', [])

    # Si la liste est None ou vide, on masque toutes les corrections
    if not show_list:
        return False

    # Normaliser le chemin (remplacer les backslashes par des slashes)
    page_path = page_path.replace('\\', '/')

    # Vérifier si le fichier est dans la liste
    return page_path in show_list

# UNE SEULE CONVENTION, ET C'EST LE TYPE QUI DÉCIDE (08/11/2026).
#
# Le titre d'un bloc de réponse commence toujours par « Correction », et celui
# de l'invite d'auto-explication par « Avant d'ouvrir la correction ». Ce qui
# décide du masquage est le TYPE de l'admonition, pas son titre :
#
#   ??? warning  "Correction..."                      masqué
#   ??? success  "Correction..."                      ouvrable (exercice sur le cahier)
#   ??? question "Avant d'ouvrir la correction..."    masqué, avec sa correction
#   ??? note     "Avant d'ouvrir la correction..."    ouvrable, comme sa correction
#
# Pourquoi cette réécriture. Le motif précédent exigeait le titre EXACT
# « Correction », si bien qu'un synonyme portant le bon type, `warning
# "Corrigé"` ou `warning "Réponse"`, n'était pas reconnu et partait en ligne.
# Mesure du 08/11/2026 avant correction : 53 blocs sur 16 pages dans ce cas,
# dont 7 sur Numération/conversion-bases.md. Rien ne le signalait, la page
# était valide et le bloc replié. Les titres ont été harmonisés le même jour
# (511 en-têtes, 69 fichiers) et le motif accepte désormais un COMPLÉMENT
# après « Correction », pour garder l'information des titres composés
# (« Correction BFS », « Correction : partie A »).
#
# Et les deux motifs spéciaux ont disparu avec cette harmonisation. Il y en
# avait un pour projets/ et un pour les pages de hide_solutions, chacun
# énumérant des titres ; ils encodaient en réalité une politique de masquage
# dans un nom, ce que le type dit mieux. La clé hide_solutions de
# corrections.yml n'a donc plus d'effet, et show_corrections garde le sien.
_CORRECTION_RE = re.compile(r'^(\s*)\?\?\?\+?\s+warning\s+"Correction')
_INVITE_RE = re.compile(r'^(\s*)\?\?\?\+?\s+question\s+"Avant d\'ouvrir la correction')

def _remove_corrections(markdown: str, pattern: re.Pattern = _CORRECTION_RE) -> str:
    """Supprime du markdown les blocs repliables dont l'en-tête correspond à pattern"""
    lines = markdown.split('\n')
    result = []
    skip_until_unindent = False
    base_indent = 0

    i = 0
    while i < len(lines):
        line = lines[i]

        # Détecter le début d'un bloc correction
        if pattern.match(line):
            skip_until_unindent = True
            # Calculer l'indentation de base du bloc
            match = re.match(r'^(\s*)', line)
            base_indent = len(match.group(1)) if match else 0
            i += 1
            continue

        if skip_until_unindent:
            # Vérifier si on est sorti du bloc (ligne non vide avec indentation <= base)
            if line.strip():  # Ligne non vide
                match = re.match(r'^(\s*)', line)
                current_indent = len(match.group(1)) if match else 0
                if current_indent <= base_indent:
                    skip_until_unindent = False
                    result.append(line)
            # Les lignes vides dans le bloc sont aussi ignorées
        else:
            result.append(line)

        i += 1

    return '\n'.join(result)

def on_page_markdown(markdown, page, config, files):
    """Hook MkDocs pour traiter le markdown avant le rendu"""

    # Ajouter le marqueur python-console si nécessaire
    if page.meta.get('python-console'):
        markdown = '<div data-python-console="true"></div>\n\n' + markdown

    # Masquer les corrections si le fichier n'est pas dans la liste
    src_path = page.file.src_path.replace('\\', '/')
    if not _should_show_corrections(src_path):
        markdown = _remove_corrections(markdown, _CORRECTION_RE)
        markdown = _remove_corrections(markdown, _INVITE_RE)

    return markdown
