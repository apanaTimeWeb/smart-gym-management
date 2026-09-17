import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
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

export default nextConfig;
