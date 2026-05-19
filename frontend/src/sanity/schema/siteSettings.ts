import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Ustawienia strony',
  type: 'document',
  icon: () => '⚙️',
  groups: [
    { name: 'pl', title: '🇵🇱 Polski', default: true },
    { name: 'en', title: '🇬🇧 English' },
    { name: 'contact', title: '📞 Kontakt' },
    { name: 'social', title: '🔗 Social' },
  ],
  fields: [
    /* ── PL fields ──────────────────────────────────────── */
    defineField({
      name: 'siteTitle',
      title: 'Tytuł strony',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'pl',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Meta opis',
      type: 'text',
      rows: 3,
      group: 'pl',
    }),
    defineField({
      name: 'heroLabel',
      title: 'Hero — etykieta',
      type: 'string',
      description: 'Np. "Malarz · Kraków · Polska"',
      group: 'pl',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero — nagłówek (imię)',
      type: 'string',
      group: 'pl',
    }),
    defineField({
      name: 'heroHeadlineAccent',
      title: 'Hero — nagłówek (nazwisko, kursywa)',
      type: 'string',
      group: 'pl',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero — podtytuł',
      type: 'text',
      rows: 2,
      group: 'pl',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero — obraz tła',
      type: 'image',
      options: { hotspot: true },
      group: 'pl',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Stopka — motto',
      type: 'string',
      group: 'pl',
    }),

    /* ── EN fields ──────────────────────────────────────── */
    defineField({
      name: 'siteTitle_en',
      title: 'Site title (EN)',
      type: 'string',
      group: 'en',
    }),
    defineField({
      name: 'siteDescription_en',
      title: 'Meta description (EN)',
      type: 'text',
      rows: 3,
      group: 'en',
    }),
    defineField({
      name: 'heroLabel_en',
      title: 'Hero — label (EN)',
      type: 'string',
      group: 'en',
    }),
    defineField({
      name: 'heroHeadline_en',
      title: 'Hero — headline first name (EN)',
      type: 'string',
      group: 'en',
    }),
    defineField({
      name: 'heroHeadlineAccent_en',
      title: 'Hero — headline surname italic (EN)',
      type: 'string',
      group: 'en',
    }),
    defineField({
      name: 'heroTagline_en',
      title: 'Hero — tagline (EN)',
      type: 'text',
      rows: 2,
      group: 'en',
    }),
    defineField({
      name: 'footerTagline_en',
      title: 'Footer tagline (EN)',
      type: 'string',
      group: 'en',
    }),

    /* ── Contact (shared) ───────────────────────────────── */
    defineField({
      name: 'contactEmail',
      title: 'E-mail kontaktowy',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Telefon',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactLocation',
      title: 'Lokalizacja',
      type: 'string',
      group: 'contact',
    }),

    /* ── Social (shared) ────────────────────────────────── */
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
      group: 'social',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Ustawienia strony' }
    },
  },
})
