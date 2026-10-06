// RESPONSIBILITY: Renders ManagerReportsRevenueTable's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations, useLocale } from 'next-intl';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import ManagerReportsEmptyState from '@/app/frontend_manager/manager_reports/manager_reports_components/manager_reports_table/ManagerReportsEmptyState';
import { useManagerReportsLogic } from '@/app/frontend_manager/manager_reports/manager_reports_hooks/useManagerReportsLogic';
import { ManagerReportsFormatCurrency } from '@/app/frontend_manager/manager_reports/manager_reports_utils/ManagerReportsFormatters';

/**
 * @description Renders/orchestrates the ManagerReportsRevenueTable user interface for the reports module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_reports/manager_reports_utils/ManagerReportsFormatters; @/app/frontend_manager/manager_infrastructure/ManagerEnvConfig; @/app/frontend_manager/manager_reports/manager_reports_components/manager_reports_table/ManagerReportsEmptyState; @/app/frontend_manager/manager_reports/manager_reports_hooks/useManagerReportsLogic
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */

/** @description Renders the ManagerReportsRevenueTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves empty state. */
export function ManagerReportsRevenueTable() {
  const t = useTranslations('MANAGER_REPORTS');
  const locale = useLocale();
  const formatReportCurrency = (value: number) => ManagerReportsFormatCurrency(value, ManagerEnvConfig.currencyCode, locale);

  const { summary } = useManagerReportsLogic();
  const data = summary?.revenueData ?? [];
  return (
    <div data-testid="manager_reports-managerreportsrevenuetable-region" className="w-full overflow-x-auto"role="region" aria-label={t("COPY_RESPONSIVE_REPORT_TABLE_3")}>
      <table className="w-full">
      <thead className="bg-primary-subtle">
        <tr>
          {[t('COPY_MONTH'), t('COPY_REVENUE'), t('COPY_EXPENSES'), t('COPY_NET_PROFIT')].map(h => (
            <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-5 py-3">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {(() => { if (data.length === 0) { return <tr><td colSpan={4}><ManagerReportsEmptyState /></td></tr>; } return data.map(d => (
          <tr key={d.month} className="hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base ease-in-out">
            <td className="px-5 py-3.5 text-sm font-medium text-primary">{d.month}</td>
            <td className="px-5 py-3.5 text-sm text-success font-semibold">{formatReportCurrency(d.revenue)}</td>
            <td className="px-5 py-3.5 text-sm text-danger">{formatReportCurrency(d.expenses)}</td>
            <td className={`px-5 py-3.5 text-sm font-semibold ${d.profit >= 0 ? 'text-success' : 'text-danger'}`}>{formatReportCurrency(d.profit)}</td>
          </tr>
        )); })()}
      </tbody>
      </table>
    </div>
  );
}
