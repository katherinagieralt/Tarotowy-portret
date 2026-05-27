import { individualPositionMeanings, partnerPositionMeanings } from '@/lib/tarotCalculations';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pozycje Portretu — Archeya',
  description: 'Dowiedz się, co oznaczają poszczególne pozycje w Twoim indywidualnym i partnerskim Portrecie Tarotowym.',
};

export default function PositionsPage() {
  return (
    <main className="min-h-screen bg-[#F9F6EE] dark:bg-[#0A0710] py-20 px-4 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">
            Pozycje Portretu
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 font-sans max-w-2xl mx-auto">
            Portret Psychologiczny składa się z kilkunastu pozycji, z których każda odpowiada za inny obszar życia i psychiki. Poznaj ich znaczenie.
          </p>
        </header>

        <div className="space-y-16">
          <section>
            <h2 className="text-3xl font-serif font-bold text-amber-600 dark:text-amber-400 mb-8 border-b border-amber-500/20 pb-4">
              Portret Indywidualny
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(individualPositionMeanings).map(([key, pos]) => (
                <div key={key} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl border border-black/5 dark:border-white/5 p-6 hover:border-amber-500/50 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-serif font-bold text-sm">
                      {key.replace('p', '')}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {pos.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed pl-11">
                    {pos.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-serif font-bold text-amber-600 dark:text-amber-400 mb-8 border-b border-amber-500/20 pb-4">
              Portret Partnerski
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(partnerPositionMeanings).map(([key, pos]) => (
                <div key={key} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl border border-black/5 dark:border-white/5 p-6 hover:border-amber-500/50 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-serif font-bold text-sm">
                      {key.replace('p', '')}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {pos.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed pl-11">
                    {pos.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
