"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CardProps {
  card: {
    number: number;
    name: string;
    description: string;
    positionMeaning: {
      title: string;
      description: string;
    };
  };
  delay: number;
  index: number;
}

export function InteractiveTarotCard({ card, delay, index }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [globalFlipped, setGlobalFlipped] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    // Sprawdź czy inna karta była już odwrócona
    if (window.sessionStorage.getItem('tarot-card-flipped') === 'true') {
      setGlobalFlipped(true);
    }

    // Nasłuchuj na globalne zdarzenie odwrócenia
    const handleGlobalFlip = () => setGlobalFlipped(true);
    window.addEventListener('tarot-card-flipped', handleGlobalFlip);
    
    return () => window.removeEventListener('tarot-card-flipped', handleGlobalFlip);
  }, []);

  const triggerGlobalFlip = () => {
    if (!globalFlipped) {
      setGlobalFlipped(true);
      window.sessionStorage.setItem('tarot-card-flipped', 'true');
      window.dispatchEvent(new Event('tarot-card-flipped'));
    }
  };

  const handleInteraction = () => {
    if (isTouchDevice) {
      triggerGlobalFlip();
      setIsFlipped(!isFlipped);
    }
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      triggerGlobalFlip();
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setIsFlipped(false);
    }
  };

  // Animacja podpowiedzi (wiggle) pojawiająca się tylko na urządzeniach dotykowych
  // Odtwarza się chwilę po pojawieniu się karty, tylko dla pierwszych 3 kart, jeśli nikt jeszcze nie kliknął
  const shouldWiggle = isTouchDevice && index < 3 && !globalFlipped;

  const wiggleVariants = {
    hidden: { rotateY: 0 },
    visible: {
      rotateY: shouldWiggle ? [0, 45, 0] : 0,
      transition: {
        delay: delay + 1.2, // Czekamy aż skończy się animacja wjazdu (0.7s) + mała przerwa
        duration: 1.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: delay }}
      className="flex flex-col items-center"
    >
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={wiggleVariants}
        className="w-52 h-[22rem] shrink-0 mb-8 [perspective:1000px] cursor-pointer touch-manipulation"
        onClick={handleInteraction}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label={card.name}
        role="button"
        tabIndex={0}
      >
        <div 
          className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d]"
          style={{
            transform: isFlipped ? 'translateY(-1rem) rotateY(180deg)' : 'translateY(0) rotateY(0deg)',
          }}
        >
          {/* FRONT OF CARD */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-xl bg-gradient-to-b from-[#FFFFFF]/80 dark:from-[#FFFFFF]/5 to-[#FFFFFF]/30 dark:to-transparent border border-black/10 dark:border-white/20 overflow-hidden shadow-xl dark:shadow-none transition-all duration-700 flex flex-col items-center justify-center">
            {/* Efekt poświaty dla podniesionej karty */}
            <div className={`absolute -inset-4 bg-amber-500/20 blur-xl transition-opacity duration-700 -z-10 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}></div>
            
            <Image 
              src={`/arkana/${card.number}.jpg`}
              alt={card.name}
              fill
              sizes="(max-width: 768px) 208px, 208px"
              className="object-cover object-center"
            />
            
            {/* Internal subtle glow over image */}
            <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-[#130F24]/40 transition-opacity duration-700 pointer-events-none z-10 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}></div>
          </div>

          {/* BACK OF CARD */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl bg-[#F9F6EE] dark:bg-[#130F24] border border-[#D4AF37]/40 dark:border-[#B89B72]/30 overflow-hidden flex flex-col items-center justify-center p-5 text-center shadow-xl z-20">
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay pointer-events-none"></div>
            {/* Shimmer effect on the back */}
            <div className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 dark:via-white/10 to-transparent z-10 pointer-events-none ${isFlipped ? 'animate-shimmer' : ''}`}></div>

            <h4 className="relative z-20 text-[#8C6D46] dark:text-[#B89B72] font-serif text-lg mb-2 leading-tight">{card.name}</h4>
            <p className="relative z-20 text-[0.65rem] sm:text-[0.7rem] text-slate-700 dark:text-[#E8E4D9]/80 leading-relaxed overflow-hidden line-clamp-[12]">
              {card.description}
            </p>
          </div>
        </div>
      </motion.div>

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
}
