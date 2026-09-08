// RESPONSIBILITY: Skeleton loader for the Churn Alerts page.
export default function ChurnAlertsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="h-8 w-48 bg-skeleton-base motion-safe:animate-pulse rounded mb-2" />
          <div className="h-4 w-80 bg-skeleton-base motion-safe:animate-pulse rounded" />
        </div>
      </div>

      {/* KPI cards skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-skeleton-base motion-safe:animate-pulse rounded-xl border border-border" />
        ))}
      </div>

      {/* Table skeleton */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="h-14 border-b border-border bg-skeleton-base/50 motion-safe:animate-pulse" />
        <div className="divide-y divide-border">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-16 bg-skeleton-highlight motion-safe:animate-pulse opacity-50" />
          ))}
        </div>
      </div>
    </div>
  );
}
