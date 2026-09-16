// RESPONSIBILITY: Renders/orchestrates loading for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
export default function CouponsLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {["row-1", "row-2", "row-3", "row-4"].map(i => <div key={i} className="h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border" />)}
      </div>
      <div className="h-12 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
      <div className="h-80 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
    </div>
  );
}
