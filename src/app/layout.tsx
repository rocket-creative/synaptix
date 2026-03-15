import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Sans, Open_Sans } from "next/font/google";
import "./globals.css";
import { Nav, Footer, CookieConsent, MobileStickyCTA } from "@/components";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-body",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

const SITE_URL = "https://synaptix.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Concussion Management Software for Clinics | Synaptix",
    template: "%s | Synaptix",
  },
  description:
    "Structured concussion management software for orthopedic, neurosurgery, and sports medicine. NPE-CX battery, cognitive remediation, digital monitoring. Request a demo.",
  authors: [{ name: "Kronos Health" }],
  creator: "Kronos Health",
  publisher: "Kronos Health",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Synaptix",
    title: "Concussion Management Software for Clinics | Synaptix",
    description:
      "Structured concussion management software for orthopedic, neurosurgery, and sports medicine. NPE-CX battery, cognitive remediation, digital monitoring. Request a demo.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Synaptix Concussion Management Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Concussion Management Software for Clinics | Synaptix",
    description:
      "Structured concussion management software for orthopedic, neurosurgery, and sports medicine. NPE-CX battery, cognitive remediation, digital monitoring. Request a demo.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${ibmPlexSans.variable} ${openSans.variable}`}
    >
      <body className="min-h-screen bg-[#0A0A0A] text-white antialiased pb-20 md:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#161616] focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <MobileStickyCTA />
        <CookieConsent />
      </body>
    </html>
  );
}
