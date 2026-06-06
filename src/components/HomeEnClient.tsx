"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, User, Users, Lock, ChevronRight, Stars } from "lucide-react";
import Image from "next/image";
import { SalesLandingEn } from "@/components/SalesLandingEn";
import { InteractiveTarotCard } from "@/components/InteractiveTarotCard";

const formSchema = z.object({
  reportType: z.enum(["INDIVIDUAL", "PARTNERSHIP"]),
  name1: z.string().min(1, "Please enter your name"),
  date1: z.string().min(1, "Please select a date"),
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

export default function HomeEn() {
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
    const saved = localStorage.getItem("tarotFormStateEn");
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
      localStorage.setItem("tarotFormStateEn", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onCalculate = async (data: FormData) => {
    if (data.reportType === "PARTNERSHIP" && (!data.name2 || !data.date2)) {
      toast.error("Please fill in the Second Person's details");
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
          locale: "en",
        }),
      });

      const json = await response.json();

      if (!json.success) {
        toast.error(json.error || "Failed to calculate the portrait");
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
      toast.error("Connection error");
      console.error(error);
    } finally {
      setCalculating(false);
    }
  };

  const handleCheckout = async (currency: string = "usd") => {
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
          locale: "en",
          currency: currency,
        }),
      });

      const json = await response.json();

      if (!json.success || !json.sessionUrl) {
        toast.error(json.error || "Failed to create checkout session");
        return;
      }

      window.location.href = json.sessionUrl;
    } catch (error) {
      toast.error("Error during checkout preparation");
      console.error(error);
    } finally {
      setCheckingOut(false);
    }
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

      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-10 pb-16 md:pt-16 md:pb-32 relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16 space-y-6 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-light mb-4 md:mb-6 tracking-tight font-serif text-slate-900 dark:text-white transition-colors duration-500">
            Tarot <span className="italic text-transparent bg-clip-text bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-700 pr-2 pb-1">Portrait</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-light leading-relaxed transition-colors duration-500">
            An advanced Tarot calculator based on depth psychology. Calculate your Psychological Tarot Portrait to uncover subconscious mechanisms and your life's true potential.
          </p>
        </div>

        {/* Minimalist Form */}
        <div className="w-full max-w-2xl animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
          <div className="bg-white/60 dark:bg-white/[0.02] backdrop-blur-2xl border border-black/5 dark:border-white/[0.05] rounded-[2rem] p-6 md:p-10 lg:p-12 shadow-xl dark:shadow-2xl relative overflow-hidden group transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] dark:from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <form onSubmit={form.handleSubmit(onCalculate)} className="space-y-10 relative z-10">
              {/* Report Type Selector */}
              <div className="space-y-4">
                <fieldset>
                  <legend className="block text-sm font-medium text-slate-700 dark:text-slate-300 text-center mb-4 transition-colors">Portrait Type</legend>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`relative cursor-pointer rounded-2xl border p-4 transition-all duration-300 flex flex-col items-center justify-center text-center gap-2 focus-within:ring-2 focus-within:ring-amber-500 ${watchReportType === 'INDIVIDUAL' ? 'bg-amber-100 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/50 text-amber-800 dark:text-amber-300 shadow-sm dark:shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'bg-white/50 dark:bg-slate-900/50 border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'}`}>
                      <input type="radio" value="INDIVIDUAL" {...form.register("reportType")} className="sr-only peer" />
                      <div className={`flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-500 peer-checked:bg-transparent ${watchReportType === 'INDIVIDUAL' ? 'text-amber-700 dark:text-amber-300' : 'text-slate-500 dark:text-slate-400'}`}>
                        <User className="w-4 h-4" aria-hidden="true" />
                        <span className="text-sm font-medium tracking-wide">Individual</span>
                      </div>
                    </label>
                    <label className={`relative cursor-pointer rounded-2xl border p-4 transition-all duration-300 flex flex-col items-center justify-center text-center gap-2 focus-within:ring-2 focus-within:ring-purple-500 ${watchReportType === 'PARTNERSHIP' ? 'bg-purple-100 dark:bg-purple-500/10 border-purple-300 dark:border-purple-500/50 text-purple-800 dark:text-purple-300 shadow-sm dark:shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'bg-white/50 dark:bg-slate-900/50 border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'}`}>
                      <input type="radio" value="PARTNERSHIP" {...form.register("reportType")} className="sr-only peer" />
                      <div className={`flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-500 peer-checked:bg-transparent ${watchReportType === 'PARTNERSHIP' ? 'text-purple-700 dark:text-purple-300' : 'text-slate-500 dark:text-slate-400'}`}>
                        <Users className="w-4 h-4" aria-hidden="true" />
                        <span className="text-sm font-medium tracking-wide">Partnership</span>
                      </div>
                    </label>
                  </div>
                </fieldset>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name1" className="block text-xs font-bold tracking-widest text-slate-600 dark:text-slate-300 uppercase px-1 transition-colors">
                    {watchReportType === 'PARTNERSHIP' ? 'Your Name' : 'Name'}
                  </label>
                  <input
                    id="name1"
                    type="text"
                    {...form.register("name1")}
                    placeholder="e.g. Anna"
                    className="w-full h-[50px] md:h-[58px] px-4 md:px-5 bg-white/50 dark:bg-white/[0.03] border border-black/10 dark:border-white/20 hover:border-black/20 dark:hover:border-white/30 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-white/[0.08] focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 transition-all duration-300"
                    aria-invalid={form.formState.errors.name1 ? "true" : "false"}
                  />
                  {form.formState.errors.name1 && <p className="text-red-600 dark:text-red-400 text-sm font-medium px-2">{form.formState.errors.name1.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="date1" className="block text-xs font-bold tracking-widest text-slate-600 dark:text-slate-300 uppercase px-1 transition-colors">Birth Date</label>
                  <div className="relative w-full">
                    <input
                      id="date1"
                      type="date"
                      lang="en-GB"
                      {...form.register("date1")}
                      className="w-full h-[50px] md:h-[58px] px-4 md:px-5 bg-white/50 dark:bg-white/[0.03] border border-black/10 dark:border-white/20 hover:border-black/20 dark:hover:border-white/30 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-white/[0.08] focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 transition-all duration-300 dark:[color-scheme:dark]"
                      aria-invalid={form.formState.errors.date1 ? "true" : "false"}
                    />
                  </div>
                  {form.formState.errors.date1 && <p className="text-red-600 dark:text-red-400 text-sm font-medium px-2">{form.formState.errors.date1.message}</p>}
                </div>
              </div>

              <AnimatePresence mode="popLayout">
                {watchReportType === "PARTNERSHIP" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2"
                  >
                    <div className="space-y-2">
                      <label htmlFor="name2" className="block text-xs font-bold tracking-widest text-slate-600 dark:text-slate-300 uppercase px-1 transition-colors">Second Person's Name</label>
                      <input
                        id="name2"
                        type="text"
                        {...form.register("name2")}
                        placeholder="e.g. Mark"
                        className="w-full h-[50px] md:h-[58px] px-4 md:px-5 bg-white/50 dark:bg-white/[0.03] border border-black/10 dark:border-white/20 hover:border-black/20 dark:hover:border-white/30 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-white/[0.08] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                        aria-invalid={form.formState.errors.name2 ? "true" : "false"}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="date2" className="block text-xs font-bold tracking-widest text-slate-600 dark:text-slate-300 uppercase px-1 transition-colors">Second Person's Birth Date</label>
                      <div className="relative w-full">
                        <input
                          id="date2"
                          type="date"
                          lang="en-GB"
                          {...form.register("date2")}
                          className="w-full h-[50px] md:h-[58px] px-4 md:px-5 bg-white/50 dark:bg-white/[0.03] border border-black/10 dark:border-white/20 hover:border-black/20 dark:hover:border-white/30 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-white/[0.08] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 dark:[color-scheme:dark]"
                          aria-invalid={form.formState.errors.date2 ? "true" : "false"}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={calculating}
                  className="w-full relative overflow-hidden bg-[#2A241F] dark:bg-[#E8E4D9] text-[#F9F6EE] dark:text-[#0A0710] font-semibold tracking-wide py-5 px-8 rounded-2xl transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed group shadow-lg dark:shadow-[0_0_40px_rgba(232,228,217,0.1)] hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D4AF37]/50"
                >
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 dark:via-black/10 to-transparent group-hover:animate-shimmer" aria-hidden="true"></div>
                  
                  <span className="relative flex items-center justify-center gap-3">
                    {calculating ? (
                      <span className="flex items-center gap-2">Calculating Energy <Sparkles className="w-4 h-4 animate-spin text-[#D4AF37]" aria-hidden="true" /></span>
                    ) : (
                      <>Reveal Portrait Outline</>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Result Section */}
      <AnimatePresence>
        {result && (
          <motion.div 
            id="result-section" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full border-t border-black/5 dark:border-white/5 bg-[#FDFBF7]/80 dark:bg-[#0B0914]/80 backdrop-blur-3xl py-16 md:py-24 lg:py-32 relative z-10 transition-colors duration-500 scroll-mt-24"
          >
            <div className="max-w-6xl mx-auto px-4 md:px-6">
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center mb-20"
              >
                <span className="px-4 py-1.5 rounded-full bg-[#EBE5D9]/50 dark:bg-white/[0.03] border border-[#8C6D46]/20 dark:border-white/10 text-[#5C4505] dark:text-[#E8E4D9] text-xs font-semibold tracking-widest uppercase mb-6 inline-block shadow-sm transition-colors duration-500">
                  {reportType === "INDIVIDUAL" ? 'Individual Portrait' : 'Partnership Portrait'}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#2A241F] dark:text-white mb-2 transition-colors duration-500">
                  The Outline of Your <span className="italic text-[#8C6D46] dark:text-[#B89B72]">Destiny</span>
                </h2>
                <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#8C6D46] dark:text-[#B89B72] font-medium max-w-xl mx-auto transition-colors duration-500 mt-2 mb-6">
                  {reportType === "PARTNERSHIP" ? `${result.names.person1} & ${result.names.person2}` : result.names.person1}
                </p>
              </motion.div>

              {/* Grid of Minimalist Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {result.allCards?.map((card: any, idx: number) => {
                  if (!card.positionMeaning) return null;
                  
                  return (
                    <InteractiveTarotCard key={idx} card={card} delay={idx * 0.05} index={idx} />
                  );
                })}
              </div>

              {/* Enhanced Sales Landing Page for PDF */}
              <SalesLandingEn 
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
