"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AdminLoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    // Simulate Supabase Auth
    setTimeout(() => {
      if (formData.email === "admin@habibssalon.com" && formData.password === "admin123") {
        router.push("/admin/dashboard");
      } else {
        setError("Invalid email or password. Please try again.");
        setIsSubmitting(false);
      }
    }, 1500);
  };

  return (
    <div className="bg-luxury-black min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop"
          alt="Luxury Salon"
          fill
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-transparent to-luxury-black" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-soft-gold/20 p-10 md:p-12 rounded-sm shadow-2xl z-10 relative"
      >
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex flex-col items-center mb-10 group">
            <span className="text-4xl font-serif font-bold tracking-wider text-soft-gold group-hover:text-champagne transition-colors">
              HABIBS
            </span>
            <span className="text-xs tracking-[0.4em] font-sans text-champagne/40">
              ADMIN PORTAL
            </span>
          </Link>
          <div className="flex justify-center mb-6">
            <div className="bg-soft-gold/10 p-4 rounded-full border border-soft-gold/20">
              <ShieldCheck className="w-10 h-10 text-soft-gold" />
            </div>
          </div>
          <h2 className="text-2xl font-serif font-bold text-champagne uppercase tracking-widest">Authorized Access Only</h2>
          <p className="text-champagne/40 text-sm italic mt-4 font-sans leading-relaxed">Please enter your credentials to manage the salon platform.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 p-4 rounded-sm text-red-400 text-xs text-center italic"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] text-soft-gold font-bold uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-gold/40" />
                <input
                  type="email"
                  required
                  placeholder="admin@habibssalon.com"
                  className="w-full bg-white/5 border border-soft-gold/20 p-4 pl-14 rounded-sm focus:outline-none focus:border-soft-gold transition-all text-sm italic font-sans text-champagne"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] text-soft-gold font-bold uppercase tracking-[0.2em] ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-gold/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-soft-gold/20 p-4 pl-14 pr-14 rounded-sm focus:outline-none focus:border-soft-gold transition-all text-sm italic font-sans text-champagne"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:text-soft-gold transition-colors text-soft-gold/40"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center space-x-4 bg-soft-gold text-luxury-black px-8 py-5 rounded-sm hover:bg-champagne transition-all duration-500 shadow-2xl group font-bold uppercase tracking-[0.2em] text-sm mt-8"
          >
            <span>{isSubmitting ? "Verifying..." : "Login Securely"}</span>
          </button>
        </form>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-3 text-champagne/40 hover:text-soft-gold transition-colors text-xs uppercase tracking-[0.2em] group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Website</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;