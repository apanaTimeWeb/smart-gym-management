"use client";
import { ADMIN_DASHBOARD_ROUTE } from '@/app/admin/admin_url_config';
// RESPONSIBILITY: Provides the implementation for error.tsx functionality within its module.

import { useEffect } from "react";
import Link from 'next/link';
import { StatusCodes } from 'http-status-codes';
import { logErrorToMonitoring } from '@/app/admin/admin_layout/admin_utils/AdminMonitoring';

export default function FinanceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
// EFFECT: Synchronizes this component effect with its declared React dependencies in finance/error.tsx.
  useEffect(() => {
    // Log the route-level error once while keeping internal error details out of the UI.
    logErrorToMonitoring(error, { module: 'finance' });
  }, [error]);

  if (error.message?.includes(String(StatusCodes.FORBIDDEN)) || (error as unknown as { status?: number }).status === StatusCodes.FORBIDDEN) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-danger">Access Denied</h2>
        <p className="text-secondary mb-6">You don&apos;t have permission to view this page.</p>
        <Link href={ADMIN_DASHBOARD_ROUTE} className="px-4 py-2 rounded-md bg-primary text-on-primary hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base">
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
          className="mt-4 px-4 py-2 rounded-md font-medium text-on-primary bg-primary hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
