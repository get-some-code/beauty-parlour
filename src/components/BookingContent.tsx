"use client";

import { useState, useEffect, memo, Suspense } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SALON_DETAILS, SERVICES } from "@/lib/constants";
import {
  Calendar, Clock, User, Phone, CheckCircle2, ChevronRight,
  Scissors, Sparkles, Wand2, Star, ArrowLeft, ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const EXPO = [0.16, 1, 0.3, 1] as const;

const getCategoryIcon = (cat: string) => {
  switch (cat.toLowerCase()) {
    case "hair":  return Scissors;
    case "nails": return Sparkles;
    case "skin":  return Wand2;
    default:      return Star;
  }
};

/* ─── Input helper ───────────────────────────────────────────────────────── */
const inputStyle = (err?: string): React.CSSProperties => ({
  background: "rgba(255,255,255,0.04)",
  border: `1px solid ${err ? "rgba(239,68,68,0.6)" : "rgba(201,168,76,0.18)"}`,
  color: "rgba(237,224,196,0.75)",
  borderRadius: "0.75rem",
  width: "100%",
  padding: "0.875rem 1rem",
  fontSize: "0.875rem",
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.2s",
});

const FieldLabel = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
  <label htmlFor={htmlFor}
    className="block text-[9px] uppercase tracking-[0.25em] font-sans font-medium mb-1.5"
    style={{ color: "rgba(201,168,76,0.5)" }}>
    {children}
  </label>
);

const FieldError = ({ id, msg }: { id: string; msg: string }) => (
  <p id={id} role="alert" className="text-xs mt-1" style={{ color: "rgba(239,68,68,0.8)" }}>{msg}</p>
);

const SectionDivider = () => (
  <div className="w-full h-px my-6"
    style={{ background: "linear-gradient(to right,rgba(201,168,76,0.15),transparent)" }}
    aria-hidden="true" />
);

/* ─── Booking inner ──────────────────────────────────────────────────────── */
const BookingInner = () => {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "";
  const prefersReduced = useReducedMotion();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ serviceId: initialService, date: "", time: "", name: "", phone: "", notes: "" });
  const [errors, setErrors] = useState({ date: "", time: "", name: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (initialService) { setForm((p) => ({ ...p, serviceId: initialService })); setStep(2); }
  }, [initialService]);

  const validate = (s: number) => {
    const e = { date: "", time: "", name: "", phone: "" };
    if (s === 2) {
      if (!form.date) e.date = "Date is required.";
      else {
        const d = new Date(form.date); const today = new Date(); today.setHours(0,0,0,0);
        if (d < today) e.date = "Date cannot be in the past.";
      }
      if (!form.time) e.time = "Please select a time.";
    }
    if (s === 3) {
      if (!form.name.trim() || form.name.trim().length < 2) e.name = "Please enter your full name.";
      if (!form.phone.trim() || !/^[\d\s\-\+\(\)]{10,}$/.test(form.phone)) e.phone = "Enter a valid phone number.";
    }
    setErrors(e);
    return !e.date && !e.time && !e.name && !e.phone;
  };

  const next = () => { if (validate(step)) setStep((p) => p + 1); };
  const back = () => { setErrors({ date: "", time: "", name: "", phone: "" }); setStep((p) => p - 1); };
  const submit = (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSuccess(true); }, 1800);
  };

  const selectedService = SERVICES.find((s) => s.id === form.serviceId);
  const times = ["11:00 AM","12:00 PM","01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM","06:00 PM","07:00 PM","08:00 PM"];

  /* success screen */
  if (success) return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-5 py-16 text-center max-w-lg mx-auto"
    >
      <div className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #C9A84C, #A08C5B)" }}>
        <CheckCircle2 className="w-8 h-8 text-[#080604]" />
      </div>
      <h2 className="font-serif font-bold text-[#EDE0C4] text-2xl md:text-3xl">Booking Confirmed!</h2>
      <p className="text-[#EDE0C4]/50 text-sm font-sans leading-relaxed">
        Thank you, <span style={{ color: "#C9A84C" }}>{form.name}</span>.
        Your <span style={{ color: "#C9A84C" }}>{selectedService?.title}</span> appointment
        on <span style={{ color: "#C9A84C" }}>{form.date}</span> at <span style={{ color: "#C9A84C" }}>{form.time}</span> has been received.
        We'll confirm via phone shortly.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
        <Link href="/"
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-full
                     font-semibold text-[11px] uppercase tracking-widest"
          style={{ background: "linear-gradient(135deg,#C9A84C,#E8D5A3 50%,#C9A84C)", backgroundSize: "200% auto", color: "#080604" }}>
          Return Home
        </Link>
        <a href={`tel:${SALON_DETAILS.phone}`}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-full
                     font-semibold text-[11px] uppercase tracking-widest"
          style={{ border: "1px solid rgba(201,168,76,0.3)", color: "rgba(201,168,76,0.75)" }}>
          <Phone className="w-4 h-4" /> Call Salon
        </a>
      </div>
    </motion.div>
  );

  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid rgba(201,168,76,0.13)", background: "linear-gradient(160deg,rgba(255,255,255,0.04) 0%,rgba(201,168,76,0.02) 100%)" }}>

      {/* progress bar */}
      <div className="h-0.5 w-full" style={{ background: "rgba(201,168,76,0.1)" }}>
        <motion.div className="h-full"
          style={{ background: "linear-gradient(to right,#C9A84C,#E8D5A3)" }}
          animate={{ width: `${(step / 4) * 100}%` }}
          transition={{ duration: 0.4 }} />
      </div>

      <div className="p-6 md:p-10">
        <AnimatePresence mode="wait">

          {/* ── Step 1: Service ──────────────────────────────── */}
          {step === 1 && (
            <motion.div key="step1"
              initial={{ opacity: 0, x: prefersReduced ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: EXPO }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif font-bold text-[#EDE0C4]/80 text-lg md:text-xl">Select Service</h2>
                <span className="text-[9px] uppercase tracking-widest font-sans"
                  style={{ color: "rgba(201,168,76,0.45)" }}>Step 1 of 4</span>
              </div>
              <SectionDivider />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                role="radiogroup" aria-label="Select a service">
                {SERVICES.map((s) => {
                  const Icon = getCategoryIcon(s.category);
                  const active = form.serviceId === s.id;
                  return (
                    <button key={s.id}
                      onClick={() => { setForm((p) => ({ ...p, serviceId: s.id })); setStep(2); }}
                      role="radio" aria-checked={active}
                      className="flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-200
                                 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
                      style={{
                        background: active ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${active ? "rgba(201,168,76,0.35)" : "rgba(201,168,76,0.1)"}`,
                      }}
                    >
                      <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center"
                        style={{ background: active ? "rgba(201,168,76,0.15)" : "rgba(201,168,76,0.07)" }}>
                        <Icon className="w-4 h-4" style={{ color: active ? "#C9A84C" : "rgba(201,168,76,0.45)" }} aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-serif font-bold text-sm leading-tight mb-0.5"
                          style={{ color: active ? "#EDE0C4" : "rgba(237,224,196,0.6)" }}>{s.title}</p>
                        <p className="text-[10px] font-sans leading-relaxed line-clamp-2"
                          style={{ color: "rgba(237,224,196,0.3)" }}>{s.description}</p>
                        <p className="text-[10px] font-sans font-semibold mt-1"
                          style={{ color: "rgba(201,168,76,0.55)" }}>{s.price}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── Step 2: Date & Time ──────────────────────────── */}
          {step === 2 && (
            <motion.div key="step2"
              initial={{ opacity: 0, x: prefersReduced ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: EXPO }}
            >
              <div className="flex items-center justify-between mb-6">
                <button onClick={back} className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
                  style={{ color: "rgba(201,168,76,0.6)" }} aria-label="Go back">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest font-sans">Back</span>
                </button>
                <h2 className="font-serif font-bold text-[#EDE0C4]/80 text-lg md:text-xl">Date & Time</h2>
                <span className="text-[9px] uppercase tracking-widest font-sans"
                  style={{ color: "rgba(201,168,76,0.45)" }}>Step 2 of 4</span>
              </div>
              <SectionDivider />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                <div>
                  <FieldLabel htmlFor="date">Appointment Date *</FieldLabel>
                  <input id="date" type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={form.date}
                    onChange={(e) => { setForm((p) => ({ ...p, date: e.target.value })); setErrors((p) => ({ ...p, date: "" })); }}
                    style={inputStyle(errors.date)}
                    aria-invalid={!!errors.date} aria-describedby={errors.date ? "date-err" : undefined}
                  />
                  {errors.date && <FieldError id="date-err" msg={errors.date} />}
                </div>

                <div>
                  <FieldLabel htmlFor="time">Preferred Time *</FieldLabel>
                  <select id="time"
                    value={form.time}
                    onChange={(e) => { setForm((p) => ({ ...p, time: e.target.value })); setErrors((p) => ({ ...p, time: "" })); }}
                    style={{ ...inputStyle(errors.time), appearance: "none" } as React.CSSProperties}
                    aria-invalid={!!errors.time} aria-describedby={errors.time ? "time-err" : undefined}
                  >
                    <option value="">Select a time</option>
                    {times.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.time && <FieldError id="time-err" msg={errors.time} />}
                </div>
              </div>

              <div className="flex justify-end">
                <button onClick={next}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full
                             font-semibold text-[11px] uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg,#C9A84C,#E8D5A3 50%,#C9A84C)", backgroundSize: "200% auto", color: "#080604" }}>
                  Continue <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Contact ──────────────────────────────── */}
          {step === 3 && (
            <motion.div key="step3"
              initial={{ opacity: 0, x: prefersReduced ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: EXPO }}
            >
              <div className="flex items-center justify-between mb-6">
                <button onClick={back} className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
                  style={{ color: "rgba(201,168,76,0.6)" }} aria-label="Go back">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest font-sans">Back</span>
                </button>
                <h2 className="font-serif font-bold text-[#EDE0C4]/80 text-lg md:text-xl">Contact Details</h2>
                <span className="text-[9px] uppercase tracking-widest font-sans"
                  style={{ color: "rgba(201,168,76,0.45)" }}>Step 3 of 4</span>
              </div>
              <SectionDivider />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <FieldLabel htmlFor="name">Full Name *</FieldLabel>
                  <input id="name" type="text" placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => { setForm((p) => ({ ...p, name: e.target.value })); setErrors((p) => ({ ...p, name: "" })); }}
                    style={{ ...inputStyle(errors.name), '::placeholder': { color: "rgba(237,224,196,0.2)" } } as React.CSSProperties}
                    className="placeholder:text-[#EDE0C4]/20"
                    aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined}
                  />
                  {errors.name && <FieldError id="name-err" msg={errors.name} />}
                </div>
                <div>
                  <FieldLabel htmlFor="phone">Phone Number *</FieldLabel>
                  <input id="phone" type="tel" placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => { setForm((p) => ({ ...p, phone: e.target.value })); setErrors((p) => ({ ...p, phone: "" })); }}
                    style={inputStyle(errors.phone)}
                    className="placeholder:text-[#EDE0C4]/20"
                    aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined}
                  />
                  {errors.phone && <FieldError id="phone-err" msg={errors.phone} />}
                </div>
              </div>

              <div className="mb-8">
                <FieldLabel htmlFor="notes">Additional Notes (Optional)</FieldLabel>
                <textarea id="notes" rows={3} placeholder="Special requests…"
                  value={form.notes}
                  onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                  style={{ ...inputStyle(), resize: "none" } as React.CSSProperties}
                  className="placeholder:text-[#EDE0C4]/20"
                />
              </div>

              <div className="flex justify-end">
                <button onClick={next}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full
                             font-semibold text-[11px] uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg,#C9A84C,#E8D5A3 50%,#C9A84C)", backgroundSize: "200% auto", color: "#080604" }}>
                  Review Details <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 4: Confirm ──────────────────────────────── */}
          {step === 4 && (
            <motion.div key="step4"
              initial={{ opacity: 0, x: prefersReduced ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: EXPO }}
            >
              <div className="flex items-center justify-between mb-6">
                <button onClick={back} className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
                  style={{ color: "rgba(201,168,76,0.6)" }} aria-label="Go back">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest font-sans">Back</span>
                </button>
                <h2 className="font-serif font-bold text-[#EDE0C4]/80 text-lg md:text-xl">Review & Confirm</h2>
                <span className="text-[9px] uppercase tracking-widest font-sans"
                  style={{ color: "rgba(201,168,76,0.45)" }}>Step 4 of 4</span>
              </div>
              <SectionDivider />

              {/* summary */}
              <div className="rounded-xl p-5 md:p-6 mb-6"
                style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.12)" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { label: "Service",   value: selectedService?.title, sub: selectedService?.price },
                    { label: "Date & Time", value: `${form.date} at ${form.time}` },
                    { label: "Name",      value: form.name },
                    { label: "Phone",     value: form.phone },
                    ...(form.notes ? [{ label: "Notes", value: form.notes }] : []),
                  ].map(({ label, value, sub }) => (
                    <div key={label}>
                      <p className="text-[9px] uppercase tracking-[0.25em] font-sans mb-1"
                        style={{ color: "rgba(201,168,76,0.45)" }}>{label}</p>
                      <p className="font-serif font-bold text-[#EDE0C4]/75 text-sm">{value}</p>
                      {sub && <p className="text-[10px] font-sans mt-0.5" style={{ color: "rgba(201,168,76,0.4)" }}>{sub}</p>}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[10px] font-sans text-center mb-5" style={{ color: "rgba(237,224,196,0.3)" }}>
                By confirming you agree to our booking policy. We hold your slot for 15 minutes.
              </p>

              <div className="flex justify-center">
                <button onClick={submit} disabled={submitting}
                  className="group relative inline-flex items-center gap-2.5 px-10 py-4 rounded-full
                             font-semibold text-[11px] uppercase tracking-widest overflow-hidden
                             transition-all duration-300 hover:shadow-[0_12px_40px_rgba(201,168,76,0.3)]
                             hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg,#C9A84C,#E8D5A3 50%,#C9A84C)", backgroundSize: "200% auto", color: "#080604" }}>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12 pointer-events-none"
                    style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)" }} aria-hidden="true" />
                  <CheckCircle2 className={`w-4 h-4 relative z-10 ${submitting ? "animate-pulse" : ""}`} />
                  <span className="relative z-10">{submitting ? "Processing…" : "Confirm Booking"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 relative z-10" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ─── Page wrapper ───────────────────────────────────────────────────────── */
const BookingContent = () => {
  const prefersReduced = useReducedMotion();

  return (
    <div className="bg-[#080604] min-h-screen">

      {/* header */}
      <div className="pt-28 md:pt-36 pb-12 px-5 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EXPO }}
          className="max-w-2xl"
        >
          <p className="text-[10px] uppercase tracking-[0.4em] font-sans font-medium mb-4"
            style={{ color: "rgba(201,168,76,0.65)" }}>
            Reservation
          </p>
          <h1
            className="font-serif text-[#EDE0C4] leading-[0.93] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)" }}
          >
            BOOK AN
            <br />
            <span className="italic font-light" style={{
              background: "linear-gradient(135deg, #F5E6B0 0%, #C9A84C 45%, #A08C5B 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Appointment</span>
          </h1>
          <div className="flex items-center gap-3 mb-5" aria-hidden="true">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/40" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#C9A84C]/50" />
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/40" />
          </div>
          <p className="text-[#EDE0C4]/45 text-sm md:text-base font-sans leading-relaxed max-w-md">
            Reserve your luxury beauty session in just a few steps. Select your service,
            choose a time, and we'll take care of the rest.
          </p>
        </motion.div>
      </div>

      {/* form */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 pb-24 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EXPO }}
        >
          <BookingInner />
        </motion.div>
      </div>

      <div className="h-px w-full"
        style={{ background: "linear-gradient(to right,transparent,rgba(201,168,76,0.12),transparent)" }}
        aria-hidden="true" />
    </div>
  );
};

export default function BookingContentWithSuspense() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#080604] flex items-center justify-center">
        <p className="font-serif text-[#EDE0C4]/40 uppercase tracking-widest text-sm">Loading…</p>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}