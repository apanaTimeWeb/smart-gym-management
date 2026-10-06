// RESPONSIBILITY: Renders the loading fallback for the notifications module.
import AdminLayoutTableSkeleton from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutTableSkeleton';

/**
 * AdminNotificationsLoading renders the admin notifications loading UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminNotificationsLoading() {
  return (
    <div className="p-6 space-y-6" data-testid="admin_notifications-loading-state">
      <div className="h-10 w-48 bg-skeleton-base rounded-lg border border-border motion-safe:animate-pulse motion-safe:duration-base" />
      <div className="h-10 w-1/3 bg-skeleton-base rounded-lg border border-border motion-safe:animate-pulse motion-safe:duration-base" />
      <AdminLayoutTableSkeleton rows={8} />
    </div>
  );
}
