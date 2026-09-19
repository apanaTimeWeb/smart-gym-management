// RESPONSIBILITY: Next.js loading.tsx  renders skeleton loader fallback while Settings module data loads.
export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 motion-safe:animate-pulse motion-safe:duration-base">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {[1, 2, 3, 4].map((id) => (
          <div key={`skeleton-nav-${id}`} className="h-32 bg-card rounded-xl motion-safe:animate-pulse motion-safe:duration-base"></div>
        ))}
      </div>
      <div className="h-32 bg-card rounded-xl border border-border motion-safe:animate-pulse mt-6 motion-safe:duration-base"></div>
    </div>
  );
}
