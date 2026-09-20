// DATA FLOW: Manager Referrals UI-only modal state → owning Referrals components.
// RESPONSIBILITY: Stores only transient shared UI state; URL and TanStack Query own server/filter state.
import { create } from 'zustand';

interface ManagerReferralsStore {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (isOpen: boolean) => void;
}

export const useManagerReferralsStore = create<ManagerReferralsStore>((set) => ({
  isAddModalOpen: false,
  setIsAddModalOpen: (isOpen) => set({ isAddModalOpen: isOpen }),
}));
