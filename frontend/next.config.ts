import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'warsztatywyobrazni.com.pl',
      },
    ],
  },
}

export default nextConfig
