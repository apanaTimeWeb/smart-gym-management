// DATA FLOW: MSW/Backend → fetchTicketServiceInsights() → TanStack Query → Support Performance & Service Levels UI
// RESPONSIBILITY: Owns query orchestration for Support Performance & Service Levels. No JSX.
'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchTicketServiceInsights } from '@/app/superadmin/tickets/tickets_api/superadmin_tickets_service_insights_api';
export function useSuperadminTicketsV1() {
    return useQuery({ queryKey: ['superadmin', 'tickets_service_insights'], queryFn: fetchTicketServiceInsights });
}
