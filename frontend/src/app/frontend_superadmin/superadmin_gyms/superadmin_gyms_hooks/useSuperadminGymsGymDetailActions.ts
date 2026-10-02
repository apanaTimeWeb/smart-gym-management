'use client';
// RESPONSIBILITY: Orchestrates the Superadmin Gym Detail ghost-login workflow; API side effects stay in this hook.
// DATA FLOW: Gym Detail action → Gyms API → UI-only ghost-login state → Admin dashboard redirect.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

import { toast } from 'sonner';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsApi';
import { useSuperadminGymsGymGhostLoginStore } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_store/useSuperadminGymsGymGhostLoginStore';

import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_constants/SuperadminGymsQueryKeys';
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_url_config';



/**
 * @description Starts Ghost Login for one selected gym through the feature-owned two-step mutation contract.
 * @dependencies Uses only the owning Gyms API, URL config, and UI-only ghost-login store.
 * @edge-case Both mutation steps reuse the same intent-scoped keys until the complete workflow succeeds, so retries cannot create a new idempotency identity.
 */
export function useSuperadminGymsGymDetailActions() {
  const startGhostLoginState = useSuperadminGymsGymGhostLoginStore((state) => state.startGhostLogin);
  const queryClient = useQueryClient();
  const impersonateKeyRef = useRef<string | null>(null);
  const cookieKeyRef = useRef<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (variables: {
      gym: { id: string; name: string; plan: string; adminEmail: string };
      impersonateKey: string;
      cookieKey: string;
    }) => {
      const response = await gymsApi.impersonateTenant(variables.gym.id, variables.impersonateKey);
      if (!response.success || !response.data?.token) throw new Error(response.message);
      const cookieResponse = await gymsApi.setGhostLoginCookie(response.data.token, variables.gym.id, variables.cookieKey);
      if (!cookieResponse.success) throw new Error(cookieResponse.message);
      return { gym: variables.gym, response };
    },
    onSuccess: async ({ gym, response }) => {
      impersonateKeyRef.current = null;
      cookieKeyRef.current = null;
      startGhostLoginState(gym);
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_GYMS_QUERY_KEYS.all });
      toast.success(response.message, { id: 'superadmin-gym-detail-ghost-login-success' });
      window.location.href = MODULE_URLS.GHOST_LOGIN.ADMIN_DASHBOARD;
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message, { id: 'superadmin-gym-detail-ghost-login-error' });
    },
  });

  const startGhostLogin = (gym: { id: string; name: string; plan: string; adminEmail: string }) => {
    impersonateKeyRef.current ??= crypto.randomUUID();
    cookieKeyRef.current ??= crypto.randomUUID();
    mutation.mutate({
      gym,
      impersonateKey: impersonateKeyRef.current,
      cookieKey: cookieKeyRef.current,
    });
  };

  return { startGhostLogin, isStartingGhostLogin: mutation.isPending };
}
