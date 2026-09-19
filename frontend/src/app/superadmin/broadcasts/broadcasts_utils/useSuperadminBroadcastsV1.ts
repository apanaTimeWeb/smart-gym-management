// DATA FLOW: MSW/Backend → fetchBroadcastAudienceInsights() → TanStack Query → Audience Segmentation UI
// RESPONSIBILITY: Owns query orchestration for Audience Segmentation. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchBroadcastAudienceInsights } from '@/app/superadmin/broadcasts/broadcasts_api/SuperadminBroadcastsAudienceInsightsApi';
/**
 * Purpose: Owns query orchestration for Audience Segmentation. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminBroadcastsV1() {
    return useQuery({ queryKey: ['superadmin', 'broadcasts_audience_insights'], queryFn: fetchBroadcastAudienceInsights });
}
