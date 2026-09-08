// RESPONSIBILITY: loading.tsx skeleton for /admin/profile.
export default function AdminProfileLoading() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="h-8 w-48 bg-skeleton-base motion-safe:animate-pulse rounded" />
      <div className="h-28 bg-skeleton-base motion-safe:animate-pulse rounded-xl border border-border" />
      <div className="h-10 w-64 bg-skeleton-base motion-safe:animate-pulse rounded-xl" />
      <div className="h-64 bg-skeleton-base motion-safe:animate-pulse rounded-xl border border-border" />
    </div>
  );
}
