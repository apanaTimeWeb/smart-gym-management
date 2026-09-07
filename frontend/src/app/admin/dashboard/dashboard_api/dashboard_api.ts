// RESPONSIBILITY: Provides strongly-typed network calls for dashboard metrics.
import { apiFetch, ApiResponse } from '@/lib/api';
import { DashboardUrlConfig } from '@/app/admin/dashboard/dashboard_url_config';
import type { DashboardStats } from '@/app/admin/dashboard/dashboard_types/dashboard_types';

export const dashboardApi = {
  fetchDashboardStats: async (branchId?: string): Promise<ApiResponse<DashboardStats>> => {
    const query = branchId && branchId !== 'all' ? `?branchId=${branchId}` : '';
    const res = await apiFetch<ApiResponse<Partial<DashboardStats>>>(`${DashboardUrlConfig.BACKEND_API.STATS}${query}`);
    return {
      success: true,
      message: 'Stats fetched successfully',
      data: {
        ...(Array.isArray(res.data) ? {} : (res.data || {})),
        
        // --- INJECTED MOCK DATA FOR OWNER'S COCKPIT ---
        netProfit: 125000,
        totalExpenses: 75000,
        revenueTrend: [
          { month: 'Jun', revenue: 120000, profit: 45000 },
          { month: 'Jul', revenue: 150000, profit: 60000 },
          { month: 'Aug', revenue: 180000, profit: 80000 },
          { month: 'Sep', revenue: 160000, profit: 70000 },
          { month: 'Oct', revenue: 200000, profit: 125000 },
        ],
        branchLeaderboard: [
          { id: 'br-1', name: 'Andheri East', revenue: 85000, activeMembers: 120, trend: 'up' },
          { id: 'br-2', name: 'Bandra West', revenue: 65000, activeMembers: 95, trend: 'up' },
          { id: 'br-3', name: 'Powai', revenue: 40000, activeMembers: 60, trend: 'flat' },
          { id: 'br-4', name: 'Thane', revenue: 10000, activeMembers: 20, trend: 'down' },
        ],
        systemAlerts: [
          { id: '1', message: 'Powai Manager has not logged in today.', severity: 'medium', date: new Date().toISOString() },
          { id: '2', message: 'Treadmill #4 in Andheri needs maintenance.', severity: 'high', date: new Date(Date.now() - 86400000).toISOString() },
          { id: '3', message: 'Thane branch operating at a loss this month.', severity: 'high', date: new Date(Date.now() - 172800000).toISOString() },
        ],
      } as DashboardStats,
    };
  },
};

