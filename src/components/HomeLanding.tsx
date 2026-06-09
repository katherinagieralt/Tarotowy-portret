import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Moon, Sun, Star, ArrowUp, Compass, Heart, Eye, BookOpen, User, Users } from 'lucide-react';

interface HomeLandingProps {
  lang?: 'pl' | 'en';
  onSelectType: (type: 'INDIVIDUAL' | 'PARTNERSHIP') => void;
}

export function HomeLanding({ lang = 'pl', onSelectType }: HomeLandingProps) {
  const isPl = lang === 'pl';

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div className="w-full relative mt-16 md:mt-32 pb-32">
      {/* Decorative background elements */}
      <div className="absolute top-40 left-0 w-full h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none -z-10"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* HERO SECTION */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center max-w-4xl mx-auto mb-32"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-slate-900 dark:text-white mb-8 leading-tight">
            {isPl ? "Odkryj mapę swojej " : "Discover the map of your "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700 dark:from-amber-300 dark:to-amber-500">
              {isPl ? "podświadomości" : "subconscious"}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            {isPl 
              ? "Tarotowy Portret Psychologiczny to nie wróżbiarstwo. To głębokie psychologiczne lustro oparte na dacie Twojego urodzenia, ujawniające karmiczne lekcje, talenty i życiową misję."
              : "The Psychological Tarot Portrait is not fortune-telling. It is a deep psychological mirror based on your date of birth, revealing karmic lessons, talents, and your life mission."}
          </p>
        </motion.div>

        {/* THREE PILLARS */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40"
        >
          {/* Pillar 1 */}
          <motion.div variants={fadeInUp} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent rounded-3xl transform group-hover:-translate-y-2 transition-transform duration-500 -z-10"></div>
            <div className="bg-white/40 dark:bg-[#1A1625]/40 backdrop-blur-xl border border-black/5 dark:border-white/5 p-10 rounded-3xl h-full shadow-lg hover:shadow-xl transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/40 rounded-2xl flex items-center justify-center mb-8 text-amber-700 dark:text-amber-400">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-4">
                {isPl ? "Archetypy Junga" : "Jungian Archetypes"}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                {isPl 
                  ? "Karty Tarota w tej metodzie to 22 uniwersalne archetypy psychologiczne. Reprezentują one potężne siły działające w ludzkiej psychice, które determinują Twój charakter."
                  : "Tarot cards in this method are 22 universal psychological archetypes. They represent powerful forces operating in the human psyche that determine your character."}
              </p>
            </div>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div variants={fadeInUp} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent rounded-3xl transform group-hover:-translate-y-2 transition-transform duration-500 -z-10"></div>
            <div className="bg-white/40 dark:bg-[#1A1625]/40 backdrop-blur-xl border border-black/5 dark:border-white/5 p-10 rounded-3xl h-full shadow-lg hover:shadow-xl transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 rounded-2xl flex items-center justify-center mb-8 text-purple-700 dark:text-purple-400">
                <Moon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-4">
                {isPl ? "Karma i Cienie" : "Karma & Shadows"}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                {isPl 
                  ? "Odkryj wzorce, które powtarzasz, oraz lęki ukryte w podświadomości. Portret pomaga zidentyfikować karmiczne blokady i przekształcić słabości w największą siłę."
                  : "Discover the patterns you repeat and fears hidden in the subconscious. The portrait helps identify karmic blocks and transform weaknesses into your greatest strength."}
              </p>
            </div>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div variants={fadeInUp} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent rounded-3xl transform group-hover:-translate-y-2 transition-transform duration-500 -z-10"></div>
            <div className="bg-white/40 dark:bg-[#1A1625]/40 backdrop-blur-xl border border-black/5 dark:border-white/5 p-10 rounded-3xl h-full shadow-lg hover:shadow-xl transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/40 dark:to-emerald-800/40 rounded-2xl flex items-center justify-center mb-8 text-emerald-700 dark:text-emerald-400">
                <Sun className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-4">
                {isPl ? "Życiowa Misja" : "Life Mission"}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                {isPl 
                  ? "Zrozum swój ostateczny cel. Kalkulacje ujawniają dary, z którymi przyszedłeś na świat, oraz wskazują, jak realizować swoją misję w harmonii ze sobą."
                  : "Understand your ultimate purpose. Calculations reveal the gifts you brought into the world and show how to fulfill your mission in harmony with yourself."}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* HOW TO WORK WITH IT (Timeline) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-40 max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
              {isPl ? "Jak pracować z kalkulatorem?" : "How to work with the calculator?"}
            </h2>
          </div>
          
          <div className="space-y-8 relative">
            <div className="absolute left-6 md:left-1/2 top-10 bottom-10 w-px bg-gradient-to-b from-amber-500/50 via-purple-500/50 to-transparent md:-translate-x-1/2"></div>
            
            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
              <div className="hidden md:block w-[45%] text-right pr-12">
                <h4 className="text-2xl font-serif text-slate-800 dark:text-white mb-2">{isPl ? "Oblicz Podstawy" : "Calculate Basics"}</h4>
                <p className="text-slate-600 dark:text-slate-300 font-light">
                  {isPl ? "Wpisz datę urodzenia w kalkulatorze na samej górze. System natychmiast wygeneruje zarys Twojego lub Waszego portretu." : "Enter your birth date in the calculator at the very top. The system will instantly generate the outline of your or your partnership portrait."}
                </p>
              </div>
              <div className="absolute left-0 md:left-1/2 w-12 h-12 rounded-full bg-white dark:bg-[#1A1625] border-4 border-amber-500 flex items-center justify-center transform md:-translate-x-1/2 z-10 shadow-lg group-hover:scale-110 transition-transform">
                <span className="font-bold text-amber-600 dark:text-amber-400">1</span>
              </div>
              <div className="md:hidden pl-16 pb-8">
                <h4 className="text-xl font-serif text-slate-800 dark:text-white mb-2">{isPl ? "Oblicz Podstawy" : "Calculate Basics"}</h4>
                <p className="text-slate-600 dark:text-slate-300 font-light">{isPl ? "Wpisz datę urodzenia w kalkulatorze na samej górze." : "Enter your birth date in the calculator at the very top."}</p>
              </div>
              <div className="hidden md:block w-[45%]"></div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
              <div className="hidden md:block w-[45%]"></div>
              <div className="absolute left-0 md:left-1/2 w-12 h-12 rounded-full bg-white dark:bg-[#1A1625] border-4 border-purple-500 flex items-center justify-center transform md:-translate-x-1/2 z-10 shadow-lg group-hover:scale-110 transition-transform">
                <span className="font-bold text-purple-600 dark:text-purple-400">2</span>
              </div>
              <div className="md:w-[45%] md:pl-12 pl-16 pb-8">
                <h4 className="text-2xl font-serif text-slate-800 dark:text-white mb-2">{isPl ? "Eksploruj Pozycje" : "Explore Positions"}</h4>
                <p className="text-slate-600 dark:text-slate-300 font-light">
                  {isPl ? "Klikaj w poszczególne karty, aby czytać opisy. Pozwól wiedzy rezonować – pomyśl, jak archetypy manifestują się w Twoich relacjach i zachowaniach." : "Click on individual cards to read descriptions. Let the knowledge resonate – think about how archetypes manifest in your relationships and behaviors."}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
              <div className="hidden md:block w-[45%] text-right pr-12">
                <h4 className="text-2xl font-serif text-slate-800 dark:text-white mb-2">{isPl ? "Zdobądź Pełnię Wiedzy" : "Gain Full Knowledge"}</h4>
                <p className="text-slate-600 dark:text-slate-300 font-light">
                  {isPl ? "Tarotowy portret psychologiczny to w sumie około 40 pozycji. Darmowy widok pokazuje ułamek całości. Zamów spersonalizowany Raport PDF, aby otrzymać kompendium 17 szczegółowo opisanych pozycji lub 8 w portrecie partnerskim." : "The Psychological Tarot Portrait consists of about 40 positions in total. The free view shows a fraction of the whole. Order a personalized PDF Report to receive a compendium of 17 precisely described positions or 8 in the partnership portrait."}
                </p>
              </div>
              <div className="absolute left-0 md:left-1/2 w-12 h-12 rounded-full bg-white dark:bg-[#1A1625] border-4 border-[#8C6D46] flex items-center justify-center transform md:-translate-x-1/2 z-10 shadow-lg group-hover:scale-110 transition-transform">
                <span className="font-bold text-[#8C6D46] dark:text-[#B89B72]">3</span>
              </div>
              <div className="md:hidden pl-16 pb-8">
                <h4 className="text-xl font-serif text-slate-800 dark:text-white mb-2">{isPl ? "Zdobądź Pełnię Wiedzy" : "Gain Full Knowledge"}</h4>
                <p className="text-slate-600 dark:text-slate-300 font-light">{isPl ? "Zamów spersonalizowany Raport PDF z pełną analizą." : "Order a personalized PDF Report with full analysis."}</p>
              </div>
              <div className="hidden md:block w-[45%]"></div>
            </div>
          </div>
        </motion.div>

        {/* PRODUCTS SECTION */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-slate-900 dark:text-white mb-4">
              {isPl ? "Pełne Raporty PDF" : "Full PDF Reports"}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-light">
              {isPl ? "Inwestycja w samopoznanie, która zostaje z Tobą na całe życie." : "An investment in self-discovery that stays with you for a lifetime."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* INDIVIDUAL PDF CARD */}
            <motion.div variants={fadeInUp} className="group relative rounded-[2.5rem] overflow-hidden p-[1px] isolate">
              {/* Animated border gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-amber-600 to-amber-900 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative h-full bg-[#FDFBF7] dark:bg-[#110D1D] rounded-[2.5rem] p-10 md:p-12 overflow-hidden flex flex-col justify-between z-10">
                <div className="absolute top-0 right-0 p-8 opacity-10 text-amber-500 pointer-events-none transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                  <User className="w-48 h-48" />
                </div>
                
                <div className="relative z-20">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-sm font-semibold tracking-wider uppercase mb-6 border border-amber-200 dark:border-amber-800/50">
                    {isPl ? "Dla Ciebie" : "For You"}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white mb-4">
                    {isPl ? "Portret Indywidualny" : "Individual Portrait"}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-lg font-light leading-relaxed mb-8">
                    {isPl 
                      ? "Kompleksowa, wielostronicowa analiza Twojej osobowości. Odkryj dary, karmiczne wyzwania, misję życiową i głębokie mechanizmy psychologiczne."
                      : "Comprehensive, multi-page analysis of your personality. Discover gifts, karmic challenges, life mission, and deep psychological mechanisms."}
                  </p>
                  
                  <ul className="space-y-4 mb-10">
                    {[
                      isPl ? "17 precyzyjnie opisanych pozycji" : "17 precisely described positions",
                      isPl ? "Szczegółowa analiza Cieni (lęków)" : "Detailed Shadow (fears) analysis",
                      isPl ? "Praktyczne wskazówki rozwojowe" : "Practical development tips",
                      isPl ? "Karmiczny bagaż z poprzednich wcieleń" : "Karmic baggage from past lives"
                    ].map((feat, idx) => (
                      <li key={idx} className="flex items-center text-slate-700 dark:text-slate-200">
                        <CheckIcon className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                        <span className="font-light">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <button 
                      onClick={() => onSelectType('INDIVIDUAL')}
                      className="w-full relative overflow-hidden bg-[#2A241F] dark:bg-[#E8E4D9] text-[#F9F6EE] dark:text-[#0A0710] font-semibold tracking-wide py-5 px-8 rounded-2xl transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] group shadow-lg dark:shadow-[0_0_40px_rgba(232,228,217,0.1)] hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50"
                    >
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 dark:via-black/10 to-transparent group-hover:animate-shimmer" aria-hidden="true"></div>
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isPl ? "Oblicz" : "Calculate"}
                        <ArrowUp className="w-4 h-4" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* PARTNERSHIP PDF CARD */}
            <motion.div variants={fadeInUp} className="group relative rounded-[2.5rem] overflow-hidden p-[1px] isolate">
              {/* Animated border gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-indigo-600 to-purple-900 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative h-full bg-[#FDFBF7] dark:bg-[#110D1D] rounded-[2.5rem] p-10 md:p-12 overflow-hidden flex flex-col justify-between z-10">
                <div className="absolute top-0 right-0 p-8 opacity-10 text-purple-500 pointer-events-none transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700">
                  <Users className="w-48 h-48" />
                </div>
                
                <div className="relative z-20">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-semibold tracking-wider uppercase mb-6 border border-purple-200 dark:border-purple-800/50">
                    {isPl ? "Dla Par i Relacji" : "For Couples & Relationships"}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white mb-4">
                    {isPl ? "Portret Partnerski" : "Partnership Portrait"}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-lg font-light leading-relaxed mb-8">
                    {isPl 
                      ? "Głębokie zanurzenie w dynamikę Waszej relacji. Zrozumcie sens Waszego spotkania, karmiczne powiązania oraz to, jak wspólnie ewoluować."
                      : "A deep dive into the dynamics of your relationship. Understand the meaning of your encounter, karmic connections, and how to evolve together."}
                  </p>
                  
                  <ul className="space-y-4 mb-10">
                    {[
                      isPl ? "8 precyzyjnie opisanych pozycji" : "8 precisely described positions",
                      isPl ? "Analiza dynamiki i wspólnych celów" : "Analysis of dynamics and shared goals",
                      isPl ? "Rozwiązywanie konfliktów (Trudności)" : "Conflict resolution (Difficulties)",
                      isPl ? "Wspólna lekcja i Zadanie relacji" : "Shared lesson and Relationship task"
                    ].map((feat, idx) => (
                      <li key={idx} className="flex items-center text-slate-700 dark:text-slate-200">
                        <CheckIcon className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
                        <span className="font-light">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <button 
                      onClick={() => onSelectType('PARTNERSHIP')}
                      className="w-full relative overflow-hidden bg-[#2A241F] dark:bg-[#E8E4D9] text-[#F9F6EE] dark:text-[#0A0710] font-semibold tracking-wide py-5 px-8 rounded-2xl transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] group shadow-lg dark:shadow-[0_0_40px_rgba(232,228,217,0.1)] hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500/50"
                    >
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 dark:via-black/10 to-transparent group-hover:animate-shimmer" aria-hidden="true"></div>
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isPl ? "Oblicz" : "Calculate"}
                        <ArrowUp className="w-4 h-4" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
