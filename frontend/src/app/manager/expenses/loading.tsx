export default function Loading() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="h-8 w-48 bg-card border border-border rounded-lg motion-safe:animate-pulse mb-2"></div>
          <div className="h-4 w-64 bg-card border border-border rounded-md motion-safe:animate-pulse"></div>
        </div>
        <div className="h-10 w-32 bg-card border border-border rounded-lg motion-safe:animate-pulse"></div>
      </div>
      
      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 rounded-xl border border-border bg-card motion-safe:animate-pulse h-28"></div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between">
          <div className="h-9 w-64 bg-input rounded-lg motion-safe:animate-pulse"></div>
          <div className="h-9 w-32 bg-input rounded-lg motion-safe:animate-pulse"></div>
        </div>
        <div className="p-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 w-full bg-input rounded-lg mb-2 motion-safe:animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
