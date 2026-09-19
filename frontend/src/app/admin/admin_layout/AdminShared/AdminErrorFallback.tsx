"use client";
import { ADMIN_DASHBOARD_URL } from '@/app/admin/admin_url_config';
// RESPONSIBILITY: Shared error fallback renderer used by all admin module error.tsx boundaries.
// Distinguishes between 403 Forbidden (permission denied) and generic errors.
// Never expose raw error messages or stack traces to the user.

import { ShieldOff, RefreshCw, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

import type { AdminErrorFallbackProps } from '@/app/admin/admin_layout/AdminShared/AdminErrorFallbackTypes';

function is403(error: Error): boolean {
  return (
    error.message?.includes('403') ||
    error.message?.toLowerCase().includes('forbidden') ||
    error.message?.toLowerCase().includes('permission') ||
    error.message?.toLowerCase().includes('unauthorized')
  );
}

export default function AdminErrorFallback({ error, reset, moduleName }: AdminErrorFallbackProps) {
  if (is403(error)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-5 p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-warning flex items-center justify-center">
          <ShieldOff size={32} className="text-warning" />
        </div>
        <div className="space-y-1">
          <p className="text-lg font-bold text-primary">Access Denied</p>
          <p className="text-sm text-secondary max-w-sm">
            You don&apos;t have permission to view the {moduleName} module.
            Contact your administrator if you believe this is an error.
          </p>
        </div>
        <Link
          href={ADMIN_DASHBOARD_URL}
          className="flex items-center gap-2 px-5 py-2.5 bg-card border border-border rounded-xl text-sm font-medium text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base"
        >
          <LayoutDashboard size={15} /> Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-6 text-center">
      <p className="text-base font-semibold text-primary">Failed to load {moduleName}</p>
      <p className="text-sm text-secondary max-w-sm">
        An unexpected error occurred. Please try again or contact support if the issue persists.
      </p>
      <button
        onClick={reset}
        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary font-semibold rounded-xl text-sm hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base"
      >
        <RefreshCw size={15} /> Try Again
      </button>
    </div>
  );
}
