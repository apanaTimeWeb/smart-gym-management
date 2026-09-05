// RESPONSIBILITY: Provides the logic and state for the SuperadminGymsTable component using TanStack Query.
// DATA FLOW: superadminApi -> useQuery -> useSuperadminGymsTable -> SuperadminGymsTable

import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { superadminApi } from '@/app/superadmin/superadmin_api/superadmin_api';
import { useSuperadminGymsStore } from '@/app/superadmin/gyms/gyms_store/useSuperadminGymsStore';
import type { Tenant } from '@/app/superadmin/superadmin_types/superadmin_types';

export function useSuperadminGymsTable() {
  const search = useSuperadminGymsStore(state => state.search);
  const openDeleteModal = useSuperadminGymsStore(state => state.openDeleteModal);
  const openEditModal = useSuperadminGymsStore(state => state.openEditModal);
  const openWhatsappModal = useSuperadminGymsStore(state => state.openWhatsappModal);

  const queryClient = useQueryClient();

  // Fetch Gyms
  const { data: fetchRes, isLoading, isError } = useQuery({
    queryKey: ['superadmin', 'gyms'],
    queryFn: () => superadminApi.gyms.fetchGyms(),
  });

  const MOCK_GYMS: Tenant[] = [
    {
      id: 'gym-1234',
      name: 'Flex Fitness Central',
      ownerName: 'Sarah Connor',
      adminEmail: 'sarah@flexfitness.com',
      phone: '+1 555-0192',
      status: 'ACTIVE',
      plan: 'ENTERPRISE',
      createdAt: '2023-01-15T00:00:00Z',
      memberCount: 1250,
      monthlyRevenue: 12500,
      databaseVersion: 'v1.4'
    },
    {
      id: 'gym-5678',
      name: 'Iron Temple Barbell Club',
      ownerName: 'Arnold Strong',
      adminEmail: 'arnold@irontemple.com',
      phone: '+1 555-9922',
      status: 'ACTIVE',
      plan: 'PRO',
      createdAt: '2023-06-20T00:00:00Z',
      memberCount: 450,
      monthlyRevenue: 4500,
      databaseVersion: 'v1.4'
    },
    {
      id: 'gym-9012',
      name: 'Zenith Yoga & Pilates',
      ownerName: 'Mia Wong',
      adminEmail: 'mia@zenithyoga.com',
      phone: '+1 555-3344',
      status: 'SUSPENDED',
      plan: 'STARTER',
      createdAt: '2023-11-05T00:00:00Z',
      memberCount: 85,
      monthlyRevenue: 850,
      databaseVersion: 'v1.2'
    }
  ];

  const gyms = fetchRes?.data && fetchRes.data.length > 0 ? fetchRes.data : MOCK_GYMS;
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
    onError: (err: unknown) => {
      const error = err as Error;
      toast.error(error.message || 'Failed to impersonate tenant');
    },
  });

  const suspendMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => superadminApi.gyms.changeGymStatus(id, status),
    onSuccess: (res) => {
      toast.success(res.message || 'Status updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'gyms'] });
    },
    onError: (err: unknown) => {
      const error = err as Error;
      toast.error(error.message || 'Failed to update status');
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
