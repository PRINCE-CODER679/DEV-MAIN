// Master Application Entry
import './style.css';
import { initGlider } from './glider.js';
import { initBackgroundCanvas } from './canvas.js';
import { initTerminal } from './terminal.js';
import { initInteractions } from './interactions.js';
import { initRingCarousel } from './ring-carousel.js';

function startApp() {
  try {
    // Initialize silky smooth inertial gliding & 3D parallax scroll
    initGlider();

    // Initialize background particle lattice
    initBackgroundCanvas('bg-canvas');

    // Initialize 3D cylindrical orbital ring carousel
    initRingCarousel('event-ring-container');

    // Initialize interactive terminal
    initTerminal('terminal-app');

    // Initialize interactive UI controllers
    initInteractions();

    console.log(`
%c DEVKRAFT // DR. D. Y. PATIL INSTITUTE OF TECHNOLOGY, PIMPRI, PUNE 
%c CODE IS THE MEDIUM. BUILDING IS THE CULTURE.
`, 'background: #FF5500; color: #000; font-weight: bold; padding: 4px 8px;', 'color: #FFAA00; font-family: monospace; font-size: 11px;');
  } catch (err) {
    console.error('Initialization error:', err);
    // Safety dismiss preloader in case of any runtime issue
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.remove();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
