// RESPONSIBILITY: Zustand store that manages UI state (modals, search) for the Gyms module.
// DATA FLOW: Component -> useGymsStore.ts -> UI Components

import { create } from 'zustand';
import type { Tenant } from '@/app/superadmin/gyms/gyms_types/gyms_types';

export interface GymsState {
  // UI State
  search: string;
  selectedGym: Tenant | null;
  isEditModalOpen: boolean;
  isWhatsappModalOpen: boolean;
  isDeleteModalOpen: boolean;
  gymToDelete: Tenant | null;

  // Actions
  setSearch: (search: string) => void;
  openEditModal: (gym: Tenant) => void;
  closeEditModal: () => void;
  openWhatsappModal: (gym: Tenant) => void;
  closeWhatsappModal: () => void;
  openDeleteModal: (gym: Tenant) => void;
  closeDeleteModal: () => void;
}

export const useGymsStore = create<GymsState>((set) => ({
  search: '',
  selectedGym: null,
  isEditModalOpen: false,
  isWhatsappModalOpen: false,
  isDeleteModalOpen: false,
  gymToDelete: null,

  setSearch: (search) => set({ search }),
  
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
