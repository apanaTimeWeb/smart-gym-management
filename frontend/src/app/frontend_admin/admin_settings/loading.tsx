// RESPONSIBILITY: Next.js loading.tsx  renders skeleton loader fallback while Settings module data loads.
/**
 * Loading is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 motion-safe:animate-pulse motion-safe:duration-base" data-testid="admin_settings-loading-state">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {[1, 2, 3, 4].map((id) => (
          <div key={`skeleton-nav-${id}`} className="h-32 bg-skeleton-base rounded-xl motion-safe:animate-pulse motion-safe:duration-base"></div>
        ))}
      </div>
      <div className="h-32 bg-skeleton-base rounded-xl border border-border motion-safe:animate-pulse mt-6 motion-safe:duration-base"></div>
    </div>
  );
}
