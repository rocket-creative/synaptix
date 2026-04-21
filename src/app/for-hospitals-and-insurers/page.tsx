import type { Metadata } from "next";
import { HospitalInsurerForm } from "@/components/HospitalInsurerForm";
import { BreadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Deploy Synaptix Across Your Health System or Insurer Network | Synaptix",
  description:
    "Hospital systems and insurers: deploy a standardized, evidence-based concussion program across every facility or as a covered benefit for your members.",
  alternates: {
    canonical: "https://www.synaptix.health/for-hospitals-and-insurers",
  },
  openGraph: {
    title: "Deploy Synaptix Across Your Health System or Insurer Network | Synaptix",
    description:
      "Standardized concussion programs for hospital systems and insurers. Deploy across every facility or as a covered member benefit.",
    url: "https://www.synaptix.health/for-hospitals-and-insurers",
    siteName: "Synaptix",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deploy Synaptix for Hospitals and Insurers | Synaptix",
    description:
      "Standardized concussion programs for health systems and insurers.",
  },
};

const TRUST_ITEMS = [
  "Standardized protocol across every facility — consistent outcomes",
  "Reduces downstream costs from undertreated concussion",
  "Evidence-based NPE battery with full documentation",
  "Scalable from single ASC to 50-facility system",
];

export default function ForHospitalsAndInsurersPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "For Hospitals and Insurers", url: "https://www.synaptix.health/for-hospitals-and-insurers" }]} />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="font-body text-xs text-synaptix-cyan uppercase tracking-widest mb-4">
              System-wide deployment
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white leading-none mb-6">
              Standardize concussion care across your network
            </h1>
            <p className="font-body text-white/60 text-sm font-light leading-relaxed mb-8">
              Most concussion patients are discharged with a handout. Hospital systems and insurers that deploy Synaptix get a structured, evidence-based protocol across every facility — reducing liability, improving outcomes, and cutting the long-term costs of undertreated TBI.
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
              For hospital systems, health networks, ASC management companies, and insurers / payers.
            </p>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <div className="bg-synaptix-card p-6 sm:p-8">
              <h2 className="font-heading text-2xl text-white mb-6">Start the conversation</h2>
              <HospitalInsurerForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
