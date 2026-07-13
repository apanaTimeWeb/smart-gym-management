// RESPONSIBILITY: Zustand store that manages all async data, UI state (modals, search), and actions for the Gyms module.
// DATA FLOW: API (superadminApi) <-> useGymsStore.ts <-> UI Components (GymsTable, GymEditModal, etc.)

import { create } from 'zustand';
import { Tenant } from '@/app/superadmin/superadmin_types/superadmin_types';
import { superadminApi } from '@/lib/superadmin-api';
import { apiFetch } from '@/lib/api';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import toast from 'react-hot-toast';

interface GymsState {
  // Data State
  gyms: Tenant[] | null;
  loading: boolean;
  error: string | null;
  
  // UI State
  search: string;
  selectedGym: Tenant | null;
  isEditModalOpen: boolean;
  isEmailModalOpen: boolean;

  // Derived State (using a getter method since Zustand doesn't have native computed props)
  getFilteredGyms: () => Tenant[];

  // Actions
  setSearch: (search: string) => void;
  openEditModal: (gym: Tenant) => void;
  closeEditModal: () => void;
  openEmailModal: (gym: Tenant) => void;
  closeEmailModal: () => void;
  
  // Async Actions
  fetchGyms: () => Promise<void>;
  handleGhostLogin: (id: string, name: string) => Promise<void>;
  handleSuspend: (id: string, name: string, currentStatus: string) => Promise<void>;
  handleDelete: (id: string, name: string) => Promise<void>;
  handleEditGym: (id: string, data: any) => Promise<void>;
  handleEmailOwner: (id: string, data: any) => Promise<void>;
}

export const useGymsStore = create<GymsState>((set, get) => ({
  gyms: null,
  loading: false,
  error: null,
  search: '',
  selectedGym: null,
  isEditModalOpen: false,
  isEmailModalOpen: false,

  getFilteredGyms: () => {
    const { gyms, search } = get();
    if (!gyms) return [];
    return gyms.filter(g =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.ownerName.toLowerCase().includes(search.toLowerCase())
    );
  },

  setSearch: (search) => set({ search }),

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

  fetchGyms: async () => {
    set({ loading: true, error: null });
    try {
      const response = await superadminApi.gyms.getAll();
      set({ gyms: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch gyms', loading: false });
      toast.error('Failed to load gyms');
    }
  },

  handleGhostLogin: async (id, name) => {
    toast.success(`Ghost login initiated for ${name}.`);
    // Placeholder for actual ghost login API call
    // await apiFetch('/api/v1/auth/ghost-login', { method: 'POST', body: JSON.stringify({ tenantId: id }) });
  },

  handleSuspend: async (id, name, currentStatus) => {
    const newStatus = currentStatus === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';
    try {
      await superadminApi.gyms.changeStatus(id, newStatus);
      toast.success(`${name} is now ${newStatus}.`);
      
      // Pessimistic UI Update (Cache Mutation)
      const { gyms } = get();
      if (gyms) {
        set({ gyms: gyms.map(gym => gym.id === id ? { ...gym, status: newStatus as any } : gym) });
      }
    } catch (e: any) {
      toast.error(`Failed to update status for ${name}`);
    }
  },

  handleDelete: async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete gym ${name}?`)) return;
    try {
      await superadminApi.gyms.remove(id);
      toast.success(`${name} deleted successfully.`);
      
      // Pessimistic UI Update (Cache Mutation)
      const { gyms } = get();
      if (gyms) {
        set({ gyms: gyms.filter(gym => gym.id !== id) });
      }
    } catch (e: any) {
      toast.error(`Failed to delete gym ${name}`);
    }
  },

  handleEditGym: async (id, data) => {
    try {
      await superadminApi.gyms.update(id, data);
      toast.success(`Gym details updated successfully.`);
      
      const { gyms } = get();
      if (gyms) {
        set({ gyms: gyms.map(gym => gym.id === id ? { ...gym, ...data } : gym) });
      }
      get().closeEditModal();
    } catch (e: any) {
      toast.error(`Failed to update gym details.`);
    }
  },

  handleEmailOwner: async (id, data) => {
    try {
      await apiFetch(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/${id}/email`, { 
        method: 'POST',
        body: JSON.stringify(data)
      });
      toast.success(`Email sent successfully.`);
      get().closeEmailModal();
    } catch (e: any) {
      toast.error(`Failed to send email.`);
    }
  },
}));
