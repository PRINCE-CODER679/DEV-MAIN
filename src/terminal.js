// Interactive DevKraft CLI Terminal Emulator
import { sound } from './audio.js';
import { EVENTS_DATA, PROJECTS_DATA, TEAM_MEMBERS, STATS_DATA } from './projects-data.js';

export function initTerminal(containerId = 'terminal-app') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const outputEl = container.querySelector('.terminal-output');
  const inputEl = container.querySelector('.terminal-input');
  const formEl = container.querySelector('.terminal-form');
  const matrixCanvas = container.querySelector('.terminal-matrix-canvas');

  let history = [];
  let historyIdx = -1;
  let matrixRunning = false;
  let matrixInterval = null;

  const banner = `
<span class="term-dim">┌─────────────────────────────────────────────────────────────┐</span>
<span class="term-orange">  ██████╗ ███████╗██╗   ██╗██╗  ██╗██████╗  █████╗ ███████╗████████╗</span>
<span class="term-orange">  ██╔══██╗██╔════╝██║   ██║██║ ██╔╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝</span>
<span class="term-orange">  ██║  ██║█████╗  ██║   ██║█████╔╝ ██████╔╝███████║█████╗     ██║   </span>
<span class="term-orange">  ██║  ██║██╔══╝  ╚██╗ ██╔╝██╔═██╗ ██╔══██╗██╔══██║██╔══╝     ██║   </span>
<span class="term-orange">  ██████╔╝███████╗ ╚████╔╝ ██║  ██╗██║  ██║██║  ██║██║        ██║   </span>
<span class="term-dim">└─────────────────────────────────────────────────────────────┘</span>
<span class="term-orange">DEVKRAFT CORE SHELL v2.6.4</span> // <span class="term-dim">Dr. D. Y. Patil Institute of Technology, Pimpri, Pune</span>
Type <span class="term-orange">help</span> to view available system routines.
`;

  outputEl.innerHTML = `<div class="term-entry">${banner}</div>`;

  const commands = {
    help: () => `
<span class="term-bold">AVAILABLE ROUTINES:</span>
  <span class="term-orange">about</span>       : Output DevKraft creed & technical charter
  <span class="term-orange">events</span>      : List 3 major events (DevClash, DevTalks, DevChef)
  <span class="term-orange">devclash</span>    : Deep-dive into 24-Hour Hackathon parameters
  <span class="term-orange">devtalks</span>    : Conclave details & speaker roster
  <span class="term-orange">devchef</span>     : Competitive coding & DSA cook-off specs
  <span class="term-orange">projects</span>    : Inspect open-source systems shipped by members
  <span class="term-orange">pillars</span>     : View 4 engineering wings of the collective
  <span class="term-orange">stats</span>       : Render live club telemetry and stats
  <span class="term-orange">sudo join</span>   : Initiate cadet induction protocol
  <span class="term-orange">matrix</span>      : Toggle orange digital rain visualizer
  <span class="term-orange">clear</span>       : Purge terminal stdout buffer
`,
    about: () => `
<span class="term-orange">[DEVKRAFT CHARTER]</span>
DevKraft is a student-led engineering collective at Dr. D. Y. Patil Institute of Technology, Pimpri, Pune.
<span class="term-dim">Philosophy:</span> "CODE IS THE MEDIUM. BUILDING IS THE CULTURE."
We engineer software architectures, competitive algorithmic mastery, and uncompromised digital experiences.
`,
    events: () => `
<span class="term-orange">=== THE DEVKRAFT EVENT TRILOGY ===</span>
[01] <span class="term-orange font-bold">DEVCLASH</span>  - 24-Hour Continuous Hackathon | Prize Pool: ₹1,50,000+
[02] <span class="term-amber font-bold">DEVTALKS</span>  - Industry Keynotes, Architect Teardowns & AMAs
[03] <span class="term-orange font-bold">DEVCHEF</span>   - High-Octane Competitive Coding & DSA Cook-off
Type <span class="term-orange">devclash</span>, <span class="term-amber">devtalks</span>, or <span class="term-orange">devchef</span> for dedicated telemetry.
`,
    devclash: () => `
<span class="term-orange">=== DEVCLASH 2026.1 PROTOCOL ===</span>
<span class="term-bold">FORMAT:</span> 24-Hour Non-stop Physical Hackathon
<span class="term-bold">LOCATION:</span> Dr. DYPIT Pune Campus Auditorium & Labs
<span class="term-bold">TRACKS:</span>
  • Autonomous Agents & Edge AI (₹40,000)
  • Zero-Knowledge & Decentralized Infra (₹40,000)
  • High-Performance Systems & Cyber Security (₹40,000)
  • Creative Coding & Open Innovation (₹30,000)
<span class="term-orange">Action:</span> Click "EXPLORE DEVCLASH" in Events section or type <span class="term-orange">sudo join</span>.
`,
    devtalks: () => `
<span class="term-amber">=== DEVTALKS CONCLAVE PROTOCOL ===</span>
<span class="term-bold">FORMAT:</span> Curated Technical Keynotes & Masterclasses
<span class="term-bold">SPEAKERS:</span> Senior Staff Engineers, Founders & Open-Source Maintainers
<span class="term-bold">TOPICS:</span> Distributed Systems, Kernel Telemetry, Rust/WASM in Prod, Hiring Signal.
`,
    devchef: () => `
<span class="term-orange">=== DEVCHEF ALGORITHMIC COOK-OFF ===</span>
<span class="term-bold">FORMAT:</span> Fast-Paced Competitive Programming & DSA Arena
<span class="term-bold">SCHEDULE:</span> Weekly Cycles (Wednesdays 18:00 IST)
<span class="term-bold">CHALLENGES:</span> Appetizer Array Sprints, DP Main Courses, Syntax Bug Cooking.
`,
    projects: () => {
      return PROJECTS_DATA.map((p, idx) => `
<span class="term-dim">[0${idx + 1}]</span> <span class="term-orange font-bold">${p.name}</span> <span class="term-dim">(${p.category})</span>
  ${p.tagline}
  <span class="term-dim">Stack:</span> ${p.tags.join(', ')} | <span class="term-amber">${p.metrics}</span>
`).join('');
    },
    pillars: () => `
<span class="term-orange">=== 4 ARCHITECTURAL PILLARS ===</span>
[01] <span class="term-orange">PRODUCT ENGINEERING</span> - Distributed apps, WebGL & AI agent pipelines
[02] <span class="term-amber">ALGORITHMIC COMBAT</span>  - Weekly competitive DSA duels & graph topologies
[03] <span class="term-orange">OPEN SOURCE FORGE</span>   - Public Rust crates, zero-knowledge tools & upstream contributions
[04] <span class="term-white font-bold">KEYNOTES & CONCLAVES</span> - Masterclasses and teardowns with industry leads
`,
    stats: () => {
      return STATS_DATA.map(s => `
<span class="term-dim">»</span> <span class="term-bold">${s.label}:</span> <span class="term-orange font-bold">${s.value}</span>
`).join('');
    },
    coords: () => `
<span class="term-orange">LOCATION TELEMETRY:</span>
Dr. D. Y. Patil Institute of Technology
Sant Tukaram Nagar, Pimpri, Pune, Maharashtra 411018
Coordinates: <span class="term-orange">18.6298° N, 73.7997° E</span>
Timezone: <span class="term-dim">Asia/Kolkata (UTC+05:30)</span>
`,
    matrix: () => {
      toggleMatrixRain(matrixCanvas);
      return matrixRunning 
        ? `<span class="term-orange">Matrix visual stream ACTIVATED. Type 'matrix' to deactivate.</span>`
        : `<span class="term-dim">Matrix stream TERMINATED.</span>`;
    },
    'sudo join': () => {
      const joinModal = document.getElementById('join-modal');
      if (joinModal) {
        joinModal.classList.add('active');
        sound.playSuccess();
      }
      return `<span class="term-orange font-bold">INITIATING CADET ONBOARDING GATEWAY... Modal unlocked.</span>`;
    },
    join: () => `Type <span class="term-orange">sudo join</span> with root privilege to access application gateway.`,
    clear: () => {
      outputEl.innerHTML = '';
      return '';
    }
  };

  function toggleMatrixRain(canvas) {
    if (!canvas) return;
    matrixRunning = !matrixRunning;
    if (matrixRunning) {
      canvas.style.display = 'block';
      const ctx = canvas.getContext('2d');
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      const chars = '010101DEVKRAFT_CYBER_SYS_PUNE_2026';
      const fontSize = 12;
      const columns = Math.floor(canvas.width / fontSize);
      const drops = Array(columns).fill(1);

      matrixInterval = setInterval(() => {
        ctx.fillStyle = 'rgba(6, 6, 8, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FF5500';
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }, 35);
    } else {
      if (matrixInterval) clearInterval(matrixInterval);
      canvas.style.display = 'none';
    }
  }

  function executeCommand(rawInput) {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    sound.playTerminalKey();
    history.push(trimmed);
    historyIdx = history.length;

    // Print command line
    const cmdLine = document.createElement('div');
    cmdLine.className = 'term-entry';
    cmdLine.innerHTML = `<span class="term-prompt">cadet@devkraft-pune:~$</span> <span class="term-cmd">${escapeHtml(trimmed)}</span>`;
    outputEl.appendChild(cmdLine);

    const parts = trimmed.split(' ');
    const mainCmd = trimmed.toLowerCase();

    let response = '';

    if (commands[mainCmd]) {
      response = commands[mainCmd]();
    } else if (parts[0].toLowerCase() === 'echo') {
      response = `<div>${escapeHtml(parts.slice(1).join(' '))}</div>`;
    } else if (mainCmd === 'exit' || mainCmd === 'quit') {
      response = `<span class="term-dim">Terminal session remains persistent in browser memory.</span>`;
    } else if (mainCmd === 'date') {
      response = `<div>${new Date().toUTCString()} (IST: ${new Date().toLocaleTimeString('en-IN')})</div>`;
    } else {
      response = `<span class="term-error">Command not recognized: '${escapeHtml(trimmed)}'. Type <span class="term-orange">help</span> for instruction set.</span>`;
    }

    if (response) {
      const resLine = document.createElement('div');
      resLine.className = 'term-entry';
      resLine.innerHTML = response;
      outputEl.appendChild(resLine);
    }

    container.querySelector('.terminal-body').scrollTop = container.querySelector('.terminal-body').scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  if (formEl) {
    formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = inputEl.value;
      inputEl.value = '';
      executeCommand(val);
    });
  }

  if (inputEl) {
    inputEl.addEventListener('keydown', (e) => {
      sound.playTerminalKey();
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIdx > 0) {
          historyIdx--;
          inputEl.value = history[historyIdx] || '';
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIdx < history.length - 1) {
          historyIdx++;
          inputEl.value = history[historyIdx] || '';
        } else {
          historyIdx = history.length;
          inputEl.value = '';
        }
      }
    });
  }

  // Quick chip triggers
  const chips = container.querySelectorAll('.term-quick-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });
}
