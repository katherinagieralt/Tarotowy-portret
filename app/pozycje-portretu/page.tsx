import { individualPositionMeaningsEn, partnerPositionMeaningsEn } from '@/lib/tarotCalculations';
import { getAllArkanaPosts } from '@/lib/arkany';
import PositionItem from '@/components/PositionItem';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portrait Positions, Archeya',
  description: 'Learn the meaning of individual positions in your personal and partnership Tarot Portrait.',
  alternates: {
    canonical: '/pozycje-portretu',
    languages: {
      'en': '/pozycje-portretu',
      'pl': '/pl/pozycje-portretu',
      'x-default': '/pozycje-portretu',
    },
  },
};

export default async function PositionsPageEn() {
  const cards = await getAllArkanaPosts('en');

  return (
    <main className="min-h-screen bg-[#F9F6EE] dark:bg-[#0A0710] py-20 px-4 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">
            Portrait Positions
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 font-sans max-w-2xl mx-auto">
            The Tarot Portrait consists of several positions, each responsible for a different area of life and psyche. Discover their meanings.
          </p>
        </header>

        <div className="space-y-16">
          <section>
            <h2 className="text-3xl font-serif font-bold text-amber-600 dark:text-amber-400 mb-8 border-b border-amber-500/20 pb-4">
              Individual Portrait
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(individualPositionMeaningsEn).map(([key, pos]) => (
                <PositionItem 
                  key={key}
                  posKey={key}
                  posNum={key.replace('p', '')}
                  posData={pos}
                  cards={cards}
                  isPartner={false}
                  isEnglish={true}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-serif font-bold text-amber-600 dark:text-amber-400 mb-8 border-b border-amber-500/20 pb-4">
              Partnership Portrait
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(partnerPositionMeaningsEn).map(([key, pos]) => (
                <PositionItem 
                  key={key}
                  posKey={key}
                  posNum={key.replace('p', '')}
                  posData={pos}
                  cards={cards}
                  isPartner={true}
                  isEnglish={true}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
