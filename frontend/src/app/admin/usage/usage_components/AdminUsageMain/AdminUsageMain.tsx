"use client";
// RESPONSIBILITY: Main entry point for Admin Usage & Subscription page. Composes metric cards and plan cards.

import { useRef } from 'react';
import { RefreshCw, Calendar, CreditCard } from 'lucide-react';
import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import AdminUsageMetricCard from '@/app/admin/usage/usage_components/AdminUsageMetricCard/AdminUsageMetricCard';
import AdminUsagePlanCard from '@/app/admin/usage/usage_components/AdminUsagePlanCard/AdminUsagePlanCard';
import { useAdminUsageLogic } from '@/app/admin/usage/usage_context/useAdminUsageLogic';
import { formatCurrency } from '@/lib/formatters';

export default function AdminUsageMain() {
  const { data, metrics, refresh, status } = useAdminUsageLogic();
  const planCardRef = useRef<HTMLDivElement>(null);

  const handleUpgrade = () => {
    planCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-full pb-10 bg-background text-foreground">
      <AdminHeader
        title="Usage & Subscription"
        subtitle="Monitor your plan limits and manage your subscription"
      />
      <div className="p-6 space-y-6">
        {status === 'pending' && !data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" aria-label="Loading usage data">
            {['usage-1','usage-2','usage-3','usage-4','usage-5','usage-6'].map((skeletonId) => <div key={skeletonId} className="h-28 rounded-xl bg-skeleton-base motion-safe:animate-pulse" />)}
          </div>
        ) : null}

        {/* Current Plan Banner */}
        <div className="bg-card rounded-xl border border-primary/30 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-xl">
              <CreditCard size={22} className="text-primary" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs text-secondary uppercase tracking-wider font-semibold">Current Plan</p>
              <p className="text-xl font-bold text-foreground">{data?.planName}</p>
              <p className="text-sm text-secondary mt-0.5">{formatCurrency(data?.monthlyPrice || 0)} / month</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-secondary">
              <Calendar size={15} className="text-warning" />
              <span>Renews <span className="font-semibold text-foreground">{data?.billingCycleEnd ? new Date(data.billingCycleEnd).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}</span></span>
            </div>
            <button
              onClick={() => void refresh()}
              disabled={status === 'pending'}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-medium text-secondary hover:text-foreground hover:bg-input motion-safe:transition-all motion-safe:duration-200 motion-safe:active:scale-95 disabled:opacity-50"
            >
              <RefreshCw size={14} className={status === 'pending' ? 'motion-safe:animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>

        {/* Usage Metrics Grid */}
        <div>
          <h2 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Resource Usage</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {metrics.map((m) => (
              <AdminUsageMetricCard key={m.label} metric={m} onUpgrade={handleUpgrade} />
            ))}
          </div>
        </div>

        {/* Plan Comparison */}
        <div ref={planCardRef}>
          <AdminUsagePlanCard />
        </div>
      </div>
    </div>
  );
}