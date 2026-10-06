import { create } from 'zustand';
import type { AdminReportsStore } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsStoreTypes';
// RESPONSIBILITY: Zustand store for Reports module UI state — active tab, date range, gym filter.
/**
 * @description useAdminReportsStore: Zustand store for Reports module UI state — active tab, date range, gym filter.
 * @dependencies Consumes AdminReportsStoreTypes, AdminReportsTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminReportsStore = create<AdminReportsStore>((set) => ({
  activeTab: 'revenue',
  setActiveTab: (tab) => set({ activeTab: tab }),
  dateRange: 'this_month',
  setDateRange: (range) => set({ dateRange: range }),
  startDate: '',
  endDate: '',
  setCustomDateRange: (startDate, endDate) => set({ startDate, endDate }),
  selectedGymId: 'all',
  setSelectedGymId: (id) => set({ selectedGymId: id }),
}));
