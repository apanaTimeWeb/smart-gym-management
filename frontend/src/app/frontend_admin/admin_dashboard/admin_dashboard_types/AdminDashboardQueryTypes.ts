// Type contract owned by this module; kept outside implementation files for AI isolation.

export interface AdminDashboardStatsParams {
  range: string;
  startDate?: string;
  endDate?: string;
  branchId?: string;
}
