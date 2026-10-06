"use client";
// RESPONSIBILITY: Main entry point for Admin Usage & Subscription page. Composes metric cards and plan cards.
import AdminUsageAlert from '@/app/frontend_admin/admin_usage/admin_usage_components/admin_usage_alert/AdminUsageAlert';
import { useLocale, useTranslations } from 'next-intl';
import { formatDate } from '@/app/frontend_admin/admin_usage/admin_usage_utils/AdminUsageFormatters';

import { useRef } from 'react';
import { RefreshCw, Calendar, CreditCard } from 'lucide-react';
import AdminUsageMetricCard from '@/app/frontend_admin/admin_usage/admin_usage_components/admin_usage_metric_card/AdminUsageMetricCard';
import AdminUsagePlanCard from '@/app/frontend_admin/admin_usage/admin_usage_components/admin_usage_plan_card/AdminUsagePlanCard';
import { useAdminUsageLogic } from '@/app/frontend_admin/admin_usage/admin_usage_hooks/useAdminUsageLogic';
import { AdminUsageFormatCurrency } from '@/app/frontend_admin/admin_usage/admin_usage_utils/AdminUsageFormatCurrency';


/**
 * AdminUsageMain renders the admin usage main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminUsageMain: Main entry point for Admin Usage & Subscription page. Composes metric cards and plan cards.
 * @dependencies Consumes AdminUsageFormatters, AdminUsageMetricCard, AdminUsagePlanCard, useAdminUsageLogic, AdminUsageFormatCurrency.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminUsageMain() {
  const locale = useLocale();
  const t = useTranslations();

  const { data, metrics, planTiers, refresh, status, requestUpgrade, pendingUpgradePlan } = useAdminUsageLogic();
  const planCardRef = useRef<HTMLDivElement>(null);

  const handleUpgrade = () => {
    planCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <AdminUsageAlert />
    <div className="min-h-full pb-10 bg-page text-primary">
      <div className="p-6 space-y-6">
        {status === 'pending' && !data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" aria-label={t('usage.admin_usage_main.text_435f18dc05')}>
            {['usage-1','usage-2','usage-3','usage-4','usage-5','usage-6'].map((skeletonId) => <div key={skeletonId} className="h-28 rounded-xl bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" />)}
          </div>
        ) : null}

        {/* Current Plan Banner */}
        <div className="bg-card rounded-xl border border-border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-subtle rounded-xl">
              <CreditCard size={18} className="text-primary" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs text-secondary uppercase tracking-wider font-semibold">{t('usage.admin_usage_main.text_440a9f2ca1')}</p>
              <p className="text-xl font-bold text-primary">{data?.planName}</p>
              <p className="text-sm text-secondary mt-0.5">{AdminUsageFormatCurrency(data?.monthlyPrice || 0, undefined, locale)} {t('usage.admin_usage_main.text_f7fa5df80f')}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-secondary">
              <Calendar size={18} className="text-warning"  strokeWidth={2}/>
              <span>{t('usage.admin_usage_main.text_78906379a6')}<span className="font-semibold text-primary">{data?.billingCycleEnd ? formatDate(data.billingCycleEnd, locale) : t('usage.admin_usage_main.auto_bde13e461c')}</span></span>
            </div>
            <button type="button"
              onClick={() => void refresh()}
              disabled={status === 'pending'}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-medium text-secondary hover:text-primary hover:bg-input motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ease-in-out min-h-11 min-w-11"
             data-testid="admin_usage-admin_usage-main-click">
              <RefreshCw size={18} className={status === 'pending' ? 'motion-safe:animate-spin' : ''}  strokeWidth={2}/>
              {t('usage.admin_usage_main.text_56e3badc4e')}</button>
          </div>
        </div>

        {/* Usage Metrics Grid */}
        <div>
          <h2 className="text-sm font-bold text-primary mb-3 uppercase tracking-wider">{t('usage.admin_usage_main.text_eb5ad770f5')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {metrics.map((m) => (
              <AdminUsageMetricCard key={m.label} metric={m} onUpgrade={handleUpgrade} />
            ))}
          </div>
        </div>

        {/* Plan Comparison */}
        <div ref={planCardRef}>
          <AdminUsagePlanCard planTiers={planTiers} onRequestUpgrade={requestUpgrade} pendingUpgradePlan={pendingUpgradePlan} />
        </div>
      </div>
    </div>
  </>
  )
}