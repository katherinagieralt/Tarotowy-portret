"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, User, Users, Lock, ChevronRight, Stars } from "lucide-react";
import Image from "next/image";
import { SalesLanding } from "@/components/SalesLanding";

const formSchema = z.object({
  reportType: z.enum(["INDIVIDUAL", "PARTNERSHIP"]),
  name1: z.string().min(1, "Podaj swoje imię"),
  date1: z.string().min(1, "Wybierz datę"),
  name2: z.string().optional(),
  date2: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export default function Home() {
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const [reportType, setReportType] = useState<"INDIVIDUAL" | "PARTNERSHIP">("INDIVIDUAL");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportType: "INDIVIDUAL",
      name1: "",
      date1: "",
      name2: "",
      date2: "",
    },
  });

  const watchReportType = form.watch("reportType");

  useEffect(() => {
    const saved = localStorage.getItem("tarotFormState");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name1) form.setValue("name1", parsed.name1);
        if (parsed.date1) form.setValue("date1", parsed.date1);
        if (parsed.name2) form.setValue("name2", parsed.name2);
        if (parsed.date2) form.setValue("date2", parsed.date2);
      } catch (e) {}
    }
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem("tarotFormState", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onCalculate = async (data: FormData) => {
    if (data.reportType === "PARTNERSHIP" && (!data.name2 || !data.date2)) {
      toast.error("Wypełnij dane Drugiej Osoby");
      return;
    }

    setCalculating(true);
    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportType: data.reportType,
          name1: data.name1,
          date1: data.date1,
          name2: data.name2 || undefined,
          date2: data.date2 || undefined,
        }),
      });

      const json = await response.json();

      if (!json.success) {
        toast.error(json.error || "Nie udało się obliczyć portretu");
        return;
      }

      setResult({
        ...json.data,
        names: {
          person1: data.name1,
          person2: data.name2,
        }
      });
      setReportType(data.reportType);
      
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } catch (error) {
      toast.error("Błąd połączenia z serwerem");
      console.error(error);
    } finally {
      setCalculating(false);
    }
  };

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      const formValues = form.getValues();
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportType: formValues.reportType,
          name1: formValues.name1,
          date1: formValues.date1,
          name2: formValues.name2 || undefined,
          date2: formValues.date2 || undefined,
          locale: "pl",
        }),
      });

      const json = await response.json();

      if (!json.success || !json.sessionUrl) {
        toast.error(json.error || "Nie udało się stworzyć sesji płatności");
        return;
      }

      window.location.href = json.sessionUrl;
    } catch (error) {
      toast.error("Błąd podczas przygotowania płatności");
      console.error(error);
    } finally {
      setCheckingOut(false);
    }
  };

  const toRoman = (num: number): string => {
    const romanMap: Record<number, string> = {
      1: "I", 2: "II", 3: "III", 4: "IV", 5: "V", 6: "VI", 7: "VII", 8: "VIII", 9: "IX", 10: "X",
      11: "XI", 12: "XII", 13: "XIII", 14: "XIV", 15: "XV", 16: "XVI", 17: "XVII", 18: "XVIII", 19: "XIX", 20: "XX",
      21: "XXI", 22: "XXII"
    };
    return romanMap[num] || String(num);
  };

  return (
    <main className="min-h-screen bg-transparent text-[#2A241F] dark:text-[#E8E4D9] overflow-hidden relative selection:bg-[#D4AF37]/30 selection:text-[#5C4505] dark:selection:bg-[#D4AF37]/20 dark:selection:text-[#F3EFE7] transition-colors duration-500">
      
      {/* Background Overlays - Adapts to Light/Dark */}
      <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 pointer-events-none" aria-hidden="true">
        {/* Light Mode Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FFFFFF]/60 via-transparent to-transparent dark:hidden transition-colors duration-500"></div>
        {/* Dark Mode Gradient */}
        <div className="hidden dark:block absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#130F24]/50 via-transparent to-transparent transition-colors duration-500"></div>
        
        {/* Soft glowing orbs */}
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#E3DBCB]/30 dark:bg-[#3B1F54]/15 blur-[120px] mix-blend-multiply dark:mix-blend-screen transition-colors duration-500"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#FDFBF7]/40 dark:bg-[#B89B72]/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen transition-colors duration-500"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-[#D4AF37]/10 dark:bg-[#110D1D]/30 blur-[150px] mix-blend-multiply dark:mix-blend-screen transition-colors duration-500"></div>
        
        {/* Noise overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] dark:opacity-[0.15] mix-blend-overlay transition-opacity duration-500"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-10 pb-16 sm:pt-16 sm:pb-32 relative z-10 flex flex-col items-center">
        {/* Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-16 space-y-6"
        >
          <h1 className="text-5xl sm:text-7xl font-light mb-6 tracking-tight font-serif text-slate-900 dark:text-white transition-colors duration-500">
            Tarotowy <span className="italic text-transparent bg-clip-text bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-700 pr-2 pb-1">Portret</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-light leading-relaxed transition-colors duration-500">
            To narzędzie do autorefleksji, symbolicznej pracy z psychiką <br className="hidden sm:block" /> i odkrywania siebie.
          </p>
        </motion.div>

        {/* Minimalist Form */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full max-w-2xl"
        >
          <div className="bg-white/60 dark:bg-white/[0.02] backdrop-blur-2xl border border-black/5 dark:border-white/[0.05] rounded-[2rem] p-8 sm:p-12 shadow-xl dark:shadow-2xl relative overflow-hidden group transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] dark:from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <form onSubmit={form.handleSubmit(onCalculate)} className="space-y-10 relative z-10">
              {/* Report Type Selector */}
              <motion.div variants={fadeInUp} className="space-y-4">
                <fieldset>
                  <legend className="block text-sm font-medium text-slate-700 dark:text-slate-300 text-center mb-4 transition-colors">Rodzaj Portretu</legend>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`relative cursor-pointer rounded-2xl border p-4 transition-all duration-300 flex flex-col items-center justify-center text-center gap-2 focus-within:ring-2 focus-within:ring-amber-500 ${watchReportType === 'INDIVIDUAL' ? 'bg-amber-100 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/50 text-amber-800 dark:text-amber-300 shadow-sm dark:shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'bg-white/50 dark:bg-slate-900/50 border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'}`}>
                      <input type="radio" value="INDIVIDUAL" {...form.register("reportType")} className="sr-only peer" />
                      <div className={`flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-500 peer-checked:bg-transparent ${watchReportType === 'INDIVIDUAL' ? 'text-amber-700 dark:text-amber-300' : 'text-slate-500 dark:text-slate-400'}`}>
                        <User className="w-4 h-4" aria-hidden="true" />
                        <span className="text-sm font-medium tracking-wide">Indywidualny</span>
                      </div>
                    </label>
                    <label className={`relative cursor-pointer rounded-2xl border p-4 transition-all duration-300 flex flex-col items-center justify-center text-center gap-2 focus-within:ring-2 focus-within:ring-purple-500 ${watchReportType === 'PARTNERSHIP' ? 'bg-purple-100 dark:bg-purple-500/10 border-purple-300 dark:border-purple-500/50 text-purple-800 dark:text-purple-300 shadow-sm dark:shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'bg-white/50 dark:bg-slate-900/50 border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'}`}>
                      <input type="radio" value="PARTNERSHIP" {...form.register("reportType")} className="sr-only peer" />
                      <div className={`flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-500 peer-checked:bg-transparent ${watchReportType === 'PARTNERSHIP' ? 'text-purple-700 dark:text-purple-300' : 'text-slate-500 dark:text-slate-400'}`}>
                        <Users className="w-4 h-4" aria-hidden="true" />
                        <span className="text-sm font-medium tracking-wide">Partnerski</span>
                      </div>
                    </label>
                  </div>
                </fieldset>
              </motion.div>

              <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name1" className="block text-xs font-bold tracking-widest text-slate-600 dark:text-slate-300 uppercase px-1 transition-colors">
                    {watchReportType === 'PARTNERSHIP' ? 'Twoje Imię' : 'Imię'}
                  </label>
                  <input
                    id="name1"
                    type="text"
                    {...form.register("name1")}
                    placeholder="np. Anna"
                    className="w-full px-5 py-4 bg-white/50 dark:bg-white/[0.03] border border-black/10 dark:border-white/20 hover:border-black/20 dark:hover:border-white/30 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-white/[0.08] focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 transition-all duration-300"
                    aria-invalid={form.formState.errors.name1 ? "true" : "false"}
                  />
                  {form.formState.errors.name1 && <p className="text-red-500 dark:text-red-400 text-sm font-medium px-2">{form.formState.errors.name1.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="date1" className="block text-xs font-bold tracking-widest text-slate-600 dark:text-slate-300 uppercase px-1 transition-colors">Data urodzenia</label>
                  <input
                    id="date1"
                    type="date"
                    {...form.register("date1")}
                    className="w-full px-5 py-4 bg-white/50 dark:bg-white/[0.03] border border-black/10 dark:border-white/20 hover:border-black/20 dark:hover:border-white/30 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-white/[0.08] focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 transition-all duration-300 dark:[color-scheme:dark]"
                    aria-invalid={form.formState.errors.date1 ? "true" : "false"}
                  />
                  {form.formState.errors.date1 && <p className="text-red-500 dark:text-red-400 text-sm font-medium px-2">{form.formState.errors.date1.message}</p>}
                </div>
              </motion.div>

              <AnimatePresence mode="popLayout">
                {watchReportType === "PARTNERSHIP" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2"
                  >
                    <div className="space-y-2">
                      <label htmlFor="name2" className="block text-xs font-bold tracking-widest text-slate-600 dark:text-slate-300 uppercase px-1 transition-colors">Imię drugiej osoby</label>
                      <input
                        id="name2"
                        type="text"
                        {...form.register("name2")}
                        placeholder="np. Marek"
                        className="w-full px-5 py-4 bg-white/50 dark:bg-white/[0.03] border border-black/10 dark:border-white/20 hover:border-black/20 dark:hover:border-white/30 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-white/[0.08] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                        aria-invalid={form.formState.errors.name2 ? "true" : "false"}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="date2" className="block text-xs font-bold tracking-widest text-slate-600 dark:text-slate-300 uppercase px-1 transition-colors">Data urodzenia drugiej osoby</label>
                      <input
                        id="date2"
                        type="date"
                        {...form.register("date2")}
                        className="w-full px-5 py-4 bg-white/50 dark:bg-white/[0.03] border border-black/10 dark:border-white/20 hover:border-black/20 dark:hover:border-white/30 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-white/[0.08] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 dark:[color-scheme:dark]"
                        aria-invalid={form.formState.errors.date2 ? "true" : "false"}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div variants={fadeInUp} className="pt-2">
                <button
                  type="submit"
                  disabled={calculating}
                  className="w-full relative overflow-hidden bg-[#2A241F] dark:bg-[#E8E4D9] text-[#F9F6EE] dark:text-[#0A0710] font-semibold tracking-wide py-5 px-8 rounded-2xl transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed group shadow-lg dark:shadow-[0_0_40px_rgba(232,228,217,0.1)] hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D4AF37]/50"
                >
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 dark:via-black/10 to-transparent group-hover:animate-shimmer" aria-hidden="true"></div>
                  
                  <span className="relative flex items-center justify-center gap-3">
                    {calculating ? (
                      <span className="flex items-center gap-2">Przeliczanie Energii <Sparkles className="w-4 h-4 animate-spin text-[#D4AF37]" aria-hidden="true" /></span>
                    ) : (
                      <>Pokaż Zarys Portretu</>
                    )}
                  </span>
                </button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Result Section */}
      <AnimatePresence>
        {result && (
          <motion.div 
            id="result-section" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full border-t border-black/5 dark:border-white/5 bg-[#FDFBF7]/80 dark:bg-[#0B0914]/80 backdrop-blur-3xl py-24 sm:py-32 relative z-10 transition-colors duration-500 scroll-mt-24"
          >
            <div className="max-w-6xl mx-auto px-6">
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center mb-20"
              >
                <span className="px-4 py-1.5 rounded-full bg-[#EBE5D9]/50 dark:bg-white/[0.03] border border-[#8C6D46]/20 dark:border-white/10 text-[#5C4505] dark:text-[#E8E4D9] text-xs font-semibold tracking-widest uppercase mb-6 inline-block shadow-sm transition-colors duration-500">
                  {reportType === "INDIVIDUAL" ? 'Portret Indywidualny' : 'Portret Partnerski'}
                </span>
                <h2 className="text-4xl sm:text-5xl font-serif font-light text-[#2A241F] dark:text-white mb-2 transition-colors duration-500">
                  Zarys Twojego <span className="italic text-[#8C6D46] dark:text-[#B89B72]">Przeznaczenia</span>
                </h2>
                <p className="text-3xl sm:text-4xl font-serif text-[#8C6D46] dark:text-[#B89B72] font-medium max-w-xl mx-auto transition-colors duration-500 mt-2 mb-6">
                  {reportType === "PARTNERSHIP" ? `${result.names.person1} & ${result.names.person2}` : result.names.person1}
                </p>
              </motion.div>

              {/* Grid of Minimalist Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {result.allCards?.map((card: any, idx: number) => {
                  if (!card.positionMeaning) return null;
                  
                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: idx * 0.05 }}
                      key={idx} 
                      className="flex flex-col items-center"
                    >
                      {/* Modern Tarot Card Representation with Flip Effect */}
                      <div className="w-52 h-[22rem] shrink-0 mb-8 [perspective:1000px] group" aria-hidden="true">
                        {/* Translate Y wrapper */}
                        <div className="relative w-full h-full transition-transform duration-700 group-hover:-translate-y-4">
                          {/* 3D Rotate wrapper */}
                          <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                            
                            {/* FRONT OF CARD */}
                            <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-xl bg-gradient-to-b from-[#FFFFFF]/80 dark:from-[#FFFFFF]/5 to-[#FFFFFF]/30 dark:to-transparent border border-black/10 dark:border-white/20 overflow-hidden shadow-xl dark:shadow-none transition-all duration-700 group-hover:border-[#D4AF37]/50 group-hover:shadow-[0_20px_60px_-15px_rgba(212,175,55,0.3)] flex flex-col items-center justify-center">
                              <Image 
                                src={`/arkana/${card.number}.jpg`}
                                alt={card.name}
                                fill
                                sizes="(max-width: 768px) 208px, 208px"
                                className="object-cover object-center"
                              />
                              
                              {/* Internal subtle glow over image */}
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-[#130F24]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"></div>
                            </div>

                            {/* BACK OF CARD */}
                            <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl bg-[#F9F6EE] dark:bg-[#130F24] border border-[#D4AF37]/40 dark:border-[#B89B72]/30 overflow-hidden flex flex-col items-center justify-center p-5 text-center shadow-xl z-20">
                              <div className="absolute inset-0 opacity-[0.03] dark:opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay pointer-events-none"></div>
                              <h4 className="text-[#8C6D46] dark:text-[#B89B72] font-serif text-lg mb-2 leading-tight">{card.name}</h4>
                              <p className="text-[0.65rem] sm:text-[0.7rem] text-slate-700 dark:text-[#E8E4D9]/80 leading-relaxed overflow-hidden line-clamp-[12]">
                                {card.description}
                              </p>
                              
                              {/* Shimmer effect on the back */}
                              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-shimmer z-20 pointer-events-none"></div>
                            </div>
                            
                          </div>
                        </div>
                      </div>

                      <div className="text-center px-4 w-full">
                        {/* Card Name */}
                        <h3 className="text-lg font-serif italic text-[#8C6D46] dark:text-[#B89B72] mb-3 transition-colors">
                          {card.number}. {card.name}
                        </h3>
                        
                        {/* Position Name */}
                        <h4 className="text-sm font-bold uppercase tracking-widest text-[#2A241F] dark:text-[#E8E4D9] mb-4 relative inline-block transition-colors">
                          {card.positionMeaning.title}
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-px bg-[#D4AF37]/50"></div>
                        </h4>
                        
                        {/* Position Description */}
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-[300px] mx-auto font-light transition-colors">
                          {card.positionMeaning.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>



              {/* Enhanced Sales Landing Page for PDF */}
              <SalesLanding 
                reportType={reportType}
                onCheckout={handleCheckout}
                checkingOut={checkingOut}
              />

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
