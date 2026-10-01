'use client';
// DATA FLOW: MSW/Backend → fetchInfrastructure() → TanStack Query → Platform API Health UI
// RESPONSIBILITY: Owns query orchestration for Platform API Health. No JSX.
import { useQuery } from '@tanstack/react-query';

import { SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_query_keys/SuperadminSystemOpsInfrastructureQueryKeys';
import { infrastructureApi } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi';

/**
 * Purpose: Owns query orchestration for Platform API Health. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description Owns query orchestration for Platform API Health. No JSX.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminSystemOpsInfrastructureV1() {
    return useQuery({ queryKey: SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS.apiHealth, queryFn: () => infrastructureApi.fetchInfrastructureNodes() });
}
