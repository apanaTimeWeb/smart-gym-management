// RESPONSIBILITY: Renders AdminCampaignsLoading for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.
import AdminTableSkeleton from '@/app/admin/admin_layout/AdminShared/AdminTableSkeleton';

export default function AdminCampaignsLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="h-7 w-56 rounded bg-skeleton-base motion-safe:animate-pulse" />
      <div className="h-4 w-72 rounded bg-skeleton-base motion-safe:animate-pulse" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="h-36 rounded-xl bg-skeleton-base motion-safe:animate-pulse" />
        <div className="h-36 rounded-xl bg-skeleton-base motion-safe:animate-pulse" />
        <div className="h-36 rounded-xl bg-skeleton-base motion-safe:animate-pulse" />
      </div>
      <AdminTableSkeleton />
    </div>
  );
}
