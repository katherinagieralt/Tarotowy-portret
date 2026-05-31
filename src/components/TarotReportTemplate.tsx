import { Document, Page, Text, View, StyleSheet, Font, Image, Link, Svg, Defs, LinearGradient, Stop, Rect } from "@react-pdf/renderer";
import { formatDate } from "date-fns";
import { pl } from "date-fns/locale";
import {
  calculateIndividualPortrait,
  calculatePartnershipPortrait,
} from "@/lib/tarotCalculations";
import interpretationsData from "@/content/interpretations.json";
import interpretationsDataEn from "@/content/interpretations-en.json";
import path from "path";
import fs from "fs";

Font.register({
  family: "Roboto",
  fonts: [
    { src: path.join(process.cwd(), "public", "fonts", "Roboto-Regular.ttf"), fontWeight: 400 },
    { src: path.join(process.cwd(), "public", "fonts", "Roboto-Bold.ttf"), fontWeight: 700 }
  ]
});

// Funkcja eliminująca "sieroty" (pojedyncze litery na końcu linijki)
function formatText(text: string): string {
  if (!text) return text;
  return text.replace(/ ([a-zA-ZwWzZiIoOaAuUeEcC]) /g, ' $1\u00A0')
             .replace(/ (na|do|za|ze|po|od|oraz|we|ale|jak) /gi, ' $1\u00A0');
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#fcf9f2", // Lekki, ciepły beżowy kolor
    color: "#111827",
    fontFamily: "Roboto",
    position: "relative",
  },
  pageBorder: {
    position: "absolute",
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
    borderWidth: 1,
    borderColor: "#d4af37", // Złota ramka
    opacity: 0.3,
  },
  coverPage: {
    padding: 0,
    backgroundColor: "#fcf9f2",
    fontFamily: "Roboto",
  },
  coverWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  coverBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  coverTopSection: {
    marginTop: 120,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  brandLogo: {
    width: 200,
    height: 180,
    marginBottom: 40,
    alignSelf: "center",
    objectFit: "contain",
  },
  coverTitle: {
    fontSize: 46,
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 4,
    textAlign: "center",
    fontFamily: "Times-Bold",
  },
  coverTitleLight: {
    fontSize: 30,
    fontWeight: 400,
    color: "#d4af37",
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 6,
    textAlign: "center",
  },
  coverSubtitle: {
    fontSize: 15,
    color: "#e5e7eb",
    marginTop: 35,
    textAlign: "center",
    maxWidth: 400,
    lineHeight: 1.6,
    letterSpacing: 1,
  },
  coverOrnament: {
    width: 60,
    height: 1,
    backgroundColor: "#d4af37",
    marginTop: 25,
    marginBottom: 10,
  },
  coverBottomSection: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  coverDetailsContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.5)",
  },
  coverDetails: {
    fontSize: 14,
    fontWeight: 700,
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 1.8,
    letterSpacing: 1,
  },
  header: {
    marginBottom: 30,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headerOrnament: {
    width: 50,
    height: 1,
    backgroundColor: "#d4af37",
    marginTop: 15,
    marginBottom: 25,
  },
  headerLogo: {
    width: 60,
    height: 50,
    marginBottom: 4,
    objectFit: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: "#111827",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 10,
    color: "#d4af37",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginTop: 5,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 10,
    textAlign: "center",
  },
  sectionDivider: {
    width: 80,
    height: 2,
    backgroundColor: "#d4af37",
    marginBottom: 20,
    alignSelf: "center",
  },
  positionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 6,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  positionSubtitle: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 20,
    textAlign: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#d4af37",
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: 1,
  },
  cardImage: {
    width: 180,
    height: 305,
    marginBottom: 25,
    alignSelf: "center",
  },
  paragraphHeading: {
    fontSize: 12,
    fontWeight: 700,
    color: "#111827",
    marginTop: 15,
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  paragraphText: {
    fontSize: 11,
    color: "#374151",
    lineHeight: 1.6,
    marginBottom: 10,
    textAlign: "justify",
  },
  bulletPoint: {
    fontSize: 11,
    color: "#374151",
    lineHeight: 1.6,
    marginLeft: 10,
    marginBottom: 4,
    textAlign: "justify",
  },
  tocItemRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  tocItemText: {
    fontSize: 12,
    color: "#374151",
    lineHeight: 1.5,
  },
  tocDots: {
    flexGrow: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#9ca3af",
    borderBottomStyle: "dashed",
    marginHorizontal: 8,
    position: "relative",
    top: -4,
  },
  tocPageNumber: {
    fontSize: 12,
    color: "#374151",
    fontWeight: 700,
  },
  tocLink: {
    color: "#111827",
    textDecoration: "none",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#9ca3af",
    fontSize: 9,
  },
});

export function TarotReportTemplate({
  email,
  name,
  date1,
  date2,
  reportType,
  aiSummary,
  pageNumbers = {},
  locale,
}: {
  email: string;
  name?: string;
  date1: Date;
  date2?: Date;
  reportType: "INDIVIDUAL" | "PARTNERSHIP";
  aiSummary?: string;
  pageNumbers?: Record<string, number>;
  locale?: string;
}) {
  const isEnglish = locale === "en";
  const portrait: any =
    reportType === "INDIVIDUAL"
      ? calculateIndividualPortrait(date1, locale as "pl" | "en" || "pl")
      : calculatePartnershipPortrait(date1, date2!, locale as "pl" | "en" || "pl");

  const interpretations: any = isEnglish ? interpretationsDataEn : interpretationsData;
  const cards = portrait.detailedCards;
  const category = reportType === "INDIVIDUAL" ? "individual" : "partner";

  const renderDetailedCards = () => {
    return Object.keys(cards).map((posKey) => {
      const card = cards[posKey];
      const interp = interpretations[category]?.[posKey]?.[String(card.number)];

      if (!interp) return null;

      const cardImageNumber = card.number === 0 ? 22 : card.number;
      const imagePath = path.join(process.cwd(), "public", "arkana", `${cardImageNumber}.jpg`);

      let imageBuffer: Buffer | null = null;
      if (fs.existsSync(imagePath)) {
        imageBuffer = fs.readFileSync(imagePath);
      }

      return (
        <View style={styles.section} key={posKey} id={`card_${posKey}`}>
          <PageMarker id={`card_${posKey}`} />
          <View wrap={false}>
            <Text style={styles.positionTitle}>{formatText(card.positionMeaning.title)}</Text>
            <Text style={styles.positionSubtitle}>{formatText(card.positionMeaning.description)}</Text>
            
            {imageBuffer && (
              <Image src={{ data: imageBuffer, format: "jpg" }} style={styles.cardImage} />
            )}

            <Text style={styles.cardTitle}>
              {isEnglish ? `Card: ${card.name} (Arcana ${card.number})` : `Karta: ${card.name} (Arkan ${card.number})`}
            </Text>
          </View>

          {interp.mainMeaning && (
            <View wrap={false}>
              <Text style={styles.paragraphHeading}>{isEnglish ? "Main meaning" : "Główny sens"}</Text>
              <Text style={styles.paragraphText}>{formatText(interp.mainMeaning)}</Text>
            </View>
          )}

          {interp.psychologicalPattern && (
            <View wrap={false}>
              <Text style={styles.paragraphHeading}>{isEnglish ? "Psychological pattern" : "Wzorzec psychologiczny"}</Text>
              <Text style={styles.paragraphText}>{formatText(interp.psychologicalPattern)}</Text>
            </View>
          )}

          {interp.potential && (
            <View wrap={false}>
              <Text style={styles.paragraphHeading}>{isEnglish ? "Potential" : "Potencjał"}</Text>
              <Text style={styles.paragraphText}>{formatText(interp.potential)}</Text>
            </View>
          )}

          {interp.shadow && (
            <View wrap={false}>
              <Text style={styles.paragraphHeading}>{isEnglish ? "Shadow and difficulties" : "Cień i trudności"}</Text>
              <Text style={styles.paragraphText}>{formatText(interp.shadow)}</Text>
            </View>
          )}

          {interp.reflectionQuestions && interp.reflectionQuestions.length > 0 && (
            <View wrap={false}>
              <Text style={styles.paragraphHeading}>{isEnglish ? "Questions for reflection" : "Pytania do refleksji"}</Text>
              {interp.reflectionQuestions.map((q: string, idx: number) => (
                <Text key={idx} style={styles.bulletPoint}>• {formatText(q)}</Text>
              ))}
            </View>
          )}

          {interp.developmentTip && (
            <View wrap={false}>
              <Text style={styles.paragraphHeading}>{isEnglish ? "Development tip" : "Wskazówka rozwojowa"}</Text>
              <Text style={styles.paragraphText}>{formatText(interp.developmentTip)}</Text>
            </View>
          )}
        </View>
      );
    });
  };

  const PageHeader = () => (
    <View style={styles.header} fixed>
      <Text style={styles.title}>{isEnglish ? "Tarot Portrait" : "Tarotowy Portret"}</Text>
      <Text style={styles.subtitle}>
        {reportType === "INDIVIDUAL" 
          ? (isEnglish ? "Individual" : "Indywidualny") 
          : (isEnglish ? "Partnership" : "Partnerski")}
      </Text>
      <View style={styles.headerOrnament} />
    </View>
  );

  const PageFooter = () => (
    <Text 
      style={styles.footer} 
      fixed 
      render={({ pageNumber, totalPages }) => (
        isEnglish 
          ? `© 2026 Archeya. All rights reserved. | Page ${pageNumber} of ${totalPages}`
          : `© 2026 Archeya. Wszystkie prawa zastrzeżone. | Strona ${pageNumber} z ${totalPages}`
      )} 
    />
  );

  const PageWrapper = ({ children }: { children: React.ReactNode }) => (
    <Page size="A4" style={styles.page}>
      <View style={styles.pageBorder} fixed />
      {symbolDarkBuffer && (
        <Image 
          src={{ data: symbolDarkBuffer, format: "png" }} 
          fixed
          style={{ 
            position: "absolute", 
            width: 500, 
            height: 500, 
            left: 47.5, 
            top: 171,
            opacity: 0.02,
            zIndex: -1,
          }} 
        />
      )}
      <PageHeader />
      {children}
      <PageFooter />
    </Page>
  );

  const coverBgPath = path.join(process.cwd(), "public", "images", "cover_bg.jpg");
  let coverBgBuffer: Buffer | null = null;
  if (fs.existsSync(coverBgPath)) {
    coverBgBuffer = fs.readFileSync(coverBgPath);
  }

  const logoLightPath = path.join(process.cwd(), "public", "Logo", "PNG", "archeya-logo-vertical-light.png");
  let logoLightBuffer: Buffer | null = null;
  if (fs.existsSync(logoLightPath)) {
    logoLightBuffer = fs.readFileSync(logoLightPath);
  }

  const logoDarkPath = path.join(process.cwd(), "public", "Logo", "PNG", "archeya-logo-vertical-dark.png");
  let logoDarkBuffer: Buffer | null = null;
  if (fs.existsSync(logoDarkPath)) {
    logoDarkBuffer = fs.readFileSync(logoDarkPath);
  }

  const symbolDarkPath = path.join(process.cwd(), "public", "logo", "PNG", "archeya-symbol-dark.png");
  let symbolDarkBuffer: Buffer | null = null;
  if (fs.existsSync(symbolDarkPath)) {
    symbolDarkBuffer = fs.readFileSync(symbolDarkPath);
  }

  const PageMarker = ({ id }: { id: string }) => (
    <Text 
      style={{ fontSize: 1, opacity: 0, position: "absolute" }} 
      render={({ pageNumber }) => {
        pageNumbers[id] = pageNumber;
        return "";
      }} 
    />
  );

  return (
    <Document>
      {/* 1. OKŁADKA */}
      <Page size="A4" style={styles.coverPage}>
        <View style={styles.coverWrapper}>
          {coverBgBuffer && (
            <Image src={{ data: coverBgBuffer, format: "jpg" }} style={styles.coverBackground} />
          )}
          <View style={styles.coverTopSection}>
            {logoLightBuffer && (
              <Image src={{ data: logoLightBuffer, format: "png" }} style={styles.brandLogo} />
            )}
            <Text style={styles.coverTitle}>{isEnglish ? "Tarot Portrait" : "Tarotowy Portret"}</Text>
            <Text style={styles.coverTitleLight}>
              {reportType === "INDIVIDUAL" 
                ? (isEnglish ? "Individual" : "Indywidualny") 
                : (isEnglish ? "Partnership" : "Partnerski")}
            </Text>
            <View style={styles.coverOrnament} />
            <Text style={styles.coverSubtitle}>
              {reportType === "INDIVIDUAL" 
                ? (isEnglish 
                    ? "- Discover the paths of your soul\nand the depths of your inner self... -" 
                    : "- Odkryj ścieżki swojej duszy\ni głębię swojego wnętrza... -")
                : (isEnglish 
                    ? "- Discover your shared path\nand the depths of your relationship... -" 
                    : "- Odkryjcie wspólną drogę\ni głębię Waszej relacji... -")}
            </Text>
          </View>

          <View style={styles.coverBottomSection}>
            <View style={styles.coverDetailsContainer}>
              {name && <Text style={styles.coverDetails}>{isEnglish ? "For:" : "Dla:"} {name}</Text>}
              <Text style={styles.coverDetails}>
                {isEnglish ? "Date of birth:" : "Data urodzenia:"} {formatDate(date1, "dd.MM.yyyy")}
                {reportType === "PARTNERSHIP" && date2 && ` & ${formatDate(date2, "dd.MM.yyyy")}`}
              </Text>
            </View>
          </View>
        </View>
      </Page>

      <PageWrapper>
        {logoDarkBuffer && (
          <View style={{ width: "100%", alignItems: "center", marginBottom: 30, marginTop: 10 }}>
            <Image src={{ data: logoDarkBuffer, format: "png" }} style={{ width: 140, height: 120, objectFit: "contain" }} />
          </View>
        )}
        <View style={styles.section} id="wstep">
          <PageMarker id="wstep" />
          <Text style={styles.sectionTitle}>{isEnglish ? "What is this report?" : "Czym jest ten raport?"}</Text>
          <View style={styles.sectionDivider} />
          {reportType === "INDIVIDUAL" ? (
            <>
              <Text style={styles.paragraphText}>
                {formatText(isEnglish 
                  ? "The Tarot Portrait is an innovative and incredibly deep method of self-discovery. Although it is based on the 22 Major Arcana of the Tarot, it is not used for fortune-telling or predicting the future. It is a powerful analytical and psychological tool that utilizes the symbolism of archetypes, ancient, universal patterns of human behavior and experience, defined by the prominent psychiatrist Carl Gustav Jung."
                  : "Tarotowy Portret to innowacyjna i niezwykle głęboka metoda poznania samego siebie. Choć opiera się na 22 Wielkich Arkanach Tarota, nie służy on przewidywaniu przyszłości ani wróżeniu. Jest to potężne narzędzie analityczne i psychologiczne, które korzysta z symboliki archetypów, pradawnych, uniwersalnych wzorców ludzkich zachowań i doświadczeń, zdefiniowanych przez wybitnego psychiatrę Carla Gustava Junga.")}
              </Text>
              <Text style={styles.paragraphText}>
                {formatText(isEnglish
                  ? "Calculated based on your exact date of birth, the portrait reveals an incredibly precise, internal architecture of your psyche. It is a personal map of your soul that exposes your innate talents, early childhood patterns, hidden mechanisms of the subconscious, as well as your life's calling. It helps identify the \"Shadow\", those repressed or difficult areas of personality that unconsciously sabotage your actions, and points the way to achieving your full potential."
                  : "Obliczony na podstawie Twojej dokładnej daty urodzenia, portret ukazuje niezwykle precyzyjną, wewnętrzną architekturę Twojej psychiki. Jest to osobista mapa Twojej duszy, która obnaża Twoje wrodzone talenty, wczesnodziecięce schematy, ukryte mechanizmy podświadomości, a także życiowe powołanie. Pomaga zidentyfikować „Cień”, czyli te wyparte lub trudne obszary osobowości, które nieświadomie sabotują Twoje działania, oraz wskazuje ścieżkę do osiągnięcia pełni swojego potencjału.")}
              </Text>
              <Text style={styles.paragraphText}>
                {formatText(isEnglish
                  ? "Each card you will see in this report represents a specific energy and a lesson to be learned. Treat this document as a psychological mirror. We encourage you to read this e-book slowly, with an open mind, returning to individual positions multiple times over the coming months. The knowledge contained here is a compass that will help you consciously steer your life, better understand your emotions, motivations, and find your authentic self."
                  : "Każda karta, którą zobaczysz w tym raporcie, reprezentuje określoną energię i lekcję do przerobienia. Potraktuj ten dokument jako psychologiczne lustro. Zachęcamy, abyś czytał(a) ten e-book powoli, z otwartym umysłem, wracając do poszczególnych pozycji wielokrotnie na przestrzeni kolejnych miesięcy. Wiedza tu zawarta to kompas, który pomoże Ci świadomie kierować swoim życiem, lepiej rozumieć swoje emocje, motywacje i odnaleźć autentyczną wersję siebie.")}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.paragraphText}>
                {formatText(isEnglish
                  ? "The Partnership Tarot Portrait is an innovative and incredibly deep method of understanding the relationship dynamics between two people. Based on the 22 Major Arcana of the Tarot, this report is not for predicting the future, but for understanding the psychological and archetypal forces that connect, shape, and sometimes test your relationship."
                  : "Tarotowy Portret Partnerski to innowacyjna i niezwykle głęboka metoda poznania dynamiki relacji między dwojgiem ludzi. Oparty na 22 Wielkich Arkanach Tarota, raport ten nie służy przewidywaniu przyszłości, lecz zrozumieniu psychologicznych i archetypowych sił, które łączą, kształtują i czasem wystawiają na próbę Waszą relację.")}
              </Text>
              <Text style={styles.paragraphText}>
                {formatText(isEnglish
                  ? "Calculated based on your dates of birth, the portrait reveals the shared architecture of your dynamics. It is a map that exposes common goals, potential, but also flashpoints and lessons you need to work through together. It helps identify the \"Relationship Shadow\", areas where you might unconsciously hurt or block each other, and points the way to achieving long-lasting harmony."
                  : "Obliczony na podstawie Waszych dat urodzenia, portret ukazuje wspólną architekturę Waszej dynamiki. Jest to mapa, która obnaża wspólne cele, potencjał, ale także punkty zapalne i lekcje, które macie razem do przepracowania. Pomaga zidentyfikować „Cień relacji”, czyli obszary, w których nieświadomie możecie się ranić lub blokować, oraz wskazuje ścieżkę do osiągnięcia długotrwałej harmonii.")}
              </Text>
              <Text style={styles.paragraphText}>
                {formatText(isEnglish
                  ? "Each card in this report represents a specific shared energy and challenge for your relationship. Treat this document as a psychological mirror. We encourage you to read it together, with an open mind, returning to individual positions multiple times. The knowledge contained here is a compass that will help you consciously build closeness and authentic understanding."
                  : "Każda karta w tym raporcie reprezentuje określoną wspólną energię i wyzwanie dla Waszej relacji. Potraktujcie ten dokument jako psychologiczne lustro. Zachęcamy do wspólnego czytania, z otwartym umysłem, wracając do poszczególnych pozycji wielokrotnie. Wiedza tu zawarta to kompas, który pomoże Wam świadomie budować bliskość i autentyczne porozumienie.")}
              </Text>
            </>
          )}
        </View>

        <View style={styles.section} break id="spis_tresci">
          <Text style={styles.sectionTitle}>{isEnglish ? "Table of Contents" : "Spis Treści"}</Text>
          <View style={styles.sectionDivider} />
          
          <View style={styles.tocItemRow}>
            <Link src="#wstep" style={styles.tocLink}>
              <Text style={styles.tocItemText}>{isEnglish ? "Introduction: What is this report?" : "Wstęp: Czym jest ten raport?"}</Text>
            </Link>
            <View style={styles.tocDots} />
            <Text style={styles.tocPageNumber}>{pageNumbers["wstep"] || "-"}</Text>
          </View>

          <View style={styles.tocItemRow}>
            <Link src="#profil" style={styles.tocLink}>
              <Text style={styles.tocItemText}>
                {reportType === "INDIVIDUAL" 
                  ? (isEnglish ? "Your Archetypal Profile" : "Twój Archetypowy Profil") 
                  : (isEnglish ? "Your Relationship's Archetypal Profile" : "Archetypowy Profil Waszej Relacji")}
              </Text>
            </Link>
            <View style={styles.tocDots} />
            <Text style={styles.tocPageNumber}>{pageNumbers["profil"] || "-"}</Text>
          </View>
          
          {Object.keys(cards).map((posKey, idx) => (
            <View key={posKey} style={styles.tocItemRow}>
              <Link src={`#card_${posKey}`} style={styles.tocLink}>
                <Text style={styles.tocItemText}>{isEnglish ? "Chapter" : "Rozdział"} {idx + 1}: {cards[posKey].positionMeaning.title}</Text>
              </Link>
              <View style={styles.tocDots} />
              <Text style={styles.tocPageNumber}>{pageNumbers[`card_${posKey}`] || "-"}</Text>
            </View>
          ))}
          
          <View style={styles.tocItemRow}>
            <Link src="#zakonczenie" style={styles.tocLink}>
              <Text style={styles.tocItemText}>
                {reportType === "INDIVIDUAL" 
                  ? (isEnglish ? "Conclusion: Your next step on this path" : "Zakończenie: Twój kolejny krok na tej drodze") 
                  : (isEnglish ? "Conclusion: Your next step on your path together" : "Zakończenie: Kolejny krok na Waszej drodze")}
              </Text>
            </Link>
            <View style={styles.tocDots} />
            <Text style={styles.tocPageNumber}>{pageNumbers["zakonczenie"] || "-"}</Text>
          </View>
        </View>
      </PageWrapper>

      {/* 3. WSTĘP (AI SUMMARY) */}
      {aiSummary && (
        <PageWrapper>
          <View style={styles.section} id="profil">
            <PageMarker id="profil" />
            <Text style={styles.sectionTitle}>
              {reportType === "INDIVIDUAL" 
                ? (isEnglish ? "Your Archetypal Profile" : "Twój Archetypowy Profil") 
                : (isEnglish ? "Your Relationship's Archetypal Profile" : "Archetypowy Profil Waszej Relacji")}
            </Text>
            <View style={styles.sectionDivider} />
            {aiSummary.split('\n\n').map((paragraph, i) => (
              paragraph.trim() ? (
                <Text key={i} style={styles.paragraphText}>
                  {formatText(paragraph.trim())}
                </Text>
              ) : null
            ))}
          </View>
        </PageWrapper>
      )}

      {/* 4. POZYCJE (KARTY) i ZAKOŃCZENIE */}
      <PageWrapper>
        {renderDetailedCards()}
        
        <View style={styles.section} id="zakonczenie">
          <PageMarker id="zakonczenie" />
          <Text style={styles.sectionTitle}>
            {reportType === "INDIVIDUAL" 
              ? (isEnglish ? "Your next step on this path" : "Twój kolejny krok na tej drodze") 
              : (isEnglish ? "Your next step on your path together" : "Kolejny krok na Waszej drodze")}
          </Text>
          <View style={styles.sectionDivider} />
          
          {reportType === "INDIVIDUAL" ? (
            <>
              <Text style={styles.paragraphText}>
                {formatText(isEnglish 
                  ? "Thank you for taking this fascinating journey into the depths of your soul with us. Reading and analyzing your own Portrait is an act of great courage and maturity. Few people decide to look inward, confront their hidden fears, and stand in truth before themselves."
                  : "Dziękujemy za odbycie z nami tej fascynującej podróży w głąb Twojej duszy. Przeczytanie i przeanalizowanie własnego Portretu to akt ogromnej odwagi i dojrzałości. Niewiele osób decyduje się na to, by zajrzeć w swoje wnętrze, skonfrontować się ze swoimi ukrytymi lękami i stanąć w prawdzie przed sobą.")}
              </Text>
              <Text style={styles.paragraphText}>
                {formatText(isEnglish
                  ? "The fact that you have this report is proof that you desire authentic growth. You have a readiness for change and a desire to better understand the mechanisms that drive you. You are on the right path, and the knowledge you discover here is a powerful tool for inner transformation. This is not the end of the work, it is just a wonderful beginning of the process of deepening your self-awareness."
                  : "To, że posiadasz ten raport, jest dowodem na to, że pragniesz autentycznego rozwoju. Posiadasz w sobie gotowość do zmiany i chęć lepszego zrozumienia mechanizmów, które Tobą kierują. Jesteś na właściwej ścieżce, a wiedza, którą tu odkrywasz, stanowi potężne narzędzie wewnętrznej transformacji. To nie jest koniec pracy, to dopiero wspaniały początek procesu pogłębiania Twojej samoświadomości.")}
              </Text>
              <Text style={styles.paragraphText}>
                {formatText(isEnglish
                  ? "Congratulations on taking this extraordinary step on your life path! Remember to return to individual positions of this portrait at different times in your life, each time you will discover a new, even deeper layer of truth about yourself in them. We wish you every success, infinite peace, and immense courage in exploring the beautiful potential with which you set out on this journey."
                  : "Gratulujemy Ci zrobienia tego niezwykłego kroku na Twojej życiowej drodze! Pamiętaj, aby wracać do poszczególnych pozycji tego portretu w różnych momentach swojego życia, za każdym razem odkryjesz w nich nową, jeszcze głębszą warstwę prawdy o sobie. Życzymy Ci samych sukcesów, nieskończonego spokoju oraz ogromnej odwagi w eksplorowaniu pięknego potencjału, z którym wyruszasz w tę podróż.")}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.paragraphText}>
                {formatText(isEnglish
                  ? "Thank you for taking this fascinating journey into the depths of your relationship with us. Exploring and analyzing a Partnership Portrait is an act of great maturity. Few people decide to take such a deep look at the mechanisms that drive the dynamics between two people."
                  : "Dziękujemy za odbycie z nami tej fascynującej podróży w głąb Twojej relacji. Zgłębienie i przeanalizowanie Portretu Partnerskiego to akt dużej dojrzałości. Niewiele osób decyduje się na tak dogłębne przyjrzenie się mechanizmom, które kierują dynamiką między dwojgiem ludzi.")}
              </Text>
              <Text style={styles.paragraphText}>
                {formatText(isEnglish
                  ? "Possessing this report proves your desire to build a relationship based on authentic understanding and openness. You are on the right path, and the knowledge you are discovering here is a powerful tool for deepening bonds and conscious transformation. Remember that there are no perfect relationships - there are only those we consciously work on."
                  : "Posiadanie tego raportu świadczy o Twojej chęci budowania relacji opartej na autentycznym zrozumieniu i otwartości. Jesteś na właściwej ścieżce, a wiedza, którą tu odkrywasz, stanowi potężne narzędzie do pogłębiania więzi i świadomej transformacji. Pamiętaj, że nie ma relacji idealnych – są tylko te, nad którymi świadomie pracujemy.")}
              </Text>
              <Text style={styles.paragraphText}>
                {formatText(isEnglish
                  ? "Congratulations on taking this extraordinary step! Return to individual positions of this portrait at different times, and each time you will discover new, even deeper layers of truth about your relationship. We wish you immense patience, respect for yourself and your partner, and the beautiful building of the potential that exists between you."
                  : "Gratulujemy zrobienia tego niezwykłego kroku! Wracaj do poszczególnych pozycji tego portretu w różnych momentach, a za każdym razem odkryjesz w nich nowe, jeszcze głębsze warstwy prawdy o Waszej relacji. Życzymy Ci ogromu cierpliwości, szacunku do samego siebie i partnera oraz pięknego budowania potencjału, który jest między Wami.")}
              </Text>
            </>
          )}
          {logoDarkBuffer && (
            <View wrap={false} style={{ width: "100%", alignItems: "center", marginTop: 40, marginBottom: 20 }}>
              <Image src={{ data: logoDarkBuffer, format: "png" }} style={{ width: 160, height: 140, objectFit: "contain" }} />
              <Text style={{ fontSize: 10, color: "#6b7280", marginTop: 15, textAlign: "center", letterSpacing: 1, textTransform: "uppercase" }}>
                {isEnglish ? "Thank you for purchasing the portrait" : "Dziękujemy za zakup portretu"}
              </Text>
            </View>
          )}
        </View>
      </PageWrapper>
    </Document>
  );
}
