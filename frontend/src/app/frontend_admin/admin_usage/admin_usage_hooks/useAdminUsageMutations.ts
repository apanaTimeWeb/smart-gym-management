"use client";
// DATA FLOW: Upgrade action → mutation hook → AdminUsageApi → TanStack Query invalidation → Usage UI and backend feedback.
// RESPONSIBILITY: Owns Admin Usage upgrade-request mutation and server-state refresh.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_USAGE_QUERY_KEYS } from '@/app/frontend_admin/admin_usage/admin_usage_constants/AdminUsageQueryKeys';
import { AdminUsageApi } from '@/app/frontend_admin/admin_usage/admin_usage_api/AdminUsageApi';
/**
 * @description useAdminUsageMutations: Owns Admin Usage upgrade-request mutation and server-state refresh.
 * @dependencies Consumes AdminUsageQueryKeys, AdminUsageApi.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminUsageMutations() {
  const queryClient = useQueryClient();
  const upgradeMutation = useMutation({
    mutationFn: ({ planName, idempotencyKey }: { planName: string; idempotencyKey: string }) => AdminUsageApi.requestUpgrade(planName, idempotencyKey),
    onSuccess: () => { void queryClient.invalidateQueries({ queryKey: ADMIN_USAGE_QUERY_KEYS.key() }); },
  });
  return { upgradeMutation };
}
