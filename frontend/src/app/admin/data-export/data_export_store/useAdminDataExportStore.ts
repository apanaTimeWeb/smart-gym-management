// DATA FLOW: feature API/schema → hook/context → useAdminDataExportStore consumers.
// RESPONSIBILITY: Zustand store for Data Export module UI state.
import { create } from 'zustand';
import type { ExportStatus } from '@/app/admin/data-export/data_export_types/AdminDataExportTypes';

interface AdminDataExportStore {
  statusFilter: ExportStatus | 'all';
  setStatusFilter: (s: ExportStatus | 'all') => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
}

/** Coordinates DataExportStore state, data flow, and feature behavior. */
export const useAdminDataExportStore = create<AdminDataExportStore>((set) => ({
  statusFilter: 'all',
  setStatusFilter: (s) => set({ statusFilter: s, currentPage: 1 }),
  currentPage: 1,
  setCurrentPage: (p) => set({ currentPage: p }),
}));
