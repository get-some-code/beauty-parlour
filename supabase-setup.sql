-- ============================================================
-- HABIBS HAIR & BEAUTY — Supabase Database Setup
-- Run this entire script once in the Supabase SQL Editor
-- ============================================================

-- ── Extensions ──────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── Drop tables if re-running ────────────────────────────────
drop table if exists bookings cascade;
drop table if exists services cascade;
drop table if exists gallery_items cascade;
drop table if exists reviews cascade;
drop table if exists hero_sections cascade;
drop table if exists about_content cascade;
drop table if exists site_settings cascade;

-- ── 1. services ──────────────────────────────────────────────
create table services (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  slug        text not null,
  category    text not null default 'Hair',
  description text,
  price_start integer not null default 0,
  duration    text,
  image_url   text,
  is_active   boolean not null default true,
  created_at  timestamptz default now()
);

-- ── 2. gallery_items ─────────────────────────────────────────
create table gallery_items (
  id            uuid primary key default uuid_generate_v4(),
  title         text not null,
  category      text not null default 'Hair',
  image_url     text not null,
  display_order integer not null default 0,
  is_featured   boolean not null default false,
  created_at    timestamptz default now()
);

-- ── 3. bookings ──────────────────────────────────────────────
create table bookings (
  id             uuid primary key default uuid_generate_v4(),
  customer_name  text not null,
  email          text,
  phone          text not null,
  service_id     uuid references services(id) on delete set null,
  preferred_date date not null,
  preferred_time text not null,
  message        text,
  status         text not null default 'pending',
  created_at     timestamptz default now()
);

-- ── 4. reviews ───────────────────────────────────────────────
create table reviews (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  email       text,
  service     text,
  rating      integer not null default 5,
  review_text text not null,
  photo_url   text,
  source      text not null default 'admin',  -- 'admin' | 'user'
  status      text not null default 'approved', -- 'pending' | 'approved' | 'rejected'
  is_featured boolean not null default false,
  created_at  timestamptz default now()
);

-- ── 5. hero_sections ─────────────────────────────────────────
create table hero_sections (
  id                   uuid primary key default uuid_generate_v4(),
  subtitle             text,
  title                text,
  description          text,
  primary_button_text  text,
  primary_button_link  text
);

-- ── 6. about_content ─────────────────────────────────────────
create table about_content (
  id           uuid primary key default uuid_generate_v4(),
  owner_name   text,
  owner_title  text,
  owner_bio    text,
  owner_image  text
);

-- ── 7. site_settings ─────────────────────────────────────────
create table site_settings (
  id            uuid primary key default uuid_generate_v4(),
  salon_name    text,
  tagline       text,
  phone         text,
  whatsapp      text,
  email         text,
  address       text,
  city          text,
  opening_hours text,
  instagram_url text,
  facebook_url  text,
  google_maps_url text,
  years_exp     text,
  happy_clients text,
  google_rating text,
  total_reviews text
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table services     enable row level security;
alter table gallery_items enable row level security;
alter table bookings      enable row level security;
alter table reviews       enable row level security;
alter table hero_sections enable row level security;
alter table about_content enable row level security;
alter table site_settings enable row level security;

-- Public can read active services
create policy "public_read_services" on services
  for select using (is_active = true);

-- Public can read all gallery_items
create policy "public_read_gallery" on gallery_items
  for select using (true);

-- Public can read approved reviews
create policy "public_read_reviews" on reviews
  for select using (status = 'approved');

-- Public can read hero_sections, about_content, site_settings
create policy "public_read_hero"     on hero_sections  for select using (true);
create policy "public_read_about"    on about_content  for select using (true);
create policy "public_read_settings" on site_settings  for select using (true);

-- Public can insert bookings (booking form)
create policy "public_insert_bookings" on bookings
  for insert with check (true);

-- Public can insert user reviews
create policy "public_insert_reviews" on reviews
  for insert with check (source = 'user');

-- Authenticated (admin) can do everything
create policy "admin_all_services"     on services       for all using (auth.role() = 'authenticated');
create policy "admin_all_gallery"      on gallery_items  for all using (auth.role() = 'authenticated');
create policy "admin_all_bookings"     on bookings       for all using (auth.role() = 'authenticated');
create policy "admin_all_reviews"      on reviews        for all using (auth.role() = 'authenticated');
create policy "admin_all_hero"         on hero_sections  for all using (auth.role() = 'authenticated');
create policy "admin_all_about"        on about_content  for all using (auth.role() = 'authenticated');
create policy "admin_all_settings"     on site_settings  for all using (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA
-- ============================================================

-- Services
insert into services (name, slug, category, description, price_start, duration, image_url, is_active) values
('Haircut & Styling',   'haircut-styling',   'Hair',     'Expert cuts and styling for all hair types.',                 500,  '45 min',  'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800', true),
('Hair Colouring',      'hair-colouring',    'Hair',     'Full colour, highlights, balayage and ombre.',                1500, '90 min',  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800', true),
('Keratin Treatment',   'keratin-treatment', 'Hair',     'Professional smoothing and de-frizz treatment.',             3500, '120 min', 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=800', true),
('Nail Extensions',     'nail-extensions',   'Nails',    'Acrylic and gel nail extensions with custom art.',            800,  '60 min',  'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800', true),
('Facials & Skin Care', 'facials-skin-care', 'Skin',     'Customised facial treatments for your skin concerns.',        1200, '60 min',  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800', true);

-- Gallery items
insert into gallery_items (title, category, image_url, display_order, is_featured) values
('Hair styling',   'Hair',  'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800', 1, true),
('Nail extensions','Nails', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800', 2, true),
('Facial',         'Skin',  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800', 3, false),
('Hair colouring', 'Hair',  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800', 4, false),
('Salon interior', 'Salon', 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=800', 5, true);

-- Reviews (seed approved admin reviews)
insert into reviews (name, service, rating, review_text, source, status, is_featured) values
('Riya Das',    'Hair Colouring',    5, 'Absolutely stunning results! Best salon in New Town.', 'admin', 'approved', true),
('Sunita Bose', 'Nail Extensions',   5, 'Best nail extensions in New Town. Results last for weeks.', 'admin', 'approved', true),
('Arjun Mehta', 'Haircut & Styling', 4, 'Great haircut and very pleasant experience overall.', 'admin', 'approved', false);

-- Hero section
insert into hero_sections (subtitle, title, description, primary_button_text, primary_button_link) values
('New Town''s Premier Destination', 'LUXURY BEAUTY Redefined', 'Experience unparalleled beauty services at Habibs Hair & Beauty — where every visit is a journey into elegance.', 'Book Appointment', '/booking');

-- About content
insert into about_content (owner_name, owner_title, owner_bio, owner_image) values
('Anamika', 'Owner & Expert Stylist', 'Founded with a vision to redefine luxury beauty in New Town. With 15+ years of experience, our team of expert stylists and beauticians are dedicated to making you look and feel your absolute best.', '');

-- Site settings
insert into site_settings (salon_name, tagline, phone, whatsapp, email, address, city, opening_hours, instagram_url, facebook_url, google_maps_url, years_exp, happy_clients, google_rating, total_reviews) values
('Habibs Hair & Beauty', 'New Town''s Premier Luxury Salon', '+91 33 4061 5078', '+919876543210', 'info@habibssalon.com', 'AA3, B114–115, Uniworld City, Downtown Retail, New Town, Kolkata 700160', 'New Town, Kolkata', '10:00 AM – 8:30 PM (Mon–Sun)', 'https://instagram.com/habibsnewtownkolkata', 'https://facebook.com/habibssalon', 'https://maps.google.com/?q=Habibs+Hair+and+Beauty+New+Town+Kolkata', '15+', '5000+', '4.3', '115');

-- ============================================================
-- STORAGE BUCKETS
-- Run separate in Supabase Dashboard > Storage if SQL doesn't work
-- ============================================================
insert into storage.buckets (id, name, public) values
('service-images',  'service-images',  true),
('gallery-images',  'gallery-images',  true),
('review-images',   'review-images',   true),
('owner-images',    'owner-images',    true)
on conflict (id) do nothing;

-- Storage policies — public read
create policy "public_read_service_images"  on storage.objects for select using (bucket_id = 'service-images');
create policy "public_read_gallery_images"  on storage.objects for select using (bucket_id = 'gallery-images');
create policy "public_read_review_images"   on storage.objects for select using (bucket_id = 'review-images');
create policy "public_read_owner_images"    on storage.objects for select using (bucket_id = 'owner-images');

-- Authenticated upload/delete
create policy "admin_upload_service_images" on storage.objects for insert with check (bucket_id = 'service-images' and auth.role() = 'authenticated');
create policy "admin_upload_gallery_images" on storage.objects for insert with check (bucket_id = 'gallery-images' and auth.role() = 'authenticated');
create policy "admin_upload_review_images"  on storage.objects for insert with check (bucket_id = 'review-images'  and auth.role() = 'authenticated');
create policy "admin_upload_owner_images"   on storage.objects for insert with check (bucket_id = 'owner-images'   and auth.role() = 'authenticated');
create policy "admin_delete_service_images" on storage.objects for delete using (bucket_id = 'service-images' and auth.role() = 'authenticated');
create policy "admin_delete_gallery_images" on storage.objects for delete using (bucket_id = 'gallery-images' and auth.role() = 'authenticated');
