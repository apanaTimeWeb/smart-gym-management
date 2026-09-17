// RESPONSIBILITY: Renders/orchestrates loading for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
export default function PermissionsLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {["row-1", "row-2"].map(i => <div key={i} className="h-24 bg-card rounded-xl motion-safe:animate-pulse border border-border" />)}
      </div>
      <div className="h-12 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
      <div className="h-96 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
    </div>
  );
}
