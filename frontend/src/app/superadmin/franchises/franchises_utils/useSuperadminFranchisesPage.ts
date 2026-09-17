// DATA FLOW: Superadmin UI → useSuperadminFranchisesPage → Superadmin module API/state → consuming component
'use client';
// RESPONSIBILITY: Logic hook for the Superadmin Franchises page.
// DATA FLOW: superadminFranchisesApi → useSuperadminFranchisesPage → SuperadminFranchisesClient
import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { superadminFranchisesApi } from '@/app/superadmin/franchises/superadmin_franchises_api/superadmin_franchises_api';
import type { SuperadminFranchise } from '@/app/superadmin/franchises/franchises_types/superadmin_franchises_types';
import type { FranchiseFormValues } from '@/app/superadmin/franchises/franchises_utils/SuperadminFranchisesSchemas';
import { useSuperadminUrlState } from '@/app/superadmin/superadmin_utils/useSuperadminUrlState';
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
    const { data, isLoading, isError } = useQuery({
        queryKey: ['superadmin', 'franchises', queryParams],
        queryFn: () => superadminFranchisesApi.fetchFranchises(queryParams),
    });
    const raw: SuperadminFranchise[] = data?.data || [];
    const franchises = raw;
    const total = data?.meta?.total || franchises.length;
    const suspendMutation = useMutation({
        mutationFn: (id: string) => superadminFranchisesApi.suspendFranchise(id),
        onSuccess: (res) => {
            toast.success(res.message, { id: 'superadmin-toast-78c608d635' });
            queryClient.invalidateQueries({ queryKey: ['superadmin', 'franchises'] });
        },
        onError: (err: Error) => toast.error(err.message, { id: 'failed-to-suspend-franchise' }),
    });
    const activateMutation = useMutation({
        mutationFn: (id: string) => superadminFranchisesApi.activateFranchise(id),
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
        }) => superadminFranchisesApi.updateFranchise(data.id, data.payload as Partial<SuperadminFranchise>),
        onSuccess: (res) => {
            toast.success(res.message, { id: 'superadmin-toast-5cabc28fd1' });
            queryClient.invalidateQueries({ queryKey: ['superadmin', 'franchises'] });
        },
        onError: (err: Error) => toast.error(err.message, { id: 'failed-to-update-franchise' }),
    });
    return {
        franchises,
        isLoading,
        isError,
        search,
        setSearch,
        currentPage,
        pageLimit,
        setPage,
        total,
        handleSuspend: (id: string) => suspendMutation.mutate(id),
        handleActivate: (id: string) => activateMutation.mutate(id),
        handleEdit: (id: string, payload: FranchiseFormValues) => editMutation.mutate({ id, payload }),
        isEditing: editMutation.isPending,
    };
}
