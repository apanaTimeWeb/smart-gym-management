'use client';
// DATA FLOW: feature API/schema → hook/context → useSuperadminBroadcastsData consumers.
// RESPONSIBILITY: Encapsulates functionality for useSuperadminBroadcastsData.ts
import { useMemo, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { broadcastsApi } from '@/app/superadmin/broadcasts/superadmin_broadcasts_api/superadmin_broadcasts_api';
import type { Broadcast, SuperadminBroadcastsTenant, BroadcastStatusFilter } from '@/app/superadmin/broadcasts/superadmin_broadcasts_types/superadmin_broadcasts_types';
import { useSuperadminUrlState } from '@/app/superadmin/superadmin_utils/useSuperadminUrlState';
import { useSuperadminDebouncedValue } from '@/app/superadmin/superadmin_utils/useSuperadminDebouncedValue';

export const useSuperadminBroadcastsData = () => {
  const queryClient = useQueryClient();
  const { getParam, setParam } = useSuperadminUrlState();

  const searchQuery = getParam('search', '');
  const debouncedSearchQuery = useSuperadminDebouncedValue(searchQuery);
  const statusFilter = getParam('status', 'ALL') as BroadcastStatusFilter;
  const currentPage = Number(getParam('page', '1'));
  const pageSize = 10;

  const setSearchQuery = (val: string) => { setParam('search', val); setParam('page', '1'); };
  const setStatusFilter = (val: BroadcastStatusFilter) => { setParam('status', val); setParam('page', '1'); };
  const setCurrentPage = (val: number) => setParam('page', String(val));

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (debouncedSearchQuery) params.search = debouncedSearchQuery;
    if (statusFilter !== 'ALL') params.status = statusFilter;
    params.page = String(currentPage);
    params.limit = String(pageSize);
    return params;
  }, [debouncedSearchQuery, statusFilter, currentPage]);

  const queryKey = useMemo(() => ['superadmin', 'broadcasts', queryParams], [queryParams]);

  const { data: broadcastsRes, status: fetchState, error } = useQuery({
    queryKey,
    queryFn: () => broadcastsApi.fetchBroadcasts(queryParams),
  });

  const { data: gymsRes } = useQuery({
    queryKey: ['superadmin', 'gyms'],
    queryFn: () => broadcastsApi.fetchTenants(),
  });

  const updateBroadcasts = useCallback((updater: (prev: Broadcast[]) => Broadcast[]) => {
    queryClient.setQueryData(queryKey, (oldData: { data: Broadcast[] } | undefined) => {
      if (!oldData?.data) return oldData;
      return { ...oldData, data: updater(oldData.data) };
    });
  }, [queryClient, queryKey]);

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
    updateBroadcasts,
    currentPage,
    pageSize,
    totalPages: Math.max(1, Math.ceil(Number((broadcastsRes as { meta?: { total?: number } } | undefined)?.meta?.total ?? broadcasts.length) / pageSize)),
    setCurrentPage
  };
};


