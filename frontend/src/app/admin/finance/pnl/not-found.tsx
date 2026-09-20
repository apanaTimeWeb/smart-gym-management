"use client";
// RESPONSIBILITY: Renders/orchestrates not-found for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import { ADMIN_DASHBOARD_URL } from '@/app/admin/admin_url_config';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 text-center px-4">
      <h2 className="text-2xl font-bold text-primary mb-2">Page Not Found</h2>
      <p className="text-secondary mb-6 max-w-md">
        The requested resource could not be found.
      </p>
      <Link href={ADMIN_DASHBOARD_URL} className="px-6 py-2 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base">
        Return to Dashboard
      </Link>
    </div>
  );
}