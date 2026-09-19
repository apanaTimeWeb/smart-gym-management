import type { BranchPerformance } from '@/app/admin/dashboard/dashboard_types/AdminDashboardTypes';
import type { LeaderboardSortDirection, LeaderboardSortKey } from '@/app/admin/dashboard/dashboard_types/AdminDashboardBranchLeaderboardTypes';

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
