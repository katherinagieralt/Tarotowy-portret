#!/bin/bash

# Tarotowy Portret MVP Setup Script

echo "✨ Tarotowy Portret MVP Setup"
echo "================================"

# 1. Instalacja pakietów
echo "📦 Instalacja pakietów..."
npm install --legacy-peer-deps

# 2. Kopia .env
if [ ! -f .env.local ]; then
  echo "📝 Tworzenie .env.local..."
  cp .env.example .env.local
  echo "⚠️  Proszę uzupełnić zmienne w .env.local:"
  echo "   - DATABASE_URL"
  echo "   - RESEND_API_KEY"
  echo "   - UPLOADTHING_SECRET"
  echo "   - UPLOADTHING_APP_ID"
  echo "   - STRIPE_SECRET_KEY"
  echo "   - STRIPE_WEBHOOK_SECRET"
  echo "   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
  echo "   - NEXT_PUBLIC_APP_URL"
fi

# 3. Prisma setup
echo "🗄️  Konfiguracja Prismy..."
npx prisma generate

# 4. Migracja (jeśli DATABASE_URL jest ustawiony)
if [ -z "$DATABASE_URL" ] && [ ! -f .env.local ]; then
  echo "⚠️  DATABASE_URL nie ustawiony — pomijam migrację"
  echo "   Uruchom po skonfigurowaniu: npx prisma migrate dev"
else
  echo "🔄 Migracja bazy danych..."
  npx prisma migrate dev --name add_orders_table || echo "⚠️  Migracja mogła się nie powieść — sprawdź DATABASE_URL"
fi

echo ""
echo "✅ Setup ukończony!"
echo ""
echo "🚀 Aby uruchomić dev serwer:"
echo "   npm run dev"
echo ""
echo "📖 Więcej info w: MVP_IMPLEMENTATION_GUIDE.md"
