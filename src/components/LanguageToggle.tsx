'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  // { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

export function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Determine current language from path
  const currentLangCode = pathname.startsWith('/pl') ? 'pl' : 'en';
  const currentLang = languages.find((l) => l.code === currentLangCode) || languages[1];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (langCode: string) => {
    setIsOpen(false);
    if (langCode === currentLangCode) return;

    if (langCode === 'en') {
      if (pathname === '/pl') router.push('/');
      else if (pathname.startsWith('/pl/')) router.push(pathname.replace('/pl', ''));
    } else {
      if (pathname === '/') router.push('/pl');
      else router.push(`/pl${pathname}`);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-slate-200 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 flex items-center justify-center"
        aria-label="Toggle language"
      >
        <Globe className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-36 bg-white dark:bg-[#130F24] border border-black/10 dark:border-white/10 rounded-xl shadow-xl z-50 overflow-hidden"
          >
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors text-left ${
                    currentLangCode === lang.code
                      ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 font-medium'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
