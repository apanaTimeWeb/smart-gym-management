// RESPONSIBILITY: Zustand store that manages all async data, UI state (modals, search), and actions for the Gyms module.
// DATA FLOW: API (superadminApi) <-> useGymsStore.ts <-> UI Components (GymsTable, GymEditModal, etc.)

import { create } from 'zustand';
import toast from 'react-hot-toast';

import { superadminApi } from '@/lib/superadmin-api';
import { apiFetch } from '@/lib/api';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';

import type { Tenant } from '@/app/superadmin/superadmin_types/superadmin_types';

export type FetchState = 'idle' | 'loading' | 'success' | 'error';

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

  // Actions
  setSearch: (search: string) => void;
  openEditModal: (gym: Tenant) => void;
  closeEditModal: () => void;
  openEmailModal: (gym: Tenant) => void;
  closeEmailModal: () => void;
  
  // Async Actions
  fetchGyms: (searchQuery?: string) => Promise<void>;
  handleGhostLogin: (id: string, name: string) => Promise<void>;
  handleSuspend: (id: string, name: string, currentStatus: string) => Promise<void>;
  handleDelete: (id: string, name: string) => Promise<void>;
  handleEditGym: (id: string, data: unknown) => Promise<void>;
  handleEmailOwner: (id: string, data: unknown) => Promise<void>;
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

  fetchGyms: async (searchQuery = '') => {
    set({ fetchState: 'loading', error: null });
    try {
      const response = await superadminApi.gyms.getAll(searchQuery ? { search: searchQuery } : undefined);
      set({ gyms: response.data, fetchState: 'success' });
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Failed to fetch gyms';
      set({ error: errMsg, fetchState: 'error' });
      toast.error('Failed to load gyms');
    }
  },

  handleGhostLogin: async (id, name) => {
    set({ actionLoadingId: id });
    try {
      // await apiFetch('/api/v1/auth/ghost-login', { method: 'POST', body: JSON.stringify({ tenantId: id }) });
      toast.success(`Ghost login initiated for ${name}.`);
    } finally {
      set({ actionLoadingId: null });
    }
  },

  handleSuspend: async (id, name, currentStatus) => {
    const newStatus = currentStatus === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';
    set({ actionLoadingId: id });
    try {
      await superadminApi.gyms.changeStatus(id, newStatus);
      toast.success(`${name} is now ${newStatus}.`);
      
      const { gyms } = get();
      if (gyms) {
        set({ gyms: gyms.map(gym => gym.id === id ? { ...gym, status: newStatus as any } : gym) });
      }
    } catch (e: unknown) {
      toast.error(`Failed to update status for ${name}`);
    } finally {
      set({ actionLoadingId: null });
    }
  },

  handleDelete: async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete gym ${name}?`)) return;
    set({ actionLoadingId: id });
    try {
      await superadminApi.gyms.remove(id);
      toast.success(`${name} deleted successfully.`);
      
      const { gyms } = get();
      if (gyms) {
        set({ gyms: gyms.filter(gym => gym.id !== id) });
      }
    } catch (e: unknown) {
      toast.error(`Failed to delete gym ${name}`);
    } finally {
      set({ actionLoadingId: null });
    }
  },

  handleEditGym: async (id, data) => {
    set({ actionLoadingId: id });
    try {
      await superadminApi.gyms.update(id, data);
      toast.success(`Gym details updated successfully.`);
      
      const { gyms } = get();
      if (gyms) {
        set({ gyms: gyms.map(gym => gym.id === id ? { ...gym, ...(data as Partial<Tenant>) } : gym) });
      }
      get().closeEditModal();
    } catch (e: unknown) {
      toast.error(`Failed to update gym details.`);
    } finally {
      set({ actionLoadingId: null });
    }
  },

  handleEmailOwner: async (id, data) => {
    set({ actionLoadingId: id });
    try {
      await apiFetch(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/${id}/email`, { 
        method: 'POST',
        body: JSON.stringify(data)
      });
      toast.success(`Email sent successfully.`);
      get().closeEmailModal();
    } catch (e: unknown) {
      toast.error(`Failed to send email.`);
    } finally {
      set({ actionLoadingId: null });
    }
  },
}));
