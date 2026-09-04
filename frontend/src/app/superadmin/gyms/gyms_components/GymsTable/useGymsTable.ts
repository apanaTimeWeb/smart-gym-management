// RESPONSIBILITY: Provides the logic and state for the GymsTable component using TanStack Query.
// DATA FLOW: superadminApi -> useQuery -> useGymsTable -> GymsTable

import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { superadminApi } from '@/app/superadmin/superadmin_api/superadmin_api';
import { useGymsStore } from '@/app/superadmin/gyms/gyms_store/useGymsStore';
import type { Tenant } from '@/app/superadmin/superadmin_types/superadmin_types';

export function useGymsTable() {
  const search = useGymsStore(state => state.search);
  const openDeleteModal = useGymsStore(state => state.openDeleteModal);
  const openEditModal = useGymsStore(state => state.openEditModal);
  const openWhatsappModal = useGymsStore(state => state.openWhatsappModal);

  const queryClient = useQueryClient();

  // Fetch Gyms
  const { data: fetchRes, isLoading, isError } = useQuery({
    queryKey: ['superadmin', 'gyms'],
    queryFn: () => superadminApi.gyms.fetchGyms(),
  });

  const gyms = fetchRes?.data || [];
  const fetchState = isLoading ? 'loading' : isError ? 'error' : 'success';

  // Fallback Client-side filter
  const filteredGyms = useMemo(() => {
    if (!gyms) return [];
    if (!search) return gyms;
    return gyms.filter(g =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.ownerName.toLowerCase().includes(search.toLowerCase())
    );
  }, [gyms, search]);

  // Mutations
  const impersonateMutation = useMutation({
    mutationFn: (id: string) => superadminApi.gyms.impersonateTenant(id),
    onSuccess: (res, id) => {
      if (res.success && res.data?.token) {
        toast.success(res.message || 'Impersonating tenant...');
        localStorage.setItem('gymsmart_impersonate_token', res.data.token);
        window.location.href = '/admin/dashboard';
      } else {
        toast.error(res.message || 'Failed to impersonate tenant');
      }
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to impersonate tenant');
    },
  });

  const suspendMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => superadminApi.gyms.changeGymStatus(id, status),
    onSuccess: (res) => {
      toast.success(res.message || 'Status updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'gyms'] });
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update status');
    },
  });

  const actionLoadingId = impersonateMutation.isPending 
    ? impersonateMutation.variables 
    : suspendMutation.isPending 
      ? suspendMutation.variables?.id 
      : null;

  const handleRowClick = (gym: Tenant) => {
    openEditModal(gym);
  };

  const onGhostLoginClick = (e: React.MouseEvent, gymId: string, gymName: string) => {
    e.stopPropagation();
    impersonateMutation.mutate(gymId);
  };

  const onSuspendClick = (e: React.MouseEvent, gymId: string, gymName: string, currentStatus: string) => {
    e.stopPropagation();
    const newStatus = currentStatus === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';
    suspendMutation.mutate({ id: gymId, status: newStatus });
  };

  const onDeleteClick = (e: React.MouseEvent, gym: Tenant) => {
    e.stopPropagation();
    openDeleteModal(gym);
  };

  return {
    filteredGyms,
    fetchState,
    error: isError ? 'Error loading gyms' : null,
    actionLoadingId,
    handleRowClick,
    onGhostLoginClick,
    onSuspendClick,
    onDeleteClick,
    openEditModal,
    openWhatsappModal,
  };
}
