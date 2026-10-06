/**
 * @description AdminDashboardSortBranchPerformanceRows: Owns the AdminDashboardSortBranchPerformanceRows responsibility for the admin_dashboard feature.
 * @dependencies Uses only the owning feature's typed inputs, constants, and approved global infrastructure.
 * @edge-case Preserves null/empty/error inputs according to the feature contract and does not own server state.
 */
import type { BranchPerformance } from '@/app/frontend_admin/admin_dashboard/admin_dashboard_types/AdminDashboardTypes';
import type { LeaderboardSortDirection, LeaderboardSortKey } from '@/app/frontend_admin/admin_dashboard/admin_dashboard_types/AdminDashboardBranchLeaderboardTypes';

/**
 * Sorts dashboard branch-performance rows by the selected leaderboard field.
 */
export function sortAdminBranchPerformanceRows(data: BranchPerformance[], key: LeaderboardSortKey, direction: LeaderboardSortDirection): BranchPerformance[] {
  return [...data].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    const result = typeof aValue === 'number' && typeof bValue === 'number'
      ? aValue - bValue
      : String(aValue).localeCompare(String(bValue), undefined, { numeric: true });
    return direction === 'asc' ? result : -result;
  });
}
