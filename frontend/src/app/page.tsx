import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import FeaturedWorks from '@/components/FeaturedWorks'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WcagBar from '@/components/WcagBar'
import { urlFor } from '@/lib/sanity.image'
import { getServerI18n } from '@/lib/getLocale'
import { localized } from '@/lib/dictionaries'
// Gdy Sanity nie jest skonfigurowane — wszystkie sekcje będą puste.
// Dodaj content w panelu CMS: /studio

async function getData() {
  try {
    const { getAllArtworks, getFeaturedArtworks, getArtist, getSiteSettings } = await import('@/lib/queries')
    const [rawArtworks, rawFeatured, artist, settings] = await Promise.all([
      getAllArtworks(),
      getFeaturedArtworks(),
      getArtist(),
      getSiteSettings(),
    ])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const artworks = rawArtworks as any[] | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const featured = (rawFeatured as any[] | null) || []

    if (!artworks || artworks.length === 0) throw new Error('No data')

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      artworks: artworks.map((a: any) => ({
        ...a,
        mainImageUrl: a.mainImage ? urlFor(a.mainImage).width(768).url() : '',
        interiorImageUrl: a.interiorImage ? urlFor(a.interiorImage).width(768).url() : undefined,
      })),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      featured: featured.map((a: any) => ({
        ...a,
        mainImageUrl: a.mainImage ? urlFor(a.mainImage).width(768).url() : '',
      })),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      artist: artist ? {
        ...(artist as any),
        photoUrl: (artist as any).photo ? urlFor((artist as any).photo).width(768).url() : undefined,
      } : null,
      settings: settings || null,
    }
  } catch {
    return { artworks: [], featured: [], artist: null, settings: null }
  }
}

export default async function HomePage() {
  const { artworks, featured, artist, settings } = await getData()
  const { locale, t } = await getServerI18n()

  return (
    <>
      <Navbar
        artistName={artist?.name}
        tagline={artist ? localized(artist, 'tagline', locale) : undefined}
        instagramUrl={settings?.instagramUrl}
        facebookUrl={settings?.facebookUrl}
        locale={locale}
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
        />
      </main>

      <Footer
        footerTagline={settings ? localized(settings, 'footerTagline', locale) : undefined}
        locale={locale}
      />
      <WcagBar />
    </>
  )
}
