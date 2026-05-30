import fs from 'fs/promises';
import path from 'path';

async function getFiles(dir, extensions) {
  let files = [];
  try {
    const items = await fs.readdir(dir, { withFileTypes: true });
    for (const item of items) {
      if (item.isDirectory()) {
        files.push(...await getFiles(path.join(dir, item.name), extensions));
      } else {
        if (extensions.some(ext => item.name.endsWith(ext))) {
          files.push(path.join(dir, item.name));
        }
      }
    }
  } catch(e) {}
  return files;
}

function fixTypography(content, isJson) {
  let newContent = content;
  // Używamy non-breaking space Unicode dla JSON i zwykłego tekstu, a dla MDX może być twarda spacja Unicode
  const nbsp = '\u00A0'; 
  
  // Wyszukiwanie sierot (a, i, o, u, w, z) - małe i wielkie
  // Lookbehind pozwala dopasować znak przed sierotą, ale sieroty są otoczone spacjami
  const orphanRegex = /(?<=\s|^|>|\(|\[|"|')(a|i|o|u|w|z|A|I|O|U|W|Z)[ \t]/g;

  newContent = newContent.replace(orphanRegex, `$1${nbsp}`);
  newContent = newContent.replace(orphanRegex, `$1${nbsp}`); // Podwójne przebicie dla ciągów "a w "
  newContent = newContent.replace(orphanRegex, `$1${nbsp}`); 

  // Lista zaimków do kapitalizacji (zwroty grzecznościowe)
  const pronouns = ['cię', 'ciebie', 'tobie', 'twój', 'twoja', 'twoje', 'twoim', 'twoją', 'twych', 'twymi', 'twojej', 'twojego', 'wam', 'was', 'wasz', 'wasza', 'wasze', 'waszego', 'waszej', 'ty', 'ci'];
  
  // Używamy znaków interpunkcyjnych i spacji zamiast \b, ponieważ \b nie radzi sobie z polskimi znakami (np. 'ó')
  const boundary = `(^|[\\s,.\\-!?"'()\\[\\]])`;
  const boundaryEnd = `(?=$|[\\s,.\\-!?"'()\\[\\]])`;
  const pronounsRegex = new RegExp(`${boundary}(${pronouns.join('|')})${boundaryEnd}`, 'gi');
  
  newContent = newContent.replace(pronounsRegex, (match, p1, p2) => {
    // p1 to początkowy znak (np. spacja), p2 to zaimek
    // Jeśli zaimek jest całym wielkimi literami (np. CIĘ), zostawiamy
    if (p2 === p2.toUpperCase() && p2.length > 1) return match;
    
    const capitalized = p2.charAt(0).toUpperCase() + p2.slice(1).toLowerCase();
    return p1 + capitalized;
  });
  
  return newContent;
}

async function processFiles() {
  console.log('Rozpoczynam poprawę typografii (sieroty i zwroty grzecznościowe)...');
  let changedCount = 0;

  // Przetwarzanie plików JSON
  const jsonFiles = [path.join(process.cwd(), 'src', 'content', 'interpretations.json')];
  for (const file of jsonFiles) {
    try {
      const content = await fs.readFile(file, 'utf8');
      const newContent = fixTypography(content, true);
      if (content !== newContent) {
        await fs.writeFile(file, newContent, 'utf8');
        console.log(`Poprawiono JSON: ${path.relative(process.cwd(), file)}`);
        changedCount++;
      }
    } catch (e) {
      console.error(`Błąd z plikiem ${file}:`, e);
    }
  }

  // Przetwarzanie plików MDX
  const contentDir = path.join(process.cwd(), 'content');
  const mdxFiles = await getFiles(contentDir, ['.mdx']);
  
  for (const file of mdxFiles) {
    const content = await fs.readFile(file, 'utf8');
    // Dla MDX pomijamy frontmatter (pomiędzy ---), ale dla uproszczenia odpalamy na całości
    // Regexy są w miarę bezpieczne
    const newContent = fixTypography(content, false);
    if (content !== newContent) {
      await fs.writeFile(file, newContent, 'utf8');
      console.log(`Poprawiono MDX: ${path.relative(process.cwd(), file)}`);
      changedCount++;
    }
  }

  console.log(`\nZakończono! Zmodyfikowano plików: ${changedCount}`);
}

processFiles();
