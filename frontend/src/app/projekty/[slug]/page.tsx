import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Gallery, { type ArtworkItem } from '@/components/Gallery'
import RevealOnScroll from '@/components/RevealOnScroll'
import WcagBar from '@/components/WcagBar'
import { urlFor } from '@/lib/sanity.image'
import { getServerI18n } from '@/lib/getLocale'
import { localized } from '@/lib/dictionaries'

export async function generateStaticParams() {
  try {
    const { getAllSeriesSlugs } = await import('@/lib/queries')
    const slugs = await getAllSeriesSlugs()
    return (slugs || []).map((s: { slug: string }) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const { getSeriesBySlug } = await import('@/lib/queries')
    const series = (await getSeriesBySlug(slug)) as SeriesData | null
    if (!series) return { title: 'Seria nie znaleziona', robots: 'noindex' }
    const title = `${series.title} — Włodzimierz Zapart`
    const description =
      series.description || `Seria obrazów „${series.title}" Włodzimierza Zaparta — malarza abstrakcjonisty z Poznania.`
    return {
      title,
      description,
      alternates: { canonical: `/projekty/${slug}` },
      openGraph: { title, description },
    }
  } catch {
    return { title: 'Seria — Włodzimierz Zapart' }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface SeriesData { title: string; title_en?: string; title_de?: string; description?: string; description_en?: string; description_de?: string; artworks?: any[] }

export default async function SeriesDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { locale, t } = await getServerI18n()

  let series: SeriesData | null = null
  let navFooterData: { artist: any; settings: any; showFeatured: boolean } | null = null
  try {
    const { getSeriesBySlug, getNavbarFooterData } = await import('@/lib/queries')
    const [seriesResult, navFooterResult] = await Promise.all([
      getSeriesBySlug(slug),
      getNavbarFooterData(),
    ])
    series = seriesResult as SeriesData | null
    navFooterData = navFooterResult as any
  } catch { /* Sanity not configured */ }

  if (!series) notFound()

  const artist = navFooterData?.artist
  const settings = navFooterData?.settings
  const showFeatured = navFooterData?.showFeatured || false

  const artworks: ArtworkItem[] = (series.artworks || []).map((a) => {
    const mainAlt = locale === 'de' ? (a.mainImage?.alt_de || a.mainImage?.alt_en) : (locale === 'en' ? a.mainImage?.alt_en : a.mainImage?.alt)
    const mainTitle = locale === 'de' ? (a.mainImage?.title_de || a.mainImage?.title_en) : (locale === 'en' ? a.mainImage?.title_en : a.mainImage?.title)
    const intAlt = locale === 'de' ? (a.interiorImage?.alt_de || a.interiorImage?.alt_en) : (locale === 'en' ? a.interiorImage?.alt_en : a.interiorImage?.alt)
    const intTitle = locale === 'de' ? (a.interiorImage?.title_de || a.interiorImage?.title_en) : (locale === 'en' ? a.interiorImage?.title_en : a.interiorImage?.title)

    return {
      _id: a._id as string,
      slug: (a.slug as { current?: string } | undefined)?.current,
      title: a.title as string,
      title_en: a.title_en as string | undefined,
      title_de: a.title_de as string | undefined,
      mainImageUrl: a.mainImage ? urlFor(a.mainImage).width(768).url() : '',
      mainImageAlt: mainAlt as string | undefined,
      mainImageTitle: mainTitle as string | undefined,
      interiorImageUrl: a.interiorImage ? urlFor(a.interiorImage).width(768).url() : undefined,
      interiorImageAlt: intAlt as string | undefined,
      interiorImageTitle: intTitle as string | undefined,
      technique: a.technique as string,
      techniqueLabel: a.techniqueLabel as string,
      techniqueLabel_en: a.techniqueLabel_en as string | undefined,
      techniqueLabel_de: a.techniqueLabel_de as string | undefined,
      dimensions: a.dimensions as string,
      description: a.description as string | undefined,
      description_en: a.description_en as string | undefined,
      description_de: a.description_de as string | undefined,
      price: a.price as number | undefined,
    }
  })

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
                  <span className="t-label" style={{ color: 'var(--gold)' }}>{t.projekty.seriesLabel}</span>
                </div>
                <h1 className="gallery__title">{localized(series, 'title', locale)}</h1>
                {localized(series, 'description', locale) && (
                  <p className="gallery__subtitle">{localized(series, 'description', locale)}</p>
                )}
              </div>
            </RevealOnScroll>
          </div>
        </section>
        {artworks.length > 0 && <Gallery artworks={artworks} locale={locale} />}
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
