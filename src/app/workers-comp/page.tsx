import type { Metadata } from "next";
import { WorkersCompForm } from "@/components/WorkersCompForm";
import { BreadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Workers' Comp & No-Fault Concussion Evaluation | Synaptix",
  description:
    "Synaptix provides documented concussion evaluations specifically designed for workers' compensation and no-fault auto claims. Defensible workups that hold up in proceedings.",
  alternates: {
    canonical: "https://www.synaptix.health/workers-comp",
  },
  openGraph: {
    title: "Workers' Comp & No-Fault Concussion Evaluation | Synaptix",
    description:
      "Documented concussion evaluations for workers' comp and no-fault claims. Defensible workups for insurance and legal proceedings.",
    url: "https://www.synaptix.health/workers-comp",
    siteName: "Synaptix",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Workers' Comp & No-Fault Concussion Evaluation | Synaptix",
    description:
      "Concussion evaluations for workers' comp and no-fault claims. Defensible documentation.",
  },
};

const TRUST_ITEMS = [
  "Structured workup defensible in comp and no-fault proceedings",
  "Documentation covers symptom timeline, cognitive testing, and treatment",
  "Accepted by major workers' comp and no-fault carriers",
  "Telehealth and in-person options available",
];

export default function WorkersCompPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Workers' Comp", url: "https://www.synaptix.health/workers-comp" }]} />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="font-body text-xs text-synaptix-cyan uppercase tracking-widest mb-4">
              Workers' comp & no-fault
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white leading-none mb-6">
              A workup that holds up
            </h1>
            <p className="font-body text-white/60 text-sm font-light leading-relaxed mb-8">
              Workers' compensation and no-fault claims require documented, defensible concussion evaluations. Synaptix delivers a structured 12-week program that satisfies insurers, adjusters, and attorneys — not just a one-visit note.
            </p>
            <ul className="space-y-3 mb-10">
              {TRUST_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 w-4 h-4 shrink-0 border border-synaptix-cyan/40 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-synaptix-cyan" />
                  </span>
                  <span className="font-body text-sm text-white/70 font-light">{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-body text-xs text-white/30 font-light">
              Do not submit sensitive personal health information through this form.
            </p>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <div className="bg-synaptix-card p-6 sm:p-8">
              <h2 className="font-heading text-2xl text-white mb-6">Submit your referral</h2>
              <WorkersCompForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
