// RESPONSIBILITY: Renders the loading fallback for the notifications module.
import AdminTableSkeleton from '@/app/admin/admin_components/AdminShared/AdminTableSkeleton';

export default function AdminNotificationsLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="h-10 w-48 bg-card rounded-lg border border-border motion-safe:animate-pulse" />
      <div className="h-10 w-1/3 bg-card rounded-lg border border-border motion-safe:animate-pulse" />
      <AdminTableSkeleton rows={8} />
    </div>
  );
}
