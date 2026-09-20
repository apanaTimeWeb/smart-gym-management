// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
'use client';
/** Coordinates the Manager / feature. */
import { create } from 'zustand';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';


type FinanceTab = 'Payments' | 'Summary';
interface ManagerFinanceUiState {
  tab: FinanceTab;
  toast: { message: string; type: ManagerToastType } | null;
  showModal: boolean;
  setTab: (tab: FinanceTab) => void;
  setToast: (toast: ManagerFinanceUiState['toast']) => void;
  setShowModal: (show: boolean) => void;
  showToast: (message: string, type: ManagerToastType) => void;
  hideToast: () => void;
}
export const useManagerFinanceUiStore = create<ManagerFinanceUiState>((set) => ({
  tab: 'Payments', toast: null, showModal: false,
  setTab: (tab) => set({ tab }), setToast: (toast) => set({ toast }), setShowModal: (showModal) => set({ showModal }),
  showToast: (message, type) => set({ toast: { message, type } }), hideToast: () => set({ toast: null }) }));
export type { FinanceTab };
