// RESPONSIBILITY: Renders/orchestrates loading for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
export default function AdminProfileLoading() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="h-8 w-48 bg-skeleton-base motion-safe:animate-pulse rounded motion-safe:duration-base" />
      <div className="h-28 bg-skeleton-base motion-safe:animate-pulse rounded-xl border border-border motion-safe:duration-base" />
      <div className="h-10 w-64 bg-skeleton-base motion-safe:animate-pulse rounded-xl motion-safe:duration-base" />
      <div className="h-64 bg-skeleton-base motion-safe:animate-pulse rounded-xl border border-border motion-safe:duration-base" />
    </div>
  );
}
