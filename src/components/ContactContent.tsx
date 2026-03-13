"use client";

import { useState, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SALON_DETAILS } from "@/lib/constants";
import { Phone, MapPin, Clock, MessageCircle, Send, CheckCircle2, AlertCircle, ChevronRight } from "lucide-react";

const EXPO = [0.16, 1, 0.3, 1] as const;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s\-().]{7,15}$/;

const serviceOptions = [
  { value: "", label: "Choose a service" },
  { value: "haircut", label: "Haircut & Styling" },
  { value: "nail-extensions", label: "Nail Extensions" },
  { value: "hair-colour", label: "Hair Colouring" },
  { value: "keratin", label: "Keratin Treatment" },
  { value: "facials", label: "Facials & Skin Care" },
  { value: "other", label: "Other" },
];

interface FormData { name: string; email: string; phone: string; service: string; message: string }
interface FormErrors { name?: string; email?: string; phone?: string; message?: string }

/* ─── Input styles ───────────────────────────────────────────────────────── */
const INPUT_BASE =
  "w-full rounded-xl px-4 py-3.5 text-sm font-sans bg-transparent outline-none transition-colors duration-200";
const inputStyle = (err?: string): React.CSSProperties => ({
  background: "rgba(255,255,255,0.04)",
  border: `1px solid ${err ? "rgba(239,68,68,0.6)" : "rgba(201,168,76,0.18)"}`,
  color: "rgba(237,224,196,0.75)",
});

/* ─── Contact info row ───────────────────────────────────────────────────── */
const contactItems = [
  { icon: MapPin, label: "Our Address", value: SALON_DETAILS.address, sub: SALON_DETAILS.location },
  { icon: Phone, label: "Call Us", value: SALON_DETAILS.phone, sub: "Open daily from 11 AM" },
  { icon: Clock, label: "Hours", value: "Monday – Sunday", sub: SALON_DETAILS.openingHours?.mon },
];

const ContactContent = () => {
  const prefersReduced = useReducedMotion();
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!EMAIL_REGEX.test(form.email.trim())) e.email = "Enter a valid email address.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    else if (!PHONE_REGEX.test(form.phone.trim())) e.phone = "Enter a valid phone number.";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Please enter a message (at least 10 characters).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSuccess(true); setForm({ name: "", email: "", phone: "", service: "", message: "" }); }, 1500);
  };

  return (
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
            Get In Touch
          </p>
          <h1
            className="font-serif text-[#EDE0C4] leading-[0.93] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)" }}
          >
            CONTACT
            <br />
            <span className="italic font-light" style={{
              background: "linear-gradient(135deg, #F5E6B0 0%, #C9A84C 45%, #A08C5B 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Us</span>
          </h1>
          <div className="flex items-center gap-3 mb-5" aria-hidden="true">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/40" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#C9A84C]/50" />
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/40" />
          </div>
          <p className="text-[#EDE0C4]/45 text-sm md:text-base font-sans leading-relaxed max-w-md">
            Have a question or want to book an appointment? Our team is here to help with
            all your luxury beauty needs at Habibs Hair & Beauty, New Town Kolkata.
          </p>
        </motion.div>
      </div>

      {/* ── Main grid ───────────────────────────────────────────── */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

        {/* ── Left: form ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: prefersReduced ? 0 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: EXPO }}
          className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
          style={{
            background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(201,168,76,0.02) 100%)",
            border: "1px solid rgba(201,168,76,0.13)",
          }}
        >
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)", filter: "blur(30px)" }}
            aria-hidden="true" />

          <h2 className="font-serif font-bold text-[#EDE0C4]/80 text-xl md:text-2xl mb-6 relative z-10">
            Send Us a Message
          </h2>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-12 text-center"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #C9A84C, #A08C5B)" }}>
                <CheckCircle2 className="w-7 h-7 text-[#080604]" />
              </div>
              <h3 className="font-serif font-bold text-[#EDE0C4] text-xl">Message Sent!</h3>
              <p className="text-[#EDE0C4]/45 text-sm font-sans italic">We'll get back to you shortly.</p>
              <button
                onClick={() => setSuccess(false)}
                className="text-[10px] uppercase tracking-widest font-semibold font-sans mt-2 pb-0.5"
                style={{ color: "rgba(201,168,76,0.6)", borderBottom: "1px solid rgba(201,168,76,0.3)" }}
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 relative z-10">

              {/* name + email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "name", label: "Full Name *", type: "text", placeholder: "Your name" },
                  { id: "email", label: "Email Address *", type: "email", placeholder: "name@email.com" },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label htmlFor={id}
                      className="block text-[9px] uppercase tracking-[0.25em] font-sans font-medium mb-1.5"
                      style={{ color: "rgba(201,168,76,0.5)" }}>
                      {label}
                    </label>
                    <input
                      id={id} name={id} type={type} placeholder={placeholder}
                      value={form[id as keyof FormData]}
                      onChange={handleChange}
                      className={`${INPUT_BASE} placeholder:text-[#EDE0C4]/20`}
                      style={inputStyle(errors[id as keyof FormErrors])}
                      aria-invalid={!!errors[id as keyof FormErrors]}
                      aria-describedby={errors[id as keyof FormErrors] ? `${id}-err` : undefined}
                    />
                    {errors[id as keyof FormErrors] && (
                      <p id={`${id}-err`} role="alert" className="flex items-center gap-1 mt-1 text-xs"
                        style={{ color: "rgba(239,68,68,0.8)" }}>
                        <AlertCircle className="w-3 h-3 shrink-0" />{errors[id as keyof FormErrors]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* phone + service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone"
                    className="block text-[9px] uppercase tracking-[0.25em] font-sans font-medium mb-1.5"
                    style={{ color: "rgba(201,168,76,0.5)" }}>
                    Phone Number *
                  </label>
                  <input
                    id="phone" name="phone" type="tel" placeholder="+91 98765 43210"
                    value={form.phone} onChange={handleChange}
                    className={`${INPUT_BASE} placeholder:text-[#EDE0C4]/20`}
                    style={inputStyle(errors.phone)}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-err" : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-err" role="alert" className="flex items-center gap-1 mt-1 text-xs"
                      style={{ color: "rgba(239,68,68,0.8)" }}>
                      <AlertCircle className="w-3 h-3 shrink-0" />{errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="service"
                    className="block text-[9px] uppercase tracking-[0.25em] font-sans font-medium mb-1.5"
                    style={{ color: "rgba(201,168,76,0.5)" }}>
                    Select Service
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setServiceOpen((p) => !p)}
                      className="w-full text-left px-4 py-3.5 rounded-xl text-sm font-sans flex items-center justify-between"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(201,168,76,0.18)",
                        color: form.service ? "rgba(237,224,196,0.75)" : "rgba(237,224,196,0.25)",
                      }}
                    >
                      <span>{serviceOptions.find(o => o.value === form.service)?.label ?? "Choose a service"}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${serviceOpen ? "rotate-90" : ""}`}
                        style={{ color: "rgba(201,168,76,0.5)" }} />
                    </button>

                    {serviceOpen && (
                      <div className="absolute z-50 w-full mt-1 rounded-xl overflow-hidden"
                        style={{ background: "#0F0D0A", border: "1px solid rgba(201,168,76,0.2)", boxShadow: "0 16px 40px rgba(0,0,0,0.6)" }}>
                        {serviceOptions.map((opt) => (
                          <button key={opt.value} type="button"
                            onClick={() => { setForm(p => ({ ...p, service: opt.value })); setServiceOpen(false); }}
                            className="w-full text-left px-4 py-3 text-sm font-sans transition-colors duration-150"
                            style={{
                              color: opt.value === form.service ? "#C9A84C" : "rgba(237,224,196,0.55)",
                              background: opt.value === form.service ? "rgba(201,168,76,0.08)" : "transparent",
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,168,76,0.06)")}
                            onMouseLeave={e => (e.currentTarget.style.background = opt.value === form.service ? "rgba(201,168,76,0.08)" : "transparent")}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* message */}
              <div>
                <label htmlFor="message"
                  className="block text-[9px] uppercase tracking-[0.25em] font-sans font-medium mb-1.5"
                  style={{ color: "rgba(201,168,76,0.5)" }}>
                  Your Message *
                </label>
                <textarea
                  id="message" name="message" rows={5}
                  placeholder="How can we help you?"
                  value={form.message} onChange={handleChange}
                  className={`${INPUT_BASE} resize-none placeholder:text-[#EDE0C4]/20`}
                  style={inputStyle(errors.message)}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-err" : undefined}
                />
                {errors.message && (
                  <p id="message-err" role="alert" className="flex items-center gap-1 mt-1 text-xs"
                    style={{ color: "rgba(239,68,68,0.8)" }}>
                    <AlertCircle className="w-3 h-3 shrink-0" />{errors.message}
                  </p>
                )}
              </div>

              {/* submit */}
              <button
                type="submit" disabled={submitting}
                className="group relative inline-flex items-center justify-center gap-2.5 mt-2
                           px-8 py-4 rounded-full font-semibold text-[11px] uppercase
                           tracking-widest overflow-hidden transition-all duration-300
                           hover:shadow-[0_12px_36px_rgba(201,168,76,0.3)] hover:-translate-y-0.5
                           disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #C9A84C, #E8D5A3 50%, #C9A84C)", backgroundSize: "200% auto", color: "#080604" }}
                aria-label="Send your message to Habibs Hair & Beauty"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12 pointer-events-none"
                  style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)" }} aria-hidden="true" />
                <Send className={`w-4 h-4 relative z-10 ${submitting ? "animate-pulse" : ""}`} />
                <span className="relative z-10">{submitting ? "Sending…" : "Send Message"}</span>
              </button>
            </form>
          )}
        </motion.div>

        {/* ── Right: contact info + map ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: prefersReduced ? 0 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EXPO }}
          className="flex flex-col gap-6"
        >
          {/* info rows */}
          {contactItems.map(({ icon: Icon, label, value, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: EXPO }}
              className="flex items-start gap-4 p-4 md:p-5 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.1)" }}
            >
              <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center"
                style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.18)" }}>
                <Icon className="w-4 h-4" style={{ color: "#C9A84C" }} aria-hidden="true" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] font-sans font-medium mb-1"
                  style={{ color: "rgba(201,168,76,0.5)" }}>{label}</p>
                <p className="text-[#EDE0C4]/65 text-sm font-sans leading-relaxed">{value}</p>
                {sub && <p className="text-[9px] uppercase tracking-widest font-sans mt-1"
                  style={{ color: "rgba(201,168,76,0.4)" }}>{sub}</p>}
              </div>
            </motion.div>
          ))}

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={`tel:${SALON_DETAILS.phone}`}
              className="flex-1 flex items-center justify-center gap-2.5 py-4 rounded-full
                         font-semibold text-[11px] uppercase tracking-widest transition-all
                         duration-300 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #C9A84C, #E8D5A3 50%, #C9A84C)", backgroundSize: "200% auto", color: "#080604" }}
              aria-label={`Call Habibs Hair & Beauty at ${SALON_DETAILS.phone}`}>
              <Phone className="w-4 h-4 shrink-0" />
              <span>Call Now</span>
            </a>
            <a href={`https://wa.me/${SALON_DETAILS.whatsapp?.replace(/\D/g, "")}`}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2.5 py-4 rounded-full
                         font-semibold text-[11px] uppercase tracking-widest transition-all
                         duration-300 hover:-translate-y-0.5"
              style={{ border: "1px solid rgba(201,168,76,0.3)", color: "rgba(201,168,76,0.75)" }}
              aria-label="WhatsApp Habibs Hair & Beauty New Town">
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* map */}
          <div className="relative rounded-2xl overflow-hidden"
            style={{ height: "clamp(220px, 40vw, 340px)", border: "1px solid rgba(201,168,76,0.14)", boxShadow: "0 16px 48px rgba(0,0,0,0.4)" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.746816174676!2d88.4721111!3d22.5857222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275001c9c8913%3Ab3e1c618c64188e7!2sHabibs%20Hair%20%26%20Beauty%2C%20New%20Town!5e0!3m2!1sen!2sin!4v1710150000000!5m2!1sen!2sin"
              width="100%" height="100%"
              style={{ border: 0, filter: "grayscale(80%) contrast(110%) brightness(0.7)" }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Habibs Hair & Beauty — AA3, B114–115, Uniworld City, Downtown Retail, New Town, Kolkata"
            />
          </div>
        </motion.div>
      </div>

      <div className="h-px w-full"
        style={{ background: "linear-gradient(to right,transparent,rgba(201,168,76,0.12),transparent)" }}
        aria-hidden="true" />
    </div>
  );
};

export default memo(ContactContent);