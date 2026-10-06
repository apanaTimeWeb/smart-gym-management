"use client";
// RESPONSIBILITY: Main orchestrator for the Subscriptions / Billing module — tabs for overview, plans, invoices, payment.
import { useLocale, useTranslations } from 'next-intl';
import { formatDate } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_utils/AdminSubscriptionsFormatters';
import { AdminSubscriptionsFormatCurrency } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_utils/AdminSubscriptionsFormatCurrency';

import { Calendar, RefreshCw, ToggleLeft, ToggleRight, Loader2 } from 'lucide-react';
import AdminSubscriptionsKPIs from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_components/admin_subscriptions_kpis/AdminSubscriptionsKPIs';
import AdminSubscriptionsPlanCards from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_components/admin_subscriptions_plan_cards/AdminSubscriptionsPlanCards';
import AdminSubscriptionsInvoices from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_components/admin_subscriptions_invoices/AdminSubscriptionsInvoices';
import AdminSubscriptionsPaymentMethod from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_components/admin_subscriptions_payment_method/AdminSubscriptionsPaymentMethod';
import { useAdminSubscriptionsLogic } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_hooks/useAdminSubscriptionsLogic';
import { useAdminSubscriptionsStore } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_store/useAdminSubscriptionsStore';
import { ADMIN_SUBSCRIPTIONS_TAB_OPTIONS, PLAN_TIER_STYLES } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_constants/AdminSubscriptionsConstants';

/**
 * AdminSubscriptionsMain renders the admin subscriptions main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSubscriptionsMain: Main orchestrator for the Subscriptions / Billing module — tabs for overview, plans, invoices, payment.
 * @dependencies Consumes AdminSubscriptionsFormatters, AdminSubscriptionsFormatCurrency, AdminSubscriptionsKPIs, AdminSubscriptionsPlanCards, AdminSubscriptionsInvoices.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSubscriptionsMain() {
  const locale = useLocale();
  const t = useTranslations();

  const { activeTab, setActiveTab } = useAdminSubscriptionsStore();
  const { subscription, toggleAutoRenew, togglingAutoRenew, status } = useAdminSubscriptionsLogic();

  const tierStyle = subscription ? PLAN_TIER_STYLES[subscription.tier] : PLAN_TIER_STYLES['growth'];

  return (
    <div className="min-h-full pb-10">

      <div className="p-6 space-y-6">

        {/* Current plan banner */}
        {subscription && (
          <div className={`bg-card border rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${tierStyle?.border || ''}`}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${tierStyle?.bg || ''}`}>
                <Calendar size={18} className={tierStyle?.text || ''}  strokeWidth={2}/>
              </div>
              <div>
                <p className="text-xs text-secondary uppercase tracking-wider font-semibold">{t('subscriptions.admin_subscriptions_main.text_440a9f2ca1')}</p>
                <p className="text-xl font-bold text-primary">{subscription.planName}</p>
                <p className="text-sm text-secondary mt-0.5">
                  {AdminSubscriptionsFormatCurrency(subscription.monthlyPrice, undefined, locale)}{t('subscriptions.admin_subscriptions_main.text_7a310fd153')}{' '}
                  <span className="font-semibold text-primary">
                    {formatDate(subscription.nextBillingDate, locale)}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-secondary">{t('subscriptions.admin_subscriptions_main.text_92dbd5ced5')}</span>
              <button type="button"
                onClick={toggleAutoRenew}
                disabled={togglingAutoRenew}
                className="min-h-11 min-w-11 flex items-center gap-1.5 text-sm font-medium motion-safe:transition-colors disabled:opacity-50 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95"
                aria-label={t('subscriptions.admin_subscriptions_main.text_99209d6924')}
               data-testid="admin_subscriptions-admin_subscriptions-main-click">
                {togglingAutoRenew
                  ? <Loader2 size={18} className="motion-safe:animate-spin text-primary motion-safe:duration-base"  strokeWidth={2}/>
                  : subscription.autoRenew
                    ? <ToggleRight size={18} className="text-success"  strokeWidth={2}/>
                    : <ToggleLeft size={18} className="text-secondary"  strokeWidth={2}/>
                }
                <span className={subscription.autoRenew ? 'text-success' : 'text-secondary'}>
                  {togglingAutoRenew ? t('subscriptions.admin_subscriptions_main.auto_3ed83e9c97') : subscription.autoRenew ? t('subscriptions.admin_subscriptions_main.auto_on') : t('subscriptions.admin_subscriptions_main.auto_off')}
                </span>
              </button>
            </div>
          </div>
        )}

        {status === 'pending' && (
          <div className="flex items-center justify-center py-10">
            <RefreshCw size={18} className="motion-safe:animate-spin text-primary motion-safe:duration-base"  strokeWidth={2}/>
          </div>
        )}

        {status === 'success' && (
          <>
            {/* KPIs */}
            <AdminSubscriptionsKPIs />

            {/* Tabs */}
            <div className="flex gap-1 bg-input border border-border rounded-xl p-1 w-fit">
              {ADMIN_SUBSCRIPTIONS_TAB_OPTIONS.map((tab, __testIdIndex90) => (
                <button type="button"
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page px-4 py-2 rounded-lg text-sm font-medium motion-safe:transition-colors ${
                    activeTab === tab.key
                      ? 'bg-card text-primary shadow-card border border-border'
                      : 'text-secondary hover:text-primary'
                  }`}
                 data-testid={`admin_subscriptions-admin_subscriptions-main-click-2-map90-${__testIdIndex90}-1`}>
                  {t(tab.labelKey)}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <AdminSubscriptionsInvoices />
                <AdminSubscriptionsPaymentMethod />
              </div>
            )}
            {activeTab === 'plans' && <AdminSubscriptionsPlanCards />}
            {activeTab === 'invoices' && <AdminSubscriptionsInvoices />}
            {activeTab === 'payment' && (
              <div className="max-w-xl">
                <AdminSubscriptionsPaymentMethod />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
