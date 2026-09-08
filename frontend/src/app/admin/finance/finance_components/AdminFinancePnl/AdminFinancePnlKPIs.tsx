// RESPONSIBILITY: Renders 4 clickable aggregate KPI cards (Total Revenue, Total Expenses,
// Net Profit, Margin %). Clicking a Profitable/Loss card filters the table below.
'use client';

import { TrendingUp, TrendingDown, IndianRupee, Percent, Building2, AlertTriangle } from 'lucide-react';
import type { BranchPnlAggregates, PnlStatusFilter } from '@/app/admin/finance/finance_types/finance_types';

interface AdminFinancePnlKPIsProps {
  aggregates: BranchPnlAggregates;
  statusFilter: PnlStatusFilter;
  onStatusFilterChange: (f: PnlStatusFilter) => void;
}

import { formatKPI } from '@/lib/formatters';

export default function AdminFinancePnlKPIs({
  aggregates,
  statusFilter,
  onStatusFilterChange,
}: AdminFinancePnlKPIsProps) {
  const kpis = [
    {
      label: 'Total Revenue',
      value: formatKPI(aggregates.totalRevenue),
      icon: IndianRupee,
      iconColor: 'text-success',
      iconBg: 'bg-success/10',
      activeBorder: 'border-success',
      filter: 'ALL' as PnlStatusFilter,
      subtext: 'All branches combined',
    },
    {
      label: 'Total Expenses',
      value: formatKPI(aggregates.totalExpenses),
      icon: TrendingDown,
      iconColor: 'text-danger',
      iconBg: 'bg-danger/10',
      activeBorder: 'border-danger',
      filter: 'ALL' as PnlStatusFilter,
      subtext: 'Operational costs',
    },
    {
      label: 'Net Profit',
      value: formatKPI(aggregates.totalNetProfit),
      icon: aggregates.totalNetProfit >= 0 ? TrendingUp : TrendingDown,
      iconColor: aggregates.totalNetProfit >= 0 ? 'text-success' : 'text-danger',
      iconBg: aggregates.totalNetProfit >= 0 ? 'bg-success/10' : 'bg-danger/10',
      activeBorder: aggregates.totalNetProfit >= 0 ? 'border-success' : 'border-danger',
      filter: 'ALL' as PnlStatusFilter,
      subtext: `${aggregates.overallMarginPct.toFixed(1)}% margin`,
    },
    {
      label: 'Profitable Branches',
      value: `${aggregates.profitableBranches}`,
      icon: Building2,
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10',
      activeBorder: 'border-primary',
      filter: 'PROFITABLE' as PnlStatusFilter,
      subtext: 'Click to filter table',
    },
    {
      label: 'Loss-making Branches',
      value: `${aggregates.lossMakingBranches}`,
      icon: AlertTriangle,
      iconColor: 'text-danger',
      iconBg: 'bg-danger/10',
      activeBorder: 'border-danger',
      filter: 'LOSS' as PnlStatusFilter,
      subtext: 'Click to filter table',
    },
    {
      label: 'Avg Profit Margin',
      value: `${aggregates.overallMarginPct.toFixed(1)}%`,
      icon: Percent,
      iconColor: 'text-warning',
      iconBg: 'bg-warning/10',
      activeBorder: 'border-warning',
      filter: 'ALL' as PnlStatusFilter,
      subtext: 'Across all branches',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpis.map((k) => {
        const isInteractive = k.filter === 'PROFITABLE' || k.filter === 'LOSS';
        const isActive = isInteractive && statusFilter === k.filter;
        return (
          <button
            key={k.label}
            onClick={() => {
              if (!isInteractive) return;
              onStatusFilterChange(isActive ? 'ALL' : k.filter);
            }}
            className={`text-left rounded-xl p-4 border-2 bg-card motion-safe:transition-all motion-safe:duration-200 ${
              isInteractive ? 'cursor-pointer hover:shadow-md hover:motion-safe:-translate-y-0.5' : 'cursor-default'
            } ${isActive ? k.activeBorder : 'border-border'}`}
            aria-pressed={isInteractive ? isActive : undefined}
            aria-label={isInteractive ? `Filter by ${k.label}` : undefined}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${k.iconBg}`}>
              <k.icon size={18} strokeWidth={2} className={k.iconColor} />
            </div>
            <p className="text-xs font-medium text-secondary uppercase tracking-wider truncate">{k.label}</p>
            <p className={`text-xl font-bold mt-0.5 ${isActive ? k.iconColor : 'text-foreground'}`}>{k.value}</p>
            <p className="text-xs text-disabled mt-0.5 truncate">{k.subtext}</p>
          </button>
        );
      })}
    </div>
  );
}
