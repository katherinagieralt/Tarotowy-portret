// =========================
// ARCANA DICTIONARY
// =========================

export const ARCANA: Record<number, string> = {
  1: "Mag",
  2: "Kapłanka",
  3: "Cesarzowa",
  4: "Cesarz",
  5: "Papież",
  6: "Kochankowie",
  7: "Rydwan",
  8: "Sprawiedliwość",
  9: "Pustelnik",
  10: "Koło Fortuny",
  11: "Siła",
  12: "Wisielec",
  13: "Śmierć",
  14: "Umiarkowanie",
  15: "Diabeł",
  16: "Wieża",
  17: "Gwiazda",
  18: "Księżyc",
  19: "Słońce",
  20: "Sąd",
  21: "Świat",
  22: "Głupiec",
};

export const ARCANA_DESCRIPTIONS: Record<number, string> = {
  1: "Mag symbolizuje potencjał, kreatywność i siłę woli. Przypomina, że posiadasz wszelkie zasoby niezbędne do osiągnięcia celów. To czas aktywnego działania, manifestacji marzeń i kształtowania rzeczywistości. Weź sprawy w swoje ręce i uwierz we własną moc sprawczą.",
  2: "Kapłanka uosabia głęboką intuicję, mądrość wewnętrzną i tajemnice podświadomości. Zachęca do wsłuchania się w wewnętrzny głos i zaufania przeczuciom. Zamiast szukać odpowiedzi na zewnątrz, zwróć się ku swojemu wnętrzu. Symbolizuje czas refleksji i czerpania z ukrytej wiedzy.",
  3: "Cesarzowa to archetyp obfitości, bezwarunkowej miłości i zmysłowości. Oznacza płodność – od narodzin pomysłów po dosłowne macierzyństwo. Przynosi energię opiekuńczości i głębokiej harmonii. Zwiastuje czas rozkwitu, bezpieczeństwa i twórczego wyrażania siebie.",
  4: "Cesarz reprezentuje autorytet, logikę i stabilność. Wprowadza porządek, dyscyplinę oraz jasne zasady. Wskazuje na potrzebę przejęcia kontroli, wzięcia odpowiedzialności za wybory i budowania trwałych fundamentów. Uczy racjonalnego planowania i stąpania po ziemi.",
  5: "Papież jest duchowym przewodnikiem, symbolem tradycji i edukacji. Wskazuje na potrzebę poszukiwania wyższego sensu, podążania za wartościami i zasadami moralnymi. Oznacza naukę i poszerzanie horyzontów. Zachęca do duchowego rozwoju w oparciu o sprawdzone systemy.",
  6: "Kochankowie symbolizują głębokie więzi, harmonię w relacjach i kluczowe wybory. Przypominają o sile miłości oraz konieczności podejmowania decyzji w zgodzie z własnym sercem. Wskazują na porzucenie chłodnej kalkulacji na rzecz prawdziwej, wewnętrznej autentyczności.",
  7: "Rydwan to symbol triumfu, determinacji i pokonywania przeszkód. Wskazuje na silną wolę, która pozwala zapanować nad emocjami. To czas szybkiego postępu i zdecydowanego podążania wybraną drogą. Zachęca do odważnego sięgnięcia po stery własnego losu.",
  8: "Sprawiedliwość uosabia karmiczną równowagę, prawdę i obiektywizm. Przypomina, że każde działanie ma swoje nieuniknione konsekwencje. Zachęca do uczciwości, racjonalnej kalkulacji i brania odpowiedzialności za własne decyzje. Zwiastuje czas rozliczeń i przywracania ładu.",
  9: "Pustelnik symbolizuje czas wewnętrznej refleksji, samotności i duchowego poszukiwania. Oznacza wycofanie się z zewnętrznego zgiełku, by odnaleźć mądrość i obiektywną prawdę. Uczy cierpliwości i wskazuje, że najważniejsze odpowiedzi nosisz już głęboko w sobie.",
  10: "Koło Fortuny to przypomnienie o cykliczności życia, zmiennym losie i przeznaczeniu. Przynosi nagłe, często nieoczekiwane zwroty akcji i nowe szanse. Wskazuje jasno, że wszystko w naturze przemija. Uczy elastyczności i akceptacji ciągłego ruchu wszechświata.",
  11: "Siła uosabia łagodność, odwagę i mistrzowskie panowanie nad instynktami. Wskazuje na potężną wewnętrzną moc opartą na współczuciu i miłości. To karta pokonywania przeszkód poprzez cierpliwość i wiarę w siebie. Zachęca do przekuwania złości w budującą energię.",
  12: "Wisielec symbolizuje dobrowolne poświęcenie, zawieszenie i całkowitą zmianę perspektywy. To okres pozornej stagnacji, niezbędny do głębokich przemyśleń. Uczy odpuszczania ego i rezygnacji z kontroli. Patrząc z innej strony, dostrzeżesz nowe rozwiązania.",
  13: "Śmierć zwiastuje nieuniknioną transformację, koniec etapu i odrodzenie. Nie dotyczy śmierci fizycznej, lecz oczyszczającej metamorfozy psychicznej. Oznacza radykalne odcięcie się od przeszłości i starych wzorców. To czas wyzwolenia i zrobienia miejsca na nowe.",
  14: "Umiarkowanie uosabia równowagę, wewnętrzną harmonię i anielską cierpliwość. Symbolizuje proces uzdrawiania oraz łączenie przeciwieństw. Wskazuje na potrzebę unikania skrajności, wygaszania konfliktów i odnalezienia złotego środka do trwałego szczęścia.",
  15: "Diabeł reprezentuje uwikłanie w materię, mroczne uzależnienia i toksyczne relacje. Wskazuje na ciemne strony psychiki oraz własne ograniczenia. Zachęca do uświadomienia sobie nakładanych na siebie łańcuchów. Zdemaskowanie swoich demonów pozwala na wyzwolenie.",
  16: "Wieża symbolizuje nagłe, bolesne zburzenie niesprawdzających się struktur. To zniszczenie iluzji i układów budowanych na kłamstwie. Choć przynosi kryzys, jej ostatecznym celem jest potężne oczyszczenie i szansa na zbudowanie w pełni autentycznej rzeczywistości.",
  17: "Gwiazda to symbol głębokiej nadziei, duchowej inspiracji i kosmicznej odnowy. Przynosi ukojenie po burzach, wewnętrzny spokój oraz niezachwianą wiarę w świetlistą przyszłość. Mówi, że jesteś na właściwej drodze – podążaj za czystymi marzeniami.",
  18: "Księżyc reprezentuje sferę iluzji, ukrytej podświadomości i lęków. Wskazuje na wyostrzoną intuicję, ale ostrzega przed zagubieniem w emocjach. Przypomina, że nie wszystko jest takie, na jakie wygląda. Należy oświetlić mroki psychiki i uważać na złudzenia.",
  19: "Słońce to najszczęśliwsza karta, symbolizująca radość, sukces i optymizm. Oznacza ostateczny triumf, jasność umysłu i spełnienie marzeń. Wskazuje na czas, w którym wszystko staje się zrozumiałe, a Twoje starania przynoszą niesamowite owoce.",
  20: "Sąd uosabia decydujące duchowe przebudzenie, uwolnienie od poczucia winy i rozliczenie z przeszłością. To wezwanie do wyższego celu i odrodzenie po trudnym czasie prób. Jesteś gotowy wejść z czystą kartą w nowy, znacznie bardziej świadomy etap egzystencji.",
  21: "Świat to karta absolutnej pełni, doskonałego spełnienia i ostatecznego sukcesu. Wskazuje na poczucie jedności ze Wszechświatem i pełne zrealizowanie życiowego powołania. Oznacza triumf, świętowanie oraz otwarcie drzwi na zupełnie nowe horyzonty.",
  22: "Głupiec symbolizuje całkowicie nowy początek, spontaniczność, zaufanie do losu i wolność ducha. Wskazuje na czysty potencjał, wrodzony optymizm oraz radosną odwagę do łamania schematów. Zachęca do podjęcia ryzyka i rzucenia się w wir życiowej przygody."
};

export const individualPositionMeanings: Record<string, { title: string; description: string }> = {
  p1: { title: "Dzieciństwo i młodość", description: "Pokazuje energię dzieciństwa, pierwszych doświadczeń, wpływ środowiska rodzinnego oraz wzorce budowane we wczesnym okresie życia." },
  p2: { title: "Dojrzałość", description: "Opisuje sposób funkcjonowania w dorosłości, podejście do życia, relacji, pracy oraz rozwijania własnej osobowości." },
  p3: { title: "Jesień życia", description: "Pokazuje energię późniejszych lat życia, duchowe dojrzewanie, podsumowanie doświadczeń oraz kierunek ewolucji człowieka." },
  p4: { title: "Podświadomość", description: "Opisuje ukryte mechanizmy psychiczne, automatyczne reakcje, emocjonalne wzorce oraz głęboko zakorzenione potrzeby." },
  p5: { title: "Świadomość", description: "Pokazuje świadomy sposób myślenia, postrzegania świata, decyzji oraz to, jak człowiek interpretuje rzeczywistość." },
  p6: { title: "Nadświadomość", description: "Opisuje wyższy potencjał duchowy, intuicję, rozwój wewnętrzny oraz energię prowadzącą człowieka ku harmonii." },
  p7: { title: "Misja życiowa", description: "Pokazuje główną lekcję obecnego wcielenia, życiowe zadanie oraz kierunek rozwoju duszy." },
  p8: { title: "Jak realizować misję", description: "Opisuje zasoby, talenty i narzędzia pomagające w realizacji życiowej misji oraz potencjału." },
  p9: { title: "Kim byłaś/byłeś", description: "Pokazuje energię poprzednich wcieleń, wcześniejsze doświadczenia duszy oraz archetyp osobowości z przeszłości." },
  p10: { title: "Co robiłaś/robiłeś", description: "Opisuje działania, role społeczne oraz doświadczenia zdobywane w poprzednich wcieleniach." },
  p11: { title: "Lekcja karmiczna", description: "Pokazuje główną karmiczną lekcję do przepracowania w obecnym życiu oraz obszary największego rozwoju." },
  p12: { title: "Harmonia psychiczna", description: "Opisuje wewnętrzną równowagę psychiczną, emocjonalną stabilność oraz sposób osiągania harmonii." },
  p13: { title: "Wnętrze", description: "Pokazuje prawdziwe wnętrze człowieka, jego autentyczne emocje, potrzeby i sposób postrzegania samego siebie." },
  p14: { title: "Maska społeczna", description: "Opisuje wizerunek zewnętrzny, sposób odbioru przez innych ludzi oraz energię pokazywaną światu." },
  p15: { title: "Droga przepracowania karmy", description: "Pokazuje sposób przepracowania lekcji karmicznej oraz kierunek transformacji psychicznej i duchowej." },
  p17: { title: "Komfort karmiczny", description: "Opisuje energię, w której człowiek czuje się bezpiecznie i naturalnie na poziomie karmicznym." },
  p18: { title: "Jak realizować obecną inkarnację", description: "Pokazuje sposób pracy z energią obecnego życia, rozwijania potencjału oraz świadomego realizowania swojej drogi." },
};

export const partnerPositionMeanings: Record<string, { title: string; description: string }> = {
  p1: { title: "Początek relacji", description: "Pokazuje energię pierwszego spotkania, wzajemnego przyciągania oraz początkowej dynamiki relacji." },
  p2: { title: "Rozwój relacji", description: "Opisuje sposób rozwoju związku, wspólnego budowania relacji oraz kierunek emocjonalnego wzrostu." },
  p3: { title: "Schyłek relacji", description: "Pokazuje końcowy etap relacji, możliwe zakończenia oraz sposób transformacji związku w czasie." },
  p4: { title: "Trudności relacji", description: "Opisuje największe konflikty, wyzwania, napięcia oraz problemy pojawiające się między partnerami." },
  p5: { title: "Wspólne cele", description: "Pokazuje wspólne marzenia, potrzeby, kierunki działania oraz wartości budujące relację." },
  p6: { title: "Rozwój związku", description: "Opisuje dynamikę emocjonalną i duchową relacji oraz sposób ewolucji partnerstwa." },
  p7: { title: "Zadanie relacji", description: "Pokazuje główną lekcję związku, karmiczne zadanie relacji oraz sens spotkania partnerów." },
  p8: { title: "Jak realizować zadanie relacji", description: "Opisuje sposób harmonijnego rozwijania relacji oraz narzędzia potrzebne do realizacji wspólnego celu." },
};

// =========================
// HELPERS
// =========================

function reduceTo22(num: number): number {
  while (num > 22) {
    num -= 22;
  }
  if (num === 0) {
    return 22;
  }
  return num;
}

function sumYear(year: number): number {
  return year
    .toString()
    .split("")
    .reduce((acc, digit) => acc + Number(digit), 0);
}

function diff(a: number, b: number): number {
  const result = Math.abs(a - b);
  return result === 0 ? 22 : result;
}

// =========================
// INDIVIDUAL PORTRAIT
// =========================

export function calculateIndividualPortrait(dateInput: Date | string) {
  const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  const p1 = reduceTo22(day);
  const p2 = reduceTo22(month);
  const p3 = reduceTo22(sumYear(year));
  const p4 = reduceTo22(p1 + p2);
  const p5 = reduceTo22(p2 + p3);
  const p6 = reduceTo22(p4 + p5);
  const p7 = reduceTo22(p1 + p5);
  const p8 = reduceTo22(p2 + p6);
  const p9 = diff(p1, p2);
  const p10 = diff(p3, p2);
  const p11 = diff(p9, p10);
  const p12 = reduceTo22(p7 + p8);
  const p13 = reduceTo22(p1 + p4 + p6);
  const p14 = reduceTo22(p3 + p5 + p6);
  const p15 = reduceTo22(p9 + p10 + p11 - p7);
  const p17 = reduceTo22(p11 + p6);
  const p18 = reduceTo22(p11 + p8);

  const points = { p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p17, p18 };

  // Helper function to map a point to its arcana object
  const mapPoint = (val: number, posKey: string) => ({
    number: val,
    name: ARCANA[val],
    description: ARCANA_DESCRIPTIONS[val],
    positionMeaning: individualPositionMeanings[posKey],
  });

  return {
    points,
    // Provide mapped fields for the API/frontend
    arcanaNumber: p6, // Zwykle P6 (Droga Życia) lub p4 jest używane jako "główna" karta
    arcanaName: ARCANA[p6],
    description: ARCANA_DESCRIPTIONS[p6],
    detailedCards: {
      p1: mapPoint(p1, "p1"),
      p2: mapPoint(p2, "p2"),
      p3: mapPoint(p3, "p3"),
      p4: mapPoint(p4, "p4"),
      p5: mapPoint(p5, "p5"),
      p6: mapPoint(p6, "p6"),
      p7: mapPoint(p7, "p7"),
      p8: mapPoint(p8, "p8"),
      p9: mapPoint(p9, "p9"),
      p10: mapPoint(p10, "p10"),
      p11: mapPoint(p11, "p11"),
      p12: mapPoint(p12, "p12"),
      p13: mapPoint(p13, "p13"),
      p14: mapPoint(p14, "p14"),
      p15: mapPoint(p15, "p15"),
      p17: mapPoint(p17, "p17"),
      p18: mapPoint(p18, "p18"),
    }
  };
}

// =========================
// PARTNER PORTRAIT
// =========================

export function calculatePartnershipPortrait(
  date1: Date | string,
  date2: Date | string
) {
  const personA = calculateIndividualPortrait(date1);
  const personB = calculateIndividualPortrait(date2);

  const p1 = reduceTo22(personA.points.p1 + personB.points.p1);
  const p2 = reduceTo22(personA.points.p2 + personB.points.p2);
  const p3 = reduceTo22(personA.points.p3 + personB.points.p3);
  const p4 = reduceTo22(personA.points.p4 + personB.points.p4);
  const p5 = reduceTo22(personA.points.p5 + personB.points.p5);
  const p6 = reduceTo22(personA.points.p6 + personB.points.p6);
  const p7 = reduceTo22(personA.points.p7 + personB.points.p7);
  const p8 = reduceTo22(personA.points.p8 + personB.points.p8);

  const combinedPoints = { p1, p2, p3, p4, p5, p6, p7, p8 };

  const mapPoint = (val: number, posKey: string) => ({
    number: val,
    name: ARCANA[val],
    description: ARCANA_DESCRIPTIONS[val],
    positionMeaning: partnerPositionMeanings[posKey],
  });

  return {
    person1: personA,
    person2: personB,
    combinedPoints,
    combined: {
      arcanaNumber: p6, // Główny cel relacji
      arcanaName: ARCANA[p6],
      description: ARCANA_DESCRIPTIONS[p6],
    },
    detailedCards: {
      p1: mapPoint(p1, "p1"),
      p2: mapPoint(p2, "p2"),
      p3: mapPoint(p3, "p3"),
      p4: mapPoint(p4, "p4"),
      p5: mapPoint(p5, "p5"),
      p6: mapPoint(p6, "p6"),
      p7: mapPoint(p7, "p7"),
      p8: mapPoint(p8, "p8"),
    }
  };
}

export function getBasicCardsIndividual(portrait: ReturnType<typeof calculateIndividualPortrait>) {
  return [
    portrait.detailedCards.p1,
    portrait.detailedCards.p2,
    portrait.detailedCards.p3,
  ];
}

export function getBasicCardsPartnership(portrait: ReturnType<typeof calculatePartnershipPortrait>) {
  return [
    portrait.detailedCards.p1,
    portrait.detailedCards.p2,
    portrait.detailedCards.p3,
  ];
}
