// RESPONSIBILITY: Zustand store for Manager Referrals UI state.
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
