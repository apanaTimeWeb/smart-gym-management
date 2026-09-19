'use client';
// RESPONSIBILITY: Renders the ManagerNotificationsContent sub-view extracted from ManagerNotificationsMain; owns only this presentation responsibility.
// RESPONSIBILITY: Orchestrator for the Notifications module.
// DATA FLOW:  → useManagerNotificationsLogic → KPIs + Table
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import ManagerNotificationsKPIs from '@/app/manager/notifications/notifications_components/ManagerNotificationsKPIs/ManagerNotificationsKPIs';
import ManagerNotificationsTable from '@/app/manager/notifications/notifications_components/ManagerNotificationsTable/ManagerNotificationsTable';

export function ManagerNotificationsContent() {
  return (
    <div className="min-h-full pb-10">
      <ManagerHeader title="Notifications" subtitle="System alerts, member expiry warnings, and payment reminders" />
      <div className="p-6 space-y-6">
        <ManagerNotificationsKPIs />
        <ManagerNotificationsTable />
      </div>
    </div>
  );
}
