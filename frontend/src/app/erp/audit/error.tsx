// RESPONSIBILITY: Provides the implementation for error.tsx functionality within its module.
'use client';

import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function AuditError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      
      <h2 className="text-2xl font-bold text-foreground mb-3">
        Failed to Load Audit Logs
      </h2>
      
      <p className="text-secondary max-w-md mb-8">
        {error.message || 'An unexpected error occurred while loading audit records. Please try again or contact support if the issue persists.'}
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 rounded-xl text-sm font-medium border border-border text-secondary hover:bg-primary-subtle hover:text-foreground transition-all"
        >
          Go Back
        </button>
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 rounded-xl text-sm font-bold bg-primary text-white hover:opacity-90 flex items-center gap-2 transition-all shadow-sm"
        >
          <RefreshCcw size={16} />
          Try Again
        </button>
      </div>
    </div>
  );
}
