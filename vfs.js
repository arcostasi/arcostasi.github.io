'use strict';

// ─── OS STATE & VFS ────────────────────────────────────────────────────────
let OS_STATE = {
    user: 'arcostasi',
    host: 'embedded-node',
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
        contents: ['resume.txt', 'skills.md', 'projects']
    },
    '/home/arcostasi/projects': {
        type: 'dir',
        contents: ['can_sniffer.c', 'rtos_demo.h']
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
    '/etc/motd': { type: 'file', data: ["Welcome to ARCOS v1.0", "Type 'help' to see available commands."] },
    '/etc/passwd': { type: 'file', data: ["root:x:0:0:root:/root:/bin/bash", "arcostasi:x:1000:1000:Anderson Costa,,,:/home/arcostasi:/bin/bash"] },
    '/var/log/syslog': { type: 'file', data: PROFILE['cat /var/log/syslog'] },
    '/home/arcostasi/projects/can_sniffer.c': {
        type: 'file', data: [
            "// Simple CAN frame sniffer",
            "#include <linux/can.h>",
            "#include <linux/can/raw.h>",
            "int main() {",
            "    int s = socket(PF_CAN, SOCK_RAW, CAN_RAW);",
            "    struct can_frame frame;",
            "    read(s, &frame, sizeof(struct can_frame));",
            "    return 0;",
            "}"
        ]
    },
    '/home/arcostasi/projects/rtos_demo.h': {
        type: 'file', data: [
            "#ifndef RTOS_DEMO_H",
            "#define RTOS_DEMO_H",
            "void vTaskDisplay(void *pvParameters);",
            "void vTaskSensors(void *pvParameters);",
            "#endif"
        ]
    },
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
VFS['/var/log/syslog'] = { type: 'file', data: PROFILE['cat /var/log/syslog'] };

// Requested file modification
VFS['/home/arcostasi/test.txt'] = { type: 'file', data: ["Hello World!!!"] };
if (!VFS['/home/arcostasi'].contents.includes('test.txt')) {
    VFS['/home/arcostasi'].contents.push('test.txt');
}

function syncFileSystem() {
    try {
        localStorage.setItem('arcos_vfs', JSON.stringify(VFS));
    } catch (e) {
        console.error("Failed to save VFS to localStorage", e);
    }
}
