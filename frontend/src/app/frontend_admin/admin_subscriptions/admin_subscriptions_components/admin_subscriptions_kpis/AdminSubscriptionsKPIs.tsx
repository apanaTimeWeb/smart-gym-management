"use client";
// RESPONSIBILITY: KPI cards for the Subscriptions module.
import { useLocale, useTranslations } from 'next-intl';
import { AdminSubscriptionsFormatCurrency } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_utils/AdminSubscriptionsFormatCurrency';

import { CreditCard, IndianRupee, FileText, Calendar, TrendingDown, Zap } from 'lucide-react';
import AdminLayoutStatCard from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutStatCard';
import { useAdminSubscriptionsLogic } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_hooks/useAdminSubscriptionsLogic';

/**
 * AdminSubscriptionsKPIs renders the admin subscriptions kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSubscriptionsKPIs: KPI cards for the Subscriptions module.
 * @dependencies Consumes AdminSubscriptionsFormatCurrency, AdminLayoutStatCard, useAdminSubscriptionsLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSubscriptionsKPIs() {
  const locale = useLocale();
  const t = useTranslations();
  const { kpis } = useAdminSubscriptionsLogic();
  const dateSuffix = "";
  if (!kpis) return null;

  const fmt = (v: number) => AdminSubscriptionsFormatCurrency(v, undefined, locale);

  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4" data-testid="admin_subscriptions-adminsubscriptionskpis-summary">
      <AdminLayoutStatCard title={t('subscriptions.admin_subscriptions_kpis.auto_currentPlan', { suffix: dateSuffix })} value={kpis.currentPlan} icon={Zap} iconBg="bg-primary-subtle" iconColor="text-primary"  testId="admin_subscriptions-adminsubscriptionskpis-kpi-1"/>
      <AdminLayoutStatCard title={t('subscriptions.admin_subscriptions_kpis.auto_monthlySpend', { suffix: dateSuffix })} value={fmt(kpis.monthlySpend)} icon={IndianRupee} iconBg="bg-success-bg" iconColor="text-success"  testId="admin_subscriptions-adminsubscriptionskpis-kpi-2"/>
      <AdminLayoutStatCard title={t('subscriptions.admin_subscriptions_kpis.auto_totalInvoices', { suffix: dateSuffix })} value={kpis.totalInvoices} change={t('admin_subscriptions_kpis.auto_allTime')} changeType="neutral" icon={FileText} iconBg="bg-info-bg" iconColor="text-info"  testId="admin_subscriptions-adminsubscriptionskpis-kpi-3"/>
      <AdminLayoutStatCard title={t('subscriptions.admin_subscriptions_kpis.auto_nextBilling', { suffix: dateSuffix })} value={fmt(kpis.nextBillingAmount)} icon={CreditCard} iconBg="bg-primary-subtle" iconColor="text-primary"  testId="admin_subscriptions-adminsubscriptionskpis-kpi-4"/>
      <AdminLayoutStatCard title={t('subscriptions.admin_subscriptions_kpis.auto_daysToRenewal', { suffix: dateSuffix })} value={kpis.daysUntilRenewal} change={t('admin_subscriptions_kpis.auto_daysRemaining')} changeType="neutral" icon={Calendar} iconBg="bg-warning-bg" iconColor="text-warning"  testId="admin_subscriptions-adminsubscriptionskpis-kpi-5"/>
      <AdminLayoutStatCard title={t('subscriptions.admin_subscriptions_kpis.auto_saveAnnual', { suffix: dateSuffix })} value={fmt(kpis.savedWithAnnual)} change={t('admin_subscriptions_kpis.auto_vsMonthlyBilling')} changeType="up" icon={TrendingDown} iconBg="bg-success-bg" iconColor="text-success"  testId="admin_subscriptions-adminsubscriptionskpis-kpi-6"/>
    </div>
  );
}
