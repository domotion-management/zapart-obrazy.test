import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RevealOnScroll from '@/components/RevealOnScroll'
import WcagBar from '@/components/WcagBar'
import { urlFor } from '@/lib/sanity.image'
import { getServerI18n } from '@/lib/getLocale'
import { localized } from '@/lib/dictionaries'

export const metadata = {
  title: 'Projekty / Serie — Włodzimierz Zapart',
  description: 'Kolekcje i serie artystyczne Włodzimierza Zaparta.',
}

interface SeriesItem {
  _id: string
  title: string
  title_en?: string
  slug: string
  description?: string
  description_en?: string
  coverImageUrl?: string | null
  techniques?: string[]
  artworkCount?: number
}

async function getSeries(): Promise<SeriesItem[]> {
  try {
    const { getAllSeries } = await import('@/lib/queries')
    const series = (await getAllSeries()) as any[] | null
    if (!series || series.length === 0) return []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return series.map((s: any) => ({
      _id: s._id,
      title: s.title,
      title_en: s.title_en,
      slug: s.slug?.current,
      description: s.description,
      description_en: s.description_en,
      coverImageUrl: s.coverImage ? urlFor(s.coverImage).width(800).url() : null,
      techniques: s.techniques || [],
      artworkCount: s.artworkCount,
    }))
  } catch {
    return []
  }
}

export default async function ProjektyPage() {
  const { getNavbarFooterData } = await import('@/lib/queries')
  const [series, navFooterData] = await Promise.all([
    getSeries(),
    getNavbarFooterData(),
  ])
  const { artist, settings, showFeatured } = navFooterData as { artist: any; settings: any; showFeatured: boolean }
  const { locale, t } = await getServerI18n()

  return (
    <>
      <Navbar
        artistName={artist?.name}
        tagline={artist ? localized(artist, 'tagline', locale) : undefined}
        instagramUrl={settings?.instagramUrl}
        facebookUrl={settings?.facebookUrl}
        locale={locale}
        showFeatured={showFeatured}
      />
      <main id="main-content" style={{ paddingTop: 'var(--nav-h)' }}>
        <section style={{ padding: 'var(--section-pad) 0' }}>
          <div className="container">
            <RevealOnScroll>
              <div className="gallery__header" style={{ marginBottom: 64 }}>
                <div className="section-label" style={{ justifyContent: 'center', marginBottom: 16 }}>
                  <span className="t-label" style={{ color: 'var(--gold)' }}>{t.projekty.label}</span>
                </div>
                <h1 className="gallery__title">{t.projekty.title}</h1>
                <p className="gallery__subtitle">{t.projekty.subtitle}</p>
              </div>
            </RevealOnScroll>

            {series.length > 0 ? (
              <div className="series-grid">
                {series.map((s, i) => (
                  <RevealOnScroll key={s._id} delay={i % 2}>
                    <Link href={`/projekty/${s.slug}`} style={{ display: 'block' }}>
                      <article className="series-card">
                        {s.coverImageUrl && (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={s.coverImageUrl}
                            alt={
                              locale === 'en'
                                ? `Artistic series: ${localized(s, 'title', locale)}, Włodzimierz Zapart`
                                : `Seria artystyczna: ${localized(s, 'title', locale)}, Włodzimierz Zapart`
                            }
                            className="series-card__img"
                            loading="lazy"
                          />
                        )}
                        <div className="series-card__body">
                          <h2 className="series-card__title">{localized(s, 'title', locale)}</h2>
                          {localized(s, 'description', locale) && <p className="series-card__desc">{localized(s, 'description', locale)}</p>}
                          <div className="series-card__meta">
                            {(s.techniques || []).map((tech) => (
                              <span key={tech} className="series-card__tag">{tech}</span>
                            ))}
                            {s.artworkCount && (
                              <span className="series-card__tag">{t.projekty.artworkCount(s.artworkCount)}</span>
                            )}
                          </div>
                        </div>
                      </article>
                    </Link>
                  </RevealOnScroll>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--ink-muted)' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: 8 }}>{t.projekty.emptyTitle}</p>
                <p style={{ fontSize: '.85rem' }}>{t.projekty.emptyHint} <Link href="/studio" style={{ color: 'var(--gold)' }}>/studio</Link></p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer
        footerTagline={settings ? localized(settings, 'footerTagline', locale) : undefined}
        locale={locale}
        showFeatured={showFeatured}
        signatureUrl={settings?.signatureUrl}
        signatureTitle={settings ? localized(settings, 'signatureTitle', locale) : undefined}
        signatureAriaLabel={settings ? localized(settings, 'signatureAriaLabel', locale) : undefined}
      />
      <WcagBar />
    </>
  )
}
