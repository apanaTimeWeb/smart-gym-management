"use client";
// RESPONSIBILITY: KPI stat cards for the Audit Logs module.

import { ShieldAlert, AlertTriangle, Info, CalendarClock, Users, Activity } from 'lucide-react';
import AdminStatCard from '@/app/admin/admin_components/AdminShared/AdminStatCard';
import { useAdminAuditLogsLogic } from '@/app/admin/audit_logs/audit_context/useAdminAuditLogsLogic';

export default function AdminAuditLogsKPIs() {
  const { kpis } = useAdminAuditLogsLogic();
  if (!kpis) return null;
  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
      <AdminStatCard title="Total Events" value={kpis.totalEvents} change="all time" changeType="neutral" icon={Activity} iconBg="bg-primary/10" iconColor="text-primary" />
      <AdminStatCard title="High Severity" value={kpis.highSeverity} change="requires attention" changeType="down" icon={ShieldAlert} iconBg="bg-danger/10" iconColor="text-danger" />
      <AdminStatCard title="Medium Severity" value={kpis.mediumSeverity} change="monitor closely" changeType="neutral" icon={AlertTriangle} iconBg="bg-warning/10" iconColor="text-warning" />
      <AdminStatCard title="Low Severity" value={kpis.lowSeverity} change="informational" changeType="up" icon={Info} iconBg="bg-success/10" iconColor="text-success" />
      <AdminStatCard title="Events Today" value={kpis.eventsToday} icon={CalendarClock} iconBg="bg-info/10" iconColor="text-info" />
      <AdminStatCard title="Unique Users" value={kpis.uniqueUsers} change="active actors" changeType="neutral" icon={Users} iconBg="bg-primary/10" iconColor="text-primary" />
    </div>
  );
}