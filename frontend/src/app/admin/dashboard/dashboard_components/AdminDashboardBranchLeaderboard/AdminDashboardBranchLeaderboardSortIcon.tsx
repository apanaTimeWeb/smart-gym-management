"use client";
// RESPONSIBILITY: Renders the sortable-direction icon for a dashboard leaderboard header.
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import type { LeaderboardSortDirection, LeaderboardSortKey } from '@/app/admin/dashboard/dashboard_types/AdminDashboardBranchLeaderboardTypes';

import type { AdminDashboardBranchLeaderboardSortIconProps } from '@/app/admin/dashboard/dashboard_types/AdminDashboardBranchLeaderboardSortIconPropsTypes';


export default function AdminDashboardBranchLeaderboardSortIcon({ column, sortKey, sortDir }: AdminDashboardBranchLeaderboardSortIconProps) {
  if (column !== sortKey) return <ChevronsUpDown size={13} className="text-disabled" />;
  return sortDir === 'asc' ? <ChevronUp size={13} className="text-primary" /> : <ChevronDown size={13} className="text-primary" />;
}
