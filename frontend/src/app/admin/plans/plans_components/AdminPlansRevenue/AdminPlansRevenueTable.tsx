// RESPONSIBILITY: Renders sortable and searchable table for plan-wise revenue breakdown.
'use client';

import { ChevronDown, ChevronUp, ChevronsUpDown, FileWarning, ChevronLeft, ChevronRight } from 'lucide-react';
import { REVENUE_TABLE_HEADERS } from '@/app/admin/plans/plans_utils/AdminPlansRevenueConstants';
import type {
  PlanRevenueRecord,
  RevenueSortKey,
  RevenueSortDirection,
} from '@/app/admin/plans/plans_types/AdminPlansRevenueTypes';
import { formatCurrency } from '@/lib/formatters';

interface AdminPlansRevenueTableProps {
  data: PlanRevenueRecord[];
  sortKey: RevenueSortKey;
  sortDir: RevenueSortDirection;
  onSort: (key: RevenueSortKey) => void;
}

function SortIcon({ col, sortKey, sortDir }: { col: string; sortKey: string; sortDir: string }) {
  if (col !== sortKey) return <ChevronsUpDown size={12} className="text-disabled" />;
  return sortDir === 'asc'
    ? <ChevronUp size={12} className="text-primary" />
    : <ChevronDown size={12} className="text-primary" />;
}

export default function AdminPlansRevenueTable({ data, sortKey, sortDir, onSort }: AdminPlansRevenueTableProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 border-b border-border">
              {REVENUE_TABLE_HEADERS.map((h) => (
                <th
                  key={h.key}
                  className={`px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider select-none whitespace-nowrap ${
                    h.sortable ? 'cursor-pointer hover:text-foreground motion-safe:transition-colors' : ''
                  }`}
                  onClick={() => {
                    if (h.sortable) onSort(h.key as RevenueSortKey);
                  }}
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
              <tr>
                <td colSpan={6} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <FileWarning size={48} className="text-disabled" strokeWidth={1} />
                    <div>
                      <p className="text-base font-semibold text-foreground">No revenue data found</p>
                      <p className="text-sm text-secondary mt-1">Try adjusting your filters or search query.</p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id} className="hover:bg-input motion-safe:transition-colors cursor-pointer">
                  {/* Plan Name */}
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-semibold text-foreground">{row.planName}</p>
                  </td>
                  {/* Tier */}
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                      {row.tier}
                    </span>
                  </td>
                  {/* Active Subs */}
                  <td className="px-4 py-3.5 text-sm font-medium text-foreground">
                    {row.activeSubscriptions.toLocaleString('en-IN')}
                  </td>
                  {/* New Signups */}
                  <td className="px-4 py-3.5 text-sm font-medium text-foreground">
                    {row.newSignups > 0 ? `+${row.newSignups}` : row.newSignups}
                  </td>
                  {/* Renewal Rate */}
                  <td className="px-4 py-3.5 text-sm font-medium text-foreground">
                    {row.renewalRate.toFixed(1)}%
                  </td>
                  {/* Total Revenue */}
                  <td className="px-4 py-3.5 text-sm font-black text-foreground">
                    {formatCurrency(row.totalRevenue)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-card">
        <p className="text-xs text-secondary font-medium">
          Showing 1–{data.length} of {data.length} results
        </p>
        <div className="flex items-center gap-2">
          <select 
            className="bg-input border border-border rounded-md text-xs px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary motion-safe:transition-colors cursor-pointer"
            defaultValue="10"
          >
            <option value="10">10 / page</option>
            <option value="25">25 / page</option>
            <option value="50">50 / page</option>
          </select>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded-md border border-border text-disabled cursor-not-allowed bg-input/50" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="p-1 rounded-md border border-border text-disabled cursor-not-allowed bg-input/50" disabled>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
