import { StateCreator } from 'zustand';
import type { Tenant } from '@/app/superadmin/gyms/gyms_types/gyms_types';
import type { GymsState } from '@/app/superadmin/gyms/gyms_store/useGymsStore';

export interface GymsUISlice {
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

export const createGymsUISlice: StateCreator<GymsState, [], [], GymsUISlice> = (set) => ({
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
});
