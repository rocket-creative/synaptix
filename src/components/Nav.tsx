"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { useNavScrollEffect, useMobileMenuAnimation } from "@/components/animations";

const navLinks = [
  { href: "#program", label: "Program" },
  { href: "#visits", label: "Visit Protocol" },
  { href: "#battery", label: "NPE Battery" },
  { href: "#faq", label: "FAQ" },
];

const clinicalLinks = [
  { href: "/get-evaluated", label: "Get Evaluated" },
  { href: "/workers-comp", label: "Workers' Comp" },
  { href: "/for-attorneys", label: "For Attorneys" },
];

const softwareLinks = [
  { href: "/license-software", label: "License Software" },
  { href: "/for-hospitals-and-insurers", label: "For Hospitals" },
];

const kronosHealthLink = {
  href: "https://www.kronosgroup.health?utm_source=synaptix&utm_medium=nav",
  label: "Kronos Group",
};

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navRef = useNavScrollEffect();
  useMobileMenuAnimation(isOpen, mobileMenuRef);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-safe-top bg-[#0A0A0A]/90 backdrop-blur-md"
    >
      {/* ── Row 1: secondary nav (desktop only) ── */}
      <div className="hidden lg:block border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">

          {/* Left — Clinical + Software links */}
          <div className="flex items-center gap-4">
            <span className="font-body text-[9px] tracking-widest uppercase text-white/25 select-none">Clinical</span>
            {clinicalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-[9px] tracking-widest uppercase text-white/45 hover:text-[#0FBDD5] transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
            <span className="text-white/15 text-[9px] select-none" aria-hidden="true">|</span>
            <span className="font-body text-[9px] tracking-widest uppercase text-white/25 select-none">Software</span>
            {softwareLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-[9px] tracking-widest uppercase text-white/45 hover:text-[#0FBDD5] transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — Kronos + phone */}
          <div className="flex items-center gap-4">
            <a
              href={kronosHealthLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[9px] tracking-widest uppercase text-white/45 hover:text-white/80 transition-colors whitespace-nowrap"
            >
              {kronosHealthLink.label}
            </a>
            <span className="text-white/15 text-[9px] select-none" aria-hidden="true">|</span>
            <Link
              href="tel:+19147056830"
              className="font-body text-[9px] tracking-wider text-white/45 hover:text-white transition-colors whitespace-nowrap"
            >
              (914) 705 6830
            </Link>
          </div>

        </div>
      </div>

      {/* ── Row 2: main nav ── */}
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-16">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="Synaptix Home"
          >
            <Image
              src="/synaptix-logo-white.svg"
              alt="Synaptix"
              width={140}
              height={40}
              className="h-7 sm:h-9 w-auto"
              priority
            />
          </Link>

          {/* Center — program links (desktop) */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-[11px] tracking-widest uppercase text-white/60 hover:text-white transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — CTA (desktop) */}
          <div className="hidden lg:flex items-center">
            <Link
              href="#demo"
              className="inline-flex items-center gap-3 bg-[#0FBDD5] text-[#0A0A0A] py-2.5 px-5 text-[10px] tracking-widest uppercase font-light hover:gap-5 transition-all whitespace-nowrap"
            >
              Request Demo
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 -mr-2 text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 top-16 sm:top-20 bg-[#0A0A0A] z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col h-full px-6 py-8">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-heading text-2xl text-white hover:text-[#0FBDD5] transition-colors min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ))}
            <p className="font-body text-[10px] text-white/30 uppercase tracking-widest mt-4 mb-1">Clinical</p>
            {clinicalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-heading text-xl text-white/80 hover:text-[#0FBDD5] transition-colors min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ))}
            <p className="font-body text-[10px] text-white/30 uppercase tracking-widest mt-4 mb-1">Software</p>
            {softwareLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-heading text-xl text-white/80 hover:text-[#0FBDD5] transition-colors min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={kronosHealthLink.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="font-heading text-xl text-white/50 hover:text-[#0FBDD5] transition-colors min-h-[44px] flex items-center mt-4 border-t border-white/10 pt-4"
            >
              {kronosHealthLink.label}
            </a>
          </nav>

          <div className="mt-auto pt-8 border-t border-white/10">
            <Link
              href="tel:+19147056830"
              className="block font-body text-sm text-white/60 mb-4"
            >
              (914) 705 6830
            </Link>
            <Link
              href="#demo"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center gap-4 bg-[#0FBDD5] text-[#0A0A0A] py-4 px-8 w-full uppercase tracking-widest text-xs font-light hover:gap-6 transition-all"
            >
              Request Demo
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
