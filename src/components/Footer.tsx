import Link from "next/link";
import { Phone, MapPin, Instagram, Facebook, Mail, Clock } from "lucide-react";
import { SALON_DETAILS } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="bg-luxury-black text-champagne pt-24 pb-12 border-t border-soft-gold/20">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Info */}
        <div className="flex flex-col space-y-6">
          <Link href="/" className="flex flex-col">
            <span className="text-3xl font-serif font-bold tracking-wider text-soft-gold">
              HABIBS
            </span>
            <span className="text-xs tracking-[0.3em] font-sans text-champagne/70">
              HAIR & BEAUTY
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-champagne/70 font-sans italic">
            Experience the pinnacle of luxury beauty and grooming. Our expert stylists and therapists are dedicated to enhancing your natural elegance.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-soft-gold transition-colors duration-300">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-soft-gold transition-colors duration-300">
              <Facebook className="w-5 h-5" />
            </a>
            <a href={`mailto:info@habibssalon.com`} className="hover:text-soft-gold transition-colors duration-300">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-6">
          <h4 className="text-xl font-serif font-bold text-soft-gold border-b border-soft-gold/20 pb-2 inline-block w-fit">
            Quick Links
          </h4>
          <ul className="flex flex-col space-y-4 text-sm font-sans tracking-widest uppercase">
            <li><Link href="/services" className="hover:text-soft-gold transition-colors">Services</Link></li>
            <li><Link href="/gallery" className="hover:text-soft-gold transition-colors">Gallery</Link></li>
            <li><Link href="/about" className="hover:text-soft-gold transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-soft-gold transition-colors">Contact</Link></li>
            <li><Link href="/booking" className="hover:text-soft-gold transition-colors">Book Now</Link></li>
          </ul>
        </div>

        {/* Opening Hours */}
        <div className="flex flex-col space-y-6">
          <h4 className="text-xl font-serif font-bold text-soft-gold border-b border-soft-gold/20 pb-2 inline-block w-fit">
            Opening Hours
          </h4>
          <ul className="flex flex-col space-y-4 text-sm font-sans text-champagne/80">
            <li className="flex justify-between items-center">
              <span className="flex items-center"><Clock className="w-4 h-4 mr-2 text-soft-gold" /> Mon - Sun</span>
              <span>10:00 AM - 08:30 PM</span>
            </li>
            <li className="flex flex-col text-xs text-champagne/60 mt-4 leading-relaxed italic">
              *Hours may vary on holidays. Please call to confirm.
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col space-y-6">
          <h4 className="text-xl font-serif font-bold text-soft-gold border-b border-soft-gold/20 pb-2 inline-block w-fit">
            Location
          </h4>
          <div className="flex flex-col space-y-4 text-sm font-sans text-champagne/80">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 text-soft-gold flex-shrink-0" />
              <p className="leading-relaxed">
                {SALON_DETAILS.address}
                <br />
                Inside Downtown Mall, New Town
              </p>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-soft-gold flex-shrink-0" />
              <p>{SALON_DETAILS.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto px-4 md:px-8 pt-12 border-t border-soft-gold/10 flex flex-col md:flex-row justify-between items-center text-xs text-champagne/40 tracking-[0.2em] uppercase">
        <p>&copy; {new Date().getFullYear()} {SALON_DETAILS.name}. All Rights Reserved.</p>
        <p className="mt-4 md:mt-0">Designed & Developed for Luxury</p>
      </div>
    </footer>
  );
};

export default Footer;
