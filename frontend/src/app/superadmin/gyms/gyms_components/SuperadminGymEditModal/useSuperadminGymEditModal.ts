// DATA FLOW: Superadmin UI → useSuperadminGymEditModal → Superadmin module API/state → consuming component
'use client';
// RESPONSIBILITY: Handles form validation, modal state, and API submission for editing a Gym.
// DATA FLOW: SuperadminGymEditModal -> useSuperadminGymEditModal -> API
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSuperadminGymsStore } from '@/app/superadmin/gyms/gyms_store/useSuperadminGymsStore';
import { gymsApi } from '@/app/superadmin/gyms/gyms_api/SuperadminGymsApi';
import { gymEditSchema, type GymEditFormValues } from '@/app/superadmin/gyms/gyms_types/SuperadminGymsSchema';
/**
 * Purpose: Handles form validation, modal state, and API submission for editing a Gym.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminGymEditModal() {
    const isEditModalOpen = useSuperadminGymsStore(state => state.isEditModalOpen);
    const closeEditModal = useSuperadminGymsStore(state => state.closeEditModal);
    const selectedGym = useSuperadminGymsStore(state => state.selectedGym);
    const queryClient = useQueryClient();
    const { data: fetchRes, isPending: loadingPlans } = useQuery({
        queryKey: ['superadmin', 'gyms', 'subscription-plans'],
        queryFn: () => gymsApi.fetchSubscriptionPlans(),
    });
    const plans = fetchRes?.data || [];
    const { register, handleSubmit, reset, control, formState: { errors, isSubmitting, isDirty }, } = useForm<GymEditFormValues>({
        resolver: zodResolver(gymEditSchema),
    });
    // RESPONSIBILITY: Handle side-effects for useSuperadminGymEditModal
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
        mutationFn: (data: GymEditFormValues) => gymsApi.updateGym(selectedGym!.id, data),
        onSuccess: (res) => {
            toast.success(res.message, { id: 'superadmin-toast-39776d5602' });
            queryClient.invalidateQueries({ queryKey: ['superadmin', 'gyms'] });
            closeEditModal();
        },
        onError: (err: unknown) => {
            toast.error((err as Error).message, { id: 'failed-to-update-gym' });
        }
    });
    const onSubmit = async (data: GymEditFormValues) => {
        if (selectedGym) {
            editMutation.mutate(data);
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
