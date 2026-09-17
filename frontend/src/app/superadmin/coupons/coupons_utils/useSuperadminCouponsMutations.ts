// RESPONSIBILITY: Execute Superadmin coupon mutations, confirmations, cache updates, and user feedback.
// DATA FLOW: Superadmin UI → useSuperadminCouponsMutations → Superadmin module API/state → consuming component
'use client';
// DATA FLOW: feature API/schema → hook/context → useSuperadminCouponsMutations consumers.
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useSuperadminCouponsMutation } from '@/app/superadmin/coupons/coupons_utils/useSuperadminCouponsMutation';
import { couponsApi } from '@/app/superadmin/coupons/superadmin_coupons_api/superadmin_coupons_api';
import type { Coupon, CouponStatus, CouponFormData } from '@/app/superadmin/coupons/superadmin_coupons_types/superadmin_coupons_types';
import type { UseFormReturn } from 'react-hook-form';
export function useSuperadminCouponsMutations(updateCoupons: (updater: (previous: Coupon[]) => Coupon[]) => void, setIsModalOpen: (open: boolean) => void, setIsEditModalOpen: (open: boolean) => void, setSelectedCoupon: (coupon: Coupon | null) => void, selectedCoupon: Coupon | null, form: UseFormReturn<CouponFormData>) {
    const { mutate, isMutating } = useSuperadminCouponsMutation();
    const handleCreateCoupon = useCallback(async (data: CouponFormData) => {
        await mutate(() => couponsApi.createCoupon(data), {
            onSuccess: (newCoupon) => {
                updateCoupons(prev => [newCoupon as Coupon, ...prev]);
                setIsModalOpen(false);
                form.reset();
            },
        });
    }, [form, updateCoupons, mutate, setIsModalOpen]);
    const handleUpdateCoupon = useCallback(async (id: string, data: Partial<CouponFormData>) => {
        if (!selectedCoupon)
            return;
        await mutate(() => couponsApi.updateCoupon(id, data), {
            onSuccess: (updatedCoupon) => {
                updateCoupons(prev => prev.map(c => c.id === id ? { ...c, ...(updatedCoupon != null && typeof updatedCoupon === 'object' ? updatedCoupon as Partial<Coupon> : {}) } : c));
                setIsEditModalOpen(false);
                setSelectedCoupon(null);
            },
        });
    }, [selectedCoupon, updateCoupons, mutate, setIsEditModalOpen, setSelectedCoupon]);
    const handleDeleteCoupon = useCallback(async (id: string) => {
        await mutate(() => couponsApi.deleteCoupon(id), {
            onSuccess: () => updateCoupons(prev => prev.filter(c => c.id !== id)),
        });
    }, [updateCoupons, mutate]);
    const handleToggleRestore = useCallback(async (id: string) => {
        await mutate(() => couponsApi.restoreCoupon(id), {
            onSuccess: () => updateCoupons(prev => prev.map(c => c.id === id ? { ...c, isDeleted: false } : c)),
        });
    }, [updateCoupons, mutate]);
    const handleToggleStatus = useCallback(async (id: string, currentStatus: CouponStatus) => {
        if (currentStatus !== 'ACTIVE' && currentStatus !== 'INACTIVE') {
            toast.error(`Cannot toggle status of ${currentStatus.toLowerCase()} coupon`, { id: 'toggle-error' });
            return;
        }
        const newStatus: CouponStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        await mutate(() => couponsApi.toggleStatus(id, newStatus), {
            onSuccess: () => updateCoupons(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c)),
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
