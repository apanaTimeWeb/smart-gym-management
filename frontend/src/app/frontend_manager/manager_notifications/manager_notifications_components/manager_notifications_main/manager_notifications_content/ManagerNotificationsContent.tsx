// RESPONSIBILITY: Renders ManagerNotificationsContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';
import ManagerHeader from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader';
import ManagerNotificationsKPIs from '@/app/frontend_manager/manager_notifications/manager_notifications_components/manager_notifications_kpis/ManagerNotificationsKPIs';
import ManagerNotificationsTable from '@/app/frontend_manager/manager_notifications/manager_notifications_components/manager_notifications_table/ManagerNotificationsTable';


/** @description Renders the ManagerNotificationsContent component for its owning Manager frontend boundary. @dependencies Data flow: → useManagerNotificationsLogic → KPIs + Table. @edge-case Preserves the documented interaction and boundary states. */
export function ManagerNotificationsContent() {
  const t = useTranslations('MANAGER_NOTIFICATIONS');

  return (
    <div className="min-h-full pb-10">
      <ManagerHeader data-testid="manager_notifications-managernotificationscontent-managerheader-1" title={t("COPY_NOTIFICATIONS")} subtitle={t("COPY_SYSTEM_ALERTS_MEMBER_EXPIRY_WARNINGS_PAYMENT_REMINDERS")} />
      <div className="p-6 space-y-6">
        <ManagerNotificationsKPIs />
        <ManagerNotificationsTable />
      </div>
    </div>
  );
}
