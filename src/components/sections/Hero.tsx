"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, memo } from "react";
import { Calendar, ChevronDown, ArrowUpRight, Star, Sparkles } from "lucide-react";
import { SALON_DETAILS } from "@/lib/constants";

/* ─── Data ──────────────────────────────────────────────────────────────── */
const stats = [
  { value: "15+", label: "Years of Excellence" },
  { value: "5000+", label: "Happy Clients" },
  { value: "12", label: "Expert Stylists" },
];

const services = ["Hair Styling", "Nail Art", "Keratin", "Facials", "Balayage", "Grooming"];

/* ─── Easing curve ───────────────────────────────────────────────────────── */
const EXPO = [0.16, 1, 0.3, 1] as const;

/* ─── Floating service pill ─────────────────────────────────────────────── */
const ServicePill = memo(({ label, index }: { label: string; index: number }) => (
  <motion.span
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.15 + index * 0.07, duration: 0.5, ease: EXPO }}
    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
               text-[9px] md:text-[10px] font-sans uppercase tracking-widest"
    style={{
      background: "rgba(201,168,76,0.07)",
      border: "1px solid rgba(201,168,76,0.18)",
      color: "rgba(201,168,76,0.65)",
    }}
  >
    <span className="w-1 h-1 rounded-full bg-[#C9A84C]/50 shrink-0" aria-hidden="true" />
    {label}
  </motion.span>
));
ServicePill.displayName = "ServicePill";

/* ─── Stat card ──────────────────────────────────────────────────────────── */
const StatCard = memo(({ stat, index }: { stat: typeof stats[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.25 + index * 0.11, duration: 0.7, ease: EXPO }}
    whileHover={{ y: -3 }}
    transition-type="spring"
    className="relative flex flex-col items-center justify-center py-5 md:py-7
               px-2 cursor-default group"
  >
    {/* per-cell hover glow */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100
                 transition-opacity duration-500 rounded-xl pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(201,168,76,0.09) 0%, transparent 68%)",
      }}
      aria-hidden="true"
    />

    {/* value */}
    <span
      className="relative z-10 font-serif font-bold leading-none"
      style={{
        fontSize: "clamp(1.9rem, 4.5vw, 3.4rem)",
        background: "linear-gradient(170deg, #F5E6B0 0%, #C9A84C 48%, #9A7A35 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        filter:
          "drop-shadow(0 0 18px rgba(201,168,76,0.5)) drop-shadow(0 0 6px rgba(201,168,76,0.25))",
      }}
    >
      {stat.value}
    </span>

    {/* micro divider */}
    <div
      className="w-5 h-px my-2"
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(201,168,76,0.55), transparent)",
      }}
      aria-hidden="true"
    />

    {/* label */}
    <span
      className="relative z-10 text-[8px] md:text-[10px] uppercase tracking-[0.26em]
                 font-sans text-center leading-tight"
      style={{ color: "rgba(201,168,76,0.48)" }}
    >
      {stat.label}
    </span>
  </motion.div>
));
StatCard.displayName = "StatCard";

/* ─── Hero ───────────────────────────────────────────────────────────────── */
const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();

  // Parallax drift (disabled for reduced-motion users)
  const imageY = useTransform(
    scrollY,
    [0, 700],
    ["0%", prefersReduced ? "0%" : "18%"]
  );
  // Gentle opacity fade as user scrolls away
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.25]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: heroOpacity }}
      className="relative min-h-screen w-full overflow-hidden bg-[#080604]"
      aria-label="Hero — Habibs Hair & Beauty"
    >
      {/* ── Parallax background ───────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y: imageY }}
        aria-hidden="true"
      >
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop"
          alt="Habibs Hair & Beauty luxury salon interior — New Town, Kolkata"
          fill
          className="object-cover scale-[1.08]"
          priority
          sizes="100vw"
          quality={92}
        />

        {/* Cinematic gradient stack */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080604] via-[#080604]/55 to-[#080604]/28" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(8,6,4,0.52)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080604]/48 via-transparent to-[#080604]/48" />
        <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[#080604]/75 to-transparent" />
        {/* Warm gold colour grade */}
        <div
          className="absolute inset-0 mix-blend-soft-light opacity-18"
          style={{
            background:
              "radial-gradient(ellipse at 62% 38%, rgba(201,168,76,0.32) 0%, transparent 62%)",
          }}
        />
      </motion.div>

      {/* ── Corner bracket accents ────────────────────────────────── */}
      <div
        className="absolute top-24 left-10 z-10 hidden lg:block"
        aria-hidden="true"
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent to-[#C9A84C]/32" />
        <div className="w-14 h-px bg-gradient-to-r from-[#C9A84C]/32 to-transparent" />
      </div>
      <div
        className="absolute top-24 right-10 z-10 hidden lg:block"
        aria-hidden="true"
      >
        <div className="ml-auto w-px h-20 bg-gradient-to-b from-transparent to-[#C9A84C]/32" />
        <div className="w-14 h-px bg-gradient-to-l from-[#C9A84C]/32 to-transparent ml-auto" />
      </div>

      {/* ── Ambient gold orb (desktop only) ──────────────────────── */}
      <motion.div
        className="absolute top-1/3 right-[7%] w-72 h-72 rounded-full
                   pointer-events-none z-[1] hidden xl:block"
        animate={
          prefersReduced
            ? {}
            : { scale: [1, 1.1, 1], opacity: [0.05, 0.09, 0.05] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.2) 0%, transparent 70%)",
          filter: "blur(44px)",
        }}
        aria-hidden="true"
      />

      {/* ── Layout wrapper ────────────────────────────────────────── */}
      <div className="relative z-20 flex flex-col min-h-screen">

        {/* ── Centre content ──────────────────────────────────────── */}
        <div
          className="flex-1 flex flex-col items-center justify-center
                     text-center px-5 sm:px-8 pt-24 pb-6"
        >
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EXPO }}
            className="inline-flex items-center gap-2.5 mb-7 px-4 py-2 rounded-full"
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(201,168,76,0.2)",
            }}
          >
            <Sparkles className="w-3 h-3 text-[#C9A84C]" aria-hidden="true" />
            <div className="flex gap-0.5" role="img" aria-label={`${SALON_DETAILS.googleRating} stars`}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-2.5 h-2.5 ${
                    i < Math.floor(Number(SALON_DETAILS.googleRating))
                      ? "fill-[#C9A84C] text-[#C9A84C]"
                      : "fill-[#C9A84C]/28 text-[#C9A84C]/28"
                  }`}
                />
              ))}
            </div>
            <span className="text-[#E8D5A3]/65 text-[10px] md:text-xs font-sans tracking-wide">
              {SALON_DETAILS.googleRating}&nbsp;·&nbsp;{SALON_DETAILS.totalReviews} Reviews
            </span>
          </motion.div>

          {/* Location eyebrow */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.05em" }}
            animate={{ opacity: 1, letterSpacing: "0.45em" }}
            transition={{ duration: 1.1, delay: 0.15 }}
            className="text-[#C9A84C]/70 text-[9px] md:text-[11px] uppercase
                       font-sans font-medium mb-5"
          >
            New Town · Kolkata
          </motion.p>

          {/* ── Main headline ─────────────────────────────────────── */}
          <motion.h1
            initial={{ opacity: 0, y: 38 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, delay: 0.25, ease: EXPO }}
            className="font-serif text-[#EDE0C4] leading-[0.93] tracking-[-0.02em] mb-5"
            style={{ fontSize: "clamp(3rem, 9.5vw, 8.5rem)" }}
          >
            HABIBS
            <br />
            <span
              className="italic font-light"
              style={{
                fontSize: "clamp(2.4rem, 8vw, 7rem)",
                background:
                  "linear-gradient(140deg, #F5E8B0 0%, #C9A84C 45%, #A08C5B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Hair &amp; Beauty
            </span>
          </motion.h1>

          {/* Ornamental divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="flex items-center gap-3 mb-6 origin-center"
            aria-hidden="true"
          >
            <div className="w-10 md:w-20 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/38" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#C9A84C]/55" />
            <div className="w-10 md:w-20 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/38" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: EXPO }}
            className="text-[#EDE0C4]/55 text-sm md:text-[15px] font-sans
                       max-w-[20rem] md:max-w-md mx-auto leading-relaxed mb-9"
          >
            Where luxury meets artistry — New Town's most celebrated destination
            for hair, nails &amp; holistic beauty.
          </motion.p>

          {/* ── CTA buttons ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: EXPO }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4
                       w-full sm:w-auto mb-9"
          >
            {/* Primary — animated gradient shift */}
            <Link
              href="/booking"
              className="group relative flex items-center justify-center gap-2.5
                         px-8 py-[15px] rounded-full font-semibold
                         text-[11px] md:text-xs uppercase tracking-widest
                         overflow-hidden w-full sm:w-auto
                         transition-[box-shadow,transform] duration-300
                         hover:shadow-[0_14px_44px_rgba(201,168,76,0.42)]
                         hover:-translate-y-[2px]"
              style={{
                background:
                  "linear-gradient(135deg, #C9A84C 0%, #E8D5A3 50%, #C9A84C 100%)",
                backgroundSize: "200% auto",
                color: "#080604",
              }}
            >
              {/* shimmer sweep */}
              <span
                className="absolute inset-0 -translate-x-full
                           group-hover:translate-x-full transition-transform
                           duration-700 skew-x-12 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)",
                }}
                aria-hidden="true"
              />
              <Calendar className="w-4 h-4 relative z-10 shrink-0" />
              <span className="relative z-10">Book Appointment</span>
              <ArrowUpRight
                className="w-3.5 h-3.5 relative z-10 shrink-0
                           group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                           transition-transform duration-200"
              />
            </Link>

            {/* Secondary */}
            <Link
              href="/services"
              className="group flex items-center justify-center gap-2
                         px-8 py-[14px] rounded-full font-semibold
                         text-[11px] md:text-xs uppercase tracking-widest
                         transition-all duration-300 w-full sm:w-auto
                         hover:-translate-y-[2px]"
              style={{
                border: "1px solid rgba(201,168,76,0.38)",
                color: "rgba(237,224,196,0.72)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(201,168,76,0.75)";
                el.style.color = "#C9A84C";
                el.style.background = "rgba(201,168,76,0.06)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(201,168,76,0.38)";
                el.style.color = "rgba(237,224,196,0.72)";
                el.style.background = "transparent";
              }}
            >
              Explore Services
            </Link>
          </motion.div>

          {/* Service pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 max-w-[22rem] md:max-w-lg"
            role="list"
            aria-label="Services offered at Habibs"
          >
            {services.map((s, i) => (
              <ServicePill key={s} label={s} index={i} />
            ))}
          </motion.div>
        </div>

        {/* ── Stats glassmorphism bar ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0, ease: EXPO }}
          className="relative z-20 mx-4 sm:mx-8 lg:mx-16 xl:mx-24 mb-5 md:mb-8"
          aria-label="Salon highlights"
        >
          {/* Ambient underbelly glow */}
          <div
            className="absolute inset-x-10 -bottom-4 h-10 rounded-full
                       pointer-events-none"
            style={{
              background: "rgba(201,168,76,0.16)",
              filter: "blur(22px)",
            }}
            aria-hidden="true"
          />

          {/* Gradient border ring */}
          <div
            className="absolute -inset-[1px] rounded-2xl pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg,rgba(201,168,76,0.42) 0%,rgba(201,168,76,0.04) 35%,rgba(201,168,76,0.32) 70%,rgba(201,168,76,0.04) 100%)",
              borderRadius: "1rem",
            }}
            aria-hidden="true"
          />

          {/* Frosted glass panel */}
          <div
            className="relative rounded-2xl overflow-hidden grid grid-cols-3"
            style={{
              background:
                "linear-gradient(160deg,rgba(8,6,4,0.42) 0%,rgba(14,9,3,0.48) 50%,rgba(8,6,4,0.40) 100%)",
              backdropFilter: "blur(22px)",
              WebkitBackdropFilter: "blur(22px)",
              border: "1px solid rgba(201,168,76,0.14)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.055), inset 0 -1px 0 rgba(0,0,0,0.28), 0 20px 60px rgba(0,0,0,0.38)",
            }}
          >
            {/* Top shimmer */}
            <div
              className="absolute top-0 left-8 right-8 h-px pointer-events-none col-span-3"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(201,168,76,0.42),transparent)",
              }}
              aria-hidden="true"
            />

            {stats.map((stat, i) => (
              <div key={stat.label} className="relative">
                {i > 0 && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 md:h-16 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to bottom,transparent,rgba(201,168,76,0.28),transparent)",
                    }}
                    aria-hidden="true"
                  />
                )}
                <StatCard stat={stat} index={i} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Scroll cue ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
          className="flex flex-col items-center pb-5 gap-1.5 z-20 select-none"
          aria-hidden="true"
        >
          <span
            className="text-[8px] uppercase tracking-[0.42em] font-sans"
            style={{ color: "rgba(201,168,76,0.38)" }}
          >
            Scroll
          </span>
          <motion.div
            animate={prefersReduced ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown
              className="w-4 h-4"
              style={{ color: "rgba(201,168,76,0.38)" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default memo(Hero);