'use client';
// RESPONSIBILITY: Logic hook for the Superadmin Branches page.
// DATA FLOW: superadminBranchesApi → useSuperadminBranchesPage → SuperadminBranchesClient

import { useState, useMemo, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { superadminBranchesApi } from '@/app/superadmin/branches/superadmin_branches_api/superadmin_branches_api';
import type { SuperadminBranch, BranchesFetchState } from '@/app/superadmin/branches/branches_types/superadmin_branches_types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useSuperadminBranchesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [search, setSearch] = useState(initialSearch);
  const queryClient = useQueryClient();

  // Why: Sync search state to URL parameters
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [search, router, searchParams]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['superadmin', 'branches'],
    queryFn: () => superadminBranchesApi.fetchBranches(),
  });

  const fetchState: BranchesFetchState = isLoading ? 'loading' : isError ? 'error' : 'success';
  const rawBranches: SuperadminBranch[] = data?.data || [];

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
      toast.success(res.message || 'Branch suspended successfully.', { id: 'branch-suspend-success' });
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'branches'] });
    },
    onError: (err: Error) => toast.error(err.message || 'Failed to suspend branch.', { id: 'branch-suspend-error' }),
  });

  const activateMutation = useMutation({
    mutationFn: (id: string) => superadminBranchesApi.activateBranch(id),
    onSuccess: (res) => {
      toast.success(res.message || 'Branch activated successfully.', { id: 'branch-activate-success' });
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'branches'] });
    },
    onError: (err: Error) => toast.error(err.message || 'Failed to activate branch.', { id: 'branch-activate-error' }),
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
