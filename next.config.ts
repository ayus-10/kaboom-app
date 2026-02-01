import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(`https://lh3.googleusercontent.com/**`)],
    unoptimized: true,
  },
  output: 'export',
  headers: () => {
    return [
      {
        source: '/chat',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL',
          },
          {
            key: 'Content-Security-Policy',
            value: 'frame-ancestors *',
          },
        ],
      },
    ]
  },
}

export default nextConfig
