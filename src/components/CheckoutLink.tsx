"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

export function CheckoutLink({ isPartner, children, lang = "pl" }: { isPartner: boolean, children: ReactNode, lang?: "pl" | "en" }) {
  const handleClick = () => {
    // Flag to restore the state on the home page
    sessionStorage.setItem("restoreTarotResult", "true");
  };

  const href = lang === "pl" ? "/pl#checkout-section" : "/en#checkout-section";

  return (
    <Link 
      href={href} 
      onClick={handleClick}
      className={`group relative inline-flex items-center justify-center gap-3 px-10 py-5 text-white font-bold rounded-2xl overflow-hidden transition-all hover:scale-[1.02] ${isPartner ? 'bg-gradient-to-r from-purple-500 to-indigo-600 shadow-[0_0_20px_rgba(168,85,247,0.2)] dark:shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] dark:hover:shadow-[0_0_60px_rgba(168,85,247,0.5)]' : 'bg-gradient-to-r from-amber-500 to-amber-600 shadow-[0_0_20px_rgba(245,158,11,0.2)] dark:shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] dark:hover:shadow-[0_0_60px_rgba(245,158,11,0.5)]'}`}
    >
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      <span className="relative z-10 text-xl tracking-wide">{children}</span>
      <ChevronRight className="relative z-10 w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
    </Link>
  );
}
