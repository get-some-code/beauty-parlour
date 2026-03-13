"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SALON_DETAILS } from "@/lib/constants";
import { Sparkles, Phone, ArrowUpRight, CheckCircle2, Quote, User } from "lucide-react";

const EXPO = [0.16, 1, 0.3, 1] as const;

const pillars = [
  { title: "Expert Team", body: "Highly trained stylists & therapists led by owner Anamika and senior stylist Tanvir." },
  { title: "Premium Products", body: "International professional brands — only the finest for your hair and skin." },
  { title: "Luxury Ambiance", body: "A serene, elegant space inside Downtown Mall designed for total relaxation." },
  { title: "Personalised Care", body: "Every treatment is tailored to your unique hair type, skin tone and preferences." },
];

const stats = [
  { value: "15+", label: "Years of Excellence" },
  { value: "5000+", label: "Happy Clients" },
  { value: "4.3★", label: "Google Rating" },
];

const GoldDivider = () => (
  <div className="flex items-center gap-3 my-6" aria-hidden="true">
    <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/40" />
    <div className="w-1.5 h-1.5 rotate-45 border border-[#C9A84C]/50" />
    <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/40" />
  </div>
);

const AboutContent = () => {
  const prefersReduced = useReducedMotion();

  return (
    <div className="bg-[#080604] min-h-screen">

      {/* ── Page Header ──────────────────────────────────────────── */}
      <div className="pt-28 md:pt-36 pb-16 px-5 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EXPO }}
          className="max-w-2xl"
        >
          <p className="text-[10px] uppercase tracking-[0.4em] font-sans font-medium mb-4"
            style={{ color: "rgba(201,168,76,0.65)" }}>
            Our Journey
          </p>
          <h1
            className="font-serif text-[#EDE0C4] leading-[0.93] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)" }}
          >
            A LEGACY OF
            <br />
            <span className="italic font-light" style={{
              background: "linear-gradient(135deg, #F5E6B0 0%, #C9A84C 45%, #A08C5B 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Beauty</span>
          </h1>
          <GoldDivider />
          <p className="text-[#EDE0C4]/50 text-sm md:text-base font-sans leading-relaxed max-w-lg">
            Founded with a vision to redefine luxury beauty in New Town, Habibs Hair and Beauty
            has become Kolkata's premier unisex salon — a destination for those who seek
            elegance, artistry and excellence.
          </p>
        </motion.div>
      </div>

      {/* ── Story + Image ─────────────────────────────────────────── */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* left */}
          <motion.div
            initial={{ opacity: 0, x: prefersReduced ? 0 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EXPO }}
            className="flex flex-col"
          >
            <p className="text-[#EDE0C4]/55 text-sm md:text-base font-sans leading-relaxed mb-6">
              Our philosophy is simple — provide an unparalleled salon experience that combines
              expert artistry with the finest products. Located inside Downtown Mall, New Town,
              we serve hair, nail and skin needs for all genders across Kolkata.
            </p>
            <p className="text-[#EDE0C4]/40 text-sm font-sans leading-relaxed mb-8 italic">
              From a single chair to a full luxury salon, our 15+ year journey has been built
              on trust, repeat clients and the passion of stylist Tanvir and the entire Habibs team.
            </p>

            {/* pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EXPO }}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(201,168,76,0.1)",
                  }}
                >
                  <CheckCircle2
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "#C9A84C" }}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-[#EDE0C4]/80 text-sm mb-1">{p.title}</h3>
                    <p className="text-[#EDE0C4]/38 text-xs font-sans leading-relaxed">{p.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* right — image */}
          <motion.div
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EXPO }}
            className="relative"
          >
            {/* ambient glow */}
            <div className="absolute -inset-6 rounded-3xl pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)", filter: "blur(24px)" }}
              aria-hidden="true" />

            {/* gradient border */}
            <div className="absolute -inset-[1px] rounded-2xl pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.32) 0%, rgba(201,168,76,0.04) 50%, rgba(201,168,76,0.2) 100%)" }}
              aria-hidden="true" />

            <div className="relative rounded-2xl overflow-hidden"
              style={{ height: "clamp(300px, 55vw, 560px)", border: "1px solid rgba(201,168,76,0.12)" }}>
              <Image
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070&auto=format&fit=crop"
                alt="Expert stylists at Habibs Hair & Beauty luxury salon, New Town Kolkata"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-103"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080604]/40 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Owner Spotlight ───────────────────────────────────────── */}
      <div
        className="mx-5 sm:mx-8 md:mx-12 lg:mx-16 mb-24 rounded-2xl overflow-hidden relative"
        style={{ border: "1px solid rgba(201,168,76,0.14)" }}
      >
        {/* bg */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(8,6,4,0.95) 60%)" }}
          aria-hidden="true" />
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)", filter: "blur(40px)" }}
          aria-hidden="true" />

        <div className="relative z-10 p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">

          {/* avatar */}
          <div className="flex justify-center lg:justify-start">
            <motion.div
              initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EXPO }}
              className="relative w-36 h-36 md:w-48 md:h-48 rounded-full p-[2px]"
              style={{ background: "linear-gradient(135deg, #C9A84C, #785F37)" }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-[#0F0D0A] flex items-center justify-center">
                <User className="w-16 h-16 md:w-20 md:h-20" style={{ color: "rgba(201,168,76,0.4)" }} aria-hidden="true" />
              </div>
            </motion.div>
          </div>

          {/* quote */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: EXPO }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Quote className="w-6 h-6 shrink-0" style={{ color: "rgba(201,168,76,0.6)" }} aria-hidden="true" />
                <p className="text-[10px] uppercase tracking-[0.3em] font-sans"
                  style={{ color: "rgba(201,168,76,0.55)" }}>
                  The Visionary Behind Habibs
                </p>
              </div>

              <h2 className="font-serif text-[#EDE0C4] mb-2 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.8rem)" }}>
                ANAMIKA
                <span className="italic font-light ml-3 text-base md:text-xl"
                  style={{
                    background: "linear-gradient(135deg, #F5E6B0, #C9A84C)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>
                  Owner & Expert Stylist
                </span>
              </h2>

              <div className="w-16 h-px mb-5"
                style={{ background: "linear-gradient(to right, rgba(201,168,76,0.4), transparent)" }}
                aria-hidden="true" />

              <blockquote>
                <p className="text-[#EDE0C4]/55 text-sm md:text-base font-sans italic leading-relaxed mb-6">
                  "At Habibs Hair and Beauty, we don't just provide services — we create experiences.
                  My passion for beauty and excellence drives everything we do. Every client deserves
                  to feel confident, beautiful and valued."
                </p>
              </blockquote>

              {/* stats row */}
              <div className="flex flex-wrap gap-6 md:gap-10">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-serif font-bold text-2xl md:text-3xl"
                      style={{
                        background: "linear-gradient(135deg, #F5E6B0, #C9A84C)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                      }}>
                      {s.value}
                    </p>
                    <p className="text-[9px] uppercase tracking-[0.2em] font-sans mt-1"
                      style={{ color: "rgba(237,224,196,0.35)" }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Why Choose Us — local SEO ─────────────────────────────── */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EXPO }}
          className="mb-10"
        >
          <p className="text-[10px] uppercase tracking-[0.4em] font-sans font-medium mb-3"
            style={{ color: "rgba(201,168,76,0.65)" }}>
            Why Clients Choose Us
          </p>
          <h2 className="font-serif text-[#EDE0C4] leading-tight"
            style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)" }}>
            New Town's Most
            <span className="italic font-light ml-2"
              style={{
                background: "linear-gradient(135deg, #F5E6B0, #C9A84C)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
              Trusted Salon
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Inside Downtown Mall", body: "Conveniently located at Uniworld City, easily accessible from Action Area 1 & 2, New Town, Kolkata." },
            { title: "Affordable Pricing", body: "Luxury service doesn't have to break the bank. Competitive pricing starting from ₹500 for nail art." },
            { title: "Fast & Friendly Service", body: "Our clients consistently praise our team for being professional, warm and efficient." },
            { title: "Unisex Salon", body: "Full range of services for men, women and all genders across hair, nails and skin treatments." },
            { title: "Repeat Client Favourite", body: "Over 5000 happy clients and a loyal base of regulars who return for stylist Tanvir and our expert team." },
            { title: "4.3★ Google Rating", body: "Verified by 115+ genuine reviews from real clients in New Town and the wider Kolkata area." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: EXPO }}
              className="p-5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(201,168,76,0.1)",
              }}
            >
              <h3 className="font-serif font-bold text-[#EDE0C4]/75 text-sm mb-2">{item.title}</h3>
              <p className="text-[#EDE0C4]/38 text-xs font-sans leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <div
        className="mx-5 sm:mx-8 md:mx-12 lg:mx-16 mb-16 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
        style={{ border: "1px solid rgba(201,168,76,0.14)" }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 70%)" }}
          aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EXPO }}
          className="relative z-10"
        >
          <p className="text-[10px] uppercase tracking-[0.4em] font-sans font-medium mb-4"
            style={{ color: "rgba(201,168,76,0.55)" }}>
            Experience it yourself
          </p>
          <h2 className="font-serif text-[#EDE0C4] mb-8 leading-tight"
            style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)" }}>
            Ready to Experience
            <span className="italic font-light ml-2"
              style={{
                background: "linear-gradient(135deg, #F5E6B0, #C9A84C)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
              Luxury?
            </span>
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/booking"
              className="group relative inline-flex items-center justify-center gap-2.5
                         px-8 py-4 rounded-full font-semibold text-[11px] uppercase
                         tracking-widest overflow-hidden transition-all duration-300
                         hover:shadow-[0_12px_40px_rgba(201,168,76,0.35)] hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #C9A84C, #E8D5A3 50%, #C9A84C)", backgroundSize: "200% auto", color: "#080604" }}
              aria-label="Book a beauty appointment at Habibs Hair & Beauty"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12 pointer-events-none"
                style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)" }} aria-hidden="true" />
              <Sparkles className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Book Now</span>
              <ArrowUpRight className="w-3.5 h-3.5 relative z-10" />
            </Link>

            <a
              href={`tel:${SALON_DETAILS.phone}`}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-[15px]
                         rounded-full font-semibold text-[11px] uppercase tracking-widest
                         transition-all duration-300 hover:-translate-y-0.5"
              style={{ border: "1px solid rgba(201,168,76,0.35)", color: "rgba(201,168,76,0.75)" }}
              aria-label={`Call Habibs Hair & Beauty at ${SALON_DETAILS.phone}`}
            >
              <Phone className="w-4 h-4" />
              <span>{SALON_DETAILS.phone}</span>
            </a>
          </div>
        </motion.div>
      </div>

      <div className="h-px w-full"
        style={{ background: "linear-gradient(to right,transparent,rgba(201,168,76,0.12),transparent)" }}
        aria-hidden="true" />
    </div>
  );
};

export default memo(AboutContent);