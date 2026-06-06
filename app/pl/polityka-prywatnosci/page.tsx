import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polityka Prywatności | Archeya',
  description: 'Zasady przetwarzania danych osobowych oraz wykorzystywania plików cookies w serwisie Archeya.',
  alternates: {
    canonical: '/pl/polityka-prywatnosci',
    languages: {
      'en': '/polityka-prywatnosci',
      'pl': '/pl/polityka-prywatnosci',
      'x-default': '/polityka-prywatnosci',
    },
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F9F6EE] dark:bg-[#0A0710] py-24 px-6 sm:px-12 transition-colors duration-500">
      <div className="max-w-4xl mx-auto bg-white/70 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/5 p-8 sm:p-12 md:p-16 shadow-xl shadow-black/5">
        
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">
            Polityka Prywatności
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
          </p>
          <div className="w-16 h-1 bg-amber-500 rounded-full mt-8 mx-auto md:mx-0"></div>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-amber-600 dark:prose-a:text-amber-400 hover:prose-a:text-amber-500 prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300">
          
          <h2 className="text-2xl mt-10 mb-4">1. Postanowienia ogólne</h2>
          <p>
            Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych przekazanych przez Użytkowników w związku z korzystaniem z platformy <strong>Archeya</strong> (dalej: "Serwis").
          </p>
          <p>
            Zależy nam na Twoim zaufaniu, dlatego dbamy o to, by wszystkie Twoje dane, w tym wrażliwe informacje takie jak data urodzenia (niezbędna do obliczenia Twojego Tarotowego Portretu), były traktowane z największą poufnością, zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO).
          </p>

          <h2 className="text-2xl mt-10 mb-4">2. Administrator Danych Osobowych</h2>
          <p>
            Administratorem Twoich danych osobowych jest <strong>Katarzyna Gierałt</strong>, prowadząca działalność nierejestrowaną pod adresem: ul. Okęcka 7/14, 02-658 Warszawa, działająca w ramach serwisu Archeya. 
            Wszelkie pytania dotyczące przetwarzania danych można kierować na adres e-mail: <strong>hello@getarcheya.com</strong>.
          </p>

          <h2 className="text-2xl mt-10 mb-4">3. Jakie dane zbieramy i dlaczego?</h2>
          <p>Podczas korzystania z Serwisu, zbieramy i przetwarzamy następujące dane:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Dane niezbędne do realizacji usługi:</strong> Imię, data urodzenia (Twoja oraz ewentualnie drugiej osoby), adres e-mail. Podstawą prawną jest art. 6 ust. 1 lit. b RODO (niezbędność do wykonania umowy).</li>
            <li><strong>Dane rozliczeniowe i płatności:</strong> Przetwarzane za pośrednictwem bezpiecznych zewnętrznych operatorów płatności (np. Stripe). Podstawą prawną jest art. 6 ust. 1 lit. c RODO (obowiązek prawny).</li>
            <li><strong>Dane komunikacyjne:</strong> Jeśli kontaktujesz się z nami mailowo, przetwarzamy Twój adres e-mail oraz treść wiadomości. Podstawą prawną jest art. 6 ust. 1 lit. f RODO (nasz prawnie uzasadniony interes).</li>
            <li><strong>Marketing (Newsletter):</strong> Za Twoją wyraźną zgodą możemy wysyłać Ci inspiracje i materiały edukacyjne (art. 6 ust. 1 lit. a RODO).</li>
          </ul>
          
          <div className="bg-amber-50 dark:bg-amber-500/10 border-l-4 border-amber-500 p-4 my-8 rounded-r-lg">
            <p className="text-sm m-0 text-amber-900 dark:text-amber-200">
              <strong>Pamiętaj:</strong> Twoja data urodzenia służy WYŁĄCZNIE do wygenerowania archetypowego profilu psychologicznego. Nigdy nie udostępniamy jej osobom trzecim.
            </p>
          </div>

          <h2 className="text-2xl mt-10 mb-4">4. Komu udostępniamy dane?</h2>
          <p>
            Twoje dane osobowe mogą być przekazywane wyłącznie zaufanym podmiotom zewnętrznym (tzw. procesorom), w minimalnym stopniu niezbędnym do funkcjonowania Serwisu. Należą do nich:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Dostawcy usług hostingowych i bazodanowych.</li>
            <li>Operatorzy systemów płatności (np. Stripe) w celu realizacji transakcji.</li>
            <li>Dostawcy usług mailingowych (do zautomatyzowanej wysyłki zamówionych plików PDF).</li>
            <li>Biura rachunkowe w celach księgowych.</li>
          </ul>
          <p>
            Wszystkie podmioty współpracujące gwarantują stosowanie odpowiednich środków ochrony i bezpieczeństwa danych osobowych wymaganych przez przepisy prawa.
          </p>

          <h2 className="text-2xl mt-10 mb-4">5. Pliki Cookies (Ciasteczka)</h2>
          <p>
            Nasz Serwis wykorzystuje pliki cookies (niewielkie informacje tekstowe, przechowywane w Twoim urządzeniu). Służą one do:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Cookies niezbędne:</strong> Zapewnienia prawidłowego działania strony (np. pamiętanie Twojego wyboru motywu ciemny/jasny, utrzymywanie sesji płatności).</li>
            <li><strong>Cookies analityczne:</strong> (Google Analytics, Vercel Analytics) do analizy ruchu na stronie, bez identyfikowania konkretnych osób, co pozwala nam ulepszać stronę.</li>
          </ul>
          <p>
            W każdej chwili możesz zmienić ustawienia dotyczące plików cookies w swojej przeglądarce internetowej.
          </p>

          <h2 className="text-2xl mt-10 mb-4">6. Jak długo przechowujemy Twoje dane?</h2>
          <p>
            Twoje dane przechowujemy wyłącznie przez okres niezbędny do realizacji celów, dla których zostały zebrane:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Wygenerowane raporty PDF oraz ich dane wejściowe (imię, data urodzenia) przechowywane są przez czas potrzebny na obsługę zamówienia i ewentualne reklamacje (zazwyczaj do 30 dni).</li>
            <li>Dane księgowe i rozliczeniowe przechowywane są przez 5 lat od końca roku kalendarzowego (obowiązek prawny).</li>
            <li>W przypadku zapisu na newsletter, do momentu wycofania przez Ciebie zgody.</li>
          </ul>

          <h2 className="text-2xl mt-10 mb-4">7. Twoje prawa</h2>
          <p>Zgodnie z przepisami RODO masz pełne prawo do:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Dostępu</strong> do treści swoich danych oraz żądania ich kopii,</li>
            <li><strong>Sprostowania</strong> danych, jeśli są nieprawidłowe lub niekompletne,</li>
            <li><strong>Usunięcia</strong> danych ("prawo do bycia zapomnianym"), jeśli nie mamy prawnego obowiązku ich dłuższego przechowywania,</li>
            <li><strong>Ograniczenia przetwarzania</strong>,</li>
            <li><strong>Przenoszenia</strong> danych,</li>
            <li><strong>Wycofania zgody</strong> w dowolnym momencie (co nie wpływa na zgodność z prawem przetwarzania przed jej wycofaniem),</li>
            <li><strong>Wniesienia skargi</strong> do organu nadzorczego (Prezesa Urzędu Ochrony Danych Osobowych), gdy uznasz, że przetwarzanie narusza przepisy.</li>
          </ul>

          <h2 className="text-2xl mt-10 mb-4">8. Zmiany w Polityce Prywatności</h2>
          <p>
            Zastrzegamy sobie prawo do dokonywania zmian w Polityce Prywatności w związku z rozwojem technologii internetowej, zmianami w prawie lub rozwojem naszego Serwisu. O wszelkich istotnych zmianach będziemy informować w sposób widoczny i zrozumiały na naszej stronie internetowej.
          </p>

        </div>
      </div>
    </main>
  );
}
