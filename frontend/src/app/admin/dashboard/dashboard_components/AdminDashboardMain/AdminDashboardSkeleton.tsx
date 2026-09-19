"use client";
// RESPONSIBILITY: Renders the dashboard route skeleton with KPI and chart-shaped placeholders.

export default function AdminDashboardSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {["row-1", "row-2", "row-3", "row-4"].map((row) => <div key={row} className="h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />)}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 h-80 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
        <div className="h-80 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 h-64 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
        <div className="h-64 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
      </div>
    </div>
  );
}
