#!/bin/bash

# Zatrzymanie w przypadku błędu
set -e

echo "🚀 Rozpoczynam wdrażanie aplikacji Archeya..."

# Sprawdzenie czy plik .env istnieje
if [ ! -f .env ]; 
then
    echo "❌ Błąd: Brak pliku .env! Utwórz go przed uruchomieniem wdrożenia."
    exit 1
fi

# Pobranie najnowszych zmian z repozytorium (odkomentuj jeśli wdrażasz z gita na serwerze)
# echo "📥 Pobieranie najnowszych zmian z Git..."
# git pull origin main

# Zbudowanie obrazów produkcyjnych i uruchomienie kontenerów w tle (-d)
echo "🏗️ Budowanie i uruchamianie kontenerów..."
docker-compose -f docker-compose.prod.yml up -d --build

# Zastosowanie migracji bazy danych (tylko w przypadku używania Prisma)
echo "🗄️ Aktualizacja bazy danych (Prisma db push)..."
docker exec -it tarot-nextjs npx prisma db push

echo "✅ Wdrożenie zakończone sukcesem!"
echo "Twoja aplikacja powinna być teraz dostępna pod Twoją domeną (jeśli Caddy ma poprawne DNSy)."
