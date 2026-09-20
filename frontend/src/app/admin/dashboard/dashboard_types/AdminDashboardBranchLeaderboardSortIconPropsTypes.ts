import type { LeaderboardSortDirection, LeaderboardSortKey } from '@/app/admin/dashboard/dashboard_types/AdminDashboardBranchLeaderboardTypes';

export interface AdminDashboardBranchLeaderboardSortIconProps {
  column: LeaderboardSortKey;
  sortKey: LeaderboardSortKey;
  sortDir: LeaderboardSortDirection;
}
