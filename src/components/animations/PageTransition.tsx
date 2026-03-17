"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useRef, useEffect, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(useGSAP);

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" }
    );
  }, [pathname, prefersReducedMotion]);

  return <div ref={containerRef}>{children}</div>;
}
