"use client";
import { format } from 'date-fns';
import { formatCurrency } from '@/app/admin/admin_layout/admin_utils/AdminFormatCurrency';

// RESPONSIBILITY: Main orchestrator for the Subscriptions / Billing module — tabs for overview, plans, invoices, payment.

import { Calendar, RefreshCw, ToggleLeft, ToggleRight, Loader2 } from 'lucide-react';
import AdminSubscriptionsKPIs from '@/app/admin/subscriptions/subscriptions_components/AdminSubscriptionsKPIs/AdminSubscriptionsKPIs';
import AdminSubscriptionsPlanCards from '@/app/admin/subscriptions/subscriptions_components/AdminSubscriptionsPlanCards/AdminSubscriptionsPlanCards';
import AdminSubscriptionsInvoices from '@/app/admin/subscriptions/subscriptions_components/AdminSubscriptionsInvoices/AdminSubscriptionsInvoices';
import AdminSubscriptionsPaymentMethod from '@/app/admin/subscriptions/subscriptions_components/AdminSubscriptionsPaymentMethod/AdminSubscriptionsPaymentMethod';
import { useAdminSubscriptionsLogic } from '@/app/admin/subscriptions/subscriptions_context/useAdminSubscriptionsLogic';
import { useAdminSubscriptionsStore } from '@/app/admin/subscriptions/subscriptions_store/useAdminSubscriptionsStore';
import { PLAN_TIER_STYLES } from '@/app/admin/subscriptions/subscriptions_utils/AdminSubscriptionsSharedConstants';

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'plans',    label: 'Upgrade Plan' },
  { key: 'invoices', label: 'Invoices' },
  { key: 'payment',  label: 'Payment Methods' },
] as const;

export default function AdminSubscriptionsMain() {
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
                <Calendar size={22} className={tierStyle?.text || ''} />
              </div>
              <div>
                <p className="text-xs text-secondary uppercase tracking-wider font-semibold">Current Plan</p>
                <p className="text-xl font-bold text-primary">{subscription.planName}</p>
                <p className="text-sm text-secondary mt-0.5">
                  {formatCurrency(subscription.monthlyPrice)}/month · Renews{' '}
                  <span className="font-semibold text-primary">
                    {format(new Date(subscription.nextBillingDate), 'd MMM yyyy')}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-secondary">Auto-renew</span>
              <button
                onClick={toggleAutoRenew}
                disabled={togglingAutoRenew}
                className="min-h-11 min-w-11 flex items-center gap-1.5 text-sm font-medium motion-safe:transition-colors disabled:opacity-50 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
                aria-label="Toggle auto-renew"
              >
                {togglingAutoRenew
                  ? <Loader2 size={20} className="motion-safe:animate-spin text-primary motion-safe:duration-base" />
                  : subscription.autoRenew
                    ? <ToggleRight size={28} className="text-success" />
                    : <ToggleLeft size={28} className="text-secondary" />
                }
                <span className={subscription.autoRenew ? 'text-success' : 'text-secondary'}>
                  {togglingAutoRenew ? 'Saving...' : subscription.autoRenew ? 'On' : 'Off'}
                </span>
              </button>
            </div>
          </div>
        )}

        {status === 'pending' && (
          <div className="flex items-center justify-center py-10">
            <RefreshCw size={20} className="motion-safe:animate-spin text-primary motion-safe:duration-base" />
          </div>
        )}

        {status === 'success' && (
          <>
            {/* KPIs */}
            <AdminSubscriptionsKPIs />

            {/* Tabs */}
            <div className="flex gap-1 bg-input border border-border rounded-xl p-1 w-fit">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page px-4 py-2 rounded-lg text-sm font-medium motion-safe:transition-colors ${
                    activeTab === tab.key
                      ? 'bg-card text-primary shadow-card border border-border'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  {tab.label}
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
