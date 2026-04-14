import { useEffect, useRef } from "react";

/**
 * Full-screen ambient scatter + regression line background.
 * - Faint scatter points drift slowly
 * - A regression line draws itself on mount
 * - Confidence bands gently breathe (opacity pulse)
 * - All very low opacity — atmospheric, not distracting
 * - Mouse proximity causes nearby points to glow slightly brighter
 */
export default function RegressionBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width, height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // Generate scatter points along a noisy regression line
    // y = mx + b + noise
    const slope = -0.35;
    const intercept = 0.75;
    const numPoints = 60;
    const points = [];

    for (let i = 0; i < numPoints; i++) {
      const xNorm = Math.random(); // 0 to 1
      const noise = (Math.random() - 0.5) * 0.25;
      const yNorm = slope * xNorm + intercept + noise;
      const radius = 1.5 + Math.random() * 2.5;
      const drift = {
        x: (Math.random() - 0.5) * 0.15,
        y: (Math.random() - 0.5) * 0.1,
      };
      const phase = Math.random() * Math.PI * 2;
      points.push({ xNorm, yNorm, radius, drift, phase, baseOpacity: 0.08 + Math.random() * 0.12 });
    }

    // Regression line endpoints (in normalized coords)
    const lineX0 = 0.05;
    const lineY0 = slope * lineX0 + intercept;
    const lineX1 = 0.95;
    const lineY1 = slope * lineX1 + intercept;

    // Confidence band offset
    const bandOffset = 0.06;

    let drawProgress = 0; // 0 to 1 — line drawing animation
    let startTime = null;

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    }
    function onMouseLeave() {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    }
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    function draw(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;

      // Line draws over 3 seconds, starting after 1s delay
      drawProgress = Math.min(1, Math.max(0, (elapsed - 1.0) / 3.0));

      // Band breathing
      const bandBreath = 0.03 + Math.sin(elapsed * 0.4) * 0.015;

      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // --- Scatter points ---
      for (const p of points) {
        const px = p.xNorm * width + Math.sin(elapsed * 0.3 + p.phase) * p.drift.x * width;
        const py = p.yNorm * height + Math.cos(elapsed * 0.25 + p.phase) * p.drift.y * height;

        // Mouse proximity glow
        const dx = px - mx;
        const dy = py - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / 150);
        const opacity = p.baseOpacity + proximity * 0.25;

        // Outer glow
        if (proximity > 0) {
          ctx.beginPath();
          ctx.arc(px, py, p.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 102, 241, ${proximity * 0.08})`;
          ctx.fill();
        }

        // Point
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 237, ${opacity})`;
        ctx.fill();
      }

      // --- Confidence band (fades in with line) ---
      if (drawProgress > 0) {
        const bandAlpha = drawProgress * bandBreath;
        const currentX1 = lineX0 + (lineX1 - lineX0) * drawProgress;
        const currentY1 = lineY0 + (lineY1 - lineY0) * drawProgress;

        ctx.beginPath();
        ctx.moveTo(lineX0 * width, (lineY0 - bandOffset) * height);
        ctx.lineTo(currentX1 * width, (currentY1 - bandOffset) * height);
        ctx.lineTo(currentX1 * width, (currentY1 + bandOffset) * height);
        ctx.lineTo(lineX0 * width, (lineY0 + bandOffset) * height);
        ctx.closePath();
        ctx.fillStyle = `rgba(99, 102, 241, ${bandAlpha})`;
        ctx.fill();
      }

      // --- Regression line ---
      if (drawProgress > 0) {
        const currentX1 = lineX0 + (lineX1 - lineX0) * drawProgress;
        const currentY1 = lineY0 + (lineY1 - lineY0) * drawProgress;

        ctx.beginPath();
        ctx.moveTo(lineX0 * width, lineY0 * height);
        ctx.lineTo(currentX1 * width, currentY1 * height);
        ctx.strokeStyle = `rgba(129, 140, 248, ${0.15 * drawProgress})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
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
