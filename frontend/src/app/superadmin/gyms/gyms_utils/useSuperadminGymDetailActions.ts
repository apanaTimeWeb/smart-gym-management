// DATA FLOW: Gym Detail action → Gyms API → ghost-session store → Admin dashboard redirect.
// RESPONSIBILITY: Owns Gym Detail actions that require side effects; the client component remains a view layer.
'use client';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { gymsApi } from '@/app/superadmin/gyms/gyms_api/SuperadminGymsApi';
import { GymsUrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_url_config';
import { useSuperadminGymGhostLoginStore } from '@/app/superadmin/gyms/gyms_store/useSuperadminGymGhostLoginStore';

/**
 * Purpose: Starts Ghost Login for one already-selected gym detail record and moves the session to the Admin dashboard.
 * Inputs: gym identity required to call the impersonation endpoint.
 * Output: mutation state plus the start action.
 * Side effects: token cookie setup, feature-scoped session state, navigation, and backend-message toast feedback.
 */
export function useSuperadminGymDetailActions() {
  const startGhostLogin = useSuperadminGymGhostLoginStore((state) => state.startGhostLogin);
  const mutation = useMutation({
    mutationFn: async (gym: { id: string; name: string; plan: string; adminEmail: string }) => {
      const response = await gymsApi.impersonateTenant(gym.id);
      if (!response.success || !response.data?.token) {
        throw new Error(response.message);
      }
      await gymsApi.setGhostLoginCookie(response.data.token, gym.id);
      return { gym, response };
    },
    onSuccess: ({ gym, response }) => {
      startGhostLogin(gym);
      toast.success(response.message, { id: 'superadmin-gym-detail-ghost-login-success' });
      window.location.href = GymsUrlConfig.GHOST_LOGIN.ADMIN_DASHBOARD;
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : '', { id: 'superadmin-gym-detail-ghost-login-error' });
    },
  });

  return { startGhostLogin: mutation.mutate, isStartingGhostLogin: mutation.isPending };
}
