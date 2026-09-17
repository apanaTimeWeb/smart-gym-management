// RESPONSIBILITY: Zustand store for Attendance module UI-only ephemeral state.
// DATA FLOW: Component events → useTrainerAttendanceStore (UI only) — NO server data stored here.
import { create } from 'zustand';

interface TrainerAttendanceStore {
  // Modal state
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  openModal: () => void;
  closeModal: () => void;

  // View mode for "My Attendance" tab
  viewMode: 'calendar' | 'table';
  setViewMode: (v: 'calendar' | 'table') => void;

}

export const useTrainerAttendanceStore = create<TrainerAttendanceStore>((set) => ({
  showModal: false,
  setShowModal: (show) => set({ showModal: show }),
  openModal: () => set({ showModal: true }),
  closeModal: () => set({ showModal: false }),

  viewMode: 'calendar',
  setViewMode: (viewMode) => set({ viewMode }),

}));
