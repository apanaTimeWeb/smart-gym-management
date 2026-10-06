// RESPONSIBILITY: Renders ManagerFinanceRevenueChart's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ManagerFinanceMethodBreakdown } from '@/app/frontend_manager/manager_finance/manager_finance_components/manager_finance_main/manager_finance_method_breakdown/ManagerFinanceMethodBreakdown';
import { ManagerFinanceRevenueExpenseChart } from '@/app/frontend_manager/manager_finance/manager_finance_components/manager_finance_main/manager_finance_revenue_expense_chart/ManagerFinanceRevenueExpenseChart';
import { useManagerFinanceLogic } from '@/app/frontend_manager/manager_finance/manager_finance_hooks/useManagerFinanceLogic';

/**
 * @description Renders/orchestrates the ManagerFinanceRevenueChart user interface for the finance module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_finance/manager_finance_components/manager_finance_main/manager_finance_method_breakdown/ManagerFinanceMethodBreakdown; @/app/frontend_manager/manager_finance/manager_finance_components/manager_finance_main/manager_finance_revenue_expense_chart/ManagerFinanceRevenueExpenseChart; @/app/frontend_manager/manager_finance/manager_finance_hooks/useManagerFinanceLogic
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="h-64 rounded-xl bg-card motion-safe:animate-pulse motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1" aria-hidden="true" /> });




/** @description Renders the ManagerFinanceRevenueChart component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves loading state. */
export default function ManagerFinanceRevenueChart() {
  const { summary } = useManagerFinanceLogic();

  if (!summary) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin text-primary"/>
      </div>
    );
  }

  return (
    <>
      <ManagerFinanceRevenueExpenseChart data={summary.monthlyData ?? []} />
      <ManagerFinanceMethodBreakdown data={summary.revenueByMethod} />
    </>
  );
}
