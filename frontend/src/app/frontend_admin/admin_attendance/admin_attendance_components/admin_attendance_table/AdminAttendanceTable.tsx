// RESPONSIBILITY: Renders the read-only paginated attendance records table with status badges and duration.
"use client";

import { useTranslations } from 'next-intl';
import { displayValue } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutDisplayValue';
import { maskSensitiveData } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutMaskSensitiveData';
import { useAdminAttendanceLogic } from '@/app/frontend_admin/admin_attendance/admin_attendance_hooks/useAdminAttendanceLogic';
import { useAdminAttendanceStore } from '@/app/frontend_admin/admin_attendance/admin_attendance_store/useAdminAttendanceStore';
import AdminAttendanceEmptyState from '@/app/frontend_admin/admin_attendance/admin_attendance_components/admin_attendance_empty_state/AdminAttendanceEmptyState';
import AdminLayoutPagination from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutPagination';
import { ATTENDANCE_TABLE_HEADER_KEYS, ATTENDANCE_ITEMS_PER_PAGE, ATTENDANCE_STATUS_LABEL_KEYS } from '@/app/frontend_admin/admin_attendance/admin_attendance_constants/AdminAttendanceConstants';
import { computeDuration } from '@/app/frontend_admin/admin_attendance/admin_attendance_utils/AdminAttendanceFormatters';

const STATUS_STYLES: Record<string, string> = {
  present: 'bg-success text-on-success',
  late:    'bg-warning-bg text-warning',
  absent:  'bg-danger  text-on-danger',
};

/**
 * AdminAttendanceTable renders the admin attendance table UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminAttendanceTable: Renders the read-only paginated attendance records table with status badges and duration.
 * @dependencies Consumes AdminLayoutDisplayValue, AdminLayoutMaskSensitiveData, useAdminAttendanceLogic, useAdminAttendanceStore, AdminAttendanceEmptyState.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminAttendanceTable() {
  const t = useTranslations();
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
              {ATTENDANCE_TABLE_HEADER_KEYS.map((key) => (
                <th
                  key={key}
                  className="px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap"
                >
                  {t(key)}
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
                    {r.sessionType === 'PT' ? displayValue(r.trainerName) : displayValue(null)}
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
                    data-testid={`admin_attendance-admin_attendance-table-status-${r.id}`}
                  >
                    {t(ATTENDANCE_STATUS_LABEL_KEYS[r.status] ?? r.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border">
        <AdminLayoutPagination
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