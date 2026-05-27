# Tarotowy Portret — Kompleksowa Implementacja MVP

## 🎯 Co zostało wdrożone

### 1. **Architektura Bazy Danych**
- **Nowy model Order** z polami:
  - `status`: PENDING → PAID → DELIVERED (lub FAILED)
  - `reportType`: INDIVIDUAL | PARTNERSHIP
  - `paymentIntentId`: Link do sesji Stripe
  - `date1`, `date2`: Daty urodzenia
  - `pdfUrl`: URL do raportu na UploadThing
  - `price`: Cena w groszach

### 2. **Logika Ezoterika** (`src/lib/tarotCalculations.ts`)
- **reduceToArcana()**: Redukcja teozoficzna liczb do Arkan (0-21)
- **dateToNumber()**: Konwersja daty urodzenia na liczbę
- **calculateIndividualPortrait()**: Portret dla 1 osoby
- **calculatePartnershipPortrait()**: Portret dla pary
- **getBasicCards()**: Darmowy preview (3-5 kart)
- 22 Arkany Wielkiej Arkany z opisami

### 3. **API Endpointy**

#### `POST /api/calculate`
- Wejście: `reportType`, `date1`, `date2?`
- Wyjście: Obliczone Arkany + darmowy preview (3 karty)
- Bez autentykacji (darmowe użytkowanie)

#### `POST /api/checkout`
- Wejście: `email`, `reportType`, `date1`, `date2?`
- Tworzy Order w bazie + sesję Stripe
- Zwraca URL do przekierowania na bramkę płatności
- Ceny: INDIVIDUAL = 99 PLN, PARTNERSHIP = 129 PLN

#### `POST /api/webhooks/stripe`
- Odbiera potwierdzenie płatności od Stripe
- Generuje PDF za pomocą @react-pdf/renderer
- Wrzuca PDF na UploadThing
- Wysyła email z linkiem do pobrania
- Zmienia status Order na DELIVERED (lub FAILED jeśli błąd)

#### `GET /api/download?orderId=xyz`
- Chroniony endpoint do pobrania PDF
- Weryfikuje, że użytkownik ma dostęp do zamówienia
- Zwraca redirect na URL UploadThing

#### `POST /api/calculate` (info point)
- Publiczny endpoint, bez konieczności rejestracji
- Zwraca darmowy zarys (3 pierwsze Arkany)

### 4. **Frontend — Kalkulator** (`app/kalkulator/page.tsx`)
- UI do wyboru rodzaju raportu (INDIVIDUAL / PARTNERSHIP)
- Formularze z React Hook Form + Zod
- Walidacja daty urodzenia
- Wyświetlenie wyniku na żywo
- Przycisk "Kup Pełny Raport" → Stripe checkout
- Responsywny design (mobile-first)

### 5. **Generator PDF** (`src/components/TarotReportTemplate.tsx`)
- Component React oparty o @react-pdf/renderer
- Elegancki design z brandingiem Tarotowego Portretu
- Automatyczne formatowanie dat (pl-PL)
- Sekcje: Główna Arkana, Karty Pokrewne, Footer
- Obsługuje zarówno raporty indywidualne jak i partnerskie

### 6. **Email Template** (`src/components/PurchaseReceiptEmail.tsx`)
- Component react-email z brandingiem
- Zawiera przycisk do pobrania raportu
- Wysyłany natychmiast po webhooku (zaraz po opłaceniu)
- Responsive design

### 7. **Strona Sukcesu** (`app/success/page.tsx`)
- Potwierdzenie płatności
- Info o wysłanym emailu
- Linki do kalkulatora i strony głównej

### 8. **Zmienne Środowiskowe** (`.env.example`)
```
DATABASE_URL
RESEND_API_KEY
UPLOADTHING_SECRET
UPLOADTHING_APP_ID
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
NEXT_PUBLIC_APP_URL
```

### 9. **Dodane Pakiety**
- `stripe` — SDK do obsługi płatności
- `@react-pdf/renderer` — Generator PDF
- `react-email` — Szablony email
- `date-fns` — Manipulacja datami

---

## 🚀 Jak Wdrożyć

### Krok 1: Konfiguracja Zmiennych Środowiskowych

Skopiuj `.env.example` do `.env.local`:
```bash
cp .env.example .env.local
```

Wypełnij wartości:
- **DATABASE_URL**: String połączenia do PostgreSQL
- **RESEND_API_KEY**: Token z https://resend.com
- **UPLOADTHING_***: Keys z https://uploadthing.com
- **STRIPE_***: Keys z https://stripe.com (test mode)
- **NEXT_PUBLIC_APP_URL**: np. `http://localhost:3000` (dev) lub twoja domena (prod)

### Krok 2: Migracja Bazy Danych

```bash
npx prisma migrate dev --name add_orders_table
```

### Krok 3: Uruchomienie Dev Serwera

```bash
npm run dev
```

Aplikacja będzie dostępna na `http://localhost:3000`.

### Krok 4: Testy

1. Przejdź do `/kalkulator`
2. Wpisz swoją datę urodzenia
3. Kliknij "Oblicz Darmowy Preview" → powinien pokazać wynik
4. Kliknij "Kup Pełny Raport" → przekierowanie na Stripe
5. Użyj testowego numeru karty: `4242 4242 4242 4242`, dowolna data przyszła, dowolny CVC
6. Po opłaceniu → email z linkiem do pobrania PDF

### Krok 5: Konfiguracja Webhook Stripe (Produkcja)

1. Zaloguj się do https://dashboard.stripe.com
2. Przejdź do **Developers → Webhooks**
3. Dodaj endpoint: `https://yourdomain.com/api/webhooks/stripe`
4. Subskrybuj event: `checkout.session.completed`
5. Skopiuj webhook secret do `.env.local` (`STRIPE_WEBHOOK_SECRET`)

---

## 🎯 Flow Zakupu (E2E)

```
1. Użytkownik wejdzie na /kalkulator
   ↓
2. Wybiera typ raportu + wpisuje datę
   ↓
3. Kliknięcie "Oblicz Darmowy Preview" → GET /api/calculate
   → Wyświetla darmowe 3 karty
   ↓
4. Kliknięcie "Kup Pełny Raport" → POST /api/checkout
   → Tworzy Order (status: PENDING)
   → Tworzy sesję Stripe
   → Zwraca URL do bramki
   ↓
5. Stripe checkout — użytkownik płaci
   ↓
6. Stripe wysyła webhook → POST /api/webhooks/stripe
   → Weryfikuje podpis
   → Zmienia status na PAID
   → Generuje PDF
   → Wrzuca na UploadThing
   → Wysyła email z linkiem
   → Zmienia status na DELIVERED
   ↓
7. Użytkownik otrzymuje email z linkiem
   ↓
8. Kliknięcie linku → GET /api/download?orderId=xyz
   → Sprawdzenie dostępu
   → Redirect na URL UploadThing
   → Pobierz PDF
```

---

## 📋 Checklist

- ✅ Modele Prisma (Order, OrderStatus, ReportType)
- ✅ Logika ezoterika (Arkany, redukcja)
- ✅ Frontend kalkulatora (React Hook Form, Zod)
- ✅ API endpointy (calculate, checkout, webhooks, download)
- ✅ Generator PDF (@react-pdf/renderer)
- ✅ Email template (react-email + Resend)
- ✅ UploadThing integration
- ✅ Stripe integration
- ✅ Zmienne środowiskowe (.env.example)
- ✅ Strona sukcesu
- ⏳ Migracja Prisma (czeka na DATABASE_URL)
- ⏳ Testy E2E

---

## 🔐 Bezpieczeństwo

- ✅ Weryfikacja podpisu webhooka Stripe
- ✅ Walidacja Zod na wszystkich inputach
- ✅ Chroniony endpoint download (weryfikacja orderId)
- ✅ Error handling i logging
- ✅ Rate limiting (gotowy middleware w `src/lib/rate-limit.ts`)

---

## 🎨 Customizacja

### Zmiana Cen
Edytuj `app/api/checkout/route.ts`:
```typescript
const REPORT_PRICES: Record<string, number> = {
  INDIVIDUAL: 9900,  // ← zmień tutaj (w groszach)
  PARTNERSHIP: 12900,
};
```

### Zmiana Liczby Arkan w Preview
Edytuj `app/api/calculate/route.ts`:
```typescript
const basicCards = getBasicCards(portrait.arcanaNumber, 3); // ← zmień 3 na inną liczbę
```

### Zmiana Designu PDF
Edytuj `src/components/TarotReportTemplate.tsx` — wszystko jest w StyleSheet.

### Zmiana Brandingu Email
Edytuj `src/components/PurchaseReceiptEmail.tsx` — kolory, tekst, logo.

---

## 🐛 Troubleshooting

**Problem**: "DATABASE_URL not found"
- **Rozwiązanie**: Upewnij się, że `.env.local` zawiera `DATABASE_URL`

**Problem**: "STRIPE_SECRET_KEY missing"
- **Rozwiązanie**: Skopiuj secret key z https://dashboard.stripe.com/apikeys

**Problem**: Email nie przychodzi
- **Rozwiązanie**: Sprawdź `RESEND_API_KEY`, upewnij się że domena jest zweryfikowana

**Problem**: PDF nie generuje się
- **Rozwiązanie**: Sprawdź logi w `docker logs` lub Vercel dashboard

**Problem**: UploadThing zwraca błąd 401
- **Rozwiązanie**: Skopiuj prawidłowo `UPLOADTHING_SECRET` i `UPLOADTHING_APP_ID`

---

## 📚 Dokumentacja Zewnętrzna

- [Stripe Documentation](https://stripe.com/docs)
- [Resend Email API](https://resend.com/docs)
- [UploadThing](https://uploadthing.com/docs)
- [React PDF Renderer](https://react-pdf.org)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Prisma ORM](https://www.prisma.io/docs)

---

## 🎯 Następne Kroki (Post-MVP)

1. **Blog & SEO**: Dynamiczne strony dla każdej Arkany (22 artykuły)
2. **Newsletter**: Integracja z Mailchimp do zbierania subskrybentów
3. **Raport Roczny**: Nowy typ raportu (date range)
4. **Personalizacja**: Ustawienia użytkownika (motyw, język)
5. **Statystyki**: Dashboard dla admina (sprzedaż, popularność arkan)
6. **Współpraca**: Affiliate program dla tarologów
7. **API dla Partnerów**: Public API do integracji raportów
8. **AI Opis**: Wygenerowanie spersonalizowanego tekstu dla każdego portretu
