import { defineType, defineField, defineArrayMember } from 'sanity'

export const artist = defineType({
  name: 'artist',
  title: 'Artysta',
  type: 'document',
  icon: () => '👨‍🎨',
  groups: [
    { name: 'pl', title: '🇵🇱 Polski', default: true },
    { name: 'en', title: '🇬🇧 English' },
    { name: 'de', title: '🇩🇪 Deutsch' },
    { name: 'media', title: '📷 Media' },
  ],
  fields: [
    /* ── Name (shared) ──────────────────────────────────── */
    defineField({
      name: 'name',
      title: 'Imię i nazwisko',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    /* ── Media ───────────────────────────────────────────── */
    defineField({
      name: 'photo',
      title: 'Zdjęcie',
      type: 'image',
      options: { hotspot: true },
      group: 'media',
    }),

    /* ── PL fields ──────────────────────────────────────── */
    defineField({
      name: 'tagline',
      title: 'Podpis / Slogan',
      type: 'string',
      description: 'Np. "To nazwisko ma w sobie sztukę"',
      group: 'pl',
    }),
    defineField({
      name: 'photoCaption',
      title: 'Podpis pod zdjęciem',
      type: 'string',
      description: 'Np. „Maluję, bo inaczej milczę zbyt głośno."',
      group: 'pl',
    }),
    defineField({
      name: 'sectionTitle',
      title: 'Tytuł sekcji',
      type: 'string',
      description: 'Np. "Malarz wyobraźni i koloru"',
      group: 'pl',
    }),
    defineField({
      name: 'lead',
      title: 'Lead (wstęp)',
      type: 'text',
      rows: 3,
      description: 'Krótki, kursywą — pierwszy akapit sekcji "O mnie"',
      group: 'pl',
    }),
    defineField({
      name: 'bio',
      title: 'Biografia',
      type: 'text',
      rows: 6,
      group: 'pl',
    }),
    defineField({
      name: 'mottoLatin',
      title: 'Motto (łacina)',
      type: 'string',
      group: 'pl',
    }),
    defineField({
      name: 'mottoTranslation',
      title: 'Motto (tłumaczenie PL)',
      type: 'string',
      group: 'pl',
    }),
    defineField({
      name: 'stats',
      title: 'Statystyki',
      type: 'array',
      group: 'pl',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          fields: [
            defineField({ name: 'number', title: 'Liczba', type: 'string' }),
            defineField({ name: 'label', title: 'Etykieta (PL)', type: 'string' }),
            defineField({ name: 'label_en', title: 'Etykieta (EN)', type: 'string' }),
            defineField({ name: 'label_de', title: 'Etykieta (DE)', type: 'string' }),
          ],
          preview: {
            select: { title: 'number', subtitle: 'label' },
          },
        }),
      ],
    }),

    /* ── EN fields ──────────────────────────────────────── */
    defineField({
      name: 'tagline_en',
      title: 'Tagline (EN)',
      type: 'string',
      group: 'en',
    }),
    defineField({
      name: 'photoCaption_en',
      title: 'Photo caption (EN)',
      type: 'string',
      group: 'en',
    }),
    defineField({
      name: 'sectionTitle_en',
      title: 'Section title (EN)',
      type: 'string',
      group: 'en',
    }),
    defineField({
      name: 'lead_en',
      title: 'Lead (EN)',
      type: 'text',
      rows: 3,
      group: 'en',
    }),
    defineField({
      name: 'bio_en',
      title: 'Biography (EN)',
      type: 'text',
      rows: 6,
      group: 'en',
    }),
    defineField({
      name: 'mottoTranslation_en',
      title: 'Motto translation (EN)',
      type: 'string',
      group: 'en',
    }),

    /* ── DE fields ──────────────────────────────────────── */
    defineField({
      name: 'tagline_de',
      title: 'Tagline (DE)',
      type: 'string',
      group: 'de',
    }),
    defineField({
      name: 'photoCaption_de',
      title: 'Bildunterschrift (DE)',
      type: 'string',
      group: 'de',
    }),
    defineField({
      name: 'sectionTitle_de',
      title: 'Sektionstitel (DE)',
      type: 'string',
      group: 'de',
    }),
    defineField({
      name: 'lead_de',
      title: 'Lead (DE)',
      type: 'text',
      rows: 3,
      group: 'de',
    }),
    defineField({
      name: 'bio_de',
      title: 'Biografie (DE)',
      type: 'text',
      rows: 6,
      group: 'de',
    }),
    defineField({
      name: 'mottoTranslation_de',
      title: 'Motto-Übersetzung (DE)',
      type: 'string',
      group: 'de',
    }),
  ],
  preview: {
    select: { title: 'name', media: 'photo' },
  },
})
