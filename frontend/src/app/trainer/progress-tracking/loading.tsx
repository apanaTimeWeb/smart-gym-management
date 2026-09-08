export default function TrainerProgressLoading() {
  return (
    <div className="p-6 space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 w-44 bg-skeleton-base motion-safe:animate-pulse rounded" />
          <div className="h-4 w-64 bg-skeleton-base motion-safe:animate-pulse rounded" />
        </div>
        <div className="h-9 w-28 bg-skeleton-base motion-safe:animate-pulse rounded-lg" />
      </div>

      {/* Chart skeleton */}
      <div className="bg-card rounded-xl border border-border p-5 space-y-4">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-7 w-24 bg-skeleton-base motion-safe:animate-pulse rounded-full" />
          ))}
        </div>
        <div className="h-36 bg-skeleton-base motion-safe:animate-pulse rounded-lg" />
      </div>

      {/* Table skeleton */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="h-10 bg-input border-b border-border" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 px-4 py-3 border-b border-border">
            {[1, 2, 3, 4, 5, 6].map((j) => (
              <div key={j} className="h-4 flex-1 bg-skeleton-base motion-safe:animate-pulse rounded" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
