// High-Performance Silky Inertial Glider & Advanced 3D Spatial Parallax Engine
import Lenis from 'lenis';

export let lenisInstance = null;

export function initGlider() {
  // 1. Initialize Lenis Smooth Inertial Momentum Scroll
  lenisInstance = new Lenis({
    duration: 1.3,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential luxury ease-out
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.1,
    touchMultiplier: 1.5,
    infinite: false,
  });

  // Top Cyber-Orange Glowing Scroll Progress Bar
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress-bar';
  progressBar.className = 'fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-orange via-amber to-orange z-50 pointer-events-none transition-all duration-75 shadow-[0_0_16px_#FF5500]';
  progressBar.style.width = '0%';
  document.body.appendChild(progressBar);

  // Dynamic 3D Cursor Spotlight Overlay
  create3DSpotlight();

  // RAF loop for Lenis & 3D Spatial Physics
  function raf(time) {
    lenisInstance.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 2. Parallax & 3D Scroll Physics Handler
  initScrollParallax();

  // 3. Smooth Anchor Links
  initSmoothAnchors();

  // 4. Interactive 3D Card Hover Tilt
  init3DTilt();

  // 5. Ambient 3D Camera Tilt from Mouse
  initAmbientCameraTilt();
}

function create3DSpotlight() {
  const spotlight = document.createElement('div');
  spotlight.id = 'ambient-3d-spotlight';
  spotlight.className = 'fixed pointer-events-none z-10 w-[450px] h-[450px] rounded-full opacity-0 sm:opacity-20 transition-opacity duration-500 blur-3xl';
  spotlight.style.background = 'radial-gradient(circle, rgba(255,85,0,0.22) 0%, rgba(255,170,0,0.08) 40%, transparent 70%)';
  spotlight.style.transform = 'translate(-50%, -50%)';
  document.body.appendChild(spotlight);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let curX = mouseX;
  let curY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    spotlight.style.opacity = '0.22';
  }, { passive: true });

  function updateSpotlight() {
    curX += (mouseX - curX) * 0.1;
    curY += (mouseY - curY) * 0.1;
    spotlight.style.left = `${curX}px`;
    spotlight.style.top = `${curY}px`;
    requestAnimationFrame(updateSpotlight);
  }
  requestAnimationFrame(updateSpotlight);
}

function initScrollParallax() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const heroTitle = document.querySelector('.hero-giant-title');
  const heroEyebrow = document.querySelector('.hero-eyebrow');
  const heroCreed = document.querySelector('.hero-creed-grid');
  const heroFooter = document.querySelector('.hero-footer-bar');
  const marqueeTrack = document.querySelector('.marquee-track');
  const eventsSection = document.getElementById('events');
  const pillarCards = document.querySelectorAll('.pillar-card');
  const terminalApp = document.getElementById('terminal-app');
  const ctaSection = document.querySelector('.cta-section h2');

  let prevScroll = 0;

  lenisInstance.on('scroll', ({ scroll, limit, velocity }) => {
    const progress = limit > 0 ? (scroll / limit) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    const scrollDelta = scroll - prevScroll;
    prevScroll = scroll;

    // 1. Hero Multi-Layer 3D Depth Drift
    if (scroll < 900) {
      if (heroEyebrow) {
        heroEyebrow.style.transform = `translateY(${scroll * 0.1}px) translateZ(10px)`;
      }

      if (heroTitle) {
        const depthY = scroll * 0.38;
        const depthScale = Math.max(0.88, 1 - scroll * 0.0003);
        const depthOpacity = Math.max(0.15, 1 - scroll * 0.0014);
        const rotX = Math.min(16, scroll * 0.022);
        const translateZ = -scroll * 0.4;
        heroTitle.style.transform = `perspective(1100px) translateY(${depthY}px) translateZ(${translateZ}px) scale(${depthScale}) rotateX(${rotX}deg)`;
        heroTitle.style.opacity = depthOpacity;
      }

      if (heroCreed) {
        const creedY = scroll * 0.18;
        const creedOpacity = Math.max(0.3, 1 - scroll * 0.0015);
        heroCreed.style.transform = `translateY(${creedY}px) translateZ(25px)`;
        heroCreed.style.opacity = creedOpacity;
      }

      if (heroFooter) {
        heroFooter.style.transform = `translateY(${scroll * 0.08}px)`;
      }
    }

    // 2. Marquee Velocity Warp
    if (marqueeTrack) {
      const warp = Math.min(2.8, 1 + Math.abs(velocity) * 0.12);
      marqueeTrack.style.transform = `scaleY(${warp})`;
    }

    // 3. 3D Event Ring Scroll Rotation Integration
    if (eventsSection) {
      const evRect = eventsSection.getBoundingClientRect();
      const inView = evRect.top < window.innerHeight && evRect.bottom > 0;
      if (inView && Math.abs(scrollDelta) > 0.5) {
        window.dispatchEvent(new CustomEvent('ringScrollDelta', { detail: { delta: scrollDelta } }));
      }
    }

    // 4. Staggered 3D Float on Manifesto Cards
    pillarCards.forEach((card, idx) => {
      const rect = card.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const offset = (rect.top + rect.height / 2) - viewportCenter;
      if (Math.abs(offset) < window.innerHeight * 1.2) {
        const tiltX = (offset / window.innerHeight) * -10;
        const staggeredZ = Math.max(0, 24 - Math.abs(offset) * 0.035) + (idx % 2 === 0 ? 8 : 0);
        card.style.transform = `perspective(900px) rotateX(${tiltX.toFixed(2)}deg) translateZ(${staggeredZ.toFixed(1)}px)`;
      }
    });

    // 5. Terminal 3D Elevation
    if (terminalApp) {
      const termRect = terminalApp.getBoundingClientRect();
      const offset = termRect.top - (window.innerHeight / 2);
      if (Math.abs(offset) < window.innerHeight) {
        const termTilt = (offset / window.innerHeight) * -8;
        const termZ = Math.max(0, 15 - Math.abs(offset) * 0.02);
        terminalApp.style.transform = `perspective(1200px) rotateX(${termTilt.toFixed(2)}deg) translateZ(${termZ.toFixed(1)}px)`;
      }
    }

    // 6. Brutalist CTA 3D Expansion on Glide
    if (ctaSection) {
      const ctaRect = ctaSection.getBoundingClientRect();
      const ctaOffset = ctaRect.top - (window.innerHeight / 2);
      if (Math.abs(ctaOffset) < window.innerHeight) {
        const ctaScale = Math.min(1.05, 0.96 + (1 - Math.abs(ctaOffset) / window.innerHeight) * 0.08);
        const ctaTilt = (ctaOffset / window.innerHeight) * 6;
        ctaSection.style.transform = `perspective(1000px) rotateX(${ctaTilt.toFixed(2)}deg) scale(${ctaScale.toFixed(3)})`;
      }
    }
  });
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#top') {
        e.preventDefault();
        lenisInstance.scrollTo(0, { duration: 1.4 });
        return;
      }

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        lenisInstance.scrollTo(targetEl, { offset: -60, duration: 1.4 });
      }
    });
  });
}

// 3D Card Hover Tilt with Dynamic Shadow Physics
function init3DTilt() {
  const tiltElements = document.querySelectorAll('.pillar-card, .terminal-container, .ring-card-inner, .stat-box');

  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;
      
      el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(12px) scale3d(1.02, 1.02, 1.02)`;
      el.style.transition = 'transform 0.08s ease-out';
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
      el.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });
}

// Ambient 3D Camera Tilt from Mouse Movement across the Viewport
function initAmbientCameraTilt() {
  const main = document.querySelector('main');
  if (!main) return;

  // Only enable on desktop pointer devices
  if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) {
    return;
  }

  let targetTiltX = 0;
  let targetTiltY = 0;
  let curTiltX = 0;
  let curTiltY = 0;

  window.addEventListener('mousemove', (e) => {
    const normX = (e.clientX / window.innerWidth) - 0.5;
    const normY = (e.clientY / window.innerHeight) - 0.5;
    targetTiltX = -normY * 3.5; // Max 3.5 deg
    targetTiltY = normX * 3.5;
  }, { passive: true });

  function updateCamera() {
    curTiltX += (targetTiltX - curTiltX) * 0.05;
    curTiltY += (targetTiltY - curTiltY) * 0.05;

    // Apply gentle ambient rotation to main wrapper
    main.style.transform = `perspective(1400px) rotateX(${curTiltX.toFixed(3)}deg) rotateY(${curTiltY.toFixed(3)}deg)`;
    requestAnimationFrame(updateCamera);
  }
  requestAnimationFrame(updateCamera);
}
