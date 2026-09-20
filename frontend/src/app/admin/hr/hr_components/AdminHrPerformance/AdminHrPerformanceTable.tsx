"use client";
// RESPONSIBILITY: Renders sortable table displaying detailed staff performance metrics.

import { formatDecimal } from '@/lib/formatters';
import { PERFORMANCE_TABLE_HEADERS, PERFORMANCE_STATUS_CONFIG } from '@/app/admin/hr/hr_utils/AdminHrPerformanceConstants';
import AdminHrEmptyState from '@/app/admin/hr/hr_components/AdminHrEmptyState/AdminHrEmptyState';
import AdminHrPerformanceTableSortIcon from '@/app/admin/hr/hr_components/AdminHrPerformance/AdminHrPerformanceTableSortIcon';
import type {
  StaffPerformanceRecord,
  PerformanceSortKey,
  PerformanceSortDirection,
} from '@/app/admin/hr/hr_types/AdminHrPerformanceTypes';

import type { AdminHrPerformanceTableProps } from '@/app/admin/hr/hr_types/AdminHrPerformanceTablePropsTypes';


export default function AdminHrPerformanceTable({
  data,
  sortKey,
  sortDir,
  onSort,
}: AdminHrPerformanceTableProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table data-admin-responsive-table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-highlight border-b border-border">
              {PERFORMANCE_TABLE_HEADERS.map((h) => (
                <th role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.currentTarget.click(); } }}
                  key={h.key}
                  className={`px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider select-none whitespace-nowrap ${
                    h.sortable ? 'cursor-pointer hover:text-on-primary motion-safe:transition-colors' : ''
                  }`}
                  onClick={() => {
                    if (h.sortable) onSort(h.key as PerformanceSortKey);
                  }}
                  aria-sort={sortKey===h.key ? (sortDir==='asc' ? 'ascending' : 'descending') : 'none'}
                >
                  <div className="flex items-center gap-1.5">
                    {h.label}
                    {h.sortable && <AdminHrPerformanceTableSortIcon column={h.key} sortKey={sortKey} sortDir={sortDir} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.length === 0 ? (
              <tr>
                <td colSpan={7}><AdminHrEmptyState title="No performance data available" description="No performance records match the current filters." /></td>
              </tr>
            ) : (
              data.map((staff) => {
                const statusCfg = PERFORMANCE_STATUS_CONFIG[staff.status];
                return (
                  <tr key={staff.id} className="hover:bg-input motion-safe:transition-colors motion-safe:duration-base">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-primary-subtle flex items-center justify-center text-on-primary text-xs font-bold flex-shrink-0">
                          {staff.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-on-primary truncate">{staff.name}</p>
                          <p className="text-xs text-disabled truncate">{staff.branchName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-secondary">{staff.role}</td>
                    <td className="px-4 py-3.5 text-sm font-medium text-on-primary">{staff.sessionsTaken > 0 ? staff.sessionsTaken : '-'}</td>
                    <td className="px-4 py-3.5 text-sm font-medium text-on-primary">{staff.membersAdded > 0 ? staff.membersAdded : '-'}</td>
                    <td className="px-4 py-3.5 text-sm font-medium text-on-primary">{staff.attendancePct}%</td>
                    <td className="px-4 py-3.5 text-sm font-bold text-on-primary">{formatDecimal(staff.rating)} <span className="text-warning text-xs">★</span></td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusCfg?.bgClass} ${statusCfg?.textClass}`}>
                        {statusCfg?.label || staff.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
