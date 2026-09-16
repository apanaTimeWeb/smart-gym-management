// RESPONSIBILITY: Zustand store for Dashboard UI state (e.g., date ranges).
import { create } from 'zustand';
import type { TimeRange } from '@/app/trainer/dashboard/dashboard_types/TrainerDashboard_types';

interface TrainerDashboardStore {
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
  startDate: string;
  endDate: string;
  setCustomDateRange: (start: string, end: string) => void;
}

export const useTrainerDashboardStore = create<TrainerDashboardStore>((set) => ({
  timeRange: 'monthly',
  setTimeRange: (range) => set({ timeRange: range }),
  startDate: '',
  endDate: '',
  setCustomDateRange: (start, end) => set({ startDate: start, endDate: end }),
}));
