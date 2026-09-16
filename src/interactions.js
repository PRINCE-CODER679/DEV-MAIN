// Interactive UI controller, Kinetic Typography, Modals, Audio triggers & Countdowns
import { sound } from './audio.js';
import { EVENTS_DATA } from './projects-data.js';
import { toggleGlobalMatrix } from './canvas.js';
import confetti from 'canvas-confetti';

export function initInteractions() {
  initClock();
  initPreloader();
  initAudioToggle();
  initMatrixHUDToggle();
  initKineticScramble();
  initMagneticElements();
  initCountdown();
  initEventTrilogy();
  initJoinModal();
  initAlgoSimulation();
  initGlobalSounds();
}

// 1. Live Pune Time (IST UTC+5:30)
function initClock() {
  const clockEl = document.getElementById('pune-clock');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    // Options for Indian Standard Time
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const timeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
    clockEl.textContent = `${timeStr} IST`;
  }
  update();
  setInterval(update, 1000);
}

// 2. Preloader boot sequence
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const counter = document.getElementById('preload-counter');
  const bar = document.getElementById('preload-bar');
  if (!preloader) return;

  // Instant safety fallback: dismiss in 700ms max
  setTimeout(() => {
    preloader.classList.add('loaded');
    setTimeout(() => { if (preloader.parentNode) preloader.remove(); }, 500);
  }, 700);

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 10;
    if (progress > 100) progress = 100;

    if (counter) counter.textContent = `${progress.toString().padStart(3, '0')}%`;
    if (bar) bar.style.width = `${progress}%`;

    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('loaded');
        setTimeout(() => { if (preloader.parentNode) preloader.remove(); }, 500);
      }, 200);
    }
  }, 30);
}

// 3. Audio Toggle
function initAudioToggle() {
  const toggleBtn = document.getElementById('audio-toggle-btn');
  const statusText = document.getElementById('audio-status');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const isMuted = !sound.toggle();
    if (statusText) {
      statusText.textContent = isMuted ? 'MUTE [OFF]' : 'ACTIVE [ON]';
      statusText.style.color = isMuted ? 'var(--text-dim)' : 'var(--orange)';
    }
    toggleBtn.classList.toggle('active', !isMuted);
  });
}

function initMatrixHUDToggle() {
  const matrixBtn = document.getElementById('matrix-toggle-hud');
  if (!matrixBtn) return;

  matrixBtn.addEventListener('click', () => {
    sound.playWarp();
    const isActive = toggleGlobalMatrix();
    matrixBtn.classList.toggle('active', isActive);
    if (isActive) {
      matrixBtn.style.borderColor = 'var(--orange)';
      matrixBtn.style.color = '#FFFFFF';
      matrixBtn.style.background = 'rgba(255, 85, 0, 0.18)';
    } else {
      matrixBtn.style.borderColor = '';
      matrixBtn.style.color = '';
      matrixBtn.style.background = '';
    }
  });
}

// 4. Kinetic Scramble on Hover
function initKineticScramble() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}—=+*^?#________';
  const scrambleElements = document.querySelectorAll('[data-scramble]');

  scrambleElements.forEach(el => {
    const originalText = el.textContent;
    let interval = null;

    el.addEventListener('mouseenter', () => {
      sound.playHover();
      let iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        el.textContent = originalText
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '\n') return char;
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        if (iteration >= originalText.length) {
          clearInterval(interval);
        }
        iteration += 1 / 2;
      }, 25);
    });

    el.addEventListener('mouseleave', () => {
      clearInterval(interval);
      el.textContent = originalText;
    });
  });
}

// 5. Magnetic Buttons & Proximity Glow
function initMagneticElements() {
  const magneticEls = document.querySelectorAll('.magnetic-btn');

  magneticEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px)';
    });
  });
}

// 6. Hackathon Live Countdown
function initCountdown() {
  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minsEl = document.getElementById('count-mins');
  const secsEl = document.getElementById('count-secs');

  if (!daysEl) return;

  // Target: 24 October 2026 09:00:00 IST
  const targetDate = new Date('2026-10-24T09:00:00+05:30').getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minsEl.textContent = minutes.toString().padStart(2, '0');
    secsEl.textContent = seconds.toString().padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// 7. Event Trilogy interactive drawer & detail modal
function initEventTrilogy() {
  const eventModal = document.getElementById('event-modal');
  const modalBody = document.getElementById('event-modal-content');
  const closeBtn = document.getElementById('close-event-modal');
  const triggers = document.querySelectorAll('[data-event-trigger]');

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      sound.playClick();
      const eventKey = btn.getAttribute('data-event-trigger');
      const data = EVENTS_DATA[eventKey];
      if (!data || !eventModal) return;

      renderEventDetails(data, modalBody);
      eventModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Listen to custom global trigger from 3D ring cards
  window.addEventListener('openEventModal', (e) => {
    const eventKey = e.detail?.id;
    const data = EVENTS_DATA[eventKey];
    if (!data || !eventModal) return;

    sound.playClick();
    renderEventDetails(data, modalBody);
    eventModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  if (closeBtn && eventModal) {
    closeBtn.addEventListener('click', () => {
      sound.playClick();
      eventModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    eventModal.addEventListener('click', (e) => {
      if (e.target === eventModal) {
        eventModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

function renderEventDetails(data, container) {
  if (!container) return;

  container.innerHTML = `
    <div class="event-detail-header">
      <div class="event-code-badge">${data.code} // ${data.edition}</div>
      <h2 class="event-detail-title">${data.name}</h2>
      <p class="event-detail-tagline">${data.tagline}</p>
    </div>

    <div class="event-meta-grid">
      <div class="meta-item">
        <span class="meta-label">STATUS</span>
        <span class="meta-val status-live">● ${data.status}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">SCHEDULE DATE</span>
        <span class="meta-val">${data.date}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">PRIZE POOL</span>
        <span class="meta-val text-orange font-bold">${data.prizePool}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">FORMAT / DURATION</span>
        <span class="meta-val">${data.duration}</span>
      </div>
      <div class="meta-item full-width">
        <span class="meta-label">CAMPUS VENUE</span>
        <span class="meta-val">${data.venue}</span>
      </div>
    </div>

    <div class="event-desc-box">
      <p>${data.description}</p>
    </div>

    <div class="event-section-subhead">CHALLENGE TRACKS & BOUNTIES</div>
    <div class="event-tracks-grid">
      ${data.tracks.map(t => `
        <div class="track-card">
          <div class="track-top">
            <span class="track-tag">${t.tag}</span>
            <span class="track-bounty">${t.bounty}</span>
          </div>
          <h4 class="track-title">${t.title}</h4>
          <p class="track-desc">${t.desc}</p>
        </div>
      `).join('')}
    </div>

    <div class="event-section-subhead">SPRINT TIMELINE</div>
    <div class="event-timeline-list">
      ${data.timeline.map(item => `
        <div class="timeline-row">
          <span class="time-col">${item.time}</span>
          <span class="desc-col">${item.event}</span>
        </div>
      `).join('')}
    </div>

    <div class="event-modal-cta">
      <button class="brutal-btn-primary" id="event-action-btn">
        <span>REGISTER FOR ${data.name} ↗</span>
      </button>
    </div>
  `;

  const actionBtn = container.querySelector('#event-action-btn');
  if (actionBtn) {
    actionBtn.addEventListener('click', () => {
      const eventModal = document.getElementById('event-modal');
      const joinModal = document.getElementById('join-modal');
      if (eventModal) eventModal.classList.remove('active');
      if (joinModal) {
        joinModal.classList.add('active');
        sound.playSuccess();
      }
    });
  }
}

// 8. Cadet Join / Onboarding Modal
function initJoinModal() {
  const joinModal = document.getElementById('join-modal');
  const triggers = document.querySelectorAll('[data-join-trigger]');
  const closeBtn = document.getElementById('close-join-modal');
  const form = document.getElementById('cadet-join-form');
  const successState = document.getElementById('join-success-state');

  triggers.forEach(t => {
    t.addEventListener('click', (e) => {
      e.preventDefault();
      sound.playClick();
      if (joinModal) {
        joinModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeBtn && joinModal) {
    closeBtn.addEventListener('click', () => {
      sound.playClick();
      joinModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    joinModal.addEventListener('click', (e) => {
      if (e.target === joinModal) {
        joinModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      sound.playSuccess();

      // Confetti burst (Orange & Amber theme)
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#FF5500', '#FFAA00', '#FFFFFF', '#FF3344']
      });

      if (form) form.style.display = 'none';
      if (successState) successState.style.display = 'block';
    });
  }
}

// 10. Algorithmic Arena Live Simulation
function initAlgoSimulation() {
  const runnerBtn = document.getElementById('run-algo-test-btn');
  const consoleOutput = document.getElementById('algo-console-stdout');
  if (!runnerBtn || !consoleOutput) return;

  const testLogs = [
    "[INFO] Initializing Graph Adjacency Matrix (N=100,000, M=450,000)...",
    "[EXEC] Running Tarjan's Strongly Connected Components...",
    "[PASS] Topological sort verified in 4.2ms.",
    "[BENCH] Memory footprint: 18.4MB / Max heap ceiling: 128MB",
    "[STATUS] ALL 48 TEST CASES PASSED WITH 0 ERROR MARGIN. SCORE: 100/100."
  ];

  runnerBtn.addEventListener('click', () => {
    sound.playClick();
    runnerBtn.disabled = true;
    runnerBtn.innerHTML = `<span>COMPILING & EXECUTING...</span>`;
    consoleOutput.innerHTML = `<span class="term-dim">// Spawning sandboxed isolated WASM executor...</span>`;

    let step = 0;
    const interval = setInterval(() => {
      if (step < testLogs.length) {
        sound.playTerminalKey();
        const p = document.createElement('div');
        p.className = step === testLogs.length - 1 ? 'term-orange term-bold' : 'term-dim';
        p.textContent = testLogs[step];
        consoleOutput.appendChild(p);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
        step++;
      } else {
        clearInterval(interval);
        sound.playSuccess();
        runnerBtn.disabled = false;
        runnerBtn.innerHTML = `<span>EXECUTE ALGORITHMIC SUITE ⚡</span>`;
      }
    }, 400);
  });
}

// 11. Global Sound triggers on hover/click for buttons & interactive elements
function initGlobalSounds() {
  document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => sound.playHover());
  });
}
