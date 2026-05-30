# Zasady Typografii i Pisowni Polskiej (Polish Typography Rules)

Ten dokument definiuje sztywne zasady pisowni, formatowania tekstów, nagłówków oraz interpretacji (MDX, JSON, TSX) w obrębie całego projektu. Każdy nowy tekst generowany przez AI lub dodawany do bazy MUSI być z nimi zgodny.

## 1. Sieroty typograficzne (Orphans)
**Zasada:** Żadna pojedyncza litera (a, i, o, u, w, z - zarówno mała jak i wielka) nie może znajdować się na końcu linijki.
- **Implementacja w kodzie/tekstach (MDX, TSX, JSON):** Należy używać tzw. twardej spacji (Non-breaking space: `\u00A0` w JSON/TSX lub `&nbsp;` w MDX) bezpośrednio po tych pojedynczych literach.
- **Przykład Błędny:** `Poszedł w` (nowa linia) `las.`
- **Przykład Poprawny:** `Poszedł w&nbsp;las.` lub `Poszedł w\u00A0las.`

## 2. Zwroty Grzecznościowe (Wielka Litera)
W tekstach mających charakter bezpośredniego zwrotu do użytkownika (szczególnie w wynikach portretu, poradach psychologicznych i na blogu), zaimki dzierżawcze i osobowe w 2. osobie liczby pojedynczej i mnogiej MUSZĄ być pisane wielką literą.

**Wymagają wielkiej litery (przykłady form):**
- Ty
- Cię, Ciebie, Tobie, Ci
- Twój, Twoja, Twoje, Twoim, Twoją, Twych, Twymi, Twojej, Twojego
- Wy, Wam, Was, Wasz, Wasza, Wasze, Waszego, Waszej

**Uwaga do słowa "Ci":**
Jeśli słowo "Ci" występuje jako zaimek (np. "Daję Ci to"), zawsze piszemy je wielką literą. Należy zachować ostrożność jedynie w przypadku konstrukcji wskazujących (np. "Ci ludzie"), ale ze względu na bezpośredni charakter tekstów (Tarot/Portret), większość wystąpień to zwrot do czytelnika.

- **Przykład Błędny:** `To jest twój portret. Pokaże ci, jak pracować nad sobą dla ciebie i was.`
- **Przykład Poprawny:** `To jest Twój portret. Pokaże Ci, jak pracować nad sobą dla Ciebie i Was.`

## 3. Zastosowanie Półpauz i Myślników
- Zamiast zwykłych dywizów (łączników `-`) w tekstach do wtrąceń należy stosować półpauzy (`–` U+2013). 
- Półpauza powinna być otoczona spacjami.
- Dywizów używamy wyłącznie do łączenia wyrazów (np. `czarno-biały`).

## 4. Automatyzacja
W głównym katalogu znajduje się skrypt `scripts/fix-typography.mjs`, który automatycznie potrafi naprawić sieroty oraz zwroty grzecznościowe we wszystkich plikach `.mdx` oraz `content/interpretations.json`.
W razie wątpliwości lub wygenerowania dużej partii nowego tekstu, uruchom skrypt komendą:
```bash
node scripts/fix-typography.mjs
```
