export interface IDashboardKpiStats {
  totalGyms: number;
  activeGyms: number;
  suspendedGyms: number;
  trialGyms: number;
  totalRevenue: number;
  totalMembers: number;
}

export interface IDashboardListResponse {
  data: IDashboardKpiStats;
  message: string;
}
