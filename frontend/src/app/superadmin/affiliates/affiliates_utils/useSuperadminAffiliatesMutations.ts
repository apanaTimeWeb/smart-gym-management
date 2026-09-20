// DATA FLOW: Superadmin UI → useSuperadminAffiliatesMutations → Superadmin module API/state → consuming component
// RESPONSIBILITY: Execute Superadmin affiliate mutations, confirmations, cache updates, and user feedback.
'use client';
// DATA FLOW: feature API/schema → hook/context → useSuperadminAffiliatesMutations consumers.
import { useCallback, useRef } from 'react';
import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';
import { affiliatesApi } from '@/app/superadmin/affiliates/affiliates_api/SuperadminAffiliatesApi';
import { useSuperadminAffiliatesMutation } from '@/app/superadmin/affiliates/affiliates_utils/useSuperadminAffiliatesMutation';
import type { Affiliate, AffiliateStatus, AffiliateFormData } from '@/app/superadmin/affiliates/affiliates_types/SuperadminAffiliatesTypes';
import type { UseFormReturn } from 'react-hook-form';
/**
 * Purpose: Execute Superadmin affiliate mutations, confirmations, cache updates, and user feedback.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminAffiliatesMutations(updateCachedAffiliates: (updater: (previous: Affiliate[]) => Affiliate[]) => void, setIsModalOpen: (open: boolean) => void, setEditingAffiliate: (affiliate: Affiliate | null) => void, form: UseFormReturn<AffiliateFormData>, editingAffiliate: Affiliate | null) {
    const { mutate, isMutating } = useSuperadminAffiliatesMutation();
    const idempotencyKeysRef = useRef(new Map<string, string>());
    const getKey = (scope: string) => idempotencyKeysRef.current.get(scope) ?? (() => { const key = crypto.randomUUID(); idempotencyKeysRef.current.set(scope, key); return key; })();
    const clearKey = (scope: string) => idempotencyKeysRef.current.delete(scope);
    const { confirm } = useConfirm();
    const handleAddAffiliate = useCallback(async (data: AffiliateFormData) => {
        const createKey = getKey('create');
        return mutate<Affiliate>(() => affiliatesApi.createAffiliate(data, createKey), {
            toastId: 'superadmin-affiliate-create',
            onSuccess: (res) => {
                clearKey('create');
                updateCachedAffiliates(previous => [res as Affiliate, ...previous]);
                setIsModalOpen(false);
                form.reset();
            },
        });
    }, [form, mutate, updateCachedAffiliates, setIsModalOpen]);
    const handleEditAffiliate = useCallback(async (data: AffiliateFormData) => {
        if (!editingAffiliate) return;
        const updateKey = getKey(`update:${editingAffiliate.id}`);
        return mutate<Affiliate>(() => affiliatesApi.updateAffiliate(editingAffiliate.id, data, updateKey), {
            toastId: `superadmin-affiliate-update-${editingAffiliate.id}`,
            onSuccess: (res) => {
                clearKey(`update:${editingAffiliate.id}`);
                updateCachedAffiliates(previous => previous.map(a => a.id === editingAffiliate.id ? (res as Affiliate) : a));
                setIsModalOpen(false);
                setEditingAffiliate(null);
                form.reset();
            },
        });
    }, [editingAffiliate, form, mutate, updateCachedAffiliates, setIsModalOpen, setEditingAffiliate]);
    const handleToggleAffiliateStatus = useCallback(async (id: string, currentStatus: AffiliateStatus) => {
        const confirmed = await confirm({ title: currentStatus === 'ACTIVE' ? 'Suspend Affiliate' : 'Activate Affiliate', message: currentStatus === 'ACTIVE' ? 'Suspending this affiliate disables its referral activity.' : 'Activating this affiliate restores its referral activity.', type: currentStatus === 'ACTIVE' ? 'danger' : 'info', confirmText: currentStatus === 'ACTIVE' ? 'Suspend' : 'Activate', cancelText: 'Cancel' });
        if (!confirmed) return;
        const newStatus: AffiliateStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        const statusKey = getKey(`status:${id}`);
        return mutate<Affiliate>(() => affiliatesApi.updateAffiliateStatus(id, newStatus, statusKey), {
            toastId: `superadmin-affiliate-status-${id}`,
            onSuccess: (updatedAffiliate) => {
                clearKey(`status:${id}`);
                updateCachedAffiliates(previous => previous.map(a => a.id === id ? updatedAffiliate as Affiliate : a));
            },
        });
    }, [confirm, mutate, updateCachedAffiliates]);
    const handleDeleteAffiliate = useCallback(async (id: string) => {
        const confirmed = await confirm({ title: 'Delete Affiliate', message: 'Delete this affiliate? This action cannot be undone.', type: 'danger', confirmText: 'Delete', cancelText: 'Cancel' });
        if (!confirmed) return;
        const deleteKey = getKey(`delete:${id}`);
        return mutate<void>(() => affiliatesApi.deleteAffiliate(id, deleteKey), {
            toastId: `superadmin-affiliate-delete-${id}`,
            onSuccess: () => {
                clearKey(`delete:${id}`);
                updateCachedAffiliates(previous => previous.filter(a => a.id !== id));
            },
        });
    }, [confirm, mutate, updateCachedAffiliates]);
    const handlePayCommission = useCallback(async (affiliate: Affiliate) => {
        const payKey = getKey(`pay:${affiliate.id}`);
        return mutate<Affiliate>(() => affiliatesApi.payAffiliateCommission(affiliate.id, payKey), {
            toastId: `superadmin-affiliate-pay-${affiliate.id}`,
            onSuccess: (updatedAffiliate) => {
                clearKey(`pay:${affiliate.id}`);
                updateCachedAffiliates((previous) => previous.map((item) => item.id === affiliate.id ? updatedAffiliate as Affiliate : item));
            },
        });
    }, [mutate, updateCachedAffiliates]);
    return {
        isMutating,
        handleAddAffiliate,
        handleEditAffiliate,
        handleToggleAffiliateStatus,
        handleDeleteAffiliate,
        handlePayCommission,
    };
}
