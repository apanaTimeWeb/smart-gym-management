"use client";
// RESPONSIBILITY: KPI cards for the Payouts module.
import { useLocale, useTranslations } from 'next-intl';

import { TrendingUp, IndianRupee, TrendingDown, Clock } from 'lucide-react';
import AdminLayoutStatCard from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutStatCard';
import { useAdminPayoutsLogic } from '@/app/frontend_admin/admin_payouts/admin_payouts_hooks/useAdminPayoutsLogic';
import { AdminPayoutsFormatCurrency } from '@/app/frontend_admin/admin_payouts/admin_payouts_utils/AdminPayoutsFormatCurrency';


/**
 * AdminPayoutsKPIs renders the admin payouts kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminPayoutsKPIs: KPI cards for the Payouts module.
 * @dependencies Consumes AdminLayoutStatCard, useAdminPayoutsLogic, AdminPayoutsFormatCurrency.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminPayoutsKPIs() {
  const locale = useLocale();
  const t = useTranslations();
  const { kpis } = useAdminPayoutsLogic();
  const dateSuffix = "";
  if (!kpis) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" data-testid="admin_payouts-adminpayoutskpis-summary">
      <AdminLayoutStatCard title={t('payouts.admin_payouts_kpis.auto_netProfit', { suffix: dateSuffix })} value={AdminPayoutsFormatCurrency(kpis.totalNetProfit, undefined, locale)} change={t('admin_payouts_kpis.auto_afterDeductions')} changeType="up" icon={TrendingUp} iconBg="bg-success-bg" iconColor="text-success"  testId="admin_payouts-adminpayoutskpis-kpi-1"/>
      <AdminLayoutStatCard title={t('payouts.admin_payouts_kpis.auto_grossRevenue', { suffix: dateSuffix })} value={AdminPayoutsFormatCurrency(kpis.totalGrossRevenue, undefined, locale)} change={t('admin_payouts_kpis.auto_allGymsCombined')} changeType="neutral" icon={IndianRupee} iconBg="bg-primary-subtle" iconColor="text-primary"  testId="admin_payouts-adminpayoutskpis-kpi-2"/>
      <AdminLayoutStatCard title={t('payouts.admin_payouts_kpis.auto_totalExpenses', { suffix: dateSuffix })} value={AdminPayoutsFormatCurrency(kpis.totalExpenses, undefined, locale)} change={t('admin_payouts_kpis.auto_payrollOps')} changeType="down" icon={TrendingDown} iconBg="bg-danger-bg" iconColor="text-danger"  testId="admin_payouts-adminpayoutskpis-kpi-3"/>
      <AdminLayoutStatCard title={t('payouts.admin_payouts_kpis.auto_pendingPayouts', { suffix: dateSuffix })} value={kpis.pendingPayouts} change={t('admin_payouts_kpis.auto_awaitingTransfer')} changeType="neutral" icon={Clock} iconBg="bg-warning-bg" iconColor="text-warning"  testId="admin_payouts-adminpayoutskpis-kpi-4"/>
    </div>
  );
}