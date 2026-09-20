// RESPONSIBILITY: Renders/orchestrates loading for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import AdminTableSkeleton from '@/app/admin/admin_layout/AdminShared/AdminTableSkeleton';

export default function AdminAuditLogsLoading() {
  return (
    <div className="p-6 space-y-5">
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`audit-logs-skeleton-${i}`} className="h-24 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
        ))}
      </div>
      <div className="h-20 bg-skeleton-base rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
      <AdminTableSkeleton rows={8} cols={6} />
    </div>
  );
}
