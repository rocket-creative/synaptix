import type { Metadata } from "next";
import { AttorneyReferralForm } from "@/components/AttorneyReferralForm";
import { BreadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Concussion Evaluations for Personal Injury & Workers' Comp Attorneys | Synaptix",
  description:
    "Synaptix provides documented concussion programs for PI, workers' comp, and no-fault attorneys. A structured 12-week evaluation that strengthens your clients' cases.",
  alternates: {
    canonical: "https://synaptix.health/for-attorneys",
  },
  openGraph: {
    title: "Concussion Evaluations for PI & Workers' Comp Attorneys | Synaptix",
    description:
      "Documented concussion programs for PI, WC, and no-fault attorneys. A 12-week evaluation that strengthens your clients' cases.",
    url: "https://synaptix.health/for-attorneys",
    siteName: "Synaptix",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concussion Evaluations for PI & Workers' Comp Attorneys | Synaptix",
    description:
      "Structured concussion programs for PI and WC attorneys. Defensible documentation.",
  },
};

const TRUST_ITEMS = [
  "Structured 12-week program — not a one-visit note",
  "Cognitive testing, symptom tracking, and treatment documentation",
  "Designed to withstand adjuster and defense scrutiny",
  "PI, workers' comp, and no-fault cases accepted",
];

export default function ForAttorneysPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "For Attorneys", url: "https://synaptix.health/for-attorneys" }]} />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="font-body text-xs text-synaptix-cyan uppercase tracking-widest mb-4">
              Attorney referral program
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white leading-none mb-6">
              Documentation that wins cases
            </h1>
            <p className="font-body text-white/60 text-sm font-light leading-relaxed mb-8">
              A single ER discharge note does not win a concussion case. Synaptix gives your clients a structured, 12-week neuropsychological evaluation — cognitive testing, symptom documentation, and a treatment record that holds up against any defense.
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
              Do not submit client PHI through this form. General inquiry only.
            </p>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <div className="bg-synaptix-card p-6 sm:p-8">
              <h2 className="font-heading text-2xl text-white mb-6">Set up a referral pathway</h2>
              <AttorneyReferralForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
