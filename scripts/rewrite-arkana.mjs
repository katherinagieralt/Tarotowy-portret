import fs from 'fs/promises';
import path from 'path';

const API_KEY = process.env.OPENAI_API_KEY;

const systemPrompt = `Jesteś ekspertem od Tarota i duchowości. Twoim zadaniem jest przepisanie opisu Wielkiego Arkanum z zachowaniem struktury i z góry ustalonego formatu.
Unikaj psychologii (to zostaje dla płatnego PDFa) - skup się na intuicji, symbolice i esencji karty.
Zachowaj oryginalny frontmatter (sekcję z trzema myślnikami na początku: title, description, summary, number, image). Możesz zmodyfikować \`description\` i \`summary\`, aby brzmiały bardziej duchowo i poetycko, ale zachowaj te same klucze.

Struktura artykułu musi wyglądać dokładnie tak:

---
[oryginalny frontmatter, ewentualnie lekko ulepszony]
---

## Duchowe Przesłanie (Esencja)
[1-2 akapity o głębokiej wibracji karty i jej duchowym przesłaniu]

## Pierwotna Symbolika i Ukryte Znaczenia
[Krótki wstęp]
*   **[Symbol 1]:** [Znaczenie]
*   **[Symbol 2]:** [Znaczenie]
*   **[Symbol 3]:** [Znaczenie]
[itd. dla 3-4 kluczowych symboli na karcie]

## Intuicyjne Przebudzenie: Jak czytać tę kartę?
[1-2 akapity uczące jak wyczuć tę kartę w ciele i życiu. Na co zwraca uwagę? Co czujesz, gdy na nią patrzysz?]

## Pytania do Refleksji
*   [Pytanie 1]
*   [Pytanie 2]
*   [Pytanie 3]

## Afirmacja i Praktyka Dnia
**Praktyka:** [Krótka praktyka lub zadanie związane z kartą]

**Afirmacja:** *[Afirmacja związana z kartą]*

Pisz pięknym, uziemiającym, poetyckim, ale prostym językiem polskim. Zwracaj się bezpośrednio do czytelnika (per "Ty").
Zwróć TYLKO nową zawartość pliku mdx, zaczynając od \`---\`, bez żadnych dodatkowych komentarzy z Twojej strony.`;

async function processFile(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const fileName = path.basename(filePath);
  
  if (fileName === '3-cesarzowa.mdx' || fileName === 'README.md') {
    console.log(`Pominąłem: ${fileName}`);
    return;
  }

  console.log(`Przetwarzam: ${fileName}...`);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        temperature: 0.7,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Przepisz ten plik MDX dla karty ${fileName}:\n\n${content}` }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error(`Błąd API dla ${fileName}: ${err}`);
      return;
    }

    const data = await response.json();
    let newContent = data.choices[0].message.content.trim();
    
    // Usuń ewentualne formatowanie markdown z odpowiedzi (np. ```md)
    if (newContent.startsWith('```md')) newContent = newContent.replace(/^```md\n/, '');
    if (newContent.startsWith('```markdown')) newContent = newContent.replace(/^```markdown\n/, '');
    if (newContent.endsWith('```')) newContent = newContent.replace(/\n```$/, '');

    await fs.writeFile(filePath, newContent, 'utf-8');
    console.log(`✅ Zaktualizowano: ${fileName}`);
  } catch (err) {
    console.error(`Błąd przy ${fileName}:`, err.message);
  }
}

async function run() {
  const dirPath = path.join(process.cwd(), 'content', 'arkany');
  const files = await fs.readdir(dirPath);
  
  const mdxFiles = files.filter(f => f.endsWith('.mdx'));
  
  console.log(`Znaleziono ${mdxFiles.length} plików mdx.`);
  
  // Przetwarzaj po 3 pliki równolegle, żeby nie dostać rate limitu
  for (let i = 0; i < mdxFiles.length; i += 3) {
    const chunk = mdxFiles.slice(i, i + 3);
    await Promise.all(chunk.map(f => processFile(path.join(dirPath, f))));
  }
  
  console.log('Gotowe!');
}

run();
