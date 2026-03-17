import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components";

const SITE_URL = "https://synaptix.vercel.app";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for Synaptix concussion management platform. Review our terms and conditions. Contact (914) 705 6830 for questions.",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  openGraph: {
    title: "Terms of Service | Synaptix",
    description:
      "Terms of service for Synaptix concussion management platform. Review our terms and conditions.",
    url: `${SITE_URL}/terms`,
    siteName: "Synaptix",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Synaptix Concussion Management Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Synaptix",
    description:
      "Terms of service for Synaptix concussion management platform. Review our terms and conditions.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

export default function TermsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[{ name: "Terms of Service", url: "https://synaptix.vercel.app/terms" }]}
      />

      <div className="min-h-dvh bg-[#0A0A0A] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-body text-xs text-white/60 font-light">
              <li>
                <Link href="/" className="hover:text-[#0FBDD5] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/80" aria-current="page">
                Terms of Service
              </li>
            </ol>
          </nav>
          <article className="bg-[#161616] p-8 sm:p-12 border border-white/5">
            <header className="mb-8 pb-8 border-b border-white/10">
              <h1 className="font-heading text-3xl sm:text-4xl text-white mb-4">
                Terms of Service
              </h1>
              <p className="font-body text-sm text-white/50">
                Last updated: March 14, 2026
              </p>
            </header>

            <div className="prose prose-invert prose-sm max-w-none">
              <section className="mb-8">
                <h2 className="font-heading text-xl text-white mb-4">
                  Agreement to Terms
                </h2>
                <p className="font-body text-sm text-white/70 font-light leading-relaxed mb-4">
                  By accessing or using Synaptix (&quot;the Platform&quot;), a Kronos
                  Health company product, you agree to be bound by these Terms
                  of Service. If you do not agree to these terms, please do not
                  use the Platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-xl text-white mb-4">
                  Description of Service
                </h2>
                <p className="font-body text-sm text-white/70 font-light leading-relaxed mb-4">
                  Synaptix is a concussion assessment and recovery platform
                  designed for healthcare providers. The Platform provides tools
                  for neuropsychological testing, cognitive remediation therapy,
                  and patient monitoring.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-xl text-white mb-4">
                  Eligibility
                </h2>
                <p className="font-body text-sm text-white/70 font-light leading-relaxed mb-4">
                  The Platform is intended for use by licensed healthcare
                  providers and their authorized staff. By using the Platform,
                  you represent that you are a licensed healthcare professional
                  or are authorized by one to use the Platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-xl text-white mb-4">
                  User Responsibilities
                </h2>
                <p className="font-body text-sm text-white/70 font-light leading-relaxed mb-4">
                  As a user of the Platform, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 font-body text-sm text-white/70 font-light">
                  <li>
                    Maintain the confidentiality of your account credentials
                  </li>
                  <li>
                    Use the Platform in compliance with all applicable laws and
                    regulations, including HIPAA
                  </li>
                  <li>
                    Ensure that all clinical decisions are made by qualified
                    healthcare professionals
                  </li>
                  <li>
                    Not share access credentials with unauthorized individuals
                  </li>
                  <li>Report any security breaches or unauthorized access</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-xl text-white mb-4">
                  Clinical Disclaimer
                </h2>
                <p className="font-body text-sm text-white/70 font-light leading-relaxed mb-4">
                  The Platform is a clinical support tool and does not replace
                  professional medical judgment. All clinical decisions,
                  diagnoses, and treatment plans remain the responsibility of
                  the treating healthcare provider. The Platform&apos;s assessments
                  and recommendations should be used as one component of a
                  comprehensive clinical evaluation.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-xl text-white mb-4">
                  Intellectual Property
                </h2>
                <p className="font-body text-sm text-white/70 font-light leading-relaxed mb-4">
                  The Platform, including its content, features, and
                  functionality, is owned by Kronos Group and is protected by
                  copyright, trademark, and other intellectual property laws.
                  You may not copy, modify, distribute, or create derivative
                  works without our express written permission.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-xl text-white mb-4">
                  Limitation of Liability
                </h2>
                <p className="font-body text-sm text-white/70 font-light leading-relaxed mb-4">
                  To the maximum extent permitted by law, Kronos Group and its
                  affiliates shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages arising from your
                  use of the Platform. Our total liability shall not exceed the
                  amount paid by you for the Platform in the twelve months
                  preceding the claim.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-xl text-white mb-4">
                  Termination
                </h2>
                <p className="font-body text-sm text-white/70 font-light leading-relaxed mb-4">
                  We may terminate or suspend your access to the Platform at any
                  time, with or without cause, upon notice. Upon termination,
                  your right to use the Platform will immediately cease. Data
                  export options will be provided in accordance with applicable
                  regulations.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-xl text-white mb-4">
                  Changes to Terms
                </h2>
                <p className="font-body text-sm text-white/70 font-light leading-relaxed mb-4">
                  We reserve the right to modify these Terms at any time. We
                  will notify users of material changes via email or through the
                  Platform. Continued use of the Platform after changes
                  constitutes acceptance of the modified Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-xl text-white mb-4">
                  Governing Law
                </h2>
                <p className="font-body text-sm text-white/70 font-light leading-relaxed mb-4">
                  These Terms shall be governed by and construed in accordance
                  with the laws of the State of New York, without regard to its
                  conflict of law provisions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-xl text-white mb-4">
                  Contact Information
                </h2>
                <p className="font-body text-sm text-white/70 font-light leading-relaxed">
                  For questions about these Terms, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-[#0A0A0A] border border-white/10">
                  <p className="font-body text-sm text-white/70">
                    Synaptix (A Kronos Group Company)
                    <br />
                    Email: legal@kronoshealth.co
                    <br />
                    Phone:{" "}
                    <a
                      href="tel:+19147056830"
                      className="hover:text-white transition-colors"
                    >
                      (914) 705 6830
                    </a>
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
