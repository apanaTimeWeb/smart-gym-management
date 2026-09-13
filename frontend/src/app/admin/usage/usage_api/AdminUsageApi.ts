// RESPONSIBILITY: Modularized API client for the Admin Usage & Subscription module.
// All usage-related API calls go through this file. No UI logic.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { AdminUsageUrlConfig } from '@/app/admin/usage/usage_url_config';

export interface AdminUsageData {
  tenantId: string;
  planName: string;
  monthlyPrice: number;
  billingCycleEnd: string;
  smsSent: number;
  smsLimit: number;
  databaseGb: number;
  mediaGb: number;
  storageLimitGb: number;
  activeMembers: number;
  totalMembers: number;
  memberLimit: number;
  staffCount: number;
  staffLimit: number;
}

export interface AdminUpgradeRequestDto {
  currentPlan: string;
  requestedPlan: string;
  message?: string;
}

/**
 * Fetches the admin's current plan usage data against their subscription limits.
 */
import { MOCK_ADMIN_USAGE_DATA } from '@/app/admin/usage/usage_api/AdminUsageMockData';

export const adminUsageApi = {
  fetchMyUsage: async () => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: MOCK_ADMIN_USAGE_DATA };
  },

  requestUpgrade: async (dto: AdminUpgradeRequestDto) => {
    await new Promise(res => setTimeout(res, 600));
    return { success: true, message: 'Upgrade requested successfully', data: undefined };
  },
};
