import type { MetadataRoute } from 'next'
import { SITE_URL as BASE_URL } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/projekty`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/polityka-prywatnosci`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]

  let seriesRoutes: MetadataRoute.Sitemap = []
  let artworkRoutes: MetadataRoute.Sitemap = []
  try {
    const { getAllSeriesSlugs, getAllArtworkSlugs } = await import('@/lib/queries')
    const [seriesSlugs, artworkSlugs] = await Promise.all([
      getAllSeriesSlugs().catch(() => []),
      getAllArtworkSlugs().catch(() => []),
    ])
    seriesRoutes = (seriesSlugs || []).map(({ slug }) => ({
      url: `${BASE_URL}/projekty/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
    artworkRoutes = (artworkSlugs || []).map(({ slug }) => ({
      url: `${BASE_URL}/obrazy/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch { /* Sanity not configured — statyczne trasy wystarczą */ }

  return [...staticRoutes, ...seriesRoutes, ...artworkRoutes]
}
