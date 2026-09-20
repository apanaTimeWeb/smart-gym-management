"use client";
// RESPONSIBILITY: Renders the structural loading skeleton for the branch card grid.

export default function AdminBranchesCardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {["row-1", "row-2", "row-3"].map((row) => (
        <div key={row} className="bg-card border border-border rounded-xl p-5 motion-safe:animate-pulse motion-safe:duration-base">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-input flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-input rounded w-3/4" />
              <div className="h-3 bg-input rounded w-1/2" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {["metric-1", "metric-2", "metric-3", "metric-4"].map((metric) => <div key={metric} className="bg-input rounded-xl p-3 h-16" />)}
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <div className="h-4 w-16 bg-input rounded" />
            <div className="h-4 w-20 bg-input rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
