/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // This enables static HTML export
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true, // Required for static export
  },
};

module.exports = nextConfig;