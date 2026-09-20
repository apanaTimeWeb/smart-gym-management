// RESPONSIBILITY: Renders the route-level structural skeleton for the Gym Detail screen.
'use client';

export default function SuperadminGymDetailSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true">
      <div className="h-8 w-48 rounded bg-skeleton-base motion-safe:animate-pulse" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[1, 2, 3].map((item) => <div key={item} className="h-32 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />)}
      </div>
      <div className="h-64 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />
    </div>
  );
}
