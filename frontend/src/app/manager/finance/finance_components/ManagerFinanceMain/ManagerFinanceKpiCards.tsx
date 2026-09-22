// RESPONSIBILITY: Renders the Manager FinanceKpiCards presentation layer for the Manager module.
import { IndianRupee, Wallet, Clock, TrendingUp, Percent, ArrowLeftRight } from 'lucide-react';
import { formatCurrency } from '@/app/manager/manager_layout/manager_utils/ManagerFormatCurrency';
import { formatNumber } from '@/lib/formatters';
import { ManagerFinanceKpiCard } from '@/app/manager/finance/finance_components/ManagerFinanceMain/ManagerFinanceKpiCard/ManagerFinanceKpiCard';
import { useManagerFinanceLogic } from '@/app/manager/finance/finance_hooks/ManagerUseManagerFinanceLogic';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { useLocale } from "next-intl";

export default function ManagerFinanceKpiCards() {
    const locale = useLocale();
  const { summary } = useManagerFinanceLogic();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4">
      <ManagerFinanceKpiCard label="Total Revenue"   value={summary ? formatCurrency(summary.totalRevenue, ManagerEnvConfig.currencyCode, locale)   : '—'} icon={<TrendingUp  size={18} className="text-success" />} color="bg-success-bg" />
      <ManagerFinanceKpiCard label="This Month"      value={summary ? formatCurrency(summary.monthlyRevenue, ManagerEnvConfig.currencyCode, locale) : '—'} icon={<IndianRupee size={18} className="text-primary" />} color="bg-primary-subtle" />
      <ManagerFinanceKpiCard label="Total Payments"  value={summary ? formatNumber(summary.totalPayments) : '—'} icon={<Wallet  size={18} className="text-info"    />} color="bg-info-bg"    />
      <ManagerFinanceKpiCard label="Pending Amount"  value={summary ? formatCurrency(summary.pendingAmount, ManagerEnvConfig.currencyCode, locale)  : '—'} icon={<Clock      size={18} className="text-warning" />} color="bg-warning-bg" />
      <ManagerFinanceKpiCard label="GST Collected"   value={summary ? formatCurrency(summary.gstCollected || 0, ManagerEnvConfig.currencyCode, locale) : '—'} icon={<Percent    size={18} className="text-success" />} color="bg-success-bg" />
      <ManagerFinanceKpiCard label="Total Refunds"   value={summary ? formatCurrency(summary.totalRefunds || 0, ManagerEnvConfig.currencyCode, locale) : '—'} icon={<ArrowLeftRight size={18} className="text-danger" />} color="bg-danger-bg" />
    </div>
  );
}
