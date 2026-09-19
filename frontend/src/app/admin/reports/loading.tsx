// RESPONSIBILITY: Loading skeleton for the Reports page.
export default function ReportsLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="h-8 w-48 bg-card rounded-lg motion-safe:animate-pulse border border-border motion-safe:duration-base" />
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {["row-1", "row-2", "row-3", "row-4"].map(i => <div key={i} className="h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />)}
      </div>
      <div className="h-12 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
      <div className="h-80 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
    </div>
  );
}
