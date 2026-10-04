'use client';
// DATA FLOW: Superadmin UI → useSuperadminGymsGymMutations → Superadmin module API/state → consuming component
import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { useSuperadminGymsGymGhostLoginStore } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_store/useSuperadminGymsGymGhostLoginStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsApi';
import { toast } from 'sonner';
import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_constants/SuperadminGymsQueryKeys';
import { SUPERADMIN_GYM_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_constants/SuperadminGymsConstants';

// RESPONSIBILITY: Manage Superadmin gym tenant impersonation and suspension mutations, confirmations, cache invalidation, and feedback.
// DATA FLOW: feature API/schema → hook/context → useSuperadminGymsGymMutations consumers.
import { SUPERADMIN_GYMS_GHOST_LOGIN } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_url_config';

import type { Tenant } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_types/SuperadminGymsTypes';
import type { MouseEvent } from 'react';


/**
 * Purpose: Manage Superadmin gym tenant impersonation and suspension mutations, confirmations, cache invalidation, and feedback.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Manages gyms state, queries, and UI interactions for useSuperadminGymsGymMutations.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminGymsGymMutations → consuming feature component.
export function useSuperadminGymsGymMutations(gyms: Tenant[]) {
    const { confirm } = useConfirm();
    const t = useTranslations('superadmin_gyms');
    const impersonateKeysRef = useRef(new Map<string, string>());
    const suspendKeysRef = useRef(new Map<string, string>());
    const ghostCookieKeysRef = useRef(new Map<string, string>());
    const startGhostLogin = useSuperadminGymsGymGhostLoginStore(state => state.startGhostLogin);
    const queryClient = useQueryClient();
    const impersonateMutation = useMutation({
        mutationFn: async ({ id, idempotencyKey, cookieIdempotencyKey }: { id: string; idempotencyKey: string; cookieIdempotencyKey: string }) => {
            const res = await gymsApi.impersonateTenant(id, idempotencyKey);
            if (!res.success || !res.data?.token) return res;
            const cookieRes = await gymsApi.setGhostLoginCookie(res.data.token, id, cookieIdempotencyKey);
            if (!cookieRes.success) throw new Error(cookieRes.message);
            return res;
        },
        onSuccess: (res, variables) => {
            if (res.success && res.data?.token) {
                const gym = gyms.find((item) => item.id === variables.id);
                if (gym) {
                    startGhostLogin({ id: gym.id, name: gym.name, plan: gym.plan, adminEmail: gym.adminEmail });
                }
                toast.success(res.message, { id: 'superadmin-toast-b800e3cdbb' });
                void queryClient.invalidateQueries({ queryKey: SUPERADMIN_GYMS_QUERY_KEYS.all });
                ghostCookieKeysRef.current.delete(variables.id);
                impersonateKeysRef.current.delete(variables.id);
                window.location.href = SUPERADMIN_GYMS_GHOST_LOGIN.ADMIN_DASHBOARD;
            } else {
                toast.error(res.message, { id: 'superadmin-toast-85fa002e4f' });
            }
        },
        onError: (err: unknown) => {
            toast.error((err as Error).message, { id: 'superadmin-toast-ece984cc4e' });
        },
    });
    const suspendMutation = useMutation({
        mutationFn: ({ id, status, idempotencyKey }: { id: string; status: string; idempotencyKey: string }) => gymsApi.updateGymStatus(id, status, idempotencyKey),
        onSuccess: (res, variables) => {
            suspendKeysRef.current.delete(variables.id);
            toast.success(res.message, { id: 'superadmin-toast-4c40055ee0' });
            queryClient.invalidateQueries({ queryKey: SUPERADMIN_GYMS_QUERY_KEYS.all });
        },
        onError: (err: unknown) => {
            toast.error((err as Error).message, { id: 'superadmin-toast-2c0343a50b' });
        },
    });
    const onGhostLoginClick = (e: MouseEvent, gymId: string, gymName: string) => {
        e.stopPropagation();
        const key = impersonateKeysRef.current.get(gymId) ?? crypto.randomUUID();
        const cookieKey = ghostCookieKeysRef.current.get(gymId) ?? crypto.randomUUID();
        impersonateKeysRef.current.set(gymId, key);
        ghostCookieKeysRef.current.set(gymId, cookieKey);
        impersonateMutation.mutate({ id: gymId, idempotencyKey: key, cookieIdempotencyKey: cookieKey });
    };
    const onSuspendClick = async (e: MouseEvent, gymId: string, gymName: string, currentStatus: string) => {
        e.stopPropagation();
        const newStatus = currentStatus === SUPERADMIN_GYM_STATUS_CODES.SUSPENDED ? SUPERADMIN_GYM_STATUS_CODES.ACTIVE : SUPERADMIN_GYM_STATUS_CODES.SUSPENDED;
        const isSuspended = currentStatus === SUPERADMIN_GYM_STATUS_CODES.SUSPENDED;
        const confirmed = await confirm({
            title: t(isSuspended ? 'ui.unsuspend_gym_title_repair' : 'ui.suspend_gym_title_repair'),
            message: t(isSuspended ? 'ui.unsuspend_gym_message_repair' : 'ui.suspend_gym_message_repair', { name: gymName }),
            type: isSuspended ? 'info' : 'danger',
            confirmText: t(isSuspended ? 'ui.unsuspend_action_repair' : 'ui.suspend_action_repair')
        });
        if (confirmed) {
            const key = suspendKeysRef.current.get(gymId) ?? crypto.randomUUID();
            suspendKeysRef.current.set(gymId, key);
            suspendMutation.mutate({ id: gymId, status: newStatus, idempotencyKey: key });
        }
    };
    const actionLoadingId = impersonateMutation.isPending
        ? impersonateMutation.variables?.id
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
