import logging

log = logging.getLogger('mkdocs')

def on_page_markdown(markdown, page, config, files):
    """Ajoute un div avec attribut si python-console est dans le frontmatter"""
    if page.meta.get('python-console'):
        # Injecter le marqueur au début du markdown
        markdown = '<div data-python-console="true"></div>\n\n' + markdown
    return markdown
