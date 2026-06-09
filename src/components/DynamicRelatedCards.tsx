'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { generatePositionSlug } from '@/lib/tarotCalculations';

type Combo = {
  card: { frontmatter: { title: string }, slug: string },
  isPartner: boolean,
  positionKey: string,
  position: { title: string }
};

export default function DynamicRelatedCards({
  fallbackCombinations,
  slugsMap,
  titlesMap,
  positionMeanings,
  lang = 'pl'
}: {
  fallbackCombinations: Combo[];
  slugsMap: Record<number, string>;
  titlesMap: Record<number, string>;
  positionMeanings: { individual: Record<string, any>; partner: Record<string, any> };
  lang?: 'pl' | 'en';
}) {
  const [combos, setCombos] = useState<Combo[]>(fallbackCombinations);

  useEffect(() => {
    try {
      const stateKey = lang === 'pl' ? 'tarotStatePL' : 'tarotStateEN';
      const stateStr = sessionStorage.getItem(stateKey);
      if (stateStr) {
        const state = JSON.parse(stateStr);
        let availableCombos: Combo[] = [];

        if (state.individualPortrait) {
          Object.keys(state.individualPortrait).forEach(pos => {
            const num = state.individualPortrait[pos];
            if (slugsMap[num] && positionMeanings.individual[pos]) {
              availableCombos.push({
                card: { frontmatter: { title: titlesMap[num] }, slug: slugsMap[num] },
                isPartner: false,
                positionKey: pos,
                position: { title: positionMeanings.individual[pos].title }
              });
            }
          });
        }
        if (state.partnerPortrait) {
          Object.keys(state.partnerPortrait).forEach(pos => {
            const num = state.partnerPortrait[pos];
            if (slugsMap[num] && positionMeanings.partner[pos]) {
              availableCombos.push({
                card: { frontmatter: { title: titlesMap[num] }, slug: slugsMap[num] },
                isPartner: true,
                positionKey: pos,
                position: { title: positionMeanings.partner[pos].title }
              });
            }
          });
        }

        const currentPath = window.location.pathname;
        availableCombos = availableCombos.filter(c => {
          const typeChar = c.isPartner ? 'p' : 'i';
          const posNum = c.positionKey.replace(/[ip]/, '');
          const slug = `${c.card.slug}-${typeChar}${posNum}`;
          return !currentPath.includes(slug);
        });

        // Unique elements only
        availableCombos = availableCombos.filter((v, i, a) => 
          a.findIndex(t => t.card.slug === v.card.slug && t.positionKey === v.positionKey) === i
        );

        for (let i = availableCombos.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [availableCombos[i], availableCombos[j]] = [availableCombos[j], availableCombos[i]];
        }

        if (availableCombos.length >= 3) {
          setCombos(availableCombos.slice(0, 3));
        } else if (availableCombos.length > 0) {
          const combined = [...availableCombos, ...fallbackCombinations];
          const uniqueCombined = combined.filter((v, i, a) => 
            a.findIndex(t => t.card.slug === v.card.slug && t.positionKey === v.positionKey) === i
          );
          setCombos(uniqueCombined.slice(0, 3));
        }
      }
    } catch (e) {
      console.error('Failed to parse tarot state from session storage', e);
    }
  }, [fallbackCombinations, lang, positionMeanings, slugsMap, titlesMap]);

  const prefix = lang === 'pl' ? '/pl/znaczenie' : '/znaczenie';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {combos.map((combo, idx) => {
        const typeChar = combo.isPartner ? 'p' : 'i';
        const posNum = combo.positionKey.replace(/[ip]/, '');
        const slug = generatePositionSlug(combo.card.slug, combo.isPartner, combo.positionKey, lang === 'en');
        const href = `${prefix}/${slug}`;

        return (
          <Link
            key={`${combo.card.slug}-${combo.positionKey}-${idx}`}
            href={href}
            className="group relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border border-black/5 dark:border-white/5 p-6 rounded-2xl hover:bg-white/80 dark:hover:bg-slate-800/80 hover:border-amber-500/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all duration-500"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <span className="text-amber-600/70 dark:text-amber-400/70 text-xs font-bold uppercase tracking-wider">
                {combo.isPartner ? (lang === 'pl' ? "Partnerski" : "Partner") : (lang === 'pl' ? "Indywidualny" : "Individual")}
              </span>
              <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:bg-amber-50 dark:group-hover:bg-amber-900/30 transition-colors">
                →
              </span>
            </div>
            <div className="relative z-10">
              <h4 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {combo.card.frontmatter.title}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                {lang === 'pl' ? 'Pozycja' : 'Position'} {posNum}: {combo.position.title}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
