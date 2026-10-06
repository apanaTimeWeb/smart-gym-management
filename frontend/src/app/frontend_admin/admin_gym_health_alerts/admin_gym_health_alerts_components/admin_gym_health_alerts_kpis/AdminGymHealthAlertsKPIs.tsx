"use client";
// RESPONSIBILITY: Renders the four interactive alert-summary KPI cards and updates the severity filter on activation.
/**
 * @description AdminGymHealthAlertsKPIs: Renders the four interactive alert-summary KPI cards and updates the severity filter on activation.
 * @dependencies Consumes AdminLayoutStatCard, useAdminGymHealthAlertsLogic.
 * @edge-case Preserves the owning feature's documented loading, empty, error, permission, and recovery states without taking API ownership.
 */
import { useTranslations } from 'next-intl';
import { AlertCircle, AlertOctagon, AlertTriangle, Info } from 'lucide-react';
import AdminLayoutStatCard from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutStatCard';
import { useAdminGymHealthAlertsLogic } from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_hooks/useAdminGymHealthAlertsLogic';

/** Renders Total/Critical/Warning/Info counters as interactive severity filters.
 */
/**
 * @description Renders the / GymHealthAlertsKPIs UI section using feature-owned data and semantic design tokens.
 * @dependencies Uses feature-owned hooks, props, and semantic global design tokens; API transport remains outside the view declaration.
 * @edge-case Preserves documented loading, empty, error, disabled, nullable, and retry behavior without inventing fallback business data.
 */
export default function AdminGymHealthAlertsKPIs() {
  const t = useTranslations();
  const { kpis, severityFilter, setSeverityFilter } = useAdminGymHealthAlertsLogic();
  if (!kpis) return null;
  const items = [
    { key: 'all' as const, title: t('gym-health-alerts.AdminAuditRepair.totalActiveAlerts'), value: kpis.totalAlerts, icon: AlertTriangle, iconBg: 'bg-warning-bg', iconColor: 'text-warning' },
    { key: 'critical' as const, title: t('gym-health-alerts.AdminAuditRepair.criticalAlerts'), value: kpis.criticalAlerts, icon: AlertOctagon, iconBg: 'bg-danger-bg', iconColor: 'text-danger' },
    { key: 'warning' as const, title: t('gym-health-alerts.AdminAuditRepair.warningAlerts'), value: kpis.warningAlerts, icon: AlertCircle, iconBg: 'bg-warning-bg', iconColor: 'text-warning' },
    { key: 'info' as const, title: t('gym-health-alerts.AdminAuditRepair.infoAlerts'), value: kpis.infoAlerts, icon: Info, iconBg: 'bg-info-bg', iconColor: 'text-info' },
  ];
  return <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">{items.map((item , __testIdIndex30) => <button key={item.key} type="button" onClick={() => setSeverityFilter(item.key === 'all' ? 'all' : item.key)} aria-pressed={severityFilter === item.key} className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:active:scale-95 text-left rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out ${severityFilter === item.key ? 'ring-2 ring-primary' : ''}`} data-testid={`admin_gym_health_alerts-admin_gym_health_alerts-kpis-click-map30-${__testIdIndex30}-1`}><AdminLayoutStatCard title={item.title} value={item.value} icon={item.icon} iconBg={item.iconBg} iconColor={item.iconColor}  testId="admin_gym_health_alerts-admingymhealthalertskpis-kpi-1"/></button>)}</div>;
}
