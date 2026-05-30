import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/content/interpretations.json', 'utf8'));

function replaceWords(text) {
  if (typeof text !== 'string') return text;
  
  return text
    // Związek
    .replace(/\bZwiązek\b/g, 'Relacja')
    .replace(/\bzwiązek\b/g, 'relacja')
    .replace(/\bZwiązku\b/g, 'Relacji')
    .replace(/\bzwiązku\b/g, 'relacji')
    .replace(/\bZwiązkiem\b/g, 'Relacją')
    .replace(/\bzwiązkiem\b/g, 'relacją')
    .replace(/\bZwiązki\b/g, 'Relacje')
    .replace(/\bzwiązki\b/g, 'relacje')
    .replace(/\bZwiązkowi\b/g, 'Relacji')
    .replace(/\bzwiązkowi\b/g, 'relacji')
    
    // Partner
    .replace(/\bPartner\b/g, 'Druga osoba')
    .replace(/\bpartner\b/g, 'druga osoba')
    .replace(/\bPartnera\b/g, 'drugiej osoby')
    .replace(/\bpartnera\b/g, 'drugiej osoby')
    .replace(/\bPartnerowi\b/g, 'drugiej osobie')
    .replace(/\bpartnerowi\b/g, 'drugiej osobie')
    .replace(/\bPartnerem\b/g, 'drugą osobą')
    .replace(/\bpartnerem\b/g, 'drugą osobą')
    .replace(/\bPartnerze\b/g, 'drugiej osobie')
    .replace(/\bpartnerze\b/g, 'drugiej osobie')
    
    // Partnerzy (l. mnoga)
    .replace(/\bPartnerzy\b/g, 'Obie strony')
    .replace(/\bpartnerzy\b/g, 'obie strony')
    .replace(/\bPartnerów\b/g, 'obu stron')
    .replace(/\bpartnerów\b/g, 'obu stron')
    .replace(/\bPartnerom\b/g, 'obu stronom')
    .replace(/\bpartnerom\b/g, 'obu stronom')
    .replace(/\bPartnerami\b/g, 'obiema stronami')
    .replace(/\bpartnerami\b/g, 'obiema stronami')
    .replace(/\bPartnerach\b/g, 'obu stronach')
    .replace(/\bpartnerach\b/g, 'obu stronach')
    
    // Romantyczne
    .replace(/\bRomantyczny\b/g, 'Bliski')
    .replace(/\bromantyczny\b/g, 'bliski')
    .replace(/\bRomantyczna\b/g, 'Bliska')
    .replace(/\bromantyczna\b/g, 'bliska')
    .replace(/\bRomantyczne\b/g, 'Bliskie')
    .replace(/\bromantyczne\b/g, 'bliskie')
    .replace(/\bRomantycznych\b/g, 'Bliskich')
    .replace(/\bromantycznych\b/g, 'bliskich')
    
    // Romans
    .replace(/\bRomans\b/g, 'Połączenie')
    .replace(/\bromans\b/g, 'połączenie')
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

// Process only the partner section
if (data.partner) {
  processObject(data.partner);
}

fs.writeFileSync('src/content/interpretations.json', JSON.stringify(data, null, 2), 'utf8');
console.log("Done.");
