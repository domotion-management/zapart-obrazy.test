import { defineType, defineField } from 'sanity'

export const contactSubmission = defineType({
  name: 'contactSubmission',
  title: 'Wiadomości kontaktowe',
  type: 'document',
  icon: () => '✉️',
  fields: [
    defineField({
      name: 'name',
      title: 'Imię i nazwisko',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Adres e-mail',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'subject',
      title: 'Temat',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'message',
      title: 'Treść wiadomości',
      type: 'text',
      readOnly: true,
    }),
    defineField({
      name: 'consent',
      title: 'Zgoda marketingowa/RODO',
      type: 'boolean',
      description: 'Zgoda na przetwarzanie danych osobowych w celu kontaktu',
      readOnly: true,
    }),
    defineField({
      name: 'submittedAt',
      title: 'Data wysłania',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'subject',
      subtitle: 'name',
      date: 'submittedAt',
    },
    prepare({ title, subtitle, date }) {
      const formattedDate = date ? new Date(date).toLocaleString('pl-PL') : ''
      return {
        title: title || 'Bez tematu',
        subtitle: `${subtitle || 'Anonim'} — ${formattedDate}`,
      }
    },
  },
})
