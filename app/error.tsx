"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-[#F9F6EE] dark:bg-[#0A0710] py-20 px-4 transition-colors duration-500">
      <div className="max-w-2xl w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-3xl border border-red-500/20 p-8 md:p-16 text-center shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/10 dark:bg-red-500/5 rounded-full blur-[80px]" />
        
        <div className="relative z-10">
          <div className="w-20 h-20 mx-auto bg-red-500/10 rounded-full flex items-center justify-center mb-8 border border-red-500/20">
            <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">
            Energia uległa rozproszeniu
          </h1>
          <h2 className="text-xl font-medium text-red-600 dark:text-red-400 mb-6 uppercase tracking-widest">
            Nieoczekiwany Błąd
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-6 max-w-lg mx-auto">
            Wystąpiło nagłe zaburzenie w działaniu aplikacji. Przepraszamy, ale nie mogliśmy przetworzyć Twojego żądania w tym momencie.
          </p>
          
          {/* Wyjaśnienie błędu */}
          <div className="bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl p-5 mb-10 max-w-lg mx-auto text-left overflow-x-auto shadow-inner">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-2">
              Szczegóły problemu:
            </p>
            <p className="text-sm font-mono text-slate-600 dark:text-slate-400 break-words">
              {error.message || "Nieznany błąd wewnętrzny systemu."}
            </p>
            {error.digest && (
              <p className="text-xs font-mono text-slate-500 mt-2">
                ID Błędu: {error.digest}
              </p>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => reset()}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-amber-500/25 flex items-center gap-2 justify-center w-full sm:w-auto"
            >
              <RotateCcw className="w-5 h-5" /> Spróbuj ponownie
            </button>
            <Link 
              href="/"
              className="px-8 py-4 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-white border border-black/10 dark:border-white/10 hover:border-amber-500/50 rounded-full font-medium transition-all w-full sm:w-auto"
            >
              Strona główna
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
