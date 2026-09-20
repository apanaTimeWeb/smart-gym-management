// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
'use client';
/** Coordinates the Manager / feature. */
import { create } from 'zustand';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';


interface ManagerSalesUiState {
  toast: { message: string; type: ManagerToastType } | null;
  showToast: (message: string, type: ManagerToastType) => void;
  hideToast: () => void;
}

export const useManagerSalesUiStore = create<ManagerSalesUiState>((set) => ({
  toast: null,
  showToast: (message, type) => set({ toast: { message, type } }),
  hideToast: () => set({ toast: null }) }));
