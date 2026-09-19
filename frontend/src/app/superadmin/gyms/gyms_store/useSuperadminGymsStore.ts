// DATA FLOW: Superadmin UI → useSuperadminGymsStore → Superadmin module API/state → consuming component
// RESPONSIBILITY: Zustand store that manages UI state (modals, view mode) for the Gyms module.
// DATA FLOW: Component -> useSuperadminGymsStore.ts -> UI Components
import { create } from 'zustand';
export type SuperadminGymsViewMode = 'list' | 'calendar';

import type { Tenant } from '@/app/superadmin/gyms/gyms_types/SuperadminGymsTypes';
export interface GymsState {
    // UI State
    viewMode: SuperadminGymsViewMode;
    selectedGym: Tenant | null;
    isEditModalOpen: boolean;
    isWhatsappModalOpen: boolean;
    isDeleteModalOpen: boolean;
    gymToDelete: Tenant | null;
    // Actions
    setViewMode: (mode: SuperadminGymsViewMode) => void;
    openEditModal: (gym: Tenant) => void;
    closeEditModal: () => void;
    openWhatsappModal: (gym: Tenant) => void;
    closeWhatsappModal: () => void;
    openDeleteModal: (gym: Tenant) => void;
    closeDeleteModal: () => void;
}
/**
 * Purpose: Zustand store that manages UI state (modals, view mode) for the Gyms module.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
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
