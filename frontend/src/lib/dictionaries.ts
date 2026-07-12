/* ─── i18n: Static dictionaries + Sanity localized() helper ────────── */

export type Locale = 'pl' | 'en' | 'de'
export const DEFAULT_LOCALE: Locale = 'pl'
export const LOCALES: Locale[] = ['pl', 'en', 'de']

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
    lead1: 'Jesteś zainteresowany zakupem obrazu, zleceniem pracy na zamówienie lub doradztwem wnętrzarskim?',
    lead2: 'Skontaktuj się — najlepiej telefonicznie lub napisz do mnie wiadomość.',
    lead3Before: 'Na co dzień moje prace można oglądać i nabyć w poznańskiej galerii ',
    lead3Link: '„Warsztaty Wyobraźni”',
    lead3After: '. Zapraszam serdecznie do osobistego spotkania i rozmowy o sztuce.',
    emailLabel: 'E-mail',
    phoneLabel: 'Telefon',
    studioLabel: 'Pracownia',
    exhibitionLabel: 'Stała ekspozycja obrazów',
    exhibitionValue: 'Galeria „Warsztaty Wyobraźni”, ul. Serbska 9, Poznań',
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
  artwork: {
    label: 'Obraz',
    breadcrumbHome: 'Strona główna',
    breadcrumbGallery: 'Galeria',
    technique: 'Technika',
    dimensions: 'Wymiary',
    price: 'Cena',
    ask: 'Zapytaj o ten obraz',
    back: 'Wróć do galerii',
    interiorHeading: 'Obraz we wnętrzu',
    detailsAria: 'Szczegóły obrazu',
    breadcrumbAria: 'Okruszki nawigacyjne',
  },
  faq: {
    label: 'FAQ',
    title: 'Najczęstsze pytania',
    subtitle: 'Zamówienia, ceny, wysyłka i wizyty w pracowni',
    items: [
      {
        q: 'Jak zamówić obraz na zamówienie?',
        a: 'Wystarczy napisać przez formularz kontaktowy lub e-mail. Wspólnie omawiamy wymiary, kolorystykę i charakter wnętrza, do którego obraz ma trafić — powstaje praca dopasowana do konkretnej przestrzeni.',
      },
      {
        q: 'Ile kosztują obrazy?',
        a: 'Cena zależy od formatu i techniki (olej, akryl, technika mieszana). Ceny części prac są podane bezpośrednio w galerii; pozostałe wyceniane są indywidualnie — zapytaj przez formularz kontaktowy.',
      },
      {
        q: 'Czy można obejrzeć obrazy na żywo w Poznaniu?',
        a: 'Tak. Obrazy można zobaczyć w pracowni malarskiej przy ul. Serbskiej 9 w Poznaniu (Winogrady), po wcześniejszym umówieniu się telefonicznie lub mailowo.',
      },
      {
        q: 'Czy obrazy mają certyfikat autentyczności?',
        a: 'Tak — każdy obraz jest sygnowany przez artystę i sprzedawany z certyfikatem autentyczności.',
      },
      {
        q: 'Czy możliwa jest wysyłka obrazu?',
        a: 'Tak. Obraz można odebrać osobiście w Poznaniu lub zamówić bezpieczną, ubezpieczoną wysyłkę — szczegóły i koszt ustalamy indywidualnie przy zamówieniu.',
      },
      {
        q: 'Jak dobrać obraz do wnętrza?',
        a: 'Najprościej przesłać zdjęcie wnętrza i wymiary ściany — artysta doradzi format i kolorystykę. Wiele prac ma w galerii podgląd „we wnętrzu", który ułatwia wyobrażenie sobie obrazu w przestrzeni.',
      },
    ],
  },
  cookies: {
    regionAria: 'Zgoda na pliki cookies',
    label: 'Prywatność',
    title: 'Szanujemy Twoją prywatność',
    body: 'Ta strona korzysta z niezbędnych plików cookies oraz — wyłącznie za Twoją zgodą — z cookies analitycznych Google Analytics, które pomagają zrozumieć, jak odwiedzający korzystają z galerii. Nie używamy cookies reklamowych.',
    acceptAll: 'Akceptuję wszystkie',
    necessaryOnly: 'Tylko niezbędne',
    showDetails: 'Szczegóły cookies',
    hideDetails: 'Ukryj szczegóły',
    privacyLink: 'Polityka prywatności',
    settings: 'Ustawienia cookies',
    tableAria: 'Lista używanych plików cookies',
    colName: 'Nazwa',
    colPurpose: 'Cel',
    colDuration: 'Ważność',
    colType: 'Rodzaj',
    typeNecessary: 'Niezbędne',
    typeAnalytics: 'Analityczne',
    durationYear: '12 miesięcy',
    durationTwoYears: '2 lata',
    durationPersistent: 'do usunięcia przez użytkownika',
    purposeLocale: 'Zapamiętuje wybrany język strony',
    purposeConsent: 'Przechowuje Twoją decyzję dotyczącą cookies',
    purposeWcag: 'Ustawienia dostępności — rozmiar czcionki i kontrast',
    purposeGa: 'Google Analytics — rozróżnia odwiedzających (anonimowe statystyki)',
    purposeGaSession: 'Google Analytics — utrzymuje stan bieżącej sesji',
  },
} as const

type DeepStringify<T> = T extends (...args: any[]) => any
  ? T
  : T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : {
      readonly [K in keyof T]: DeepStringify<T[K]>
    }

const en: DeepStringify<typeof pl> = {
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
    lead1: 'Interested in purchasing a painting, commissioning a custom work, or interior design consulting?',
    lead2: 'Get in touch \u2014 preferably by phone, or send me a message.',
    lead3Before: 'On a daily basis, my works can be viewed and purchased at the Pozna\u0144-based gallery ',
    lead3Link: '\u201cWarsztaty Wyobra\u017ani\u201d',
    lead3After: '. You are warmly invited to meet in person and talk about art.',
    emailLabel: 'E-mail',
    phoneLabel: 'Phone',
    studioLabel: 'Studio',
    exhibitionLabel: 'Permanent exhibition',
    exhibitionValue: '\u201cWarsztaty Wyobra\u017ani\u201d Gallery, Serbska 9, Pozna\u0144',
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
  artwork: {
    label: 'Painting',
    breadcrumbHome: 'Home',
    breadcrumbGallery: 'Gallery',
    technique: 'Technique',
    dimensions: 'Dimensions',
    price: 'Price',
    ask: 'Ask about this painting',
    back: 'Back to gallery',
    interiorHeading: 'The painting in an interior',
    detailsAria: 'Painting details',
    breadcrumbAria: 'Breadcrumbs',
  },
  faq: {
    label: 'FAQ',
    title: 'Frequently asked questions',
    subtitle: 'Commissions, prices, shipping and studio visits',
    items: [
      {
        q: 'How can I commission a painting?',
        a: 'Simply write via the contact form or e-mail. We discuss the dimensions, colours and character of the interior the painting is meant for — the result is a work tailored to your space.',
      },
      {
        q: 'How much do the paintings cost?',
        a: 'The price depends on the format and technique (oil, acrylic, mixed media). Prices of some works are listed directly in the gallery; others are quoted individually — ask via the contact form.',
      },
      {
        q: 'Can I see the paintings in person in Poznań?',
        a: 'Yes. You can view the paintings at the studio at Serbska 9 in Poznań (Winogrady district), by prior appointment via phone or e-mail.',
      },
      {
        q: 'Do the paintings come with a certificate of authenticity?',
        a: 'Yes — every painting is signed by the artist and sold with a certificate of authenticity.',
      },
      {
        q: 'Is shipping available?',
        a: 'Yes. You can pick the painting up in Poznań or order safe, insured shipping — details and cost are agreed individually with the order.',
      },
      {
        q: 'How do I choose a painting for my interior?',
        a: 'The easiest way is to send a photo of the interior and the wall dimensions — the artist will advise on format and colours. Many works in the gallery include an "in interior" preview to help you picture the painting in a space.',
      },
    ],
  },
  cookies: {
    regionAria: 'Cookie consent',
    label: 'Privacy',
    title: 'We respect your privacy',
    body: 'This site uses essential cookies and — only with your consent — Google Analytics cookies that help us understand how visitors use the gallery. We do not use advertising cookies.',
    acceptAll: 'Accept all',
    necessaryOnly: 'Essential only',
    showDetails: 'Cookie details',
    hideDetails: 'Hide details',
    privacyLink: 'Privacy policy',
    settings: 'Cookie settings',
    tableAria: 'List of cookies in use',
    colName: 'Name',
    colPurpose: 'Purpose',
    colDuration: 'Duration',
    colType: 'Type',
    typeNecessary: 'Essential',
    typeAnalytics: 'Analytics',
    durationYear: '12 months',
    durationTwoYears: '2 years',
    durationPersistent: 'until deleted by the user',
    purposeLocale: 'Remembers your language preference',
    purposeConsent: 'Stores your cookie consent decision',
    purposeWcag: 'Accessibility settings — font size and contrast',
    purposeGa: 'Google Analytics — distinguishes visitors (anonymous statistics)',
    purposeGaSession: 'Google Analytics — maintains the current session state',
  },
}

const de: DeepStringify<typeof pl> = {
  nav: {
    about: 'Über mich',
    featuredWorks: 'Ausgewählte Werke',
    gallery: 'Galerie',
    projects: 'Projekte',
    contact: 'Kontakt',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    mainNav: 'Hauptnavigation',
    mobileNav: 'Mobiles Menü',
    footerNav: 'Fußzeilennavigation',
  },
  hero: {
    sectionAria: 'Hero-Bereich',
    bgAria: 'Acrylabstraktion von Włodzimierz Zapart',
    cta: 'Entdecke meine Werke',
    ctaSecondary: 'Gemälde in Auftrag geben',
    scroll: 'Scrollen',
  },
  about: {
    label: 'Über mich',
    statsAria: 'Karrierestatistik',
    painterFrom: 'Maler aus Krakau',
  },
  featured: {
    title: 'Ausgewählte<br /><em>Werke</em>',
    link: 'Gesamte Galerie ansehen',
  },
  gallery: {
    label: 'Galerie',
    title: 'Alle Gemälde',
    subtitle: 'Vollständige Sammlung der zum Verkauf und zur Bestellung verfügbaren Werke',
    filterAll: 'Alle',
    filterOil: 'Öl',
    filterAcrylic: 'Acryl',
    filterMixed: 'Mischtechnik',
    filterAria: 'Gemälde nach Technik filtern',
    counter: (shown: number, total: number) => `${shown} von ${total} Gemälden`,
    loadMore: (count: number) => `Mehr laden (${count})`,
    loadMoreAria: 'Mehr Gemälde laden',
    viewPainting: 'Gemälde',
    viewInterior: 'Interieur',
    viewsAria: 'Gemäldeansichten',
    listAria: 'Gemäldeliste',
    ask: 'Anfragen',
  },
  contact: {
    label: 'Kontakt',
    title: 'Lassen Sie uns über<br /><em>Kunst</em> sprechen',
    lead1: 'Interessiert am Kauf eines Gemäldes, der Beauftragung einer Auftragsarbeit oder einer Einrichtungsberatung?',
    lead2: 'Kontaktieren Sie mich – am besten telefonisch, oder schreiben Sie mir eine Nachricht.',
    lead3Before: 'Meine Werke können Sie täglich in der Posener Galerie ',
    lead3Link: '„Warsztaty Wyobraźni“',
    lead3After: ' besichtigen und erwerben. Ich lade Sie herzlich zu einem persönlichen Treffen und einem Gespräch über Kunst ein.',
    emailLabel: 'E-Mail',
    phoneLabel: 'Telefon',
    studioLabel: 'Atelier',
    exhibitionLabel: 'Ständige Ausstellung',
    exhibitionValue: 'Galerie „Warsztaty Wyobraźni“, ul. Serbska 9, Poznań',
    formTitle: 'Nachricht senden',
    fieldName: 'Vor- und Nachname',
    fieldNamePlaceholder: 'Max Mustermann',
    fieldEmail: 'E-Mail-Adresse',
    fieldEmailPlaceholder: 'max@example.de',
    fieldSubject: 'Betreff',
    fieldSubjectPlaceholder: 'Anfrage zum Gemälde / Bestellung / Zusammenarbeit',
    fieldMessage: 'Nachricht',
    fieldMessagePlaceholder: 'Beschreiben Sie, was Sie interessiert – ich antworte Ihnen gerne...',
    consent: 'Ich bin mit der Verarbeitung meiner personenbezogenen Daten zum Zwecke der Beantwortung meiner Anfrage einverstanden.',
    privacyPolicy: 'Datenschutzerklärung',
    submit: 'Nachricht senden',
    errorName: 'Bitte geben Sie Ihren Vor- und Nachnamen ein.',
    errorEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    errorSubject: 'Bitte geben Sie einen Betreff ein.',
    errorMessage: 'Bitte schreiben Sie Ihre Nachricht.',
    successTitle: 'Nachricht gesendet!',
    successMessage: 'Vielen Dank für Ihre Kontaktaufnahme. Ich werde mich innerhalb von 48 Stunden melden.',
  },
  footer: {
    works: 'Werke',
    copyright: (year: number) => `© ${year} Włodzimierz Zapart. Alle Rechte vorbehalten.`,
  },
  lightbox: {
    dialogAria: 'Vergrößertes Bild',
    close: 'Schließen',
    prev: 'Vorheriges Bild',
    next: 'Nächstes Bild',
  },
  wcag: {
    groupAria: 'Barrierefreiheit',
    decreaseFont: 'Schriftart verkleinern',
    increaseFont: 'Schriftart vergrößern',
    highContrast: 'Hoher Kontrast',
  },
  skipNav: 'Zum Inhalt springen',
  projekty: {
    label: 'Projekte',
    title: 'Kunstserien',
    subtitle: 'Thematisch gruppierte Kunstsammlungen',
    seriesLabel: 'Serie',
    emptyTitle: 'Keine Serien anzuzeigen.',
    emptyHint: 'Fügen Sie Serien im CMS-Panel hinzu unter',
    artworkCount: (n: number) => `${n} Gemälde`,
  },
  artwork: {
    label: 'Gemälde',
    breadcrumbHome: 'Startseite',
    breadcrumbGallery: 'Galerie',
    technique: 'Technik',
    dimensions: 'Maße',
    price: 'Preis',
    ask: 'Nach diesem Gemälde fragen',
    back: 'Zurück zur Galerie',
    interiorHeading: 'Das Gemälde im Interieur',
    detailsAria: 'Gemäldedetails',
    breadcrumbAria: 'Brotkrümelnavigation',
  },
  faq: {
    label: 'FAQ',
    title: 'Häufige Fragen',
    subtitle: 'Aufträge, Preise, Versand und Atelierbesuche',
    items: [
      {
        q: 'Wie kann ich ein Gemälde in Auftrag geben?',
        a: 'Schreiben Sie einfach über das Kontaktformular oder per E-Mail. Wir besprechen Maße, Farben und den Charakter des Interieurs — es entsteht ein Werk, das auf Ihren Raum zugeschnitten ist.',
      },
      {
        q: 'Was kosten die Gemälde?',
        a: 'Der Preis hängt von Format und Technik ab (Öl, Acryl, Mischtechnik). Die Preise einiger Werke sind direkt in der Galerie angegeben; andere werden individuell kalkuliert — fragen Sie über das Kontaktformular.',
      },
      {
        q: 'Kann ich die Gemälde in Poznań persönlich ansehen?',
        a: 'Ja. Die Gemälde können im Atelier in der Serbska-Straße 9 in Poznań (Winogrady) besichtigt werden — nach vorheriger Terminvereinbarung per Telefon oder E-Mail.',
      },
      {
        q: 'Haben die Gemälde ein Echtheitszertifikat?',
        a: 'Ja — jedes Gemälde ist vom Künstler signiert und wird mit einem Echtheitszertifikat verkauft.',
      },
      {
        q: 'Ist ein Versand möglich?',
        a: 'Ja. Sie können das Gemälde in Poznań abholen oder einen sicheren, versicherten Versand bestellen — Details und Kosten werden individuell bei der Bestellung vereinbart.',
      },
      {
        q: 'Wie wähle ich ein Gemälde für mein Interieur aus?',
        a: 'Am einfachsten senden Sie ein Foto des Interieurs und die Wandmaße — der Künstler berät zu Format und Farben. Viele Werke haben in der Galerie eine „im Interieur"-Vorschau.',
      },
    ],
  },
  cookies: {
    regionAria: 'Cookie-Einwilligung',
    label: 'Datenschutz',
    title: 'Wir respektieren Ihre Privatsphäre',
    body: 'Diese Website verwendet notwendige Cookies sowie — nur mit Ihrer Einwilligung — Google-Analytics-Cookies, die uns helfen zu verstehen, wie Besucher die Galerie nutzen. Wir verwenden keine Werbe-Cookies.',
    acceptAll: 'Alle akzeptieren',
    necessaryOnly: 'Nur notwendige',
    showDetails: 'Cookie-Details',
    hideDetails: 'Details ausblenden',
    privacyLink: 'Datenschutzerklärung',
    settings: 'Cookie-Einstellungen',
    tableAria: 'Liste der verwendeten Cookies',
    colName: 'Name',
    colPurpose: 'Zweck',
    colDuration: 'Gültigkeit',
    colType: 'Art',
    typeNecessary: 'Notwendig',
    typeAnalytics: 'Analytisch',
    durationYear: '12 Monate',
    durationTwoYears: '2 Jahre',
    durationPersistent: 'bis zur Löschung durch den Nutzer',
    purposeLocale: 'Speichert die gewählte Sprache der Website',
    purposeConsent: 'Speichert Ihre Cookie-Entscheidung',
    purposeWcag: 'Barrierefreiheit-Einstellungen — Schriftgröße und Kontrast',
    purposeGa: 'Google Analytics — unterscheidet Besucher (anonyme Statistiken)',
    purposeGaSession: 'Google Analytics — hält den Zustand der aktuellen Sitzung',
  },
}

export type Dictionary = DeepStringify<typeof pl>

const dictionaries: Record<Locale, Dictionary> = { pl, en, de }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries[DEFAULT_LOCALE]
}

/* ─── Sanity CMS field localization helper ─────────────────────────── */

/**
 * Pick the localized value of a Sanity field.
 * For locale 'de', tries `field_de` first, falls back to `field_en` or `field` (PL).
 * For locale 'en', tries `field_en` first, falls back to `field` (PL).
 * For locale 'pl', returns `field` directly.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function localized(obj: any, field: string, locale: Locale): string {
  if (!obj) return ''
  if (locale === 'de') return obj[`${field}_de`] || obj[`${field}_en`] || obj[field] || ''
  if (locale === 'en') return obj[`${field}_en`] || obj[field] || ''
  return obj[field] || ''
}

export function formatPrice(price: number | undefined | null, locale: Locale): string {
  if (price === undefined || price === null || price === 0) {
    if (locale === 'en') return 'Price on request'
    if (locale === 'de') return 'Preis auf Anfrage'
    return 'Cena na zapytanie'
  }
  if (locale === 'en' || locale === 'de') {
    const eurPrice = Math.round(price / 4)
    const formatted = eurPrice.toLocaleString(locale === 'de' ? 'de-DE' : 'en-US')
    return `€${formatted}`
  }
  return `${price.toLocaleString('pl-PL')} zł`
}
