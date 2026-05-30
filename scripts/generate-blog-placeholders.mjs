import fs from 'fs/promises';
import path from 'path';

const blogPosts = [
  { slug: "czym-jest-tarotowy-portret-psychologiczny", title: "Czym jest Tarotowy Portret Psychologiczny? Przewodnik po samopoznaniu", description: "Odkryj potężne narzędzie do analizy osobowości. Dowiedz się, dlaczego Tarotowy Portret to psychologia, a nie wróżba." },
  { slug: "tarot-a-psychologia-archetypow", title: "Dlaczego Tarot to nie tylko wróżby? Psychologia archetypów w praktyce", description: "Poznaj naukowe podstawy pracy z Tarotem. Archetypy Junga i ich rola w zrozumieniu ludzkiej psychiki." },
  { slug: "jak-obliczyc-portret-psychologiczny", title: "Jak obliczyć swój Portret Psychologiczny z daty urodzenia?", description: "Krok po kroku wyjaśniamy, jak wyliczyć główne pozycje swojego Tarotowego Portretu i co oznaczają otrzymane liczby." },
  { slug: "cien-w-psychologii-i-tarocie", title: "Cień w psychologii i Tarocie. Jak pracować z trudnymi emocjami?", description: "Zrozumienie i integracja Cienia to klucz do rozwoju. Jak Arkana pomagają zdemaskować wyparte aspekty osobowości?" },
  { slug: "portret-partnerski-w-zwiazku", title: "Portret Partnerski: Jak sprawdzić dopasowanie i karmę w związku?", description: "Czy jesteście dla siebie stworzeni? Poznaj dynamikę swojej relacji dzięki partnerskiemu portretowi psychologicznemu." },
  { slug: "pozycja-1-dziecinstwo-w-portrecie", title: "Pozycja 1 w Portrecie: Twoje dzieciństwo i fundamenty osobowości", description: "Co karta na pozycji pierwszej mówi o twoich wczesnych latach, relacji z rodzicami i najgłębszych fundamentach?" },
  { slug: "pozycja-2-mlodosc-w-portrecie", title: "Pozycja 2 w Portrecie: Lekcje młodzieńcze i wejście w dorosłość", description: "Jakie schematy ukształtowały Cię w młodości? Poznaj znaczenie karty na pozycji drugiej w Twoim portrecie." },
  { slug: "pozycja-3-dojrzalosc-w-portrecie", title: "Pozycja 3 w Portrecie: Twoja dojrzałość i droga życiowa", description: "Co czeka Cię w najbardziej dojrzałym etapie życia? Jak zrealizować potencjał karty z pozycji trzeciej?" },
  { slug: "pozycja-4-podswiadomosc-i-lek", title: "Pozycja 4 (Podświadomość): Ukryte lęki, kompleksy i to, co wyparte", description: "Miejsce ukrytych blokad. Jak karta na pozycji czwartej sabotuje Twoje działania i jak to zatrzymać?" },
  { slug: "pozycja-5-swiadomosc-cele", title: "Pozycja 5 (Świadomość): Twoje cele, wartości i aspiracje", description: "Co jest dla Ciebie najważniejsze? Poznaj swoją kartę świadomości, celów życiowych i ambicji moralnych." },
  { slug: "pozycja-6-nadswiadomosc-potencjal", title: "Pozycja 6 (Nadświadomość): Twój ukryty potencjał i duchowe dary", description: "Odkryj swoje najwyższe powołanie. Karta na pozycji szóstej jako Twój ukryty talent i duchowy przewodnik." },
  { slug: "glupiec-archetyp-w-portrecie", title: "Głupiec (0/22) jako archetyp: Odwaga, ryzyko i zaufanie do życia", description: "Analiza psychologiczna karty Głupca. Co oznacza, gdy masz ten archetyp w swoim Tarotowym Portrecie?" },
  { slug: "mag-archetyp-w-portrecie", title: "Mag (1) jako archetyp: Sprawczość, komunikacja i kreacja", description: "Zrozum psychologię Maga. Jak ten archetyp wpływa na twoje poczucie sprawczości i umiejętność komunikacji." },
  { slug: "kaplanka-archetyp-w-portrecie", title: "Kapłanka (2) jako archetyp: Intuicja, tajemnica i połączenie ze sobą", description: "Jak pracować z intuicją? Karta Kapłanki w Portrecie Psychologicznym i jej ukryte, podświadome mechanizmy." },
  { slug: "jak-pracowac-z-raportem-archeya", title: "Kupiłeś Raport Archeya. Co dalej? Jak pracować z własnym Portretem?", description: "Praktyczny przewodnik dla posiadaczy raportu. Jak wdrożyć psychologiczne wnioski z analizy w codzienne życie." },
  { slug: "czy-portret-partnerski-pomoze-w-zwiazku", title: "Czy Portret Partnerski może uratować związek?", description: "Jak analiza archetypów partnerskich pomaga w diagnozowaniu problemów relacyjnych i zapobieganiu kryzysom." },
  { slug: "karma-w-relacjach-portret-partnerski", title: "Karma w relacjach: Pozycje partnerskie, które mówią o przeszłości", description: "Zrozum karmiczne długi i zobowiązania w związku, analizując pozycje w Tarotowym Portrecie Partnerskim." },
  { slug: "cesarz-cien-w-portrecie", title: "Cesarski Cień: Kiedy ambicja staje się tyranią (Cesarz w negatywie)", description: "Analiza mrocznej strony archetypu Cesarza. Jak rozpoznać schematy dominacji i lęku przed utratą kontroli." },
  { slug: "wisielec-archetyp-w-portrecie", title: "Wisielec w Portrecie: Sztuka odpuszczania i zmiany perspektywy", description: "Co psychologia mówi o stagnacji i poświęceniu? Znaczenie archetypu Wisielca na różnych pozycjach w portrecie." },
  { slug: "smierc-transformacja-w-portrecie", title: "Śmierć (13) w Tarocie to transformacja. Jak przejść przez kryzys?", description: "Przestań bać się tej karty. Psychologiczna analiza archetypu Śmierci jako koniecznej transformacji i odrodzenia." },
  { slug: "diabel-cien-w-portrecie", title: "Diabeł (15) w Portrecie: Praca z cieniem, uzależnieniami i pożądaniem", description: "Jeden z najtrudniejszych archetypów. Jak mądrze pracować z Diabłem w swoim Portrecie Psychologicznym?" },
  { slug: "wieza-archetyp-w-portrecie", title: "Wieża (16) w Portrecie: Upadek fałszywych struktur i bolesne przebudzenia", description: "Jak interpretować Wieżę z psychologicznego punktu widzenia? Rozwój poprzez nagłe i bolesne doświadczenia." },
  { slug: "slonce-archetyp-w-portrecie", title: "Słońce (19) w Portrecie: Wewnętrzne dziecko, witalność i sukces", description: "Odkryj radość i witalność. Jak archetyp Słońca wpływa na Twoje poczucie szczęścia i relację z wewnętrznym dzieckiem." },
  { slug: "pozycja-7-misja-zyciowa", title: "Pozycja 7 w Portrecie: Twoja misja życiowa i zadanie do wykonania", description: "Z czym przyszedłeś na ten świat? Analiza siódmej pozycji portretu, mówiącej o najważniejszym celu karmicznym." },
  { slug: "pozycja-8-dary-i-talenty", title: "Pozycja 8 w Portrecie: Dary, talenty i narzędzia, które dostajesz od losu", description: "Co pomaga Ci zrealizować misję życiową? Zrozumienie karty na ósmej pozycji Tarotowego Portretu." },
  { slug: "schematy-i-bledy-w-portrecie", title: "Dlaczego powtarzasz te same błędy? Analiza schematów z Portretem", description: "Jak rozpoznać i przełamać destrukcyjne wzorce zachowań przy pomocy psychologicznej analizy Tarota." },
  { slug: "temperament-a-wielkie-arkana", title: "Introwertyk czy ekstrawertyk? Jak Arkana opisują Twój temperament", description: "Czy Tarot może określić Twój typ osobowości? Arkana Wielkie w kontekście ekstrawersji i introwersji." },
  { slug: "kryzys-w-polowie-zycia-portret", title: "Kryzys w połowie życia a Tarotowy Portret Psychologiczny", description: "Jak Portret pomaga zrozumieć tranzycję i kryzysy wieku średniego? Archetypy dojrzewania i przemiany." },
  { slug: "portret-psychologiczny-dziecka", title: "Jak zrozumieć swoje dziecko dzięki analizie jego Portretu?", description: "Zastosowanie Tarotowego Portretu w rodzicielstwie. Jak wspierać talenty i rozumieć lęki swojego dziecka." },
  { slug: "kompleksy-i-sabotaz-w-portrecie", title: "Kompleksy ukryte w cieniu: Jak zdemaskować swoje sabotaże?", description: "Głęboka praca z wewnętrznym sabotażystą. Jak wykorzystać Portret do integracji trudnych aspektów psychiki." },
  { slug: "cesarzowa-archetyp-w-portrecie", title: "Cesarzowa (3) w Portrecie: Macierzyństwo, kreacja i obfitość", description: "Zrozum psychologię matki i kreacji. Jak archetyp Cesarzowej uczy nas dbania o siebie i innych." },
  { slug: "kaplan-archetyp-w-portrecie", title: "Kapłan (5) jako archetyp: Systemy wartości, tradycja i autorytety", description: "Karta przekonań i wewnętrznego dekalogu. Gdzie w życiu podążasz za tłumem, a gdzie jesteś swoim własnym autorytetem?" },
  { slug: "kochankowie-archetyp-w-portrecie", title: "Kochankowie (6): Wybory serca i psychologiczne lustra w relacjach", description: "Archetyp, który uczy nas kochać nie tylko innych, ale i siebie. Dlaczego Kochankowie to nie tylko karta miłości?" },
  { slug: "rydwan-archetyp-w-portrecie", title: "Rydwan (7) w Portrecie: Motywacja, ego i droga do sukcesu", description: "Analiza popędu i determinacji. Jak mądrze kierować Rydwanem, by nie ulec wypaleniu i presji?" },
  { slug: "sprawiedliwosc-archetyp-w-portrecie", title: "Sprawiedliwość (8): Równowaga, karma i odpowiedzialność", description: "Przyczyna i skutek w czystej postaci. Jak ten archetyp pomaga odzyskać harmonię i zrozumieć życiowe konsekwencje." },
  { slug: "eremita-archetyp-w-portrecie", title: "Eremita (9) w Portrecie: Samotność, mądrość i introspekcja", description: "Dlaczego czasem musisz odizolować się od świata? Zrozumienie Eremity jako przewodnika po wewnętrznym świetle." },
  { slug: "kolo-fortuny-archetyp-w-portrecie", title: "Koło Fortuny (10): Cykliczność losu i odpuszczanie kontroli", description: "Czego uczy nas ten archetyp? O sztuce puszczania tego, na co nie mamy wpływu, i zaufaniu do procesu." },
  { slug: "sila-archetyp-w-portrecie", title: "Siła (11) w Portrecie: Wewnętrzna moc i oswajanie instynktów", description: "Prawdziwa siła to łagodność. Psychologia oswajania własnych demonów i pracy z cieniem bez przemocy." },
  { slug: "umiarkowanie-archetyp-w-portrecie", title: "Umiarkowanie (14): Harmonia, alchemia emocji i złoty środek", description: "Archetyp zdrowienia i syntezy. Jak osiągnąć balans, gdy wszystko wewnątrz Ciebie walczy o uwagę?" },
  { slug: "gwiazda-archetyp-w-portrecie", title: "Gwiazda (17) w Portrecie: Nadzieja, inspiracja i uzdrawianie", description: "Po każdej burzy (Wieży) przychodzi ukojenie. Gwiazda jako mapa Twoich najwyższych marzeń i duchowego połączenia." },
  { slug: "ksiezyc-archetyp-w-portrecie", title: "Księżyc (18): Iluzje, podświadomość i mroki psychiki", description: "Dlaczego Księżyc budzi nasz największy lęk? Odkryj sekrety swoich snów, projekcji i głębokiej intuicji." },
  { slug: "sad-ostateczny-archetyp-w-portrecie", title: "Sąd Ostateczny (20): Przebudzenie i uwolnienie od przeszłości", description: "Karta rodowej karmy i drugich szans. Jak Sąd pomaga zrzucić z siebie dawne ciężary i stanąć w prawdzie." },
  { slug: "swiat-archetyp-w-portrecie", title: "Świat (21): Pełnia, zamknięcie cyklu i samorealizacja", description: "Ostatni krok w podróży bohatera. Co oznacza ten archetyp jako cel Twojego Portretu Psychologicznego?" },
  { slug: "pozycje-9-10-11-karma", title: "Pozycje 9, 10 i 11 w Portrecie: Trójkąt Karmiczny", description: "Zrozumienie wypartej karmy i długów z przeszłych wcieleń. Jak pracować z głębokimi blokadami duszy?" },
  { slug: "pozycja-12-harmonia", title: "Pozycja 12: Twój osobisty punkt harmonii", description: "Jak osiągnąć psychiczny balans? Karta na dwunastej pozycji jako klucz do wewnętrznego ugruntowania." },
  { slug: "toksyczne-relacje-w-portrecie-partnerskim", title: "Toksyczne relacje a Portret Partnerski: Jak rozpoznać schematy?", description: "Związek karmiczny czy toksyczny układ? Wykorzystanie Portretu Partnerskiego do rozpoznania niezdrowych wzorców." },
  { slug: "blizniacze-plomienie-bratnie-dusze-tarot", title: "Bratnie dusze i Bliźniacze Płomienie w Portrecie Partnerskim", description: "Czym charakteryzują się najgłębsze połączenia duchowe? Analiza archetypów w kontekście bliskości." },
  { slug: "perfekcjonizm-cesarz-cesarzowa", title: "Jak radzić sobie z perfekcjonizmem? Archetypy Cesarza i Cesarzowej", description: "Psychologia kontroli i idealizacji. Kiedy zdrowa dyscyplina zamienia się w wykańczający perfekcjonizm?" },
  { slug: "syndrom-oszusta-mag-kaplan", title: "Syndrom Oszusta w Portrecie. Odkryj go dzięki Magowi i Kapłanowi", description: "Dlaczego wciąż czujesz, że nic nie wiesz? Praca z Syndromem Oszusta z perspektywy archetypów." },
  { slug: "strach-przed-sukcesem-wieza-slonce", title: "Strach przed sukcesem. Dlaczego boisz się Słońca i Wieży?", description: "Autosabotaż to nie tylko strach przed porażką. Analiza mechanizmu lęku przed odniesieniem zwycięstwa." },
  { slug: "cesarz-archetyp-w-portrecie", title: "Cesarz (4) jako archetyp: Autorytet, struktura i zdrowe granice", description: "Odkryj jasną stronę Cesarza. Jak budować dyscyplinę, stabilność i autorytet bez popadania w tyranię?" },
  { slug: "diabel-archetyp-w-portrecie", title: "Diabeł (15) w pozytywie: Pasja, magnetyzm i materialna moc", description: "Diabeł to nie tylko mrok. Poznaj konstruktywną siłę piętnastego archetypu w dążeniu do sukcesu." },
  { slug: "pozycja-13-jak-cie-widza-inni", title: "Pozycja 13: Jak postrzegają Cię inni? Twoja społeczna maska", description: "Co promieniujesz na zewnątrz, nawet o tym nie wiedząc? Znaczenie trzynastej pozycji w Portrecie." },
  { slug: "pozycja-14-karma-rodu", title: "Pozycja 14: Karma rodu i wzorce dziedziczone z pokolenia na pokolenie", description: "Zrozum psychogenealogię w Tarocie. Jakie rodowe ciężary niesiesz i jak je przetransformować?" },
  { slug: "kariera-i-pieniadze-tarotowy-portret", title: "Kariera i powołanie: Jak wybrać ścieżkę zawodową z Portretem?", description: "Które Arkana i pozycje mówią o twoich talentach biznesowych? Praktyczna analiza pod kątem pracy." },
  { slug: "blokady-finansowe-w-tarocie", title: "Pieniądze a Arkana: Przełamywanie blokad finansowych", description: "Twój stosunek do materii. Jak zdiagnozować podświadome ograniczające przekonania na temat bogactwa?" },
  { slug: "trojkat-dramatyczny-w-relacjach", title: "Trójkąt Dramatyczny w związku a Portret Partnerski", description: "Kat, Ofiara i Wybawiciel. Jak wykorzystać analizę archetypów do wyjścia z toksycznych ról relacyjnych." },
  { slug: "medytacja-z-arkanami-tarota", title: "Medytacja i afirmacje z Arkanami. Przewodnik duchowy", description: "Praktyczne sposoby na wchodzenie w interakcję z energiami poszczególnych kart za pomocą wizualizacji." },
  { slug: "czy-mozna-zmienic-swoj-portret", title: "Czy jesteśmy skazani na swój Portret? O wolnej woli i przeznaczeniu", description: "Czy Tarotowy Portret to determinizm? Jak psychologia archetypów pomaga przejąć kontrolę nad życiem." }
];

async function generate() {
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  
  try {
    await fs.mkdir(blogDir, { recursive: true });
  } catch (e) {}

  for (let i = 0; i < blogPosts.length; i++) {
    const post = blogPosts[i];
    const date = new Date();
    date.setDate(date.getDate() - i); // Rozrzuć daty publikacji w przeszłości
    
    const content = `---
title: "${post.title}"
description: "${post.description}"
date: "${date.toISOString().split('T')[0]}"
image: "/images/blog/default.jpg"
---

Artykuł w przygotowaniu... Zapraszamy wkrótce! Zgodnie z założeniami strategii SEO dla Archeyi, w tym miejscu pojawi się dogłębna psychologiczna analiza tematu, pytania do refleksji oraz sekcje tłumaczące mechanizmy w sposób przyjazny i zrozumiały.
`;
    const filePath = path.join(blogDir, post.slug + '.mdx');
    await fs.writeFile(filePath, content, 'utf8');
    console.log('Utworzono ' + filePath);
  }
}

generate();
