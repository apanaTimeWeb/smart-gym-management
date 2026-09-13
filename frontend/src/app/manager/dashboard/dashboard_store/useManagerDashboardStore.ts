import { create } from 'zustand';
import type { TimeRange } from '@/app/manager/dashboard/dashboard_types/ManagerDashboardTypes';

interface ManagerDashboardStore {
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
  startDate: string;
  endDate: string;
  setCustomDateRange: (start: string, end: string) => void;
}

export const useManagerDashboardStore = create<ManagerDashboardStore>((set) => ({
  timeRange: 'monthly',
  setTimeRange: (range) => set({ timeRange: range }),
  startDate: '',
  endDate: '',
  setCustomDateRange: (start, end) => set({ startDate: start, endDate: end }),
}));
