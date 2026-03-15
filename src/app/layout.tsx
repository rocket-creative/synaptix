import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Sans, Open_Sans } from "next/font/google";
import "./globals.css";
import { Nav, Footer, CookieConsent } from "@/components";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://synaptix.vercel.app"),
  title: {
    default: "Synaptix — Concussion Assessment & Recovery Platform",
    template: "%s | Synaptix",
  },
  description:
    "Structured concussion management software for orthopedic, neurosurgery, and sports medicine practices. 12-week program with NPE-CX battery, cognitive remediation, and digital monitoring.",
  keywords: [
    "concussion management",
    "concussion software",
    "neuropsychological testing",
    "cognitive remediation",
    "sports medicine",
    "TBI assessment",
    "concussion recovery",
    "NPE-CX battery",
  ],
  authors: [{ name: "Kronos Health" }],
  creator: "Kronos Health",
  publisher: "Kronos Health",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://synaptix.vercel.app",
    siteName: "Synaptix",
    title: "Synaptix — Concussion Assessment & Recovery Platform",
    description:
      "Structured concussion management software with NPE-CX battery, cognitive remediation, and digital monitoring.",
    images: [
      {
        url: "/synaptix-og.jpg",
        width: 1200,
        height: 630,
        alt: "Synaptix Concussion Management Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Synaptix — Concussion Assessment & Recovery Platform",
    description:
      "Structured concussion management software with NPE-CX battery, cognitive remediation, and digital monitoring.",
    images: ["/synaptix-og.jpg"],
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
      <body className="min-h-screen bg-[#0A0A0A] text-white antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#161616] focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
