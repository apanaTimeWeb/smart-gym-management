// RESPONSIBILITY: Skeleton loading UI for the Communications page — mimics KPIs + tab + composer layout.
export default function CommunicationsLoading() {
  return (
    <div className="p-6 space-y-5 animate-pulse">
      {/* KPI skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 bg-skeleton-base rounded-xl border border-border" />
        ))}
      </div>
      {/* Tab skeleton */}
      <div className="h-10 w-64 bg-skeleton-base rounded-xl" />
      {/* Composer skeleton */}
      <div className="bg-skeleton-base rounded-xl border border-border p-6 space-y-4">
        <div className="h-4 w-48 bg-skeleton-highlight rounded" />
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 bg-skeleton-highlight rounded-xl" />
          ))}
        </div>
        <div className="h-4 w-32 bg-skeleton-highlight rounded" />
        <div className="h-32 bg-skeleton-highlight rounded-xl" />
        <div className="h-10 w-40 bg-skeleton-highlight rounded-lg ml-auto" />
      </div>
    </div>
  );
}
