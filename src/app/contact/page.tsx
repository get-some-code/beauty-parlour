import { Metadata } from "next";
import ContactContent from "@/components/ContactContent";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Contact Us | Habibs Hair & Beauty — New Town Kolkata",
  description:
    "Contact Habibs Hair & Beauty in New Town Kolkata. Call +91 33 4061 5078, WhatsApp us, or visit us at AA3, B114–115, Uniworld City, Downtown Mall, New Town. Open daily from 11 AM.",
  keywords: [
    "contact habibs hair beauty new town",
    "hair salon phone number new town kolkata",
    "beauty parlour near downtown mall new town",
    "book appointment hair salon new town kolkata",
    "salon whatsapp new town kolkata",
    "habibs salon address new town",
    "hair salon opening hours new town kolkata",
  ],
  alternates: { canonical: "https://habibssalon-newtown.com/contact" },
  openGraph: {
    title: "Contact Habibs Hair & Beauty — New Town Kolkata",
    description:
      "Get in touch with New Town Kolkata's premier luxury salon. Call, WhatsApp or visit us inside Downtown Mall.",
    url: "https://habibssalon-newtown.com/contact",
    images: [
      {
        url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Habibs Hair & Beauty — Contact us, New Town Kolkata",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Habibs Hair & Beauty — New Town Kolkata",
  url: "https://habibssalon-newtown.com/contact",
  mainEntity: {
    "@type": "BeautySalon",
    name: "Habibs Hair and Beauty",
    telephone: "+91 33 4061 5078",
    address: {
      "@type": "PostalAddress",
      streetAddress: "AA 3, B 114/115, Uniworld City, Downtown Retail, New Town",
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
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "11:00",
        closes: "20:30",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91 33 4061 5078",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi", "Bengali"],
      areaServed: "Kolkata",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <Script
        id="contact-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="beforeInteractive"
      />
      <ContactContent />
    </>
  );
}