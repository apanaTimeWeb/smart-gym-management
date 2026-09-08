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
    <div className="p-6 max-w-3xl mx-auto mt-10">
      <div className="bg-danger/10 border border-danger/20 rounded-2xl p-8 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-danger/20 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle size={32} strokeWidth={2} className="text-danger" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">Failed to load Staff Performance</h2>
        <p className="text-secondary text-sm mb-6 max-w-md">
          {error.message || 'An unexpected error occurred while loading the dashboard.'}
        </p>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-5 py-2.5 bg-danger text-white font-semibold rounded-xl hover:bg-danger/90 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
        >
          <RefreshCw size={16} strokeWidth={2.5} />
          Try Again
        </button>
      </div>
    </div>
  );
}
