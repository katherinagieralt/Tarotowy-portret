import { renderToFile } from "@react-pdf/renderer";
import React from "react";
import { TarotReportTemplate } from "../src/components/TarotReportTemplate";
import path from "path";

async function main() {
  const outputPath = path.join(process.cwd(), "sample-report.pdf");
  
  const pageNumbers: Record<string, number> = {};
  const props = {
    email: "test@example.com",
    name: "Anna & Piotr",
    date1: new Date("1990-05-15"),
    date2: new Date("1988-10-22"),
    reportType: "PARTNERSHIP" as const,
    aiSummary: "Twoja archetypowa podróż to fascynująca wędrówka pomiędzy skrajnościami. Z jednej strony ujawniasz niesamowitą siłę i dyscyplinę, dążąc do ustrukturyzowania swojego otoczenia. Masz w sobie naturalną predyspozycję do przyjmowania ról lidera, opiekuna i organizatora. Jednak w głębi duszy, na poziomie podświadomym, nieustannie poszukujesz wolności, mistycyzmu i spontaniczności. Ten wewnętrzny konflikt pomiędzy potrzebą stabilizacji a głodem nowych, niezbadanych doświadczeń jest kluczowym motywem całego Twojego życia.\n\nTwoje wczesne lata ukształtowały w Tobie potężną wrażliwość, która czasem stawała się ciężarem. Chłonąc emocje innych, z łatwością przychodziło Ci chronienie swojego wnętrza pod maską niezależności. Z czasem ta maska ewoluowała, dając Ci poczucie bezpieczeństwa, jednak mogła odizolować Cię od prawdziwej, głębokiej bliskości. Twój potencjał leży w integracji tych dwóch światów: pozwolenia sobie na miękkość przy zachowaniu zdrowych granic.\n\nWyzwaniem, przed którym stoisz najczęściej, jest iluzja kontroli. Kiedy sprawy nie idą po Twojej myśli, masz tendencję do usztywniania się i forsowania rozwiązań siłą woli. Tymczasem Twoja najwyższa, duchowa ścieżka wymaga odpuszczenia. Zaufania, że chaos jest czasem niezbędny do stworzenia nowego porządku. W momentach kryzysu potrafisz dokonać całkowitej wewnętrznej transformacji, odradzając się silniejszym i mądrzejszym.\n\nW relacjach i w sferze zawodowej poszukujesz harmonii i równowagi, jednak nierzadko to Ty jesteś osobą, która tę harmonię musi wypracować kosztem własnych potrzeb. Nauka stawiania siebie na pierwszym miejscu bez poczucia winy to Twoje najważniejsze karmiczne zadanie. Kiedy uświadomisz sobie, że Twoja wewnętrzna siła nie musi oznaczać ciągłego poświęcania się dla innych, uwolnisz niesamowite pokłady kreatywności. Twój portret wskazuje, że Twoim ostatecznym celem jest odnalezienie absolutnego spełnienia, poczucia jedności ze sobą i otaczającym Cię światem, bez konieczności ciągłej walki o udowadnianie swojej wartości.",
    pageNumbers,
  };
  
  try {
    const element1 = React.createElement(TarotReportTemplate, props);
    // @ts-ignore
    await renderToFile(element1, outputPath);
    
    const element2 = React.createElement(TarotReportTemplate, props);
    // @ts-ignore
    await renderToFile(element2, outputPath);
    
    console.log("PDF wygenerowany (two-pass):", outputPath);
  } catch (err) {
    console.error("Błąd podczas generowania PDF:", err);
  }
}

main();
