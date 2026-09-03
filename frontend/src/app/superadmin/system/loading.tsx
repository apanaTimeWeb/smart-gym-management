// RESPONSIBILITY: Skeleton loader for the System & Audit page.
export default function SystemLoading() {
  return (
    <div className="space-y-6 motion-safe:animate-pulse">
      <div className="h-8 bg-card rounded w-48" />
      <div className="grid grid-cols-3 gap-6">{[...Array(3)].map((_, i) => <div key={i} className="h-40 bg-card rounded-xl border border-border" />)}</div>
      <div className="h-64 bg-card rounded-xl border border-border" />
    </div>
  );
}
