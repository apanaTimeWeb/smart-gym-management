"use client";
// RESPONSIBILITY: Renders active health alerts with severity semantics, configured action links, and confirmation-backed dismiss.
/**
 * @description AdminGymHealthAlertsTable: Renders active health alerts with severity semantics, configured action links, and confirmation-backed dismiss.
 * @dependencies Consumes AdminGymHealthAlertsFormatters, useAdminGymHealthAlertsLogic, admin_gym_health_alerts_url_config, AdminGymHealthAlertsConstants, AdminGymHealthAlertsTable.module.css.
 * @edge-case Preserves the owning feature's documented loading, empty, error, permission, and recovery states without taking API ownership.
 */
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { CheckCircle2, X } from 'lucide-react';
import { formatDateTime } from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_utils/AdminGymHealthAlertsFormatters';
import { useLocale } from 'next-intl';
import { useAdminGymHealthAlertsLogic } from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_hooks/useAdminGymHealthAlertsLogic';
import { ADMIN_GYM_HEALTH_ALERTS_ROUTES } from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_url_config';
import { GYM_HEALTH_ALERT_SEVERITY_LABEL_KEYS, GYM_HEALTH_ALERT_SEVERITY_STYLES } from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_constants/AdminGymHealthAlertsConstants';
import styles from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_components/admin_gym_health_alerts_table/AdminGymHealthAlertsTable.module.css';
import AdminLayoutTableSkeleton from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutTableSkeleton';

function resolveActionUrl(actionKey: string): string | null {
  if (actionKey === 'members') return ADMIN_GYM_HEALTH_ALERTS_ROUTES.members;
  if (actionKey === 'finance') return ADMIN_GYM_HEALTH_ALERTS_ROUTES.finance;
  if (actionKey === 'hr') return ADMIN_GYM_HEALTH_ALERTS_ROUTES.hr;
  if (actionKey === 'attendance') return ADMIN_GYM_HEALTH_ALERTS_ROUTES.attendance;
  return null;
}

/** Renders each alert row as a complete open-alert → deep-link → dismiss workflow.
 */
/**
 * @description Renders the / GymHealthAlerts table and its documented loading, empty, error, and interaction states.
 * @dependencies Uses feature-owned hooks, props, and semantic global design tokens; API transport remains outside the view declaration.
 * @edge-case Preserves documented loading, empty, error, disabled, nullable, and retry behavior without inventing fallback business data.
 */
export default function AdminGymHealthAlertsTable() {
  const t = useTranslations();
  const locale = useLocale();

  const { alerts, status, dismissAlert } = useAdminGymHealthAlertsLogic();
  if (status === 'pending') return <AdminLayoutTableSkeleton rows={6} cols={6} />;
  if (status === 'error') return <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-danger" role="alert" data-testid="admin_gym_health_alerts-admin_gym_health_alerts-table-control">{t('gym-health-alerts.admin_gym_health_alerts_table.text_9f3ad23bcd')}</div>;
  if (!alerts.length) return <div className="rounded-xl border border-border bg-card p-10 text-center"><CheckCircle2 size={18} strokeWidth={2} className="mx-auto mb-3 text-success" /><p className="text-sm font-semibold text-primary">{t('gym-health-alerts.admin_gym_health_alerts_table.text_d0a3276f46')}</p></div>;
  return <div className="rounded-xl border border-border bg-card overflow-hidden"><div className="overflow-x-auto"><table className={`${styles.table} w-full`} data-admin-responsive-table><thead><tr className="bg-surface-highlight text-left text-xs uppercase tracking-wider text-secondary"><th scope="col" className="px-5 py-3">{t('gym-health-alerts.admin_gym_health_alerts_table.text_de314fa0c9')}</th><th scope="col" className="px-4 py-3">{t('gym-health-alerts.admin_gym_health_alerts_table.text_b969680a49')}</th><th scope="col" className="px-4 py-3">{t('gym-health-alerts.admin_gym_health_alerts_table.text_bc4359231d')}</th><th scope="col" className="px-4 py-3">{t('gym-health-alerts.admin_gym_health_alerts_table.text_74fb2cc6c8')}</th><th scope="col" className="px-4 py-3">{t('gym-health-alerts.admin_gym_health_alerts_table.text_97c89a4d66')}</th><th scope="col" className="px-4 py-3 text-right">{t('gym-health-alerts.admin_gym_health_alerts_table.text_70afe9eff3')}</th></tr></thead><tbody className="divide-y divide-border">{alerts.map((alert , __testIdIndex42) => { const href = resolveActionUrl(alert.actionKey); return <tr key={alert.id} className="motion-safe:transition-colors hover:bg-surface-hover"><td className="px-5 py-4"><span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold uppercase ${GYM_HEALTH_ALERT_SEVERITY_STYLES[alert.severity]}`} data-testid={`admin_gym_health_alerts-admin_gym_health_alerts-table-severity-${alert.id}`}>{t(GYM_HEALTH_ALERT_SEVERITY_LABEL_KEYS[alert.severity])}</span></td><td className="px-4 py-4"><p className="text-sm font-semibold text-primary">{alert.title}</p><p className="mt-1 text-xs text-secondary">{alert.description}</p><p className="mt-1 text-xs text-secondary">{alert.metric} {t('gym-health-alerts.admin_gym_health_alerts_table.text_e7d139364f')}{alert.threshold}</p></td><td className="px-4 py-4 text-sm text-primary">{alert.gymName}</td><td className="px-4 py-4 text-sm text-secondary">{formatDateTime(alert.detectedAt, locale)}</td><td className="px-4 py-4">{href ? <Link data-testid={`admin_gym_health_alerts-admin_gym_health_alerts-table-navigate-map42-${__testIdIndex42}-1`} href={href} className="text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('gym-health-alerts.admin_gym_health_alerts_table.text_c0ba32fc60')}</Link> : <span className="text-xs text-disabled">{t('gym-health-alerts.admin_gym_health_alerts_table.text_a42c475248')}</span>}</td><td className="px-4 py-4 text-right"><button type="button" onClick={() => dismissAlert(alert.id, alert.title)} aria-label={t('gym-health-alerts.AdminGymHealthAlertsTable.auto_dismiss', { title: alert.title })} className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg text-secondary hover:bg-danger-bg hover:text-danger motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95" data-testid={`admin_gym_health_alerts-admin_gym_health_alerts-table-click-map42-${__testIdIndex42}-2`}><X size={18} strokeWidth={2} /></button></td></tr>; })}</tbody></table></div></div>;
}
