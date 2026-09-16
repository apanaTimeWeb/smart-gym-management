import { create } from 'zustand';
import type { ProgressEntry, ProgressChartMetric, ComparisonMetric } from '@/app/trainer/progress-tracking/progress_types/TrainerProgressTypes';

type ProgressTab = 'individual' | 'compare';

interface TrainerProgressStore {
  activeMetric: ProgressChartMetric;
  setActiveMetric: (metric: ProgressChartMetric) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  editingEntry: ProgressEntry | null;
  setEditingEntry: (entry: ProgressEntry | null) => void;
  activeComparisonMetric: ComparisonMetric;
  setActiveComparisonMetric: (metric: ComparisonMetric) => void;
  selectedComparisonIds: string[];
  toggleComparisonMember: (memberId: string) => void;
  showToast: (message: string, type: 'success' | 'error') => void;
}

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
  showToast: (message, type) => {
    // Basic fallback logic for toast; actual toast implementation can integrate here.
    alert(`${type.toUpperCase()}: ${message}`);
  }
}));
