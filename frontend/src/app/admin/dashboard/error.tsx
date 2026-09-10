// RESPONSIBILITY: Renders the error boundary fallback for the dashboard module.
'use client';

import { useEffect } from "react";
import Link from 'next/link';
import { StatusCodes } from 'http-status-codes';
import { logErrorToMonitoring } from '@/app/admin/admin_utils/monitoring';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logErrorToMonitoring(error, { module: 'dashboard' });
  }, [error]);

  if (error.message?.includes(String(StatusCodes.FORBIDDEN)) || (error as any).status === StatusCodes.FORBIDDEN) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-danger">Access Denied</h2>
        <p className="text-secondary mb-6">You don't have permission to view this page.</p>
        <Link href="/admin/dashboard" className="px-4 py-2 rounded-md bg-primary text-black hover:bg-primary-hover motion-safe:transition-colors">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="text-center">
        <p className="font-medium text-danger">Something went wrong!</p>
        <p className="text-sm mt-1 text-danger">{error.message || 'An unexpected error occurred in the dashboard.'}</p>
        <button
          onClick={() => reset()}
          className="mt-4 px-4 py-2 rounded-md font-medium text-black bg-primary hover:bg-primary-hover motion-safe:transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
