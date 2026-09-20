// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
"use client";
/** Coordinates the Manager / feature. */
import { create } from "zustand";
import type { Plan } from "@/app/manager/plans/plans_types/ManagerPlansTypes";


interface ManagerPlansUiState {
  requestModalPlan: Plan | null;
  setRequestModalPlan: (plan: Plan | null) => void;
}

export const useManagerPlansUiStore = create<ManagerPlansUiState>((set) => ({
  requestModalPlan: null,
  setRequestModalPlan: (requestModalPlan) => set({ requestModalPlan }) }));
