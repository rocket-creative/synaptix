"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const acceptRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const consent = localStorage.getItem("synaptix-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    acceptRef.current?.focus();
  }, [isVisible]);

  const handleAccept = useCallback(() => {
    localStorage.setItem("synaptix-cookie-consent", "accepted");
    setIsVisible(false);
  }, []);

  const handleDecline = useCallback(() => {
    localStorage.setItem("synaptix-cookie-consent", "declined");
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleDecline();
      }
      if (e.key === "Tab" && containerRef.current?.contains(document.activeElement)) {
        const focusables = Array.from(
          containerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute("disabled"));
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (first && last) {
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, handleDecline]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
      role="dialog"
      aria-labelledby="cookie-heading"
      aria-describedby="cookie-description"
      aria-modal="true"
    >
      <div className="max-w-2xl mx-auto bg-[#161616] border border-white/10 shadow-lg p-4 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h2
              id="cookie-heading"
              className="font-heading text-sm text-white mb-2"
            >
              Cookie Preferences
            </h2>
            <p
              id="cookie-description"
              className="font-body text-xs text-white/50 font-light leading-relaxed"
            >
              We use cookies to improve your experience and analyze site usage.
              No personal health information is ever stored in cookies.
            </p>
          </div>
          <button
            onClick={handleDecline}
            className="p-1 text-white/40 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#0FBDD5] focus:ring-offset-2 focus:ring-offset-[#161616]"
            aria-label="Close cookie banner"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            ref={acceptRef}
            onClick={handleAccept}
            className="inline-flex items-center justify-center bg-[#0FBDD5] text-[#0A0A0A] py-2.5 px-5 text-[10px] tracking-widest uppercase font-light hover:bg-[#0FBDD5]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0FBDD5] focus:ring-offset-2 focus:ring-offset-[#161616]"
          >
            Accept All
          </button>
          <button
            onClick={handleDecline}
            className="inline-flex items-center justify-center bg-transparent text-white/60 py-2.5 px-5 text-[10px] tracking-widest uppercase font-light border border-white/20 hover:bg-white/5 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#0FBDD5] focus:ring-offset-2 focus:ring-offset-[#161616]"
          >
            Necessary Only
          </button>
        </div>
      </div>
    </div>
  );
}
