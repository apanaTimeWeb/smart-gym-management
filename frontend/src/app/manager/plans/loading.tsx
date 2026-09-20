// RESPONSIBILITY: Renders the loading fallback for the plans module.
export default function Loading() {
  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-6">
        <div className="h-24 bg-skeleton-base bg-skeleton-highlight rounded-xl motion-safe:animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={`plan-loading-skeleton-${i}`} className="h-64 bg-card rounded-xl motion-safe:animate-pulse border border-border" />
          ))}
        </div>
      </div>
    </div>
  );
}
