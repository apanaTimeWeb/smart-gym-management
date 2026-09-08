// RESPONSIBILITY: Next.js loading skeleton for /manager/support.
export default function ManagerSupportLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <div className="h-8 w-44 bg-skeleton-base motion-safe:animate-pulse rounded" />
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="h-5 w-48 bg-skeleton-base motion-safe:animate-pulse rounded" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-24 bg-skeleton-base motion-safe:animate-pulse rounded" />
            <div className="h-10 w-full bg-skeleton-base motion-safe:animate-pulse rounded-lg" />
          </div>
        ))}
        <div className="h-24 w-full bg-skeleton-base motion-safe:animate-pulse rounded-lg" />
        <div className="h-10 w-full bg-skeleton-base motion-safe:animate-pulse rounded-lg" />
      </div>
    </div>
  );
}
