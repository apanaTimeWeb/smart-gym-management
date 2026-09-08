// RESPONSIBILITY: Renders the sortable branch-wise P&L comparison table with
// clickable row expansion. Handles sorting indicators and inline breakdown toggle.
'use client';

import { ChevronDown, ChevronUp, ChevronsUpDown, ChevronRight } from 'lucide-react';
import { PNL_TABLE_HEADERS, PNL_STATUS_CONFIG } from '@/app/admin/finance/finance_utils/AdminFinancePnlConstants';
import { formatCurrency } from '@/lib/formatters';
import AdminFinancePnlRowBreakdown from '@/app/admin/finance/finance_components/AdminFinancePnl/AdminFinancePnlRowBreakdown';
import AdminFinancePnlEmptyState from '@/app/admin/finance/finance_components/AdminFinancePnl/AdminFinancePnlEmptyState';
import type {
  BranchPnlRecord,
  PnlSortKey,
  PnlSortDirection,
  PnlStatusFilter,
} from '@/app/admin/finance/finance_types/finance_types';

interface AdminFinancePnlTableProps {
  data: BranchPnlRecord[];
  sortKey: PnlSortKey;
  sortDir: PnlSortDirection;
  onSort: (key: PnlSortKey) => void;
  expandedBranchId: string | null;
  onToggleExpand: (branchId: string) => void;
  statusFilter: PnlStatusFilter;
  onResetFilter: () => void;
}
function SortIcon({ col, sortKey, sortDir }: { col: string; sortKey: PnlSortKey; sortDir: PnlSortDirection }) {
  if (col !== sortKey) return <ChevronsUpDown size={12} className="text-disabled" />;
  return sortDir === 'asc'
    ? <ChevronUp size={12} className="text-primary" />
    : <ChevronDown size={12} className="text-primary" />;
}

const TOTAL_COLS = PNL_TABLE_HEADERS.length;

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
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 border-b border-border">
              {PNL_TABLE_HEADERS.map((h) => (
                <th
                  key={h.key}
                  className={`px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider select-none whitespace-nowrap ${
                    h.sortable ? 'cursor-pointer hover:text-foreground motion-safe:transition-colors' : ''
                  }`}
                  onClick={() => {
                    if (h.sortable) onSort(h.key as PnlSortKey);
                  }}
                  aria-sort={
                    h.sortable && sortKey === h.key
                      ? sortDir === 'asc' ? 'ascending' : 'descending'
                      : undefined
                  }
                >
                  <div className="flex items-center gap-1.5">
                    {h.label}
                    {h.sortable && <SortIcon col={h.key} sortKey={sortKey} sortDir={sortDir} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.length === 0 ? (
              <AdminFinancePnlEmptyState statusFilter={statusFilter} onReset={onResetFilter} />
            ) : (
              data.map((branch) => {
                const isExpanded = expandedBranchId === branch.branchId;
                const statusCfg = PNL_STATUS_CONFIG[branch.status];
                const profitColor = branch.netProfit >= 0 ? 'text-success' : 'text-danger';
                const momColor = branch.momDelta > 0 ? 'text-success' : branch.momDelta < 0 ? 'text-danger' : 'text-secondary';

                return (
                  <>
                    <tr
                      key={branch.branchId}
                      onClick={() => onToggleExpand(branch.branchId)}
                      className={`cursor-pointer group motion-safe:transition-colors ${
                        isExpanded ? 'bg-primary/5' : 'hover:bg-input'
                      }`}
                    >
                      {/* Branch Name */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0`}>
                            {branch.branchName.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">{branch.branchName}</p>
                            <p className="text-xs text-disabled truncate">{branch.location}</p>
                          </div>
                        </div>
                      </td>

                      {/* Revenue */}
                      <td className="px-4 py-3.5 text-sm font-medium text-success text-right">
                        {formatCurrency(branch.revenue)}
                      </td>

                      {/* Expenses */}
                      <td className="px-4 py-3.5 text-sm font-medium text-danger text-right">
                        {formatCurrency(branch.expenses)}
                      </td>

                      {/* Net Profit */}
                      <td className={`px-4 py-3.5 text-sm font-bold text-right ${profitColor}`}>
                        {formatCurrency(branch.netProfit)}
                      </td>

                      {/* Margin % */}
                      <td className={`px-4 py-3.5 text-sm font-semibold text-right ${profitColor}`}>
                        {branch.marginPct.toFixed(1)}%
                      </td>

                      {/* MoM Delta */}
                      <td className={`px-4 py-3.5 text-xs font-semibold text-right ${momColor}`}>
                        {branch.momDelta > 0 ? '+' : ''}{branch.momDelta.toFixed(1)}%
                      </td>

                      {/* Status Badge */}
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusCfg.bgClass} ${statusCfg.textClass}`}>
                          {statusCfg.label}
                        </span>
                      </td>

                      {/* Expand Toggle */}
                      <td className="px-4 py-3.5 text-right">
                        <ChevronRight
                          size={16}
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
              <tr className="bg-primary/5 border-t-2 border-primary/20">
                <td className="px-4 py-3 text-xs font-bold text-secondary uppercase tracking-wider">
                  {data.length} Branch{data.length !== 1 ? 'es' : ''} Total
                </td>
                <td className="px-4 py-3 text-sm font-bold text-success text-right">
                  {formatCurrency(data.reduce((s, b) => s + b.revenue, 0))}
                </td>
                <td className="px-4 py-3 text-sm font-bold text-danger text-right">
                  {formatCurrency(data.reduce((s, b) => s + b.expenses, 0))}
                </td>
                <td className={`px-4 py-3 text-sm font-bold text-right ${
                  data.reduce((s, b) => s + b.netProfit, 0) >= 0 ? 'text-success' : 'text-danger'
                }`}>
                  {formatCurrency(data.reduce((s, b) => s + b.netProfit, 0))}
                </td>
                <td className="px-4 py-3 text-xs text-secondary text-right" colSpan={4}>
                  Combined net
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
