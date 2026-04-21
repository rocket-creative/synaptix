import type { Metadata } from "next";
import { SoftwareLicenseForm } from "@/components/SoftwareLicenseForm";
import { BreadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "License the Synaptix Concussion Program for Your Practice | Synaptix",
  description:
    "Neurosurgeons, orthopedic surgeons, and neurologists: license Synaptix and turn a single concussion visit into a 12-week program generating $2,500 to $10,000 per patient.",
  alternates: {
    canonical: "https://www.synaptix.health/license-software",
  },
  openGraph: {
    title: "License the Synaptix Concussion Program for Your Practice | Synaptix",
    description:
      "Turn a $250 concussion visit into a 12-week program worth $2,500 to $10,000 per patient. License Synaptix for your practice.",
    url: "https://www.synaptix.health/license-software",
    siteName: "Synaptix",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "License the Synaptix Concussion Program | Synaptix",
    description:
      "Turn a concussion visit into a 12-week program. License Synaptix for your practice.",
  },
};

const TRUST_ITEMS = [
  "Turns a $250 visit into a $2,500 to $10,000 per-patient program",
  "Valid CPT coding — billable to commercial, Medicare, and Medicaid",
  "Full neuropsychological evaluation battery included",
  "Kronos Revenue billing support available as an add-on",
];

export default function LicenseSoftwarePage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "License Software", url: "https://www.synaptix.health/license-software" }]} />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="font-body text-xs text-synaptix-cyan uppercase tracking-widest mb-4">
              Software licensing
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white leading-none mb-6">
              A $250 visit becomes a $10K program
            </h1>
            <p className="font-body text-white/60 text-sm font-light leading-relaxed mb-8">
              Most practices see a concussion patient once and collect $250. Synaptix lets you run a structured 12-week neuropsychological evaluation program with valid CPT coding — generating $2,500 to $10,000 per patient with no new staff required.
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
              For neurosurgeons, orthopedic surgeons, neurologists, sports medicine, and PM&amp;R practices.
            </p>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <div className="bg-synaptix-card p-6 sm:p-8">
              <h2 className="font-heading text-2xl text-white mb-6">Request licensing information</h2>
              <SoftwareLicenseForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
