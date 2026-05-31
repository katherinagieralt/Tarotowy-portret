import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generatePersonalizedSummary(
  cards: any[],
  reportType: "INDIVIDUAL" | "PARTNERSHIP",
  locale: string = "pl"
): Promise<string> {
  const isEnglish = locale === "en";
  const cardsList = cards
    .map(
      (c) =>
        `- Position: ${c.positionMeaning.title} (${c.positionMeaning.description})\n  Card: ${c.name} (Arcana ${c.number})`
    )
    .join("\n");

  const isPartnership = reportType === "PARTNERSHIP";

  const promptPl = isPartnership 
    ? `Jesteś wybitnym psychologiem i analitykiem archetypowym (w stylu C.G. Junga). 
Zadanie: Napisz głęboki, holistyczny i spersonalizowany profil psychologiczny relacji (wstęp do portretu partnerskiego), której dynamikę opisują następujące karty:
${cardsList}

WAŻNE ZASADY:
1. DŁUGOŚĆ I FORMA: Tekst ma być ultra-esencjonalny i bardzo konkretny (około pół strony A4, czyli 1000-1500 znaków). To ma być "Esencja Relacji", szybkie i głębokie wejście w temat, bez "lania wody" i bez powtarzania tego, co będzie w szczegółowych analizach.
2. STYL: Psychologiczny, analityczny, empatyczny, głęboki. Zwracaj się bezpośrednio do obu osób ("Wy", "Wasza relacja").
3. RELACJA: Opisuj dynamikę DWOJGA LUDZI. Nie zakładaj, że jest to relacja romantyczna! Może to być relacja rodzic-dziecko, wspólnicy biznesowi, przyjaciele lub partnerzy życiowi. Pisz o "więzi", "współdziałaniu", "wspólnym wzrastaniu", unikając słów takich jak "miłość", "związek", czy "romantyzm".
4. ZAKAZ WYMIENIANIA KART: Pod ŻADNYM pozorem nie wymieniaj w tekście nazw kart.
5. ZAKAZ WYMIENIANIA POZYCJI: Nie analizuj po kolei poszczególnych sfer. Nie wymieniaj wprost pozycji z portretu.
6. TREŚĆ: Tekst ma być płynną esencją całej więzi. Złap główny nerw tej relacji, główny motor napędowy i ogólny sens ich spotkania. Podsumuj to w zwięzły, konkretny sposób.`
    : `Jesteś wybitnym psychologiem posługującym się analizą archetypową (w stylu C.G. Junga). 
Zadanie: Napisz głęboki, holistyczny i spersonalizowany profil psychologiczny (wstęp do portretu) dla osoby, której układ kart to:
${cardsList}

WAŻNE ZASADY:
1. DŁUGOŚĆ I FORMA: Tekst ma być ultra-esencjonalny i bardzo konkretny (około pół strony A4, czyli 1000-1500 znaków). To ma być "Esencja Twojej Osobowości", szybkie i głębokie uderzenie w sedno, bez "lania wody" i bez zapowiadania czy powtarzania tego, co pojawi się w szczegółowych analizach poszczególnych kart.
2. STYL: Psychologiczny, analityczny, empatyczny, głęboki. Bez coachingu, bez taniej ezoteryki. Zwracaj się bezpośrednio do czytelnika ("Ty", "Twój", "Twoja").
3. ZAKAZ WYMIENIANIA KART: Pod ŻADNYM pozorem nie wymieniaj w tekście nazw kart. 
4. ZAKAZ WYMIENIANIA OBSZARÓW/POZYCJI: Nie analizuj po kolei poszczególnych sfer. Absolutnie nie wymieniaj wprost sfer życia ani pozycji z portretu (np. "w sferze podświadomości").
5. TREŚĆ: Wyciągnij jedną, zintegrowaną esencję tej osoby. Kim jest w swoim najgłębszym rdzeniu? Z jaką główną wibracją idzie przez świat? Jaki jest jej nadrzędny motyw życiowy? Bądź maksymalnie konkretny i trafiający w punkt.`;

  const promptEn = isPartnership
    ? `You are a distinguished psychologist and archetypal analyst (in the style of C.G. Jung).
Task: Write a deep, holistic, and personalized psychological profile of a relationship (an introduction to the partnership portrait), whose dynamics are described by the following cards:
${cardsList}

IMPORTANT RULES:
1. LENGTH AND FORMAT: The text must be highly essential and very specific (about half an A4 page, i.e., 1000-1500 characters). This should be the "Essence of the Relationship" - a quick and deep dive into the subject, without fluff and without repeating what will be in the detailed analyses.
2. STYLE: Psychological, analytical, empathetic, deep. Address both individuals directly ("You", "Your relationship").
3. RELATIONSHIP: Describe the dynamics of TWO PEOPLE. Do not assume this is a romantic relationship! It could be a parent-child relationship, business partners, friends, or life partners. Write about the "bond", "cooperation", "growing together", avoiding words like "love", "romance".
4. NO MENTIONING CARDS: Under NO circumstances should you name the cards in the text.
5. NO MENTIONING POSITIONS: Do not analyze individual spheres one by one. Do not explicitly name the portrait positions.
6. CONTENT: The text should be a fluid essence of the entire bond. Catch the main nerve of this relationship, the main driving force, and the overall meaning of their encounter. Summarize this in a concise, specific way.`
    : `You are a distinguished psychologist using archetypal analysis (in the style of C.G. Jung).
Task: Write a deep, holistic, and personalized psychological profile (an introduction to the portrait) for a person whose card layout is:
${cardsList}

IMPORTANT RULES:
1. LENGTH AND FORMAT: The text must be highly essential and very specific (about half an A4 page, i.e., 1000-1500 characters). This should be the "Essence of Your Personality" - a quick and deep strike to the core, without fluff and without anticipating or repeating what will appear in the detailed analyses of individual cards.
2. STYLE: Psychological, analytical, empathetic, deep. No coaching, no cheap esotericism. Address the reader directly ("You", "Your").
3. NO MENTIONING CARDS: Under NO circumstances should you name the cards in the text.
4. NO MENTIONING SPHERES/POSITIONS: Do not analyze individual spheres one by one. Absolutely do not explicitly name life spheres or portrait positions (e.g., "in the sphere of the subconscious").
5. CONTENT: Extract one, integrated essence of this person. Who are they at their deepest core? What main vibration do they walk through the world with? What is their overarching life motif? Be as specific and to the point as possible.`;

  const prompt = isEnglish ? promptEn : promptPl;
  const systemContent = isEnglish 
    ? "You are an outstanding archetypal analyst and depth psychologist." 
    : "Jesteś wybitnym analitykiem archetypów i psychologiem głębi.";

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemContent,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return response.choices[0].message.content || (isEnglish ? "No summary available." : "Brak podsumowania.");
  } catch (error) {
    console.error("Błąd podczas generowania podsumowania AI:", error);
    
    if (isEnglish) {
      return isPartnership
        ? "Welcome to your Partnership Tarot Portrait. Each card in this report illuminates the unique dynamics of your relationship. Enjoy the reading."
        : "Welcome to your Tarot Portrait. Each of the following cards is a fascinating archetype that uniquely illuminates your inner self. Enjoy reading the deep analyses for individual positions.";
    }

    return isPartnership
      ? "Witajcie w Waszym Tarotowym Portrecie Partnerskim. Każda z kart w tym raporcie oświetla wyjątkową dynamikę Waszej relacji. Zapraszamy do lektury."
      : "Witaj w Twoim Tarotowym Portrecie. Każda z poniższych kart to fascynujący archetyp, który w unikalny sposób oświetla Twoje wnętrze. Zapraszamy do lektury głębokich analiz dla poszczególnych pozycji.";
  }
}

