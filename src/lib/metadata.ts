import { Metadata } from "next";

export const sharedMetadata: Metadata = {
  title: {
    template: "%s | Habibs Hair and Beauty New Town Kolkata",
    default: "Habibs Hair and Beauty | Luxury Salon in New Town Kolkata",
  },
  description:
    "Habibs Hair and Beauty — New Town Kolkata's premier unisex luxury salon inside Downtown Mall, Uniworld City. Expert hair styling, colouring, keratin treatment, hair botox, nail extensions, nail art and facials. হাবিব হেয়ার অ্যান্ড বিউটি।",
  keywords: [
    "beauty salon in New Town Kolkata",
    "best salon in New Town Kolkata",
    "hair salon new town kolkata",
    "nail extension salon New Town Kolkata",
    "luxury beauty parlour New Town Kolkata",
    "unisex salon near Downtown Mall New Town",
    "keratin treatment new town kolkata",
    "hair botox treatment kolkata",
    "hair spa new town kolkata",
    "nail art New Town Kolkata",
    "salon near downtown mall new town",
    "habibs hair and beauty new town",
    "beauty parlour new town kolkata",
    "hair colour new town kolkata",
    "facial new town kolkata",
  ],
  authors: [{ name: "Habibs Hair and Beauty", url: "https://habibssalon-newtown.com" }],
  creator: "Habibs Hair and Beauty",
  publisher: "Habibs Hair and Beauty",
  category: "Beauty Salon",
  openGraph: {
    title: "Habibs Hair and Beauty | Luxury Salon in New Town Kolkata",
    description:
      "New Town Kolkata's premier unisex luxury salon. Hair styling, colouring, keratin, nail extensions & more inside Downtown Mall, Uniworld City.",
    url: "https://habibssalon-newtown.com",
    siteName: "Habibs Hair and Beauty",
    images: [
      {
        url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Habibs Hair and Beauty — luxury salon in New Town Kolkata",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Habibs Hair and Beauty | Luxury Salon in New Town Kolkata",
    description:
      "New Town Kolkata's premier unisex luxury salon. Hair styling, colouring, keratin, nail extensions & more.",
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
  alternates: {
    canonical: "https://habibssalon-newtown.com",
  },
};