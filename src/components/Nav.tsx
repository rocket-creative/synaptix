"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { href: "#program", label: "Program" },
  { href: "#visits", label: "Visit Protocol" },
  { href: "#battery", label: "NPE Battery" },
  { href: "#faq", label: "FAQ" },
];

const kronosHealthLink = {
  href: "https://kronos-health.vercel.app?utm_source=synaptix&utm_medium=nav",
  label: "Kronos Health",
};

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link
            href="/"
            className="flex items-center"
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

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <span className="text-white/30 font-body text-xs" aria-hidden="true">
              |
            </span>
            <a
              href={kronosHealthLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors"
            >
              {kronosHealthLink.label}
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="tel:+19147056830"
              className="font-body text-xs tracking-wider text-white/60 hover:text-white transition-colors"
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
            className="lg:hidden p-2 -mr-2 text-white"
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
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 top-16 sm:top-20 bg-[#0A0A0A] z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col h-full px-6 py-8">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-heading text-2xl text-white hover:text-[#0FBDD5] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={kronosHealthLink.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="font-heading text-2xl text-white hover:text-[#0FBDD5] transition-colors"
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
