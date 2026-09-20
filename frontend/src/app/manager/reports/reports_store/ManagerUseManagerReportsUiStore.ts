// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
'use client';
/** Coordinates the Manager / feature. */
import { create } from 'zustand';
import type { ReportTab } from '@/app/manager/reports/reports_types/ManagerReportsTypes';


interface ManagerReportsUiState {
  tab: ReportTab;
  setTab: (tab: ReportTab) => void;
}

export const useManagerReportsUiStore = create<ManagerReportsUiState>((set) => ({
  tab: 'Revenue',
  setTab: (tab) => set({ tab }) }));
