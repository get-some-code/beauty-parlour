"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { SALON_DETAILS } from "@/lib/constants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Transparent hero mode only applies to the home page
  const isHomePage = pathname === "/";
  // Navbar is solid when scrolled OR when not on home page
  const isSolid = isScrolled || !isHomePage;

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    // Set initial scroll state immediately
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      // Delay to avoid immediate close on open
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ─── Main Navbar ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${
          isSolid
            ? "bg-[#111111]/95 backdrop-blur-md shadow-lg border-b border-[#C9A84C]/20 py-3"
            : "bg-transparent py-5"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col focus:outline-none focus:ring-2 focus:ring-[#C9A84C] rounded"
            aria-label="Habibs Hair & Beauty - Home"
          >
            <span
              className={`text-2xl md:text-3xl font-serif font-bold tracking-wider transition-colors duration-300 ${
                isSolid ? "text-[#C9A84C]" : "text-[#E8D5A3]"
              }`}
            >
              HABIBS
            </span>
            <span
              className={`text-[9px] md:text-[10px] tracking-[0.35em] font-sans transition-colors duration-300 ${
                isSolid ? "text-[#E8D5A3]/80" : "text-[#E8D5A3]/90"
              }`}
            >
              HAIR & BEAUTY
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm uppercase tracking-widest font-medium transition-all duration-200 group focus:outline-none focus:text-[#C9A84C] ${
                  isActiveLink(link.href)
                    ? "text-[#C9A84C]"
                    : "text-[#E8D5A3] hover:text-[#C9A84C]"
                }`}
                aria-current={isActiveLink(link.href) ? "page" : undefined}
              >
                {link.name}
                {isActiveLink(link.href) && (
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C9A84C]"
                    layoutId="activeLink"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C9A84C] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </Link>
            ))}
            <Link
              href="/booking"
              className="flex items-center space-x-2 px-6 py-3 rounded-full bg-[#C9A84C] text-[#111111] hover:bg-[#E8D5A3] hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2 focus:ring-offset-transparent group"
              aria-label="Book an appointment"
            >
              <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-bold uppercase tracking-wider">
                Book Now
              </span>
            </Link>
          </div>

          {/* Mobile Hamburger — always fully visible */}
          <button
            className="lg:hidden relative z-[210] p-2 rounded-md text-[#E8D5A3] hover:text-[#C9A84C] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  <X className="w-7 h-7" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  <Menu className="w-7 h-7" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ─── Mobile Menu (rendered as sibling to avoid stacking context issues) ─── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[205] bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              key="panel"
              ref={menuRef}
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-[210] w-full sm:w-[320px] bg-[#111111] flex flex-col shadow-2xl overflow-y-auto overscroll-contain"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#C9A84C]/20">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex flex-col focus:outline-none"
                >
                  <span className="text-xl font-serif font-bold tracking-wider text-[#C9A84C]">
                    HABIBS
                  </span>
                  <span className="text-[8px] tracking-[0.35em] text-[#E8D5A3]/70">
                    HAIR & BEAUTY
                  </span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-[#E8D5A3] hover:text-[#C9A84C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A84C] rounded"
                  aria-label="Close mobile menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Nav links */}
              <nav
                className="flex-1 flex flex-col justify-center px-8 py-10 gap-2"
                aria-label="Mobile navigation links"
              >
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between w-full py-4 border-b border-[#C9A84C]/10 text-xl font-serif transition-colors duration-200 focus:outline-none ${
                        isActiveLink(link.href)
                          ? "text-[#C9A84C]"
                          : "text-[#E8D5A3] hover:text-[#C9A84C]"
                      }`}
                      aria-current={
                        isActiveLink(link.href) ? "page" : undefined
                      }
                    >
                      <span>{link.name}</span>
                      {isActiveLink(link.href) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] shrink-0" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="px-8 pb-10 flex flex-col gap-4"
              >
                <Link
                  href="/booking"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-[#C9A84C] text-[#111111] py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#E8D5A3] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2 focus:ring-offset-[#111111]"
                  aria-label="Book an appointment"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Appointment</span>
                </Link>
                <a
                  href={`tel:${SALON_DETAILS.phone}`}
                  className="w-full flex items-center justify-center gap-2 border border-[#C9A84C]/40 text-[#E8D5A3]/80 py-3.5 rounded-full hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] text-sm tracking-wide"
                  aria-label={`Call us at ${SALON_DETAILS.phone}`}
                >
                  <Phone className="w-4 h-4" />
                  <span>{SALON_DETAILS.phone}</span>
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;