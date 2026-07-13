'use client';
// RESPONSIBILITY: Error boundary fallback for the Audit Logs page. Displays a module-specific error UI with a retry button.

import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function AuditLogsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 p-8 bg-card border border-border rounded-xl">
      <div className="w-16 h-16 bg-danger-bg rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8 text-danger" />
      </div>
      <h2 className="text-xl font-bold text-foreground mb-2">Failed to load Audit Logs</h2>
      <p className="text-secondary text-sm max-w-md text-center mb-6">
        {error.message || 'An unexpected error occurred while loading the audit logs.'}
      </p>
      <button
        onClick={reset}
        className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
      >
        <RefreshCcw className="w-4 h-4" />
        Retry
      </button>
    </div>
  );
}
