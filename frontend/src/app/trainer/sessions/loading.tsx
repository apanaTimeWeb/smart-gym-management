export default function TrainerSessionsLoading() {
  return (
    <div className="p-6 space-y-6">
      {/* Toolbar skeleton */}
      <div className="bg-card rounded-xl border border-border p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 w-16 bg-skeleton-base motion-safe:animate-pulse rounded-lg" />
          ))}
        </div>
        <div className="flex gap-3">
          <div className="h-8 w-36 bg-skeleton-base motion-safe:animate-pulse rounded-lg" />
          <div className="h-8 w-28 bg-skeleton-base motion-safe:animate-pulse rounded-lg" />
        </div>
      </div>
      {/* Session card skeletons */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-card rounded-xl border border-border p-5 flex gap-4">
          <div className="w-12 h-12 bg-skeleton-base motion-safe:animate-pulse rounded-xl flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-48 bg-skeleton-base motion-safe:animate-pulse rounded" />
            <div className="h-4 w-64 bg-skeleton-base motion-safe:animate-pulse rounded" />
          </div>
          <div className="h-7 w-24 bg-skeleton-base motion-safe:animate-pulse rounded-full self-center" />
        </div>
      ))}
    </div>
  );
}
