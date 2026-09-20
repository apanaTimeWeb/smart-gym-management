// RESPONSIBILITY: Renders the White-labeling section error state and retries the failed query.
'use client';

import type { SuperadminWhiteLabelingErrorStateProps } from '@/app/superadmin/white-labeling/white-labeling_types/SuperadminWhiteLabelingErrorStateTypes';
export default function SuperadminWhiteLabelingErrorState({ onRetry }: SuperadminWhiteLabelingErrorStateProps) {
  return (
    <section className="rounded-xl border border-border bg-danger-bg p-6 text-center" role="alert">
      <p className="text-lg font-semibold text-danger">Custom domains could not be loaded.</p>
      <p className="mt-1 text-sm text-secondary">Please retry the request.</p>
      <button type="button" onClick={onRetry} className="mt-4 min-h-11 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">Try Again</button>
    </section>
  );
}
