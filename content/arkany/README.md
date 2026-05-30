# Content/Arkany

Struktura dla artykułów MDX dotyczących 22 Arkan Wielkiej Arkany Tarota.

## Format

Każdy plik `NN-nazwa.mdx` zawiera:

```mdx
---
number: 0
title: "Arkana 0 - Głupiec"
description: "Krótki opis dla SEO"
---

# Arkana 0 - Głupiec

## Sekcje

- Cechy charakterystyczne
- Odwrotnie (negatywna interpretacja)
- W Twoim Portrecie (personalna interpretacja)
```

## Numery Arkan

| Nr | Nazwa | Plik |
|----|-------|------|
| 22 | Głupiec | `22-glupiec.mdx` ✅ |
| 1 | Mag | `01-mag.mdx` ✅ |
| 2 | Papieżna | `02-papiez.mdx` |
| 3 | Cesarzowa | `03-cesarzowa.mdx` |
| ... | ... | ... |
| 21 | Świat | `21-swiat.mdx` |

## Opis Arkan (z tarotCalculations.ts)

```typescript
const ARCANA = [
  "Głupiec",           // 0
  "Mag",               // 1
  "Papieżna",          // 2
  "Cesarzowa",         // 3
  "Cesarz",            // 4
  "Papież",            // 5
  "Kochankowie",       // 6
  "Wózek",             // 7
  "Siła",              // 8
  "Pustelnik",         // 9
  "Koło Fortuny",      // 10
  "Sprawiedliwość",    // 11
  "Powrożony",         // 12
  "Śmierć",            // 13
  "Umiarkowanie",      // 14
  "Diabeł",            // 15
  "Wieża",             // 16
  "Gwiazda",           // 17
  "Księżyc",           // 18
  "Słońce",            // 19
  "Sąd",               // 20
  "Świat",             // 21
];
```

## TODO

Utworzyć pozostałe artykuły (3-21). Każdy artykuł powinien zawierać:
1. Opis znaczenia
2. Cechy charakterystyczne
3. Interpretacja odwrotna
4. Personalna interpretacja w kontekście portretu

Po utworzeniu wszystkich plików MDX, artykuły automatycznie pojawią się na `/arkany`.
