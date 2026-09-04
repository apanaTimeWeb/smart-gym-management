// RESPONSIBILITY: Zustand store for the Plans module. Manages only modal UI state.
// DATA FLOW: Component -> usePlansStore.ts -> UI Components

import { create } from 'zustand';
import type { SubscriptionPlan } from '@/app/superadmin/plans/plans_types/plans_types';

interface PlansStoreState {
  // ── Modal UI ──────────────────────────────────────────────────────────────
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  selectedPlan: SubscriptionPlan | null;

  // ── Actions ───────────────────────────────────────────────────────────────
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: (plan: SubscriptionPlan) => void;
  closeEditModal: () => void;
}

export const usePlansStore = create<PlansStoreState>((set) => ({
  isCreateModalOpen: false,
  isEditModalOpen: false,
  selectedPlan: null,

  openCreateModal: () => set({ isCreateModalOpen: true }),
  closeCreateModal: () => set({ isCreateModalOpen: false }),
  
  openEditModal: (plan) => set({ selectedPlan: plan, isEditModalOpen: true }),
  closeEditModal: () => {
    set({ isEditModalOpen: false });
    setTimeout(() => set({ selectedPlan: null }), 200);
  },
}));
