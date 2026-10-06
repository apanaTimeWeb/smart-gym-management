// RESPONSIBILITY: Pure sorting for HR staff-performance records so ordering behavior is independently testable.
import type { PerformanceSortDirection, PerformanceSortKey, StaffPerformanceRecord } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrPerformanceTypes';

/**
 * sortAdminHrPerformanceRecords provides a feature-local utility used by the Admin module without introducing cross-feature business dependencies.
 * @remarks Inputs and outputs stay explicitly typed and deterministic for tests and reuse inside this feature.
 */
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
