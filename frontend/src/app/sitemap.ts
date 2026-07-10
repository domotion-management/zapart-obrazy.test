import type { MetadataRoute } from 'next'

const BASE_URL = 'https://zapart-obrazy.com'

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
  try {
    const { getAllSeriesSlugs } = await import('@/lib/queries')
    const slugs = (await getAllSeriesSlugs()) || []
    seriesRoutes = slugs.map(({ slug }) => ({
      url: `${BASE_URL}/projekty/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch { /* Sanity not configured — statyczne trasy wystarczą */ }

  return [...staticRoutes, ...seriesRoutes]
}
