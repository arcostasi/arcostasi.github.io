'use strict';

// ─── Profile data ────────────────────────────────────────────────────────────
const PROFILE = {
    whoami: [
        "Hi, I'm Anderson R. Costa (Arcostasi).",
        "Embedded software developer and technical author.",
        "Working across software, firmware, electronics and embedded systems",
        "for agricultural and industrial automation.",
        "",
        "Software developer since 1997 | Maringá - PR, Brazil"
    ],
    skills: [
        "─── TECHNICAL STACK ─────────────────────────",
        "Languages : C / C++, Python, Shell, JavaScript / TypeScript",
        "Embedded  : Firmware architecture, real-time systems, FreeRTOS",
        "Platforms : Embedded Linux, STM32, ESP32, XMC, Microchip",
        "Protocols : CAN / CANopen, SAE J1939, ISOBUS (ISO 11783), LIN",
        "Bench     : CAN diagnostics, Vector CANoe, PCAN-Explorer",
        "Tools     : Oscilloscopes, logic analyzers, Git, CMake, Docker, CI/CD"
    ],
    projects: [
        "─── SELECTED PROJECTS ───────────────────────",
        "<a href='https://github.com/arcostasi/avr8js-electron-playground' target='_blank' rel='noopener'>AVR8js Electron Playground</a> — offline Arduino simulator; circuit editor, peripherals and smoke checks",
        "<a href='https://github.com/arcostasi/harbour-rust' target='_blank' rel='noopener'>Harbour Rust</a> — Rust compiler project for CA-Clipper/Harbour compatibility; CI, tests and releases",
        "<a href='https://github.com/arcostasi/6502-labsim' target='_blank' rel='noopener'>6502 Laboratory Simulator</a> — visual 6502 computer, assembler and validation runner",
        "<a href='https://github.com/arcostasi/esp32-javatari-embedded' target='_blank' rel='noopener'>ESP32 Javatari Embedded</a> — Atari 2600 emulator integrated into an Atari CX40 joystick",
        "",
        "More at github.com/arcostasi"
    ],
    book: [
        "─── BOOK ────────────────────────────────────",
        "Fundamentos de CAN, J1939 e ISOBUS",
        "Do bit ao diagnóstico em tratores e implementos agrícolas",
        "Author: Anderson R. Costa | First edition: 2026",
        "217 pages | 22 chapters | 112 exercises with annotated answers",
        "4 diagnostic case studies | ISBN 9786502404447",
        "Formats: Kindle and e-book PDF",
        "Official site: <a href='https://dobitaocampo.com.br/' target='_blank' rel='noopener'>dobitaocampo.com.br</a>"
    ],
    contact: [
        "─── CONTACT ─────────────────────────────────",
        "GitHub  : <a href='https://github.com/arcostasi' target='_blank' rel='noopener'>github.com/arcostasi</a>",
        "LinkedIn: <a href='https://linkedin.com/in/arcostasi' target='_blank' rel='noopener'>linkedin.com/in/arcostasi</a>",
        "Book    : <a href='https://dobitaocampo.com.br/' target='_blank' rel='noopener'>dobitaocampo.com.br</a>"
    ],
    help: [
        "ARCOS profile shell, version 1.2.0",
        "Type 'help' to see available commands.",
        "Available commands:",
        "  pwd       — Print name of current/working directory",
        "  cd        — Change the shell working directory",
        "  ls        — List directory contents",
        "  cat       — Read a profile file",
        "  vi        — Minimalist text editor",
        "  hexdump   — Display file contents in ASCII, decimal, hex, or octal",
        "  free      — Display amount of free and used memory",
        "  top       — Display simulated profile processes",
        "  whoami    — Print profile information",
        "  skills    — Show the technical stack",
        "  projects  — List selected public projects",
        "  book      — Show the published technical book",
        "  contact   — Show profile links",
        "  clear     — Clear the terminal screen",
        "  help      — Display information about builtin commands",
        "  shutdown  — Halt, power-off or reboot the machine",
        "  reboot    — Reboot the machine",
        "  exit      — Exit the shell"
    ],
    // --- EASTER EGGS ---
    "sudo su": [
        "...",
        "<span style='color: var(--t-red)'>[!] SECURITY VIOLATION DETECTED</span>",
        "User 'arcostasi' is not in the sudoers file.",
        "This incident will be reported.",
        "Attempting to track originating IP... <span style='color: var(--t-green)'>SUCCESS</span>",
        "Initiating self-destruct sequence in 3... 2... 1...",
        "Just kidding. But seriously, nice try."
    ],
    "cat /var/log/syslog": [
        "Oct 14 09:23:41 ar2labs kernel: [    0.000000] Booting Linux on physical CPU 0x0",
        "Oct 14 09:23:41 ar2labs kernel: [    0.000000] Linux version 6.5.0-custom (gcc version 13.2.0, GNU ld (GNU Binutils) 2.40)",
        "Oct 14 09:23:41 ar2labs kernel: [    0.012351] Memory: 1048576K/1048576K available",
        "Oct 14 09:23:42 ar2labs systemd[1]: Starting CAN interface setup...",
        "Oct 14 09:23:42 ar2labs slcand[382]: attached ttyUSB0 to can0",
        "Oct 14 09:23:43 ar2labs kernel: [    1.458921] can: controller area network core",
        "Oct 14 09:23:43 ar2labs modprobe: FATAL: Module i2c_bcm2835 not found.",
        "Oct 14 09:23:43 ar2labs kernel: [    2.103856] j1939: SAE J1939 standard interface",
        "Oct 14 09:24:00 ar2labs user: Compiling kernel mentally while drinking coffee... DONE."
    ],
    "skills --verbose": [
        "─── PROTOCOL NOTES ──────────────────────────",
        "CAN       : differential signalling, arbitration, frames, error confinement",
        "SAE J1939 : 29-bit identifiers, PGN / SPN, NAME, Address Claim, transport",
        "ISOBUS    : Virtual Terminal, Object Pool, Task Controller, TECU",
        "DIAG      : DM1 / DM2 / DM3, trace analysis, layered fault isolation",
        "Reference : Fundamentos de CAN, J1939 e ISOBUS · ISBN 9786502404447"
    ]
};

const BOOT_SEQUENCE = [
    "ARCOS profile shell v1.2.0",
    "Loading /home/arcostasi/resume.txt ... OK",
    "Loading technical stack ... OK",
    "Loading selected projects ... OK",
    "Loading book metadata ... OK",
    "",
    "Author: Anderson R. Costa",
    "Book: Fundamentos de CAN, J1939 e ISOBUS",
    "Focus: CAN / SAE J1939 / ISOBUS",
    "",
    "Profile ready. Type 'help' to explore."
];
