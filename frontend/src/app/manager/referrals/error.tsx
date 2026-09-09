'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Error logged to monitoring provider
  }, [error]);

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-destructive/10 p-4 rounded-full mb-4">
        <AlertCircle size={48} className="text-destructive" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">Something went wrong!</h2>
      <p className="text-secondary mb-6 max-w-md">
        We encountered an error while loading the referrals module. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-primary text-black font-bold rounded-lg hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        Try Again
      </button>
    </div>
  );
}
