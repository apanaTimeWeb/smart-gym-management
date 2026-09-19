// DATA FLOW: MSW/Backend → fetchTicketServiceInsights() → TanStack Query → Support Performance & Service Levels UI
// RESPONSIBILITY: Owns query orchestration for Support Performance & Service Levels. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchTicketServiceInsights } from '@/app/superadmin/tickets/tickets_api/SuperadminTicketsServiceInsightsApi';
/**
 * Purpose: Owns query orchestration for Support Performance & Service Levels. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminTicketsV1() {
    return useQuery({ queryKey: ['superadmin', 'tickets_service_insights'], queryFn: fetchTicketServiceInsights });
}
