import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RevealOnScroll from '@/components/RevealOnScroll'
import WcagBar from '@/components/WcagBar'
import { urlFor } from '@/lib/sanity.image'
import { getServerI18n } from '@/lib/getLocale'
import { localized, formatPrice } from '@/lib/dictionaries'
import { SITE_URL } from '@/lib/site'

interface SanityImage {
  alt?: string
  alt_en?: string
  alt_de?: string
  title?: string
  title_en?: string
  title_de?: string
}

interface ArtworkData {
  _id: string
  title: string
  title_en?: string
  title_de?: string
  slug?: { current?: string }
  mainImage?: SanityImage
  interiorImage?: SanityImage
  technique?: string
  techniqueLabel?: string
  techniqueLabel_en?: string
  techniqueLabel_de?: string
  dimensions?: string
  description?: string
  description_en?: string
  description_de?: string
  price?: number
}

export async function generateStaticParams() {
  try {
    const { getAllArtworkSlugs } = await import('@/lib/queries')
    const slugs = await getAllArtworkSlugs()
    return (slugs || []).map((s: { slug: string }) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const { getArtworkBySlug } = await import('@/lib/queries')
    const art = (await getArtworkBySlug(slug)) as ArtworkData | null
    if (!art) return { title: 'Obraz nie znaleziony', robots: 'noindex' }

    const title = `${art.title} — obraz, ${art.techniqueLabel || ''} ${art.dimensions || ''} | Zapart`.replace(/\s+/g, ' ')
    const description = (art.description
      ? art.description.slice(0, 155)
      : `Obraz „${art.title}" Włodzimierza Zaparta — ${art.techniqueLabel || 'malarstwo'}, ${art.dimensions || ''}. Dostępny w pracowni w Poznaniu.`).trim()
    const ogImage = art.mainImage
      ? urlFor(art.mainImage).width(1200).height(630).fit('crop').url()
      : undefined

    return {
      title,
      description,
      alternates: { canonical: `/obrazy/${slug}` },
      openGraph: {
        title,
        description,
        ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: art.title }] } : {}),
      },
    }
  } catch {
    return { title: 'Obraz — Włodzimierz Zapart' }
  }
}

export default async function ArtworkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { locale, t } = await getServerI18n()

  let art: ArtworkData | null = null
  let navFooterData: Awaited<ReturnType<typeof import('@/lib/queries').getNavbarFooterData>> | null = null
  try {
    const { getArtworkBySlug, getNavbarFooterData } = await import('@/lib/queries')
    const [artResult, navResult] = await Promise.all([getArtworkBySlug(slug), getNavbarFooterData()])
    art = artResult as ArtworkData | null
    navFooterData = navResult
  } catch { /* Sanity not configured */ }

  if (!art) notFound()

  const artist = (navFooterData?.artist ?? null) as ({ name?: string } & Record<string, unknown>) | null
  const settings = (navFooterData?.settings ?? null) as Record<string, string | undefined> | null
  const showFeatured = navFooterData?.showFeatured || false

  const title = localized(art, 'title', locale)
  const tech = localized(art, 'techniqueLabel', locale)
  const desc = localized(art, 'description', locale)
  const mainAlt =
    localized(art.mainImage || {}, 'alt', locale) ||
    [title, tech, art.dimensions, 'Włodzimierz Zapart'].filter(Boolean).join(', ')
  const interiorAlt =
    localized(art.interiorImage || {}, 'alt', locale) ||
    `${title} — ${t.artwork.interiorHeading}`

  const mainUrl = art.mainImage ? urlFor(art.mainImage).width(1200).url() : ''
  const interiorUrl = art.interiorImage ? urlFor(art.interiorImage).width(1200).url() : undefined

  // "80 x 80 cm" → width/height dla VisualArtwork (schema.org nie ma `size` na CreativeWork)
  const dimMatch = (art.dimensions || '').match(/(\d+(?:[.,]\d+)?)\s*[x×]\s*(\d+(?:[.,]\d+)?)/)
  const artWidth = dimMatch ? `${dimMatch[1]} cm` : undefined
  const artHeight = dimMatch ? `${dimMatch[2]} cm` : undefined

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'VisualArtwork',
        '@id': `${SITE_URL}/obrazy/${slug}#artwork`,
        name: title,
        url: `${SITE_URL}/obrazy/${slug}`,
        image: mainUrl || undefined,
        description: desc || undefined,
        artMedium: tech || undefined,
        artform: locale === 'en' ? 'Painting' : locale === 'de' ? 'Gemälde' : 'Malarstwo',
        width: artWidth,
        height: artHeight,
        creator: { '@id': `${SITE_URL}/#artist` },
        ...(art.price && art.price > 0
          ? {
              offers: {
                '@type': 'Offer',
                price: art.price,
                priceCurrency: 'PLN',
                availability: 'https://schema.org/InStock',
                seller: { '@id': `${SITE_URL}/#pracownia` },
              },
            }
          : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t.artwork.breadcrumbHome, item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: t.artwork.breadcrumbGallery, item: `${SITE_URL}/#galeria` },
          { '@type': 'ListItem', position: 3, name: title },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }} />
      <Navbar
        artistName={artist?.name}
        tagline={artist ? localized(artist, 'tagline', locale) : undefined}
        instagramUrl={settings?.instagramUrl}
        facebookUrl={settings?.facebookUrl}
        locale={locale}
        showFeatured={showFeatured}
      />
      <main id="main-content" style={{ paddingTop: 'var(--nav-h)' }}>
        <section className="artwork-detail" aria-label={t.artwork.detailsAria}>
          <div className="container">
            <nav className="artwork-detail__breadcrumbs" aria-label={t.artwork.breadcrumbAria}>
              <Link href="/">{t.artwork.breadcrumbHome}</Link>
              <span aria-hidden="true">/</span>
              <Link href="/#galeria">{t.artwork.breadcrumbGallery}</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{title}</span>
            </nav>

            <div className="artwork-detail__layout">
              <RevealOnScroll>
                <figure className="artwork-detail__figure">
                  {mainUrl && (
                    <Image
                      src={mainUrl}
                      alt={mainAlt}
                      width={1200}
                      height={900}
                      sizes="(max-width: 900px) 100vw, 60vw"
                      priority
                      className="artwork-detail__img"
                    />
                  )}
                  <figcaption className="artwork-detail__caption">
                    {title} — {tech}, {art.dimensions}
                  </figcaption>
                </figure>
              </RevealOnScroll>

              <RevealOnScroll delay={1}>
                <div className="artwork-detail__info">
                  <div className="section-label">
                    <span className="t-label" style={{ color: 'var(--gold)' }}>{t.artwork.label}</span>
                  </div>
                  <h1 className="artwork-detail__title">{title}</h1>
                  <dl className="artwork-detail__specs">
                    <div>
                      <dt>{t.artwork.technique}</dt>
                      <dd>{tech}</dd>
                    </div>
                    <div>
                      <dt>{t.artwork.dimensions}</dt>
                      <dd>{art.dimensions}</dd>
                    </div>
                    <div>
                      <dt>{t.artwork.price}</dt>
                      <dd>{formatPrice(art.price, locale)}</dd>
                    </div>
                  </dl>
                  {desc && <p className="artwork-detail__desc">{desc}</p>}
                  <div className="artwork-detail__actions">
                    <Link href="/#kontakt" className="artwork-detail__cta">{t.artwork.ask}</Link>
                    <Link href="/#galeria" className="artwork-detail__back">← {t.artwork.back}</Link>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {interiorUrl && (
              <RevealOnScroll delay={2}>
                <figure className="artwork-detail__interior">
                  <h2 className="artwork-detail__interior-heading">{t.artwork.interiorHeading}</h2>
                  <Image
                    src={interiorUrl}
                    alt={interiorAlt}
                    width={1200}
                    height={800}
                    sizes="(max-width: 900px) 100vw, 80vw"
                    className="artwork-detail__img"
                  />
                </figure>
              </RevealOnScroll>
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
