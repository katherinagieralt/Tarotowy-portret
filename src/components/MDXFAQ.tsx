"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function MDXFAQ({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden bg-white/40 dark:bg-[#130F24]/40 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:bg-black/5 dark:focus-visible:bg-white/5"
      >
        <span className="font-serif text-lg font-medium text-slate-800 dark:text-slate-200">
          {title}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-amber-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>
      <div 
        className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[1000px] pb-6 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-slate-600 dark:text-slate-400 font-light leading-relaxed prose-p:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}
