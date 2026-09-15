// RESPONSIBILITY: Encapsulates functionality for useSuperadminBroadcastsData.ts
import { useMemo, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { broadcastsApi } from '@/app/superadmin/broadcasts/superadmin_broadcasts_api/superadmin_broadcasts_api';
import type { Broadcast, SuperadminBroadcastsTenant, BroadcastStatusFilter } from '@/app/superadmin/broadcasts/superadmin_broadcasts_types/superadmin_broadcasts_types';
import { useSuperadminUrlState } from '@/app/superadmin/superadmin_utils/useSuperadminUrlState';

export const useSuperadminBroadcastsData = () => {
  const queryClient = useQueryClient();
  const { getParam, setParam } = useSuperadminUrlState();

  const searchQuery = getParam('search', '');
  const statusFilter = getParam('status', 'ALL') as BroadcastStatusFilter;

  const setSearchQuery = (val: string) => setParam('search', val);
  const setStatusFilter = (val: BroadcastStatusFilter) => setParam('status', val);

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (searchQuery) params.search = searchQuery;
    if (statusFilter !== 'ALL') params.status = statusFilter;
    return params;
  }, [searchQuery, statusFilter]);

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
    updateBroadcasts
  };
};

