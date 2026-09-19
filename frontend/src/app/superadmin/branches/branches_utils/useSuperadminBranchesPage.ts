// DATA FLOW: branches API → TanStack Query → URL-backed filters/pagination → Superadmin branches UI
'use client';
// RESPONSIBILITY: Owns URL-backed search/filter/pagination and server-state for the Superadmin Branches list.
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { superadminBranchesApi } from '@/app/superadmin/branches/branches_api/SuperadminBranchesApi';
import type { BranchStatus, SuperadminBranchStatusFilter, SuperadminBranch } from '@/app/superadmin/branches/branches_types/SuperadminBranchesTypes';
import type { SuperadminBranchMutationTarget, SuperadminBranchStatusSelection } from '@/app/superadmin/branches/branches_types/SuperadminBranchesMutationTypes';
import { useUrlState } from '@/hooks/useUrlState';
const BRANCH_PAGE_SIZE = 10;
/**
 * Purpose: Owns URL-backed search/filter/pagination and server-state for the Superadmin Branches list.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminBranchesPage() {
    const queryClient = useQueryClient();
    const { getParam, setParam } = useUrlState();
    const search = getParam('search', '');
    const statusFilter = getParam('statusFilter', 'ALL') as SuperadminBranchStatusFilter;
    const currentPage = Math.max(1, Number(getParam('page', '1')) || 1);
    const setSearch = (value: string) => { setParam('search', value); setParam('page', '1'); };
    const setStatusFilter = (value: SuperadminBranchStatusSelection) => { setParam('statusFilter', value); setParam('page', '1'); };
    const setCurrentPage = (value: number) => setParam('page', String(value));
    const queryParams = useMemo(() => ({ page: String(currentPage), limit: String(BRANCH_PAGE_SIZE), ...(search ? { search } : {}), ...(statusFilter !== 'ALL' ? { statusFilter } : {}) }), [currentPage, search, statusFilter]);
    const queryKey = useMemo(() => ['superadmin', 'branches', queryParams], [queryParams]);
    const query = useQuery({ queryKey, queryFn: () => superadminBranchesApi.fetchBranches(queryParams), placeholderData: (previous) => previous });
    const branches: SuperadminBranch[] = query.data?.data ?? [];
    const total = query.data?.meta?.total ?? branches.length;
    const totalPages = Math.max(1, Math.ceil(total / BRANCH_PAGE_SIZE));
    const suspendMutation = useMutation({ mutationFn: ({ id, idempotencyKey }: SuperadminBranchMutationTarget) => superadminBranchesApi.suspendBranch(id, idempotencyKey), onSuccess: (res) => { toast.success(res.message, { id: 'branch-suspend-success' }); queryClient.invalidateQueries({ queryKey: ['superadmin', 'branches'] }); }, onError: (err: Error) => toast.error(err.message, { id: 'branch-suspend-error' }) });
    const activateMutation = useMutation({ mutationFn: ({ id, idempotencyKey }: SuperadminBranchMutationTarget) => superadminBranchesApi.activateBranch(id, idempotencyKey), onSuccess: (res) => { toast.success(res.message, { id: 'branch-activate-success' }); queryClient.invalidateQueries({ queryKey: ['superadmin', 'branches'] }); }, onError: (err: Error) => toast.error(err.message, { id: 'branch-activate-error' }) });
    return { branches, isPending: query.isPending, isError: query.isError, search, setSearch, statusFilter, setStatusFilter, currentPage, setCurrentPage, total, totalPages, handleSuspend: (id: string) => suspendMutation.mutate({ id, idempotencyKey: crypto.randomUUID() }), handleActivate: (id: string) => activateMutation.mutate({ id, idempotencyKey: crypto.randomUUID() }) };
}
