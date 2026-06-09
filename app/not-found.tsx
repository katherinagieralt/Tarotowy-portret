"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const isPolish = pathname?.startsWith('/pl') || pathname === '/';
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-[#F9F6EE] dark:bg-[#0A0710] py-20 px-4 transition-colors duration-500">
      <div className="max-w-2xl w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-3xl border border-amber-500/20 p-8 md:p-16 text-center shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-[80px]" />
        
        <div className="relative z-10">
          <div className="w-20 h-20 mx-auto bg-amber-500/10 rounded-full flex items-center justify-center mb-8 border border-amber-500/20">
            <Search className="w-10 h-10 text-amber-600 dark:text-amber-400" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">
            {isPolish ? "Karta nie została wyciągnięta" : "Card not drawn"}
          </h1>
          <h2 className="text-xl font-medium text-amber-600 dark:text-amber-400 mb-6 uppercase tracking-widest">
            {isPolish ? "Błąd 404" : "Error 404"}
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-10 max-w-lg mx-auto">
            {isPolish 
              ? "Wygląda na to, że strona, której szukasz, zgubiła się w mgle archetypów. Mogła zostać przeniesiona, usunięta lub po prostu nigdy nie istniała w tej przestrzeni."
              : "It looks like the page you are looking for has been lost in the fog of archetypes. It might have been moved, deleted, or simply never existed in this space."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href={isPolish ? "/pl" : "/"}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-amber-500/25 w-full sm:w-auto"
            >
              {isPolish ? "Wróć na stronę główną" : "Return to Homepage"}
            </Link>
            <Link 
              href={isPolish ? "/pl/kontakt" : "/kontakt"}
              className="px-8 py-4 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-white border border-black/10 dark:border-white/10 hover:border-amber-500/50 rounded-full font-medium transition-all w-full sm:w-auto"
            >
              {isPolish ? "Zgłoś problem" : "Report a Problem"}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
