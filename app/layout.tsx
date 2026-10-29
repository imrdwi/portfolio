import type { Metadata } from "next";
import { Barlow_Semi_Condensed, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { CopyEmailToast } from "@/components/shared/copy-email-toast";
import { profile } from "@/data/profile";
import { ogImage } from "@/lib/metadata";
import { ogCards } from "@/lib/og-content";
import { allTechnologies } from "@/data/stack";

// Static files, not Google's variable font: Chrome prints a variable font to
// PDF as Type 3, which older ATS parsers misread.
const sourceSans = localFont({
  variable: "--font-source-sans",
  src: [
    { path: "./fonts/source-sans-3-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/source-sans-3-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/source-sans-3-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});

const barlow = Barlow_Semi_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rizkik.me"),
  title: {
    default: "Rizki Kurniawan | Senior Backend Engineer",
    template: "%s | Rizki Kurniawan",
  },
  description: profile.seoDescription,
  keywords: [
    "Senior Backend Engineer",
    "Backend Engineer",
    "Software Engineer",
    "Node.js",
    "TypeScript",
    "PHP",
    "Laravel",
    "API Development",
    "System Integration",
    "Data Synchronization",
    "Microservices",
    "Remote Backend Engineer",
  ],
  authors: [{ name: "Rizki Kurniawan" }],
  creator: "Rizki Kurniawan",
  openGraph: {
    title: "Rizki Kurniawan | Senior Backend Engineer",
    description: profile.seoDescription,
    type: "website",
    locale: "en_US",
    siteName: "Rizki Kurniawan",
    images: [ogImage("/", ogCards.home())],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizki Kurniawan | Senior Backend Engineer",
    description: profile.seoDescription,
    images: [ogImage("/", ogCards.home())],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "rizkik.me",
  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://rizkik.me/#person",
    name: "Rizki Kurniawan",
    alternateName: [...profile.alternateNames, "imrdwi"],
    jobTitle: "Senior Backend Engineer",
    description: profile.seoDescription,
    url: "https://rizkik.me",
    worksFor: {
      "@type": "Organization",
      name: "SoftwareSeni",
    },
    sameAs: ["https://linkedin.com/in/imrdwi", "https://github.com/imrdwi"],
    knowsAbout: allTechnologies,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Jenderal Soedirman University",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Yogyakarta",
      addressCountry: "Indonesia",
    },
  };

  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${barlow.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <ThemeProvider>
          <a
            href="#main-content"
            className="no-print fixed left-4 top-3 z-[100] -translate-y-20 bg-primary px-4 py-2 font-semibold text-primary-foreground transition-transform focus:translate-y-0"
          >
            Skip to main content
          </a>
          <SiteHeader />
          <main id="main-content" className="flex-1" tabIndex={-1}>{children}</main>
          <SiteFooter />
          <CopyEmailToast />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
