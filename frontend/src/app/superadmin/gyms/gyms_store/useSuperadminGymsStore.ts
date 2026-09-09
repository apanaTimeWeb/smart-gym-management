// RESPONSIBILITY: Zustand store that manages UI state (modals, search) for the Gyms module.
// DATA FLOW: Component -> useSuperadminGymsStore.ts -> UI Components

import { create } from 'zustand';
import type { Tenant } from '@/app/superadmin/gyms/superadmin_gyms_types/superadmin_gyms_types';

export interface GymsState {
  // UI State
  viewMode: 'list' | 'calendar';
  search: string;
  statusFilter: string;
  planFilter: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  currentPage: number;
  pageLimit: number;
  selectedGym: Tenant | null;
  isEditModalOpen: boolean;
  isWhatsappModalOpen: boolean;
  isDeleteModalOpen: boolean;
  gymToDelete: Tenant | null;

  // Actions
  setViewMode: (mode: 'list' | 'calendar') => void;
  setSearch: (search: string) => void;
  setStatusFilter: (status: string) => void;
  setPlanFilter: (plan: string) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  setCurrentPage: (page: number) => void;
  openEditModal: (gym: Tenant) => void;
  closeEditModal: () => void;
  openWhatsappModal: (gym: Tenant) => void;
  closeWhatsappModal: () => void;
  openDeleteModal: (gym: Tenant) => void;
  closeDeleteModal: () => void;
}

export const useSuperadminGymsStore = create<GymsState>((set) => ({
  viewMode: 'list',
  search: '',
  statusFilter: 'All',
  planFilter: 'All',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  currentPage: 1,
  pageLimit: 20,
  selectedGym: null,
  isEditModalOpen: false,
  isWhatsappModalOpen: false,
  isDeleteModalOpen: false,
  gymToDelete: null,

  setViewMode: (viewMode) => set({ viewMode }),
  setSearch: (search) => set({ search }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setPlanFilter: (planFilter) => set({ planFilter }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  
  openEditModal: (gym) => set({ selectedGym: gym, isEditModalOpen: true }),
  
  closeEditModal: () => {
    set({ isEditModalOpen: false });
    setTimeout(() => set({ selectedGym: null }), 200);
  },

  openWhatsappModal: (gym) => set({ selectedGym: gym, isWhatsappModalOpen: true }),
  
  closeWhatsappModal: () => {
    set({ isWhatsappModalOpen: false });
    setTimeout(() => set({ selectedGym: null }), 200);
  },

  openDeleteModal: (gym) => set({ gymToDelete: gym, isDeleteModalOpen: true }),
  
  closeDeleteModal: () => {
    set({ isDeleteModalOpen: false });
    setTimeout(() => set({ gymToDelete: null }), 200);
  },
}));
