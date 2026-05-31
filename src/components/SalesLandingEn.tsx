"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { CheckCircle2, FileText, ChevronRight, Sparkles, BookOpen, Heart, Shield, Zap, Lock, Layers, Eye, Moon, Star, Plus, Minus } from "lucide-react";

interface SalesLandingProps {
  reportType: "INDIVIDUAL" | "PARTNERSHIP";
  onCheckout: (currency: string) => void;
  checkingOut: boolean;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  },
  viewport: { once: true, margin: "-100px" },
};

export function SalesLandingEn({ reportType, onCheckout, checkingOut }: SalesLandingProps) {
  const isIndividual = reportType === "INDIVIDUAL";
  
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToDigital, setAgreedToDigital] = useState(false);
  const [showError, setShowError] = useState(false);
  const [currency, setCurrency] = useState<"usd" | "eur">("usd");

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && tz.startsWith("Europe/")) {
        setCurrency("eur");
      }
    } catch (e) {
      // fallback to usd
    }
  }, []);

  const handleCheckoutClick = () => {
    if (!agreedToTerms || !agreedToDigital) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onCheckout(currency);
  };

  const LegalCheckboxes = () => (
    <div className="flex flex-col gap-3 sm:gap-2 mt-6 mb-8 text-left max-w-lg mx-auto w-full px-2 sm:px-0">
      <label className="flex items-start gap-3 cursor-pointer group p-2 -ml-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
        <div className="relative flex items-center justify-center mt-0.5 shrink-0">
          <input 
            type="checkbox" 
            checked={agreedToTerms}
            onChange={(e) => { setAgreedToTerms(e.target.checked); setShowError(false); }}
            className="peer appearance-none w-5 h-5 border-2 border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 checked:bg-amber-500 checked:border-amber-500 transition-colors cursor-pointer"
          />
          <CheckCircle2 className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
        </div>
        <span className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 select-none leading-relaxed">
          I accept the <Link href="/regulamin" target="_blank" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">Terms and Conditions</Link> and <Link href="/polityka-prywatnosci" target="_blank" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">Privacy Policy</Link>. *
        </span>
      </label>

      <label className="flex items-start gap-3 cursor-pointer group p-2 -ml-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
        <div className="relative flex items-center justify-center mt-0.5 shrink-0">
          <input 
            type="checkbox" 
            checked={agreedToDigital}
            onChange={(e) => { setAgreedToDigital(e.target.checked); setShowError(false); }}
            className="peer appearance-none w-5 h-5 border-2 border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 checked:bg-amber-500 checked:border-amber-500 transition-colors cursor-pointer"
          />
          <CheckCircle2 className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
        </div>
        <span className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 select-none leading-relaxed">
          I consent to the delivery of digital content before the expiration of the withdrawal period, acknowledging that I thereby lose my right of withdrawal. *
        </span>
      </label>
      
      {showError && (
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500 dark:text-red-400 font-medium mt-1 ml-2">
          You must check the required agreements to proceed to payment.
        </motion.span>
      )}
    </div>
  );

  const benefits = isIndividual
    ? [
        { icon: Moon, title: "In-Depth Shadow Analysis", desc: "Your 'Shadow' represents subconscious fears and desires. Discover your hidden mechanisms and learn how to integrate them, rather than fighting against them." },
        { icon: Zap, title: "Unlocking Potential", desc: "Understand your innate talents. Find out in which areas of life you will flourish the most and how to direct your energy correctly." },
        { icon: Shield, title: "Karmic Lessons", desc: "We all repeat certain patterns. Understand the loops in your life and learn exactly what you must do to finally break them." },
        { icon: Sparkles, title: "Daily Practices", desc: "Theory is not enough. You will receive concrete exercises, affirmations, and guidance tailored specifically to your energetic archetype." },
      ]
    : [
        { icon: Heart, title: "Relationship Foundation", desc: "Discover the true foundation of your relationship and the hidden purpose of your meeting on an energetic level." },
        { icon: Shield, title: "Sources of Conflict", desc: "Understand why certain arguments keep coming back. Discover the hidden sources of misunderstandings and learn how to resolve them constructively." },
        { icon: Eye, title: "Mutual Needs", desc: "What do you subconsciously expect from each other? Find out what space the other person needs and how you can fulfill each other's desires." },
        { icon: Layers, title: "Shared Potential", desc: "As a couple, you create an entirely new quality. Find out what you can build together and how to best support each other's growth." },
      ];

  const price = isIndividual ? "39" : "49";
  const title = isIndividual ? "Uncover Your Full Self" : "Decode Your Relationship";
  const subtitle = isIndividual 
    ? "Get your personalized, approximately 50-page deep-dive e-book into your psyche." 
    : "Get your shared, approximately 30-page deep-dive e-book into your relationship.";

  const hookText = isIndividual 
    ? "The free outline only points the way. But to truly change something, you must dive into the details, face your Shadow, and confront your karma."
    : "The free outline is just the beginning. To heal and strengthen your bond, you must understand the subconscious mechanisms that drive it.";

  const subtitleSuffix = isIndividual
    ? "You receive a powerful developmental tool that combines archetypal wisdom with depth psychology."
    : "You receive a powerful developmental tool for couples that will elevate your relationship to a completely new level of understanding.";

  const quoteText = isIndividual
    ? '"This is not just an ordinary horoscope. It is a mirror where you finally see yourself without illusions or embellishments."'
    : '"This is not just an ordinary relationship horoscope. It is a roadmap that will finally help you understand what is truly happening between you two."';

  return (
    <div className="w-full flex flex-col space-y-24 sm:space-y-32 py-16 sm:py-20 overflow-hidden">
      
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
          What you see is just the tip of the iceberg
        </motion.p>
        <motion.h2 variants={fadeInUp} className="text-4xl sm:text-6xl font-serif font-light text-slate-900 dark:text-white leading-tight">
          True transformation is hidden <span className="italic text-amber-600 dark:text-amber-400">deeper</span>.
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
            className="w-full lg:w-5/12 relative perspective-1000"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-500/10 dark:bg-amber-400/10 blur-[80px] rounded-full -z-20 pointer-events-none"></div>

            <div className="relative w-full max-w-sm mx-auto aspect-[1/1.3] bg-[#FDFBF7] dark:bg-[#0B0914] rounded-2xl shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700">
              <div className="h-40 bg-gradient-to-br from-amber-500/20 via-orange-400/10 to-purple-500/20 dark:from-amber-600/20 dark:to-purple-900/20 w-full relative">
                 <div className="absolute bottom-[-24px] left-8 w-20 h-20 rounded-2xl bg-white dark:bg-[#130F24] shadow-xl border border-black/5 flex items-center justify-center">
                    <FileText className="w-10 h-10 text-amber-600 dark:text-amber-400" />
                 </div>
              </div>
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

              <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 to-transparent pointer-events-none"></div>
            </div>
            
            <div className="absolute top-3 left-3 w-full max-w-sm aspect-[1/1.3] bg-white/40 dark:bg-white/[0.02] rounded-2xl border border-black/5 dark:border-white/5 transform rotate-[3deg] -z-10 backdrop-blur-sm"></div>
            <div className="absolute top-6 left-6 w-full max-w-sm aspect-[1/1.3] bg-white/20 dark:bg-white/[0.01] rounded-2xl border border-black/5 dark:border-white/5 transform rotate-[6deg] -z-20 backdrop-blur-sm"></div>
          </motion.div>

          {/* Copy on the Right */}
          <motion.div 
            initial="hidden" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              whileInView: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="w-full lg:w-7/12 flex flex-col space-y-6"
          >
            <motion.h3 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-900 dark:text-white leading-tight">
              {title}
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed">
              {subtitle} <strong className="text-slate-900 dark:text-white font-medium">{subtitleSuffix}</strong>
            </motion.p>
            
            <motion.ul variants={fadeInUp} className="space-y-4 pt-2">
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-base lg:text-lg">
                <div className="mt-1 bg-amber-100 dark:bg-amber-900/30 p-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                </div>
                <span><strong className="text-slate-900 dark:text-white">Instant Access:</strong> The PDF format lands in your inbox moments after payment.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-base lg:text-lg">
                <div className="mt-1 bg-amber-100 dark:bg-amber-900/30 p-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                </div>
                <span><strong className="text-slate-900 dark:text-white">Premium Aesthetics:</strong> Beautiful, minimalist design, perfect for deep reading.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-base lg:text-lg">
                <div className="mt-1 bg-amber-100 dark:bg-amber-900/30 p-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                </div>
                <span><strong className="text-slate-900 dark:text-white">Substance Over Illusion:</strong> No rigid fortune-telling. Pure psychology and archetypal work.</span>
              </li>
            </motion.ul>

            <motion.div variants={fadeInUp} className="pt-4">
               <LegalCheckboxes />
               <button
                  onClick={handleCheckoutClick}
                  disabled={checkingOut}
                  className="w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 text-white dark:text-slate-900 font-bold text-base py-4 px-10 rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50"
                >
                  <div className="absolute inset-0 bg-white/20 dark:bg-black/10 w-full translate-x-[-100%] group-hover:animate-shimmer pointer-events-none" aria-hidden="true"></div>
                  {checkingOut ? (
                    "Processing Magic..."
                  ) : (
                    <>
                      Get {isIndividual ? "My" : "Our"} E-book ({currency === "eur" ? "€" : "$"}{price}) 
                      <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
               </button>
               <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 flex items-center gap-1.5 font-medium">
                  <Lock className="w-3.5 h-3.5" /> Instant access after secure payment
               </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. SECTION: Deep Dive Benefits (Large Grid) */}
      <section className="bg-[#FDFBF7] dark:bg-[#0B0914]/50 py-32 border-y border-black/5 dark:border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.1] mix-blend-overlay"></div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-amber-500/5 dark:bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <span className="text-amber-600 dark:text-amber-500 text-xs font-bold tracking-widest uppercase mb-4 block">Take a Look Inside</span>
            <h3 className="text-3xl sm:text-5xl font-serif text-slate-900 dark:text-white mb-6">What's in the e-book?</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light">
              It is a powerful dose of condensed knowledge. See which areas we will explore in {isIndividual ? "your personal book of shadows" : "your shared book of relationship"}.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {benefits.map((b, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                className="relative bg-white/80 dark:bg-[#110D1D]/80 backdrop-blur-md p-10 sm:p-12 rounded-[2rem] border border-black/5 dark:border-white/5 overflow-hidden group hover:-translate-y-1 transition-all duration-500 shadow-sm hover:shadow-2xl dark:shadow-none dark:hover:shadow-[0_0_30px_rgba(212,175,55,0.05)]"
              >
                <div className="absolute -right-4 -bottom-8 text-[12rem] font-serif font-bold text-slate-100 dark:text-white/[0.02] leading-none select-none pointer-events-none group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700">
                  0{i + 1}
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-amber-500/0 group-hover:to-amber-500/5 dark:group-hover:to-purple-500/10 transition-colors duration-700 pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-14 h-14 bg-[#FDFBF7] dark:bg-[#1A1625] text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center border border-black/5 dark:border-white/5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm group-hover:border-amber-200 dark:group-hover:border-amber-900/50">
                      <b.icon className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">Section</span>
                      <span className="text-sm font-serif italic text-amber-600 dark:text-amber-500">Chapter 0{i + 1}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-2xl sm:text-3xl font-serif font-medium text-slate-900 dark:text-white mb-4 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-300">
                    {b.title}
                  </h4>
                  <div className="w-12 h-px bg-amber-500/30 group-hover:w-24 transition-all duration-500 mb-6"></div>
                  <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed text-lg group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                    {b.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.5 SECTION: Authority / Social Proof / Risk Reversal */}
      <section className="max-w-5xl mx-auto px-6 text-center space-y-12">
        <motion.div
           initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}
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
            Our algorithms are based on a profound synthesis of Jungian analytical psychology, numerology, and the archetypes of Tarot. You receive a highly precise tool, not a collection of generalities. 
          </p>
        </motion.div>
      </section>

      {/* 4. SECTION: Final CTA */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/50 via-orange-400/80 to-amber-600/50 dark:from-amber-500/20 dark:via-orange-500/50 dark:to-purple-500/20 blur-xl opacity-100 dark:opacity-50 transition-opacity duration-1000"></div>
          
          <div className="bg-white/95 dark:bg-[#0B0914]/90 backdrop-blur-2xl rounded-[3rem] border border-black/5 dark:border-white/10 p-12 sm:p-20 relative z-10 flex flex-col items-center shadow-2xl">
            <h3 className="text-4xl sm:text-5xl font-serif font-light text-slate-900 dark:text-white mb-8 text-center">
              Time for the <span className="italic text-amber-600 dark:text-amber-400">truth</span>?
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10 w-full max-w-lg mx-auto">
              <div className="w-full sm:w-1/2 bg-slate-100 dark:bg-black/30 p-5 rounded-2xl border border-black/5 dark:border-white/5 opacity-60">
                <span className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">In-person Reading</span>
                <span className="font-serif text-2xl text-slate-700 dark:text-slate-400 line-through decoration-slate-400 dark:decoration-slate-600">{currency === "eur" ? "€100" : "$100"} / h</span>
              </div>
              
              <div className="w-full sm:w-1/2 bg-amber-100 dark:bg-amber-900/30 p-6 rounded-2xl border-2 border-amber-400 dark:border-amber-500 shadow-xl sm:scale-110 relative z-10">
                <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest shadow-md">
                  Investment in yourself
                </div>
                <span className="block text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-1">
                  E-book ({isIndividual ? "~ 50 pages" : "~ 30 pages"})
                </span>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-bold text-amber-600 dark:text-amber-400">{currency === "eur" ? "€" : "$"}</span>
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-amber-700 dark:text-amber-300">{price}</span>
                </div>
              </div>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-300 font-light max-w-xl text-center mb-10">
              One-time payment. Lifetime access to your generated PDF report.
            </p>
            
            <LegalCheckboxes />
            
            <button
              onClick={handleCheckoutClick}
              disabled={checkingOut}
              className="w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 dark:to-orange-400 text-white dark:text-black font-bold text-xl py-6 px-16 rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_10px_40px_-10px_rgba(245,158,11,0.5)] hover:shadow-[0_20px_60px_-15px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50"
            >
              <div className="absolute inset-0 bg-white/30 w-full translate-x-[-100%] group-hover:animate-shimmer pointer-events-none" aria-hidden="true"></div>
              {checkingOut ? (
                "Processing Magic..."
              ) : (
                <>
                  Download My Report 
                  <ChevronRight className="w-7 h-7 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 mt-8 text-sm text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-amber-500" /> Secure Stripe Payment</span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-amber-500" /> Guaranteed Instant Delivery</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 5. SECTION: FAQ */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-amber-500/5 dark:bg-amber-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="text-center mb-16 relative z-10">
          <span className="text-amber-600 dark:text-amber-400 text-sm font-bold tracking-widest uppercase mb-4 block">Clearing Doubts</span>
          <h3 className="text-4xl sm:text-5xl font-serif font-light text-slate-900 dark:text-white mb-6">
            Got <span className="italic text-amber-600 dark:text-amber-400">questions?</span>
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto">
            Before deciding to discover your psychological profile, check the answers to the most common questions we receive from clients.
          </p>
        </div>
        
        <div className="space-y-4 relative z-10">
          {[
            {
              q: "Do I need to know my exact time of birth?",
              a: "No. Unlike traditional birth astrology, the Tarot Portrait is calculated purely based on your day, month, and year of birth. The exact time is not necessary."
            },
            {
              q: "How fast will I receive my report?",
              a: "The report is generated automatically and sent to your provided email address immediately upon payment confirmation (which usually takes a few seconds). Remember to check your SPAM folder if you don't see the message in your main inbox."
            },
            {
              q: "How is this different from a standard 'tarot reading'?",
              a: "This is not fortune-telling. The report is based on a mathematical-numerological calculation of your personal archetypes (in alignment with C.G. Jung's psychology) and maps them to the Major Arcana of Tarot. It provides a deep psychological analysis of your conditioning, rather than predicting your future."
            },
            {
              q: "Can I print the PDF file?",
              a: "Absolutely! The report is formatted in a highly readable and elegant layout, perfect for reading on screens (phone, tablet, computer) as well as for traditional printing at home."
            }
          ].map((faq, i) => {
            const [isOpen, setIsOpen] = useState(false);
            return (
              <div key={i} className="bg-white/60 dark:bg-[#130F24]/40 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-amber-500/30 hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(212,175,55,0.05)] group">
                <button 
                  onClick={() => setIsOpen(!isOpen)} 
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none"
                >
                  <span className="font-serif font-medium text-lg sm:text-xl text-slate-900 dark:text-[#E8E4D9] pr-4 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{faq.q}</span>
                  <div className={`flex-shrink-0 transition-transform duration-500 ${isOpen ? "rotate-180 text-amber-500" : "text-slate-400 dark:text-slate-500 group-hover:text-amber-500"}`}>
                    {isOpen ? <Minus className="w-5 h-5 sm:w-6 sm:h-6" /> : <Plus className="w-5 h-5 sm:w-6 sm:h-6" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                     <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 text-slate-600 dark:text-[#B89B72] leading-relaxed font-light text-base sm:text-lg">
                        <div className="w-12 h-px bg-amber-500/30 mb-6"></div>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
