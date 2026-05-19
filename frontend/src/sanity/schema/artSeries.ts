import { defineType, defineField, defineArrayMember } from 'sanity'

export const artSeries = defineType({
  name: 'artSeries',
  title: 'Seria / Kolekcja',
  type: 'document',
  icon: () => '📁',
  groups: [
    { name: 'pl', title: '🇵🇱 Polski', default: true },
    { name: 'en', title: '🇬🇧 English' },
  ],
  fields: [
    /* ── PL fields ──────────────────────────────────────── */
    defineField({
      name: 'title',
      title: 'Nazwa serii',
      type: 'string',
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
      name: 'description_en',
      title: 'Description (EN)',
      type: 'text',
      rows: 4,
      group: 'en',
    }),

    /* ── Shared fields ──────────────────────────────────── */
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Okładka',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'artworks',
      title: 'Obrazy w serii',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'artwork' }],
        }),
      ],
    }),
    defineField({
      name: 'techniques',
      title: 'Techniki',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        list: [
          { title: 'Olej na płótnie', value: 'Olej na płótnie' },
          { title: 'Akryl', value: 'Akryl' },
          { title: 'Technika mieszana', value: 'Technika mieszana' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'title', media: 'coverImage' },
  },
})
