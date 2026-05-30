import fs from "fs/promises";
import path from "path";
import { BlogArticleWriter } from "../src/lib/blog/ArticleWriter";
import { BlogArticleInput, ArticleType } from "../src/lib/blog/types";
import dotenv from "dotenv";

// Ładowanie zmiennych środowiskowych (OPENAI_API_KEY)
dotenv.config({ path: ".env.local" });

/**
 * Przykładowa baza wiedzy o tematach. 
 * Można to w przyszłości zintegrować bezpośrednio z bazą generowaną z innych skryptów.
 */
const topicsDB: Record<string, BlogArticleInput> = {
  "pozycja-1-dziecinstwo-w-portrecie": {
    topic: "Znaczenie 1 pozycji w Tarotowym Portrecie",
    mainKeyword: "pozycja 1 w portrecie tarotowym dzieciństwo",
    secondaryKeywords: ["dzieciństwo w tarocie", "fundamenty osobowości", "karta na pierwszej pozycji"],
    searchIntent: "informational",
    funnelStage: "ToFu",
    articleType: "guide",
    relatedPortraitPositions: [1],
    relatedProductsOrCTAs: ["Kalkulator Portretu", "Raport Indywidualny PDF"],
    seoBatch: "Batch-Dziecinstwo-1"
  },
  "czym-jest-tarotowy-portret-psychologiczny": {
    topic: "Czym jest Tarotowy Portret Psychologiczny i jak różni się od klasycznego Tarota?",
    mainKeyword: "tarotowy portret psychologiczny",
    secondaryKeywords: ["psychologia w tarocie", "archetypy junga", "portret tarotowy co to jest"],
    searchIntent: "informational",
    funnelStage: "ToFu",
    articleType: "pillar",
    relatedProductsOrCTAs: ["Kalkulator Portretu", "Raport Indywidualny PDF", "Raport Partnerski PDF"],
    seoBatch: "Pillar-1"
  }
};

async function run() {
  const args = process.argv.slice(2);
  const slugArg = args[0];

  if (!slugArg) {
    console.error("❌ BŁĄD: Musisz podać slug artykułu jako argument.");
    console.log("👉 Użycie: npm run generate-article <slug>");
    console.log("👉 Dostępne testowe slugi: ", Object.keys(topicsDB).join(", "));
    process.exit(1);
  }

  // Uproszczony system pobierania tematów (można rozszerzyć o generowanie dynamiczne jeśli sluga tu nie ma)
  const input = topicsDB[slugArg];

  if (!input) {
    console.error(`❌ BŁĄD: Nie znaleziono danych wejściowych dla slugu "${slugArg}". Dodaj go do tablicy topicsDB w scripts/generate-article.ts.`);
    process.exit(1);
  }

  console.log("=========================================");
  console.log(`🤖 Uruchamiam Agenta AI (BlogArticleWriter)`);
  console.log(`📝 Temat: ${input.topic}`);
  console.log("=========================================");

  const writer = new BlogArticleWriter();

  try {
    const article = await writer.generateArticle(input);
    
    // Budujemy poprawny frontmatter MDX
    const mdxContent = `---
title: "${article.metaTitle.replace(/"/g, '\\"')}"
description: "${article.metaDescription.replace(/"/g, '\\"')}"
date: "${new Date().toISOString().split('T')[0]}"
image: "/images/blog/default.jpg"
---

${article.articleBody}
`;

    // Zapisujemy plik
    const blogDir = path.join(process.cwd(), "content", "blog");
    await fs.mkdir(blogDir, { recursive: true });
    
    // Używamy sluga zwróconego przez AI lub tego podanego w argumencie, jeśli AI nawali
    const finalSlug = article.slug ? article.slug : slugArg;
    const outPath = path.join(blogDir, `${finalSlug}.mdx`);
    
    await fs.writeFile(outPath, mdxContent, "utf-8");
    
    console.log("=========================================");
    console.log(`✅ SUKCES! Artykuł zapisany w:`);
    console.log(outPath);
    console.log("=========================================");
  } catch (error) {
    console.error("❌ Wystąpił błąd krytyczny podczas generowania artykułu:", error);
  }
}

run();
