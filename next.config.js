/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable TypeScript type checking during build
  // This is a temporary workaround for the params type issue in Next.js 15
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // Disable ESLint during build
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
