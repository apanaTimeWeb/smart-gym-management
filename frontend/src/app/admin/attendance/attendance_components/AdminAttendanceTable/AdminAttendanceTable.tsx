"use client";
// RESPONSIBILITY: Renders the read-only paginated attendance records table with status badges and duration.

import { displayValue } from '@/app/admin/admin_layout/admin_utils/AdminDisplayValue';
import { maskSensitiveData } from '@/app/admin/admin_layout/admin_utils/AdminMaskSensitiveData';
import { useAdminAttendanceLogic } from '@/app/admin/attendance/attendance_context/useAdminAttendanceLogic';
import { useAdminAttendanceStore } from '@/app/admin/attendance/attendance_store/useAdminAttendanceStore';
import AdminAttendanceEmptyState from '@/app/admin/attendance/attendance_components/AdminAttendanceEmptyState/AdminAttendanceEmptyState';
import AdminPagination from '@/app/admin/admin_layout/AdminShared/AdminPagination';
import { ATTENDANCE_TABLE_HEADERS, ATTENDANCE_ITEMS_PER_PAGE, computeDuration } from '@/app/admin/attendance/attendance_utils/AdminAttendanceSharedConstants';

const STATUS_STYLES: Record<string, string> = {
  present: 'bg-success text-success',
  late:    'bg-warning text-warning',
  absent:  'bg-danger  text-danger',
};

export default function AdminAttendanceTable() {
  const { records, allFilteredCount, totalPages } = useAdminAttendanceLogic();
  const { search, statusFilter, branchFilter, dateRange, currentPage, setCurrentPage } = useAdminAttendanceStore();

  const hasFilters = search !== '' || statusFilter !== 'all' || branchFilter !== 'all' || dateRange !== 'today';

  if (records.length === 0) {
    return <AdminAttendanceEmptyState hasFilters={hasFilters} />;
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table data-admin-responsive-table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-highlight border-b border-border">
              {ATTENDANCE_TABLE_HEADERS.map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {records.map((r) => (
              <tr key={r.id} className="hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-subtle flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                      {r.memberName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary">{r.memberName}</p>
                      <p className="text-xs text-secondary">
                        {maskSensitiveData(r.memberPhone)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-primary">{r.branchName}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-primary">{r.planName}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-primary">
                    {r.sessionType === 'PT' ? displayValue(r.trainerName) : '—'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-primary whitespace-nowrap">
                    {displayValue(r.checkInTime)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-primary whitespace-nowrap">
                    {displayValue(r.checkOutTime)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-secondary">
                    {computeDuration(r.checkInTime, r.checkOutTime)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${STATUS_STYLES[r.status] ?? 'bg-input text-secondary'}`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border">
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={allFilteredCount}
          itemsPerPage={ATTENDANCE_ITEMS_PER_PAGE}
        />
      </div>
    </div>
  );
}