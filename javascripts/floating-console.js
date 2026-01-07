let pyodide = null;
let pyodideReady = false;

async function loadPyodideInstance() {
  if (!pyodideReady) {
    pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/"
    });
    pyodideReady = true;
  }
  return pyodide;
}

document.addEventListener('DOMContentLoaded', async function() {
  const hasConsole = document.querySelector('[data-python-console="true"]');
  if (!hasConsole) return;

  // Créer la console minimaliste
  const floatingConsole = document.createElement('div');
  floatingConsole.id = 'floating-console';
  floatingConsole.innerHTML = `
    <div class="console-header">
      <span>🐍 Python</span>
      <button id="run-code" title="Exécuter (Ctrl+Enter)">▶</button>
      <button id="clear-console" title="Effacer sortie (Shift+Click: tout effacer)">🗑️</button>
      <button id="toggle-console" title="Réduire">−</button>
      <button id="close-console" title="Fermer">✕</button>
    </div>
    <div id="console-content">
      <textarea id="console-input" placeholder="Tapez du code Python...
Ctrl+Enter pour exécuter" spellcheck="false"></textarea>
      <div id="resize-handle"></div>
      <div id="console-output-wrapper">
        <div class="output-label">Résultat :</div>
        <div id="console-output"></div>
      </div>
    </div>
    <div id="console-loading">Chargement de Python...</div>
  `;
  document.body.appendChild(floatingConsole);

  const output = document.getElementById('console-output');
  const input = document.getElementById('console-input');
  const content = document.getElementById('console-content');
  const loading = document.getElementById('console-loading');
  const runButton = document.getElementById('run-code');

  // Charger Pyodide en arrière-plan
  loadPyodideInstance().then(() => {
    loading.style.display = 'none';
    content.style.display = 'flex';
    input.focus();
    runButton.disabled = false;
  }).catch(err => {
    loading.textContent = 'Erreur de chargement';
    loading.style.color = '#d32f2f';
  });

  // Fonction d'exécution
  async function executeCode() {
    if (!pyodideReady) return;
    
    const code = input.value.trim();
    if (!code) return;

    // Ajouter un séparateur si ce n'est pas la première exécution
    if (output.children.length > 0) {
      const separator = document.createElement('div');
      separator.className = 'output-separator';
      output.appendChild(separator);
    }

    // Afficher le code exécuté
    const codeBlock = document.createElement('pre');
    codeBlock.className = 'output-line command';
    codeBlock.textContent = code;
    output.appendChild(codeBlock);

    try {
      // Exécuter le code et capturer stdout
      const result = await pyodide.runPythonAsync(`
import sys
from io import StringIO
import traceback
sys.stdout = StringIO()
sys.stderr = StringIO()

try:
${code.split('\n').map(line => '    ' + line).join('\n')}
except Exception:
    print(traceback.format_exc(), file=sys.stderr)

output = sys.stdout.getvalue()
errors = sys.stderr.getvalue()
output if not errors else errors
      `);

      if (result) {
        const isError = result.includes('Traceback');
        addOutput(result, isError ? 'error' : 'result');
      } else {
        addOutput('(aucune sortie)', 'empty');
      }
    } catch (err) {
      addOutput(err.message, 'error');
    }

    output.scrollTop = output.scrollHeight;
  }

  function addOutput(text, className) {
    const line = document.createElement('pre');
    line.className = `output-line ${className}`;
    line.textContent = text;
    output.appendChild(line);
  }

  // Exécution avec Ctrl+Enter
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      executeCode();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Insérer 4 espaces
      const start = this.selectionStart;
      const end = this.selectionEnd;
      this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
      this.selectionStart = this.selectionEnd = start + 4;
    }
  });

  // Bouton Run
  runButton.addEventListener('click', executeCode);

  // Boutons de contrôle
  document.getElementById('clear-console').addEventListener('click', function(e) {
    if (!e.shiftKey) {
      output.innerHTML = '';
    } else {
      output.innerHTML = '';
      input.value = '';
    }
    input.focus();
  });

  let isMinimized = false;
  document.getElementById('toggle-console').addEventListener('click', function() {
    isMinimized = !isMinimized;
    content.style.display = isMinimized ? 'none' : 'flex';
    loading.style.display = isMinimized ? 'none' : (pyodideReady ? 'none' : 'flex');
    this.textContent = isMinimized ? '+' : '−';
    floatingConsole.style.height = isMinimized ? 'auto' : '400px';
  });

  const showButton = document.createElement('button');
  showButton.id = 'show-console-btn';
  showButton.innerHTML = '🐍';
  showButton.title = 'Ouvrir la console Python';
  document.body.appendChild(showButton);

  document.getElementById('close-console').addEventListener('click', function() {
    floatingConsole.style.display = 'none';
    showButton.style.display = 'block';
    localStorage.setItem('consoleHidden', 'true');
  });

  showButton.addEventListener('click', function() {
    floatingConsole.style.display = 'flex';
    showButton.style.display = 'none';
    localStorage.removeItem('consoleHidden');
    if (pyodideReady) input.focus();
  });

  if (localStorage.getItem('consoleHidden') === 'true') {
    floatingConsole.style.display = 'none';
    showButton.style.display = 'block';
  } else {
    showButton.style.display = 'none';
  }

  // Rendre draggable, resizable et split resizable
  makeDraggable(floatingConsole);
  makeResizable(floatingConsole);
  makeSplitResizable();
});

function makeDraggable(element) {
  const header = element.querySelector('.console-header');
  let isDragging = false;
  let startX, startY, startLeft, startTop;

  header.addEventListener('mousedown', function(e) {
    if (e.target.tagName === 'BUTTON') return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startLeft = element.offsetLeft;
    startTop = element.offsetTop;
    element.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    e.preventDefault();
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    element.style.left = startLeft + dx + 'px';
    element.style.top = startTop + dy + 'px';
    element.style.right = 'auto';
    element.style.bottom = 'auto';
  });

  document.addEventListener('mouseup', function() {
    isDragging = false;
    element.style.cursor = '';
  });
}

function makeResizable(element) {
  const resizers = ['nw', 'ne', 'sw', 'se', 'n', 's', 'e', 'w'];
  
  resizers.forEach(direction => {
    const resizer = document.createElement('div');
    resizer.className = `resizer resizer-${direction}`;
    element.appendChild(resizer);
    
    resizer.addEventListener('mousedown', initResize);
    
    function initResize(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = element.offsetWidth;
      const startHeight = element.offsetHeight;
      const startLeft = element.offsetLeft;
      const startTop = element.offsetTop;
      
      function resize(e) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        const minWidth = 300;
        const minHeight = 200;
        const maxWidth = window.innerWidth - 40;
        const maxHeight = window.innerHeight - 40;
        
        if (direction.includes('e')) {
          element.style.width = Math.min(Math.max(startWidth + dx, minWidth), maxWidth) + 'px';
        }
        if (direction.includes('w')) {
          const newWidth = Math.min(Math.max(startWidth - dx, minWidth), maxWidth);
          if (newWidth > minWidth) {
            element.style.width = newWidth + 'px';
            element.style.left = startLeft + dx + 'px';
          }
        }
        if (direction.includes('s')) {
          element.style.height = Math.min(Math.max(startHeight + dy, minHeight), maxHeight) + 'px';
        }
        if (direction.includes('n')) {
          const newHeight = Math.min(Math.max(startHeight - dy, minHeight), maxHeight);
          if (newHeight > minHeight) {
            element.style.height = newHeight + 'px';
            element.style.top = startTop + dy + 'px';
          }
        }
      }
      
      function stopResize() {
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
      }
      
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stopResize);
    }
  });
}

function makeSplitResizable() {
  const handle = document.getElementById('resize-handle');
  const inputArea = document.getElementById('console-input');
  const outputWrapper = document.getElementById('console-output-wrapper');
  const container = document.getElementById('console-content');
  
  let isResizing = false;
  
  handle.addEventListener('mousedown', function(e) {
    isResizing = true;
    e.preventDefault();
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
  });
  
  document.addEventListener('mousemove', function(e) {
    if (!isResizing) return;
    
    const containerRect = container.getBoundingClientRect();
    const containerHeight = containerRect.height;
    const mouseY = e.clientY - containerRect.top;
    
    const minInputHeight = containerHeight * 0.2;
    const maxInputHeight = containerHeight * 0.8;
    
    const newInputHeight = Math.max(minInputHeight, Math.min(maxInputHeight, mouseY));
    const inputPercent = (newInputHeight / containerHeight) * 100;
    const outputPercent = 100 - inputPercent;
    
    inputArea.style.flex = `0 0 ${inputPercent}%`;
    inputArea.style.minHeight = '0';
    inputArea.style.maxHeight = 'none';
    outputWrapper.style.flex = `1 1 ${outputPercent}%`;
    outputWrapper.style.minHeight = '0';
    outputWrapper.style.maxHeight = 'none';
  });
  
  document.addEventListener('mouseup', function() {
    if (isResizing) {
      isResizing = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  });
}