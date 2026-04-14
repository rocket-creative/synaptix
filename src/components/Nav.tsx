"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
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
  href: "https://kronos-health.vercel.app?utm_source=synaptix&utm_medium=nav",
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
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 sm:h-20">
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
              className="h-8 sm:h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <span className="text-white/20 text-xs" aria-hidden="true">|</span>

            {/* Clinical dropdown */}
            <div className="relative group">
              <button
                className="flex items-center gap-1 font-body text-xs tracking-widest uppercase text-white/60 hover:text-[#0FBDD5] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0FBDD5]"
                aria-haspopup="true"
              >
                Clinical
                <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" aria-hidden="true" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-[#161616] border border-white/10 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                {clinicalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2.5 font-body text-xs tracking-wider uppercase text-white/60 hover:text-[#0FBDD5] hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Software dropdown */}
            <div className="relative group">
              <button
                className="flex items-center gap-1 font-body text-xs tracking-widest uppercase text-white/60 hover:text-[#0FBDD5] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0FBDD5]"
                aria-haspopup="true"
              >
                Software
                <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" aria-hidden="true" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-52 bg-[#161616] border border-white/10 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                {softwareLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2.5 font-body text-xs tracking-wider uppercase text-white/60 hover:text-[#0FBDD5] hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <span className="text-white/20 text-xs" aria-hidden="true">|</span>

            <a
              href={kronosHealthLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors"
            >
              {kronosHealthLink.label}
            </a>
          </div>

          {/* Right — phone + CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <Link
              href="tel:+19147056830"
              className="font-body text-xs tracking-wider text-white/40 hover:text-white transition-colors"
            >
              (914) 705 6830
            </Link>
            <Link
              href="#demo"
              className="inline-flex items-center gap-3 bg-[#0FBDD5] text-[#0A0A0A] py-3 px-6 text-[10px] tracking-widest uppercase font-light hover:gap-5 transition-all"
            >
              Request Demo
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>

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
