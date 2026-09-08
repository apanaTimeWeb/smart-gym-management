'use client';
// RESPONSIBILITY: Route-level error boundary for the Churn Alerts module.

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { logger } from '@/lib/logger';

export default function ChurnAlertsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error('Churn Alerts Module Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-96 p-8 bg-card border border-border rounded-xl shadow-sm">
      <div className="w-16 h-16 bg-danger-bg rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8 text-danger" />
      </div>
      <h2 className="text-xl font-bold text-foreground mb-2">Failed to load Churn Alerts</h2>
      <p className="text-secondary text-sm max-w-md text-center mb-6">
        An unexpected error occurred while rendering this module. Please try again or contact support if the issue persists.
      </p>
      <button
        onClick={reset}
        className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg font-medium motion-safe:transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <RefreshCcw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}
