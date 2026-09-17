// RESPONSIBILITY: Renders the Manager FinanceKpiCards presentation layer for the Manager module.
import React from 'react';
import { IndianRupee, Wallet, Clock, TrendingUp, Percent, ArrowLeftRight } from 'lucide-react';
import { useFinanceContext } from '@/app/manager/finance/finance_context/ManagerFinanceContext';
import { formatCurrency, formatNumber } from '@/lib/formatters';

function KPICard({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4 motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-1 hover:shadow-lg">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>{icon}</div>
      <div>
        <p className="text-xs font-medium text-secondary uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-foreground mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export default function ManagerFinanceKpiCards() {
  const { summary } = useFinanceContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4">
      <KPICard label="Total Revenue"   value={summary ? formatCurrency(summary.totalRevenue)   : '—'} icon={<TrendingUp  size={20} className="text-success" />} color="bg-success/10" />
      <KPICard label="This Month"      value={summary ? formatCurrency(summary.monthlyRevenue) : '—'} icon={<IndianRupee size={20} className="text-primary" />} color="bg-primary/10" />
      <KPICard label="Total Payments"  value={summary ? formatNumber(summary.totalPayments) : '—'} icon={<Wallet  size={20} className="text-info"    />} color="bg-info/10"    />
      <KPICard label="Pending Amount"  value={summary ? formatCurrency(summary.pendingAmount)  : '—'} icon={<Clock      size={20} className="text-warning" />} color="bg-warning/10" />
      <KPICard label="GST Collected"   value={summary ? formatCurrency(summary.gstCollected || 0) : '—'} icon={<Percent    size={20} className="text-success" />} color="bg-success/10" />
      <KPICard label="Total Refunds"   value={summary ? formatCurrency(summary.totalRefunds || 0) : '—'} icon={<ArrowLeftRight size={20} className="text-danger" />} color="bg-danger/10" />
    </div>
  );
}
