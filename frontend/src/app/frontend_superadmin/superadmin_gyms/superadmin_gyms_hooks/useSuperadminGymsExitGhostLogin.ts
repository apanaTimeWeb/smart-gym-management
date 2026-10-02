'use client';
// DATA FLOW: Owning feature API/query/store state → useSuperadminGymsExitGhostLogin → consuming feature component.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsApi';
import { useSuperadminGymsGymGhostLoginStore } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_store/useSuperadminGymsGymGhostLoginStore';

import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_constants/SuperadminGymsQueryKeys';
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_url_config';



/**
 * @description Exits the active Ghost Login session through the feature API, then clears local UI state and redirects to the Gyms page.
 * @dependencies Uses the feature API, URL config, and UI-only ghost-login store.
 * @edge-case The same idempotency key is reused when the exit operation is retried until the authoritative exit succeeds.
 */
export function useSuperadminGymsExitGhostLogin() {
  const queryClient = useQueryClient();
  const clearGhostLogin = useSuperadminGymsGymGhostLoginStore((state) => state.clearGhostLogin);
  const keyRef = useRef<string | null>(null);
  const mutation = useMutation({
    mutationFn: (idempotencyKey: string) => gymsApi.exitGhostLogin(idempotencyKey),
    onSuccess: async (response) => {
      if (!response.success) throw new Error(response.message);
      keyRef.current = null;
      clearGhostLogin();
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_GYMS_QUERY_KEYS.all });
      window.location.href = MODULE_URLS.PAGES.MAIN;
    },
  });
  const exitGhostLogin = () => { keyRef.current ??= crypto.randomUUID(); return mutation.mutateAsync(keyRef.current); };
  return { exitGhostLogin, isExitingGhostLogin: mutation.isPending, error: mutation.error };
}
