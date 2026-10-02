'use client';
// DATA FLOW: Superadmin UI → useSuperadminCoupons → Superadmin module API/state → consuming component
// RESPONSIBILITY: useCouponsPage.ts encapsulates all state and async logic for the Coupons page.
// DATA FLOW: superadminApi → useCouponsPage → CouponsClient
import { useState, useMemo, useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { useUrlState } from '@/hooks/useUrlState';

import { couponsApi } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_api/SuperadminCouponsApi';
import { SUPERADMIN_COUPON_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_constants/SuperadminCouponsConstants';
import { SUPERADMIN_COUPONS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_constants/SuperadminCouponsQueryKeys';
import { useSuperadminCouponsMutations } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_hooks/useSuperadminCouponsMutations';
import { CouponSchema } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_schemas/SuperadminCouponsContractSchemas';
import { useSuperadminLayoutUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard';

import type { Coupon, CouponKpiFilter, CouponFormData } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTypes';


/**
 * Purpose: useCouponsPage.ts encapsulates all state and async logic for the Coupons page.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Manages coupons state, queries, and UI interactions for useSuperadminCoupons.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminCoupons → consuming feature component.
export const useSuperadminCoupons = () => {
    const t = useTranslations('superadmin_coupons');
    const queryClient = useQueryClient();
    const { getParam, setParam } = useUrlState();
    const searchQuery = getParam('search', '');
    const activeKpi = getParam('kpi', SUPERADMIN_COUPON_STATUS_CODES.ALL) as CouponKpiFilter;
    const statusFilter = getParam('status', SUPERADMIN_COUPON_STATUS_CODES.ALL);
    const startDate = getParam('startDate', '');
    const endDate = getParam('endDate', '');
    const setSearchQuery = (val: string) => setParam('search', val);
    const setActiveKpi = (val: CouponKpiFilter) => setParam('kpi', val);
    const setStatusFilter = (val: string) => setParam('status', val);
    const queryParams = useMemo(() => {
        const params: Record<string, string> = {};
        if (searchQuery)
            params.search = searchQuery;
        if (statusFilter !== SUPERADMIN_COUPON_STATUS_CODES.ALL)
            params.status = statusFilter;
        if (activeKpi !== SUPERADMIN_COUPON_STATUS_CODES.ALL)
            params.kpi = activeKpi;
        if (startDate)
            params.startDate = startDate;
        if (endDate)
            params.endDate = endDate;
        return params;
    }, [searchQuery, statusFilter, activeKpi, startDate, endDate]);
    const queryKey = useMemo(() => SUPERADMIN_COUPONS_QUERY_KEYS.list(queryParams), [queryParams]);
    const { data: fetchRes, status, error: queryError } = useQuery({
        queryKey,
        queryFn: () => couponsApi.fetchCoupons(queryParams),
    });
    const coupons = fetchRes?.data ?? [];
    const error = queryError ? 'Coupons could not be loaded. Please retry.' : null;
    const updateCoupons = useCallback((updater: (previous: Coupon[]) => Coupon[]) => {
        queryClient.setQueryData(queryKey, (previous: typeof fetchRes | undefined) => {
            if (!previous?.data)
                return previous;
            return { ...previous, data: updater(previous.data) };
        });
    }, [queryClient, queryKey]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
    const form = useForm<CouponFormData>({
        resolver: zodResolver(CouponSchema),
        defaultValues: {
            code: '',
            discountType: 'PERCENTAGE',
            discountValue: undefined,
            maxUses: undefined,
            expiryDate: '',
        },
    });
    const { isMutating, handleCreateCoupon, handleUpdateCoupon, handleDeleteCoupon, handleToggleRestore, handleToggleStatus, } = useSuperadminCouponsMutations(updateCoupons, setIsModalOpen, setIsEditModalOpen, setSelectedCoupon, selectedCoupon, form);
    useSuperadminLayoutUnsavedChangesGuard(form.formState.isDirty && (isModalOpen || isEditModalOpen) && !isMutating, t('ui.unsaved_coupon_discard_repair'));
    const filteredCoupons = coupons;
    const activeCoupons = useMemo(() => filteredCoupons.filter(c => c.status === SUPERADMIN_COUPON_STATUS_CODES.ACTIVE && !c.isDeleted).length, [filteredCoupons]);
    const totalRedeemed = useMemo(() => filteredCoupons.reduce((sum, c) => sum + c.currentUses, 0), [filteredCoupons]);
    const totalCoupons = useMemo(() => filteredCoupons.length, [filteredCoupons]);
    return {
        status,
        error,
        coupons: filteredCoupons,
        searchQuery,
        setSearchQuery,
        isModalOpen,
        setIsModalOpen,
        form,
        handleCreateCoupon,
        isMutating,
        activeCoupons,
        totalRedeemed,
        isEditModalOpen,
        setIsEditModalOpen,
        selectedCoupon,
        setSelectedCoupon,
        handleUpdateCoupon,
        handleDeleteCoupon,
        handleToggleRestore,
        handleToggleStatus,
        activeKpi,
        setActiveKpi,
        totalCoupons,
        statusFilter,
        setStatusFilter,
    };
};
