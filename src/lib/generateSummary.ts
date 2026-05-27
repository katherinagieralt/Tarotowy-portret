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
1. DŁUGOŚĆ: Tekst ma być ZWIĘZŁY i stanowić podsumowanie na maksymalnie 1 stronę A4 (około 2000-2500 znaków). Podziel go na logiczne akapity.
2. STYL: Psychologiczny, analityczny, empatyczny, głęboki. Zwracaj się bezpośrednio do obu osób ("Wy", "Wasza relacja").
3. RELACJA: Opisuj dynamikę DWOJGA LUDZI. Nie zakładaj, że jest to relacja romantyczna! Może to być relacja rodzic-dziecko, wspólnicy biznesowi, przyjaciele lub partnerzy życiowi. Pisz o "więzi", "współdziałaniu", "wspólnym wzrastaniu", unikając słów takich jak "miłość", "związek", czy "romantyzm".
4. ZAKAZ WYMIENIANIA KART: Pod ŻADNYM pozorem nie wymieniaj w tekście nazw kart (np. nie pisz "Karta Cesarzowa wskazuje...").
5. ZAKAZ WYMIENIANIA POZYCJI: Nie wymieniaj wprost pozycji z portretu (np. "w sferze trudności", "jako wspólne zadanie").
6. TREŚĆ: Tekst ma być płynną, ogólną i holistyczną opowieścią o całej relacji jako jednym żywym organizmie. Skup się na głównej wibracji tej więzi, wspólnym potencjale oraz tym, jak te dwie osoby mogą nawzajem na siebie wpływać i uczyć się od siebie.`
    : `Jesteś wybitnym psychologiem posługującym się analizą archetypową (w stylu C.G. Junga). 
Zadanie: Napisz głęboki, holistyczny i spersonalizowany profil psychologiczny (wstęp do portretu) dla osoby, której układ kart to:
${cardsList}

WAŻNE ZASADY:
1. DŁUGOŚĆ: Tekst ma być ZWIĘZŁY i stanowić podsumowanie na maksymalnie 1 stronę A4 (około 2000-2500 znaków). Podziel go na logiczne akapity.
2. STYL: Psychologiczny, analityczny, empatyczny, głęboki. Bez coachingu, bez taniej ezoteryki. Zwracaj się bezpośrednio do czytelnika ("Ty", "Twój", "Twoja").
3. ZAKAZ WYMIENIANIA KART: Pod ŻADNYM pozorem nie wymieniaj w tekście nazw kart (np. nie pisz "Karta Cesarzowa wskazuje...", "Masz Maga"). 
4. ZAKAZ WYMIENIANIA OBSZARÓW/POZYCJI: Nie wymieniaj wprost sfer życia ani pozycji z portretu (np. "w sferze podświadomości", "w dojrzałości", "w partnerstwie", "jako karmiczne wyzwanie"). Nie odnoś się do struktury portretu.
5. TREŚĆ: Tekst ma być płynną, ogólną i holistyczną opowieścią o całej osobie, jako jednej zintegrowanej istocie. Złap "całość" – istotę, główną energię życiową tej osoby, nie dzieląc jej na szufladki. Skup się na głównej wibracji, z jaką ta osoba idzie przez życie, jej ukrytym talencie i głównym dążeniu. Zrób z tego piękne, jednolite podsumowanie.`;

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
