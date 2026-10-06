// RESPONSIBILITY: Renders ManagerFinanceKpiCards's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { IndianRupee, Wallet, Clock, TrendingUp, Percent, ArrowLeftRight } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { ManagerFinanceKpiCard } from '@/app/frontend_manager/manager_finance/manager_finance_components/manager_finance_main/manager_finance_kpi_card/ManagerFinanceKpiCard';
import { useManagerFinanceLogic } from '@/app/frontend_manager/manager_finance/manager_finance_hooks/useManagerFinanceLogic';
import { ManagerFinanceFormatCurrency, ManagerFinanceFormatNumber } from '@/app/frontend_manager/manager_finance/manager_finance_utils/ManagerFinanceFormatters';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';



/** @description Renders the ManagerFinanceKpiCards component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerFinanceKpiCards() {
  const t = useTranslations('MANAGER_FINANCE');
  const locale = useLocale();
  const { summary } = useManagerFinanceLogic();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4">
      <ManagerFinanceKpiCard label={t("COPY_TOTAL_REVENUE")}   value={summary ? ManagerFinanceFormatCurrency(summary.totalRevenue, ManagerEnvConfig.currencyCode, locale)   : '—'} icon={<TrendingUp size={18} strokeWidth={2} className="text-success"/>} color="bg-success-bg" />
      <ManagerFinanceKpiCard label={t("COPY_MONTH")}      value={summary ? ManagerFinanceFormatCurrency(summary.monthlyRevenue, ManagerEnvConfig.currencyCode, locale) : '—'} icon={<IndianRupee size={18} strokeWidth={2} className="text-primary"/>} color="bg-primary-subtle" />
      <ManagerFinanceKpiCard label={t("COPY_TOTAL_PAYMENTS")}  value={summary ? ManagerFinanceFormatNumber(summary.totalPayments) : '—'} icon={<Wallet size={18} strokeWidth={2} className="text-info"/>} color="bg-info-bg"    />
      <ManagerFinanceKpiCard label={t("COPY_PENDING_AMOUNT")}  value={summary ? ManagerFinanceFormatCurrency(summary.pendingAmount, ManagerEnvConfig.currencyCode, locale)  : '—'} icon={<Clock size={18} strokeWidth={2} className="text-warning"/>} color="bg-warning-bg" />
      <ManagerFinanceKpiCard label={t("COPY_GST_COLLECTED")}   value={summary ? ManagerFinanceFormatCurrency(summary.gstCollected || 0, ManagerEnvConfig.currencyCode, locale) : '—'} icon={<Percent size={18} strokeWidth={2} className="text-success"/>} color="bg-success-bg" />
      <ManagerFinanceKpiCard label={t("COPY_TOTAL_REFUNDS")}   value={summary ? ManagerFinanceFormatCurrency(summary.totalRefunds || 0, ManagerEnvConfig.currencyCode, locale) : '—'} icon={<ArrowLeftRight size={18} strokeWidth={2} className="text-danger"/>} color="bg-danger-bg" />
    </div>
  );
}
