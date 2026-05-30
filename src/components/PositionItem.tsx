'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, GalleryVerticalEnd } from 'lucide-react';
import { generatePositionSlug } from '@/lib/tarotCalculations';

interface CardType {
  slug: string;
  frontmatter: Record<string, unknown>;
}

interface PositionItemProps {
  posKey: string;
  posNum: string;
  posData: { title: string; description: string };
  cards: CardType[];
  isPartner?: boolean;
}

export default function PositionItem({ posKey, posNum, posData, cards, isPartner = false }: PositionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white/60 dark:bg-[#130F24]/40 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden transition-all duration-500 hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(212,175,55,0.05)] hover:border-amber-500/30 group">
      
      {/* Position Header (Always visible) */}
      <div className="p-5 sm:p-6 pb-4">
        <div className="flex items-start gap-4 sm:gap-5 mb-2">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 text-amber-600 dark:text-amber-400 flex items-center justify-center font-serif font-bold border border-amber-500/20 shadow-inner">
            {posNum}
          </div>
          <div className="flex-1 pt-0.5">
            <h3 className="text-xl sm:text-2xl font-serif font-medium text-slate-900 dark:text-white leading-tight mb-2">
              {posData.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light text-sm sm:text-base">
              {posData.description}
            </p>
          </div>
        </div>
        
        {/* Toggle Button */}
        <div className="pl-0 sm:pl-[3.5rem] mt-3">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-transparent hover:bg-amber-500/10 text-amber-600/80 hover:text-amber-700 dark:text-amber-500/80 dark:hover:text-amber-400 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50"
            title="Pokaż karty dla tej pozycji"
            aria-label="Rozwiń listę kart"
          >
            <GalleryVerticalEnd className={`w-5 h-5 transition-transform duration-300 rotate-90 ${isOpen ? "opacity-100" : "opacity-80"}`} />
          </button>
        </div>
      </div>

      {/* Expanded Content (Cards List) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
              <div className="w-full h-px bg-gradient-to-r from-amber-500/20 to-transparent mb-4"></div>
              
              <div className="flex flex-wrap gap-2">
                {cards.map(card => {
                  const urlKey = isPartner ? `part-${posKey}` : posKey;
                  return (
                    <Link 
                      key={card.slug} 
                      href={`/znaczenie/${generatePositionSlug(card.slug, isPartner, posKey)}`}
                      className="group/link flex items-center justify-center px-3 py-1 text-sm rounded-md bg-white/50 dark:bg-slate-900/60 border border-black/5 dark:border-white/5 hover:border-amber-500/40 hover:bg-amber-50 dark:hover:bg-[#1A1625] text-slate-700 dark:text-slate-300 transition-all duration-300"
                    >
                      <span className="text-amber-600 dark:text-amber-500 mr-1.5 font-bold text-xs opacity-70 group-hover/link:opacity-100">
                        {String(card.slug).split('-')[0]}
                      </span>
                      <span className="font-serif group-hover/link:text-amber-600 dark:group-hover/link:text-amber-400 transition-colors">
                        {String(card.frontmatter.title)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
