/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Remove the basePath - this is causing the issue
  // basePath: '/fanny_claude',  
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;