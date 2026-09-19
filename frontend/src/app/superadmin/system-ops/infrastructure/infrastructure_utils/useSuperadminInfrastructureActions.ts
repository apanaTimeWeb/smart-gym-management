// RESPONSIBILITY: Owns Infrastructure cache-flush mutations and Query reconciliation.
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { infrastructureApi } from '@/app/superadmin/system-ops/infrastructure/infrastructure_api/SuperadminInfrastructureApi';
import type { SuperadminInfrastructureTenantFlushInput } from '@/app/superadmin/system-ops/infrastructure/infrastructure_types/SuperadminInfrastructureMutationTypes';
/**
 * Purpose: Provides feature-owned global/tenant cache flush actions.
 * Inputs: selected tenant identifiers for tenant-specific flushes.
 * Output: mutateAsync actions and pending/error state.
 * Side effects: invalidates Infrastructure Query data after successful mutation.
 * Invariant: no cache mutation is triggered directly from JSX.
 */
export function useSuperadminInfrastructureActions() {
  const queryClient = useQueryClient();
  const reconcile = () => queryClient.invalidateQueries({ queryKey: ['superadmin', 'infrastructure'] });
  const globalFlush = useMutation({
    mutationFn: (idempotencyKey: string) => infrastructureApi.flushGlobalCache(idempotencyKey),
    onSuccess: async (response) => { if (!response.success) throw new Error(response.message); await reconcile(); },
  });
  const tenantFlush = useMutation({
    mutationFn: ({ tenantIds, idempotencyKey }: SuperadminInfrastructureTenantFlushInput) => infrastructureApi.flushTenantCache(tenantIds, idempotencyKey),
    onSuccess: async (response) => { if (!response.success) throw new Error(response.message); await reconcile(); },
  });
  return {
    flushGlobalCache: globalFlush.mutateAsync,
    isFlushingGlobal: globalFlush.isPending,
    flushTenantCache: tenantFlush.mutateAsync,
    isFlushingTenant: tenantFlush.isPending,
  };
}
