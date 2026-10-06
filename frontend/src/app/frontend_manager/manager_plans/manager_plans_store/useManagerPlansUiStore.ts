/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
'use client';
// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
/** Coordinates the Manager / feature. */
import { create } from "zustand";
import type { Plan } from "@/app/frontend_manager/manager_plans/manager_plans_types/ManagerPlansTypes";


interface ManagerPlansUiState {
  requestModalPlan: Plan | null;
  crudModalPlan: Plan | null;
  crudModalOpen: boolean;
  setRequestModalPlan: (plan: Plan | null) => void;
  openCrudModal: (plan: Plan | null) => void;
  closeCrudModal: () => void;
}

/**
 * @description Coordinates plans feature state and its documented UI/API boundary through useManagerPlansUiStore.
 * @dependencies Uses ManagerPlansTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
export const useManagerPlansUiStore = create<ManagerPlansUiState>((set) => ({
  requestModalPlan: null,
  crudModalPlan: null,
  crudModalOpen: false,
  setRequestModalPlan: (requestModalPlan) => set({ requestModalPlan }),
  openCrudModal: (crudModalPlan) => set({ crudModalPlan, crudModalOpen: true }),
  closeCrudModal: () => set({ crudModalPlan: null, crudModalOpen: false }) }));
