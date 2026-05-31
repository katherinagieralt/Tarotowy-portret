import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regulamin Serwisu | Archeya',
  description: 'Regulamin świadczenia usług drogą elektroniczną w serwisie Archeya.',
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#F9F6EE] dark:bg-[#0A0710] py-24 px-6 sm:px-12 transition-colors duration-500">
      <div className="max-w-4xl mx-auto bg-white/70 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/5 p-8 sm:p-12 md:p-16 shadow-xl shadow-black/5">
        
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">
            Regulamin Serwisu
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
          </p>
          <div className="w-16 h-1 bg-amber-500 rounded-full mt-8 mx-auto md:mx-0"></div>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-amber-600 dark:prose-a:text-amber-400 hover:prose-a:text-amber-500 prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300">
          
          <h2 className="text-2xl mt-10 mb-4">1. Postanowienia ogólne</h2>
          <p>
            Niniejszy Regulamin określa ogólne warunki, zasady oraz sposób świadczenia usług drogą elektroniczną za pośrednictwem serwisu internetowego <strong>Archeya</strong> (zwanego dalej: "Serwisem").
          </p>
          <p>
            Właścicielem Serwisu oraz Sprzedawcą jest <strong>Katarzyna Gierałt</strong>, prowadząca działalność nierejestrowaną pod adresem: ul. Okęcka 7/14, 02-658 Warszawa (działająca pod szyldem Archeya). Kontakt ze Sprzedawcą możliwy jest pod adresem e-mail: <strong>hello@getarcheya.com</strong>.
          </p>

          <h2 className="text-2xl mt-10 mb-4">2. Definicje</h2>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Klient/Użytkownik</strong>, osoba fizyczna, która posiada pełną zdolność do czynności prawnych i korzysta z Serwisu.</li>
            <li><strong>Produkt cyfrowy</strong>, personalizowany raport "Tarotowy Portret" w formacie PDF, generowany na podstawie podanej przez Klienta daty urodzenia.</li>
            <li><strong>Umowa</strong>, umowa o świadczenie usług drogą elektroniczną lub umowa sprzedaży Produktu cyfrowego zawierana pomiędzy Klientem a Sprzedawcą.</li>
          </ul>

          <h2 className="text-2xl mt-10 mb-4">3. Rodzaj i zakres usług</h2>
          <p>
            Serwis umożliwia Klientom wygenerowanie płatnego, personalizowanego profilu psychologicznego opartego na archetypach Tarota. Produkt ma charakter wyłącznie edukacyjny, rozrywkowy i samopoznawczy. Nie stanowi on porady psychologicznej, medycznej ani prawnej.
          </p>
          <p>
            Do korzystania z Serwisu niezbędne jest urządzenie z dostępem do Internetu oraz aktualna wersja przeglądarki internetowej. Do odbioru Produktu cyfrowego wymagane jest posiadanie aktywnego konta poczty elektronicznej (e-mail) oraz programu obsługującego pliki PDF.
          </p>

          <h2 className="text-2xl mt-10 mb-4">4. Zawarcie umowy i realizacja zamówienia</h2>
          <p>
            Zawarcie Umowy następuje w momencie kliknięcia przez Klienta przycisku potwierdzającego zakup (np. "Kupuję i płacę") oraz dokonania płatności za pośrednictwem zintegrowanego operatora płatności (np. Stripe).
          </p>
          <p>
            Po zaksięgowaniu płatności, Produkt cyfrowy (raport PDF) jest generowany automatycznie i wysyłany na adres e-mail podany przez Klienta w procesie zamówienia, zazwyczaj w ciągu kilku minut (maksymalnie do 24 godzin).
          </p>

          <div className="bg-amber-50 dark:bg-amber-500/10 border-l-4 border-amber-500 p-4 my-8 rounded-r-lg">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 mt-0 mb-2">5. Wyłączenie prawa do odstąpienia od umowy</h3>
            <p className="text-sm m-0 text-amber-900 dark:text-amber-200">
              Ze względu na charakter Produktu cyfrowego (treści cyfrowe niezapisane na nośniku materialnym), który jest przygotowywany i dostarczany natychmiast po opłaceniu zamówienia, <strong>Klient wyrażając zgodę na spełnienie świadczenia przed upływem terminu do odstąpienia od umowy, traci prawo do odstąpienia od umowy zawartej na odległość</strong> (zgodnie z art. 38 pkt 13 Ustawy o prawach konsumenta).
            </p>
          </div>

          <h2 className="text-2xl mt-10 mb-4">6. Płatności</h2>
          <p>
            Ceny Produktów podane w Serwisie są cenami brutto (zawierają podatki). Płatności są obsługiwane przez zewnętrznych, bezpiecznych operatorów (np. Stripe). Sprzedawca nie przechowuje danych kart płatniczych Klientów.
          </p>

          <h2 className="text-2xl mt-10 mb-4">7. Reklamacje</h2>
          <p>
            W przypadku stwierdzenia wad technicznych dostarczonego Produktu cyfrowego (np. plik PDF jest uszkodzony, nie otwiera się lub nie dotarł na skrzynkę e-mail pomimo opłacenia zamówienia), Klient ma prawo złożyć reklamację.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Reklamacje należy składać na adres: <strong>hello@getarcheya.com</strong>.</li>
            <li>W zgłoszeniu prosimy o podanie adresu e-mail użytego podczas zamówienia oraz opisu problemu.</li>
            <li>Rozpatrzenie reklamacji nastąpi w terminie do 14 dni od jej otrzymania.</li>
          </ul>

          <h2 className="text-2xl mt-10 mb-4">8. Własność intelektualna i zasady korzystania</h2>
          <p>
            Struktura Serwisu, kody źródłowe, branding, unikalna kompozycja (układ) Produktów cyfrowych oraz autorskie zasady doboru treści podlegają ochronie prawnej i stanowią własność Sprzedawcy. Serwis wykorzystuje również technologie sztucznej inteligencji do generowania spersonalizowanych opisów, a wizerunki kart oparte są na dostępnych licencjach otwartych lub domenie publicznej.
          </p>
          <p className="mt-4">
            Na mocy niniejszej Umowy zakupiony raport PDF przeznaczony jest <strong>wyłącznie do użytku osobistego</strong> Klienta. Niezależnie od prawnoautorskiego statusu poszczególnych składowych, Klient nie ma prawa do dalszej odsprzedaży, komercyjnej dystrybucji czy masowego powielania wygenerowanych dla niego raportów bez zgody Sprzedawcy.
          </p>

          <h2 className="text-2xl mt-10 mb-4">9. Postanowienia końcowe</h2>
          <p>
            W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają powszechnie obowiązujące przepisy prawa polskiego, w szczególności Kodeksu cywilnego oraz Ustawy o prawach konsumenta.
          </p>
          <p>
            Sprzedawca zastrzega sobie prawo do wprowadzania zmian w Regulaminie z ważnych przyczyn (np. zmiany przepisów prawa). Do umów zawartych przed zmianą Regulaminu stosuje się wersję obowiązującą w momencie zakupu.
          </p>

        </div>
      </div>
    </main>
  );
}
