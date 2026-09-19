export type AttendanceSummaryRow = any;
import type { AttendanceSortKey, AttendanceSortDirection } from '@/app/admin/reports/reports_types/AdminReportsAttendanceTypes';

/**
 * Sorts attendance summary rows by the selected report column.
 */
export function sortAdminAttendanceRows(data: AttendanceSummaryRow[], key: AttendanceSortKey, direction: AttendanceSortDirection): AttendanceSummaryRow[] {
  return [...data].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    const result = typeof aValue === 'number' && typeof bValue === 'number'
      ? aValue - bValue
      : String(aValue).localeCompare(String(bValue), undefined, { numeric: true });
    return direction === 'asc' ? result : -result;
  });
}
