"use client";

import { useEffect, useRef } from "react";

/**
 * "Signal field": a slowly breathing sphere of points rendered on a 2D canvas,
 * with an orbit ring and a travelling satellite. No WebGL or 3D library needed.
 *
 * - Pauses when off-screen or when the tab is hidden.
 * - Follows the pointer gently on devices with a fine pointer.
 * - Renders a single still frame when the user prefers reduced motion.
 */

const STOPS: [number, number, number][] = [
  [139, 92, 246], // purple
  [236, 72, 153], // pink
  [59, 130, 246], // blue
];

function mixColor(t: number) {
  const scaled = Math.min(Math.max(t, 0), 1) * (STOPS.length - 1);
  const i = Math.min(Math.floor(scaled), STOPS.length - 2);
  const f = scaled - i;
  const [a, b] = [STOPS[i], STOPS[i + 1]];
  const c = a.map((v, k) => Math.round(v + (b[k] - v) * f));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

type Point = { x: number; y: number; z: number; color: string };

function buildSphere(count: number): Point[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const points: Point[] = [];
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    // Colour flows diagonally across the sphere.
    points.push({ x, y, z, color: mixColor((x * 0.45 - y * 0.55 + 1) / 2) });
  }
  return points;
}

export function SignalField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let points: Point[] = [];
    let frame = 0;
    let running = false;
    let inView = true;
    let time = 0;
    let last = performance.now();
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    // Theme-aware neutrals for the ring and satellite.
    let fg = "#f5f5f7";
    let muted = "#a1a1aa";
    const readTheme = () => {
      const styles = getComputedStyle(document.documentElement);
      fg = styles.getPropertyValue("--fg").trim() || fg;
      muted = styles.getPropertyValue("--muted").trim() || muted;
      if (!running) draw();
    };
    const themeObserver = new MutationObserver(readTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 480 ? 700 : 1400;
      if (points.length !== count) points = buildSphere(count);
      if (!running) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.36;

      const rotY = time * 0.14 + pointer.x * 0.6;
      const rotX = -0.38 + pointer.y * 0.35;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const project = (x: number, y: number, z: number) => {
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const scale = 2.6 / (2.6 - z2);
        return { sx: cx + x1 * radius * scale, sy: cy + y1 * radius * scale, depth: (z2 + 1) / 2 };
      };

      // Orbit ring (tilted), drawn behind and in front via alpha by depth.
      const ringTilt = 0.42;
      const ringSegments = 160;
      ctx.lineWidth = 1;
      for (let i = 0; i < ringSegments; i++) {
        const a0 = (i / ringSegments) * Math.PI * 2;
        const a1 = ((i + 1) / ringSegments) * Math.PI * 2;
        const p0 = project(Math.cos(a0) * 1.42, Math.sin(a0) * 1.42 * ringTilt, Math.sin(a0) * 1.42);
        const p1 = project(Math.cos(a1) * 1.42, Math.sin(a1) * 1.42 * ringTilt, Math.sin(a1) * 1.42);
        ctx.globalAlpha = 0.06 + p0.depth * 0.22;
        ctx.strokeStyle = muted;
        ctx.beginPath();
        ctx.moveTo(p0.sx, p0.sy);
        ctx.lineTo(p1.sx, p1.sy);
        ctx.stroke();
      }

      // Sphere points with a gentle surface wave.
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const wave = 1 + 0.075 * Math.sin(p.y * 5 + time * 0.9) * Math.cos(p.x * 4 - time * 0.6);
        const { sx, sy, depth } = project(p.x * wave, p.y * wave, p.z * wave);
        const size = 0.9 + depth * 1.9;
        ctx.globalAlpha = 0.2 + depth * 0.8;
        ctx.fillStyle = p.color;
        ctx.fillRect(sx - size / 2, sy - size / 2, size, size);
      }

      // Satellite travelling along the ring.
      const sa = time * 0.55;
      const sat = project(Math.cos(sa) * 1.42, Math.sin(sa) * 1.42 * ringTilt, Math.sin(sa) * 1.42);
      ctx.globalAlpha = 0.35 + sat.depth * 0.65;
      ctx.fillStyle = fg;
      ctx.beginPath();
      ctx.arc(sat.sx, sat.sy, 2.2 + sat.depth * 1.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      time += delta;
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      draw();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduceMotion || !inView || document.hidden) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.tx = event.clientX / window.innerWidth - 0.5;
      pointer.ty = event.clientY / window.innerHeight - 0.5;
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    intersection.observe(canvas);

    document.addEventListener("visibilitychange", onVisibility);
    if (finePointer && !reduceMotion) window.addEventListener("pointermove", onPointerMove);

    readTheme();
    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
