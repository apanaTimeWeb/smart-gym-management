// RESPONSIBILITY: Provide ticket list/query state for the Superadmin Tickets surface.
// DATA FLOW: Superadmin UI → useSuperadminTickets → Superadmin module API/state → consuming component
'use client';
// DATA FLOW: feature API/schema → hook/context → useSuperadminTickets consumers.
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ticketsApi } from '@/app/superadmin/tickets/superadmin_tickets_api/superadmin_tickets_api';
import type { SupportTicket } from '@/app/superadmin/tickets/superadmin_tickets_types/superadmin_tickets_types';
import { useSuperadminTicketsStore } from '@/app/superadmin/tickets/tickets_store/useSuperadminTicketsStore';
const ITEMS_PER_PAGE = 10;
export function useSuperadminTickets() {
    const { search, statusFilter, priorityFilter, currentPage, } = useSuperadminTicketsStore();
    const queryParams = useMemo(() => {
        const params: Record<string, string> = {
            page: String(currentPage),
            limit: String(ITEMS_PER_PAGE),
        };
        if (search)
            params.search = search;
        if (statusFilter && statusFilter !== 'ALL')
            params.status = statusFilter;
        if (priorityFilter && priorityFilter !== 'ALL')
            params.priority = priorityFilter;
        return params;
    }, [search, statusFilter, priorityFilter, currentPage]);
    const { data: apiResponse, isLoading, error: queryError } = useQuery({
        queryKey: ['superadmin', 'tickets', queryParams],
        queryFn: () => ticketsApi.fetchTickets(queryParams),
    });
    const paginatedTickets = apiResponse?.data || [];
    const totalItems = apiResponse?.meta?.total || paginatedTickets.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
    const error = queryError instanceof Error ? queryError.message : null;
    return {
        isLoading,
        error,
        totalPages,
        paginatedTickets,
    };
}
