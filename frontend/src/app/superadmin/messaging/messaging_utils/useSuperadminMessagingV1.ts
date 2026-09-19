// DATA FLOW: MSW/Backend → fetchMessagingTemplateInsights() → TanStack Query → Message Templates & Campaign Results UI
// RESPONSIBILITY: Owns query orchestration for Message Templates & Campaign Results. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchMessagingTemplateInsights } from '@/app/superadmin/messaging/messaging_api/SuperadminMessagingTemplateInsightsApi';
/**
 * Purpose: Owns query orchestration for Message Templates & Campaign Results. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminMessagingV1() {
    return useQuery({ queryKey: ['superadmin', 'messaging_template_insights'], queryFn: fetchMessagingTemplateInsights });
}
