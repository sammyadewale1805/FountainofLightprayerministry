import type { Metadata } from "next";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE, LOCATIONS } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.description,
  keywords: [
    "church",
    "prayer ministry",
    "Fountain of Light",
    "New York church",
    "Lagos church",
    "Akure church",
    "Christian community",
  ],
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    type: "website",
    url: SITE.url,
    siteName: SITE.shortName,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  alternates: {
    canonical: "/",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  email: SITE.email,
  sameAs: Object.values(SITE.social),
  location: LOCATIONS.map((loc) => ({
    "@type": "Place",
    name: loc.name,
    address: loc.address,
    telephone: loc.phone,
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        {/* eslint-disable-next-line react/no-danger */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Providers>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
