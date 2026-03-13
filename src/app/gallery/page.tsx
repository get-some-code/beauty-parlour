import { Metadata } from "next";
import GalleryContent from "@/components/GalleryContent";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Salon Gallery | Hair, Nails & Beauty Transformations",
  description:
    "Browse our gallery of luxury hair styling, colouring, nail extensions & salon transformations at Habibs Hair & Beauty, New Town Kolkata. See real results from our expert stylists.",
  keywords: [
    "hair salon gallery new town kolkata",
    "nail art gallery kolkata",
    "hair transformation new town",
    "before after hair colour kolkata",
    "luxury salon new town kolkata",
    "nail extensions gallery kolkata",
    "salon ambiance new town",
  ],
  alternates: { canonical: "https://habibssalon-newtown.com/gallery" },
  openGraph: {
    title: "Gallery — Habibs Hair & Beauty New Town Kolkata",
    description:
      "Real transformations from our expert stylists. Hair, nails, skin & more at New Town's premier luxury salon.",
    url: "https://habibssalon-newtown.com/gallery",
    images: [
      {
        url: "https://images.unsplash.com/photo-1560869713-7d0a29430863?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Habibs Hair & Beauty gallery — luxury transformations New Town Kolkata",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Habibs Hair & Beauty Gallery — New Town Kolkata",
  description:
    "Gallery showcasing hair styling, colouring, nail extensions and beauty treatments at Habibs Hair & Beauty, New Town Kolkata",
  url: "https://habibssalon-newtown.com/gallery",
  author: {
    "@type": "LocalBusiness",
    name: "Habibs Hair and Beauty",
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

export default function GalleryPage() {
  return (
    <>
      <Script
        id="gallery-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="beforeInteractive"
      />
      <GalleryContent />
    </>
  );
}