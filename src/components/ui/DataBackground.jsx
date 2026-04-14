import { useEffect, useRef } from "react";

/**
 * Constellation network background.
 * Floating nodes connected by faint edges — mouse reveals nearby connections.
 * Abstract, atmospheric, interactive.
 */
export default function DataBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width, height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // --- Node pool ---
    const nodes = [];
    const CONNECTION_DIST = 140;
    const MOUSE_RADIUS = 200;

    function populate() {
      nodes.length = 0;
      // ~1 node per 18 000 px² — sparse enough to breathe
      const count = Math.round((width * height) / 18000);
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: 1.2 + Math.random() * 1.8, // 1.2 – 3 px radius
          baseAlpha: 0.06 + Math.random() * 0.09, // very faint at rest
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function resize() {
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      populate();
    }
    resize();
    window.addEventListener("resize", resize);

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    }
    function onMouseLeave() {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    }
    canvas.addEventListener("mousemove", onMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", onMouseLeave);

    let startTime = null;

    function draw(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;

      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // --- Update positions ---
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        // Wrap around edges with padding
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      // --- Draw edges first (behind nodes) ---
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > CONNECTION_DIST) continue;

          // Edge midpoint proximity to mouse
          const edgeMidX = (a.x + b.x) / 2;
          const edgeMidY = (a.y + b.y) / 2;
          const mDist = Math.sqrt(
            (edgeMidX - mx) ** 2 + (edgeMidY - my) ** 2
          );
          const mouseProx = Math.max(0, 1 - mDist / MOUSE_RADIUS);

          // Faint at rest, brighter near mouse
          const edgeFade = 1 - dist / CONNECTION_DIST;
          const baseEdgeAlpha = 0.025 * edgeFade;
          const edgeAlpha = baseEdgeAlpha + mouseProx * 0.18 * edgeFade;

          if (edgeAlpha < 0.005) continue;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(148, 163, 237, ${edgeAlpha})`;
          ctx.lineWidth = 0.5 + mouseProx * 0.5;
          ctx.stroke();
        }
      }

      // --- Draw nodes ---
      for (const n of nodes) {
        const dx = n.x - mx;
        const dy = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / MOUSE_RADIUS);

        // Gentle pulse at rest
        const pulse = Math.sin(elapsed * 0.6 + n.phase) * 0.02;
        const alpha = n.baseAlpha + pulse + proximity * 0.45;
        const r = n.r + proximity * 2;

        // Outer glow when near cursor
        if (proximity > 0.05) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 102, 241, ${proximity * 0.06})`;
          ctx.fill();
        }

        // Node dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 237, ${alpha})`;
        ctx.fill();
      }

      // --- Soft radial glow around cursor ---
      if (mx > 0 && my > 0) {
        const gradient = ctx.createRadialGradient(
          mx, my, 0,
          mx, my, MOUSE_RADIUS
        );
        gradient.addColorStop(0, "rgba(99, 102, 241, 0.04)");
        gradient.addColorStop(0.5, "rgba(99, 102, 241, 0.015)");
        gradient.addColorStop(1, "rgba(99, 102, 241, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "auto" }}
    />
  );
}
