// RESPONSIBILITY: Renders the read-only paginated attendance records table with status badges and duration.
'use client';

import { useAdminAttendanceLogic } from '@/app/admin/attendance/attendance_context/useAdminAttendanceLogic';
import { useAdminAttendanceStore } from '@/app/admin/attendance/attendance_store/useAdminAttendanceStore';
import AdminAttendanceEmptyState from '@/app/admin/attendance/attendance_components/AdminAttendanceEmptyState/AdminAttendanceEmptyState';
import AdminPagination from '@/app/admin/admin_components/AdminShared/AdminPagination';
import { ATTENDANCE_TABLE_HEADERS, ATTENDANCE_ITEMS_PER_PAGE, computeDuration } from '@/app/admin/attendance/attendance_utils/AdminAttendanceSharedConstants';

const STATUS_STYLES: Record<string, string> = {
  present: 'bg-success/10 text-success',
  late:    'bg-warning/10 text-warning',
  absent:  'bg-danger/10  text-danger',
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
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 border-b border-border">
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
              <tr key={r.id} className="hover:bg-primary/5 motion-safe:transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                      {r.memberName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{r.memberName}</p>
                      <p className="text-xs text-secondary">
                        {r.memberPhone.replace(/(\d{2})(\d{4})(\d{4})/, '$1****$3')}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">{r.branchName}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">{r.planName}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground whitespace-nowrap">
                    {r.checkInTime || '—'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground whitespace-nowrap">
                    {r.checkOutTime ?? '—'}
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
