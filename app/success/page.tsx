"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="max-w-md mx-auto text-center bg-slate-900 rounded-lg border border-slate-700 p-8">
      <div className="text-5xl mb-4">✓</div>
      <h1 className="text-3xl font-bold text-white mb-2">Płatność Zatwierdzono!</h1>
      <p className="text-slate-400 mb-4">
        Dziękujemy za zakup. Twój raport jest przygotowywany...
      </p>

      {orderId && (
        <div className="bg-slate-800 p-4 rounded mb-6 text-left">
          <p className="text-xs text-slate-500">ID Zamówienia</p>
          <p className="text-white font-mono text-sm break-all">{orderId}</p>
        </div>
      )}

      <p className="text-slate-400 text-sm mb-6">
        Wysłaliśmy link do pobrania raportu na Twój email. Sprawdź skrzynkę odbiorczą
        (i folder spam, na wszelki wypadek).
      </p>

      <div className="space-y-3">
        <Link
          href="/kalkulator"
          className="block w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-4 rounded transition"
        >
          Oblicz Nowy Portret
        </Link>
        <Link
          href="/"
          className="block w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded transition"
        >
          Wróć na Stronę Główną
        </Link>
      </div>

      <p className="text-slate-500 text-xs mt-6">
        Masz pytania? Skontaktuj się z nami: hello@tarotowy-portret.pl
      </p>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center py-20 px-4">
      <Suspense fallback={<div className="text-white">Ładowanie...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
