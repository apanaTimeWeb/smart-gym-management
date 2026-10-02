'use client';// DATA FLOW: Superadmin UI → useSuperadminCouponsMutations → Superadmin module API/state → consuming component
// RESPONSIBILITY: Execute Superadmin coupon mutations, confirmations, cache updates, and user feedback.
// DATA FLOW: feature API/schema → hook/context → useSuperadminCouponsMutations consumers.
import { useCallback, useRef } from 'react';

import { couponsApi } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_api/SuperadminCouponsApi';
import { SUPERADMIN_COUPON_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_constants/SuperadminCouponsConstants';
import { useSuperadminCouponsMutation } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_hooks/useSuperadminCouponsMutation';

import type { Coupon, CouponStatus, CouponFormData } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTypes';
import type { UseFormReturn } from 'react-hook-form';


/**
 * Purpose: Execute Superadmin coupon mutations, confirmations, cache updates, and user feedback.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Manages coupons state, queries, and UI interactions for useSuperadminCouponsMutations.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminCouponsMutations → consuming feature component.
export function useSuperadminCouponsMutations(updateCoupons: (updater: (previous: Coupon[]) => Coupon[]) => void, setIsModalOpen: (open: boolean) => void, setIsEditModalOpen: (open: boolean) => void, setSelectedCoupon: (coupon: Coupon | null) => void, selectedCoupon: Coupon | null, form: UseFormReturn<CouponFormData>) {
    const { mutate, isMutating } = useSuperadminCouponsMutation();
    const idempotencyKeysRef = useRef(new Map<string, string>());
    const getKey = (scope: string) => idempotencyKeysRef.current.get(scope) ?? (() => { const key = crypto.randomUUID(); idempotencyKeysRef.current.set(scope, key); return key; })();
    const clearKey = (scope: string) => idempotencyKeysRef.current.delete(scope);
    const handleCreateCoupon = useCallback(async (data: CouponFormData) => {
        const keyScope = 'create';
        const idempotencyKey = getKey(keyScope);
        await mutate(() => couponsApi.createCoupon(data, idempotencyKey), {
            toastId: 'superadmin-coupon-create',
            onSuccess: (newCoupon) => {
                clearKey(keyScope);
                updateCoupons(prev => [newCoupon as Coupon, ...prev]);
                setIsModalOpen(false);
                form.reset();
            },
        });
    }, [form, updateCoupons, mutate, setIsModalOpen]);
    const handleUpdateCoupon = useCallback(async (id: string, data: Partial<CouponFormData>) => {
        if (!selectedCoupon) return;
        const keyScope = `update:${id}`;
        const idempotencyKey = getKey(keyScope);
        await mutate(() => couponsApi.updateCoupon(id, data, idempotencyKey), {
            toastId: `superadmin-coupon-update-${id}`,
            onSuccess: (updatedCoupon) => {
                clearKey(keyScope);
                updateCoupons(prev => prev.map(c => c.id === id ? { ...c, ...(updatedCoupon != null && typeof updatedCoupon === 'object' ? updatedCoupon as Partial<Coupon> : {}) } : c));
                setIsEditModalOpen(false);
                setSelectedCoupon(null);
            },
        });
    }, [selectedCoupon, updateCoupons, mutate, setIsEditModalOpen, setSelectedCoupon]);
    const handleDeleteCoupon = useCallback(async (id: string) => {
        const keyScope = `delete:${id}`;
        const idempotencyKey = getKey(keyScope);
        await mutate(() => couponsApi.deleteCoupon(id, idempotencyKey), {
            toastId: `superadmin-coupon-delete-${id}`,
            onSuccess: () => { clearKey(keyScope); updateCoupons(prev => prev.filter(c => c.id !== id)); },
        });
    }, [updateCoupons, mutate]);
    const handleToggleRestore = useCallback(async (id: string) => {
        const keyScope = `restore:${id}`;
        const idempotencyKey = getKey(keyScope);
        await mutate(() => couponsApi.restoreCoupon(id, idempotencyKey), {
            toastId: `superadmin-coupon-restore-${id}`,
            onSuccess: () => { clearKey(keyScope); updateCoupons(prev => prev.map(c => c.id === id ? { ...c, isDeleted: false } : c)); },
        });
    }, [updateCoupons, mutate]);
    const handleToggleStatus = useCallback(async (id: string, currentStatus: CouponStatus) => {
        if (currentStatus !== SUPERADMIN_COUPON_STATUS_CODES.ACTIVE && currentStatus !== SUPERADMIN_COUPON_STATUS_CODES.INACTIVE) return;
        const newStatus: CouponStatus = currentStatus === SUPERADMIN_COUPON_STATUS_CODES.ACTIVE ? SUPERADMIN_COUPON_STATUS_CODES.INACTIVE : SUPERADMIN_COUPON_STATUS_CODES.ACTIVE;
        const keyScope = `status:${id}`;
        const idempotencyKey = getKey(keyScope);
        await mutate(() => couponsApi.updateCouponStatus(id, newStatus, idempotencyKey), {
            toastId: `superadmin-coupon-status-${id}`,
            onSuccess: () => { clearKey(keyScope); updateCoupons(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c)); },
        });
    }, [updateCoupons, mutate]);
    return {
        isMutating,
        handleCreateCoupon,
        handleUpdateCoupon,
        handleDeleteCoupon,
        handleToggleRestore,
        handleToggleStatus,
    };
}
