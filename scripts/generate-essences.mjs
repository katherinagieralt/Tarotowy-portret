import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read OPENAI_API_KEY directly from .env.local
const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/OPENAI_API_KEY=["']?([^"'\n]+)["']?/);
const apiKey = apiKeyMatch ? apiKeyMatch[1] : process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey,
});

const INTERPRETATIONS_PATH = path.join(__dirname, '../src/content/interpretations.json');

async function processBatch(batch) {
  const promises = batch.map(async (item) => {
    const { obj, type, pos, card } = item;
    
    if (obj.essence && obj.essence.length > 10) {
      return; // Already has an essence
    }
    
    const content = `
Główne znaczenie: ${obj.mainMeaning}
Wzorzec psychologiczny: ${obj.psychologicalPattern}
Potencjał: ${obj.potential}
Cień: ${obj.shadow}
    `.trim();

    const prompt = `Jesteś profesjonalnym psychologiem i znawcą tarota archetypowego. Przeczytaj poniższy pełny opis karty tarota na specyficznej pozycji w portrecie (w tym jej znaczenie, potencjał i cień), a następnie WYCIĄGNIJ Z NIEGO ESENCJĘ i napisz krótki, spójny, wysoce angażujący opis w formie DOKŁADNIE 3 ZDAŃ. 

Wytyczne:
1. Tekst ma mieć dokładnie 3 zdania.
2. Język psychologiczny, elegancki, bezpośrednio do odbiorcy ("Ty", "Twój" dla portretu indywidualnego, "Wy", "Wasza więź" dla portretu partnerskiego).
3. Portret: ${type === 'individual' ? 'Indywidualny' : 'Partnerski'}.
4. Opis ma być zachęcający i dobrze podsumowywać wibrację tej karty na tej pozycji.

Opis bazowy:
${content}`;

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 300,
      });

      const essence = response.choices[0].message.content.trim();
      obj.essence = essence;
      console.log(`✅ Zgenerowano: ${type} -> ${pos} -> ${card}`);
    } catch (error) {
      console.error(`❌ Błąd przy ${type} -> ${pos} -> ${card}:`, error.message);
    }
  });

  await Promise.all(promises);
}

async function main() {
  console.log('Wczytywanie interpretations.json...');
  const data = JSON.parse(fs.readFileSync(INTERPRETATIONS_PATH, 'utf8'));
  
  const queue = [];
  
  for (const type of ['individual', 'partner']) {
    if (!data[type]) continue;
    for (const pos of Object.keys(data[type])) {
      for (const card of Object.keys(data[type][pos])) {
        const obj = data[type][pos][card];
        if (!obj.essence || obj.essence.length < 10) {
          queue.push({ obj, type, pos, card });
        }
      }
    }
  }

  console.log(`Do wygenerowania pozostało: ${queue.length} elementów.`);

  const BATCH_SIZE = 10;
  for (let i = 0; i < queue.length; i += BATCH_SIZE) {
    const batch = queue.slice(i, i + BATCH_SIZE);
    console.log(`Przetwarzanie batcha ${i / BATCH_SIZE + 1} / ${Math.ceil(queue.length / BATCH_SIZE)}...`);
    await processBatch(batch);
    
    // Zapisuj po każdym batchu, by w razie błędu nie stracić postępu
    fs.writeFileSync(INTERPRETATIONS_PATH, JSON.stringify(data, null, 2), 'utf8');
    
    // Krótkie opóźnienie aby nie dostać rate limitu
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log('Zakończono generowanie esencji!');
}

main().catch(console.error);
