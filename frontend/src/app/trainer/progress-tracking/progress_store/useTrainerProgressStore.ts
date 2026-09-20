import { create } from 'zustand';
import type { TrainerProgressStore } from '@/app/trainer/progress-tracking/progress_store/TrainerProgressStoreTypes';

export const useTrainerProgressStore = create<TrainerProgressStore>((set) => ({
  activeMetric: 'weight',
  setActiveMetric: (activeMetric) => set({ activeMetric }),
  showModal: false,
  setShowModal: (showModal) => set({ showModal }),
  editingEntry: null,
  setEditingEntry: (editingEntry) => set({ editingEntry }),
  activeComparisonMetric: 'weightChangeKg',
  setActiveComparisonMetric: (activeComparisonMetric) => set({ activeComparisonMetric }),
  selectedComparisonIds: [],
  toggleComparisonMember: (memberId) => set((state) => {
    const ids = state.selectedComparisonIds;
    if (ids.includes(memberId)) {
      return { selectedComparisonIds: ids.filter(id => id !== memberId) };
    }
    if (ids.length >= 3) return state; // max 3 members
    return { selectedComparisonIds: [...ids, memberId] };
  }),
}));
