// RESPONSIBILITY: Renders high-level KPIs for the Expenses module.
'use client';
import { IndianRupee, TrendingDown, Clock, CheckCircle } from 'lucide-react';
import { formatCurrency } from '@/app/manager/manager_layout/manager_utils/ManagerFormatCurrency';

import { useExpensesStatsQuery } from '@/app/manager/expenses/expenses_hooks/ManagerUseManagerExpensesQueries';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { useLocale } from "next-intl";

export default function ManagerExpensesKPIs() {
    const locale = useLocale();
  const { data: stats, isPending, isError } = useExpensesStatsQuery();

  if (isPending || isError || !stats) return null; // Let Suspense/Main handle it

  const KPI_CARDS = [
    { label: 'Total Expenses (All Time)', value: formatCurrency(stats.totalAmount, ManagerEnvConfig.currencyCode, locale), icon: IndianRupee, color: 'text-primary', bg: "bg-primary-subtle" },
    { label: 'Expenses This Month', value: formatCurrency(stats.thisMonthAmount, ManagerEnvConfig.currencyCode, locale), icon: TrendingDown, color: 'text-info', bg: 'bg-info-bg' },
    { label: 'Pending Dues', value: formatCurrency(stats.pendingAmount, ManagerEnvConfig.currencyCode, locale), icon: Clock, color: 'text-danger', bg: 'bg-danger-bg' },
    { label: 'Total Paid', value: formatCurrency(stats.paidAmount, ManagerEnvConfig.currencyCode, locale), icon: CheckCircle, color: 'text-success', bg: 'bg-success-bg' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {KPI_CARDS.map(kpi => (
        <div key={kpi.label} className="bg-card border border-border p-5 rounded-xl shadow-card hover:shadow-card motion-safe:transition-shadow flex items-center gap-4 group">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${kpi.bg} ${kpi.color} group-motion-safe:hover:scale-110 motion-safe:transition-transform`}>
            <kpi.icon size={18} />
          </div>
          <div>
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1">{kpi.label}</p>
            <p className="text-xl font-bold text-primary">{kpi.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
