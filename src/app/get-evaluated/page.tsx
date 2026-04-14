import type { Metadata } from "next";
import { PatientIntakeForm } from "@/components/PatientIntakeForm";
import { BreadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Get a Concussion Evaluation | Synaptix",
  description:
    "Schedule a structured concussion evaluation with Synaptix. Telehealth and in-person options in NY. Work-related, auto accident, sports, and general cases accepted.",
  alternates: {
    canonical: "https://synaptix.health/get-evaluated",
  },
  openGraph: {
    title: "Get a Concussion Evaluation | Synaptix",
    description:
      "Schedule a structured concussion evaluation. Telehealth and in-person NY. Work-related, auto accident, sports, and general cases.",
    url: "https://synaptix.health/get-evaluated",
    siteName: "Synaptix",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get a Concussion Evaluation | Synaptix",
    description:
      "Schedule a structured concussion evaluation with Synaptix. Telehealth and in-person NY.",
  },
};

const TRUST_ITEMS = [
  "Structured 12-week neuropsychological evaluation program",
  "Telehealth and in-person options in New York",
  "Work-related, auto accident, sports, and general cases",
  "Documentation designed for insurance and legal proceedings",
];

export default function GetEvaluatedPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Get Evaluated", url: "https://synaptix.health/get-evaluated" }]} />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="font-body text-xs text-synaptix-cyan uppercase tracking-widest mb-4">
              Concussion evaluation
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white leading-none mb-6">
              Get a structured evaluation
            </h1>
            <p className="font-body text-white/60 text-sm font-light leading-relaxed mb-8">
              A single ER visit or urgent care visit cannot diagnose or manage a concussion. Synaptix delivers a documented, 12-week neuropsychological evaluation — defensible for insurance claims, workers' comp, and legal proceedings.
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
              <h2 className="font-heading text-2xl text-white mb-6">Request your evaluation</h2>
              <PatientIntakeForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
