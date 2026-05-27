# 🚀 Tarotowy Portret MVP — Instrukcja Wdrażania

## Spis Treści

1. [Co zostało wdrożone](#co-zostało-wdrożone)
2. [Wymagania](#wymagania)
3. [Instalacja](#instalacja)
4. [Konfiguracja](#konfiguracja)
5. [Migracja Bazy Danych](#migracja-bazy-danych)
6. [Uruchomienie Dev Serwera](#uruchomienie-dev-serwera)
7. [Testowanie](#testowanie)
8. [Wdrażanie na Produkcję](#wdrażanie-na-produkcję)

---

## Co zostało wdrożone

### 📦 Nowe Paczki
- ✅ `stripe` — Płatności online
- ✅ `@react-pdf/renderer` — Generator PDF
- ✅ `react-email` — Szablony emaili
- ✅ `date-fns` — Manipulacja datami

### 🗄️ Baza Danych
- ✅ Model `Order` z całym flow płatności
- ✅ Enum `OrderStatus` (PENDING, PAID, DELIVERED, FAILED)
- ✅ Enum `ReportType` (INDIVIDUAL, PARTNERSHIP)

### 🧮 Logika Ezoterika
- ✅ `calculateIndividualPortrait()` — Portret dla 1 osoby
- ✅ `calculatePartnershipPortrait()` — Portret dla pary
- ✅ `reduceToArcana()` — Redukcja teozoficzna
- ✅ 22 Arkany z opisami

### 🎨 Frontend
- ✅ `/kalkulator` — Interaktywny kalkulator
- ✅ `/arkany` — Listacja wszystkich arkan
- ✅ `/arkana/[slug]` — Strony indywidualne dla każdej arkany
- ✅ `/success` — Strona potwierdzenia płatności

### 🔌 API Endpointy
- ✅ `POST /api/calculate` — Darmowy preview (3 karty)
- ✅ `POST /api/checkout` — Tworzy sesję Stripe
- ✅ `POST /api/webhooks/stripe` — Obsługuje webhook płatności
- ✅ `GET /api/download?orderId=xyz` — Chroniony download PDF

### 📧 Email & PDF
- ✅ Template email `PurchaseReceiptEmail.tsx`
- ✅ Template PDF `TarotReportTemplate.tsx`
- ✅ Integracja z Resend (wysyłanie)
- ✅ Integracja z UploadThing (storage)

### 🔍 SEO & Infrastruktura
- ✅ `sitemap.ts` — Automatyczna mapa strony
- ✅ `robots.ts` — Konfiguracja dla wyszukiwarek
- ✅ Dynamiczne metadane dla każdej arkany

---

## Wymagania

### Środowisko Lokalne
- Node.js >= 18.0.0
- npm lub yarn
- PostgreSQL database (lub wdrażacz alternatywny)

### Konta Zewnętrzne (dla MVP)
1. **Stripe** — https://stripe.com (płatności)
2. **Resend** — https://resend.com (email)
3. **UploadThing** — https://uploadthing.com (storage PDF)
4. **PostgreSQL Database** — (np. Supabase, Railway, či lokalnie)

---

## Instalacja

### Krok 1: Klonowanie Repozytorium

```bash
git clone <repo-url>
cd tarotowy-portret
```

### Krok 2: Instalacja Pakietów

```bash
npm install --legacy-peer-deps
```

> **Uwaga**: `--legacy-peer-deps` jest wymagany ze względu na kompatybilność `@react-pdf/renderer` z React 19.

### Krok 3: Kopia Zmiennych Środowiskowych

```bash
cp .env.example .env.local
```

---

## Konfiguracja

### Krok 1: Baza Danych (PostgreSQL)

Utwórz bazę danych PostgreSQL. Jeśli korzystasz z:

- **Supabase** (rekomendowane): https://supabase.com
  1. Utwórz projekt
  2. Skopiuj connection string
  3. Wstaw do `DATABASE_URL` w `.env.local`

- **Lokalnie** (z Docker):
  ```bash
  docker run --name tarot-db \
    -e POSTGRES_PASSWORD=password \
    -e POSTGRES_DB=tarotowy_portret \
    -p 5432:5432 \
    -d postgres:15
  ```
  DATABASE_URL: `postgresql://postgres:password@localhost:5432/tarotowy_portret`

### Krok 2: Stripe

1. Zaloguj się na https://dashboard.stripe.com
2. Przejdź do **Developers → API Keys**
3. Skopiuj do `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_... (Secret Key)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... (Publishable Key)
   ```
4. Dla webhooków (póżniej): Przejdź do **Developers → Webhooks**

### Krok 3: Resend (Email)

1. Zaloguj się na https://resend.com
2. Skopiuj API Key do `.env.local`:
   ```
   RESEND_API_KEY=re_...
   ```

### Krok 4: UploadThing (Storage)

1. Zaloguj się na https://uploadthing.com
2. Utwórz aplikację (My Apps → Create App)
3. Skopiuj do `.env.local`:
   ```
   UPLOADTHING_SECRET=sk_live_...
   UPLOADTHING_APP_ID=... (App ID)
   ```

### Krok 5: Aplikacja (URL)

Ustaw `NEXT_PUBLIC_APP_URL`:
- **Dev**: `http://localhost:3000`
- **Prod**: `https://tarotowyportret.pl` (lub twoja domena)

---

## Migracja Bazy Danych

```bash
npx prisma migrate dev --name add_orders_table
```

Prisma automatycznie:
1. Tworzy tabelę `orders` 
2. Generuje Prisma Client
3. Seed-uje bazę (jeśli jest seed.ts)

### Weryfikacja

```bash
npx prisma studio
```

Otwiera się Prisma Studio na `http://localhost:5555` — tam widać wszystkie tabele.

---

## Uruchomienie Dev Serwera

```bash
npm run dev
```

Aplikacja dostępna na: http://localhost:3000

### Pierwsze Kroki

1. Przejdź do http://localhost:3000/kalkulator
2. Wpisz swoją datę urodzenia (np. `1990-05-15`)
3. Kliknij "Oblicz Darmowy Preview" — powinna pokazać się darmowa arkana
4. Kliknij "Kup Pełny Raport" — przekierowanie na Stripe testowy

---

## Testowanie

### Test Darmowego Preview

```bash
curl -X POST http://localhost:3000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "reportType": "INDIVIDUAL",
    "date1": "1990-05-15"
  }'
```

Odpowiedź:
```json
{
  "success": true,
  "data": {
    "arcana": {
      "arcanaNumber": 7,
      "arcanaName": "Wózek",
      "description": "..."
    },
    "basicCards": [...]
  }
}
```

### Test Checkoutu

```bash
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "reportType": "INDIVIDUAL",
    "date1": "1990-05-15"
  }'
```

Odpowiedź:
```json
{
  "success": true,
  "sessionUrl": "https://checkout.stripe.com/pay/..."
}
```

### Test E2E na UI

1. Otwórz http://localhost:3000/kalkulator
2. Wypełnij formularz
3. Kliknij "Oblicz" → pokaż preview
4. Kliknij "Kup" → przekierowanie na Stripe
5. Wpisz testową kartę: `4242 4242 4242 4242`, dowolna data przyszła, CVC `123`
6. Potwierdź płatność
7. Powinieneś zostać przekierowany na `/success?orderId=...`

### Webhook Stripe (lokalnie)

Do testowania webhooka lokalnie używaj **Stripe CLI**:

```bash
# 1. Pobierz Stripe CLI
brew install stripe/stripe-cli/stripe  # macOS
# lub https://github.com/stripe/stripe-cli dla Windows/Linux

# 2. Login
stripe login

# 3. Wyślij event
stripe trigger checkout.session.completed
```

---

## Wdrażanie na Produkcję

### Option 1: Vercel (Rekomendowane)

```bash
npm install -g vercel
vercel login
vercel deploy
```

Vercel automatycznie:
- Builduje Next.js
- Wdraża na CDN
- Obsługuje webhooks

**Konfiguracja Webhooków Stripe:**

1. Zaloguj się do Stripe Dashboard
2. **Developers → Webhooks → Add endpoint**
3. URL: `https://<your-vercel-domain>/api/webhooks/stripe`
4. Event: `checkout.session.completed`
5. Skopiuj Signing Secret do zmiennych produkcyjnych w Vercel

### Option 2: Railway

```bash
npm install -g railway
railway login
railway up
```

### Option 3: Docker (DIY)

```bash
docker build -t tarotowy-portret .
docker run -p 3000:3000 --env-file .env.production tarotowy-portret
```

---

## 🐛 Troubleshooting

| Problem | Rozwiązanie |
|---------|------------|
| `DATABASE_URL not found` | Sprawdź `.env.local`, upewnij się że ma zmienną |
| `STRIPE_SECRET_KEY missing` | Skopiuj z Stripe Dashboard → Developers |
| `Email nie przychodzi` | Sprawdź RESEND_API_KEY, domena musi być zweryfikowana |
| `UploadThing 401` | Sprawdź UPLOADTHING_SECRET i APP_ID |
| `PDF nie generuje się` | Sprawdź logi: `npm run dev` i zobacz błędy |

---

## 📚 Dokumentacja

- [Stripe API Reference](https://stripe.com/docs/api)
- [Resend Email API](https://resend.com/docs/send)
- [UploadThing Docs](https://uploadthing.com/docs)
- [React PDF Renderer](https://react-pdf.org)
- [Prisma ORM](https://www.prisma.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)

---

## 📋 Checklist przed Produkcją

- ✅ Wszystkie zmienne środowiskowe ustawione
- ✅ Baza danych migrada
- ✅ Webhook Stripe skonfigurowany
- ✅ Email testowy wysłany i otrzymany
- ✅ PDF generuje się bez błędów
- ✅ Payment flow przetestowany end-to-end
- ✅ SEO (robots, sitemap) sprawdzony
- ✅ Mobile responsiveness testowana
- ✅ Performance (Lighthouse) >= 80
- ✅ Security headers ustawione

---

## 🎯 Następne Kroki

1. **Arkany MDX**: Uzupełnić artykuły dla wszystkich 22 arkan (3-21)
2. **Newsletter**: Integracja z Mailchimp
3. **Admin Panel**: Dashboard do przeglądania sprzedaży
4. **Analytics**: Google Analytics / Plausible
5. **A/B Testing**: Testowanie cen i designu
6. **Affiliate Program**: Dla tarologów

---

## 💬 Pomoc i Wsparcie

W razie problemów:
1. Sprawdź logi: `npm run dev`
2. Przejrzyj `.env.local` pod kątem brakujących zmiennych
3. Sprawdź dokumentację linkowaną wyżej
4. Sprawdź GitHub Issues projektu (jeśli dostępne)

---

**Powodzenia! 🎴✨**
