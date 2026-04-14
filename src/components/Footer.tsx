import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Program Overview", href: "#program" },
    { label: "Visit Protocol", href: "#visits" },
    { label: "NPE Battery", href: "#battery" },
    { label: "FAQ", href: "#faq" },
  ],
  clinical: [
    { label: "Get Evaluated", href: "/get-evaluated" },
    { label: "Workers' Comp", href: "/workers-comp" },
    { label: "For Attorneys", href: "/for-attorneys" },
  ],
  software: [
    { label: "License Software", href: "/license-software" },
    { label: "For Hospitals & Insurers", href: "/for-hospitals-and-insurers" },
  ],
  company: [
    { label: "Kronos Group", href: "https://kronos-health.vercel.app?utm_source=synaptix&utm_medium=footer" },
    { label: "Cognifica App", href: "https://cognificaai.vercel.app?utm_source=synaptix&utm_medium=footer" },
    { label: "Revenue Cycle", href: "https://kronos-health.vercel.app/revenue-cycle?utm_source=synaptix&utm_medium=footer" },
    { label: "Contact", href: "#demo" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[#161616] border-t border-white/5"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" aria-label="Synaptix Home">
              <Image
                src="/synaptix-logo-white.svg"
                alt="Synaptix"
                width={160}
                height={45}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 font-body text-sm text-white/50 font-light leading-relaxed">
              Concussion Assessment & Recovery Platform. Structured,
              standardized, recurring.
            </p>
            <div className="mt-6">
              <Link
                href="tel:+19147056830"
                className="font-body text-sm text-white/70 hover:text-white transition-colors"
              >
                (914) 705 6830
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-white/40 mb-4">Product</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-white/40 mb-4">Clinical</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.clinical.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-xs tracking-widest uppercase text-white/40 mt-6 mb-4">Software</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.software.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + CTA */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <h3 className="text-xs tracking-widest uppercase text-white/40 mb-4">Company</h3>
            <ul className="space-y-3 mb-8" role="list">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-white/60 hover:text-white transition-colors"
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="#demo"
              className="inline-flex items-center gap-3 bg-[#0FBDD5] text-[#0A0A0A] py-3 px-6 text-[10px] tracking-widest uppercase font-light hover:gap-5 transition-all"
            >
              Request Demo
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs text-white/40">
              © {currentYear} Synaptix. A{" "}
              <Link 
                href="https://kronos-health.vercel.app?utm_source=synaptix&utm_medium=footer_copyright" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#0FBDD5]/70 hover:text-[#0FBDD5] transition-colors"
              >
                Kronos Group
              </Link>{" "}
              Company. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
