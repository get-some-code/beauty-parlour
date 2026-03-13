"use client";

import { motion } from "framer-motion";
import { MessageCircle, Calendar, Phone } from "lucide-react";
import Link from "next/link";
import { SALON_DETAILS } from "@/lib/constants";

const FloatingCTA = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end space-y-4">
      {/* WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${SALON_DETAILS.whatsapp.replace(/\+/g, "").replace(/\s/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className="bg-green-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-green-600 transition-colors"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>

      {/* Book Now Button */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          href="/booking"
          className="bg-deep-bronze text-champagne px-6 py-4 rounded-full shadow-2xl flex items-center space-x-3 group hover:bg-muted-gold transition-all duration-300"
        >
          <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Book Appointment</span>
        </Link>
      </motion.div>
      
      {/* Mobile Only Call Button */}
      <motion.a
        href={`tel:${SALON_DETAILS.phone}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="md:hidden bg-soft-gold text-luxury-black p-4 rounded-full shadow-2xl flex items-center justify-center"
        aria-label="Call Now"
      >
        <Phone className="w-6 h-6" />
      </motion.a>
    </div>
  );
};

export default FloatingCTA;
