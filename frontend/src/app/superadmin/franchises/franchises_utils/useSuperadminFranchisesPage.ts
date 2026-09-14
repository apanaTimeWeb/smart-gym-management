// RESPONSIBILITY: Logic hook for the Superadmin Franchises page.
// DATA FLOW: superadminFranchisesApi → useSuperadminFranchisesPage → SuperadminFranchisesClient

'use client';

import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { superadminFranchisesApi } from '@/app/superadmin/franchises/superadmin_franchises_api/superadmin_franchises_api';
import type { SuperadminFranchise, FranchisesFetchState } from '@/app/superadmin/franchises/franchises_types/superadmin_franchises_types';
import type { FranchiseFormValues } from '@/app/superadmin/franchises/franchises_utils/SuperadminFranchisesSchemas';

export function useSuperadminFranchisesPage() {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['superadmin', 'franchises'],
    queryFn: () => superadminFranchisesApi.fetchFranchises(),
  });

  const fetchState: FranchisesFetchState = isLoading ? 'loading' : isError ? 'error' : 'success';
  const raw: SuperadminFranchise[] = data?.data || [];

  const franchises = useMemo(() => {
    if (!search.trim()) return raw;
    const q = search.toLowerCase();
    return raw.filter(
      (f) =>
        f.franchiseName.toLowerCase().includes(q) ||
        f.ownerName.toLowerCase().includes(q) ||
        f.city.toLowerCase().includes(q),
    );
  }, [raw, search]);

  const suspendMutation = useMutation({
    mutationFn: (id: string) => superadminFranchisesApi.suspendFranchise(id),
    onSuccess: (res) => {
      toast.success(res.message || 'Franchise suspended.');
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'franchises'] });
    },
    onError: () => toast.error('Failed to suspend franchise.', { id: 'failed-to-suspend-franchise' }),
  });

  const activateMutation = useMutation({
    mutationFn: (id: string) => superadminFranchisesApi.activateFranchise(id),
    onSuccess: (res) => {
      toast.success(res.message || 'Franchise activated.');
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'franchises'] });
    },
    onError: () => toast.error('Failed to activate franchise.', { id: 'failed-to-activate-franchise' }),
  });

  const editMutation = useMutation({
    mutationFn: (data: { id: string; payload: FranchiseFormValues }) =>
      superadminFranchisesApi.updateFranchise(data.id, data.payload as Partial<SuperadminFranchise>),
    onSuccess: (res) => {
      toast.success(res.message || 'Updated successfully');
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'franchises'] });
    },
    onError: () => toast.error('Failed to update franchise.', { id: 'failed-to-update-franchise' }),
  });

  return {
    franchises,
    fetchState,
    search,
    setSearch,
    handleSuspend: (id: string) => suspendMutation.mutate(id),
    handleActivate: (id: string) => activateMutation.mutate(id),
    handleEdit: (id: string, payload: FranchiseFormValues) => editMutation.mutate({ id, payload }),
    isEditing: editMutation.isPending,
  };
}

