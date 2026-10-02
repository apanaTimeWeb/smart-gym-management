'use client';// DATA FLOW: Superadmin UI → useSuperadminBroadcastsData → Superadmin module API/state → consuming component
import { SUPERADMIN_BROADCAST_STATUS_FILTER_CODES } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_constants/SuperadminBroadcastsBroadcastConstants';

// DATA FLOW: feature API/schema → hook/context → useSuperadminBroadcastsData consumers.
// RESPONSIBILITY: Encapsulates functionality for useSuperadminBroadcastsData.ts
import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useUrlState } from '@/hooks/useUrlState';

import { broadcastsApi } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_api/SuperadminBroadcastsApi';
import { SUPERADMIN_BROADCASTS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_constants/SuperadminBroadcastsQueryKeys';

import type { Broadcast, SuperadminBroadcastsTenant, BroadcastStatusFilter } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsTypes';


/**
 * Purpose: Encapsulates functionality for useSuperadminBroadcastsData.ts.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Manages broadcasts state, queries, and UI interactions for useSuperadminBroadcastsData.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminBroadcastsData → consuming feature component.
export const useSuperadminBroadcastsData = () => {
    const { getParam, setParam } = useUrlState();
    const searchQuery = getParam('search', '');
    const statusFilter = getParam('status', SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.ALL) as BroadcastStatusFilter;
    const currentPage = Number(getParam('page', '1'));
    const pageSize = 10;
    const setSearchQuery = (val: string) => { setParam('search', val); setParam('page', '1'); };
    const setStatusFilter = (val: BroadcastStatusFilter) => { setParam('status', val); setParam('page', '1'); };
    const setCurrentPage = (val: number) => setParam('page', String(val));
    const queryParams = useMemo(() => {
        const params: Record<string, string> = {};
        if (searchQuery)
            params.search = searchQuery;
        if (statusFilter !== SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.ALL)
            params.status = statusFilter;
        params.page = String(currentPage);
        params.limit = String(pageSize);
        return params;
    }, [searchQuery, statusFilter, currentPage]);
    const queryKey = useMemo(() => SUPERADMIN_BROADCASTS_QUERY_KEYS.list(queryParams), [queryParams]);
    const { data: broadcastsRes, status, error } = useQuery({
        queryKey,
        queryFn: () => broadcastsApi.fetchBroadcasts(queryParams),
    });
    const { data: gymsRes } = useQuery({
        queryKey: SUPERADMIN_BROADCASTS_QUERY_KEYS.tenants,
        queryFn: () => broadcastsApi.fetchTenants(),
    });
    const broadcasts = useMemo(() => (broadcastsRes?.data as Broadcast[]) ?? [], [broadcastsRes]);
    const gyms = useMemo(() => (gymsRes?.data as SuperadminBroadcastsTenant[]) ?? [], [gymsRes]);
    return {
        broadcasts,
        gyms,
        status,
        error,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        currentPage,
        pageSize,
        totalPages: Math.max(1, Math.ceil(Number((broadcastsRes as {
            meta?: {
                total?: number;
            };
        } | undefined)?.meta?.total ?? broadcasts.length) / pageSize)),
        setCurrentPage
    };
};
