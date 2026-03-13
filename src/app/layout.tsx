import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { SALON_DETAILS } from "@/lib/constants";
import Script from "next/script";

/* ─── Fonts ─────────────────────────────────────────────────────────────────
   Cormorant Garamond: editorial, high-fashion serif for headings
   Jost: geometric, clean sans for body — pairs beautifully with Cormorant
──────────────────────────────────────────────────────────────────────────── */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

/* ─── Viewport ───────────────────────────────────────────────────────────── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E9DBBD" },
    { media: "(prefers-color-scheme: dark)", color: "#181510" },
  ],
};

/* ─── Shared Metadata ────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://habibssalon-newtown.com"),
  title: {
    default: "Habibs Hair & Beauty | Luxury Salon in New Town, Kolkata",
    template: "%s | Habibs Hair & Beauty",
  },
  description:
    "Kolkata's premier unisex luxury salon in New Town. Expert hair styling, coloring, nail extensions, facials & grooming. Open daily 10 AM – 8:30 PM. Book today!",
  keywords: [
    "luxury salon new town kolkata",
    "hair salon new town",
    "nail extensions kolkata",
    "habibs hair beauty",
    "unisex salon kolkata",
    "keratin treatment kolkata",
    "balayage kolkata",
    "best salon new town",
    "beauty salon uniworld city kolkata",
  ],
  authors: [{ name: "Habibs Hair and Beauty", url: "https://habibssalon-newtown.com" }],
  creator: "Habibs Hair and Beauty",
  publisher: "Habibs Hair and Beauty",
  category: "Beauty & Personal Care",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://habibssalon-newtown.com",
    siteName: "Habibs Hair & Beauty",
    images: [
      {
        url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Habibs Hair & Beauty Salon — New Town, Kolkata",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@habibsbeauty",
    creator: "@habibsbeauty",
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
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

/* ─── Global JSON-LD (HairSalon / LocalBusiness) ────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: SALON_DETAILS.name,
  image:
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop",
  "@id": "https://habibssalon-newtown.com",
  url: "https://habibssalon-newtown.com",
  telephone: SALON_DETAILS.phone,
  priceRange: "₹₹",
  description:
    "New Town Kolkata's premier unisex luxury salon for hair, nails, skin and grooming.",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "AA 3, B 114/115, Uniworld City, Downtown Retail, New Town",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    postalCode: "700160",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.5857222,
    longitude: 88.4721111,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",
      ],
      opens: "10:00",
      closes: "20:30",
    },
  ],
  sameAs: [
    "https://www.facebook.com/habibshairandbeauty",
    "https://www.instagram.com/habibshairandbeauty",
  ],
};

/* ─── Root Layout ────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} scroll-smooth`}
    >
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Global LocalBusiness structured data */}
        <Script
          id="structured-data-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body className="font-sans bg-champagne text-luxury-black antialiased">
        {/* Accessibility: skip to main content */}
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <FloatingCTA />
        <Footer />
      </body>
    </html>
  );
}