// DATA FLOW: MSW/Backend → fetchPlansBusinessControls() → TanStack Query → Plan Comparison & Pricing Control UI
// RESPONSIBILITY: Owns query orchestration for Plan Comparison & Pricing Control. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchPlansBusinessControls } from '@/app/superadmin/saas-billing/plans/plans_api/SuperadminPlansBusinessControlsApi';
/**
 * Purpose: Owns query orchestration for Plan Comparison & Pricing Control. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminPlansV1() {
    return useQuery({ queryKey: ['superadmin', 'plans_business_controls'], queryFn: fetchPlansBusinessControls });
}
