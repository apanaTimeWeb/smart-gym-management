// RESPONSIBILITY: Renders the Dashboard KPI cards. No API calls.
'use client';
import { Users, Building2, CreditCard, Activity, AlertCircle, Clock, CheckCircle2, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { SuperadminDashboardKpiGridProps } from '@/app/superadmin/dashboard/superadmin_dashboard_types/superadmin_dashboard_types';
import { useSuperadminDashboardDateRangeSuffix } from '@/app/superadmin/dashboard/dashboard_components/SuperadminDashboardView/useSuperadminDashboardDateRangeSuffix';
import { DashboardUrlConfig } from '@/app/superadmin/dashboard/superadmin_dashboard_url_config';
import { formatCurrency, formatNumber } from '@/lib/formatters';
export function SuperadminDashboardKpiGrid({ metrics, revenueChartData, timeMultiplier, mrrLabel }: SuperadminDashboardKpiGridProps) {
    const router = useRouter();
    const dateSuffix = useSuperadminDashboardDateRangeSuffix();
    const lastTwoMonths = revenueChartData.length >= 2 ? revenueChartData.slice(-2) : [];
    const mrrTrendNum = lastTwoMonths.length === 2 && lastTwoMonths[0]!.mrr > 0
        ? Math.round(((lastTwoMonths[1]!.mrr - lastTwoMonths[0]!.mrr) / lastTwoMonths[0]!.mrr) * 100)
        : 0;
    const mrrTrendStr = mrrTrendNum ? `${mrrTrendNum > 0 ? '+' : ''}${mrrTrendNum}% vs last month` : undefined;
    const healthScore = metrics.platformHealthScore;
    const healthDisplay = healthScore !== undefined ? `${healthScore}/100` : '—';
    const kpiCards = [
        {
            label: mrrLabel + dateSuffix,
            value: formatCurrency(Math.round((metrics.monthlyRecurringRevenue || 0) * timeMultiplier)),
            trend: metrics.mrrDeltaPercent !== undefined
                ? `${metrics.mrrDeltaPercent > 0 ? '+' : ''}${metrics.mrrDeltaPercent}% vs last month`
                : mrrTrendStr,
            trendUp: metrics.mrrDeltaPercent !== undefined ? metrics.mrrDeltaPercent >= 0 : mrrTrendNum >= 0,
            icon: CreditCard,
            colorClass: 'text-success',
            iconBgClass: 'bg-success-bg',
        },
        {
            label: 'TOTAL GYMS',
            value: String(metrics.totalGyms),
            trend: undefined,
            trendUp: true,
            icon: Building2,
            colorClass: 'text-primary',
            iconBgClass: 'bg-primary-subtle',
        },
        {
            label: 'ACTIVE GYMS',
            value: String(metrics.activeGyms),
            trend: undefined,
            trendUp: true,
            icon: Activity,
            colorClass: 'text-primary',
            iconBgClass: 'bg-primary-subtle',
        },
        {
            label: 'TOTAL END USERS',
            value: formatNumber(metrics.totalEndUsers || 0),
            trend: undefined,
            trendUp: true,
            icon: Users,
            colorClass: 'text-purple',
            iconBgClass: 'bg-purple-bg',
        },
        {
            label: 'Avg. Income per Gym',
            value: formatCurrency(metrics.arpu || 0),
            trend: undefined,
            trendUp: true,
            icon: DollarSign,
            colorClass: 'text-success',
            iconBgClass: 'bg-success-bg',
        },
        {
            label: 'TRIAL GYMS',
            value: String(metrics.trialGyms || 0),
            trend: undefined,
            trendUp: true,
            icon: Clock,
            colorClass: 'text-warning',
            iconBgClass: 'bg-warning-bg',
        },
        {
            label: 'OVERDUE INVOICES',
            value: String(metrics.overdueInvoicesCount || 0),
            trend: undefined,
            trendUp: false,
            icon: AlertCircle,
            colorClass: 'text-danger',
            iconBgClass: 'bg-danger-bg',
        },
        {
            label: 'PENDING REVENUE',
            value: formatCurrency(metrics.pendingRevenue || 0),
            trend: undefined,
            trendUp: true,
            icon: CreditCard,
            colorClass: 'text-warning',
            iconBgClass: 'bg-warning-bg',
        },
        {
            label: 'PLATFORM HEALTH',
            value: healthDisplay,
            trend: undefined,
            trendUp: healthScore !== undefined ? healthScore >= 80 : true,
            icon: CheckCircle2,
            colorClass: healthScore !== undefined && healthScore < 80 ? 'text-warning' : 'text-success',
            iconBgClass: healthScore !== undefined && healthScore < 80 ? 'bg-warning-bg' : 'bg-success-bg',
        },
        {
            label: 'TRIALS EXPIRING (7D)',
            value: String(metrics.trialsExpiringIn7Days || 0),
            trend: undefined,
            trendUp: false,
            icon: AlertCircle,
            colorClass: 'text-warning',
            iconBgClass: 'bg-warning-bg',
            onClick: () => router.push(DashboardUrlConfig.PAGES.CANCELLATIONS)
        },
    ];
    return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {kpiCards.map((card) => {
            const Icon = card.icon;
            return (<div key={card.label} onClick={card.onClick} className={`relative overflow-hidden bg-card border border-border rounded-xl p-6 shadow-sm motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg motion-safe:transition-all motion-safe:duration-base bg-gradient-to-b from-primary-subtle to-transparent ${card.onClick ? 'cursor-pointer' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-secondary font-medium text-xs uppercase tracking-wider">{card.label}</span>
                <Icon className={`w-5 h-5 ${card.colorClass}`}/>
            </div>
            <div className="text-3xl font-bold text-foreground">{card.value}</div>
            {card.trend && (<p className={`text-xs mt-2 font-medium ${card.trendUp ? 'text-success' : 'text-danger'}`}>
                {card.trendUp ? '↑' : '↓'} {card.trend}
              </p>)}
          </div>);
        })}
    </div>);
}
