'use client';
// DATA FLOW: Superadmin UI → useSuperadminGymsAddGymForm → Superadmin module API/state → consuming component
// RESPONSIBILITY: Manages form state, validation, and API submission for onboarding a new gym.
// DATA FLOW: SuperadminGymsAddGymForm -> useSuperadminGymsAddGymForm -> gymsApi.createGym
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsApi';
import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_constants/SuperadminGymsQueryKeys';
import { useSuperadminGymsAddGymFormSubmit } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsAddGymFormSubmit';
import { OnboardGymSchema } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_schemas/SuperadminGymsValidationSchemas';
import { useSuperadminLayoutUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard';

import type { OnboardGymFormValues } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_schemas/SuperadminGymsValidationSchemas';


/**
 * Custom hook to encapsulate the logic for the SuperadminGymsAddGymForm component.
 * Handles form validation, UI state (provisioning logs), and API submission.
 */
/**
 * @description Manages gyms state, queries, and UI interactions for useSuperadminGymsAddGymForm.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminGymsAddGymForm → consuming feature component.
export function useSuperadminGymsAddGymForm() {
    const t = useTranslations('superadmin_gyms');
    const [showPassword, setShowPassword] = useState(false);
    const { data: fetchRes, isPending: loadingPlans } = useQuery({
        queryKey: SUPERADMIN_GYMS_QUERY_KEYS.subscriptionPlans,
        queryFn: async () => {
            const res = await gymsApi.fetchSubscriptionPlans();
            return res.data || [];
        },
    });
    const plans = fetchRes || [];
    const form = useForm<OnboardGymFormValues>({
        resolver: zodResolver(OnboardGymSchema),
        defaultValues: { plan: '' },
    });
    const { onSubmit, isProvisioning, provisioningLogs } = useSuperadminGymsAddGymFormSubmit();
    useSuperadminLayoutUnsavedChangesGuard(form.formState.isDirty && !isProvisioning, t('ui.unsaved_gym_details_discard_repair'));
    return {
        form,
        register: form.register,
        handleSubmit: form.handleSubmit,
        onSubmit,
        control: form.control,
        errors: form.formState.errors,
        isDirty: form.formState.isDirty,
        isProvisioning,
        provisioningLogs,
        showPassword,
        setShowPassword,
        plans,
        loadingPlans,
    };
}
