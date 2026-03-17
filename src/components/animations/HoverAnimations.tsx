"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, forwardRef, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(useGSAP);

interface AnimatedButtonProps {
  children: ReactNode;
  href: string;
  className?: string;
  ariaLabel?: string;
}

export const AnimatedButton = forwardRef<HTMLAnchorElement, AnimatedButtonProps>(
  function AnimatedButton({ children, href, className = "", ariaLabel }, ref) {
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const arrowRef = useRef<SVGSVGElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useGSAP(() => {
      if (prefersReducedMotion) return;
      
      const button = buttonRef.current;
      const arrow = arrowRef.current;
      
      if (!button || !arrow) return;

      const enterHandler = () => {
        gsap.to(arrow, { x: 6, duration: 0.25, ease: "power2.out" });
      };
      
      const leaveHandler = () => {
        gsap.to(arrow, { x: 0, duration: 0.25, ease: "power2.out" });
      };

      button.addEventListener("mouseenter", enterHandler);
      button.addEventListener("mouseleave", leaveHandler);

      return () => {
        button.removeEventListener("mouseenter", enterHandler);
        button.removeEventListener("mouseleave", leaveHandler);
      };
    }, { dependencies: [prefersReducedMotion] });

    return (
      <Link
        ref={buttonRef}
        href={href}
        className={className}
        aria-label={ariaLabel}
      >
        {children}
        <ArrowRight ref={arrowRef} className="w-4 h-4" aria-hidden="true" />
      </Link>
    );
  }
);

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
}

export function AnimatedCard({ children, className = "", as: Component = "div" }: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;
    
    const card = cardRef.current;
    if (!card) return;

    const enterHandler = () => {
      gsap.to(card, {
        y: -6,
        duration: 0.3,
        ease: "power2.out",
      });
    };
    
    const leaveHandler = () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", enterHandler);
    card.addEventListener("mouseleave", leaveHandler);

    return () => {
      card.removeEventListener("mouseenter", enterHandler);
      card.removeEventListener("mouseleave", leaveHandler);
    };
  }, { dependencies: [prefersReducedMotion] });

  return (
    <Component ref={cardRef} className={`transition-shadow hover:shadow-lg ${className}`}>
      {children}
    </Component>
  );
}

interface AnimatedImageProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedImageContainer({ children, className = "" }: AnimatedImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;
    
    const container = containerRef.current;
    if (!container) return;

    const image = container.querySelector("img, [data-animated-image]");
    if (!image) return;

    const enterHandler = () => {
      gsap.to(image, {
        scale: 1.03,
        duration: 0.5,
        ease: "power2.out",
      });
    };
    
    const leaveHandler = () => {
      gsap.to(image, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    container.addEventListener("mouseenter", enterHandler);
    container.addEventListener("mouseleave", leaveHandler);

    return () => {
      container.removeEventListener("mouseenter", enterHandler);
      container.removeEventListener("mouseleave", leaveHandler);
    };
  }, { dependencies: [prefersReducedMotion] });

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function useButtonHover() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!ref.current || prefersReducedMotion) return;

    const buttons = ref.current.querySelectorAll("[data-hover-button]");
    
    buttons.forEach((button) => {
      const arrow = button.querySelector("[data-hover-arrow]");
      
      if (!arrow) return;

      const enterHandler = () => {
        gsap.to(arrow, { x: 6, duration: 0.25, ease: "power2.out" });
      };
      
      const leaveHandler = () => {
        gsap.to(arrow, { x: 0, duration: 0.25, ease: "power2.out" });
      };

      button.addEventListener("mouseenter", enterHandler);
      button.addEventListener("mouseleave", leaveHandler);
    });
  }, { scope: ref, dependencies: [prefersReducedMotion] });

  return ref;
}
