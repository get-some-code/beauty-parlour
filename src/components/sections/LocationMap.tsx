"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation, ArrowUpRight } from "lucide-react";
import { SALON_DETAILS } from "@/lib/constants";

/* ─── Constants ─────────────────────────────────────────────────────────── */
const EXPO = [0.16, 1, 0.3, 1] as const;

const contactItems = [
  {
    icon: MapPin,
    label: "Our Address",
    value: SALON_DETAILS.address,
    sub: SALON_DETAILS.location,
    href: "https://maps.app.goo.gl/uP4RkYyY8uVf1Z6X8",
    external: true,
  },
  {
    icon: Phone,
    label: "Call Us",
    value: SALON_DETAILS.phone,
    sub: "Available daily from 10:00 AM",
    href: `tel:${SALON_DETAILS.phone}`,
    external: false,
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Monday – Sunday",
    sub: SALON_DETAILS.openingHours.mon,
    href: null,
    external: false,
  },
];

/* ─── Contact row ────────────────────────────────────────────────────────── */
const ContactRow = memo(
  ({ item, index }: { item: typeof contactItems[0]; index: number }) => {
    const prefersReduced = useReducedMotion();
    const Icon = item.icon;

    const inner = (
      <motion.div
        initial={{ opacity: 0, x: prefersReduced ? 0 : -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: EXPO }}
        className="group flex items-start gap-4 p-4 md:p-5 rounded-2xl
                   transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(201,168,76,0.1)",
        }}
      >
        {/* icon bubble */}
        <div
          className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: "linear-gradient(135deg, rgba(201,168,76,0.18), rgba(201,168,76,0.06))",
            border: "1px solid rgba(201,168,76,0.2)",
          }}
        >
          <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: "#C9A84C" }} aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <p
            className="text-[9px] uppercase tracking-[0.25em] font-sans font-medium mb-1"
            style={{ color: "rgba(201,168,76,0.5)" }}
          >
            {item.label}
          </p>
          <p className="text-[#EDE0C4]/75 text-sm font-sans leading-relaxed line-clamp-2">
            {item.value}
          </p>
          {item.sub && (
            <p
              className="text-[10px] font-sans mt-1 uppercase tracking-widest"
              style={{ color: "rgba(201,168,76,0.45)" }}
            >
              {item.sub}
            </p>
          )}
        </div>

        {item.href && (
          <ArrowUpRight
            className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100
                       transition-opacity duration-200"
            style={{ color: "rgba(201,168,76,0.6)" }}
            aria-hidden="true"
          />
        )}
      </motion.div>
    );

    if (item.href) {
      return (
        <a
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          aria-label={`${item.label}: ${item.value}`}
          className="block hover:-translate-y-0.5 transition-transform duration-200"
        >
          {inner}
        </a>
      );
    }
    return inner;
  }
);
ContactRow.displayName = "ContactRow";

/* ─── Section ────────────────────────────────────────────────────────────── */
const LocationMap = () => {
  const prefersReduced = useReducedMotion();

  return (
    <section
      className="bg-[#080604] overflow-hidden"
      aria-labelledby="location-heading"
    >
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.15), transparent)" }}
        aria-hidden="true"
      />

      <div className="py-20 md:py-28 px-5 sm:px-8 md:px-12 lg:px-16">
        {/* ── Header ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EXPO }}
          className="mb-12 md:mb-16"
        >
          <p
            className="text-[10px] uppercase tracking-[0.4em] font-sans font-medium mb-4"
            style={{ color: "rgba(201,168,76,0.65)" }}
          >
            Find Us
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              id="location-heading"
              className="font-serif text-[#EDE0C4] leading-[0.93] tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}
            >
              VISIT OUR
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
                Luxury Space
              </span>
            </h2>
            <div className="flex items-center gap-3" aria-hidden="true">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/40" />
              <div className="w-1.5 h-1.5 rotate-45 border border-[#C9A84C]/50" />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/40" />
            </div>
          </div>
        </motion.div>

        {/* ── Two-column layout ────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* ── Left: contact rows + CTA buttons ─────────────────── */}
          <div className="flex flex-col gap-4">
            {contactItems.map((item, i) => (
              <ContactRow key={item.label} item={item} index={i} />
            ))}

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35, ease: EXPO }}
              className="flex flex-col sm:flex-row gap-3 mt-2"
            >
              <a
                href="https://maps.app.goo.gl/uP4RkYyY8uVf1Z6X8"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-2.5
                           px-7 py-4 rounded-full font-semibold text-[11px] uppercase
                           tracking-widest overflow-hidden flex-1 sm:flex-none
                           transition-[box-shadow,transform] duration-300
                           hover:shadow-[0_12px_36px_rgba(201,168,76,0.35)]
                           hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #C9A84C 0%, #E8D5A3 50%, #C9A84C 100%)",
                  backgroundSize: "200% auto",
                  color: "#080604",
                }}
                aria-label="Get directions to Habibs Hair & Beauty New Town"
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                             transition-transform duration-700 skew-x-12 pointer-events-none"
                  style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)" }}
                  aria-hidden="true"
                />
                <Navigation className="w-4 h-4 relative z-10 shrink-0" />
                <span className="relative z-10">Get Directions</span>
              </a>

              <a
                href={`https://wa.me/${SALON_DETAILS.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-7 py-[15px]
                           rounded-full font-semibold text-[11px] uppercase tracking-widest
                           flex-1 sm:flex-none transition-all duration-300
                           hover:-translate-y-0.5 active:scale-95"
                style={{
                  border: "1px solid rgba(201,168,76,0.35)",
                  color: "rgba(201,168,76,0.75)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "rgba(201,168,76,0.7)";
                  el.style.color = "#C9A84C";
                  el.style.background = "rgba(201,168,76,0.06)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "rgba(201,168,76,0.35)";
                  el.style.color = "rgba(201,168,76,0.75)";
                  el.style.background = "transparent";
                }}
                aria-label="WhatsApp Habibs Hair & Beauty"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>WhatsApp Us</span>
              </a>
            </motion.div>
          </div>

          {/* ── Right: map embed ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: EXPO }}
            className="relative"
          >
            {/* ambient glow */}
            <div
              className="absolute -inset-4 rounded-3xl pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
              aria-hidden="true"
            />

            {/* gradient border ring */}
            <div
              className="absolute -inset-[1px] rounded-2xl pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(201,168,76,0.35) 0%, rgba(201,168,76,0.04) 40%, rgba(201,168,76,0.25) 100%)",
                borderRadius: "1rem",
              }}
              aria-hidden="true"
            />

            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                height: "clamp(280px, 50vw, 520px)",
                border: "1px solid rgba(201,168,76,0.14)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.746816174676!2d88.4721111!3d22.5857222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275001c9c8913%3A0xb3e1c618c64188e7!2sHabibs%20Hair%20%26%20Beauty%2C%20New%20Town!5e0!3m2!1sen!2sin!4v1710150000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(80%) contrast(110%) brightness(0.75)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Habibs Hair & Beauty location — AA 3, B 114/115, Uniworld City, New Town, Kolkata"
              />
              {/* overlay that lifts on hover via parent group */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{ background: "rgba(8,6,4,0.15)" }}
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.12), transparent)" }}
        aria-hidden="true"
      />
    </section>
  );
};

export default memo(LocationMap);