// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
'use client';
/** Coordinates the Manager / feature. */
import { create } from 'zustand';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';
import type { TrainerShift } from '@/app/manager/schedule/schedule_types/ManagerScheduleTypes';


interface ManagerScheduleUiState {
  toast: { message: string; type: ManagerToastType } | null;
  shiftModal: { open: boolean; editShift: TrainerShift | null; trainerId: string | null };
  showToast: (message: string, type: ManagerToastType) => void;
  hideToast: () => void;
  openAddShift: (trainerId: string) => void;
  openEditShift: (shift: TrainerShift) => void;
  closeShiftModal: () => void;
}

export const useManagerScheduleUiStore = create<ManagerScheduleUiState>((set) => ({
  toast: null,
  shiftModal: { open: false, editShift: null, trainerId: null },
  showToast: (message, type) => set({ toast: { message, type } }),
  hideToast: () => set({ toast: null }),
  openAddShift: (trainerId) => set({ shiftModal: { open: true, editShift: null, trainerId } }),
  openEditShift: (shift) => set({ shiftModal: { open: true, editShift: shift, trainerId: shift.trainerId } }),
  closeShiftModal: () => set({ shiftModal: { open: false, editShift: null, trainerId: null } }) }));
