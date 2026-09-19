'use client';
// RESPONSIBILITY: Renders the ManagerDashboardSkeleton sub-view extracted from ManagerDashboardMain; owns only this presentation responsibility.
// RESPONSIBILITY: Skeleton view for the dashboard route; mirrors the dashboard layout while data is loading.

export function ManagerDashboardSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => <div key={`skeleton-${i}`} className="h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border" />)}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => <div key={`skeleton-${i}`} className="h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border" />)}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 h-80 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
        <div className="space-y-4">
          <div className="h-48 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
          <div className="h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
        </div>
      </div>
      <div className="h-40 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
    </div>
  );
}
