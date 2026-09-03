// RESPONSIBILITY: Skeleton loader for the Platform Settings page.
export default function SettingsLoading() {
  return (
    <div className="space-y-6 motion-safe:animate-pulse">
      <div className="h-8 bg-card rounded w-48" />
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 h-96 bg-card rounded-xl border border-border" />
        <div className="h-64 bg-card rounded-xl border border-border" />
      </div>
    </div>
  );
}
