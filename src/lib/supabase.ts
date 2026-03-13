import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

/* ─── Database Types ──────────────────────────────────────────────────────── */

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type DbService = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price_start: number;
  duration: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
};

export type DbGalleryItem = {
  id: string;
  title: string;
  category: string;
  image_url: string;
  display_order: number;
  is_featured: boolean;
  created_at: string;
};

export type DbBooking = {
  id: string;
  customer_name: string;
  email: string | null;
  phone: string;
  service_id: string | null;
  preferred_date: string;
  preferred_time: string;
  message: string | null;
  status: BookingStatus;
  created_at: string;
  services?: DbService | null;
};

export type DbReview = {
  id: string;
  name: string;
  email: string | null;
  service: string | null;
  rating: number;
  review_text: string;
  photo_url: string | null;
  source: "admin" | "user";
  status: "pending" | "approved" | "rejected";
  is_featured: boolean;
  created_at: string;
};

export type DbHeroSection = {
  id: string;
  subtitle: string | null;
  title: string | null;
  description: string | null;
  primary_button_text: string | null;
  primary_button_link: string | null;
};

export type DbAboutContent = {
  id: string;
  owner_name: string | null;
  owner_title: string | null;
  owner_bio: string | null;
  owner_image: string | null;
};

export type DbSiteSettings = {
  id: string;
  salon_name: string | null;
  tagline: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  opening_hours: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  google_maps_url: string | null;
  years_exp: string | null;
  happy_clients: string | null;
  google_rating: string | null;
  total_reviews: string | null;
};

/* ─── Legacy type kept for backward compat ────────────────────────────────── */
export type Booking = {
  id: string;
  created_at: string;
  service_id: string;
  date: string;
  time: string;
  customer_name: string;
  customer_phone: string;
  status: BookingStatus;
  notes?: string;
};
