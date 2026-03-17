"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, RefObject } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(useGSAP);

export function useMobileMenuAnimation(isOpen: boolean, menuRef: RefObject<HTMLDivElement | null>) {
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !menuRef.current) return;

    const menu = menuRef.current;
    const links = menu.querySelectorAll("a");

    if (isOpen) {
      gsap.fromTo(menu,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
      );
      
      gsap.fromTo(links,
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.08, ease: "power2.out", delay: 0.1 }
      );
    }
  }, { dependencies: [isOpen, prefersReducedMotion] });
}

export function useNavScrollEffect() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!ref.current || prefersReducedMotion) return;

    let lastScrollY = 0;
    const nav = ref.current;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        gsap.to(nav, {
          backgroundColor: "rgba(10, 10, 10, 0.98)",
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(nav, {
          backgroundColor: "rgba(10, 10, 10, 0.9)",
          duration: 0.3,
          ease: "power2.out",
        });
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, { scope: ref, dependencies: [prefersReducedMotion] });

  return ref;
}
