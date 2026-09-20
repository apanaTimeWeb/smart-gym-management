// DATA FLOW: Superadmin UI → useSuperadminAddGymForm → Superadmin module API/state → consuming component
'use client';
import { useUnsavedChangesGuard } from '@/hooks/useUnsavedChangesGuard';
// RESPONSIBILITY: Manages form state, validation, and API submission for onboarding a new gym.
// DATA FLOW: SuperadminAddGymForm -> useSuperadminAddGymForm -> gymsApi.createGym
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OnboardGymSchema } from '@/app/superadmin/gyms/gyms_utils/SuperadminGymsValidationSchemas';
import type { OnboardGymFormValues } from '@/app/superadmin/gyms/gyms_utils/SuperadminGymsValidationSchemas';
import { useQuery } from '@tanstack/react-query';
import { gymsApi } from '@/app/superadmin/gyms/gyms_api/SuperadminGymsApi';
import { useSuperadminAddGymFormSubmit } from '@/app/superadmin/gyms/gyms_components/SuperadminAddGymForm/useSuperadminAddGymFormSubmit';
/**
 * Custom hook to encapsulate the logic for the SuperadminAddGymForm component.
 * Handles form validation, UI state (provisioning logs), and API submission.
 */
export function useSuperadminAddGymForm() {
    const [showPassword, setShowPassword] = useState(false);
    const { data: fetchRes, isPending: loadingPlans } = useQuery({
        queryKey: ['superadmin', 'gyms', 'subscription-plans'],
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
    const { onSubmit, isProvisioning, provisioningLogs } = useSuperadminAddGymFormSubmit();
    useUnsavedChangesGuard(form.formState.isDirty && !isProvisioning, 'You have unsaved gym details. Discard?');
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
