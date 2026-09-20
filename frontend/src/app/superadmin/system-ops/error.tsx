// RESPONSIBILITY: Renders the route-level recovery UI for the System Ops summary feature.
'use client';
import { RotateCcw } from 'lucide-react';

export default function SuperadminSystemOpsError({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-80 items-center justify-center">
      <div className="max-w-md rounded-xl border border-danger bg-danger-bg p-8 text-center">
        <h1 className="text-lg font-semibold text-danger">System Operations needs another try.</h1>
        <p className="mt-2 text-sm text-secondary">The summary could not be loaded safely.</p>
        <button type="button" onClick={reset} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"><RotateCcw size={18} className="h-4" aria-hidden="true"/>Try Again</button>
      </div>
    </div>
  );
}
