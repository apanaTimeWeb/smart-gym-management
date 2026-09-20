// RESPONSIBILITY: Renders the route-segment error boundary for the White-labeling feature and exposes a safe retry action.
'use client';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function SuperadminWhiteLabelingError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="flex min-h-96 flex-col items-center justify-center space-y-4 rounded-xl border border-border bg-card p-6 text-center" role="alert" aria-labelledby="superadmin-white-labeling-error-title">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger-bg">
        <AlertTriangle size={32} className="text-danger" aria-hidden="true" />
      </div>
      <div>
        <h2 id="superadmin-white-labeling-error-title" className="text-xl font-bold text-primary">White-labeling could not be loaded.</h2>
        <p className="mt-2 max-w-md text-sm text-secondary">The domain configuration view is temporarily unavailable.</p>
      </div>
      <button type="button" onClick={reset} className="mt-4 flex min-h-11 min-w-32 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-medium text-on-primary hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
        <RefreshCcw size={18} aria-hidden="true" />
        Retry
      </button>
    </section>
  );
}
