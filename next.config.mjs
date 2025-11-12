import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  // Remove swcMinify as it's now the default in Next.js 15+
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    // Add missing critters configuration
    optimizePackageImports: ['critters']
  },
  images: {
    unoptimized: true,
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  eslint: { 
    ignoreDuringBuilds: true 
  },
  typescript: { 
    ignoreBuildErrors: true 
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, no-cache, no-store, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Add a rule to handle source maps with error suppression
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      enforce: 'pre',
      use: ['source-map-loader'],
      exclude: /node_modules/,
    });

    // Suppress source map warnings from node_modules
    config.ignoreWarnings = [
      /Failed to parse source map/,
      /ENOENT: no such file or directory/,
    ];

    // Handle critters module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        critters: false
      };
    }

    return config;
  },
});

export default nextConfig;
