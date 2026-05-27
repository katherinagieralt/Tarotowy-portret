import { generateMetadata } from '@/lib/seo-config';
import { ContactForm } from '@/components/ContactForm';

export const metadata = generateMetadata({
  title: 'Skontaktuj się z nami',
  description:
    'Mamy dla Ciebie najlepsze rozwiązania. Wypełnij formularz kontaktowy, a my odezwiemy się w ciągu 24 godzin.',
  ogImage: 'https://example.com/contact-og.jpg',
});

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Zbudujmy coś razem
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Nasz zespół czeka na Twoją wiadomość. Jesteśmy gotowi do działania.
          </p>
        </div>

        {/* Contact Form */}
        <ContactForm />

        {/* Footer Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-blue-500 text-3xl mb-2">📧</div>
            <p className="text-slate-400">hello@example.com</p>
          </div>
          <div className="text-center">
            <div className="text-blue-500 text-3xl mb-2">📞</div>
            <p className="text-slate-400">+48 XXX XXX XXX</p>
          </div>
          <div className="text-center">
            <div className="text-blue-500 text-3xl mb-2">📍</div>
            <p className="text-slate-400">Warszawa, Polska</p>
          </div>
        </div>
      </div>
    </main>
  );
}
