// RESPONSIBILITY: Zustand store that manages UI-only state for the Trainer Schedule module.
import { create } from 'zustand';

interface TrainerScheduleStore {
  activeTab: 'availability' | 'leaves';
  setActiveTab: (tab: 'availability' | 'leaves') => void;
  showLeaveModal: boolean;
  setShowLeaveModal: (show: boolean) => void;
  openLeaveModal: () => void;
  closeLeaveModal: () => void;
}

export const useTrainerScheduleStore = create<TrainerScheduleStore>((set) => ({
  activeTab: 'availability',
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  showLeaveModal: false,
  setShowLeaveModal: (show) => set({ showLeaveModal: show }),
  openLeaveModal: () => set({ showLeaveModal: true }),
  closeLeaveModal: () => set({ showLeaveModal: false }),
  
}));
