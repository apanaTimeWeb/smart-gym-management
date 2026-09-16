'use client';
// RESPONSIBILITY: Owns URL-backed search/filter/pagination and server-state for the Superadmin Branches list.
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { superadminBranchesApi } from '@/app/superadmin/branches/superadmin_branches_api/superadmin_branches_api';
import type { BranchStatus, SuperadminBranch } from '@/app/superadmin/branches/branches_types/superadmin_branches_types';
import { useSuperadminUrlState } from '@/app/superadmin/superadmin_utils/useSuperadminUrlState';

const BRANCH_PAGE_SIZE = 10;

export function useSuperadminBranchesPage() {
  const queryClient = useQueryClient();
  const { getParam, setParam } = useSuperadminUrlState();
  const search = getParam('search', '');
  const statusFilter = getParam('statusFilter', 'ALL') as 'ALL' | BranchStatus;
  const currentPage = Math.max(1, Number(getParam('page', '1')) || 1);
  const setSearch = (value: string) => { setParam('search', value); setParam('page', '1'); };
  const setStatusFilter = (value: 'ALL' | BranchStatus) => { setParam('statusFilter', value); setParam('page', '1'); };
  const setCurrentPage = (value: number) => setParam('page', String(value));
  const queryParams = useMemo(() => ({ page: String(currentPage), limit: String(BRANCH_PAGE_SIZE), ...(search ? { search } : {}), ...(statusFilter !== 'ALL' ? { statusFilter } : {}) }), [currentPage, search, statusFilter]);
  const queryKey = useMemo(() => ['superadmin', 'branches', queryParams], [queryParams]);
  const query = useQuery({ queryKey, queryFn: () => superadminBranchesApi.fetchBranches(queryParams), placeholderData: (previous) => previous });
  const branches: SuperadminBranch[] = query.data?.data ?? [];
  const total = query.data?.meta?.total ?? branches.length;
  const totalPages = Math.max(1, Math.ceil(total / BRANCH_PAGE_SIZE));
  const suspendMutation = useMutation({ mutationFn: (id: string) => superadminBranchesApi.suspendBranch(id), onSuccess: (res) => { toast.success(res.message, { id: 'branch-suspend-success' }); queryClient.invalidateQueries({ queryKey: ['superadmin', 'branches'] }); }, onError: (err: Error) => toast.error(err.message, { id: 'branch-suspend-error' }) });
  const activateMutation = useMutation({ mutationFn: (id: string) => superadminBranchesApi.activateBranch(id), onSuccess: (res) => { toast.success(res.message, { id: 'branch-activate-success' }); queryClient.invalidateQueries({ queryKey: ['superadmin', 'branches'] }); }, onError: (err: Error) => toast.error(err.message, { id: 'branch-activate-error' }) });
  return { branches, isLoading: query.isLoading, isError: query.isError, search, setSearch, statusFilter, setStatusFilter, currentPage, setCurrentPage, total, totalPages, handleSuspend: (id: string) => suspendMutation.mutate(id), handleActivate: (id: string) => activateMutation.mutate(id) };
}
