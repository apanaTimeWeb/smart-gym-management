// RESPONSIBILITY: Provides strongly-typed network calls for the sales module.
import { apiFetch, ApiResponse } from '@/lib/api';
import { SalesUrlConfig } from '@/app/manager/sales/sales_url_config';

export const salesApi = {
  getOverview: () => apiFetch<ApiResponse<{ monthlyRevenue: any[] }>>(SalesUrlConfig.BACKEND_API.OVERVIEW),
  getMembershipReport: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<{ report: any[]; totals: any }>>(`${SalesUrlConfig.BACKEND_API.MEMBERSHIP_REPORT}${q}`);
  },
  getPendingPayments: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<{ members: any[]; total: number }>>(`${SalesUrlConfig.BACKEND_API.PENDING_PAYMENTS}${q}`);
  },
  getAllMemberships: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<{ members: any[]; total: number }>>(`${SalesUrlConfig.BACKEND_API.ALL_MEMBERSHIPS}${q}`);
  },
};
