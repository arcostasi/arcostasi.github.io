'use strict';

// ─── Micro OS Engine ────────────────────────────────────────────────────────
function updatePrompt() {
    let displayCwd = OS_STATE.cwd;
    if (displayCwd.startsWith('/home/arcostasi')) {
        displayCwd = displayCwd.replace('/home/arcostasi', '~');
    }

    // Update the visual input prompt
    const promptHost = document.querySelector('#input-line .prompt-host');
    promptHost.textContent = OS_STATE.host; // Fix the explicit :~ bug if present in index.html

    const existingPathSpan = document.querySelector('#input-line .prompt-path');
    if (existingPathSpan) {
        existingPathSpan.remove();
    }

    const promptSign = document.querySelector('#input-line .prompt-sign');
    promptSign.textContent = '$';

    // Create new path string element
    const pathSpan = document.createElement('span');
    pathSpan.className = 'prompt-path';
    pathSpan.style.color = 'var(--t-cyan)';
    pathSpan.textContent = ':' + displayCwd;

    document.querySelector('#input-line .prompt').insertBefore(pathSpan, promptSign);

    return `<span class="prompt-user">${OS_STATE.user}</span><span class="prompt-at">@</span><span class="prompt-host">${OS_STATE.host}</span><span style="color:var(--t-cyan)">:${displayCwd}</span><span class="prompt-sign">$</span> `;
}

async function runBootSequence() {
    inputLine.style.display = 'none';
    for (const line of BOOT_SEQUENCE) {
        await typePrint(line, '', 7);
        await new Promise(r => setTimeout(r, 30));
    }

    // Setup initial prompt
    updatePrompt();

    inputLine.style.display = 'flex';
    commandInput.disabled = false;
    commandInput.focus();
}

function resolvePath(target) {
    if (!target) return OS_STATE.cwd;
    if (target === '/') return '/';
    if (target === '~') return '/home/arcostasi';

    let base = target.startsWith('/') ? '/' : OS_STATE.cwd;
    let parts = target.split('/').filter(p => p !== '');
    let currentParts = base === '/' ? [] : base.split('/').filter(p => p !== '');

    for (let p of parts) {
        if (p === '.') continue;
        if (p === '..') {
            currentParts.pop();
        } else {
            currentParts.push(p);
        }
    }

    let resolved = '/' + currentParts.join('/');
    return resolved.length > 1 && resolved.endsWith('/') ? resolved.slice(0, -1) : resolved;
}

// ─── Command Router ──────────────────────────────────────────────────────────
async function processCommand(cmd) {
    const raw = cmd.trim();
    if (raw) {
        OS_STATE.history.push(raw);
        OS_STATE.historyIndex = OS_STATE.history.length;
    }

    // Echo command
    const promptHtml = updatePrompt();
    const echo = document.createElement('div');
    echo.className = 'output-line command-echo';
    echo.innerHTML = `${promptHtml}${raw}`;
    outputDiv.appendChild(echo);

    if (raw === '') { scrollToBottom(); return; }
    if (raw.toLowerCase() === 'clear') { outputDiv.innerHTML = ''; return; }
    if (raw.toLowerCase() === 'exit') { closeTerminal(); return; }

    commandInput.disabled = true;

    const args = raw.split(' ').filter(p => p !== '');
    const command = args[0].toLowerCase();

    // Route Command using switch to reduce cognitive complexity
    switch (command) {
        case 'pwd':
            await typePrint(OS_STATE.cwd, '', 0);
            break;

        case 'cd':
            const targetCd = args[1] || '~';
            const resPathCd = resolvePath(targetCd);
            if (VFS[resPathCd]?.type === 'dir') {
                OS_STATE.cwd = resPathCd;
                updatePrompt();
            } else if (VFS[resPathCd]?.type === 'file') {
                await typePrint(`cd: ${targetCd}: Not a directory`, '', 0);
            } else {
                await typePrint(`cd: ${targetCd}: No such file or directory`, '', 0);
            }
            break;

        case 'ls':
            const targetLs = args[1] && !args[1].startsWith('-') ? resolvePath(args[1]) : OS_STATE.cwd;
            const isLong = args.includes('-l') || args.includes('-la') || args.includes('-al');

            if (VFS[targetLs]?.type === 'dir') {
                let output = [];
                let items = [...VFS[targetLs].contents];
                if (args.includes('-la') || args.includes('-al')) {
                    items.unshift('.', '..');
                }

                if (isLong) {
                    output.push(`total ${items.length * 4}`);
                    const sortedItems = items.slice().sort((a, b) => a.localeCompare(b));
                    for (let item of sortedItems) {
                        let itemPath = item === '.' ? targetLs : item === '..' ? resolvePath(targetLs + '/..') : resolvePath(targetLs + '/' + item);
                        let isDir = VFS[itemPath]?.type === 'dir';
                        let perms = isDir ? "drwxr-xr-x" : "-rw-r--r--";
                        let size = isDir ? 4096 : (VFS[itemPath]?.data ? VFS[itemPath].data.join('').length * 12 : 1024);
                        let color = isDir ? 'var(--t-cyan)' : 'var(--t-text)';

                        let paddedSize = size.toString().padStart(5, ' ');
                        output.push(`${perms} 2 arcostasi arcostasi ${paddedSize} Oct 14 09:23 <span style="color:${color};font-weight:600">${item}</span>`);
                    }
                } else {
                    const sortedItems = items.slice().sort((a, b) => a.localeCompare(b));
                    let coloredItems = sortedItems.map(item => {
                        let itemPath = item === '.' ? targetLs : item === '..' ? resolvePath(targetLs + '/..') : resolvePath(targetLs + '/' + item);
                        return (VFS[itemPath]?.type === 'dir') ? `<span style="color:var(--t-cyan);font-weight:600">${item}</span>` : item;
                    });
                    output.push(coloredItems.join('  '));
                }
                for (const line of output) {
                    await typePrint(line, '', 0);
                }
            } else if (VFS[targetLs]?.type === 'file') {
                await typePrint(args[1], '', 0);
            } else {
                await typePrint(`ls: cannot access '${targetLs}': No such file or directory`, '', 0);
            }
            break;

        case 'cat':
            if (!args[1]) {
                await typePrint("cat: missing file operand", '', 0);
            } else {
                const targetCat = resolvePath(args[1]);
                if (VFS[targetCat]?.type === 'file') {
                    for (const line of VFS[targetCat].data) {
                        await typePrint(line, '', 2);
                    }
                } else if (VFS[targetCat]?.type === 'dir') {
                    await typePrint(`cat: ${args[1]}: Is a directory`, '', 0);
                } else {
                    await typePrint(`cat: ${args[1]}: No such file or directory`, '', 0);
                }
            }
            break;

        case 'vi':
            if (!args[1]) {
                await typePrint("vi: missing file operand", '', 0);
            } else {
                const targetVi = resolvePath(args[1]);
                if (VFS[targetVi]?.type === 'dir') {
                    await typePrint(`vi: ${args[1]}: Is a directory`, '', 0);
                } else if (!VFS[targetVi]) {
                    // New file, start with empty content
                    if (typeof openEditor === 'function') openEditor(targetVi, "");
                    return; // Input re-enable handled by closeEditor
                } else {
                    // Existing file
                    if (typeof openEditor === 'function') openEditor(targetVi, VFS[targetVi].data.join('\n'));
                    return; // Input re-enable handled by closeEditor
                }
            }
            break;

        case 'free':
            await typePrint("               total        used        free      shared  buff/cache   available", '', 0);
            await typePrint("Mem:          102400       28450       12000         128       61822       58900", '', 0);
            await typePrint("Swap:          16384           0       16384", '', 0);
            break;

        case 'top':
        case 'htop':
            await typePrint("top - 09:42:15 up 8 days,  1:12,  1 user,  load average: 0.15, 0.22, 0.18", '', 0);
            await typePrint("Tasks: 112 total,   2 running, 110 sleeping,   0 stopped,   0 zombie", '', 0);
            await typePrint("%Cpu(s):  5.2 us,  1.1 sy,  0.0 ni, 93.6 id,  0.0 wa,  0.0 hi,  0.1 si,  0.0 st", '', 0);
            await typePrint("MiB Mem :  100.0 total,   11.7 free,   27.7 used,   60.3 buff/cache", '', 0);
            await typePrint("MiB Swap:   16.0 total,   16.0 free,    0.0 used.   57.5 avail Mem ", '', 0);
            await typePrint("", '', 0);
            await typePrint("  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND", '', 0);
            await typePrint(" 3001 system    20   0  504832 201408 110240 R  99.9  50.0  12:30.15 ISOBUS_Virtual", '', 0);
            await typePrint(" 3000 system    20   0  204800  51400  20240 S  80.0  25.0  08:15.22 J1939_Stack", '', 0);
            await typePrint(" 2090 arcostasi 20   0  100200  10200   5000 S   5.0   5.1  01:05.11 zsh", '', 0);
            await typePrint(" 1235 root      -5   0   50000   1400   1000 S   2.0   1.4  00:45.33 FreeRTOS_task", '', 0);
            break;

        case 'hexdump':
            if (!args[1]) {
                await typePrint("hexdump: missing file operand", '', 0);
            } else {
                const targetHex = resolvePath(args[1]);
                if (VFS[targetHex]?.type === 'file') {
                    const fileContent = VFS[targetHex].data.join('\n');
                    for (let i = 0; i < fileContent.length; i += 16) {
                        let chunk = fileContent.slice(i, i + 16);
                        let hexStr = '';
                        let asciiStr = '';
                        for (let j = 0; j < 16; j++) {
                            if (j < chunk.length) {
                                let charCode = chunk.charCodeAt(j);
                                hexStr += charCode.toString(16).padStart(2, '0') + ' ';
                                // Replace non-printable characters and HTML brackets with dot
                                asciiStr += (charCode >= 32 && charCode <= 126 && charCode !== 60 && charCode !== 62) ? chunk.charAt(j) : '.';
                            } else {
                                hexStr += '   ';
                                asciiStr += ' ';
                            }
                            if (j === 7) hexStr += ' ';
                        }
                        const offsetStr = i.toString(16).padStart(8, '0');
                        await typePrint(`${offsetStr}  ${hexStr}  |${asciiStr}|`, '', 1);
                    }
                    await typePrint((fileContent.length).toString(16).padStart(8, '0'), '', 1);
                } else if (VFS[targetHex]?.type === 'dir') {
                    await typePrint(`hexdump: ${args[1]}: Is a directory`, '', 0);
                } else {
                    await typePrint(`hexdump: ${args[1]}: No such file or directory`, '', 0);
                }
            }
            break;

        case 'shutdown':
            await typePrint("Broadcast message from root@embedded-node (tty1):", '', 0);
            await typePrint(`The system is going down for poweroff NOW!`, '', 0);
            await new Promise(r => setTimeout(r, 1000));
            closeTerminal();
            outputDiv.innerHTML = '';
            break;

        case 'reboot':
            await typePrint("Broadcast message from root@embedded-node (tty1):", '', 0);
            await typePrint(`The system is going down for reboot NOW!`, '', 0);
            await new Promise(r => setTimeout(r, 1000));
            outputDiv.innerHTML = '';
            OS_STATE.cwd = '/home/arcostasi';
            OS_STATE.history = [];
            OS_STATE.historyIndex = -1;
            await runBootSequence();
            return; // Exit early to avoid re-enabling input down below

        default:
            if (PROFILE[command]) {
                // Fallback for legacy static profile commands (whoami, help, projects, skills, etc)
                for (const line of PROFILE[command]) {
                    if (command === 'sudo su' || command === 'skills --verbose' || command === 'cat /var/log/syslog') {
                        // Keep easter eggs exact
                        await typePrint(line, '', 4);
                    } else {
                        await typePrint(line, '', 2);
                    }
                }
            } else if (raw.toLowerCase() === 'sudo su') {
                for (const line of PROFILE['sudo su']) await typePrint(line, '', 4);
            } else if (raw.toLowerCase() === 'skills --verbose') {
                for (const line of PROFILE['skills --verbose']) await typePrint(line, '', 4);
            } else if (raw.toLowerCase() === 'cat /var/log/syslog') {
                for (const line of PROFILE['cat /var/log/syslog']) await typePrint(line, '', 4);
            } else {
                await typePrint(`Command not found: '${command}'. Type 'help' for available commands.`, '', 0);
            }
            break;
    }

    commandInput.disabled = false;
    commandInput.focus();
    scrollToBottom();
}

async function handleAutocomplete(inputElement) {
    const raw = inputElement.value;
    if (!raw) return;

    // Disable input while printing to prevent weird behavior
    inputElement.disabled = true;

    const parts = raw.split(' ');

    // Determine the list of available commands
    const baseCommands = ['pwd', 'cd', 'ls', 'cat', 'vi', 'free', 'top', 'htop', 'hexdump', 'clear', 'exit', 'shutdown', 'reboot'];
    const profileCommands = Object.keys(PROFILE).filter(cmd => !cmd.includes(' ')); // ignore easter eggs with spaces
    const allCommands = [...new Set([...baseCommands, ...profileCommands])];

    if (parts.length === 1) {
        // Autocomplete command
        const partial = parts[0].toLowerCase();
        const matches = allCommands.filter(cmd => cmd.startsWith(partial));

        if (matches.length === 1) {
            inputElement.value = matches[0] + ' ';
        } else if (matches.length > 1) {
            // Print options
            const promptHtml = updatePrompt();
            const echo = document.createElement('div');
            echo.className = 'output-line command-echo';
            echo.innerHTML = `${promptHtml}${raw}`;
            outputDiv.appendChild(echo);

            await typePrint(matches.join('  '), '', 0);
            scrollToBottom();
        }
    } else {
        // Autocomplete file path (arguments)
        const partial = parts[parts.length - 1];

        // Split partial into directory path and file prefix
        const lastSlashIndex = partial.lastIndexOf('/');
        let dirPath = '';
        let prefix = partial;

        if (lastSlashIndex !== -1) {
            dirPath = partial.substring(0, lastSlashIndex);
            prefix = partial.substring(lastSlashIndex + 1);
        } else if (partial === '~') {
            dirPath = '~';
            prefix = '';
        }

        const targetDir = resolvePath(dirPath || '.');

        if (VFS[targetDir] && VFS[targetDir].type === 'dir') {
            const contents = VFS[targetDir].contents;
            const matches = contents.filter(item => item.startsWith(prefix));

            if (matches.length === 1) {
                const matchName = matches[0];
                const matchFullPath = targetDir === '/' ? `/${matchName}` : `${targetDir}/${matchName}`;
                const isDir = VFS[matchFullPath] && VFS[matchFullPath].type === 'dir';

                parts[parts.length - 1] = dirPath ? (dirPath.endsWith('/') ? `${dirPath}${matchName}` : `${dirPath}/${matchName}`) : matchName;
                inputElement.value = parts.join(' ') + (isDir ? '/' : ' ');
            } else if (matches.length > 1) {
                // Print options
                const promptHtml = updatePrompt();
                const echo = document.createElement('div');
                echo.className = 'output-line command-echo';
                echo.innerHTML = `${promptHtml}${raw}`;
                outputDiv.appendChild(echo);

                const coloredMatches = matches.map(item => {
                    const itemPath = targetDir === '/' ? `/${item}` : `${targetDir}/${item}`;
                    return (VFS[itemPath] && VFS[itemPath].type === 'dir') ? `<span style="color:var(--t-cyan);font-weight:600">${item}</span>` : item;
                });

                await typePrint(coloredMatches.join('  '), '', 0);
                scrollToBottom();
            }
        }
    }

    inputElement.disabled = false;
    inputElement.focus();
}
