// RESPONSIBILITY: Renders ManagerExpensesKPIs's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { IndianRupee, TrendingDown, Clock, CheckCircle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useExpensesStatsQuery } from '@/app/frontend_manager/manager_expenses/manager_expenses_hooks/useManagerExpensesQueries';
import { ManagerExpensesFormatCurrency } from '@/app/frontend_manager/manager_expenses/manager_expenses_utils/ManagerExpensesFormatters';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';


/** @description Renders the ManagerExpensesKPIs component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves error state. */
export default function ManagerExpensesKPIs() {
  const t = useTranslations('MANAGER_EXPENSES');
  const locale = useLocale();

  const { data: stats, isPending, isError } = useExpensesStatsQuery();

  if (isPending || isError || !stats) return null; // Let Suspense/Main handle it

  const KPI_CARDS = [
    { label: t("COPY_TOTAL_EXPENSES_ALL_TIME"), value: ManagerExpensesFormatCurrency(stats.totalAmount, ManagerEnvConfig.currencyCode, locale), icon: IndianRupee, color: 'text-primary', bg: "bg-primary-subtle" },
    { label: t("COPY_EXPENSES_MONTH"), value: ManagerExpensesFormatCurrency(stats.thisMonthAmount, ManagerEnvConfig.currencyCode, locale), icon: TrendingDown, color: 'text-info', bg: 'bg-info-bg' },
    { label: t("COPY_PENDING_DUES"), value: ManagerExpensesFormatCurrency(stats.pendingAmount, ManagerEnvConfig.currencyCode, locale), icon: Clock, color: 'text-danger', bg: 'bg-danger-bg' },
    { label: t("COPY_TOTAL_PAID"), value: ManagerExpensesFormatCurrency(stats.paidAmount, ManagerEnvConfig.currencyCode, locale), icon: CheckCircle, color: 'text-success', bg: 'bg-success-bg' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {KPI_CARDS.map(kpi => (
        <div key={kpi.label} className="bg-card border border-border p-5 rounded-xl shadow-card hover:shadow-card motion-safe:transition-all flex items-center gap-4 group motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
          <div className={[`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${kpi.bg} ${kpi.color} group-motion-safe:hover:scale-110 motion-safe:transition-all`, "motion-safe:duration-base ease-in-out"].filter(Boolean).join(' ')}>
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
