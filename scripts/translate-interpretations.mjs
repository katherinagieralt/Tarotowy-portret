import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/OPENAI_API_KEY=["']?([^"'\n]+)["']?/);
const apiKey = apiKeyMatch ? apiKeyMatch[1] : process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey,
});

const SOURCE_PATH = path.join(__dirname, '../src/content/interpretations.json');
const TARGET_PATH = path.join(__dirname, '../src/content/interpretations-en.json');

async function processBatch(batch) {
  const promises = batch.map(async (item) => {
    const { obj, type, pos, card, targetData } = item;
    
    const prompt = `Translate the following Tarot card interpretation from Polish to American English. Ensure the translation preserves the psychological, Jungian, and esoteric tone ("Brutalist Spirituality"). Maintain the exact JSON structure and keys.

JSON to translate:
${JSON.stringify({
  mainMeaning: obj.mainMeaning,
  psychologicalPattern: obj.psychologicalPattern,
  potential: obj.potential,
  shadow: obj.shadow,
  essence: obj.essence
}, null, 2)}

Return ONLY valid JSON.`;

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert translator specializing in psychology and Tarot.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        response_format: { type: "json_object" }
      });

      const translatedObj = JSON.parse(response.choices[0].message.content.trim());
      
      if (!targetData[type]) targetData[type] = {};
      if (!targetData[type][pos]) targetData[type][pos] = {};
      
      targetData[type][pos][card] = translatedObj;
      console.log(`✅ Translated: ${type} -> ${pos} -> ${card}`);
    } catch (error) {
      console.error(`❌ Error in ${type} -> ${pos} -> ${card}:`, error.message);
    }
  });

  await Promise.all(promises);
}

async function main() {
  console.log('Loading interpretations.json...');
  const sourceData = JSON.parse(fs.readFileSync(SOURCE_PATH, 'utf8'));
  
  let targetData = {};
  if (fs.existsSync(TARGET_PATH)) {
    targetData = JSON.parse(fs.readFileSync(TARGET_PATH, 'utf8'));
  }

  const queue = [];
  
  for (const type of ['individual', 'partner']) {
    if (!sourceData[type]) continue;
    for (const pos of Object.keys(sourceData[type])) {
      for (const card of Object.keys(sourceData[type][pos])) {
        const sourceObj = sourceData[type][pos][card];
        
        // Skip if already fully translated
        if (targetData[type]?.[pos]?.[card]?.essence) {
          continue;
        }
        
        queue.push({ obj: sourceObj, type, pos, card, targetData });
      }
    }
  }

  console.log(`Remaining items to translate: ${queue.length}`);

  const BATCH_SIZE = 10;
  for (let i = 0; i < queue.length; i += BATCH_SIZE) {
    const batch = queue.slice(i, i + BATCH_SIZE);
    console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1} / ${Math.ceil(queue.length / BATCH_SIZE)}...`);
    await processBatch(batch);
    
    // Save after each batch
    fs.writeFileSync(TARGET_PATH, JSON.stringify(targetData, null, 2), 'utf8');
  }

  console.log('Translation finished! File saved to interpretations-en.json');
}

main().catch(console.error);
