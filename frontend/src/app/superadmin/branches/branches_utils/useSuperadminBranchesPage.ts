// RESPONSIBILITY: Logic hook for the Superadmin Branches page.
// DATA FLOW: superadminBranchesApi → useSuperadminBranchesPage → SuperadminBranchesClient

'use client';

import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { superadminBranchesApi } from '@/app/superadmin/branches/superadmin_branches_api/superadmin_branches_api';
import { MOCK_BRANCHES } from '@/app/superadmin/branches/branches_utils/SuperadminBranchesConstants';
import type { SuperadminBranch, BranchesFetchState } from '@/app/superadmin/branches/branches_types/superadmin_branches_types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useSuperadminBranchesPage() {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['superadmin', 'branches'],
    queryFn: () => superadminBranchesApi.fetchBranches(),
  });

  const fetchState: BranchesFetchState = isLoading ? 'loading' : isError ? 'error' : 'success';
  const rawBranches: SuperadminBranch[] = data?.data && data.data.length > 0 ? data.data : MOCK_BRANCHES;

  const branches = useMemo(() => {
    if (!search.trim()) return rawBranches;
    const q = search.toLowerCase();
    return rawBranches.filter(
      (b) =>
        b.branchName.toLowerCase().includes(q) ||
        b.tenantName.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q) ||
        b.managerName.toLowerCase().includes(q),
    );
  }, [rawBranches, search]);

  const suspendMutation = useMutation({
    mutationFn: (id: string) => superadminBranchesApi.suspendBranch(id),
    onSuccess: (res) => {
      toast.success(res.message || 'Branch suspended.');
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'branches'] });
    },
    onError: () => toast.error('Failed to suspend branch.'),
  });

  const activateMutation = useMutation({
    mutationFn: (id: string) => superadminBranchesApi.activateBranch(id),
    onSuccess: (res) => {
      toast.success(res.message || 'Branch activated.');
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'branches'] });
    },
    onError: () => toast.error('Failed to activate branch.'),
  });

  return {
    branches,
    fetchState,
    search,
    setSearch,
    handleSuspend: (id: string) => suspendMutation.mutate(id),
    handleActivate: (id: string) => activateMutation.mutate(id),
  };
}
