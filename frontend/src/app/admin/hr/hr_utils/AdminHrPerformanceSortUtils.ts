// RESPONSIBILITY: Pure sorting for HR staff-performance records so ordering behavior is independently testable.
import type { PerformanceSortDirection, PerformanceSortKey, StaffPerformanceRecord } from '@/app/admin/hr/hr_types/AdminHrPerformanceTypes';

export function sortAdminHrPerformanceRecords(
  records: readonly StaffPerformanceRecord[],
  sortKey: PerformanceSortKey,
  sortDir: PerformanceSortDirection,
): StaffPerformanceRecord[] {
  return [...records].sort((left, right) => {
    const leftValue = left[sortKey];
    const rightValue = right[sortKey];
    const base = typeof leftValue === 'number' && typeof rightValue === 'number'
      ? leftValue - rightValue
      : String(leftValue).localeCompare(String(rightValue), undefined, { numeric: true });
    return sortDir === 'asc' ? base : -base;
  });
}
