'use strict';

// ─── DOM refs ───────────────────────────────────────────────────────────────
const outputDiv = document.getElementById('output');
const commandInput = document.getElementById('command-input');
const inputLine = document.getElementById('input-line');
const modal = document.getElementById('terminal-modal');
const backdrop = document.getElementById('modal-backdrop');

// ─── Helpers ─────────────────────────────────────────────────────────────────
let booted = false;

function scrollToBottom() {
    const tc = document.getElementById('terminal-container');
    if (tc) tc.scrollTop = tc.scrollHeight;
}

async function typePrint(text, lineClass = '', speed = 5) {
    const p = document.createElement('div');
    p.className = `output-line ${lineClass}`;
    outputDiv.appendChild(p);

    if (text === '') {
        p.innerHTML = '&nbsp;';
        return;
    }

    // Check if the text is meant to be parsed as HTML (contains a tag)
    const isHtml = text.includes('<') && text.includes('>');

    if (isHtml || speed === 0) {
        // Render instantly using innerHTML so the tags aren't broken by the typewriter effect
        p.innerHTML = text;
        scrollToBottom();
        return;
    }

    // Typing effect for plain text
    for (let i = 0; i < text.length; i++) {
        p.textContent += text.charAt(i);
        scrollToBottom();
        if (text.charAt(i) !== ' ') await new Promise(r => setTimeout(r, speed));
    }
}

// ─── Modal open / close ──────────────────────────────────────────────────────
function openTerminal() {
    modal.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    commandInput.focus();
    if (!booted) {
        booted = true;
        runBootSequence();
    }
}

function closeTerminal() {
    modal.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
}

// ─── Event listeners ─────────────────────────────────────────────────────────
document.getElementById('open-terminal-btn').addEventListener('click', openTerminal);
document.getElementById('hero-terminal-btn').addEventListener('click', openTerminal);
document.getElementById('footer-terminal-btn').addEventListener('click', openTerminal);
document.getElementById('close-terminal-btn').addEventListener('click', closeTerminal);
backdrop.addEventListener('click', closeTerminal);

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeTerminal();
});

commandInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const cmd = this.value;
        this.value = '';
        processCommand(cmd);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (OS_STATE.history.length > 0 && OS_STATE.historyIndex > 0) {
            OS_STATE.historyIndex--;
            this.value = OS_STATE.history[OS_STATE.historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (OS_STATE.historyIndex < OS_STATE.history.length - 1) {
            OS_STATE.historyIndex++;
            this.value = OS_STATE.history[OS_STATE.historyIndex];
        } else {
            OS_STATE.historyIndex = OS_STATE.history.length;
            this.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        handleAutocomplete(this);
    }
});

// Focus input when clicking anywhere inside the terminal area
document.getElementById('terminal-container').addEventListener('click', (e) => {
    if (!isEditorOpen && e.target.id !== 'close-terminal-btn') {
        commandInput.focus();
    } else if (isEditorOpen && editorMode === 'INSERT') {
        editorTextarea.focus();
    }
});

// ─── Minimalist Vi Editor ────────────────────────────────────────────────────
let isEditorOpen = false;
let editorMode = 'NORMAL';
let currentEditorFile = '';

const editorView = document.createElement('div');
editorView.id = 'editor-view';

const editorTextarea = document.createElement('textarea');
editorTextarea.id = 'editor-textarea';
editorTextarea.spellcheck = false;

const editorStatusBar = document.createElement('div');
editorStatusBar.id = 'editor-status-bar';

const editorCommandInput = document.createElement('input');
editorCommandInput.id = 'editor-command-input';
editorCommandInput.autocomplete = 'off';
editorCommandInput.spellcheck = false;

editorView.appendChild(editorTextarea);
editorView.appendChild(editorStatusBar);
editorView.appendChild(editorCommandInput);
document.getElementById('terminal-container').appendChild(editorView);

window.openEditor = function (filePath, currentContent) {
    isEditorOpen = true;
    editorMode = 'NORMAL';
    currentEditorFile = filePath;

    document.getElementById('output').style.display = 'none';
    document.getElementById('input-line').style.display = 'none';
    editorView.style.display = 'flex';

    editorTextarea.value = currentContent;
    updateEditorStatus();

    editorTextarea.focus();
};

function updateEditorStatus() {
    if (editorMode === 'COMMAND') return;
    let modeText = editorMode === 'INSERT' ? '-- INSERT --' : `"${currentEditorFile}"`;
    let hints = editorMode === 'INSERT' ? '[Esc] Normal' : '[i] Insert | [:w] Save | [:q] Quit';
    editorStatusBar.innerHTML = `<span>${modeText}</span><span style="opacity: 0.7; font-weight: normal; font-size: 0.75rem;">${hints}</span>`;
}

function closeEditor() {
    isEditorOpen = false;
    document.getElementById('output').style.display = 'block';
    document.getElementById('input-line').style.display = 'flex';
    editorView.style.display = 'none';

    commandInput.disabled = false;
    commandInput.focus();
    scrollToBottom();
}

function saveEditorFile() {
    const lastSlashIndex = currentEditorFile.lastIndexOf('/');
    const parentDir = lastSlashIndex > 0 ? currentEditorFile.substring(0, lastSlashIndex) : '/';
    const fileName = currentEditorFile.substring(lastSlashIndex + 1);

    if (!VFS[parentDir]) {
        VFS[parentDir] = { type: 'dir', contents: [] };
    }

    VFS[currentEditorFile] = {
        type: 'file',
        data: editorTextarea.value.split('\n')
    };

    if (VFS[parentDir] && !VFS[parentDir].contents.includes(fileName)) {
        VFS[parentDir].contents.push(fileName);
    }

    if (typeof syncFileSystem === 'function') syncFileSystem();
}

editorTextarea.addEventListener('keydown', (e) => {
    if (editorMode === 'NORMAL') {
        let key = e.key;
        if (key === 'i' || key === 'I') {
            e.preventDefault();
            editorMode = 'INSERT';
            updateEditorStatus();
        } else if (key === ':') {
            e.preventDefault();
            editorMode = 'COMMAND';
            editorStatusBar.style.display = 'none';
            editorCommandInput.style.display = 'block';
            editorCommandInput.value = ':';
            editorCommandInput.focus();
        } else if (/^[a-zA-Z0-9!"#$%&'()*+,\-./;=?@[\\\]^_`{|}~]$/.test(key) && !e.ctrlKey && !e.altKey && !e.metaKey) {
            e.preventDefault(); // Block typing
        } else if (key === 'Enter' || key === 'Backspace' || key === 'Delete' || key === 'Tab') {
            e.preventDefault(); // Block editing keys
        }
    } else if (editorMode === 'INSERT') {
        if (e.key === 'Escape') {
            e.preventDefault();
            editorMode = 'NORMAL';
            updateEditorStatus();
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const start = editorTextarea.selectionStart;
            const end = editorTextarea.selectionEnd;
            editorTextarea.value = editorTextarea.value.substring(0, start) + "    " + editorTextarea.value.substring(end);
            editorTextarea.selectionStart = editorTextarea.selectionEnd = start + 4;
        }
    }
});

editorCommandInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        e.preventDefault();
        editorMode = 'NORMAL';
        editorCommandInput.style.display = 'none';
        editorStatusBar.style.display = 'flex';
        updateEditorStatus();
        editorTextarea.focus();
    } else if (e.key === 'Enter') {
        e.preventDefault();
        const cmd = editorCommandInput.value.substring(1).trim();

        if (cmd === 'w') {
            saveEditorFile();
            editorMode = 'NORMAL';
            editorCommandInput.style.display = 'none';
            editorStatusBar.style.display = 'flex';
            editorStatusBar.innerHTML = `<span>"${currentEditorFile}" [Written]</span>`;
            editorTextarea.focus();
        } else if (cmd === 'q' || cmd === 'q!') {
            closeEditor();
        } else if (cmd === 'wq' || cmd === 'x') {
            saveEditorFile();
            closeEditor();
        } else {
            editorCommandInput.value = ':';
            editorMode = 'NORMAL';
            editorCommandInput.style.display = 'none';
            editorStatusBar.style.display = 'flex';
            editorStatusBar.innerHTML = `<span>Not an editor command: ${cmd}</span>`;
            editorTextarea.focus();
        }
    } else if (e.key === 'Backspace' && editorCommandInput.value === ':') {
        // Prevent deleting the colon
        e.preventDefault();
    }
});
