// RESPONSIBILITY: Zustand store for managing the active ghost-login (tenant impersonation) session.
// Stores which tenant is being impersonated and provides start/exit actions.
// DATA FLOW: useSuperadminGymsTable (start) → useSuperadminGhostLoginStore → SuperadminGhostLoginBanner (exit)

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
          await fetch('/auth/exit-ghost-login', {
            method: 'POST',
          });
        } catch {}

        // Redirect back to superadmin gyms list after exiting impersonation
        window.location.href = '/superadmin/gyms';
      },
    }),
    {
      name: 'gymsmart-ghost-login',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
