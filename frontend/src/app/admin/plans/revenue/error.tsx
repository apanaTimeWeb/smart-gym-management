// RESPONSIBILITY: Handles and displays errors encountered while loading the Plan Revenue Dashboard.
'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[50vh]">
      <div className="bg-danger/10 p-4 rounded-full mb-4">
        <AlertTriangle size={48} className="text-danger" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">Something went wrong!</h2>
      <p className="text-secondary text-center max-w-md mb-6">
        {error.message || 'We encountered an unexpected error while loading the plan revenue dashboard.'}
      </p>
      <button
        onClick={() => reset()}
        className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary/90 motion-safe:transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <RefreshCw size={18} />
        Try Again
      </button>
    </div>
  );
}
