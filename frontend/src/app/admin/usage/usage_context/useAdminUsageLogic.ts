"use client";
// RESPONSIBILITY: Fetches Admin usage server state and derives presentation metrics.
// DATA FLOW: Admin usage API → TanStack Query → useAdminUsageLogic → AdminUsageMain

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usageApi } from '@/app/admin/usage/usage_api/AdminUsageApi';
import { PLAN_TIERS } from '@/app/admin/usage/usage_utils/AdminUsageSharedConstants';
import type { AdminUsageData, AdminUsageMetric } from '@/app/admin/usage/usage_types/AdminUsageTypes';

export function useAdminUsageLogic() {
  const query = useQuery({
    queryKey: ['admin', 'usage', 'current'],
    queryFn: async () => {
      const response = await usageApi.fetchMyUsage();
      return response.data;
    },
    staleTime: 60_000,
  });

  const data = query.data as AdminUsageData | null | undefined;
  const metrics = useMemo<AdminUsageMetric[]>(() => {
    if (!data) return [];
    return [
      { label: 'Members', used: data.activeMembers, limit: data.memberLimit, unit: 'members', warningThreshold: 80 },
      { label: 'Staff Seats', used: data.staffCount, limit: data.staffLimit, unit: 'seats', warningThreshold: 90 },
      { label: 'Branches', used: data.branchCount, limit: data.branchLimit, unit: 'branches', warningThreshold: 80 },
      { label: 'SMS This Month', used: data.smsSent, limit: data.smsLimit, unit: 'SMS', warningThreshold: 85 },
      { label: 'Storage Used', used: data.databaseGb + data.mediaGb, limit: data.storageLimitGb, unit: 'GB', warningThreshold: 80 },
      { label: 'API Calls Today', used: data.apiCallsToday, limit: data.apiCallsLimit, unit: 'calls', warningThreshold: 75 },
    ];
  }, [data]);

  return {
    data: data ?? null,
    metrics,
    planTiers: PLAN_TIERS,
    status: query.status,
    error: query.error instanceof Error ? query.error.message : '',
    refresh: query.refetch,
  };
}
