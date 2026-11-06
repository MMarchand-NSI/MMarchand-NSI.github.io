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

# Blocs retirés sur toutes les pages
_CORRECTION_RE = re.compile(r'^(\s*)\?\?\?\+?\s+warning\s+"Correction"')

# Blocs retirés en plus dans les projets : les solutions de code (titre
# « Solution »), et la question « Avant d'ouvrir la solution » qui n'a plus
# d'objet sans elle. Les « Réponse » des exercices préparatoires sur le cahier
# et les indices sont conservés.
_SOLUTION_PROJET_RE = re.compile(
    r'^(\s*)\?\?\?\+?\s+(\w+\s+"(Solution( de la question \d+)?|Vérifier sa solution|Avant d\'ouvrir la solution)"'
    r'|warning\s+"Correction")'
)

# Blocs retirés en plus sur les pages listées sous hide_solutions : la question
# « Avant d'ouvrir la correction », qui n'a plus d'objet quand la correction
# qu'elle annonce est masquée. Les corrections de code elles-mêmes sont déjà
# prises par _CORRECTION_RE, puisqu'elles s'écrivent en warning.
# Sur ces pages, tout bloc de réponse s'intitule « Correction » : c'est le TYPE
# d'admonition qui décide, warning pour la correction de code, masquée, et
# success pour celle d'un exercice sur le cahier, que l'élève peut ouvrir.
_SOLUTION_PAGE_RE = re.compile(
    r'^(\s*)\?\?\?\+?\s+warning\s+"Correction"'
    r'|^(\s*)\?\?\?\+?\s+\w+\s+"Avant d\'ouvrir [^"]*"'
)

def _should_hide_solutions(page_path: str) -> bool:
    """Vérifie si l'auto-explication doit être masquée avec les corrections.

    Vrai pour les chemins listés sous hide_solutions dans corrections.yml
    (un fichier, ou un préfixe de répertoire). Les pages de projets/ relèvent
    d'une autre règle, qui masque en plus les blocs intitulés « Solution ».
    """
    page_path = page_path.replace('\\', '/')
    config = _load_corrections_config()
    for entree in config.get('hide_solutions') or []:
        entree = entree.replace('\\', '/').rstrip('/')
        if page_path == entree or page_path.startswith(entree + '/'):
            return True
    return False

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
        if _should_hide_solutions(src_path):
            markdown = _remove_corrections(markdown, _SOLUTION_PAGE_RE)
        elif src_path.startswith('projets/'):
            markdown = _remove_corrections(markdown, _SOLUTION_PROJET_RE)
        else:
            markdown = _remove_corrections(markdown)

    return markdown
