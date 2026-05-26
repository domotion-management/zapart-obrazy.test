import { defineType, defineField } from 'sanity'

export const artwork = defineType({
  name: 'artwork',
  title: 'Obraz',
  type: 'document',
  icon: () => '🖼️',
  groups: [
    { name: 'pl', title: '🇵🇱 Polski', default: true },
    { name: 'en', title: '🇬🇧 English' },
    { name: 'media', title: '📷 Media' },
    { name: 'meta', title: '⚙️ Meta' },
    { name: 'price', title: '💰 Cena' },
  ],
  fields: [
    /* ── PL fields ──────────────────────────────────────── */
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(200),
      group: 'pl',
    }),
    defineField({
      name: 'techniqueLabel',
      title: 'Etykieta techniki',
      type: 'string',
      description: 'Np. "Olej na płótnie", "Akryl", "Technika mieszana"',
      validation: (rule) => rule.required(),
      group: 'pl',
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
      rows: 4,
      group: 'pl',
    }),

    /* ── EN fields ──────────────────────────────────────── */
    defineField({
      name: 'title_en',
      title: 'Title (EN)',
      type: 'string',
      group: 'en',
    }),
    defineField({
      name: 'techniqueLabel_en',
      title: 'Technique label (EN)',
      type: 'string',
      description: 'E.g. "Oil on canvas", "Acrylic", "Mixed media"',
      group: 'en',
    }),
    defineField({
      name: 'description_en',
      title: 'Description (EN)',
      type: 'text',
      rows: 4,
      group: 'en',
    }),

    /* ── Media ───────────────────────────────────────────── */
    defineField({
      name: 'mainImage',
      title: 'Zdjęcie obrazu',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      group: 'media',
    }),
    defineField({
      name: 'interiorImage',
      title: 'Wizualizacja we wnętrzu',
      type: 'image',
      options: { hotspot: true },
      description: 'Opcjonalne zdjęcie obrazu w aranżacji wnętrza',
      group: 'media',
    }),

    /* ── Meta ────────────────────────────────────────────── */
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
      group: 'meta',
    }),
    defineField({
      name: 'technique',
      title: 'Technika (filtr)',
      type: 'string',
      options: {
        list: [
          { title: 'Olej na płótnie', value: 'olej' },
          { title: 'Akryl', value: 'akryl' },
          { title: 'Technika mieszana', value: 'mieszana' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
      group: 'meta',
    }),
    defineField({
      name: 'dimensions',
      title: 'Wymiary',
      type: 'string',
      description: 'Np. "80 × 80 cm"',
      validation: (rule) => rule.required(),
      group: 'meta',
    }),
    defineField({
      name: 'price',
      title: 'Cena (PLN)',
      type: 'number',
      description: 'Cena w PLN. Na stronie angielskiej zostanie automatycznie przeliczona na EUR (x4). Pozostaw puste lub wpisz 0 dla "Cena na zapytanie".',
      group: 'price',
    }),
    defineField({
      name: 'featured',
      title: 'Wyróżniony',
      type: 'boolean',
      initialValue: false,
      description: 'Pokaż w sekcji "Wybrane prace" na stronie głównej',
      group: 'meta',
    }),
    defineField({
      name: 'order',
      title: 'Kolejność',
      type: 'number',
      description: 'Niższy numer = wyżej na liście',
      initialValue: 0,
      group: 'meta',
    }),
  ],
  orderings: [
    {
      title: 'Kolejność',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'techniqueLabel',
      media: 'mainImage',
    },
  },
})
