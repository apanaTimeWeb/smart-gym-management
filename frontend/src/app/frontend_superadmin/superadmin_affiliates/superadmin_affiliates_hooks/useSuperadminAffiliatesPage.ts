import { SUPERADMIN_AFFILIATE_ALL_FILTER } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_constants/SuperadminAffiliatesConstants';
// DATA FLOW: Superadmin UI → useSuperadminAffiliatesPage → Superadmin module API/state → consuming component
'use client';
// RESPONSIBILITY: useSuperadminAffiliatesPage.ts encapsulates all state and async logic for the Affiliates page.
// DATA FLOW: superadminApi → useSuperadminAffiliatesPage → SuperadminAffiliatesMain
import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { SUPERADMIN_AFFILIATES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_query_keys/SuperadminAffiliatesQueryKeys';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useUnsavedChangesGuard } from '@/hooks/useUnsavedChangesGuard';
import { useUrlState } from '@/hooks/useUrlState';

import { affiliatesApi } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_api/SuperadminAffiliatesApi';
import { AffiliateSchema } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_schemas/SuperadminAffiliatesTypesSchemas';
import { buildSuperadminAffiliatesQueryParams } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_utils/SuperadminAffiliatesQueryUtils';
import { useSuperadminAffiliatesMutations } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_hooks/useSuperadminAffiliatesMutations';

import type { AffiliatesTab } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_types/SuperadminAffiliatesMainTypes';
import type { Affiliate, AffiliateStatusFilter, AffiliateFormData } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_types/SuperadminAffiliatesTypes';

/**
 * Purpose: useSuperadminAffiliatesPage.ts encapsulates all state and async logic for the Affiliates page.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description useSuperadminAffiliatesPage.ts encapsulates all state and async logic for the Affiliates page.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export const useSuperadminAffiliatesPage = () => {
    const t = useTranslations('superadmin_affiliates');
    const queryClient = useQueryClient();
    const { getParam, setParam } = useUrlState();
    const searchQuery = getParam('search', '');
    const statusFilter = getParam('status', SUPERADMIN_AFFILIATE_ALL_FILTER) as AffiliateStatusFilter;
    const startDate = getParam('startDate', '');
    const endDate = getParam('endDate', '');
    const currentPage = Number(getParam('page', '1'));
    const pageLimit = Number(getParam('limit', '10'));
    const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);
    const setSearchQuery = (val: string) => { setParam('search', val); setParam('page', '1'); };
    const setStatusFilter = (val: AffiliateStatusFilter) => { setParam('status', val); setParam('page', '1'); };
    const setStartDate = (val: string) => { setParam('startDate', val); setParam('page', '1'); };
    const setEndDate = (val: string) => { setParam('endDate', val); setParam('page', '1'); };
    const setPage = (page: number) => setParam('page', String(page));
    const queryParams = useMemo(() => buildSuperadminAffiliatesQueryParams({ searchQuery: debouncedSearchQuery, statusFilter, startDate, endDate, currentPage, pageLimit }), [debouncedSearchQuery, statusFilter, startDate, endDate, currentPage, pageLimit]);
    const queryKey = useMemo(() => SUPERADMIN_AFFILIATES_QUERY_KEYS.list(queryParams), [queryParams]);
    const { data: affiliatesResponse, status: fetchState, isError } = useQuery({
        queryKey,
        queryFn: () => affiliatesApi.fetchAffiliates(queryParams),
    });
    const payoutHistoryQuery = useQuery({
        queryKey: SUPERADMIN_AFFILIATES_QUERY_KEYS.payoutHistory,
        queryFn: () => affiliatesApi.fetchPayoutHistory(),
    });
    const affiliates = affiliatesResponse?.data ?? [];
    const total = affiliatesResponse?.meta?.total ?? affiliates.length;
    const totalPages = Math.ceil(total / pageLimit) || 1;
    const updateCachedAffiliates = useCallback((updater: (previous: Affiliate[]) => Affiliate[]) => {
        queryClient.setQueryData(queryKey, (previous: typeof affiliatesResponse | undefined) => {
            if (!previous?.data)
                return previous;
            return { ...previous, data: updater(previous.data) };
        });
    }, [queryClient, queryKey]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAffiliate, setEditingAffiliate] = useState<Affiliate | null>(null);
    const form = useForm<AffiliateFormData>({
        resolver: zodResolver(AffiliateSchema),
        defaultValues: { name: '', email: '', referralCode: '' },
    });
    const [activeTab, setActiveTab] = useState<AffiliatesTab>('AFFILIATES');
    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setEditingAffiliate(null);
        form.reset({ name: '', email: '', referralCode: '' });
    }, [form]);
    const { isMutating, handleAddAffiliate, handleEditAffiliate, handleToggleAffiliateStatus, handleDeleteAffiliate, handlePayCommission, } = useSuperadminAffiliatesMutations(updateCachedAffiliates, setIsModalOpen, setEditingAffiliate, form, editingAffiliate);
    useUnsavedChangesGuard(form.formState.isDirty && isModalOpen && !editingAffiliate?.id, t('ui.unsaved_affiliate_form_discard'));
    const openEditModal = useCallback((affiliate: Affiliate) => {
        setEditingAffiliate(affiliate);
        form.reset({
            name: affiliate.name,
            email: affiliate.email,
            referralCode: affiliate.referralCode,
        });
        setIsModalOpen(true);
    }, [form]);
    const totalAffiliates = affiliates.length;
    const totalCommission = useMemo(() => affiliates.reduce((sum, a) => sum + a.commissionEarned, 0), [affiliates]);
    const filteredAffiliates = affiliates;
    return {
        fetchState,
        isError,
        affiliates: filteredAffiliates,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        activeTab,
        setActiveTab,
        isModalOpen,
        setIsModalOpen,
        handleCloseModal,
        form,
        handleAddAffiliate,
        handleEditAffiliate,
        handleToggleAffiliateStatus,
        handleDeleteAffiliate,
        handlePayCommission,
        openEditModal,
        editingAffiliate,
        setEditingAffiliate,
        isMutating,
        totalAffiliates,
        totalCommission,
        payoutHistory: payoutHistoryQuery.data?.data ?? [],
        payoutHistoryLoading: payoutHistoryQuery.isPending,
        payoutHistoryError: payoutHistoryQuery.isError,
        retryPayoutHistory: () => void payoutHistoryQuery.refetch(),
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        currentPage,
        totalPages,
        setPage,
    };
};
