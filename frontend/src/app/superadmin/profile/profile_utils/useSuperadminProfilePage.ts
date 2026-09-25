// DATA FLOW: Superadmin UI → useSuperadminProfilePage → Superadmin module API/state → consuming component
'use client';
// DATA FLOW: feature API/schema → hook/context → useSuperadminProfilePage consumers.
'use client';
// RESPONSIBILITY: Encapsulates functionality for useSuperadminProfilePage.ts
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { superadminProfileApi } from '@/app/superadmin/profile/profile_api/SuperadminProfileApi';
import type { ProfileTab, UpdateSuperadminProfilePayload, UpdateSuperadminPasswordPayload, Toggle2FAPayload, } from '@/app/superadmin/profile/profile_types/SuperadminProfileTypes';
/**
 * Purpose: Encapsulates functionality for useSuperadminProfilePage.ts.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminProfilePage() {
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState<ProfileTab>('personal');
    const { data: profileRes, isPending: profileLoading } = useQuery({
        queryKey: ['superadmin', 'profile'],
        queryFn: () => superadminProfileApi.fetchProfile(),
    });
    const profile = profileRes?.data || null;
    const updatePersonalMutation = useMutation({
        mutationFn: (payload: UpdateSuperadminProfilePayload) => superadminProfileApi.updateProfile(payload, crypto.randomUUID()),
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['superadmin', 'profile'] });
            toast.success(res.message, { id: 'superadmin-toast-2b82cf8178' });
        },
        onError: (err: Error) => {
            toast.error(err.message, { id: 'superadmin-toast-2e6ebe5e88' });
        }
    });
    const updatePasswordMutation = useMutation({
        mutationFn: (payload: UpdateSuperadminPasswordPayload) => superadminProfileApi.updatePassword(payload, crypto.randomUUID()),
        onSuccess: (res) => {
            toast.success(res.message, { id: 'superadmin-toast-3cd3251f3d' });
        },
        onError: (err: Error) => {
            toast.error(err.message, { id: 'superadmin-toast-baed898724' });
        }
    });
    const toggle2FAMutation = useMutation({
        mutationFn: (payload: Toggle2FAPayload) => superadminProfileApi.updateTwoFactor(payload, crypto.randomUUID()),
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['superadmin', 'profile'] });
            toast.success(res.message, { id: 'superadmin-toast-770426e425' });
        },
        onError: (err: Error) => {
            toast.error(err.message, { id: 'superadmin-toast-4a06ecff30' });
        }
    });
    return {
        activeTab, setActiveTab,
        profile, profileLoading,
        personalState: updatePersonalMutation.isPending ? 'loading' : 'idle', updatePersonalMutation,
        passwordState: updatePasswordMutation.isPending ? 'loading' : 'idle', updatePasswordMutation,
        twoFAState: toggle2FAMutation.isPending ? 'loading' : 'idle', toggle2FAMutation,
    };
}
