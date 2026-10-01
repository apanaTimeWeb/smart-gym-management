'use client';
// DATA FLOW: Inputs enter useSuperadminSystemOpsInfrastructureActions, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns Infrastructure cache-flush mutations and Query reconciliation.
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_query_keys/SuperadminSystemOpsInfrastructureQueryKeys';
import { infrastructureApi } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi';

import type { SuperadminInfrastructureTenantFlushInput } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_types/SuperadminSystemOpsInfrastructureMutationTypes';

/**
 * Purpose: Provides feature-owned global/tenant cache flush actions.
 * Inputs: selected tenant identifiers for tenant-specific flushes.
 * Output: mutateAsync actions and pending/error state.
 * Side effects: invalidates Infrastructure Query data after successful mutation.
 * Invariant: no cache mutation is triggered directly from JSX.
 
 * @description Provides feature-owned global/tenant cache flush actions.
 * @dependencies selected tenant identifiers for tenant-specific flushes.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminSystemOpsInfrastructureActions() {
  const queryClient = useQueryClient();
  const reconcile = () => queryClient.invalidateQueries({ queryKey: SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS.all });
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
