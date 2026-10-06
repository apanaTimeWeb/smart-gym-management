// RESPONSIBILITY: Route-level orchestrator for the Admin Notifications feature.
"use client";
import AdminNotificationsClient from '@/app/frontend_admin/admin_notifications/admin_notifications_components/admin_notifications_client/AdminNotificationsClient';

/**
 * @description Composes the Notifications page surface without owning feature business state or API behavior.
 * @dependencies Depends only on the module-owned Notifications client view.
 * @edge-case Keeps route entry rendering stable while all interactive behavior stays in module hooks/components.
 */
export default function AdminNotificationsMain() {
  return (
    <div className="min-h-full pb-10">
      <div className="mx-auto max-w-4xl p-6">
        <AdminNotificationsClient />
      </div>
    </div>
  );
}
