export interface IDashboardKpi {
  totalMembers: number;
  activeMembers: number;
  newMembersThisMonth: number;
  totalRevenue: number;
  monthlyRevenue: number;
  pendingPayments: number;
  totalStaff: number;
  activeStaff: number;
  totalProducts: number;
  lowStockCount: number;
  totalInquiries: number;
  newInquiries: number;
}

export interface IChartData {
  month: string;
  count?: number;
  revenue?: number;
}

export interface IDashboardCharts {
  memberGrowth: IChartData[];
  revenueChart: IChartData[];
  membersByPlan: { plan: string; count: number }[];
  membersByStatus: { active: number; pending: number; expired: number };
}

export interface IDashboardRecent {
  recentMembers: any[];
  recentPayments: any[];
  pendingPaymentsList: any[];
}
