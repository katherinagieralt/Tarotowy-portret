'use client';

import { motion } from 'framer-motion';

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-20 sm:py-32">
      <motion.div
        className="max-w-5xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
        >
          Odkryj Swoje Przeznaczenie,{' '}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            Zrozum Siebie
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-3xl leading-relaxed"
        >
          Tarotowy Portret to nie tylko wróżba, to mapa Twojej duszy. Poznaj swoje talenty, wyzwania i drogę życiową dzięki głębokiej analizie.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 mb-16"
        >
          {/* Primary Button */}
          <motion.a
            href="#contact"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 text-center inline-block"
          >
            Zarezerwuj Sesję
          </motion.a>

          {/* Secondary Button */}
          <motion.a
            href="#about"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="px-8 py-4 border-2 border-slate-600 text-white font-semibold rounded-xl hover:border-slate-400 hover:bg-slate-800/50 transition-all duration-300 text-center inline-block"
          >
            Dowiedz Się Więcej
          </motion.a>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-8 pt-12 border-t border-slate-800"
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
              1000+
            </div>
            <p className="text-slate-400 text-sm sm:text-base">Wykonanych Portretów</p>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text mb-2">
              100%
            </div>
            <p className="text-slate-400 text-sm sm:text-base">Autentyczności</p>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-transparent bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text mb-2">
              Wieloletnie
            </div>
            <p className="text-slate-400 text-sm sm:text-base">Doświadczenie z Kartami</p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-16 text-center"
        >
          <div className="text-slate-500">
            <svg
              className="w-6 h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
