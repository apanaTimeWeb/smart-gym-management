// RESPONSIBILITY: Renders the route-specific Superadmin-only Gym 360 workspace with switchable tenant detail sections.
'use client';
import { useState } from 'react';
import { Activity, LifeBuoy, ShieldCheck } from 'lucide-react';
import { displayValue, formatCurrency, formatDateTime, formatNumber } from '@/lib/formatters';
import SuperadminV1MetricCard from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1MetricCard';
import SuperadminV1Panel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1Panel';
import { useSuperadminGymDetailV1 } from '@/app/superadmin/gyms/gyms_utils/useSuperadminGymDetailV1';
import type { SuperadminGymDetailV1ClientProps, SuperadminGymDetailV1Tab } from '@/app/superadmin/gyms/gyms_types/SuperadminGymDetailV1Types';
export default function SuperadminGymDetailV1Client({ gymId }: SuperadminGymDetailV1ClientProps) {
    const query = useSuperadminGymDetailV1(gymId);
    const [activeTab, setActiveTab] = useState<SuperadminGymDetailV1Tab>('Overview');
    if (query.isPending) {
        return (<div className="space-y-4" aria-busy="true">
        <div className="h-28 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
        <div className="h-80 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
        <div className="h-64 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/>
      </div>);
    }
    if (query.isError || !query.data?.data) {
        return (<div className="rounded-xl border border-danger/30 bg-danger-bg p-5" role="alert">
        <p className="font-semibold text-danger">Gym business details could not be loaded.</p>
        <button type="button" onClick={() => query.refetch()} className="mt-3 rounded-md border border-border px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95">
          Retry
        </button>
      </div>);
    }
    const data = query.data.data;
    function renderTabContent() {
        switch (activeTab) {
            case 'Subscription':
                return (<SuperadminV1Panel title="Subscription" description="Current plan, dates, and commercial terms.">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-border p-3">
                <p className="text-xs text-secondary">Plan</p>
                <p className="mt-1 font-medium text-foreground">{displayValue(data.subscription.plan)}</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-xs text-secondary">Started</p>
                <p className="mt-1 font-medium text-foreground">{displayValue(formatDateTime(data.subscription.started))}</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-xs text-secondary">Next renewal</p>
                <p className="mt-1 font-medium text-foreground">{displayValue(formatDateTime(data.subscription.renewal))}</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-xs text-secondary">Monthly income</p>
                <p className="mt-1 font-medium text-foreground">{formatCurrency(data.subscription.monthlyIncome)}</p>
              </div>
            </div>
          </SuperadminV1Panel>);
            case 'Billing':
                return (<SuperadminV1Panel title="Billing" description="Payment timing and current billing issues.">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-border p-3"><p className="text-xs text-secondary">Next payment</p><p className="mt-1 font-medium text-foreground">{displayValue(formatDateTime(data.billing.nextPayment))}</p></div>
              <div className="rounded-lg border border-border p-3"><p className="text-xs text-secondary">Failed payments</p><p className="mt-1 font-medium text-danger">{formatNumber(data.billing.failedPayments)}</p></div>
              <div className="rounded-lg border border-border p-3"><p className="text-xs text-secondary">Discount</p><p className="mt-1 font-medium text-foreground">{displayValue(data.billing.discount)}</p></div>
              <div className="rounded-lg border border-border p-3"><p className="text-xs text-secondary">Monthly income</p><p className="mt-1 font-medium text-foreground">{formatCurrency(data.billing.monthlyIncome)}</p></div>
            </div>
          </SuperadminV1Panel>);
            case 'Usage':
                return (<SuperadminV1Panel title="Usage" description="Current resource use against the gym plan limits.">
            <div className="space-y-4">
              {data.usage.map((item) => (<div key={item.label}>
                  <div className="mb-1 flex justify-between gap-3 text-xs">
                    <span className="truncate text-secondary">{displayValue(item.label)}</span>
                    <span className="text-foreground">{formatNumber(item.used)} / {formatNumber(item.limit)} ({formatNumber(item.percent)}%)</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-input">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(item.percent, 100)}%` }}/>
                  </div>
                </div>))}
            </div>
          </SuperadminV1Panel>);
            case 'Health':
                return (<SuperadminV1Panel title="Health" description="One view of engagement, member movement, billing risk, and support pressure.">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <SuperadminV1MetricCard label="Health score" value={`${formatNumber(data.health.score)}/100`} helper="Combined tenant signal" tone={data.health.score >= 80 ? 'success' : 'warning'}/>
              <SuperadminV1MetricCard label="Member trend" value={`${formatNumber(data.health.memberTrend)}%`} helper="Recent member change"/>
              <SuperadminV1MetricCard label="Login trend" value={`${formatNumber(data.health.loginTrend)}%`} helper="Recent sign-in change" tone="warning"/>
              <SuperadminV1MetricCard label="Payment failures" value={formatNumber(data.health.paymentFailures)} helper="Open billing issue" tone="danger"/>
              <SuperadminV1MetricCard label="Open tickets" value={formatNumber(data.health.openTickets)} helper="Support queue" tone="info"/>
            </div>
          </SuperadminV1Panel>);
            case 'Activity':
                return (<SuperadminV1Panel title="Recent activity" description="Recent events that help explain a sudden health or usage change.">
            <div className="space-y-3">
              {data.activity.map((event) => (<div key={`${event.date}-${event.event}`} className="flex gap-3 rounded-lg border border-border p-3">
                  <Activity size={18} strokeWidth={2} className="mt-0.5 text-primary" aria-hidden="true"/>
                  <div className="min-w-0">
                    <p className="truncate text-sm text-foreground">{displayValue(event.event)}</p>
                    <p className="text-xs text-secondary">{displayValue(formatDateTime(event.date))}</p>
                  </div>
                </div>))}
            </div>
          </SuperadminV1Panel>);
            case 'Support':
                return (<SuperadminV1Panel title="Support" description="Support workload and service quality for this tenant.">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <SuperadminV1MetricCard label="Open tickets" value={formatNumber(data.support.openTickets)} helper="Current queue" tone="info"/>
              <SuperadminV1MetricCard label="Response time" value={`${formatNumber(data.support.averageResponseHours)} hours`} helper="Average first response"/>
              <SuperadminV1MetricCard label="Satisfaction" value={`${formatNumber(data.support.satisfaction)}%`} helper="Recent resolved tickets" tone="success"/>
            </div>
          </SuperadminV1Panel>);
            case 'Overview':
            default:
                return (<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <SuperadminV1Panel title="Tenant health" description="A combined view of the tenant signals that matter to platform operations.">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <SuperadminV1MetricCard label="Health score" value={`${formatNumber(data.health.score)}/100`} helper="Combined signal" tone="success"/>
                <SuperadminV1MetricCard label="Monthly income" value={formatCurrency(data.subscription.monthlyIncome)} helper="Current recurring income"/>
                <SuperadminV1MetricCard label="Open tickets" value={formatNumber(data.health.openTickets)} helper="Support queue" tone="info"/>
              </div>
            </SuperadminV1Panel>
            <SuperadminV1Panel title="Key account facts" description="The basic commercial and operational snapshot.">
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <ShieldCheck size={18} strokeWidth={2} className="text-success" aria-hidden="true"/>
                  <span className="text-sm text-foreground">
                    Plan: {displayValue(data.subscription.plan)}
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <LifeBuoy size={18} strokeWidth={2} className="text-info" aria-hidden="true"/>
                  <span className="text-sm text-foreground">
                    Support satisfaction: {formatNumber(data.support.satisfaction)}%
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <Activity size={18} strokeWidth={2} className="text-primary" aria-hidden="true"/>
                  <span className="text-sm text-foreground">
                    Latest activity: {displayValue(formatDateTime(data.activity[0]?.date ?? data.subscription.renewal))}
                  </span>
                </div>
              </div>
            </SuperadminV1Panel>
          </div>);
        }
    }
    return (<section className="mt-8 space-y-6">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Gym detail sections">
        {data.tabs.map((tab) => (<button key={tab} type="button" role="tab" aria-selected={activeTab === tab} onClick={() => setActiveTab(tab)} className={`rounded-full border px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 ${activeTab === tab ? 'border-primary bg-primary-subtle text-primary' : 'border-border text-secondary hover:text-foreground'}`}>
            {tab}
          </button>))}
      </div>
      {renderTabContent()}
    </section>);
}
