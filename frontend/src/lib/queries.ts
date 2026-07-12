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
      title_de,
      slug,
      mainImage,
      interiorImage,
      technique,
      techniqueLabel,
      techniqueLabel_en,
      techniqueLabel_de,
      dimensions,
      description,
      description_en,
      description_de,
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
      title_de,
      slug,
      mainImage,
      technique,
      techniqueLabel,
      techniqueLabel_en,
      techniqueLabel_de,
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
      title_de,
      slug,
      mainImage,
      interiorImage,
      technique,
      techniqueLabel,
      techniqueLabel_en,
      techniqueLabel_de,
      dimensions,
      description,
      description_en,
      description_de,
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
      tagline_de,
      photo,
      photoCaption,
      photoCaption_en,
      photoCaption_de,
      sectionTitle,
      sectionTitle_en,
      sectionTitle_de,
      lead,
      lead_en,
      lead_de,
      bio,
      bio_en,
      bio_de,
      mottoLatin,
      mottoTranslation,
      mottoTranslation_en,
      mottoTranslation_de,
      stats[] {
        number,
        label,
        label_en,
        label_de
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
      siteTitle_de,
      siteDescription,
      siteDescription_en,
      siteDescription_de,
      heroLabel,
      heroLabel_en,
      heroLabel_de,
      heroHeadline,
      heroHeadline_en,
      heroHeadline_de,
      heroHeadlineAccent,
      heroHeadlineAccent_en,
      heroHeadlineAccent_de,
      heroTagline,
      heroTagline_en,
      heroTagline_de,
      heroImage,
      contactEmail,
      contactPhone,
      contactLocation,
      instagramUrl,
      facebookUrl,
      footerTagline,
      footerTagline_en,
      footerTagline_de,
      privacyPolicy,
      privacyPolicy_en,
      privacyPolicy_de,
      seoTitle,
      seoTitle_en,
      seoTitle_de,
      seoDescription,
      seoDescription_en,
      seoDescription_de,
      seoWideDescription,
      seoWideDescription_en,
      seoWideDescription_de,
      entityType,
      entityKeywords,
      entityKeywords_en,
      entityKeywords_de,
      entityStyles,
      entityStyles_en,
      entityStyles_de,
      wikidataUrl,
      googleMapsUrl,
      geoCoordinates,
      recaptchaEnabled,
      recaptchaSiteKey,
      recaptchaSecretKey,
      signatureUrl,
      signatureTitle,
      signatureTitle_en,
      signatureTitle_de,
      signatureAriaLabel,
      signatureAriaLabel_en,
      signatureAriaLabel_de
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
      title_de,
      slug,
      description,
      description_en,
      description_de,
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
      title_de,
      slug,
      description,
      description_en,
      description_de,
      coverImage,
      techniques,
      artworks[]-> {
        _id,
        title,
        title_en,
        title_de,
        slug,
        mainImage,
        interiorImage,
        technique,
        techniqueLabel,
        techniqueLabel_en,
        techniqueLabel_de,
        dimensions,
        description,
        description_en,
        description_de,
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

export async function getAllArtworkSlugs() {
  return sanityFetch<{ slug: string }[]>(
    `*[_type == "artwork" && defined(slug.current)] { "slug": slug.current }`
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
