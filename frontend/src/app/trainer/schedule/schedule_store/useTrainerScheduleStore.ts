// RESPONSIBILITY: Zustand store that manages UI-only state for the Trainer Schedule module.
import { create } from 'zustand';
import type { TrainerScheduleStore } from '@/app/trainer/schedule/schedule_types/TrainerScheduleStoreTypes';

export const useTrainerScheduleStore = create<TrainerScheduleStore>((set) => ({
  activeTab: 'availability',
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  showLeaveModal: false,
  setShowLeaveModal: (show) => set({ showLeaveModal: show }),
  openLeaveModal: () => set({ showLeaveModal: true }),
  closeLeaveModal: () => set({ showLeaveModal: false }),
  
}));
