// DATA FLOW: Superadmin UI → useSuperadminGymsStore → Superadmin module API/state → consuming component
// RESPONSIBILITY: Zustand store that manages UI state (modals, view mode) for the Gyms module.
// DATA FLOW: Component -> useSuperadminGymsStore.ts -> UI Components
import { create } from 'zustand';
import type { Tenant } from '@/app/superadmin/gyms/superadmin_gyms_types/superadmin_gyms_types';
export interface GymsState {
    // UI State
    viewMode: 'list' | 'calendar';
    selectedGym: Tenant | null;
    isEditModalOpen: boolean;
    isWhatsappModalOpen: boolean;
    isDeleteModalOpen: boolean;
    gymToDelete: Tenant | null;
    // Actions
    setViewMode: (mode: 'list' | 'calendar') => void;
    openEditModal: (gym: Tenant) => void;
    closeEditModal: () => void;
    openWhatsappModal: (gym: Tenant) => void;
    closeWhatsappModal: () => void;
    openDeleteModal: (gym: Tenant) => void;
    closeDeleteModal: () => void;
}
export const useSuperadminGymsStore = create<GymsState>((set) => ({
    viewMode: 'list',
    selectedGym: null,
    isEditModalOpen: false,
    isWhatsappModalOpen: false,
    isDeleteModalOpen: false,
    gymToDelete: null,
    setViewMode: (viewMode) => set({ viewMode }),
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
