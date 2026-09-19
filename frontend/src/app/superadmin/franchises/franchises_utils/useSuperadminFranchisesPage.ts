// DATA FLOW: Superadmin UI → useSuperadminFranchisesPage → Superadmin module API/state → consuming component
'use client';
// RESPONSIBILITY: Logic hook for the Superadmin Franchises page.
// DATA FLOW: superadminFranchisesApi → useSuperadminFranchisesPage → SuperadminFranchisesClient
import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { superadminFranchisesApi } from '@/app/superadmin/franchises/franchises_api/SuperadminFranchisesApi';
import type { SuperadminFranchise } from '@/app/superadmin/franchises/franchises_types/SuperadminFranchisesTypes';
import type { FranchiseFormValues } from '@/app/superadmin/franchises/franchises_utils/SuperadminFranchisesSchemas';
import type { SuperadminFranchiseMutationTarget, SuperadminFranchiseUpdateInput } from '@/app/superadmin/franchises/franchises_types/SuperadminFranchisesMutationTypes';
import { useSuperadminUrlState } from '@/app/superadmin/superadmin_infrastructure/useSuperadminUrlState';
/**
 * Purpose: Logic hook for the Superadmin Franchises page.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminFranchisesPage() {
    const { getParam, setParam } = useSuperadminUrlState();
    const search = getParam('search', '');
    const currentPage = Number(getParam('page', '1'));
    const pageLimit = Number(getParam('limit', '20'));
    const setSearch = (val: string) => {
        setParam('search', val);
        setParam('page', '1');
    };
    const setPage = (page: number) => setParam('page', String(page));
    const queryClient = useQueryClient();
    const queryParams = {
        ...(search && { search }),
        page: String(currentPage),
        limit: String(pageLimit),
    };
    const { data, isPending, isError } = useQuery({
        queryKey: ['superadmin', 'franchises', queryParams],
        queryFn: () => superadminFranchisesApi.fetchFranchises(queryParams),
    });
    const raw: SuperadminFranchise[] = data?.data || [];
    const franchises = raw;
    const total = data?.meta?.total || franchises.length;
    const suspendMutation = useMutation({
        mutationFn: ({ id, idempotencyKey }: SuperadminFranchiseMutationTarget) => superadminFranchisesApi.suspendFranchise(id, idempotencyKey),
        onSuccess: (res) => {
            toast.success(res.message, { id: 'superadmin-toast-78c608d635' });
            queryClient.invalidateQueries({ queryKey: ['superadmin', 'franchises'] });
        },
        onError: (err: Error) => toast.error(err.message, { id: 'failed-to-suspend-franchise' }),
    });
    const activateMutation = useMutation({
        mutationFn: ({ id, idempotencyKey }: SuperadminFranchiseMutationTarget) => superadminFranchisesApi.activateFranchise(id, idempotencyKey),
        onSuccess: (res) => {
            toast.success(res.message, { id: 'superadmin-toast-7b30d1c68e' });
            queryClient.invalidateQueries({ queryKey: ['superadmin', 'franchises'] });
        },
        onError: (err: Error) => toast.error(err.message, { id: 'failed-to-activate-franchise' }),
    });
    const editMutation = useMutation({
        mutationFn: (data: {
            id: string;
            payload: FranchiseFormValues;
            idempotencyKey: string;
        }) => superadminFranchisesApi.updateFranchise(data.id, data.payload as Partial<SuperadminFranchise>, data.idempotencyKey),
        onSuccess: (res) => {
            toast.success(res.message, { id: 'superadmin-toast-5cabc28fd1' });
            queryClient.invalidateQueries({ queryKey: ['superadmin', 'franchises'] });
        },
        onError: (err: Error) => toast.error(err.message, { id: 'failed-to-update-franchise' }),
    });
    return {
        franchises,
        isPending,
        isError,
        search,
        setSearch,
        currentPage,
        pageLimit,
        setPage,
        total,
        handleSuspend: (id: string) => suspendMutation.mutate({ id, idempotencyKey: crypto.randomUUID() }),
        handleActivate: (id: string) => activateMutation.mutate({ id, idempotencyKey: crypto.randomUUID() }),
        handleEdit: (id: string, payload: FranchiseFormValues) => editMutation.mutate({ id, payload, idempotencyKey: crypto.randomUUID() }),
        isEditing: editMutation.isPending,
    };
}
