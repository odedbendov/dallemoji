/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { 
      fs: false,
      path: false
     };

    return config;
  },
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = nextConfig
