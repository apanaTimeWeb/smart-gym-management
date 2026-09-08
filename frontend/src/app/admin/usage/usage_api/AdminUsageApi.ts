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
export const adminUsageApi = {
  fetchMyUsage: () =>
    apiFetch<ApiResponse<AdminUsageData>>(AdminUsageUrlConfig.BACKEND_API.MY_USAGE),

  /** POST /admin/usage/upgrade-request — sends an upgrade request to the superadmin */
  requestUpgrade: (dto: AdminUpgradeRequestDto) =>
    apiFetch<ApiResponse<void>>(AdminUsageUrlConfig.BACKEND_API.UPGRADE_REQUEST, {
      method: 'POST',
      body: JSON.stringify(dto),
    }),
};
