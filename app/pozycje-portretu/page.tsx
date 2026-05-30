import { individualPositionMeanings, partnerPositionMeanings } from '@/lib/tarotCalculations';
import { getAllArkanaPosts } from '@/lib/arkany';
import PositionItem from '@/components/PositionItem';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pozycje Portretu — Archeya',
  description: 'Dowiedz się, co oznaczają poszczególne pozycje w Twoim indywidualnym i partnerskim Portrecie Tarotowym.',
};

export default async function PositionsPage() {
  const cards = await getAllArkanaPosts();

  return (
    <main className="min-h-screen bg-[#F9F6EE] dark:bg-[#0A0710] py-20 px-4 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">
            Pozycje Portretu
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 font-sans max-w-2xl mx-auto">
            Tarotowy Portret składa się z kilkunastu pozycji, z których każda odpowiada za inny obszar życia i psychiki. Poznaj ich znaczenie.
          </p>
        </header>

        <div className="space-y-16">
          <section>
            <h2 className="text-3xl font-serif font-bold text-amber-600 dark:text-amber-400 mb-8 border-b border-amber-500/20 pb-4">
              Portret Indywidualny
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(individualPositionMeanings).map(([key, pos]) => (
                <PositionItem 
                  key={key}
                  posKey={key}
                  posNum={key.replace('p', '')}
                  posData={pos}
                  cards={cards}
                  isPartner={false}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-serif font-bold text-amber-600 dark:text-amber-400 mb-8 border-b border-amber-500/20 pb-4">
              Portret Partnerski
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(partnerPositionMeanings).map(([key, pos]) => (
                <PositionItem 
                  key={key}
                  posKey={key}
                  posNum={key.replace('p', '')}
                  posData={pos}
                  cards={cards}
                  isPartner={true}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
