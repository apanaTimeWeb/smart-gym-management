"use client";
// RESPONSIBILITY: Fetches Admin usage server state and derives presentation metrics.
// DATA FLOW: Admin usage API → TanStack Query → useAdminUsageLogic → AdminUsageMain

import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminUsageApi } from '@/app/admin/usage/usage_api/AdminUsageApi';
import { useAdminConfirm } from '@/app/admin/admin_layout/AdminFeedback/useAdminConfirm';
import { useAdminToastStore } from '@/app/admin/admin_layout/admin_store/useAdminToastStore';
import { PLAN_TIERS, USAGE_WARNING_THRESHOLD, USAGE_CRITICAL_THRESHOLD } from '@/app/admin/usage/usage_utils/AdminUsageSharedConstants';
import type { AdminUsageData, AdminUsageMetric } from '@/app/admin/usage/usage_types/AdminUsageTypes';

export function useAdminUsageLogic() {
  const query = useQuery({
    queryKey: ['admin', 'usage', 'current'],
    queryFn: async () => {
      const response = await adminUsageApi.fetchMyUsage();
      return response.data;
    },
    staleTime: 60_000,
  });

  const data = query.data as AdminUsageData | null | undefined;
  const queryClient = useQueryClient();
  const { confirm } = useAdminConfirm();
  const { showToast } = useAdminToastStore();
  const [pendingUpgradePlan, setPendingUpgradePlan] = useState<string | null>(null);

  const upgradeMutation = useMutation({
    mutationFn: (planName: string) => adminUsageApi.requestUpgrade(planName),
    onSettled: () => setPendingUpgradePlan(null),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin', 'usage'] });
    },
  });
  const metrics = useMemo<AdminUsageMetric[]>(() => {
    if (!data) return [];
    return [
      { label: 'Members', used: data.activeMembers, limit: data.memberLimit, unit: 'members', warningThreshold: USAGE_WARNING_THRESHOLD, criticalThreshold: USAGE_CRITICAL_THRESHOLD },
      { label: 'Staff Seats', used: data.staffCount, limit: data.staffLimit, unit: 'seats', warningThreshold: USAGE_WARNING_THRESHOLD, criticalThreshold: USAGE_CRITICAL_THRESHOLD },
      { label: 'Branches', used: data.branchCount, limit: data.branchLimit, unit: 'branches', warningThreshold: USAGE_WARNING_THRESHOLD, criticalThreshold: USAGE_CRITICAL_THRESHOLD },
      { label: 'SMS This Month', used: data.smsSent, limit: data.smsLimit, unit: 'SMS', warningThreshold: USAGE_WARNING_THRESHOLD, criticalThreshold: USAGE_CRITICAL_THRESHOLD },
      { label: 'Storage Used', used: data.databaseGb + data.mediaGb, limit: data.storageLimitGb, unit: 'GB', warningThreshold: USAGE_WARNING_THRESHOLD, criticalThreshold: USAGE_CRITICAL_THRESHOLD },
      { label: 'API Calls Today', used: data.apiCallsToday, limit: data.apiCallsLimit, unit: 'calls', warningThreshold: USAGE_WARNING_THRESHOLD, criticalThreshold: USAGE_CRITICAL_THRESHOLD },
    ];
  }, [data]);

  const requestUpgrade = async (planName: string): Promise<void> => {
    const confirmed = await confirm({
      title: `Request ${planName} upgrade`,
      message: `Send a plan upgrade request for ${planName} to the Superadmin? Your current plan will not change immediately.`,
      confirmText: 'Send Request',
      cancelText: 'Cancel',
      type: 'warning',
    });
    if (!confirmed) return;

    setPendingUpgradePlan(planName);
    try {
      const response = await upgradeMutation.mutateAsync(planName);
      showToast(response.message, 'success', `usage-upgrade-success-${planName}`);
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Unable to send upgrade request.', 'error', `usage-upgrade-error-${planName}`);
    }
  };

  return {
    data: data ?? null,
    metrics,
    planTiers: PLAN_TIERS.map((plan) => ({ ...plan, isCurrent: plan.name === data?.planName })),
    status: query.status,
    error: query.error instanceof Error ? query.error.message : '',
    refresh: query.refetch,
    requestUpgrade,
    upgradeError: upgradeMutation.error instanceof Error ? upgradeMutation.error.message : '',
    pendingUpgradePlan,
  };
}
