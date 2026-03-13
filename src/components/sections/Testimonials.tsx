"use client";

import { memo, useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Star, Quote, ArrowUpRight } from "lucide-react";
import { SALON_DETAILS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

const EXPO = [0.16, 1, 0.3, 1] as const;

interface Review {
  id: string;
  name: string;
  rating: number;
  review_text: string;
  service: string | null;
  photo_url: string | null;
  created_at: string;
}

/* ─── Review Card ────────────────────────────────────────────────────────── */
const TestimonialCard = memo(({ t, index }: { t: Review; index: number }) => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EXPO }}
      className="group relative flex-shrink-0 rounded-2xl p-6 md:p-7
                 w-[82vw] sm:w-[58vw] md:w-auto flex flex-col gap-5"
      style={{
        background:
          "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(201,168,76,0.025) 100%)",
        border: "1px solid rgba(201,168,76,0.13)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Quote icon */}
      <div
        className="absolute -top-3.5 right-5 w-8 h-8 rounded-full flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #C9A84C, #A08C5B)" }}
        aria-hidden="true"
      >
        <Quote className="w-3.5 h-3.5 text-[#080604]" />
      </div>

      {/* reviewer */}
      <div className="flex items-center gap-3">
        <div
          className="relative w-12 h-12 md:w-14 md:h-14 rounded-full shrink-0 p-[1.5px]"
          style={{ background: "linear-gradient(135deg, #C9A84C, #785F37)" }}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-[#080604] flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #C9A84C22, #A08C5B22)" }}>
            {t.photo_url ? (
              <Image
                src={t.photo_url}
                alt={`${t.name} — verified client at Habibs Hair & Beauty`}
                width={56}
                height={56}
                className="w-full h-full object-cover"
                loading="lazy"
                unoptimized={t.photo_url.includes("supabase")}
              />
            ) : (
              <span className="text-xl font-serif font-bold" style={{ color: "#C9A84C" }}>
                {t.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>
        <div className="min-w-0">
          <h3 className="font-serif font-bold text-[#EDE0C4] text-base truncate">
            {t.name}
          </h3>
          <p
            className="text-[9px] uppercase tracking-[0.22em] font-sans truncate"
            style={{ color: "rgba(201,168,76,0.55)" }}
          >
            {t.service || "Salon Client"}
          </p>
        </div>
      </div>

      {/* stars */}
      <div className="flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${i < t.rating ? "fill-[#C9A84C] text-[#C9A84C]" : "fill-[#C9A84C]/20 text-[#C9A84C]/20"}`}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* divider */}
      <div
        className="w-full h-px"
        style={{ background: "linear-gradient(to right, rgba(201,168,76,0.18), transparent)" }}
        aria-hidden="true"
      />

      {/* text */}
      <blockquote className="flex-1">
        <p
          className="font-sans text-sm leading-relaxed italic"
          style={{ color: "rgba(237,224,196,0.6)" }}
        >
          &ldquo;{t.review_text}&rdquo;
        </p>
      </blockquote>

      {/* hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                   transition-opacity duration-400 pointer-events-none"
        style={{ border: "1px solid rgba(201,168,76,0.28)" }}
        aria-hidden="true"
      />
    </motion.article>
  );
});
TestimonialCard.displayName = "TestimonialCard";

/* ─── Skeleton card ──────────────────────────────────────────────────────── */
const TestimonialSkeleton = () => (
  <div className="rounded-2xl p-6 md:p-7 w-[82vw] sm:w-[58vw] md:w-auto animate-pulse"
    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.08)" }}>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 rounded-full bg-white/5" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-white/5 rounded w-2/3" />
        <div className="h-2 bg-white/5 rounded w-1/2" />
      </div>
    </div>
    <div className="h-2 bg-white/5 rounded mb-4 w-3/4" />
    <div className="space-y-2">
      <div className="h-2 bg-white/5 rounded w-full" />
      <div className="h-2 bg-white/5 rounded w-5/6" />
      <div className="h-2 bg-white/5 rounded w-4/5" />
    </div>
  </div>
);

/* ─── Section ────────────────────────────────────────────────────────────── */
const Testimonials = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("reviews")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data }) => {
        if (data) setReviews(data as Review[]);
        setLoading(false);
      });
  }, []);

  return (
    <section
      className="bg-[#080604] overflow-hidden"
      aria-labelledby="testimonials-heading"
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
                Our Success Stories
              </p>
              <h2
                id="testimonials-heading"
                className="font-serif text-[#EDE0C4] leading-[0.93] tracking-tight"
                style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}
              >
                CLIENT
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
                  Testimonials
                </span>
              </h2>
            </div>

            {/* aggregate rating */}
            <motion.div
              initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: EXPO }}
              className="inline-flex flex-col items-start md:items-end gap-2"
            >
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full"
                style={{
                  background: "rgba(201,168,76,0.07)",
                  border: "1px solid rgba(201,168,76,0.18)",
                }}
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(Number(SALON_DETAILS.googleRating))
                          ? "fill-[#C9A84C] text-[#C9A84C]"
                          : "fill-[#C9A84C]/25 text-[#C9A84C]/25"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span
                  className="font-serif font-bold text-sm"
                  style={{ color: "#C9A84C" }}
                >
                  {SALON_DETAILS.googleRating}
                </span>
                <span
                  className="text-[10px] font-sans"
                  style={{ color: "rgba(237,224,196,0.4)" }}
                >
                  {SALON_DETAILS.totalReviews} reviews
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Cards ────────────────────────────────────────────────── */}
        {loading ? (
          <div className="flex gap-4 px-5 sm:px-8 overflow-x-auto md:grid md:grid-cols-3 md:px-12 lg:px-16 md:gap-6 md:overflow-visible">
            {Array.from({ length: 3 }).map((_, i) => <TestimonialSkeleton key={i} />)}
          </div>
        ) : (
          <div
            ref={trackRef}
            className="
              flex gap-4 px-5 sm:px-8
              overflow-x-auto scroll-smooth snap-x snap-mandatory
              pb-4 md:pb-0
              md:grid md:grid-cols-3
              md:overflow-visible md:px-12 lg:px-16
              md:gap-6
              [-webkit-overflow-scrolling:touch]
              [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            "
            role="list"
            aria-label="Client testimonials"
          >
            {reviews.length === 0 ? (
              <p className="col-span-full py-12 text-center text-sm italic font-sans" style={{ color: "rgba(237,224,196,0.3)" }}>
                No reviews yet.
              </p>
            ) : reviews.map((t, i) => (
              <div key={t.id} className="snap-start md:snap-none" role="listitem">
                <TestimonialCard t={t} index={i} />
              </div>
            ))}
          </div>
        )}

        {/* scroll dots — mobile */}
        {!loading && (
          <div className="flex justify-center gap-1.5 mt-5 md:hidden" aria-hidden="true">
            {reviews.slice(0, 5).map((_, i) => (
              <div
                key={i}
                className="rounded-full"
                style={{
                  width: i === 0 ? "1.25rem" : "0.25rem",
                  height: "0.25rem",
                  background: i === 0 ? "rgba(201,168,76,0.7)" : "rgba(201,168,76,0.2)",
                }}
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: EXPO }}
          className="flex justify-center mt-12 px-5"
        >
          <a
            href="https://www.google.com/search?q=habibs+hair+and+beauty+new+town+kolkata+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full
                       text-[10px] uppercase tracking-widest font-semibold font-sans
                       transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
            style={{
              border: "1px solid rgba(201,168,76,0.3)",
              color: "rgba(201,168,76,0.7)",
            }}
            aria-label="Read all Google reviews for Habibs Hair & Beauty New Town"
          >
            Read All Google Reviews
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
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

export default memo(Testimonials);