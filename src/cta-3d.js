// Interactive 3D Kinetic Reactor & Wireframe Geometry for the CTA Section
export function initCta3D(canvasId = 'cta-3d-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false };
  let animationFrameId;

  // 3D Nodes for a kinetic Icosahedron + Orbital Ring
  const nodes = [];
  const edges = [];
  const particleRings = [];

  const PHI = (1 + Math.sqrt(5)) / 2;
  const rawVertices = [
    [-1,  PHI,  0], [ 1,  PHI,  0], [-1, -PHI,  0], [ 1, -PHI,  0],
    [ 0, -1,  PHI], [ 0,  1,  PHI], [ 0, -1, -PHI], [ 0,  1, -PHI],
    [ PHI,  0, -1], [ PHI,  0,  1], [-PHI,  0, -1], [-PHI,  0,  1]
  ];

  // Scale vertices
  const scale = 85;
  rawVertices.forEach(v => {
    nodes.push({
      x: v[0] * scale,
      y: v[1] * scale,
      z: v[2] * scale,
      baseX: v[0] * scale,
      baseY: v[1] * scale,
      baseZ: v[2] * scale
    });
  });

  // Calculate edges
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.hypot(
        rawVertices[i][0] - rawVertices[j][0],
        rawVertices[i][1] - rawVertices[j][1],
        rawVertices[i][2] - rawVertices[j][2]
      );
      if (Math.abs(d - 2) < 0.1) {
        edges.push([i, j]);
      }
    }
  }

  // Create surrounding 3D orbital particle rings
  const ringCount = 60;
  for (let i = 0; i < ringCount; i++) {
    const angle = (i / ringCount) * Math.PI * 2;
    const r = 160 + (Math.random() - 0.5) * 20;
    particleRings.push({
      x: Math.cos(angle) * r,
      y: (Math.random() - 0.5) * 30,
      z: Math.sin(angle) * r,
      size: Math.random() * 2 + 1,
      speed: (Math.random() * 0.005) + 0.008,
      angle: angle,
      radius: r,
      color: Math.random() > 0.4 ? '#FF5500' : '#FFAA00'
    });
  }

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = Math.max(380, rect.height);
  }

  window.addEventListener('resize', resize);
  
  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.targetX = (e.clientX - rect.left - width / 2) / (width / 2);
    mouse.targetY = (e.clientY - rect.top - height / 2) / (height / 2);
    mouse.isHovering = true;
  });

  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.targetX = 0;
    mouse.targetY = 0;
    mouse.isHovering = false;
  });

  resize();

  let rotX = 0;
  let rotY = 0;
  let rotZ = 0;

  function render() {
    rotX += 0.008 + (mouse.y * 0.02);
    rotY += 0.012 + (mouse.x * 0.02);
    rotZ += 0.004;

    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const fov = 400;

    // Project 3D points to 2D
    const projectedNodes = nodes.map(n => {
      // Rotate Y
      let x1 = n.x * Math.cos(rotY) - n.z * Math.sin(rotY);
      let z1 = n.z * Math.cos(rotY) + n.x * Math.sin(rotY);

      // Rotate X
      let y2 = n.y * Math.cos(rotX) - z1 * Math.sin(rotX);
      let z2 = z1 * Math.cos(rotX) + n.y * Math.sin(rotX);

      // Rotate Z
      let x3 = x1 * Math.cos(rotZ) - y2 * Math.sin(rotZ);
      let y3 = y2 * Math.cos(rotZ) + x1 * Math.sin(rotZ);

      const perspective = fov / (fov + z2 + 100);
      return {
        x: cx + x3 * perspective,
        y: cy + y3 * perspective,
        z: z2,
        scale: perspective
      };
    });

    // Draw Ambient Glow at Center
    const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 180);
    glowGrad.addColorStop(0, 'rgba(255, 85, 0, 0.18)');
    glowGrad.addColorStop(0.6, 'rgba(255, 170, 0, 0.05)');
    glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 180, 0, Math.PI * 2);
    ctx.fill();

    // Draw 3D Edges
    edges.forEach(([i, j]) => {
      const p1 = projectedNodes[i];
      const p2 = projectedNodes[j];
      const avgZ = (p1.z + p2.z) / 2;
      const alpha = Math.max(0.15, Math.min(0.9, (avgZ + 150) / 300));

      ctx.strokeStyle = `rgba(255, 85, 0, ${alpha})`;
      ctx.lineWidth = Math.max(1, (p1.scale + p2.scale));
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    });

    // Draw 3D Vertices (Glowing Nodes)
    projectedNodes.forEach(p => {
      const size = Math.max(2, 4.5 * p.scale);
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FF5500';
      ctx.beginPath();
      ctx.arc(p.x, p.y, size * 1.8, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Orbital Particle Rings
    particleRings.forEach(pr => {
      pr.angle += pr.speed;
      let px = Math.cos(pr.angle) * pr.radius;
      let pz = Math.sin(pr.angle) * pr.radius;
      let py = pr.y + Math.sin(pr.angle * 2) * 15;

      // Rotate particles with 3D matrix
      let x1 = px * Math.cos(rotY * 0.7) - pz * Math.sin(rotY * 0.7);
      let z1 = pz * Math.cos(rotY * 0.7) + px * Math.sin(rotY * 0.7);
      let y2 = py * Math.cos(rotX * 0.7) - z1 * Math.sin(rotX * 0.7);
      let z2 = z1 * Math.cos(rotX * 0.7) + py * Math.sin(rotX * 0.7);

      const perspective = fov / (fov + z2 + 100);
      const sx = cx + x1 * perspective;
      const sy = cy + y2 * perspective;

      if (perspective > 0) {
        ctx.fillStyle = pr.color;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(1, pr.size * perspective), 0, Math.PI * 2);
        ctx.fill();
      }
    });

    animationFrameId = requestAnimationFrame(render);
  }

  render();

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', resize);
  };
}
