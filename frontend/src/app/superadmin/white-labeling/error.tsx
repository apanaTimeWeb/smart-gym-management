'use client';
import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function SuperadminWhiteLabelingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Intentionally omitting console.log in production UI code as per architecture rules
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-card rounded-xl border border-border p-6 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-danger-bg flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-danger" />
      </div>
      <h2 className="text-xl font-bold text-primary">Failed to load White-Labeling module</h2>
      <p className="text-secondary max-w-md">An unexpected error occurred while loading the domain configuration data.</p>
      <button
        onClick={reset}
        className="mt-4 flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary rounded-lg font-medium hover:opacity-90 motion-safe:transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <RefreshCcw className="w-4 h-4" />
        Retry
      </button>
    </div>
  );
}
