"use client";

import { memo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/lib/constants";
import { Scissors, Sparkles, Wand2, Star, ArrowUpRight, ChevronRight } from "lucide-react";

/* ─── Constants ─────────────────────────────────────────────────────────── */
const EXPO = [0.16, 1, 0.3, 1] as const;

const featured = SERVICES.slice(0, 4);

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "hair":     return Scissors;
    case "nails":    return Sparkles;
    case "skin":     return Wand2;
    default:         return Star;
  }
};

/* ─── Service Card ───────────────────────────────────────────────────────── */
const ServiceCard = memo(({ service, index }: { service: typeof featured[0]; index: number }) => {
  const Icon = getCategoryIcon(service.category);
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EXPO }}
      className="group relative flex-shrink-0
                 w-[76vw] sm:w-[54vw] md:w-auto
                 rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(201,168,76,0.03) 100%)",
        border: "1px solid rgba(201,168,76,0.14)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* image */}
      {service.image && (
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={service.image}
            alt={`${service.title} at Habibs Hair & Beauty New Town Kolkata`}
            fill
            sizes="(max-width: 640px) 76vw, (max-width: 768px) 54vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
            loading={index < 2 ? "eager" : "lazy"}
          />
          {/* dark overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080604]/80 via-transparent to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          {/* category chip */}
          <div className="absolute top-3 left-3">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                         text-[9px] uppercase tracking-widest font-sans font-medium"
              style={{
                background: "rgba(8,6,4,0.65)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(201,168,76,0.25)",
                color: "rgba(201,168,76,0.85)",
              }}
            >
              <Icon className="w-2.5 h-2.5" aria-hidden="true" />
              {service.category}
            </span>
          </div>
        </div>
      )}

      {/* body */}
      <div className="p-5 md:p-6">
        {/* price row */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold"
            style={{ color: "rgba(201,168,76,0.55)" }}
          >
            Starting from
          </span>
          <span
            className="font-serif font-bold text-sm"
            style={{
              background: "linear-gradient(135deg, #F5E6B0, #C9A84C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {service.price}
          </span>
        </div>

        {/* rule */}
        <div
          className="w-full h-px mb-4"
          style={{ background: "linear-gradient(to right, rgba(201,168,76,0.2), transparent)" }}
          aria-hidden="true"
        />

        <h3 className="font-serif font-bold text-[#EDE0C4] text-lg md:text-xl leading-tight mb-2">
          {service.title}
        </h3>
        <p className="text-[#EDE0C4]/45 text-xs md:text-sm font-sans leading-relaxed mb-5 line-clamp-2">
          {service.description}
        </p>

        <Link
          href={`/booking?service=${service.id}`}
          className="inline-flex items-center gap-1.5 text-[10px] md:text-xs uppercase
                     tracking-widest font-semibold font-sans transition-colors duration-200"
          style={{ color: "rgba(201,168,76,0.65)" }}
          aria-label={`Book ${service.title} at Habibs Hair & Beauty`}
        >
          Book Service
          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </Link>
      </div>

      {/* hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                   transition-opacity duration-400 pointer-events-none"
        style={{ border: "1px solid rgba(201,168,76,0.32)" }}
        aria-hidden="true"
      />
    </motion.article>
  );
});
ServiceCard.displayName = "ServiceCard";

/* ─── Section ────────────────────────────────────────────────────────────── */
const FeaturedServices = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  return (
    <section
      className="bg-[#080604] overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* top edge accent */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.2), transparent)" }}
        aria-hidden="true"
      />

      <div className="py-20 md:py-28">
        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="px-5 sm:px-8 md:px-12 lg:px-16 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EXPO }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.4em] font-sans font-medium mb-4"
                style={{ color: "rgba(201,168,76,0.65)" }}
              >
                Premium Offerings
              </p>

              <h2
                id="services-heading"
                className="font-serif text-[#EDE0C4] leading-[0.93] tracking-tight"
                style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}
              >
                EXCEPTIONAL
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
              </h2>
            </div>

            {/* ornament + desktop CTA */}
            <div className="flex flex-col items-start md:items-end gap-4">
              <div className="flex items-center gap-3" aria-hidden="true">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/40" />
                <div className="w-1.5 h-1.5 rotate-45 border border-[#C9A84C]/50" />
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/40" />
              </div>
              <Link
                href="/services"
                className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full
                           text-[10px] uppercase tracking-widest font-semibold font-sans
                           transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  border: "1px solid rgba(201,168,76,0.3)",
                  color: "rgba(201,168,76,0.7)",
                }}
                aria-label="View all beauty services"
              >
                View All Services
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── Horizontal scroll track (mobile) / Grid (desktop) ───── */}
        <div
          ref={trackRef}
          className="
            flex gap-4 px-5 sm:px-8
            overflow-x-auto scroll-smooth snap-x snap-mandatory
            pb-4 md:pb-0
            md:grid md:grid-cols-2 lg:grid-cols-4
            md:overflow-visible md:px-12 lg:px-16
            md:gap-6
            [-webkit-overflow-scrolling:touch]
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          "
          role="list"
          aria-label="Featured services"
        >
          {featured.map((service, i) => (
            <div key={service.id} className="snap-start md:snap-none" role="listitem">
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>

        {/* scroll hint dots — mobile only */}
        <div className="flex justify-center gap-1.5 mt-5 md:hidden" aria-hidden="true">
          {featured.map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{ background: i === 0 ? "rgba(201,168,76,0.7)" : "rgba(201,168,76,0.2)" }}
            />
          ))}
        </div>

        {/* mobile CTA */}
        <div className="flex justify-center mt-10 px-5 md:hidden">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full
                       text-[10px] uppercase tracking-widest font-semibold font-sans
                       transition-all duration-300 active:scale-95"
            style={{
              border: "1px solid rgba(201,168,76,0.3)",
              color: "rgba(201,168,76,0.7)",
            }}
          >
            View All Services
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* bottom edge accent */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.15), transparent)" }}
        aria-hidden="true"
      />
    </section>
  );
};

export default memo(FeaturedServices);