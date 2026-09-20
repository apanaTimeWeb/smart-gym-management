// DATA FLOW: Superadmin UI → useSuperadminCoupons → Superadmin module API/state → consuming component
'use client';
// RESPONSIBILITY: useCouponsPage.ts encapsulates all state and async logic for the Coupons page.
// DATA FLOW: superadminApi → useCouponsPage → CouponsClient
import { useState, useMemo, useCallback } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUrlState } from '@/hooks/useUrlState';
import { useUnsavedChangesGuard } from '@/hooks/useUnsavedChangesGuard';
import { couponsApi } from '@/app/superadmin/saas-billing/coupons/coupons_api/SuperadminCouponsApi';
import { CouponSchema, type CouponFormData } from '@/app/superadmin/saas-billing/coupons/coupons_types/SuperadminCouponsTypes';
import type { Coupon, CouponKpiFilter } from '@/app/superadmin/saas-billing/coupons/coupons_types/SuperadminCouponsTypes';
import { useSuperadminCouponsMutations } from '@/app/superadmin/saas-billing/coupons/coupons_utils/useSuperadminCouponsMutations';
/**
 * Purpose: useCouponsPage.ts encapsulates all state and async logic for the Coupons page.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export const useSuperadminCoupons = () => {
    const queryClient = useQueryClient();
    const { getParam, setParam } = useUrlState();
    const searchQuery = getParam('search', '');
    const activeKpi = getParam('kpi', 'ALL') as CouponKpiFilter;
    const statusFilter = getParam('status', 'ALL');
    const startDate = getParam('startDate', '');
    const endDate = getParam('endDate', '');
    const setSearchQuery = (val: string) => setParam('search', val);
    const setActiveKpi = (val: CouponKpiFilter) => setParam('kpi', val);
    const setStatusFilter = (val: string) => setParam('status', val);
    const queryParams = useMemo(() => {
        const params: Record<string, string> = {};
        if (searchQuery)
            params.search = searchQuery;
        if (statusFilter !== 'ALL')
            params.status = statusFilter;
        if (activeKpi !== 'ALL')
            params.kpi = activeKpi;
        if (startDate)
            params.startDate = startDate;
        if (endDate)
            params.endDate = endDate;
        return params;
    }, [searchQuery, statusFilter, activeKpi, startDate, endDate]);
    const queryKey = useMemo(() => ['superadmin', 'coupons', queryParams], [queryParams]);
    const { data: fetchRes, status: fetchState, error: queryError } = useQuery({
        queryKey,
        queryFn: () => couponsApi.fetchCoupons(queryParams),
    });
    const coupons = fetchRes?.data ?? [];
    const error = queryError instanceof Error ? queryError.message : null;
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
    useUnsavedChangesGuard(form.formState.isDirty && (isModalOpen || isEditModalOpen) && !isMutating, 'You have unsaved coupon changes. Discard?');
    const filteredCoupons = coupons;
    const activeCoupons = useMemo(() => filteredCoupons.filter(c => c.status === 'ACTIVE' && !c.isDeleted).length, [filteredCoupons]);
    const totalRedeemed = useMemo(() => filteredCoupons.reduce((sum, c) => sum + c.currentUses, 0), [filteredCoupons]);
    const totalCoupons = useMemo(() => filteredCoupons.length, [filteredCoupons]);
    return {
        fetchState,
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
