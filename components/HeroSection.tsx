"use client";

import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 py-20 sm:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6">
            ✦ Tarotowy Portret ✦
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 mb-8">
            Odkryj swoją energię poprzez liczby i karty tarota.
            <br />
            <span className="text-amber-500">Darmowy kalkulator. Pełne raporty za 99 zł.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kalkulator"
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 px-8 rounded-lg transition text-lg"
            >
              Spróbuj Darmowo
            </Link>
            <Link
              href="/arkany"
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 px-8 rounded-lg transition text-lg"
            >
              Poznaj Arkany
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl mb-2">✨</div>
            <h3 className="text-white font-bold mb-2">Darmowy Preview</h3>
            <p className="text-slate-400 text-sm">
              Wpisz datę urodzenia i zobacz 3 pierwsze karty za darmo
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-white font-bold mb-2">Pełny Raport</h3>
            <p className="text-slate-400 text-sm">
              Wszystkie 22 Arkany z detailową interpretacją za jedynie 99 zł
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">💫</div>
            <h3 className="text-white font-bold mb-2">Portret Partnerski</h3>
            <p className="text-slate-400 text-sm">
              Odkryj energię waszej relacji, 129 zł za parę
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
