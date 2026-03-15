"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function MobileStickyCTA() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#161616]/98 backdrop-blur-sm border-t border-white/10 px-4 py-3"
      aria-label="Quick actions"
    >
      <div className="flex items-center justify-center gap-3 max-w-lg mx-auto">
        <Link
          href="#demo"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0FBDD5] text-[#0A0A0A] py-3 px-4 text-[10px] tracking-widest uppercase font-light hover:bg-[#0FBDD5]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0FBDD5] focus:ring-offset-2 focus:ring-offset-[#161616]"
        >
          Request Demo
          <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </Link>
        <a
          href="tel:+19147056830"
          className="inline-flex items-center justify-center py-3 px-4 text-[10px] tracking-widest uppercase font-light text-white/80 hover:text-white border border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0FBDD5] focus:ring-offset-2 focus:ring-offset-[#161616]"
          aria-label="Call (914) 705 6830"
        >
          (914) 705 6830
        </a>
      </div>
    </div>
  );
}
