import { Users, Building2, CreditCard, Activity, AlertCircle, Clock, CheckCircle2, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { SaaSDashboardMetrics, RevenueChartData } from '@/app/superadmin/dashboard/superadmin_dashboard_types/superadmin_dashboard_types';
import { useDateRangeSuffix } from '@/app/superadmin/superadmin_components/SuperadminShared/useDateRangeSuffix';

function formatIndianCurrency(value: number): string {
  return `₹${value.toLocaleString('en-IN')}`;
}

export function SuperadminDashboardKpiGrid({
  metrics,
  revenueChartData,
  timeMultiplier,
  mrrLabel
}: {
  metrics: SaaSDashboardMetrics;
  revenueChartData: RevenueChartData[];
  timeMultiplier: number;
  mrrLabel: string;
}) {
  const router = useRouter();
  const dateSuffix = useDateRangeSuffix();

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
      value: formatIndianCurrency(Math.round((metrics.monthlyRecurringRevenue || 0) * timeMultiplier)),
      trend: metrics.mrrDeltaPercent !== undefined
        ? `${metrics.mrrDeltaPercent > 0 ? '+' : ''}${metrics.mrrDeltaPercent}% vs last month`
        : mrrTrendStr,
      trendUp: metrics.mrrDeltaPercent !== undefined ? metrics.mrrDeltaPercent >= 0 : mrrTrendNum >= 0,
      icon: CreditCard,
      colorClass: 'text-success',
      iconBgClass: 'bg-success/10',
    },
    {
      label: 'TOTAL GYMS' + dateSuffix,
      value: String(metrics.totalGyms),
      trend: undefined,
      trendUp: true,
      icon: Building2,
      colorClass: 'text-primary',
      iconBgClass: 'bg-primary/10',
    },
    {
      label: 'ACTIVE GYMS' + dateSuffix,
      value: String(metrics.activeGyms),
      trend: undefined,
      trendUp: true,
      icon: Activity,
      colorClass: 'text-primary',
      iconBgClass: 'bg-primary/10',
    },
    {
      label: 'TOTAL END USERS' + dateSuffix,
      value: (metrics.totalEndUsers || 0).toLocaleString('en-IN'),
      trend: undefined,
      trendUp: true,
      icon: Users,
      colorClass: 'text-purple',
      iconBgClass: 'bg-purple/10',
    },
    {
      label: 'Avg. Income per Gym' + dateSuffix,
      value: formatIndianCurrency(metrics.arpu || 0),
      trend: undefined,
      trendUp: true,
      icon: DollarSign,
      colorClass: 'text-success',
      iconBgClass: 'bg-success/10',
    },
    {
      label: 'TRIAL GYMS' + dateSuffix,
      value: String(metrics.trialGyms || 0),
      trend: undefined,
      trendUp: true,
      icon: Clock,
      colorClass: 'text-warning',
      iconBgClass: 'bg-warning/10',
    },
    {
      label: 'OVERDUE INVOICES' + dateSuffix,
      value: String(metrics.overdueInvoicesCount || 0),
      trend: undefined,
      trendUp: false,
      icon: AlertCircle,
      colorClass: 'text-danger',
      iconBgClass: 'bg-danger/10',
    },
    {
      label: 'PENDING REVENUE' + dateSuffix,
      value: formatIndianCurrency(metrics.pendingRevenue || 0),
      trend: undefined,
      trendUp: true,
      icon: CreditCard,
      colorClass: 'text-warning',
      iconBgClass: 'bg-warning/10',
    },
    {
      label: 'PLATFORM HEALTH' + dateSuffix,
      value: healthDisplay,
      trend: undefined,
      trendUp: healthScore !== undefined ? healthScore >= 80 : true,
      icon: CheckCircle2,
      colorClass: healthScore !== undefined && healthScore < 80 ? 'text-warning' : 'text-success',
      iconBgClass: healthScore !== undefined && healthScore < 80 ? 'bg-warning/10' : 'bg-success/10',
    },
    {
      label: 'TRIALS EXPIRING (7D)',
      value: String(metrics.trialsExpiringIn7Days || 0),
      trend: undefined,
      trendUp: false,
      icon: AlertCircle,
      colorClass: 'text-warning',
      iconBgClass: 'bg-warning/10',
      onClick: () => router.push('/superadmin/churn-alerts')
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {kpiCards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            onClick={card.onClick}
            className={`relative overflow-hidden bg-card border border-border rounded-xl p-6 shadow-sm motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg motion-safe:transition-all motion-safe:duration-200 bg-gradient-to-b from-yellow-400/10 to-transparent ${card.onClick ? 'cursor-pointer' : ''}`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-secondary font-medium text-xs uppercase tracking-wider">{card.label}</span>
              <div className={`w-8 h-8 rounded-lg ${card.iconBgClass} flex items-center justify-center`}>
                <Icon size={18} className={card.colorClass} />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground">{card.value}</div>
            {card.trend && (
              <p className={`text-xs mt-2 font-medium ${card.trendUp ? 'text-success' : 'text-danger'}`}>
                {card.trendUp ? '↑' : '↓'} {card.trend}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
