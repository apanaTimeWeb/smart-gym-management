import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_constants/SuperadminSystemOpsInfrastructureQueryKeys';

import type { MutableRefObject } from 'react';



/** Owns the confirmed infrastructure cache-flush mutation. */
/**
 * @description Coordinates confirmed tenant-cache flush mutations and authoritative query invalidation.
 * @dependencies Uses the infrastructure API facade, selected tenant IDs, idempotency-key ref, and caller-owned success callback.
 * @edge-case Reuses one key for retries of the same flush intent and never converts a failed mutation into a success state.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminSystemOpsInfrastructureFlushTenantMutation → owning feature view/components.
/**
 * @description Owns the feature-local superadmin system ops infrastructure flush tenant mutation responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminSystemOpsInfrastructureFlushTenantMutation(onFlush: (tenantIds: string[], idempotencyKey: string) => Promise<unknown>, selectedTenantIds: string[], idempotencyKeyRef: MutableRefObject<string | null>, confirmAction: () => Promise<boolean>, onSuccess: (completed: boolean) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const confirmed = await confirmAction();
      if (!confirmed) return false;
      idempotencyKeyRef.current ??= crypto.randomUUID();
      await onFlush(selectedTenantIds, idempotencyKeyRef.current);
      return true;
    },
    onSuccess: async (completed) => {
      if (completed) {
        await queryClient.invalidateQueries({ queryKey: SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS.all });
        await queryClient.invalidateQueries({ queryKey: SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS.redis });
        await queryClient.invalidateQueries({ queryKey: SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS.tenants });
      }
      onSuccess(completed);
    },
  });
}

