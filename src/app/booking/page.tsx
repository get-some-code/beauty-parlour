import { Metadata } from "next";
import BookingContent from "@/components/BookingContent";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Book an Appointment | Habibs Hair & Beauty New Town Kolkata",
  description:
    "Book your luxury beauty appointment at Habibs Hair & Beauty, New Town Kolkata. Choose from haircuts, hair colouring, keratin treatment, nail extensions, facials & more. Easy online booking.",
  keywords: [
    "book appointment hair salon new town kolkata",
    "online booking beauty salon new town",
    "book keratin treatment new town kolkata",
    "nail extension appointment new town kolkata",
    "hair colour booking new town",
    "facial appointment new town kolkata",
    "salon appointment downtown mall new town",
  ],
  alternates: { canonical: "https://habibssalon-newtown.com/booking" },
  openGraph: {
    title: "Book an Appointment — Habibs Hair & Beauty New Town Kolkata",
    description:
      "Reserve your luxury salon session at New Town's premier beauty destination. Quick, easy, and confirmed instantly.",
    url: "https://habibssalon-newtown.com/booking",
    images: [
      {
        url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Book an appointment at Habibs Hair & Beauty New Town Kolkata",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ReservationPackage",
  name: "Appointment Booking — Habibs Hair & Beauty",
  description: "Book beauty and hair services at Habibs Hair & Beauty, New Town Kolkata",
  url: "https://habibssalon-newtown.com/booking",
  provider: {
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
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "11:00",
        closes: "20:30",
      },
    ],
    priceRange: "₹₹",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.3",
      reviewCount: "115",
    },
  },
};

export default function BookingPage() {
  return (
    <>
      <Script
        id="booking-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="beforeInteractive"
      />
      <BookingContent />
    </>
  );
}