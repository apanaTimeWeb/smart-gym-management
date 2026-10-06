"use client";
// RESPONSIBILITY: Renders the two rows of KPI metric stat cards on the dashboard using live data from useAdminDashboardLogic.
import { useLocale, useTranslations } from 'next-intl';

import { useAdminDashboardLogic } from '@/app/frontend_admin/admin_dashboard/admin_dashboard_hooks/useAdminDashboardLogic';
import AdminLayoutStatCard from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutStatCard';
import { AdminDashboardFormatCurrency } from '@/app/frontend_admin/admin_dashboard/admin_dashboard_utils/AdminDashboardFormatCurrency';
import { formatNumber } from '@/app/frontend_admin/admin_dashboard/admin_dashboard_utils/AdminDashboardFormatters';
import { Users, DollarSign, TrendingUp, AlertCircle, Clock, UserCheck } from 'lucide-react';
import { useAdminDashboardDateRangeSuffix } from '@/app/frontend_admin/admin_dashboard/admin_dashboard_hooks/useAdminDashboardDateRangeSuffix';

/**
 * AdminDashboardKPIs renders the admin dashboard kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminDashboardKPIs: Renders the two rows of KPI metric stat cards on the dashboard using live data from useAdminDashboardLogic.
 * @dependencies Consumes useAdminDashboardLogic, AdminLayoutStatCard, AdminDashboardFormatCurrency, AdminDashboardFormatters, useAdminDashboardDateRangeSuffix.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminDashboardKPIs() {
  const locale = useLocale();
  const t = useTranslations();
  const { stats } = useAdminDashboardLogic();
  const dateSuffix = useAdminDashboardDateRangeSuffix();
  
  if (!stats) return null;
  
  const s = stats;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-4" data-testid="admin_dashboard-admindashboardkpis-summary">
      <AdminLayoutStatCard
        title={t('dashboard.admin_dashboard_kpis.auto_avgAttendance', { suffix: dateSuffix })}
        value={formatNumber(s.avgAttendance ?? 0, locale)}
        change={t('admin_dashboard_kpis.auto_thisMonth')}
        changeType="up"
        icon={Users}
        iconBg="bg-primary-subtle"
        iconColor="text-primary"
       testId="admin_dashboard-admindashboardkpis-kpi-1"/>
      <AdminLayoutStatCard
        title={t('dashboard.admin_dashboard_kpis.auto_renewalsPending', { suffix: dateSuffix })}
        value={formatNumber(s.renewalsPending ?? 0, locale)}
        change={t('admin_dashboard_kpis.auto_next7Days')}
        changeType="down"
        icon={Clock}
        iconBg="bg-warning-bg"
        iconColor="text-warning"
       testId="admin_dashboard-admindashboardkpis-kpi-2"/>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <AdminLayoutStatCard
        title={t('dashboard.admin_dashboard_kpis.auto_totalIncome', { suffix: dateSuffix })}
        value={AdminDashboardFormatCurrency(s.totalRevenue || 0, s.currency, locale)}
        change={t('admin_dashboard_kpis.auto_allTime')}
        changeType="neutral"
        icon={DollarSign}
        iconBg="bg-primary-subtle"
        iconColor="text-primary"
       testId="admin_dashboard-admindashboardkpis-kpi-3"/>
      <AdminLayoutStatCard
        title={t('dashboard.admin_dashboard_kpis.auto_netProfit', { suffix: dateSuffix })}
        value={AdminDashboardFormatCurrency(s.netProfit || 0, s.currency, locale)}
        change={t('admin_dashboard_kpis.auto_allTime')}
        changeType="up"
        icon={TrendingUp}
        iconBg="bg-success-bg"
        iconColor="text-success"
       testId="admin_dashboard-admindashboardkpis-kpi-4"/>
      <AdminLayoutStatCard
        title={t('dashboard.admin_dashboard_kpis.auto_activeMembers', { suffix: dateSuffix })}
        value={formatNumber(s.activeMembers || 0, locale)}
        change={t('admin_dashboard_kpis.auto_capacity', { percent: s.totalMembers ? Math.round((s.activeMembers / s.totalMembers) * 100) : 0 })}
        changeType="neutral"
        icon={UserCheck}
        iconBg="bg-info-bg"
        iconColor="text-info"
       testId="admin_dashboard-admindashboardkpis-kpi-5"/>
      <AdminLayoutStatCard
        title={t('dashboard.admin_dashboard_kpis.auto_totalOutstanding', { suffix: dateSuffix })}
        value={AdminDashboardFormatCurrency(s.pendingPayments || 0, s.currency, locale)}
        change={t('admin_dashboard_kpis.auto_membersDue', { count: s.membersByStatus?.pending || 0 })}
        changeType="down"
        icon={AlertCircle}
        iconBg="bg-danger-bg"
        iconColor="text-danger"
       testId="admin_dashboard-admindashboardkpis-kpi-6"/>
    </div>
    </>
  );
}