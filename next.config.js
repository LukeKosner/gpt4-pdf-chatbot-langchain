/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  images: {
    domains: ['images.unsplash.com', 'upload.wikimedia.org', 'i.ibb.co'],
  },
};

export default nextConfig;
