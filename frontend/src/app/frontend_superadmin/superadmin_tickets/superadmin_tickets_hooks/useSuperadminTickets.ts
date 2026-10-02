'use client';// DATA FLOW: Superadmin UI → useSuperadminTickets → Superadmin module API/state → consuming component
// RESPONSIBILITY: Provide ticket list/query state for the Superadmin Tickets surface.
// DATA FLOW: feature API/schema → hook/context → useSuperadminTickets consumers.
import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useDebouncedValue } from '@/hooks/useDebouncedValue';

import { ticketsApi } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_api/SuperadminTicketsApiCrudApi';
import { SUPERADMIN_TICKETS_ALL_FILTER } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_constants/SuperadminTicketsConstants';
import { SUPERADMIN_TICKETS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_constants/SuperadminTicketsQueryKeys';
import { useSuperadminTicketsStore } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_store/useSuperadminTicketsStore';

import type { SupportTicket } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_types/SuperadminTicketsTypes';



const ITEMS_PER_PAGE = 10;
/**
 * Purpose: Provide ticket list/query state for the Superadmin Tickets surface.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description Provide ticket list/query state for the Superadmin Tickets surface.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
/**
 * @description Owns the useSuperadminTickets responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export function useSuperadminTickets() {
    const { search, statusFilter, priorityFilter, currentPage, } = useSuperadminTicketsStore();
    const debouncedSearch = useDebouncedValue(search, 300);
    const queryParams = useMemo(() => {
        const params: Record<string, string> = {
            page: String(currentPage),
            limit: String(ITEMS_PER_PAGE),
        };
        if (debouncedSearch)
            params.search = debouncedSearch;
        if (statusFilter && statusFilter !== SUPERADMIN_TICKETS_ALL_FILTER)
            params.status = statusFilter;
        if (priorityFilter && priorityFilter !== SUPERADMIN_TICKETS_ALL_FILTER)
            params.priority = priorityFilter;
        return params;
    }, [debouncedSearch, statusFilter, priorityFilter, currentPage]);
    const { data: apiResponse, isPending, isError } = useQuery({
        queryKey: SUPERADMIN_TICKETS_QUERY_KEYS.list(queryParams),
        queryFn: () => ticketsApi.fetchTickets(queryParams),
    });
    const paginatedTickets = apiResponse?.data || [];
    const totalItems = apiResponse?.meta?.total || paginatedTickets.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
    return {
        isPending,
        isError,
        totalPages,
        paginatedTickets,
    };
}
