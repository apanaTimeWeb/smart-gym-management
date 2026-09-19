// DATA FLOW: MSW/Backend → fetchInfrastructureApiHealth() → TanStack Query → Platform API Health UI
// RESPONSIBILITY: Owns query orchestration for Platform API Health. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchInfrastructureApiHealth } from '@/app/superadmin/infrastructure/infrastructure_api/SuperadminInfrastructureApiHealthApi';
/**
 * Purpose: Owns query orchestration for Platform API Health. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminInfrastructureV1() {
    return useQuery({ queryKey: ['superadmin', 'infrastructure_api_health'], queryFn: fetchInfrastructureApiHealth });
}
