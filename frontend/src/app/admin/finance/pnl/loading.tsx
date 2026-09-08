// RESPONSIBILITY: Structural skeleton for the P&L page (Rule 9 — loading.tsx).
// Mimics the actual layout: period selector → 6 KPI cards → 2 chart blocks → table.
export default function AdminFinancePnlLoading() {
  return (
    <div className="min-h-full pb-10 bg-background">
      {/* Header Skeleton */}
      <div className="bg-card border-b border-border px-6 py-4 flex items-center gap-4 sticky top-0 z-20">
        <div className="h-8 w-8 bg-skeleton-base rounded-lg motion-safe:animate-pulse" />
        <div className="space-y-1.5">
          <div className="h-5 w-52 bg-skeleton-base rounded motion-safe:animate-pulse" />
          <div className="h-3.5 w-72 bg-skeleton-base rounded motion-safe:animate-pulse" />
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Period Selector Skeleton */}
        <div className="flex justify-between">
          <div className="h-10 w-96 bg-skeleton-base rounded-xl motion-safe:animate-pulse" />
          <div className="h-10 w-28 bg-skeleton-base rounded-lg motion-safe:animate-pulse" />
        </div>

        {/* KPI Cards Skeleton — 6 cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 space-y-2.5">
              <div className="w-9 h-9 bg-skeleton-base rounded-xl motion-safe:animate-pulse" />
              <div className="h-3 w-16 bg-skeleton-base rounded motion-safe:animate-pulse" />
              <div className="h-6 w-24 bg-skeleton-base rounded motion-safe:animate-pulse" />
              <div className="h-3 w-20 bg-skeleton-base rounded motion-safe:animate-pulse" />
            </div>
          ))}
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-3 h-80 bg-card border border-border rounded-xl motion-safe:animate-pulse" />
          <div className="xl:col-span-2 h-80 bg-card border border-border rounded-xl motion-safe:animate-pulse" />
        </div>

        {/* Table Skeleton */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="bg-primary/5 border-b border-border px-4 py-3 flex gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-3.5 bg-skeleton-base rounded motion-safe:animate-pulse" style={{ width: i === 0 ? '120px' : '70px' }} />
            ))}
          </div>
          {/* Table Rows */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="px-4 py-3.5 border-b border-border flex items-center gap-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-skeleton-base motion-safe:animate-pulse flex-shrink-0" />
                <div className="space-y-1.5">
                  <div className="h-3.5 w-28 bg-skeleton-base rounded motion-safe:animate-pulse" />
                  <div className="h-3 w-20 bg-skeleton-base rounded motion-safe:animate-pulse" />
                </div>
              </div>
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="h-3.5 w-16 bg-skeleton-base rounded motion-safe:animate-pulse" />
              ))}
              <div className="h-6 w-20 bg-skeleton-base rounded-full motion-safe:animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
