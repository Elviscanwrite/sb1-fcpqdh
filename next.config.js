/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  swcMinify: false, // Disable SWC minification for WebContainer
  experimental: {
    // Remove appDir since it's now stable in Next.js 14
    serverActions: true
  }
};

module.exports = nextConfig;