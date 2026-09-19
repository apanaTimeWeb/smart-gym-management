// DATA FLOW: Superadmin UI → useSuperadminBroadcastsData → Superadmin module API/state → consuming component
'use client';
// DATA FLOW: feature API/schema → hook/context → useSuperadminBroadcastsData consumers.
// RESPONSIBILITY: Encapsulates functionality for useSuperadminBroadcastsData.ts
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { broadcastsApi } from '@/app/superadmin/broadcasts/broadcasts_api/SuperadminBroadcastsApi';
import type { Broadcast, SuperadminBroadcastsTenant, BroadcastStatusFilter } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastsTypes';
import { useUrlState } from '@/hooks/useUrlState';
/**
 * Purpose: Encapsulates functionality for useSuperadminBroadcastsData.ts.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export const useSuperadminBroadcastsData = () => {
    const { getParam, setParam } = useUrlState();
    const searchQuery = getParam('search', '');
    const statusFilter = getParam('status', 'ALL') as BroadcastStatusFilter;
    const currentPage = Number(getParam('page', '1'));
    const pageSize = 10;
    const setSearchQuery = (val: string) => { setParam('search', val); setParam('page', '1'); };
    const setStatusFilter = (val: BroadcastStatusFilter) => { setParam('status', val); setParam('page', '1'); };
    const setCurrentPage = (val: number) => setParam('page', String(val));
    const queryParams = useMemo(() => {
        const params: Record<string, string> = {};
        if (searchQuery)
            params.search = searchQuery;
        if (statusFilter !== 'ALL')
            params.status = statusFilter;
        params.page = String(currentPage);
        params.limit = String(pageSize);
        return params;
    }, [searchQuery, statusFilter, currentPage]);
    const queryKey = useMemo(() => ['superadmin', 'broadcasts', queryParams], [queryParams]);
    const { data: broadcastsRes, status: fetchState, error } = useQuery({
        queryKey,
        queryFn: () => broadcastsApi.fetchBroadcasts(queryParams),
    });
    const { data: gymsRes } = useQuery({
        queryKey: ['superadmin', 'broadcasts', 'tenants'],
        queryFn: () => broadcastsApi.fetchTenants(),
    });
    const broadcasts = useMemo(() => (broadcastsRes?.data as Broadcast[]) ?? [], [broadcastsRes]);
    const gyms = useMemo(() => (gymsRes?.data as SuperadminBroadcastsTenant[]) ?? [], [gymsRes]);
    return {
        broadcasts,
        gyms,
        fetchState,
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
