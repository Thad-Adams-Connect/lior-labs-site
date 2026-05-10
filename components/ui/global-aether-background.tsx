"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

export default function GlobalAetherBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrame = 0;
    let particles: Particle[] = [];

    const mouse = {
      x: -9999,
      y: -9999,
      px: -9999,
      py: -9999,
      vx: 0,
      vy: 0,
      radius: 220,
    };

    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const getParticleCount = () => {
      const area = window.innerWidth * window.innerHeight;

      if (window.innerWidth < 640) return 54;
      if (window.innerWidth < 1024) return 84;
      if (window.innerWidth < 1440) return Math.min(280, Math.floor(area / 10000));

      return Math.min(520, Math.floor(area / 8500));
    };

    const createParticles = () => {
      particles = [];

      const count = getParticleCount();

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32,
          size: Math.random() * 1.8 + 0.8,
        });
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      createParticles();
    };

    const drawConnections = () => {
      const maxDistance = 180;
      const maxDistanceSq = maxDistance * maxDistance;

      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;

          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistanceSq) {
            const opacity = 1 - distSq / maxDistanceSq;

            ctx.strokeStyle = `rgba(97,52,193,${opacity * 0.55})`;
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      const mouseRadiusSq = mouse.radius * mouse.radius;

      for (const particle of particles) {
        particle.vx *= 0.995;
        particle.vy *= 0.995;

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= 0 || particle.x >= window.innerWidth) {
          particle.vx *= -1;
        }

        if (particle.y <= 0 || particle.y >= window.innerHeight) {
          particle.vy *= -1;
        }

        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;

        const distSq = dx * dx + dy * dy;

        if (distSq < mouseRadiusSq) {
          const influence = 1 - distSq / mouseRadiusSq;
          const dist = Math.sqrt(distSq) || 1;

          // Repel particles from cursor and inject cursor motion for a stronger interactive feel.
          particle.vx += (dx / dist) * influence * 0.12 + mouse.vx * 0.008 * influence;
          particle.vy += (dy / dist) * influence * 0.12 + mouse.vy * 0.008 * influence;
        }

        const speedSq = particle.vx * particle.vx + particle.vy * particle.vy;
        const maxSpeed = 1.15;
        const maxSpeedSq = maxSpeed * maxSpeed;

        if (speedSq > maxSpeedSq) {
          const speed = Math.sqrt(speedSq) || 1;
          const ratio = maxSpeed / speed;

          particle.vx *= ratio;
          particle.vy *= ratio;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(97,52,193,0.95)";
        ctx.fill();
      }

      drawConnections();

      mouse.vx *= 0.86;
      mouse.vy *= 0.86;

      animationFrame = requestAnimationFrame(animate);
    };

    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 120);
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouse.px = mouse.x;
      mouse.py = mouse.y;

      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (mouse.px > -9998 && mouse.py > -9998) {
        mouse.vx = mouse.x - mouse.px;
        mouse.vy = mouse.y - mouse.py;
      }
    };

    const handlePointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.px = -9999;
      mouse.py = -9999;
      mouse.vx = 0;
      mouse.vy = 0;
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", handleResize, { passive: true });

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    window.addEventListener("pointerleave", handlePointerLeave, {
      passive: true,
    });

    window.addEventListener("blur", handlePointerLeave, {
      passive: true,
    });

    return () => {
      cancelAnimationFrame(animationFrame);

      clearTimeout(resizeTimeout);

      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-black">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  );
}