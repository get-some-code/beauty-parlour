"use client";

import { memo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowUpRight } from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────────────────── */
const nailItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1604654894610-df490668f602?q=80&w=1974&auto=format&fit=crop",
    title: "Acrylic Extensions",
    description: "Strong, durable, perfectly shaped to preference",
    category: "Extensions",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop",
    title: "Gel Overlays",
    description: "Natural-looking shine and long-lasting protection",
    category: "Gel",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=1974&auto=format&fit=crop",
    title: "Artistic Design",
    description: "Hand-painted designs tailored to your style",
    category: "Nail Art",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1974&auto=format&fit=crop",
    title: "French Manicure",
    description: "Classic elegance with a modern twist",
    category: "Manicure",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=1974&auto=format&fit=crop",
    title: "3D Nail Art",
    description: "Dimensional designs for special occasions",
    category: "Nail Art",
  },
];

const EXPO = [0.16, 1, 0.3, 1] as const;

/* ─── Card ───────────────────────────────────────────────────────────────── */
const NailCard = memo(({ item, index }: { item: typeof nailItems[0]; index: number }) => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: EXPO }}
      className="group relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer
                 w-[68vw] sm:w-[46vw] md:w-auto aspect-[3/4]"
    >
      {/* image */}
      <Image
        src={item.image}
        alt={`${item.title} nail service at Habibs Hair & Beauty New Town Kolkata`}
        fill
        sizes="(max-width: 640px) 68vw, (max-width: 768px) 46vw, (max-width: 1024px) 33vw, 20vw"
        className="object-cover transition-transform duration-700 group-hover:scale-108 will-change-transform"
        loading={index < 2 ? "eager" : "lazy"}
      />

      {/* always-on bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080604]/85 via-[#080604]/20 to-transparent" />

      {/* category chip */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                     text-[9px] uppercase tracking-widest font-sans font-medium"
          style={{
            background: "rgba(8,6,4,0.6)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(201,168,76,0.22)",
            color: "rgba(201,168,76,0.8)",
          }}
        >
          <Sparkles className="w-2.5 h-2.5" aria-hidden="true" />
          {item.category}
        </span>
      </div>

      {/* bottom info — slides up on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-5
                   transform translate-y-2 group-hover:translate-y-0
                   transition-transform duration-400 ease-out"
      >
        <h3 className="font-serif font-bold text-[#EDE0C4] text-base md:text-lg leading-tight mb-1">
          {item.title}
        </h3>
        <p
          className="text-xs font-sans leading-relaxed
                     opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-12
                     transition-all duration-400 overflow-hidden"
          style={{ color: "rgba(237,224,196,0.55)" }}
        >
          {item.description}
        </p>
      </div>

      {/* hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                   transition-opacity duration-400 pointer-events-none"
        style={{ border: "1px solid rgba(201,168,76,0.3)" }}
        aria-hidden="true"
      />
    </motion.article>
  );
});
NailCard.displayName = "NailCard";

/* ─── Section ────────────────────────────────────────────────────────────── */
const NailShowcase = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  return (
    <section
      className="bg-[#080604] overflow-hidden"
      aria-labelledby="nails-heading"
    >
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.15), transparent)" }}
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
                Nail Artistry
              </p>
              <h2
                id="nails-heading"
                className="font-serif text-[#EDE0C4] leading-[0.93] tracking-tight"
                style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}
              >
                FLAWLESS
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
                  Extensions
                </span>
              </h2>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4">
              <div className="flex items-center gap-3" aria-hidden="true">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/40" />
                <div className="w-1.5 h-1.5 rotate-45 border border-[#C9A84C]/50" />
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/40" />
              </div>
              <p
                className="text-xs md:text-sm font-sans leading-relaxed max-w-xs text-right hidden md:block"
                style={{ color: "rgba(237,224,196,0.45)" }}
              >
                Premium nail extensions & intricate designs using the finest quality products.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Horizontal scroll track ──────────────────────────────── */}
        <div
          ref={trackRef}
          className="
            flex gap-3 px-5 sm:px-8
            overflow-x-auto scroll-smooth snap-x snap-mandatory
            pb-4 md:pb-0
            md:grid md:grid-cols-3 lg:grid-cols-5
            md:overflow-visible md:px-12 lg:px-16
            md:gap-5
            [-webkit-overflow-scrolling:touch]
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          "
          role="list"
          aria-label="Nail service gallery"
        >
          {nailItems.map((item, i) => (
            <div key={item.id} className="snap-start md:snap-none" role="listitem">
              <NailCard item={item} index={i} />
            </div>
          ))}
        </div>

        {/* scroll progress dots — mobile only */}
        <div className="flex justify-center gap-1.5 mt-5 md:hidden" aria-hidden="true">
          {nailItems.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === 0 ? "1.25rem" : "0.25rem",
                height: "0.25rem",
                background: i === 0 ? "rgba(201,168,76,0.7)" : "rgba(201,168,76,0.2)",
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: EXPO }}
          className="flex justify-center mt-12 px-5"
        >
          <Link
            href="/booking?service=nail-extensions"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full
                       font-semibold text-[11px] uppercase tracking-widest overflow-hidden
                       transition-[box-shadow,transform] duration-300
                       hover:shadow-[0_12px_40px_rgba(201,168,76,0.35)]
                       hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #C9A84C 0%, #E8D5A3 50%, #C9A84C 100%)",
              backgroundSize: "200% auto",
              color: "#080604",
            }}
            aria-label="Book a nail service at Habibs Hair & Beauty"
          >
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                         transition-transform duration-700 skew-x-12 pointer-events-none"
              style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)" }}
              aria-hidden="true"
            />
            <Sparkles className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Book Nail Service</span>
            <ArrowUpRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>

      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.15), transparent)" }}
        aria-hidden="true"
      />
    </section>
  );
};

export default memo(NailShowcase);