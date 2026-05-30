import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/content/interpretations.json', 'utf8'));

function replaceWords(text) {
  if (typeof text !== 'string') return text;
  
  return text
    // Partner - case insensitive but preserving original casing isn't strictly necessary for a simple script, we'll try basic ones.
    .replace(/Partnerem/g, 'Drugą osobą')
    .replace(/partnerem/g, 'drugą osobą')
    .replace(/Partnerowi/g, 'Drugiej osobie')
    .replace(/partnerowi/g, 'drugiej osobie')
    .replace(/Partnera/g, 'Drugiej osoby')
    .replace(/partnera/g, 'drugiej osoby')
    .replace(/Partner/g, 'Druga osoba')
    .replace(/partner/g, 'druga osoba')
    
    // Miłość
    .replace(/Miłość/g, 'Więź')
    .replace(/miłość/g, 'więź')
    .replace(/Miłości/g, 'Więzi')
    .replace(/miłości/g, 'więzi')
    .replace(/Miłością/g, 'Więzią')
    .replace(/miłością/g, 'więzią')
    .replace(/miłosne/g, 'relacyjne')
    .replace(/Miłosne/g, 'Relacyjne')
    
    // Romantyczny
    .replace(/romantyczny/g, 'bliski')
    .replace(/Romantyczny/g, 'Bliski')
    .replace(/romantyczną/g, 'bliską')
    .replace(/Romantyczną/g, 'Bliską')
    .replace(/romantycznej/g, 'bliskiej')
    .replace(/Romantycznej/g, 'Bliskiej')
}

function processObject(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = replaceWords(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      if (Array.isArray(obj[key])) {
        obj[key] = obj[key].map(item => replaceWords(item));
      } else {
        processObject(obj[key]);
      }
    }
  }
}

if (data.partner) {
  processObject(data.partner);
}

fs.writeFileSync('src/content/interpretations.json', JSON.stringify(data, null, 2), 'utf8');
console.log("Done.");
