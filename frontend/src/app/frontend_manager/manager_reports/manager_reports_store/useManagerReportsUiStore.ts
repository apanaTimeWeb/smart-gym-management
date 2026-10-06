/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
'use client';
// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
/** Coordinates the Manager / feature. */
import { create } from 'zustand';
import type { ReportTab } from '@/app/frontend_manager/manager_reports/manager_reports_types/ManagerReportsTypes';


interface ManagerReportsUiState {
  tab: ReportTab;
  setTab: (tab: ReportTab) => void;
}

/**
 * @description Coordinates reports feature state and its documented UI/API boundary through useManagerReportsUiStore.
 * @dependencies Uses ManagerReportsTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
export const useManagerReportsUiStore = create<ManagerReportsUiState>((set) => ({
  tab: 'Revenue',
  setTab: (tab) => set({ tab }) }));
