"use client";

import { useEffect, useRef } from "react";

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    interface Blob {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: [number, number, number];
      opacity: number;
    }

    const blobs: Blob[] = [];

    const brandColors: [number, number, number][] = [
      [249, 115, 22],   // orange
      [236, 72, 153],   // pink
      [139, 92, 246],   // purple
      [251, 146, 60],   // light orange
      [244, 114, 182],  // light pink
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    const createBlobs = () => {
      blobs.length = 0;
      const w = canvas.width;
      const h = canvas.height;

      // Create large decorative blobs distributed across the page
      const positions = [
        { x: w * 0.1, y: h * 0.05 },
        { x: w * 0.85, y: h * 0.08 },
        { x: w * 0.15, y: h * 0.25 },
        { x: w * 0.9, y: h * 0.3 },
        { x: w * 0.05, y: h * 0.5 },
        { x: w * 0.8, y: h * 0.55 },
        { x: w * 0.2, y: h * 0.75 },
        { x: w * 0.92, y: h * 0.8 },
      ];

      positions.forEach((pos, i) => {
        blobs.push({
          x: pos.x,
          y: pos.y,
          radius: Math.random() * 200 + 150,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.1,
          color: brandColors[i % brandColors.length],
          opacity: 0.03 + Math.random() * 0.025,
        });
      });
    };

    const drawBlob = (blob: Blob) => {
      const gradient = ctx.createRadialGradient(
        blob.x, blob.y, 0,
        blob.x, blob.y, blob.radius
      );
      gradient.addColorStop(0, `rgba(${blob.color[0]}, ${blob.color[1]}, ${blob.color[2]}, ${blob.opacity})`);
      gradient.addColorStop(0.5, `rgba(${blob.color[0]}, ${blob.color[1]}, ${blob.color[2]}, ${blob.opacity * 0.5})`);
      gradient.addColorStop(1, `rgba(${blob.color[0]}, ${blob.color[1]}, ${blob.color[2]}, 0)`);

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    let tick = 0;
    const animate = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((blob, i) => {
        // Gentle floating motion with sine wave
        blob.x += Math.sin(tick * 0.005 + i) * 0.3;
        blob.y += Math.cos(tick * 0.004 + i * 0.7) * 0.2;

        drawBlob(blob);
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createBlobs();
    animate();

    const handleResize = () => {
      resize();
      createBlobs();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
