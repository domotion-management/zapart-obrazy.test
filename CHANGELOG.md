# Changelog

Historia wydań strony zapart-obrazy.com. Deploy każdego środowiska odpala się po pushu **taga `v*`** do właściwego repo (GitHub Actions → SSH → docker compose).

| Środowisko | Repo | Zawartość specyficzna |
|:--|:--|:--|
| **PROD** | `ppraksa/wuody` | Google Analytics 4 (`G-8TW3R272N2`) |
| **TEST** | `domotion-management/zapart-obrazy.test` | Basic Auth (middleware), bez GA |

⚠️ Branche środowisk są **celowo rozjechane** — wspólne zmiany przenosimy przez `cherry-pick`, nigdy przez merge.

---

## [v1.5.5] — 2026-07-13 — TEST
- **seo:** podstrony obrazów `/obrazy/[slug]` — 35 stron SSG z Sanity: metadata + canonical + OG, JSON-LD `VisualArtwork` (artMedium, width/height, `Offer` z ceną PLN) + `BreadcrumbList`, breadcrumbs, specyfikacja, sekcja „Obraz we wnętrzu", CTA do kontaktu
- **seo:** internal linking — tytuły kart galerii linkują do podstron obrazów; `/obrazy/*` w sitemap (38 URL-i)
- **seo/GEO:** sekcja FAQ na stronie głównej (6 pytań PL/EN/DE, natywny akordeon bez JS) + `FAQPage` w JSON-LD — treści answer-first pod cytowania w AI ⚠️ *treści FAQ = draft do merytorycznej akceptacji*
- **i18n:** słowniki `artwork` + `faq` (PL/EN/DE)
- Review: `08-Code-Reviews/2026-07-13_seo-sprint3-obrazy-faq.md` (✅ APPROVE)

## [v1.5.4] — 2026-07-13 — PROD
- **seo:** zawartość v1.5.3 (Sprint 2 SEO) cherry-picked na PROD — JSON-LD @graph (Person + LocalBusiness + WebSite), next/image dla wszystkich obrazów, ASCII-art robots.txt, wspólny SITE_URL

## [v1.5.3] — 2026-07-12 — TEST
- **seo:** JSON-LD refaktor — `@graph`: Person (czyste `knowsAbout` = style malarskie, bez keyword stuffingu) + LocalBusiness (adres rozdzielony street/locality, GeoCoordinates, hasMap z place_id) + WebSite; encje powiązane `@id`
- **seo:** wszystkie obrazy artysty przez `next/image` (Gallery, FeaturedWorks, About, Lightbox) — AVIF/WebP, srcset, lazy; alt fallback wzbogacony o wymiary („Tytuł, Technika, 80 x 80 cm, Włodzimierz Zapart")
- **feat:** robots.txt jako route handler z ASCII-artem „ZAPART" w komentarzach `#` (easter egg; dyrektywy bez zmian)
- **refactor:** wspólny `SITE_URL` w `lib/site.ts` (robots/sitemap/layout)
- **fix:** `new window.Image()` w Lightbox (import next/image przesłaniał konstruktor DOM)
- Review: `08-Code-Reviews/2026-07-12_seo-sprint2-schema-obrazy.md` (✅ APPROVE)

## [v1.5.2] — 2026-07-10 — PROD
- **seo:** zawartość v1.5.1 (Sprint 1 SEO) cherry-picked na PROD — robots.txt, sitemap.xml, canonicale, og:image z Sanity, metadata per locale, branded 404 (noindex), CSP + security headers
- Uwaga: deploy TEST v1.5.1 nie doszedł do serwera (brak sekretów Actions w repo TEST — do uzupełnienia); akceptacja Patryka na podstawie weryfikacji lokalnej

## [v1.5.1] — 2026-07-10 — TEST
- **seo:** `robots.txt` (Metadata API) — allow all + jawnie boty AI (GPTBot, ClaudeBot, PerplexityBot…), disallow `/studio` i `/api/`, wskazanie sitemap
- **seo:** `sitemap.xml` — trasy statyczne + dynamiczne slugi serii z Sanity
- **seo:** `generateMetadata()` w layout — title/description z Sanity (`seoTitle`/`seoDescription`, per locale), og:image + twitter:image 1200×630 z `heroImage`; fallbacki poprawione **Kraków→Poznań** i zaktualizowane liczby (35+ lat, 350+ obrazów)
- **seo:** canonical na wszystkich stronach (`/`, `/projekty`, `/projekty/[slug]`, `/polityka-prywatnosci`) + rozszerzone description/OG podstron
- **seo:** usunięty zdublowany `generateMetadata` z `page.tsx` (dziedziczenie z layoutu)
- **feat:** branded strona 404 (`not-found.tsx`) z `robots: noindex`
- **security:** nagłówki HTTP w `next.config.ts` — CSP (allowlist GA/Sanity/reCAPTCHA; `/studio` wyłączone), `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`
- Review: `08-Code-Reviews/2026-07-10_seo-sprint1-fundament.md` (✅ APPROVE)

## [v1.5.0] — 2026-07-06 — PROD
- **feat:** baner zgody cookies (Consent Mode v2) — stylistyka Atelier Editorial, tabela cookies (nazwa/cel/ważność/rodzaj), decyzja w `localStorage` na 12 mies., tłumaczenia PL/EN/DE, link „Ustawienia cookies" w stopce
- **feat:** `gtag('consent','default')` z `analytics_storage: denied` przed konfiguracją GA; sygnały reklamowe (`ad_storage`, `ad_user_data`, `ad_personalization`) zawsze `denied`
- GA ustawia cookies **wyłącznie po zgodzie** użytkownika

## [v1.4.9] — 2026-07-06 — TEST
- **feat:** baner zgody cookies (Consent Mode v2) — jak wyżej; na TEST bez GA (wywołania `gtag` bezpiecznie pomijane)

## [v1.4.8] — 2026-07-06 — TEST
- **revert:** usunięcie skryptu GA z kodu środowiska testowego — GA żyje wyłącznie w repo produkcyjnym

## [v1.4.7] — 2026-07-06 — PROD
- **feat:** Google Analytics 4 (gtag.js `G-8TW3R272N2`) w `frontend/src/app/layout.tsx` — pierwsza działająca instalacja GA (poprzedni snippet w statycznym `index.html` nie był serwowany)
- **fix:** usunięcie martwego snippetu GA ze statycznego `index.html`

## [v1.4.6] — 2026-07-06 — TEST
- **fix:** dane Basic Auth wyłącznie z env-varów `TEST_BASIC_AUTH_USER/PASS` (fail closed — brak zmiennych blokuje środowisko)

## [v1.4.5] — 2026-07-06 — TEST
- **feat:** Basic Auth (middleware Next.js) dla hostów innych niż produkcja i localhost — środowisko testowe ukryte

## [v1.4.4] — 2026-07-06 — PROD
- **feat:** snippet GA w statycznym `index.html` *(martwa zmiana — plik nie jest serwowany; naprawione w v1.4.7)*

## [v1.4.1] — 2026-07-01 — PROD
- Stan bazowy: Next.js 15 + Sanity CMS, Docker + nginx, formularz kontaktowy (reCAPTCHA + SMTP), WCAG bar, i18n PL/EN/DE
