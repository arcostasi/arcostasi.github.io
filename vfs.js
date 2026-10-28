'use strict';

// ─── OS STATE & VFS ────────────────────────────────────────────────────────
let OS_STATE = {
    user: 'arcostasi',
    host: 'ar2labs',
    cwd: '/home/arcostasi',
    history: [],
    historyIndex: -1
};

const DEFAULT_VFS = {
    '/': {
        type: 'dir',
        contents: ['home', 'etc', 'var', 'dev']
    },
    '/home': {
        type: 'dir',
        contents: ['arcostasi']
    },
    '/home/arcostasi': {
        type: 'dir',
        contents: ['resume.txt', 'skills.md', 'book.txt', 'projects']
    },
    '/home/arcostasi/projects': {
        type: 'dir',
        contents: ['avr8js-electron-playground.md', 'harbour-rust.md', '6502-labsim.md', 'esp32-javatari-embedded.md']
    },
    '/etc': {
        type: 'dir',
        contents: ['passwd', 'motd']
    },
    '/var': {
        type: 'dir',
        contents: ['log']
    },
    '/var/log': {
        type: 'dir',
        contents: ['syslog']
    },
    '/dev': {
        type: 'dir',
        contents: ['ttyUSB0', 'can0', 'null']
    },

    // Virtual Files
    '/home/arcostasi/resume.txt': { type: 'file', data: PROFILE['whoami'] },
    '/home/arcostasi/skills.md': { type: 'file', data: PROFILE['skills'] },
    '/home/arcostasi/book.txt': { type: 'file', data: PROFILE['book'] },
    '/etc/motd': { type: 'file', data: ["Welcome to the ARCOS profile shell v1.2", "Type 'help' to explore the profile and book."] },
    '/etc/passwd': { type: 'file', data: ["root:x:0:0:root:/root:/bin/bash", "arcostasi:x:1000:1000:Anderson R. Costa,,,:/home/arcostasi:/bin/bash"] },
    '/var/log/syslog': { type: 'file', data: PROFILE['cat /var/log/syslog'] },
    '/home/arcostasi/projects/avr8js-electron-playground.md': { type: 'file', data: ["AVR8js Electron Playground", "Offline Arduino simulator with visual circuit editing, live peripherals, diagnostics and performance smoke checks.", "https://github.com/arcostasi/avr8js-electron-playground"] },
    '/home/arcostasi/projects/harbour-rust.md': { type: 'file', data: ["Harbour Rust", "Rust compiler project for CA-Clipper/Harbour compatibility, with CI, tests, releases and documentation.", "https://github.com/arcostasi/harbour-rust"] },
    '/home/arcostasi/projects/6502-labsim.md': { type: 'file', data: ["6502 Laboratory Simulator", "Interactive MOS 6502 computer with assembler, live bus visualization and validation test runner.", "https://github.com/arcostasi/6502-labsim"] },
    '/home/arcostasi/projects/esp32-javatari-embedded.md': { type: 'file', data: ["ESP32 Javatari Embedded", "Atari 2600 emulator integrated into an Atari CX40 joystick with ESP32; build guide and photos.", "https://github.com/arcostasi/esp32-javatari-embedded"] },
    '/dev/ttyUSB0': { type: 'file', data: ["<span style='color: var(--t-red)'>Permission denied</span>"] },
    '/dev/can0': { type: 'file', data: ["<span style='color: var(--t-red)'>Permission denied</span>"] },
    '/dev/null': { type: 'file', data: [] }
};

let VFS;
try {
    const savedVfs = localStorage.getItem('arcos_vfs');
    if (savedVfs) {
        VFS = JSON.parse(savedVfs);
    } else {
        VFS = JSON.parse(JSON.stringify(DEFAULT_VFS));
    }
} catch (e) {
    console.error("Failed to load VFS from localStorage", e);
    VFS = JSON.parse(JSON.stringify(DEFAULT_VFS));
}

// Always ensure core profile files are up to date from profile.js
VFS['/home/arcostasi/resume.txt'] = { type: 'file', data: PROFILE['whoami'] };
VFS['/home/arcostasi/skills.md'] = { type: 'file', data: PROFILE['skills'] };
VFS['/home/arcostasi/book.txt'] = { type: 'file', data: PROFILE['book'] };
if (!VFS['/home/arcostasi'].contents.includes('book.txt')) VFS['/home/arcostasi'].contents.push('book.txt');
VFS['/home/arcostasi/projects'] = DEFAULT_VFS['/home/arcostasi/projects'];
for (const path of Object.keys(DEFAULT_VFS)) { if (path.startsWith('/home/arcostasi/projects/')) VFS[path] = DEFAULT_VFS[path]; }
delete VFS['/home/arcostasi/projects/can_sniffer.c'];
delete VFS['/home/arcostasi/projects/rtos_demo.h'];
delete VFS['/home/arcostasi/projects/my-wokwi-projects.md'];
delete VFS['/home/arcostasi/test.txt'];
VFS['/home/arcostasi'].contents = VFS['/home/arcostasi'].contents.filter(name => name !== 'test.txt');
VFS['/var/log/syslog'] = { type: 'file', data: PROFILE['cat /var/log/syslog'] };


function syncFileSystem() {
    try {
        localStorage.setItem('arcos_vfs', JSON.stringify(VFS));
    } catch (e) {
        console.error("Failed to save VFS to localStorage", e);
    }
}
