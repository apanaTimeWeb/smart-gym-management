// DATA FLOW: MSW/Backend → fetchCancellationReasonInsights() → TanStack Query → Why Gyms Leave UI
// RESPONSIBILITY: Owns query orchestration for Why Gyms Leave. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchCancellationReasonInsights } from '@/app/superadmin/cancellations/cancellations_api/SuperadminCancellationsReasonInsightsApi';
/**
 * Purpose: Owns query orchestration for Why Gyms Leave. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminCancellationsV1() {
    return useQuery({ queryKey: ['superadmin', 'cancellations_reason_insights'], queryFn: fetchCancellationReasonInsights });
}
