"use client";

import { useState, memo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard, Calendar, Scissors, ImageIcon, FileText,
  Settings, LogOut, Search, Plus, Pencil, Trash2,
  CheckCircle2, XCircle, Clock, X, Save, Bell,
  Star, Sparkles, Wand2, Eye, AlertCircle, ChevronRight,
  RefreshCw, ToggleLeft, ToggleRight, Menu, Upload,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAdmin } from "@/app/admin/layout";

/* ─── tokens ─────────────────────────────────────────────────────── */
const EXPO = [0.16, 1, 0.3, 1] as const;
const G = "rgba(201,168,76,";
const C = "rgba(237,224,196,";

/* ─── types ──────────────────────────────────────────────────────── */
type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled";
type ServiceCategory = "Hair" | "Nails" | "Skin" | "Grooming";

interface Booking {
  id: string; customer: string; phone: string; email: string;
  service: string; category: ServiceCategory; date: string;
  time: string; status: BookingStatus; price: string; notes: string;
}
interface Service {
  id: string; title: string; description: string; category: ServiceCategory;
  price: string; duration: string; image: string; featured: boolean;
}
interface GalleryItem { id: string; url: string; alt: string; category: string; featured: boolean; }
interface SalonSettings {
  name: string; tagline: string; phone: string; whatsapp: string; email: string;
  address: string; location: string; hours: string; owner: string;
  ownerTitle: string; ownerBio: string; instagram: string; facebook: string;
  googleRating: string; totalReviews: string; yearsExp: string; happyClients: string;
}
interface ContentSection { id: string; section: string; title: string; subtitle: string; body: string; }
interface Testimonial { id: string; name: string; rating: number; text: string; service: string; date: string; }

/* ─── DB → UI mapping helpers ───────────────────────────────────────── */
function slugify(s: string) { return s.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,""); }

function mapDbService(s: Record<string,any>): Service {
  return { id:s.id, title:s.name, description:s.description||"", category:s.category as ServiceCategory,
    price:s.price_start?`From \u20b9${s.price_start}`:"", duration:s.duration||"",
    image:s.image_url||"", featured:s.is_active??true };
}
function mapDbGallery(g: Record<string,any>): GalleryItem {
  return { id:g.id, url:g.image_url, alt:g.title, category:g.category, featured:g.is_featured };
}
function mapDbBooking(b: Record<string,any>): Booking {
  return { id:b.id, customer:b.customer_name, phone:b.phone, email:b.email||"",
    service:b.services?.name||"Deleted Service", category:(b.services?.category||"Hair") as ServiceCategory,
    date:b.preferred_date||"", time:b.preferred_time||"", status:b.status as BookingStatus,
    price:b.services?.price_start?`\u20b9${b.services.price_start}`:"", notes:b.message||"" };
}
function mapDbReview(r: Record<string,any>): Testimonial {
  return { id:r.id, name:r.name, rating:r.rating, text:r.review_text,
    service:r.service||"", date:r.created_at?.split("T")[0]||"" };
}

const EMPTY_SETTINGS: SalonSettings = {
  name:"",tagline:"",phone:"",whatsapp:"",email:"",address:"",location:"",hours:"",
  owner:"",ownerTitle:"",ownerBio:"",instagram:"",facebook:"",
  googleRating:"4.3",totalReviews:"0",yearsExp:"15+",happyClients:"5000+",
};

/* ─── placeholder to satisfy old references (unused) ─────────────────── */
const _SEED_BOOKINGS: Booking[] = [
  { id:"BK-001", customer:"Sanya Gupta",      phone:"+91 98765 43210", email:"sanya@email.com",  service:"Nail Extensions",     category:"Nails", date:"2025-03-18", time:"11:00 AM", status:"confirmed", price:"₹1,500", notes:"French tips" },
  { id:"BK-002", customer:"Rohan Chatterjee", phone:"+91 98765 43211", email:"rohan@email.com",  service:"Hair Colouring",      category:"Hair",  date:"2025-03-18", time:"02:00 PM", status:"pending",   price:"₹3,500", notes:"" },
  { id:"BK-003", customer:"Priya Sharma",     phone:"+91 98765 43212", email:"priya@email.com",  service:"Facials & Skin Care", category:"Skin",  date:"2025-03-19", time:"10:00 AM", status:"completed", price:"₹2,500", notes:"Sensitive skin" },
  { id:"BK-004", customer:"Amit Singh",       phone:"+91 98765 43213", email:"amit@email.com",   service:"Haircut & Styling",   category:"Hair",  date:"2025-03-19", time:"04:30 PM", status:"cancelled", price:"₹1,200", notes:"" },
  { id:"BK-005", customer:"Neha Roy",         phone:"+91 98765 43214", email:"neha@email.com",   service:"Keratin Treatment",   category:"Hair",  date:"2025-03-20", time:"12:00 PM", status:"confirmed", price:"₹4,500", notes:"Long hair" },
  { id:"BK-006", customer:"Debashish Pal",    phone:"+91 98765 43215", email:"deb@email.com",    service:"Nail Art",            category:"Nails", date:"2025-03-21", time:"03:00 PM", status:"pending",   price:"₹800",   notes:"" },
];


/* ─── small reusable pieces ──────────────────────────────────────── */
const Badge = ({ status }: { status: BookingStatus }) => {
  const map = {
    confirmed: { bg:"rgba(34,197,94,0.12)",  text:"rgba(134,239,172,0.9)", Icon:CheckCircle2 },
    pending:   { bg:"rgba(234,179,8,0.12)",   text:"rgba(253,224,71,0.9)",  Icon:Clock },
    completed: { bg:"rgba(59,130,246,0.12)",  text:"rgba(147,197,253,0.9)", Icon:CheckCircle2 },
    cancelled: { bg:"rgba(239,68,68,0.12)",   text:"rgba(252,165,165,0.9)", Icon:XCircle },
  } as const;
  const { bg, text, Icon } = map[status];
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider whitespace-nowrap"
      style={{ background:bg, color:text, border:`1px solid ${text.replace("0.9","0.2")}` }}>
      <Icon className="w-2.5 h-2.5 shrink-0"/>{status}
    </span>
  );
};

const CatIcon = ({ cat }: { cat: string }) => {
  const M: Record<string, React.ElementType> = { Hair:Scissors, Nails:Sparkles, Skin:Wand2 };
  const Icon = M[cat] ?? Star;
  return <Icon className="w-4 h-4" style={{ color:`${G}0.8)` }}/>;
};

/* ─── bottom-sheet modal ─────────────────────────────────────────── */
const Modal = ({ open, onClose, title, children }: {
  open:boolean; onClose:()=>void; title:string; children:React.ReactNode;
}) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
          className="fixed inset-0 z-[300] bg-black/75 backdrop-blur-sm" onClick={onClose}/>
        <motion.div
          initial={{y:"100%"}} animate={{y:0}} exit={{y:"100%"}}
          transition={{type:"spring", damping:32, stiffness:280}}
          className="fixed inset-x-0 bottom-0 z-[310] sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-4 sm:pointer-events-none">
          <div className="w-full sm:max-w-lg sm:pointer-events-auto max-h-[92dvh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
            style={{ background:"#0D0B08", border:`1px solid ${G}0.2)`, boxShadow:"0 -20px 60px rgba(0,0,0,0.8)" }}>
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full" style={{ background:`${G}0.28)` }}/>
            </div>
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor:`${G}0.12)` }}>
              <h3 className="font-serif font-bold text-base" style={{ color:`${G}0.9)` }}>{title}</h3>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" style={{ color:`${C}0.4)` }}>
                <X className="w-5 h-5"/>
              </button>
            </div>
            <div className="p-5 pb-10">{children}</div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const Field = ({ label, error, children }: { label:string; error?:string; children:React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[9px] uppercase tracking-[0.22em] font-bold" style={{ color:`${G}0.55)` }}>{label}</label>
    {children}
    {error && <p className="text-xs flex items-center gap-1" style={{ color:"rgba(252,165,165,0.9)" }}><AlertCircle className="w-3 h-3"/>{error}</p>}
  </div>
);

const iCls = "w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder:opacity-20";
const iSty = (err?: string): React.CSSProperties => ({
  background:"rgba(255,255,255,0.04)",
  border:`1px solid ${err ? "rgba(239,68,68,0.45)" : G+"0.18)"}`,
  color:`${C}0.8)`,
});

const GoldBtn = ({ children, onClick, cls="", disabled=false }: { children:React.ReactNode; onClick?:()=>void; cls?:string; disabled?:boolean }) => (
  <button onClick={onClick} disabled={disabled}
    className={`flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 active:scale-95 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${cls}`}
    style={{ background:"linear-gradient(135deg,#C9A84C,#E8D5A3 50%,#C9A84C)", backgroundSize:"200% auto", color:"#080604" }}>
    {children}
  </button>
);

const ConfirmDelete = ({ open, onClose, onConfirm, label }: {
  open:boolean; onClose:()=>void; onConfirm:()=>void; label:string;
}) => (
  <Modal open={open} onClose={onClose} title={`Delete ${label}`}>
    <p className="text-sm mb-5" style={{ color:`${C}0.55)` }}>This action cannot be undone. Continue?</p>
    <div className="flex gap-3">
      <button onClick={onConfirm} className="flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-wider"
        style={{ background:"rgba(239,68,68,0.15)", color:"rgba(252,165,165,0.9)", border:"1px solid rgba(239,68,68,0.25)" }}>Delete</button>
      <button onClick={onClose} className="flex-1 py-3 rounded-xl text-sm font-semibold"
        style={{ border:`1px solid ${G}0.18)`, color:`${C}0.45)` }}>Cancel</button>
    </div>
  </Modal>
);

/* ═══════════════════════════════════════════════════════════════════
   OVERVIEW PANEL
══════════════════════════════════════════════════════════════════════ */
const OverviewPanel = ({ bookings, services }: { bookings:Booking[]; services:Service[] }) => {
  const pr = useReducedMotion();
  const stats = [
    { label:"Bookings",  value:bookings.length,                                   Icon:Calendar,     col:`${G}0.85)` },
    { label:"Services",  value:services.length,                                   Icon:Scissors,     col:"rgba(147,197,253,0.85)" },
    { label:"Pending",   value:bookings.filter(b=>b.status==="pending").length,   Icon:Clock,        col:"rgba(253,224,71,0.85)" },
    { label:"Completed", value:bookings.filter(b=>b.status==="completed").length, Icon:CheckCircle2, col:"rgba(134,239,172,0.85)" },
  ];
  return (
    <div className="space-y-5">
      {/* 2×2 grid — always contained */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s,i) => (
          <motion.div key={s.label} initial={{opacity:0,y:pr?0:14}} animate={{opacity:1,y:0}}
            transition={{duration:0.4,delay:i*0.07,ease:EXPO}}
            className="rounded-2xl p-4 relative overflow-hidden"
            style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${G}0.1)` }}>
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full pointer-events-none"
              style={{ background:`radial-gradient(circle,${s.col.replace("0.85","0.1")} 0%,transparent 70%)` }}/>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
              style={{ background:s.col.replace("0.85","0.12") }}>
              <s.Icon className="w-4 h-4" style={{ color:s.col }}/>
            </div>
            <p className="text-2xl font-serif font-bold leading-none mb-1" style={{ color:`${C}0.9)` }}>{s.value}</p>
            <p className="text-[9px] uppercase tracking-widest" style={{ color:`${C}0.35)` }}>{s.label}</p>
          </motion.div>
        ))}
      </div>
      {/* recent list */}
      <motion.div initial={{opacity:0,y:pr?0:14}} animate={{opacity:1,y:0}}
        transition={{duration:0.5,delay:0.3,ease:EXPO}}
        className="rounded-2xl overflow-hidden" style={{ background:"rgba(255,255,255,0.02)", border:`1px solid ${G}0.1)` }}>
        <div className="px-4 py-4 border-b flex items-center justify-between" style={{ borderColor:`${G}0.1)` }}>
          <h3 className="font-serif font-bold text-sm" style={{ color:`${G}0.85)` }}>Recent Bookings</h3>
          <span className="text-[9px] uppercase tracking-widest" style={{ color:`${C}0.3)` }}>Latest 5</span>
        </div>
        <div className="divide-y" style={{ borderColor:`${G}0.06)` }}>
          {bookings.slice(0,5).map(b => (
            <div key={b.id} className="flex items-center gap-3 px-4 py-3.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background:`${G}0.1)` }}>
                <CatIcon cat={b.category}/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color:`${C}0.82)` }}>{b.customer}</p>
                <p className="text-[10px] truncate mt-0.5" style={{ color:`${C}0.35)` }}>{b.service} · {b.date}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-xs font-bold" style={{ color:`${G}0.75)` }}>{b.price}</span>
                <Badge status={b.status}/>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   BOOKINGS PANEL
══════════════════════════════════════════════════════════════════════ */
const BookingsPanel = ({ bookings, setBookings }: {
  bookings:Booking[]; setBookings:React.Dispatch<React.SetStateAction<Booking[]>>;
}) => {
  const pr = useReducedMotion();
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState<BookingStatus|"all">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem]   = useState<Booking|null>(null);
  const [deleteId, setDeleteId]   = useState<string|null>(null);
  const empty: Booking = { id:"", customer:"", phone:"", email:"", service:"", category:"Hair", date:"", time:"", status:"pending", price:"", notes:"" };
  const [form, setForm]     = useState<Booking>(empty);
  const [errors, setErrors] = useState<Partial<Booking>>({});

  const filtered = bookings.filter(b => {
    const q = search.toLowerCase();
    return (b.customer.toLowerCase().includes(q)||b.service.toLowerCase().includes(q))
        && (filter==="all"||b.status===filter);
  });

  const openEdit = (b:Booking) => { setForm({...b}); setEditItem(b); setErrors({}); setModalOpen(true); };
  const validate = () => {
    const e: Partial<Booking> = {};
    if (!form.customer.trim()) e.customer="Required";
    if (!form.phone.trim())    e.phone="Required";
    if (!form.date)            e.date="Required";
    if (!form.time.trim())     e.time="Required";
    setErrors(e); return Object.keys(e).length===0;
  };
  const save = async () => {
    if (!validate() || !editItem) return;
    const { error } = await supabase.from("bookings").update({
      customer_name: form.customer,
      phone: form.phone,
      email: form.email || null,
      preferred_date: form.date,
      preferred_time: form.time,
      status: form.status,
      message: form.notes || null
    }).eq("id", editItem.id);
    if (!error) {
      setBookings(p=>p.map(b=>b.id===editItem.id?form:b));
      setModalOpen(false);
    }
  };
  const cycleStatus = async (id:string) => {
    const b = bookings.find(x=>x.id===id); if (!b) return;
    const c: BookingStatus[] = ["pending","confirmed","completed","cancelled"];
    const nextSt = c[(c.indexOf(b.status)+1)%c.length];
    
    /* Optimistic UI update */
    setBookings(p=>p.map(x=>x.id===id?{...x,status:nextSt}:x));
    
    const { error } = await supabase.from("bookings").update({ status: nextSt }).eq("id", id);
    if (error) {
      /* Revert if failed */
      setBookings(p=>p.map(x=>x.id===id?{...x,status:b.status}:x));
      alert("Failed to update status");
    }
  };
  const deleteBooking = async (id: string) => {
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (!error) {
      setBookings(p=>p.filter(b=>b.id!==id));
    } else {
      alert("Failed to delete booking");
    }
    setDeleteId(null);
  };

  return (
    <div className="space-y-4">
      {/* toolbar */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color:`${C}0.3)` }}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search bookings…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${G}0.15)`, color:`${C}0.75)` }}/>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4">
          {(["all","pending","confirmed","completed","cancelled"] as const).map(s => (
            <button key={s} onClick={()=>setFilter(s)}
              className="shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all"
              style={{ background:filter===s?"#C9A84C":`${G}0.07)`, color:filter===s?"#080604":`${G}0.6)`, border:`1px solid ${filter===s?"#C9A84C":G+"0.15)"}` }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* card list */}
      <div className="space-y-3">
        {filtered.length===0 && (
          <div className="py-12 text-center text-sm italic rounded-2xl" style={{ color:`${C}0.3)`, border:`1px solid ${G}0.08)` }}>
            No bookings found
          </div>
        )}
        {filtered.map((b,i) => (
          <motion.div key={b.id} initial={{opacity:0,y:pr?0:10}} animate={{opacity:1,y:0}}
            transition={{duration:0.3,delay:i*0.04,ease:EXPO}}
            className="rounded-2xl p-4 space-y-3"
            style={{ background:"rgba(255,255,255,0.025)", border:`1px solid ${G}0.1)` }}>
            {/* name + actions */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background:`${G}0.1)` }}>
                  <CatIcon cat={b.category}/>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold truncate" style={{ color:`${C}0.87)` }}>{b.customer}</p>
                  <p className="text-[10px] truncate" style={{ color:`${C}0.4)` }}>{b.phone} {b.email ? `· ${b.email}` : ''}</p>
                </div>
              </div>
              <div className="flex shrink-0">
                <button onClick={()=>openEdit(b)} className="p-2 rounded-lg hover:bg-white/5 transition-colors" style={{ color:`${C}0.4)` }}><Pencil className="w-4 h-4"/></button>
                <button onClick={()=>setDeleteId(b.id)} className="p-2 rounded-lg hover:bg-red-500/10 transition-colors" style={{ color:"rgba(252,165,165,0.45)" }}><Trash2 className="w-4 h-4"/></button>
              </div>
            </div>
            {/* service + date grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl px-3 py-2.5" style={{ background:"rgba(255,255,255,0.02)", border:`1px solid ${G}0.07)` }}>
                <p className="text-[8px] uppercase tracking-widest mb-0.5" style={{ color:`${G}0.45)` }}>Service</p>
                <p className="text-xs font-medium truncate" style={{ color:`${C}0.72)` }} title={b.service}>{b.service}</p>
              </div>
              <div className="rounded-xl px-3 py-2.5" style={{ background:"rgba(255,255,255,0.02)", border:`1px solid ${G}0.07)` }}>
                <p className="text-[8px] uppercase tracking-widest mb-0.5" style={{ color:`${G}0.45)` }}>Date & Time</p>
                <p className="text-xs font-medium" style={{ color:`${C}0.72)` }}>{b.date}</p>
                <p className="text-[9px]" style={{ color:`${G}0.55)` }}>{b.time}</p>
              </div>
            </div>
            {/* status + price */}
            <div className="flex items-center justify-between pt-1 border-t" style={{ borderColor:`${G}0.07)` }}>
              <div>
                <p className="text-[7px] uppercase tracking-widest mb-1" style={{ color:`${C}0.25)` }}>Tap to cycle</p>
                <button onClick={()=>cycleStatus(b.id)}><Badge status={b.status}/></button>
              </div>
              <span className="text-base font-bold font-serif" style={{ color:`${G}0.8)` }}>{b.price}</span>
            </div>
            {b.notes && (
              <div className="p-2.5 rounded-lg mt-2" style={{ background: "rgba(201,168,76,0.05)" }}>
                <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color:`${G}0.5)` }}>Client Notes / Message</p>
                <p className="text-xs" style={{ color:`${C}0.8)` }}>{b.notes}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <p className="text-center text-[9px] py-1 uppercase tracking-widest" style={{ color:`${C}0.22)` }}>
        {filtered.length} of {bookings.length} bookings shown
      </p>

      <Modal open={modalOpen} onClose={()=>setModalOpen(false)} title={editItem?"Edit Booking":"New Booking"}>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2"><Field label="Customer Name *" error={errors.customer}>
            <input className={iCls} style={iSty(errors.customer)} placeholder="Full name" value={form.customer} onChange={e=>setForm(p=>({...p,customer:e.target.value}))}/>
          </Field></div>
          <Field label="Phone *" error={errors.phone}>
            <input className={iCls} style={iSty(errors.phone)} placeholder="+91 98765 43210" value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))}/>
          </Field>
          <Field label="Email">
            <input className={iCls} style={iSty()} placeholder="email@example.com" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))}/>
          </Field>
          <div className="col-span-2"><Field label="Service *" error={errors.service}>
            <input className={iCls} style={iSty(errors.service)} placeholder="e.g. Hair Colouring" value={form.service} onChange={e=>setForm(p=>({...p,service:e.target.value}))}/>
          </Field></div>
          <Field label="Category">
            <select className={iCls} style={iSty()} value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value as ServiceCategory}))}>
              {["Hair","Nails","Skin","Grooming"].map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Status">
            <select className={iCls} style={iSty()} value={form.status} onChange={e=>setForm(p=>({...p,status:e.target.value as BookingStatus}))}>
              {["pending","confirmed","completed","cancelled"].map(s=><option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Date *" error={errors.date}>
            <input type="date" className={iCls} style={iSty(errors.date)} value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))}/>
          </Field>
          <Field label="Time *" error={errors.time}>
            <input className={iCls} style={iSty(errors.time)} placeholder="11:00 AM" value={form.time} onChange={e=>setForm(p=>({...p,time:e.target.value}))}/>
          </Field>
          <Field label="Price *" error={errors.price}>
            <input className={iCls} style={iSty(errors.price)} placeholder="₹1,500" value={form.price} onChange={e=>setForm(p=>({...p,price:e.target.value}))}/>
          </Field>
          <Field label="Notes">
            <input className={iCls} style={iSty()} placeholder="Optional" value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))}/>
          </Field>
        </div>
        <div className="flex gap-3 mt-5">
          <GoldBtn onClick={save} cls="flex-1 py-3"><Save className="w-4 h-4"/>{editItem?"Save Changes":"Create Booking"}</GoldBtn>
          <button onClick={()=>setModalOpen(false)} className="px-5 py-3 rounded-xl text-sm font-semibold" style={{border:`1px solid ${G}0.2)`,color:`${C}0.45)`}}>Cancel</button>
        </div>
      </Modal>
      <ConfirmDelete open={!!deleteId} onClose={()=>setDeleteId(null)} label="Booking"
        onConfirm={()=>deleteId&&deleteBooking(deleteId)}/>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SERVICES PANEL
══════════════════════════════════════════════════════════════════════ */
const ServicesPanel = ({ services, setServices }: {
  services:Service[]; setServices:React.Dispatch<React.SetStateAction<Service[]>>;
}) => {
  const pr = useReducedMotion();
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem,  setEditItem]  = useState<Service|null>(null);
  const [deleteId,  setDeleteId]  = useState<string|null>(null);
  const [imgFile,   setImgFile]   = useState<File|null>(null);
  const [uploading, setUploading] = useState(false);
  const empty: Service = { id:"", title:"", description:"", category:"Hair", price:"", duration:"", image:"", featured:false };
  const [form, setForm]     = useState<Service>(empty);
  const [errors, setErrors] = useState<Partial<Service>>({});

  const openAdd  = () => { setForm(empty); setEditItem(null); setImgFile(null); setErrors({}); setModalOpen(true); };
  const openEdit = (s:Service) => { setForm({...s}); setEditItem(s); setImgFile(null); setErrors({}); setModalOpen(true); };
  const validate = () => {
    const e: Partial<Service> = {};
    if (!form.title.trim())       e.title="Required";
    if (!form.description.trim()) e.description="Required";
    if (!form.price.trim())       e.price="Required";
    if (!form.duration.trim())    e.duration="Required";
    setErrors(e); return Object.keys(e).length===0;
  };
  const save = async () => {
    if (!validate()) return;
    setUploading(true);
    let imageUrl = form.image;
    
    if (imgFile) {
      const ext = imgFile.name.split('.').pop();
      const fname = `${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from('service-images').upload(fname, imgFile);
      if (!upErr) {
        const { data: pubData } = supabase.storage.from('service-images').getPublicUrl(fname);
        imageUrl = pubData.publicUrl;
      }
    }

    const payload = {
      name: form.title,
      slug: slugify(form.title),
      category: form.category,
      description: form.description,
      price_start: parseInt(form.price.replace(/[^0-9]/g, "")) || 0,
      duration: form.duration,
      image_url: imageUrl,
      is_active: form.featured
    };

    if (editItem) {
      const { error } = await supabase.from('services').update(payload).eq('id', editItem.id);
      if (!error) setServices(p=>p.map(s=>s.id===editItem.id?{...form, image:imageUrl}:s));
    } else {
      const { data, error } = await supabase.from('services').insert([payload]).select().single();
      if (!error && data) setServices(p=>[...p, mapDbService(data)]);
    }
    
    setUploading(false);
    setModalOpen(false);
  };
  
  const toggleActive = async (id:string, current:boolean) => {
    /* Optimistic */
    setServices(p=>p.map(s=>s.id===id?{...s,featured:!current}:s));
    const { error } = await supabase.from('services').update({ is_active: !current }).eq('id', id);
    if (error) setServices(p=>p.map(s=>s.id===id?{...s,featured:current}:s));
  };
  
  const deleteService = async (id:string) => {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (!error) setServices(p=>p.filter(s=>s.id!==id));
    setDeleteId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <GoldBtn onClick={openAdd} cls="px-4 py-2.5"><Plus className="w-4 h-4"/>Add Service</GoldBtn>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map((s,i) => (
          <motion.div key={s.id} initial={{opacity:0,y:pr?0:12}} animate={{opacity:1,y:0}}
            transition={{duration:0.4,delay:i*0.06,ease:EXPO}}
            className="rounded-2xl overflow-hidden group"
            style={{ background:"rgba(255,255,255,0.025)", border:`1px solid ${G}0.1)` }}>
            <div className="relative aspect-video overflow-hidden">
              {s.image
                ? <Image src={s.image} alt={s.title} fill sizes="(max-width:640px) 100vw,50vw" className="object-cover group-hover:scale-105 transition-transform duration-500"/>
                : <div className="absolute inset-0 flex items-center justify-center bg-white/5"><Scissors className="w-8 h-8 opacity-20"/></div>}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080604] via-transparent to-transparent opacity-80"/>
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={()=>openEdit(s)} className="p-2 rounded-lg bg-white/10 backdrop-blur hover:bg-white/20 transition-colors"><Pencil className="w-4 h-4 text-white"/></button>
                <button onClick={()=>setDeleteId(s.id)} className="p-2 rounded-lg bg-red-500/20 backdrop-blur hover:bg-red-500/40 transition-colors"><Trash2 className="w-4 h-4 text-red-200"/></button>
              </div>
              <button onClick={()=>toggleActive(s.id, s.featured)}
                className="absolute top-3 left-3 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur transition-colors"
                style={s.featured?{background:"rgba(201,168,76,0.9)",color:"#080604"}:{background:"rgba(255,255,255,0.1)",color:"#fff"}}>
                {s.featured?"Active":"Hidden"}
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="min-w-0">
                  <h3 className="font-serif font-bold text-sm truncate" style={{color:`${C}0.85)`}}>{s.title}</h3>
                  <span className="text-[9px] uppercase tracking-widest" style={{color:`${G}0.55)`}}>{s.category} · {s.duration}</span>
                </div>
                <span className="text-sm font-bold shrink-0" style={{color:`${G}0.8)`}}>{s.price}</span>
              </div>
              <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{color:`${C}0.38)`}}>{s.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <Modal open={modalOpen} onClose={()=>setModalOpen(false)} title={editItem?"Edit Service":"New Service"}>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2"><Field label="Title *" error={errors.title}>
            <input className={iCls} style={iSty(errors.title)} placeholder="e.g. Keratin Treatment" value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))}/>
          </Field></div>
          <Field label="Category">
            <select className={iCls} style={iSty()} value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value as ServiceCategory}))}>
              {["Hair","Nails","Skin","Grooming"].map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Price *" error={errors.price}>
            <input className={iCls} style={iSty(errors.price)} placeholder="From ₹1,500" value={form.price} onChange={e=>setForm(p=>({...p,price:e.target.value}))}/>
          </Field>
          <Field label="Duration *" error={errors.duration}>
            <input className={iCls} style={iSty(errors.duration)} placeholder="60 min" value={form.duration} onChange={e=>setForm(p=>({...p,duration:e.target.value}))}/>
          </Field>
          <Field label="Image" error={errors.image}>
            <div className="flex gap-2 items-center">
              <input type="file" accept="image/*" onChange={e=>setImgFile(e.target.files?.[0]||null)}
                className="hidden" id="service-img-upload"/>
              <label htmlFor="service-img-upload" className="flex items-center gap-2 cursor-pointer whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-semibold" style={{border:`1px solid ${G}0.2)`,color:`${C}0.75)`}}>
                <Upload className="w-4 h-4" /> Upload
              </label>
              <input className={iCls} style={iSty(errors.image)} placeholder="Or paste image URL" value={form.image} onChange={e=>setForm(p=>({...p,image:e.target.value}))}/>
            </div>
            {imgFile && <span className="text-xs text-soft-gold mt-1 pl-1">Selected: {imgFile.name}</span>}
          </Field>
          <div className="col-span-2"><Field label="Description *" error={errors.description}>
            <textarea rows={3} className={`${iCls} resize-none`} style={iSty(errors.description)} placeholder="Describe the service…" value={form.description} onChange={e=>setForm(p=>({...p,description:e.target.value}))}/>
          </Field></div>
          <div className="col-span-2 flex items-center gap-3">
            <button type="button" onClick={()=>setForm(p=>({...p,featured:!p.featured}))}>
              {form.featured?<ToggleRight className="w-7 h-7" style={{color:"#C9A84C"}}/>:<ToggleLeft className="w-7 h-7" style={{color:`${C}0.3)`}}/>}
            </button>
            <span className="text-sm" style={{color:`${C}0.55)`}}>Featured on website</span>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <GoldBtn onClick={save} cls="flex-1 py-3" disabled={uploading}>
            {uploading ? <RefreshCw className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4"/>}
            {uploading ? "Saving..." : editItem ? "Save Changes" : "Add Service"}
          </GoldBtn>
          <button onClick={()=>setModalOpen(false)} disabled={uploading} className="px-5 py-3 rounded-xl text-sm font-semibold" style={{border:`1px solid ${G}0.2)`,color:`${C}0.45)`}}>Cancel</button>
        </div>
      </Modal>
      <ConfirmDelete open={!!deleteId} onClose={()=>setDeleteId(null)} label="Service"
        onConfirm={()=>deleteId&&deleteService(deleteId)}/>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   GALLERY PANEL
══════════════════════════════════════════════════════════════════════ */
const GalleryPanel = ({ gallery, setGallery }: {
  gallery:GalleryItem[]; setGallery:React.Dispatch<React.SetStateAction<GalleryItem[]>>;
}) => {
  const pr = useReducedMotion();
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem,  setEditItem]  = useState<GalleryItem|null>(null);
  const [deleteId,  setDeleteId]  = useState<string|null>(null);
  const [imgFile,   setImgFile]   = useState<File|null>(null);
  const [uploading, setUploading] = useState(false);
  const empty: GalleryItem = { id:"", url:"", alt:"", category:"Hair", featured:false };
  const [form, setForm]     = useState<GalleryItem>(empty);
  const [errors, setErrors] = useState<Partial<GalleryItem>>({});

  const openAdd  = () => { setForm(empty); setEditItem(null); setImgFile(null); setErrors({}); setModalOpen(true); };
  const openEdit = (g:GalleryItem) => { setForm({...g}); setEditItem(g); setImgFile(null); setErrors({}); setModalOpen(true); };
  const validate = () => {
    const e: Partial<GalleryItem> = {};
    if (!form.url.trim()) e.url="URL required";
    if (!form.alt.trim()) e.alt="Caption required";
    setErrors(e); return Object.keys(e).length===0;
  };
  const save = async () => {
    if (!validate()) return;
    setUploading(true);
    let imageUrl = form.url;
    
    if (imgFile) {
      const ext = imgFile.name.split('.').pop();
      const fname = `${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from('gallery-images').upload(fname, imgFile);
      if (!upErr) {
        const { data: pubData } = supabase.storage.from('gallery-images').getPublicUrl(fname);
        imageUrl = pubData.publicUrl;
      }
    }

    const payload = {
      title: form.alt,
      category: form.category,
      image_url: imageUrl,
      is_featured: form.featured,
      display_order: gallery.length
    };

    if (editItem) {
      const { error } = await supabase.from('gallery_items').update({
        title: form.alt, category: form.category, image_url: imageUrl, is_featured: form.featured
      }).eq('id', editItem.id);
      if (!error) setGallery(p=>p.map(x=>x.id===editItem.id?{...form, url:imageUrl}:x));
    } else {
      const { data, error } = await supabase.from('gallery_items').insert([payload]).select().single();
      if (!error && data) setGallery(p=>[...p, mapDbGallery(data)]);
    }
    setUploading(false);
    setModalOpen(false);
  };
  
  const toggleFeatured = async (id:string, current:boolean) => {
    setGallery(p=>p.map(x=>x.id===id?{...x,featured:!current}:x));
    const { error } = await supabase.from('gallery_items').update({ is_featured: !current }).eq('id', id);
    if (error) setGallery(p=>p.map(x=>x.id===id?{...x,featured:current}:x));
  };
  
  const deleteGalleryItem = async (id:string) => {
    const { error } = await supabase.from('gallery_items').delete().eq('id', id);
    if (!error) setGallery(p=>p.filter(x=>x.id!==id));
    setDeleteId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs" style={{color:`${C}0.38)`}}>{gallery.length} images · {gallery.filter(g=>g.featured).length} featured</p>
        <GoldBtn onClick={openAdd} cls="px-4 py-2.5"><Plus className="w-4 h-4"/>Add</GoldBtn>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {gallery.map((g,i) => (
          <motion.div key={g.id} initial={{opacity:0,scale:pr?1:0.94}} animate={{opacity:1,scale:1}}
            transition={{duration:0.35,delay:i*0.05,ease:EXPO}}
            className="relative aspect-square rounded-xl overflow-hidden group" style={{border:`1px solid ${G}0.1)`}}>
            <Image src={g.url} alt={g.alt} fill sizes="(max-width:640px) 50vw,33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"/>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1.5 p-2"
              style={{background:"rgba(8,6,4,0.8)"}}>
              <p className="text-[9px] text-center font-medium line-clamp-2 px-1" style={{color:`${C}0.8)`}}>{g.alt}</p>
              <span className="text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full" style={{background:`${G}0.2)`,color:`${G}0.8)`}}>{g.category}</span>
              <div className="flex gap-1.5 mt-1">
                <button onClick={()=>setGallery(p=>p.map(gi=>gi.id===g.id?{...gi,featured:!gi.featured}:gi))}
                  className="p-1.5 rounded-lg" style={{background:`${G}0.15)`,color:g.featured?"#C9A84C":`${C}0.5)`}}>
                  <Star className="w-3.5 h-3.5" fill={g.featured?"#C9A84C":"none"}/>
                </button>
                <button onClick={()=>openEdit(g)} className="p-1.5 rounded-lg" style={{background:"rgba(255,255,255,0.08)",color:`${C}0.7)`}}>
                  <Pencil className="w-3.5 h-3.5"/>
                </button>
                <button onClick={()=>setDeleteId(g.id)} className="p-1.5 rounded-lg" style={{background:"rgba(239,68,68,0.15)",color:"rgba(252,165,165,0.8)"}}>
                  <Trash2 className="w-3.5 h-3.5"/>
                </button>
              </div>
            </div>
            {g.featured && (
              <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center" style={{background:"#C9A84C"}}>
                <Star className="w-2.5 h-2.5 text-[#080604]" fill="#080604"/>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <Modal open={modalOpen} onClose={()=>setModalOpen(false)} title={editItem?"Edit Image":"Add Image"}>
        <div className="space-y-3">
          <Field label="Image" error={errors.url}>
            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
              <input type="file" accept="image/*" onChange={e=>setImgFile(e.target.files?.[0]||null)}
                className="hidden" id="gallery-img-upload"/>
              <label htmlFor="gallery-img-upload" className="flex items-center gap-2 cursor-pointer whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-semibold shrink-0" style={{border:`1px solid rgba(201,168,76,0.2)`,color:`rgba(237,224,196,0.75)`}}>
                <Upload className="w-4 h-4" /> Upload
              </label>
              <input className={iCls} style={iSty(errors.url)} placeholder="Or paste image URL" value={form.url} onChange={e=>setForm(p=>({...p,url:e.target.value}))}/>
            </div>
            {imgFile && <span className="text-xs mt-1 pl-1" style={{color:"rgba(201,168,76,0.8)"}}>Selected: {imgFile.name}</span>}
          </Field>
          {form.url && !imgFile && (
            <div className="relative aspect-video rounded-xl overflow-hidden" style={{border:`1px solid ${G}0.1)`}}>
              <Image src={form.url} alt="preview" fill className="object-cover"/>
            </div>
          )}
          <Field label="Caption *" error={errors.alt}>
            <input className={iCls} style={iSty(errors.alt)} placeholder="Describe the image…" value={form.alt} onChange={e=>setForm(p=>({...p,alt:e.target.value}))}/>
          </Field>
          <Field label="Category">
            <select className={iCls} style={iSty()} value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))}>
              {["Hair","Nails","Skin","Grooming","Salon"].map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <div className="flex items-center gap-3">
            <button type="button" onClick={()=>setForm(p=>({...p,featured:!p.featured}))}>
              {form.featured?<ToggleRight className="w-7 h-7" style={{color:"#C9A84C"}}/>:<ToggleLeft className="w-7 h-7" style={{color:`${C}0.3)`}}/>}
            </button>
            <span className="text-sm" style={{color:`${C}0.55)`}}>Feature on homepage</span>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <GoldBtn onClick={save} cls="flex-1 py-3"><Save className="w-4 h-4"/>{editItem?"Save":"Add Image"}</GoldBtn>
          <button onClick={()=>setModalOpen(false)} className="px-5 py-3 rounded-xl text-sm font-semibold" style={{border:`1px solid ${G}0.2)`,color:`${C}0.45)`}}>Cancel</button>
        </div>
      </Modal>
      <ConfirmDelete open={!!deleteId} onClose={()=>setDeleteId(null)} label="Image"
        onConfirm={()=>deleteId&&deleteGalleryItem(deleteId)}/>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   CONTENT PANEL
══════════════════════════════════════════════════════════════════════ */
const ContentPanel = ({ content, setContent, testimonials, setTestimonials }: {
  content:ContentSection[]; setContent:React.Dispatch<React.SetStateAction<ContentSection[]>>;
  testimonials:Testimonial[]; setTestimonials:React.Dispatch<React.SetStateAction<Testimonial[]>>;
}) => {
  const pr = useReducedMotion();
  const [active, setActive] = useState<ContentSection>(content[0]);
  const [saved,  setSaved]  = useState(false);
  const [tOpen,  setTOpen]  = useState(false);
  const [editT,  setEditT]  = useState<Testimonial|null>(null);
  const [tDelId, setTDelId] = useState<string|null>(null);
  const emptyT: Testimonial = { id:"", name:"", rating:5, text:"", service:"", date:"" };
  const [tForm, setTForm]   = useState<Testimonial>(emptyT);

  const updateField = (f: keyof ContentSection, v: string) => {
    const u = {...active,[f]:v};
    setActive(u);
    setContent(p=>p.map(c=>c.id===u.id?u:c));
  };

  const saveSection = async () => {
    setSaved(true);
    if (active.id === "hero") {
      await supabase.from("hero_sections").update({
        title: active.title,
        subtitle: active.subtitle,
        description: active.body
      }).neq("id", "00000000-0000-0000-0000-000000000000"); // update first row
    } else if (active.id === "about") {
      await supabase.from("about_content").update({
        owner_name: active.title,
        owner_title: active.subtitle,
        owner_bio: active.body
      }).neq("id", "00000000-0000-0000-0000-000000000000");
    }
    setTimeout(()=>setSaved(false),2000);
  };

  const openAddT  = () => { setTForm(emptyT); setEditT(null); setTOpen(true); };
  const openEditT = (t:Testimonial) => { setTForm({...t}); setEditT(t); setTOpen(true); };
  
  const saveT = async () => {
    if (!tForm.name.trim()||!tForm.text.trim()) return;
    
    const payload = {
      name: tForm.name,
      rating: tForm.rating,
      review_text: tForm.text,
      service: tForm.service,
      source: "admin",
      status: "approved"
    };

    if (editT) {
      const { error } = await supabase.from("reviews").update(payload).eq("id", editT.id);
      if (!error) setTestimonials(p=>p.map(t=>t.id===editT.id?tForm:t));
    } else {
      const { data, error } = await supabase.from("reviews").insert([payload]).select().single();
      if (!error && data) setTestimonials(p=>[mapDbReview(data), ...p]);
    }
    setTOpen(false);
  };
  
  const deleteT = async (id: string) => {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (!error) setTestimonials(p=>p.filter(t=>t.id!==id));
    setTDelId(null);
  };

  return (
    <div className="space-y-6">
      {/* section editor */}
      <motion.div initial={{opacity:0,y:pr?0:14}} animate={{opacity:1,y:0}}
        transition={{duration:0.5,ease:EXPO}}
        className="rounded-2xl overflow-hidden" style={{background:"rgba(255,255,255,0.02)",border:`1px solid ${G}0.12)`}}>
        <div className="px-4 py-4 border-b" style={{borderColor:`${G}0.1)`}}>
          <h3 className="font-serif font-bold text-sm" style={{color:`${G}0.85)`}}>Page Content</h3>
          <p className="text-[10px] mt-0.5" style={{color:`${C}0.35)`}}>Edit text shown on public pages</p>
        </div>
        {/* section tabs */}
        <div className="flex gap-2 overflow-x-auto p-3 border-b [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{borderColor:`${G}0.08)`}}>
          {content.map(c=>(
            <button key={c.id} onClick={()=>setActive(c)}
              className="shrink-0 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
              style={{background:active.id===c.id?`${G}0.14)`:"transparent",color:active.id===c.id?"#C9A84C":`${C}0.45)`,border:`1px solid ${active.id===c.id?G+"0.28)":"transparent"}`}}>
              {c.section}
            </button>
          ))}
        </div>
        <div className="p-4 space-y-3">
          <Field label="Subtitle / Label">
            <input className={iCls} style={iSty()} value={active.subtitle} onChange={e=>updateField("subtitle",e.target.value)}/>
          </Field>
          <Field label="Main Heading">
            <input className={iCls} style={iSty()} value={active.title} onChange={e=>updateField("title",e.target.value)}/>
          </Field>
          <Field label="Body Text">
            <textarea rows={4} className={`${iCls} resize-none`} style={iSty()} value={active.body} onChange={e=>updateField("body",e.target.value)}/>
          </Field>
          <button disabled={active.id==="services"}
            onClick={saveSection}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            style={saved
              ?{background:"rgba(34,197,94,0.15)",color:"rgba(134,239,172,0.9)",border:"1px solid rgba(34,197,94,0.3)"}
              :{background:"linear-gradient(135deg,#C9A84C,#E8D5A3 50%,#C9A84C)",backgroundSize:"200% auto",color:"#080604"}}>
            {saved?<><CheckCircle2 className="w-4 h-4"/>Saved!</>:<><Save className="w-4 h-4"/>Save Section</>}
          </button>
        </div>
      </motion.div>

      {/* testimonials */}
      <motion.div initial={{opacity:0,y:pr?0:14}} animate={{opacity:1,y:0}}
        transition={{duration:0.5,delay:0.15,ease:EXPO}}
        className="rounded-2xl overflow-hidden" style={{background:"rgba(255,255,255,0.02)",border:`1px solid ${G}0.12)`}}>
        <div className="px-4 py-4 border-b flex items-center justify-between" style={{borderColor:`${G}0.1)`}}>
          <div>
            <h3 className="font-serif font-bold text-sm" style={{color:`${G}0.85)`}}>Testimonials</h3>
            <p className="text-[10px] mt-0.5" style={{color:`${C}0.35)`}}>Client reviews on website</p>
          </div>
          <GoldBtn onClick={openAddT} cls="px-3 py-2"><Plus className="w-3.5 h-3.5"/>Add</GoldBtn>
        </div>
        <div className="divide-y" style={{borderColor:`${G}0.06)`}}>
          {testimonials.map(t=>(
            <div key={t.id} className="flex items-start gap-3 px-4 py-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
                style={{background:`${G}0.12)`,color:`${G}0.8)`}}>{t.name.charAt(0)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <p className="text-sm font-bold" style={{color:`${C}0.8)`}}>{t.name}</p>
                  <div className="flex">{Array.from({length:5}).map((_,si)=>(
                    <Star key={si} className="w-3 h-3" style={{color:si<t.rating?"#C9A84C":`${C}0.2)`}} fill={si<t.rating?"#C9A84C":"none"}/>
                  ))}</div>
                </div>
                <p className="text-xs leading-relaxed line-clamp-2 italic" style={{color:`${C}0.42)`}}>"{t.text}"</p>
                <span className="text-[9px] uppercase tracking-widest mt-1 inline-block" style={{color:`${G}0.45)`}}>{t.service}</span>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={()=>openEditT(t)} className="p-1.5 rounded-lg hover:bg-white/5" style={{color:`${C}0.35)`}}><Pencil className="w-3.5 h-3.5"/></button>
                <button onClick={()=>setTDelId(t.id)} className="p-1.5 rounded-lg hover:bg-red-500/10" style={{color:"rgba(252,165,165,0.35)"}}><Trash2 className="w-3.5 h-3.5"/></button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <Modal open={tOpen} onClose={()=>setTOpen(false)} title={editT?"Edit Review":"Add Review"}>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Client Name"><input className={iCls} style={iSty()} placeholder="Name" value={tForm.name} onChange={e=>setTForm(p=>({...p,name:e.target.value}))}/></Field>
            <Field label="Service"><input className={iCls} style={iSty()} placeholder="e.g. Nail Extensions" value={tForm.service} onChange={e=>setTForm(p=>({...p,service:e.target.value}))}/></Field>
          </div>
          <Field label="Rating">
            <div className="flex gap-2">{[1,2,3,4,5].map(n=>(
              <button key={n} type="button" onClick={()=>setTForm(p=>({...p,rating:n}))}>
                <Star className="w-7 h-7 transition-colors" style={{color:n<=tForm.rating?"#C9A84C":`${C}0.2)`}} fill={n<=tForm.rating?"#C9A84C":"none"}/>
              </button>
            ))}</div>
          </Field>
          <Field label="Review"><textarea rows={3} className={`${iCls} resize-none`} style={iSty()} placeholder="What did the client say?" value={tForm.text} onChange={e=>setTForm(p=>({...p,text:e.target.value}))}/></Field>
          <Field label="Date"><input type="date" className={iCls} style={iSty()} value={tForm.date} onChange={e=>setTForm(p=>({...p,date:e.target.value}))}/></Field>
        </div>
        <div className="flex gap-3 mt-5">
          <GoldBtn onClick={saveT} cls="flex-1 py-3"><Save className="w-4 h-4"/>{editT?"Save":"Add Review"}</GoldBtn>
          <button onClick={()=>setTOpen(false)} className="px-5 py-3 rounded-xl text-sm font-semibold" style={{border:`1px solid ${G}0.2)`,color:`${C}0.45)`}}>Cancel</button>
        </div>
      </Modal>
      <ConfirmDelete open={!!tDelId} onClose={()=>setTDelId(null)} label="Testimonial"
        onConfirm={()=>tDelId&&deleteT(tDelId)}/>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SETTINGS PANEL
══════════════════════════════════════════════════════════════════════ */
const SettingsPanel = ({ settings, setSettings }: {
  settings:SalonSettings; setSettings:React.Dispatch<React.SetStateAction<SalonSettings>>;
}) => {
  const pr = useReducedMotion();
  const [saved, setSaved] = useState(false);
  const [loc, setLoc]     = useState<SalonSettings>({...settings});

  const SF = ({ label, field, ph, type="text" }: { label:string; field:keyof SalonSettings; ph?:string; type?:string }) => (
    <Field label={label}>
      {type==="textarea"
        ? <textarea rows={3} className={`${iCls} resize-none`} style={iSty()} placeholder={ph} value={loc[field] as string} onChange={e=>setLoc(p=>({...p,[field]:e.target.value}))}/>
        : <input type={type} className={iCls} style={iSty()} placeholder={ph} value={loc[field] as string} onChange={e=>setLoc(p=>({...p,[field]:e.target.value}))}/>}
    </Field>
  );

  const Sec = ({ title, cols=2, children }: { title:string; cols?:number; children:React.ReactNode }) => (
    <motion.div initial={{opacity:0,y:pr?0:10}} animate={{opacity:1,y:0}} transition={{duration:0.4,ease:EXPO}}
      className="rounded-2xl overflow-hidden" style={{background:"rgba(255,255,255,0.02)",border:`1px solid ${G}0.1)`}}>
      <div className="px-4 py-3 border-b" style={{borderColor:`${G}0.08)`,background:"rgba(255,255,255,0.01)"}}>
        <h4 className="font-serif font-bold text-sm" style={{color:`${G}0.75)`}}>{title}</h4>
      </div>
      <div className={`p-4 grid grid-cols-1 ${cols===2?"sm:grid-cols-2":""} gap-3`}>{children}</div>
    </motion.div>
  );

  return (
    <div className="space-y-4">
      <Sec title="Salon Identity">
        <SF label="Salon Name"  field="name"      ph="Habibs Hair & Beauty"/>
        <SF label="Tagline"     field="tagline"    ph="Premier Luxury Salon"/>
        <SF label="Owner Name"  field="owner"      ph="Anamika"/>
        <SF label="Owner Title" field="ownerTitle" ph="Owner & Expert Stylist"/>
        <div className="sm:col-span-2"><SF label="Owner Bio" field="ownerBio" type="textarea"/></div>
      </Sec>
      <Sec title="Contact Details">
        <SF label="Phone"          field="phone"    ph="+91 33 4061 5078" type="tel"/>
        <SF label="WhatsApp"       field="whatsapp" ph="+919876543210"/>
        <SF label="Email"          field="email"    ph="info@habibssalon.com" type="email"/>
        <SF label="Opening Hours"  field="hours"    ph="11:00 AM – 8:30 PM"/>
        <div className="sm:col-span-2"><SF label="Full Address" field="address" type="textarea"/></div>
        <SF label="Location / City" field="location" ph="New Town, Kolkata"/>
      </Sec>
      <Sec title="Social Media">
        <SF label="Instagram URL" field="instagram" ph="https://instagram.com/…"/>
        <SF label="Facebook URL"  field="facebook"  ph="https://facebook.com/…"/>
      </Sec>
      <Sec title="Stats & Achievements">
        <SF label="Google Rating"    field="googleRating"  ph="4.3"/>
        <SF label="Total Reviews"    field="totalReviews"  ph="115"/>
        <SF label="Years Experience" field="yearsExp"      ph="15+"/>
        <SF label="Happy Clients"    field="happyClients"  ph="5000+"/>
      </Sec>
      <div className="flex gap-3 pb-4">
        <button onClick={async ()=>{
          setSaved(true);
          await supabase.from("site_settings").update({
            salon_name: loc.name,
            tagline: loc.tagline,
            phone: loc.phone,
            whatsapp: loc.whatsapp,
            email: loc.email,
            address: loc.address,
            city: loc.location,
            opening_hours: loc.hours,
            instagram_url: loc.instagram,
            facebook_url: loc.facebook,
            google_rating: loc.googleRating,
            total_reviews: loc.totalReviews,
            years_exp: loc.yearsExp,
            happy_clients: loc.happyClients
          }).neq("id", "00000000-0000-0000-0000-000000000000");
          setSettings(loc);
          setTimeout(()=>setSaved(false),2000);
        }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5 active:scale-95"
          style={saved
            ?{background:"rgba(34,197,94,0.15)",color:"rgba(134,239,172,0.9)",border:"1px solid rgba(34,197,94,0.3)"}
            :{background:"linear-gradient(135deg,#C9A84C,#E8D5A3 50%,#C9A84C)",backgroundSize:"200% auto",color:"#080604"}}>
          {saved?<><CheckCircle2 className="w-4 h-4"/>Saved!</>:<><Save className="w-4 h-4"/>Save All Settings</>}
        </button>
        <button onClick={()=>setLoc({...settings})} className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold"
          style={{border:`1px solid ${G}0.15)`,color:`${C}0.45)`}}>
          <RefreshCw className="w-4 h-4"/>Reset
        </button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   ADMIN SHELL
══════════════════════════════════════════════════════════════════════ */
const AdminPanel = () => {
  const pr = useReducedMotion();
  const [tab,          setTab]          = useState("overview");
  const [sidebarOpen,  setSidebarOpen]  = useState(false);
  const [notifOpen,    setNotifOpen]    = useState(false);
  const [bookings,     setBookings]     = useState<Booking[]>([]);
  const [services,     setServices]     = useState<Service[]>([]);
  const [gallery,      setGallery]      = useState<GalleryItem[]>([]);
  const [content,      setContent]      = useState<ContentSection[]>([
    {id:"hero",section:"Hero",title:"",subtitle:"",body:""},
    {id:"about",section:"About",title:"",subtitle:"",body:""},
    {id:"services",section:"Services",title:"PREMIUM Services",subtitle:"Our Expert Offerings",body:""},
  ]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [settings,     setSettings]     = useState<SalonSettings>(EMPTY_SETTINGS);
  const [heroId,       setHeroId]       = useState("");
  const [aboutId,      setAboutId]      = useState("");
  const [settingsId,   setSettingsId]   = useState("");
  const { logout } = useAdmin();

  /* ─── Load all data from Supabase ───────────────────────────────── */
  useEffect(() => {
    const load = async () => {
      const [svcR, galR, bkgR, revR, heroR, aboutR, stR] = await Promise.all([
        supabase.from("services").select("*").order("created_at"),
        supabase.from("gallery_items").select("*").order("display_order"),
        supabase.from("bookings").select("*, services(name,category,price_start)").order("created_at",{ascending:false}),
        supabase.from("reviews").select("*").eq("status","approved").order("created_at",{ascending:false}),
        supabase.from("hero_sections").select("*").limit(1).maybeSingle(),
        supabase.from("about_content").select("*").limit(1).maybeSingle(),
        supabase.from("site_settings").select("*").limit(1).maybeSingle(),
      ]);
      if (svcR.data)  setServices(svcR.data.map(mapDbService));
      if (galR.data)  setGallery(galR.data.map(mapDbGallery));
      if (bkgR.data)  setBookings(bkgR.data.map(mapDbBooking));
      if (revR.data)  setTestimonials(revR.data.map(mapDbReview));
      if (heroR.data) {
        setHeroId(heroR.data.id);
        setContent([
          {id:"hero",    section:"Hero",     title:heroR.data.title||"",          subtitle:heroR.data.subtitle||"",         body:heroR.data.description||""},
          {id:"about",   section:"About",    title:aboutR.data?.owner_name||"",   subtitle:aboutR.data?.owner_title||"",   body:aboutR.data?.owner_bio||""},
          {id:"services",section:"Services", title:"PREMIUM Services",             subtitle:"Our Expert Offerings",          body:""},
        ]);
      }
      if (aboutR.data) setAboutId(aboutR.data.id);
      if (stR.data) {
        setSettingsId(stR.data.id);
        setSettings({
          name:stR.data.salon_name||"", tagline:stR.data.tagline||"",
          phone:stR.data.phone||"", whatsapp:stR.data.whatsapp||"",
          email:stR.data.email||"", address:stR.data.address||"",
          location:stR.data.city||"", hours:stR.data.opening_hours||"",
          owner:aboutR.data?.owner_name||"", ownerTitle:aboutR.data?.owner_title||"",
          ownerBio:aboutR.data?.owner_bio||"",
          instagram:stR.data.instagram_url||"", facebook:stR.data.facebook_url||"",
          googleRating:stR.data.google_rating||"4.3", totalReviews:stR.data.total_reviews||"0",
          yearsExp:stR.data.years_exp||"15+", happyClients:stR.data.happy_clients||"5000+",
        });
      }
    };
    load();
    /* Realtime: refresh bookings on any change */
    const ch = supabase.channel("admin_bookings_rt")
      .on("postgres_changes",{event:"*",schema:"public",table:"bookings"},() => {
        supabase.from("bookings").select("*, services(name,category,price_start)").order("created_at",{ascending:false})
          .then(({data}) => { if (data) setBookings(data.map(mapDbBooking)); });
      }).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);


  const pending = bookings.filter(b=>b.status==="pending").length;

  const navItems = [
    { id:"overview", label:"Overview", Icon:LayoutDashboard },
    { id:"bookings", label:"Bookings", Icon:Calendar,  badge:pending },
    { id:"services", label:"Services", Icon:Scissors },
    { id:"gallery",  label:"Gallery",  Icon:ImageIcon },
    { id:"content",  label:"Content",  Icon:FileText },
    { id:"settings", label:"Settings", Icon:Settings },
  ];

  const titles: Record<string,string> = {
    overview:"Dashboard Overview", bookings:"Booking Management",
    services:"Services Manager",   gallery:"Gallery Manager",
    content:"Content Editor",      settings:"Salon Settings",
  };

  const SidebarInner = () => (
    <div className="flex flex-col h-full">
      {/* logo */}
      <div className="px-5 py-6">
        <Link href="/" className="block" onClick={()=>setSidebarOpen(false)}>
          <div className="flex items-center gap-2.5 mb-0.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
              style={{background:"linear-gradient(135deg,#C9A84C,#A08C5B)"}}>
              <Scissors className="w-3.5 h-3.5 text-[#080604]"/>
            </div>
            <span className="text-lg font-serif font-bold tracking-widest" style={{color:"#C9A84C"}}>HABIBS</span>
          </div>
          <p className="text-[8px] uppercase tracking-[0.35em] pl-9" style={{color:`${C}0.28)`}}>Admin Dashboard</p>
        </Link>
      </div>
      <div className="mx-4 h-px mb-3" style={{background:`linear-gradient(to right,transparent,${G}0.18),transparent)`}}/>
      {/* nav links */}
      <nav className="px-3 flex flex-col gap-1 flex-1 overflow-y-auto">
        {navItems.map(item => {
          const active = tab===item.id;
          return (
            <button key={item.id} onClick={()=>{setTab(item.id);setSidebarOpen(false);}}
              className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-left transition-all duration-200 relative"
              style={{background:active?`${G}0.12)`:"transparent",color:active?"#C9A84C":`${C}0.42)`,border:`1px solid ${active?G+"0.22)":"transparent"}`}}>
              {active && <motion.div layoutId="sideIndicator" className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full" style={{background:"#C9A84C"}}/>}
              <item.Icon className="w-4 h-4 shrink-0"/>
              <span className="text-xs font-bold uppercase tracking-wider flex-1">{item.label}</span>
              {item.badge && item.badge>0 && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{background:"rgba(253,224,71,0.15)",color:"rgba(253,224,71,0.9)"}}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
      {/* bottom: user + logout */}
      <div className="p-3 mt-4 space-y-2">
        <div className="mx-1 h-px" style={{background:`linear-gradient(to right,transparent,${G}0.12),transparent)`}}/>
        <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl" style={{background:"rgba(255,255,255,0.02)",border:`1px solid ${G}0.08)`}}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
            style={{background:"linear-gradient(135deg,#C9A84C,#A08C5B)",color:"#080604"}}>
            {settings.owner.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold truncate" style={{color:`${C}0.8)`}}>{settings.owner}</p>
            <p className="text-[8px] uppercase tracking-widest" style={{color:`${G}0.5)`}}>Administrator</p>
          </div>
        </div>
        <Link href="/admin/login"
          className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors hover:bg-red-500/10 w-full"
          style={{color:"rgba(252,165,165,0.6)",border:"1px solid rgba(239,68,68,0.12)"}}>
          <LogOut className="w-4 h-4"/>Logout
        </Link>
      </div>
    </div>
  );

  return (
    /* overflow-x-hidden prevents the white gap from appearing on mobile */
    <div className="min-h-dvh w-screen overflow-x-hidden flex" style={{background:"#080604",color:`${C}0.8)`}}>

      {/* desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-60 z-[100] overflow-y-auto"
        style={{background:"rgba(10,8,5,0.97)",borderRight:`1px solid ${G}0.1)`,backdropFilter:"blur(16px)"}}>
        <SidebarInner/>
      </aside>

      {/* mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              className="fixed inset-0 z-[150] bg-black/65 backdrop-blur-sm lg:hidden"
              onClick={()=>setSidebarOpen(false)}/>
            <motion.aside
              initial={{x:"-100%"}} animate={{x:0}} exit={{x:"-100%"}}
              transition={{type:"spring",damping:30,stiffness:260}}
              className="fixed left-0 top-0 bottom-0 z-[160] w-60 flex flex-col overflow-y-auto lg:hidden"
              style={{background:"#0A0805",borderRight:`1px solid ${G}0.12)`}}>
              <SidebarInner/>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* main */}
      <div className="flex-1 flex flex-col min-h-dvh lg:pl-60 w-full min-w-0">

        {/* topbar */}
        <header className="sticky top-0 z-[90] flex items-center justify-between px-4 md:px-6 h-14"
          style={{background:"rgba(8,6,4,0.95)",borderBottom:`1px solid ${G}0.1)`,backdropFilter:"blur(16px)"}}>
          <div className="flex items-center gap-3 min-w-0">
            {/* hamburger — mobile only */}
            <button className="lg:hidden p-2 rounded-xl hover:bg-white/5 transition-colors shrink-0"
              onClick={()=>setSidebarOpen(true)} style={{color:`${C}0.6)`}}>
              <Menu className="w-5 h-5"/>
            </button>
            <div className="min-w-0">
              <h2 className="font-serif font-bold text-sm leading-tight truncate" style={{color:`${G}0.85)`}}>
                {titles[tab]}
              </h2>
              <div className="hidden sm:flex items-center gap-1 mt-0.5">
                <Link href="/" className="text-[8px] uppercase tracking-widest hover:text-[#C9A84C] transition-colors" style={{color:`${C}0.28)`}}>Site</Link>
                <ChevronRight className="w-2.5 h-2.5" style={{color:`${C}0.2)`}}/>
                <span className="text-[8px] uppercase tracking-widest" style={{color:`${G}0.5)`}}>{tab}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {/* bell */}
            <div className="relative">
              <button onClick={()=>setNotifOpen(p=>!p)}
                className="relative p-2 rounded-xl hover:bg-white/5 transition-colors" style={{color:`${C}0.5)`}}>
                <Bell className="w-5 h-5"/>
                {pending>0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-yellow-400"
                  style={{boxShadow:"0 0 6px rgba(234,179,8,0.7)"}}/>}
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div initial={{opacity:0,y:6,scale:0.95}} animate={{opacity:1,y:0,scale:1}}
                    exit={{opacity:0,y:6,scale:0.95}} transition={{duration:0.18,ease:EXPO}}
                    className="absolute right-0 top-full mt-1.5 w-60 rounded-2xl overflow-hidden z-[200]"
                    style={{background:"#0D0B08",border:`1px solid ${G}0.15)`,boxShadow:"0 20px 50px rgba(0,0,0,0.7)"}}>
                    <div className="px-4 py-3 border-b" style={{borderColor:`${G}0.1)`}}>
                      <p className="text-[9px] font-bold uppercase tracking-widest" style={{color:`${G}0.7)`}}>Notifications</p>
                    </div>
                    {pending>0
                      ? <div className="px-4 py-3">
                          <p className="text-sm font-semibold" style={{color:`${C}0.8)`}}>{pending} pending booking{pending>1?"s":""}</p>
                          <p className="text-xs mt-0.5" style={{color:`${C}0.35)`}}>Awaiting confirmation</p>
                        </div>
                      : <div className="px-4 py-5 text-center"><p className="text-sm italic" style={{color:`${C}0.3)`}}>All caught up!</p></div>}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* view site */}
            <Link href="/" target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-white/5 transition-colors"
              style={{color:`${G}0.6)`,border:`1px solid ${G}0.12)`}}>
              <Eye className="w-3.5 h-3.5"/>Site
            </Link>
          </div>
        </header>

        {/* panel content — pb-24 on mobile clears the bottom nav */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto min-w-0">
          <div className="pb-24 lg:pb-4">
            <AnimatePresence mode="wait">
              <motion.div key={tab}
                initial={{opacity:0,y:pr?0:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                transition={{duration:0.25,ease:EXPO}}>
                {tab==="overview" && <OverviewPanel bookings={bookings} services={services}/>}
                {tab==="bookings" && <BookingsPanel bookings={bookings} setBookings={setBookings}/>}
                {tab==="services" && <ServicesPanel services={services} setServices={setServices}/>}
                {tab==="gallery"  && <GalleryPanel  gallery={gallery}  setGallery={setGallery}/>}
                {tab==="content"  && <ContentPanel  content={content}  setContent={setContent} testimonials={testimonials} setTestimonials={setTestimonials}/>}
                {tab==="settings" && <SettingsPanel settings={settings} setSettings={setSettings}/>}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* ── Mobile bottom nav bar ── */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-[120] flex"
        style={{background:"rgba(8,6,4,0.97)",borderTop:`1px solid ${G}0.12)`,backdropFilter:"blur(20px)"}}>
        {navItems.map(item => {
          const active = tab===item.id;
          return (
            <button key={item.id} onClick={()=>{setTab(item.id);setSidebarOpen(false);}}
              className="flex-1 flex flex-col items-center justify-center py-2.5 gap-1 relative transition-colors active:scale-95"
              style={{color:active?"#C9A84C":`${C}0.35)`}}>
              {active && (
                <motion.div layoutId="bottomBar"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                  style={{background:"#C9A84C"}}/>
              )}
              <div className="relative">
                <item.Icon className="w-[18px] h-[18px]"/>
                {item.badge && item.badge>0 && (
                  <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-bold"
                    style={{background:"rgba(253,224,71,0.9)",color:"#080604"}}>
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[7px] font-bold uppercase tracking-wider leading-none">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default memo(AdminPanel);