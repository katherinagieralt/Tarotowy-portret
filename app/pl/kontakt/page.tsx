import { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'O nas i Kontakt | Archeya',
  description: 'Historia projektu Archeya oraz formularz kontaktowy. Skontaktuj się z nami, jeśli masz pytania.',
  alternates: {
    canonical: '/pl/kontakt',
    languages: {
      'en': '/kontakt',
      'pl': '/pl/kontakt',
      'x-default': '/kontakt',
    },
  },
};

export default function AboutAndContactPage() {
  return (
    <main className="min-h-screen bg-[#F9F6EE] dark:bg-[#0A0710] py-24 px-6 sm:px-12 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        
        {/* Sekcja Hero / O nas */}
        <section className="mb-24 flex flex-col md:flex-row gap-12 items-center justify-between">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">
              Historia <span className="text-amber-600 dark:text-amber-400 italic">Archeya</span>
            </h1>
            <div className="space-y-6 text-slate-600 dark:text-slate-300 font-light leading-relaxed text-lg">
              <p>
                Projekt <strong>Archeya</strong> zrodził się z potrzeby połączenia dwóch pozornie odległych światów, głębokiej psychologii analitycznej Carla Gustava Junga oraz prastarej mądrości ukrytej w archetypach Tarota.
              </p>
              <p>
                Wierzymy, że Tarot nie służy do wróżenia czy przewidywania przyszłości, a do <strong className="text-slate-900 dark:text-white font-medium">poznawania samego siebie</strong>. Karty to tylko narzędzia, lustra, w których odbija się nasza podświadomość, nasze wyparte lęki (Cień) i nasze największe, ukryte potencjały.
              </p>
              <p>
                Nasze algorytmy obliczeniowe opierają się na metodzie <strong>Tarotowego Portretu Psychologicznego</strong> stworzonej przez <strong>Alicję Chrzanowską</strong>. My z kolei stworzyliśmy system, który w pełni automatyzuje i cyfryzuje ten proces. Naszą misją jest danie Ci narzędzia, które po wyłuskaniu z Twojej daty urodzenia precyzyjnej "mapy duszy", pomoże Ci w pracy nad samoświadomością, rozwojem osobistym i budowaniem zdrowych relacji.
              </p>
            </div>
          </div>
          
          <div className="w-full md:w-5/12">
            <div className="relative rounded-[2rem] p-10 sm:p-12 overflow-hidden border border-amber-500/20 bg-gradient-to-br from-amber-50/50 to-white dark:from-[#130F24] dark:to-[#0A0710] shadow-2xl dark:shadow-[0_0_30px_rgba(212,175,55,0.05)] transition-colors duration-500">
              {/* Ozdobny gradient i ikona */}
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500">
                  <path d="M14.017 21L16.44 14.41L23 12.013L16.44 9.59L14.017 3L11.59 9.59L5 12.013L11.59 14.41L14.017 21Z" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay"></div>
              
              <div className="relative z-20 flex flex-col justify-center h-full">
                <blockquote className="text-slate-800 dark:text-slate-200 font-serif italic text-2xl leading-relaxed">
                  "Dopóki nie uczynisz nieświadomego świadomym, będzie ono kierowało Twoim życiem, a Ty będziesz nazywał to przeznaczeniem."
                </blockquote>
                <footer className="mt-8">
                  <div className="w-12 h-px bg-amber-500 mb-4"></div>
                  <span className="font-sans font-bold tracking-widest text-xs uppercase text-amber-600 dark:text-amber-500">
                    Carl Gustav Jung
                  </span>
                </footer>
              </div>
            </div>
          </div>
        </section>

        {/* Dekoracyjny Divider */}
        <div className="w-full flex justify-center py-24">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
        </div>

        {/* Sekcja Kontaktowa */}
        <section className="mb-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">
              Masz pytania? Napisz do nas
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Nie udało Ci się znaleźć odpowiedzi w naszej sekcji FAQ na stronie głównej? Masz problem techniczny z zamówieniem? Wypełnij poniższy formularz, a odpiszemy najszybciej jak to możliwe (zazwyczaj w ciągu 24h).
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </section>

      </div>
    </main>
  );
}
