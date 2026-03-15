"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface HeroBackgroundProps {
  className?: string;
  ringCount?: number;
  color?: string;
}

export function HeroBackground({ 
  className = "", 
  ringCount = 6,
  color = "15, 189, 213"
}: HeroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef<{ value: number }>({ value: 0 });
  const centerRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({ 
    x: 0, y: 0, targetX: 0, targetY: 0 
  });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (prefersReducedMotion()) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      centerRef.current.x = rect.width * 0.65;
      centerRef.current.y = rect.height * 0.5;
      centerRef.current.targetX = rect.width * 0.65;
      centerRef.current.targetY = rect.height * 0.5;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    gsap.to(timeRef.current, {
      value: Math.PI * 200,
      duration: 600,
      repeat: -1,
      ease: "none",
    });

    const rings = Array.from({ length: ringCount }, (_, i) => ({
      radiusMultiplier: 0.12 + i * 0.1,
      opacity: 0.2 - i * 0.025,
      dashPattern: i % 2 === 0 ? null : [6, 10],
      rotationSpeed: (i % 2 === 0 ? 1 : -1) * (0.3 + i * 0.08),
      nodes: Array.from({ length: 3 + i }, (_, j) => ({
        angle: (j / (3 + i)) * Math.PI * 2 + Math.random() * 0.5,
        size: 6 - i * 0.8,
        orbitSpeed: (i % 2 === 0 ? 1 : -1) * (0.2 + j * 0.05 + Math.random() * 0.1),
      })),
    }));

    for (let i = 0; i < 60; i++) {
      particlesRef.current.push(createParticle(canvas.getBoundingClientRect()));
    }

    function createParticle(rect: DOMRect): Particle {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * Math.min(rect.width, rect.height) * 0.5;
      return {
        x: rect.width * 0.65 + Math.cos(angle) * distance,
        y: rect.height / 2 + Math.sin(angle) * distance,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.25 + 0.05,
        life: Math.random() * 200,
        maxLife: 200 + Math.random() * 100,
      };
    }

    let lastTargetChange = 0;

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const time = timeRef.current.value;

      if (time - lastTargetChange > 2.5) {
        lastTargetChange = time;
        const wanderRadiusX = rect.width * 0.15;
        const wanderRadiusY = rect.height * 0.12;
        centerRef.current.targetX = rect.width * 0.65 + (Math.random() - 0.4) * wanderRadiusX * 2;
        centerRef.current.targetY = rect.height * 0.5 + (Math.random() - 0.5) * wanderRadiusY * 2;
      }

      centerRef.current.x += (centerRef.current.targetX - centerRef.current.x) * 0.025;
      centerRef.current.y += (centerRef.current.targetY - centerRef.current.y) * 0.025;

      const floatX = Math.sin(time * 0.6) * 25 + Math.sin(time * 0.35) * 18;
      const floatY = Math.cos(time * 0.5) * 20 + Math.cos(time * 0.3) * 15;

      const centerX = centerRef.current.x + floatX;
      const centerY = centerRef.current.y + floatY;
      const baseRadius = Math.min(rect.width, rect.height) * 0.35;

      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        particle.vx += (dx / dist) * 0.01;
        particle.vy += (dy / dist) * 0.01;

        particle.vx *= 0.99;
        particle.vy *= 0.99;

        if (particle.life > particle.maxLife || dist < 20) {
          particlesRef.current[index] = createParticle(rect);
        }

        const fadeIn = Math.min(particle.life / 30, 1);
        const fadeOut = Math.max(0, 1 - (particle.life - particle.maxLife + 30) / 30);
        const alpha = particle.opacity * fadeIn * fadeOut;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.fill();
      });

      rings.forEach((ring, ringIndex) => {
        const radius = baseRadius * ring.radiusMultiplier;
        const rotation = time * ring.rotationSpeed;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${color}, ${ring.opacity})`;
        ctx.lineWidth = ringIndex === 0 ? 2.5 : 1.5;
        
        if (ring.dashPattern) {
          ctx.setLineDash(ring.dashPattern);
        } else {
          ctx.setLineDash([]);
        }
        
        ctx.stroke();
        ctx.restore();

        ring.nodes.forEach((node) => {
          const nodeAngle = node.angle + time * node.orbitSpeed;
          const nodeX = centerX + Math.cos(nodeAngle) * radius;
          const nodeY = centerY + Math.sin(nodeAngle) * radius;

          const pulse = Math.sin(time * 2 + node.angle) * 0.3 + 0.7;

          ctx.beginPath();
          ctx.arc(nodeX, nodeY, node.size + 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${0.08 * pulse})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(nodeX, nodeY, node.size + 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${0.15 * pulse})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(nodeX, nodeY, node.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.85 * pulse})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(nodeX, nodeY, node.size - 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${color}, ${0.5 * pulse})`;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([]);
          ctx.stroke();
        });
      });

      const corePulse = Math.sin(time * 1.5) * 0.2 + 0.8;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 22, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${0.08 * corePulse})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${0.15 * corePulse})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * corePulse})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 7, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${color}, 0.7)`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([]);
      ctx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      gsap.killTweensOf(timeRef.current);
    };
  }, [ringCount, color]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
