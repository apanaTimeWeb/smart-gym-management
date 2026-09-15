'use client';
// RESPONSIBILITY: Logic hook for the Superadmin Branches page.
// DATA FLOW: superadminBranchesApi → useSuperadminBranchesPage → SuperadminBranchesClient

import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { superadminBranchesApi } from '@/app/superadmin/branches/superadmin_branches_api/superadmin_branches_api';
import type { SuperadminBranch } from '@/app/superadmin/branches/branches_types/superadmin_branches_types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSuperadminUrlState } from '@/app/superadmin/superadmin_utils/useSuperadminUrlState';

export function useSuperadminBranchesPage() {
  const queryClient = useQueryClient();
  const { getParam, setParam } = useSuperadminUrlState();
  const search = getParam('search', '');
  
  const setSearch = (val: string) => setParam('search', val);

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    return params;
  }, [search]);

  const queryKey = useMemo(() => ['superadmin', 'branches', queryParams], [queryParams]);

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => superadminBranchesApi.fetchBranches(queryParams),
  });


  const branches: SuperadminBranch[] = data?.data || [];

  const suspendMutation = useMutation({
    mutationFn: (id: string) => superadminBranchesApi.suspendBranch(id),
    onSuccess: (res) => {
      toast.success(res.message, { id: 'branch-suspend-success' });
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'branches'] });
    },
    onError: (err: Error) => toast.error(err.message, { id: 'branch-suspend-error' }),
  });

  const activateMutation = useMutation({
    mutationFn: (id: string) => superadminBranchesApi.activateBranch(id),
    onSuccess: (res) => {
      toast.success(res.message, { id: 'branch-activate-success' });
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'branches'] });
    },
    onError: (err: Error) => toast.error(err.message, { id: 'branch-activate-error' }),
  });

  return {
    branches,
    isLoading,
    isError,
    search,
    setSearch,
    handleSuspend: (id: string) => suspendMutation.mutate(id),
    handleActivate: (id: string) => activateMutation.mutate(id),
  };
}
