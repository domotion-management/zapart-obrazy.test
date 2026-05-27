import RevealOnScroll from './RevealOnScroll'
import { type Locale, getDictionary, localized, formatPrice } from '@/lib/dictionaries'

interface Artwork {
  _id: string
  title: string
  title_en?: string
  mainImageUrl?: string
  mainImageAlt?: string
  mainImageTitle?: string
  techniqueLabel?: string
  techniqueLabel_en?: string
  dimensions?: string
  price?: number
}

export default function FeaturedWorks({ artworks, locale }: { artworks: Artwork[]; locale: Locale }) {
  if (artworks.length === 0) return null
  const t = getDictionary(locale)
  const delays = [0, 1, 2, 1, 2, 3]

  return (
    <section className="featured" id="wybrane-prace" aria-labelledby="featured-heading">
      <div className="container">
        <RevealOnScroll>
          <div className="featured__header">
            <h2 id="featured-heading" className="featured__title"
              dangerouslySetInnerHTML={{ __html: t.featured.title }}
            />
            <a href="#galeria" className="featured__link">
              {t.featured.link}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </RevealOnScroll>

        <div className="featured__grid">
          {artworks.map((art, i) => {
            const title = localized(art, 'title', locale)
            const tech = localized(art, 'techniqueLabel', locale)
            return (
              <RevealOnScroll key={art._id} delay={delays[i] || 0}>
                <article className="art-card" aria-label={`${title} — ${tech}, ${art.dimensions}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={art.mainImageUrl}
                    alt={art.mainImageAlt || [title, tech, 'Włodzimierz Zapart'].filter(Boolean).join(', ')}
                    title={art.mainImageTitle || title}
                    className="art-card__img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="art-card__overlay" aria-hidden="true" />
                  <div className="art-card__info" aria-hidden="true">
                    <div className="art-card__title">{title}</div>
                    <div className="art-card__spec">
                      {tech} · {art.dimensions}
                      {art.price !== undefined && (
                        <> · {art.price > 0 && (locale === 'en' ? 'Price: ' : 'Cena: ')}{formatPrice(art.price, locale)}</>
                      )}
                    </div>
                  </div>
                </article>
              </RevealOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
