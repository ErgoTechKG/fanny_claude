/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/fanny_claude',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig; 