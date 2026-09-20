// RESPONSIBILITY: Renders the layout-matching loading skeleton for the White-labeling domain list.
'use client';

export default function SuperadminWhiteLabelingLoadingState() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading custom domains">
      <div className="h-10 w-48 rounded-md bg-skeleton-base motion-safe:animate-pulse" />
      <div className="h-14 w-full rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />
      <div className="h-64 w-full rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />
    </div>
  );
}
