import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import FeaturedWorks from '@/components/FeaturedWorks'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WcagBar from '@/components/WcagBar'
import SeoCollapse from '@/components/SeoCollapse'
import { urlFor } from '@/lib/sanity.image'
import { getServerI18n } from '@/lib/getLocale'
import { localized } from '@/lib/dictionaries'
import type { Metadata } from 'next'

// Title/description/OG dziedziczone z generateMetadata w layout.tsx (Sanity seoTitle/seoDescription)
export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

async function getData(locale: string) {
  const { getAllArtworks, getFeaturedArtworks, getArtist, getSiteSettings } = await import('@/lib/queries')

  // Fetch settings and artist independently — these should always be available
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [artist, settings] = await Promise.all([
    getArtist().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  // Fetch artworks separately so a failure here doesn't discard settings/artist
  let artworks: any[] = []
  let featured: any[] = []
  try {
    const [rawArtworks, rawFeatured] = await Promise.all([
      getAllArtworks(),
      getFeaturedArtworks(),
    ])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const artworkList = (rawArtworks as any[] | null) || []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const featuredList = (rawFeatured as any[] | null) || []

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    artworks = artworkList.map((a: any) => {
      const mainAlt = locale === 'de' ? (a.mainImage?.alt_de || a.mainImage?.alt_en) : (locale === 'en' ? a.mainImage?.alt_en : a.mainImage?.alt)
      const mainTitle = locale === 'de' ? (a.mainImage?.title_de || a.mainImage?.title_en) : (locale === 'en' ? a.mainImage?.title_en : a.mainImage?.title)
      const intAlt = locale === 'de' ? (a.interiorImage?.alt_de || a.interiorImage?.alt_en) : (locale === 'en' ? a.interiorImage?.alt_en : a.interiorImage?.alt)
      const intTitle = locale === 'de' ? (a.interiorImage?.title_de || a.interiorImage?.title_en) : (locale === 'en' ? a.interiorImage?.title_en : a.interiorImage?.title)

      return {
        ...a,
        mainImageUrl: a.mainImage ? urlFor(a.mainImage).width(768).url() : '',
        mainImageAlt: mainAlt || '',
        mainImageTitle: mainTitle || '',
        interiorImageUrl: a.interiorImage ? urlFor(a.interiorImage).width(768).url() : undefined,
        interiorImageAlt: intAlt || '',
        interiorImageTitle: intTitle || '',
      }
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    featured = featuredList.map((a: any) => {
      const mainAlt = locale === 'de' ? (a.mainImage?.alt_de || a.mainImage?.alt_en) : (locale === 'en' ? a.mainImage?.alt_en : a.mainImage?.alt)
      const mainTitle = locale === 'de' ? (a.mainImage?.title_de || a.mainImage?.title_en) : (locale === 'en' ? a.mainImage?.title_en : a.mainImage?.title)

      return {
        ...a,
        mainImageUrl: a.mainImage ? urlFor(a.mainImage).width(768).url() : '',
        mainImageAlt: mainAlt || '',
        mainImageTitle: mainTitle || '',
      }
    })
  } catch {
    // artworks stay empty, but settings/artist are still available
  }

  return {
    artworks,
    featured,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    artist: artist ? {
      ...(artist as any),
      photoUrl: (artist as any).photo ? urlFor((artist as any).photo).width(768).url() : undefined,
    } : null,
    settings: (settings as any) || null,
  }
}

export default async function HomePage() {
  const { locale } = await getServerI18n()
  const { artworks, featured, artist, settings } = await getData(locale)

  let keywordsString = ''
  if (locale === 'de') {
    keywordsString = settings?.entityKeywords_de || settings?.entityKeywords_en || ''
  } else if (locale === 'en') {
    keywordsString = settings?.entityKeywords_en || ''
  } else {
    keywordsString = settings?.entityKeywords || ''
  }

  let stylesString = ''
  if (locale === 'de') {
    stylesString = settings?.entityStyles_de || settings?.entityStyles_en || ''
  } else if (locale === 'en') {
    stylesString = settings?.entityStyles_en || ''
  } else {
    stylesString = settings?.entityStyles || ''
  }

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": settings?.entityType || "Person",
    "name": "Włodzimierz Zapart",
    "description": locale === 'de'
      ? (settings?.seoDescription_de || settings?.siteDescription_de || settings?.seoDescription_en || settings?.siteDescription_en)
      : (locale === 'en'
        ? (settings?.seoDescription_en || settings?.siteDescription_en)
        : (settings?.seoDescription || settings?.siteDescription)),
    "image": settings?.heroImage ? urlFor(settings.heroImage).width(1200).url() : undefined,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": settings?.contactLocation || "Kraków",
      "addressCountry": "PL"
    },
    "email": settings?.contactEmail,
    "telephone": settings?.contactPhone,
    "knowsAbout": [
      ...(keywordsString ? keywordsString.split(',').map((k: string) => k.trim()) : []),
      ...(stylesString ? stylesString.split(',').map((s: string) => s.trim()) : [])
    ].filter(Boolean),
    "sameAs": [
      settings?.instagramUrl,
      settings?.facebookUrl,
      settings?.wikidataUrl
    ].filter(Boolean)
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <Navbar
        artistName={artist?.name}
        tagline={artist ? localized(artist, 'tagline', locale) : undefined}
        instagramUrl={settings?.instagramUrl}
        facebookUrl={settings?.facebookUrl}
        locale={locale}
        showFeatured={featured.length > 0}
      />

      <main id="main-content">
        <Hero
          label={settings ? localized(settings, 'heroLabel', locale) : undefined}
          headline={settings ? localized(settings, 'heroHeadline', locale) : undefined}
          headlineAccent={settings ? localized(settings, 'heroHeadlineAccent', locale) : undefined}
          tagline={settings ? localized(settings, 'heroTagline', locale) : undefined}
          heroImageUrl={settings?.heroImage ? urlFor(settings.heroImage).width(1920).url() : undefined}
          locale={locale}
        />
        <About artist={artist} locale={locale} />
        <FeaturedWorks artworks={featured} locale={locale} />
        <Gallery artworks={artworks} locale={locale} />
        <Contact
          email={settings?.contactEmail}
          phone={settings?.contactPhone}
          location={settings?.contactLocation}
          instagramUrl={settings?.instagramUrl}
          facebookUrl={settings?.facebookUrl}
          locale={locale}
          recaptchaEnabled={settings?.recaptchaEnabled}
          recaptchaSiteKey={settings?.recaptchaSiteKey}
        />
      </main>

      <SeoCollapse
        description={settings ? localized(settings, 'seoWideDescription', locale) : undefined}
        locale={locale}
      />

      <Footer
        footerTagline={settings ? localized(settings, 'footerTagline', locale) : undefined}
        locale={locale}
        showFeatured={featured.length > 0}
        signatureUrl={settings?.signatureUrl}
        signatureTitle={settings ? localized(settings, 'signatureTitle', locale) : undefined}
        signatureAriaLabel={settings ? localized(settings, 'signatureAriaLabel', locale) : undefined}
      />
      <WcagBar />
    </>
  )
}
