// RESPONSIBILITY: Zustand store for Attendance module UI-only ephemeral state.
// DATA FLOW: Component events → useTrainerAttendanceStore (UI only) — NO server data stored here.
import { create } from 'zustand';
import type { TrainerAttendanceStore } from '@/app/trainer/attendance/attendance_store/TrainerAttendanceStoreTypes';

export const useTrainerAttendanceStore = create<TrainerAttendanceStore>((set) => ({
  showModal: false,
  setShowModal: (show) => set({ showModal: show }),
  openModal: () => set({ showModal: true }),
  closeModal: () => set({ showModal: false }),

  viewMode: 'calendar',
  setViewMode: (viewMode) => set({ viewMode }),

}));
