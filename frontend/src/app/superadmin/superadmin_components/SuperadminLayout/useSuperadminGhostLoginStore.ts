'use client';
// RESPONSIBILITY: Zustand store for managing the active ghost-login (tenant impersonation) session.
// Stores which tenant is being impersonated and provides start/exit actions.
// DATA FLOW: useSuperadminGymsTable (start) → useSuperadminGhostLoginStore → SuperadminGhostLoginBanner (exit)

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { SUPERADMIN_STORAGE_KEYS } from '@/app/superadmin/superadmin_storage_constants';

export interface GhostTenant {
  id: string;
  name: string;
  plan: string;
  adminEmail: string;
}

interface SuperadminGhostLoginState {
  ghostTenant: GhostTenant | null;
  startGhostLogin: (tenant: GhostTenant) => void;
  exitGhostLogin: () => void;
}

export const useSuperadminGhostLoginStore = create<SuperadminGhostLoginState>()(
  persist(
    (set) => ({
      ghostTenant: null,
      startGhostLogin: (tenant) => set({ ghostTenant: tenant }),
      exitGhostLogin: async () => {
        set({ ghostTenant: null });
        
        try {
          await fetch(SuperadminUrlConfig.INFRASTRUCTURE.GHOST_LOGIN_EXIT_PROXY, {
            method: 'POST',
          });
        } catch {}

        // Redirect back to superadmin gyms list after exiting impersonation
        window.location.href = SuperadminUrlConfig.PAGES.GYMS;
      },
    }),
    {
      name: SUPERADMIN_STORAGE_KEYS.GHOST_LOGIN_SESSION_V1,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
