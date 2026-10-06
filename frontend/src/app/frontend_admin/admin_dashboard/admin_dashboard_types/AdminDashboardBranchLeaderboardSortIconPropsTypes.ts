import type { LeaderboardSortDirection, LeaderboardSortKey } from '@/app/frontend_admin/admin_dashboard/admin_dashboard_types/AdminDashboardBranchLeaderboardTypes';

export interface AdminDashboardBranchLeaderboardSortIconProps {
  column: LeaderboardSortKey;
  sortKey: LeaderboardSortKey;
  sortDir: LeaderboardSortDirection;
}
