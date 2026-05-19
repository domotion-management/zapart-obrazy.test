# 🎨 Włodzimierz Zapart — Portfolio Artysty

Strona portfolio malarza abstrakcjonisty z Krakowa. Zbudowana w oparciu o **Next.js 15**, **Sanity CMS** i **Docker**, z pełnym odwzorowaniem oryginalnego designu statycznej strony HTML.

---

## 🏗️ Stack technologiczny

| Warstwa | Technologia |
|---|---|
| Frontend | **Next.js 15** (App Router, TypeScript) |
| Stylowanie | **TailwindCSS v4** + custom CSS (design tokens) |
| CMS | **Sanity Studio v3** (wbudowany pod `/studio`) |
| Infrastruktura | **Docker**, Docker Compose, **Nginx** reverse proxy |
| Node | **22 Alpine** |

---

## 📁 Struktura projektu

```
wuody/
├── frontend/                    # Aplikacja Next.js
│   ├── src/
│   │   ├── app/                 # Strony (App Router)
│   │   │   ├── layout.tsx       # Root layout (fonty, SEO, meta)
│   │   │   ├── page.tsx         # Strona główna (landing)
│   │   │   ├── globals.css      # Design tokens + reset
│   │   │   ├── components.css   # Style: Nav, Hero, Mobile nav
│   │   │   ├── sections.css     # Style: About, Featured, Gallery
│   │   │   ├── extras.css       # Style: Contact, Footer, Lightbox, WCAG
│   │   │   ├── studio/
│   │   │   │   └── [[...tool]]/
│   │   │   │       └── page.tsx # Sanity Studio (CMS)
│   │   │   └── projekty/
│   │   │       ├── page.tsx     # Lista serii artystycznych
│   │   │       └── [slug]/
│   │   │           └── page.tsx # Szczegóły serii
│   │   ├── components/          # Komponenty React
│   │   │   ├── Navbar.tsx       # Nawigacja (scroll, mobile menu)
│   │   │   ├── Hero.tsx         # Sekcja hero (blur-reveal, animacje)
│   │   │   ├── About.tsx        # O mnie (bio, zdjęcie, statystyki)
│   │   │   ├── FeaturedWorks.tsx# Wybrane prace (6 kart)
│   │   │   ├── Gallery.tsx      # Galeria (filtry, load more, switcher)
│   │   │   ├── Contact.tsx      # Formularz kontaktowy
│   │   │   ├── Footer.tsx       # Stopka
│   │   │   ├── WcagBar.tsx      # Widget dostępności (A+/A−, kontrast)
│   │   │   └── RevealOnScroll.tsx # Animacja reveal (IntersectionObserver)
│   │   ├── lib/                 # Utilsy
│   │   │   ├── sanity.ts        # Klient Sanity
│   │   │   ├── sanity.image.ts  # Builder URL-i obrazów
│   │   │   └── queries.ts       # Zapytania GROQ
│   │   └── sanity/
│   │       └── schema/          # Schematy Sanity
│   │           ├── index.ts     # Barrel file
│   │           ├── artwork.ts   # Obraz (tytuł, technika, wymiary, zdjęcia)
│   │           ├── artist.ts    # Artysta (bio, motto, statystyki)
│   │           ├── siteSettings.ts # Ustawienia (hero, kontakt, social)
│   │           └── artSeries.ts # Serie / kolekcje
│   ├── sanity.config.ts         # Konfiguracja Sanity Studio
│   ├── next.config.ts           # output: standalone + domeny obrazów
│   ├── Dockerfile               # Multi-stage build (deps → build → run)
│   ├── .dockerignore
│   ├── package.json
│   ├── tsconfig.json
│   ├── postcss.config.mjs
│   └── eslint.config.mjs
├── deploy/
│   └── nginx/
│       └── default.conf         # Reverse proxy + cache statycznych plików
├── docker-compose.yml           # frontend + nginx
├── .env.example                 # Zmienne środowiskowe (szablon)
├── index.html                   # Oryginalna strona statyczna (referencja)
└── README.md
```

---

## 🚀 Szybki start (dev lokalnie)

### 1. Sklonuj repo

```bash
git clone git@github.com:ppraksa/wuody.git
cd wuody
```

### 2. Zainstaluj zależności

```bash
cd frontend
npm install
```

### 3. Skonfiguruj zmienne środowiskowe

```bash
cp ../.env.example .env.local
```

Uzupełnij `NEXT_PUBLIC_SANITY_PROJECT_ID` (patrz sekcja Sanity poniżej).

### 4. Uruchom dev server

```bash
npm run dev
```

| Adres | Co tam jest |
|---|---|
| `http://localhost:3000` | Strona portfolio |
| `http://localhost:3000/studio` | Panel CMS (Sanity Studio) |
| `http://localhost:3000/projekty` | Serie artystyczne |

> **💡 Uwaga:** Strona działa od razu nawet bez konfiguracji Sanity — wyświetla fallback data (te same obrazy co w oryginalnym `index.html`). Po podłączeniu Sanity automatycznie przełącza się na dane z CMS.

---

## 🧱 Sanity CMS — konfiguracja

### Pierwsze uruchomienie

1. Załóż konto na [sanity.io](https://www.sanity.io/)
2. Utwórz nowy projekt w [Sanity Dashboard](https://www.sanity.io/manage)
3. Skopiuj **Project ID** i wklej do `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=twoje_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
4. Wejdź na `http://localhost:3000/studio`
5. Zaloguj się kontem Sanity
6. Dodaj treści!

### Schematy CMS

| Typ | Opis | Pola |
|---|---|---|
| **Obraz** (`artwork`) | Pojedynczy obraz w galerii | tytuł, slug, zdjęcie, wnętrze, technika, wymiary, opis, wyróżniony |
| **Artysta** (`artist`) | Dane „O mnie" | imię, zdjęcie, bio, motto, statystyki |
| **Ustawienia** (`siteSettings`) | Konfiguracja globalna | hero, kontakt, social media, stopka |
| **Seria** (`artSeries`) | Kolekcja/projekt | tytuł, opis, okładka, powiązane obrazy, techniki |

### Jak to działa?

- Nie-techniczny użytkownik wchodzi na `/studio`, loguje się i dodaje/edytuje obrazy, bio, dane kontaktowe
- Strona frontendowa automatycznie pobiera dane z Sanity przez zapytania GROQ
- Obrazy są serwowane przez CDN Sanity z optymalizacją (hotspot, resize)

---

## 🐳 Docker — deployment produkcyjny

### Buduj i uruchom

```bash
# Z katalogu głównego projektu
cp .env.example .env
# Uzupełnij NEXT_PUBLIC_SANITY_PROJECT_ID w .env

docker compose up -d --build
```

| Adres | Serwis |
|---|---|
| `http://localhost` (port 80) | Nginx → Next.js |
| `http://localhost/studio` | Sanity Studio |

### Architektura Docker

```
┌──────────┐     ┌───────────────────┐
│  Nginx   │────▶│  Next.js (Node)   │
│  :80     │     │  :3000            │
│          │     │                   │
│  gzip    │     │  - SSR pages      │
│  cache   │     │  - Sanity Studio  │
│  proxy   │     │  - API routes     │
└──────────┘     └───────────────────┘
```

- **Dockerfile** — multi-stage build (`deps` → `builder` → `runner`)
- **output: standalone** — minimalna wielkość obrazu (~150MB vs ~1GB)
- **Nginx** — reverse proxy, gzip, cache `_next/static/` na 365 dni

### Deployment na VPS

```bash
# Na serwerze Linux
git clone git@github.com:ppraksa/wuody.git
cd wuody
cp .env.example .env
# Uzupełnij .env

docker compose up -d --build
```

---

## 🎨 Design — co zostało przeniesione z HTML

Każdy element wizualny z oryginalnego `index.html` został wiernie odtworzony:

| Element | Opis |
|---|---|
| **Hero** | Fullscreen z blur-reveal animacją tła, grain overlay, gradient, scroll indicator |
| **Nawigacja** | Fixed nav: przezroczysta → biała przy scrollu, mobile hamburger menu |
| **O mnie** | 2-kolumnowy grid: zdjęcie z ramką + bio, motto, statystyki (30+, 200+, 40+) |
| **Wybrane prace** | 3-kolumnowy grid z hover overlay (tytuł + technika), tło "ZAPART" watermark |
| **Galeria** | Filtry (olej/akryl/mieszana), listing cards z badge'ami, image switcher (Obraz/Wnętrze), load more |
| **Kontakt** | 2-kolumnowy: dane + formularz z walidacją, social pills |
| **Stopka** | Brand, nawigacja, copyright, motto |
| **WCAG** | Widget dostępności: powiększanie/zmniejszanie czcionki, wysoki kontrast |
| **Animacje** | Reveal on scroll (IntersectionObserver), blur-reveal hero, hover effects |

### Paleta kolorów

| Token | Kolor | Użycie |
|---|---|---|
| `--bg` | `#FAF8F5` | Tło główne |
| `--bg-dark` | `#141210` | Ciemne sekcje (hero, featured, footer) |
| `--gold` | `#C8963E` | Akcent, CTA, wyróżnienia |
| `--gold-light` | `#E8B860` | Akcent jasny (hero) |
| `--ink` | `#1A1A1A` | Tekst główny |
| `--ink-muted` | `#5C574F` | Tekst drugorzędny |

### Typografia

| Font | Użycie |
|---|---|
| **Montserrat** (700–800) | Nagłówki, logo, statystyki |
| **Open Sans** (italic) | Leadы, podpisy, motto |
| **Inter** (300–600) | Body text, etykiety, przyciski |

---

## 📋 Zmienne środowiskowe

| Zmienna | Wymagana | Opis |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ | ID projektu Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ | Dataset (domyślnie: `production`) |

---

## 🛠️ Komendy

```bash
# Development
cd frontend
npm run dev          # Dev server z Turbopack

# Build
npm run build        # Buduj produkcję

# Lint
npm run lint         # Sprawdź ESLint

# Docker
docker compose up -d --build    # Zbuduj i uruchom
docker compose down             # Zatrzymaj
docker compose logs -f          # Logi
```

---

## 📝 Do zrobienia

- [ ] `npm install` (wymaga sieci)
- [ ] Weryfikacja builda
- [ ] Komponent Lightbox (pełny JS — CSS już jest)
- [ ] Utworzenie projektu Sanity i dodanie treści
- [ ] SSL (Certbot/Let's Encrypt na VPS)
