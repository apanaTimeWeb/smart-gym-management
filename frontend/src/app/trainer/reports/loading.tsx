export default function TrainerReportsLoading() {
  return (
    <div className="p-6 space-y-6">
      {/* Tab skeletons */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 w-40 bg-skeleton-base motion-safe:animate-pulse rounded-xl flex-shrink-0" />
        ))}
      </div>
      {/* Content skeleton */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-5 w-48 bg-skeleton-base motion-safe:animate-pulse rounded" />
            <div className="h-4 w-72 bg-skeleton-base motion-safe:animate-pulse rounded" />
          </div>
          <div className="h-9 w-28 bg-skeleton-base motion-safe:animate-pulse rounded-xl" />
        </div>
        <div className="p-6 flex flex-col items-center justify-center min-h-72 gap-4">
          <div className="w-16 h-16 bg-skeleton-base motion-safe:animate-pulse rounded-full" />
          <div className="h-5 w-48 bg-skeleton-base motion-safe:animate-pulse rounded" />
          <div className="h-4 w-64 bg-skeleton-base motion-safe:animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
