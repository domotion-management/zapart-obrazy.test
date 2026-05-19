import RevealOnScroll from './RevealOnScroll'
import { type Locale, getDictionary, localized } from '@/lib/dictionaries'

interface ArtistData {
  name?: string
  sectionTitle?: string
  sectionTitle_en?: string
  lead?: string
  lead_en?: string
  bio?: string
  bio_en?: string
  photoUrl?: string
  photoCaption?: string
  photoCaption_en?: string
  mottoLatin?: string
  mottoTranslation?: string
  mottoTranslation_en?: string
  stats?: { number: string; label: string; label_en?: string }[]
}

export default function About({ artist, locale }: { artist: ArtistData | null; locale: Locale }) {
  const a = artist || {}
  const t = getDictionary(locale)

  return (
    <section className="about" id="o-mnie" aria-labelledby="about-heading">
      <div className="container">
        <div className="about__grid">
          <RevealOnScroll>
            <div className="about__photo-wrap">
              <div className="about__photo-frame" aria-hidden="true" />
              {a.photoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={a.photoUrl}
                  alt={`${a.name || ''} — ${t.about.painterFrom}`}
                  className="about__photo"
                  width={768}
                  height={794}
                  loading="lazy"
                  decoding="async"
                />
              )}
              {localized(a, 'photoCaption', locale) && (
                <div className="about__photo-caption">{localized(a, 'photoCaption', locale)}</div>
              )}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={2}>
            <div className="about__text">
              <div className="section-label">
                <span className="t-label" style={{ color: 'var(--gold)' }}>{t.about.label}</span>
              </div>
              {localized(a, 'sectionTitle', locale) && (
                <h2 id="about-heading" className="about__title"
                  dangerouslySetInnerHTML={{ __html: localized(a, 'sectionTitle', locale) }}
                />
              )}
              {localized(a, 'lead', locale) && <p className="about__lead">{localized(a, 'lead', locale)}</p>}
              {localized(a, 'bio', locale) && <p className="about__body">{localized(a, 'bio', locale)}</p>}
              {(a.mottoLatin || localized(a, 'mottoTranslation', locale)) && (
                <div className="about__motto" role="blockquote">
                  {a.mottoLatin && <p className="about__motto-latin">{a.mottoLatin}</p>}
                  {localized(a, 'mottoTranslation', locale) && (
                    <p className="about__motto-trans">{localized(a, 'mottoTranslation', locale)}</p>
                  )}
                </div>
              )}
              {a.stats && a.stats.length > 0 && (
                <div className="about__stats" aria-label={t.about.statsAria}>
                  {a.stats.map((s, i) => (
                    <div className="about__stat" key={i}>
                      <div className="about__stat-num">{s.number}</div>
                      <div className="about__stat-label">
                        {locale === 'en' ? (s.label_en || s.label) : s.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
