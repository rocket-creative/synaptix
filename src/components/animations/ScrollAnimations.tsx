"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useScrollFadeIn() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!ref.current || prefersReducedMotion) return;

    const elements = ref.current.querySelectorAll("[data-scroll-fade]");
    
    elements.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, { scope: ref, dependencies: [prefersReducedMotion] });

  return ref;
}

export function useStaggeredCards() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!ref.current || prefersReducedMotion) return;

    const cards = ref.current.querySelectorAll("[data-stagger-card]");
    
    if (cards.length) {
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
          },
        }
      );
    }
  }, { scope: ref, dependencies: [prefersReducedMotion] });

  return ref;
}

export function useCounterAnimation() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!ref.current || prefersReducedMotion) return;

    const counters = ref.current.querySelectorAll("[data-counter]");
    
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-counter-target") || "0");
      const suffix = counter.getAttribute("data-counter-suffix") || "";
      const prefix = counter.getAttribute("data-counter-prefix") || "";
      
      const obj = { value: 0 };
      
      gsap.to(obj, {
        value: target,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: counter,
          start: "top 80%",
        },
        onUpdate: () => {
          counter.textContent = prefix + Math.round(obj.value) + suffix;
        },
      });
    });
  }, { scope: ref, dependencies: [prefersReducedMotion] });

  return ref;
}

export function useSectionReveal() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!ref.current || prefersReducedMotion) return;

    const header = ref.current.querySelector("[data-section-header]");
    const content = ref.current.querySelector("[data-section-content]");

    if (header) {
      gsap.fromTo(header,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
          },
        }
      );
    }

    if (content) {
      gsap.fromTo(content,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
          },
        }
      );
    }
  }, { scope: ref, dependencies: [prefersReducedMotion] });

  return ref;
}

export function useParallax(speed: number = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!ref.current || prefersReducedMotion) return;

    const images = ref.current.querySelectorAll("[data-parallax]");
    
    images.forEach((img) => {
      const imgSpeed = parseFloat(img.getAttribute("data-parallax-speed") || String(speed));
      
      gsap.to(img, {
        yPercent: -15 * imgSpeed,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, { scope: ref, dependencies: [prefersReducedMotion, speed] });

  return ref;
}
