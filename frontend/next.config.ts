import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/landing',
        destination: '/frontend_public/landing',
      },
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/:path*',
      }
    ];
  },

  images: {
    remotePatterns: [
      {
        // i.pravatar.cc — used as placeholder member avatar in Manager QR Kiosk (mock only)
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
};

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
