/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.pexels.com'
          },
          {
            protocol: 'https',
            hostname: 'images.pexels.com'
          },
        ],
        // domains: ['www.pexels.com'], formats: ['image/avif', 'image/webp']
      },
}

module.exports = nextConfig
