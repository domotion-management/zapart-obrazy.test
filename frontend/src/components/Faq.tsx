import RevealOnScroll from './RevealOnScroll'
import { type Locale, getDictionary } from '@/lib/dictionaries'

// Server Component — natywny <details>/<summary>, zero JS po stronie klienta
export default function Faq({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const items = t.faq.items
  if (!items?.length) return null

  return (
    <section className="faq" id="faq" aria-labelledby="faq-heading">
      <div className="container">
        <RevealOnScroll>
          <div className="faq__header">
            <div className="section-label" style={{ justifyContent: 'center', marginBottom: 16 }}>
              <span className="t-label" style={{ color: 'var(--gold)' }}>{t.faq.label}</span>
            </div>
            <h2 id="faq-heading" className="faq__title">{t.faq.title}</h2>
            <p className="faq__subtitle">{t.faq.subtitle}</p>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={1}>
          <div className="faq__list">
            {items.map((item, i) => (
              <details key={i} className="faq__item">
                <summary>{item.q}</summary>
                <p className="faq__answer">{item.a}</p>
              </details>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
