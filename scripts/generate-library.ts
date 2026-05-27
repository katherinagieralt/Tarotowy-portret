import { ARCANA, individualPositionMeanings, partnerPositionMeanings } from "../src/lib/tarotCalculations";
import { SYSTEM_PROMPT } from "../src/content/systemPrompt";
import fs from "fs";
import path from "path";
import OpenAI from "openai";

// Ten skrypt należy uruchomić przez tsx: npx tsx scripts/generate-library.ts
// Wymaga klucza OPENAI_API_KEY w zmiennych środowiskowych.

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const OUTPUT_PATH = path.join(process.cwd(), "src/content/interpretations.json");

async function generateInterpretation(arcanaId: number, positionId: string, positionContext: string) {
  const arcanaName = ARCANA[arcanaId];
  
  const prompt = `Wygeneruj interpretację w formacie JSON dla karty: ${arcanaName} (Arkan nr ${arcanaId}).
Znajduje się ona na pozycji: "${positionId}" - ${positionContext}

Pamiętaj o rygorystycznym formacie wyjściowym JSON! Brak jakiegokolwiek tekstu poza JSON-em.
Zastosuj styl "Psychological Archetype Copywriter".`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o", // lub gpt-4-turbo, gpt-4o-mini
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: prompt }
    ],
    temperature: 0.7,
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}

async function run() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("BRAK OPENAI_API_KEY! Ustaw zmienną środowiskową przed uruchomieniem.");
    process.exit(1);
  }

  console.log("🚀 Start generowania biblioteki interpretacji...");
  
  // Wczytaj dotychczasowy plik jeśli istnieje (żeby móc wznawiać przy przerwaniu)
  let library: any = { individual: {}, partner: {} };
  if (fs.existsSync(OUTPUT_PATH)) {
    library = JSON.parse(fs.readFileSync(OUTPUT_PATH, "utf-8"));
  }

  // 1. Portret Indywidualny (17 pozycji, 22 karty = 374 kombinacje)
  for (const [posKey, posInfo] of Object.entries(individualPositionMeanings)) {
    if (!library.individual[posKey]) library.individual[posKey] = {};
    
    for (let i = 1; i <= 22; i++) {
      if (library.individual[posKey][i]) {
        console.log(`⏩ Pomijam Indywidualny -> ${posKey} -> ${ARCANA[i]} (już wygenerowane)`);
        continue;
      }
      
      console.log(`⏳ Generuję Indywidualny -> ${posKey} -> ${ARCANA[i]}...`);
      try {
        const data = await generateInterpretation(i, posInfo.title, posInfo.description);
        library.individual[posKey][i] = data;
        
        // Zapisuj co krok w razie błędu
        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(library, null, 2));
      } catch (err) {
        console.error(`Błąd przy ${posKey} -> ${ARCANA[i]}:`, err);
      }
    }
  }

  // 2. Portret Partnerski (8 pozycji, 22 karty = 176 kombinacji)
  for (const [posKey, posInfo] of Object.entries(partnerPositionMeanings)) {
    if (!library.partner[posKey]) library.partner[posKey] = {};
    
    for (let i = 1; i <= 22; i++) {
      if (library.partner[posKey][i]) {
        console.log(`⏩ Pomijam Partnerski -> ${posKey} -> ${ARCANA[i]} (już wygenerowane)`);
        continue;
      }
      
      console.log(`⏳ Generuję Partnerski -> ${posKey} -> ${ARCANA[i]}...`);
      try {
        const data = await generateInterpretation(i, posInfo.title, posInfo.description);
        library.partner[posKey][i] = data;
        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(library, null, 2));
      } catch (err) {
        console.error(`Błąd przy partnerskim ${posKey} -> ${ARCANA[i]}:`, err);
      }
    }
  }

  console.log("✅ Generowanie pełnej biblioteki (550 kombinacji) zakończone sukcesem!");
}

run();
