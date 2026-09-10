// RESPONSIBILITY: Renders sortable table displaying detailed staff performance metrics.
'use client';

import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { PERFORMANCE_TABLE_HEADERS, PERFORMANCE_STATUS_CONFIG } from '@/app/admin/hr/hr_utils/AdminHrPerformanceConstants';
import type {
  StaffPerformanceRecord,
  PerformanceSortKey,
  PerformanceSortDirection,
} from '@/app/admin/hr/hr_types/AdminHrPerformanceTypes';

interface AdminHrPerformanceTableProps {
  data: StaffPerformanceRecord[];
  sortKey: PerformanceSortKey;
  sortDir: PerformanceSortDirection;
  onSort: (key: PerformanceSortKey) => void;
}

function SortIcon({ col, sortKey, sortDir }: { col: string; sortKey: string; sortDir: string }) {
  if (col !== sortKey) return <ChevronsUpDown size={12} className="text-disabled" />;
  return sortDir === 'asc'
    ? <ChevronUp size={12} className="text-primary" />
    : <ChevronDown size={12} className="text-primary" />;
}

export default function AdminHrPerformanceTable({
  data,
  sortKey,
  sortDir,
  onSort,
}: AdminHrPerformanceTableProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 border-b border-border">
              {PERFORMANCE_TABLE_HEADERS.map((h) => (
                <th
                  key={h.key}
                  className={`px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider select-none whitespace-nowrap ${
                    h.sortable ? 'cursor-pointer hover:text-foreground motion-safe:transition-colors' : ''
                  }`}
                  onClick={() => {
                    if (h.sortable) onSort(h.key as PerformanceSortKey);
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
                <td colSpan={7} className="py-16 text-center text-secondary text-sm">
                  No performance data available.
                </td>
              </tr>
            ) : (
              data.map((staff) => {
                const statusCfg = PERFORMANCE_STATUS_CONFIG[staff.status];
                
                return (
                  <tr key={staff.id} className="hover:bg-input motion-safe:transition-colors cursor-pointer">
                    {/* Staff Name & Branch */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                          {staff.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{staff.name}</p>
                          <p className="text-xs text-disabled truncate">{staff.branchName}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-4 py-3.5 text-sm text-secondary">
                      {staff.role}
                    </td>

                    {/* Sessions */}
                    <td className="px-4 py-3.5 text-sm font-medium text-foreground">
                      {staff.sessionsTaken > 0 ? staff.sessionsTaken : '-'}
                    </td>

                    {/* Members Added */}
                    <td className="px-4 py-3.5 text-sm font-medium text-foreground">
                      {staff.membersAdded > 0 ? staff.membersAdded : '-'}
                    </td>

                    {/* Attendance */}
                    <td className="px-4 py-3.5 text-sm font-medium text-foreground">
                      {staff.attendancePct}%
                    </td>

                    {/* Rating */}
                    <td className="px-4 py-3.5 text-sm font-bold text-foreground">
                      {staff.rating.toFixed(1)} <span className="text-warning text-xs">★</span>
                    </td>

                    {/* Status Badge */}
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
