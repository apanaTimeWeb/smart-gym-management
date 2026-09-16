"use client";
import { AdminDashboardUrlConfig } from '@/app/admin/dashboard/admin_dashboard_url_config';
// RESPONSIBILITY: Provides the implementation for error.tsx functionality within its module.

import { useEffect } from "react";
import Link from 'next/link';
import { StatusCodes } from 'http-status-codes';
import { logErrorToMonitoring } from '@/app/admin/admin_utils/AdminMonitoring';

export default function FinanceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the route-level error once while keeping internal error details out of the UI.
    logErrorToMonitoring(error, { module: 'finance' });
  }, [error]);

  if (error.message?.includes(String(StatusCodes.FORBIDDEN)) || (error as unknown as { status?: number }).status === StatusCodes.FORBIDDEN) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-danger">Access Denied</h2>
        <p className="text-secondary mb-6">You don't have permission to view this page.</p>
        <Link href={AdminDashboardUrlConfig.root} className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary-hover motion-safe:transition-colors">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-full flex items-center justify-center finance-module">
      <div className="text-center">
        <p className="font-medium text-danger">Something went wrong!</p>        <p className="text-sm mt-1 text-secondary">Please retry. If the problem continues, contact support with the current request time.</p>
        <button
          onClick={() => reset()}
          className="mt-4 px-4 py-2 rounded-md font-medium text-primary-foreground bg-primary hover:bg-primary-hover motion-safe:transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}