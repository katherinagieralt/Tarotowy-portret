import { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us & Contact | Archeya',
  description: 'The story of the Archeya project and contact form. Reach out if you have any questions.',
  alternates: {
    canonical: '/kontakt',
    languages: {
      'en': '/kontakt',
      'pl': '/pl/kontakt',
      'x-default': '/kontakt',
    },
  },
};

export default function AboutAndContactPageEn() {
  return (
    <main className="min-h-screen bg-[#F9F6EE] dark:bg-[#0A0710] py-24 px-6 sm:px-12 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Section / About Us */}
        <section className="mb-24 flex flex-col md:flex-row gap-12 items-center justify-between">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">
              The Story of <span className="text-amber-600 dark:text-amber-400 italic">Archeya</span>
            </h1>
            <div className="space-y-6 text-slate-600 dark:text-slate-300 font-light leading-relaxed text-lg">
              <p>
                The <strong>Archeya</strong> project was born from the need to bridge two seemingly distant worlds, the profound analytical psychology of Carl Gustav Jung and the ancient wisdom hidden in Tarot archetypes.
              </p>
              <p>
                We believe that Tarot is not a tool for fortune-telling or predicting the future, but rather for <strong className="text-slate-900 dark:text-white font-medium">knowing oneself</strong>. The cards are merely tools, mirrors reflecting our subconscious mind, our repressed fears (the Shadow), and our greatest hidden potentials.
              </p>
              <p>
                Our calculation algorithms are based on the <strong>Psychological Tarot Portrait</strong> method created by <strong>Alicja Chrzanowska</strong>. We, in turn, have built a system that fully automates and digitizes this process. Our mission is to give you a tool that extracts a precise "map of your soul" from your date of birth, helping you work on self-awareness, personal growth, and building healthy relationships.
              </p>
            </div>
          </div>
          
          <div className="w-full md:w-5/12">
            <div className="relative rounded-[2rem] p-10 sm:p-12 overflow-hidden border border-amber-500/20 bg-gradient-to-br from-amber-50/50 to-white dark:from-[#130F24] dark:to-[#0A0710] shadow-2xl dark:shadow-[0_0_30px_rgba(212,175,55,0.05)] transition-colors duration-500">
              {/* Decorative gradient and icon */}
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500">
                  <path d="M14.017 21L16.44 14.41L23 12.013L16.44 9.59L14.017 3L11.59 9.59L5 12.013L11.59 14.41L14.017 21Z" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay"></div>
              
              <div className="relative z-20 flex flex-col justify-center h-full">
                <blockquote className="text-slate-800 dark:text-slate-200 font-serif italic text-2xl leading-relaxed">
                  "Until you make the unconscious conscious, it will direct your life and you will call it fate."
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

        {/* Decorative Divider */}
        <div className="w-full flex justify-center py-24">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
        </div>

        {/* Contact Section */}
        <section className="mb-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">
              Have questions? Write to us
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Couldn't find the answer in our FAQ section on the home page? Having a technical issue with your order? Fill out the form below, and we will reply as soon as possible (usually within 24 hours).
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <ContactForm isEnglish={true} />
          </div>
        </section>

      </div>
    </main>
  );
}
