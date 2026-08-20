/**
 * RESPONSIBILITY: Zustand store that manages all async data, UI state (modals, search), and actions for the Gyms module.
 * DATA FLOW: API (superadminApi) <-> useGymsStore.ts <-> UI Components (GymsTable, GymEditModal, etc.)
 * 
 * Provides centralized state management for the Superadmin Gyms (Tenants) module,
 * ensuring UI components remain purely presentational.
 */

import { create } from 'zustand';
import toast from 'react-hot-toast';

import { gymsApi } from '@/app/superadmin/gyms/gyms_api/gyms_api';
import type { Tenant, FetchState, TenantStatus } from '@/app/superadmin/gyms/gyms_types/gyms_types';

interface GymsState {
  // Data State
  gyms: Tenant[] | null;
  fetchState: FetchState;
  error: string | null;
  actionLoadingId: string | null;
  
  // UI State
  search: string;
  selectedGym: Tenant | null;
  isEditModalOpen: boolean;
  isEmailModalOpen: boolean;
  isDeleteModalOpen: boolean;
  gymToDelete: Tenant | null;

  // Actions
  setSearch: (search: string) => void;
  openEditModal: (gym: Tenant) => void;
  closeEditModal: () => void;
  openEmailModal: (gym: Tenant) => void;
  closeEmailModal: () => void;
  openDeleteModal: (gym: Tenant) => void;
  closeDeleteModal: () => void;
  
  // Async Actions
  fetchGyms: (searchQuery?: string) => Promise<void>;
  handleGhostLogin: (id: string, name: string) => Promise<void>;
  handleSuspend: (id: string, name: string, currentStatus: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleEditGym: (id: string, data: Partial<Tenant>) => Promise<void>;
  handleEmailOwner: (id: string, data: { subject: string; message: string; [key: string]: unknown }) => Promise<void>;
}

export const useGymsStore = create<GymsState>((set, get) => ({
  gyms: null,
  fetchState: 'idle',
  error: null,
  actionLoadingId: null,
  search: '',
  selectedGym: null,
  isEditModalOpen: false,
  isEmailModalOpen: false,
  isDeleteModalOpen: false,
  gymToDelete: null,

  setSearch: (search) => {
    set({ search });
    // In a real app, we'd debounce this and call fetchGyms.
    // For now, we'll just update the string. 
    // To strictly follow server-side filtering, we'd fire fetchGyms(search) via a debounced effect in the component.
  },

  openEditModal: (gym) => set({ selectedGym: gym, isEditModalOpen: true }),
  
  closeEditModal: () => {
    set({ isEditModalOpen: false });
    setTimeout(() => set({ selectedGym: null }), 200);
  },

  openEmailModal: (gym) => set({ selectedGym: gym, isEmailModalOpen: true }),
  
  closeEmailModal: () => {
    set({ isEmailModalOpen: false });
    setTimeout(() => set({ selectedGym: null }), 200);
  },

  openDeleteModal: (gym) => set({ gymToDelete: gym, isDeleteModalOpen: true }),
  
  closeDeleteModal: () => {
    set({ isDeleteModalOpen: false });
    setTimeout(() => set({ gymToDelete: null }), 200);
  },

  fetchGyms: async (searchQuery = '') => {
    set({ fetchState: 'loading', error: null });
    try {
      const response = await gymsApi.getAll(searchQuery ? { search: searchQuery } : undefined);
      set({ gyms: response.data, fetchState: 'success' });
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error) || 'Failed to fetch gyms';
      set({ error: errMsg, fetchState: 'error' });
      toast.error(errMsg);
    }
  },

  handleGhostLogin: async (id, name) => {
    set({ actionLoadingId: id });
    try {
      // const response = await apiFetch('/api/v1/auth/ghost-login', { method: 'POST', body: JSON.stringify({ tenantId: id }) });
      // toast.success(response.message || `Ghost login initiated for ${name}.`);
      toast.success(`Ghost login initiated for ${name}.`); // Mock response for now
    } finally {
      set({ actionLoadingId: null });
    }
  },

  handleSuspend: async (id, name, currentStatus) => {
    const newStatus = currentStatus === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';
    set({ actionLoadingId: id });
    try {
      const response = await gymsApi.changeStatus(id, newStatus);
      toast.success((response as { message?: string })?.message || `${name} is now ${newStatus}.`);
      
      const { gyms } = get();
      if (gyms) {
        set({ gyms: gyms.map(gym => gym.id === id ? { ...gym, status: newStatus as TenantStatus } : gym) });
      }
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error) || `Failed to update status for ${name}`;
      toast.error(errMsg);
    } finally {
      set({ actionLoadingId: null });
    }
  },

  handleDelete: async (id) => {
    set({ actionLoadingId: id });
    try {
      const response = await gymsApi.remove(id);
      toast.success((response as { message?: string })?.message || `Tenant deleted successfully.`);
      
      const { gyms } = get();
      if (gyms) {
        set({ gyms: gyms.filter(gym => gym.id !== id) });
      }
      get().closeDeleteModal();
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error) || `Failed to delete tenant`;
      toast.error(errMsg);
    } finally {
      set({ actionLoadingId: null });
    }
  },

  handleEditGym: async (id, data) => {
    set({ actionLoadingId: id });
    try {
      const response = await gymsApi.update(id, data);
      toast.success((response as { message?: string })?.message || `Gym details updated successfully.`);
      
      const { gyms } = get();
      if (gyms) {
        set({ gyms: gyms.map(gym => gym.id === id ? { ...gym, ...data } : gym) });
      }
      get().closeEditModal();
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error) || `Failed to update gym details.`;
      toast.error(errMsg);
    } finally {
      set({ actionLoadingId: null });
    }
  },

  handleEmailOwner: async (id, data) => {
    set({ actionLoadingId: id });
    try {
      const response = await gymsApi.emailOwner(id, data);
      toast.success((response as { message?: string })?.message || 'Email sent successfully.');
      get().closeEmailModal();
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error) || 'Failed to send email.';
      toast.error(errMsg);
    } finally {
      set({ actionLoadingId: null });
    }
  },
}));
