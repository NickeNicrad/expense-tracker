/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  redirects: async () => {
    return [
      {
        source: '/auth',
        destination: '/auth/signin',
        permanent: true
      }
    ]
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'www.gravatar.com'],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  }
}

module.exports = nextConfig