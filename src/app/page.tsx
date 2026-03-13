import Hero from "@/components/sections/Hero";
import FeaturedServices from "@/components/sections/FeaturedServices";
import NailShowcase from "@/components/sections/NailShowcase";
import Testimonials from "@/components/sections/Testimonials";
import LocationMap from "@/components/sections/LocationMap";
import { SALON_DETAILS } from "@/lib/constants";
import type { Metadata } from "next";
import Script from "next/script";

/* ─── SEO Metadata ─────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Habibs Hair & Beauty | Luxury Salon in New Town, Kolkata",
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
    "nail art kolkata",
    "best salon new town",
    "beauty salon uniworld city",
  ],
  authors: [{ name: "Habibs Hair and Beauty" }],
  creator: "Habibs Hair and Beauty",
  publisher: "Habibs Hair and Beauty",
  metadataBase: new URL("https://habibssalon-newtown.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://habibssalon-newtown.com",
    siteName: "Habibs Hair & Beauty",
    title: "Habibs Hair & Beauty | Luxury Salon in New Town, Kolkata",
    description:
      "Experience luxury beauty at Habibs Hair & Beauty, New Town's premier unisex salon. Hair, nails, skin & grooming — all under one roof.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Habibs Hair & Beauty Salon Interior - New Town Kolkata",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Habibs Hair & Beauty | Luxury Salon in New Town, Kolkata",
    description:
      "Experience luxury beauty at Habibs Hair & Beauty, New Town's premier unisex salon.",
    images: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop",
    ],
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
  verification: {
    // Add your Google Search Console verification token here
    // google: "YOUR_VERIFICATION_TOKEN",
  },
};

/* ─── Structured Data ───────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: SALON_DETAILS.name,
  image:
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop",
  "@id": "https://habibssalon-newtown.com",
  url: "https://habibssalon-newtown.com",
  telephone: SALON_DETAILS.phone,
  priceRange: "₹₹",
  description:
    "Kolkata's premier unisex luxury salon in New Town offering hair styling, coloring, nail extensions, facials and grooming services.",
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
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "20:30",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: SALON_DETAILS.googleRating,
    reviewCount: SALON_DETAILS.totalReviews,
    bestRating: "5",
    worstRating: "1",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Beauty Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Haircuts & Styling",
          description:
            "Expert cuts and styling tailored to your face shape and personality.",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "800",
          priceCurrency: "INR",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Hair Coloring",
          description:
            "Global color, highlights, balayage, and more using premium products.",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "2500",
          priceCurrency: "INR",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Nail Extensions",
          description:
            "Acrylic and Gel nail extensions for a flawless, long-lasting look.",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "1500",
          priceCurrency: "INR",
        },
      },
    ],
  },
  sameAs: [
    "https://www.facebook.com/habibshairandbeauty",
    "https://www.instagram.com/habibshairandbeauty",
  ],
};

/* ─── Page ──────────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Script
        id="structured-data-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="beforeInteractive"
      />
      <div className="flex flex-col">
        <Hero />
        <FeaturedServices />
        <NailShowcase />
        <Testimonials />
        <LocationMap />
      </div>
    </>
  );
}