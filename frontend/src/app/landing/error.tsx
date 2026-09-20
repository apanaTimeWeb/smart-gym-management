'use client';
// RESPONSIBILITY: Renders the Landing route-segment error state and invokes the app-provided observability hook when available.
import { useEffect } from 'react';
import type { LandingErrorReporter } from '@/app/landing/landing_types/landing_types';

export default function LandingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    const reporter = (globalThis as typeof globalThis & { __landingErrorReporter?: LandingErrorReporter }).__landingErrorReporter;
    reporter?.({
      route: '/landing',
      module: 'landing',
      digest: error.digest,
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  return (
    <div className="min-h-screen bg-page flex items-center justify-center p-6">
      <div className="bg-card border border-border p-8 rounded-xl max-w-md w-full text-center space-y-4 shadow-dialog">
        <h2 className="text-2xl font-black text-primary">We could not load this page.</h2>
        <p className="text-secondary text-sm">Please try the page again. No internal error details are shown here.</p>
        <button
          type="button"
          onClick={reset}
          className="mt-4 min-h-11 px-8 py-3 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
