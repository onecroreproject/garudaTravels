import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,

  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
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

  // SEO: Redirect old URLs to the current URLs
  async redirects() {
    return [
      {
        source: '/vellore-tirupati-two-days-tour-package',
        destination: '/vellore-tirupati-two-days-tour-package.php',
        permanent: true,
      },
      {
        source: '/chennai-tirupati-two-day-tour-package',
        destination: '/chennai-tirupati-two-day-tour-package.php',
        permanent: true,
      },
      {
        source: '/chennai-tirupati-one-day-tour-package',
        destination: '/CORRECT-NEW-URL',
        permanent: true,
      },
      {
        source: '/tirumala-tirupati-darshan-one-day-package',
        destination: '/CORRECT-NEW-URL',
        permanent: true,
      },
      {
        source: '/index.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ];
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
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      enforce: 'pre',
      use: ['source-map-loader'],
      exclude: /node_modules/,
    });

    config.ignoreWarnings = [
      /Failed to parse source map/,
      /ENOENT: no such file or directory/,
    ];

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