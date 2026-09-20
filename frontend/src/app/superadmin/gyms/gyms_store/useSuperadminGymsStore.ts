// DATA FLOW: Superadmin UI → useSuperadminGymsStore → Superadmin module API/state → consuming component
// RESPONSIBILITY: Zustand store that manages UI state (modals, view mode) for the Gyms module.
// DATA FLOW: Component -> useSuperadminGymsStore.ts -> UI Components
import { create } from 'zustand';
import type { SuperadminGymsState } from '@/app/superadmin/gyms/gyms_types/SuperadminGymsStoreTypes';
/**
 * Purpose: Zustand store that manages UI state (modals, view mode) for the Gyms module.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export const useSuperadminGymsStore = create<SuperadminGymsState>((set) => ({
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
