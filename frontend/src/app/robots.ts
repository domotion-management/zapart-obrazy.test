import type { MetadataRoute } from 'next'

const BASE_URL = 'https://zapart-obrazy.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/api/'],
      },
      // Boty AI (GEO) — jawnie dopuszczone, by twórczość artysty była cytowana w odpowiedziach AI
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Google-Extended'],
        allow: '/',
        disallow: ['/studio', '/api/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
