'use client';
// DATA FLOW: Superadmin UI → useSuperadminAffiliatesMutations → Superadmin module API/state → consuming component
// RESPONSIBILITY: Execute Superadmin affiliate mutations, confirmations, cache updates, and user feedback.
// DATA FLOW: feature API/schema → hook/context → useSuperadminAffiliatesMutations consumers.
import { useCallback, useRef } from 'react';

import { useTranslations } from 'next-intl';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import { affiliatesApi } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_api/SuperadminAffiliatesApi';
import { SUPERADMIN_AFFILIATE_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_constants/SuperadminAffiliatesConstants';
import { useSuperadminAffiliatesMutation } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_hooks/useSuperadminAffiliatesMutation';

import type { Affiliate, AffiliateStatus, AffiliateFormData } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_types/SuperadminAffiliatesTypes';
import type { UseFormReturn } from 'react-hook-form';



/**
 * Purpose: Execute Superadmin affiliate mutations, confirmations, cache updates, and user feedback.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description Execute Superadmin affiliate mutations, confirmations, cache updates, and user feedback.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
/**
 * @description Owns the useSuperadminAffiliatesMutations responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export function useSuperadminAffiliatesMutations(updateCachedAffiliates: (updater: (previous: Affiliate[]) => Affiliate[]) => void, setIsModalOpen: (open: boolean) => void, setEditingAffiliate: (affiliate: Affiliate | null) => void, form: UseFormReturn<AffiliateFormData>, editingAffiliate: Affiliate | null) {
    const t = useTranslations('superadmin_affiliates');
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
        const confirmed = await confirm({ title: currentStatus === SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE ? t('ui.confirm_suspend_affiliate_title') : t('ui.confirm_activate_affiliate_title'), message: currentStatus === SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE ? t('ui.suspend_affiliate_mutation_message') : t('ui.activate_affiliate_mutation_message'), type: currentStatus === SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE ? 'danger' : 'info', confirmText: currentStatus === SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE ? t('ui.suspend_affiliate_action') : t('ui.activate_affiliate_action'), cancelText: t('ui.cancel_action') });
        if (!confirmed) return;
        const newStatus: AffiliateStatus = currentStatus === SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE ? SUPERADMIN_AFFILIATE_STATUS_CODES.INACTIVE : SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE;
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
        const confirmed = await confirm({ title: t('ui.confirm_delete_affiliate_title'), message: t('ui.delete_affiliate_short_message'), type: 'danger', confirmText: t('ui.delete_action'), cancelText: t('ui.cancel_action') });
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
