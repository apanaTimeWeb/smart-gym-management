'use client';// DATA FLOW: Superadmin UI → useSuperadminGymsGymEditModal → Superadmin module API/state → consuming component
// RESPONSIBILITY: Handles form validation, modal state, and API submission for editing a Gym.
// DATA FLOW: SuperadminGymsGymEditModal -> useSuperadminGymsGymEditModal -> API
import { useEffect, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsApi';
import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_constants/SuperadminGymsQueryKeys';
import { gymEditSchema } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_schemas/SuperadminGymsSchema';
import { useSuperadminGymsStore } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_store/useSuperadminGymsStore';
import { useSuperadminLayoutUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard';

import type { GymEditFormValues } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_schemas/SuperadminGymsSchema';


/**
 * Purpose: Handles form validation, modal state, and API submission for editing a Gym.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Manages gyms state, queries, and UI interactions for useSuperadminGymsGymEditModal.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminGymsGymEditModal → consuming feature component.
export function useSuperadminGymsGymEditModal() {
    const t = useTranslations('superadmin_gyms');
    const idempotencyKeyRef = useRef<string | null>(null);
    const isEditModalOpen = useSuperadminGymsStore(state => state.isEditModalOpen);
    const closeEditModal = useSuperadminGymsStore(state => state.closeEditModal);
    const selectedGym = useSuperadminGymsStore(state => state.selectedGym);
    const queryClient = useQueryClient();
    const { data: fetchRes, isPending: loadingPlans } = useQuery({
        queryKey: SUPERADMIN_GYMS_QUERY_KEYS.subscriptionPlans,
        queryFn: () => gymsApi.fetchSubscriptionPlans(),
    });
    const plans = fetchRes?.data || [];
    const { register, handleSubmit, reset, control, formState: { errors, isSubmitting, isDirty }, } = useForm<GymEditFormValues>({
        resolver: zodResolver(gymEditSchema),
    });
    // RESPONSIBILITY: Handle side-effects for useSuperadminGymsGymEditModal
    // EXPLANATION: Synchronize component state with external dependencies.
    // EFFECT DEPENDENCIES: Documented intentionally.
    // EFFECT INTENT: Synchronize local/UI state with the listed external dependencies.
    useEffect(() => {
        if (selectedGym && isEditModalOpen) {
            reset({
                name: selectedGym.name,
                ownerName: selectedGym.ownerName,
                adminEmail: selectedGym.adminEmail,
                phone: selectedGym.phone,
                plan: selectedGym.plan,
                temporaryPassword: '',
            });
        }
    }, [selectedGym, isEditModalOpen, reset]);
    const editMutation = useMutation({
        mutationFn: ({ data, idempotencyKey }: { data: GymEditFormValues; idempotencyKey: string }) => gymsApi.updateGym(selectedGym!.id, data, idempotencyKey),
        onSuccess: (res) => {
            toast.success(res.message, { id: 'superadmin-toast-39776d5602' });
            queryClient.invalidateQueries({ queryKey: SUPERADMIN_GYMS_QUERY_KEYS.all });
            idempotencyKeyRef.current = null;
            closeEditModal();
        },
        onError: (err: unknown) => {
            toast.error((err as Error).message, { id: 'failed-to-update-gym' });
        }
    });
    useSuperadminLayoutUnsavedChangesGuard(isDirty && isEditModalOpen && !editMutation.isPending, t('ui.unsaved_gym_changes_discard_repair'));
    const onSubmit = async (data: GymEditFormValues) => {
        if (selectedGym) {
            idempotencyKeyRef.current ??= crypto.randomUUID();
            editMutation.mutate({ data, idempotencyKey: idempotencyKeyRef.current });
        }
    };
    return {
        isEditModalOpen,
        closeEditModal,
        selectedGym,
        plans,
        loadingPlans,
        register,
        handleSubmit,
        onSubmit,
        control,
        errors,
        isDirty,
        isSubmitting: isSubmitting || editMutation.isPending,
    };
}
