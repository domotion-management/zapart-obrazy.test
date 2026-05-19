/* ─── i18n: Static dictionaries + Sanity localized() helper ────────── */

export type Locale = 'pl' | 'en'
export const DEFAULT_LOCALE: Locale = 'pl'
export const LOCALES: Locale[] = ['pl', 'en']

/* ─── Static UI translations ──────────────────────────────────────── */

const pl = {
  nav: {
    about: 'O mnie',
    featuredWorks: 'Wybrane prace',
    gallery: 'Galeria',
    projects: 'Projekty',
    contact: 'Kontakt',
    openMenu: 'Otwórz menu',
    closeMenu: 'Zamknij menu',
    mainNav: 'Nawigacja główna',
    mobileNav: 'Menu mobilne',
    footerNav: 'Nawigacja w stopce',
  },
  hero: {
    sectionAria: 'Sekcja główna',
    bgAria: 'Abstrakcja akrylowa Włodzimierza Zaparta',
    cta: 'Poznaj moje prace',
    ctaSecondary: 'Zamów obraz',
    scroll: 'Scroll',
  },
  about: {
    label: 'O mnie',
    statsAria: 'Statystyki twórczości',
    painterFrom: 'malarz z Krakowa',
  },
  featured: {
    title: 'Wybrane<br /><em>prace</em>',
    link: 'Zobacz całą galerię',
  },
  gallery: {
    label: 'Galeria',
    title: 'Wszystkie obrazy',
    subtitle: 'Pełna kolekcja prac dostępnych w sprzedaży i do zamówienia',
    filterAll: 'Wszystkie',
    filterOil: 'Olej',
    filterAcrylic: 'Akryl',
    filterMixed: 'Technika mieszana',
    filterAria: 'Filtruj obrazy według techniki',
    counter: (shown: number, total: number) => `${shown} z ${total} obrazów`,
    loadMore: (count: number) => `Załaduj więcej (${count})`,
    loadMoreAria: 'Załaduj więcej obrazów',
    viewPainting: 'Obraz',
    viewInterior: 'Wnętrze',
    viewsAria: 'Widoki obrazu',
    listAria: 'Lista obrazów',
    ask: 'Zapytaj',
  },
  contact: {
    label: 'Kontakt',
    title: 'Porozmawiajmy<br />o <em>sztuce</em>',
    lead: 'Zainteresowany zakupem obrazu, zleceniem pracy na zamówienie lub doradztwem wnętrzarskim? Skontaktuj się — odpowiem w ciągu 48 godzin.',
    emailLabel: 'E-mail',
    phoneLabel: 'Telefon',
    studioLabel: 'Pracownia',
    formTitle: 'Wyślij wiadomość',
    fieldName: 'Imię i nazwisko',
    fieldNamePlaceholder: 'Jan Kowalski',
    fieldEmail: 'Adres e-mail',
    fieldEmailPlaceholder: 'jan@przykład.pl',
    fieldSubject: 'Temat',
    fieldSubjectPlaceholder: 'Zapytanie o obraz / Zamówienie / Współpraca',
    fieldMessage: 'Wiadomość',
    fieldMessagePlaceholder: 'Opisz, co Cię interesuje — chętnie odpiszę...',
    consent: 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu udzielenia odpowiedzi na zapytanie.',
    privacyPolicy: 'Polityka prywatności',
    submit: 'Wyślij wiadomość',
    errorName: 'Podaj swoje imię i nazwisko.',
    errorEmail: 'Podaj prawidłowy adres e-mail.',
    errorSubject: 'Podaj temat wiadomości.',
    errorMessage: 'Napisz swoją wiadomość.',
    successTitle: 'Wiadomość wysłana!',
    successMessage: 'Dziękuję za kontakt. Odezwę się w ciągu 48 godzin.',
  },
  footer: {
    works: 'Prace',
    copyright: (year: number) => `© ${year} Włodzimierz Zapart. Wszelkie prawa zastrzeżone.`,
  },
  lightbox: {
    dialogAria: 'Powiększony obraz',
    close: 'Zamknij',
    prev: 'Poprzedni obraz',
    next: 'Następny obraz',
  },
  wcag: {
    groupAria: 'Dostępność',
    decreaseFont: 'Zmniejsz czcionkę',
    increaseFont: 'Zwiększ czcionkę',
    highContrast: 'Wysoki kontrast',
  },
  skipNav: 'Przejdź do treści',
  projekty: {
    label: 'Projekty',
    title: 'Serie artystyczne',
    subtitle: 'Kolekcje prac pogrupowane tematycznie',
    seriesLabel: 'Seria',
    emptyTitle: 'Brak serii do wyświetlenia.',
    emptyHint: 'Dodaj serie w panelu CMS pod adresem',
    artworkCount: (n: number) => `${n} obrazów`,
  },
} as const

const en: typeof pl = {
  nav: {
    about: 'About',
    featuredWorks: 'Featured Works',
    gallery: 'Gallery',
    projects: 'Projects',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mainNav: 'Main navigation',
    mobileNav: 'Mobile menu',
    footerNav: 'Footer navigation',
  },
  hero: {
    sectionAria: 'Hero section',
    bgAria: 'Acrylic abstraction by Włodzimierz Zapart',
    cta: 'Explore my works',
    ctaSecondary: 'Commission a painting',
    scroll: 'Scroll',
  },
  about: {
    label: 'About',
    statsAria: 'Career statistics',
    painterFrom: 'painter from Kraków',
  },
  featured: {
    title: 'Featured<br /><em>works</em>',
    link: 'See full gallery',
  },
  gallery: {
    label: 'Gallery',
    title: 'All paintings',
    subtitle: 'Full collection of works available for sale and commission',
    filterAll: 'All',
    filterOil: 'Oil',
    filterAcrylic: 'Acrylic',
    filterMixed: 'Mixed media',
    filterAria: 'Filter paintings by technique',
    counter: (shown: number, total: number) => `${shown} of ${total} paintings`,
    loadMore: (count: number) => `Load more (${count})`,
    loadMoreAria: 'Load more paintings',
    viewPainting: 'Painting',
    viewInterior: 'Interior',
    viewsAria: 'Painting views',
    listAria: 'Paintings list',
    ask: 'Inquire',
  },
  contact: {
    label: 'Contact',
    title: "Let's talk<br />about <em>art</em>",
    lead: 'Interested in purchasing a painting, commissioning a custom work, or interior design consulting? Get in touch — I'll respond within 48 hours.',
    emailLabel: 'E-mail',
    phoneLabel: 'Phone',
    studioLabel: 'Studio',
    formTitle: 'Send a message',
    fieldName: 'Full name',
    fieldNamePlaceholder: 'John Smith',
    fieldEmail: 'E-mail address',
    fieldEmailPlaceholder: 'john@example.com',
    fieldSubject: 'Subject',
    fieldSubjectPlaceholder: 'Painting inquiry / Commission / Collaboration',
    fieldMessage: 'Message',
    fieldMessagePlaceholder: "Describe what interests you — I\u2019ll be happy to respond...",
    consent: 'I consent to the processing of my personal data in order to respond to my inquiry.',
    privacyPolicy: 'Privacy policy',
    submit: 'Send message',
    errorName: 'Please enter your full name.',
    errorEmail: 'Please enter a valid e-mail address.',
    errorSubject: 'Please enter a subject.',
    errorMessage: 'Please write your message.',
    successTitle: 'Message sent!',
    successMessage: "Thank you for reaching out. I\u2019ll respond within 48 hours.",
  },
  footer: {
    works: 'Works',
    copyright: (year: number) => `© ${year} Włodzimierz Zapart. All rights reserved.`,
  },
  lightbox: {
    dialogAria: 'Enlarged image',
    close: 'Close',
    prev: 'Previous image',
    next: 'Next image',
  },
  wcag: {
    groupAria: 'Accessibility',
    decreaseFont: 'Decrease font size',
    increaseFont: 'Increase font size',
    highContrast: 'High contrast',
  },
  skipNav: 'Skip to content',
  projekty: {
    label: 'Projects',
    title: 'Art series',
    subtitle: 'Collections of works grouped by theme',
    seriesLabel: 'Series',
    emptyTitle: 'No series to display.',
    emptyHint: 'Add series in the CMS panel at',
    artworkCount: (n: number) => `${n} paintings`,
  },
}

export type Dictionary = typeof pl

const dictionaries: Record<Locale, Dictionary> = { pl, en }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries[DEFAULT_LOCALE]
}

/* ─── Sanity CMS field localization helper ─────────────────────────── */

/**
 * Pick the localized value of a Sanity field.
 * For locale 'en', tries `field_en` first, falls back to `field` (PL).
 * For locale 'pl', returns `field` directly.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function localized(obj: any, field: string, locale: Locale): string {
  if (!obj) return ''
  if (locale === 'en') return obj[`${field}_en`] || obj[field] || ''
  return obj[field] || ''
}
