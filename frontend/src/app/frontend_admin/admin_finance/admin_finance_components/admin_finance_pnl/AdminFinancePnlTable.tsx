"use client";
// RESPONSIBILITY: Renders the sortable branch-wise P&L comparison table with
import { useLocale, useTranslations } from 'next-intl';
// clickable row expansion. Handles sorting indicators and inline breakdown toggle.

import { ChevronRight } from 'lucide-react';
import { PNL_TABLE_HEADERS, PNL_STATUS_CONFIG } from '@/app/frontend_admin/admin_finance/admin_finance_constants/AdminFinanceConstants';
import { AdminFinanceFormatCurrency } from '@/app/frontend_admin/admin_finance/admin_finance_utils/AdminFinanceFormatCurrency';
import { formatPercent1dp } from '@/app/frontend_admin/admin_finance/admin_finance_utils/AdminFinanceFormatters';
import AdminFinancePnlRowBreakdown from '@/app/frontend_admin/admin_finance/admin_finance_components/admin_finance_pnl/AdminFinancePnlRowBreakdown';
import AdminFinancePnlTableSortIcon from '@/app/frontend_admin/admin_finance/admin_finance_components/admin_finance_pnl/AdminFinancePnlTableSortIcon';
import AdminFinancePnlEmptyState from '@/app/frontend_admin/admin_finance/admin_finance_components/admin_finance_pnl/AdminFinancePnlEmptyState';
import type {
  BranchPnlRecord,
  PnlSortKey,
  PnlSortDirection,
  PnlStatusFilter,
} from '@/app/frontend_admin/admin_finance/admin_finance_types/AdminFinanceTypes';

import type { AdminFinancePnlTableProps } from '@/app/frontend_admin/admin_finance/admin_finance_types/AdminFinancePnlTablePropsTypes';

const TOTAL_COLS = PNL_TABLE_HEADERS.length;

/**
 * AdminFinancePnlTable renders the admin finance pnl table UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinancePnlTable: Renders the sortable branch-wise P&L comparison table with
 * @dependencies Consumes AdminFinanceConstants, AdminFinanceFormatCurrency, AdminFinanceFormatters, AdminFinancePnlRowBreakdown, AdminFinancePnlTableSortIcon.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinancePnlTable({
  data,
  sortKey,
  sortDir,
  onSort,
  expandedBranchId,
  onToggleExpand,
  statusFilter,
  onResetFilter,
}: AdminFinancePnlTableProps) {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table data-admin-responsive-table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-highlight border-b border-border">
              {PNL_TABLE_HEADERS.map((h , __testIdIndex50) => (
                <th role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.currentTarget.click(); } }} 
                  key={h.key}
                  className={`px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ${
                    h.sortable ? 'cursor-pointer hover:text-primary motion-safe:transition-colors' : ''
                  }`}
                  onClick={() => {
                    if (h.sortable) onSort(h.key as PnlSortKey);
                  }}
                  aria-sort={
                    h.sortable && sortKey === h.key
                      ? sortDir === 'asc' ? 'ascending' : 'descending'
                      : undefined
                  }
                 data-testid={`admin_finance-admin_finance-pnl-table-control-map50-${__testIdIndex50}-1`}>
                  <div className="flex items-center gap-1.5">
                    {t(h.labelKey)}
                    {h.sortable && <AdminFinancePnlTableSortIcon column={h.key} sortKey={sortKey} sortDir={sortDir} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.length === 0 ? (
              <AdminFinancePnlEmptyState statusFilter={statusFilter} onReset={onResetFilter} />
            ) : (
              data.map((branch , __testIdIndex77) => {
                const isExpanded = expandedBranchId === branch.branchId;
                const statusCfg = PNL_STATUS_CONFIG[branch.status];
                const profitColor = branch.netProfit >= 0 ? 'text-success' : 'text-danger';
                const momColor = branch.momDelta > 0 ? 'text-success' : branch.momDelta < 0 ? 'text-danger' : 'text-secondary';

                return (
                  <>
                    <tr
                      key={branch.branchId}
                      onClick={() => onToggleExpand(branch.branchId)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          onToggleExpand(branch.branchId);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-expanded={isExpanded}
                      className={`cursor-pointer group motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        isExpanded ? 'bg-surface-highlight' : 'hover:bg-input'
                      }`}
                     data-testid={`admin_finance-admin_finance-pnl-table-click-map77-${__testIdIndex77}-1`}>
                      {/* Branch Name */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-lg bg-primary-subtle flex items-center justify-center text-primary text-xs font-bold flex-shrink-0`}>
                            {branch.branchName.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-primary truncate">{branch.branchName}</p>
                            <p className="text-xs text-disabled truncate">{branch.location}</p>
                          </div>
                        </div>
                      </td>

                      {/* Revenue */}
                      <td className="px-4 py-3.5 text-sm font-medium text-success text-right">
                        {AdminFinanceFormatCurrency(branch.revenue, undefined, locale)}
                      </td>

                      {/* Expenses */}
                      <td className="px-4 py-3.5 text-sm font-medium text-danger text-right">
                        {AdminFinanceFormatCurrency(branch.expenses, undefined, locale)}
                      </td>

                      {/* Net Profit */}
                      <td className={`px-4 py-3.5 text-sm font-bold text-right ${profitColor}`}>
                        {AdminFinanceFormatCurrency(branch.netProfit, undefined, locale)}
                      </td>

                      {/* Margin % */}
                      <td className={`px-4 py-3.5 text-sm font-semibold text-right ${profitColor}`}>
                        {formatPercent1dp(branch.marginPct, locale)}%
                      </td>

                      {/* MoM Delta */}
                      <td className={`px-4 py-3.5 text-xs font-semibold text-right ${momColor}`}>
                        {branch.momDelta > 0 ? '+' : ''}{formatPercent1dp(branch.momDelta, locale)}%
                      </td>

                      {/* Status Badge */}
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusCfg.bgClass} ${statusCfg.textClass}`}>
                          {t(statusCfg.labelKey)}
                        </span>
                      </td>

                      {/* Expand Toggle */}
                      <td className="px-4 py-3.5 text-right">
                        <ChevronRight
                          size={18}
                          strokeWidth={2}
                          className={`text-secondary motion-safe:transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        />
                      </td>
                    </tr>

                    {/* Inline Breakdown Row */}
                    {isExpanded && (
                      <AdminFinancePnlRowBreakdown
                        key={`${branch.branchId}-breakdown`}
                        branch={branch}
                        colSpan={TOTAL_COLS}
                      />
                    )}
                  </>
                );
              })
            )}
          </tbody>

          {/* Footer Totals Row */}
          {data.length > 0 && (
            <tfoot>
              <tr className="bg-surface-highlight border-t-2 border-border">
                <td className="px-4 py-3 text-xs font-bold text-secondary uppercase tracking-wider">
                  {data.length} {t('finance.AdminFinancePnlTable.text_1627510b24')}{data.length !== 1 ? 'es' : ''} {t('finance.AdminFinancePnlTable.text_b25928c699')}</td>
                <td className="px-4 py-3 text-sm font-bold text-success text-right">
                  {AdminFinanceFormatCurrency(data.reduce((s, b) => s + b.revenue, 0), undefined, locale)}
                </td>
                <td className="px-4 py-3 text-sm font-bold text-danger text-right">
                  {AdminFinanceFormatCurrency(data.reduce((s, b) => s + b.expenses, 0), undefined, locale)}
                </td>
                <td className={`px-4 py-3 text-sm font-bold text-right ${
                  data.reduce((s, b) => s + b.netProfit, 0) >= 0 ? 'text-success' : 'text-danger'
                }`}>
                  {AdminFinanceFormatCurrency(data.reduce((s, b) => s + b.netProfit, 0), undefined, locale)}
                </td>
                <td className="px-4 py-3 text-xs text-secondary text-right" colSpan={4}>
                  {t('finance.AdminFinancePnlTable.text_a0c2a342bf')}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}