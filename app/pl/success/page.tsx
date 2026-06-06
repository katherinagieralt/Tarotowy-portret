'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    // Automatyczna symulacja webhooka tylko na localhost
    if (orderId && window.location.hostname === "localhost") {
      setSimulating(true);
      fetch("/api/dev/simulate-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success("Lokalny webhook wysłany! PDF jest generowany.");
          } else {
            toast.error("Błąd symulacji webhooka: " + (data.error || "Nieznany błąd"));
          }
        })
        .catch(() => toast.error("Błąd połączenia podczas symulacji webhooka."))
        .finally(() => setSimulating(false));
    }
  }, [orderId]);

  return (
    <div className="max-w-xl mx-auto w-full text-center relative z-10">
      <div className="bg-white/80 dark:bg-white/[0.02] backdrop-blur-2xl border border-black/10 dark:border-white/[0.05] rounded-[2rem] p-10 sm:p-16 shadow-xl dark:shadow-2xl transition-colors duration-500">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center border border-green-200 dark:border-green-500/30">
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
        </div>
        
        <h1 className="text-4xl font-serif font-light text-slate-900 dark:text-white mb-4 transition-colors">
          Płatność <span className="italic text-green-600 dark:text-green-400">Zatwierdzona</span>
        </h1>
        
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 font-light leading-relaxed transition-colors">
          Dziękujemy za zakup! Twój szczegółowy raport jest właśnie przygotowywany i niedługo znajdzie się w Twojej skrzynce.
        </p>

        {orderId && (
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl mb-8 text-left transition-colors">
            <p className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-1">ID Zamówienia</p>
            <p className="text-slate-900 dark:text-white font-mono text-sm break-all">{orderId}</p>
          </div>
        )}

        <p className="text-slate-500 dark:text-slate-400 text-sm mb-10 transition-colors">
          Wysłaliśmy link do pobrania raportu na Twój e-mail. Sprawdź skrzynkę odbiorczą 
          (oraz folder SPAM na wszelki wypadek).
        </p>

        {simulating && (
          <div className="flex items-center justify-center gap-2 mb-8 text-amber-600 dark:text-amber-500 text-sm font-medium bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800/30">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>[Lokalnie] Symulowanie płatności Stripe i generowanie PDF... Trwa to ok. 20 sek.</span>
          </div>
        )}

        <div className="space-y-4">
          <Link
            href="/"
            className="flex items-center justify-center w-full bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-semibold tracking-wide py-4 px-6 rounded-xl transition-all shadow-md"
          >
            Oblicz Nowy Portret
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold py-4 px-6 rounded-xl transition-all"
          >
            Wróć na Stronę Główną
          </Link>
        </div>

        <p className="text-slate-400 dark:text-slate-500 text-xs mt-8 transition-colors">
          Masz pytania? Napisz na: hello@getarcheya.com
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-transparent flex items-center justify-center py-20 px-4 relative overflow-hidden transition-colors duration-500">
      {/* Background elements */}
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent dark:hidden transition-colors duration-500"></div>
        <div className="hidden dark:block absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#130F24]/50 via-transparent to-transparent transition-colors duration-500"></div>
        
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-green-100/40 dark:bg-green-900/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen transition-colors duration-500"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-amber-100/30 dark:bg-[#110D1D]/30 blur-[150px] mix-blend-multiply dark:mix-blend-screen transition-colors duration-500"></div>
        
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.05] dark:opacity-[0.15] mix-blend-overlay transition-opacity duration-500"></div>
      </div>

      <Suspense fallback={<div className="text-slate-900 dark:text-white font-serif italic text-2xl">Ładowanie...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
