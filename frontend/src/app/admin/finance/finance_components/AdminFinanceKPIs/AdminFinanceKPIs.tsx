"use client";

// RESPONSIBILITY: Displays read-only Finance KPIs and exposes only the meaningful Pending Amount status filter.
import { useAdminFinanceLogic } from '@/app/admin/finance/finance_context/useAdminFinanceLogic';
import { FileText, TrendingUp, IndianRupee, CreditCard } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';

export default function AdminFinanceKPIs() {
  const { summary, statusFilter, setStatusFilter } = useAdminFinanceLogic();
  if (!summary) return null;

  const kpis = [
    { label: 'Total Revenue', value: formatCurrency(summary.totalRevenue), icon: TrendingUp, colorClass: 'text-success', bgClass: 'bg-success-bg', activeBorder: 'border-success' },
    { label: 'Monthly Revenue', value: formatCurrency(summary.monthlyRevenue), icon: IndianRupee, colorClass: 'text-primary', bgClass: 'bg-primary-subtle', activeBorder: 'border-primary' },
    { label: 'Pending Amount', value: formatCurrency(summary.pendingAmount), icon: FileText, colorClass: 'text-warning', bgClass: 'bg-warning-bg', activeBorder: 'border-warning', filter: 'DUE' },
    { label: 'Total Expenses', value: formatCurrency(summary.totalExpenses), icon: CreditCard, colorClass: 'text-danger', bgClass: 'bg-danger-bg', activeBorder: 'border-danger' },
    { label: 'Net Profit', value: formatCurrency(summary.netProfit), icon: TrendingUp, colorClass: 'text-success', bgClass: 'bg-success-bg', activeBorder: 'border-success' },
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
      {kpis.map((kpi) => {
        const isPendingFilter = 'filter' in kpi;
        const isActive = isPendingFilter && statusFilter === kpi.filter;
        const content = (
          <>
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${kpi.bgClass}`}><kpi.icon size={19} className={kpi.colorClass} /></div>
            <div className="min-w-0"><p className="truncate text-xs font-medium text-secondary">{kpi.label}</p><p className={`truncate text-lg font-bold ${isActive ? kpi.colorClass : 'text-primary'}`}>{kpi.value}</p></div>
          </>
        );
        const className = `flex items-center gap-3 rounded-xl border-2 bg-card p-4 text-left shadow-card motion-safe:transition-all ${isActive ? kpi.activeBorder : 'border-border'} ${isPendingFilter ? 'hover:shadow-card' : ''}`;
        return isPendingFilter ? (
          <button key={kpi.label} type="button" className={className} aria-pressed={isActive} onClick={() => setStatusFilter(isActive ? 'All' : kpi.filter)}>{content}</button>
        ) : <div key={kpi.label} className={className}>{content}</div>;
      })}
    </div>
  );
}
