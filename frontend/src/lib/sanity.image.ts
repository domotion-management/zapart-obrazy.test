import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './sanity'

const builder = client ? imageUrlBuilder(client) : null

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    // Return a dummy builder that returns empty string
    return { width: () => ({ url: () => '' }), url: () => '' } as ReturnType<typeof imageUrlBuilder.prototype.image>
  }
  return builder.image(source)
}
