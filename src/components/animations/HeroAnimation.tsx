"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(useGSAP);

export function useHeroAnimation() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set("[data-hero-eyebrow], [data-hero-title], [data-hero-subtitle], [data-hero-description], [data-hero-cta], [data-hero-image], [data-hero-social]", { 
          opacity: 1, 
          y: 0,
          scale: 1 
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set("[data-hero-eyebrow]", { opacity: 0, y: 20 });
      gsap.set("[data-hero-title]", { opacity: 0, y: 40 });
      gsap.set("[data-hero-subtitle]", { opacity: 0, y: 30 });
      gsap.set("[data-hero-description]", { opacity: 0, y: 20 });
      gsap.set("[data-hero-cta]", { opacity: 0, y: 20 });
      gsap.set("[data-hero-social]", { opacity: 0, y: 10 });
      gsap.set("[data-hero-image]", { opacity: 0, scale: 1.02 });

      tl.to("[data-hero-image]", { opacity: 1, scale: 1, duration: 1 })
        .to("[data-hero-eyebrow]", { opacity: 1, y: 0, duration: 0.5 }, "-=0.6")
        .to("[data-hero-title]", { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")
        .to("[data-hero-subtitle]", { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
        .to("[data-hero-description]", { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .to("[data-hero-cta]", { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
        .to("[data-hero-social]", { opacity: 1, y: 0, duration: 0.4 }, "-=0.2");
    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return containerRef;
}
