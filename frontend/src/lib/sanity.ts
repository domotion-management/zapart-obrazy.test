import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Create a dummy client when Sanity is not configured (e.g. during Docker build)
export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2025-05-01',
      useCdn: process.env.NODE_ENV === 'production',
      perspective: 'published',
    })
  : null

export function sanityFetch<T>(query: string, params?: any): Promise<T | null> {
  if (!client) return Promise.resolve(null)
  return client.fetch<T>(query, params || {})
}
