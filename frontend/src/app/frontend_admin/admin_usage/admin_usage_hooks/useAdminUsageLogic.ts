"use client";
// RESPONSIBILITY: Fetches Admin usage server state and derives presentation metrics.
import { ADMIN_USAGE_QUERY_KEYS } from '@/app/frontend_admin/admin_usage/admin_usage_constants/AdminUsageQueryKeys';
// DATA FLOW: Admin usage API → TanStack Query → useAdminUsageLogic → AdminUsageMain

import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { AdminUsageApi } from '@/app/frontend_admin/admin_usage/admin_usage_api/AdminUsageApi';
import { useAdminLayoutConfirm } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm';
import { useAdminLayoutToastStore } from '@/app/frontend_admin/admin_layout/admin_layout_store/useAdminLayoutToastStore';
import { getAdminBackendMessage } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage';
import { PLAN_TIERS, USAGE_WARNING_THRESHOLD, USAGE_CRITICAL_THRESHOLD } from '@/app/frontend_admin/admin_usage/admin_usage_constants/AdminUsageConstants';
import type { AdminUsageData, AdminUsageMetric } from '@/app/frontend_admin/admin_usage/admin_usage_types/AdminUsageTypes';
import { useAdminUsageMutations } from '@/app/frontend_admin/admin_usage/admin_usage_hooks/useAdminUsageMutations';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutIdempotencyIntentStore';
/**
 * @description useAdminUsageLogic: Fetches Admin usage server state and derives presentation metrics.
 * @dependencies Consumes AdminUsageQueryKeys, AdminUsageApi, useAdminLayoutConfirm, useAdminLayoutToastStore, AdminLayoutBackendMessage, AdminUsageConstants.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminUsageLogic() {
  const t = useTranslations();
  const query = useQuery({
    queryKey: ADMIN_USAGE_QUERY_KEYS.key('current'),
    queryFn: async () => {
      const response = await AdminUsageApi.fetchMyUsage();
      return response.data;
    },
    staleTime: 60_000,
  });

  const data = query.data as AdminUsageData | null | undefined;
  const { confirm } = useAdminLayoutConfirm();
  const { showToast } = useAdminLayoutToastStore();
  const [pendingUpgradePlan, setPendingUpgradePlan] = useState<string | null>(null);
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);

  const { upgradeMutation } = useAdminUsageMutations();

  const metrics = useMemo<AdminUsageMetric[]>(() => {
    if (!data) return [];
    return [
      { label: t('usage.admin_usage_main.auto_members'), used: data.activeMembers, limit: data.memberLimit, unit: t('usage.admin_usage_main.auto_unitMembers'), warningThreshold: USAGE_WARNING_THRESHOLD, criticalThreshold: USAGE_CRITICAL_THRESHOLD },
      { label: t('usage.admin_usage_main.auto_staffSeats'), used: data.staffCount, limit: data.staffLimit, unit: t('usage.admin_usage_main.auto_unitSeats'), warningThreshold: USAGE_WARNING_THRESHOLD, criticalThreshold: USAGE_CRITICAL_THRESHOLD },
      { label: t('usage.admin_usage_main.auto_branches'), used: data.branchCount, limit: data.branchLimit, unit: t('usage.admin_usage_main.auto_unitBranches'), warningThreshold: USAGE_WARNING_THRESHOLD, criticalThreshold: USAGE_CRITICAL_THRESHOLD },
      { label: t('usage.admin_usage_main.auto_smsThisMonth'), used: data.smsSent, limit: data.smsLimit, unit: t('usage.admin_usage_main.auto_unitSms'), warningThreshold: USAGE_WARNING_THRESHOLD, criticalThreshold: USAGE_CRITICAL_THRESHOLD },
      { label: t('usage.admin_usage_main.auto_storageUsed'), used: data.databaseGb + data.mediaGb, limit: data.storageLimitGb, unit: t('usage.admin_usage_main.auto_unitGb'), warningThreshold: USAGE_WARNING_THRESHOLD, criticalThreshold: USAGE_CRITICAL_THRESHOLD },
      { label: t('usage.admin_usage_main.auto_apiCallsToday'), used: data.apiCallsToday, limit: data.apiCallsLimit, unit: t('usage.admin_usage_main.auto_unitCalls'), warningThreshold: USAGE_WARNING_THRESHOLD, criticalThreshold: USAGE_CRITICAL_THRESHOLD },
    ];
  }, [data, t]);

  const requestUpgrade = async (planName: string): Promise<void> => {
    const confirmed = await confirm({
      title: t('usage.admin_usage_main.auto_upgradeTitle', { planName }),
      message: t('usage.admin_usage_main.auto_upgradeMessage', { planName }),
      confirmText: t('usage.admin_usage_main.auto_upgradeConfirm'),
      cancelText: t('usage.admin_usage_main.auto_upgradeCancel'),
      type: 'warning',
    });
    const intentId = `upgrade-request:${planName}`;
    if (!confirmed) { clearIntentKey(intentId); return; }

    setPendingUpgradePlan(planName);
    try {
      const response = await upgradeMutation.mutateAsync({ planName, idempotencyKey: getIntentKey(intentId) });
      clearIntentKey(intentId);
      showToast(response.message, 'success', `usage-upgrade-success-${planName}`);
    } catch (error) {
      const message = getAdminBackendMessage(error);
      if (message) showToast(message, 'error', `usage-upgrade-error-${planName}`);
      // Preserve the same intent key so an explicit retry reuses the original key.
    } finally {
      setPendingUpgradePlan(null);
    }
  };

  return {
    data: data ?? null,
    metrics,
    planTiers: PLAN_TIERS.map((plan) => ({ ...plan, isCurrent: plan.name === data?.planName })),
    status: query.status,
    error: getAdminBackendMessage(query.error) ?? '',
    refresh: query.refetch,
    requestUpgrade,
    upgradeError: getAdminBackendMessage(upgradeMutation.error) ?? '',
    pendingUpgradePlan,
  };
}
