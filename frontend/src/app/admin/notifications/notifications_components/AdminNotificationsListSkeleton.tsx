'use client';
// RESPONSIBILITY: Renders the structural loading state for the Admin notification feed.

export default function AdminNotificationsListSkeleton() {
  return (
    <div className="divide-y divide-border" aria-busy="true" aria-label="Loading notifications">
      {[1, 2, 3, 4, 5, 6].map((row) => (
        <div key={`notifications-skeleton-${row}`} className="flex items-start gap-4 p-4 md:px-6">
          <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" />
            <div className="h-3 w-24 rounded bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" />
          </div>
        </div>
      ))}
    </div>
  );
}
