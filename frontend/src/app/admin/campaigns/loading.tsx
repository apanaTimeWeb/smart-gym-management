import AdminTableSkeleton from '@/app/admin/admin_layout/AdminShared/AdminTableSkeleton';

export default function AdminCampaignsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      <div className="h-10 w-48 rounded-lg bg-skeleton-base animate-pulse" />
      <div className="h-4 w-64 rounded bg-skeleton-base animate-pulse" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="h-24 rounded-xl bg-skeleton-base animate-pulse" />
        <div className="h-24 rounded-xl bg-skeleton-base animate-pulse" />
        <div className="h-24 rounded-xl bg-skeleton-base animate-pulse" />
      </div>
      <AdminTableSkeleton />
    </div>
  );
}
