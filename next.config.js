/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
    // Prevent image optimization which creates files
    unoptimized: true
  },
  // Allow optimization for fonts
  optimizeFonts: true,
  // Explicitly set environment variables
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
};

module.exports = nextConfig; 