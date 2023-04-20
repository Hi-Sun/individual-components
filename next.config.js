/** @type {import('next').NextConfig} */
const withLess = require('next-with-less');
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.ts', 'page.tsx'],
}

module.exports = nextConfig
module.exports = withLess(nextConfig)
