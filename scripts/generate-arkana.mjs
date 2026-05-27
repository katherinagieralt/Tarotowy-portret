import fs from "fs";
import path from "path";

const cards = [
  { slug: "0-glupiec", num: 0, title: "0. Głupiec", img: 22, desc: "Wewnętrzne dziecko, potencjał, nowy początek, spontaniczność." },
  { slug: "1-mag", num: 1, title: "I. Mag", img: 1, desc: "Wola, działanie, umiejętności, komunikacja, inteligencja." },
  { slug: "2-kaplanka", num: 2, title: "II. Kapłanka", img: 2, desc: "Intuicja, tajemnica, mądrość, ukryty potencjał, podświadomość." },
  { slug: "3-cesarzowa", num: 3, title: "III. Cesarzowa", img: 3, desc: "Obfitość, kreacja, płodność, matczyna opieka, natura." },
  { slug: "4-cesarz", num: 4, title: "IV. Cesarz", img: 4, desc: "Struktura, władza, stabilność, porządek, dyscyplina." },
  { slug: "5-kaplan", num: 5, title: "V. Kapłan", img: 5, desc: "Wiedza, duchowość, tradycja, nauka, system wartości." },
  { slug: "6-kochankowie", num: 6, title: "VI. Kochankowie", img: 6, desc: "Wybór, miłość, relacje, harmonia, zjednoczenie." },
  { slug: "7-rydwan", num: 7, title: "VII. Rydwan", img: 7, desc: "Sukces, ruch, kontrola, pokonywanie przeszkód, determinacja." },
  { slug: "8-sprawiedliwosc", num: 8, title: "VIII. Sprawiedliwość", img: 8, desc: "Równowaga, prawda, prawo, karma, uczciwość." },
  { slug: "9-eremita", num: 9, title: "IX. Eremita", img: 9, desc: "Introspekcja, samotność, mądrość wewnętrzna, duchowe poszukiwania." },
  { slug: "10-kolo-fortuny", num: 10, title: "X. Koło Fortuny", img: 10, desc: "Zmiana, przeznaczenie, cykle, karma, punkt zwrotny." },
  { slug: "11-sila", num: 11, title: "XI. Siła", img: 11, desc: "Wewnętrzna moc, odwaga, kontrola nad instynktami, cierpliwość." },
  { slug: "12-wisielec", num: 12, title: "XII. Wisielec", img: 12, desc: "Zmiana perspektywy, odpuszczenie, ofiara, opóźnienie." },
  { slug: "13-smierc", num: 13, title: "XIII. Śmierć", img: 13, desc: "Transformacja, zakończenie, nowy początek, odrodzenie." },
  { slug: "14-umiarkowanie", num: 14, title: "XIV. Umiarkowanie", img: 14, desc: "Harmonia, alchemia, równowaga, uzdrowienie." },
  { slug: "15-diabel", num: 15, title: "XV. Diabeł", img: 15, desc: "Cień, materializm, uzależnienia, ukryte pragnienia, pożądanie." },
  { slug: "16-wieza", num: 16, title: "XVI. Wieża", img: 16, desc: "Przebudzenie, nagła zmiana, zburzenie iluzji, uwolnienie." },
  { slug: "17-gwiazda", num: 17, title: "XVII. Gwiazda", img: 17, desc: "Nadzieja, inspiracja, spokój, odnowa, prowadzenie." },
  { slug: "18-ksiezyc", num: 18, title: "XVIII. Księżyc", img: 18, desc: "Iluzja, lęki, intuicja, podświadomość, sny." },
  { slug: "19-slonce", num: 19, title: "XIX. Słońce", img: 19, desc: "Radość, sukces, witalność, oświecenie, szczęście." },
  { slug: "20-sad", num: 20, title: "XX. Sąd Ostateczny", img: 20, desc: "Odrodzenie, przebudzenie, rozliczenie, uwolnienie, nowe powołanie." },
  { slug: "21-swiat", num: 21, title: "XXI. Świat", img: 21, desc: "Spełnienie, całość, zakończenie cyklu, harmonia, integracja." }
];

const dir = path.join(process.cwd(), "content", "arkany");

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

cards.forEach(card => {
  const filepath = path.join(dir, `${card.slug}.mdx`);
  
  // Jeśli to Cesarzowa, którą już ręcznie wzbogaciliśmy, pominąć jej nadpisywanie
  if (card.slug === '3-cesarzowa' && fs.existsSync(filepath)) {
    console.log("Pominięto nadpisywanie: 3-cesarzowa");
    return;
  }

  const content = `---
title: "${card.title}"
description: "${card.desc}"
number: ${card.num}
image: "/arkana/${card.img}.jpg"
---

## Archetyp i Znaczenie Ogólne

*Wprowadzenie archetypowe. Opis czym jest ta karta, jakie uniwersalne siły i idee reprezentuje w ludzkiej psychice i podróży bohatera (Głupca).*

## Psychologia i Wnętrze

*Jak ta wibracja manifestuje się na poziomie psychicznym? Sposób myślenia, postrzegania świata, naturalne predyspozycje, fundamenty poczucia własnej wartości.*

## Potencjał

*Gdzie leży największa siła tej karty? Jakie talenty, zdolności i dary przynosi właścicielowi? Jak można wykorzystać jej wibrację do osiągnięcia sukcesu i spełnienia?*

## Cień

*Ciemna strona mocy. Co się dzieje, gdy energia karty nie jest zintegrowana lub działa w nadmiarze/niedoborze? Jakie destrukcyjne mechanizmy obronne, lęki lub pułapki ego aktywuje?*

## Relacje i Emocje

*Jak osoba z silną wibracją tej karty funkcjonuje w związkach? Czego potrzebuje, by czuć się bezpiecznie? Jakie są jej największe wyzwania w budowaniu intymności?*

## Symbolika

*   **Element 1:** *znaczenie*
*   **Element 2:** *znaczenie*
*   **Element 3:** *znaczenie*

## Przykład Działania w Życiu

*Konkretna, życiowa scenka lub metafora pokazująca, jak działa osoba z wiodącą energią tej karty na co dzień.*
`;
  fs.writeFileSync(filepath, content, "utf8");
});

console.log("Wygenerowano strukturę szablonów dla kart!");
