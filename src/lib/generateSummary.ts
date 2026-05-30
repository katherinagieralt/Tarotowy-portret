import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generatePersonalizedSummary(
  cards: any[],
  reportType: "INDIVIDUAL" | "PARTNERSHIP"
): Promise<string> {
  const cardsList = cards
    .map(
      (c) =>
        `- Pozycja: ${c.positionMeaning.title} (${c.positionMeaning.description})\n  Karta: ${c.name} (Arkan ${c.number})`
    )
    .join("\n");

  const isPartnership = reportType === "PARTNERSHIP";

  const prompt = isPartnership 
    ? `Jesteś wybitnym psychologiem i analitykiem archetypowym (w stylu C.G. Junga). 
Zadanie: Napisz głęboki, holistyczny i spersonalizowany profil psychologiczny relacji (wstęp do portretu partnerskiego), której dynamikę opisują następujące karty:
${cardsList}

WAŻNE ZASADY:
1. DŁUGOŚĆ I FORMA: Tekst ma być ultra-esencjonalny i bardzo konkretny (około pół strony A4, czyli 1000-1500 znaków). To ma być "Esencja Relacji" – szybkie i głębokie wejście w temat, bez "lania wody" i bez powtarzania tego, co będzie w szczegółowych analizach.
2. STYL: Psychologiczny, analityczny, empatyczny, głęboki. Zwracaj się bezpośrednio do obu osób ("Wy", "Wasza relacja").
3. RELACJA: Opisuj dynamikę DWOJGA LUDZI. Nie zakładaj, że jest to relacja romantyczna! Może to być relacja rodzic-dziecko, wspólnicy biznesowi, przyjaciele lub partnerzy życiowi. Pisz o "więzi", "współdziałaniu", "wspólnym wzrastaniu", unikając słów takich jak "miłość", "związek", czy "romantyzm".
4. ZAKAZ WYMIENIANIA KART: Pod ŻADNYM pozorem nie wymieniaj w tekście nazw kart.
5. ZAKAZ WYMIENIANIA POZYCJI: Nie analizuj po kolei poszczególnych sfer. Nie wymieniaj wprost pozycji z portretu.
6. TREŚĆ: Tekst ma być płynną esencją całej więzi. Złap główny nerw tej relacji, główny motor napędowy i ogólny sens ich spotkania. Podsumuj to w zwięzły, konkretny sposób.`
    : `Jesteś wybitnym psychologiem posługującym się analizą archetypową (w stylu C.G. Junga). 
Zadanie: Napisz głęboki, holistyczny i spersonalizowany profil psychologiczny (wstęp do portretu) dla osoby, której układ kart to:
${cardsList}

WAŻNE ZASADY:
1. DŁUGOŚĆ I FORMA: Tekst ma być ultra-esencjonalny i bardzo konkretny (około pół strony A4, czyli 1000-1500 znaków). To ma być "Esencja Twojej Osobowości" – szybkie i głębokie uderzenie w sedno, bez "lania wody" i bez zapowiadania czy powtarzania tego, co pojawi się w szczegółowych analizach poszczególnych kart.
2. STYL: Psychologiczny, analityczny, empatyczny, głęboki. Bez coachingu, bez taniej ezoteryki. Zwracaj się bezpośrednio do czytelnika ("Ty", "Twój", "Twoja").
3. ZAKAZ WYMIENIANIA KART: Pod ŻADNYM pozorem nie wymieniaj w tekście nazw kart. 
4. ZAKAZ WYMIENIANIA OBSZARÓW/POZYCJI: Nie analizuj po kolei poszczególnych sfer. Absolutnie nie wymieniaj wprost sfer życia ani pozycji z portretu (np. "w sferze podświadomości").
5. TREŚĆ: Wyciągnij jedną, zintegrowaną esencję tej osoby. Kim jest w swoim najgłębszym rdzeniu? Z jaką główną wibracją idzie przez świat? Jaki jest jej nadrzędny motyw życiowy? Bądź maksymalnie konkretny i trafiający w punkt.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Jesteś wybitnym analitykiem archetypów i psychologiem głębi.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return response.choices[0].message.content || "Brak podsumowania.";
  } catch (error) {
    console.error("Błąd podczas generowania podsumowania AI:", error);
    return isPartnership
      ? "Witajcie w Waszym Tarotowym Portrecie Partnerskim. Każda z kart w tym raporcie oświetla wyjątkową dynamikę Waszej relacji. Zapraszamy do lektury."
      : "Witaj w Twoim Tarotowym Portrecie. Każda z poniższych kart to fascynujący archetyp, który w unikalny sposób oświetla Twoje wnętrze. Zapraszamy do lektury głębokich analiz dla poszczególnych pozycji.";
  }
}
