# Changelog

Historia wydań strony zapart-obrazy.com. Deploy każdego środowiska odpala się po pushu **taga `v*`** do właściwego repo (GitHub Actions → SSH → docker compose).

| Środowisko | Repo | Zawartość specyficzna |
|:--|:--|:--|
| **PROD** | `ppraksa/wuody` | Google Analytics 4 (`G-8TW3R272N2`) |
| **TEST** | `domotion-management/zapart-obrazy.test` | Basic Auth (middleware), bez GA |

⚠️ Branche środowisk są **celowo rozjechane** — wspólne zmiany przenosimy przez `cherry-pick`, nigdy przez merge.

---

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
