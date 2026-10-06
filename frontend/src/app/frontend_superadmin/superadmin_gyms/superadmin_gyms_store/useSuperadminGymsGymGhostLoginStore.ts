'use client';
// DATA FLOW: Superadmin Gyms UI events → feature-scoped UI store → shell/session consumers.
// RESPONSIBILITY: Owns only persisted ghost-login presentation state. API mutations live in feature hooks.
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { SUPERADMIN_GYMS_GHOST_LOGIN_STORAGE_KEY } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_constants/SuperadminGymsStorageConstants';
import { getSuperadminGymsSessionStorage } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_utils/SuperadminGymsSessionStorage';

import type { SuperadminGymGhostLoginState, SuperadminGymGhostTenant } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_types/SuperadminGymsGymGhostLoginTypes';



/**
 * @description Owns UI-only ghost-login tenant state for the Gyms module; it never calls the API and never stores server responses.
 * @dependencies Persisted session storage and the feature-owned ghost-login type contract.
 * @edge-case Clearing the tenant state is synchronous; network exit behavior is delegated to a dedicated mutation hook.
 */
export const useSuperadminGymsGymGhostLoginStore = create<SuperadminGymGhostLoginState>()(
  persist(
    (set) => ({
      ghostTenant: null,
      startGhostLogin: (tenant: SuperadminGymGhostTenant) => set({ ghostTenant: tenant }),
      clearGhostLogin: () => set({ ghostTenant: null }),
    }),
    {
      name: SUPERADMIN_GYMS_GHOST_LOGIN_STORAGE_KEY,
      storage: createJSONStorage(getSuperadminGymsSessionStorage),
    },
  ),
);
