import { Metadata } from "next";
import AboutContent from "@/components/AboutContent";
import Script from "next/script";

export const metadata: Metadata = {
  title: "About Us | Habibs Hair & Beauty — New Town Kolkata's Premier Salon",
  description:
    "Learn the story behind Habibs Hair & Beauty, New Town Kolkata's premier unisex luxury salon. Meet owner Anamika, our expert team including stylist Tanvir, and discover our 15+ year legacy of excellence.",
  keywords: [
    "about habibs hair and beauty new town",
    "best salon new town kolkata",
    "luxury salon downtown mall new town",
    "habibs salon owner anamika",
    "tanvir stylist new town kolkata",
    "unisex salon new town kolkata",
    "hair salon history new town",
    "premium beauty parlour kolkata",
  ],
  alternates: { canonical: "https://habibssalon-newtown.com/about" },
  openGraph: {
    title: "About Habibs Hair & Beauty — New Town Kolkata",
    description:
      "15+ years of luxury beauty excellence in New Town Kolkata. Meet our expert team and discover our passion for artistry.",
    url: "https://habibssalon-newtown.com/about",
    images: [
      {
        url: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Habibs Hair & Beauty salon team — New Town Kolkata",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Habibs Hair & Beauty — New Town Kolkata",
  description:
    "The story, team and philosophy behind Habibs Hair & Beauty, New Town Kolkata's premier luxury salon",
  url: "https://habibssalon-newtown.com/about",
  mainEntity: {
    "@type": "BeautySalon",
    name: "Habibs Hair and Beauty",
    description:
      "New Town Kolkata's premier unisex luxury salon with 15+ years of excellence in hair styling, colouring, nail extensions and beauty treatments",
    foundingDate: "2009",
    employee: [
      {
        "@type": "Person",
        name: "Anamika",
        jobTitle: "Owner & Expert Stylist",
      },
      {
        "@type": "Person",
        name: "Tanvir",
        jobTitle: "Senior Hair Stylist",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.3",
      reviewCount: "115",
      bestRating: "5",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "AA 3, B 114/115, Uniworld City, Downtown Retail, New Town",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      postalCode: "700160",
      addressCountry: "IN",
    },
  },
};

export default function AboutPage() {
  return (
    <>
      <Script
        id="about-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="beforeInteractive"
      />
      <AboutContent />
    </>
  );
}