import { sanityFetch } from './sanity'

/* ── Artwork ─────────────────────────────────────────────── */

export async function getAllArtworks(technique?: string) {
  const filter = technique && technique !== 'all'
    ? `*[_type == "artwork" && technique == $technique]`
    : `*[_type == "artwork"]`
  return sanityFetch(
    `${filter} | order(order asc) {
      _id,
      title,
      title_en,
      slug,
      mainImage,
      interiorImage,
      technique,
      techniqueLabel,
      techniqueLabel_en,
      dimensions,
      description,
      description_en,
      featured,
      order,
      price
    }`,
    technique && technique !== 'all' ? { technique } : {}
  )
}

export async function getFeaturedArtworks() {
  return sanityFetch(
    `*[_type == "artwork" && featured == true] | order(order asc) {
      _id,
      title,
      title_en,
      slug,
      mainImage,
      technique,
      techniqueLabel,
      techniqueLabel_en,
      dimensions,
      price
    }`
  )
}

export async function getArtworkBySlug(slug: string) {
  return sanityFetch(
    `*[_type == "artwork" && slug.current == $slug][0] {
      _id,
      title,
      title_en,
      slug,
      mainImage,
      interiorImage,
      technique,
      techniqueLabel,
      techniqueLabel_en,
      dimensions,
      description,
      description_en,
      featured,
      order,
      price
    }`,
    { slug }
  )
}

/* ── Artist ──────────────────────────────────────────────── */

export async function getArtist() {
  return sanityFetch(
    `*[_type == "artist"][0] {
      _id,
      name,
      tagline,
      tagline_en,
      photo,
      photoCaption,
      photoCaption_en,
      sectionTitle,
      sectionTitle_en,
      lead,
      lead_en,
      bio,
      bio_en,
      mottoLatin,
      mottoTranslation,
      mottoTranslation_en,
      stats[] {
        number,
        label,
        label_en
      }
    }`
  )
}

/* ── Site Settings ───────────────────────────────────────── */

export async function getSiteSettings() {
  return sanityFetch(
    `*[_type == "siteSettings"][0] {
      _id,
      siteTitle,
      siteTitle_en,
      siteDescription,
      siteDescription_en,
      heroLabel,
      heroLabel_en,
      heroHeadline,
      heroHeadline_en,
      heroHeadlineAccent,
      heroHeadlineAccent_en,
      heroTagline,
      heroTagline_en,
      heroImage,
      contactEmail,
      contactPhone,
      contactLocation,
      instagramUrl,
      facebookUrl,
      footerTagline,
      footerTagline_en,
      privacyPolicy,
      privacyPolicy_en,
      seoTitle,
      seoTitle_en,
      seoDescription,
      seoDescription_en,
      seoWideDescription,
      seoWideDescription_en,
      entityType,
      entityKeywords,
      entityKeywords_en,
      entityStyles,
      entityStyles_en,
      wikidataUrl,
      googleMapsUrl,
      geoCoordinates,
      recaptchaEnabled,
      recaptchaSiteKey,
      recaptchaSecretKey,
      signatureUrl,
      signatureTitle,
      signatureTitle_en,
      signatureAriaLabel,
      signatureAriaLabel_en
    }`
  )
}

/* ── Art Series ──────────────────────────────────────────── */

export async function getAllSeries() {
  return sanityFetch(
    `*[_type == "artSeries"] | order(_createdAt desc) {
      _id,
      title,
      title_en,
      slug,
      description,
      description_en,
      coverImage,
      techniques,
      "artworkCount": count(artworks)
    }`
  )
}

export async function getSeriesBySlug(slug: string) {
  return sanityFetch(
    `*[_type == "artSeries" && slug.current == $slug][0] {
      _id,
      title,
      title_en,
      slug,
      description,
      description_en,
      coverImage,
      techniques,
      artworks[]-> {
        _id,
        title,
        title_en,
        slug,
        mainImage,
        interiorImage,
        technique,
        techniqueLabel,
        techniqueLabel_en,
        dimensions,
        description,
        description_en,
        price
      }
    }`,
    { slug }
  )
}

export async function getAllSeriesSlugs() {
  return sanityFetch<{ slug: string }[]>(
    `*[_type == "artSeries" && defined(slug.current)] { "slug": slug.current }`
  )
}

export async function getNavbarFooterData() {
  const [artist, settings, featured] = await Promise.all([
    getArtist().catch(() => null),
    getSiteSettings().catch(() => null),
    getFeaturedArtworks().catch(() => []),
  ])
  return {
    artist,
    settings,
    showFeatured: ((featured as any[]) || []).length > 0,
  }
}
