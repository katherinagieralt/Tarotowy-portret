import fs from 'fs';
import path from 'path';

function mySlugify(text) {
  return text.toString().toLowerCase()
    .replace(/[ą]/g, 'a')
    .replace(/[ć]/g, 'c')
    .replace(/[ę]/g, 'e')
    .replace(/[ł]/g, 'l')
    .replace(/[ń]/g, 'n')
    .replace(/[ó]/g, 'o')
    .replace(/[ś]/g, 's')
    .replace(/[źż]/g, 'z')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const ARCANA_SLUGS = {
  1: "1-mag", 2: "2-kaplanka", 3: "3-cesarzowa", 4: "4-cesarz", 5: "5-kaplan",
  6: "6-kochankowie", 7: "7-rydwan", 8: "8-sprawiedliwosc", 9: "9-eremita",
  10: "10-kolo-fortuny", 11: "11-sila", 12: "12-wisielec", 13: "13-smierc",
  14: "14-umiarkowanie", 15: "15-diabel", 16: "16-wieza", 17: "17-gwiazda",
  18: "18-ksiezyc", 19: "19-slonce", 20: "20-sad", 21: "21-swiat", 22: "22-glupiec",
};

const individualPositionMeanings = {
  p1: { title: "Dzieciństwo i młodość" },
  p2: { title: "Dojrzałość" },
  p3: { title: "Jesień życia" },
  p4: { title: "Podświadomość" },
  p5: { title: "Świadomość" },
  p6: { title: "Nadświadomość" },
  p7: { title: "Misja życiowa" },
  p8: { title: "Jak realizować misję" },
  p9: { title: "Kim byłaś/byłeś" },
  p10: { title: "Co robiłaś/robiłeś" },
  p11: { title: "Lekcja karmiczna" },
  p12: { title: "Harmonia psychiczna" },
  p13: { title: "Wnętrze" },
  p14: { title: "Maska społeczna" },
  p15: { title: "Droga przepracowania karmy" },
  p17: { title: "Komfort karmiczny" },
  p18: { title: "Jak realizować obecną inkarnację" },
};

const partnerPositionMeanings = {
  p1: { title: "Początek relacji" },
  p2: { title: "Rozwój relacji" },
  p3: { title: "Transformacja relacji" },
  p4: { title: "Trudności relacji" },
  p5: { title: "Wspólne cele" },
  p6: { title: "Dojrzewanie relacji" },
  p7: { title: "Zadanie relacji" },
  p8: { title: "Jak realizować zadanie relacji" },
};

const regex = /^(.*)-pozycja-(part-)?(?:p)?(\d+)(?:-.*)?$/;

let hasErrors = false;

// Test Individual
for (const [val, slug] of Object.entries(ARCANA_SLUGS)) {
  for (const [posKey, pos] of Object.entries(individualPositionMeanings)) {
    const posNum = posKey.replace('p', '');
    const url = `${slug}-pozycja-${posNum}-${mySlugify(pos.title)}`;
    const match = url.match(regex);
    if (!match) {
      console.error(`Regex failed for Individual: ${url}`);
      hasErrors = true;
    } else if (match[1] !== slug || match[3] !== posNum) {
      console.error(`Regex mismatch for Individual: ${url} -> ${match[1]}, ${match[3]}`);
      hasErrors = true;
    }
  }
}

// Test Partner
for (const [val, slug] of Object.entries(ARCANA_SLUGS)) {
  for (const [posKey, pos] of Object.entries(partnerPositionMeanings)) {
    const posNum = posKey.replace('p', '');
    const url = `${slug}-pozycja-part-${posNum}-${mySlugify(pos.title)}`;
    const match = url.match(regex);
    if (!match) {
      console.error(`Regex failed for Partner: ${url}`);
      hasErrors = true;
    } else if (match[1] !== slug || match[2] !== 'part-' || match[3] !== posNum) {
      console.error(`Regex mismatch for Partner: ${url} -> ${match[1]}, ${match[2]}, ${match[3]}`);
      hasErrors = true;
    }
  }
}

if (!hasErrors) {
  console.log("All combinations perfectly match the regex and valid slugs!");
} else {
  console.log("Errors found!");
}
