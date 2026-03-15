import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Synaptix privacy policy. Learn how we collect, use, and protect your information.",
  alternates: {
    canonical: "https://synaptix.vercel.app/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[{ name: "Privacy Policy", url: "https://synaptix.vercel.app/privacy" }]}
      />

      <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="bg-[#161616] p-8 sm:p-12 border border-white/5">
            <header className="mb-8 pb-8 border-b border-white/10">
              <h1 className="font-heading text-3xl sm:text-4xl text-white mb-4">
                Privacy Policy
              </h1>
              <p className="font-body text-sm text-white/50">
                Last updated: March 14, 2026
              </p>
            </header>

            <div className="prose prose-invert prose-sm max-w-none">
              <section className="mb-8">
                <h2 className="font-heading text-xl text-white mb-4">
                  Introduction
                </h2>
                <p className="font-body text-sm text-white/70 font-light leading-relaxed mb-4">
                  Synaptix (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), a Kronos Health
                  company, is committed to protecting your privacy. This Privacy
                  Policy explains how we collect, use, disclose, and safeguard
                  your information when you use our concussion management platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-xl text-white mb-4">
                  Information We Collect
                </h2>
                <p className="font-body text-sm text-white/70 font-light leading-relaxed mb-4">
                  We collect information that you provide directly to us,
                  including:
                </p>
                <ul className="list-disc pl-6 space-y-2 font-body text-sm text-white/70 font-light">
                  <li>Contact information (name, email, phone number)</li>
                  <li>Practice information (practice name, specialty)</li>
                  <li>
                    Clinical data entered into the platform (protected health
                    information)
                  </li>
                  <li>Usage data and analytics</li>
                  <li>Communication preferences</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-xl text-white mb-4">
                  How We Use Your Information
                </h2>
                <p className="font-body text-sm text-white/70 font-light leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2 font-body text-sm text-white/70 font-light">
                  <li>Provide and maintain our concussion management services</li>
                  <li>Process demo requests and inquiries</li>
                  <li>Send administrative communications</li>
                  <li>Improve our platform and develop new features</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-xl text-white mb-4">
                  HIPAA Compliance
                </h2>
                <p className="font-body text-sm text-white/70 font-light leading-relaxed mb-4">
                  Synaptix is designed to be HIPAA compliant. We implement
                  appropriate administrative, technical, and physical safeguards
                  to protect Protected Health Information (PHI) in accordance
                  with HIPAA requirements. We will enter into Business Associate
                  Agreements (BAAs) with covered entities as required.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-xl text-white mb-4">
                  Data Security
                </h2>
                <p className="font-body text-sm text-white/70 font-light leading-relaxed mb-4">
                  We implement industry-standard security measures including:
                </p>
                <ul className="list-disc pl-6 space-y-2 font-body text-sm text-white/70 font-light">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Secure access controls and authentication</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Employee training on data protection</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-xl text-white mb-4">
                  Data Retention
                </h2>
                <p className="font-body text-sm text-white/70 font-light leading-relaxed mb-4">
                  We retain your information for as long as necessary to provide
                  our services and comply with legal obligations. Clinical data
                  is retained in accordance with applicable healthcare
                  regulations and your organization&apos;s retention policies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-xl text-white mb-4">
                  Your Rights
                </h2>
                <p className="font-body text-sm text-white/70 font-light leading-relaxed mb-4">
                  Depending on your location, you may have certain rights
                  regarding your personal information, including the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 font-body text-sm text-white/70 font-light">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of marketing communications</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-xl text-white mb-4">
                  Contact Us
                </h2>
                <p className="font-body text-sm text-white/70 font-light leading-relaxed">
                  If you have questions about this Privacy Policy or our data
                  practices, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-[#0A0A0A] border border-white/10">
                  <p className="font-body text-sm text-white/70">
                    Synaptix (A Kronos Health Company)
                    <br />
                    Email: privacy@kronoshealth.co
                    <br />
                    Phone: (914) 705 6830
                  </p>
                </div>
              </section>
            </div>

            <footer className="mt-8 pt-8 border-t border-white/10">
              <Link
                href="/"
                className="font-body text-sm text-[#0FBDD5] hover:text-[#0FBDD5]/80 transition-colors"
              >
                ← Back to Home
              </Link>
            </footer>
          </article>
        </div>
      </div>
    </>
  );
}
