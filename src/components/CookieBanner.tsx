"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Sprawdzamy czy użytkownik już zaakceptował cookies
    const hasAccepted = localStorage.getItem("archeya_cookies_accepted");
    if (!hasAccepted) {
      // Dajemy małe opóźnienie, żeby baner nie pojawiał się natychmiast agresywnie
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("archeya_cookies_accepted", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 w-full z-50 p-4 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto pointer-events-auto">
            <div className="bg-white/90 dark:bg-[#0A0710]/95 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-2xl rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-serif font-bold text-slate-900 dark:text-white text-lg mb-1">
                  Szanujemy Twoją prywatność
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Używamy niezbędnych plików cookies do prawidłowego działania strony oraz analitycznych, 
                  aby lepiej zrozumieć, jak z niej korzystasz. Więcej informacji znajdziesz w naszej{" "}
                  <Link href="/polityka-prywatnosci" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">
                    Polityce Prywatności
                  </Link>.
                </p>
              </div>

              <div className="flex shrink-0 gap-3 w-full sm:w-auto">
                <button
                  onClick={handleAccept}
                  className="w-full sm:w-auto px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-[#0A0710]"
                >
                  Akceptuję
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
