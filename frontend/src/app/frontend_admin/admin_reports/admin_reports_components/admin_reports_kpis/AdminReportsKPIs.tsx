"use client";
// RESPONSIBILITY: Renders the KPI summary row for the Reports module — total revenue, expenses, profit, members, attendance rate.
import { useLocale, useTranslations } from 'next-intl';
import { AdminReportsFormatCurrency } from '@/app/frontend_admin/admin_reports/admin_reports_utils/AdminReportsFormatCurrency';
import { formatNumber, formatPercent1dp } from '@/app/frontend_admin/admin_reports/admin_reports_utils/AdminReportsFormatters';

import { TrendingUp, TrendingDown, Users, IndianRupee, Activity, Wallet } from 'lucide-react';
import AdminLayoutStatCard from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutStatCard';
import { useAdminReportsLogic } from '@/app/frontend_admin/admin_reports/admin_reports_hooks/useAdminReportsLogic';
import { useAdminReportsDateRangeSuffix } from '@/app/frontend_admin/admin_reports/admin_reports_hooks/useAdminReportsDateRangeSuffix';

/**
 * AdminReportsKPIs renders the admin reports kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminReportsKPIs: Renders the KPI summary row for the Reports module — total revenue, expenses, profit, members, attendance rate.
 * @dependencies Consumes AdminReportsFormatCurrency, AdminReportsFormatters, AdminLayoutStatCard, useAdminReportsLogic, useAdminReportsDateRangeSuffix.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminReportsKPIs() {
  const locale = useLocale();
  const t = useTranslations();
  const { reportData } = useAdminReportsLogic();
  const dateSuffix = useAdminReportsDateRangeSuffix();
  const kpis = reportData?.kpis;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" data-testid="admin_reports-adminreportskpis-summary">
      <AdminLayoutStatCard
        title={t('reports.admin_reports_kpis.auto_totalIncome', { suffix: dateSuffix })}
        value={kpis ? AdminReportsFormatCurrency(kpis.totalRevenue, undefined, locale) : '—'}
        change={t('admin_reports_kpis.auto_vsLastPeriod')}
        changeType="up"
        icon={IndianRupee}
        iconBg="bg-primary-subtle"
        iconColor="text-primary"
       testId="admin_reports-adminreportskpis-kpi-1"/>
      <AdminLayoutStatCard
        title={t('reports.admin_reports_kpis.auto_netProfit', { suffix: dateSuffix })}
        value={kpis ? AdminReportsFormatCurrency(kpis.netProfit, undefined, locale) : '—'}
        change={kpis ? t('reports.admin_reports_kpis.auto_margin', { value: formatPercent1dp((kpis.netProfit / kpis.totalRevenue) * 100, locale) }) : '—'}
        changeType="up"
        icon={TrendingUp}
        iconBg="bg-success-bg"
        iconColor="text-success"
       testId="admin_reports-adminreportskpis-kpi-2"/>
      <AdminLayoutStatCard
        title={t('reports.admin_reports_kpis.auto_totalExpenses', { suffix: dateSuffix })}
        value={kpis ? AdminReportsFormatCurrency(kpis.totalExpenses, undefined, locale) : '—'}
        change={t('admin_reports_kpis.auto_acrossAllGyms')}
        changeType="neutral"
        icon={TrendingDown}
        iconBg="bg-danger-bg"
        iconColor="text-danger"
       testId="admin_reports-adminreportskpis-kpi-3"/>
      <AdminLayoutStatCard
        title={t('reports.admin_reports_kpis.auto_totalMembers', { suffix: dateSuffix })}
        value={kpis ? formatNumber(kpis.totalMembers, locale) : '—'}
        change={kpis ? t('reports.admin_reports_kpis.auto_newMembers', { count: kpis.newMembers }) : '—'}
        changeType="up"
        icon={Users}
        iconBg="bg-info-bg"
        iconColor="text-info"
       testId="admin_reports-adminreportskpis-kpi-4"/>
      <AdminLayoutStatCard
        title={t('reports.admin_reports_kpis.auto_totalPayroll', { suffix: dateSuffix })}
        value={kpis ? AdminReportsFormatCurrency(kpis.totalPayroll, undefined, locale) : '—'}
        change={t('admin_reports_kpis.auto_thisPeriod')}
        changeType="neutral"
        icon={Wallet}
        iconBg="bg-purple-bg"
        iconColor="text-purple-text"
       testId="admin_reports-adminreportskpis-kpi-5"/>
      <AdminLayoutStatCard
        title={t('reports.admin_reports_kpis.auto_avgAttendance', { suffix: dateSuffix })}
        value={kpis ? `${kpis.avgAttendanceRate}%` : '—'}
        change={t('admin_reports_kpis.auto_acrossAllGyms')}
        changeType="up"
        icon={Activity}
        iconBg="bg-success-bg"
        iconColor="text-success"
       testId="admin_reports-adminreportskpis-kpi-6"/>
    </div>
  );
}