'use strict';

// ─── DOM refs ───────────────────────────────────────────────────────────────
const outputDiv = document.getElementById('output');
const commandInput = document.getElementById('command-input');
const inputLine = document.getElementById('input-line');
const modal = document.getElementById('terminal-modal');
const backdrop = document.getElementById('modal-backdrop');

// ─── Profile data ────────────────────────────────────────────────────────────
const PROFILE = {
    whoami: [
        "Hi, I'm Anderson Costa (Arcostasi).",
        "Senior Software Developer specializing in Embedded Systems,",
        "low-level development, and communication protocols for",
        "agricultural and industrial automation.",
        "",
        "Age: 45 | Coding since: 1997 | Based in: Maringá - PR, Brazil"
    ],
    skills: [
        "─── TECHNICAL SKILLS ───────────────────────",
        "Languages : C / C++, Python, Shell, HTML/CSS/JS",
        "Embedded  : Embedded Linux, FreeRTOS, Firmware arch, HAL/LL",
        "Protocols : ISOBUS (ISO 11783), SAE J1939, CAN / CANopen, LIN",
        "Hardware  : STM32, ESP32, XMC, Microchip",
        "Tools     : Vector CANoe, PCAN-Explorer, Git, Docker, CMake"
    ],
    projects: [
        "─── FEATURED PROJECTS ──────────────────────",
        "🛰️  CAN Bus Tools      — Utilities for CAN monitoring & J1939 parsing",
        "⚙️  Embedded Drivers   — Hardware-agnostic drivers for STM32 / ESP32",
        "🔧 Protocol Impl.     — J1939 / ISOBUS stack experiments and demos",
        "",
        "(More projects at github.com/arcostasi)"
    ],
    contact: [
        "─── CONTACT ────────────────────────────────",
        "GitHub  : <a href='https://github.com/arcostasi' target='_blank'>https://github.com/arcostasi</a>",
        "LinkedIn: <a href='https://linkedin.com/in/arcostasi' target='_blank'>https://linkedin.com/in/arcostasi</a>"
    ],
    help: [
        "Available commands:",
        "  whoami    — Professional summary",
        "  skills    — Technical skills",
        "  projects  — Featured projects",
        "  contact   — Contact information",
        "  clear     — Clear terminal",
        "  exit      — Close terminal",
        "  help      — Show this message"
    ]
};

const BOOT_SEQUENCE = [
    "ARCOSTASI BIOS  Date 04/21/97  Ver 1.0",
    "CPU: ARM Cortex-M7 @ 480 MHz",
    "Memory Test: 1024K OK",
    "",
    "Initializing Field Protocols...",
    "Loading ISO 11783 (ISOBUS) Stack... OK",
    "Loading SAE J1939 Handlers......... OK",
    "CAN / LIN Interfaces............... [ONLINE]",
    "RTOS Kernel loaded.",
    "",
    "Welcome to ARCOS v1.0",
    "Type 'help' to see available commands."
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
let booted = false;

function scrollToBottom() {
    const tc = document.getElementById('terminal-container');
    if (tc) tc.scrollTop = tc.scrollHeight;
}

async function typePrint(text, lineClass = '', speed = 10) {
    const p = document.createElement('div');
    p.className = `output-line ${lineClass}`;
    outputDiv.appendChild(p);
    if (text === '') { p.innerHTML = '&nbsp;'; return; }
    if (text.includes('<a') || speed === 0) { p.innerHTML = text; scrollToBottom(); return; }
    for (let i = 0; i < text.length; i++) {
        p.textContent += text.charAt(i);
        scrollToBottom();
        if (text.charAt(i) !== ' ') await new Promise(r => setTimeout(r, speed));
    }
}

async function runBootSequence() {
    inputLine.style.display = 'none';
    for (const line of BOOT_SEQUENCE) {
        await typePrint(line, '', 14);
        await new Promise(r => setTimeout(r, 60));
    }
    inputLine.style.display = 'flex';
    commandInput.focus();
}

async function processCommand(cmd) {
    const raw = cmd.trim();
    const lower = raw.toLowerCase();

    const echo = document.createElement('div');
    echo.className = 'output-line command-echo';
    echo.innerHTML = `<span class="prompt-user">arcostasi</span><span class="prompt-at">@</span><span class="prompt-host">embedded-node:~</span><span class="prompt-sign">#</span> ${raw}`;
    outputDiv.appendChild(echo);

    if (lower === '') { scrollToBottom(); return; }
    if (lower === 'clear') { outputDiv.innerHTML = ''; return; }
    if (lower === 'exit') { closeTerminal(); return; }

    commandInput.disabled = true;

    if (PROFILE[lower]) {
        for (const line of PROFILE[lower]) {
            await typePrint(line, '', 4);
        }
    } else {
        await typePrint(`Command not found: '${raw}'. Type 'help' for available commands.`, '', 4);
    }

    commandInput.disabled = false;
    commandInput.focus();
    scrollToBottom();
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
    }
});

// Focus input when clicking anywhere inside the terminal area
document.getElementById('terminal-container').addEventListener('click', () => {
    commandInput.focus();
});
