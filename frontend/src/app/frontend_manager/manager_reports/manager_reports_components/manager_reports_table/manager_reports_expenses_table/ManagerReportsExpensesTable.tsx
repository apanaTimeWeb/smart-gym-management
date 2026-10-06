// RESPONSIBILITY: Renders ManagerReportsExpensesTable's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations, useLocale } from 'next-intl';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import ManagerReportsEmptyState from '@/app/frontend_manager/manager_reports/manager_reports_components/manager_reports_table/ManagerReportsEmptyState';
import { EXPENSE_CATEGORY_STYLES } from '@/app/frontend_manager/manager_reports/manager_reports_constants/ManagerReportsSharedConstants';
import { useManagerReportsLogic } from '@/app/frontend_manager/manager_reports/manager_reports_hooks/useManagerReportsLogic';
import { ManagerReportsFormatCurrency } from '@/app/frontend_manager/manager_reports/manager_reports_utils/ManagerReportsFormatters';

/**
 * @description Renders/orchestrates the ManagerReportsExpensesTable user interface for the reports module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_reports/manager_reports_utils/ManagerReportsFormatters; @/app/frontend_manager/manager_infrastructure/ManagerEnvConfig; @/app/frontend_manager/manager_reports/manager_reports_components/manager_reports_table/ManagerReportsEmptyState; @/app/frontend_manager/manager_reports/manager_reports_hooks/useManagerReportsLogic; @/app/frontend_manager/manager_reports/manager_reports_constants/ManagerReportsSharedConstants
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */

/** @description Renders the ManagerReportsExpensesTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves empty state. */
export function ManagerReportsExpensesTable() {
  const t = useTranslations('MANAGER_REPORTS');
  const locale = useLocale();
  const formatReportCurrency = (value: number) => ManagerReportsFormatCurrency(value, ManagerEnvConfig.currencyCode, locale);

  const { summary } = useManagerReportsLogic();
  const data = summary?.expenseBreakdown ?? [];
  return (
    <div data-testid="manager_reports-managerreportsexpensestable-region" className="w-full overflow-x-auto"role="region" aria-label={t("COPY_RESPONSIVE_REPORT_TABLE_1")}>
      <table className="w-full">
      <thead className="bg-primary-subtle">
        <tr>
          {[t('COPY_CATEGORY'), t('COPY_AMOUNT'), t('COPY_SHARE')].map(h => (
            <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-5 py-3">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {data.length === 0 ? <tr><td colSpan={3}><ManagerReportsEmptyState /></td></tr> : data.map((d, __testIdIndex0) => {
          const style = EXPENSE_CATEGORY_STYLES[d.category] ?? { bg: 'bg-input', text: 'text-secondary' };
          return (
            <tr key={d.category} className="hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base ease-in-out">
              <td className="px-5 py-3.5">
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${style.bg} ${style.text}`}>{d.category}</span>
              </td>
              <td className="px-5 py-3.5 text-sm font-semibold text-primary">{formatReportCurrency(d.amount)}</td>
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-input rounded-full overflow-hidden max-w-32">
                    <progress data-testid={`manager_reports-manager-reports-expenses-table-button-close-${__testIdIndex0}`} value={d.percentage} max={100} aria-label={t("COPY_EXPENSE_PERCENTAGE")} className="h-full w-full overflow-hidden rounded-full bg-primary-subtle" />
                  </div>
                  <span className="text-xs text-secondary">{d.percentage}%</span>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
      </table>
    </div>
  );
}
