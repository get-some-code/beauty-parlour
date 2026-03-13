"use client";

import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Scissors, Sparkles, Wand2, Star, ArrowUpRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

const EXPO = [0.16, 1, 0.3, 1] as const;
const CATEGORIES = ["All", "Hair", "Nails", "Skin", "Grooming"];

const getCategoryIcon = (cat: string) => {
  switch (cat.toLowerCase()) {
    case "hair":    return Scissors;
    case "nails":   return Sparkles;
    case "skin":    return Wand2;
    default:        return Star;
  }
};

interface Service {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price_start: number;
  image_url: string | null;
  is_active: boolean;
}

/* ─── Card ───────────────────────────────────────────────────────────────── */
const ServiceCard = memo(({ service, index }: { service: Service; index: number }) => {
  const Icon = getCategoryIcon(service.category);
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: EXPO }}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer h-full"
      style={{
        background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(201,168,76,0.02) 100%)",
        border: "1px solid rgba(201,168,76,0.12)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {/* image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={service.image_url || "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800"}
          alt={`${service.name} at Habibs Hair & Beauty New Town Kolkata`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
          loading={index < 3 ? "eager" : "lazy"}
          unoptimized={!!service.image_url?.includes("supabase")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080604]/70 via-transparent to-transparent" />

        {/* category + price */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                       text-[9px] uppercase tracking-widest font-sans font-medium"
            style={{
              background: "rgba(8,6,4,0.65)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(201,168,76,0.22)",
              color: "rgba(201,168,76,0.85)",
            }}
          >
            <Icon className="w-2.5 h-2.5" aria-hidden="true" />
            {service.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span
            className="text-[10px] font-sans font-bold px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(201,168,76,0.9)",
              color: "#080604",
            }}
          >
            {service.price_start ? `From ₹${service.price_start}` : ""}
          </span>
        </div>
      </div>

      {/* body */}
      <div className="flex flex-col flex-1 p-5 md:p-6">
        <h2 className="font-serif font-bold text-[#EDE0C4] text-lg md:text-xl leading-tight mb-2">
          {service.name}
        </h2>
        <p className="text-[#EDE0C4]/45 text-xs md:text-sm font-sans leading-relaxed mb-5 flex-1 line-clamp-3">
          {service.description}
        </p>

        <div
          className="w-full h-px mb-4"
          style={{ background: "linear-gradient(to right, rgba(201,168,76,0.18), transparent)" }}
          aria-hidden="true"
        />

        <Link
          href={`/booking?service=${service.id}`}
          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest
                     font-semibold font-sans transition-all duration-200 group/link"
          style={{ color: "rgba(201,168,76,0.6)" }}
          aria-label={`Book ${service.name} at Habibs Hair & Beauty New Town Kolkata`}
        >
          Book Appointment
          <ArrowUpRight
            className="w-3 h-3 group-hover/link:translate-x-0.5
                       group-hover/link:-translate-y-0.5 transition-transform duration-200"
          />
        </Link>
      </div>

      {/* hover border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                   transition-opacity duration-400 pointer-events-none"
        style={{ border: "1px solid rgba(201,168,76,0.3)" }}
        aria-hidden="true"
      />
    </motion.article>
  );
});
ServiceCard.displayName = "ServiceCard";

const ServiceCardSkeleton = () => (
  <div className="rounded-2xl overflow-hidden animate-pulse"
    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.08)" }}>
    <div className="aspect-[4/3] bg-white/5" />
    <div className="p-5 space-y-3">
      <div className="h-4 rounded bg-white/5 w-3/4" />
      <div className="h-3 rounded bg-white/5 w-full" />
      <div className="h-3 rounded bg-white/5 w-2/3" />
    </div>
  </div>
);

/* ─── Page ───────────────────────────────────────────────────────────────── */
const ServicesContent = () => {
  const [active, setActive] = useState("All");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) setServices(data as Service[]);
        setLoading(false);
      });
  }, []);

  const filtered = active === "All"
    ? services
    : services.filter((s) => s.category === active);

  return (
    <div className="bg-[#080604] min-h-screen">
      {/* ── Page header ─────────────────────────────────────────────── */}
      <div className="pt-28 md:pt-36 pb-12 md:pb-16 px-5 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EXPO }}
          className="max-w-2xl"
        >
          <p
            className="text-[10px] uppercase tracking-[0.4em] font-sans font-medium mb-4"
            style={{ color: "rgba(201,168,76,0.65)" }}
          >
            Our Expert Offerings
          </p>
          <h1
            className="font-serif text-[#EDE0C4] leading-[0.93] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)" }}
          >
            PREMIUM
            <br />
            <span
              className="italic font-light"
              style={{
                background: "linear-gradient(135deg, #F5E6B0 0%, #C9A84C 45%, #A08C5B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Services
            </span>
          </h1>

          <div className="flex items-center gap-3 mb-6" aria-hidden="true">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/40" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#C9A84C]/50" />
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/40" />
          </div>

          <p className="text-[#EDE0C4]/50 text-sm md:text-base font-sans leading-relaxed max-w-lg">
            From professional hair styling to artistic nail extensions — each service
            is crafted to provide an unparalleled experience of elegance and care
            at New Town's premier luxury salon.
          </p>
        </motion.div>
      </div>

      {/* ── Category filter ───────────────────────────────────────────── */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 mb-10">
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EXPO }}
          className="flex gap-2 overflow-x-auto pb-2
                     [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                     [-webkit-overflow-scrolling:touch]"
          role="tablist"
          aria-label="Filter services by category"
        >
          {CATEGORIES.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                role="tab"
                aria-selected={isActive}
                className="shrink-0 px-5 py-2.5 rounded-full text-[10px] uppercase
                           tracking-widest font-semibold font-sans transition-all
                           duration-300 focus:outline-none focus-visible:ring-2
                           focus-visible:ring-[#C9A84C]"
                style={{
                  background: isActive ? "#C9A84C" : "rgba(201,168,76,0.07)",
                  color: isActive ? "#080604" : "rgba(201,168,76,0.55)",
                  border: `1px solid ${isActive ? "#C9A84C" : "rgba(201,168,76,0.18)"}`,
                }}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* ── Grid ────────────────────────────────────────────────────── */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 pb-24">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => <ServiceCardSkeleton key={i} />)}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
              role="list"
              aria-label={`${active} services`}
            >
              {filtered.length === 0 ? (
                <p className="col-span-full py-20 text-center font-sans italic text-sm" style={{ color: "rgba(237,224,196,0.3)" }}>
                  No services found for this category.
                </p>
              ) : filtered.map((service, i) => (
                <div key={service.id} role="listitem">
                  <ServiceCard service={service} index={i} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* FAQ — local SEO */}
        <motion.section
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EXPO }}
          className="mt-24"
          aria-labelledby="faq-heading"
        >
          <p
            className="text-[10px] uppercase tracking-[0.4em] font-sans font-medium mb-4"
            style={{ color: "rgba(201,168,76,0.55)" }}
          >
            Common Questions
          </p>
          <h2
            id="faq-heading"
            className="font-serif text-[#EDE0C4] mb-8 leading-tight"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
          >
            Frequently Asked
            <span className="italic font-light ml-2"
              style={{
                background: "linear-gradient(135deg, #F5E6B0, #C9A84C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >Questions</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                q: "Where is Habibs Hair & Beauty located in New Town?",
                a: "We are located at AA3, B114–115, Uniworld City, Downtown Retail, New Town, Kolkata 700160 — inside Downtown Mall, easily accessible from Action Area 1 & 2.",
              },
              {
                q: "What are your opening hours?",
                a: "We are open every day of the week from 11:00 AM to 8:30 PM, including weekends and most public holidays.",
              },
              {
                q: "Do you offer keratin and hair botox treatments?",
                a: "Yes! We offer professional keratin smoothing and hair botox treatments starting from ₹3500, using premium international products.",
              },
              {
                q: "Can I book an appointment online?",
                a: "Yes — use our online booking system to select your service, date and preferred time slot. You can also call us at +91 33 4061 5078 or WhatsApp us.",
              },
              {
                q: "Do you offer nail extensions in New Town?",
                a: "Absolutely. We specialise in acrylic and gel nail extensions, nail art, French manicures, ombre and 3D designs starting from ₹500.",
              },
              {
                q: "Is Habibs a unisex salon?",
                a: "Yes, we are a fully unisex luxury salon catering to men, women and all genders across all hair types and beauty needs.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201,168,76,0.1)",
                }}
              >
                <h3
                  className="font-sans font-semibold text-[#EDE0C4]/80 text-sm mb-2 leading-snug"
                >
                  {faq.q}
                </h3>
                <p className="text-[#EDE0C4]/45 text-xs font-sans leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* bottom edge */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(to right,transparent,rgba(201,168,76,0.15),transparent)" }}
        aria-hidden="true"
      />
    </div>
  );
};

export default memo(ServicesContent);