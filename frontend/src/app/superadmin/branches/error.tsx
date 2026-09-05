// RESPONSIBILITY: Core infrastructure component for routing, loading, and error boundaries in the module.
'use client';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <div className="p-4 bg-danger-bg/10 rounded-full">
        <AlertCircle className="w-8 h-8 text-danger" />
      </div>
      <h2 className="text-xl font-bold text-foreground">Something went wrong!</h2>
      <p className="text-secondary max-w-md text-center">{error.message}</p>
      <button
        onClick={reset}
        className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium motion-safe:transition-colors"
      >
        <RefreshCw className="w-4 h-4" /> Try again
      </button>
    </div>
  );
}

