// RESPONSIBILITY: Skeleton loading state for the Admin Members page.
export default function AdminMembersLoading() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="h-8 w-48 bg-border rounded-lg motion-safe:animate-pulse" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-24 bg-card border border-border rounded-xl motion-safe:animate-pulse" />)}
      </div>
      <div className="h-14 bg-card border border-border rounded-xl motion-safe:animate-pulse" />
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-14 bg-card border border-border rounded-xl motion-safe:animate-pulse" />)}
      </div>
    </div>
  );
}
