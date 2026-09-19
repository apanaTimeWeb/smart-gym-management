// DATA FLOW: Superadmin Gyms impersonation mutation → feature-scoped ghost-session store → shell session banner → exit proxy → /superadmin/gyms.
/**
 * Owns Superadmin tenant impersonation session state for the Gyms feature.
 * The shell consumes the session banner, but all tenant identity, persistence,
 * exit transport, and redirect behavior remain owned by this feature.
 */
'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { gymsApi } from '@/app/superadmin/gyms/gyms_api/SuperadminGymsApi';
import { GymsUrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_url_config';

/** Describes the active tenant identity while the Superadmin is impersonating a gym tenant. */
export interface SuperadminGymGhostTenant {
  id: string;
  name: string;
  plan: string;
  adminEmail: string;
}

interface SuperadminGymGhostLoginState {
  ghostTenant: SuperadminGymGhostTenant | null;
  startGhostLogin: (tenant: SuperadminGymGhostTenant) => void;
  exitGhostLogin: () => Promise<void>;
}

/** Returns the feature-scoped ghost-login store used by Superadmin tenant impersonation flows. */
export const useSuperadminGymGhostLoginStore = create<SuperadminGymGhostLoginState>()(persist((set) => ({
  ghostTenant: null,
  startGhostLogin: (tenant) => set({ ghostTenant: tenant }),
  exitGhostLogin: async () => {
    try {
      await gymsApi.exitGhostLogin();
    } finally {
      set({ ghostTenant: null });
      window.location.href = GymsUrlConfig.PAGES.MAIN;
    }
  },
}), {
  name: 'APP_SUPERADMIN_GYMS_GHOST_LOGIN_SESSION_V1',
  storage: createJSONStorage(() => sessionStorage),
}));
