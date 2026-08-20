// RESPONSIBILITY: Skeleton loader for the Superadmin Dashboard page.
export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-skeleton-base rounded w-48" />
      <div className="grid grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-skeleton-base rounded-xl border border-border" />)}
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 h-80 bg-skeleton-base rounded-xl border border-border" />
        <div className="h-80 bg-skeleton-base rounded-xl border border-border" />
      </div>
    </div>
  );
}
