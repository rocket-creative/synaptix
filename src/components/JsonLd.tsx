const SITE_URL = "https://www.synaptix.health";
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

interface FAQItem {
  question: string;
  answer: string;
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Synaptix",
    url: SITE_URL,
    logo: `${SITE_URL}/synaptix-logo-white.svg`,
    description:
      "Concussion Assessment & Recovery Platform providing structured management software for orthopedic, neurosurgery, and sports medicine practices.",
    parentOrganization: {
      "@type": "Organization",
      name: "Kronos Group",
      url: "https://www.kronosgroup.health",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "(914) 705 6830",
      contactType: "sales",
      availableLanguage: "English",
    },
    sameAs: ["https://www.kronosgroup.health"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "Synaptix",
    url: SITE_URL,
    description:
      "Concussion Assessment & Recovery Platform. Structured, standardized, recurring.",
    publisher: { "@id": ORG_ID },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SoftwareApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: "Synaptix",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description:
      "Concussion management software with NPE-CX battery including PCSS, HIT-6, PHQ-9, GAD-7, PCL-5, and PSQI assessments, cognitive remediation therapy, and digital monitoring.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Contact for enterprise pricing",
    },
    featureList: [
      "NPE-CX neuropsychological battery",
      "PCSS concussion symptom scale",
      "HIT-6 headache impact test",
      "PHQ-9 depression screening",
      "GAD-7 anxiety assessment",
      "PCL-5 PTSD assessment",
      "PSQI sleep quality index",
      "Computerized cognitive remediation therapy",
      "Digital symptom tracking",
      "Longitudinal outcome monitoring",
      "HIPAA compliant",
      "Automated clinical reports",
    ],
    provider: { "@id": ORG_ID },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ questions }: { questions: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url?: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        ...(item.url ? { item: item.url } : {}),
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#service`,
    name,
    description,
    url,
    provider: { "@id": ORG_ID },
    areaServed: "United States",
    serviceType: "Concussion Management Software",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function TrustSignal({
  author,
  credentials,
  reviewedBy,
  lastUpdated,
}: {
  author: string;
  credentials: string;
  reviewedBy: string;
  lastUpdated: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] sm:text-xs text-white/40">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <span>
          <strong className="text-white/60">Clinical Author:</strong> {author}
        </span>
        <span className="hidden sm:inline">|</span>
        <span>{credentials}</span>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <span>
          <strong className="text-white/60">Reviewed by:</strong> {reviewedBy}
        </span>
        <span className="hidden sm:inline">|</span>
        <span>
          <strong className="text-white/60">Updated:</strong> {lastUpdated}
        </span>
      </div>
    </div>
  );
}
