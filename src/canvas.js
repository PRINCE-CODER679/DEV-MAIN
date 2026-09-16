// Supercharged Cyber Canvas: Particle Lattice, Kinetic Click Sparks, 3D Wireframe Horizon & Matrix Rain
import { sound } from './audio.js';

export let isGlobalMatrixActive = false;

export function toggleGlobalMatrix() {
  isGlobalMatrixActive = !isGlobalMatrixActive;
  return isGlobalMatrixActive;
}

export function initBackgroundCanvas(canvasId = 'bg-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let sparks = [];
  let matrixDrops = [];
  let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 160 };
  let animationFrameId;

  const matrixChars = '01DEVKRAFT_CYBER_SYS_PUNE_2026_DYPIT_RUST_GLSL_SOL_WASM';
  const fontSize = 14;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
    initMatrix();
  }

  function initMatrix() {
    const columns = Math.floor(width / fontSize);
    matrixDrops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((width * height) / 13000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.6 + 0.5,
        color: Math.random() > 0.75 ? '#FF5500' : (Math.random() > 0.55 ? '#FFAA00' : 'rgba(255, 255, 255, 0.4)'),
        pulse: Math.random() * Math.PI * 2,
      });
    }
  }

  // Spawn kinetic sparks on click / tap
  function spawnSparks(x, y) {
    sound.playSpark();
    const sparkCount = window.innerWidth < 640 ? 16 : 28;
    for (let i = 0; i < sparkCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      sparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        life: 1.0,
        decay: Math.random() * 0.035 + 0.02,
        size: Math.random() * 2.5 + 1.2,
        color: Math.random() > 0.5 ? '#FF5500' : (Math.random() > 0.25 ? '#FFAA00' : '#FFFFFF'),
      });
    }
  }

  window.addEventListener('resize', resize);
  
  // Desktop mouse
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.targetX = -1000;
    mouse.targetY = -1000;
  });

  window.addEventListener('click', (e) => {
    spawnSparks(e.clientX, e.clientY);
  });

  // Mobile touch
  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      const tx = e.touches[0].clientX;
      const ty = e.touches[0].clientY;
      mouse.targetX = tx;
      mouse.targetY = ty;
      mouse.x = tx;
      mouse.y = ty;
      spawnSparks(tx, ty);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      mouse.targetX = e.touches[0].clientX;
      mouse.targetY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    setTimeout(() => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    }, 450);
  });

  // Global Keybind: Press 'M' to toggle Matrix Stream
  window.addEventListener('keydown', (e) => {
    if (e.key === 'm' || e.key === 'M') {
      // If user is not typing in an input
      if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        toggleGlobalMatrix();
        sound.playBoot();
      }
    }
  });

  resize();

  let time = 0;
  function render() {
    time += 0.02;
    // Smooth mouse lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.15;
    mouse.y += (mouse.targetY - mouse.y) * 0.15;

    ctx.clearRect(0, 0, width, height);

    // 1. Matrix Digital Rain Mode
    if (isGlobalMatrixActive) {
      ctx.fillStyle = 'rgba(6, 6, 8, 0.25)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = '#FF5500';

      for (let i = 0; i < matrixDrops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * fontSize;
        const y = matrixDrops[i] * fontSize;

        if (Math.random() > 0.9) {
          ctx.fillStyle = '#FFFFFF';
        } else if (Math.random() > 0.6) {
          ctx.fillStyle = '#FFAA00';
        } else {
          ctx.fillStyle = '#FF5500';
        }

        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          matrixDrops[i] = 0;
        }
        matrixDrops[i]++;
      }
    }

    // 2. 3D Perspective Holographic Cyber Grid Horizon (Bottom)
    drawCyberHorizon(ctx, width, height, time);

    // 3. Mouse/Touch Glow Aura (Orange / Amber)
    if (mouse.x > 0 && mouse.y > 0) {
      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, mouse.radius * 1.5
      );
      gradient.addColorStop(0, 'rgba(255, 85, 0, 0.1)');
      gradient.addColorStop(0.5, 'rgba(255, 170, 0, 0.04)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, mouse.radius * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Update and draw particles & cyber constellations
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      // Wrap around bounds
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse displacement & repulsion
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        const force = (1 - dist / mouse.radius) * 3.5;
        p.x -= (dx / dist) * force;
        p.y -= (dy / dist) * force;
      }

      // Draw particle
      ctx.fillStyle = p.color;
      ctx.beginPath();
      const currentSize = p.size + Math.sin(time + p.pulse) * 0.35;
      ctx.arc(p.x, p.y, Math.max(0.4, currentSize), 0, Math.PI * 2);
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist2 < 90) {
          const alpha = (1 - dist2 / 90) * 0.14;
          ctx.strokeStyle = `rgba(255, 85, 0, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // 5. Update and draw dynamic kinetic click sparks
    for (let s = sparks.length - 1; s >= 0; s--) {
      const sp = sparks[s];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.vy += 0.12; // Subtle gravity
      sp.vx *= 0.96; // Air resistance
      sp.vy *= 0.96;
      sp.life -= sp.decay;

      if (sp.life <= 0) {
        sparks.splice(s, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, sp.life);
      ctx.fillStyle = sp.color;
      ctx.shadowColor = sp.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.size * sp.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  function drawCyberHorizon(ctx, w, h, t) {
    const horizonY = h * 0.72;
    const lines = 12;
    ctx.lineWidth = 1;

    // Horizontal perspective rungs
    for (let i = 0; i < lines; i++) {
      const progress = Math.pow(i / lines, 2.2);
      const y = horizonY + progress * (h - horizonY);
      const alpha = progress * 0.05;
      ctx.strokeStyle = `rgba(255, 85, 0, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Vanishing perspective rays
    const vanishX = w * 0.5 + Math.sin(t * 0.5) * 40;
    const numRays = 14;
    for (let r = 0; r <= numRays; r++) {
      const rayX = (w / numRays) * r;
      ctx.strokeStyle = 'rgba(255, 170, 0, 0.025)';
      ctx.beginPath();
      ctx.moveTo(vanishX, horizonY);
      ctx.lineTo(rayX, h);
      ctx.stroke();
    }
  }

  render();

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', resize);
  };
}
