// RESPONSIBILITY: Renders the skeleton loading fallback for the dashboard layout.
export default function DashboardLoading() {
  return (
    <div className="min-h-full p-6 space-y-6 bg-page">
      {/* Header skeleton */}
      <div className="h-16 bg-card rounded-xl motion-safe:animate-pulse motion-safe:duration-base" />

      {/* KPI row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {["row-1", "row-2", "row-3", "row-4"].map(i => (
          <div key={i} className="h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
        ))}
      </div>

      {/* KPI row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {["row-1", "row-2", "row-3", "row-4"].map(i => (
          <div key={i} className="h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
        ))}
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 h-80 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
        <div className="space-y-4">
          <div className="h-48 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
          <div className="h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
        </div>
      </div>

      {/* Distribution */}
      <div className="h-40 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
    </div>
  );
}
