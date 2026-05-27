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

  const prompt = `Jesteś wybitnym psychologiem posługującym się analizą archetypową (w stylu C.G. Junga). 
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
    return "Witaj w Twoim Tarotowym Portrecie. Każda z poniższych kart to fascynujący archetyp, który w unikalny sposób oświetla Twoje wnętrze. Zapraszamy do lektury głębokich analiz dla poszczególnych pozycji.";
  }
}
