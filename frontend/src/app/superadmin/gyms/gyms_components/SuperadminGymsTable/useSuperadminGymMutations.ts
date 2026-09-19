// RESPONSIBILITY: Manage Superadmin gym tenant impersonation and suspension mutations, confirmations, cache invalidation, and feedback.
// DATA FLOW: Superadmin UI → useSuperadminGymMutations → Superadmin module API/state → consuming component
'use client';
import type { MouseEvent } from 'react';
// DATA FLOW: feature API/schema → hook/context → useSuperadminGymMutations consumers.
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gymsApi } from '@/app/superadmin/gyms/gyms_api/SuperadminGymsApi';
import type { Tenant } from '@/app/superadmin/gyms/gyms_types/SuperadminGymsTypes';
import { GymsUrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_url_config';
import { useSuperadminGymGhostLoginStore } from '@/app/superadmin/gyms/gyms_store/useSuperadminGymGhostLoginStore';
import { useSuperadminConfirm } from '@/app/superadmin/superadmin_layout/SuperadminFeedback/SuperadminConfirmProvider';
/**
 * Purpose: Manage Superadmin gym tenant impersonation and suspension mutations, confirmations, cache invalidation, and feedback.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminGymMutations(gyms: Tenant[]) {
    const { confirm } = useSuperadminConfirm();
    const startGhostLogin = useSuperadminGymGhostLoginStore(state => state.startGhostLogin);
    const queryClient = useQueryClient();
    const impersonateMutation = useMutation({
        mutationFn: (id: string) => gymsApi.impersonateTenant(id),
        onSuccess: async (res, id) => {
            if (res.success && res.data?.token) {
                toast.success(res.message, { id: 'superadmin-toast-b800e3cdbb' });
                try {
                    await gymsApi.setGhostLoginCookie(res.data.token, id);
                }
                catch { }
                const gym = gyms.find((g) => g.id === id);
                if (gym) {
                    startGhostLogin({ id: gym.id, name: gym.name, plan: gym.plan, adminEmail: gym.adminEmail });
                }
                window.location.href = GymsUrlConfig.GHOST_LOGIN.ADMIN_DASHBOARD;
            }
            else {
                toast.error(res.message, { id: 'superadmin-toast-85fa002e4f' });
            }
        },
        onError: (err: unknown) => {
            toast.error((err as Error).message, { id: 'superadmin-toast-ece984cc4e' });
        },
    });
    const suspendMutation = useMutation({
        mutationFn: ({ id, status }: {
            id: string;
            status: string;
        }) => gymsApi.updateGymStatus(id, status, crypto.randomUUID()),
        onSuccess: (res) => {
            toast.success(res.message, { id: 'superadmin-toast-4c40055ee0' });
            queryClient.invalidateQueries({ queryKey: ['superadmin', 'gyms'] });
        },
        onError: (err: unknown) => {
            toast.error((err as Error).message, { id: 'superadmin-toast-2c0343a50b' });
        },
    });
    const onGhostLoginClick = (e: MouseEvent, gymId: string, gymName: string) => {
        e.stopPropagation();
        impersonateMutation.mutate(gymId);
    };
    const onSuspendClick = async (e: MouseEvent, gymId: string, gymName: string, currentStatus: string) => {
        e.stopPropagation();
        const newStatus = currentStatus === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';
        const action = currentStatus === 'SUSPENDED' ? 'unsuspend' : 'suspend';
        const confirmed = await confirm({
            title: `${action.charAt(0).toUpperCase() + action.slice(1)} Gym`,
            message: currentStatus === 'SUSPENDED'
                ? `Are you sure you want to unsuspend ${gymName}? This will restore access for the tenant.`
                : `Are you sure you want to suspend ${gymName}? This will immediately block access for all managers, branch staff, and trainers under this tenant, and halt all automated billing and notifications.`,
            type: currentStatus === 'SUSPENDED' ? 'info' : 'danger',
            confirmText: `Yes, ${action}`
        });
        if (confirmed) {
            suspendMutation.mutate({ id: gymId, status: newStatus });
        }
    };
    const actionLoadingId = impersonateMutation.isPending
        ? impersonateMutation.variables
        : suspendMutation.isPending
            ? suspendMutation.variables?.id
            : null;
    return {
        impersonateMutation,
        suspendMutation,
        actionLoadingId,
        onGhostLoginClick,
        onSuspendClick,
    };
}
