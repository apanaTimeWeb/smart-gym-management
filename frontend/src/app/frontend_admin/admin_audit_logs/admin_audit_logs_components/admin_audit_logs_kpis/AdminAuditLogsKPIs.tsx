"use client";
// RESPONSIBILITY: KPI stat cards for the Audit Logs module.
import { useTranslations } from 'next-intl';

import { ShieldAlert, AlertTriangle, Info, CalendarClock, Users, Activity } from 'lucide-react';
import AdminLayoutStatCard from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutStatCard';
import { useAdminAuditLogsLogic } from '@/app/frontend_admin/admin_audit_logs/admin_audit_logs_hooks/useAdminAuditLogsLogic';

/**
 * AdminAuditLogsKPIs renders the admin audit logs kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminAuditLogsKPIs: KPI stat cards for the Audit Logs module.
 * @dependencies Consumes AdminLayoutStatCard, useAdminAuditLogsLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminAuditLogsKPIs() {
  const t = useTranslations();

  const { kpis } = useAdminAuditLogsLogic();
  if (!kpis) return null;
  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4" data-testid="admin_audit_logs-adminauditlogskpis-summary">
      <AdminLayoutStatCard title={t('audit_logs.admin_audit_logs_kpis.text_404aaeec8e')} value={kpis.totalEvents} change={t('audit_logs.admin_audit_logs_kpis.auto_allTime')} changeType="neutral" icon={Activity} iconBg="bg-primary-subtle" iconColor="text-primary"  testId="admin_audit_logs-adminauditlogskpis-kpi-1"/>
      <AdminLayoutStatCard title={t('audit_logs.admin_audit_logs_kpis.text_0d17be1c02')} value={kpis.highSeverity} change={t('audit_logs.admin_audit_logs_kpis.auto_requiresAttention')} changeType="down" icon={ShieldAlert} iconBg="bg-danger-bg" iconColor="text-danger"  testId="admin_audit_logs-adminauditlogskpis-kpi-2"/>
      <AdminLayoutStatCard title={t('audit_logs.admin_audit_logs_kpis.text_31d0b9f274')} value={kpis.mediumSeverity} change={t('audit_logs.admin_audit_logs_kpis.auto_monitorClosely')} changeType="neutral" icon={AlertTriangle} iconBg="bg-warning-bg" iconColor="text-warning"  testId="admin_audit_logs-adminauditlogskpis-kpi-3"/>
      <AdminLayoutStatCard title={t('audit_logs.admin_audit_logs_kpis.text_f9a1c0f4fc')} value={kpis.lowSeverity} change={t('audit_logs.admin_audit_logs_kpis.auto_informational')} changeType="up" icon={Info} iconBg="bg-success-bg" iconColor="text-success"  testId="admin_audit_logs-adminauditlogskpis-kpi-4"/>
      <AdminLayoutStatCard title={t('audit_logs.admin_audit_logs_kpis.text_5b038231b3')} value={kpis.eventsToday} icon={CalendarClock} iconBg="bg-info-bg" iconColor="text-info"  testId="admin_audit_logs-adminauditlogskpis-kpi-5"/>
      <AdminLayoutStatCard title={t('audit_logs.admin_audit_logs_kpis.text_a7ad0973cf')} value={kpis.uniqueUsers} change={t('audit_logs.admin_audit_logs_kpis.auto_activeActors')} changeType="neutral" icon={Users} iconBg="bg-primary-subtle" iconColor="text-primary"  testId="admin_audit_logs-adminauditlogskpis-kpi-6"/>
    </div>
  );
}