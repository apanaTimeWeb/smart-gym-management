// RESPONSIBILITY: Skeleton loader for the Schema Rollouts (Migrations) page.
export default function MigrationsLoading() {
  return (
    <div className="space-y-6 motion-safe:animate-pulse">
      <div className="h-8 bg-card rounded w-48" />
      <div className="h-24 bg-warning/10 rounded-xl border border-warning/30" />
      <div className="h-64 bg-card rounded-xl border border-border" />
    </div>
  );
}
