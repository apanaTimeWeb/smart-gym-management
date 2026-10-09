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
      },
      // Trainer routes
      { source: '/trainer/dashboard', destination: '/frontend_trainer/trainer_dashboard' },
      { source: '/trainer/attendance', destination: '/frontend_trainer/trainer_attendance' },
      { source: '/trainer/earnings', destination: '/frontend_trainer/trainer_earnings' },
      { source: '/trainer/library', destination: '/frontend_trainer/trainer_library' },
      { source: '/trainer/members', destination: '/frontend_trainer/trainer_members' },
      { source: '/trainer/notifications', destination: '/frontend_trainer/trainer_notifications' },
      { source: '/trainer/profile', destination: '/frontend_trainer/trainer_profile' },
      { source: '/trainer/progress-tracking', destination: '/frontend_trainer/trainer_progress_tracking' },
      { source: '/trainer/schedule', destination: '/frontend_trainer/trainer_schedule' },
      { source: '/trainer/sessions', destination: '/frontend_trainer/trainer_sessions' },
      { source: '/trainer/workout', destination: '/frontend_trainer/trainer_workout' },
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
