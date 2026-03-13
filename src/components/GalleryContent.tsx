"use client";

import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ZoomIn, X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

const EXPO = [0.16, 1, 0.3, 1] as const;

const images = [
  { id: 1, title: "Luxury Hair Styling",     category: "Hair",     src: "https://images.unsplash.com/photo-1560869713-7d0a29430863?q=80&w=2070&auto=format&fit=crop" },
  { id: 2, title: "Artistic Nail Design",    category: "Nails",    src: "https://images.unsplash.com/photo-1604654894610-df490668f602?q=80&w=1974&auto=format&fit=crop" },
  { id: 3, title: "Global Hair Colouring",   category: "Hair",     src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=2080&auto=format&fit=crop" },
  { id: 4, title: "Premium Skin Treatment",  category: "Skin",     src: "https://images.unsplash.com/photo-1570172619274-006f1d227b61?q=80&w=2070&auto=format&fit=crop" },
  { id: 5, title: "Elegant Gel Extensions",  category: "Nails",    src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop" },
  { id: 6, title: "Luxury Salon Interior",   category: "Ambiance", src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop" },
  { id: 7, title: "Expert Hair Care",        category: "Hair",     src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop" },
  { id: 8, title: "Nail Art Perfection",     category: "Nails",    src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=2070&auto=format&fit=crop" },
  { id: 9, title: "Relaxing Spa Experience", category: "Skin",     src: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop" },
];

const CATEGORIES = ["All", "Hair", "Nails", "Skin", "Ambiance"];

/* ─── Gallery Card ───────────────────────────────────────────────────────── */
const GalleryCard = memo(({
  image, index, onClick,
}: { image: typeof images[0]; index: number; onClick: () => void }) => {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer"
      style={{ border: "1px solid rgba(201,168,76,0.12)" }}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`View full image of ${image.title} at Habibs Hair & Beauty New Town`}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}
    >
      <Image
        src={image.src}
        alt={`${image.title} — Habibs Hair & Beauty New Town Kolkata`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
        loading={index < 3 ? "eager" : "lazy"}
      />

      {/* always-on bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080604]/75 via-[#080604]/10 to-transparent" />

      {/* category chip */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className="inline-flex items-center px-2.5 py-1 rounded-full
                     text-[9px] uppercase tracking-widest font-sans font-medium"
          style={{
            background: "rgba(8,6,4,0.6)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(201,168,76,0.22)",
            color: "rgba(201,168,76,0.8)",
          }}
        >
          {image.category}
        </span>
      </div>

      {/* hover overlay */}
      <div
        className="absolute inset-0 z-10 flex flex-col justify-end p-4 md:p-5
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <h3 className="font-serif font-bold text-[#EDE0C4] text-base md:text-lg leading-tight mb-2">
          {image.title}
        </h3>
        <div className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-sans"
          style={{ color: "rgba(201,168,76,0.7)" }}>
          <ZoomIn className="w-3 h-3" aria-hidden="true" />
          View Full
        </div>
      </div>

      {/* hover border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                   transition-opacity duration-300 pointer-events-none"
        style={{ border: "1px solid rgba(201,168,76,0.3)" }}
        aria-hidden="true"
      />
    </motion.div>
  );
});
GalleryCard.displayName = "GalleryCard";

/* ─── Lightbox ───────────────────────────────────────────────────────────── */
const Lightbox = memo(({
  images: imgs, index, onClose, onPrev, onNext,
}: { images: typeof images; index: number; onClose: () => void; onPrev: () => void; onNext: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
    className="fixed inset-0 z-[200] flex items-center justify-center"
    style={{ background: "rgba(8,6,4,0.96)", backdropFilter: "blur(16px)" }}
    role="dialog"
    aria-modal="true"
    aria-label="Image gallery lightbox"
  >
    {/* close */}
    <button
      onClick={onClose}
      className="absolute top-5 right-5 md:top-8 md:right-8 z-10 w-10 h-10 rounded-full
                 flex items-center justify-center transition-colors duration-200
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
      style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)" }}
      aria-label="Close lightbox"
    >
      <X className="w-5 h-5" style={{ color: "rgba(237,224,196,0.7)" }} />
    </button>

    {/* prev */}
    <button
      onClick={onPrev}
      className="absolute left-3 md:left-8 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full
                 flex items-center justify-center transition-colors duration-200
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
      style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.16)" }}
      aria-label="Previous image"
    >
      <ChevronLeft className="w-5 h-5" style={{ color: "rgba(237,224,196,0.6)" }} />
    </button>

    {/* next */}
    <button
      onClick={onNext}
      className="absolute right-3 md:right-8 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full
                 flex items-center justify-center transition-colors duration-200
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
      style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.16)" }}
      aria-label="Next image"
    >
      <ChevronRight className="w-5 h-5" style={{ color: "rgba(237,224,196,0.6)" }} />
    </button>

    {/* image */}
    <div className="relative w-full h-full max-w-5xl max-h-[80vh] mx-16 md:mx-24">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          className="relative w-full h-full"
        >
          <Image
            src={imgs[index].src}
            alt={`${imgs[index].title} — Habibs Hair & Beauty New Town Kolkata`}
            fill
            quality={95}
            className="object-contain"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>

    {/* caption */}
    <div className="absolute bottom-5 left-0 right-0 text-center px-4">
      <p className="font-serif font-bold text-[#EDE0C4]/80 text-base md:text-lg uppercase tracking-wider mb-1">
        {imgs[index].title}
      </p>
      <span
        className="inline-block text-[9px] uppercase tracking-widest font-sans px-3 py-1 rounded-full"
        style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.2)", color: "rgba(201,168,76,0.65)" }}
      >
        {imgs[index].category}
      </span>
      <p className="text-[#EDE0C4]/30 text-xs font-sans mt-2">
        {index + 1} / {imgs.length}
      </p>
    </div>
  </motion.div>
));
Lightbox.displayName = "Lightbox";

/* ─── Page ───────────────────────────────────────────────────────────────── */
const GalleryContent = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const prefersReduced = useReducedMotion();

  const filtered = activeCategory === "All" ? images : images.filter((i) => i.category === activeCategory);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") setLightboxIndex((p) => (p! === 0 ? filtered.length - 1 : p! - 1));
      if (e.key === "ArrowRight") setLightboxIndex((p) => (p! === filtered.length - 1 ? 0 : p! + 1));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, filtered]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <>
      <div className="bg-[#080604] min-h-screen">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="pt-28 md:pt-36 pb-12 px-5 sm:px-8 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EXPO }}
            className="max-w-2xl"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] font-sans font-medium mb-4"
              style={{ color: "rgba(201,168,76,0.65)" }}>
              Visual Excellence
            </p>
            <h1
              className="font-serif text-[#EDE0C4] leading-[0.93] tracking-tight mb-5"
              style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)" }}
            >
              OUR
              <br />
              <span className="italic font-light" style={{
                background: "linear-gradient(135deg, #F5E6B0 0%, #C9A84C 45%, #A08C5B 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>Gallery</span>
            </h1>
            <p className="text-[#EDE0C4]/45 text-sm md:text-base font-sans leading-relaxed max-w-md">
              Real transformations from our expert stylists — hair, nails, skin and the
              luxurious ambiance at Habibs Hair & Beauty, New Town Kolkata.
            </p>
          </motion.div>
        </div>

        {/* ── Category filter — horizontal scroll on mobile ───────── */}
        <div className="px-5 sm:px-8 md:px-12 lg:px-16 mb-10">
          <div
            className="flex gap-2 overflow-x-auto pb-2
                       [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                       [-webkit-overflow-scrolling:touch]"
            role="tablist"
            aria-label="Filter gallery by category"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  role="tab"
                  aria-selected={isActive}
                  className="shrink-0 px-5 py-2.5 rounded-full text-[10px] uppercase
                             tracking-widest font-semibold font-sans transition-all duration-300
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
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
          </div>
        </div>

        {/* ── Grid ────────────────────────────────────────────────── */}
        <div className="px-5 sm:px-8 md:px-12 lg:px-16 pb-8">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <GalleryCard
                  key={img.id}
                  image={img}
                  index={i}
                  onClick={() => setLightboxIndex(i)}
                />
              ))}
            </AnimatePresence>
            {filtered.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center text-[#EDE0C4]/30 font-sans italic text-sm"
              >
                No images found for this category.
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-3 pb-24 pt-10 px-5">
          <p className="text-[#EDE0C4]/35 text-xs font-sans italic">
            Want to experience the same transformation?
          </p>
          <Link
            href="/booking"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full
                       font-semibold text-[11px] uppercase tracking-widest overflow-hidden
                       transition-all duration-300
                       hover:shadow-[0_12px_40px_rgba(201,168,76,0.35)] hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #C9A84C, #E8D5A3 50%, #C9A84C)", backgroundSize: "200% auto", color: "#080604" }}
            aria-label="Book your transformation at Habibs Hair & Beauty"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12 pointer-events-none"
              style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)" }} aria-hidden="true" />
            <Sparkles className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Book Your Transformation</span>
            <ArrowUpRight className="w-3.5 h-3.5 relative z-10" />
          </Link>
        </div>

        <div className="h-px w-full"
          style={{ background: "linear-gradient(to right,transparent,rgba(201,168,76,0.12),transparent)" }}
          aria-hidden="true" />
      </div>

      {/* ── Lightbox ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex((p) => (p! === 0 ? filtered.length - 1 : p! - 1))}
            onNext={() => setLightboxIndex((p) => (p! === filtered.length - 1 ? 0 : p! + 1))}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(GalleryContent);