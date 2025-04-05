/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use export and basePath in production
  ...(process.env.NODE_ENV === 'production' ? {
    output: 'export',
    basePath: '/fanny_claude',
  } : {}),
  
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig; 