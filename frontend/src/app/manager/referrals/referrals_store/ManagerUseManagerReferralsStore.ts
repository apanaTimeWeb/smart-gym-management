// DATA FLOW: Manager module state/API data → useManagerReferralsStore → owning Manager UI components.
// RESPONSIBILITY: Zustand store for Manager Referrals UI state.
/** Manages UseReferralsStore for the Manager module. */
import { create } from 'zustand';

interface ManagerReferralsStore {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (isOpen: boolean) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export const useManagerReferralsStore = create<ManagerReferralsStore>((set) => ({
  isAddModalOpen: false,
  setIsAddModalOpen: (isOpen) => set({ isAddModalOpen: isOpen }),
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  statusFilter: 'ALL',
  setStatusFilter: (status) => set({ statusFilter: status, currentPage: 1 }),
}));
