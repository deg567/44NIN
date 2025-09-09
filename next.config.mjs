/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === 'true' || process.env.NEXT_EXPORT === 'true'
const inferredBasePath = process.env.NEXT_PUBLIC_BASE_PATH || (isPages ? `/${process.env.GITHUB_REPOSITORY?.split('/').pop() || ''}` : '')
const basePath = inferredBasePath && inferredBasePath !== '/' ? inferredBasePath : ''

const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  // Enable static export when deploying to GitHub Pages
  output: isPages ? 'export' : undefined,
  trailingSlash: isPages ? true : undefined,
  // Respect base path for project pages (e.g. /<repo>)
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    // Next/Image in export mode must be unoptimized
    unoptimized: true,
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), camera=(), microphone=()' },
        ],
      },
    ]
  },
}

export default nextConfig
