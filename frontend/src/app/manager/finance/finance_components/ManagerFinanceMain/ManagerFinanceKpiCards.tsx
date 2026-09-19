import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
// RESPONSIBILITY: Renders the Manager FinanceKpiCards presentation layer for the Manager module.
import { IndianRupee, Wallet, Clock, TrendingUp, Percent, ArrowLeftRight } from 'lucide-react';
import { useManagerFinanceLogic } from '@/app/manager/finance/finance_hooks/ManagerUseManagerFinanceLogic';
import { formatCurrencyFromMinorUnits, formatNumber } from '@/lib/formatters';
import { ManagerFinanceKpiCard } from '@/app/manager/finance/finance_components/ManagerFinanceMain/ManagerFinanceKpiCard/ManagerFinanceKpiCard';


export default function ManagerFinanceKpiCards() {
  const { summary } = useManagerFinanceLogic();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4">
      <ManagerFinanceKpiCard label="Total Revenue"   value={summary ? formatCurrencyFromMinorUnits(summary.totalRevenue, ManagerEnvConfig.currencyCode)   : '—'} icon={<TrendingUp  size={18} className="text-success" />} color="bg-success/10" />
      <ManagerFinanceKpiCard label="This Month"      value={summary ? formatCurrencyFromMinorUnits(summary.monthlyRevenue, ManagerEnvConfig.currencyCode) : '—'} icon={<IndianRupee size={18} className="text-primary" />} color="bg-primary/10" />
      <ManagerFinanceKpiCard label="Total Payments"  value={summary ? formatNumber(summary.totalPayments) : '—'} icon={<Wallet  size={18} className="text-info"    />} color="bg-info/10"    />
      <ManagerFinanceKpiCard label="Pending Amount"  value={summary ? formatCurrencyFromMinorUnits(summary.pendingAmount, ManagerEnvConfig.currencyCode)  : '—'} icon={<Clock      size={18} className="text-warning" />} color="bg-warning/10" />
      <ManagerFinanceKpiCard label="GST Collected"   value={summary ? formatCurrencyFromMinorUnits(summary.gstCollected || 0, ManagerEnvConfig.currencyCode) : '—'} icon={<Percent    size={18} className="text-success" />} color="bg-success/10" />
      <ManagerFinanceKpiCard label="Total Refunds"   value={summary ? formatCurrencyFromMinorUnits(summary.totalRefunds || 0, ManagerEnvConfig.currencyCode) : '—'} icon={<ArrowLeftRight size={18} className="text-danger" />} color="bg-danger/10" />
    </div>
  );
}
