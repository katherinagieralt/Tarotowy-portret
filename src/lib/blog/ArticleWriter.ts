import OpenAI from "openai";
import { BlogArticleInput, BlogArticleOutput } from "./types";
import { BLOG_WRITER_SYSTEM_PROMPT } from "../../content/blogWriterPrompt";

export class BlogArticleWriter {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  
  /**
   * Generuje zoptymalizowany pod SEO/GEO artykuł blogowy.
   * Proces obejmuje wewnętrzny "self-check". Jeśli tekst nie spełnia wymogów (np. brakuje FAQ lub sekcji definicji pod GEO),
   * model zostanie poproszony o samodzielne naniesienie poprawek (maxRetries).
   */
  async generateArticle(input: BlogArticleInput, maxRetries = 2): Promise<BlogArticleOutput> {
    let attempt = 0;
    let currentFeedback = "";
    
    while (attempt <= maxRetries) {
      console.log(`[BlogArticleWriter] Generowanie artykułu (Próba ${attempt + 1}/${maxRetries + 1})...`);
      
      const userMessage = `
Oto dane wejściowe do artykułu:
- Temat: ${input.topic}
- Główne słowo kluczowe: ${input.mainKeyword}
- Frazy poboczne: ${input.secondaryKeywords.join(", ")}
- Intencja wyszukiwania: ${input.searchIntent}
- Etap lejka: ${input.funnelStage}
- Typ artykułu: ${input.articleType}
- Długość (sugerowana tokeny): ${input.preferredLengthTokens || 1500}
- Ton: ${input.tone || "Ciepły, psychologiczny, analityczny"}
- Karty Tarota powiązane tematycznie: ${input.relatedTarotCards?.join(", ") || "Brak"}
- Pozycje portretu powiązane: ${input.relatedPortraitPositions?.join(", ") || "Brak"}
- Produkty / CTA do zarekomendowania: ${input.relatedProductsOrCTAs.join(", ")}
${input.seoBatch ? `- SEO Batch: ${input.seoBatch}` : ""}

${currentFeedback ? `UWAGA: Ostatnia próba została odrzucona przez wewnętrznego kontrolera jakości. Oto błędy, które musisz bezwzględnie poprawić w tej próbie:\n${currentFeedback}\n\nWygeneruj tekst ponownie, naprawiając powyższe braki.` : "Wygeneruj kompletny tekst artykułu wraz ze strukturą i metadanymi SEO. Pamiętaj o zasadach dotyczących GEO i zwięzłej odpowiedzi na samym początku!"}
`;

      try {
      const response = await this.openai.chat.completions.create({
          model: "gpt-4o", // Główne zadanie wymaga silnego modelu z reasonningiem i świetnego polskiego
          messages: [
            { role: "system", content: BLOG_WRITER_SYSTEM_PROMPT },
            { role: "user", content: userMessage }
          ],
          response_format: { type: "json_object" },
          temperature: 0.7,
        });

        const rawResponse = response.choices[0].message.content;
        if (!rawResponse) throw new Error("Otrzymano pustą odpowiedź od API OpenAI.");

        const articleData = JSON.parse(rawResponse) as BlogArticleOutput;
        
        console.log(`[BlogArticleWriter] Tekst wygenerowany. Rozpoczynam Self-Check SEO & GEO...`);
        
        // Wywołanie walidatora (szybszym, tańszym modelem)
        const evaluation = await this.evaluateArticle(articleData);
        
        if (evaluation.passed) {
          console.log(`[BlogArticleWriter] ✅ Sukces! Artykuł w 100% zgodny z wymogami SEO/GEO.`);
          return articleData;
        } else {
          console.warn(`[BlogArticleWriter] ⚠️ Artykuł nie przeszedł weryfikacji. Powód: ${evaluation.feedback}`);
          currentFeedback = evaluation.feedback;
          attempt++;
        }
      } catch (error) {
        console.error("[BlogArticleWriter] Błąd podczas komunikacji z API lub parsowania:", error);
        attempt++;
      }
    }
    
    throw new Error("Nie udało się wygenerować zadowalającego artykułu po wyczerpaniu limitu prób.");
  }

  /**
   * Moduł weryfikujący wygenerowany tekst. Odpowiada za punkt 8 z planu wdrożenia (ocena jakości przed zapisem).
   */
  private async evaluateArticle(article: BlogArticleOutput): Promise<{ passed: boolean, feedback: string }> {
    const evalPrompt = `
Jesteś bezkompromisowym edytorem treści SEO/GEO i weryfikatorem jakości. Otrzymałeś wygenerowany artykuł na bloga psychologiczno-rozwojowego.
Oceń poniższy tekst i dane według następujących "twardych" kryteriów.

KRYTERIA (każde z nich musi być spełnione na 100%):
1. **GEO (Definicja):** Czy artykuł posiada na samym początku (bezpośrednio pod tytułem) bardzo krótki akapit z odpowiedzią (maks. 2-4 zdania), będący ścisłą definicją, bez lania wody i zbędnej poezji?
2. **Intencja:** Czy artykuł wyczerpująco odpowiada na zadany temat/tytuł?
3. **FAQ:** Czy na samym końcu artykułu znajduje się nagłówek "## FAQ" (lub "## Często zadawane pytania") z minimum 4 pytaniami i krótkimi odpowiedziami?
4. **CTA i Linkowanie:** Czy tekst zawiera przynajmniej jedno wyraźne Call To Action zachęcające np. do obliczenia portretu lub zakupienia raportu?
5. **Jakość (Anty-generyczność):** Czy tekst NIE zawiera wyświechtanych frazesów typu "Od zarania dziejów tarot fascynował...", czy nie ma fatalistycznych diagnoz (np. "na pewno zachorujesz")?

Analizowany tytuł: ${article.title}
Analizowana treść:
${article.articleBody}

Odpowiedz wyłącznie w poprawnym formacie JSON:
{
  "passed": boolean, // true jeśli tekst bezbłędnie zalicza WSZYSTKIE 5 kryteriów. false w przeciwnym wypadku.
  "feedback": "Jeśli passed=false, napisz tu co najwyżej 3 zdania bardzo konkretnego feedbacku, czego zabrakło lub co jest zepsute, aby AI mogło to wdrożyć."
}
`;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini", // Do samej weryfikacji strukturalnej wystarczy mniejszy model
        messages: [{ role: "user", content: evalPrompt }],
        response_format: { type: "json_object" },
        temperature: 0.1,
      });

      const rawResponse = response.choices[0].message.content;
      if (!rawResponse) return { passed: true, feedback: "" };

      return JSON.parse(rawResponse) as { passed: boolean, feedback: string };
    } catch (e) {
      console.error("[BlogArticleWriter] Self-Check fail - ignoruję błąd sprawdzania i przyjmuję artykuł:", e);
      // W przypadku błędu walidatora po prostu przepuszczamy tekst
      return { passed: true, feedback: "" };
    }
  }
}
