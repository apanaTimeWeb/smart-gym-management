'use client';
// RESPONSIBILITY: KPI stat cards for the Notifications module.
import { useManagerNotificationsLogic } from '@/app/manager/notifications/notifications_hooks/ManagerUseManagerNotificationsLogic';
import ManagerStatCard from '@/app/manager/manager_components/ManagerShared/ManagerStatCard';
import { Bell, BellRing, AlertTriangle, CalendarClock } from 'lucide-react';

export default function ManagerNotificationsKPIs() {
  const { kpis } = useManagerNotificationsLogic();

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <ManagerStatCard title="Total"         value={kpis?.total ?? 0}        icon={Bell}          iconBg="bg-surface-highlight" iconColor="text-secondary" />
      <ManagerStatCard title="Unread"        value={kpis?.unread ?? 0}       icon={BellRing}      iconBg="bg-primary/10"  iconColor="text-primary"   />
      <ManagerStatCard title="High Priority" value={kpis?.highPriority ?? 0} icon={AlertTriangle} iconBg="bg-danger/10"   iconColor="text-danger"    />
      <ManagerStatCard title="Today"         value={kpis?.todayCount ?? 0}   icon={CalendarClock} iconBg="bg-info/10"  iconColor="text-info"      />
    </div>
  );
}
