import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Fully static site – `next build` writes plain HTML/CSS/JS to `out/`
  output: 'export',
  // /uslugi -> /uslugi/index.html, so any static host serves subpages without rewrites
  trailingSlash: true,
  // The Image Optimization API needs a server; images are optimized ahead of time instead
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
