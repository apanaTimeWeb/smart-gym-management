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

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: any;
}

export const DASHBOARD_MESSAGES = {
  FETCHED_SUCCESS: 'dashboard fetched successfully',
  UPDATED_SUCCESS: 'dashboard updated successfully',
  CREATED_SUCCESS: 'dashboard created successfully',
  DELETED_SUCCESS: 'dashboard deleted successfully',
};
