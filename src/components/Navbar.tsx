"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Stars } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";

const navLinksPl = [
  { name: "Kalkulator", href: "/pl" },
  { name: "Wielkie Arkana", href: "/pl/arkany" },
  { name: "Pozycje portretu", href: "/pl/pozycje-portretu" },
  { name: "O nas & Kontakt", href: "/pl/kontakt" },
];

const navLinksEn = [
  { name: "Calculator", href: "/" },
  { name: "Major Arcana", href: "/arkany" },
  { name: "Portrait Positions", href: "/pozycje-portretu" },
  { name: "About & Contact", href: "/kontakt" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  const isPolish = pathname.startsWith('/pl');
  const isEnglish = !isPolish;
  const navLinks = isEnglish ? navLinksEn : navLinksPl;


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Zamknij menu przy zmianie ścieżki
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Zapobiegaj przewijaniu body gdy menu mobilne jest otwarte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/70 dark:bg-[#030308]/70 backdrop-blur-xl" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-24 md:h-28 flex items-center justify-between transition-all duration-300">
          {/* Logo */}
          <Link 
            href={isEnglish ? "/" : "/pl"} 
            onClick={(e) => {
              if (pathname === (isEnglish ? "/" : "/pl")) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg py-1"
          >
            {/* Logo dla jasnego motywu (Czarne logo) */}
            <Image 
              src="/Logo/PNG/archeya-logo-dark.png" 
              alt="Archeya Logo" 
              width={300} 
              height={80} 
              className="h-20 w-auto md:h-24 transition-all duration-300 dark:hidden"
              priority
            />
            {/* Logo dla ciemnego motywu (Białe logo) */}
            <Image 
              src="/Logo/PNG/archeya-logo-light.png" 
              alt="Archeya Logo" 
              width={300} 
              height={80} 
              className="h-20 w-auto md:h-24 transition-all duration-300 hidden dark:block"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md px-2 py-1 ${
                    isActive 
                      ? "text-amber-600 dark:text-amber-400" 
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      initial={false}
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-amber-500 rounded-full"
                      layoutId="underline"
                    />
                  )}
                </Link>
              );
            })}
            
            {/* Theme Toggle in Desktop */}
            <div className="ml-4 pl-4 border-l border-black/10 dark:border-white/10 flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Menu Toggle & Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md"
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white dark:bg-[#030308] pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-2xl font-serif tracking-wide border-b border-black/5 dark:border-white/5 pb-4 ${
                      isActive 
                        ? "text-amber-600 dark:text-amber-400 italic" 
                        : "text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
