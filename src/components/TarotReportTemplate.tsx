import { Document, Page, Text, View, StyleSheet, Font, Image, Link } from "@react-pdf/renderer";
import { formatDate } from "date-fns";
import { pl } from "date-fns/locale";
import {
  calculateIndividualPortrait,
  calculatePartnershipPortrait,
} from "@/lib/tarotCalculations";
import interpretationsData from "@/content/interpretations.json";
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
    padding: 60,
    backgroundColor: "#0f172a", // Fallback
    color: "#ffffff",
    fontFamily: "Roboto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // Rozsuwa zawartość na górę i dół
    alignItems: "center",
    position: "relative",
  },
  coverBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    objectFit: "cover",
  },
  coverTopSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 40,
  },
  brandLogo: {
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: 700,
    color: "#fde047", // Jasny złoty
    letterSpacing: 8,
    textTransform: "uppercase",
    marginBottom: 60,
    textAlign: "center",
  },
  coverTitle: {
    fontSize: 42,
    fontWeight: 700,
    color: "#fde047", // Złoty
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 3,
    textAlign: "center",
    textShadow: "1px 1px 4px rgba(0,0,0,0.8)",
  },
  coverSubtitle: {
    fontSize: 14,
    color: "#fef08a",
    marginTop: 30,
    textAlign: "center",
    maxWidth: 400,
    lineHeight: 1.6,
    textShadow: "1px 1px 4px rgba(0,0,0,0.8)",
  },
  coverBottomSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 40,
  },
  coverDetails: {
    fontSize: 16,
    fontWeight: 700,
    color: "#1f2937", // Ciemny szary/czarny - będzie widoczny na jasnym dole okładki
    textAlign: "center",
    lineHeight: 2,
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
    fontSize: 14,
    fontWeight: 700,
    color: "#d4af37",
    letterSpacing: 4,
    textTransform: "uppercase",
    marginBottom: 4,
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
}: {
  email: string;
  name?: string;
  date1: Date;
  date2?: Date;
  reportType: "INDIVIDUAL" | "PARTNERSHIP";
  aiSummary?: string;
  pageNumbers?: Record<string, number>;
}) {
  const portrait: any =
    reportType === "INDIVIDUAL"
      ? calculateIndividualPortrait(date1)
      : calculatePartnershipPortrait(date1, date2!);

  const interpretations: any = interpretationsData;
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
              Karta: {card.name} (Arkan {card.number})
            </Text>
          </View>

          {interp.mainMeaning && (
            <View>
              <Text style={styles.paragraphHeading}>Główny sens</Text>
              <Text style={styles.paragraphText}>{formatText(interp.mainMeaning)}</Text>
            </View>
          )}

          {interp.psychologicalPattern && (
            <View>
              <Text style={styles.paragraphHeading}>Wzorzec psychologiczny</Text>
              <Text style={styles.paragraphText}>{formatText(interp.psychologicalPattern)}</Text>
            </View>
          )}

          {interp.potential && (
            <View>
              <Text style={styles.paragraphHeading}>Potencjał</Text>
              <Text style={styles.paragraphText}>{formatText(interp.potential)}</Text>
            </View>
          )}

          {interp.shadow && (
            <View>
              <Text style={styles.paragraphHeading}>Cień i trudności</Text>
              <Text style={styles.paragraphText}>{formatText(interp.shadow)}</Text>
            </View>
          )}

          {interp.reflectionQuestions && interp.reflectionQuestions.length > 0 && (
            <View>
              <Text style={styles.paragraphHeading}>Pytania do refleksji</Text>
              {interp.reflectionQuestions.map((q: string, idx: number) => (
                <Text key={idx} style={styles.bulletPoint}>• {formatText(q)}</Text>
              ))}
            </View>
          )}

          {interp.developmentTip && (
            <View>
              <Text style={styles.paragraphHeading}>Wskazówka rozwojowa</Text>
              <Text style={styles.paragraphText}>{formatText(interp.developmentTip)}</Text>
            </View>
          )}
        </View>
      );
    });
  };

  const PageHeader = () => (
    <View style={styles.header} fixed>
      <Text style={styles.headerLogo}>ARCHEYA</Text>
      <Text style={styles.title}>Tarotowy Portret</Text>
      <Text style={styles.subtitle}>
        {reportType === "INDIVIDUAL" ? "Indywidualny" : "Partnerski"}
      </Text>
      <View style={styles.headerOrnament} />
    </View>
  );

  const PageFooter = () => (
    <Text 
      style={styles.footer} 
      fixed 
      render={({ pageNumber, totalPages }) => (
        `© 2026 Archeya. Wszystkie prawa zastrzeżone. | Strona ${pageNumber} z ${totalPages}`
      )} 
    />
  );

  const PageWrapper = ({ children }: { children: React.ReactNode }) => (
    <Page size="A4" style={styles.page}>
      <View style={styles.pageBorder} fixed />
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
        {coverBgBuffer && (
          <Image src={{ data: coverBgBuffer, format: "jpg" }} style={styles.coverBackground} />
        )}
        <View style={styles.coverTopSection}>
          <Text style={styles.brandLogo}>ARCHEYA</Text>
          <Text style={styles.coverTitle}>Tarotowy Portret</Text>
          <Text style={styles.coverTitle}>
            {reportType === "INDIVIDUAL" ? "Indywidualny" : "Partnerski"}
          </Text>
          <Text style={styles.coverSubtitle}>
            — Odkryj ścieżki swojej duszy{"\n"}i głębię swojego wnętrza... —
          </Text>
        </View>

        <View style={styles.coverBottomSection}>
          <View style={styles.coverDetails}>
            {name && <Text>Przygotowano dla: {name}</Text>}
            <Text>
              Data urodzenia: {formatDate(date1, "dd.MM.yyyy")}
              {reportType === "PARTNERSHIP" && date2 && ` & ${formatDate(date2, "dd.MM.yyyy")}`}
            </Text>
          </View>
        </View>
      </Page>

      {/* 2. WPROWADZENIE I SPIS TREŚCI */}
      <PageWrapper>
        <View style={styles.section} id="wstep">
          <PageMarker id="wstep" />
          <Text style={styles.sectionTitle}>Czym jest ten raport?</Text>
          <View style={styles.sectionDivider} />
          <Text style={styles.paragraphText}>
            {formatText("Tarotowy Portret Psychologiczny to innowacyjna i niezwykle głęboka metoda poznania samego siebie. Choć opiera się na 22 Wielkich Arkanach Tarota, nie służy on przewidywaniu przyszłości ani wróżeniu. Jest to potężne narzędzie analityczne i psychologiczne, które korzysta z symboliki archetypów – pradawnych, uniwersalnych wzorców ludzkich zachowań i doświadczeń, zdefiniowanych przez wybitnego psychiatrę Carla Gustava Junga.")}
          </Text>
          <Text style={styles.paragraphText}>
            {formatText("Obliczony na podstawie Twojej dokładnej daty urodzenia, portret ukazuje niezwykle precyzyjną, wewnętrzną architekturę Twojej psychiki. Jest to osobista mapa Twojej duszy, która obnaża Twoje wrodzone talenty, wczesnodziecięce schematy, ukryte mechanizmy podświadomości, a także życiowe powołanie. Pomaga zidentyfikować „Cień” – czyli te wyparte lub trudne obszary osobowości, które nieświadomie sabotują Twoje działania, oraz wskazuje ścieżkę do osiągnięcia pełni swojego potencjału.")}
          </Text>
          <Text style={styles.paragraphText}>
            {formatText("Każda karta, którą zobaczysz w tym raporcie, reprezentuje określoną energię i lekcję do przerobienia. Potraktuj ten dokument jako psychologiczne lustro. Zachęcamy, abyś czytał(a) ten e-book powoli, z otwartym umysłem, wracając do poszczególnych pozycji wielokrotnie na przestrzeni kolejnych miesięcy. Wiedza tu zawarta to kompas, który pomoże Ci świadomie kierować swoim życiem, lepiej rozumieć swoje emocje, motywacje i odnaleźć autentyczną wersję siebie.")}
          </Text>
        </View>

        <View style={styles.section} break id="spis_tresci">
          <Text style={styles.sectionTitle}>Spis Treści</Text>
          <View style={styles.sectionDivider} />
          
          <View style={styles.tocItemRow}>
            <Link src="#wstep" style={styles.tocLink}>
              <Text style={styles.tocItemText}>Wstęp: Czym jest ten raport?</Text>
            </Link>
            <View style={styles.tocDots} />
            <Text style={styles.tocPageNumber}>{pageNumbers["wstep"] || "-"}</Text>
          </View>

          <View style={styles.tocItemRow}>
            <Link src="#profil" style={styles.tocLink}>
              <Text style={styles.tocItemText}>Twój Archetypowy Profil</Text>
            </Link>
            <View style={styles.tocDots} />
            <Text style={styles.tocPageNumber}>{pageNumbers["profil"] || "-"}</Text>
          </View>
          
          {Object.keys(cards).map((posKey, idx) => (
            <View key={posKey} style={styles.tocItemRow}>
              <Link src={`#card_${posKey}`} style={styles.tocLink}>
                <Text style={styles.tocItemText}>Rozdział {idx + 1}: {cards[posKey].positionMeaning.title}</Text>
              </Link>
              <View style={styles.tocDots} />
              <Text style={styles.tocPageNumber}>{pageNumbers[`card_${posKey}`] || "-"}</Text>
            </View>
          ))}
          
          <View style={styles.tocItemRow}>
            <Link src="#zakonczenie" style={styles.tocLink}>
              <Text style={styles.tocItemText}>Zakończenie: Twój kolejny krok na tej drodze</Text>
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
            <Text style={styles.sectionTitle}>Twój Archetypowy Profil</Text>
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
          <Text style={styles.sectionTitle}>Twój kolejny krok na tej drodze</Text>
          <View style={styles.sectionDivider} />
          <Text style={styles.paragraphText}>
            {formatText("Dziękujemy za odbycie z nami tej fascynującej podróży w głąb Twojej duszy. Przeczytanie i przeanalizowanie własnego Portretu Psychologicznego to akt ogromnej odwagi i dojrzałości. Niewiele osób decyduje się na to, by zajrzeć w swoje wnętrze, skonfrontować się ze swoimi ukrytymi lękami i stanąć w prawdzie przed samym sobą.")}
          </Text>
          <Text style={styles.paragraphText}>
            {formatText("To, że posiadasz ten raport, jest dowodem na to, że pragniesz autentycznego rozwoju. Posiadasz w sobie gotowość do zmiany i chęć lepszego zrozumienia mechanizmów, które Tobą kierują. Jesteś na właściwej ścieżce, a wiedza, którą tu odkryłeś(aś), stanowi potężne narzędzie wewnętrznej transformacji. To nie jest koniec pracy – to dopiero wspaniały początek procesu pogłębiania Twojej samoświadomości.")}
          </Text>
          <Text style={styles.paragraphText}>
            {formatText("Gratulujemy Ci zrobienia tego niezwykłego kroku na Twojej życiowej drodze! Pamiętaj, aby wracać do poszczególnych pozycji tego portretu w różnych momentach swojego życia – za każdym razem odkryjesz w nich nową, jeszcze głębszą warstwę prawdy o sobie. Życzymy Ci samych sukcesów, nieskończonego spokoju oraz ogromnej odwagi w eksplorowaniu pięknego potencjału, z którym przyszedłeś/przyszłaś na ten świat.")}
          </Text>
          <Text style={styles.cardTitle}>
            Z mocą archetypów,{"\n"}Archeya
          </Text>
        </View>
      </PageWrapper>
    </Document>
  );
}
