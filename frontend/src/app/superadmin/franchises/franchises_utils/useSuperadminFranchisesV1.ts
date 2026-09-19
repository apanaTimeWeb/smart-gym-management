// DATA FLOW: MSW/Backend → fetchFranchise360() → TanStack Query → Franchise 360 & Branch Comparison UI
// RESPONSIBILITY: Owns query orchestration for Franchise 360 & Branch Comparison. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchFranchise360 } from '@/app/superadmin/franchises/franchises_api/SuperadminFranchises360Api';
/**
 * Purpose: Owns query orchestration for Franchise 360 & Branch Comparison. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminFranchisesV1() {
    return useQuery({ queryKey: ['superadmin', 'franchises_360'], queryFn: fetchFranchise360 });
}
