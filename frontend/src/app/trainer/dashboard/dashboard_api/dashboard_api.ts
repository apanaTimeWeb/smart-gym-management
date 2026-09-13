// RESPONSIBILITY: Zod-validated mock API layer for Trainer Dashboard.
import { DashboardStatsSchema, type DashboardStats } from '@/app/trainer/dashboard/dashboard_types/dashboard_types';
import { MOCK_DASHBOARD_STATS } from '@/app/trainer/dashboard/dashboard_fixtures/TrainerDashboardMockData';

export const dashboardApi = {
  getStats: async (range?: string, startDate?: string, endDate?: string): Promise<DashboardStats> => {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 600));
    return DashboardStatsSchema.parse(MOCK_DASHBOARD_STATS);
  },
};
