"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, FileText, ChevronRight, Sparkles, BookOpen, Heart, Shield, Zap, Lock, Layers, Eye, Moon, Star } from "lucide-react";

interface SalesLandingProps {
  reportType: "INDIVIDUAL" | "PARTNERSHIP";
  onCheckout: () => void;
  checkingOut: boolean;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
};

export function SalesLanding({ reportType, onCheckout, checkingOut }: SalesLandingProps) {
  const isIndividual = reportType === "INDIVIDUAL";

  const benefits = isIndividual
    ? [
        { icon: Moon, title: "Dogłębna Analiza Cienia", desc: "Twój 'Cień' to zepchnięte do podświadomości lęki i pragnienia. Poznaj swoje podświadome mechanizmy i naucz się z nimi pracować, zamiast z nimi walczyć." },
        { icon: Zap, title: "Odkrycie Potencjału", desc: "Zrozum swoje wrodzone talenty. Dowiedz się, w jakich obszarach życia rozkwitniesz najbardziej i jak skierować energię na właściwe tory." },
        { icon: Shield, title: "Lekcje Karmiczne", desc: "Każdy z nas powtarza pewne schematy. Zrozum pętle w Twoim życiu i dowiedz się, co dokładnie musisz zrobić, aby je ostatecznie przełamać." },
        { icon: Sparkles, title: "Praktyki na co dzień", desc: "Teoria to nie wszystko. Otrzymasz konkretne ćwiczenia, afirmacje i wskazówki dopasowane ściśle do Twojego archetypu energetycznego." },
      ]
    : [
        { icon: Heart, title: "Fundament Relacji", desc: "Odkryjcie prawdziwy fundament waszego związku i ukryty cel waszego spotkania na poziomie energetycznym." },
        { icon: Shield, title: "Źródła Konfliktów", desc: "Zrozumcie dlaczego pewne kłótnie wciąż wracają. Poznajcie ukryte źródła nieporozumień i nauczcie się je konstruktywnie rozwiązywać." },
        { icon: Eye, title: "Wzajemne Potrzeby", desc: "Czego podświadomie od siebie oczekujecie? Dowiedzcie się, jakich przestrzeni potrzebuje partner i jak możecie to sobie wzajemnie dawać." },
        { icon: Layers, title: "Wspólny Potencjał", desc: "Jako para tworzycie zupełnie nową jakość. Dowiedzcie się, co możecie razem zbudować i jak najlepiej wspierać się w rozwoju." },
      ];

  const price = isIndividual ? "99" : "129";
  const title = isIndividual ? "Poznaj Pełen Obraz Siebie" : "Rozkoduj Waszą Relację";
  const subtitle = isIndividual 
    ? "Odbierz swój spersonalizowany, ponad 20-stronicowy przewodnik po Twojej psychice." 
    : "Odbierzcie wasz wspólny, ponad 20-stronicowy przewodnik po waszej relacji.";

  const hookText = isIndividual 
    ? "Zarys z darmowego czytania wskazuje Ci kierunek. Ale żeby naprawdę coś zmienić, musisz wejść w detale, poznać swój Cień i zmierzyć się z karmą."
    : "Zarys z darmowego czytania to dopiero początek. Aby uzdrowić i wzmocnić Waszą relację, musicie zrozumieć podświadome mechanizmy, które nią sterują.";

  const subtitleSuffix = isIndividual
    ? "Otrzymujesz potężne narzędzie rozwojowe, które łączy mądrość archetypów z psychologią głębi."
    : "Otrzymujecie potężne narzędzie rozwojowe dla par, które pozwoli Wam przenieść Wasz związek na zupełnie nowy poziom zrozumienia.";

  const quoteText = isIndividual
    ? '"To nie jest zwykły horoskop. To lustro, w którym wreszcie zobaczysz siebie bez iluzji i upiększeń."'
    : '"To nie jest zwykły horoskop partnerski. To mapa drogowa, dzięki której wreszcie zrozumiecie, co naprawdę dzieje się w Waszej relacji."';

  return (
    <div className="w-full flex flex-col space-y-32 sm:space-y-48 py-24 sm:py-32 overflow-hidden">
      
      {/* 1. SECTION: The Hook */}
      <motion.section 
        initial="hidden" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          whileInView: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
        className="max-w-4xl mx-auto px-6 text-center space-y-8"
      >
        <motion.p variants={fadeInUp} className="text-amber-600 dark:text-amber-400 font-bold tracking-widest uppercase text-sm">
          To co widzisz to tylko wierzchołek
        </motion.p>
        <motion.h2 variants={fadeInUp} className="text-4xl sm:text-6xl font-serif font-light text-slate-900 dark:text-white leading-tight">
          Prawdziwa transformacja ukryta jest <span className="italic text-amber-600 dark:text-amber-400">głębiej</span>.
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-lg sm:text-2xl text-slate-600 dark:text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
          {hookText}
        </motion.p>
      </motion.section>

      {/* 2. SECTION: Product Visual & Core Value */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Mockup on the Left */}
          <motion.div 
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative perspective-1000"
          >
            {/* Glowing orb behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-500/10 dark:bg-amber-400/10 blur-[100px] rounded-full -z-20 pointer-events-none"></div>

            {/* Abstract PDF Document Representation */}
            <div className="relative w-full max-w-md mx-auto aspect-[1/1.4] bg-[#FDFBF7] dark:bg-[#0B0914] rounded-2xl shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700">
              {/* Header decor */}
              <div className="h-40 bg-gradient-to-br from-amber-500/20 via-orange-400/10 to-purple-500/20 dark:from-amber-600/20 dark:to-purple-900/20 w-full relative">
                 <div className="absolute bottom-[-24px] left-8 w-20 h-20 rounded-2xl bg-white dark:bg-[#130F24] shadow-xl border border-black/5 flex items-center justify-center">
                    <FileText className="w-10 h-10 text-amber-600 dark:text-amber-400" />
                 </div>
              </div>
              {/* Content lines decor */}
              <div className="p-10 pt-16 space-y-8">
                <div className="w-3/4 h-8 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                <div className="w-1/2 h-5 bg-amber-100 dark:bg-amber-900/30 rounded-md mb-8"></div>
                
                <div className="space-y-4">
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-800/50 rounded-full"></div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-800/50 rounded-full"></div>
                  <div className="w-5/6 h-3 bg-slate-100 dark:bg-slate-800/50 rounded-full"></div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-800/50 rounded-full"></div>
                  <div className="w-4/5 h-3 bg-slate-100 dark:bg-slate-800/50 rounded-full"></div>
                </div>
              </div>

              {/* Glowing effect in background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Document shadow/stack effect */}
            <div className="absolute top-4 left-4 w-full max-w-md aspect-[1/1.4] bg-white/40 dark:bg-white/[0.02] rounded-2xl border border-black/5 dark:border-white/5 transform rotate-[3deg] -z-10 backdrop-blur-sm"></div>
            <div className="absolute top-8 left-8 w-full max-w-md aspect-[1/1.4] bg-white/20 dark:bg-white/[0.01] rounded-2xl border border-black/5 dark:border-white/5 transform rotate-[6deg] -z-20 backdrop-blur-sm"></div>
          </motion.div>

          {/* Copy on the Right */}
          <motion.div 
            initial="hidden" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              whileInView: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="w-full lg:w-1/2 flex flex-col space-y-8"
          >
            <motion.h3 variants={fadeInUp} className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white leading-tight">
              {title}
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-xl text-slate-600 dark:text-slate-300 font-light leading-relaxed">
              {subtitle} <strong className="text-slate-900 dark:text-white font-medium">{subtitleSuffix}</strong>
            </motion.p>
            
            <motion.ul variants={fadeInUp} className="space-y-5 pt-4">
              <li className="flex items-start gap-4 text-slate-700 dark:text-slate-300 text-lg">
                <div className="mt-1 bg-amber-100 dark:bg-amber-900/30 p-1 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                </div>
                <span><strong className="text-slate-900 dark:text-white">Natychmiastowy dostęp:</strong> Format PDF ląduje na Twoim mailu chwilę po opłaceniu.</span>
              </li>
              <li className="flex items-start gap-4 text-slate-700 dark:text-slate-300 text-lg">
                <div className="mt-1 bg-amber-100 dark:bg-amber-900/30 p-1 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                </div>
                <span><strong className="text-slate-900 dark:text-white">Estetyka premium:</strong> Piękny, ascetyczny design idealny do druku, czytania na tablecie lub telefonie.</span>
              </li>
              <li className="flex items-start gap-4 text-slate-700 dark:text-slate-300 text-lg">
                <div className="mt-1 bg-amber-100 dark:bg-amber-900/30 p-1 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                </div>
                <span><strong className="text-slate-900 dark:text-white">Konkret zamiast iluzji:</strong> Zero sztywnych przepowiedni. Czysta psychologia, archetypy i głęboka intuicja.</span>
              </li>
            </motion.ul>

            <motion.div variants={fadeInUp} className="pt-6">
               <button
                  onClick={onCheckout}
                  disabled={checkingOut}
                  className="w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 text-white dark:text-slate-900 font-bold text-base py-4 px-10 rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50"
                >
                  <div className="absolute inset-0 bg-white/20 dark:bg-black/10 w-full translate-x-[-100%] group-hover:animate-shimmer pointer-events-none" aria-hidden="true"></div>
                  {checkingOut ? (
                    "Przetwarzam Magię..."
                  ) : (
                    <>
                      Odbieram {isIndividual ? "Mój" : "Nasz"} Raport ({price} PLN) 
                      <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
               </button>
               <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 flex items-center gap-1.5 font-medium">
                  <Lock className="w-3.5 h-3.5" /> Dostęp natychmiastowy po opłaceniu
               </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. SECTION: Deep Dive Benefits (Large Grid) */}
      <section className="bg-[#FDFBF7] dark:bg-[#0B0914]/50 py-32 border-y border-black/5 dark:border-white/5 relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.1] mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h3 className="text-3xl sm:text-5xl font-serif text-slate-900 dark:text-white mb-6">Co znajdziesz w środku?</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light">
              Raport to przeszło 20 stron skondensowanej wiedzy o Tobie. Zobacz, w jakie sfery zagłębimy się w Twojej osobistej książce cieni.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {benefits.map((b, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white dark:bg-[#130F24] p-10 sm:p-12 rounded-[2rem] border border-black/5 dark:border-white/5 shadow-sm hover:shadow-xl dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-shadow duration-500 group"
              >
                <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <b.icon className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-serif font-medium text-slate-900 dark:text-white mb-4">{b.title}</h4>
                <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed text-lg">
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.5 SECTION: Authority / Social Proof / Risk Reversal */}
      <section className="max-w-5xl mx-auto px-6 text-center space-y-12">
        <motion.div
           initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
           className="bg-amber-50 dark:bg-[#130F24]/80 border border-amber-100 dark:border-amber-900/30 rounded-3xl p-10 sm:p-16 relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex justify-center gap-1 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 text-amber-500 fill-amber-500" />
            ))}
          </div>
          
          <h3 className="text-2xl sm:text-4xl font-serif text-slate-900 dark:text-white mb-6 leading-relaxed">
            {quoteText}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg font-light max-w-2xl mx-auto">
            Nasze algorytmy opierają się na głębokiej syntezie psychologii analitycznej Junga, numerologii i archetypów tarota. Otrzymujesz precyzyjne narzędzie, a nie zbiór ogólników. 
          </p>
        </motion.div>
      </section>

      {/* 4. SECTION: Final CTA */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="relative"
        >
          {/* Animated gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/50 via-orange-400/80 to-amber-600/50 dark:from-amber-500/20 dark:via-orange-500/50 dark:to-purple-500/20 blur-xl opacity-100 dark:opacity-50 transition-opacity duration-1000"></div>
          
          <div className="bg-white/95 dark:bg-[#0B0914]/90 backdrop-blur-2xl rounded-[3rem] border border-black/5 dark:border-white/10 p-12 sm:p-20 relative z-10 flex flex-col items-center shadow-2xl">
            <h3 className="text-4xl sm:text-5xl font-serif font-light text-slate-900 dark:text-white mb-8">
              Gotowy na <span className="italic text-amber-600 dark:text-amber-400">prawdę</span>?
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10 w-full max-w-lg mx-auto">
              <div className="w-full sm:w-1/2 bg-slate-100 dark:bg-black/30 p-5 rounded-2xl border border-black/5 dark:border-white/5 opacity-60">
                <span className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">Indywidualny Odczyt</span>
                <span className="font-serif text-2xl text-slate-700 dark:text-slate-400 line-through decoration-slate-400 dark:decoration-slate-600">250 PLN / h</span>
              </div>
              
              <div className="w-full sm:w-1/2 bg-amber-100 dark:bg-amber-900/30 p-6 rounded-2xl border-2 border-amber-400 dark:border-amber-500 shadow-xl sm:scale-110 relative z-10">
                <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest shadow-md">
                  Inwestycja w siebie
                </div>
                <span className="block text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-1">Raport (20+ stron)</span>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-amber-700 dark:text-amber-300">{price}</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">PLN</span>
                </div>
              </div>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-300 font-light max-w-xl text-center mb-10">
              Jednorazowa opłata. Dożywotni dostęp do wygenerowanego pliku PDF.
            </p>
            
            <button
              onClick={onCheckout}
              disabled={checkingOut}
              className="w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 dark:to-orange-400 text-white dark:text-black font-bold text-xl py-6 px-16 rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_10px_40px_-10px_rgba(245,158,11,0.5)] hover:shadow-[0_20px_60px_-15px_rgba(245,158,11,0.6)] disabled:opacity-70 disabled:cursor-not-allowed hover:scale-105 active:scale-95 group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50"
            >
              <div className="absolute inset-0 bg-white/30 w-full translate-x-[-100%] group-hover:animate-shimmer pointer-events-none" aria-hidden="true"></div>
              {checkingOut ? (
                "Przetwarzam Magię..."
              ) : (
                <>
                  Pobieram Mój Raport 
                  <ChevronRight className="w-7 h-7 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 mt-8 text-sm text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-amber-500" /> Szyfrowana płatność Stripe</span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-amber-500" /> Gwarancja natychmiastowej dostawy</span>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
