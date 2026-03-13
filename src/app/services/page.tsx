import { Metadata } from "next";
import ServicesContent from "@/components/ServicesContent";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Premium Beauty Services | Hair, Nails, Skin & Grooming",
  description:
    "Explore all beauty services at Habibs Hair & Beauty, New Town Kolkata — haircuts, hair colouring, keratin treatment, hair botox, nail extensions, nail art, facials & grooming. Starting from ₹800.",
  keywords: [
    "hair salon new town kolkata",
    "keratin treatment new town kolkata",
    "hair botox treatment kolkata",
    "nail extensions new town",
    "nail art new town kolkata",
    "hair spa new town kolkata",
    "facial new town kolkata",
    "beauty parlour new town",
    "salon near downtown mall new town",
    "hair colour new town kolkata",
  ],
  alternates: { canonical: "https://habibssalon-newtown.com/services" },
  openGraph: {
    title: "Premium Beauty Services — Habibs Hair & Beauty New Town Kolkata",
    description:
      "Hair styling, colouring, keratin, nail extensions, facials & more. Visit Habibs Hair & Beauty inside Downtown Mall, New Town Kolkata.",
    url: "https://habibssalon-newtown.com/services",
    images: [
      {
        url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Habibs Hair & Beauty services — New Town Kolkata",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Beauty Services at Habibs Hair & Beauty New Town Kolkata",
  description:
    "Complete list of hair, nail, skin and grooming services offered at Habibs Hair & Beauty, New Town Kolkata",
  url: "https://habibssalon-newtown.com/services",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Haircuts & Styling", description: "Expert cuts and styling from ₹800" },
    { "@type": "ListItem", position: 2, name: "Hair Colouring & Balayage", description: "Global colour, highlights, balayage from ₹2500" },
    { "@type": "ListItem", position: 3, name: "Keratin Treatment", description: "Professional keratin smoothing from ₹3500" },
    { "@type": "ListItem", position: 4, name: "Hair Botox Treatment", description: "Deep conditioning hair botox from ₹3500" },
    { "@type": "ListItem", position: 5, name: "Nail Extensions", description: "Acrylic & gel nail extensions from ₹1500" },
    { "@type": "ListItem", position: 6, name: "Nail Art", description: "Creative nail art designs from ₹500" },
    { "@type": "ListItem", position: 7, name: "Facials & Skin Care", description: "Rejuvenating facials from ₹2000" },
    { "@type": "ListItem", position: 8, name: "Grooming Services", description: "Complete grooming for men & women from ₹1000" },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <Script
        id="services-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="beforeInteractive"
      />
      <ServicesContent />
    </>
  );
}