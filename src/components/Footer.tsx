"use client";

import Link from "next/link";
import Image from "next/image";

const SocialIcon = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-amber-500 hover:text-white dark:hover:text-white hover:border-amber-500 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-amber-500/20"
  >
    {children}
  </a>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#FDFBF7] dark:bg-[#050308] pt-20 pb-12 sm:pb-8 mt-auto border-t border-black/5 dark:border-white/5 transition-colors duration-500 relative z-10 overflow-hidden">
      {/* Ozdobny gradient w tle */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/5 dark:bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 items-center md:items-start mb-16">
          
          {/* Kolumna 1: Logo i Opis */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <Link 
              href="/" 
              className="group mb-8 inline-block"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {/* Logo dla jasnego motywu (Czarne logo) */}
              <Image 
                src="/logo/PNG/archeya-logo-vertical-dark.png" 
                alt="Archeya Logo" 
                width={300} 
                height={300} 
                className="h-32 md:h-48 w-auto object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-sm dark:hidden"
                priority
              />
              {/* Logo dla ciemnego motywu (Białe logo) */}
              <Image 
                src="/logo/PNG/archeya-logo-vertical-light.png" 
                alt="Archeya Logo" 
                width={300} 
                height={300} 
                className="h-32 md:h-48 w-auto object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-sm hidden dark:block"
                priority
              />
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm font-light">
              Odkryj tajemnice swojej duszy dzięki precyzyjnej analizie archetypów. Twój osobisty przewodnik na drodze do samoświadomości i głębokiego zrozumienia własnego potencjału.
            </p>
          </div>

          {/* Kolumna 2: Nawigacja */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start">
            <h4 className="text-slate-900 dark:text-white font-serif font-bold text-lg mb-6 tracking-wide">
              Odkrywaj
            </h4>
            <nav className="flex flex-col gap-4 text-sm font-medium text-slate-600 dark:text-slate-300">
              <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-2 group">
                <span className="w-0 h-[1px] bg-amber-500 transition-all duration-300 group-hover:w-4"></span>
                Kalkulator
              </Link>
              <Link href="/arkany" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-2 group">
                <span className="w-0 h-[1px] bg-amber-500 transition-all duration-300 group-hover:w-4"></span>
                Wielkie Arkana
              </Link>
              <Link href="/pozycje-portretu" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-2 group">
                <span className="w-0 h-[1px] bg-amber-500 transition-all duration-300 group-hover:w-4"></span>
                Pozycje portretu
              </Link>
              <Link href="/kontakt" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-2 group">
                <span className="w-0 h-[1px] bg-amber-500 transition-all duration-300 group-hover:w-4"></span>
                O nas & Kontakt
              </Link>
            </nav>
          </div>

          {/* Kolumna 3: Social Media */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <h4 className="text-slate-900 dark:text-white font-serif font-bold text-lg mb-6 tracking-wide">
              Dołącz do nas
            </h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 text-center md:text-left font-light max-w-xs leading-relaxed">
              Bądź na bieżąco z nowościami, czytaj codzienne inspiracje i rozwijaj się razem z nami każdego dnia.
            </p>
            <div className="flex gap-4">
              {/* Instagram */}
              <SocialIcon href="https://instagram.com/archeya">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </SocialIcon>
              {/* TikTok */}
              <SocialIcon href="https://tiktok.com/@archeya">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </SocialIcon>
              {/* Pinterest */}
              <SocialIcon href="https://pinterest.com/archeya">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.163 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.624 0 12.017 0z"/>
                </svg>
              </SocialIcon>
            </div>
          </div>

        </div>
        
        {/* Dolny pasek */}
        <div className="pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 dark:text-slate-500 text-xs tracking-wider">
            &copy; {currentYear} ARCHEYA. Wszystkie prawa zastrzeżone.
          </p>
          <div className="flex gap-6 text-xs text-slate-400 dark:text-slate-500">
            <Link href="/polityka-prywatnosci" className="hover:text-amber-500 transition-colors">Polityka prywatności</Link>
            <Link href="/regulamin" className="hover:text-amber-500 transition-colors">Regulamin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
