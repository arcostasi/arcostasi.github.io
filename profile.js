'use strict';

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
        "ARCOS shell, version 1.0.0(1)-release",
        "These shell commands are defined internally. Type 'help' to see this list.",
        "Available commands:",
        "  pwd       — Print name of current/working directory",
        "  cd        — Change the shell working directory",
        "  ls        — List directory contents",
        "  cat       — Concatenate files and print on the standard output",
        "  vi        — Minimalist text editor",
        "  hexdump   — Display file contents in ASCII, decimal, hex, or octal",
        "  free      — Display amount of free and used memory",
        "  top       — Display Linux processes",
        "  whoami    — Print effective user information",
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
        "Oct 14 09:23:41 embedded-node kernel: [    0.000000] Booting Linux on physical CPU 0x0",
        "Oct 14 09:23:41 embedded-node kernel: [    0.000000] Linux version 6.5.0-custom (gcc version 13.2.0, GNU ld (GNU Binutils) 2.40)",
        "Oct 14 09:23:41 embedded-node kernel: [    0.012351] Memory: 1048576K/1048576K available",
        "Oct 14 09:23:42 embedded-node systemd[1]: Starting CAN interface setup...",
        "Oct 14 09:23:42 embedded-node slcand[382]: attached ttyUSB0 to can0",
        "Oct 14 09:23:43 embedded-node kernel: [    1.458921] can: controller area network core",
        "Oct 14 09:23:43 embedded-node modprobe: FATAL: Module i2c_bcm2835 not found.",
        "Oct 14 09:23:43 embedded-node kernel: [    2.103856] j1939: SAE J1939 standard interface",
        "Oct 14 09:24:00 embedded-node user: Compiling kernel mentally while drinking coffee... DONE."
    ],
    "skills --verbose": [
        "root     1234  0.0  0.1  STM32F4          /usr/bin/hal_configuration",
        "root     1235  2.0  1.4  FreeRTOS         /sbin/task_scheduler -p 5",
        "user     2090  5.0  3.2  C/C++            /mnt/dev/pointers_and_references",
        "user     2091 10.0  4.5  Python           /home/arcostasi/scripts/can_decode.py",
        "user     2100  0.1  0.0  Bash             grep -rn 'TODO' ./project",
        "system   3000 80.0 50.0  J1939_Stack      [kworker/u4:2-can0]",
        "system   3001 99.9 90.0  ISOBUS_Virtual   [kthread_iso11783]",
        "system   4112 10.0  5.0  Hardware_Debug   /opt/oscilloscope/run",
        "--> WARNING: High CPU usage in [ISOBUS_Virtual]. Engineer is currently optimizing."
    ]
};

const BOOT_SEQUENCE = [
    "U-Boot 2026.04-arcos (Mar 08 2026 - 21:15:00 +0000)",
    "CPU: ARM Cortex-M7 rev 1 (v7l) @ 480 MHz",
    "DRAM:  1024 KiB",
    "Flash: 2048 KiB",
    "Loading RTOS kernel image... OK",
    "Booting ARCOS Kernel v1.0.0-release...",
    "[    0.012351] Memory boundary mapping: 0x20000000 - 0x2003FFFF",
    "[    0.045012] Initializing Field Protocols...",
    "[    0.089100] isobus_core: ISO 11783 Stack loaded",
    "[    0.104230] j1939_stack: SAE J1939 target address claimed",
    "[    0.150499] can0: bitrate 250000, sample-point 0.875",
    "[    0.151000] RTOS Scheduler started. 4 tasks active.",
    "",
    "Welcome to ARCOS v1.0",
    "Type 'help' to see available commands."
];
