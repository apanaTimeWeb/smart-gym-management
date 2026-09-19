// DATA FLOW: Superadmin UI → useSuperadminPlansStore → Superadmin module API/state → consuming component
// RESPONSIBILITY: Zustand store for the Plans module. Manages only modal UI state.
// DATA FLOW: Component -> useSuperadminPlansStore.ts -> UI Components
import { create } from 'zustand';
import type { SubscriptionPlan } from '@/app/superadmin/plans/plans_types/SuperadminPlansTypes';
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
/**
 * Purpose: Zustand store for the Plans module. Manages only modal UI state.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export const useSuperadminPlansStore = create<PlansStoreState>((set) => ({
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
