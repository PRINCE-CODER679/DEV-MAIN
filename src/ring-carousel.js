// High-Precision 3D Cylindrical Orbital Ring Carousel for DEVCLASH, DEVTALKS, DEVCHEF (Orange & Black Theme)
import { sound } from './audio.js';
import { EVENTS_DATA } from './projects-data.js';

export function initRingCarousel(containerId = 'event-ring-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const ring = container.querySelector('.ring-carousel');
  const prevBtn = container.querySelector('#ring-prev-btn');
  const nextBtn = container.querySelector('#ring-next-btn');
  const autoToggleBtn = container.querySelector('#ring-auto-btn');
  const autoStatus = container.querySelector('#ring-auto-status');
  const angleDisplay = container.querySelector('#ring-angle-readout');
  const activeEventName = container.querySelector('#ring-active-event-name');
  const tabButtons = container.querySelectorAll('.ring-selector-tab');

  const eventsArray = Object.values(EVENTS_DATA); // 3 Events: devclash, devtalks, devchef
  const totalItems = eventsArray.length; // 3
  const theta = 360 / totalItems; // 120 deg

  let currentAngle = 0;
  let targetAngle = 0;
  let isDragging = false;
  let startX = 0;
  let prevX = 0;
  let autoRotate = true;
  let autoSpeed = 0.12;
  let animationFrameId;

  function getRadius() {
    const width = window.innerWidth;
    if (width < 380) return 160;
    if (width < 480) return 185;
    if (width < 640) return 210;
    if (width < 1024) return 280;
    return 360;
  }

  function buildRing() {
    ring.innerHTML = '';
    const radius = getRadius();

    eventsArray.forEach((ev, idx) => {
      const card = document.createElement('div');
      card.className = `ring-card ring-card-${idx} group`;
      card.setAttribute('data-id', ev.id);
      card.setAttribute('data-index', idx);

      const baseAngle = theta * idx;
      card.style.transform = `rotateY(${baseAngle}deg) translateZ(${radius}px)`;

      card.innerHTML = `
        <div class="ring-card-inner border-2 p-5 md:p-6 flex flex-col justify-between h-full bg-obsidian/95 backdrop-blur-2xl transition-all duration-300 relative overflow-hidden select-none" style="border-color: ${ev.accent}; box-shadow: 0 0 35px ${ev.accent}20;">
          
          <!-- Subtle Index Number Watermark -->
          <div class="absolute -right-3 -bottom-3 font-syne font-black text-7xl md:text-8xl opacity-5 pointer-events-none select-none" style="color: ${ev.accent};">
            0${idx + 1}
          </div>

          <!-- Top Meta Bar -->
          <div>
            <div class="flex items-center justify-between font-mono text-[10px] mb-3 pb-2 border-b border-border-subtle">
              <span class="px-2 py-0.5 font-bold uppercase tracking-wider text-black" style="background-color: ${ev.accent};">
                ${ev.badge}
              </span>
              <span class="text-text-dim font-bold tracking-widest">${ev.code}</span>
            </div>

            <!-- Event Title & Tagline -->
            <h3 class="font-syne font-black text-2xl md:text-3xl text-white tracking-tight uppercase leading-tight">
              ${ev.name}
            </h3>
            <div class="font-mono text-[11px] font-bold mt-1 tracking-tight" style="color: ${ev.accent};">
              ${ev.tagline}
            </div>

            <!-- Short Concise Description -->
            <p class="font-space text-xs text-paper-secondary mt-3 leading-relaxed">
              ${ev.description}
            </p>
          </div>

          <!-- Concise Key Meta Rows & Button -->
          <div class="mt-4 pt-3 border-t border-border-subtle/80 flex flex-col gap-2 font-mono text-xs">
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-text-dim">PRIZE / PERKS</span>
              <span class="font-bold text-white">${ev.prizePool}</span>
            </div>
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-text-dim">SCHEDULE</span>
              <span class="text-paper">${ev.date}</span>
            </div>
            
            <button class="ring-card-trigger-btn w-full mt-2 py-2.5 font-mono text-xs font-bold text-black flex items-center justify-center gap-1 transition-all hover:bg-white" style="background-color: ${ev.accent};" data-event-trigger="${ev.id}">
              <span>OPEN ${ev.name} DOSSIER ↗</span>
            </button>
          </div>
        </div>
      `;

      ring.appendChild(card);
    });

    attachCardTriggers();
  }

  function attachCardTriggers() {
    container.querySelectorAll('[data-event-trigger]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const evId = btn.getAttribute('data-event-trigger');
        const customEvent = new CustomEvent('openEventModal', { detail: { id: evId } });
        window.dispatchEvent(customEvent);
      });
    });
  }

  function updateActiveState() {
    let normalized = ((-targetAngle % 360) + 360) % 360;
    let activeIdx = Math.round(normalized / theta) % totalItems;
    const activeData = eventsArray[activeIdx];

    if (activeEventName && activeData) {
      activeEventName.textContent = `NODE [${activeData.code}]: ${activeData.name}`;
      activeEventName.style.color = activeData.accent;
    }

    if (angleDisplay) {
      const displayAngle = Math.round((currentAngle % 360 + 360) % 360);
      angleDisplay.textContent = `${displayAngle.toString().padStart(3, '0')}°`;
    }

    // Update Tab selector buttons
    tabButtons.forEach((tab, i) => {
      const isActive = i === activeIdx;
      tab.classList.toggle('active', isActive);
      if (isActive && eventsArray[i]) {
        tab.style.borderColor = eventsArray[i].accent;
        tab.style.color = '#FFFFFF';
        tab.style.backgroundColor = 'rgba(255, 85, 0, 0.12)';
      } else {
        tab.style.borderColor = '';
        tab.style.color = '';
        tab.style.backgroundColor = '';
      }
    });

    // Update depth & scale on cards
    const cards = ring.querySelectorAll('.ring-card');
    cards.forEach((card, i) => {
      const cardBaseAngle = i * theta;
      const relativeAngle = ((cardBaseAngle + currentAngle) % 360 + 540) % 360 - 180;
      const rad = (relativeAngle * Math.PI) / 180;
      const cos = Math.cos(rad);

      if (cos > 0.45) {
        card.style.opacity = '1';
        card.style.filter = 'none';
        card.style.zIndex = '10';
        card.style.pointerEvents = 'auto';
      } else {
        card.style.opacity = '0.5';
        card.style.filter = 'brightness(0.55) blur(0.8px)';
        card.style.zIndex = '2';
        card.style.pointerEvents = 'auto';
      }
    });
  }

  function render() {
    if (autoRotate && !isDragging) {
      targetAngle -= autoSpeed;
    }

    currentAngle += (targetAngle - currentAngle) * 0.1;
    ring.style.transform = `rotateY(${currentAngle}deg)`;

    updateActiveState();
    animationFrameId = requestAnimationFrame(render);
  }

  function onPointerDown(e) {
    isDragging = true;
    startX = e.pageX || (e.touches && e.touches[0].pageX);
    prevX = startX;
    container.style.cursor = 'grabbing';
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const x = e.pageX || (e.touches && e.touches[0].pageX);
    const delta = x - prevX;
    prevX = x;
    targetAngle += delta * 0.4;
    sound.playHover();
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    container.style.cursor = 'grab';
    const nearestIdx = Math.round(targetAngle / theta);
    targetAngle = nearestIdx * theta;
  }

  container.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  container.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  container.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) > 10 || Math.abs(e.deltaY) > 10) {
      const delta = e.deltaX || e.deltaY;
      targetAngle -= delta * 0.25;
      autoRotate = false;
      updateAutoStatus();
    }
  }, { passive: true });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      sound.playClick();
      autoRotate = false;
      updateAutoStatus();
      targetAngle += theta;
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      sound.playClick();
      autoRotate = false;
      updateAutoStatus();
      targetAngle -= theta;
    });
  }

  function updateAutoStatus() {
    if (autoStatus) {
      autoStatus.textContent = autoRotate ? 'ORBIT [ON]' : 'ORBIT [OFF]';
      autoStatus.style.color = autoRotate ? 'var(--orange)' : 'var(--text-dim)';
    }
  }

  if (autoToggleBtn) {
    autoToggleBtn.addEventListener('click', () => {
      sound.playClick();
      autoRotate = !autoRotate;
      updateAutoStatus();
    });
  }

  tabButtons.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      sound.playClick();
      targetAngle = -idx * theta;
      autoRotate = false;
      updateAutoStatus();
    });
  });

  // Listen for smooth scroll delta from glider engine
  window.addEventListener('ringScrollDelta', (e) => {
    if (e.detail && typeof e.detail.delta === 'number') {
      targetAngle -= e.detail.delta * 0.08;
    }
  });

  window.addEventListener('resize', () => {
    buildRing();
  });

  buildRing();
  render();

  return () => {
    cancelAnimationFrame(animationFrameId);
  };
}
