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

  async redirects() {
    return [
      {
        source: '/vellore-tirupati-two-days-tour-package',
        destination: '/tirupati-package/vellore-to-tirupati',
        permanent: true,
      },
      {
        source: '/vellore-tirupati-two-days-tour-package.php',
        destination: '/tirupati-package/vellore-to-tirupati',
        permanent: true,
      },
      {
        source: '/chennai-tirupati-two-day-tour-package',
        destination: '/tirupati-package/tirupati-two-days-package-from-chennai',
        permanent: true,
      },
      {
        source: '/chennai-tirupati-two-day-tour-package.php',
        destination: '/tirupati-package/tirupati-two-days-package-from-chennai',
        permanent: true,
      },
      {
        source: '/chennai-tirupati-one-day-tour-package',
        destination: '/tirupati-package/chennai-tirupati-one-day-tour-package',
        permanent: true,
      },
      {
        source: '/chennai-tirupati-one-day-tour-package.php',
        destination: '/tirupati-package/chennai-tirupati-one-day-tour-package',
        permanent: true,
      },
      {
        source: '/tirumala-tirupati-darshan-one-day-package',
        destination: '/tirupati-package/tirumala-tirupati-darshan-one-day-package',
        permanent: true,
      },
      {
        source: '/tirumala-tirupati-darshan-one-day-package.php',
        destination: '/tirupati-package/tirumala-tirupati-darshan-one-day-package',
        permanent: true,
      },
      {
        source: '/bangalore-tirupati-darshan-tour-package',
        destination: '/tirupati-package/bangalore-tirupati-darshan-tour-package',
        permanent: true,
      },
      {
        source: '/chennai-vellore-outstation-trip.php',
        destination: '/temple-tour-package/chennai-vellore-temple-package',
        permanent: true,
      },
      {
        source: '/vellore-tirupati-one-day-tour-package.php',
        destination: '/tirupati-package/vellore-tirupati-one-day-tour-package',
        permanent: true,
      },
      {
        source: '/kanchipuram-tirupati-one-day-tour-package',
        destination: '/tirupati-package/kanchipuram-tirupati-one-day-tour-package',
        permanent: true,
      },
      {
        source: '/chennai-tirupati-car-rental-package',
        destination: '/tirupati-package/chennai-tirupati-car-rental-package',
        permanent: true,
      },
      {
        source: '/chennai-kalahasti-one-day-tour-package.php',
        destination: '/temple-tour-package/chennai-to-kalahasti-temple-tour-package',
        permanent: true,
      },
      {
        source: '/chennai-kanchipuram-temple-package.php',
        destination: '/temple-tour-package/chennai-kanchipuram-temple-package',
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